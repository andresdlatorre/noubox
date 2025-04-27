import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { SongCard } from './SongCard';
import { Input } from '../ui/Input';
import { Song } from '../../types';
import useAppStore from '../../store';

export const SongGrid: React.FC = () => {
  const { songs } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Get unique genres from songs
  const genres = Array.from(new Set(songs.map(song => song.genre).filter(Boolean)));
  
  // Filter songs based on search query and selected genre
  const filteredSongs = songs.filter(song => {
    const matchesSearch = !searchQuery || 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = !selectedGenre || song.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Music</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search songs or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="relative md:w-48">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={selectedGenre || ''}
              onChange={(e) => setSelectedGenre(e.target.value || null)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredSongs.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
      
      {filteredSongs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No songs found.</p>
        </div>
      )}
    </div>
  );
};