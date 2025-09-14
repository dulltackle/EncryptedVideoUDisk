<template>
  <div id="app" class="app-container">
    <!-- 应用头部 -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="app-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" fill="#2E5BBA" />
              <path d="M8 12h16v8H8z" fill="white" opacity="0.9" />
              <circle cx="16" cy="16" r="3" fill="#2E5BBA" />
            </svg>
          </div>
          <h1 class="app-title">加密视频U盘播放器</h1>
        </div>

        <!-- 窗口控制按钮 -->
        <div class="window-controls">
          <button class="control-btn minimize-btn" @click="minimizeWindow" :title="'最小化'">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>

          <button
            class="control-btn maximize-btn"
            @click="toggleMaximizeWindow"
            :title="isMaximized ? '还原' : '最大化'"
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="3" y="3" width="10" height="10" stroke="currentColor" stroke-width="2" fill="none" rx="1" />
            </svg>
          </button>

          <button class="control-btn close-btn" @click="closeWindow" :title="'关闭'">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="app-main">
      <!-- 路由出口 -->
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- 全局加载遮罩 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">{{ loadingText }}</p>
      </div>
    </div>

    <!-- 全局错误提示 -->
    <transition name="slide-up">
      <div v-if="globalError" class="error-toast">
        <div class="error-content">
          <svg class="error-icon" width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="9" fill="#EF4444" />
            <path d="M10 6v4M10 14h.01" stroke="white" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span class="error-message">{{ globalError }}</span>
          <button class="error-close" @click="clearGlobalError">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
// import { useAppStore } from '@/stores/app'; // 暂时注释，待创建stores
import { ElMessage } from 'element-plus';

// 状态管理 - 暂时注释，待创建stores
// const appStore = useAppStore();

// 响应式数据
const isMaximized = ref(false);
const isLoading = ref(false);
const loadingText = ref('加载中...');
const globalError = ref('');

// 窗口控制方法
const minimizeWindow = async (): Promise<void> => {
  try {
    // TODO: 待T7 IPC通信协议完成后启用
    // if (window.electronAPI) {
    //   await window.electronAPI.invoke('window-minimize');
    // }
    console.log('最小化窗口');
  } catch (error) {
    console.error('窗口最小化失败:', error);
    showError('窗口操作失败');
  }
};

const toggleMaximizeWindow = async (): Promise<void> => {
  try {
    // TODO: 待T7 IPC通信协议完成后启用
    // if (window.electronAPI) {
    //   await window.electronAPI.invoke('window-maximize');
    //   isMaximized.value = !isMaximized.value;
    // }
    isMaximized.value = !isMaximized.value;
    console.log('切换窗口最大化状态:', isMaximized.value);
  } catch (error) {
    console.error('窗口最大化失败:', error);
    showError('窗口操作失败');
  }
};

const closeWindow = async (): Promise<void> => {
  try {
    // TODO: 待T7 IPC通信协议完成后启用
    // if (window.electronAPI) {
    //   await window.electronAPI.invoke('window-close');
    // }
    console.log('关闭窗口');
  } catch (error) {
    console.error('窗口关闭失败:', error);
    showError('窗口操作失败');
  }
};

// 错误处理
const showError = (message: string): void => {
  globalError.value = message;
  // 3秒后自动清除错误
  setTimeout(() => {
    globalError.value = '';
  }, 3000);
};

const clearGlobalError = (): void => {
  globalError.value = '';
};

// 加载状态控制
const showLoading = (text = '加载中...'): void => {
  loadingText.value = text;
  isLoading.value = true;
};

const hideLoading = (): void => {
  isLoading.value = false;
};

// 全局错误处理
const handleGlobalError = (error: Error): void => {
  console.error('全局错误:', error);
  showError(error.message || '发生未知错误');
};

// 生命周期
onMounted(() => {
  // 监听全局错误
  window.addEventListener('error', event => {
    handleGlobalError(event.error);
  });

  window.addEventListener('unhandledrejection', event => {
    handleGlobalError(new Error(event.reason));
  });

  // 初始化应用状态 - 暂时注释，待创建stores
  // appStore.initialize();

  console.log('Vue应用已挂载');
});

onUnmounted(() => {
  console.log('Vue应用即将卸载');
});

// 暴露方法给全局使用
defineExpose({
  showLoading,
  hideLoading,
  showError,
  clearGlobalError,
});
</script>

<style scoped>
/* 应用容器 */
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary, #f9fafb);
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Segoe UI', sans-serif;
  overflow: hidden;
}

/* 应用头部 */
.app-header {
  height: 64px;
  background-color: var(--bg-primary, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  -webkit-app-region: drag; /* 允许拖拽窗口 */
  z-index: 1000;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary, #1f2937);
  margin: 0;
}

/* 窗口控制按钮 */
.window-controls {
  display: flex;
  gap: 8px;
  -webkit-app-region: no-drag; /* 按钮区域不允许拖拽 */
}

.control-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: var(--text-secondary, #6b7280);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background-color: var(--bg-secondary, #f3f4f6);
  color: var(--text-primary, #1f2937);
}

.close-btn:hover {
  background-color: #ef4444;
  color: white;
}

/* 主要内容区域 */
.app-main {
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 加载遮罩 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color, #e5e7eb);
  border-top: 4px solid var(--primary-color, #2e5bba);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 16px;
  color: var(--text-secondary, #6b7280);
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 错误提示 */
.error-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  max-width: 400px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9998;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.error-icon {
  flex-shrink: 0;
}

.error-message {
  flex: 1;
  font-size: 14px;
  color: #991b1b;
  line-height: 1.5;
}

.error-close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: #991b1b;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.error-close:hover {
  background-color: rgba(153, 27, 27, 0.1);
}

/* 滑入动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }

  .app-title {
    font-size: 18px;
  }

  .error-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }
}
</style>
