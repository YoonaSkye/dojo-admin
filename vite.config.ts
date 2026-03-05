import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';


import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

import { viteInjectAppLoadingPlugin } from './plugins/inject-app-loading';

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const viteEnv = loadEnv(config.mode, process.cwd());

  const isBuild = config.command === 'build';

  return {
    // 这里一定要用绝对路径
    base: viteEnv.VITE_BASE,
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'jse/index-[name]-[hash].js',
          manualChunks: {
            animate: ['motion'],
            antd: ['antd', '@ant-design/icons', '@ant-design/pro-components'],
            axios: ['axios'],
            il8n: ['react-i18next', 'i18next'],
            react: ['react', 'react-dom', 'react-error-boundary'],
            reactRouter: ['react-router-dom'],
            echarts: ['echarts'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      react(),
      viteInjectAppLoadingPlugin(),
      isBuild &&
        visualizer({
          filename: './node_modules/.cache/visualizer/stats.html',
          gzipSize: true,
          open: true,
        }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or 'modern'
        },
      },
    },
    server: {
      open: true,
      host: true,
      proxy: {
        '/api': {
          target: 'https://m1.apifoxmock.com/m1/5897771-5584603-default',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
