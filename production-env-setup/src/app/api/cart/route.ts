
// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import Cart from '@/models/Cart';
// import { authOptions } from '@/lib/auth';

// // GET /api/cart
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await connectDB();

//     const cart = await Cart.findOne({ user: session.user.id })
//       .populate('items.product');

//     return NextResponse.json(cart || { items: [] });
//   } catch (error) {
//     console.error('Cart API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch cart' },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/cart (Add item to cart)
// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { productId, quantity, price } = await request.json();

//     await connectDB();

//     let cart = await Cart.findOne({ user: session.user.id });

//     if (!cart) {
//       cart = new Cart({ user: session.user.id, items: [] });
//     }

//     const existingItemIndex = cart.items.findIndex(
//       (item: any) => item.product.toString() === productId
//     );

//     if (existingItemIndex > -1) {
//       cart.items[existingItemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity, price });
//     }

//     await cart.save();
//     await cart.populate('items.product');

//     return NextResponse.json(cart);
//   } catch (error) {
//     console.error('Add to Cart Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to add to cart' },
//       { status: 500 }
//     );
//   }
// }
