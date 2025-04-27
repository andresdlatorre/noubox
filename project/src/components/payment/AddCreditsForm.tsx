import React, { useState } from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatCurrency } from '../../lib/utils';
import useAppStore from '../../store';

interface AddCreditsFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddCreditsForm: React.FC<AddCreditsFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const { currentUser, updateUserCredits } = useAppStore();
  const [amount, setAmount] = useState(10);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const predefinedAmounts = [5, 10, 20, 50];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // In real app, this would make a payment API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (currentUser) {
        await updateUserCredits(currentUser.id, amount);
      }
      
      setIsLoading(false);
      onSuccess();
    } catch (err) {
      setError('Transaction failed. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Add Credits</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Select amount</div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {predefinedAmounts.map((value) => (
            <button
              key={value}
              type="button"
              className={`border rounded-lg p-3 text-center transition-colors ${
                amount === value 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setAmount(value)}
            >
              {formatCurrency(value)}
            </button>
          ))}
        </div>
        
        <div>
          <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Custom amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              id="customAmount"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Payment Method</div>
        <div className="border rounded-lg p-3 flex items-center border-purple-500 bg-purple-50">
          <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
          <span>Credit Card</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            required
          />
        </div>
        
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card
          </label>
          <Input
            id="cardName"
            type="text"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                setExpiryDate(value);
              }}
              required
              maxLength={5}
            />
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <Input
              id="cvv"
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              required
              maxLength={3}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : `Add ${formatCurrency(amount)}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCreditsForm;