/**
 * 错误处理工具模块
 * 提供统一的错误处理和报告功能
 */

import { logger } from './logger';

/**
 * 错误类型枚举
 */
export enum ErrorType {
  SYSTEM = 'SYSTEM',
  SECURITY = 'SECURITY',
  VIDEO = 'VIDEO',
  NETWORK = 'NETWORK',
  FILE = 'FILE',
  USER = 'USER',
}

/**
 * 应用错误类
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly code: string;
  public readonly timestamp: Date;
  public readonly context?: Record<string, unknown> | undefined;

  constructor(
    message: string,
    type: ErrorType = ErrorType.SYSTEM,
    code = 'UNKNOWN_ERROR',
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
    this.timestamp = new Date();
    this.context = context;

    // 确保堆栈跟踪正确
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * 转换为JSON格式
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      code: this.code,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
      stack: this.stack,
    };
  }
}

/**
 * 错误处理器类
 */
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorCallbacks: Array<(error: AppError) => void> = [];

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * 设置全局错误处理器
   */
  private setupGlobalErrorHandlers(): void {
    // 处理未捕获的异常
    process.on('uncaughtException', (error: Error) => {
      const appError = new AppError(`未捕获的异常: ${error.message}`, ErrorType.SYSTEM, 'UNCAUGHT_EXCEPTION', {
        originalError: error.name,
        stack: error.stack,
      });
      this.handleError(appError);
    });

    // 处理未处理的Promise拒绝
    process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
      const appError = new AppError(`未处理的Promise拒绝: ${String(reason)}`, ErrorType.SYSTEM, 'UNHANDLED_REJECTION', {
        reason,
        promise: promise.toString(),
      });
      this.handleError(appError);
    });
  }

  /**
   * 处理错误
   */
  public handleError(error: Error | AppError): void {
    const appError = error instanceof AppError ? error : this.convertToAppError(error);

    // 记录错误日志
    logger.error(`[${appError.type}] ${appError.message}`, {
      code: appError.code,
      context: appError.context,
      stack: appError.stack,
    });

    // 调用注册的错误回调
    this.errorCallbacks.forEach(callback => {
      try {
        callback(appError);
      } catch (callbackError) {
        logger.error('错误回调执行失败:', callbackError);
      }
    });
  }

  /**
   * 转换普通错误为应用错误
   */
  private convertToAppError(error: Error): AppError {
    return new AppError(error.message, ErrorType.SYSTEM, 'CONVERTED_ERROR', {
      originalName: error.name,
      originalStack: error.stack,
    });
  }

  /**
   * 注册错误回调
   */
  public onError(callback: (error: AppError) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * 移除错误回调
   */
  public removeErrorCallback(callback: (error: AppError) => void): void {
    const index = this.errorCallbacks.indexOf(callback);
    if (index > -1) {
      this.errorCallbacks.splice(index, 1);
    }
  }
}

/**
 * 创建特定类型的错误
 */
export const createError = {
  /**
   * 创建系统错误
   */
  system: (message: string, code = 'SYSTEM_ERROR', context?: Record<string, unknown>): AppError => {
    return new AppError(message, ErrorType.SYSTEM, code, context);
  },

  /**
   * 创建安全错误
   */
  security: (message: string, code = 'SECURITY_ERROR', context?: Record<string, unknown>): AppError => {
    return new AppError(message, ErrorType.SECURITY, code, context);
  },

  /**
   * 创建视频错误
   */
  video: (message: string, code = 'VIDEO_ERROR', context?: Record<string, unknown>): AppError => {
    return new AppError(message, ErrorType.VIDEO, code, context);
  },

  /**
   * 创建文件错误
   */
  file: (message: string, code = 'FILE_ERROR', context?: Record<string, unknown>): AppError => {
    return new AppError(message, ErrorType.FILE, code, context);
  },

  /**
   * 创建用户错误
   */
  user: (message: string, code = 'USER_ERROR', context?: Record<string, unknown>): AppError => {
    return new AppError(message, ErrorType.USER, code, context);
  },
};

// 导出全局错误处理器实例
export const errorHandler = ErrorHandler.getInstance();
