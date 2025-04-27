import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Headphones, CreditCard, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import useAppStore from '../../store';

const HomePage: React.FC = () => {
  const { isAuthenticated, venue } = useAppStore();
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-800 to-indigo-700 text-white">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200')"
          }}
        />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your favorite music, on demand
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Welcome to {venue?.name || 'Modern Jukebox'}, where you control the playlist. 
              Browse our extensive catalog and queue your favorite songs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/browse">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                  Browse Music
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <Music className="h-8 w-8 text-purple-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Browse Songs</h3>
            <p className="text-gray-600">
              Explore our collection of songs from various genres and artists.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-purple-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Pay & Queue</h3>
            <p className="text-gray-600">
              Add your favorite songs to the queue with a small fee or using your credits.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <Headphones className="h-8 w-8 text-purple-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Enjoy the Music</h3>
            <p className="text-gray-600">
              Watch your song move up the queue and play through our sound system.
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Songs */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Popular Songs</h2>
          <p className="text-center text-gray-600 mb-12">
            The most requested tracks at {venue?.name || 'our venue'}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useAppStore.getState().songs.slice(0, 4).map(song => (
              <div key={song.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                <div className="aspect-square relative">
                  <img 
                    src={song.coverArt} 
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-bold truncate">{song.title}</h3>
                    <p className="text-white/80 text-sm truncate">{song.artist}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/browse">
              <Button>See All Songs</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials/Venue Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Venue" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
              <h2 className="text-3xl font-bold mb-4">About Our Venue</h2>
              <p className="mb-6 text-purple-100">
                {venue?.name || 'Modern Jukebox'} offers a unique experience where you control the music.
                Bring your friends, enjoy drinks, and create the perfect soundtrack for your night out.
              </p>
              <div className="flex items-center mb-6">
                <Users className="h-5 w-5 text-amber-400 mr-2" />
                <span>Join us tonight! We're open until 2AM</span>
              </div>
              <Link to="/register">
                <Button variant="secondary" className="self-start">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;