import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  Edit, 
  Trash, 
  AlertCircle, 
  X,
  CreditCard
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { formatCurrency } from '../../lib/utils';
import useAppStore from '../../store';
import { Dialog } from '@headlessui/react';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const { mockUsers } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });
  
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };
  
  const handleAddCredits = (user: User) => {
    setEditingUser(user);
    setIsAddCreditsModalOpen(true);
  };
  
  const handleDelete = (userId: string) => {
    setDeletingUserId(userId);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = async () => {
    if (deletingUserId) {
      // Delete user logic
      setIsDeleteModalOpen(false);
      setDeletingUserId(null);
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users and their accounts</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Type
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-purple-200 flex items-center justify-center">
                            <span className="text-sm font-bold text-purple-800">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 font-medium">
                    {formatCurrency(user.credits || 0)}
                  </td>
                  <td className="px-4 py-4">
                    {user.isAdmin ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        User
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-sm space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-green-600"
                      onClick={() => handleAddCredits(user)}
                    >
                      <CreditCard className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-blue-600"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No users found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t text-sm text-gray-500">
          Showing {filteredUsers.length} of {mockUsers.length} users
        </div>
      </div>

      {/* Edit User Modal */}
      <Dialog 
        open={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
            <div className="absolute top-3 right-3">
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingUser(null);
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <Dialog.Title as="h3" className="text-xl font-bold mb-6">
                Edit User
              </Dialog.Title>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    type="text"
                    defaultValue={editingUser?.name || ''}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    defaultValue={editingUser?.email || ''}
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    defaultChecked={editingUser?.isAdmin}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
                    Admin Privileges
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingUser(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
      
      {/* Add Credits Modal */}
      <Dialog 
        open={isAddCreditsModalOpen} 
        onClose={() => {
          setIsAddCreditsModalOpen(false);
          setEditingUser(null);
        }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
            <div className="absolute top-3 right-3">
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setIsAddCreditsModalOpen(false);
                  setEditingUser(null);
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <Dialog.Title as="h3" className="text-xl font-bold mb-6">
                Add Credits for {editingUser?.name}
              </Dialog.Title>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Current Balance:</span>
                  <span className="font-bold">{formatCurrency(editingUser?.credits || 0)}</span>
                </div>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount to Add
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <Input
                      type="number"
                      defaultValue="10"
                      min="0.01"
                      step="0.01"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Reason for adding credits"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddCreditsModalOpen(false);
                      setEditingUser(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Credits
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
                  Delete User?
                </Dialog.Title>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this user account? This action cannot be undone and all associated data will be lost.
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

export default UserManagement;