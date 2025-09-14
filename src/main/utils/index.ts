/**
 * 主进程工具函数集合
 * 提供主进程中常用的工具函数和类型定义
 */

// 导入各模块
import { logger, Logger, LogLevel } from './logger';
import { AppPaths, PathSecurity, VideoPathUtils, pathUtils } from './path-utils';
import {
  getSystemInfo,
  isWindows,
  isMacOS,
  isLinux,
  getWindowsVersion,
  checkSystemRequirements,
  getPerformanceInfo,
  formatMemorySize,
  getEnvironmentInfo,
} from './system-info';
import { errorHandler, ErrorHandler, AppError, ErrorType, createError } from './error-handler';

// 重新导出
export {
  // Logger模块
  logger,
  Logger,
  LogLevel,

  // Path工具模块
  AppPaths,
  PathSecurity,
  VideoPathUtils,
  pathUtils,

  // 系统信息模块
  getSystemInfo,
  isWindows,
  isMacOS,
  isLinux,
  getWindowsVersion,
  checkSystemRequirements,
  getPerformanceInfo,
  formatMemorySize,
  getEnvironmentInfo,

  // 错误处理模块
  errorHandler,
  ErrorHandler,
  AppError,
  ErrorType,
  createError,
};
