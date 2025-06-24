
// import { createMocks } from 'node-mocks-http';
// import { GET, POST } from '@/app/api/products/route';

// jest.mock('@/lib/db', () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

// jest.mock('@/models/Product', () => ({
//   find: jest.fn(),
//   countDocuments: jest.fn(),
//   create: jest.fn(),
// }));

// describe('/api/products', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('GET', () => {
//     it('returns products with pagination', async () => {
//       const mockProducts = [
//         { id: '1', name: 'Product 1', price: 10 },
//         { id: '2', name: 'Product 2', price: 20 },
//       ];

//       const Product = require('@/models/Product');
//       Product.find.mockReturnValue({
//         populate: jest.fn().mockReturnThis(),
//         sort: jest.fn().mockReturnThis(),
//         skip: jest.fn().mockReturnThis(),
//         limit: jest.fn().mockReturnThis(),
//         lean: jest.fn().mockResolvedValue(mockProducts),
//       });
//       Product.countDocuments.mockResolvedValue(2);

//       const { req } = createMocks({
//         method: 'GET',
//         url: '/api/products',
//       });

//       const response = await GET(req as any);
//       const data = await response.json();

//       expect(response.status).toBe(200);
//       expect(data.products).toEqual(mockProducts);
//       expect(data.pagination).toBeDefined();
//     });
//   });

//   describe('POST', () => {
//     it('creates a new product when user is admin', async () => {
//       // Mock authentication and admin role
//       // This would require mocking getServerSession
//       const mockProduct = { id: '1', name: 'New Product', price: 15 };

//       const Product = require('@/models/Product');
//       Product.create.mockResolvedValue(mockProduct);

//       const { req } = createMocks({
//         method: 'POST',
//         body: mockProduct,
//       });

//       // Mock session with admin role
//       jest.mock('next-auth', () => ({
//         getServerSession: jest.fn().mockResolvedValue({
//           user: { id: '1', role: 'admin' }
//         }),
//       }));

//       const response = await POST(req as any);
//       const data = await response.json();

//       expect(response.status).toBe(201);
//       expect(data).toEqual(mockProduct);
//     });
//   });
// });
