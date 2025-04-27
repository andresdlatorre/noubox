import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  Clock, 
  Music, 
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { formatCurrency, formatTime } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import useAppStore from '../../store';
import AddCreditsForm from '../../components/payment/AddCreditsForm';
import { Dialog } from '@headlessui/react';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAppStore();
  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  
  const handleAddCreditsSuccess = () => {
    setIsAddCreditsOpen(false);
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile logic would go here
    setIsEditProfileOpen(false);
  };
  
  if (!currentUser) return null;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100 mb-4">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {currentUser.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold">{currentUser.name}</h2>
                  <p className="text-gray-600">{currentUser.email}</p>
                  
                  {currentUser.isAdmin && (
                    <div className="mt-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                      Admin
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center text-gray-700">
                      <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                      <span>Your Credits</span>
                    </div>
                    <span className="font-bold text-lg">
                      {formatCurrency(currentUser.credits || 0)}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 flex items-center justify-center"
                    onClick={() => setIsAddCreditsOpen(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Credits
                  </Button>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between"
                    onClick={() => setIsEditProfileOpen(true)}
                  >
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                    onClick={logout}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-medium text-purple-800 mb-3">
                  Your Song Requests
                </h2>
                
                <div className="divide-y divide-gray-100">
                  {Array(3).fill(0).map((_, i) => {
                    const mockSong = useAppStore.getState().songs[i];
                    return (
                      <div key={i} className="py-4 flex items-center">
                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={mockSong.coverArt} 
                            alt={mockSong.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{mockSong.title}</h3>
                          <p className="text-sm text-gray-600">{mockSong.artist}</p>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mr-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTime(mockSong.duration)}</span>
                        </div>
                        <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Played
                        </div>
                      </div>
                    );
                  })}

                  {Array(2).fill(0).map((_, i) => {
                    const mockSong = useAppStore.getState().songs[i + 3];
                    return (
                      <div key={i + 3} className="py-4 flex items-center">
                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={mockSong.coverArt} 
                            alt={mockSong.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{mockSong.title}</h3>
                          <p className="text-sm text-gray-600">{mockSong.artist}</p>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mr-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTime(mockSong.duration)}</span>
                        </div>
                        <div className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                          In Queue
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-purple-800 mb-3">
                  Transaction History
                </h2>
                
                <div className="divide-y divide-gray-100">
                  <div className="py-3 flex justify-between">
                    <div>
                      <h3 className="font-medium">Added Credits</h3>
                      <p className="text-sm text-gray-600">May 15, 2025</p>
                    </div>
                    <div className="text-green-600 font-medium">
                      +{formatCurrency(20)}
                    </div>
                  </div>
                  
                  <div className="py-3 flex justify-between">
                    <div>
                      <h3 className="font-medium">Song Request: Billie Jean</h3>
                      <p className="text-sm text-gray-600">May 15, 2025</p>
                    </div>
                    <div className="text-red-600 font-medium">
                      -{formatCurrency(1.99)}
                    </div>
                  </div>
                  
                  <div className="py-3 flex justify-between">
                    <div>
                      <h3 className="font-medium">Song Request: Bohemian Rhapsody</h3>
                      <p className="text-sm text-gray-600">May 15, 2025</p>
                    </div>
                    <div className="text-red-600 font-medium">
                      -{formatCurrency(2.99)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Credits Modal */}
      <Dialog 
        open={isAddCreditsOpen} 
        onClose={() => setIsAddCreditsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
            <AddCreditsForm 
              onSuccess={handleAddCreditsSuccess}
              onCancel={() => setIsAddCreditsOpen(false)}
            />
          </div>
        </div>
      </Dialog>
      
      {/* Edit Profile Modal */}
      <Dialog 
        open={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
            <div className="p-6">
              <Dialog.Title as="h3" className="text-xl font-bold mb-4">
                Edit Profile
              </Dialog.Title>
              
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      {currentUser.avatar ? (
                        <img 
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">
                            {currentUser.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    value={currentUser.email}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditProfileOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfilePage;