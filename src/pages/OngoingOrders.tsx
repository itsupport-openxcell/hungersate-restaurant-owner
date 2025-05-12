import { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle, Timer, Truck, ArrowRight, Search,
  ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatCurrency } from '../lib/utils';

interface OngoingOrder {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
  }[];
  status: 'preparing' | 'ready' | 'out_for_delivery';
  total: number;
  createdAt: Date;
  estimatedCompletion: Date;
}

const OngoingOrders = () => {
  const [orders, setOrders] = useState<OngoingOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OngoingOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderIds, setExpandedOrderIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call to get ongoing orders
    const fetchOngoingOrders = async () => {
      try {
        // For demo purposes, simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockOrders: OngoingOrder[] = [
          {
            id: 'ORD-001',
            customer: {
              name: 'John Doe',
              phone: '123-456-7890',
              address: '123 Main St, Anytown',
            },
            items: [
              { id: 'item-1', name: 'Margherita Pizza', quantity: 1, price: 12.99 },
              { id: 'item-2', name: 'Garlic Bread', quantity: 2, price: 4.99 },
              { id: 'item-3', name: 'Cola', quantity: 2, price: 1.99 },
            ],
            status: 'preparing',
            total: 26.95,
            createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            estimatedCompletion: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
          },
          {
            id: 'ORD-002',
            customer: {
              name: 'Jane Smith',
              phone: '234-567-8901',
              address: '456 Oak Ave, Somewhere',
            },
            items: [
              { id: 'item-4', name: 'Veggie Burger', quantity: 1, price: 9.99, specialInstructions: 'No onions please' },
              { id: 'item-5', name: 'French Fries', quantity: 1, price: 3.99 },
              { id: 'item-6', name: 'Lemonade', quantity: 1, price: 2.49 },
            ],
            status: 'ready',
            total: 16.47,
            createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
            estimatedCompletion: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago (ready for pickup)
          },
          {
            id: 'ORD-003',
            customer: {
              name: 'Robert Johnson',
              phone: '345-678-9012',
              address: '789 Pine St, Elsewhere',
            },
            items: [
              { id: 'item-7', name: 'Chicken Curry', quantity: 1, price: 14.99 },
              { id: 'item-8', name: 'Naan Bread', quantity: 2, price: 2.99 },
              { id: 'item-9', name: 'Mango Lassi', quantity: 2, price: 3.99 },
            ],
            status: 'out_for_delivery',
            total: 28.95,
            createdAt: new Date(Date.now() - 60 * 60 * 1000), // 60 minutes ago
            estimatedCompletion: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now (delivery)
          },
        ];
        
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching ongoing orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOngoingOrders();
  }, []);

  useEffect(() => {
    // Apply filters whenever orders, searchQuery, or statusFilter changes
    let result = orders;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(result);
  }, [orders, searchQuery, statusFilter]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'preparing':
        return {
          label: 'Preparing',
          icon: <Timer className="h-5 w-5" />,
          color: 'text-accent-600 bg-accent-100',
          actionLabel: 'Mark as Ready',
          nextStatus: 'ready',
        };
      case 'ready':
        return {
          label: 'Ready for Pickup',
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'text-success-600 bg-success-100',
          actionLabel: 'Mark as Delivered',
          nextStatus: 'delivered',
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          icon: <Truck className="h-5 w-5" />,
          color: 'text-warning-600 bg-warning-100',
          actionLabel: 'Mark as Delivered',
          nextStatus: 'delivered',
        };
      default:
        return {
          label: 'Unknown',
          icon: <AlertTriangle className="h-5 w-5" />,
          color: 'text-gray-600 bg-gray-100',
          actionLabel: 'Update Status',
          nextStatus: 'unknown',
        };
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    if (newStatus === 'delivered') {
      // For demo, just remove the order from the list
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } else {
      // Update the status
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus as any } : order
        )
      );
    }
    
    // Show a success notification (in a real app)
    alert(`Order ${orderId} status updated to ${newStatus}!`);
  };

  const isPastDue = (date: Date) => {
    return date < new Date();
  };

  return (
    <DashboardLayout title="Ongoing Orders">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by order ID or customer name"
          icon={<Search size={18} />}
          className="w-full sm:w-auto sm:min-w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="flex-grow flex justify-end gap-2">
          <Button
            variant={statusFilter === 'all' ? 'primary' : 'outline'}
            onClick={() => setStatusFilter('all')}
            className="whitespace-nowrap"
          >
            All Orders
          </Button>
          <Button
            variant={statusFilter === 'preparing' ? 'primary' : 'outline'}
            onClick={() => setStatusFilter('preparing')}
            className="whitespace-nowrap"
            icon={<Timer className="h-4 w-4" />}
          >
            Preparing
          </Button>
          <Button
            variant={statusFilter === 'ready' ? 'primary' : 'outline'}
            onClick={() => setStatusFilter('ready')}
            className="whitespace-nowrap"
            icon={<CheckCircle className="h-4 w-4" />}
          >
            Ready
          </Button>
          <Button
            variant={statusFilter === 'out_for_delivery' ? 'primary' : 'outline'}
            onClick={() => setStatusFilter('out_for_delivery')}
            className="whitespace-nowrap"
            icon={<Truck className="h-4 w-4" />}
          >
            Delivering
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          // Loading state
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-48 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          // Empty state
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="bg-primary-50 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No ongoing orders</h3>
              <p className="text-gray-500 max-w-sm">
                {searchQuery || statusFilter !== 'all' 
                  ? 'No orders match your current filters. Try adjusting your search criteria.'
                  : 'You don\'t have any ongoing orders at the moment.'}
              </p>
            </div>
          </Card>
        ) : (
          // Ongoing orders list
          filteredOrders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            const isLate = isPastDue(order.estimatedCompletion) && order.status !== 'ready';
            
            return (
              <Card key={order.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-1">{statusInfo.label}</span>
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1">
                        {order.customer.name} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • {formatCurrency(order.total)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                      <Button 
                        variant="primary" 
                        size="sm"
                        icon={<ArrowRight className="h-4 w-4" />}
                        onClick={() => updateOrderStatus(order.id, statusInfo.nextStatus)}
                      >
                        {statusInfo.actionLabel}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-sm">
                        <div className="bg-gray-100 p-1 rounded-full mr-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Ordered at {formatTime(order.createdAt)}
                        </span>
                      </div>
                      
                      <div className={`flex items-center text-sm ${isLate ? 'text-error-600' : 'text-gray-700'}`}>
                        <div className={`p-1 rounded-full mr-2 ${isLate ? 'bg-error-100' : 'bg-gray-100'}`}>
                          <Timer className={`h-4 w-4 ${isLate ? 'text-error-600' : 'text-gray-600'}`} />
                        </div>
                        {isLate ? (
                          <span>Past due! Expected by {formatTime(order.estimatedCompletion)}</span>
                        ) : (
                          <span>Est. completion by {formatTime(order.estimatedCompletion)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    className="mt-4 flex items-center text-sm font-medium text-primary-600"
                    onClick={() => toggleExpandOrder(order.id)}
                  >
                    {isOrderExpanded(order.id) ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        View order details
                      </>
                    )}
                  </button>
                </div>
                
                {isOrderExpanded(order.id) && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 font-medium text-gray-700">Item</th>
                              <th className="text-center py-2 font-medium text-gray-700">Qty</th>
                              <th className="text-right py-2 font-medium text-gray-700">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map(item => (
                              <tr key={item.id} className="border-b border-gray-100">
                                <td className="py-3">
                                  <div>
                                    <span className="font-medium">{item.name}</span>
                                    {item.specialInstructions && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Note: {item.specialInstructions}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center py-3">{item.quantity}</td>
                                <td className="text-right py-3">{formatCurrency(item.price * item.quantity)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={2} className="text-right pt-3 font-medium">Total</td>
                              <td className="text-right pt-3 font-bold">{formatCurrency(order.total)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Name</p>
                            <p className="text-sm text-gray-900">{order.customer.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Phone</p>
                            <p className="text-sm text-gray-900">{order.customer.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Address</p>
                            <p className="text-sm text-gray-900">{order.customer.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default OngoingOrders;