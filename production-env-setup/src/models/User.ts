
// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: function() {
//       return !this.googleId && !this.githubId;
//     },
//   },
//   image: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     postalCode: String,
//     country: String,
//   },
//   googleId: String,
//   githubId: String,
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
//   emailVerified: {
//     type: Date,
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

// UserSchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

// export default mongoose.models.User || mongoose.model('User', UserSchema);
