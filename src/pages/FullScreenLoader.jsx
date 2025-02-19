import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Leaf, Shield } from 'lucide-react';

const FullScreenLoader = ({ isVisible, progress }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-green-950/95 backdrop-blur-lg z-50 flex items-center justify-center"
    >
      <div className="max-w-lg w-full mx-4">
        <div className="flex flex-col items-center text-center">
          {/* Animated Icons */}
          <div className="relative w-32 h-32 mb-8">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bug className="w-16 h-16 text-green-400" />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: [360, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Leaf className="w-12 h-12 text-green-500 opacity-60" />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: [0, -360],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Shield className="w-10 h-10 text-green-600 opacity-40" />
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.h2
            className="text-2xl font-bold text-green-300 mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Analyzing Your Image
          </motion.h2>
          
          <p className="text-green-400 mb-8">
            Our AI is examining the pest characteristics and preparing detailed recommendations
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-green-900/50 rounded-full h-3 mb-4">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <p className="text-green-400 text-sm">
            {progress}% Complete
          </p>

          {/* Loading Steps */}
          <div className="mt-8 text-left space-y-2">
            <motion.div
              className="flex items-center text-green-400"
              animate={{ opacity: progress >= 20 ? 1 : 0.5 }}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${progress >= 20 ? 'bg-green-400' : 'bg-green-700'}`} />
              Processing Image
            </motion.div>
            
            <motion.div
              className="flex items-center text-green-400"
              animate={{ opacity: progress >= 40 ? 1 : 0.5 }}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${progress >= 40 ? 'bg-green-400' : 'bg-green-700'}`} />
              Identifying Pest Characteristics
            </motion.div>
            
            <motion.div
              className="flex items-center text-green-400"
              animate={{ opacity: progress >= 60 ? 1 : 0.5 }}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${progress >= 60 ? 'bg-green-400' : 'bg-green-700'}`} />
              Analyzing Damage Patterns
            </motion.div>
            
            <motion.div
              className="flex items-center text-green-400"
              animate={{ opacity: progress >= 80 ? 1 : 0.5 }}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${progress >= 80 ? 'bg-green-400' : 'bg-green-700'}`} />
              Generating Treatment Recommendations
            </motion.div>
            
            <motion.div
              className="flex items-center text-green-400"
              animate={{ opacity: progress >= 100 ? 1 : 0.5 }}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${progress >= 100 ? 'bg-green-400' : 'bg-green-700'}`} />
              Completing Analysis
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FullScreenLoader;