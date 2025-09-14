/**
 * Vite 配置文件
 * 用于渲染进程的构建配置
 */

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import type { UserConfig } from 'vite';

/**
 * Vite 配置
 */
export default defineConfig(({ command, mode }): UserConfig => {
  const isDev = command === 'serve';
  const isProd = command === 'build';

  console.log(`Vite 构建模式: ${mode}, 命令: ${command}`);

  return {
    // 项目根目录
    root: resolve(__dirname, 'src/renderer'),

    // 插件配置
    plugins: [
      vue({
        // Vue 插件选项
        template: {
          compilerOptions: {
            // 兼容性选项
            compatConfig: {
              MODE: 2, // Vue 2 兼容模式
            },
          },
        },
      }),
    ],

    // 路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer'),
        '@renderer': resolve(__dirname, 'src/renderer'),
        '@shared': resolve(__dirname, 'src/shared'),
        '@components': resolve(__dirname, 'src/renderer/components'),
        '@views': resolve(__dirname, 'src/renderer/views'),
        '@stores': resolve(__dirname, 'src/renderer/stores'),
        '@utils': resolve(__dirname, 'src/renderer/utils'),
        '@assets': resolve(__dirname, 'src/renderer/assets'),
        '@styles': resolve(__dirname, 'src/renderer/styles'),
      },
      // 文件扩展名
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
    },

    // CSS 配置
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        scss: {
          // SCSS 全局变量
          additionalData: `
            @import "@/styles/variables.scss";
            @import "@/styles/mixins.scss";
          `,
        },
      },
      // CSS 模块
      modules: {
        localsConvention: 'camelCase',
      },
    },

    // 开发服务器配置
    server: {
      port: 3000,
      host: '127.0.0.1',
      strictPort: true,
      // 热更新
      hmr: {
        port: 3001,
      },
      // 代理配置（如果需要）
      proxy: {
        // '/api': {
        //   target: 'http://localhost:8080',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
      },
    },

    // 构建配置
    build: {
      // 输出目录
      outDir: resolve(__dirname, 'dist/renderer'),
      // 清空输出目录
      emptyOutDir: true,
      // 源码映射
      sourcemap: isDev ? 'inline' : false,
      // 压缩配置
      minify: isProd ? 'terser' : false,
      // Terser 选项
      terserOptions: {
        compress: {
          // 移除 console
          drop_console: isProd,
          // 移除 debugger
          drop_debugger: isProd,
        },
      },
      // Rollup 选项
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/renderer/index.html'),
        },
        output: {
          // 代码分割
          manualChunks: {
            // Vue 相关
            vue: ['vue', 'vue-router', 'pinia'],
            // Element Plus
            'element-plus': ['element-plus'],
            // 工具库
            utils: ['crypto-js'],
          },
        },
        external: [
          // Electron 相关模块不打包
          'electron',
        ],
      },
      // 构建目标
      target: 'esnext',
      // 库模式（如果需要）
      // lib: {
      //   entry: resolve(__dirname, 'src/renderer/main.ts'),
      //   name: 'RendererApp',
      //   fileName: 'renderer-app',
      // },
    },

    // 环境变量
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: isDev,
      // 自定义环境变量
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '0.1.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // 优化配置
    optimizeDeps: {
      // 预构建依赖
      include: ['vue', 'vue-router', 'pinia', 'element-plus', 'crypto-js'],
      // 排除预构建
      exclude: ['electron'],
    },

    // 实验性功能
    experimental: {
      // 渲染内置模块
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { js: `"./" + ${JSON.stringify(filename)}` };
        }
        return { relative: true };
      },
    },

    // 日志级别
    logLevel: isDev ? 'info' : 'warn',

    // 清除控制台
    clearScreen: false,
  };
});
