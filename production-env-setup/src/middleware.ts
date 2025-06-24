
// import { withAuth } from 'next-auth/middleware';

// export default withAuth(
//   function middleware(req) {
//     // Add any additional middleware logic here
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         // Protect admin routes
//         if (req.nextUrl.pathname.startsWith('/admin')) {
//           return token?.role === 'admin';
//         }

//         // Protect user dashboard and checkout
//         if (req.nextUrl.pathname.startsWith('/dashboard') || 
//             req.nextUrl.pathname.startsWith('/checkout')) {
//           return !!token;
//         }

//         return true;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ['/dashboard/:path*', '/checkout/:path*', '/admin/:path*']
// };
