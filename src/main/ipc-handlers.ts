/**
 * 主进程 IPC 处理器
 * 处理来自渲染进程的所有IPC请求
 */

import { ipcMain, dialog } from 'electron';
import { promises as fs } from 'fs';
import { dirname, basename, extname } from 'path';
import { windowManager } from './window-manager';
import { logger, getSystemInfo } from './utils';
import {
  IPC,
  createSuccessResponse,
  createErrorResponse,
  createIPCError,
  IPC_ERROR_CODES,
  ipcErrorHandler,
} from '../shared/ipc';
import { IPCErrorType } from '../shared/ipc/types';
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
// 窗口控制处理器
// ============================================================================

/**
 * 窗口最小化处理器
 */
ipcMain.handle(IPC.WINDOW.MINIMIZE, async (): Promise<IPCResponse<void>> => {
  try {
    logger.debug('收到窗口最小化请求');
    windowManager.minimizeWindow();
    logger.info('窗口已最小化');
    return createSuccessResponse(undefined);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.SYSTEM_ERROR,
      IPC_ERROR_CODES.SYSTEM_ERROR,
      `窗口最小化失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error }
    );
    logger.error('窗口最小化失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 窗口最大化/还原处理器
 */
ipcMain.handle(IPC.WINDOW.MAXIMIZE, async (): Promise<IPCResponse<void>> => {
  try {
    logger.debug('收到窗口最大化/还原请求');
    windowManager.toggleMaximizeWindow();
    logger.info('窗口最大化状态已切换');
    return createSuccessResponse(undefined);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.SYSTEM_ERROR,
      IPC_ERROR_CODES.SYSTEM_ERROR,
      `窗口最大化失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error }
    );
    logger.error('窗口最大化失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 窗口关闭处理器
 */
ipcMain.handle(IPC.WINDOW.CLOSE, async (): Promise<IPCResponse<void>> => {
  try {
    logger.debug('收到窗口关闭请求');
    windowManager.closeWindow();
    logger.info('窗口关闭请求已处理');
    return createSuccessResponse(undefined);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.SYSTEM_ERROR,
      IPC_ERROR_CODES.SYSTEM_ERROR,
      `窗口关闭失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error }
    );
    logger.error('窗口关闭失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 获取窗口状态处理器
 */
ipcMain.handle(IPC.WINDOW.GET_STATE, async (): Promise<IPCResponse<WindowState>> => {
  try {
    logger.debug('收到获取窗口状态请求');
    const mainWindow = windowManager.getMainWindow();

    if (!mainWindow) {
      const ipcError = createIPCError(IPCErrorType.SYSTEM_ERROR, IPC_ERROR_CODES.SYSTEM_ERROR, '主窗口不存在');
      logger.error('获取窗口状态失败: 主窗口不存在');
      return createErrorResponse(ipcError);
    }

    const bounds = mainWindow.getBounds();
    const windowState: WindowState = {
      isMaximized: mainWindow.isMaximized(),
      isMinimized: mainWindow.isMinimized(),
      isFullScreen: mainWindow.isFullScreen(),
      isVisible: mainWindow.isVisible(),
      bounds: {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
      },
    };

    logger.debug('窗口状态已获取:', windowState);
    return createSuccessResponse(windowState);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.SYSTEM_ERROR,
      IPC_ERROR_CODES.SYSTEM_ERROR,
      `获取窗口状态失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error }
    );
    logger.error('获取窗口状态失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

// ============================================================================
// 系统信息处理器
// ============================================================================

/**
 * 获取系统信息处理器
 */
ipcMain.handle(IPC.SYSTEM.GET_INFO, async (): Promise<IPCResponse<SystemInfo>> => {
  try {
    logger.debug('收到获取系统信息请求');
    const sysInfo = getSystemInfo();
    // 转换为符合IPC SystemInfo类型的格式
    const systemInfo: SystemInfo = {
      platform: sysInfo.platform,
      arch: sysInfo.arch,
      osVersion: sysInfo.release || 'unknown',
      appVersion: sysInfo.appVersion,
      electronVersion: sysInfo.electronVersion,
      nodeVersion: sysInfo.nodeVersion,
      memory: {
        total: Math.round(sysInfo.memory.total / 1024 / 1024),
        available: Math.round(sysInfo.memory.free / 1024 / 1024),
        used: Math.round(sysInfo.memory.used / 1024 / 1024),
      },
      cpu: {
        model: 'unknown',
        cores: 0,
        usage: 0,
      },
    };
    logger.debug('系统信息已获取');
    return createSuccessResponse(systemInfo);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.SYSTEM_ERROR,
      IPC_ERROR_CODES.SYSTEM_ERROR,
      `获取系统信息失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error }
    );
    logger.error('获取系统信息失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

// ============================================================================
// 文件操作处理器
// ============================================================================

/**
 * 打开文件对话框处理器
 */
ipcMain.handle(IPC.FILE.OPEN_DIALOG, async (event, options: FileSelectOptions = {}): Promise<IPCResponse<string[]>> => {
  try {
    logger.debug('收到打开文件对话框请求:', options);

    const dialogOptions: Electron.OpenDialogOptions = {
      title: options.title || '选择文件',
      filters: options.filters || [{ name: '所有文件', extensions: ['*'] }],
      properties: options.multiSelections ? ['openFile', 'multiSelections'] : ['openFile'],
    };

    if (options.defaultPath) {
      dialogOptions.defaultPath = options.defaultPath;
    }

    const result = await dialog.showOpenDialog(dialogOptions);

    if (result.canceled) {
      logger.debug('用户取消了文件选择');
      return createSuccessResponse([]);
    }

    logger.info('文件选择完成:', result.filePaths);
    return createSuccessResponse(result.filePaths);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.FILE_IO_ERROR,
      IPC_ERROR_CODES.FILE_READ_ERROR,
      `打开文件对话框失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error, options }
    );
    logger.error('打开文件对话框失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 保存文件对话框处理器
 */
ipcMain.handle(
  IPC.FILE.SAVE_DIALOG,
  async (event, options: FileSaveOptions = {}): Promise<IPCResponse<string | null>> => {
    try {
      logger.debug('收到保存文件对话框请求:', options);

      const dialogOptions: Electron.SaveDialogOptions = {
        title: options.title || '保存文件',
        filters: options.filters || [{ name: '所有文件', extensions: ['*'] }],
      };

      if (options.defaultPath) {
        dialogOptions.defaultPath = options.defaultPath;
      }

      const result = await dialog.showSaveDialog(dialogOptions);

      if (result.canceled) {
        logger.debug('用户取消了文件保存');
        return createSuccessResponse(null);
      }

      logger.info('文件保存路径已选择:', result.filePath);
      return createSuccessResponse(result.filePath || null);
    } catch (error) {
      const ipcError = createIPCError(
        IPCErrorType.FILE_IO_ERROR,
        IPC_ERROR_CODES.FILE_WRITE_ERROR,
        `保存文件对话框失败: ${error instanceof Error ? error.message : String(error)}`,
        { originalError: error, options }
      );
      logger.error('保存文件对话框失败:', ipcError);
      ipcErrorHandler.handleError(ipcError);
      return createErrorResponse(ipcError);
    }
  }
);

/**
 * 读取文件内容处理器
 */
ipcMain.handle(IPC.FILE.READ, async (event, filePath: string): Promise<IPCResponse<string>> => {
  try {
    logger.debug('收到读取文件请求:', filePath);

    // 参数验证
    if (!filePath || typeof filePath !== 'string') {
      const ipcError = createIPCError(IPCErrorType.INVALID_PARAMS, IPC_ERROR_CODES.INVALID_PARAMS, '文件路径参数无效');
      return createErrorResponse(ipcError);
    }

    const content = await fs.readFile(filePath, 'utf-8');
    logger.info('文件读取成功:', filePath);
    return createSuccessResponse(content);
  } catch (error) {
    let ipcError;
    if (error instanceof Error && 'code' in error) {
      switch ((error as NodeJS.ErrnoException).code) {
        case 'ENOENT':
          ipcError = createIPCError(
            IPCErrorType.FILE_NOT_FOUND,
            IPC_ERROR_CODES.FILE_NOT_FOUND,
            `文件不存在: ${filePath}`,
            { filePath, originalError: error }
          );
          break;
        case 'EACCES':
          ipcError = createIPCError(
            IPCErrorType.PERMISSION_DENIED,
            IPC_ERROR_CODES.FILE_PERMISSION_ERROR,
            `文件访问权限不足: ${filePath}`,
            { filePath, originalError: error }
          );
          break;
        default:
          ipcError = createIPCError(
            IPCErrorType.FILE_IO_ERROR,
            IPC_ERROR_CODES.FILE_READ_ERROR,
            `文件读取失败: ${error.message}`,
            { filePath, originalError: error }
          );
      }
    } else {
      ipcError = createIPCError(
        IPCErrorType.FILE_IO_ERROR,
        IPC_ERROR_CODES.FILE_READ_ERROR,
        `文件读取失败: ${String(error)}`,
        { filePath, originalError: error }
      );
    }

    logger.error('文件读取失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 写入文件内容处理器
 */
ipcMain.handle(IPC.FILE.WRITE, async (event, filePath: string, content: string): Promise<IPCResponse<void>> => {
  try {
    logger.debug('收到写入文件请求:', filePath);

    // 参数验证
    if (!filePath || typeof filePath !== 'string') {
      const ipcError = createIPCError(IPCErrorType.INVALID_PARAMS, IPC_ERROR_CODES.INVALID_PARAMS, '文件路径参数无效');
      return createErrorResponse(ipcError);
    }

    if (typeof content !== 'string') {
      const ipcError = createIPCError(IPCErrorType.INVALID_PARAMS, IPC_ERROR_CODES.INVALID_PARAMS, '文件内容参数无效');
      return createErrorResponse(ipcError);
    }

    // 确保目录存在
    const dir = dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(filePath, content, 'utf-8');
    logger.info('文件写入成功:', filePath);
    return createSuccessResponse(undefined);
  } catch (error) {
    let ipcError;
    if (error instanceof Error && 'code' in error) {
      switch ((error as NodeJS.ErrnoException).code) {
        case 'EACCES':
          ipcError = createIPCError(
            IPCErrorType.PERMISSION_DENIED,
            IPC_ERROR_CODES.FILE_PERMISSION_ERROR,
            `文件写入权限不足: ${filePath}`,
            { filePath, originalError: error }
          );
          break;
        case 'ENOSPC':
          ipcError = createIPCError(
            IPCErrorType.SYSTEM_ERROR,
            IPC_ERROR_CODES.DISK_SPACE_INSUFFICIENT,
            `磁盘空间不足: ${filePath}`,
            { filePath, originalError: error }
          );
          break;
        default:
          ipcError = createIPCError(
            IPCErrorType.FILE_IO_ERROR,
            IPC_ERROR_CODES.FILE_WRITE_ERROR,
            `文件写入失败: ${error.message}`,
            { filePath, originalError: error }
          );
      }
    } else {
      ipcError = createIPCError(
        IPCErrorType.FILE_IO_ERROR,
        IPC_ERROR_CODES.FILE_WRITE_ERROR,
        `文件写入失败: ${String(error)}`,
        { filePath, originalError: error }
      );
    }

    logger.error('文件写入失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 获取文件信息处理器
 */
ipcMain.handle(IPC.FILE.GET_INFO, async (event, filePath: string): Promise<IPCResponse<FileInfo>> => {
  try {
    logger.debug('收到获取文件信息请求:', filePath);

    // 参数验证
    if (!filePath || typeof filePath !== 'string') {
      const ipcError = createIPCError(IPCErrorType.INVALID_PARAMS, IPC_ERROR_CODES.INVALID_PARAMS, '文件路径参数无效');
      return createErrorResponse(ipcError);
    }

    const stats = await fs.stat(filePath);
    const fileInfo: FileInfo = {
      path: filePath,
      name: basename(filePath),
      size: stats.size,
      type: extname(filePath).slice(1) || 'unknown',
      lastModified: stats.mtime.getTime(),
      isDirectory: stats.isDirectory(),
    };

    logger.debug('文件信息已获取:', fileInfo);
    return createSuccessResponse(fileInfo);
  } catch (error) {
    let ipcError;
    if (error instanceof Error && 'code' in error) {
      switch ((error as NodeJS.ErrnoException).code) {
        case 'ENOENT':
          ipcError = createIPCError(
            IPCErrorType.FILE_NOT_FOUND,
            IPC_ERROR_CODES.FILE_NOT_FOUND,
            `文件不存在: ${filePath}`,
            { filePath, originalError: error }
          );
          break;
        case 'EACCES':
          ipcError = createIPCError(
            IPCErrorType.PERMISSION_DENIED,
            IPC_ERROR_CODES.FILE_PERMISSION_ERROR,
            `文件访问权限不足: ${filePath}`,
            { filePath, originalError: error }
          );
          break;
        default:
          ipcError = createIPCError(
            IPCErrorType.FILE_IO_ERROR,
            IPC_ERROR_CODES.FILE_READ_ERROR,
            `获取文件信息失败: ${error.message}`,
            { filePath, originalError: error }
          );
      }
    } else {
      ipcError = createIPCError(
        IPCErrorType.FILE_IO_ERROR,
        IPC_ERROR_CODES.FILE_READ_ERROR,
        `获取文件信息失败: ${String(error)}`,
        { filePath, originalError: error }
      );
    }

    logger.error('获取文件信息失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 检查文件是否存在处理器
 */
ipcMain.handle(IPC.FILE.EXISTS, async (event, filePath: string): Promise<IPCResponse<boolean>> => {
  try {
    logger.debug('收到检查文件存在请求:', filePath);

    // 参数验证
    if (!filePath || typeof filePath !== 'string') {
      const ipcError = createIPCError(IPCErrorType.INVALID_PARAMS, IPC_ERROR_CODES.INVALID_PARAMS, '文件路径参数无效');
      return createErrorResponse(ipcError);
    }

    try {
      await fs.access(filePath);
      logger.debug('文件存在:', filePath);
      return createSuccessResponse(true);
    } catch {
      logger.debug('文件不存在:', filePath);
      return createSuccessResponse(false);
    }
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.FILE_IO_ERROR,
      IPC_ERROR_CODES.FILE_READ_ERROR,
      `检查文件存在失败: ${error instanceof Error ? error.message : String(error)}`,
      { filePath, originalError: error }
    );
    logger.error('检查文件存在失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

// ============================================================================
// 应用配置处理器 (占位实现)
// ============================================================================

/**
 * 获取应用配置处理器
 */
ipcMain.handle(IPC.CONFIG.GET, async (): Promise<IPCResponse<Partial<AppConfig>>> => {
  try {
    logger.debug('收到获取应用配置请求');

    // TODO: 实现真实的配置读取逻辑
    const defaultConfig: Partial<AppConfig> = {
      language: 'zh-CN',
      theme: 'light',
      autoPlay: false,
      defaultVolume: 80,
      playbackRate: 1.0,
      fullScreenMode: 'window',
      security: {
        sessionTimeout: 30,
        maxPasswordAttempts: 3,
        preventScreenCapture: true,
      },
    };

    logger.debug('应用配置已获取');
    return createSuccessResponse(defaultConfig);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.SYSTEM_ERROR,
      IPC_ERROR_CODES.SYSTEM_ERROR,
      `获取应用配置失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error }
    );
    logger.error('获取应用配置失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

/**
 * 设置应用配置处理器
 */
ipcMain.handle(IPC.CONFIG.SET, async (event, config: Partial<AppConfig>): Promise<IPCResponse<void>> => {
  try {
    logger.debug('收到设置应用配置请求:', config);

    // TODO: 实现真实的配置保存逻辑
    // 这里只是占位实现

    logger.info('应用配置已保存');
    return createSuccessResponse(undefined);
  } catch (error) {
    const ipcError = createIPCError(
      IPCErrorType.SYSTEM_ERROR,
      IPC_ERROR_CODES.SYSTEM_ERROR,
      `设置应用配置失败: ${error instanceof Error ? error.message : String(error)}`,
      { originalError: error, config }
    );
    logger.error('设置应用配置失败:', ipcError);
    ipcErrorHandler.handleError(ipcError);
    return createErrorResponse(ipcError);
  }
});

// ============================================================================
// 初始化和清理
// ============================================================================

/**
 * 初始化IPC处理器
 */
export function initializeIPCHandlers(): void {
  logger.info('IPC处理器已初始化');

  // 添加全局错误监听器
  ipcErrorHandler.addErrorListener(error => {
    logger.error('IPC全局错误:', {
      type: error.type,
      code: error.code,
      message: error.message,
      timestamp: new Date(error.timestamp).toISOString(),
    });
  });
}

/**
 * 清理IPC处理器
 */
export function cleanupIPCHandlers(): void {
  // 移除所有IPC监听器
  ipcMain.removeAllListeners();
  logger.info('IPC处理器已清理');
}

// 自动初始化
initializeIPCHandlers();

logger.info('主进程IPC处理器模块已加载');
