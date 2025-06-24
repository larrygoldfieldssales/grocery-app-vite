
// import mongoose from 'mongoose';

// const ProductSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   originalPrice: {
//     type: Number,
//   },
//   images: {
//     type: [String],
//     required: true,
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true,
//   },
//   brand: {
//     type: String,
//   },
//   unit: {
//     type: String,
//     required: true,
//   },
//   inStock: {
//     type: Boolean,
//     default: true,
//   },
//   stockQuantity: {
//     type: Number,
//     default: 0,
//   },
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   reviewCount: {
//     type: Number,
//     default: 0,
//   },
//   tags: [String],
//   nutritionInfo: {
//     calories: Number,
//     protein: Number,
//     carbs: Number,
//     fat: Number,
//     fiber: Number,
//   },
//   featured: {
//     type: Boolean,
//     default: false,
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

// ProductSchema.index({ name: 'text', description: 'text' });
// ProductSchema.index({ category: 1 });
// ProductSchema.index({ price: 1 });
// ProductSchema.index({ rating: -1 });

// export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
