// 测试ESLint和Prettier执行顺序的文件

// ESLint会要求使用const，Prettier会修复格式
const shouldBeConst = 'test';
console.log(shouldBeConst); // 使用变量避免unused警告

// ESLint会修复===，Prettier会修复格式
function checkOrder(value: unknown) {
  if (value === null) {
    return false;
  }
  return true;
}

// 复杂的格式和ESLint问题组合
const complexObject = {
  name: 'test',
  getValue: function () {
    const result = this.name;
    return result;
  },
  checkValue: (val: unknown) => {
    return val === undefined ? false : true;
  },
};

export { checkOrder, complexObject };
