import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, Lock, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const signUpSchema = z.object({
  restaurantName: z.string().min(2, 'Restaurant name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      restaurantName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await signup(data.email, data.phone, data.password, data.restaurantName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing your restaurant orders"
      showBackButton
      backTo="/login"
      backText="Already have an account? Log in"
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
          label="Restaurant Name"
          icon={<Store size={18} />}
          placeholder="Your restaurant name"
          {...register('restaurantName')}
          error={errors.restaurantName?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Email Address"
          type="email"
          icon={<Mail size={18} />}
          placeholder="your@email.com"
          {...register('email')}
          error={errors.email?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Phone Number"
          type="tel"
          icon={<Phone size={18} />}
          placeholder="e.g., 1234567890"
          {...register('phone')}
          error={errors.phone?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Password"
          type="password"
          icon={<Lock size={18} />}
          placeholder="Create a password"
          {...register('password')}
          error={errors.password?.message}
          disabled={isLoading}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          icon={<Lock size={18} />}
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
        />
        
        <div className="flex items-start">
          <input
            id="acceptTerms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1"
            {...register('acceptTerms')}
            disabled={isLoading}
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
            I accept the <Link to="/terms" className="text-primary-600 hover:text-primary-500">Terms and Conditions</Link>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-error-600 mt-1">{errors.acceptTerms.message}</p>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;