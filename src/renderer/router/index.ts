/**
 * Vue Router 路由配置
 * 负责应用的路由管理和导航控制
 */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import type { Router } from 'vue-router';

// 路由组件懒加载 - 暂时注释，待创建views组件后启用
// const Home = () => import('@/views/Home.vue');
// const Login = () => import('@/views/Login.vue');
// const VideoPlayer = () => import('@/views/VideoPlayer.vue');
// const VideoList = () => import('@/views/VideoList.vue');
// const Settings = () => import('@/views/Settings.vue');
// const About = () => import('@/views/About.vue');

// 临时组件，用于开发阶段
const TempComponent = {
  template: '<div class="temp-page"><h2>{{ title }}</h2><p>页面开发中...</p></div>',
  props: ['title'],
};

/**
 * 路由配置
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: TempComponent,
    meta: {
      title: '首页',
      requiresAuth: false,
      keepAlive: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: TempComponent,
    meta: {
      title: '密码验证',
      requiresAuth: false,
      keepAlive: false,
    },
  },
  {
    path: '/video-list',
    name: 'VideoList',
    component: TempComponent,
    meta: {
      title: '视频列表',
      requiresAuth: true,
      keepAlive: true,
    },
  },
  {
    path: '/video-player/:id',
    name: 'VideoPlayer',
    component: TempComponent,
    props: true,
    meta: {
      title: '视频播放',
      requiresAuth: true,
      keepAlive: false,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: TempComponent,
    meta: {
      title: '设置',
      requiresAuth: true,
      keepAlive: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: TempComponent,
    meta: {
      title: '关于',
      requiresAuth: false,
      keepAlive: true,
    },
  },
  {
    // 404 页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: TempComponent,
    meta: {
      title: '页面未找到',
      requiresAuth: false,
      keepAlive: false,
    },
  },
];

/**
 * 创建路由实例
 */
const router: Router = createRouter({
  // 使用 hash 模式，避免 Electron 中的路径问题
  history: createWebHashHistory(),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

/**
 * 全局前置守卫
 * 处理路由权限验证和页面标题设置
 */
router.beforeEach((to, from, next) => {
  try {
    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - 加密视频U盘播放器`;
    }

    // 检查是否需要身份验证
    if (to.meta?.requiresAuth) {
      // TODO: 待Pinia状态管理完成后，检查用户认证状态
      // const authStore = useAuthStore();
      // if (!authStore.isAuthenticated) {
      //   next({ name: 'Login', query: { redirect: to.fullPath } });
      //   return;
      // }

      // 暂时允许所有路由访问
      console.log(`访问需要认证的路由: ${to.path}`);
    }

    // 记录路由跳转日志
    console.log(`路由跳转: ${from.path} -> ${to.path}`);

    next();
  } catch (error) {
    console.error('路由守卫错误:', error);
    next(false); // 阻止路由跳转
  }
});

/**
 * 全局后置钩子
 * 处理路由跳转完成后的逻辑
 */
router.afterEach((to, from, failure) => {
  try {
    if (failure) {
      console.error('路由跳转失败:', failure);
      return;
    }

    // 记录页面访问
    console.log(`页面加载完成: ${to.path}`);

    // TODO: 可以在这里添加页面访问统计、埋点等逻辑
  } catch (error) {
    console.error('路由后置钩子错误:', error);
  }
});

/**
 * 路由错误处理
 */
router.onError(error => {
  console.error('路由错误:', error);
  // TODO: 可以在这里添加错误上报逻辑
});

/**
 * 导出路由实例
 */
export default router;

/**
 * 路由工具函数
 */
export const routerUtils = {
  /**
   * 编程式导航到指定路由
   */
  navigateTo(name: string, params?: Record<string, string | number>, query?: Record<string, string | number>) {
    try {
      const route: Record<string, string | number | Record<string, string | number>> = { name };
      if (params) {
        route.params = params;
      }
      if (query) {
        route.query = query;
      }
      return router.push(route);
    } catch (error) {
      console.error('导航失败:', error);
      throw error;
    }
  },

  /**
   * 替换当前路由
   */
  replaceTo(name: string, params?: Record<string, string | number>, query?: Record<string, string | number>) {
    try {
      const route: Record<string, string | number | Record<string, string | number>> = { name };
      if (params) {
        route.params = params;
      }
      if (query) {
        route.query = query;
      }
      return router.replace(route);
    } catch (error) {
      console.error('路由替换失败:', error);
      throw error;
    }
  },

  /**
   * 返回上一页
   */
  goBack() {
    try {
      router.back();
    } catch (error) {
      console.error('返回失败:', error);
      // 如果无法返回，导航到首页
      this.navigateTo('Home');
    }
  },

  /**
   * 前进到下一页
   */
  goForward() {
    try {
      router.forward();
    } catch (error) {
      console.error('前进失败:', error);
    }
  },

  /**
   * 获取当前路由信息
   */
  getCurrentRoute() {
    return router.currentRoute.value;
  },

  /**
   * 检查路由是否存在
   */
  hasRoute(name: string): boolean {
    return router.hasRoute(name);
  },

  /**
   * 获取所有路由
   */
  getRoutes() {
    return router.getRoutes();
  },
};

/**
 * 路由元信息类型定义
 */
export interface CustomRouteMeta {
  title?: string;
  requiresAuth?: boolean;
  keepAlive?: boolean;
  icon?: string;
  hidden?: boolean;
  roles?: string[];
}

/**
 * 扩展 Vue Router 的类型定义
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    keepAlive?: boolean;
    icon?: string;
    hidden?: boolean;
    roles?: string[];
  }
}
