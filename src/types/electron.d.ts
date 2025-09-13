// Electron 进程间通信类型声明

// 主进程 API 接口
export interface ElectronAPI {
  // 文件操作
  openFile: () => Promise<string | null>
  saveFile: (content: string, defaultPath?: string) => Promise<string | null>
  
  // 视频加密/解密
  encryptVideo: (filePath: string, password: string) => Promise<{
    success: boolean
    encryptedPath?: string
    error?: string
  }>
  
  decryptVideo: (filePath: string, password: string) => Promise<{
    success: boolean
    decryptedPath?: string
    error?: string
  }>
  
  // 系统信息
  getSystemInfo: () => Promise<{
    platform: string
    arch: string
    version: string
  }>
  
  // 应用控制
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void
  
  // 事件监听
  onUpdateAvailable: (callback: (info: any) => void) => void
  onUpdateDownloaded: (callback: () => void) => void
  
  // 移除监听器
  removeAllListeners: (channel: string) => void
}

// 渲染进程全局对象扩展
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

// IPC 通道常量
export const IPC_CHANNELS = {
  // 文件操作
  OPEN_FILE: 'file:open',
  SAVE_FILE: 'file:save',
  
  // 视频处理
  ENCRYPT_VIDEO: 'video:encrypt',
  DECRYPT_VIDEO: 'video:decrypt',
  
  // 系统信息
  GET_SYSTEM_INFO: 'system:info',
  
  // 窗口控制
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_MAXIMIZE: 'window:maximize',
  WINDOW_CLOSE: 'window:close',
  
  // 更新事件
  UPDATE_AVAILABLE: 'update:available',
  UPDATE_DOWNLOADED: 'update:downloaded'
} as const

// IPC 消息类型
export type IPCChannel = typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS]

export {}