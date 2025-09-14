/**
 * Electron 主进程入口文件
 * 负责应用生命周期管理和系统级事件处理
 */

import { app, ipcMain } from 'electron';
import { windowManager } from './window-manager';
import { initializeSecurity } from './security';
import { logger } from './utils';
import { errorHandler } from './utils';
import { getSystemInfo } from './utils';
import { IPC_CHANNELS } from '../types/electron';

/**
 * 初始化应用
 */
function initializeApp(): void {
  // 初始化安全配置
  initializeSecurity();

  // 记录应用启动信息
  const systemInfo = getSystemInfo();
  logger.info('应用启动', {
    version: systemInfo.appVersion,
    platform: systemInfo.platform,
    nodeVersion: systemInfo.nodeVersion,
    electronVersion: systemInfo.electronVersion,
  });

  // 创建主窗口
  windowManager.createMainWindow();
  windowManager.setWindowTitle('加密视频U盘播放器');

  logger.info('主窗口已创建');
}

/**
 * 应用启动事件
 */
app.whenReady().then(() => {
  try {
    initializeApp();
  } catch (error) {
    logger.error('应用初始化失败:', error);
    app.quit();
  }

  // macOS 特殊处理
  app.on('activate', () => {
    if (!windowManager.hasWindow()) {
      windowManager.createMainWindow();
    }
  });
});

/**
 * 所有窗口关闭事件
 */
app.on('window-all-closed', () => {
  logger.info('所有窗口已关闭');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * 应用退出前事件
 */
app.on('before-quit', () => {
  logger.info('应用即将退出');
  windowManager.destroyAllWindows();
});

/**
 * IPC 事件处理
 */

// 窗口控制
ipcMain.handle(IPC_CHANNELS.WINDOW_MINIMIZE, () => {
  try {
    windowManager.minimizeWindow();
    logger.debug('窗口已最小化');
  } catch (error) {
    logger.error('窗口最小化失败:', error);
  }
});

ipcMain.handle(IPC_CHANNELS.WINDOW_MAXIMIZE, () => {
  try {
    windowManager.toggleMaximizeWindow();
    logger.debug('窗口最大化状态已切换');
  } catch (error) {
    logger.error('窗口最大化失败:', error);
  }
});

ipcMain.handle(IPC_CHANNELS.WINDOW_CLOSE, () => {
  try {
    windowManager.closeWindow();
    logger.debug('窗口关闭请求已处理');
  } catch (error) {
    logger.error('窗口关闭失败:', error);
  }
});

// 系统信息
ipcMain.handle(IPC_CHANNELS.GET_SYSTEM_INFO, () => {
  try {
    const systemInfo = getSystemInfo();
    logger.debug('系统信息已获取');
    return systemInfo;
  } catch (error) {
    logger.error('获取系统信息失败:', error);
    throw error;
  }
});

// 应用级错误处理
errorHandler.onError(error => {
  // 在这里可以添加错误上报、用户通知等逻辑
  logger.error('应用错误:', error.toJSON());
});

// 应用安全退出
process.on('SIGTERM', () => {
  logger.info('收到SIGTERM信号，正在安全退出...');
  app.quit();
});

process.on('SIGINT', () => {
  logger.info('收到SIGINT信号，正在安全退出...');
  app.quit();
});

logger.info('主进程已启动，等待应用就绪...');
