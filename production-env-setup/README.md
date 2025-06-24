
# FreshExpress - Production E-commerce App

A production-ready grocery delivery platform built with Next.js 14, MongoDB, and modern web technologies.

## 🚀 Features

- **Authentication**: NextAuth.js with Google, GitHub, and email/password
- **Database**: MongoDB with Mongoose ODM
- **Payment**: Stripe integration for secure payments
- **Real-time**: Socket.io for order tracking
- **File Upload**: Cloudinary for product images
- **Email**: Resend for transactional emails
- **Testing**: Jest + Testing Library
- **Deployment**: Vercel ready

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── (auth)/            # Auth pages
│   │   ├── (shop)/            # Shop pages
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── product/          # Product components
│   ├── lib/                  # Utilities
│   │   ├── auth.ts           # NextAuth config
│   │   ├── db.ts             # Database connection
│   │   ├── stripe.ts         # Stripe config
│   │   └── utils.ts          # Helper functions
│   ├── models/               # MongoDB models
│   ├── types/                # TypeScript types
│   └── middleware.ts         # Next.js middleware
├── __tests__/                # Test files
├── docs/                     # Documentation
└── public/                   # Static assets
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Tailwind CSS + shadcn/ui
- **File Storage**: Cloudinary
- **Email**: Resend
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   git clone <repo-url>
   cd freshexpress
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in all required environment variables (see Environment Variables section)

3. **Database Setup**
   ```bash
   npm run db:seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Create `.env.local` with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/freshexpress
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/freshexpress

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
RESEND_API_KEY=your-resend-api-key

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
DELIVERY_FEE=5.99
FREE_DELIVERY_THRESHOLD=50.00
```

## 📊 Database Schema

### Collections:
- **users**: User accounts and profiles
- **products**: Product catalog
- **categories**: Product categories
- **orders**: Order history
- **carts**: Shopping carts
- **reviews**: Product reviews

## 🔒 Authentication Flow

1. NextAuth.js handles authentication
2. Supports Google, GitHub, and email/password
3. JWT tokens with secure sessions
4. Protected routes via middleware

## 💳 Payment Integration

1. Stripe Checkout for payments
2. Webhook handling for order confirmation
3. Invoice generation
4. Refund capabilities

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 📈 Performance

- **Image Optimization**: Next.js Image component
- **Caching**: Redis for session storage
- **CDN**: Cloudinary for images
- **Database**: Optimized MongoDB queries with indexes

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run test         # Run tests
npm run db:seed      # Seed database
npm run db:reset     # Reset database
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signup` - Sign up
- `POST /api/auth/signout` - Sign out

### Products
- `GET /api/products` - List products
- `GET /api/products/[id]` - Get product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)

### Orders
- `GET /api/orders` - User orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add to cart
- `PUT /api/cart/items/[id]` - Update cart item
- `DELETE /api/cart/items/[id]` - Remove from cart

## 🐛 Error Handling

- Global error boundaries
- API error responses
- User-friendly error messages
- Error logging with Sentry (optional)

## 🔍 Monitoring

- Vercel Analytics
- Performance monitoring
- Error tracking
- User behavior analytics

## 👥 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.
