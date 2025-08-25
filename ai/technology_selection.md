# 加密视频U盘项目技术选型方案

## 项目概述

本项目基于Web技术栈开发一个安全的加密视频播放器，运行在Windows桌面环境中，为医学技术培训公司提供防复制的视频学习解决方案。

## 核心技术架构

### 1. 桌面应用框架

**选择：Electron 方案**

- **主框架：Electron**
  - 成熟稳定，广泛应用于桌面应用开发
  - 完善的Windows系统兼容性（Win7/10/11）
  - 丰富的Node.js生态系统支持
  - 强大的系统API访问能力
  - 便于实现防复制和安全控制

### 2. 前端技术栈

**选择：Vue.js 3 + TypeScript + Vite**

- **Vue.js 3**
  - 轻量级、易学习，适合快速开发
  - 优秀的响应式系统
  - 组件化开发，便于维护
  - 适合构建适老化界面

- **TypeScript**
  - 类型安全，减少运行时错误
  - 更好的代码提示和重构支持
  - 提高代码质量和可维护性

- **Vite**
  - 快速的开发服务器
  - 高效的构建工具
  - 优秀的热更新体验

### 3. UI组件库

**选择：Element Plus + 自定义适老化组件**

- **Element Plus**
  - Vue 3生态系统中最成熟的组件库
  - 丰富的组件支持
  - 良好的可定制性

- **自定义适老化组件**
  - 大字体（≥16px）、大按钮（≥44px）设计
  - 医学专业风格的配色方案
  - 简化的交互逻辑

### 4. 视频处理技术

**选择：FFmpeg.js + Video.js + 自定义解密模块**

- **FFmpeg.js**
  - Web Assembly版本的FFmpeg
  - 支持多种视频格式（MP4、AVI、MOV）
  - 高性能视频解码
  - 可集成自定义解密流程

- **Video.js**
  - 成熟的HTML5视频播放器
  - 丰富的插件生态
  - 可定制的播放控件
  - 支持全屏、倍速等功能

- **自定义解密模块**
  - 基于Web Workers的后台解密
  - 流式解密，边解密边播放
  - 内存安全管理

### 5. 加密技术方案

**选择：AES-256-GCM + RSA-2048 + 自定义密钥管理**

- **文件加密：AES-256-GCM**
  - 业界标准的对称加密算法
  - 提供认证加密，防篡改
  - 高性能，适合大文件加密

- **密钥交换：RSA-2048**
  - 非对称加密，安全密钥分发
  - 每个U盘独立密钥对
  - 防止密钥泄露风险

- **Web Crypto API**
  - 浏览器原生加密API
  - 硬件加速支持
  - 安全的密钥存储

### 6. 安全防护技术

**选择：多层防护 + Electron安全机制**

- **内容保护**
  - 禁用开发者工具
  - 禁用右键菜单和快捷键
  - 防截屏API（Windows Screen Capture Protection）
  - 内存保护和清理

- **进程保护**
  - Electron主进程安全配置
  - 渲染进程沙箱化
  - Node.js集成限制

- **文件系统保护**
  - 临时文件加密
  - 自动清理机制
  - 文件访问权限控制

### 7. 状态管理

**选择：Pinia + 本地存储加密**

- **Pinia**
  - Vue 3官方推荐的状态管理库
  - 类型安全的状态管理
  - 简洁的API设计

- **本地存储**
  - 加密的用户配置存储
  - 会话状态管理
  - 播放历史记录（加密）

### 8. 构建和打包

**选择：Electron Builder + 代码混淆**

- **Electron Builder**
  - 跨平台应用打包
  - 自动更新支持
  - 代码签名集成

- **代码保护**
  - JavaScript混淆（Terser + 自定义混淆）
  - 资源文件加密
  - 反调试保护

## 项目结构设计

```
EncryptedVideoUDisk/
├── src/
│   ├── main/                 # Electron主进程
│   │   ├── index.ts         # 主进程入口
│   │   ├── security/        # 安全模块
│   │   ├── crypto/          # 加密解密模块
│   │   └── usb/             # U盘检测模块
│   ├── renderer/            # 渲染进程（前端）
│   │   ├── components/      # Vue组件
│   │   ├── views/           # 页面视图
│   │   ├── stores/          # Pinia状态管理
│   │   ├── utils/           # 工具函数
│   │   └── assets/          # 静态资源
│   └── shared/              # 共享代码
│       ├── types/           # TypeScript类型定义
│       └── constants/       # 常量定义
├── public/                  # 公共资源
├── dist/                    # 构建输出
├── scripts/                 # 构建脚本
└── docs/                    # 项目文档
```

## 业务域设计

### 1. 核心业务域

- **认证域（Authentication）**
  - 密码验证
  - 会话管理
  - 权限控制

- **视频域（Video）**
  - 视频列表管理
  - 播放控制
  - 进度跟踪

- **安全域（Security）**
  - 加密解密
  - 防复制保护
  - 安全监控

- **设备域（Device）**
  - U盘检测
  - 硬件验证
  - 存储管理

### 2. 数据模型设计

```typescript
// 视频信息模型
interface VideoInfo {
  id: string;
  title: string;
  description: string;
  duration: number;
  fileSize: number;
  encryptedPath: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

// 用户会话模型
interface UserSession {
  sessionId: string;
  isAuthenticated: boolean;
  loginTime: Date;
  lastActivity: Date;
  permissions: string[];
}

// U盘信息模型
interface UsbDevice {
  deviceId: string;
  label: string;
  serialNumber: string;
  capacity: number;
  isValid: boolean;
  encryptionKey?: string;
}

// 播放状态模型
interface PlaybackState {
  videoId: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  playbackRate: number;
  isFullscreen: boolean;
}
```

## 依赖关系管理

### 1. 核心依赖

```json
{
  "dependencies": {
    "electron": "^27.0.0",
    "vue": "^3.3.0",
    "pinia": "^2.1.0",
    "element-plus": "^2.4.0",
    "video.js": "^8.5.0",
    "ffmpeg.js": "^0.12.0",
    "crypto-js": "^4.2.0",
    "node-forge": "^1.3.0"
  },
  "devDependencies": {
    "electron-builder": "^24.6.0",
    "vite": "^4.4.0",
    "typescript": "^5.2.0",
    "@vitejs/plugin-vue": "^4.4.0",
    "terser": "^5.20.0"
  }
}
```

### 2. 安全依赖

- **node-forge**: RSA加密和证书处理
- **crypto-js**: AES加密实现
- **electron-security**: Electron安全增强
- **usb-detection**: U盘检测库

## 开发模式和最佳实践

### 1. 代码组织模式

- **模块化设计**: 按功能域划分模块
- **依赖注入**: 使用IoC容器管理依赖
- **事件驱动**: 基于事件的松耦合架构
- **分层架构**: 表现层、业务层、数据层分离

### 2. 安全开发实践

- **最小权限原则**: 限制进程和API权限
- **输入验证**: 严格的数据验证和清理
- **错误处理**: 安全的错误信息处理
- **日志审计**: 安全事件记录和监控

### 3. 性能优化策略

- **懒加载**: 按需加载视频和组件
- **内存管理**: 及时释放解密后的内存
- **缓存策略**: 智能的视频片段缓存
- **异步处理**: 非阻塞的加密解密操作

## 技术风险评估

### 1. 高风险项

- **视频解密性能**: 需要优化解密算法和内存使用
- **跨版本兼容性**: Windows 7/10/11的API差异
- **安全防护绕过**: 需要多层防护机制

### 2. 中风险项

- **U盘兼容性**: 不同品牌U盘的硬件差异
- **视频格式支持**: FFmpeg.js的格式限制
- **用户体验**: 适老化界面的设计挑战

### 3. 缓解策略

- **原型验证**: 早期技术可行性验证
- **渐进开发**: 分阶段实现和测试
- **备选方案**: 为关键技术准备备选实现
