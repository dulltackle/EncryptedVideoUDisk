/**
 * 渲染进程入口文件
 * Vue 3 应用初始化和配置
 */

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { App as VueApp } from 'vue'
import type { ElectronAPI } from '../types/electron'

// 应用组件（暂时使用简单组件）
const AppComponent = {
  template: `
    <div class="app-container">
      <h1>加密视频U盘播放器</h1>
      <p>应用正在初始化...</p>
    </div>
  `
}

/**
 * 创建Vue应用实例
 */
function createVueApp(): VueApp {
  const app = createApp(AppComponent)
  
  // 注册Element Plus
  app.use(ElementPlus)
  
  // 全局属性
  app.config.globalProperties.$electronAPI = window.electronAPI
  
  return app
}

/**
 * 应用初始化
 */
function initializeApp(): void {
  // 检查Electron API是否可用
  if (!window.electronAPI) {
    console.error('Electron API not available')
    return
  }
  
  // 创建并挂载应用
  const app = createVueApp()
  app.mount('#app')
  
  console.log('Vue应用已启动')
}

// DOM加载完成后初始化应用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}

// 类型声明扩展
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}