'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product?.price || '0');
  const originalPrice = parseFloat(product?.regular_price || product?.price || '0');
  const discountPercentage = originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const imageUrl = product?.images?.[0]?.src || '/placeholder.jpg';
  const inStock = product?.stock_status   === 'instock';

  return (
    <a href={product?.permalink} target="_blank" rel="noopener noreferrer">
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={imageUrl}
              alt={product?.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {discountPercentage > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2 z-10"
              >
                -{discountPercentage}%
              </Badge>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold line-clamp-2 text-sm group-hover:text-grocery-600 transition-colors">
                {product?.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs font-medium text-yellow-600">
                ★ {parseFloat(product?.average_rating || '0').toFixed(1)}
              </span>
              <span className="text-xs text-gray-500">({product?.rating_count})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-lg">R{price.toFixed(2)}</span>
              {originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  R{originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* View Product Button */}
            <Button
              size="sm"
              className="w-full bg-grocery-600 hover:bg-grocery-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
