/**
 * 应用主状态管理
 * 使用 Pinia 管理全局应用状态
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * 应用状态接口定义
 */
export interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  loadingText: string;
  theme: 'light' | 'dark';
  language: 'zh-CN' | 'en-US';
  windowState: {
    isMaximized: boolean;
    isMinimized: boolean;
    isFullscreen: boolean;
  };
  systemInfo: {
    platform: string;
    version: string;
    electronVersion: string;
    nodeVersion: string;
  };
}

/**
 * 应用主状态管理 Store
 */
export const useAppStore = defineStore('app', () => {
  // 状态定义
  const isInitialized = ref(false);
  const isLoading = ref(false);
  const loadingText = ref('加载中...');
  const theme = ref<'light' | 'dark'>('light');
  const language = ref<'zh-CN' | 'en-US'>('zh-CN');

  const windowState = ref({
    isMaximized: false,
    isMinimized: false,
    isFullscreen: false,
  });

  const systemInfo = ref({
    platform: '',
    version: '',
    electronVersion: '',
    nodeVersion: '',
  });

  // 计算属性
  const isDarkTheme = computed(() => theme.value === 'dark');
  const isLightTheme = computed(() => theme.value === 'light');
  const currentLanguage = computed(() => language.value);

  // Actions

  /**
   * 初始化应用状态
   */
  const initialize = async (): Promise<void> => {
    try {
      console.log('开始初始化应用状态...');

      // 设置加载状态
      setLoading(true, '正在初始化应用...');

      // 获取系统信息
      await loadSystemInfo();

      // 加载用户配置
      await loadUserPreferences();

      // 初始化主题
      await initializeTheme();

      // 标记为已初始化
      isInitialized.value = true;

      console.log('应用状态初始化完成');
    } catch (error) {
      console.error('应用状态初始化失败:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 设置加载状态
   */
  const setLoading = (loading: boolean, text = '加载中...'): void => {
    isLoading.value = loading;
    loadingText.value = text;
  };

  /**
   * 切换主题
   */
  const toggleTheme = (): void => {
    try {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
      applyTheme(theme.value);
      saveUserPreferences();
      console.log(`主题已切换为: ${theme.value}`);
    } catch (error) {
      console.error('主题切换失败:', error);
    }
  };

  /**
   * 设置主题
   */
  const setTheme = (newTheme: 'light' | 'dark'): void => {
    try {
      theme.value = newTheme;
      applyTheme(newTheme);
      saveUserPreferences();
      console.log(`主题已设置为: ${newTheme}`);
    } catch (error) {
      console.error('主题设置失败:', error);
    }
  };

  /**
   * 设置语言
   */
  const setLanguage = (newLanguage: 'zh-CN' | 'en-US'): void => {
    try {
      language.value = newLanguage;
      saveUserPreferences();
      console.log(`语言已设置为: ${newLanguage}`);
    } catch (error) {
      console.error('语言设置失败:', error);
    }
  };

  /**
   * 更新窗口状态
   */
  const updateWindowState = (state: Partial<typeof windowState.value>): void => {
    try {
      windowState.value = { ...windowState.value, ...state };
      console.log('窗口状态已更新:', windowState.value);
    } catch (error) {
      console.error('窗口状态更新失败:', error);
    }
  };

  /**
   * 重置应用状态
   */
  const reset = (): void => {
    try {
      isInitialized.value = false;
      isLoading.value = false;
      loadingText.value = '加载中...';
      theme.value = 'light';
      language.value = 'zh-CN';
      windowState.value = {
        isMaximized: false,
        isMinimized: false,
        isFullscreen: false,
      };
      console.log('应用状态已重置');
    } catch (error) {
      console.error('应用状态重置失败:', error);
    }
  };

  // 私有方法

  /**
   * 加载系统信息
   */
  const loadSystemInfo = async (): Promise<void> => {
    try {
      // TODO: 待IPC通信完成后，从主进程获取系统信息
      // const info = await window.electronAPI.getSystemInfo();

      // 暂时使用模拟数据
      systemInfo.value = {
        platform: 'win32',
        version: '0.1.0',
        electronVersion: '22.3.27',
        nodeVersion: '18.17.0',
      };

      console.log('系统信息已加载:', systemInfo.value);
    } catch (error) {
      console.error('加载系统信息失败:', error);
      throw error;
    }
  };

  /**
   * 加载用户配置
   */
  const loadUserPreferences = async (): Promise<void> => {
    try {
      // 从本地存储加载用户配置
      const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
      const savedLanguage = localStorage.getItem('app-language') as 'zh-CN' | 'en-US' | null;

      if (savedTheme) {
        theme.value = savedTheme;
      }

      if (savedLanguage) {
        language.value = savedLanguage;
      }

      console.log('用户配置已加载:', { theme: theme.value, language: language.value });
    } catch (error) {
      console.error('加载用户配置失败:', error);
      // 不抛出错误，使用默认配置
    }
  };

  /**
   * 保存用户配置
   */
  const saveUserPreferences = (): void => {
    try {
      localStorage.setItem('app-theme', theme.value);
      localStorage.setItem('app-language', language.value);
      console.log('用户配置已保存');
    } catch (error) {
      console.error('保存用户配置失败:', error);
    }
  };

  /**
   * 初始化主题
   */
  const initializeTheme = async (): Promise<void> => {
    try {
      applyTheme(theme.value);
      console.log('主题已初始化:', theme.value);
    } catch (error) {
      console.error('主题初始化失败:', error);
      throw error;
    }
  };

  /**
   * 应用主题
   */
  const applyTheme = (themeValue: 'light' | 'dark'): void => {
    try {
      const root = document.documentElement;

      if (themeValue === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }

      // 更新CSS变量
      updateThemeVariables(themeValue);
    } catch (error) {
      console.error('应用主题失败:', error);
    }
  };

  /**
   * 更新主题CSS变量
   */
  const updateThemeVariables = (themeValue: 'light' | 'dark'): void => {
    try {
      const root = document.documentElement;

      if (themeValue === 'dark') {
        // 深色主题变量
        root.style.setProperty('--bg-primary', '#1f2937');
        root.style.setProperty('--bg-secondary', '#111827');
        root.style.setProperty('--text-primary', '#f9fafb');
        root.style.setProperty('--text-secondary', '#d1d5db');
        root.style.setProperty('--border-color', '#374151');
      } else {
        // 浅色主题变量
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f9fafb');
        root.style.setProperty('--text-primary', '#1f2937');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--border-color', '#e5e7eb');
      }
    } catch (error) {
      console.error('更新主题变量失败:', error);
    }
  };

  // 返回状态和方法
  return {
    // 状态
    isInitialized,
    isLoading,
    loadingText,
    theme,
    language,
    windowState,
    systemInfo,

    // 计算属性
    isDarkTheme,
    isLightTheme,
    currentLanguage,

    // 方法
    initialize,
    setLoading,
    toggleTheme,
    setTheme,
    setLanguage,
    updateWindowState,
    reset,
  };
});

/**
 * 应用状态管理类型导出
 */
export type AppStore = ReturnType<typeof useAppStore>;
