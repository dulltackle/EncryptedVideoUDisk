/**
 * Pinia 状态管理入口文件
 * 配置和导出所有 stores
 */

import { createPinia } from 'pinia';
import type { App } from 'vue';

/**
 * 创建 Pinia 实例
 */
export const pinia = createPinia();

/**
 * 安装 Pinia 插件
 */
export function setupStore(app: App<Element>): void {
  app.use(pinia);
}

/**
 * 导出所有 stores
 */
export { useAppStore } from './app';
export type { AppStore, AppState } from './app';

// TODO: 后续添加其他 stores
// export { useAuthStore } from './auth';
// export { useVideoStore } from './video';
// export { useSettingsStore } from './settings';
