import { Song, User, Venue } from '../types';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    coverArt: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 355,
    price: 2.99,
    genre: 'Rock',
    releaseYear: 1975
  },
  {
    id: '2',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    coverArt: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 294,
    price: 1.99,
    genre: 'Pop',
    releaseYear: 1982
  },
  {
    id: '3',
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    album: 'Appetite for Destruction',
    coverArt: 'https://images.pexels.com/photos/4344260/pexels-photo-4344260.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 356,
    price: 2.49,
    genre: 'Rock',
    releaseYear: 1987
  },
  {
    id: '4',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    coverArt: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 183,
    price: 1.49,
    genre: 'Pop',
    releaseYear: 1971
  },
  {
    id: '5',
    title: 'Superstition',
    artist: 'Stevie Wonder',
    album: 'Talking Book',
    coverArt: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 269,
    price: 1.99,
    genre: 'Funk',
    releaseYear: 1972
  },
  {
    id: '6',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverArt: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 200,
    price: 2.99,
    genre: 'Pop',
    releaseYear: 2020
  },
  {
    id: '7',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    coverArt: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 391,
    price: 2.49,
    genre: 'Rock',
    releaseYear: 1976
  },
  {
    id: '8',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷',
    coverArt: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 233,
    price: 2.99,
    genre: 'Pop',
    releaseYear: 2017
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    credits: 15.99
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600',
    credits: 8.49
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@venue.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    credits: 100,
    isAdmin: true
  }
];

export const mockVenue: Venue = {
  id: '1',
  name: 'Groove Lounge',
  logo: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
  theme: {
    primaryColor: '#8A2BE2', // Purple
    secondaryColor: '#FFD700', // Gold
    accentColor: '#FF4500'    // OrangeRed
  }
};