import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to={isAuthenticated ? '/dashboard' : '/login'}>
        <Button icon={<Home className="h-5 w-5" />}>
          Go back to {isAuthenticated ? 'Dashboard' : 'Login'}
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;