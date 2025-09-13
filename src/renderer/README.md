# Renderer Process (渲染进程)

## 模块职责

渲染进程是用户界面层，基于 Vue.js 3 构建，负责：

### 核心功能

- **用户界面渲染**: Vue.js 组件化界面
- **用户交互处理**: 事件响应、表单处理
- **状态管理**: Pinia 全局状态管理
- **路由导航**: Vue Router 页面路由
- **IPC客户端**: 与主进程通信

### 界面特性

- **医疗主题**: 专业蓝色主题风格
- **老年友好**: 大字体、高对比度设计
- **响应式布局**: 适配不同屏幕尺寸
- **无障碍支持**: ARIA 标准兼容

## 目录结构

```
src/renderer/
├── main.ts                 # 渲染进程入口
├── App.vue                 # 根组件
├── components/             # 通用组件
│   ├── common/            # 基础组件
│   ├── video/             # 视频相关组件
│   └── security/          # 安全相关组件
├── views/                  # 页面组件
│   ├── SplashView.vue     # 启动页面
│   ├── AuthView.vue       # 密码验证页面
│   ├── VideoListView.vue  # 视频列表页面
│   └── PlayerView.vue     # 视频播放页面
├── router/                 # 路由配置
│   └── index.ts           # 路由定义
├── stores/                 # Pinia状态管理
│   ├── auth.ts            # 认证状态
│   ├── video.ts           # 视频状态
│   └── app.ts             # 应用状态
├── styles/                 # 样式文件
│   ├── theme/             # 主题变量
│   ├── components/        # 组件样式
│   └── global.scss        # 全局样式
├── plugins/                # 插件配置
│   └── element-plus.ts    # Element Plus配置
├── utils/                  # 工具函数
│   ├── format.ts          # 格式化工具
│   └── validation.ts      # 验证工具
└── ipc-client.ts          # IPC客户端
```

## 技术规范

### 技术栈

- **Vue.js**: 3.5.21 (Composition API)
- **TypeScript**: 严格类型检查
- **Element Plus**: 2.11.1 (UI组件库)
- **Pinia**: 2.3.1 (状态管理)
- **Vue Router**: 路由管理
- **SCSS**: CSS预处理器

### 开发约束

- **组件化开发**: 单文件组件 (SFC)
- **Composition API**: 优先使用组合式API
- **TypeScript**: 完整类型定义
- **响应式设计**: 移动端适配

### 性能要求

- **首屏渲染**: ≤ 2秒
- **路由切换**: ≤ 300ms
- **内存占用**: ≤ 100MB
- **包体积**: ≤ 5MB (gzip)

## 设计规范

### 色彩系统

- **主色**: #1890FF (医疗蓝)
- **成功色**: #52C41A
- **警告色**: #FAAD14
- **错误色**: #FF4D4F

### 字体系统

- **基础字号**: 18px (老年友好)
- **标题字号**: 24px, 20px
- **字体族**: 'Microsoft YaHei', sans-serif

### 间距系统

- **基础间距**: 8px, 16px, 24px, 32px
- **组件间距**: 16px (默认)
- **页面边距**: 24px

## 依赖关系

### 前置依赖

- Vue.js 3.5.21
- Element Plus 2.11.1
- TypeScript 5.9.2

### 关联模块

- 主进程 (src/main/) - IPC通信
- 共享模块 (src/shared/) - 类型定义

---

_此模块将在 T6: Vue.js渲染进程配置 任务中实现_
