# Deploying Your Astro Site

This guide covers different methods for deploying your Astro site to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Build Process](#build-process)
- [Deployment Options](#deployment-options)
  - [Static Hosting (Recommended)](#static-hosting-recommended)
  - [Server-Side Rendering (SSR)](#server-side-rendering-ssr)

## Prerequisites

Before deploying, ensure you have:
- Node.js 16.12.0 or higher installed
- Your Astro project using the latest version
- All dependencies installed (`npm install`)
- Environment variables configured properly

## Build Process

1. Run the build command:
```bash
npm run build
```

This will create a `dist/` directory with your production-ready files.

2. Preview your build locally (optional):
```bash
npm run preview
```

## Deployment Options

### Static Hosting (Recommended)

#### Netlify
1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

#### Vercel
1. Push your code to a Git repository
2. Import your project to Vercel
3. Build settings will be auto-detected
4. Deploy!

#### GitHub Pages
1. In `astro.config.mjs`, set your site:
```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
})
```

2. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v1
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v1
```

### Server-Side Rendering (SSR)

If using SSR, additional configuration is required:

1. Enable SSR in your config:
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server'
})
```

2. Choose an adapter based on your hosting platform:
```bash
# For Node.js
npm install @astrojs/node

# For Deno
npm install @astrojs/deno

# For Cloudflare
npm install @astrojs/cloudflare
```

3. Configure the adapter in `astro.config.mjs`:
```javascript
import nodejs from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: nodejs({
    mode: 'standalone'
  })
})
```

## Environment Variables

1. Local development:
   - Create `.env` file in project root
   - Add to `.gitignore`

2. Production:
   - Configure environment variables in your hosting platform
   - Ensure all required variables are set

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check all static assets are served properly
- [ ] Confirm environment variables are working
- [ ] Test all interactive features
- [ ] Validate performance using Lighthouse
- [ ] Check SSL/HTTPS configuration

## Troubleshooting

Common issues and solutions:

1. **404 errors on routes**:
   - Check base URL configuration
   - Verify routing patterns
   - Ensure all paths are correct

2. **Missing static assets**:
   - Confirm assets are in `public/` directory
   - Check file paths are correct
   - Verify build output

3. **Build failures**:
   - Check Node.js version
   - Verify all dependencies are installed
   - Review build logs for errors

## Additional Resources

- [Official Astro Deployment Guides](https://docs.astro.build/en/guides/deploy/)
- [Astro SSR Guide](https://docs.astro.build/en/guides/server-side-rendering/)
- [Environment Variables Guide](https://docs.astro.build/en/guides/environment-variables/)
