// 测试文件：演示ESLint和Prettier的自动修复功能

// 修复后的代码
function testFunction(param: unknown) {
  if (param === null) {
    console.log('now using === instead of ==');
  }

  // 使用const而不是let
  const shouldBeConst = 'this is now const';
  console.log(shouldBeConst);

  // 避免显式any类型
  const typedValue: string = 'avoiding explicit any';
  return typedValue;
}

// 这个格式问题会被Prettier自动修复
const badFormatting = { name: 'test', value: 123 };

export { testFunction };
