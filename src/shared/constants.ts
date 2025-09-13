/**
 * 应用共享常量定义
 * 在主进程和渲染进程之间共享的常量
 */

// 应用信息
export const APP_INFO = {
  NAME: 'EncryptedVideoUDisk',
  VERSION: '1.0.0',
  DESCRIPTION: '加密视频U盘播放器',
  AUTHOR: 'Medical Training Company',
} as const;

// 文件类型
export const SUPPORTED_VIDEO_FORMATS = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm'] as const;

export const SUPPORTED_SUBTITLE_FORMATS = ['.srt', '.vtt', '.ass', '.ssa'] as const;

// 加密配置常量
export const ENCRYPTION_CONFIG = {
  ALGORITHM: 'AES-256-GCM',
  KEY_DERIVATION: 'PBKDF2',
  ITERATIONS: 100000,
  SALT_LENGTH: 32,
  IV_LENGTH: 12,
  TAG_LENGTH: 16,
} as const;

// 界面配置
export const UI_CONFIG = {
  // 适老化设计尺寸
  FONT_SIZES: {
    SMALL: '14px',
    MEDIUM: '16px',
    LARGE: '20px',
    EXTRA_LARGE: '24px',
  },

  // 按钮尺寸
  BUTTON_SIZES: {
    SMALL: { width: '80px', height: '32px' },
    MEDIUM: { width: '100px', height: '40px' },
    LARGE: { width: '120px', height: '48px' },
    EXTRA_LARGE: { width: '140px', height: '56px' },
  },

  // 颜色主题
  COLORS: {
    PRIMARY: '#2E86AB',
    SECONDARY: '#A23B72',
    SUCCESS: '#F18F01',
    WARNING: '#C73E1D',
    DANGER: '#8B0000',
    INFO: '#4A90E2',
  },
} as const;

// 错误代码
export const ERROR_CODES = {
  // 文件操作错误
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  FILE_READ_ERROR: 'FILE_READ_ERROR',
  FILE_WRITE_ERROR: 'FILE_WRITE_ERROR',

  // 加密解密错误
  ENCRYPTION_FAILED: 'ENCRYPTION_FAILED',
  DECRYPTION_FAILED: 'DECRYPTION_FAILED',
  INVALID_PASSWORD: 'INVALID_PASSWORD',

  // 播放错误
  VIDEO_LOAD_ERROR: 'VIDEO_LOAD_ERROR',
  CODEC_NOT_SUPPORTED: 'CODEC_NOT_SUPPORTED',

  // 系统错误
  INSUFFICIENT_MEMORY: 'INSUFFICIENT_MEMORY',
  NETWORK_ERROR: 'NETWORK_ERROR',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
} as const;

// 事件名称
export const EVENT_NAMES = {
  // 应用事件
  APP_READY: 'app:ready',
  APP_QUIT: 'app:quit',

  // 文件事件
  FILE_OPENED: 'file:opened',
  FILE_SAVED: 'file:saved',

  // 播放事件
  VIDEO_LOADED: 'video:loaded',
  VIDEO_PLAY: 'video:play',
  VIDEO_PAUSE: 'video:pause',
  VIDEO_ENDED: 'video:ended',

  // 用户事件
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
} as const;

// 类型导出
export type VideoFormat = (typeof SUPPORTED_VIDEO_FORMATS)[number];
export type SubtitleFormat = (typeof SUPPORTED_SUBTITLE_FORMATS)[number];
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];
