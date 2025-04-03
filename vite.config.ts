import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
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
    nodePolyfills(),
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
  },
});
