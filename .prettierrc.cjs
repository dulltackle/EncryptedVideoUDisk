module.exports = {
  // 基础格式化选项
  printWidth: 120, // 行宽度
  tabWidth: 2, // 缩进宽度
  useTabs: false, // 使用空格而非制表符
  semi: true, // 语句末尾添加分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 对象属性引号按需添加

  // JavaScript/TypeScript 特定选项
  jsxSingleQuote: true, // JSX 中使用单引号
  trailingComma: 'es5', // 尾随逗号（ES5 兼容）
  bracketSpacing: true, // 对象字面量的大括号间添加空格
  bracketSameLine: false, // 多行 JSX 元素的 > 放在下一行
  arrowParens: 'avoid', // 箭头函数参数括号（单参数时省略）

  // Vue 特定选项
  vueIndentScriptAndStyle: false, // Vue 文件中的 script 和 style 标签不缩进

  // 其他选项
  endOfLine: 'lf', // 行尾序列（LF）
  embeddedLanguageFormatting: 'auto', // 嵌入式语言格式化
  singleAttributePerLine: false, // HTML/Vue 属性不强制单行

  // 文件覆盖配置
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'preserve',
      },
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
  ],
};
