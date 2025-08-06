import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@features': path.resolve(__dirname, './src/features'),
        '@shared-components': path.resolve(__dirname, './src/shared/components'),
        '@shared-stores': path.resolve(__dirname, './src/shared/stores'),
        '@shared-hooks': path.resolve(__dirname, './src/shared/hooks'),
        '@shared-utils': path.resolve(__dirname, './src/shared/utils'),
        '@shared-types': path.resolve(__dirname, './src/shared/types'),
        '@shared-constants': path.resolve(__dirname, './src/shared/constants'),
        '@config': path.resolve(__dirname, './src/config'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: env.GENERATE_SOURCEMAP === 'true',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            antd: ['antd'],
            utils: ['axios', 'zustand'],
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  };
})
