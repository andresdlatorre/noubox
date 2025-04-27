import React, { useState } from 'react';
import { 
  Music, 
  Settings, 
  Palette, 
  Save
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import useAppStore from '../../store';

const VenueSettings: React.FC = () => {
  const { venue } = useAppStore();
  const [venueName, setVenueName] = useState(venue?.name || 'Modern Jukebox');
  const [logoUrl, setLogoUrl] = useState(venue?.logo || '');
  const [primaryColor, setPrimaryColor] = useState(venue?.theme?.primaryColor || '#8A2BE2');
  const [secondaryColor, setSecondaryColor] = useState(venue?.theme?.secondaryColor || '#FFD700');
  const [accentColor, setAccentColor] = useState(venue?.theme?.accentColor || '#FF4500');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save venue settings logic would go here
    
    // Mock success message
    alert("Venue settings updated successfully!");
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Venue Settings</h1>
          <p className="text-gray-600">Customize your jukebox experience</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-purple-600" />
                  Basic Settings
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue Name
                    </label>
                    <Input
                      type="text"
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo URL
                    </label>
                    <Input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Square image recommended (at least 400x400px)
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Welcome Message
                    </label>
                    <textarea
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                      rows={3}
                      placeholder="Welcome message to display to your users"
                      defaultValue="Welcome to our venue! Browse and queue your favorite songs."
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-purple-600" />
                  Appearance
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primary Color
                      </label>
                      <div className="flex">
                        <div 
                          className="w-10 h-10 rounded border border-gray-300"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <Input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="ml-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Secondary Color
                      </label>
                      <div className="flex">
                        <div 
                          className="w-10 h-10 rounded border border-gray-300"
                          style={{ backgroundColor: secondaryColor }}
                        />
                        <Input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="ml-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Accent Color
                      </label>
                      <div className="flex">
                        <div 
                          className="w-10 h-10 rounded border border-gray-300"
                          style={{ backgroundColor: accentColor }}
                        />
                        <Input
                          type="text"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="ml-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium flex items-center">
                  <Music className="h-5 w-5 mr-2 text-purple-600" />
                  Jukebox Settings
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Song Price
                    </label>
                    <div className="relative w-1/3">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input
                        type="number"
                        defaultValue="1.99"
                        min="0.01"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="allowRequests"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="allowRequests" className="font-medium text-gray-700">
                        Allow Song Requests
                      </label>
                      <p className="text-gray-500">
                        Enable users to request songs that are not in your catalog
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="adminApproval"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="adminApproval" className="font-medium text-gray-700">
                        Require Admin Approval
                      </label>
                      <p className="text-gray-500">
                        Songs must be approved by an admin before being added to the queue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <Button 
                type="submit"
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-medium mb-6">Preview</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-md flex items-center justify-center mr-3"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-lg font-bold" style={{ color: primaryColor }}>
                    {venueName}
                  </div>
                </div>
                
                <div 
                  className="w-full h-12 rounded flex items-center justify-center mb-4"
                  style={{ backgroundColor: secondaryColor }}
                >
                  <span className="text-white font-medium">Button Example</span>
                </div>
                
                <div 
                  className="text-sm py-2 px-3 rounded inline-block"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  Accent Text Example
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Color Scheme Preview
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div 
                    className="h-20 rounded flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary
                  </div>
                  <div 
                    className="h-20 rounded flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Secondary
                  </div>
                  <div 
                    className="h-20 rounded flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: accentColor }}
                  >
                    Accent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSettings;