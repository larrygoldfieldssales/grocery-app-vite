
// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import Product from '@/models/Product';

// // GET /api/products/[id]
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     const product = await Product.findById(params.id)
//       .populate('category')
//       .lean();

//     if (!product) {
//       return NextResponse.json(
//         { error: 'Product not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error('Product API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch product' },
//       { status: 500 }
//     );
//   }
// }
