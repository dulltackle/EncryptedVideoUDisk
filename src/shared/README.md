# Shared Modules (共享模块)

## 模块职责

共享模块包含主进程和渲染进程都需要使用的通用代码，负责：

### 核心功能

- **类型定义**: TypeScript 接口和类型
- **常量定义**: 应用级常量配置
- **工具函数**: 通用工具方法
- **IPC协议**: 进程间通信协议定义
- **数据模型**: 业务数据结构

### 设计原则

- **零依赖**: 不依赖特定运行环境
- **纯函数**: 无副作用的工具函数
- **类型安全**: 完整的 TypeScript 类型定义
- **向后兼容**: 保持API稳定性

## 目录结构

```
src/shared/
├── types/                  # 类型定义
│   ├── app.ts             # 应用相关类型
│   ├── video.ts           # 视频相关类型
│   ├── security.ts        # 安全相关类型
│   └── ipc.ts             # IPC通信类型
├── constants/              # 常量定义
│   ├── app.ts             # 应用常量
│   ├── video.ts           # 视频常量
│   └── security.ts        # 安全常量
├── utils/                  # 工具函数
│   ├── format.ts          # 格式化工具
│   ├── validation.ts      # 验证工具
│   ├── crypto.ts          # 加密工具
│   └── file.ts            # 文件工具
├── ipc/                    # IPC协议
│   ├── channels.ts        # 通信频道定义
│   ├── events.ts          # 事件定义
│   └── handlers.ts        # 处理器接口
├── models/                 # 数据模型
│   ├── Video.ts           # 视频模型
│   ├── User.ts            # 用户模型
│   └── Config.ts          # 配置模型
└── index.ts               # 统一导出
```

## 技术规范

### 开发约束

- **TypeScript**: 严格类型检查
- **纯函数**: 避免副作用
- **零依赖**: 不引入外部依赖
- **文档完整**: JSDoc 注释

### 代码规范

- **命名规范**: PascalCase (类型), camelCase (函数)
- **导出规范**: 统一从 index.ts 导出
- **版本控制**: 语义化版本管理

## 核心模块说明

### 类型定义 (types/)

定义应用中使用的所有 TypeScript 类型和接口：

```typescript
// 示例：视频类型定义
export interface VideoInfo {
  id: string;
  title: string;
  duration: number;
  size: number;
  encrypted: boolean;
  thumbnail?: string;
}
```

### 常量定义 (constants/)

定义应用级别的常量配置：

```typescript
// 示例：应用常量
export const APP_CONFIG = {
  NAME: 'EncryptedVideoUDisk',
  VERSION: '0.1.0',
  SUPPORTED_FORMATS: ['.mp4', '.avi', '.mkv'],
} as const;
```

### IPC协议 (ipc/)

定义主进程和渲染进程间的通信协议：

```typescript
// 示例：IPC频道定义
export const IPC_CHANNELS = {
  VIDEO_LOAD: 'video:load',
  VIDEO_DECRYPT: 'video:decrypt',
  AUTH_VERIFY: 'auth:verify',
} as const;
```

### 工具函数 (utils/)

提供通用的工具方法：

```typescript
// 示例：格式化工具
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
```

## 使用规范

### 导入方式

```typescript
// 推荐：从统一入口导入
import { VideoInfo, APP_CONFIG, formatFileSize } from '@/shared';

// 避免：直接从子模块导入
import { VideoInfo } from '@/shared/types/video';
```

### 扩展原则

1. **向后兼容**: 新增功能不破坏现有API
2. **类型优先**: 先定义类型，再实现功能
3. **文档同步**: 代码变更同时更新文档
4. **测试覆盖**: 工具函数需要单元测试

## 依赖关系

### 被依赖模块

- 主进程 (src/main/) - 使用类型定义和工具函数
- 渲染进程 (src/renderer/) - 使用类型定义和常量

### 依赖约束

- **零外部依赖**: 不依赖 npm 包
- **环境无关**: 可在 Node.js 和浏览器环境运行
- **版本锁定**: 与主版本号保持一致

---

_此模块将在 T7: IPC通信协议 任务中实现_
