# Main Process (主进程)

## 模块职责

主进程是 Electron 应用的核心控制模块，负责：

### 核心功能

- **应用生命周期管理**: 启动、关闭、窗口管理
- **系统资源访问**: 文件系统、操作系统API
- **安全控制**: 权限管理、沙箱配置
- **IPC通信服务**: 与渲染进程的通信协调

### 安全特性

- **上下文隔离**: 启用 contextIsolation
- **沙箱模式**: 启用 sandbox 模式
- **CSP策略**: 内容安全策略配置
- **权限控制**: 最小权限原则

## 目录结构

```
src/main/
├── index.ts              # 主进程入口文件
├── window-manager.ts     # 窗口管理模块
├── security.ts          # 安全配置模块
├── ipc-handlers.ts       # IPC处理器
└── utils/               # 主进程工具模块
    ├── file-manager.ts   # 文件管理
    ├── crypto.ts         # 加密解密
    └── logger.ts         # 日志记录
```

## 技术规范

### 开发约束

- **TypeScript**: 严格类型检查
- **ESLint**: 代码规范检查
- **安全最佳实践**: 遵循 Electron 安全指南

### 性能要求

- **启动时间**: ≤ 3秒 (冷启动)
- **内存占用**: ≤ 100MB (空闲状态)
- **响应时间**: IPC通信 ≤ 100ms

## 依赖关系

### 前置依赖

- Electron 22.3.27
- TypeScript 5.9.2
- Node.js >= 16.0.0

### 后续模块

- 渲染进程 (src/renderer/)
- 共享模块 (src/shared/)

---

_此模块将在 T5: Electron主进程配置 任务中实现_
