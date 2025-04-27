import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Music, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import useAppStore from '../store';

const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navItems = [
    { 
      path: '/admin', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: '/admin/songs', 
      label: 'Songs', 
      icon: <Music className="h-5 w-5" /> 
    },
    { 
      path: '/admin/users', 
      label: 'Users', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      path: '/admin/settings', 
      label: 'Settings', 
      icon: <Settings className="h-5 w-5" /> 
    }
  ];
  
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 rounded-md bg-white shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 bg-white shadow-md transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center space-x-3 border-b">
            <div className="bg-purple-600 rounded-md p-2">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Modern Jukebox</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    (location.pathname === item.path || 
                    (item.path !== '/admin' && location.pathname.startsWith(item.path)))
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full bg-purple-200 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-800">
                      {currentUser?.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">{currentUser?.name}</div>
                <div className="text-xs text-gray-500">{currentUser?.email}</div>
              </div>
            </div>
            
            <button
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;