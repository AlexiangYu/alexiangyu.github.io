---
title: Node.js相关知识
description: 'Write your description here.'
publishDate: 2025-07-26 00:10:40
tags:
  - web前端
---


## 模块化

早期JS: 全局污染和依赖管理混乱


### Commonjs标准

主要在Node.js中实现模块化，在浏览器中需要用webpack编译打包处理（或Browserify实现）

- 每一个 `.js` 文件都是一个单独的模块
- 核心变量: module、exports、require
- 对代码用函数包装
- 运行时同步加载

#### 导出

为`module.exports`赋值，可以只导出一个类或函数

```js
let name = 'hello world'
module.exports = function sayName () {
    return name
}
```

传入形参exports，添加属性和方法

```js
exports.name = `《Node.js实践》`
exports.author = 'AlexYu'
exports.say = function (){
    console.log(666)
}
// exports是传入到当前模块内的一个对象，不能直接赋值
```

#### 导入

require 加载文件：dfs，缓存避免重复加载、循环引用

顺序：当前目录node_modules -> 上级目录的node_modules -> index.js ，index.json ，index.node

```js
const sayName = require('./hello.js')
sayName()
```


### ES6标准

- 静态模块化，提前在编译时加载
- 命令 `export` 用于暴露接口， `import` 用于引入模块
- 运行时异步加载
- 代码中直接导入导出模块


#### 命名导出/导入

- import { } 内部的变量名称，要与 export { } 完全匹配

```js
export function sayName () {
    console.log('Node.js实践')
}

const a = 10;
let b = 20;
export { a, b }
```

```js
import { sayName, a, b } from './hello.js'

sayName()
console.log(a+1, b);
```


#### 默认导出/导入

- export default 导出模块的默认接口，import 导入时可以省略接口名称

```js
export default {
    name: "John",
    age: 30,
    city: "New York",
    fn: function() { console.log(`Hello, ${this.name}`)}
}
```

```js
import obj from './exp_defualt.js'
console.log(obj)    // { name: 'John', age: 30, city: 'New York', fn: [Function: fn] }
obj.fn()           // Hello John
```


#### 混合导出/导入

- 同时使用 export default 和 export 导入多个属性
- 重命名导入

```js
const c = 110;
let d = 120;
export {c, d}

export default {
    name: "John",
    age: 30,
    city: "New York",
    fn: function() { console.log(`Hello, ${this.name}`)}
}
```

```js
import obj, {c, d} from './exp_defualt.js'
console.log(obj)    // { name: 'John', age: 30, city: 'New York', fn: [Function: fn] }
obj.fn()           // Hello John

console.log(c, d)   //

// as 重命名
import * as O from './exp_defualt.js'
console.log(O) // { name: 'John', age: 30, city: 'New York', fn: [Function: fn], c: 110, d: 120 }
```

#### 动态导入

语法：`import(module)`

- 运行时动态导入模块，避免打包体积过大
- 返回 Promise 对象，可以使用 then() 方法获取模块的接口

```js
if (typeof module === 'object' && module.hot) {
  module.hot.accept('./hello.js', function() {
    console.log('Accepting the updated module!');
    // 重新导入模块
    import('./hello.js').then(module => {
      console.log('The updated module:', module);
    });
  });
}
```



## Thunk 是什么

Thunk函数，它接受一个函数作为参数，返回一个函数，这个函数可以接受另一个参数，并返回一个值。主要用于延迟执行，可以将一些计算推迟到运行时执行，比如读取文件、网络请求等。

```js
function readFile(filename) {
  return function(callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) return callback(err);
      callback(null, data);
    });
  };
}

readFile('hello.txt')(function(err, data) {
  if (err) return console.error(err);
  console.log(data);
});
```

在redux中，Thunk用来处理异步任务，它可以让 action 处理函数返回一个函数。

Thunk middleware自动将返回的函数包裹在 dispatch 函数中，这样就可以在 action 处理函数中执行异步操作。

```jsx
function fetchUser(id) {
  // 返回的这个异步函数是一个 Thunk, 或者叫 ThunkAction
  return async ({ dispatch }) => {
    // 额外的异步API调用
    const user = await api.getUser(id);
    // 此时才真正dispatch action
    dispatch({ type: 'UPDATE_USER', payload: user });
  }
}
```

