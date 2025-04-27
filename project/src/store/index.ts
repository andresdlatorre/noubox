import { create } from 'zustand';
import { Song, QueueItem, User, Venue } from '../types';
import { mockSongs, mockUsers, mockVenue } from './mockData';

interface AppState {
  // Authentication
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Songs and Queue
  songs: Song[];
  queue: QueueItem[];
  currentSong: Song | null;
  isPlaying: boolean;
  addSong: (song: Song) => Promise<boolean>;
  updateSong: (id: string, song: Partial<Song>) => Promise<boolean>;
  deleteSong: (id: string) => Promise<boolean>;
  addToQueue: (songId: string) => Promise<boolean>;
  skipSong: () => void;
  playSong: (songId: string) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  
  // User Management
  updateUserCredits: (userId: string, amount: number) => Promise<boolean>;
  mockUsers: User[]; // Temporary for admin demo
  
  // Venue
  venue: Venue | null;
  
  // UI State
  isPlayerExpanded: boolean;
  togglePlayerExpand: () => void;
  isUserMenuOpen: boolean;
  toggleUserMenu: () => void;
  activeView: 'browse' | 'queue' | 'profile' | 'admin';
  setActiveView: (view: 'browse' | 'queue' | 'profile' | 'admin') => void;
}

// This would be replaced with actual API calls in production
const useAppStore = create<AppState>((set, get) => ({
  // Authentication
  currentUser: null,
  isAuthenticated: false,
  login: async (email, password) => {
    // Mock login - would be replaced with actual auth
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  register: async (name, email, password) => {
    // Mock registration
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) return false;
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 10),
      name,
      email,
      credits: 0
    };
    
    mockUsers.push(newUser);
    set({ currentUser: newUser, isAuthenticated: true });
    return true;
  },
  logout: () => {
    set({ currentUser: null, isAuthenticated: false, isUserMenuOpen: false });
  },
  
  // Songs and Queue
  songs: mockSongs,
  queue: [],
  currentSong: null,
  isPlaying: false,
  addSong: async (song) => {
    set(state => ({
      songs: [...state.songs, { ...song, id: Math.random().toString(36).substring(2, 10) }]
    }));
    return true;
  },
  updateSong: async (id, songUpdate) => {
    set(state => ({
      songs: state.songs.map(song => 
        song.id === id ? { ...song, ...songUpdate } : song
      )
    }));
    return true;
  },
  deleteSong: async (id) => {
    set(state => ({
      songs: state.songs.filter(song => song.id !== id)
    }));
    return true;
  },
  addToQueue: async (songId) => {
    const { currentUser, songs } = get();
    if (!currentUser) return false;
    
    const song = songs.find(s => s.id === songId);
    if (!song) return false;
    
    // In a real app, this would include payment processing
    const newQueueItem: QueueItem = {
      id: Math.random().toString(36).substring(2, 10),
      songId,
      userId: currentUser.id,
      timestamp: Date.now(),
      status: 'pending'
    };
    
    set(state => ({
      queue: [...state.queue, newQueueItem]
    }));
    
    return true;
  },
  skipSong: () => {
    const { queue, songs } = get();
    if (queue.length > 0) {
      const nextItem = queue[0];
      const nextSong = songs.find(s => s.id === nextItem.songId);
      
      set(state => ({
        currentSong: nextSong || null,
        isPlaying: !!nextSong,
        queue: state.queue.slice(1)
      }));
    } else {
      set({ currentSong: null, isPlaying: false });
    }
  },
  playSong: (songId) => {
    const { songs } = get();
    const song = songs.find(s => s.id === songId);
    if (song) {
      set({ currentSong: song, isPlaying: true });
    }
  },
  pauseSong: () => {
    set({ isPlaying: false });
  },
  resumeSong: () => {
    set({ isPlaying: true });
  },
  
  // User Management
  updateUserCredits: async (userId, amount) => {
    set(state => {
      // Update current user if it's them
      const updatedCurrentUser = state.currentUser && state.currentUser.id === userId
        ? {
            ...state.currentUser,
            credits: (state.currentUser.credits || 0) + amount
          }
        : state.currentUser;
      
      // Update mockUsers for admin interface
      const updatedMockUsers = state.mockUsers.map(user => 
        user.id === userId
          ? { ...user, credits: (user.credits || 0) + amount }
          : user
      );
      
      return {
        currentUser: updatedCurrentUser,
        mockUsers: updatedMockUsers
      };
    });
    
    return true;
  },
  mockUsers, // Temporary for admin demo
  
  // Venue
  venue: mockVenue,
  
  // UI State
  isPlayerExpanded: false,
  togglePlayerExpand: () => {
    set(state => ({ isPlayerExpanded: !state.isPlayerExpanded }));
  },
  isUserMenuOpen: false,
  toggleUserMenu: () => {
    set(state => ({ isUserMenuOpen: !state.isUserMenuOpen }));
  },
  activeView: 'browse',
  setActiveView: (view) => {
    set({ activeView: view });
  }
}));

export default useAppStore;