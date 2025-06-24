
// import mongoose from 'mongoose';
// import connectDB from '../src/lib/db';
// import Product from '../src/models/Product';
// import Category from '../src/models/Category';
// import User from '../src/models/User';
// import bcrypt from 'bcryptjs';

// const categories = [
//   {
//     name: 'Fruits & Vegetables',
//     slug: 'fruits-vegetables',
//     description: 'Fresh fruits and vegetables',
//     image: '/categories/fruits-vegetables.jpg',
//   },
//   {
//     name: 'Dairy & Eggs',
//     slug: 'dairy-eggs',
//     description: 'Fresh dairy products and eggs',
//     image: '/categories/dairy-eggs.jpg',
//   },
//   {
//     name: 'Meat & Seafood',
//     slug: 'meat-seafood',
//     description: 'Premium meat and fresh seafood',
//     image: '/categories/meat-seafood.jpg',
//   },
//   {
//     name: 'Bakery',
//     slug: 'bakery',
//     description: 'Fresh bread and baked goods',
//     image: '/categories/bakery.jpg',
//   },
//   {
//     name: 'Beverages',
//     slug: 'beverages',
//     description: 'Drinks and beverages',
//     image: '/categories/beverages.jpg',
//   },
// ];

// const products = [
//   {
//     name: 'Organic Bananas',
//     description: 'Fresh organic bananas, perfect for smoothies and snacking',
//     price: 2.99,
//     originalPrice: 3.49,
//     images: ['/products/bananas.jpg'],
//     unit: 'per bunch',
//     brand: 'Organic Fresh',
//     inStock: true,
//     stockQuantity: 50,
//     rating: 4.5,
//     reviewCount: 128,
//     featured: true,
//   },
//   {
//     name: 'Free Range Eggs',
//     description: 'Farm fresh free-range eggs, dozen pack',
//     price: 4.99,
//     images: ['/products/eggs.jpg'],
//     unit: 'dozen',
//     brand: 'Happy Farm',
//     inStock: true,
//     stockQuantity: 30,
//     rating: 4.8,
//     reviewCount: 95,
//   },
//   {
//     name: 'Whole Milk',
//     description: 'Fresh whole milk, 1 gallon',
//     price: 3.49,
//     images: ['/products/milk.jpg'],
//     unit: '1 gallon',
//     brand: 'Dairy Fresh',
//     inStock: true,
//     stockQuantity: 25,
//     rating: 4.3,
//     reviewCount: 67,
//   },
// ];

// async function seedDatabase() {
//   try {
//     await connectDB();
//     console.log('Connected to MongoDB');

//     // Clear existing data
//     await Category.deleteMany({});
//     await Product.deleteMany({});
//     await User.deleteMany({});

//     // Create categories
//     const createdCategories = await Category.insertMany(categories);
//     console.log('Categories created:', createdCategories.length);

//     // Create products with category references
//     const productsWithCategories = products.map((product, index) => ({
//       ...product,
//       category: createdCategories[index % createdCategories.length]._id,
//     }));

//     const createdProducts = await Product.insertMany(productsWithCategories);
//     console.log('Products created:', createdProducts.length);

//     // Create admin user
//     const hashedPassword = await bcrypt.hash('admin123', 12);
//     await User.create({
//       name: 'Admin User',
//       email: 'admin@freshexpress.com',
//       password: hashedPassword,
//       role: 'admin',
//     });

//     console.log('Admin user created');
//     console.log('Database seeding completed successfully!');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

// seedDatabase();
