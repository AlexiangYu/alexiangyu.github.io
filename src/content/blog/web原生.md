---
title: Web原生
description: 'Web Components技术简介'
publishDate: 2024-08-23 14:47:41
tags:
  - web前端
---


## Web Components

从原生层面实现组件化

- HTML template（HTML 模板）：HTML 片段 标签 `<template>` 和 `<slot>` 加入自定义多次重用
- Custom element（自定义元素）：一组 JavaScript API，允许定义 custom elements 及其行为，
- Shadow DOM（影子 DOM）：将封装的“影子”DOM树附加到元素（与主文档 DOM 分开呈现）。保持元素的 js、css 私有


demo如下：

```html
<body>
    <hello-component></hello-component>
    <hello-component> <p slot="content">This is a slot content</p> </hello-component>
    <hello-component name="world"></hello-component>
    <button>click me</button>


    <template id="hello-app">
        <style>
            div {
                background-color: #f2f2f2;
                padding: 20px;
                margin: 15px auto;
                border-radius: 5px;
                width: fit-content;
            }
            button {
                display: block;
                margin: 10px auto;
            }
            .sl {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        </style>
        <div>
            Hello, this is a web component instance. <br>
            <button>click me</button>
            <slot name="content" class="sl">default content</slot>
        </div>
    </template>

    <script>
        class HelloComponent extends HTMLElement {      // 组件定义
            constructor() {
                super();
                const template = document.querySelector('#hello-app');    // 获取模板
                const shadowRoot = this.attachShadow({ mode: 'open' });     // 创建shadow dom       元素可以从 js 外部访问根节点

                shadowRoot.appendChild(template.content.cloneNode(true));    // 克隆模板内容到shadow dom
                
                let cName = this.getAttribute('name');    // 获取name属性
                if (cName) 
                    shadowRoot.querySelector('div').textContent = `Hello, ${ cName }!`;    // 获取name属性并设置div内容

                const button = this.shadowRoot.querySelector('button');
                button.addEventListener('click', () => {
                    alert('Hello, web components!');
                })
            }
            connectedCallback() {    // 组件连接到dom
                console.log('HelloComponent connected');
            }
            disconnnectedCallback() {    // 组件从dom断开连接
                console.log('HelloComponent disconnected');
            }
            adoptedCallback() {    // 组件被adopted时触发
                console.log('HelloComponent adopted');
            }
            attributeChangedCallback(name, oldValue, newValue) {    // 属性变化时触发
                console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
            }
        }
        customElements.define('hello-component', HelloComponent)     // 发布自定义元素
    </script>
</body>
```


#### 组件通信

添加属性

```html
<hello-component id="comp1"></hello-component>
<hello-component id="comp2"></hello-component>
<script>
    const comp1 = document.querySelector('#comp1');
    const comp2 = document.querySelector('#comp2');
    comp1.setAttribute('name', 'world');
    comp2.setAttribute('name', 'web components');
</script>
```


自定义事件

```html
<hello-component id="comp1"></hello-component>
<hello-component id="comp2"></hello-component>
<script>
    const comp1 = document.querySelector('#comp1');
    const comp2 = document.querySelector('#comp2');
    comp1.addEventListener('hello', (event) => {
        console.log(`Hello from ${event.target.getAttribute('name')}`);
    });
    comp2.addEventListener('hello', (event) => {
        console.log(`Hello from ${event.target.getAttribute('name')}`);
    });
    comp1.dispatchEvent(new CustomEvent('hello', { detail: { name: 'world' } }));
    comp2.dispatchEvent(new CustomEvent('hello', { detail: { name: 'web components' } }));
</script>
```

#### 生命周期

钩子/回调函数：
- connectedCallback()：组件被插入文档时调用
- disconnectedCallback()：组件被移除文档时调用
- adoptedCallback()：组件被移动到新文档时调用
- attributeChangedCallback(name, oldValue, newValue)：组件属性变化时调用


#### 实现自定义元素


 - 自定义元素名称以小写字母开头，必须包含连字符（a-z、A-Z、-）
    - 未定义元素DOM不作解析，属于 `HTMLUnknownElement` 对象
    - 而符合标准的自定义元素为 `HTMLElement`

```html
<my-element content="Custom Element">
  Hello
</my-element>
<script>
    class MyElement extends HTMLElement {   // 通过类定义自定义元素
        get content() {
            return this.getAttribute('content');
        }

        set content(val) {
            this.setAttribute('content', val);
        }
    }

    customElements.define('my-element', MyElement); // 注册自定义元素

    // 处理脚本
    function myElementHandler(element) {
        element.textContent = element.content;
        console.log(element.content)
    }

    Array.from(document.getElementsByTagName('my-element')).forEach(myElementHandler);
</script>
```

呈现结果为：
```html
<my-element content="Custom Element">
  Custom Element
</my-element>
```

#### 参考链接

- [mozilla: Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)
- [webcore: Custom Elements](https://www.webcomponents.org/)
- [Web Components 从入门到 「放弃」](https://juejin.cn/column/7140105636720836622)



## WebAssembly

WebAssembly（wasm）是一种低级虚拟机指令集，它是一种可移植、体积小、加载快、安全的二进制指令集，可以用来运行在现代 web 浏览器和其他环境中。

主要用于浏览器内的客户端应用提升性能

由以下三个部分组成：

- 二进制指令集：WebAssembly 定义了一种基于堆栈的指令集，类似于汇编语言。
- 编译器：将高级编程语言编译成 WebAssembly 代码。
- 运行时：负责解释和执行 WebAssembly 代码。

```js
const wasmCode = await fetch('example.wasm').then(response => response.arrayBuffer());
const wasmModule = await WebAssembly.compile(wasmCode);
const wasmInstance = await WebAssembly.instantiate(wasmModule);
const result = wasmInstance.exports.add(1, 2);
console.log(result); // 3
```



