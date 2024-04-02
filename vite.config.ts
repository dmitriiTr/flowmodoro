import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      name: 'Flowmodoro',
      short_name: 'Flowmodoro',
      theme_color: '#317EFB',
      icons: [
        {
          src: 'Blisk-logo-512-512.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'Blisk-logo-512-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    registerType: 'autoUpdate',
    // add this to cache all the imports
    workbox: {
      globPatterns: ['**/*'],
    },
    // add this to cache all the
    // static assets in the public folder
    includeAssets: [
      '**/*',
    ],
  })],
  server: {
    port: 8000
  }
});
