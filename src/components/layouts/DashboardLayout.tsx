import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageCheck, 
  Timer, 
  History, 
  LogOut, 
  Menu, 
  X,
  Utensils,
  User
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/dashboard',
    },
    {
      title: 'Order Requests',
      icon: <PackageCheck className="h-5 w-5" />,
      path: '/order-requests',
    },
    {
      title: 'Ongoing Orders',
      icon: <Timer className="h-5 w-5" />,
      path: '/ongoing-orders',
    },
    {
      title: 'Order History',
      icon: <History className="h-5 w-5" />,
      path: '/order-history',
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="fixed hidden h-full w-64 bg-white border-r border-gray-200 shadow-sm md:block">
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center">
            <Utensils className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">Foodie</span>
          </Link>
        </div>
        <nav className="mt-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <User className="h-8 w-8 text-gray-500 p-1 bg-gray-100 rounded-full" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.restaurantName || 'Restaurant Name'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            icon={<LogOut className="h-4 w-4" />}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center">
          <Utensils className="h-6 w-6 text-primary-600" />
          <span className="ml-2 text-lg font-semibold text-gray-900">Foodie</span>
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-sm">
          <nav className="py-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-700'
                    : 'text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 w-full"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Log Out</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="md:pl-64 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 md:pt-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;