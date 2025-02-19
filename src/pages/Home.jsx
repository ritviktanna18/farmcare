import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, Bug, Heart, 
  FileText, ChevronRight, TrendingUp,
  FlaskConical, MapPin, MessageCircle
} from 'lucide-react';

const FeatureCard = ({ Icon, title, description, link, isHighlighted = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`${
      isHighlighted 
        ? 'bg-green-600/20 ring-2 ring-green-500/50' 
        : 'bg-green-900/40 ring-1 ring-green-800/50'
    } backdrop-blur-sm p-6 rounded-xl hover:bg-green-800/40 transition-all duration-300`}
  >
    <div className={`${
      isHighlighted ? 'bg-green-500' : 'bg-green-800/50'
    } w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
      <Icon className={`w-6 h-6 ${isHighlighted ? 'text-green-900' : 'text-green-400'}`} />
    </div>
    <h3 className="text-xl font-semibold text-green-300 mb-2">{title}</h3>
    <p className="text-green-100/90 mb-4">{description}</p>
    <Link 
      to={link} 
      className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors group"
    >
      <span>Learn More</span>
      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-20 pb-32 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center bg-green-900/50 rounded-full px-4 py-2 ring-1 ring-green-700/50"
          >
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-green-200 ml-2">AI-Powered Farm Management</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-green-100 mb-6"
          >
            Smart Farming Solutions with <br />
            <span className="text-green-400">Advanced AI Technology</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-200 mb-8 max-w-2xl mx-auto"
          >
            Empowering farmers with AI technology for plant analysis, pest detection, and community support.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              to="/farmer-support"
              className="bg-green-500 text-green-950 px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Support Farmers</span>
            </Link>
            <Link 
              to="/plant-analysis"
              className="bg-green-900 text-green-100 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors ring-1 ring-green-700 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Leaf className="w-5 h-5" />
              <span>Analyze Plants</span>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-green-950/50 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-green-300 text-center mb-12"
          >
            Comprehensive Farming Solutions
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              Icon={Heart}
              title="Farmer Support"
              description="Join our community in supporting farmers through verified cases and transparent donation tracking."
              link="/farmer-support"
              isHighlighted={true}
            />
            <FeatureCard 
              Icon={Leaf}
              title="Plant Analysis"
              description="Upload plant photos for instant disease detection and get detailed health analysis using advanced AI."
              link="/plant-analysis"
            />
            <FeatureCard 
              Icon={Bug}
              title="Pest Analysis"
              description="Identify harmful pests and get comprehensive treatment recommendations for effective control."
              link="/pest-analysis"
            />
            <FeatureCard 
              Icon={TrendingUp}
              title="Price Prediction"
              description="Get AI-powered price predictions for vegetables to make informed market decisions."
              link="/price-prediction"
            />
            <FeatureCard 
              Icon={MapPin}
              title="Land Lease"
              description="Find and lease agricultural land in your region with verified listings and fair negotiations."
              link="/land-lease"
            />
            <FeatureCard 
              Icon={FileText}
              title="Agricultural News"
              description="Stay updated with the latest farming news, trends, and best practices in agriculture."
              link="/news"
            />
          </div>
        </div>

        {/* Additional Decorative Element */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-800/50 to-transparent" />
        </div>
      </section>

      {/* Community Support Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-green-900/40 rounded-xl p-8 ring-1 ring-green-800/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-green-300 mb-4">Join Our Farming Community</h2>
                <p className="text-green-200 mb-6">
                  Connect with experienced farmers, share knowledge, and contribute to sustainable agriculture. Together, we can make a difference.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/forum"
                    className="bg-green-700 text-green-100 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Join Forum</span>
                  </Link>
                  <Link
                    to="/farmer-support"
                    className="bg-green-900 text-green-100 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors ring-1 ring-green-700 flex items-center space-x-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Support Others</span>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="bg-green-800/30 p-4 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-green-300 mb-2">500+</h3>
                    <p className="text-green-200">Active Farmers</p>
                  </div>
                  <div className="bg-green-800/30 p-4 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-green-300 mb-2">₹2M+</h3>
                    <p className="text-green-200">Support Raised</p>
                  </div>
                  <div className="bg-green-800/30 p-4 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-green-300 mb-2">200+</h3>
                    <p className="text-green-200">Success Stories</p>
                  </div>
                  <div className="bg-green-800/30 p-4 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-green-300 mb-2">50+</h3>
                    <p className="text-green-200">Expert Advisors</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;