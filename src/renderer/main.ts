/**
 * 渲染进程入口文件
 * Vue 3 应用初始化和配置
 */

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import type { App as VueApp } from 'vue';
import type { ElectronAPI } from '../types/electron';

// 导入应用组件和配置
import App from './App.vue';
import router from './router';
import { setupStore } from './stores';

/**
 * 创建Vue应用实例
 */
function createVueApp(): VueApp {
  const app = createApp(App);

  // 配置状态管理
  setupStore(app);

  // 配置路由
  app.use(router);

  // 注册Element Plus
  app.use(ElementPlus);

  // 全局属性
  app.config.globalProperties.$electronAPI = window.electronAPI;

  // 全局错误处理
  app.config.errorHandler = (error, instance, info) => {
    console.error('Vue应用错误:', error);
    console.error('错误信息:', info);
    console.error('组件实例:', instance);
  };

  // 全局警告处理
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue应用警告:', msg);
    console.warn('组件实例:', instance);
    console.warn('组件追踪:', trace);
  };

  return app;
}

/**
 * 应用初始化
 */
async function initializeApp(): Promise<void> {
  try {
    console.log('开始初始化Vue应用...');

    // 检查Electron API是否可用
    if (!window.electronAPI) {
      console.warn('Electron API不可用，可能在浏览器环境中运行');
    }

    // 创建Vue应用实例
    const app = createVueApp();

    // 等待路由准备就绪
    await router.isReady();
    console.log('路由已准备就绪');

    // 挂载应用
    app.mount('#app');
    console.log('Vue应用已挂载到DOM');

    // 应用启动完成
    console.log('Vue应用初始化完成');
  } catch (error) {
    console.error('Vue应用初始化失败:', error);

    // 显示错误信息给用户
    const errorElement = document.createElement('div');
    errorElement.innerHTML = `
  <div style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fee;
    border: 1px solid #fcc;
    border-radius: 8px;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #c33;
    max-width: 400px;
    text-align: center;
  ">
    <h3>应用启动失败</h3>
    <p>请刷新页面重试，或联系技术支持。</p>
    <details style="margin-top: 10px; text-align: left;">
      <summary>错误详情</summary>
      <pre style="font-size: 12px; margin-top: 10px;">${error}</pre>
    </details>
  </div>
`;
    document.body.appendChild(errorElement);
  }
}

/**
 * 页面加载完成后初始化应用
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

/**
 * 页面卸载前的清理工作
 */
window.addEventListener('beforeunload', () => {
  console.log('页面即将卸载，执行清理工作...');
  // TODO: 添加必要的清理逻辑
});

/**
 * 全局未捕获错误处理
 */
window.addEventListener('error', event => {
  console.error('全局错误:', event.error);
  console.error('错误文件:', event.filename);
  console.error('错误行号:', event.lineno);
  console.error('错误列号:', event.colno);
});

/**
 * 全局未处理的Promise拒绝
 */
window.addEventListener('unhandledrejection', event => {
  console.error('未处理的Promise拒绝:', event.reason);
  event.preventDefault(); // 阻止默认的错误处理
});

// 类型声明扩展
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
