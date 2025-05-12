import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/ui/Input';
import OtpInput from '../../components/ui/OtpInput';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      await resetPassword(otp, data.password);
      // Navigation is handled in the resetPassword function
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the verification code and create a new password"
      showBackButton
      backTo="/login"
      backText="Back to Login"
    >
      {error && (
        <Alert
          variant="error"
          message={error}
          className="mb-6"
        />
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <OtpInput
            length={6}
            value={otp}
            onChange={setOtp}
            disabled={isLoading}
          />
          <p className="text-sm text-gray-500">
            Enter the 6-digit code sent to your phone
          </p>
          <p className="text-sm font-medium text-center mt-2 text-gray-800">
            For demo purposes, enter: 123456
          </p>
        </div>
        
        <Input
          label="New Password"
          type="password"
          icon={<Lock size={18} />}
          placeholder="Create a new password"
          {...register('password')}
          error={errors.password?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          icon={<Lock size={18} />}
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isLoading}
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;