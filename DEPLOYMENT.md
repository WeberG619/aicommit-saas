# 🚀 Git Commit AI SaaS - Deployment Guide

## 📋 Prerequisites

### Required Services
1. **Supabase** - Database, Authentication, Storage
2. **Stripe** - Payment processing
3. **OpenAI** - AI commit generation
4. **Vercel** - Frontend hosting (recommended)
5. **Railway/Heroku** - Backend hosting (recommended)

### Environment Variables
Create the following environment files:

#### Backend (.env)
```bash
# Server Configuration
PORT=3001
NODE_ENV=production

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_INDIVIDUAL=price_individual_monthly_id
STRIPE_PRICE_TEAM=price_team_monthly_id
STRIPE_PRICE_ENTERPRISE=price_enterprise_monthly_id

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d

# Frontend URL
FRONTEND_URL=https://gitcommit-ai.com
```

#### Frontend (.env.local)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://gitcommit-ai.com
```

---

## 🗃️ Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note down the URL and anon key

### 2. Run Database Schema
```sql
-- Copy and run the entire database-schema.sql file
-- This creates all tables, policies, and functions
```

### 3. Configure Authentication
1. Enable email authentication
2. Disable email confirmations for development
3. Set up OAuth providers if needed

---

## 💳 Stripe Setup

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create business account
3. Get publishable and secret keys

### 2. Create Products & Prices
```bash
# Individual Plan
stripe products create --name="Individual Plan" --description="Perfect for individual developers"
stripe prices create --unit-amount=1900 --currency=usd --recurring-interval=month --product=prod_xxx

# Team Plan  
stripe products create --name="Team Plan" --description="Great for small development teams"
stripe prices create --unit-amount=4700 --currency=usd --recurring-interval=month --product=prod_xxx

# Enterprise Plan
stripe products create --name="Enterprise Plan" --description="For large organizations" 
stripe prices create --unit-amount=9700 --currency=usd --recurring-interval=month --product=prod_xxx
```

### 3. Configure Webhooks
1. Create webhook endpoint: `https://your-backend-url.com/api/webhooks/stripe`
2. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
3. Copy webhook secret

---

## 🧠 OpenAI Setup

### 1. Create OpenAI Account
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key
3. Set usage limits if needed

### 2. Test API Access
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "gpt-4-turbo-preview",
    "messages": [{"role": "user", "content": "Test"}],
    "max_tokens": 10
  }'
```

---

## 🚀 Backend Deployment

### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add
railway up
```

### Option 2: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Create app and deploy
heroku create git-commit-ai-backend
git push heroku main
```

### Environment Variables
Set all backend environment variables in your hosting platform.

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel

# Set environment variables in Vercel dashboard
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd client
npm run build
netlify deploy --prod --dir=out
```

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings
Update backend CORS configuration with your frontend URL:
```javascript
app.use(cors({
  origin: 'https://gitcommit-ai.com',
  credentials: true
}));
```

### 2. Test Payment Flow
1. Create test account
2. Start free trial
3. Test webhook delivery
4. Verify subscription status

### 3. Set up Monitoring
1. Configure error tracking (Sentry)
2. Set up uptime monitoring
3. Monitor API usage and costs

---

## 🔍 Testing Checklist

### Functionality Tests
- [ ] User registration works
- [ ] Email authentication works
- [ ] Commit generation works
- [ ] Payment flow completes
- [ ] Webhooks process correctly
- [ ] Subscription management works
- [ ] API rate limiting works

### Performance Tests
- [ ] Page load times < 3s
- [ ] API response times < 1s
- [ ] Database queries optimized
- [ ] Images optimized

### Security Tests
- [ ] Authentication required for protected routes
- [ ] SQL injection protection
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation working

---

## 📊 Monitoring & Analytics

### Error Tracking
```bash
# Install Sentry
npm install @sentry/node @sentry/nextjs

# Configure in both backend and frontend
```

### Analytics
```bash
# Install analytics (choose one)
npm install @vercel/analytics
# or
npm install @google-analytics/gtag
```

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusPage

---

## 🚨 Troubleshooting

### Common Issues

**1. CORS Errors**
```javascript
// Update backend CORS settings
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

**2. Stripe Webhooks Failing**
- Check webhook URL is accessible
- Verify webhook secret is correct
- Check webhook event selection

**3. Database Connection Issues**
- Verify Supabase URL and keys
- Check RLS policies
- Ensure service key has proper permissions

**4. OpenAI API Errors**
- Check API key validity
- Verify billing account
- Monitor rate limits

---

## 💰 Cost Optimization

### Backend Hosting
- **Railway**: ~$5-20/month
- **Heroku**: ~$7-25/month
- **Railway Pro**: ~$20-50/month

### Database (Supabase)
- **Free tier**: 500MB, 2 CPU hours
- **Pro tier**: $25/month, 8GB

### AI (OpenAI)
- **GPT-4**: ~$0.03-0.06 per commit
- **Expected**: $50-200/month for 1000 users

### Total Monthly Costs
- **Startup**: ~$100-300/month
- **Growth**: ~$300-800/month
- **Scale**: ~$800-2000/month

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - uses: railway/deploy@v1
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd client && npm install
      - run: cd client && npm run build
      - uses: vercel/deploy@v1
        with:
          token: ${{ secrets.VERCEL_TOKEN }}
```

---

Your Git Commit AI SaaS platform is now ready for production! 🎉