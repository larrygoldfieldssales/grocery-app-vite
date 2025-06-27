import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
  import productsArray from '../../data/products-demo.json'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  Upload,
  Star,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  unit: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  image: string;
}

export function ProductManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    unit: '',
    inStock: true,
    stockQuantity: 0,
    featured: false
  });

  // Mock data - in real app, this would come from your backend
    const [products, setProducts] = useState<Product[]>(productsArray)
  // const [products, setProducts] = useState<Product[]>([
  //   {
  //     id: 'PROD-001',
  //     name: 'Fresh Bananas',
  //     description: 'Sweet and ripe bananas, perfect for snacking',
  //     price: 25.99,
  //     originalPrice: 29.99,
  //     category: 'Fruits',
  //     brand: 'Fresh Farm',
  //     unit: 'per kg',
  //     inStock: true,
  //     stockQuantity: 50,
  //     rating: 4.5,
  //     reviewCount: 124,
  //     featured: true,
  //     image: '/placeholder.svg'
  //   },
  //   {
  //     id: 'PROD-002',
  //     name: 'Organic Milk',
  //     description: 'Fresh organic milk from grass-fed cows',
  //     price: 45.50,
  //     category: 'Dairy',
  //     brand: 'Pure Dairy',
  //     unit: 'per liter',
  //     inStock: true,
  //     stockQuantity: 25,
  //     rating: 4.8,
  //     reviewCount: 89,
  //     featured: false,
  //     image: '/placeholder.svg'
  //   },
  //   {
  //     id: 'PROD-003',
  //     name: 'Whole Wheat Bread',
  //     description: 'Freshly baked whole wheat bread',
  //     price: 28.99,
  //     category: 'Bakery',
  //     brand: 'Golden Grain',
  //     unit: 'per loaf',
  //     inStock: false,
  //     stockQuantity: 0,
  //     rating: 4.2,
  //     reviewCount: 56,
  //     featured: false,
  //     image: '/placeholder.svg'
  //   }
  // ]);

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Beverages', 'Snacks', 'Pantry'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
      name: newProduct.name!,
      description: newProduct.description || '',
      price: newProduct.price!,
      originalPrice: newProduct.originalPrice,
      category: newProduct.category!,
      brand: newProduct.brand || '',
      unit: newProduct.unit || 'each',
      inStock: newProduct.inStock ?? true,
      stockQuantity: newProduct.stockQuantity || 0,
      rating: 0,
      reviewCount: 0,
      featured: newProduct.featured || false,
      image: '/placeholder.svg'
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      brand: '',
      unit: '',
      inStock: true,
      stockQuantity: 0,
      featured: false
    });
    setIsAddProductOpen(false);

    toast({
      title: "Product Added",
      description: `${product.name} has been added successfully`
    });
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const handleUpdateProduct = () => {
    if (!selectedProduct) return;

    setProducts(products.map(product => 
      product.id === selectedProduct.id ? selectedProduct : product
    ));
    setIsEditProductOpen(false);
    setSelectedProduct(null);

    toast({
      title: "Product Updated",
      description: `${selectedProduct.name} has been updated successfully`
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from the catalog"
    });
  };

  const toggleFeatured = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, featured: !product.featured }
        : product
    ));
  };

  const toggleStock = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>
                Add, edit, and manage your product catalog
              </CardDescription>
            </div>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Enter the product details to add it to your catalog
                  </DialogDescription>
                </DialogHeader>
                
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name || ''}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={newProduct.brand || ''}
                      onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                      placeholder="Enter brand name"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description || ''}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="Enter product description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (R) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price || 0}
                      onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (R)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.originalPrice || ''}
                      onChange={(e) => setNewProduct({...newProduct, originalPrice: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newProduct.category || ''} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={newProduct.unit || ''}
                      onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      placeholder="e.g., per kg, each, per liter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={newProduct.stockQuantity || 0}
                      onChange={(e) => setNewProduct({...newProduct, stockQuantity: parseInt(e.target.value)})}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={newProduct.featured || false}
                        onCheckedChange={(checked) => setNewProduct({...newProduct, featured: checked})}
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct}>Add Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                          {product.featured && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">R{product?.price?.toFixed(2)}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            R{product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{product.stockQuantity}</span>
                        {product.stockQuantity < 10 && product.inStock && (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({product.reviewCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge className={product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={product.inStock}
                            onCheckedChange={() => toggleStock(product.id)}
                          />
                          <Switch
                            checked={product.featured}
                            onCheckedChange={() => toggleFeatured(product.id)}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-brand">Brand</Label>
                <Input
                  id="edit-brand"
                  value={selectedProduct.brand}
                  onChange={(e) => setSelectedProduct({...selectedProduct, brand: e.target.value})}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (R)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stockQuantity">Stock Quantity</Label>
                <Input
                  id="edit-stockQuantity"
                  type="number"
                  value={selectedProduct.stockQuantity}
                  onChange={(e) => setSelectedProduct({...selectedProduct, stockQuantity: parseInt(e.target.value)})}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct}>Update Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
