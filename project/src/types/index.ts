export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  credits?: number;
  isAdmin?: boolean;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverArt: string;
  duration: number;
  price: number;
  genre?: string;
  releaseYear?: number;
}

export interface QueueItem {
  id: string;
  songId: string;
  userId: string;
  timestamp: number;
  status: 'pending' | 'playing' | 'completed';
}

export interface Venue {
  id: string;
  name: string;
  logo?: string;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'venue_credit';
  label: string;
  icon: string;
}

export interface Transaction {
  id: string;
  userId: string;
  songId: string;
  amount: number;
  timestamp: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
}