// 应用核心业务类型声明

// 视频文件信息
export interface VideoFile {
  id: string
  name: string
  path: string
  size: number
  duration?: number
  thumbnail?: string
  isEncrypted: boolean
  encryptedAt?: Date
  lastAccessed?: Date
}

// 加密配置
export interface EncryptionConfig {
  algorithm: 'AES-256-GCM'
  keyDerivation: 'PBKDF2'
  iterations: number
  saltLength: number
  ivLength: number
  tagLength: number
}

// 用户设置
export interface UserSettings {
  // 界面设置
  theme: 'light' | 'dark' | 'auto'
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  language: 'zh-CN' | 'en-US'
  
  // 播放设置
  autoPlay: boolean
  volume: number
  playbackRate: number
  
  // 安全设置
  autoLock: boolean
  lockTimeout: number // 分钟
  rememberPassword: boolean
  
  // 文件设置
  defaultSaveLocation: string
  autoCleanTemp: boolean
}

// 应用状态
export interface AppState {
  isInitialized: boolean
  isLocked: boolean
  currentUser?: string
  lastActivity: Date
  
  // 当前播放状态
  currentVideo?: VideoFile
  isPlaying: boolean
  currentTime: number
  duration: number
}

// 错误类型
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// 操作结果
export interface OperationResult<T = any> {
  success: boolean
  data?: T
  error?: AppError
}

// 进度信息
export interface ProgressInfo {
  current: number
  total: number
  percentage: number
  message?: string
}

// 文件操作类型
export type FileOperation = 'encrypt' | 'decrypt' | 'open' | 'save' | 'delete'

// 主题配置
export interface ThemeConfig {
  name: string
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    danger: string
    info: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  
  // 适老化设计
  accessibility: {
    highContrast: boolean
    largeText: boolean
    reducedMotion: boolean
  }
}

// 组件属性基类
export interface BaseComponentProps {
  class?: string
  style?: string | Record<string, any>
  disabled?: boolean
  loading?: boolean
}

// 事件处理器类型
export type EventHandler<T = Event> = (event: T) => void | Promise<void>

export {}