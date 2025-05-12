import React from 'react';
import { useState, useEffect } from 'react';
import { Search, CalendarRange, ChevronDown, ChevronUp, DownloadCloud } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatCurrency } from '../lib/utils';

interface HistoryOrder {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'completed' | 'cancelled';
  completedAt: Date;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<HistoryOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<HistoryOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrderIds, setExpandedOrderIds] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call to get order history
    const fetchOrderHistory = async () => {
      try {
        // For demo purposes, simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate dates
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        // Mock data
        const mockOrders: HistoryOrder[] = [
          {
            id: 'ORD-001',
            customer: {
              name: 'John Doe',
              phone: '123-456-7890',
            },
            items: [
              { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
              { name: 'Garlic Bread', quantity: 2, price: 4.99 },
              { name: 'Cola', quantity: 2, price: 1.99 },
            ],
            total: 26.95,
            status: 'completed',
            completedAt: new Date(today.setHours(today.getHours() - 2)),
          },
          {
            id: 'ORD-002',
            customer: {
              name: 'Jane Smith',
              phone: '234-567-8901',
            },
            items: [
              { name: 'Veggie Burger', quantity: 1, price: 9.99 },
              { name: 'French Fries', quantity: 1, price: 3.99 },
              { name: 'Lemonade', quantity: 1, price: 2.49 },
            ],
            total: 16.47,
            status: 'completed',
            completedAt: yesterday,
          },
          {
            id: 'ORD-003',
            customer: {
              name: 'Robert Johnson',
              phone: '345-678-9012',
            },
            items: [
              { name: 'Chicken Curry', quantity: 1, price: 14.99 },
              { name: 'Naan Bread', quantity: 2, price: 2.99 },
              { name: 'Mango Lassi', quantity: 2, price: 3.99 },
            ],
            total: 28.95,
            status: 'completed',
            completedAt: yesterday,
          },
          {
            id: 'ORD-004',
            customer: {
              name: 'Sarah Williams',
              phone: '456-789-0123',
            },
            items: [
              { name: 'Fish and Chips', quantity: 1, price: 13.99 },
              { name: 'Coleslaw', quantity: 1, price: 2.99 },
              { name: 'Iced Tea', quantity: 1, price: 1.99 },
            ],
            total: 18.97,
            status: 'cancelled',
            completedAt: twoDaysAgo,
          },
          {
            id: 'ORD-005',
            customer: {
              name: 'Michael Brown',
              phone: '567-890-1234',
            },
            items: [
              { name: 'Spaghetti Carbonara', quantity: 1, price: 11.99 },
              { name: 'Garlic Bread', quantity: 1, price: 3.99 },
              { name: 'Tiramisu', quantity: 1, price: 5.99 },
              { name: 'Water', quantity: 1, price: 0.99 },
            ],
            total: 22.96,
            status: 'completed',
            completedAt: lastWeek,
          },
        ];
        
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    // Apply filters whenever orders, searchQuery, dateFilter, or statusFilter changes
    let result = orders;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query)
      );
    }
    
    // Apply date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    
    if (dateFilter === 'today') {
      result = result.filter(order => {
        const orderDate = new Date(order.completedAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });
    } else if (dateFilter === 'yesterday') {
      result = result.filter(order => {
        const orderDate = new Date(order.completedAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === yesterday.getTime();
      });
    } else if (dateFilter === 'this_week') {
      result = result.filter(order => {
        const orderDate = new Date(order.completedAt);
        return orderDate >= thisWeekStart && orderDate <= today;
      });
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(result);
  }, [orders, searchQuery, dateFilter, statusFilter]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderIds(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  const isOrderExpanded = (orderId: string) => {
    return expandedOrderIds.includes(orderId);
  };

  const exportOrders = () => {
    // In a real app, this would generate a CSV or PDF file
    alert('In a real app, this would download order history data as CSV or PDF');
  };

  return (
    <DashboardLayout title="Order History">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by order ID or customer name"
            icon={<Search size={18} />}
            className="w-full sm:w-auto sm:min-w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="flex-grow flex justify-end">
            <Button
              variant="outline"
              icon={<DownloadCloud size={18} />}
              onClick={exportOrders}
            >
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={dateFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('all')}
          >
            All Time
          </Button>
          <Button
            variant={dateFilter === 'today' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('today')}
          >
            Today
          </Button>
          <Button
            variant={dateFilter === 'yesterday' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('yesterday')}
          >
            Yesterday
          </Button>
          <Button
            variant={dateFilter === 'this_week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('this_week')}
          >
            This Week
          </Button>
          
          <div className="border-l border-gray-300 mx-2"></div>
          
          <Button
            variant={statusFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All Status
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={statusFilter === 'cancelled' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('cancelled')}
          >
            Cancelled
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order History</span>
            <span className="text-sm font-normal text-gray-500">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            // Loading state
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            // Empty state
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CalendarRange className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery || dateFilter !== 'all' || statusFilter !== 'all'
                  ? 'No orders match your current filters. Try adjusting your search criteria.'
                  : 'You don\'t have any completed orders in your history yet.'}
              </p>
            </div>
          ) : (
            // Order history list
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Order ID</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Customer</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Date</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-700">Total</th>
                    <th className="py-3 px-4 text-center font-medium text-gray-700">Status</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <React.Fragment key={order.id}>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium">{order.id}</td>
                        <td className="py-4 px-4">{order.customer.name}</td>
                        <td className="py-4 px-4">{formatDate(order.completedAt)}</td>
                        <td className="py-4 px-4 text-right">{formatCurrency(order.total)}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' 
                              ? 'bg-success-100 text-success-800' 
                              : 'bg-error-100 text-error-800'
                          }`}>
                            {order.status === 'completed' ? 'Completed' : 'Cancelled'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            className="text-primary-600 hover:text-primary-800 flex items-center justify-end"
                            onClick={() => toggleExpandOrder(order.id)}
                          >
                            {isOrderExpanded(order.id) ? (
                              <>
                                Hide <ChevronUp className="h-4 w-4 ml-1" />
                              </>
                            ) : (
                              <>
                                Details <ChevronDown className="h-4 w-4 ml-1" />
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                      {isOrderExpanded(order.id) && (
                        <tr className="bg-gray-50">
                          <td colSpan={6} className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Order Items</h4>
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-gray-200">
                                      <th className="text-left py-2 px-2 font-medium text-gray-700">Item</th>
                                      <th className="text-center py-2 px-2 font-medium text-gray-700">Qty</th>
                                      <th className="text-right py-2 px-2 font-medium text-gray-700">Price</th>
                                      <th className="text-right py-2 px-2 font-medium text-gray-700">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.items.map((item, index) => (
                                      <tr key={index} className="border-b border-gray-100">
                                        <td className="py-2 px-2">{item.name}</td>
                                        <td className="py-2 px-2 text-center">{item.quantity}</td>
                                        <td className="py-2 px-2 text-right">{formatCurrency(item.price)}</td>
                                        <td className="py-2 px-2 text-right">{formatCurrency(item.price * item.quantity)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td colSpan={3} className="py-2 px-2 text-right font-medium">Total</td>
                                      <td className="py-2 px-2 text-right font-bold">{formatCurrency(order.total)}</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Customer Information</h4>
                                <p className="text-sm"><span className="font-medium">Name:</span> {order.customer.name}</p>
                                <p className="text-sm"><span className="font-medium">Phone:</span> {order.customer.phone}</p>
                                <div className="mt-4">
                                  <h4 className="font-medium mb-2">Order Timeline</h4>
                                  <div className="text-sm space-y-2">
                                    <div className="flex items-start">
                                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-success-500 mt-1"></div>
                                      <div className="ml-2">
                                        <p className="font-medium">Order {order.status === 'completed' ? 'Completed' : 'Cancelled'}</p>
                                        <p className="text-gray-500">{formatDate(order.completedAt)}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default OrderHistory;