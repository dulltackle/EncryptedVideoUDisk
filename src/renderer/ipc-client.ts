/**
 * 渲染进程 IPC 客户端
 * 提供类型安全的IPC调用接口
 */

import { IPC, isSuccessResponse } from '../shared/ipc';
import type {
  IPCResponse,
  SystemInfo,
  WindowState,
  FileSelectOptions,
  FileInfo,
  FileSaveOptions,
  AppConfig,
} from '../shared/ipc';

// ============================================================================
// IPC客户端类
// ============================================================================

/**
 * IPC客户端类
 * 封装所有与主进程的通信逻辑
 */
export class IPCClient {
  private static instance: IPCClient;
  private requestTimeout = 10000; // 10秒超时

  /**
   * 获取单例实例
   */
  public static getInstance(): IPCClient {
    if (!IPCClient.instance) {
      IPCClient.instance = new IPCClient();
    }
    return IPCClient.instance;
  }

  /**
   * 设置请求超时时间
   */
  public setRequestTimeout(timeout: number): void {
    this.requestTimeout = timeout;
  }

  /**
   * 通用IPC调用方法
   */
  private async invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API 不可用，请确保在Electron环境中运行');
      }

      // 创建超时Promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`IPC调用超时: ${channel}`));
        }, this.requestTimeout);
      });

      // 执行IPC调用
      const ipcPromise = (
        window.electronAPI as {
          invoke: (channel: string, ...args: unknown[]) => Promise<IPCResponse<T>>;
        }
      ).invoke(channel, ...args);

      // 等待结果或超时
      const response: IPCResponse<T> = await Promise.race([ipcPromise, timeoutPromise]);

      // 检查响应是否成功
      if (isSuccessResponse(response)) {
        if (response.data === undefined) {
          throw new Error(`IPC响应数据为空: ${channel}`);
        }
        return response.data;
      }

      // 抛出错误
      throw new Error(response.error || '未知错误');
    } catch (error) {
      console.error(`IPC调用失败 [${channel}]:`, error);
      throw error;
    }
  }

  /**
   * 安全的IPC调用方法（不抛出异常）
   */
  private async safeInvoke<T>(channel: string, ...args: unknown[]): Promise<IPCResponse<T>> {
    try {
      const data = await this.invoke<T>(channel, ...args);
      return {
        success: true,
        data,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: Date.now(),
      };
    }
  }

  // ============================================================================
  // 窗口控制方法
  // ============================================================================

  /**
   * 最小化窗口
   */
  public async minimizeWindow(): Promise<void> {
    return this.invoke<void>(IPC.WINDOW.MINIMIZE);
  }

  /**
   * 最大化/还原窗口
   */
  public async maximizeWindow(): Promise<void> {
    return this.invoke<void>(IPC.WINDOW.MAXIMIZE);
  }

  /**
   * 关闭窗口
   */
  public async closeWindow(): Promise<void> {
    return this.invoke<void>(IPC.WINDOW.CLOSE);
  }

  /**
   * 获取窗口状态
   */
  public async getWindowState(): Promise<WindowState> {
    return this.invoke<WindowState>(IPC.WINDOW.GET_STATE);
  }

  /**
   * 安全的窗口控制方法（不抛出异常）
   */
  public async safeMinimizeWindow(): Promise<IPCResponse<void>> {
    return this.safeInvoke<void>(IPC.WINDOW.MINIMIZE);
  }

  public async safeMaximizeWindow(): Promise<IPCResponse<void>> {
    return this.safeInvoke<void>(IPC.WINDOW.MAXIMIZE);
  }

  public async safeCloseWindow(): Promise<IPCResponse<void>> {
    return this.safeInvoke<void>(IPC.WINDOW.CLOSE);
  }

  // ============================================================================
  // 系统信息方法
  // ============================================================================

  /**
   * 获取系统信息
   */
  public async getSystemInfo(): Promise<SystemInfo> {
    return this.invoke<SystemInfo>(IPC.SYSTEM.GET_INFO);
  }

  /**
   * 安全获取系统信息
   */
  public async safeGetSystemInfo(): Promise<IPCResponse<SystemInfo>> {
    return this.safeInvoke<SystemInfo>(IPC.SYSTEM.GET_INFO);
  }

  // ============================================================================
  // 文件操作方法
  // ============================================================================

  /**
   * 打开文件选择对话框
   */
  public async openFileDialog(options: FileSelectOptions = {}): Promise<string[]> {
    return this.invoke<string[]>(IPC.FILE.OPEN_DIALOG, options);
  }

  /**
   * 打开文件保存对话框
   */
  public async saveFileDialog(options: FileSaveOptions = {}): Promise<string | null> {
    return this.invoke<string | null>(IPC.FILE.SAVE_DIALOG, options);
  }

  /**
   * 读取文件内容
   */
  public async readFile(filePath: string): Promise<string> {
    return this.invoke<string>(IPC.FILE.READ, filePath);
  }

  /**
   * 写入文件内容
   */
  public async writeFile(filePath: string, content: string): Promise<void> {
    return this.invoke<void>(IPC.FILE.WRITE, filePath, content);
  }

  /**
   * 获取文件信息
   */
  public async getFileInfo(filePath: string): Promise<FileInfo> {
    return this.invoke<FileInfo>(IPC.FILE.GET_INFO, filePath);
  }

  /**
   * 检查文件是否存在
   */
  public async fileExists(filePath: string): Promise<boolean> {
    return this.invoke<boolean>(IPC.FILE.EXISTS, filePath);
  }

  /**
   * 安全的文件操作方法
   */
  public async safeOpenFileDialog(options: FileSelectOptions = {}): Promise<IPCResponse<string[]>> {
    return this.safeInvoke<string[]>(IPC.FILE.OPEN_DIALOG, options);
  }

  public async safeReadFile(filePath: string): Promise<IPCResponse<string>> {
    return this.safeInvoke<string>(IPC.FILE.READ, filePath);
  }

  public async safeWriteFile(filePath: string, content: string): Promise<IPCResponse<void>> {
    return this.safeInvoke<void>(IPC.FILE.WRITE, filePath, content);
  }

  // ============================================================================
  // 应用配置方法
  // ============================================================================

  /**
   * 获取应用配置
   */
  public async getAppConfig(): Promise<Partial<AppConfig>> {
    return this.invoke<Partial<AppConfig>>(IPC.CONFIG.GET);
  }

  /**
   * 设置应用配置
   */
  public async setAppConfig(config: Partial<AppConfig>): Promise<void> {
    return this.invoke<void>(IPC.CONFIG.SET, config);
  }

  /**
   * 安全的配置操作方法
   */
  public async safeGetAppConfig(): Promise<IPCResponse<Partial<AppConfig>>> {
    return this.safeInvoke<Partial<AppConfig>>(IPC.CONFIG.GET);
  }

  public async safeSetAppConfig(config: Partial<AppConfig>): Promise<IPCResponse<void>> {
    return this.safeInvoke<void>(IPC.CONFIG.SET, config);
  }

  // ============================================================================
  // 批量操作方法
  // ============================================================================

  /**
   * 批量执行IPC调用
   */
  public async batchInvoke<T extends Record<string, unknown>>(
    calls: Array<{
      key: keyof T;
      channel: string;
      args?: unknown[];
    }>
  ): Promise<Partial<T>> {
    const results: Partial<T> = {};

    // 并行执行所有调用
    const promises = calls.map(async call => {
      try {
        const result = await this.invoke(call.channel, ...(call.args || []));
        return { key: call.key, result, success: true };
      } catch (error) {
        console.error(`批量IPC调用失败 [${String(call.key)}]:`, error);
        return { key: call.key, error, success: false };
      }
    });

    const responses = await Promise.allSettled(promises);

    // 处理结果
    responses.forEach(response => {
      if (response.status === 'fulfilled' && response.value.success) {
        results[response.value.key] = response.value.result as T[keyof T];
      }
    });

    return results;
  }

  // ============================================================================
  // 工具方法
  // ============================================================================

  /**
   * 检查Electron API是否可用
   */
  public isElectronAPIAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.electronAPI;
  }

  /**
   * 获取IPC客户端状态
   */
  public getClientStatus(): {
    isAvailable: boolean;
    timeout: number;
    version: string;
  } {
    return {
      isAvailable: this.isElectronAPIAvailable(),
      timeout: this.requestTimeout,
      version: '1.0.0',
    };
  }

  /**
   * 测试IPC连接
   */
  public async testConnection(): Promise<boolean> {
    try {
      await this.getSystemInfo();
      return true;
    } catch {
      return false;
    }
  }
}

// ============================================================================
// 默认实例和便利方法
// ============================================================================

/**
 * 默认IPC客户端实例
 */
export const ipcClient = IPCClient.getInstance();

/**
 * 便利方法：窗口控制
 */
export const windowControls = {
  minimize: () => ipcClient.minimizeWindow(),
  maximize: () => ipcClient.maximizeWindow(),
  close: () => ipcClient.closeWindow(),
  getState: () => ipcClient.getWindowState(),
  safeMinimize: () => ipcClient.safeMinimizeWindow(),
  safeMaximize: () => ipcClient.safeMaximizeWindow(),
  safeClose: () => ipcClient.safeCloseWindow(),
};

/**
 * 便利方法：系统信息
 */
export const systemInfo = {
  get: () => ipcClient.getSystemInfo(),
  safeGet: () => ipcClient.safeGetSystemInfo(),
};

/**
 * 便利方法：文件操作
 */
export const fileOperations = {
  openDialog: (options?: FileSelectOptions) => ipcClient.openFileDialog(options),
  saveDialog: (options?: FileSaveOptions) => ipcClient.saveFileDialog(options),
  read: (filePath: string) => ipcClient.readFile(filePath),
  write: (filePath: string, content: string) => ipcClient.writeFile(filePath, content),
  getInfo: (filePath: string) => ipcClient.getFileInfo(filePath),
  exists: (filePath: string) => ipcClient.fileExists(filePath),
  safeOpenDialog: (options?: FileSelectOptions) => ipcClient.safeOpenFileDialog(options),
  safeRead: (filePath: string) => ipcClient.safeReadFile(filePath),
  safeWrite: (filePath: string, content: string) => ipcClient.safeWriteFile(filePath, content),
};

/**
 * 便利方法：应用配置
 */
export const appConfig = {
  get: () => ipcClient.getAppConfig(),
  set: (config: Partial<AppConfig>) => ipcClient.setAppConfig(config),
  safeGet: () => ipcClient.safeGetAppConfig(),
  safeSet: (config: Partial<AppConfig>) => ipcClient.safeSetAppConfig(config),
};

// ============================================================================
// Vue 3 组合式API支持
// ============================================================================

/**
 * Vue 3 组合式API：使用IPC客户端
 */
export function useIPCClient() {
  return {
    client: ipcClient,
    windowControls,
    systemInfo,
    fileOperations,
    appConfig,
    isAvailable: ipcClient.isElectronAPIAvailable(),
    testConnection: ipcClient.testConnection.bind(ipcClient),
  };
}

/**
 * Vue 3 组合式API：窗口控制
 */
export function useWindowControls() {
  return windowControls;
}

/**
 * Vue 3 组合式API：文件操作
 */
export function useFileOperations() {
  return fileOperations;
}

/**
 * Vue 3 组合式API：系统信息
 */
export function useSystemInfo() {
  return systemInfo;
}

// ============================================================================
// 类型声明扩展
// ============================================================================

// 类型声明扩展已在 src/types/electron.d.ts 中定义

console.log('渲染进程IPC客户端模块已加载');
