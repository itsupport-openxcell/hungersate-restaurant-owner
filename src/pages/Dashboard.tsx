import { useState, useEffect } from 'react';
import { BarChart3, PackageCheck, Clock, History, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';

interface OrderStats {
  totalRequests: number;
  totalOngoing: number;
  completedToday: number;
  totalRevenue: number;
  comparedToYesterday: number;
  recentOrders: {
    id: string;
    customer: string;
    items: number;
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'delivered';
    createdAt: Date;
  }[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get dashboard data
    const fetchDashboardData = async () => {
      try {
        // For demo purposes, simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockStats: OrderStats = {
          totalRequests: 12,
          totalOngoing: 8,
          completedToday: 15,
          totalRevenue: 1250.75,
          comparedToYesterday: 12.5,
          recentOrders: [
            {
              id: 'ORD-001',
              customer: 'John Doe',
              items: 3,
              total: 38.95,
              status: 'pending',
              createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            },
            {
              id: 'ORD-002',
              customer: 'Jane Smith',
              items: 2,
              total: 27.50,
              status: 'preparing',
              createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            },
            {
              id: 'ORD-003',
              customer: 'Bob Johnson',
              items: 5,
              total: 65.75,
              status: 'ready',
              createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
            },
            {
              id: 'ORD-004',
              customer: 'Alice Brown',
              items: 1,
              total: 15.25,
              status: 'delivered',
              createdAt: new Date(Date.now() - 90 * 60 * 1000), // 90 minutes ago
            },
          ],
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'preparing':
        return 'bg-accent-100 text-accent-800';
      case 'ready':
        return 'bg-success-100 text-success-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout title="Dashboard">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>New Order Requests</span>
                  <PackageCheck className="h-5 w-5 text-primary-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats?.totalRequests || 0}</div>
                <p className="text-sm text-gray-500">Awaiting confirmation</p>
              </CardContent>
              <CardFooter>
                <Link to="/order-requests" className="text-primary-600 text-sm font-medium hover:text-primary-800 flex items-center">
                  View requests <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>Ongoing Orders</span>
                  <Clock className="h-5 w-5 text-secondary-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats?.totalOngoing || 0}</div>
                <p className="text-sm text-gray-500">Orders in progress</p>
              </CardContent>
              <CardFooter>
                <Link to="/ongoing-orders" className="text-secondary-600 text-sm font-medium hover:text-secondary-800 flex items-center">
                  Manage orders <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>Completed Today</span>
                  <History className="h-5 w-5 text-success-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats?.completedToday || 0}</div>
                <p className="text-sm text-gray-500">Orders delivered</p>
              </CardContent>
              <CardFooter>
                <Link to="/order-history" className="text-success-600 text-sm font-medium hover:text-success-800 flex items-center">
                  View history <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>Today's Revenue</span>
                  <BarChart3 className="h-5 w-5 text-accent-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{formatCurrency(stats?.totalRevenue || 0)}</div>
                <div className="flex items-center">
                  <TrendingUp className={`h-4 w-4 mr-1 ${stats?.comparedToYesterday && stats.comparedToYesterday > 0 ? 'text-success-500' : 'text-error-500'}`} />
                  <p className={`text-sm ${stats?.comparedToYesterday && stats.comparedToYesterday > 0 ? 'text-success-600' : 'text-error-600'}`}>
                    {stats?.comparedToYesterday ? `${stats.comparedToYesterday}%` : '0%'} vs yesterday
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest order activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Items</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.items}</td>
                          <td className="py-3 px-4">{formatCurrency(order.total)}</td>
                          <td className="py-3 px-4">{formatTime(order.createdAt)}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 px-6 py-4">
                <Button variant="outline" size="sm" className="ml-auto">
                  View All Orders
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;