import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Phone, Mail, User, Ruler, 
  Clock, CheckCircle2
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

const DUMMY_LANDS = [
  {
    id: 1,
    title: "Fertile Paddy Field",
    location: "Guntur, Andhra Pradesh",
    area: 5.5,
    pricePerAcre: 45000,
    soilType: "Black Soil",
    leaseDuration: 3,
    features: ["Irrigation Well", "Power Supply", "Road Access", "Storage Facility"],
    ownerName: "Ramesh Kumar",
    phone: "+91 9876543210",
    email: "ramesh.k@email.com"
  },
  {
    id: 2,
    title: "Organic Farm Land",
    location: "Warangal, Telangana",
    area: 3.8,
    pricePerAcre: 38000,
    soilType: "Red Soil",
    leaseDuration: 5,
    features: ["Borewell", "Fencing", "Farm House", "Natural Springs"],
    ownerName: "Suresh Reddy",
    phone: "+91 9876543211",
    email: "suresh.r@email.com"
  },
  {
    id: 3,
    title: "Multi-Crop Agricultural Land",
    location: "Krishna District, Andhra Pradesh",
    area: 7.2,
    pricePerAcre: 52000,
    soilType: "Alluvial Soil",
    leaseDuration: 4,
    features: ["Canal Irrigation", "Equipment Shed", "Labor Quarters", "Market Proximity"],
    ownerName: "Venkat Rao",
    phone: "+91 9876543212",
    email: "venkat.r@email.com"
  },
  {
    id: 4,
    title: "Vegetable Farm Plot",
    location: "Rangareddy, Telangana",
    area: 2.5,
    pricePerAcre: 42000,
    soilType: "Loamy Soil",
    leaseDuration: 2,
    features: ["Drip Irrigation", "Greenhouse", "Solar Power", "Security"],
    ownerName: "Krishna Murthy",
    phone: "+91 9876543213",
    email: "krishna.m@email.com"
  },
  {
    id: 5,
    title: "Commercial Farming Land",
    location: "East Godavari, Andhra Pradesh",
    area: 10.0,
    pricePerAcre: 58000,
    soilType: "Black Soil",
    leaseDuration: 5,
    features: ["Multiple Borewells", "Large Storage", "Processing Unit", "Transport Facility"],
    ownerName: "Prasad Reddy",
    phone: "+91 9876543214",
    email: "prasad.r@email.com"
  },
  {
    id: 6,
    title: "Fruit Orchard Land",
    location: "Medak, Telangana",
    area: 4.5,
    pricePerAcre: 48000,
    soilType: "Red Soil",
    leaseDuration: 6,
    features: ["Existing Fruit Trees", "Water Tank", "Watchman Room", "Tool Storage"],
    ownerName: "Lakshmi Devi",
    phone: "+91 9876543215",
    email: "lakshmi.d@email.com"
  }
];

const states = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Maharashtra'
];

const LandCard = ({ land }) => {
  const [showContact, setShowContact] = useState(false);
  const [negotiatedPrice, setNegotiatedPrice] = useState(land.pricePerAcre);
  
  const minPrice = Math.floor(land.pricePerAcre * 0.85);
  const maxPrice = Math.ceil(land.pricePerAcre * 1.15);

  const getPriceColor = () => {
    if (negotiatedPrice < land.pricePerAcre) return 'text-yellow-400';
    if (negotiatedPrice > land.pricePerAcre) return 'text-red-400';
    return 'text-green-300';
  };

  const handleProposal = () => {
    if (negotiatedPrice === land.pricePerAcre) {
      toast.success('Contacting owner with original price...');
    } else {
      const percentDiff = ((negotiatedPrice - land.pricePerAcre) / land.pricePerAcre * 100).toFixed(1);
      const direction = negotiatedPrice > land.pricePerAcre ? 'above' : 'below';
      toast.success(`Proposal sent: ₹${negotiatedPrice.toLocaleString('en-IN')}/acre/year (${Math.abs(percentDiff)}% ${direction} asking price)`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-900/40 rounded-lg p-6 ring-1 ring-green-800/50"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-green-300">{land.title}</h3>
          <p className="text-green-50">{land.location}</p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-green-800/30 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-200">Negotiate Price:</span>
          <span className={`font-semibold ${getPriceColor()}`}>
            ₹{negotiatedPrice.toLocaleString('en-IN')}/acre/year
          </span>
        </div>
        
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={negotiatedPrice}
          onChange={(e) => setNegotiatedPrice(Number(e.target.value))}
          className="w-full h-2 bg-green-700 rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="flex justify-between text-sm mt-1">
          <span className="text-yellow-400">₹{minPrice.toLocaleString('en-IN')}</span>
          <span className="text-green-300">Base: ₹{land.pricePerAcre.toLocaleString('en-IN')}</span>
          <span className="text-red-400">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>

        {negotiatedPrice !== land.pricePerAcre && (
          <p className="text-sm mt-2 text-green-400">
            {negotiatedPrice < land.pricePerAcre 
              ? `${((land.pricePerAcre - negotiatedPrice) / land.pricePerAcre * 100).toFixed(1)}% below asking price`
              : `${((negotiatedPrice - land.pricePerAcre) / land.pricePerAcre * 100).toFixed(1)}% above asking price`
            }
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-green-200">
          <Ruler className="w-4 h-4 mr-2 text-green-400" />
          <span>{land.area} acres</span>
        </div>
        <div className="flex items-center text-green-200">
          <MapPin className="w-4 h-4 mr-2 text-green-400" />
          <span>{land.soilType}</span>
        </div>
        <div className="flex items-center text-green-200">
          <Clock className="w-4 h-4 mr-2 text-green-400" />
          <span>{land.leaseDuration} years lease</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-green-300 font-medium mb-2">Features:</h4>
        <div className="grid grid-cols-2 gap-2">
          {land.features.map((feature, index) => (
            <div key={index} className="flex items-center text-green-200 text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        <button
          onClick={() => setShowContact(!showContact)}
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors"
        >
          {showContact ? 'Hide Contact' : 'Show Contact Details'}
        </button>

        <button
          onClick={handleProposal}
          className="w-full bg-green-900/50 hover:bg-green-800 text-green-300 py-2 rounded-lg transition-colors ring-1 ring-green-700"
        >
          Send Price Proposal
        </button>
      </div>

      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-green-800/30 rounded-lg p-4 overflow-hidden"
          >
            <div className="space-y-2">
              <div className="flex items-center text-green-200">
                <User className="w-4 h-4 mr-2 text-green-400" />
                <span>{land.ownerName}</span>
              </div>
              <div className="flex items-center text-green-200">
                <Phone className="w-4 h-4 mr-2 text-green-400" />
                <span>{land.phone}</span>
              </div>
              <div className="flex items-center text-green-200">
                <Mail className="w-4 h-4 mr-2 text-green-400" />
                <span>{land.email}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LandLease = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const filteredLands = DUMMY_LANDS.filter(land => {
    const matchesSearch = !searchQuery || 
      land.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      land.title.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesState = !selectedState ||
      land.location.includes(selectedState);

    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-300 mb-2">Agricultural Land Lease</h1>
          <p className="text-green-200">Find and lease agricultural land in your region</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <input
            type="text"
            placeholder="Search by location or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredLands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>

        {filteredLands.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-green-400">
            <Search className="w-12 h-12 mb-4 opacity-50" />
            <p>No land listings found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandLease;