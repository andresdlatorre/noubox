import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX,
  ChevronUp,
  ChevronDown,
  Music
} from 'lucide-react';
import useAppStore from '../../store';
import { formatTime } from '../../lib/utils';
import { Button } from '../ui/Button';

export const NowPlaying: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    pauseSong, 
    resumeSong, 
    skipSong,
    isPlayerExpanded,
    togglePlayerExpand
  } = useAppStore();
  
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  // Update progress bar for current song
  useEffect(() => {
    if (!currentSong || !isPlaying) return;
    
    let interval: number;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.1;
          if (newProgress >= currentSong.duration) {
            clearInterval(interval);
            skipSong();
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentSong, isPlaying, skipSong]);
  
  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white h-16 flex items-center px-4">
        <div className="flex items-center justify-center w-full space-x-2 text-gray-400">
          <Music className="h-5 w-5" />
          <span>No song playing</span>
        </div>
      </div>
    );
  }
  
  const progressPercent = Math.min((progress / currentSong.duration) * 100, 100);
  
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white transition-all duration-300 shadow-lg z-10 ${
        isPlayerExpanded ? 'h-80' : 'h-20'
      }`}
    >
      <button 
        className="absolute top-0 right-4 transform -translate-y-full bg-gray-900 text-white p-1 rounded-t-md"
        onClick={togglePlayerExpand}
      >
        {isPlayerExpanded ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronUp className="h-5 w-5" />
        )}
      </button>
      
      <div className="container mx-auto px-4 h-full flex flex-col">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-700">
          <div 
            className="h-full bg-purple-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Minimal player (always visible) */}
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded overflow-hidden">
                <img 
                  src={currentSong.coverArt} 
                  alt={currentSong.title}
                  className="h-full w-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-bold">{currentSong.title}</h3>
                <p className="text-sm text-gray-400">{currentSong.artist}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                {formatTime(progress)} / {formatTime(currentSong.duration)}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-gray-700"
                  onClick={isPlaying ? pauseSong : resumeSong}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-gray-700"
                  onClick={skipSong}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Expanded player content */}
          {isPlayerExpanded && (
            <div className="flex-1 py-4 flex flex-col md:flex-row">
              <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                <div className="w-40 h-40 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={currentSong.coverArt} 
                    alt={currentSong.title}
                    className="h-full w-full object-cover" 
                  />
                </div>
              </div>
              
              <div className="md:w-2/3 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-1">{currentSong.title}</h2>
                <p className="text-lg text-gray-300 mb-4">{currentSong.artist}</p>
                
                {currentSong.album && (
                  <p className="text-gray-400 mb-2">
                    Album: {currentSong.album}
                  </p>
                )}
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-gray-700"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setVolume(value);
                          if (value === 0) {
                            setIsMuted(true);
                          } else if (isMuted) {
                            setIsMuted(false);
                          }
                        }}
                        className="appearance-none w-full h-full bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${isMuted ? 0 : volume}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="text-xs px-2 py-1 bg-purple-900 rounded-full">
                      {currentSong.genre}
                    </div>
                    <div className="text-xs px-2 py-1 bg-purple-900 rounded-full">
                      {currentSong.releaseYear}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};