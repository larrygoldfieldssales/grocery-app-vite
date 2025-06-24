
# Step-By-Step Guide: FreshExpress E-commerce Setup

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas** account or local MongoDB installation
- **Stripe** account for payments
- **Cloudinary** account for image storage
- **Resend** account for emails
- **Git** installed
- Code editor (VS Code recommended)

## 🚀 Project Setup

### Step 1: Clone and Initialize Project

```bash
# Create new Next.js project
npx create-next-app@latest freshexpress --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project directory
cd freshexpress

# Copy production files from production-env-setup folder
# (Copy all files from production-env-setup to your new Next.js project)
```

### Step 2: Install Dependencies

```bash
# Install all required dependencies
npm install next@^14.0.0 react@^18.2.0 react-dom@^18.2.0
npm install next-auth@^4.24.0 mongoose@^8.0.0 stripe@^14.0.0
npm install bcryptjs@^2.4.3 jsonwebtoken@^9.0.2 zod@^3.22.0
npm install @hookform/resolvers@^3.3.0 react-hook-form
npm install cloudinary@^1.41.0 resend@^2.0.0
npm install socket.io@^4.7.0 socket.io-client@^4.7.0
npm install @radix-ui/react-toast@^1.1.0 @radix-ui/react-dialog@^1.0.0
npm install @radix-ui/react-dropdown-menu@^2.0.0 lucide-react@^0.300.0
npm install class-variance-authority@^0.7.0 clsx@^2.0.0 tailwind-merge@^2.0.0
npm install date-fns@^2.30.0 recharts@^2.8.0

# Install dev dependencies
npm install -D @types/node@^20.8.0 @types/react@^18.2.0 @types/react-dom@^18.2.0
npm install -D @types/bcryptjs@^2.4.0 @types/jsonwebtoken@^9.0.0
npm install -D typescript@^5.2.0 eslint@^8.51.0 eslint-config-next@^14.0.0
npm install -D jest@^29.7.0 @testing-library/react@^13.4.0
npm install -D @testing-library/jest-dom@^6.1.0 @testing-library/user-event@^14.5.0
npm install -D jest-environment-jsdom@^29.7.0 @playwright/test@^1.40.0
npm install -D tsx@^4.0.0 autoprefixer@^10.4.0 postcss@^8.4.0
```

### Step 3: Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your actual values
nano .env.local
```

**Required Environment Variables:**

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/freshexpress

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
RESEND_API_KEY=your-resend-api-key

# App Settings
DELIVERY_FEE=5.99
FREE_DELIVERY_THRESHOLD=50.00
TAX_RATE=0.08
```

## 🗄️ Database Setup

### Step 4: MongoDB Configuration

**Option A: MongoDB Atlas (Recommended)**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string and add to `MONGODB_URI`

**Option B: Local MongoDB**

```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Ubuntu
sudo apt install mongodb

# Start MongoDB service
sudo systemctl start mongod

# Use local connection string
MONGODB_URI=mongodb://localhost:27017/freshexpress
```

### Step 5: Seed Database

```bash
# Uncomment all code in scripts/seed.ts
# Then run the seeding script
npm run db:seed
```

## 🔐 Authentication Setup

### Step 6: NextAuth Configuration

**Google OAuth Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add credentials to `.env.local`

**GitHub OAuth Setup:**
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env.local`

## 💳 Payment Setup

### Step 7: Stripe Configuration

1. **Create Stripe Account:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Complete account setup

2. **Get API Keys:**
   - Copy publishable and secret keys from dashboard
   - Add to `.env.local`

3. **Setup Webhook:**
   ```bash
   # Install Stripe CLI
   npm install -g stripe-cli
   
   # Login to Stripe
   stripe login
   
   # Forward webhooks to local development
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   
   # Copy webhook secret to .env.local
   ```

## 📂 File Storage Setup

### Step 8: Cloudinary Configuration

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get cloud name, API key, and API secret from dashboard
3. Add credentials to `.env.local`

## 📧 Email Setup

### Step 9: Resend Configuration

1. Create account at [Resend](https://resend.com/)
2. Get API key from dashboard
3. Add to `.env.local`

## 🏃‍♂️ Running the Application

### Step 10: Start Development Server

```bash
# Uncomment all code in the source files first
# Then start the development server
npm run dev

# Application will be available at:
# http://localhost:3000
```

### Step 11: Verify Setup

1. **Database Connection:**
   - Check console for MongoDB connection success
   - Visit `/api/products` to see if products load

2. **Authentication:**
   - Try signing up with email/password
   - Test OAuth providers if configured

3. **Payment Flow:**
   - Add items to cart
   - Go through checkout process
   - Test with Stripe test cards

## 🧪 Testing Setup

### Step 12: Running Tests

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run E2E tests (after installing Playwright)
npx playwright install
npm run test:e2e
```

### Step 13: Test Structure

- **Unit Tests:** `__tests__/components/`
- **API Tests:** `__tests__/api/`
- **E2E Tests:** `tests/e2e/`

## 🏗️ Project Structure Overview

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── products/      # Product CRUD
│   │   ├── cart/          # Cart management
│   │   ├── orders/        # Order processing
│   │   └── webhooks/      # Payment webhooks
│   ├── (auth)/            # Auth pages
│   ├── (shop)/            # Shop pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── product/          # Product components
├── lib/                  # Utilities
│   ├── auth.ts           # NextAuth config
│   ├── db.ts             # Database connection
│   ├── stripe.ts         # Stripe config
│   └── utils.ts          # Helper functions
├── models/               # MongoDB models
├── types/                # TypeScript types
└── middleware.ts         # Next.js middleware
```

## 🚀 Deployment

### Step 14: Production Deployment

**Vercel (Recommended):**

1. **Connect Repository:**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/)
   - Import GitHub repository
   - Add all environment variables
   - Deploy

3. **Update Environment Variables:**
   - Change `NEXTAUTH_URL` to production URL
   - Use production Stripe keys
   - Update webhook endpoints

### Step 15: Post-Deployment

1. **Database Seeding:**
   ```bash
   # Seed production database (one time)
   npm run db:seed
   ```

2. **Domain Configuration:**
   - Add custom domain in Vercel
   - Update OAuth callback URLs
   - Update Stripe webhook endpoints

## 📚 Development Workflow

### Step 16: Daily Development

```bash
# Start development
npm run dev

# Run tests while developing
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint

# Database operations
npm run db:seed    # Seed with sample data
npm run db:reset   # Reset database
```

### Step 17: Feature Development

1. **Create Feature Branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Development Process:**
   - Write tests first (TDD approach)
   - Implement feature
   - Test thoroughly
   - Update documentation

3. **Testing Checklist:**
   - [ ] Unit tests pass
   - [ ] API tests pass
   - [ ] E2E tests pass
   - [ ] Manual testing complete

## 🔧 Common Issues & Solutions

### Database Connection Issues
```bash
# Clear MongoDB connection cache
rm -rf .next
npm run dev
```

### NextAuth Issues
```bash
# Regenerate NextAuth secret
openssl rand -base64 32
# Add to NEXTAUTH_SECRET in .env.local
```

### Stripe Webhook Issues
```bash
# Restart Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📞 Support Resources

- **Next.js Documentation:** [nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB Documentation:** [docs.mongodb.com](https://docs.mongodb.com/)
- **Stripe Documentation:** [stripe.com/docs](https://stripe.com/docs)
- **NextAuth Documentation:** [next-auth.js.org](https://next-auth.js.org/)

## 🎯 Next Steps

1. **Customize Design:** Modify components and styling
2. **Add Features:** Implement additional functionality
3. **Optimize Performance:** Add caching and optimization
4. **Scale Database:** Implement proper indexing
5. **Add Monitoring:** Set up error tracking and analytics

---

**🎉 Congratulations!** Your production-ready e-commerce application is now set up and ready for development.
