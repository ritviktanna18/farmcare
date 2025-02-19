import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Share2, Target, Users, Calendar, 
  Clock, CheckCircle2, AlertCircle, User,
  Landmark, ArrowRight
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Farmer cases data
const FARMER_STORIES = [
  {
    id: 1,
    name: "Rajesh Patel",
    age: 45,
    location: "Vidarbha, Maharashtra",
    familySize: 5,
    landSize: 3.5,
    amountNeeded: 250000,
    amountRaised: 175000,
    story: "After three consecutive failed crops due to irregular rainfall and mounting debt from private lenders, Rajesh is struggling to fund his children's education and purchase seeds for the next season.",
    deadline: "2024-05-15",
    supporters: 28,
    verifiedBy: "Local Farmers Association"
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    age: 52,
    location: "Anantapur, Andhra Pradesh",
    familySize: 4,
    landSize: 2.8,
    amountNeeded: 180000,
    amountRaised: 92000,
    story: "A widow managing her farm alone, Lakshmi faces challenges with well irrigation repairs and loan repayments. Her determination to continue farming inspires the local community.",
    deadline: "2024-04-30",
    supporters: 15,
    verifiedBy: "District Agriculture Office"
  },
  {
    id: 3,
    name: "Surinder Singh",
    age: 48,
    location: "Bathinda, Punjab",
    familySize: 6,
    landSize: 4.2,
    amountNeeded: 300000,
    amountRaised: 210000,
    story: "Despite being an experienced farmer, unexpected medical emergencies and crop disease have created significant financial strain. Surinder needs support to recover and maintain his farm operations.",
    deadline: "2024-06-10",
    supporters: 32,
    verifiedBy: "Punjab Kisan Union"
  }
];

const FarmerCard = ({ farmer }) => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const progress = (farmer.amountRaised / farmer.amountNeeded) * 100;
  const daysLeft = Math.max(0, Math.ceil((new Date(farmer.deadline) - new Date()) / (1000 * 60 * 60 * 24)));

  const DonationModal = ({ onClose }) => {
    const [amount, setAmount] = useState('1000');
    const [message, setMessage] = useState('');
    
    const handleDonate = () => {
      toast.success(`Thank you for your generous donation of ₹${Number(amount).toLocaleString('en-IN')}!`);
      onClose();
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-green-900/90 rounded-lg p-6 max-w-md w-full"
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-xl font-semibold text-green-200 mb-4">Support {farmer.name}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-300 mb-1">Donation Amount (₹)</label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['1000', '2000', '5000', '10000'].map((value) => (
                  <button
                    key={value}
                    onClick={() => setAmount(value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      amount === value
                        ? 'bg-green-500 text-white'
                        : 'bg-green-800/50 text-green-300 hover:bg-green-800'
                    }`}
                  >
                    ₹{Number(value).toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-green-800/30 border border-green-700 rounded-lg text-green-100 placeholder-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-300 mb-1">Message of Support (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 bg-green-800/30 border border-green-700 rounded-lg text-green-100 placeholder-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                placeholder="Share a message of encouragement..."
              />
            </div>

            <button
              onClick={handleDonate}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Donate ₹{Number(amount).toLocaleString('en-IN')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-900/40 rounded-lg p-6 ring-1 ring-green-800/50"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-green-200">{farmer.name}</h3>
          <p className="text-green-300">{farmer.location}</p>
        </div>
        <button
          onClick={() => {
            navigator.share({
              title: `Support ${farmer.name}`,
              text: `Help support ${farmer.name}, a farmer from ${farmer.location}`,
              url: window.location.href
            }).catch(() => {
              toast.success('Link copied to clipboard!');
            });
          }}
          className="p-2 hover:bg-green-800/30 rounded-full transition-colors"
        >
          <Share2 className="w-5 h-5 text-green-400" />
        </button>
      </div>

      <p className="text-green-100 mt-4 mb-4">{farmer.story}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center text-green-300">
          <Users className="w-4 h-4 mr-2 text-green-400" />
          Family Size: {farmer.familySize}
        </div>
        <div className="flex items-center text-green-300">
          <Target className="w-4 h-4 mr-2 text-green-400" />
          Land: {farmer.landSize} acres
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-green-300">Raised: ₹{farmer.amountRaised.toLocaleString('en-IN')}</span>
          <span className="text-green-300">Goal: ₹{farmer.amountNeeded.toLocaleString('en-IN')}</span>
        </div>
        <div className="h-2 bg-green-900/50 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="flex items-center text-green-300">
            <Heart className="w-4 h-4 mr-1 text-green-400" />
            {farmer.supporters} supporters
          </div>
          <div className="flex items-center text-green-300">
            <Clock className="w-4 h-4 mr-1 text-green-400" />
            {daysLeft} days left
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center text-green-400">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Verified by {farmer.verifiedBy}
        </div>
      </div>

      <button
        onClick={() => setShowDonateModal(true)}
        className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
      >
        <Heart className="w-5 h-5 mr-2" />
        Support This Farmer
      </button>

      <AnimatePresence>
        {showDonateModal && (
          <DonationModal onClose={() => setShowDonateModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FarmerSupport = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 rounded-full bg-green-900/50 text-green-400 mb-4"
          >
            <Heart className="w-8 h-8" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-green-200 mb-4">
            Support Our Farmers
          </h1>
          <p className="text-xl text-green-300 max-w-2xl mx-auto">
            Your contribution can help farmers overcome challenges and continue their essential work. Every donation makes a difference.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="bg-green-900/40 rounded-lg p-6 ring-1 ring-green-800/50">
            <Landmark className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-green-200 mb-2">Verified Cases</h3>
            <p className="text-green-300">All farmer cases are thoroughly verified by local agricultural offices and farmer associations.</p>
          </div>
          
          <div className="bg-green-900/40 rounded-lg p-6 ring-1 ring-green-800/50">
            <Heart className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-green-200 mb-2">Direct Support</h3>
            <p className="text-green-300">100% of your donation goes directly to the farmer, ensuring maximum impact where it's needed most.</p>
          </div>
          
          <div className="bg-green-900/40 rounded-lg p-6 ring-1 ring-green-800/50">
            <ArrowRight className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-green-200 mb-2">Track Impact</h3>
            <p className="text-green-300">Follow the progress of farmers you've supported and see the real difference you're making.</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FARMER_STORIES.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerSupport;