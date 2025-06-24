
// import mongoose from 'mongoose';

// const OrderItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

// const OrderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   items: [OrderItemSchema],
//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
//     default: 'pending',
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed', 'refunded'],
//     default: 'pending',
//   },
//   paymentIntent: {
//     type: String,
//   },
//   subtotal: {
//     type: Number,
//     required: true,
//   },
//   deliveryFee: {
//     type: Number,
//     required: true,
//   },
//   tax: {
//     type: Number,
//     required: true,
//   },
//   total: {
//     type: Number,
//     required: true,
//   },
//   deliveryAddress: {
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true },
//   },
//   deliveryInstructions: {
//     type: String,
//   },
//   estimatedDelivery: {
//     type: Date,
//   },
//   actualDelivery: {
//     type: Date,
//   },
//   trackingNumber: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
