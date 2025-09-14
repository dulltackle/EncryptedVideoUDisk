/**
 * 系统信息工具模块
 * 提供系统信息获取和环境检测功能
 */

import { app } from 'electron';
import { platform, arch, release, totalmem, freemem } from 'os';

/**
 * 系统信息接口
 */
export interface SystemInfo {
  platform: string;
  arch: string;
  release: string;
  nodeVersion: string;
  electronVersion: string;
  appVersion: string;
  memory: {
    total: number;
    free: number;
    used: number;
  };
}

/**
 * 获取完整的系统信息
 * @returns 系统信息对象
 */
export function getSystemInfo(): SystemInfo {
  const totalMemory = totalmem();
  const freeMemory = freemem();

  return {
    platform: platform(),
    arch: arch(),
    release: release(),
    nodeVersion: process.version,
    electronVersion: process.versions.electron ?? 'unknown',
    appVersion: app.getVersion(),
    memory: {
      total: totalMemory,
      free: freeMemory,
      used: totalMemory - freeMemory,
    },
  };
}

/**
 * 检查是否为Windows系统
 * @returns 是否为Windows
 */
export function isWindows(): boolean {
  return platform() === 'win32';
}

/**
 * 检查是否为macOS系统
 * @returns 是否为macOS
 */
export function isMacOS(): boolean {
  return platform() === 'darwin';
}

/**
 * 检查是否为Linux系统
 * @returns 是否为Linux
 */
export function isLinux(): boolean {
  return platform() === 'linux';
}

/**
 * 检查Windows版本兼容性
 * @returns Windows版本信息
 */
export function getWindowsVersion(): {
  isSupported: boolean;
  version: string;
  isWin7: boolean;
  isWin10: boolean;
  isWin11: boolean;
} {
  if (!isWindows()) {
    return {
      isSupported: false,
      version: 'Not Windows',
      isWin7: false,
      isWin10: false,
      isWin11: false,
    };
  }

  const releaseVersion = release();
  const versionParts = releaseVersion.split('.');
  const majorVersion = parseInt(versionParts[0] || '0', 10);
  const buildNumber = parseInt(versionParts[2] || '0', 10);

  // Windows版本判断逻辑
  const isWin7 = majorVersion === 6 && releaseVersion.startsWith('6.1');
  const isWin10 = majorVersion === 10 && buildNumber < 22000;
  const isWin11 = majorVersion === 10 && buildNumber >= 22000;

  return {
    isSupported: isWin7 || isWin10 || isWin11,
    version: releaseVersion,
    isWin7,
    isWin10,
    isWin11,
  };
}

/**
 * 检查系统资源是否满足要求
 * @returns 资源检查结果
 */
export function checkSystemRequirements(): {
  memoryOk: boolean;
  platformOk: boolean;
  versionOk: boolean;
  overall: boolean;
} {
  const info = getSystemInfo();
  const windowsInfo = getWindowsVersion();

  // 内存要求：至少2GB
  const memoryOk = info.memory.total >= 2 * 1024 * 1024 * 1024;

  // 平台要求：仅支持Windows
  const platformOk = isWindows();

  // 版本要求：Windows 7/10/11
  const versionOk = windowsInfo.isSupported;

  return {
    memoryOk,
    platformOk,
    versionOk,
    overall: memoryOk && platformOk && versionOk,
  };
}

/**
 * 获取性能信息
 * @returns 性能信息
 */
export function getPerformanceInfo(): {
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
  cpuUsage: NodeJS.CpuUsage;
} {
  return {
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    cpuUsage: process.cpuUsage(),
  };
}

/**
 * 格式化内存大小
 * @param bytes 字节数
 * @returns 格式化的内存大小字符串
 */
export function formatMemorySize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * 获取应用运行环境信息
 * @returns 环境信息
 */
export function getEnvironmentInfo(): {
  isDevelopment: boolean;
  isProduction: boolean;
  nodeEnv: string;
  appPath: string;
  userDataPath: string;
} {
  return {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    nodeEnv: process.env.NODE_ENV || 'unknown',
    appPath: app.getAppPath(),
    userDataPath: app.getPath('userData'),
  };
}
