/* eslint-disable */
// Vue 3 单文件组件类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vite 环境变量类型声明
declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_VERSION: string
    readonly VITE_DEV_SERVER_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

// Element Plus 全局组件类型声明
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElButton: typeof import('element-plus')['ElButton']
    ElInput: typeof import('element-plus')['ElInput']
    ElCard: typeof import('element-plus')['ElCard']
    ElMessage: typeof import('element-plus')['ElMessage']
    ElMessageBox: typeof import('element-plus')['ElMessageBox']
    ElDialog: typeof import('element-plus')['ElDialog']
    ElProgress: typeof import('element-plus')['ElProgress']
    ElSlider: typeof import('element-plus')['ElSlider']
  }
}

export {}