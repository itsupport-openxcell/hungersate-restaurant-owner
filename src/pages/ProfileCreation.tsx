import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Mail, Store, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/layouts/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const profileSchema = z.object({
  restaurantName: z.string().min(2, 'Restaurant name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'Zip code is required'),
  openingTime: z.string().min(1, 'Opening time is required'),
  closingTime: z.string().min(1, 'Closing time is required'),
  description: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileCreation = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      restaurantName: user?.restaurantName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
      city: '',
      state: '',
      zip: '',
      openingTime: '08:00',
      closingTime: '22:00',
      description: '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      // Update profile
      await updateProfile({
        ...data,
        hasProfile: true,
      });
      
      setSuccess('Profile created successfully! You will be redirected to the dashboard.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile creation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Complete Your Profile"
      subtitle="Before you can start managing orders, please provide your restaurant details"
    >
      {error && (
        <Alert
          variant="error"
          message={error}
          className="mb-6"
        />
      )}
      
      {success && (
        <Alert
          variant="success"
          message={success}
          className="mb-6"
        />
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Information</CardTitle>
            <CardDescription>Basic details about your restaurant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Operating Hours
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Opening Time"
                  type="time"
                  icon={<Clock size={18} />}
                  {...register('openingTime')}
                  error={errors.openingTime?.message}
                  disabled={isLoading}
                />
                
                <Input
                  label="Closing Time"
                  type="time"
                  icon={<Clock size={18} />}
                  {...register('closingTime')}
                  error={errors.closingTime?.message}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Description
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                placeholder="Briefly describe your restaurant, cuisine type, specialties, etc."
                {...register('description')}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>Where your restaurant is located</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Street Address"
              icon={<MapPin size={18} />}
              placeholder="123 Main St"
              {...register('address')}
              error={errors.address?.message}
              disabled={isLoading}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                placeholder="City"
                {...register('city')}
                error={errors.city?.message}
                disabled={isLoading}
              />
              
              <Input
                label="State"
                placeholder="State"
                {...register('state')}
                error={errors.state?.message}
                disabled={isLoading}
              />
            </div>
            
            <Input
              label="Zip Code"
              placeholder="12345"
              {...register('zip')}
              error={errors.zip?.message}
              disabled={isLoading}
            />
          </CardContent>
        </Card>
        
        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isLoading}
        >
          Complete Profile
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ProfileCreation;