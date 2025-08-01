---
title: React 中的闭包陷阱
description: 从 Hooks 源码看闭包陷阱
publishDate: 2025-07-29 18:46:03
tags:
  - web前端
  - React
---






## 第一步：构建一个“微型 React”


要从源码层面理解闭包陷阱，我们不必去啃 React 庞大而复杂的真实源码，只需要构建一个**极简的、符合其核心思想的 Hooks 实现**，就能把问题看得一清二楚。

> **免责声明：** 以下代码是一个**概念模型**，旨在揭示 React Hooks 的工作原理，并非 React 的真实源码。真实源码要复杂得多，涉及 Fiber、Scheduler 等。



想象一下，React 内部需要一个地方来存储所有组件的状态和 effect。我们可以用一个简单的对象来模拟它。

```javascript
// MyReact.js - 我们的“微型 React”实现

const MyReact = (function() {
  let hooks = [];      // 用一个数组存储所有 hooks 的数据
  let currentIndex = 0; // 当前正在处理的 hook 的索引

  return {
    // 渲染函数，每次组件执行时调用
    render(Component) {
      currentIndex = 0; // 每次渲染前，重置索引
      const C = Component();
      C.render();
      return C;
    },

    // useState 的“源码”实现
    useState(initialValue) {
      const hook = hooks[currentIndex] || { state: initialValue }; // 获取或初始化 hook
      
      // 关键点 1: setState 函数只在首次创建时定义
      // 它闭包了当前的 currentIndex，所以它永远知道要修改哪个 state
      const setState = (function() {
        let capturedIndex = currentIndex;
        return function(newState) {
          hooks[capturedIndex].state = newState;
          // 状态变更后，触发组件重新渲染（此处为模拟）
          console.log('--- 状态变更，触发重新渲染 ---');
          MyReact.render(Counter); 
        };
      })();

      hooks[currentIndex] = hook;
      currentIndex++;
      return [hook.state, setState];
    },

    // useEffect 的“源码”实现
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hook = hooks[currentIndex] || { deps: undefined }; // 获取或初始化 hook
      const oldDeps = hook.deps;

      // 检查依赖项是否发生变化
      let hasChanged = true;
      if (oldDeps) {
        hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
      }

      // 关键点 2: 只有在依赖项变化时，我们才更新 effect 的回调函数
      if (hasChanged || hasNoDeps) {
        hook.callback = callback;
        hook.deps = depArray;
        
        // 模拟在渲染结束后执行 effect
        setTimeout(hook.callback, 0); 
      }

      hooks[currentIndex] = hook;
      currentIndex++;
    }
  };
})();
```

## 第二步：使用“微型 React”运行有问题的代码

现在，我们用上面这个 `MyReact` 来运行之前那个有闭包陷阱的 `Counter` 组件。

```javascript
// Counter.js - 我们的业务组件

function Counter() {
  const [count, setCount] = MyReact.useState(0);

  MyReact.useEffect(() => {
    // 这个回调函数形成了一个闭包
    console.log(`Effect 创建，此时闭包捕获的 count 值为: ${count}`);
    
    setInterval(() => {
      console.log(`Interval 执行，闭包中的 count 仍为: ${count}`);
      setCount(count + 1);
    }, 2000);

  }, []); // 依赖项为空

  return {
    render: () => console.log(`DOM 渲染: count is ${count}`)
  };
}

// 开始首次渲染
console.log('--- 开始首次渲染 ---');
MyReact.render(Counter);
```

## 第三步：逐行分析源码层面的执行流程



**--- 开始首次渲染 ---**

1.  `MyReact.render(Counter)` 被调用。`currentIndex` 重置为 `0`。
2.  `Counter()` 函数开始执行。
3.  `MyReact.useState(0)`:
      * `currentIndex` 是 `0`。`hooks[0]` 不存在。
      * 创建一个新 hook `{ state: 0 }`。
      * 创建一个 `setState` 函数。这个函数闭包了 `capturedIndex = 0`。它被设计用来**永久地修改 `hooks[0]` 的状态**。
      * `hooks[0]` 被赋值为 `{ state: 0 }`。`currentIndex` 变为 `1`。
      * 返回 `[0, setState]`。此时组件内的 `count` 变量是 `0`。
4.  `MyReact.useEffect(()=>{...}, [])`:
      * `currentIndex` 是 `1`。`hooks[1]` 不存在。
      * `oldDeps` 不存在，因此 `hasChanged` 为 `true`。
      * **【陷阱核心】**：`hook.callback` 被赋值。这个 `callback` 函数是 `() => { setInterval(() => { setCount(count + 1) }, 2000) }`。它在被创建时，捕获了其作用域中的 `count` 变量，**这个 `count` 的值是 `0`**。
      * `hook.deps` 被赋值为 `[]`。
      * `hooks[1]` 被赋值。`currentIndex` 变为 `2`。
      * `setTimeout(hook.callback, 0)` 将这个 effect 的执行推到任务队列。
5.  `Counter()` 函数执行完毕。
6.  `C.render()` 执行，打印 "DOM 渲染: count is 0"。
7.  (稍后) `setTimeout` 执行 `hook.callback`，打印 "Effect 创建，此时闭包捕获的 count 值为: 0"。`setInterval` 被启动，它将每 2 秒执行一次 `setCount(0 + 1)`。

**--- 2秒后，Interval 第一次执行 ---**

1.  `setInterval` 的回调执行 `setCount(0 + 1)`，也就是 `setCount(1)`。
2.  `setState(1)` 函数被调用。它闭包里的 `capturedIndex` 是 `0`。
3.  它将 `hooks[0].state` 修改为 `1`。
4.  它触发 `MyReact.render(Counter)`，打印 "--- 状态变更，触发重新渲染 ---"。

**--- 开始第二次渲染 ---**

1.  `MyReact.render(Counter)` 被调用。`currentIndex` 重置为 `0`。
2.  `Counter()` 函数开始执行。
3.  `MyReact.useState(0)`:
      * `currentIndex` 是 `0`。`hooks[0]` **存在**，其值为 `{ state: 1 }`。
      * 直接返回 `[hooks[0].state, setState]`，也就是 `[1, setState]`。此时组件内的 `count` 变量是 `1`。
      * `currentIndex` 变为 `1`。
4.  `MyReact.useEffect(()=>{...}, [])`:
      * `currentIndex` 是 `1`。`hooks[1]` **存在**。
      * `oldDeps` 是 `[]`，新的 `depArray` 也是 `[]`。`hasChanged` 计算结果为 `false`。
      * **【陷阱核心】**：因为 `hasChanged` 是 `false`，if 语句块**不会执行**。这意味着 `hook.callback` **不会被更新**。它里面存储的依然是**第一次渲染时创建的、捕获了 `count = 0` 的那个旧函数**。
5.  `Counter()` 函数执行完毕。
6.  `C.render()` 执行，打印 "DOM 渲染: count is 1"。

**--- 4秒后，Interval 第二次执行 ---**

1.  **同一个 `setInterval`**（在第一次渲染时创建的）再次执行它的回调。
2.  这个回调的闭包里，`count` **依然是 `0`**！
3.  它再次执行 `setCount(0 + 1)`。
4.  `hooks[0].state` 已经是 `1` 了，再次设置为 `1` 不会引发状态变更（在真实 React 中是这样，我们的模拟会无限循环，但足以说明问题）。

## 源码揭示的真相

从这个简化的模型中，我们可以得出结论：

1.  **State 是持久化的，但组件内的变量不是**：`hooks` 数组存在于 React 的“后台”，它在多次渲染之间保持不变。但组件函数每次重新渲染时，内部的 `count` 这样的常量/变量都是一个全新的、独立的值。
2.  **Effect 与特定渲染绑定**：`useEffect` 创建的回调函数，本质上是属于**某一次特定渲染的产物**。它闭包了那次渲染的所有 props 和 state。
3.  **依赖项是“守卫”**：依赖项数组的作用就是告诉 React：“只有当这些值变化时，你才应该丢弃旧的 effect 回调，并用本次新渲染创建的新回调来替换它。”如果依赖项不变，React 会为了性能优化而**继续使用旧的、带有陈旧闭包的 effect 回调**。

这就是从源码角度看到的闭包陷阱：它不是一个 Bug，而是 React 基于函数式编程和不可变性思想设计的必然结果。为了保证渲染的纯粹性和可预测性，每一次渲染都有自己独立的“世界”，而 `useEffect` 默认就活在它被创建的那个“世界”里。





## 总结

This model reveals that the closure trap is a direct consequence of React's design. An effect is tied to the render that created it. The dependency array acts as a guard, telling React when it's safe to keep the old effect (and its stale closure) versus when it needs to be replaced with a new one that captures fresh values.