import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteInjectAppLoadingPlugin } from './plugins/inject-app-loading';

// https://vitejs.dev/config/
export default defineConfig({
  // 这里一定要用绝对路径
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  plugins: [
    react(),
    viteInjectAppLoadingPlugin(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
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
});
