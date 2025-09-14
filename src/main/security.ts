/**
 * Electron 安全配置模块
 * 实现 Electron 安全最佳实践，确保应用安全性
 */

import { WebPreferences } from 'electron';
import { join } from 'path';

/**
 * 安全配置接口
 */
export interface SecurityConfig extends WebPreferences {
  nodeIntegration: false;
  contextIsolation: true;
  sandbox: true;
  webSecurity: true;
  allowRunningInsecureContent: false;
  experimentalFeatures: false;
  nodeIntegrationInWorker: false;
  nodeIntegrationInSubFrames: false;
}

/**
 * 获取安全的 WebPreferences 配置
 * 遵循 Electron 安全最佳实践
 * @returns 安全配置对象
 */
export function getSecurityConfig(): SecurityConfig {
  return {
    // 禁用 Node.js 集成（安全关键）
    nodeIntegration: false,

    // 启用上下文隔离（安全关键）
    contextIsolation: true,

    // 启用沙箱模式（安全关键）
    sandbox: true,

    // 启用 Web 安全
    webSecurity: true,

    // 禁止运行不安全内容
    allowRunningInsecureContent: false,

    // 禁用实验性功能
    experimentalFeatures: false,

    // 禁用 Node.js 集成在 Worker 中
    nodeIntegrationInWorker: false,

    // 禁用 Node.js 集成在子框架中
    nodeIntegrationInSubFrames: false,

    // 禁用远程模块（已废弃的属性，通过其他方式控制）
    // enableRemoteModule: false, // 此属性在新版本中已移除

    // 预加载脚本路径（将在窗口管理器中设置）
    preload: join(__dirname, 'preload.js'),
  };
}

/**
 * 内容安全策略 (CSP) 配置
 * 用于防止 XSS 攻击和其他代码注入
 */
export const CONTENT_SECURITY_POLICY = {
  // 开发环境 CSP（允许本地开发服务器）
  development: [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173",
    "style-src 'self' 'unsafe-inline' http://localhost:5173",
    "img-src 'self' data: http://localhost:5173",
    "font-src 'self' data:",
    "connect-src 'self' http://localhost:5173 ws://localhost:5173",
    "media-src 'self' blob:",
  ].join('; '),

  // 生产环境 CSP（严格安全策略）
  production: [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'", // Element Plus 需要内联样式
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "media-src 'self' blob:", // 视频播放需要 blob URLs
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

/**
 * 获取当前环境的 CSP 策略
 * @returns CSP 策略字符串
 */
export function getContentSecurityPolicy(): string {
  const isDev = process.env.NODE_ENV === 'development';
  return isDev ? CONTENT_SECURITY_POLICY.development : CONTENT_SECURITY_POLICY.production;
}

/**
 * 权限策略配置
 * 控制浏览器 API 的访问权限
 */
export const PERMISSIONS_POLICY = {
  // 禁用的功能
  camera: 'none',
  microphone: 'none',
  geolocation: 'none',
  notifications: 'none',
  'push-messaging': 'none',
  'sync-xhr': 'none',
  usb: 'none',
  serial: 'none',
  bluetooth: 'none',

  // 允许的功能（仅限自身）
  fullscreen: 'self', // 视频全屏播放需要
  autoplay: 'self', // 视频自动播放
};

/**
 * 获取权限策略字符串
 * @returns 权限策略字符串
 */
export function getPermissionsPolicy(): string {
  return Object.entries(PERMISSIONS_POLICY)
    .map(([feature, allowlist]) => `${feature}=(${allowlist})`)
    .join(', ');
}

/**
 * 安全头部配置
 * 用于设置 HTTP 安全头部
 */
export const SECURITY_HEADERS = {
  // 防止点击劫持
  'X-Frame-Options': 'DENY',

  // 防止 MIME 类型嗅探
  'X-Content-Type-Options': 'nosniff',

  // XSS 保护
  'X-XSS-Protection': '1; mode=block',

  // 引用策略
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // 权限策略
  'Permissions-Policy': getPermissionsPolicy(),

  // 内容安全策略
  'Content-Security-Policy': getContentSecurityPolicy(),
};

/**
 * 验证预加载脚本的安全性
 * @param preloadPath 预加载脚本路径
 * @returns 是否安全
 */
export function validatePreloadScript(preloadPath: string): boolean {
  try {
    // 检查路径是否在应用目录内
    const normalizedPath = join(__dirname, preloadPath);
    return normalizedPath.startsWith(__dirname);
  } catch (error) {
    console.error('预加载脚本路径验证失败:', error);
    return false;
  }
}

/**
 * 安全配置验证
 * 验证当前安全配置是否符合最佳实践
 * @param config WebPreferences 配置
 * @returns 验证结果
 */
export function validateSecurityConfig(config: WebPreferences): {
  isSecure: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  // 检查关键安全设置
  if (config.nodeIntegration !== false) {
    errors.push('nodeIntegration 必须设置为 false');
  }

  if (config.contextIsolation !== true) {
    errors.push('contextIsolation 必须设置为 true');
  }

  if (config.webSecurity !== true && process.env.NODE_ENV === 'production') {
    errors.push('生产环境中 webSecurity 必须设置为 true');
  }

  if (config.allowRunningInsecureContent === true) {
    warnings.push('allowRunningInsecureContent 设置为 true 可能存在安全风险');
  }

  if (config.experimentalFeatures === true) {
    warnings.push('experimentalFeatures 设置为 true 可能存在安全风险');
  }

  return {
    isSecure: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * 初始化安全配置
 * 在应用启动时调用，设置全局安全策略
 */
export function initializeSecurity(): void {
  // 设置默认的用户代理
  const userAgent = `EncryptedVideoPlayer/1.0.0 (${process.platform})`;

  // 在这里可以添加其他全局安全初始化逻辑
  console.log('安全配置已初始化');
  console.log('User Agent:', userAgent);

  // 验证当前安全配置
  const securityConfig = getSecurityConfig();
  const validation = validateSecurityConfig(securityConfig);

  if (!validation.isSecure) {
    console.error('安全配置验证失败:', validation.errors);
  }

  if (validation.warnings.length > 0) {
    console.warn('安全配置警告:', validation.warnings);
  }
}
