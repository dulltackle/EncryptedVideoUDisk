/**
 * IPC 通道常量定义
 * 定义主进程和渲染进程间通信的所有通道名称
 */

// ============================================================================
// 窗口控制相关通道
// ============================================================================

/** 窗口最小化 */
export const WINDOW_MINIMIZE = 'window:minimize';

/** 窗口最大化/还原 */
export const WINDOW_MAXIMIZE = 'window:maximize';

/** 窗口关闭 */
export const WINDOW_CLOSE = 'window:close';

/** 窗口隐藏 */
export const WINDOW_HIDE = 'window:hide';

/** 窗口显示 */
export const WINDOW_SHOW = 'window:show';

/** 获取窗口状态 */
export const WINDOW_GET_STATE = 'window:get-state';

/** 设置窗口位置和大小 */
export const WINDOW_SET_BOUNDS = 'window:set-bounds';

/** 窗口状态变化事件 */
export const WINDOW_STATE_CHANGED = 'window:state-changed';

// ============================================================================
// 系统信息相关通道
// ============================================================================

/** 获取系统信息 */
export const GET_SYSTEM_INFO = 'system:info';

/** 获取应用版本信息 */
export const GET_APP_VERSION = 'system:app-version';

/** 获取系统性能信息 */
export const GET_SYSTEM_PERFORMANCE = 'system:performance';

/** 系统性能监控事件 */
export const SYSTEM_PERFORMANCE_UPDATE = 'system:performance-update';

// ============================================================================
// 文件操作相关通道
// ============================================================================

/** 打开文件对话框 */
export const FILE_OPEN_DIALOG = 'file:open-dialog';

/** 保存文件对话框 */
export const FILE_SAVE_DIALOG = 'file:save-dialog';

/** 读取文件内容 */
export const FILE_READ = 'file:read';

/** 写入文件内容 */
export const FILE_WRITE = 'file:write';

/** 删除文件 */
export const FILE_DELETE = 'file:delete';

/** 获取文件信息 */
export const FILE_GET_INFO = 'file:get-info';

/** 检查文件是否存在 */
export const FILE_EXISTS = 'file:exists';

/** 创建目录 */
export const FILE_CREATE_DIR = 'file:create-dir';

/** 列出目录内容 */
export const FILE_LIST_DIR = 'file:list-dir';

// ============================================================================
// 视频处理相关通道
// ============================================================================

/** 视频加密 */
export const VIDEO_ENCRYPT = 'video:encrypt';

/** 视频解密 */
export const VIDEO_DECRYPT = 'video:decrypt';

/** 获取视频信息 */
export const VIDEO_GET_INFO = 'video:get-info';

/** 视频处理进度事件 */
export const VIDEO_PROCESS_PROGRESS = 'video:process-progress';

/** 视频处理完成事件 */
export const VIDEO_PROCESS_COMPLETE = 'video:process-complete';

/** 视频处理错误事件 */
export const VIDEO_PROCESS_ERROR = 'video:process-error';

// ============================================================================
// U盘检测相关通道
// ============================================================================

/** 获取U盘设备列表 */
export const USB_GET_DEVICES = 'usb:get-devices';

/** 检测U盘插入事件 */
export const USB_DEVICE_ADDED = 'usb:device-added';

/** 检测U盘拔出事件 */
export const USB_DEVICE_REMOVED = 'usb:device-removed';

/** 验证U盘设备 */
export const USB_VERIFY_DEVICE = 'usb:verify-device';

/** 获取U盘容量信息 */
export const USB_GET_CAPACITY = 'usb:get-capacity';

// ============================================================================
// 安全认证相关通道
// ============================================================================

/** 密码验证 */
export const AUTH_VERIFY_PASSWORD = 'auth:verify-password';

/** 创建会话 */
export const AUTH_CREATE_SESSION = 'auth:create-session';

/** 销毁会话 */
export const AUTH_DESTROY_SESSION = 'auth:destroy-session';

/** 获取会话信息 */
export const AUTH_GET_SESSION = 'auth:get-session';

/** 会话过期事件 */
export const AUTH_SESSION_EXPIRED = 'auth:session-expired';

// ============================================================================
// 应用配置相关通道
// ============================================================================

/** 获取应用配置 */
export const CONFIG_GET = 'config:get';

/** 设置应用配置 */
export const CONFIG_SET = 'config:set';

/** 重置应用配置 */
export const CONFIG_RESET = 'config:reset';

/** 配置变更事件 */
export const CONFIG_CHANGED = 'config:changed';

// ============================================================================
// 日志相关通道
// ============================================================================

/** 写入日志 */
export const LOG_WRITE = 'log:write';

/** 获取日志文件路径 */
export const LOG_GET_PATH = 'log:get-path';

/** 清理日志文件 */
export const LOG_CLEAN = 'log:clean';

// ============================================================================
// 应用更新相关通道
// ============================================================================

/** 检查更新 */
export const UPDATE_CHECK = 'update:check';

/** 下载更新 */
export const UPDATE_DOWNLOAD = 'update:download';

/** 安装更新 */
export const UPDATE_INSTALL = 'update:install';

/** 更新可用事件 */
export const UPDATE_AVAILABLE = 'update:available';

/** 更新下载完成事件 */
export const UPDATE_DOWNLOADED = 'update:downloaded';

/** 更新进度事件 */
export const UPDATE_PROGRESS = 'update:progress';

// ============================================================================
// 通道分组
// ============================================================================

/**
 * 窗口控制相关通道
 */
export const WINDOW_CHANNELS = {
  MINIMIZE: WINDOW_MINIMIZE,
  MAXIMIZE: WINDOW_MAXIMIZE,
  CLOSE: WINDOW_CLOSE,
  HIDE: WINDOW_HIDE,
  SHOW: WINDOW_SHOW,
  GET_STATE: WINDOW_GET_STATE,
  SET_BOUNDS: WINDOW_SET_BOUNDS,
  STATE_CHANGED: WINDOW_STATE_CHANGED,
} as const;

/**
 * 系统信息相关通道
 */
export const SYSTEM_CHANNELS = {
  GET_INFO: GET_SYSTEM_INFO,
  GET_APP_VERSION: GET_APP_VERSION,
  GET_PERFORMANCE: GET_SYSTEM_PERFORMANCE,
  PERFORMANCE_UPDATE: SYSTEM_PERFORMANCE_UPDATE,
} as const;

/**
 * 文件操作相关通道
 */
export const FILE_CHANNELS = {
  OPEN_DIALOG: FILE_OPEN_DIALOG,
  SAVE_DIALOG: FILE_SAVE_DIALOG,
  READ: FILE_READ,
  WRITE: FILE_WRITE,
  DELETE: FILE_DELETE,
  GET_INFO: FILE_GET_INFO,
  EXISTS: FILE_EXISTS,
  CREATE_DIR: FILE_CREATE_DIR,
  LIST_DIR: FILE_LIST_DIR,
} as const;

/**
 * 视频处理相关通道
 */
export const VIDEO_CHANNELS = {
  ENCRYPT: VIDEO_ENCRYPT,
  DECRYPT: VIDEO_DECRYPT,
  GET_INFO: VIDEO_GET_INFO,
  PROCESS_PROGRESS: VIDEO_PROCESS_PROGRESS,
  PROCESS_COMPLETE: VIDEO_PROCESS_COMPLETE,
  PROCESS_ERROR: VIDEO_PROCESS_ERROR,
} as const;

/**
 * U盘检测相关通道
 */
export const USB_CHANNELS = {
  GET_DEVICES: USB_GET_DEVICES,
  DEVICE_ADDED: USB_DEVICE_ADDED,
  DEVICE_REMOVED: USB_DEVICE_REMOVED,
  VERIFY_DEVICE: USB_VERIFY_DEVICE,
  GET_CAPACITY: USB_GET_CAPACITY,
} as const;

/**
 * 安全认证相关通道
 */
export const AUTH_CHANNELS = {
  VERIFY_PASSWORD: AUTH_VERIFY_PASSWORD,
  CREATE_SESSION: AUTH_CREATE_SESSION,
  DESTROY_SESSION: AUTH_DESTROY_SESSION,
  GET_SESSION: AUTH_GET_SESSION,
  SESSION_EXPIRED: AUTH_SESSION_EXPIRED,
} as const;

/**
 * 应用配置相关通道
 */
export const CONFIG_CHANNELS = {
  GET: CONFIG_GET,
  SET: CONFIG_SET,
  RESET: CONFIG_RESET,
  CHANGED: CONFIG_CHANGED,
} as const;

/**
 * 日志相关通道
 */
export const LOG_CHANNELS = {
  WRITE: LOG_WRITE,
  GET_PATH: LOG_GET_PATH,
  CLEAN: LOG_CLEAN,
} as const;

/**
 * 应用更新相关通道
 */
export const UPDATE_CHANNELS = {
  CHECK: UPDATE_CHECK,
  DOWNLOAD: UPDATE_DOWNLOAD,
  INSTALL: UPDATE_INSTALL,
  AVAILABLE: UPDATE_AVAILABLE,
  DOWNLOADED: UPDATE_DOWNLOADED,
  PROGRESS: UPDATE_PROGRESS,
} as const;

/**
 * 所有IPC通道
 */
export const ALL_CHANNELS = {
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
// 类型导出
// ============================================================================

/**
 * 窗口通道类型
 */
export type WindowChannel = (typeof WINDOW_CHANNELS)[keyof typeof WINDOW_CHANNELS];

/**
 * 系统通道类型
 */
export type SystemChannel = (typeof SYSTEM_CHANNELS)[keyof typeof SYSTEM_CHANNELS];

/**
 * 文件通道类型
 */
export type FileChannel = (typeof FILE_CHANNELS)[keyof typeof FILE_CHANNELS];

/**
 * 视频通道类型
 */
export type VideoChannel = (typeof VIDEO_CHANNELS)[keyof typeof VIDEO_CHANNELS];

/**
 * U盘通道类型
 */
export type UsbChannel = (typeof USB_CHANNELS)[keyof typeof USB_CHANNELS];

/**
 * 认证通道类型
 */
export type AuthChannel = (typeof AUTH_CHANNELS)[keyof typeof AUTH_CHANNELS];

/**
 * 配置通道类型
 */
export type ConfigChannel = (typeof CONFIG_CHANNELS)[keyof typeof CONFIG_CHANNELS];

/**
 * 日志通道类型
 */
export type LogChannel = (typeof LOG_CHANNELS)[keyof typeof LOG_CHANNELS];

/**
 * 更新通道类型
 */
export type UpdateChannel = (typeof UPDATE_CHANNELS)[keyof typeof UPDATE_CHANNELS];

/**
 * 所有通道类型的联合类型
 */
export type IPCChannel =
  | WindowChannel
  | SystemChannel
  | FileChannel
  | VideoChannel
  | UsbChannel
  | AuthChannel
  | ConfigChannel
  | LogChannel
  | UpdateChannel;
