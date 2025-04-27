import React from 'react';
import { SongGrid } from '../../components/music/SongGrid';

const BrowsePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-24">
      <SongGrid />
    </div>
  );
};

export default BrowsePage;