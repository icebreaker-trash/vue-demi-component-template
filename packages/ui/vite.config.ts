import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { visualizer } from "rollup-plugin-visualizer";

const config = defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },

  plugins: [
    vue(),
    vueJsx(),
  ],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  server: {
    port: 3333,
  },
  build: {
    minify: true,
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, './exports.ts'),
      name: 'vue-dom-sheet',
      // the proper extensions will be added
      fileName: 'vue-dom-sheet',
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        dir: path.resolve(__dirname, '../ui-dist/dist'),
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        plugins: [visualizer()],
      },
    },
  },
})

export default config
