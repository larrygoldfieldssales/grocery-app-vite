
# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- Vercel account
- GitHub repository
- MongoDB Atlas database
- Stripe account
- Cloudinary account

### Environment Variables

Set these in your Vercel dashboard:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/freshexpress
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RESEND_API_KEY=your-resend-api-key
DELIVERY_FEE=5.99
FREE_DELIVERY_THRESHOLD=50.00
TAX_RATE=0.08
```

### Deployment Steps

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Select the production branch

2. **Configure Build Settings**
   - Framework: Next.js
   - Node.js Version: 18.x
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set Environment Variables**
   - Add all required environment variables
   - Use production values (live keys, production database)

4. **Configure Domains**
   - Add custom domain if needed
   - Set up SSL certificate

5. **Deploy**
   - Trigger deployment
   - Monitor build logs

### Post-Deployment

1. **Database Setup**
   ```bash
   # Seed production database
   npm run db:seed
   ```

2. **Stripe Webhook**
   - Update webhook endpoint in Stripe Dashboard
   - Point to: `https://your-app.vercel.app/api/webhooks/stripe`

3. **Test Critical Flows**
   - User registration/login
   - Product browsing
   - Cart functionality
   - Checkout process
   - Payment processing

## Alternative Deployment Options

### AWS Amplify

1. **Setup**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   ```

2. **Deploy**
   ```bash
   amplify add hosting
   amplify publish
   ```

### Docker Deployment

1. **Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build & Run**
   ```bash
   docker build -t freshexpress .
   docker run -p 3000:3000 freshexpress
   ```

### DigitalOcean App Platform

1. **Create App**
   - Connect GitHub repository
   - Select Node.js environment

2. **Configure**
   ```yaml
   name: freshexpress
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/freshexpress
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
   ```

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Configure Cloudinary transformations
- Enable WebP format

### Caching
- Enable Vercel Edge Network
- Implement Redis for session storage
- Use SWR for client-side caching

### Database Optimization
- Create proper indexes
- Use MongoDB aggregation pipelines
- Implement connection pooling

### Monitoring
- Set up Vercel Analytics
- Configure error tracking (Sentry)
- Monitor performance metrics

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Secure environment variables
- [ ] Enable CSP headers
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use secure session configuration
- [ ] Enable CORS properly
- [ ] Regular security updates

## Backup Strategy

### Database Backups
- MongoDB Atlas automatic backups
- Daily backup schedule
- Point-in-time recovery

### Code Backups
- Git repository (primary)
- Multiple remotes (GitHub, GitLab)
- Tagged releases

## Rollback Plan

1. **Identify Issues**
   - Monitor error rates
   - Check user reports
   - Review logs

2. **Quick Rollback**
   ```bash
   # Vercel
   vercel --prod --confirm
   
   # Or revert to previous deployment
   vercel rollback
   ```

3. **Database Rollback**
   - Restore from backup if needed
   - Run migration rollback scripts

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and rotate API keys quarterly
- Monitor database performance
- Backup verification

### Health Checks
- Automated endpoint monitoring
- Database connection tests
- Payment processing verification
- Email delivery confirmation
