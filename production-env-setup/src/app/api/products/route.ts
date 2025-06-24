
// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import Product from '@/models/Product';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

// // GET /api/products
// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');
//     const search = searchParams.get('search');
//     const sortBy = searchParams.get('sortBy') || 'createdAt';
//     const order = searchParams.get('order') || 'desc';
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '20');
//     const featured = searchParams.get('featured');

//     let query: any = { inStock: true };

//     if (category) {
//       query.category = category;
//     }

//     if (search) {
//       query.$text = { $search: search };
//     }

//     if (featured === 'true') {
//       query.featured = true;
//     }

//     const sortOptions: any = {};
//     sortOptions[sortBy] = order === 'desc' ? -1 : 1;

//     const products = await Product.find(query)
//       .populate('category')
//       .sort(sortOptions)
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .lean();

//     const totalProducts = await Product.countDocuments(query);
//     const totalPages = Math.ceil(totalProducts / limit);

//     return NextResponse.json({
//       products,
//       pagination: {
//         currentPage: page,
//         totalPages,
//         totalProducts,
//         hasNextPage: page < totalPages,
//         hasPrevPage: page > 1,
//       },
//     });
//   } catch (error) {
//     console.error('Products API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch products' },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/products (Admin only)
// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session || session.user.role !== 'admin') {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await connectDB();

//     const productData = await request.json();
//     const product = await Product.create(productData);

//     return NextResponse.json(product, { status: 201 });
//   } catch (error) {
//     console.error('Create Product Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create product' },
//       { status: 500 }
//     );
//   }
// }
