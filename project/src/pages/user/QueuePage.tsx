import React, { useState } from 'react';
import { Clock, Music, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { formatTime, formatCurrency } from '../../lib/utils';
import useAppStore from '../../store';
import PaymentForm from '../../components/payment/PaymentForm';
import { Dialog } from '@headlessui/react';

const QueuePage: React.FC = () => {
  const { queue, songs, currentSong, isAuthenticated, currentUser } = useAppStore();
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  const handleAddSong = (songId: string) => {
    if (isAuthenticated) {
      setSelectedSongId(songId);
      setIsPaymentOpen(true);
    } else {
      // Redirect to login
    }
  };
  
  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    // Refresh queue
  };
  
  const selectedSong = selectedSongId ? songs.find(s => s.id === selectedSongId) : null;
  
  // Get the queued songs with their details
  const queuedSongs = queue.map(item => {
    const song = songs.find(s => s.id === item.songId);
    return { ...item, song };
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Current Queue</h1>
          
          {/* Now Playing */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">Now Playing</h2>
            
            {currentSong ? (
              <div className="flex items-center">
                <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={currentSong.coverArt} 
                    alt={currentSong.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-bold">{currentSong.title}</h3>
                  <p className="text-gray-600">{currentSong.artist}</p>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6 text-gray-500">
                <Music className="h-6 w-6 mr-2 text-gray-400" />
                <span>No song currently playing</span>
              </div>
            )}
          </div>
          
          {/* Upcoming Songs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <h2 className="text-lg font-medium text-purple-800 mb-3">Up Next</h2>
            
            {queuedSongs.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {queuedSongs.map((item, index) => {
                  if (!item.song) return null;
                  
                  return (
                    <div 
                      key={item.id} 
                      className="py-3 flex items-center"
                    >
                      <div className="w-8 flex-shrink-0 text-center font-medium text-gray-500">
                        {index + 1}
                      </div>
                      <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.song.coverArt} 
                          alt={item.song.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.song.title}</h3>
                        <p className="text-sm text-gray-600">{item.song.artist}</p>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mr-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatTime(item.song.duration)}</span>
                      </div>
                      {currentUser && currentUser.id === item.userId && (
                        <div className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                          Your Request
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center text-gray-500">
                <Music className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>The queue is empty</p>
                <p className="text-sm mt-1">Add songs to the queue to get the party started!</p>
                <Button 
                  variant="link" 
                  className="mt-4"
                  onClick={() => window.location.href = '/browse'}
                >
                  Browse Songs
                </Button>
              </div>
            )}
          </div>
          
          {/* Quick Add Popular Songs */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium text-purple-800 mb-3">Quick Add Popular Songs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {songs.slice(0, 6).map(song => (
                <div 
                  key={song.id} 
                  className="flex items-center border rounded-lg p-3 hover:border-purple-300 transition-colors"
                >
                  <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={song.coverArt} 
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <h3 className="font-medium text-sm">{song.title}</h3>
                    <p className="text-xs text-gray-600">{song.artist}</p>
                  </div>
                  <div className="text-purple-700 font-bold text-sm mr-2">
                    {formatCurrency(song.price)}
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleAddSong(song.id)}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-purple-600"
                onClick={() => window.location.href = '/browse'}
              >
                Browse All Songs
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {isPaymentOpen && selectedSong && (
        <Dialog 
          open={isPaymentOpen} 
          onClose={() => setIsPaymentOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Add to Queue
                </h2>
                
                <div className="mb-6 flex items-center">
                  <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={selectedSong.coverArt} 
                      alt={selectedSong.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">{selectedSong.title}</h3>
                    <p className="text-gray-600">{selectedSong.artist}</p>
                  </div>
                </div>
                
                <PaymentForm 
                  amount={selectedSong.price}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setIsPaymentOpen(false)}
                />
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default QueuePage;