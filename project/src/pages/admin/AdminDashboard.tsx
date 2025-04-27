import React from 'react';
import { 
  BarChart, 
  Music, 
  Users, 
  CreditCard, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import useAppStore from '../../store';

const AdminDashboard: React.FC = () => {
  const { songs, venue } = useAppStore();
  
  // Mock data for dashboard
  const todayEarnings = 129.99;
  const totalSongs = songs.length;
  const activeUsers = 24;
  const queuedSongs = 5;
  
  // Mock data for charts
  const popularSongs = [...songs]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(song => ({
      ...song,
      plays: Math.floor(Math.random() * 50) + 1
    }));
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin!</p>
        </div>
        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center mt-2 md:mt-0">
          <Music className="h-4 w-4 mr-2" />
          {venue?.name || 'Modern Jukebox'}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Today's Earnings</h3>
            <div className="bg-green-100 rounded-full p-2">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(todayEarnings)}</div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+12.5% from yesterday</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Songs</h3>
            <div className="bg-purple-100 rounded-full p-2">
              <Music className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalSongs}</div>
          <div className="mt-2 flex items-center text-sm text-purple-600">
            <span>+3 new this week</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
            <div className="bg-blue-100 rounded-full p-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{activeUsers}</div>
          <div className="mt-2 flex items-center text-sm text-blue-600">
            <span>5 currently in venue</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Songs in Queue</h3>
            <div className="bg-amber-100 rounded-full p-2">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{queuedSongs}</div>
          <div className="mt-2 flex items-center text-sm text-amber-600">
            <span>~15 minutes remaining</span>
          </div>
        </div>
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Most Popular Songs</h2>
          
          <div>
            {popularSongs.map((song, index) => (
              <div 
                key={song.id} 
                className="flex items-center mb-4 last:mb-0"
              >
                <div className="w-8 h-8 flex-shrink-0 mr-4 font-bold text-gray-400 flex items-center justify-center">
                  {index + 1}
                </div>
                
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={song.coverArt} 
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="ml-3 flex-grow">
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-gray-500">{song.artist}</div>
                </div>
                
                <div className="flex items-center">
                  <div className="font-medium mr-4">{song.plays} plays</div>
                  <div 
                    className="bg-gray-200 w-24 h-3 rounded-full overflow-hidden"
                    title={`${song.plays} plays`}
                  >
                    <div 
                      className="bg-purple-500 h-full"
                      style={{ width: `${(song.plays / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              className="text-purple-600 text-sm font-medium hover:text-purple-800"
              onClick={() => window.location.href = '/admin/songs'}
            >
              View All Songs
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Revenue Overview</h2>
          
          {/* Simple bar chart */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {Array.from({ length: 7 }).map((_, i) => {
              const height = Math.floor(Math.random() * 80) + 20;
              const day = new Date();
              day.setDate(day.getDate() - 6 + i);
              const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-purple-500 rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                  <div className="mt-2 text-xs text-gray-600">{dayName}</div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div>
              <div className="text-gray-600 text-sm">Total this week</div>
              <div className="text-xl font-bold">{formatCurrency(1249.99)}</div>
            </div>
            
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+18.2% vs. last week</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => {
                const randomSong = songs[Math.floor(Math.random() * songs.length)];
                const randomMinutes = Math.floor(Math.random() * 60);
                const randomName = ['John', 'Sarah', 'Mike', 'Emily', 'David'][Math.floor(Math.random() * 5)];
                const activities = ['Played song', 'Added to queue', 'Purchased credits', 'Registered'];
                const randomActivity = activities[Math.floor(Math.random() * activities.length)];
                
                return (
                  <tr key={i}>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {randomMinutes} {randomMinutes === 1 ? 'minute' : 'minutes'} ago
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-600">
                            {randomName.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {randomName}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {randomActivity}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {randomActivity.includes('song') 
                        ? `"${randomSong.title}" by ${randomSong.artist}`
                        : randomActivity.includes('credits')
                          ? formatCurrency(Math.floor(Math.random() * 20) + 5)
                          : 'New account'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;