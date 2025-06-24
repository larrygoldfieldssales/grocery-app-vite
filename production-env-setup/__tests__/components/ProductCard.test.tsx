
// import { render, screen, fireEvent } from '@testing-library/react';
// import { ProductCard } from '@/components/product/ProductCard';
// import { CartProvider } from '@/context/CartContext';

// const mockProduct = {
//   id: '1',
//   name: 'Test Product',
//   description: 'Test Description',
//   price: 10.99,
//   originalPrice: 12.99,
//   image: '/test-image.jpg',
//   category: 'Test Category',
//   inStock: true,
//   rating: 4.5,
//   reviewCount: 100,
//   unit: 'each',
//   brand: 'Test Brand',
// };

// const renderWithCart = (component: React.ReactElement) => {
//   return render(
//     <CartProvider>
//       {component}
//     </CartProvider>
//   );
// };

// describe('ProductCard', () => {
//   it('renders product information correctly', () => {
//     renderWithCart(<ProductCard product={mockProduct} />);
    
//     expect(screen.getByText('Test Product')).toBeInTheDocument();
//     expect(screen.getByText('$10.99')).toBeInTheDocument();
//     expect(screen.getByText('$12.99')).toBeInTheDocument();
//     expect(screen.getByText('4.5')).toBeInTheDocument();
//   });

//   it('shows add to cart button when product is in stock', () => {
//     renderWithCart(<ProductCard product={mockProduct} />);
    
//     expect(screen.getByText('Add to Cart')).toBeInTheDocument();
//   });

//   it('shows out of stock when product is not available', () => {
//     const outOfStockProduct = { ...mockProduct, inStock: false };
//     renderWithCart(<ProductCard product={outOfStockProduct} />);
    
//     expect(screen.getByText('Out of Stock')).toBeInTheDocument();
//   });

//   it('adds product to cart when button is clicked', () => {
//     renderWithCart(<ProductCard product={mockProduct} />);
    
//     const addButton = screen.getByText('Add to Cart');
//     fireEvent.click(addButton);
    
//     // This would require mocking the cart context
//     // Adjust assertions based on your cart implementation
//   });
// });
