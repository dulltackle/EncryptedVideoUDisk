# 加密视频U盘项目 - 核心组件库

## 组件库概述

### 技术选型

**基础组件库：Element Plus**
- Vue 3 生态系统中最成熟的组件库
- 丰富的组件支持和良好的可定制性
- 完善的TypeScript支持
- 活跃的社区和文档

**定制化策略：**
1. **主题定制**：通过CSS变量覆盖默认样式
2. **尺寸放大**：适配适老化设计需求
3. **功能简化**：移除复杂功能，保留核心交互
4. **医学风格**：融入医学专业的视觉元素

## Element Plus 主题定制

### 全局主题配置

```typescript
// theme/index.ts
import { ElConfigProvider } from 'element-plus'

// 全局配置
export const globalConfig = {
  // 尺寸配置 - 适老化放大
  size: 'large', // 默认使用大尺寸

  // 层级配置
  zIndex: 3000,

  // 命名空间
  namespace: 'el',

  // 按钮配置
  button: {
    autoInsertSpace: true
  }
}
```

### CSS变量覆盖

```scss
// theme/element-plus.scss
:root {
  // 主色调覆盖
  --el-color-primary: #2E5BBA;
  --el-color-primary-light-3: #5B7BC7;
  --el-color-primary-light-5: #7A94D1;
  --el-color-primary-light-7: #99ADDB;
  --el-color-primary-light-8: #B8C6E5;
  --el-color-primary-light-9: #D7E0EF;
  --el-color-primary-dark-2: #1E3A8A;

  // 成功色
  --el-color-success: #10B981;
  --el-color-warning: #F59E0B;
  --el-color-danger: #EF4444;
  --el-color-error: #EF4444;
  --el-color-info: #6B7280;

  // 文字颜色
  --el-text-color-primary: #1F2937;
  --el-text-color-regular: #374151;
  --el-text-color-secondary: #6B7280;
  --el-text-color-placeholder: #9CA3AF;
  --el-text-color-disabled: #D1D5DB;

  // 边框颜色
  --el-border-color: #E5E7EB;
  --el-border-color-light: #F3F4F6;
  --el-border-color-lighter: #F9FAFB;
  --el-border-color-extra-light: #FAFAFA;
  --el-border-color-dark: #D1D5DB;
  --el-border-color-darker: #9CA3AF;

  // 背景色
  --el-bg-color: #FFFFFF;
  --el-bg-color-page: #F9FAFB;
  --el-bg-color-overlay: #FFFFFF;

  // 字体大小 - 适老化调整
  --el-font-size-extra-large: 32px;
  --el-font-size-large: 24px;
  --el-font-size-medium: 20px;
  --el-font-size-base: 18px;
  --el-font-size-small: 16px;
  --el-font-size-extra-small: 14px;

  // 圆角
  --el-border-radius-base: 4px;
  --el-border-radius-small: 2px;
  --el-border-radius-round: 20px;
  --el-border-radius-circle: 100%;

  // 阴影
  --el-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  --el-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  --el-box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  --el-box-shadow-dark: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

## 核心组件定制

### 1. 按钮组件 (Button)

**适老化定制：**
```scss
// 按钮尺寸放大
.el-button {
  // 最小尺寸要求
  min-width: 120px;
  min-height: 48px;

  // 字体大小
  font-size: 16px;
  font-weight: 500;

  // 内边距
  padding: 12px 24px;

  // 圆角
  border-radius: 4px;

  // 过渡效果
  transition: all 0.2s ease;

  // 悬浮效果
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(46, 91, 186, 0.2);
  }

  // 按下效果
  &:active {
    transform: translateY(0);
  }
}

// 大尺寸按钮（主要操作）
.el-button--large {
  min-width: 140px;
  min-height: 52px;
  font-size: 18px;
  padding: 14px 28px;
}

// 超大按钮（关键操作）
.el-button--extra-large {
  min-width: 160px;
  min-height: 56px;
  font-size: 20px;
  padding: 16px 32px;
}
```

### 2. 输入框组件 (Input)

**适老化定制：**
```scss
.el-input {
  // 输入框高度
  .el-input__inner {
    height: 48px;
    font-size: 16px;
    padding: 0 16px;
    border-radius: 4px;

    // 焦点状态
    &:focus {
      border-color: var(--el-color-primary);
      box-shadow: 0 0 0 2px rgba(46, 91, 186, 0.2);
    }
  }

  // 输入框标签
  .el-input__label {
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    margin-bottom: 8px;
  }
}

// 密码输入框特殊样式
.medical-password-input {
  .el-input__inner {
    font-family: 'Courier New', monospace;
    letter-spacing: 2px;
  }
}
```

### 3. 卡片组件 (Card)

**医学风格定制：**
```scss
.el-card {
  border-radius: 8px;
  border: 1px solid var(--el-border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  // 悬浮效果
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .el-card__header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--el-border-color-light);

    .card-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      margin: 0;
    }
  }

  .el-card__body {
    padding: 24px;
  }
}

// 视频卡片特殊样式
.medical-video-card {
  cursor: pointer;

  .video-thumbnail {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .video-info {
    .video-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .video-duration {
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }
}
```

### 4. 对话框组件 (Dialog)

**适老化定制：**
```scss
.el-dialog {
  border-radius: 8px;

  .el-dialog__header {
    padding: 24px 24px 16px;

    .el-dialog__title {
      font-size: 24px;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    .el-dialog__headerbtn {
      width: 48px;
      height: 48px;

      .el-dialog__close {
        font-size: 20px;
      }
    }
  }

  .el-dialog__body {
    padding: 16px 24px 24px;
    font-size: 16px;
    line-height: 1.6;
  }

  .el-dialog__footer {
    padding: 16px 24px 24px;
    text-align: right;

    .el-button {
      margin-left: 16px;
    }
  }
}

// 确认对话框样式
.medical-confirm-dialog {
  .dialog-icon {
    font-size: 48px;
    color: var(--el-color-warning);
    margin-bottom: 16px;
    text-align: center;
  }

  .dialog-message {
    font-size: 18px;
    text-align: center;
    margin-bottom: 24px;
  }
}
```

### 5. 消息提示组件 (Message)

**适老化定制：**
```scss
.el-message {
  min-width: 380px;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 6px;

  .el-message__icon {
    font-size: 20px;
    margin-right: 12px;
  }

  .el-message__content {
    line-height: 1.5;
  }

  // 成功消息
  &.el-message--success {
    background-color: #F0F9FF;
    border: 1px solid #10B981;
    color: #065F46;
  }

  // 错误消息
  &.el-message--error {
    background-color: #FEF2F2;
    border: 1px solid #EF4444;
    color: #991B1B;
  }

  // 警告消息
  &.el-message--warning {
    background-color: #FFFBEB;
    border: 1px solid #F59E0B;
    color: #92400E;
  }
}
```

### 6. 加载组件 (Loading)

**医学风格定制：**
```scss
.el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);

  .el-loading-spinner {
    .el-loading-text {
      font-size: 16px;
      color: var(--el-text-color-primary);
      margin-top: 16px;
    }

    .circular {
      width: 48px;
      height: 48px;

      .path {
        stroke: var(--el-color-primary);
        stroke-width: 3;
      }
    }
  }
}

// 自定义医学主题加载动画
.medical-loading {
  .loading-icon {
    width: 48px;
    height: 48px;
    border: 3px solid #E5E7EB;
    border-top: 3px solid var(--el-color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
```

## 自定义组件

### 1. 视频播放器组件 (VideoPlayer)

```vue
<template>
  <div class="medical-video-player">
    <!-- 视频容器 -->
    <div class="video-container" ref="videoContainer">
      <video
        ref="videoElement"
        class="video-element"
        :src="videoSrc"
        @loadedmetadata="onVideoLoaded"
        @timeupdate="onTimeUpdate"
        @ended="onVideoEnded"
      ></video>

      <!-- 播放控制栏 -->
      <div class="video-controls" v-show="showControls">
        <!-- 进度条 -->
        <div class="progress-container">
          <el-slider
            v-model="currentTime"
            :max="duration"
            :format-tooltip="formatTime"
            @change="seekTo"
            class="video-progress"
          />
        </div>

        <!-- 控制按钮 -->
        <div class="control-buttons">
          <!-- 播放/暂停 -->
          <el-button
            :icon="isPlaying ? VideoPause : VideoPlay"
            size="large"
            type="primary"
            circle
            @click="togglePlay"
            class="play-btn"
          />

          <!-- 音量控制 -->
          <div class="volume-control">
            <el-button
              :icon="isMuted ? Mute : Unmute"
              size="large"
              circle
              @click="toggleMute"
            />
            <el-slider
              v-model="volume"
              :max="100"
              @change="setVolume"
              class="volume-slider"
            />
          </div>

          <!-- 倍速控制 -->
          <el-select
            v-model="playbackRate"
            @change="setPlaybackRate"
            size="large"
            class="speed-select"
          >
            <el-option label="0.5x" :value="0.5" />
            <el-option label="1.0x" :value="1.0" />
            <el-option label="1.25x" :value="1.25" />
            <el-option label="1.5x" :value="1.5" />
            <el-option label="2.0x" :value="2.0" />
          </el-select>

          <!-- 全屏按钮 -->
          <el-button
            :icon="Fullscreen"
            size="large"
            circle
            @click="toggleFullscreen"
            class="fullscreen-btn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.medical-video-player {
  width: 100%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20px;
  color: white;
}

.progress-container {
  margin-bottom: 16px;
}

.video-progress {
  --el-slider-runway-bg-color: rgba(255, 255, 255, 0.3);
  --el-slider-main-bg-color: var(--el-color-primary);
  --el-slider-button-size: 16px;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.play-btn {
  width: 56px;
  height: 56px;
  font-size: 24px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.volume-slider {
  width: 100px;
}

.speed-select {
  width: 80px;
}

.fullscreen-btn {
  margin-left: auto;
}
</style>
```

### 2. 密码输入组件 (PasswordInput)

```vue
<template>
  <div class="medical-password-input">
    <div class="password-header">
      <el-icon class="lock-icon"><Lock /></el-icon>
      <h3 class="password-title">请输入访问密码</h3>
    </div>

    <el-form @submit.prevent="handleSubmit">
      <el-form-item>
        <el-input
          v-model="password"
          type="password"
          size="large"
          placeholder="请输入密码"
          show-password
          clearable
          :disabled="loading"
          @keyup.enter="handleSubmit"
          class="password-field"
        >
          <template #prefix>
            <el-icon><Key /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="large"
          :loading="loading"
          @click="handleSubmit"
          class="submit-btn"
        >
          {{ loading ? '验证中...' : '确认' }}
        </el-button>
      </el-form-item>

      <div v-if="errorMessage" class="error-message">
        <el-icon><WarningFilled /></el-icon>
        {{ errorMessage }}
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.medical-password-input {
  max-width: 400px;
  margin: 0 auto;
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.password-header {
  text-align: center;
  margin-bottom: 32px;
}

.lock-icon {
  font-size: 48px;
  color: var(--el-color-primary);
  margin-bottom: 16px;
}

.password-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0;
}

.password-field {
  margin-bottom: 24px;
}

.submit-btn {
  width: 100%;
  height: 52px;
  font-size: 18px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--el-color-error);
  font-size: 14px;
  margin-top: 16px;
  padding: 12px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 4px;
}
</style>
```

### 3. 视频列表组件 (VideoList)

```vue
<template>
  <div class="medical-video-list">
    <div class="list-header">
      <h2 class="list-title">医学技术视频</h2>
      <div class="list-stats">
        共 {{ videoList.length }} 个视频
      </div>
    </div>

    <div class="video-grid">
      <el-card
        v-for="video in videoList"
        :key="video.id"
        class="video-card"
        @click="selectVideo(video)"
      >
        <div class="video-thumbnail-container">
          <img
            :src="video.thumbnail"
            :alt="video.title"
            class="video-thumbnail"
          />
          <div class="video-duration">{{ formatDuration(video.duration) }}</div>
        </div>

        <div class="video-info">
          <h3 class="video-title">{{ video.title }}</h3>
          <p class="video-description">{{ video.description }}</p>
          <div class="video-meta">
            <span class="video-category">{{ video.category }}</span>
            <span class="video-size">{{ formatFileSize(video.fileSize) }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.medical-video-list {
  padding: 24px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--el-border-color-light);
}

.list-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0;
}

.list-stats {
  font-size: 16px;
  color: var(--el-text-color-secondary);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.video-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.video-card:hover {
  border-color: var(--el-color-primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(46, 91, 186, 0.15);
}

.video-thumbnail-container {
  position: relative;
  margin-bottom: 16px;
}

.video-thumbnail {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.video-info {
  padding: 4px 0;
}

.video-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-description {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--el-text-color-placeholder);
}

.video-category {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  padding: 2px 8px;
  border-radius: 12px;
}
</style>
```

## 组件测试规范

### 1. 可访问性测试

- 键盘导航测试
- 屏幕阅读器兼容性
- 颜色对比度检查
- 焦点管理验证

### 2. 适老化测试

- 大字体显示效果
- 大按钮点击体验
- 高对比度模式
- 简化交互流程

### 3. 兼容性测试

- Windows 7/10/11 系统
- 不同分辨率屏幕
- 不同浏览器内核
- 触摸屏设备
