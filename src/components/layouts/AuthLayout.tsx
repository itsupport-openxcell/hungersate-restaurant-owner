import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: string;
  backText?: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backTo = '/login',
  backText = 'Back to Login',
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <Utensils className="h-10 w-10 text-primary-600" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
        {showBackButton && (
          <div className="mt-6 text-center">
            <Link
              to={backTo}
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              {backText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;