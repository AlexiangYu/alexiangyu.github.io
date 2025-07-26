---
title: JavaScript 笔记
description: 陆续记录了所有js相关的基础知识
publishDate: 2025-07-26 00:10:41
tags:
  - Example
  - Technology
---


## 简介

一种脚本语言，可用于HTML和Web，更可广泛用于服务器等领域。

组成：

**ECMAScript** 核心语法

**Web APIs** DOM（文档对象模型）+BOM



### 书写位置

- 内部JS：`<script>`写在`<body>`最后
    ```html
  <body>
    <!-- body content here -->

    <script>
        alert("Hello, JS!")
    </script>
    </body>
    ```
- 外部JS：单独引入`.js`文件
    ```html
  <body>
    <!-- body content here -->

    <script src="./main.js"></script>
    </body>
    ```
- 内联JS：标签内部
    ```html
    <button onclick="alert('Hello World!')">按钮</button>
    ```


## 输入/输出

```js
document.write("写入文档");
console.log("打印日志");
alert("弹出提示框");

let a = prompt("输入框", "默认值");
document.write("<p>你输入的内容是：" + a + "</p>");

let age = 20; 
document.write(`<p>我的年龄是${age}岁</p>`);   //模板字符串
```

### let，var， const区别

1.  作用域：

-   var：函数作用域，在声明它的函数内部有效。
-   let：块级作用域，即在声明它的`{ }`块（如 if 语句块、for 循环块等）内有效。

2.  变量提升：

-   var：会发生变量提升，即在变量声明之前就可以访问到变量（但值为 undefined）
-   let：没有变量提升，在声明之前访问会报错。

var可重复声明

常量const：必须赋值，不可修改

#### 数组

```js
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

- **添加**
    1. push(el1, el2)：添加元素到尾部，返回**新的长度**
    2. unshift(el)：添加到头部
- **删除**
    1. pop()：删除最后一个元素，返回**该元素**
    2. shift()：删除第一个元素
    3. splice(start, count=1, ..., (el1)...)：指定开始位置，移除个数，替换元素

```js
let arr = [1, 2 ,'Alex', 'Bob', 'Charlie']
console.log(arr.push('Dave', 'Eve'))    // 7
arr.unshift(0)

// [0, 1, 2, 'Alex', 'Bob', 'Charlie', 'Dave', 'Eve']
console.log(arr.shift())   // remove the first element
arr.splice(2, 1, 'Jane')    // replace 'Alex' with 'Jane'

console.log(arr)    // [0, 1, 'Jane', 'Bob', 'Charlie', 'Dave', 'Eve']
```

- `map(func)`：映射，返回新数组
- `filter(func)`：过滤，返回新数组
- `reduce((prev, curr) => {... }, initial)`：聚合，返回单个值
- `sort(func)`：排序，返回新数组
- `reverse()`：反转，返回新数组
- `slice(start, end)`：切片，返回新数组
- `concat(arr1, arr2,...)`：合并，返回新数组
- `join`：连结成字符串


展开运算符： 数组变成多个参数

```js
let arr = [1, 2, 3, 4, 5];
console.log(Math.max(...arr)); // Output: 5

const newArr = arr.filter(item => item > 2);   // [3, 4, 5] 返回true的元素才会被保留

console.log(arr.reduce((acc, curr) => acc + curr, 0)); // Output: 15
```

**遍历**

- `forEach(func)`：遍历数组，不返回新数组
- `for...of`：遍历数组，返回新数组

```js
let arr = [1, 2, 3, 4, 5];
arr.forEach(function(value, index, arr) {
  console.log(value);
});

for (let value of arr) {
  console.log(value);
}
```



**解构**

```js
const [un, deux, trois, quatre, cinq] = arr;
console.log(un, deux, trois, quatre, cinq); // Output: 1 2 3 4 5
```

## 数据类型

弱数据类型：在程序运行时才确定

 - **基本数据类型：** 存储的值本身
     1. Number
     2. String  `.trim()` 去掉前后空格
     3. Boolean
     4. null
     5. undefined
     6. Symbol
 - **引用数据类型：** 可变
     1. Object
     2. Array
     3. Function
     4. Date
     5. RegExp 正则表达式

```js
let person = { // Object
    name: "John",
    age: 30
};

let colors = ["red", "green", "blue"]; // Array

function sayHello() { // Function
    console.log("Hello!");
}

let today = new Date(); // Date
let regex = /hello/i; // RegExp
```

**类型判断**

typeof 运算符/函数

```js
console.log(typeof true);  // boolean

console.log(typeof undefined);  // undefined

console.log(typeof null);   // object
```

**关于null与undefined**

null是已赋值空类型
```js
console.log(null+1) // 1
console.log(undefined+1) // NaN
console.log(null+null) // 0
```

**类型转换**

1. 隐式转换: 运算，拼接
2. **显示转换**：手动

```js
let str = "123"
let ans1 = Number(str) + 1 // 124
let ans2 = +str + 1 // 124 隐式

let age = +prompt("请输入你的年龄："); // number
```

 - parseInt()：只保留整数
 - parseFloat()：保留小数

```js
console.log(parseInt("89.65px"))    // 89
console.log(parseFloat("12.98px"))  // 12.98
```


#### 比较运算符


- `==` 值相等
- `===` 值、类型都相等
- `!==` 不全等

```js
console.log(2 === 2) // true
console.log(2 == "2") // true
console.log(2 === "2") // false
console.log(null == undefined) // true
console.log(null === undefined) // false
console.log(null == 0) // false
console.log(null === 0) // false
console.log(undefined == 0) // false
console.log(undefined === 0) // false
console.log(NaN == NaN) // false
console.log(NaN === NaN) // false
console.log(0 == false) // true
console.log(0 === false) // false
console.log("" == false) // true
console.log("" === false) // false
console.log(1 == true) // true
console.log(1 === true) // false
console.log(1 == "true") // true
console.log(1 === "true") // false
console.log(0 == "") // true
console.log(0 === "") // false
```

建议用 `===` 判断

NaN不等于任何值

**三元运算符**

```js
let num1 = 10, num2 = 20;
num1>num2 ? console.log(`${num1}大于${num2}`) : console.log(`${num1}不大于${num2}`);     // 10不大于20

let a = prompt("Enter a:");
document.write( a<10 ?  0+a : a)    //if a is less than 10, add 0 before it
```


#### Symbol

表示唯一（即使它们具有相同的描述）且不可变的值。它可以用作对象属性的键（key），从而避免属性名称的冲突。

> 通过 `Symbol()` 函数创建新的 `Symbol` 值，传入的字符串参数是该 `Symbol` 的描述，主要用于调试时的说明，并不会影响其唯一性。

```js
const mySymbol = Symbol('hidden');  

console.log(Symbol('description') === Symbol('description')); // false

const obj = {  
    name: 'Alice',  
    [mySymbol]: 'secret value'  
};  

console.log(obj.name); // 输出: Alice  
console.log(obj[mySymbol]); // 输出: secret value  
console.log(Object.keys(obj)); // 输出: ["name"]  
console.log(Object.getOwnPropertyNames(obj)); // 输出: ["name"]  
console.log(Reflect.ownKeys(obj)); // 输出: ["name", Symbol(hidden)]
```


- 隐私性： `Symbol` 属性不会出现在常规的对象枚举中。仅可通过 `Object.getOwnPropertySymbols()` 方法获取。






## 函数

声明：`function f(param = default) { return val }`


```js
function addTwo(a, b) {
  return a + b;
}

document.write(addTwo(2, 3)); // Output: 5
```

`this` 指向调用它的对象，严格模式下无调用者：undefined

**回调函数**：作为参数被传递的函数

```js
function call() {
    console.log('call')
}
setInterval(call, 1000)

setTimeout(() => {
    alert('Hello');
}, 2000);   // 仅一次性执行
```

#### 匿名函数

`let fn = function(param) { body }`

**立即执行**

`(function(){ })()` 或 `(function(){ }())`

需要分号

```js
(function(x, y) { console.log(x + y) }(2, 7)); // Output: 9
```

#### 箭头函数

`let fn = (param) => { body }`

仅有一个参数/语句，可省略括号/return

无this：指向父级作用域（全局window）

```js
const fn = x => x+2
console.log(fn(1))  // Output: 3
```

用于返回对象

```js
const fn = uname => ({ name: uname, age: 25 });
const obj = fn("John");
console.log(obj);    // Output: { name: "John", age: 25 }
```



#### rest参数

用`...args`表示，放在最后...不写就是arguments

```js
function add(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}

console.log(add(2, 3, 4)) // Output: 9
```


**参数解构**

```js
let [x, y] = [1, 2];
console.log(x, y) // Output: 1 2

let {name, age} = {name: 'Alex', age: 25};
console.log(name, age) // Output: Alex 25
```


### 动态指向函数

手动指定函数中的 this

- call() 与 apply() 类似，但第一个参数为调用者对象 `func.call(thisArg, args...)`
- apply() 形参为数组 `func.apply(thisArg, [argsArray])`
- bind() 返回一个新的函数，可以指定参数 `const boundFunc = func.bind(thisArg, args...)`

```js
function greeting() {
    return "Hello, " + this.name;
}
let person1 = { name: "Alice" };
let person2 = { name: "Bob" };

console.log(greeting.call(person1)); // 输出: Hello, Alice
console.log(greeting.call(person2)); // 输出: Hello, Bob

const arr = [1, 2, 3, 4, 5];
console.log(Math.max.apply(null, arr), Math.min(...arr)); // Output: 5 1

const greetPerson = greeting.bind(person1); // 绑定 person1 的 this 到 greeting 函数上
console.log(greetPerson()); // Output: Hello, Alice
```





### 异常处理

- `throw` 手动抛出异常，终止程序执行；要配合ERROR对象使用
- `try...catch` 捕获异常（由浏览器或其他代码抛出）拦截但不中断程序

```js
function divide(a, b) {
  if (b === 0)
    throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  console.log(divide(2, 0));
} catch (error) {
  console.log(error.message);
}
finally {    // 无论是否有异常都会执行
    alert("Finally block");
}
```

- `debugger` 断点调试，在浏览器中运行





## 对象

无序的数据集合

- **属性**：属性名+值 成对出现 用`,`分隔
- **方法**：函数

```js
let stu = {
  u_name: "John",
  age: 25,
  greet: function() {
    console.log("Hello, my name is " + this.u_name + " and I am " + this.age + " years old.");
  }
};

stu.greet(); // Output: Hello, my name is John and I am 25 years old.

stu.address = "123 Main St";
delete stu.age;

console.log(stu); // Output: {name: "John", address: "123 Main St"}
```

1. 增加新属性/修改属性：`obj.attr = val`
2. 删除：`delete obj.attr`

查询可用 `obj['attr']` 属性名为字符串 attr为变量时
```js
let obj = {
    'o-name': 'Object 1',
}

console.log(obj['o-name']); // Output: Object 1
```


#### 构造函数

创建多个对象，相同属性 **没有Class...**


```js
function Person(name = "John", age) {      // Constructor function：Capitalize first letter of each word 
    this.name = name;
    this.age = age;
    Person.numberOfPeople++;        // count number of instances created
}
Person.numberOfPeople = 0;       // Static property: Number of instances created
Person.prototype.reportNumberOfPeople = function() {
    console.log(`Total number of people: ${Person.numberOfPeople}`);
}

const p1 = new Person(undefined, 30);
console.log(p1.name); // Output: John
Person.prototype.reportNumberOfPeople(); // Output: Total number of people: 1
```

**静态成员/方法**

写在构造函数外面，所有实例共享

常用静态方法：

- `Object.assign(target, ...sources)`：将所有可枚举的自有属性从一个或多个源对象复制到目标对象。
- `Object.keys(obj)`：返回一个包含对象自身可枚举属性名称的数组。
- `Object.values(obj)`：返回一个包含对象自身可枚举属性值的数组。
- `Object.entries(obj)`：返回一个包含对象自身可枚举属性 [key, value] 对的数组。
- `Object.freeze(obj)`：冻结对象，禁止修改其现有属性或添加新属性。
- `Object.seal(obj)`：密封对象，禁止添加新属性，但允许运营商修改现有属性

```js
const obj2 = new Object({ name: "Mary", age: 25 });

console.log(Object.keys(obj2)); // Output: ["name", "age"]
console.log(Object.values(obj2)); // Output: ["Mary", 25]

Object.assign(obj2, { gender: 'female' });   // Copy all properties from one object to obj2
console.log(obj2); // Output: { name: 'Mary', age: 25, gender: 'female' }
```


#### 原型对象

构造函数的属性 指向实例：
所有实例共享，所有实例都可以访问

```js
function Sta(a, b){
    this.a = a;
    this.b = b;
}
Sta.prototype.sum = function(){     // prototype defines method for all instances
    return this.a + this.b + 3;      // this refers to the instance 实例对象
}

const yzx = new Sta(1, 2);

console.log(yzx.sum()); // 6
```

**constructor属性：** 反过来指向构造函数

**原型链:** 基于构造函数原型的继承链；调用方法时，逐级再往上找

- `yzx.__proto__ === Sta.prototype`

- `Sta.prototype.constructor === Sta`

- `Sta.prototype.__proto__ === Object.prototype`


#### 继承

通过原型继承的方式

```js
function Person() {
    this.eyes = 2;
    this.ears = 2;
    this.mouth = 1;
}

function Woman() {} // Woman.prototype inherits from Person.prototype
Woman.prototype = new Person();
Woman.prototype.constructor = Woman;
Woman.prototype.baby = function() {
    console.log('Have a baby');
}

const w = new Woman();
console.log(w); // Woman {eyes: 2, ears: 2, mouth: 1}
console.log(w.__proto__); // Person {constructor: ƒ}
```

`instanceof` 运算符：检测对象是否在某个构造函数的原型链上

```js
console.log(yzx instanceof Sta); // true
console.log(Sta.prototype instanceof Object); // true
```


#### 遍历

`for (let key in obj)` 语法 

```js
for (let key in stu) {  // Iterate over the object's properties
  console.log(key + ": " + stu[key]);
}
// Output:
// name: John
// age: 25
// address: 123 Main St 
```

#### 解构

同名变量赋值 `旧变量名：新变量名`

```js
let {name: user, age} = {name: "John", age: 25};
console.log(user, age); // Output: John 25
```

#### 拷贝

- 浅拷贝：仅复制一层，不包含后代元素
- 深拷贝：复制所有后代元素

```js
function copy(obj) {            // 递归实现
    if (typeof obj !== 'object' || obj === null)
        return obj;

    const res = Array.isArray(obj)? [] : {};
    for (let key in obj)
        if (obj.hasOwnProperty(key))
            res[key] = copy(obj[key]);
        else
            res.key = obj[key];

    return res;
}

let obj2 = _.cloneDeep(obj1);    // lodash.js库实现

const obj3 = JSON.parse(JSON.stringify(obj1));   // JSON 实现深拷贝

```


#### Reflect

> 反射是在程序运行中获取和动态操作自身内容的一项技术。

用于操作对象属性和行为，提供与Object相同的方法，但其方法是静态的。

```js
const obj = { a: 1, b: 2 };
const newObj = { c: 3, d: 4 };

Object.assign(obj, newObj); // obj: {a: 1, b: 2, c: 3, d: 4}

console.log(Reflect.ownKeys(obj))   // ["a", "b", "c", "d"]
console.log(Reflect.get(obj, 'a'))  // 1

Reflect.set(obj, 'e', 5)    // true
console.log(Reflect.has(obj, 'a'))  // true
Reflect.deleteProperty(obj, 'a'); // obj: {b: 2, c: 3, d: 4, e: 5}
```

`ownKeys()` 方法：返回对象的所有属性名（包括不可枚举的 `Symbol` 属性）

#### Proxy

创建对象代理的机制。允许你定义一个对象作为原始对象的代理，以拦截和定制基本操作（例如属性访问、赋值、枚举等）。

> 通过Proxy，可以在原有对象上添加额外的功能，比如验证、日志记录、属性访问拦截、计算值等。

```js
const target = {  
  message: 'Hello, world!'  
};  

const handler = {  
  get: function(target, propKey, receiver) {  
    console.log(`Getting property: ${propKey}`);  
    return Reflect.get(target, propKey, receiver); // 调用原始对象的属性  
  },  
  set: function(target, propKey, value) {  
    console.log(`Setting property: ${propKey} to ${value}`);  
    target[propKey] = value; // 设置原始对象的属性  
    return true; // 表示设置成功  
  }  
};  

const proxy = new Proxy(target, handler);  

console.log(proxy.message); // 输出: Getting property: message \n Hello, world!  
proxy.message = 'Hello, Proxy!'; // 输出: Setting property: message to Hello, Proxy!  
console.log(proxy.message); // 输出: Getting property: message \n Hello, Proxy!
```

常用的拦截器：

- `get`: 拦截对象属性的读取操作。
- `set`: 拦截对象属性的写入操作。
- `has`: 拦截 in 运算符的操作。
- `deleteProperty`: 拦截删除属性的操作。
- `apply`: 拦截函数调用。
- `construct`: 拦截构造函数调用。
- `ownKeys`: 拦截获取对象自身属性的操作。
- `getOwnPropertyDescriptor`: 拦截获取对象属性描述符的操作。
- `defineProperty`: 拦截设置对象属性描述符的操作。











**日期对象**

获取 `let date = new Date()`

```js
let date = new Date('2021-01-01 12:00:00 AM UTC +00:00');
console.log(date.toLocaleDateString()); // "1/1/2021"
```

时间戳：毫秒，since 1970-01-01







## WebAPIs

用`const`声明变量（对象）

1. DOM树：树结构表达 HTML 文档
    - 根节点为document对象
2. DOM对象：包含所有属性、事件等

```js
const div = document.querySelector('div')
console.dir(div)
```

### 获取DOM元素

返回匹配指定CSS选择器的第一个元素：`querySelector('nav')`

返回伪数组，可以遍历；`document.querySelectorAll()`

```js
const nav = document.getElementById('nav')  // get element by id
const n2 = document.getElementsByClassName('#')  // get all elements by class name
const n3 = document.getElementsByTagName('n')  // get all elements by tag name
```

#### 修改内容

- `innerHTML`：会解析HTML标签
- `innerText`：仅文本字符串
- `className`：更改CSS类
- `classLis`：**追加/删**CSS类


H5自定义属性 `data-xxx` DOM 中dateset对象


    <p id="nav" data-id="77">Navigation</p>

    const nav = document.getElementById('nav')
    console.log(nav.dataset.id)   // 77 get data-id attribute value


### 事件监听

添加方法 `addEventListener(event, func)`

另一种写法 `.onclick` 无捕获

**事件类型**
1. 鼠标
    - `click` 点击
    - `mouseenter` 经过
    - `mouseleave` 离开
    - `mouseover` 和 `mouseout` 有冒泡效果（不推荐）
2. 焦点
    - `focus` 获得
    - `blur` 失去
3. 键盘
    - `keydown` 按下
    - `keyup` 弹起
4. 文本
    - `text` 文本输入

**事件对象**：事件触发的信息，func第一个参数

```js
b3.addEventListener('click', (e) => {
    console.log(e)   // event object
})

input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        console.log('Enter')    //按回车
    }
})
```
属性
- type: 事件类型
- key: 按下的键

**环境对象**：this 变量 指向调用它的元素/对象

```js
b3.addEventListener('click', function () {
    console.log(this)    // button element <button id="b3">Click me</button>
})
```

#### 事件流

阶段：捕获+**冒泡**（默认）

捕获顺序：Document -> Super_box -> Sub-content 从外到内

不加 `true` 则冒泡，顺序相反
```js
<div class="super">
    <div class="sub">
        <p>Sub-content</p>
    </div>
</div>
    
const superBox = document.querySelector('.super')
const sub = document.querySelector('.sub')

document.addEventListener('click', () => {
    alert('Document clicked')
}, true)
superBox.addEventListener('click', () => {
    alert('Super-box clicked')
}, true)
sub.addEventListener('click', () => {
    alert('Sub-content clicked')
}, true)
```

**阻止冒泡**：避免影响父级元素

修改子类 `.stopPropagation` 后，仅有Sub-content事件

```js
sub.addEventListener('click', function (e) {
    alert('Sub-content clicked')
    e.stopPropagation()   // stop event bubbling
})
```

`.preventDefault()` 阻止默认行为

**解除绑定**

- `on-click = null` 
- `removeEventListener(event, func)` 不能是匿名函数

**委托**

冒泡到父元素，减少注册次数

真正的触发元素：`e.target` 事件对象


**页面事件**

页面动作，执行回调函数

- `load`：页面加载
- `scroll`：滚动
- `resize`：窗口尺寸变化

```js
window.addEventListener('load', () => {
    console.log('Page loaded')          // window load event
})
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded')   // DOM fully loaded
})                              //faster than window.onload

img.addEventListener('load', () => {
    console.log('Image loaded')        // 等待图片加载完成
})

window.addEventListener('scroll', () => {
    console.log(`Window scrollX ${window.scrollX} scrollY ${window.scrollY}`)
    console.log(`Document scrollX ${document.documentElement.scrollLeft} scrollY ${document.documentElement.scrollTop}`)
})
```


获取元素尺寸
- `clientWidth` 和 `clientHeight`：border之内的宽高 可更改
- `offsetHeight` 包括border 只读


### 节点操作


节点：<元素>

**基于关系查找节点**

- 父节点：`.parentNode`
- 子节点：`.children` 包含所有节点的伪数组
- 姐妹节点
    - `.previousElementSibling` 上一个
    - `.nextElementSibling`下一个

**创建、追加节点** `createElement()`

    const dd = document.createElement('div');
    dd.innerHTML = 'dd';
    superDiv.appendChild(dd);      //到最后的子元素
    superDiv.insertBefore(dd, superDiv.children[1]);


**克隆节点** `.cloneNode(true)` 深/浅克隆（是否包含后代元素）

**删除节点** 经过父元素

    superDiv.removeChild(superDiv.children[0]); // remove first child



### BOM对象

- `location`：URL地址
    - `search` 参数，`?`后面部分
    - `hash` 哈希，`#`后面部分
    - `reload()` 刷新
- `navigator`：浏览器平台信息
- `history`：历史操作
    - `back()`：后退
    - `forward()`：前进
    - `go(n)`：进/退n步

**localStorage**本地存储

键值对；仅字符串

对象转换成JSON：`JSON.stringify(obj)`


- `setItem()`：增/改
- `removeItem()`：删
- `log()`：查


```js
console.log(window.location.href); // https://www.example.com/path/to/page.html

localStorage.setItem('name', 'value');
console.log(localStorage.getItem('name')); // value
localStorage.removeItem('name'); // remove ite

const obj = {
    name: 'Alex',
    age: 18,
    sayHello: function() {
        console.log('Hello, my name is '+ this.name);
    }
}

localStorage.setItem('person', JSON.stringify(obj));
const person = JSON.parse(localStorage.getItem('person'));
console.log(person.name); // Alex
```


## 异步编程

### AJAX

Asynchronous JavaScript and XML 局部更新

- `fetch()`：异步请求，返回Promise对象
- `XMLHttpRequest`：同步/异步请求

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    } else {
        console.log('Request failed.  Returned status of'+ xhr.status);
    }
};
xhr.send();
```
### axios

基于Promise的HTTP客户端，支持浏览器和Node.js

```js
axios.get('https://jsonplaceholder.typicode.com/todos/1')
   .then(response => {
        console.log(response.data);
    })
   .catch(error => {
        console.log(error);
    });
```

### Promise

异步操作的完成状态，不可变

- 待定：（初始状态）`pending`
- 成功：`resolve(value)`
- 失败：`reject(error)`

```js
const p = new Promise((resolve, reject) => {    // promise对象
    // do something
    if (/* success */) {
        resolve(value);
    } else {
        reject(error);
    }
});


p.then(value => {
    // success
    console.log(value);
}).catch(error => {
    // failure
    console.log(error);
});
```

#### 链式调用

`.then()` 返回一个新的Promise对象，串联下一环任务，避免嵌套

```js
p.then(value => {
    return value + 1;
}).then(value => {
    return value * 2;
}).then(value => {
    console.log(value);
}).catch(error => {
    console.log(error);
});
```

简洁的Promise异步：`async` 关键字，可以用 `await` 等待结果：会阻塞后面的代码


```js
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

fetchData();
```


#### 异步操作

- `Promise.all()`：等待所有Promise都成功
- `Promise.race()`：等待第一个Promise成功
- `Promise.resolve()`：将现有值转换为Promise
- `Promise.reject()`：创建失败的Promise











## 性能优化



### 防抖

阻止频繁触发函数，禁用一段时间，延迟执行

loDash库实现：`_.debounce(func, wait, [options])`


```js
function debounce(func, wait) {
    let timeout;
    
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func , wait);
    }
}
```

### 节流

单位时间执行一次

```js
let timeout;
function throttle(func, wait) {
    return function() {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(this, arguments);
            }, wait);
        }
    }
}

const btn = document.querySelector('button');
btn.addEventListener('click', throttle(() => {
    console.log('Button clicked');
}, 500));
```

