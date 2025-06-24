
// import { NextRequest, NextResponse } from 'next/server';
// import { stripe } from '@/lib/stripe';
// import connectDB from '@/lib/db';
// import Order from '@/models/Order';

// export async function POST(request: NextRequest) {
//   const body = await request.text();
//   const signature = request.headers.get('stripe-signature')!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error) {
//     console.error('Webhook signature verification failed:', error);
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
//   }

//   try {
//     await connectDB();

//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         await Order.findOneAndUpdate(
//           { paymentIntent: paymentIntent.id },
//           { 
//             paymentStatus: 'paid',
//             status: 'confirmed'
//           }
//         );
//         break;

//       case 'payment_intent.payment_failed':
//         const failedPayment = event.data.object;
//         await Order.findOneAndUpdate(
//           { paymentIntent: failedPayment.id },
//           { paymentStatus: 'failed' }
//         );
//         break;

//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error('Webhook processing error:', error);
//     return NextResponse.json(
//       { error: 'Webhook processing failed' },
//       { status: 500 }
//     );
//   }
// }
