import React from 'react';
import { Play, Plus, Clock } from 'lucide-react';
import { Song } from '../../types';
import { formatTime, formatCurrency } from '../../lib/utils';
import { Button } from '../ui/Button';
import useAppStore from '../../store';

interface SongCardProps {
  song: Song;
}

export const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { addToQueue, isAuthenticated } = useAppStore();
  
  const handleAddToQueue = async () => {
    if (!isAuthenticated) {
      // TODO: Show login modal
      alert('Please sign in to queue songs');
      return;
    }
    
    const success = await addToQueue(song.id);
    if (success) {
      // Show success notification
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative aspect-square">
        <img 
          src={song.coverArt} 
          alt={`${song.title} - ${song.artist}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
          <Button 
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={handleAddToQueue}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 truncate">{song.title}</h3>
        <p className="text-gray-600 truncate">{song.artist}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTime(song.duration)}</span>
          </div>
          <div className="font-bold text-purple-600">
            {formatCurrency(song.price)}
          </div>
        </div>
      </div>
    </div>
  );
};