import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://orchestrate-suite.com', 
  integrations: [
    tailwind(),
    react()
  ],
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  vite: {
    build: {
      sourcemap: true
    },
    optimizeDeps: {
      exclude: ['@astrojs/image', 'sharp']
    },
    ssr: {
      noExternal: ['alpinejs']
    }
  }
});