import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Music, 
  AlertCircle, 
  X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { formatTime, formatCurrency } from '../../lib/utils';
import useAppStore from '../../store';
import { Dialog } from '@headlessui/react';
import { Song } from '../../types';

const SongManagement: React.FC = () => {
  const { songs, addSong, updateSong, deleteSong } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [deletingSongId, setDeletingSongId] = useState<string | null>(null);
  
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
  
  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setIsEditModalOpen(true);
  };
  
  const handleDelete = (songId: string) => {
    setDeletingSongId(songId);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = async () => {
    if (deletingSongId) {
      await deleteSong(deletingSongId);
      setIsDeleteModalOpen(false);
      setDeletingSongId(null);
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Song Management</h1>
          <p className="text-gray-600">Manage your jukebox catalog</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Song
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
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
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Song
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artist
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Album
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSongs.map(song => (
                <tr key={song.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded overflow-hidden mr-3">
                        <img 
                          src={song.coverArt} 
                          alt={song.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="font-medium text-gray-900">
                        {song.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {song.artist}
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {song.album || '—'}
                  </td>
                  <td className="px-4 py-4">
                    {song.genre && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {song.genre}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {formatTime(song.duration)}
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {formatCurrency(song.price)}
                  </td>
                  <td className="px-4 py-4 text-right text-sm space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-blue-600"
                      onClick={() => handleEdit(song)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => handleDelete(song.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSongs.length === 0 && (
            <div className="text-center py-12">
              <Music className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No songs found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search filters</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t text-sm text-gray-500">
          Showing {filteredSongs.length} of {songs.length} songs
        </div>
      </div>
      
      {/* Add/Edit Song Modal would go here */}
      <Dialog 
        open={isAddModalOpen || isEditModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setEditingSong(null);
        }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg max-w-xl w-full mx-auto">
            <div className="absolute top-3 right-3">
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setEditingSong(null);
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <Dialog.Title as="h3" className="text-xl font-bold mb-6">
                {isAddModalOpen ? 'Add New Song' : 'Edit Song'}
              </Dialog.Title>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      type="text"
                      defaultValue={editingSong?.title || ''}
                      placeholder="Song title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Artist
                    </label>
                    <Input
                      type="text"
                      defaultValue={editingSong?.artist || ''}
                      placeholder="Artist name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Album
                    </label>
                    <Input
                      type="text"
                      defaultValue={editingSong?.album || ''}
                      placeholder="Album name (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Genre
                    </label>
                    <Input
                      type="text"
                      defaultValue={editingSong?.genre || ''}
                      placeholder="Genre"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (seconds)
                    </label>
                    <Input
                      type="number"
                      defaultValue={editingSong?.duration || ''}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input
                        type="number"
                        defaultValue={editingSong?.price || ''}
                        step="0.01"
                        min="0.01"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Release Year
                    </label>
                    <Input
                      type="number"
                      defaultValue={editingSong?.releaseYear || ''}
                      placeholder="YYYY"
                      min="1900"
                      max="2100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Art URL
                    </label>
                    <Input
                      type="url"
                      defaultValue={editingSong?.coverArt || ''}
                      placeholder="https://..."
                      required
                    />
                  </div>
                </div>
                
                {editingSong?.coverArt && (
                  <div className="border p-4 rounded-lg flex items-center space-x-4 bg-gray-50">
                    <div className="w-16 h-16 rounded overflow-hidden">
                      <img 
                        src={editingSong.coverArt} 
                        alt={editingSong.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Current Cover Image</p>
                      <p className="text-xs text-gray-500">URL will be updated if you change it above</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setIsEditModalOpen(false);
                      setEditingSong(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isAddModalOpen ? 'Add Song' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog 
        open={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 rounded-full p-2 mr-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                  Delete Song?
                </Dialog.Title>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this song? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button"
                  variant="secondary"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SongManagement;