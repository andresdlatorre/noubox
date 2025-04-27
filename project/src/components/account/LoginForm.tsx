import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, KeyRound, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import useAppStore from '../../store';

export const LoginForm: React.FC = () => {
  const { login } = useAppStore();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/browse');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your jukebox account</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium">
            Create one
          </Link>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500 mb-2">Demo credentials:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <p><strong>Regular User:</strong></p>
            <p>Email: john@example.com</p>
            <p>Password: password</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p><strong>Admin:</strong></p>
            <p>Email: admin@venue.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;