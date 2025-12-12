import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment:
// - Change '/bens-app/' to match your repository name
// - Example: if repo is "my-nutrition-app", use '/my-nutrition-app/'
// - For root domain (username.github.io), use '/'
export default defineConfig({
  base: '/bens-app/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  publicDir: 'public',
})

