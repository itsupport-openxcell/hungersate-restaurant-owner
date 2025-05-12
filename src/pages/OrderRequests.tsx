import { useState, useEffect } from 'react';
import { Clock, Check, X, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';

interface OrderRequest {
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
  total: number;
  createdAt: Date;
  estimatedTime: number; // in minutes
}

const OrderRequests = () => {
  const [orderRequests, setOrderRequests] = useState<OrderRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderIds, setExpandedOrderIds] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call to get order requests
    const fetchOrderRequests = async () => {
      try {
        // For demo purposes, simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockOrderRequests: OrderRequest[] = [
          {
            id: 'REQ-001',
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
            total: 26.95,
            createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
            estimatedTime: 30,
          },
          {
            id: 'REQ-002',
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
            total: 16.47,
            createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            estimatedTime: 25,
          },
          {
            id: 'REQ-003',
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
            total: 28.95,
            createdAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
            estimatedTime: 35,
          },
        ];
        
        setOrderRequests(mockOrderRequests);
      } catch (error) {
        console.error('Error fetching order requests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrderRequests();
  }, []);

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

  const handleAcceptOrder = (orderId: string) => {
    // In a real app, this would make an API call
    // For demo, just remove the order from the list
    setOrderRequests(prev => prev.filter(order => order.id !== orderId));
    
    // Show a success notification (in a real app)
    alert(`Order ${orderId} accepted successfully!`);
  };

  const handleRejectOrder = (orderId: string) => {
    // In a real app, this would make an API call
    // For demo, just remove the order from the list
    setOrderRequests(prev => prev.filter(order => order.id !== orderId));
    
    // Show a success notification (in a real app)
    alert(`Order ${orderId} rejected.`);
  };

  return (
    <DashboardLayout title="Order Requests">
      <div className="space-y-4">
        {isLoading ? (
          // Loading state
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-48 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : orderRequests.length === 0 ? (
          // Empty state
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="bg-primary-50 p-3 rounded-full">
                <PackageCheck className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No order requests</h3>
              <p className="text-gray-500 max-w-sm">
                You don't have any new order requests at the moment. New orders will appear here.
              </p>
            </div>
          </Card>
        ) : (
          // Order requests list
          orderRequests.map(order => (
            <Card key={order.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      Order {order.id}
                      <span className="ml-3 text-sm font-normal text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Received at {formatTime(order.createdAt)}
                      </span>
                    </h3>
                    <p className="text-gray-700 mt-1">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • {formatCurrency(order.total)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      icon={<X className="h-4 w-4" />}
                      onClick={() => handleRejectOrder(order.id)}
                    >
                      Reject
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      icon={<Check className="h-4 w-4" />}
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="bg-gray-100 p-1 rounded-full mr-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                    </div>
                    Est. Preparation: {order.estimatedTime} mins
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="bg-gray-100 p-1 rounded-full mr-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                    </div>
                    {order.customer.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="bg-gray-100 p-1 rounded-full mr-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                    </div>
                    {order.customer.address}
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
                  <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-700">Item</th>
                        <th className="text-center py-2 font-medium text-gray-700">Qty</th>
                        <th className="text-right py-2 font-medium text-gray-700">Price</th>
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
                          <td className="text-right py-3">{formatCurrency(item.price)}</td>
                          <td className="text-right py-3">{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="text-right pt-3 font-medium">Total</td>
                        <td className="text-right pt-3 font-bold">{formatCurrency(order.total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

// To prevent TypeScript error due to missing PackageCheck component
const PackageCheck = (props: any) => <div {...props} />;

export default OrderRequests;