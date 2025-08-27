# 加密视频U盘项目 - 设计规范

## 布局规范

### 网格系统

**基础网格：8px网格系统**
- 所有元素的尺寸和间距都基于8px的倍数
- 最小间距单位：8px
- 推荐间距：8px, 16px, 24px, 32px, 48px, 64px

**适老化调整：**
- 最小可点击区域：44px × 44px
- 最小文字行高：24px（1.5倍字号）
- 最小间距：16px（双倍基础网格）

### 页面布局

**标准页面结构：**
```
┌─────────────────────────────────────┐
│ Header (64px)                       │
├─────────────────────────────────────┤
│                                     │
│ Main Content Area                   │
│ (min-height: calc(100vh - 128px))   │
│                                     │
├─────────────────────────────────────┤
│ Footer (64px) - 可选                │
└─────────────────────────────────────┘
```

**内容区域边距：**
- 页面左右边距：32px（桌面）/ 16px（小屏）
- 内容块之间间距：32px
- 卡片内边距：24px

## 间距规范

### 间距层级

**微间距（组件内部）：**
- 4px：图标与文字间距
- 8px：表单元素内边距
- 12px：按钮内边距（垂直）
- 16px：按钮内边距（水平）

**小间距（相关元素）：**
- 16px：相关元素间距
- 24px：表单字段间距
- 32px：卡片内容间距

**中间距（功能区块）：**
- 32px：功能区块间距
- 48px：页面区域间距
- 64px：主要区域间距

**大间距（页面级别）：**
- 64px：页面顶部间距
- 80px：页面底部间距
- 96px：特殊区域间距

### 垂直间距规范

**文本间距：**
- 标题与正文：16px
- 段落间距：24px
- 列表项间距：12px
- 表单标签与输入框：8px

**组件间距：**
- 按钮组间距：16px
- 卡片间距：24px
- 模块间距：48px

## 排版规范

### 文字排版

**标题层级：**
```
H1: 32px/38px, font-weight: 700, margin-bottom: 24px
H2: 24px/29px, font-weight: 600, margin-bottom: 20px
H3: 20px/24px, font-weight: 600, margin-bottom: 16px
H4: 18px/22px, font-weight: 500, margin-bottom: 12px
```

**正文排版：**
```
主要正文: 18px/27px, font-weight: 400
次要正文: 16px/24px, font-weight: 400
辅助文字: 14px/21px, font-weight: 400
```

**特殊文本：**
```
按钮文字: 16px/16px, font-weight: 500
表单标签: 16px/20px, font-weight: 500
错误提示: 14px/18px, font-weight: 400, color: error
```

### 对齐规范

**文本对齐：**
- 标题：左对齐（中文）
- 正文：左对齐，两端对齐（长文本）
- 数字：右对齐或等宽字体
- 按钮文字：居中对齐

**元素对齐：**
- 表单元素：左对齐，标签右对齐
- 按钮组：左对齐或居中
- 图标与文字：垂直居中对齐

## 颜色使用规范

### 文本颜色层级

**主要文本：**
- 标题文字：#1F2937（深灰）
- 正文文字：#374151（中深灰）
- 强调文字：#2E5BBA（主蓝色）

**次要文本：**
- 辅助文字：#6B7280（中灰）
- 禁用文字：#9CA3AF（浅灰）
- 占位文字：#D1D5DB（极浅灰）

**功能文本：**
- 链接文字：#2E5BBA（主蓝色）
- 成功文字：#10B981（绿色）
- 警告文字：#F59E0B（橙色）
- 错误文字：#EF4444（红色）

### 背景颜色规范

**页面背景：**
- 主背景：#FFFFFF（纯白）
- 次背景：#F9FAFB（极浅灰）
- 区域背景：#F3F4F6（浅灰）

**组件背景：**
- 卡片背景：#FFFFFF（纯白）
- 输入框背景：#FFFFFF（纯白）
- 按钮背景：根据按钮类型
- 悬浮背景：#F3F4F6（浅灰）

### 边框颜色规范

- 默认边框：#E5E7EB（浅灰）
- 悬浮边框：#D1D5DB（中浅灰）
- 焦点边框：#2E5BBA（主蓝色）
- 错误边框：#EF4444（红色）

## 交互规范

### 按钮交互

**主要按钮（Primary Button）：**
```
默认状态: bg: #2E5BBA, color: #FFFFFF
悬浮状态: bg: #1E3A8A, color: #FFFFFF
按下状态: bg: #1E40AF, color: #FFFFFF, transform: translateY(1px)
禁用状态: bg: #9CA3AF, color: #FFFFFF, cursor: not-allowed
```

**次要按钮（Secondary Button）：**
```
默认状态: bg: #FFFFFF, color: #2E5BBA, border: 1px solid #2E5BBA
悬浮状态: bg: #EBF4FF, color: #1E3A8A, border: 1px solid #1E3A8A
按下状态: bg: #DBEAFE, color: #1E40AF
禁用状态: bg: #F9FAFB, color: #9CA3AF, border: 1px solid #E5E7EB
```

**文字按钮（Text Button）：**
```
默认状态: color: #2E5BBA, bg: transparent
悬浮状态: color: #1E3A8A, bg: #EBF4FF
按下状态: color: #1E40AF, bg: #DBEAFE
禁用状态: color: #9CA3AF, bg: transparent
```

### 输入框交互

**文本输入框：**
```
默认状态: border: 1px solid #E5E7EB, bg: #FFFFFF
悬浮状态: border: 1px solid #D1D5DB
焦点状态: border: 2px solid #2E5BBA, box-shadow: 0 0 0 3px rgba(46, 91, 186, 0.1)
错误状态: border: 2px solid #EF4444, box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)
禁用状态: bg: #F9FAFB, border: 1px solid #E5E7EB, color: #9CA3AF
```

### 链接交互

**文字链接：**
```
默认状态: color: #2E5BBA, text-decoration: none
悬浮状态: color: #1E3A8A, text-decoration: underline
访问状态: color: #7C3AED
```

### 卡片交互

**可点击卡片：**
```
默认状态: bg: #FFFFFF, border: 1px solid #E5E7EB, shadow: 0 1px 3px rgba(0,0,0,0.1)
悬浮状态: shadow: 0 4px 6px rgba(0,0,0,0.1), transform: translateY(-1px)
按下状态: shadow: 0 1px 2px rgba(0,0,0,0.1), transform: translateY(0)
```

## 动画规范

### 过渡动画

**标准过渡：**
- 持续时间：200ms
- 缓动函数：ease-out
- 属性：color, background-color, border-color, box-shadow

**快速过渡：**
- 持续时间：150ms
- 缓动函数：ease-out
- 用于：hover状态变化

**慢速过渡：**
- 持续时间：300ms
- 缓动函数：ease-in-out
- 用于：布局变化、显示隐藏

### 微交互动画

**按钮点击反馈：**
```css
.button:active {
  transform: translateY(1px);
  transition: transform 100ms ease-out;
}
```

**加载动画：**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading {
  animation: spin 1s linear infinite;
}
```

**淡入动画：**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 300ms ease-out;
}
```

## 响应式规范

### 断点定义

```css
/* 移动设备 */
@media (max-width: 768px) {
  /* 移动端样式 */
}

/* 平板设备 */
@media (min-width: 769px) and (max-width: 1024px) {
  /* 平板样式 */
}

/* 桌面设备 */
@media (min-width: 1025px) {
  /* 桌面样式 */
}

/* 大屏设备 */
@media (min-width: 1440px) {
  /* 大屏样式 */
}
```

### 适配规则

**字体大小适配：**
- 移动端：基础字号16px
- 平板端：基础字号17px
- 桌面端：基础字号18px

**间距适配：**
- 移动端：间距减半
- 平板端：间距标准
- 桌面端：间距标准或增大

**按钮尺寸适配：**
- 移动端：最小44px×44px
- 平板端：最小48px×48px
- 桌面端：最小52px×52px

## 无障碍规范

### 颜色对比度

**WCAG 2.1 AA级标准：**
- 正常文本：对比度不低于4.5:1
- 大文本（18px+）：对比度不低于3:1
- 非文本元素：对比度不低于3:1

### 键盘导航

**焦点指示器：**
```css
.focusable:focus {
  outline: 2px solid #2E5BBA;
  outline-offset: 2px;
}
```

**Tab顺序：**
1. 主要操作按钮
2. 次要操作按钮
3. 表单输入框
4. 链接
5. 其他可交互元素

### 屏幕阅读器支持

**语义化标签：**
- 使用正确的HTML语义标签
- 提供alt属性给图片
- 使用aria-label描述复杂交互

**状态提示：**
- 使用aria-live区域提示状态变化
- 提供loading状态的文字描述
- 错误信息与表单字段关联

## 表单规范

### 表单布局

**垂直布局（推荐）：**
```
标签
输入框
帮助文字/错误提示

间距：8px（标签到输入框）
间距：4px（输入框到提示）
间距：24px（字段间）
```

**水平布局：**
```
标签    输入框
        帮助文字/错误提示

标签宽度：120px
间距：16px（标签到输入框）
```

### 表单验证

**实时验证：**
- 失去焦点时验证
- 显示内联错误信息
- 使用红色边框和文字

**提交验证：**
- 阻止无效表单提交
- 滚动到第一个错误字段
- 显示全局错误摘要

### 输入框规范

**尺寸规范：**
- 高度：48px（适老化）
- 内边距：12px 16px
- 边框：1px solid
- 圆角：4px

**状态样式：**
- 占位符：浅灰色文字
- 禁用：灰色背景
- 只读：浅灰背景，无边框变化

## 图标规范

### 图标使用原则

1. **一致性**：同一功能使用相同图标
2. **识别性**：选择通用、易识别的图标
3. **简洁性**：避免过于复杂的图标设计
4. **适老化**：确保图标足够大且清晰

### 图标与文字组合

**水平组合：**
```
[图标] 文字
间距：8px
垂直对齐：center
```

**垂直组合：**
```
[图标]
文字
间距：4px
水平对齐：center
```

### 图标状态

**默认状态：**
- 颜色：#6B7280（中灰）
- 透明度：1.0

**悬浮状态：**
- 颜色：#2E5BBA（主蓝）
- 透明度：1.0

**禁用状态：**
- 颜色：#D1D5DB（浅灰）
- 透明度：0.5

## 错误处理规范

### 错误信息展示

**内联错误：**
- 位置：相关元素下方
- 颜色：#EF4444（错误红）
- 字号：14px
- 图标：感叹号

**全局错误：**
- 位置：页面顶部或模态框
- 背景：#FEF2F2（浅红背景）
- 边框：#FECACA（红色边框）
- 可关闭：提供关闭按钮

### 成功反馈

**成功提示：**
- 颜色：#10B981（成功绿）
- 背景：#ECFDF5（浅绿背景）
- 图标：对勾
- 自动消失：3秒后

## 加载状态规范

### 加载指示器

**按钮加载：**
- 显示旋转图标
- 禁用按钮交互
- 保持按钮尺寸

**页面加载：**
- 全屏遮罩
- 居中加载动画
- 加载文字提示

**内容加载：**
- 骨架屏占位
- 渐进式加载
- 加载进度指示

### 空状态设计

**无数据状态：**
- 插图：简洁的空状态图标
- 文字：友好的提示信息
- 操作：引导用户下一步操作

**搜索无结果：**
- 提示："未找到相关内容"
- 建议：提供搜索建议
- 操作：清除搜索或重新搜索
