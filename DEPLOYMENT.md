# AI-Characters.org - Deployment Guide

## Vercel Deployment Instructions

### Prerequisites
- Vercel account
- Domain `ai-characters.org` configured in Vercel

### Deployment Steps

1. **Connect Repository to Vercel**
   ```bash
   # Import project from GitHub
   # Connect to your ai-characters repository
   ```

2. **Configure Build Settings**
   - Framework Preset: `Create React App`
   - Build Command: `cd frontend && yarn build`
   - Output Directory: `frontend/build`
   - Install Command: `cd frontend && yarn install`

3. **Environment Variables** (if needed)
   - No backend environment variables needed for static deployment

4. **Deploy**
   - Push to `main` branch
   - Vercel will auto-deploy

### Domain Configuration

**Add Custom Domain in Vercel:**
1. Go to Project Settings > Domains
2. Add `ai-characters.org`
3. Add `www.ai-characters.org` (redirect to main)
4. Configure DNS records:
   - `A` record: `76.76.21.21` (Vercel's IP)
   - `CNAME` record for www: `cname.vercel-dns.com`

### Post-Deployment Verification

**Check SEO Files:**
- ✅ https://ai-characters.org/robots.txt
- ✅ https://ai-characters.org/sitemap.xml
- ✅ https://ai-characters.org/ai.txt
- ✅ https://ai-characters.org/llms.txt
- ✅ https://ai-characters.org/llms-full.txt

**Submit Sitemaps:**
1. Google Search Console: Add `https://ai-characters.org/sitemap.xml`
2. Bing Webmaster Tools: Add `https://ai-characters.org/sitemap.xml`

### Important Notes

**Static Files Location:**
All SEO files are in `/frontend/public/`:
- `robots.txt` (1 KB)
- `sitemap.xml` (58 KB, 309 URLs)
- `sitemap-index.xml` (600 bytes)
- `sitemap.xsl` (styling for sitemap)
- `ai.txt` (1.4 KB)
- `llms.txt` (6.3 KB)
- `llms-full.txt` (9 KB)

**Sitemap Updates:**
To regenerate sitemap after adding pages:
```bash
python3 /app/scripts/generate_sitemaps.py
```

### Vercel Configuration

**vercel.json** is configured for:
- Proper Content-Type headers for SEO files
- Cache-Control headers for optimal performance
- SPA routing (all routes → index.html)

### Backend Note

This is a **frontend-only deployment**. Backend API routes are not needed for:
- Static content
- SEO files
- Client-side routing

All platform data is in:
- `/frontend/src/data/mockData.js`
- `/frontend/src/data/seoPages.js`
- `/frontend/src/data/seoPageClusters.js`

### Performance Tips

1. **Enable Vercel Analytics** in project settings
2. **Enable Speed Insights** for Core Web Vitals
3. **Configure Edge Caching** for static assets
4. **Add Vercel Image Optimization** if using many images

### Support

For deployment issues:
- Check Vercel deployment logs
- Verify build command completes successfully
- Ensure all dependencies in `package.json`
