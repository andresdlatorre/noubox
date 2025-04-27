import React from 'react';
import { Music, Menu, X, User, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import useAppStore from '../../store';

export const Header: React.FC = () => {
  const { isAuthenticated, currentUser, venue, logout, toggleUserMenu, isUserMenuOpen } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  return (
    <header className="bg-gradient-to-r from-purple-800 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-amber-400" />
          <span className="text-xl font-bold">{venue?.name || 'Modern Jukebox'}</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-white hover:text-amber-300 transition-colors">Browse</a>
          <a href="#" className="text-white hover:text-amber-300 transition-colors">Queue</a>
          {isAuthenticated && (
            <a href="#" className="text-white hover:text-amber-300 transition-colors">My Profile</a>
          )}
          {isAuthenticated && currentUser?.isAdmin && (
            <a href="#" className="text-white hover:text-amber-300 transition-colors">Admin</a>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => toggleUserMenu()}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  {currentUser?.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-amber-500 flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {currentUser?.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <span className="hidden md:inline">{currentUser?.name}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                  >
                    Profile
                  </a>
                  {currentUser?.isAdmin && (
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                    >
                      Admin Dashboard
                    </a>
                  )}
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                    onClick={() => logout()}
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Button variant="secondary" size="sm">
              Sign In
            </Button>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-purple-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-700"
            >
              Browse
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-700"
            >
              Queue
            </a>
            {isAuthenticated && (
              <a 
                href="#" 
                className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-700"
              >
                My Profile
              </a>
            )}
            {isAuthenticated && currentUser?.isAdmin && (
              <a 
                href="#" 
                className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-700"
              >
                Admin
              </a>
            )}
            {!isAuthenticated && (
              <a 
                href="#" 
                className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-700"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};