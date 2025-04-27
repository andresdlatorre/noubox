import React, { useState } from 'react';
import { CreditCard, Wallet, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatCurrency } from '../../lib/utils';
import useAppStore from '../../store';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'venue_credit';

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  onSuccess, 
  onCancel 
}) => {
  const { currentUser, updateUserCredits } = useAppStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const hasEnoughCredit = currentUser?.credits && currentUser.credits >= amount;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // In real app, this would make a payment API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (selectedMethod === 'venue_credit') {
        await updateUserCredits(currentUser!.id, -amount);
      }
      
      setIsLoading(false);
      onSuccess();
    } catch (err) {
      setError('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Payment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Amount to pay</div>
        <div className="text-2xl font-bold text-purple-700">{formatCurrency(amount)}</div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Payment Method</div>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className={`border rounded-lg p-3 flex flex-col items-center justify-center transition-colors ${
              selectedMethod === 'credit_card' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod('credit_card')}
          >
            <CreditCard className={`h-6 w-6 mb-1 ${
              selectedMethod === 'credit_card' ? 'text-purple-500' : 'text-gray-400'
            }`} />
            <span className="text-sm">Card</span>
          </button>
          
          <button
            type="button"
            className={`border rounded-lg p-3 flex flex-col items-center justify-center transition-colors ${
              selectedMethod === 'paypal' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod('paypal')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-6 w-6 mb-1 ${
                selectedMethod === 'paypal' ? 'text-purple-500' : 'text-gray-400'
              }`}
            >
              <path d="M7 11l5-5a5 5 0 0 1 7.54.54L19 7a5 5 0 0 1-7.54-.54L12 7" />
              <path d="M3 17a5 5 0 0 1 5-5h8.09A1.91 1.91 0 0 1 18 14l-5.33 5.29A1.91 1.91 0 0 1 11 19a5 5 0 0 1-5-5" />
            </svg>
            <span className="text-sm">PayPal</span>
          </button>
          
          <button
            type="button"
            disabled={!hasEnoughCredit}
            className={`border rounded-lg p-3 flex flex-col items-center justify-center transition-colors ${
              !hasEnoughCredit 
                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                : selectedMethod === 'venue_credit' 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => hasEnoughCredit && setSelectedMethod('venue_credit')}
          >
            <Wallet className={`h-6 w-6 mb-1 ${
              !hasEnoughCredit 
                ? 'text-gray-300' 
                : selectedMethod === 'venue_credit' 
                  ? 'text-purple-500' 
                  : 'text-gray-400'
            }`} />
            <span className="text-sm">Credit</span>
            {currentUser?.credits !== undefined && (
              <span className="text-xs mt-1">
                {formatCurrency(currentUser.credits)}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {selectedMethod === 'credit_card' && (
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
              {isLoading ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
            </Button>
          </div>
        </form>
      )}
      
      {selectedMethod === 'paypal' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              You'll be redirected to PayPal to complete your payment.
            </p>
            
            <div className="flex justify-end space-x-3 pt-2">
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
                {isLoading ? 'Redirecting...' : 'Continue to PayPal'}
              </Button>
            </div>
          </div>
        </form>
      )}
      
      {selectedMethod === 'venue_credit' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-3">
              <span className="text-gray-700">Available Credit:</span>
              <span className="font-bold">{formatCurrency(currentUser?.credits || 0)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-700">Payment Amount:</span>
              <span className="font-bold text-purple-700">- {formatCurrency(amount)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-gray-700">Remaining Balance:</span>
              <span className="font-bold">{formatCurrency((currentUser?.credits || 0) - amount)}</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
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
              {isLoading ? 'Processing...' : 'Confirm Payment'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;