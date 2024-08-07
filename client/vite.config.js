import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // specify the host
    port: 3001, // specify the port
    open: true, 
    strictPort: true, // if true, exit if the port is already in use
    proxy: {
      // proxy requests matching the context to the target
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
