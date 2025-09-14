/**
 * 窗口管理模块
 * 负责应用窗口的创建、配置和生命周期管理
 */

import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { join } from 'path';

/**
 * 窗口配置接口
 */
export interface WindowConfig {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  resizable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  show?: boolean;
  titleBarStyle?: 'default' | 'hidden' | 'hiddenInset' | 'customButtonsOnHover';
}

/**
 * 默认窗口配置
 * 针对医学视频播放器的适老化设计
 */
const DEFAULT_WINDOW_CONFIG: WindowConfig = {
  width: 1200,
  height: 800,
  minWidth: 800,
  minHeight: 600,
  resizable: true,
  maximizable: true,
  minimizable: true,
  show: false,
  titleBarStyle: 'default',
};

/**
 * 窗口管理器类
 */
export class WindowManager {
  private mainWindow: BrowserWindow | null = null;
  private isDev: boolean;

  constructor() {
    this.isDev = process.env.NODE_ENV === 'development';
  }

  /**
   * 创建主窗口
   * @param config 窗口配置，可选
   * @returns 创建的窗口实例
   */
  public createMainWindow(config?: Partial<WindowConfig>): BrowserWindow {
    const windowConfig = { ...DEFAULT_WINDOW_CONFIG, ...config };
    const webPreferences = {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: join(__dirname, 'preload.js'),
    };

    const browserWindowOptions: BrowserWindowConstructorOptions = {
      ...windowConfig,
      webPreferences,
      // 适老化设计：避免复杂的窗口装饰
      frame: true,
      transparent: false,
    };

    // 生产环境下添加图标
    if (!this.isDev) {
      browserWindowOptions.icon = join(__dirname, '../../resources/icon.png');
    }

    this.mainWindow = new BrowserWindow(browserWindowOptions);

    this.setupWindowEvents();
    this.loadContent();

    return this.mainWindow;
  }

  /**
   * 设置窗口事件监听
   */
  private setupWindowEvents(): void {
    if (!this.mainWindow) {
      return;
    }

    // 窗口准备就绪后显示（避免白屏闪烁）
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();

      // 开发环境下打开开发者工具
      if (this.isDev) {
        this.mainWindow?.webContents.openDevTools();
      }
    });

    // 窗口关闭事件
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // 防止新窗口打开（安全考虑）
    this.mainWindow.webContents.setWindowOpenHandler(() => {
      return { action: 'deny' };
    });

    // 防止导航到外部链接（安全考虑）
    this.mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);

      // 只允许本地开发服务器和本地文件
      if (this.isDev && parsedUrl.origin === 'http://localhost:5173') {
        return;
      }

      if (parsedUrl.protocol === 'file:') {
        return;
      }

      // 阻止其他导航
      event.preventDefault();
    });
  }

  /**
   * 加载窗口内容
   */
  private loadContent(): void {
    if (!this.mainWindow) {
      return;
    }

    if (this.isDev) {
      // 开发环境：加载Vite开发服务器
      this.mainWindow.loadURL('http://localhost:5173');
    } else {
      // 生产环境：加载打包后的文件
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
  }

  /**
   * 获取主窗口实例
   * @returns 主窗口实例或null
   */
  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }

  /**
   * 最小化窗口
   */
  public minimizeWindow(): void {
    this.mainWindow?.minimize();
  }

  /**
   * 最大化/还原窗口
   */
  public toggleMaximizeWindow(): void {
    if (this.mainWindow?.isMaximized()) {
      this.mainWindow.unmaximize();
    } else {
      this.mainWindow?.maximize();
    }
  }

  /**
   * 关闭窗口
   */
  public closeWindow(): void {
    this.mainWindow?.close();
  }

  /**
   * 检查窗口是否存在
   * @returns 窗口是否存在
   */
  public hasWindow(): boolean {
    return this.mainWindow !== null && !this.mainWindow.isDestroyed();
  }

  /**
   * 聚焦窗口
   */
  public focusWindow(): void {
    if (this.hasWindow()) {
      this.mainWindow?.focus();
    }
  }

  /**
   * 设置窗口标题
   * @param title 窗口标题
   */
  public setWindowTitle(title: string): void {
    this.mainWindow?.setTitle(title);
  }

  /**
   * 销毁所有窗口
   */
  public destroyAllWindows(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.destroy();
      this.mainWindow = null;
    }
  }
}

// 导出单例实例
export const windowManager = new WindowManager();
