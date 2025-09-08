# 加密视频U盘应用

基于 Electron + Vue3 + TypeScript 的加密视频U盘应用，提供安全的视频存储和播放功能。

## 项目概述

本项目是一个桌面应用程序，专为需要安全存储和播放视频文件的用户设计。采用现代化的技术栈，确保应用的性能、安全性和用户体验。

### 核心特性

- 🔐 **视频加密存储**：使用 AES-256-GCM 加密算法保护视频文件
- 🎥 **流畅播放体验**：集成 Video.js 播放器，支持多种视频格式
- 🖥️ **跨平台支持**：基于 Electron，支持 Windows 7/10/11
- 🎨 **医疗主题界面**：老年友好的 UI 设计，基于 Element Plus
- ⚡ **高性能处理**：使用 FFmpeg.js 进行视频处理

### 技术栈

- **前端框架**：Vue.js 3.5+ (Composition API)
- **桌面框架**：Electron 22.3.27 (Windows 7 兼容)
- **构建工具**：Vite 4.5+
- **开发语言**：TypeScript 5.9+
- **UI 组件库**：Element Plus 2.11+
- **状态管理**：Pinia 2.3+
- **视频处理**：@ffmpeg/ffmpeg 0.12+
- **视频播放**：Video.js 8.23+
- **加密算法**：crypto-js, node-forge

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/dulltackle/EncryptedVideoUDisk.git
cd EncryptedVideoUDisk

# 安装依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器（T9 任务完成后可用）
npm run dev

# 类型检查（T3 任务完成后可用）
npm run typecheck

# 代码检查（T4 任务完成后可用）
npm run lint
```

### 构建打包

```bash
# 构建应用（T11 任务完成后可用）
npm run build
```

## 开发指南

### 项目结构

```
EncryptedVideoUDisk/
├── src/                    # 源代码目录（T2 任务创建）
│   ├── main/              # Electron 主进程
│   ├── renderer/          # Vue.js 渲染进程
│   └── shared/            # 共享代码
├── build/                 # 构建配置
├── resources/             # 资源文件
├── docs/                  # 项目文档
├── ai/                    # AI 辅助文档
│   ├── docs/              # 任务文档
│   ├── design_system/     # 设计系统
│   └── *.md               # 项目规划文档
├── package.json           # 项目配置
├── LICENSE                # MIT 许可证
└── README.md              # 项目说明
```

### 开发流程

1. **任务驱动开发**：按照 `ai/docs/搭建项目开发框架/TASK_搭建项目开发框架.md` 中的原子任务顺序进行开发
2. **小步迭代**：每个任务完成后进行验收，确保质量
3. **文档同步**：代码变更时同步更新相关文档
4. **质量优先**：每个阶段都确保高质量输出

### 分支策略

- `main`：主分支，保持稳定可发布状态
- `develop`：开发分支，集成最新功能
- `feature/*`：功能分支，开发具体功能
- `hotfix/*`：热修复分支，紧急修复问题

### 提交规范

采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 代码规范

- **TypeScript**：严格类型检查，零类型错误容忍
- **ESLint**：遵循 Airbnb 代码规范
- **Prettier**：自动代码格式化
- **命名规范**：
  - 文件/目录：kebab-case
  - 变量/函数：camelCase
  - 类/接口：PascalCase
  - 常量：UPPER_SNAKE_CASE

## 获取帮助

- **问题反馈**：[GitHub Issues](https://github.com/dulltackle/EncryptedVideoUDisk/issues)
- **项目文档**：查看 `ai/docs/` 目录下的详细文档
- **技术选型**：参考 `ai/technology_selection.md`
- **设计规范**：查看 `ai/design_system/` 目录

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 致谢

感谢所有为本项目做出贡献的开发者和开源社区。

---

**注意**：本项目仍在积极开发中，API 和功能可能会发生变化。建议关注项目更新和文档变更。