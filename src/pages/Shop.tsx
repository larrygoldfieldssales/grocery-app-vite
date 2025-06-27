'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';



import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const API_URL = import.meta.env.VITE_API_URL;
const AUTH = `consumer_key=${import.meta.env.VITE_WC_KEY}&consumer_secret=${import.meta.env.VITE_WC_SECRET}`;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch categories
    fetch(`${API_URL}/products/categories?${AUTH}`)
      .then(res => res.json())
      .then(data => setCategories(data.filter((cat: any) => cat.count > 0)));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      setIsLoading(true);

      const categoryQuery = selectedCategories.map(id => `category=${id}`).join('&');
      const priceQuery = `min_price=${priceRange[0]}&max_price=${priceRange[1]}`;
      const sortQuery = (() => {
        switch (sortBy) {
          case 'price-low': return 'orderby=price&order=asc';
          case 'price-high': return 'orderby=price&order=desc';
          case 'name': return 'orderby=title&order=asc';
          default: return 'orderby=popularity';
        }
      })();
      const searchParam = searchQuery ? `search=${encodeURIComponent(searchQuery)}` : '';
      const pagination = `per_page=12&page=${page}`;

      const url = `${API_URL}/products?${[
        AUTH,
        categoryQuery,
        priceQuery,
        sortQuery,
        searchParam,
        pagination
      ].filter(Boolean).join('&')}`;

      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        const total = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
        setProducts(data);
        setTotalPages(total);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [searchQuery, selectedCategories, sortBy, priceRange, page]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategories([categoryId]);
    setPage(1);
    navigate(`/shop?category=${categoryId}`);
  };

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('popular');
    setPriceRange([0, 1000]);
    setPage(1);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={String(category.id)}
                checked={selectedCategories.includes(String(category.id))}
                onCheckedChange={() => handleCategoryToggle(String(category.id))}
              />
              <label htmlFor={String(category.id)} className="text-sm cursor-pointer">
                {category.name} ({category.count})
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-20"
          />
          <span>-</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-20"
          />
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={clearFilters}>Clear Filters</Button>
    </div>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-600 mb-6">Discover and shop products</p>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-6"><FilterContent /></div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-64">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                <FilterContent />
              </div>
            </aside>
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <LoadingSpinner size="lg" />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters.</p>
                  <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {/* Pagination */}
                  <div className="flex justify-center mt-8 gap-4 items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                    <span className="text-sm">Page {page} of {totalPages}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={page === totalPages}
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
