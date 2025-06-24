
// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import Order from '@/models/Order';
// import Cart from '@/models/Cart';
// import { stripe } from '@/lib/stripe';
// import { authOptions } from '@/lib/auth';

// // GET /api/orders
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await connectDB();

//     const orders = await Order.find({ user: session.user.id })
//       .populate('items.product')
//       .sort({ createdAt: -1 });

//     return NextResponse.json(orders);
//   } catch (error) {
//     console.error('Orders API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch orders' },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/orders
// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { deliveryAddress, deliveryInstructions } = await request.json();

//     await connectDB();

//     // Get user's cart
//     const cart = await Cart.findOne({ user: session.user.id })
//       .populate('items.product');

//     if (!cart || cart.items.length === 0) {
//       return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
//     }

//     // Calculate totals
//     const subtotal = cart.items.reduce((total: number, item: any) => {
//       return total + (item.price * item.quantity);
//     }, 0);

//     const deliveryFee = subtotal >= parseFloat(process.env.FREE_DELIVERY_THRESHOLD!) 
//       ? 0 
//       : parseFloat(process.env.DELIVERY_FEE!);

//     const tax = subtotal * parseFloat(process.env.TAX_RATE!);
//     const total = subtotal + deliveryFee + tax;

//     // Create Stripe payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(total * 100),
//       currency: 'usd',
//       metadata: {
//         userId: session.user.id,
//       },
//     });

//     // Create order
//     const order = await Order.create({
//       user: session.user.id,
//       items: cart.items,
//       subtotal,
//       deliveryFee,
//       tax,
//       total,
//       deliveryAddress,
//       deliveryInstructions,
//       paymentIntent: paymentIntent.id,
//       estimatedDelivery: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
//     });

//     // Clear cart
//     await Cart.findOneAndUpdate(
//       { user: session.user.id },
//       { items: [] }
//     );

//     return NextResponse.json({
//       order,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Create Order Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create order' },
//       { status: 500 }
//     );
//   }
// }
