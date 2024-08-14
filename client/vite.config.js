import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const isProduction = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // specify the host
    port: isProduction ? 3001 : 3000, // specify the port
    open: !isProduction, 
    // strictPort: true, // if true, exit if the port is already in use
    proxy: {
      // proxy requests matching the context to the target
      '/graphql': {
        target: isProduction
        ? process.env.GRAPHQL_SERVER_URL  // Replace with your production server URL
        : 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
