import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900/90 border-t border-green-800">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-900" />
            </div>
            <span className="text-lg font-semibold text-green-300">FarmCare</span>
          </div>

          {/* Description */}
          <p className="text-green-400 text-sm text-center max-w-md">
            Empowering farmers with AI-powered solutions for sustainable agriculture and pest management
          </p>

          {/* Copyright */}
          <div className="text-sm text-green-400">
            © {new Date().getFullYear()} FarmCare. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;