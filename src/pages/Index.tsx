
'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories } from '@/data/products';

const Index = () => {
  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-grocery-50 via-white to-grocery-100 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Fresh Groceries
                  <span className="block text-grocery-600">
                    Delivered in 60min
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  Get your favorite fresh produce, pantry essentials, and quality products 
                  delivered right to your doorstep. Fast, fresh, and convenient.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/shop">
                    <Button size="lg" className="bg-grocery-600 hover:bg-grocery-700 w-full sm:w-auto">
                      Start Shopping
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-slide-up">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop"
                    alt="Fresh groceries"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <Clock className="h-8 w-8 text-grocery-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose FreshExpress?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering the freshest products with unmatched convenience and reliability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-grocery-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-grocery-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">60-Minute Delivery</h3>
                  <p className="text-gray-600">
                    Get your groceries delivered in 60 minutes or less, guaranteed.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-grocery-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-grocery-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Quality Guaranteed</h3>
                  <p className="text-gray-600">
                    Fresh, high-quality products sourced from trusted local suppliers.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-grocery-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-grocery-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Free Delivery</h3>
                  <p className="text-gray-600">
                    Free delivery on orders over R900. No hidden fees or charges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-gray-600">
                Discover our wide range of fresh products and pantry essentials.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/shop?category=${category.id}`}
                  className="group"
                >
                  <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                    <CardContent className="p-4 text-center">
                      <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <h3 className="font-semibold text-sm group-hover:text-grocery-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {category.productCount} items
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/shop">
                <Button variant="outline" size="lg">
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Check out our most popular and freshest products this week.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/shop">
                <Button size="lg" className="bg-grocery-600 hover:bg-grocery-700">
                  Shop All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-grocery-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-grocery-100 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who trust FreshExpress for their grocery needs. 
              Fresh products, fast delivery, guaranteed quality.
            </p>
            <Link to="/shop">
              <Button size="lg" variant="secondary">
                Start Shopping Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
