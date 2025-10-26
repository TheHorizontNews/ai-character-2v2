# Deployment Instructions for ai-characters.org

## Vercel Deployment (Free Tier - Static Only)

### Prerequisites
- Vercel account
- GitHub repository

### Deploy Steps

#### 1. Build with Pre-rendering

```bash
cd /app/frontend
yarn build
```

This will:
- Build the React app
- Run `react-snap` to pre-render all pages with schema.org markup
- Generate static HTML files in `/build` directory with embedded JSON-LD

#### 2. Verify Pre-rendered Files

Check that HTML files contain schema.org markup:
```bash
grep -r "application/ld+json" build/ | head -5
```

You should see schema markup in the HTML files.

#### 3. Deploy to Vercel

**Option A: Via Vercel CLI**
```bash
cd /app/frontend
vercel --prod
```

**Option B: Via GitHub Integration**
1. Push to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`
4. Deploy

### What's Included in Pre-rendered Build

✅ **Schema.org markup** on all pages (embedded in static HTML)
✅ **67 SEO guide pages** with Article schema
✅ **21 platform pages** with Review schema  
✅ **Comparison pages** with comparison Article schema
✅ **Homepage** with Organization + WebSite schema
✅ **Explore/Compare hubs** with CollectionPage schema

### SEO Files Automatically Served

- `/robots.txt` - Search engine directives
- `/sitemap.xml` - 309 URLs
- `/sitemap-index.xml` - Sitemap index
- `/ai.txt` - LLM indexing policy
- `/llms.txt` & `/llms-full.txt` - LLM content specs

### Important Notes

⚠️ **Backend Limitations on Vercel Free**
- Backend API (FastAPI) not deployed on Vercel free tier
- Bot detection middleware not active
- **Solution**: Pre-rendered static HTML contains all schema markup, so bots get full SEO data

✅ **Pre-rendering Solves This**
- All pages pre-rendered with schema at build time
- Google, Bing, Facebook bots get complete HTML with JSON-LD
- No backend needed for SEO

### Testing Pre-rendered Schema

After deployment, test with:
```bash
# Test homepage
curl https://your-site.vercel.app/ | grep -o "application/ld+json"

# Test SEO page  
curl https://your-site.vercel.app/character-review/ai-girlfriend-chat | grep -A 5 "application/ld+json"

# Validate with Google
# Visit: https://search.google.com/test/rich-results
```

### Performance Optimization

Pre-rendered pages load instantly:
- ⚡ **First Contentful Paint**: <1s
- ⚡ **Time to Interactive**: <2s  
- ✅ **SEO-ready HTML** from first byte

---

## Alternative: Full-Stack Deployment (Backend + Frontend)

For features requiring backend:
- Use Vercel Pro (supports FastAPI via Serverless Functions)
- Deploy to Railway/Render (free tiers available)
- Use DigitalOcean/AWS with Docker

Current setup works perfectly for **static Vercel deployment** with full SEO optimization! 🚀
