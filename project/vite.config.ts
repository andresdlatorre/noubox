import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    hmr: {
      timeout: 60000, // Increased timeout to 60 seconds
      overlay: true,
      clientPort: 3000,
      path: '@hmr'
    },
    watch: {
      usePolling: false
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  optimizeDeps: {
    include: ['@headlessui/react'],
    exclude: [
      'lucide-react'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    chunkSizeWarningLimit: 2000, // Increased chunk size limit
    commonjsOptions: {
      transformMixedEsModules: true
    },
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false
  },
  cacheDir: '.vite'
})