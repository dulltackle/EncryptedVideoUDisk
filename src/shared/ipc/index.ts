/**
 * IPC 通信协议入口文件
 * 统一导出所有IPC相关的类型、常量和工具函数
 */

// ============================================================================
// 类型定义导出
// ============================================================================

export type {
  IPCResponse,
  IPCRequest,
  IPCError,
  IPCErrorType,
  IPCHandler,
  IPCEventListener,
  SystemInfo,
  WindowState,
  WindowOperation,
  FileSelectOptions,
  FileInfo,
  FileSaveOptions,
  VideoEncryptRequest,
  VideoDecryptRequest,
  VideoProcessProgress,
  VideoInfo,
  UsbDevice,
  PasswordVerifyRequest,
  SessionInfo,
  AppConfig,
  CreateSuccessResponse,
  CreateErrorResponse,
} from './types';

// ============================================================================
// 通道常量导出
// ============================================================================

export {
  WINDOW_MINIMIZE,
  WINDOW_MAXIMIZE,
  WINDOW_CLOSE,
  WINDOW_HIDE,
  WINDOW_SHOW,
  WINDOW_GET_STATE,
  WINDOW_SET_BOUNDS,
  WINDOW_STATE_CHANGED,
  GET_SYSTEM_INFO,
  GET_APP_VERSION,
  GET_SYSTEM_PERFORMANCE,
  SYSTEM_PERFORMANCE_UPDATE,
  FILE_OPEN_DIALOG,
  FILE_SAVE_DIALOG,
  FILE_READ,
  FILE_WRITE,
  FILE_DELETE,
  FILE_GET_INFO,
  FILE_EXISTS,
  FILE_CREATE_DIR,
  FILE_LIST_DIR,
  VIDEO_ENCRYPT,
  VIDEO_DECRYPT,
  VIDEO_GET_INFO,
  VIDEO_PROCESS_PROGRESS,
  VIDEO_PROCESS_COMPLETE,
  VIDEO_PROCESS_ERROR,
  USB_GET_DEVICES,
  USB_DEVICE_ADDED,
  USB_DEVICE_REMOVED,
  USB_VERIFY_DEVICE,
  USB_GET_CAPACITY,
  AUTH_VERIFY_PASSWORD,
  AUTH_CREATE_SESSION,
  AUTH_DESTROY_SESSION,
  AUTH_GET_SESSION,
  AUTH_SESSION_EXPIRED,
  CONFIG_GET,
  CONFIG_SET,
  CONFIG_RESET,
  CONFIG_CHANGED,
  LOG_WRITE,
  LOG_GET_PATH,
  LOG_CLEAN,
  UPDATE_CHECK,
  UPDATE_DOWNLOAD,
  UPDATE_INSTALL,
  UPDATE_AVAILABLE,
  UPDATE_DOWNLOADED,
  UPDATE_PROGRESS,
  WINDOW_CHANNELS,
  SYSTEM_CHANNELS,
  FILE_CHANNELS,
  VIDEO_CHANNELS,
  USB_CHANNELS,
  AUTH_CHANNELS,
  CONFIG_CHANNELS,
  LOG_CHANNELS,
  UPDATE_CHANNELS,
  ALL_CHANNELS,
} from './channels';

export type {
  WindowChannel,
  SystemChannel,
  FileChannel,
  VideoChannel,
  UsbChannel,
  AuthChannel,
  ConfigChannel,
  LogChannel,
  UpdateChannel,
  IPCChannel,
} from './channels';

// ============================================================================
// 错误处理导出
// ============================================================================

export {
  IPC_ERROR_CODES,
  ERROR_MESSAGES,
  createIPCError,
  createIPCErrorFromError,
  createSuccessResponse,
  createErrorResponse,
  IPCErrorHandler,
  ipcErrorHandler,
} from './errors';

export type { IPCErrorCode } from './errors';

// ============================================================================
// 便利工具函数
// ============================================================================

import type { IPCResponse, IPCRequest } from './types';
import type { IPCChannel } from './channels';
import { ALL_CHANNELS } from './channels';

/**
 * 检查响应是否成功
 */
export function isSuccessResponse<T>(
  response: IPCResponse<T>
): response is IPCResponse<T> & { success: true; data: T } {
  return response.success === true;
}

/**
 * 检查响应是否失败
 */
export function isErrorResponse<T>(
  response: IPCResponse<T>
): response is IPCResponse<T> & { success: false; error: string } {
  return response.success === false;
}

/**
 * 从响应中提取数据，如果失败则抛出错误
 */
export function extractResponseData<T>(response: IPCResponse<T>): T {
  if (isSuccessResponse(response)) {
    return response.data;
  }
  throw new Error(response.error || '未知错误');
}

/**
 * 创建请求对象
 */
export function createIPCRequest<T>(data?: T): IPCRequest<T> {
  const request: IPCRequest<T> = {
    requestId: `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: Date.now(),
  };
  if (data !== undefined) {
    request.data = data;
  }
  return request;
}

/**
 * 验证IPC通道名称是否有效
 */
export function isValidIPCChannel(channel: string): channel is IPCChannel {
  const allChannels = Object.values(ALL_CHANNELS).flatMap(group => Object.values(group as Record<string, string>));
  return allChannels.includes(channel as IPCChannel);
}

/**
 * 获取通道所属的分组
 */
export function getChannelGroup(channel: IPCChannel): string | null {
  for (const [groupName, channels] of Object.entries(ALL_CHANNELS)) {
    if (Object.values(channels as Record<string, string>).includes(channel)) {
      return groupName;
    }
  }
  return null;
}

// ============================================================================
// 常用通道快捷访问
// ============================================================================

import {
  WINDOW_CHANNELS,
  SYSTEM_CHANNELS,
  FILE_CHANNELS,
  VIDEO_CHANNELS,
  USB_CHANNELS,
  AUTH_CHANNELS,
  CONFIG_CHANNELS,
  LOG_CHANNELS,
  UPDATE_CHANNELS,
} from './channels';

/**
 * 常用IPC通道快捷访问
 */
export const IPC = {
  WINDOW: WINDOW_CHANNELS,
  SYSTEM: SYSTEM_CHANNELS,
  FILE: FILE_CHANNELS,
  VIDEO: VIDEO_CHANNELS,
  USB: USB_CHANNELS,
  AUTH: AUTH_CHANNELS,
  CONFIG: CONFIG_CHANNELS,
  LOG: LOG_CHANNELS,
  UPDATE: UPDATE_CHANNELS,
} as const;

// ============================================================================
// 版本信息
// ============================================================================

/**
 * IPC协议版本信息
 */
export const IPC_PROTOCOL_VERSION = '1.0.0';

/**
 * IPC协议兼容性信息
 */
export const IPC_COMPATIBILITY = {
  minVersion: '1.0.0',
  maxVersion: '1.x.x',
  supportedFeatures: [
    'window-control',
    'system-info',
    'file-operations',
    'video-processing',
    'usb-detection',
    'authentication',
    'configuration',
    'logging',
    'auto-update',
  ],
} as const;
