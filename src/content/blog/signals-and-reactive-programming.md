---
title: Signals and Reactive Programming
description: '从本质上讲，Signals 是一种响应式编程的基元（primitive）'
publishDate: 2025-08-04 21:38:25
tags:
  - Web前端
---



管理状态和依赖关系

```js
const [firstName, setFirstName] = createSignal("a");
const [lastName, setLastName] = createSignal("b");
const [showFullName, setShowFullName] = createSignal(true);

const displayName = createMemo(() => {  // createMemo ~ 计算属性
  if (!showFullName()) return firstName();
  return `${firstName()} ${lastName()}`
});

createEffect(() => console.log("名称：", displayName()));
// a b
setShowFullName(false);
// a
setLastName("c");
// nothging change
setShowFullName(true);
// a c
```


手动实现：观察者模式，当 Signals 更新时，Reactions 会订阅到数据变化从而更新数据。

```js
// context 包含Reactions中的执行方法和Signal依赖
const context = [];

const createSignal = (value) => {
  const subscriptions = new Set();
  const readFn = () => {
    const running = context.pop();
    if (running) {
      subscriptions.add({
        execute: running.execute
      });
      running.deps.add(subscriptions);
    }
    return value;
  };
  const writeFn = (newValue) => {
    value = newValue;
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
  };
  return [readFn, writeFn];
};

const [name, setName] = createSignal("a");
console.log(name());
setName("b");
console.log(name());
```


```js
const createEffect = (fn) => {
  const execute = () => {
    running.deps.clear();
    context.push(running);
    try {
      fn();
    } finally {
      context.pop(running);
    }
  };

  const running = {
    execute,
    deps: new Set()
  };
  execute();
};
```
