/**
 * 路径工具模块
 * 提供安全的路径操作和验证功能
 */

import { join, resolve, relative, normalize } from 'path';
import { app } from 'electron';

/**
 * 获取应用相关路径
 */
export class AppPaths {
  /**
   * 获取应用根目录
   */
  static getAppRoot(): string {
    return app.getAppPath();
  }

  /**
   * 获取用户数据目录
   */
  static getUserDataPath(): string {
    return app.getPath('userData');
  }

  /**
   * 获取临时目录
   */
  static getTempPath(): string {
    return app.getPath('temp');
  }

  /**
   * 获取日志目录
   */
  static getLogsPath(): string {
    return app.getPath('logs');
  }

  /**
   * 获取资源目录
   */
  static getResourcesPath(): string {
    return process.resourcesPath || join(this.getAppRoot(), 'resources');
  }

  /**
   * 获取预加载脚本路径
   */
  static getPreloadPath(): string {
    return join(__dirname, 'preload.js');
  }

  /**
   * 获取渲染进程入口文件路径
   */
  static getRendererPath(): string {
    const isDev = process.env.NODE_ENV === 'development';
    return isDev ? 'http://localhost:5173' : join(__dirname, '../renderer/index.html');
  }
}

/**
 * 路径安全验证
 */
export class PathSecurity {
  /**
   * 验证路径是否在允许的目录内
   * @param targetPath 目标路径
   * @param allowedBasePath 允许的基础路径
   * @returns 是否安全
   */
  static isPathSafe(targetPath: string, allowedBasePath: string): boolean {
    try {
      const normalizedTarget = normalize(resolve(targetPath));
      const normalizedBase = normalize(resolve(allowedBasePath));
      const relativePath = relative(normalizedBase, normalizedTarget);

      // 检查是否试图访问父目录
      return !relativePath.startsWith('..') && !relativePath.startsWith('/');
    } catch {
      return false;
    }
  }

  /**
   * 验证文件扩展名是否允许
   * @param filePath 文件路径
   * @param allowedExtensions 允许的扩展名列表
   * @returns 是否允许
   */
  static isExtensionAllowed(filePath: string, allowedExtensions: string[]): boolean {
    const extension = filePath.toLowerCase().split('.').pop();
    return extension ? allowedExtensions.includes(extension) : false;
  }

  /**
   * 清理文件名，移除危险字符
   * @param filename 原始文件名
   * @returns 清理后的文件名
   */
  static sanitizeFilename(filename: string): string {
    // 移除或替换危险字符
    return filename
      .replace(/[<>:"/\\|?*]/g, '_') // 替换Windows不允许的字符
      .replace(/^\.|\.$/, '_') // 替换开头和结尾的点
      .replace(/\s+/g, '_') // 替换空格
      .substring(0, 255); // 限制长度
  }
}

/**
 * 视频文件相关路径工具
 */
export class VideoPathUtils {
  // 支持的视频格式
  static readonly SUPPORTED_VIDEO_EXTENSIONS = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];

  /**
   * 检查是否为支持的视频文件
   * @param filePath 文件路径
   * @returns 是否为支持的视频文件
   */
  static isSupportedVideoFile(filePath: string): boolean {
    return PathSecurity.isExtensionAllowed(filePath, this.SUPPORTED_VIDEO_EXTENSIONS);
  }

  /**
   * 生成加密视频文件路径
   * @param originalPath 原始视频路径
   * @returns 加密文件路径
   */
  static getEncryptedVideoPath(originalPath: string): string {
    const baseName = originalPath.replace(/\.[^/.]+$/, '');
    return `${baseName}.encrypted`;
  }

  /**
   * 生成临时解密文件路径
   * @returns 临时文件路径
   */
  static getTempDecryptedPath(): string {
    const tempDir = AppPaths.getTempPath();
    const filename = `decrypted_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.tmp`;
    return join(tempDir, filename);
  }
}

/**
 * 通用路径工具函数
 */
export const pathUtils = {
  /**
   * 安全地连接路径
   */
  safeJoin: (...paths: string[]): string => {
    return normalize(join(...paths));
  },

  /**
   * 获取文件扩展名
   */
  getExtension: (filePath: string): string => {
    return filePath.toLowerCase().split('.').pop() || '';
  },

  /**
   * 获取不带扩展名的文件名
   */
  getBaseName: (filePath: string): string => {
    return filePath.replace(/\.[^/.]+$/, '');
  },

  /**
   * 确保路径以分隔符结尾
   */
  ensureTrailingSlash: (path: string): string => {
    return path.endsWith('/') || path.endsWith('\\') ? path : `${path}/`;
  },
};
