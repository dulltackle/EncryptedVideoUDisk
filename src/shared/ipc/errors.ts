/**
 * IPC 错误定义和处理工具
 * 提供统一的错误处理机制
 */

import type { IPCError, IPCErrorType, IPCResponse } from './types';

// ============================================================================
// 错误代码常量
// ============================================================================

/**
 * IPC 错误代码
 */
export const IPC_ERROR_CODES = {
  // 网络相关错误
  NETWORK_TIMEOUT: 'E_NETWORK_TIMEOUT',
  NETWORK_UNAVAILABLE: 'E_NETWORK_UNAVAILABLE',
  CONNECTION_LOST: 'E_CONNECTION_LOST',

  // 参数相关错误
  INVALID_PARAMS: 'E_INVALID_PARAMS',
  MISSING_PARAMS: 'E_MISSING_PARAMS',
  PARAMS_TYPE_ERROR: 'E_PARAMS_TYPE_ERROR',

  // 权限相关错误
  PERMISSION_DENIED: 'E_PERMISSION_DENIED',
  ACCESS_FORBIDDEN: 'E_ACCESS_FORBIDDEN',
  AUTHENTICATION_REQUIRED: 'E_AUTHENTICATION_REQUIRED',
  SESSION_EXPIRED: 'E_SESSION_EXPIRED',

  // 文件相关错误
  FILE_NOT_FOUND: 'E_FILE_NOT_FOUND',
  FILE_READ_ERROR: 'E_FILE_READ_ERROR',
  FILE_WRITE_ERROR: 'E_FILE_WRITE_ERROR',
  FILE_DELETE_ERROR: 'E_FILE_DELETE_ERROR',
  FILE_PERMISSION_ERROR: 'E_FILE_PERMISSION_ERROR',
  DIRECTORY_NOT_FOUND: 'E_DIRECTORY_NOT_FOUND',
  DISK_SPACE_INSUFFICIENT: 'E_DISK_SPACE_INSUFFICIENT',

  // 加密相关错误
  CRYPTO_ENCRYPT_ERROR: 'E_CRYPTO_ENCRYPT_ERROR',
  CRYPTO_DECRYPT_ERROR: 'E_CRYPTO_DECRYPT_ERROR',
  CRYPTO_KEY_ERROR: 'E_CRYPTO_KEY_ERROR',
  CRYPTO_ALGORITHM_ERROR: 'E_CRYPTO_ALGORITHM_ERROR',
  PASSWORD_INCORRECT: 'E_PASSWORD_INCORRECT',

  // 系统相关错误
  SYSTEM_ERROR: 'E_SYSTEM_ERROR',
  MEMORY_INSUFFICIENT: 'E_MEMORY_INSUFFICIENT',
  CPU_OVERLOAD: 'E_CPU_OVERLOAD',
  PROCESS_ERROR: 'E_PROCESS_ERROR',

  // 超时相关错误
  TIMEOUT_ERROR: 'E_TIMEOUT_ERROR',
  OPERATION_TIMEOUT: 'E_OPERATION_TIMEOUT',
  REQUEST_TIMEOUT: 'E_REQUEST_TIMEOUT',

  // 视频相关错误
  VIDEO_FORMAT_ERROR: 'E_VIDEO_FORMAT_ERROR',
  VIDEO_CODEC_ERROR: 'E_VIDEO_CODEC_ERROR',
  VIDEO_CORRUPTED: 'E_VIDEO_CORRUPTED',
  VIDEO_TOO_LARGE: 'E_VIDEO_TOO_LARGE',

  // U盘相关错误
  USB_NOT_FOUND: 'E_USB_NOT_FOUND',
  USB_READ_ERROR: 'E_USB_READ_ERROR',
  USB_WRITE_ERROR: 'E_USB_WRITE_ERROR',
  USB_VERIFICATION_FAILED: 'E_USB_VERIFICATION_FAILED',

  // 通用错误
  UNKNOWN_ERROR: 'E_UNKNOWN_ERROR',
  INTERNAL_ERROR: 'E_INTERNAL_ERROR',
  NOT_IMPLEMENTED: 'E_NOT_IMPLEMENTED',
} as const;

// ============================================================================
// 错误消息映射
// ============================================================================

/**
 * 错误消息映射表
 */
export const ERROR_MESSAGES: Record<string, string> = {
  // 网络相关错误
  [IPC_ERROR_CODES.NETWORK_TIMEOUT]: '网络连接超时',
  [IPC_ERROR_CODES.NETWORK_UNAVAILABLE]: '网络不可用',
  [IPC_ERROR_CODES.CONNECTION_LOST]: '连接已断开',

  // 参数相关错误
  [IPC_ERROR_CODES.INVALID_PARAMS]: '参数无效',
  [IPC_ERROR_CODES.MISSING_PARAMS]: '缺少必要参数',
  [IPC_ERROR_CODES.PARAMS_TYPE_ERROR]: '参数类型错误',

  // 权限相关错误
  [IPC_ERROR_CODES.PERMISSION_DENIED]: '权限不足',
  [IPC_ERROR_CODES.ACCESS_FORBIDDEN]: '访问被禁止',
  [IPC_ERROR_CODES.AUTHENTICATION_REQUIRED]: '需要身份验证',
  [IPC_ERROR_CODES.SESSION_EXPIRED]: '会话已过期',

  // 文件相关错误
  [IPC_ERROR_CODES.FILE_NOT_FOUND]: '文件不存在',
  [IPC_ERROR_CODES.FILE_READ_ERROR]: '文件读取失败',
  [IPC_ERROR_CODES.FILE_WRITE_ERROR]: '文件写入失败',
  [IPC_ERROR_CODES.FILE_DELETE_ERROR]: '文件删除失败',
  [IPC_ERROR_CODES.FILE_PERMISSION_ERROR]: '文件权限不足',
  [IPC_ERROR_CODES.DIRECTORY_NOT_FOUND]: '目录不存在',
  [IPC_ERROR_CODES.DISK_SPACE_INSUFFICIENT]: '磁盘空间不足',

  // 加密相关错误
  [IPC_ERROR_CODES.CRYPTO_ENCRYPT_ERROR]: '加密失败',
  [IPC_ERROR_CODES.CRYPTO_DECRYPT_ERROR]: '解密失败',
  [IPC_ERROR_CODES.CRYPTO_KEY_ERROR]: '密钥错误',
  [IPC_ERROR_CODES.CRYPTO_ALGORITHM_ERROR]: '加密算法错误',
  [IPC_ERROR_CODES.PASSWORD_INCORRECT]: '密码错误',

  // 系统相关错误
  [IPC_ERROR_CODES.SYSTEM_ERROR]: '系统错误',
  [IPC_ERROR_CODES.MEMORY_INSUFFICIENT]: '内存不足',
  [IPC_ERROR_CODES.CPU_OVERLOAD]: 'CPU负载过高',
  [IPC_ERROR_CODES.PROCESS_ERROR]: '进程错误',

  // 超时相关错误
  [IPC_ERROR_CODES.TIMEOUT_ERROR]: '操作超时',
  [IPC_ERROR_CODES.OPERATION_TIMEOUT]: '操作超时',
  [IPC_ERROR_CODES.REQUEST_TIMEOUT]: '请求超时',

  // 视频相关错误
  [IPC_ERROR_CODES.VIDEO_FORMAT_ERROR]: '视频格式不支持',
  [IPC_ERROR_CODES.VIDEO_CODEC_ERROR]: '视频编解码错误',
  [IPC_ERROR_CODES.VIDEO_CORRUPTED]: '视频文件已损坏',
  [IPC_ERROR_CODES.VIDEO_TOO_LARGE]: '视频文件过大',

  // U盘相关错误
  [IPC_ERROR_CODES.USB_NOT_FOUND]: 'U盘未找到',
  [IPC_ERROR_CODES.USB_READ_ERROR]: 'U盘读取失败',
  [IPC_ERROR_CODES.USB_WRITE_ERROR]: 'U盘写入失败',
  [IPC_ERROR_CODES.USB_VERIFICATION_FAILED]: 'U盘验证失败',

  // 通用错误
  [IPC_ERROR_CODES.UNKNOWN_ERROR]: '未知错误',
  [IPC_ERROR_CODES.INTERNAL_ERROR]: '内部错误',
  [IPC_ERROR_CODES.NOT_IMPLEMENTED]: '功能未实现',
};

// ============================================================================
// 错误创建工具函数
// ============================================================================

/**
 * 创建IPC错误对象
 */
export function createIPCError(
  type: IPCErrorType,
  code: string,
  message?: string,
  details?: Record<string, unknown>,
  stack?: string
): IPCError {
  const error: IPCError = {
    type,
    code,
    message: message || ERROR_MESSAGES[code] || '未知错误',
    timestamp: Date.now(),
  };

  if (details !== undefined) {
    error.details = details;
  }

  if (stack !== undefined) {
    error.stack = stack;
  }

  return error;
}

/**
 * 从JavaScript Error对象创建IPC错误
 */
export function createIPCErrorFromError(
  error: Error,
  type: IPCErrorType = 'UNKNOWN_ERROR' as IPCErrorType,
  code?: string
): IPCError {
  return createIPCError(
    type,
    code || IPC_ERROR_CODES.UNKNOWN_ERROR,
    error.message,
    { originalError: error.name },
    error.stack
  );
}

/**
 * 创建成功响应
 */
export function createSuccessResponse<T>(data: T): IPCResponse<T> {
  return {
    success: true,
    data,
    timestamp: Date.now(),
  };
}

/**
 * 创建错误响应
 */
export function createErrorResponse(error: string | IPCError, errorCode?: string): IPCResponse<never> {
  if (typeof error === 'string') {
    return {
      success: false,
      error,
      errorCode: errorCode || IPC_ERROR_CODES.UNKNOWN_ERROR,
      timestamp: Date.now(),
    };
  }

  return {
    success: false,
    error: error.message,
    errorCode: error.code,
    timestamp: Date.now(),
  };
}

// ============================================================================
// 错误处理工具类
// ============================================================================

/**
 * IPC错误处理器
 */
export class IPCErrorHandler {
  private static instance: IPCErrorHandler;
  private errorListeners: Array<(error: IPCError) => void> = [];

  /**
   * 获取单例实例
   */
  public static getInstance(): IPCErrorHandler {
    if (!IPCErrorHandler.instance) {
      IPCErrorHandler.instance = new IPCErrorHandler();
    }
    return IPCErrorHandler.instance;
  }

  /**
   * 添加错误监听器
   */
  public addErrorListener(listener: (error: IPCError) => void): void {
    this.errorListeners.push(listener);
  }

  /**
   * 移除错误监听器
   */
  public removeErrorListener(listener: (error: IPCError) => void): void {
    const index = this.errorListeners.indexOf(listener);
    if (index > -1) {
      this.errorListeners.splice(index, 1);
    }
  }

  /**
   * 处理错误
   */
  public handleError(error: IPCError): void {
    // 通知所有监听器
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (listenerError) {
        console.error('错误监听器执行失败:', listenerError);
      }
    });

    // 记录错误日志
    console.error('IPC错误:', {
      type: error.type,
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: new Date(error.timestamp).toISOString(),
      stack: error.stack,
    });
  }

  /**
   * 包装异步函数，自动处理错误
   */
  public wrapAsync<T extends unknown[], R>(fn: (...args: T) => Promise<R>): (...args: T) => Promise<IPCResponse<R>> {
    return async (...args: T): Promise<IPCResponse<R>> => {
      try {
        const result = await fn(...args);
        return createSuccessResponse(result);
      } catch (error) {
        const ipcError =
          error instanceof Error
            ? createIPCErrorFromError(error)
            : createIPCError('UNKNOWN_ERROR' as IPCErrorType, IPC_ERROR_CODES.UNKNOWN_ERROR, String(error));

        this.handleError(ipcError);
        return createErrorResponse(ipcError);
      }
    };
  }

  /**
   * 包装同步函数，自动处理错误
   */
  public wrapSync<T extends unknown[], R>(fn: (...args: T) => R): (...args: T) => IPCResponse<R> {
    return (...args: T): IPCResponse<R> => {
      try {
        const result = fn(...args);
        return createSuccessResponse(result);
      } catch (error) {
        const ipcError =
          error instanceof Error
            ? createIPCErrorFromError(error)
            : createIPCError('UNKNOWN_ERROR' as IPCErrorType, IPC_ERROR_CODES.UNKNOWN_ERROR, String(error));

        this.handleError(ipcError);
        return createErrorResponse(ipcError);
      }
    };
  }
}

// ============================================================================
// 导出默认实例
// ============================================================================

/**
 * 默认错误处理器实例
 */
export const ipcErrorHandler = IPCErrorHandler.getInstance();

// ============================================================================
// 类型导出
// ============================================================================

export type IPCErrorCode = (typeof IPC_ERROR_CODES)[keyof typeof IPC_ERROR_CODES];
