import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 项目站点部署到 https://zjy-141.github.io/academic_term_explainer_skill/
  base: '/academic_term_explainer_skill/', 
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 5273,
    strictPort: false,
    watch: {
      // Windows 下编辑器/工具的原子写入会产生临时目录，避免 chokidar 触发 EBUSY
      usePolling: true,
      interval: 400,
      ignored: ['**/node_modules/**', '**/.shots/**', '**/*.tmpdir/**', '**/*.tmp'],
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
  },
})