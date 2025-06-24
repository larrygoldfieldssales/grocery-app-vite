
// import mongoose from 'mongoose';

// const CategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   description: {
//     type: String,
//   },
//   image: {
//     type: String,
//   },
//   parentCategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   },
//   sortOrder: {
//     type: Number,
//     default: 0,
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

// export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
