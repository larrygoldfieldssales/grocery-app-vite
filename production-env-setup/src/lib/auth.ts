
// import { AuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import { MongoClient } from 'mongodb';
// import bcrypt from 'bcryptjs';
// import User from '@/models/User';
// import connectDB from './db';

// const client = new MongoClient(process.env.MONGODB_URI!);
// const clientPromise = client.connect();

// export const authOptions: AuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         await connectDB();
//         const user = await User.findOne({ email: credentials.email });

//         if (!user) {
//           return null;
//         }

//         const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

//         if (!isPasswordValid) {
//           return null;
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//           image: user.image,
//         };
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/auth/signin',
//     signUp: '/auth/signup',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       return session;
//     },
//   },
// };
