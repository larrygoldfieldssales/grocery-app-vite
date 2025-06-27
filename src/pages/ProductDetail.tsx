
'use client';

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Shield, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getCartItem, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const cartItem = getCartItem(id || '');

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/shop')}>
              Back to Shop
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

//     async function handleAddToCart(productId: string) {
//   try {
//     await cartApi.addToCart(productId, 1, 99.99);
//     // Refresh cart state or UI
//   } catch (error) {
//     // Error already handled by the API function
//   }
// }
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (change: number) => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + change);
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discountPercentage > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-4 left-4 z-10"
                  >
                    -{discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  R{product?.price?.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    R{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {product.unit}
                </span>
              </div>

              {/* Stock Status */}
              <div>
                {product.inStock ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              {product.inStock && (
                <div className="space-y-4">
                  {cartItem ? (
                    <div className="flex items-center gap-4">
                      <span className="font-medium">In Cart:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={cartItem.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium min-w-[40px] text-center">
                          {cartItem.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium min-w-[40px] text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        onClick={handleAddToCart}
                        size="lg"
                        className="flex-1 bg-grocery-600 hover:bg-grocery-700"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart - R{(product.price * quantity).toFixed(2)}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Clock className="h-6 w-6 text-grocery-600 mx-auto mb-2" />
                  <p className="text-xs font-medium">60min Delivery</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Shield className="h-6 w-6 text-grocery-600 mx-auto mb-2" />
                  <p className="text-xs font-medium">Quality Guaranteed</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Truck className="h-6 w-6 text-grocery-600 mx-auto mb-2" />
                  <p className="text-xs font-medium">Free Delivery</p>
                </div>
              </div>

              {/* Product Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Details</h3>
                  <div className="space-y-2 text-sm">
                    {product.brand && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{product.brand}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit:</span>
                      <span className="font-medium">{product.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{product.category}</span>
                    </div>
                    <Separator />
                    <p className="text-gray-600 pt-2">
                      {product.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
