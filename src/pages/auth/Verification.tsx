import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import OtpInput from '../../components/ui/OtpInput';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const Verification = () => {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Start countdown timer
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      await verifyOtp(otp);
      // Navigation is handled in the verifyOtp function
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      
      // Simulate OTP resend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset countdown
      setTimeLeft(30);
      setError(null);
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  const goBack = () => {
    navigate('/signup');
  };

  return (
    <AuthLayout
      title="Verify Your Phone"
      subtitle="We've sent a 6-digit code to your phone"
      showBackButton
      backTo="/signup"
      backText="Back to Sign Up"
    >
      {error && (
        <Alert
          variant="error"
          message={error}
          className="mb-6"
        />
      )}
      
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Enter the 6-digit code we sent to your phone number
          </p>
          <p className="text-sm font-medium text-gray-800">
            For demo purposes, enter: 123456
          </p>
        </div>
        
        <OtpInput
          length={6}
          value={otp}
          onChange={setOtp}
          disabled={isLoading}
          className="my-8"
        />
        
        <Button
          type="button"
          className="w-full"
          onClick={handleVerify}
          isLoading={isLoading}
        >
          Verify Phone Number
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Didn't receive a code?{' '}
            {timeLeft > 0 ? (
              <span className="text-gray-500">
                Resend in {timeLeft}s
              </span>
            ) : (
              <button
                type="button"
                className="font-medium text-primary-600 hover:text-primary-500"
                onClick={handleResendOtp}
                disabled={isResending}
              >
                {isResending ? 'Resending...' : 'Resend Code'}
              </button>
            )}
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Verification;