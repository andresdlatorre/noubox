import React from 'react';
import { Navigate } from 'react-router-dom';
import { Music } from 'lucide-react';
import { RegisterForm } from '../../components/account/RegisterForm';
import useAppStore from '../../store';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAppStore();
  
  if (isAuthenticated) {
    return <Navigate to="/browse" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 flex justify-center">
        <div className="bg-purple-700 rounded-full p-3 inline-flex">
          <Music className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;