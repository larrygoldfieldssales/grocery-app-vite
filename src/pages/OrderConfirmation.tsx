
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Order } from '@/types';
import { STORAGE_KEYS, getFromStorage } from '@/lib/localStorage';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Get order from localStorage
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    const foundOrder = orders.find(o => o.id === orderId);
    
    if (!foundOrder) {
      navigate('/');
      return;
    }

    setOrder(foundOrder);
  }, [orderId, navigate]);

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const estimatedDelivery = new Date(new Date(order.createdAt).getTime() + 60 * 60 * 1000);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">
                Thank you for your order. We're preparing your groceries now.
              </p>
            </div>

            {/* Order Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Order #{order.id.replace('order_', '')}</p>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">R{order.total.toFixed(2)}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        R{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R{(order.total - order.deliveryFee).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {order.deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `R${order.deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-grocery-600" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">
                    {order.checkoutForm.firstName} {order.checkoutForm.lastName}
                  </p>
                  <p className="text-gray-600">{order.checkoutForm.address}</p>
                  <p className="text-gray-600">
                    {order.checkoutForm.city}, {order.checkoutForm.postalCode}
                  </p>
                  <p className="text-gray-600">{order.checkoutForm.phone}</p>
                </div>
                
                {order.checkoutForm.deliveryInstructions && (
                  <div>
                    <p className="font-medium text-sm">Delivery Instructions:</p>
                    <p className="text-gray-600 text-sm">
                      {order.checkoutForm.deliveryInstructions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Status */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-grocery-600" />
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-grocery-50 rounded-lg">
                  <Package className="h-8 w-8 text-grocery-600" />
                  <div>
                    <p className="font-medium text-grocery-800">
                      Your order is being prepared  
                    </p>
                    <p className="text-sm text-grocery-600">
                      Estimated delivery: {estimatedDelivery.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/shop" className="block">
                <Button size="lg" className="w-full bg-grocery-600 hover:bg-grocery-700">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="text-center mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                Questions about your order?
              </p>
              <p className="text-sm">
                Contact our support team at{' '}
                <a href="mailto:support@freshexpress.com" className="text-grocery-600 hover:underline">
                  support@freshexpress.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default OrderConfirmation;
