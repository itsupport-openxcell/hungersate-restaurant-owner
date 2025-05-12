import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone } from 'lucide-react';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const forgotPasswordSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await requestPasswordReset(data.phone);
      // Navigation is handled in the requestPasswordReset function
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset request failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="We'll send a code to reset your password"
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
        <Input
          label="Phone Number"
          type="tel"
          icon={<Phone size={18} />}
          placeholder="Enter your registered phone number"
          {...register('phone')}
          error={errors.phone?.message}
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isLoading}
        >
          Send Reset Code
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          For demo purposes, any phone number will work,<br />
          and the OTP will be 123456.
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;