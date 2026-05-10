import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/teken-tool/',
  plugins: [react()],
  build: {
    target: 'esnext',
  },
})
