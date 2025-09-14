/**
 * 日志工具模块
 * 提供统一的日志记录功能
 */

import { join } from 'path';
import { app } from 'electron';

/**
 * 日志级别枚举
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * 日志配置接口
 */
export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  logDir?: string;
}

/**
 * 默认日志配置
 */
const DEFAULT_CONFIG: LoggerConfig = {
  level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  enableFile: process.env.NODE_ENV === 'production',
  logDir: app?.getPath('logs') || join(process.cwd(), 'logs'),
};

/**
 * 日志记录器类
 */
export class Logger {
  private config: LoggerConfig;
  private logFile?: string;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initializeLogFile();
  }

  /**
   * 初始化日志文件
   */
  private initializeLogFile(): void {
    if (this.config.enableFile && this.config.logDir) {
      const timestamp = new Date().toISOString().split('T')[0];
      this.logFile = join(this.config.logDir, `app-${timestamp}.log`);
    }
  }

  /**
   * 格式化日志消息
   */
  private formatMessage(level: LogLevel, message: string, ...args: unknown[]): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : '';
    return `[${timestamp}] [${levelName}] ${message}${formattedArgs}`;
  }

  /**
   * 记录日志
   */
  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (level < this.config.level) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, ...args);

    // 控制台输出
    if (this.config.enableConsole) {
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedMessage);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        case LogLevel.ERROR:
          console.error(formattedMessage);
          break;
      }
    }

    // 文件输出（在生产环境中实现）
    if (this.config.enableFile && this.logFile) {
      // 这里可以添加文件写入逻辑
      // 为了简化，暂时只在控制台输出
    }
  }

  /**
   * 调试日志
   */
  public debug(message: string, ...args: unknown[]): void {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  /**
   * 信息日志
   */
  public info(message: string, ...args: unknown[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  /**
   * 警告日志
   */
  public warn(message: string, ...args: unknown[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  /**
   * 错误日志
   */
  public error(message: string, ...args: unknown[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }
}

// 导出默认日志实例
export const logger = new Logger();
