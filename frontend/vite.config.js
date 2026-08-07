import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Combine both plugins into one array
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7777', // Your local backend port!
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Removes /api before hitting backend
      }
    }
  }
})