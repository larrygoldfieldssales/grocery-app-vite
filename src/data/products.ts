
import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop',
    productCount: 24
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
    productCount: 32
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop',
    productCount: 18
  },
  {
    id: 'snacks',
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=200&fit=crop',
    productCount: 15
  },
  {
    id: 'bakery',
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
    productCount: 12
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop',
    productCount: 20
  }
];

export const products: Product[] = [
  // Fruits
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Sweet and ripe organic bananas, perfect for breakfast or snacking.',
    price: 54.99,
    originalPrice: 64.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    category: 'fruits',
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    unit: 'per bunch',
    brand: 'Nature\'s Best'
  },
  {
    id: '2',
    name: 'Red Apples',
    description: 'Crispy and juicy red apples, great for eating fresh or baking.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
    category: 'fruits',
    inStock: true,
    rating: 4.7,
    reviewCount: 95,
    unit: 'per kg',
    brand: 'Fresh Valley'
  },
  {
    id: '3',
    name: 'Strawberries',
    description: 'Sweet and fresh strawberries, perfect for desserts and smoothies.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop',
    category: 'fruits',
    inStock: true,
    rating: 4.8,
    reviewCount: 203,
    unit: 'per punnet',
    brand: 'Berry Fresh'
  },
  {
    id: '4',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice, 100% pure with no added sugar.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
    category: 'fruits',
    inStock: true,
    rating: 4.6,
    reviewCount: 87,
    unit: '1L bottle',
    brand: 'Citrus Gold'
  },

  // Vegetables
  {
    id: '5',
    name: 'Fresh Spinach',
    description: 'Organic baby spinach leaves, perfect for salads and cooking.',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    category: 'vegetables',
    inStock: true,
    rating: 4.4,
    reviewCount: 76,
    unit: 'per bag',
    brand: 'Green Garden'
  },
  {
    id: '6',
    name: 'Roma Tomatoes',
    description: 'Vine-ripened Roma tomatoes, ideal for cooking and sauces.',
    price: 84.99,
    image: 'https://images.unsplash.com/photo-1546470427-e7f2e1e2fb52?w=400&h=400&fit=crop',
    category: 'vegetables',
    inStock: true,
    rating: 4.3,
    reviewCount: 112,
    unit: 'per kg',
    brand: 'Vine Fresh'
  },
  {
    id: '7',
    name: 'Carrots',
    description: 'Sweet and crunchy carrots, great for snacking and cooking.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
    category: 'vegetables',
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
    unit: 'per bag',
    brand: 'Garden Fresh'
  },
  {
    id: '8',
    name: 'Bell Peppers Mix',
    description: 'Colorful mix of red, yellow, and green bell peppers.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop',
    category: 'vegetables',
    inStock: true,
    rating: 4.6,
    reviewCount: 67,
    unit: 'per pack',
    brand: 'Rainbow Veggies'
  },

  // Beverages
  {
    id: '9',
    name: 'Sparkling Water',
    description: 'Refreshing sparkling water with natural minerals.',
    price: 36.99,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop',
    category: 'beverages',
    inStock: true,
    rating: 4.2,
    reviewCount: 156,
    unit: '500ml bottle',
    brand: 'Crystal Springs'
  },
  {
    id: '10',
    name: 'Rooibos Tea',
    description: 'Premium South African Rooibos tea bags, naturally caffeine-free.',
    price: 169.99,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
    category: 'beverages',
    inStock: true,
    rating: 4.7,
    reviewCount: 94,
    unit: '20 tea bags',
    brand: 'Cape Tea'
  },
  {
    id: '11',
    name: 'Fresh Milk',
    description: 'Fresh whole milk from local farms, rich and creamy.',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1550583724-b1ac75ef8f9d?w=400&h=400&fit=crop',
    category: 'beverages',
    inStock: true,
    rating: 4.5,
    reviewCount: 178,
    unit: '1L carton',
    brand: 'Farm Fresh'
  },
  {
    id: '12',
    name: 'Energy Drink',
    description: 'Natural energy drink with vitamins and caffeine.',
    price: 52.99,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
    category: 'beverages',
    inStock: true,
    rating: 4.1,
    reviewCount: 143,
    unit: '250ml can',
    brand: 'Power Boost'
  },

  // Snacks
  {
    id: '13',
    name: 'Mixed Nuts',
    description: 'Premium mix of almonds, cashews, and walnuts.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=400&fit=crop',
    category: 'snacks',
    inStock: true,
    rating: 4.8,
    reviewCount: 87,
    unit: '500g pack',
    brand: 'Nutty Delights'
  },
  {
    id: '14',
    name: 'Potato Chips',
    description: 'Crunchy potato chips with sea salt, perfect for snacking.',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
    category: 'snacks',
    inStock: true,
    rating: 4.3,
    reviewCount: 201,
    unit: '150g bag',
    brand: 'Crispy Crunch'
  },
  {
    id: '15',
    name: 'Rusks',
    description: 'Traditional South African beskuit, perfect with coffee or tea.',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop',
    category: 'snacks',
    inStock: true,
    rating: 4.6,
    reviewCount: 134,
    unit: '6 pack',
    brand: 'Ouma\'s Recipe'
  },
  {
    id: '16',
    name: 'Dark Chocolate',
    description: '70% dark chocolate bar, rich and indulgent.',
    price: 94.99,
    image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=400&h=400&fit=crop',
    category: 'snacks',
    inStock: true,
    rating: 4.9,
    reviewCount: 276,
    unit: '100g bar',
    brand: 'Cocoa Premium'
  },

  // Bakery
  {
    id: '17',
    name: 'Sourdough Bread',
    description: 'Freshly baked sourdough bread with a crispy crust.',
    price: 109.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    category: 'bakery',
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    unit: 'per loaf',
    brand: 'Artisan Bakery'
  },
  {
    id: '18',
    name: 'Croissants',
    description: 'Buttery and flaky croissants, perfect for breakfast.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f69d7cc?w=400&h=400&fit=crop',
    category: 'bakery',
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    unit: '4 pack',
    brand: 'French Delights'
  },
  {
    id: '19',
    name: 'Blueberry Muffins',
    description: 'Fresh blueberry muffins with a golden top.',
    price: 84.99,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop',
    category: 'bakery',
    inStock: true,
    rating: 4.5,
    reviewCount: 97,
    unit: '2 pack',
    brand: 'Morning Treats'
  },
  {
    id: '20',
    name: 'Vetkoek',
    description: 'Traditional South African fried bread, perfect with jam or savoury fillings.',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1551892589-865f69869476?w=400&h=400&fit=crop',
    category: 'bakery',
    inStock: true,
    rating: 4.4,
    reviewCount: 73,
    unit: '4 pack',
    brand: 'Traditional Treats'
  },

  // Dairy
  {
    id: '21',
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt with live cultures, high in protein.',
    price: 94.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    category: 'dairy',
    inStock: true,
    rating: 4.6,
    reviewCount: 164,
    unit: '500g tub',
    brand: 'Mediterranean Fresh'
  },
  {
    id: '22',
    name: 'Free Range Eggs',
    description: 'Fresh free-range eggs from happy hens.',
    price: 104.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    category: 'dairy',
    inStock: true,
    rating: 4.8,
    reviewCount: 198,
    unit: '12 pack',
    brand: 'Happy Farm'
  },
  {
    id: '23',
    name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese, perfect for sandwiches and cooking.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',
    category: 'dairy',
    inStock: true,
    rating: 4.7,
    reviewCount: 112,
    unit: '200g block',
    brand: 'Dairy Valley'
  },
  {
    id: '24',
    name: 'Butter',
    description: 'Creamy unsalted butter, perfect for baking and cooking.',
    price: 84.99,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop',
    category: 'dairy',
    inStock: true,
    rating: 4.5,
    reviewCount: 87,
    unit: '500g pack',
    brand: 'Golden Churn'
  }
];
