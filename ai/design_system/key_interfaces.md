# 加密视频U盘项目 - 关键界面布局设计

## 界面设计概述

### 设计原则

1. **适老化优先**：大字体、大按钮、高对比度
2. **操作极简**：减少步骤，避免复杂交互
3. **医学专业**：体现医学培训的专业性
4. **安全可信**：传达安全、可靠的视觉感受
5. **一致性**：保持界面元素和交互的一致性

### 整体布局框架

```
┌─────────────────────────────────────────────────────────────┐
│                        应用标题栏                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                        主内容区域                           │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                        状态栏/操作栏                        │
└─────────────────────────────────────────────────────────────┘
```

## 1. 启动界面 (Splash Screen)

### 设计目标
- 展示应用品牌和加载状态
- 给用户专业、安全的第一印象
- 提供清晰的加载反馈

### 布局结构

```vue
<template>
  <div class="splash-screen">
    <!-- 背景 -->
    <div class="splash-background">
      <!-- 医学主题背景图案 -->
      <div class="medical-pattern"></div>
    </div>
    
    <!-- 主内容 -->
    <div class="splash-content">
      <!-- Logo区域 -->
      <div class="logo-section">
        <div class="app-logo">
          <svg class="logo-icon" viewBox="0 0 64 64">
            <!-- 医学十字 + 视频播放图标 -->
            <path d="M32 8 L32 56 M8 32 L56 32" stroke="#2E5BBA" stroke-width="4"/>
            <circle cx="32" cy="32" r="20" fill="none" stroke="#2E5BBA" stroke-width="2"/>
            <polygon points="28,24 28,40 40,32" fill="#2E5BBA"/>
          </svg>
        </div>
        <h1 class="app-title">医学技术培训系统</h1>
        <p class="app-subtitle">Medical Training Video System</p>
      </div>
      
      <!-- 加载区域 -->
      <div class="loading-section">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
        </div>
        <p class="loading-text">{{ loadingText }}</p>
        <div class="loading-progress">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      
      <!-- 版本信息 -->
      <div class="version-info">
        <p>版本 {{ version }} | 安全加密</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.splash-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
}

.medical-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, #2E5BBA 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, #2E5BBA 2px, transparent 2px);
  background-size: 60px 60px;
}

.splash-content {
  text-align: center;
  max-width: 480px;
  padding: 48px;
}

.logo-section {
  margin-bottom: 48px;
}

.app-logo {
  margin-bottom: 24px;
}

.logo-icon {
  width: 96px;
  height: 96px;
  filter: drop-shadow(0 4px 8px rgba(46, 91, 186, 0.2));
}

.app-title {
  font-size: 32px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
}

.app-subtitle {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}

.loading-section {
  margin-bottom: 32px;
}

.loading-spinner {
  margin-bottom: 16px;
}

.spinner-ring {
  width: 48px;
  height: 48px;
  border: 4px solid #E5E7EB;
  border-top: 4px solid #2E5BBA;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 16px;
  color: #374151;
  margin: 0 0 16px 0;
}

.loading-progress {
  width: 240px;
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  margin: 0 auto;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #2E5BBA, #5B7BC7);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.version-info {
  font-size: 12px;
  color: #9CA3AF;
}
</style>
```

## 2. 密码验证界面 (Authentication)

### 设计目标
- 简单直观的密码输入
- 清晰的错误提示
- 安全感的视觉设计

### 布局结构

```vue
<template>
  <div class="auth-screen">
    <!-- 背景装饰 -->
    <div class="auth-background">
      <div class="security-pattern"></div>
    </div>
    
    <!-- 主内容 -->
    <div class="auth-container">
      <!-- 头部区域 -->
      <div class="auth-header">
        <div class="security-icon">
          <svg viewBox="0 0 64 64" class="shield-icon">
            <path d="M32 8 L48 16 L48 32 C48 44 32 56 32 56 C32 56 16 44 16 32 L16 16 Z" 
                  fill="none" stroke="#2E5BBA" stroke-width="3"/>
            <path d="M24 28 L30 34 L40 24" stroke="#10B981" stroke-width="3" 
                  fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="auth-title">安全验证</h1>
        <p class="auth-description">请输入访问密码以继续使用</p>
      </div>
      
      <!-- 密码输入区域 -->
      <div class="auth-form">
        <el-form @submit.prevent="handleLogin">
          <!-- 密码输入框 -->
          <el-form-item class="password-item">
            <label class="password-label">访问密码</label>
            <el-input
              v-model="password"
              type="password"
              size="large"
              placeholder="请输入密码"
              show-password
              clearable
              :disabled="loading"
              @keyup.enter="handleLogin"
              class="password-input"
            >
              <template #prefix>
                <el-icon class="input-icon"><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          
          <!-- 错误提示 -->
          <div v-if="errorMessage" class="error-alert">
            <el-icon class="error-icon"><WarningFilled /></el-icon>
            <span class="error-text">{{ errorMessage }}</span>
          </div>
          
          <!-- 提交按钮 -->
          <el-form-item class="submit-item">
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              @click="handleLogin"
              class="submit-button"
            >
              <template #loading>
                <el-icon class="is-loading"><Loading /></el-icon>
              </template>
              {{ loading ? '验证中...' : '确认访问' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 底部提示 -->
      <div class="auth-footer">
        <div class="security-tips">
          <el-icon class="tip-icon"><InfoFilled /></el-icon>
          <span>密码由培训机构提供，请妥善保管</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-screen {
  min-height: 100vh;
  background: linear-gradient(135deg, #F0F4F8 0%, #E2E8F0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
}

.security-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(45deg, #2E5BBA 25%, transparent 25%),
    linear-gradient(-45deg, #2E5BBA 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #2E5BBA 75%),
    linear-gradient(-45deg, transparent 75%, #2E5BBA 75%);
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
}

.auth-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 48px;
  width: 100%;
  max-width: 480px;
  position: relative;
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
}

.security-icon {
  margin-bottom: 24px;
}

.shield-icon {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(46, 91, 186, 0.2));
}

.auth-title {
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
}

.auth-description {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
}

.auth-form {
  margin-bottom: 32px;
}

.password-item {
  margin-bottom: 24px;
}

.password-label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.password-input {
  --el-input-height: 52px;
  --el-input-font-size: 16px;
}

.input-icon {
  color: #6B7280;
  font-size: 18px;
}

.error-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 6px;
  margin-bottom: 24px;
}

.error-icon {
  color: #EF4444;
  font-size: 18px;
  flex-shrink: 0;
}

.error-text {
  color: #991B1B;
  font-size: 14px;
}

.submit-item {
  margin-bottom: 0;
}

.submit-button {
  width: 100%;
  height: 52px;
  font-size: 18px;
  font-weight: 500;
}

.auth-footer {
  text-align: center;
}

.security-tips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7280;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
}

.tip-icon {
  color: #2E5BBA;
  font-size: 16px;
}
</style>
```

## 3. 视频列表界面 (Video Library)

### 设计目标
- 清晰展示视频信息
- 易于浏览和选择
- 提供必要的筛选功能

### 布局结构

```vue
<template>
  <div class="video-library">
    <!-- 头部导航 -->
    <header class="library-header">
      <div class="header-content">
        <!-- 标题区域 -->
        <div class="title-section">
          <h1 class="page-title">
            <el-icon class="title-icon"><VideoPlay /></el-icon>
            医学技术视频库
          </h1>
          <p class="page-subtitle">共 {{ totalVideos }} 个培训视频</p>
        </div>
        
        <!-- 操作区域 -->
        <div class="action-section">
          <!-- 搜索框 -->
          <el-input
            v-model="searchKeyword"
            placeholder="搜索视频标题或关键词"
            size="large"
            clearable
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          
          <!-- 分类筛选 -->
          <el-select
            v-model="selectedCategory"
            placeholder="选择分类"
            size="large"
            clearable
            class="category-select"
          >
            <el-option label="全部分类" value="" />
            <el-option label="外科技术" value="surgery" />
            <el-option label="内科诊断" value="internal" />
            <el-option label="影像学" value="imaging" />
            <el-option label="检验技术" value="laboratory" />
          </el-select>
        </div>
      </div>
    </header>
    
    <!-- 主内容区域 -->
    <main class="library-content">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="6" animated class="video-skeleton" />
      </div>
      
      <!-- 视频网格 -->
      <div v-else-if="filteredVideos.length > 0" class="video-grid">
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          class="video-card"
          @click="selectVideo(video)"
          @keyup.enter="selectVideo(video)"
          tabindex="0"
        >
          <!-- 视频缩略图 -->
          <div class="video-thumbnail-container">
            <img
              :src="video.thumbnail || defaultThumbnail"
              :alt="video.title"
              class="video-thumbnail"
              @error="handleImageError"
            />
            <div class="video-overlay">
              <el-icon class="play-icon"><VideoPlay /></el-icon>
            </div>
            <div class="video-duration">{{ formatDuration(video.duration) }}</div>
            <div class="video-quality">{{ video.quality || 'HD' }}</div>
          </div>
          
          <!-- 视频信息 -->
          <div class="video-info">
            <h3 class="video-title" :title="video.title">{{ video.title }}</h3>
            <p class="video-description" :title="video.description">
              {{ video.description }}
            </p>
            
            <!-- 视频元数据 -->
            <div class="video-meta">
              <div class="meta-row">
                <span class="meta-item category">
                  <el-icon><Folder /></el-icon>
                  {{ getCategoryName(video.category) }}
                </span>
                <span class="meta-item size">
                  <el-icon><Document /></el-icon>
                  {{ formatFileSize(video.fileSize) }}
                </span>
              </div>
              <div class="meta-row">
                <span class="meta-item date">
                  <el-icon><Calendar /></el-icon>
                  {{ formatDate(video.createdAt) }}
                </span>
                <span class="meta-item status" :class="video.status">
                  <el-icon><CircleCheck v-if="video.status === 'completed'" />
                           <Loading v-else-if="video.status === 'loading'" />
                           <Warning v-else /></el-icon>
                  {{ getStatusText(video.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <el-icon><VideoCamera /></el-icon>
        </div>
        <h3 class="empty-title">{{ searchKeyword ? '未找到相关视频' : '暂无视频' }}</h3>
        <p class="empty-description">
          {{ searchKeyword ? '请尝试其他关键词或清除筛选条件' : '请联系管理员添加培训视频' }}
        </p>
        <el-button v-if="searchKeyword" @click="clearSearch" size="large">
          清除搜索
        </el-button>
      </div>
    </main>
    
    <!-- 底部状态栏 -->
    <footer class="library-footer">
      <div class="footer-content">
        <div class="status-info">
          <span class="status-item">
            <el-icon class="status-icon success"><CircleCheck /></el-icon>
            已加载 {{ loadedVideos }} 个视频
          </span>
          <span class="status-item">
            <el-icon class="status-icon secure"><Lock /></el-icon>
            安全加密传输
          </span>
        </div>
        
        <div class="action-buttons">
          <el-button size="large" @click="refreshList">
            <el-icon><Refresh /></el-icon>
            刷新列表
          </el-button>
          <el-button type="danger" size="large" @click="exitApp">
            <el-icon><SwitchButton /></el-icon>
            退出程序
          </el-button>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.video-library {
  min-height: 100vh;
  background: #F9FAFB;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.library-header {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 24px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
}

.title-section {
  flex: 1;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
}

.title-icon {
  color: #2E5BBA;
  font-size: 32px;
}

.page-subtitle {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}

.action-section {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.search-input {
  width: 280px;
}

.category-select {
  width: 160px;
}

/* 主内容样式 */
.library-content {
  flex: 1;
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.loading-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.video-skeleton {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #2E5BBA;
}

.video-card:focus {
  outline: none;
  border-color: #2E5BBA;
  box-shadow: 0 0 0 3px rgba(46, 91, 186, 0.2);
}

.video-thumbnail-container {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-card:hover .video-thumbnail {
  transform: scale(1.05);
}

.video-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .video-overlay {
  opacity: 1;
}

.play-icon {
  color: white;
  font-size: 24px;
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
  font-weight: 500;
}

.video-quality {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #2E5BBA;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.video-info {
  padding: 20px;
}

.video-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-description {
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #9CA3AF;
}

.meta-item.category {
  color: #2E5BBA;
  background: #EEF2FF;
  padding: 2px 8px;
  border-radius: 12px;
}

.meta-item.status.completed {
  color: #10B981;
}

.meta-item.status.loading {
  color: #F59E0B;
}

.meta-item.status.error {
  color: #EF4444;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  color: #D1D5DB;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.empty-description {
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
}

/* 底部样式 */
.library-footer {
  background: white;
  border-top: 1px solid #E5E7EB;
  padding: 20px 32px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.status-info {
  display: flex;
  gap: 24px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6B7280;
}

.status-icon {
  font-size: 16px;
}

.status-icon.success {
  color: #10B981;
}

.status-icon.secure {
  color: #2E5BBA;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .action-section {
    width: 100%;
    flex-direction: column;
  }
  
  .search-input,
  .category-select {
    width: 100%;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .status-info {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
```

## 4. 视频播放界面 (Video Player)

### 设计目标
- 沉浸式播放体验
- 简洁易用的控制界面
- 适老化的操作设计

### 布局结构

```vue
<template>
  <div class="video-player-screen">
    <!-- 播放器容器 -->
    <div class="player-container" :class="{ fullscreen: isFullscreen }">
      <!-- 视频区域 -->
      <div class="video-area" @click="togglePlayPause" @dblclick="toggleFullscreen">
        <video
          ref="videoElement"
          class="video-element"
          :src="currentVideo.src"
          @loadedmetadata="onVideoLoaded"
          @timeupdate="onTimeUpdate"
          @ended="onVideoEnded"
          @error="onVideoError"
        ></video>
        
        <!-- 加载遮罩 -->
        <div v-if="loading" class="loading-overlay">
          <div class="loading-spinner">
            <div class="spinner-ring"></div>
          </div>
          <p class="loading-text">{{ loadingText }}</p>
        </div>
        
        <!-- 播放状态指示器 -->
        <div v-if="showPlayIndicator" class="play-indicator" :class="{ playing: isPlaying }">
          <el-icon class="indicator-icon">
            <VideoPlay v-if="!isPlaying" />
            <VideoPause v-else />
          </el-icon>
        </div>
        
        <!-- 错误提示 -->
        <div v-if="error" class="error-overlay">
          <div class="error-content">
            <el-icon class="error-icon"><WarningFilled /></el-icon>
            <h3 class="error-title">播放出错</h3>
            <p class="error-message">{{ error }}</p>
            <el-button type="primary" size="large" @click="retryPlay">
              重试播放
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- 控制栏 -->
      <div class="control-bar" :class="{ visible: showControls }">
        <!-- 进度条区域 -->
        <div class="progress-area">
          <div class="progress-info">
            <span class="time-current">{{ formatTime(currentTime) }}</span>
            <span class="time-separator">/</span>
            <span class="time-total">{{ formatTime(duration) }}</span>
          </div>
          <el-slider
            v-model="currentTime"
            :max="duration"
            :format-tooltip="formatTime"
            @change="seekTo"
            @input="onSeeking"
            class="progress-slider"
          />
        </div>
        
        <!-- 控制按钮区域 -->
        <div class="control-buttons">
          <!-- 左侧按钮组 -->
          <div class="button-group left">
            <!-- 播放/暂停 -->
            <el-button
              :icon="isPlaying ? VideoPause : VideoPlay"
              size="large"
              type="primary"
              circle
              @click="togglePlayPause"
              class="play-button"
            />
            
            <!-- 音量控制 -->
            <div class="volume-control">
              <el-button
                :icon="isMuted || volume === 0 ? Mute : Unmute"
                size="large"
                circle
                @click="toggleMute"
                class="volume-button"
              />
              <div class="volume-slider-container">
                <el-slider
                  v-model="volume"
                  :max="100"
                  @change="setVolume"
                  class="volume-slider"
                  vertical
                  height="80px"
                />
              </div>
            </div>
          </div>
          
          <!-- 中间信息 -->
          <div class="video-info-center">
            <h3 class="video-title-display">{{ currentVideo.title }}</h3>
            <div class="video-stats">
              <span class="stat-item">
                <el-icon><Timer /></el-icon>
                {{ formatDuration(currentVideo.duration) }}
              </span>
              <span class="stat-item">
                <el-icon><Monitor /></el-icon>
                {{ currentVideo.quality || 'HD' }}
              </span>
            </div>
          </div>
          
          <!-- 右侧按钮组 -->
          <div class="button-group right">
            <!-- 倍速控制 -->
            <el-select
              v-model="playbackRate"
              @change="setPlaybackRate"
              size="large"
              class="speed-select"
            >
              <el-option label="0.5x" :value="0.5" />
              <el-option label="0.75x" :value="0.75" />
              <el-option label="1.0x" :value="1.0" />
              <el-option label="1.25x" :value="1.25" />
              <el-option label="1.5x" :value="1.5" />
              <el-option label="2.0x" :value="2.0" />
            </el-select>
            
            <!-- 全屏按钮 -->
            <el-button
              :icon="isFullscreen ? OffScreen : FullScreen"
              size="large"
              circle
              @click="toggleFullscreen"
              class="fullscreen-button"
            />
            
            <!-- 返回按钮 -->
            <el-button
              icon="Back"
              size="large"
              @click="goBack"
              class="back-button"
            >
              返回列表
            </el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 侧边信息面板（非全屏时显示） -->
    <div v-if="!isFullscreen" class="info-panel">
      <!-- 视频信息 -->
      <div class="video-details">
        <h2 class="details-title">视频信息</h2>
        <div class="detail-item">
          <label>标题：</label>
          <span>{{ currentVideo.title }}</span>
        </div>
        <div class="detail-item">
          <label>描述：</label>
          <p>{{ currentVideo.description }}</p>
        </div>
        <div class="detail-item">
          <label>分类：</label>
          <span class="category-tag">{{ getCategoryName(currentVideo.category) }}</span>
        </div>
        <div class="detail-item">
          <label>时长：</label>
          <span>{{ formatDuration(currentVideo.duration) }}</span>
        </div>
        <div class="detail-item">
          <label>文件大小：</label>
          <span>{{ formatFileSize(currentVideo.fileSize) }}</span>
        </div>
      </div>
      
      <!-- 相关视频 -->
      <div class="related-videos" v-if="relatedVideos.length > 0">
        <h3 class="related-title">相关视频</h3>
        <div class="related-list">
          <div
            v-for="video in relatedVideos"
            :key="video.id"
            class="related-item"
            @click="switchVideo(video)"
          >
            <img :src="video.thumbnail" :alt="video.title" class="related-thumbnail" />
            <div class="related-info">
              <h4 class="related-video-title">{{ video.title }}</h4>
              <span class="related-duration">{{ formatDuration(video.duration) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-player-screen {
  min-height: 100vh;
  background: #000;
  display: flex;
  color: white;
}

.player-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.player-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.video-area {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  margin-bottom: 20px;
}

.spinner-ring {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #2E5BBA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 18px;
  color: white;
  margin: 0;
}

.play-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.play-indicator.playing {
  opacity: 1;
  animation: fadeOut 0.5s ease 0.5s forwards;
}

@keyframes fadeOut {
  to { opacity: 0; }
}

.indicator-icon {
  font-size: 32px;
  color: white;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.error-content {
  text-align: center;
  max-width: 400px;
  padding: 40px;
}

.error-icon {
  font-size: 64px;
  color: #EF4444;
  margin-bottom: 20px;
}

.error-title {
  font-size: 24px;
  color: white;
  margin: 0 0 12px 0;
}

.error-message {
  font-size: 16px;
  color: #D1D5DB;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.control-bar {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.control-bar.visible {
  opacity: 1;
}

.progress-area {
  margin-bottom: 16px;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #D1D5DB;
}

.progress-slider {
  --el-slider-runway-bg-color: rgba(255, 255, 255, 0.3);
  --el-slider-main-bg-color: #2E5BBA;
  --el-slider-button-size: 16px;
}

.control-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-button {
  width: 56px;
  height: 56px;
  font-size: 24px;
}

.volume-control {
  position: relative;
}

.volume-slider-container {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 12px;
  border-radius: 6px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.volume-control:hover .volume-slider-container {
  opacity: 1;
  visibility: visible;
}

.video-info-center {
  text-align: center;
  flex: 1;
  margin: 0 24px;
}

.video-title-display {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0 0 8px 0;
}

.video-stats {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #D1D5DB;
}

.speed-select {
  width: 80px;
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 信息面板样式 */
.info-panel {
  width: 360px;
  background: #1F2937;
  padding: 24px;
  overflow-y: auto;
}

.video-details {
  margin-bottom: 32px;
}

.details-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #374151;
}

.detail-item {
  margin-bottom: 16px;
}

.detail-item label {
  display: block;
  font-size: 14px;
  color: #9CA3AF;
  margin-bottom: 4px;
}

.detail-item span,
.detail-item p {
  font-size: 16px;
  color: white;
  margin: 0;
  line-height: 1.5;
}

.category-tag {
  background: #2E5BBA;
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.related-videos {
  border-top: 1px solid #374151;
  padding-top: 24px;
}

.related-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 16px 0;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.related-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.related-item:hover {
  background: #374151;
}

.related-thumbnail {
  width: 80px;
  height: 45px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.related-info {
  flex: 1;
  min-width: 0;
}

.related-video-title {
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin: 0 0 4px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-duration {
  font-size: 12px;
  color: #9CA3AF;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .video-player-screen {
    flex-direction: column;
  }
  
  .info-panel {
    width: 100%;
    max-height: 300px;
  }
}

@media (max-width: 768px) {
  .control-buttons {
    flex-direction: column;
    gap: 16px;
  }
  
  .video-info-center {
    margin: 0;
    order: -1;
  }
  
  .button-group {
    justify-content: center;
  }
}
</style>
```

## 5. 错误处理界面 (Error Pages)

### 设计目标
- 友好的错误提示
- 清晰的解决方案指引
- 保持品牌一致性

### 通用错误页面布局

```vue
<template>
  <div class="error-page">
    <div class="error-container">
      <!-- 错误图标 -->
      <div class="error-icon-section">
        <div class="error-icon" :class="errorType">
          <el-icon>
            <WarningFilled v-if="errorType === 'warning'" />
            <CircleCloseFilled v-else-if="errorType === 'error'" />
            <QuestionFilled v-else-if="errorType === 'not-found'" />
            <Lock v-else-if="errorType === 'access-denied'" />
            <Connection v-else />
          </el-icon>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <div class="error-content">
        <h1 class="error-title">{{ errorTitle }}</h1>
        <p class="error-message">{{ errorMessage }}</p>
        
        <!-- 解决方案 -->
        <div v-if="solutions.length > 0" class="error-solutions">
          <h3 class="solutions-title">建议解决方案：</h3>
          <ul class="solutions-list">
            <li v-for="(solution, index) in solutions" :key="index" class="solution-item">
              {{ solution }}
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="error-actions">
        <el-button
          v-if="showRetry"
          type="primary"
          size="large"
          @click="handleRetry"
          class="action-button"
        >
          <el-icon><Refresh /></el-icon>
          重试
        </el-button>
        
        <el-button
          v-if="showGoBack"
          size="large"
          @click="handleGoBack"
          class="action-button"
        >
          <el-icon><Back /></el-icon>
          返回上一页
        </el-button>
        
        <el-button
          v-if="showGoHome"
          size="large"
          @click="handleGoHome"
          class="action-button"
        >
          <el-icon><HomeFilled /></el-icon>
          返回首页
        </el-button>
        
        <el-button
          v-if="showExit"
          type="danger"
          size="large"
          @click="handleExit"
          class="action-button"
        >
          <el-icon><SwitchButton /></el-icon>
          退出程序
        </el-button>
      </div>
      
      <!-- 技术支持信息 -->
      <div class="support-info">
        <p class="support-text">
          如果问题持续存在，请联系技术支持：
          <strong>support@medical-training.com</strong>
        </p>
        <p class="error-code">错误代码：{{ errorCode }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.error-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 48px;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-icon-section {
  margin-bottom: 32px;
}

.error-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 60px;
}

.error-icon.warning {
  background: #FEF3C7;
  color: #F59E0B;
}

.error-icon.error {
  background: #FEE2E2;
  color: #EF4444;
}

.error-icon.not-found {
  background: #E0E7FF;
  color: #6366F1;
}

.error-icon.access-denied {
  background: #FEE2E2;
  color: #DC2626;
}

.error-content {
  margin-bottom: 40px;
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
}

.error-message {
  font-size: 18px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
}

.error-solutions {
  text-align: left;
  background: #F9FAFB;
  padding: 24px;
  border-radius: 8px;
  border-left: 4px solid #2E5BBA;
}

.solutions-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.solutions-list {
  margin: 0;
  padding-left: 20px;
}

.solution-item {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.action-button {
  min-width: 120px;
}

.support-info {
  border-top: 1px solid #E5E7EB;
  padding-top: 24px;
}

.support-text {
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 8px 0;
}

.error-code {
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Courier New', monospace;
  margin: 0;
}

@media (max-width: 768px) {
  .error-container {
    padding: 32px 24px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-message {
    font-size: 16px;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    max-width: 280px;
  }
}
</style>
```

## 界面设计总结

### 设计一致性要点

1. **色彩系统**：统一使用医学蓝 (#2E5BBA) 作为主色调
2. **字体规范**：大字体设计，最小16px，标题使用24px+
3. **间距系统**：基于8px网格，适老化调整为更大间距
4. **交互反馈**：明确的悬浮、点击、加载状态
5. **错误处理**：友好的错误提示和解决方案

### 适老化设计特点

1. **视觉优化**：高对比度、大字体、大按钮
2. **操作简化**：减少步骤、避免复杂手势
3. **反馈明确**：清晰的状态提示和操作结果
4. **容错性强**：提供撤销、重试等容错机制

### 技术实现要点

1. **响应式设计**：适配不同屏幕尺寸
2. **键盘导航**：支持Tab键导航和快捷键
3. **无障碍支持**：语义化标签、屏幕阅读器兼容
4. **性能优化**：懒加载、图片优化、动画性能

这套界面设计将为加密视频U盘项目提供专业、易用、安全的用户体验，特别适合年龄较大的医生学员使用。