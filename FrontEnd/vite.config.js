import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['aqua.nurul-ilham.xyz', 'nurul-ilham.xyz'],
  },
})
