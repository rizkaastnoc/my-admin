import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')  // Pastikan alias benar
    }
  },
  optimizeDeps: {
    include: ['vue']  // Force include Vue untuk composables
  }
})
