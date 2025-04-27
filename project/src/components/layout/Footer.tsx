import React from 'react';
import { Music } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Music className="h-8 w-8 text-amber-400 mr-2" />
            <span className="text-xl font-bold">Modern Jukebox</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center md:text-left text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Modern Jukebox. All rights reserved.</p>
          <p className="mt-2">Music for the modern age.</p>
        </div>
      </div>
    </footer>
  );
};