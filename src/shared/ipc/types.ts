/**
 * IPC 通信类型定义
 * 定义主进程和渲染进程间通信的所有数据结构
 */

// ============================================================================
// 基础类型定义
// ============================================================================

/**
 * IPC 响应基础结构
 */
export interface IPCResponse<T = unknown> {
  /** 操作是否成功 */
  success: boolean;
  /** 响应数据 */
  data?: T;
  /** 错误信息 */
  error?: string;
  /** 错误代码 */
  errorCode?: string;
  /** 时间戳 */
  timestamp: number;
}

/**
 * IPC 请求基础结构
 */
export interface IPCRequest<T = unknown> {
  /** 请求ID，用于追踪 */
  requestId: string;
  /** 请求数据 */
  data?: T;
  /** 时间戳 */
  timestamp: number;
}

// ============================================================================
// 系统信息相关类型
// ============================================================================

/**
 * 系统信息数据结构
 */
export interface SystemInfo {
  /** 操作系统平台 */
  platform: string;
  /** 系统架构 */
  arch: string;
  /** 操作系统版本 */
  osVersion: string;
  /** 应用版本 */
  appVersion: string;
  /** Electron版本 */
  electronVersion: string;
  /** Node.js版本 */
  nodeVersion: string;
  /** 内存信息 */
  memory: {
    /** 总内存 (MB) */
    total: number;
    /** 可用内存 (MB) */
    available: number;
    /** 已使用内存 (MB) */
    used: number;
  };
  /** CPU信息 */
  cpu: {
    /** CPU型号 */
    model: string;
    /** CPU核心数 */
    cores: number;
    /** CPU使用率 (%) */
    usage: number;
  };
}

// ============================================================================
// 窗口控制相关类型
// ============================================================================

/**
 * 窗口状态信息
 */
export interface WindowState {
  /** 是否最大化 */
  isMaximized: boolean;
  /** 是否最小化 */
  isMinimized: boolean;
  /** 是否全屏 */
  isFullScreen: boolean;
  /** 是否可见 */
  isVisible: boolean;
  /** 窗口位置 */
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * 窗口操作类型
 */
export type WindowOperation = 'minimize' | 'maximize' | 'restore' | 'close' | 'hide' | 'show';

// ============================================================================
// 文件操作相关类型
// ============================================================================

/**
 * 文件选择选项
 */
export interface FileSelectOptions {
  /** 对话框标题 */
  title?: string;
  /** 默认路径 */
  defaultPath?: string;
  /** 文件过滤器 */
  filters?: Array<{
    name: string;
    extensions: string[];
  }>;
  /** 是否允许多选 */
  multiSelections?: boolean;
}

/**
 * 文件信息
 */
export interface FileInfo {
  /** 文件路径 */
  path: string;
  /** 文件名 */
  name: string;
  /** 文件大小 (字节) */
  size: number;
  /** 文件类型 */
  type: string;
  /** 最后修改时间 */
  lastModified: number;
  /** 是否为目录 */
  isDirectory: boolean;
}

/**
 * 文件保存选项
 */
export interface FileSaveOptions {
  /** 对话框标题 */
  title?: string;
  /** 默认文件名 */
  defaultPath?: string;
  /** 文件过滤器 */
  filters?: Array<{
    name: string;
    extensions: string[];
  }>;
}

// ============================================================================
// 视频处理相关类型
// ============================================================================

/**
 * 视频加密请求参数
 */
export interface VideoEncryptRequest {
  /** 源视频文件路径 */
  sourcePath: string;
  /** 输出文件路径 */
  outputPath: string;
  /** 加密密码 */
  password: string;
  /** 加密算法 */
  algorithm?: 'AES-256-GCM';
  /** 压缩质量 (0-100) */
  quality?: number;
}

/**
 * 视频解密请求参数
 */
export interface VideoDecryptRequest {
  /** 加密视频文件路径 */
  encryptedPath: string;
  /** 解密密码 */
  password: string;
  /** 临时输出路径 */
  tempPath?: string;
}

/**
 * 视频处理进度信息
 */
export interface VideoProcessProgress {
  /** 处理进度 (0-100) */
  progress: number;
  /** 当前阶段 */
  stage: 'reading' | 'encrypting' | 'decrypting' | 'writing' | 'completed' | 'error';
  /** 阶段描述 */
  message: string;
  /** 处理速度 (MB/s) */
  speed?: number;
  /** 预计剩余时间 (秒) */
  eta?: number;
}

/**
 * 视频信息
 */
export interface VideoInfo {
  /** 视频时长 (秒) */
  duration: number;
  /** 视频宽度 */
  width: number;
  /** 视频高度 */
  height: number;
  /** 帧率 */
  frameRate: number;
  /** 比特率 */
  bitRate: number;
  /** 编码格式 */
  codec: string;
  /** 文件大小 (字节) */
  fileSize: number;
}

// ============================================================================
// U盘检测相关类型
// ============================================================================

/**
 * U盘设备信息
 */
export interface UsbDevice {
  /** 设备ID */
  deviceId: string;
  /** 设备标签 */
  label: string;
  /** 序列号 */
  serialNumber?: string;
  /** 容量 (字节) */
  capacity: number;
  /** 可用空间 (字节) */
  freeSpace: number;
  /** 挂载路径 */
  mountPath: string;
  /** 文件系统类型 */
  fileSystem: string;
  /** 是否为可移动设备 */
  isRemovable: boolean;
  /** 设备状态 */
  status: 'connected' | 'disconnected' | 'error';
}

// ============================================================================
// 安全认证相关类型
// ============================================================================

/**
 * 密码验证请求
 */
export interface PasswordVerifyRequest {
  /** 输入的密码 */
  password: string;
  /** 密码哈希 (用于验证) */
  passwordHash?: string;
}

/**
 * 会话信息
 */
export interface SessionInfo {
  /** 会话ID */
  sessionId: string;
  /** 是否已认证 */
  isAuthenticated: boolean;
  /** 登录时间 */
  loginTime: number;
  /** 最后活动时间 */
  lastActivity: number;
  /** 会话过期时间 */
  expiresAt: number;
  /** 用户权限 */
  permissions: string[];
}

// ============================================================================
// 应用配置相关类型
// ============================================================================

/**
 * 应用配置
 */
export interface AppConfig {
  /** 界面语言 */
  language: 'zh-CN' | 'en-US';
  /** 主题模式 */
  theme: 'light' | 'dark' | 'auto';
  /** 自动播放 */
  autoPlay: boolean;
  /** 默认音量 (0-100) */
  defaultVolume: number;
  /** 播放速度 */
  playbackRate: number;
  /** 全屏模式 */
  fullScreenMode: 'window' | 'screen';
  /** 安全设置 */
  security: {
    /** 会话超时时间 (分钟) */
    sessionTimeout: number;
    /** 最大密码尝试次数 */
    maxPasswordAttempts: number;
    /** 是否启用防截屏 */
    preventScreenCapture: boolean;
  };
}

// ============================================================================
// 错误类型定义
// ============================================================================

/**
 * IPC 错误类型
 */
export enum IPCErrorType {
  /** 网络错误 */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /** 参数错误 */
  INVALID_PARAMS = 'INVALID_PARAMS',
  /** 权限错误 */
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  /** 文件不存在 */
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  /** 文件读写错误 */
  FILE_IO_ERROR = 'FILE_IO_ERROR',
  /** 加密解密错误 */
  CRYPTO_ERROR = 'CRYPTO_ERROR',
  /** 系统错误 */
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  /** 超时错误 */
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  /** 未知错误 */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * IPC 错误详情
 */
export interface IPCError {
  /** 错误类型 */
  type: IPCErrorType;
  /** 错误消息 */
  message: string;
  /** 错误代码 */
  code: string;
  /** 错误详情 */
  details?: Record<string, unknown>;
  /** 错误堆栈 */
  stack?: string;
  /** 时间戳 */
  timestamp: number;
}

// ============================================================================
// 工具类型
// ============================================================================

/**
 * 创建成功响应的工具函数类型
 */
export type CreateSuccessResponse<T> = (data: T) => IPCResponse<T>;

/**
 * 创建错误响应的工具函数类型
 */
export type CreateErrorResponse = (error: string | IPCError, errorCode?: string) => IPCResponse<never>;

/**
 * IPC 处理器函数类型
 */
export type IPCHandler<TRequest = unknown, TResponse = unknown> = (
  request: IPCRequest<TRequest>
) => Promise<IPCResponse<TResponse>>;

/**
 * IPC 事件监听器类型
 */
export type IPCEventListener<T = unknown> = (data: T) => void;
