import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const loginSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await login(data.phone, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your restaurant dashboard"
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
          placeholder="e.g., 1234567890"
          {...register('phone')}
          error={errors.phone?.message}
          disabled={isLoading}
        />
        
        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            icon={<Lock size={18} />}
            placeholder="Enter your password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isLoading}
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isLoading}
        >
          Log In
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;