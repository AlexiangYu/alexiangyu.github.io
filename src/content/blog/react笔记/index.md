---
title: React笔记
description: 'React学习笔记'
publishDate: 2024-08-21 22:43:01
tags:
  - web前端
  - React
---



**Thinking in React**

声明式+组件化+跨平台

## JSX

语法扩展：js代码中编写HTML模板。可以被编译成JavaScript函数。

- `{ }` 表达式插值
- 外层仅识别一对标签: 引入`Fragment`

```jsx
function App() {
  const list = [
    { name: "apple", price: 10 },
    { name: "banana", price: 20 },
    { name: "orange", price: 30 },
  ];

  return (
    <div>
      <ul>
          <li key={list.id}> { list.map((item, index) => <li key={index}>{item.name} - {item.price}</li>) }</li>
      </ul>
    </div>
  );
}
```

**Babel 转译**： React.createElement() 函数调用

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
)
// 得到的 React元素
// {
//   type: 'h1',
//   props: {
//     className: 'greeting',
//     children: 'Hello, world!'
//   }
// };
```

#### 事件处理

命名：`on` + 事件类型，如 `onClick` 

可以传递参数、事件对象

```jsx
function App() {
  const handleClick = (e, name) => {
    console.log("clicked");
  };

  return (
    <div>
      <button onClick={(e) => handleClick(e, "apple")}>Click me</button>
    </div>
  );
}
```


#### 样式

class类名控制：`className` 需导入

```jsx
// import './foo.css';
<span className="foo">This is a span</span>
```

支持 CSS Modules 语法：`import styles from './foo.module.css';`

CSS in JS：`style={{ backgroundColor: 'red' }}`

#### 获取DOM节点

- `useRef()`：获取ref的引用
- `ref` 属性：组件实例的 DOM 节点
- `inputRef.current`：在js中DOM节点的引用

```jsx
import React, { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}
```



## 状态管理

hook函数：`useState()`

为组件添加状态：`const [count, setCount] = useState(0);` 

- `count` 只读的状态变量
- `setCount` 更新状态的函数

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => { setCount(count + 1) };

  const handleDecrement = () => { setCount(count - 1) };
  // 计数器组件
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```

对象类型状态修改：展开+赋值

表单双向绑定：`value` + `onChange`

```jsx
function App() {
    const [value, setValue] = useState(0)
    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <h1>{value}</h1>
        </div>
    )
}
```

#### Ref / State 与普通变量的区别


特性 |	普通变量 (let / const) |	useRef |	useState	| Props
--- | --- | --- | --- | --- |
跨渲染保持值 |	❌ 不能 (每次都重置) |	✅ 可以 |	✅ 可以 |	...
改变值触发重新渲染 |	❌ 不能 |	❌ 不能 |	✅ 可以 |	✅ 可以
如何访问/修改 |	直接访问/赋值 |	通过 .current 属性 |	value, setValue() |	父组件传递


- `Ref`: 跨越多次渲染而存在，但它的改变不应该引起界面刷新，或者需要直接操作 DOM




#### 解决闭包陷阱

异步操作的回调函数形成了一个闭包，捕获了创建时的上下文，之后却无法再更新。

-  `useRef()` 创建的 `.current` 属性是最新的状态引用

```jsx
  const [text, setText] = useState('');
  const textRef = useRef(text);

  function handleSend() {
    setTimeout(() => {
      alert('正在发送：' + textRef.current);
    }, 3000);
  }
```


## 组件

使用函数的定义，首字母大写

返回一个 JSX 元素 （最终渲染的结果）。


```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="World" />
      <Greeting name="React" />
    </div>
  );
}
```

类组件：

- `constructor(props)`：构造函数，接收 props
- `render()`：返回 JSX 元素

属性

- `props`：父组件传递给子组件的属性
- `state`：组件自身的状态，可通过 `this.setState()` 更新

```jsx
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }

  render() {
    return <h1>Hello, {this.state.name}!</h1>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Greeting name="World" />
        <Greeting name="React" />
      </div>
    );
  }
}
```



## 组件通信

- `props`：父组件 -> 子组件
  - `props.children`: 接收插槽内容: jsx
- 回调函数：子组件 -> 父组件

```jsx
const MsgContext = createContext()

function Parent() {
    const [name, setName] = useState("John");

    const handleClick = () => {
      setName("Mike");
    };
  
    return (
      <div>
        <Child name={name} onClick={handleClick}>From Parent</Child>
      </div>
    );
  }
  
  
function Child({ name, onClick, children }) {   // 解构接收 props
  const msg = useContext(MsgContext)     // 接收 context 上下文内容
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button onClick={onClick}>Change name</button>
      <h3>{children}</h3>
      <h2>{msg}</h2>
    </div>
  );
}

export default function App() {
    return (
        <div>
            <MsgContext.Provider value="YzxNmsl"> <Parent/> </MsgContext.Provider>
        </div>
    )
}
```

#### context机制 

共享状态，向后代传递数据，通过 `context` 接收。

多级穿透

- `const Ctx = createContext()`：创建上下文对象
- `<Ctx.Provider value="xxx"> </Ctx.Provider>`：祖代 提供上下文
- `const msg = useContext(Ctx)`: 后代 获取上下文


**向子组件批量添加属性**

通过 `React.cloneElement` 方法复制该子组件，添加共享属性并返回

```jsx
const SizeWrapper = ({ commonProps }) => {  
  return
    <div>  
      {  
        React.Children.map(children, (child) => {  
          if (child && child.props) {  
            return React.cloneElement(child, commonProps);  
          }  
          return child;  
        })  
      }  
    </div>
}
```

等价于所有子组件都添加了 `size={props.size}` 属性

```jsx
<SizeWrapper size={props.size}>
  <Input value="input" />
  <InputTag value={['input-tag']} />
  <InputNumber value={100} />
  <Button type="primary">Primary</Button>
</SizeWrapper>
```

#### ref转发

通过 `forwardRef` 转发ref，让外部组件能够访问 `FormComponent` 中的方法。


```jsx
const FormComponentWithRef = React.forwardRef((props, ref) => {     // 转发 ref  
    const [formInstance] = Form.useForm();    // Antd Form

    // 给 ref 添加 change, clear 方法
    useImperativeHandle(ref, () => ({  
        change: () => formInstance.setFieldsValue(newValue),  
        clear: () => formInstance.clearFields(['username', 'email']),  
    }));  

    return (  
        <Form form={formInstance}>  
            <FormItem label="Username" field="username">  
                <Input placeholder="please enter your username..." />  
            </FormItem>
            <FormItem label="Email" field="email">  
                <Input placeholder="please enter your email..." />  
            </FormItem>
        </Form>  
    )
})
```

外层组件中可调用 `change`, `clear` 方法

```jsx
const FormWrapper = () => {  
    const formRef = useRef(null);  
    
    return (
        <div>
            <div>
                <b>Wrapper Operations:</b>
                <Button onClick={() => formRef.current?.change()}>
                    Change
                </Button>
                <Button onClick={() => formRef.current?.clear()}>
                    Clear
                </Button>
            </div>
            <FormComponentWithRef ref={formRef} />
        </div>
    )
}
```

**React19不再需要**

```jsx
function MyInput({ref}) {
  return <input ref={ref} />
}

//...
<MyInput ref={ref} />
```



**关于组件挂载位置**

如果传入 `container`，则渲染到指定容器中，否则渲染到组件树中。

```jsx
import { createPortal } from 'react-dom'

function CustomButton(props) {
    const { container, color } = props

    const DemoButton = <Button>{color} - 按钮</Button>

    const containerElem = useMemo(() => {
        return container?.()
    }, [container])

    if (containerElem) {
        return createPortal(DemoButton, containerElem)
    }

    return DemoButton
}
```

React-DOM 提供了 `createPortal` 方法，可以将子组件渲染到指定 DOM 节点中。

portal 内触发的事件，会冒泡到 React 组件树的祖先，而不是实际 DOM 树上。



#### 生命周期

- `componentDidMount()`：组件挂载后执行
- `componentWillUnmount()`：组件卸载前执行
- `componentDidUpdate(prevProps, prevState)`：组件更新后执行

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}
```









## 钩子

- `useState()`：状态钩子
- `useEffect()`：副作用钩子
- `useContext()`：上下文钩子
- `useReducer()`：自定义 reducer 钩子
- `useCallback()`：回调钩子
- `useMemo()`：缓存钩子
- `useRef()`：ref 钩子
- `useImperativeHandle()`：自定义暴露钩子
- `useLayoutEffect()`：布局钩子

仅保存，不需要重渲染的数据可用 `useRef()`

#### useEffect

副作用钩子，仅在特定条件下执行：

> `Effect`：React 中的专有定义——**由渲染引起的副作用**——渲染后需执行的操作。

1. 接收一个函数，创建副作用操作，函数中可以有异步操作（发送AJAX请求，更改DOM等），可以返回一个清除副作用的函数。
2. 传入依赖项指定执行时机：

| **依赖项** | **副作用功函数的执行时机** |
| --- | --- |
| 没有依赖项 | 组件初始渲染 + 组件更新时执行 |
| `[]` | 只在初始渲染时执行一次 |
| `[prop1, prop2]` | 组件初始渲染 + 当 `prop1` 或 `prop2` 变化时执行 |


```jsx
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```

> React 总是在执行下一轮渲染的 Effect 之前清理上一轮渲染的 Effect。


#### useMemo

缓存钩子，缓存昂贵的计算结果，避免重复计算。

> 被 React Compiler 自动处理？

```jsx
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行 getFilteredTodos()
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```



#### useReducer

- 自定义 reducer 钩子
- 接收 reducer 函数和初始状态
- 返回当前状态和 dispatch 方法
- 可以通过 dispatch 方法触发 reducer 函数，更新状态


```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state.count + 1
    case "decrement":
      return state.count - 1
    case "update":
      return action.payload
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() -> dispatch({ type: "increment" })}>+</button>
      <button onClick={() -> dispatch({ type: "decrement" })}>-</button>
      <button onClick={() -> dispatch({ type: "set", payload: 10 })}>update to 10</button>
    </div>
  );
}
```




**自定义Hook**

```jsx
function useToggle() {
    const [isToggled, setIsToggled] = useState(false)
    const toggle = () => setIsToggled(prev =>!prev)
    return [isToggled, toggle]
}

function App() {
    const [isToggled, toggle] = useToggle()
    return (
        <div>
            <h1>{isToggled ? "ON" : "OFF"}</h1>
            <button onClick={toggle}>Toggle</button>
        </div>
    )
}
```


## Redux/RTK

集中状态管理工具

1. 定义 `reducer` 函数，接收 `state` 和 `action` 对象，返回新的 `state` 变化规则
2. 创建 `store` 对象：使用 `createStore()`，传入 `reducer` 函数
4. 使用 `store.subscribe()` 订阅 `state` 数据：变化时得到通知
3. 使用 `store.dispatch()` 提交 `action` 对象，触发 `reducer` 函数更新 `state`
5. 使用 `store.getState()` 获取 `state`

```jsx
import { createStore } from "redux"

const initialState = { count: 0 }

function reducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer)

function App() {
  const [state, dispatch] = useStore(store);

  const handleIncrement = () => {
    dispatch({ type: "increment" });
  }

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  }

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>      
    </div>
  )
}
```

reducer 为纯函数 -> 处理 action 副作用



#### 使用 `React Toolkit`

`react-redux`

- `xxStore` 模块：
  1. `createSlice()` 传入`name`, `initialState`, `reducers` 参数，创建 `xxStore` 对象
  2. 异步操作：导出单独封装的函数，返回相应异步操作，即 `action`
  3. 导出 从 `xxStore.actions` 解构出来的actionCreater函数
  4. 默认导出 reducer `xxStore.reducer`
- store的 `index` 入口文件：
  1. `configureStore` 将所有模块的 `reducer` 合并成根`store`，统一导出
- 在项目 `index.js` 中，将`store`注入React：
  1. 导入 `Provider`, `store`
  2. `<Provider store={store}> <App /> </Provider>`：为所有组件提供 `Redux store`
- 组件中使用
  1. `useSelector()` ：从 `store` 中获取 `state`
  2. `useDispatch()` ：获取 `dispatch` 函数，用于提交 `action`


```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({  // 使用 createSlice 定义 state, actions, 和 reducer
  name: 'counter', // 切片名称，会用作 action type 的前缀
  initialState: { value: 0 },
  // 定义 reducers，key 会成为 action 的一部分
  reducers: {
    increment: (state) => { // 内置 Immer，可以直接修改 state      
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions; // 自动生成的 Action Creators

const counterReducer = counterSlice.reducer;

const store = configureStore({
  reducer: {
    counter: counterReducer, // 将 slice 的 reducer 组合到根 reducer 中
  },
});
```
中间件，使用 thunk 实现异步操作


```jsx
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.counter.value); // 从 store 中获取 state
  const dispatch = useDispatch(); // 获取 dispatch 函数

  const handleIncrement = () => {
    dispatch(increment()); // 触发 action
  }

  const handleDecrement = () => {
    dispatch(decrement());
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  )
}
```

#### 异步状态管理

`createAsyncThunk` (Redux Toolkit) 会自动为你生成并 dispatch 三种不同状态的 action：`pending` / `fulfilled` / `rejected`

第一步：创建异步 Thunk

在 slice 文件 (e.g., userSlice.js) 中:

```jsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserById } from './userAPI'; // 假设这是一个调用API的函数

// 1. 创建 async thunk
// 第一个参数是 action type 的前缀: 'users/fetchById'
// 第二个参数是一个返回 Promise 的 "payload creator" 函数
export const fetchUser = createAsyncThunk(
  'users/fetchById',
  async (userId, thunkAPI) => {
    // 这里是你的异步逻辑
    const response = await fetchUserById(userId);
    return response.data; // 这个返回值会成为 fulfilled action 的 payload
  }
);
```

第二步：在 Slice 中处理异步 Action

```jsx
const userSlice = createSlice({
  name: 'users',
  initialState: {
    entity: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // 这里放同步的 reducers
  },
  // 2. 在 extraReducers 中处理 createAsyncThunk 生成的 actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entity = action.payload; // action.payload 就是异步函数的返回值
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

`extraReducers` 是专门用来处理由 `createSlice` 外部定义的 action `的地方，createAsyncThunk` 生成的 action 就属于这种情况。

第三步：在组件中 Dispatch


```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './userSlice';

function UserProfile({ userId }) {
  const dispatch = useDispatch();
  const { entity, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    // dispatch 这个 async thunk action
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return <div>Welcome, {entity?.name}</div>;
}
```

手动编写 Thunk

```jsx
const fetchUserManually = (userId) => async (dispatch, getState) => {
  try {
    dispatch(userLoading());
    const response = await fetchUserById(userId);
    dispatch(userSuccess(response.data));
  } catch (error) {
    dispatch(userFailed(error.message));
  }
};
```




## ReactRouter

> `react-router`: 核心库，适用于多种环境，自定义路由的基础功能。而
> `react-router-dom` 是扩展库，专为浏览器环境设计，提供了许多网址导航功能，适合 Web 应用程序使用。


- 声明式导航：`<Link to="/about">About</Link>` 组件
- 编程式导航：`const navigate = useNavigate()` 钩子，得到导航方法


#### 路由模式

- `BrowserRouter`：浏览器历史记录模式
- `HashRouter`：hash 路由模式

| 路由模式 | url表现 | 底层原理 | 创建函数 | 是否需要后端支持 | 使用场景 |
| --- | --- | --- | --- | --- | --- |
| history | url/login | HTML的History接口，关于会话历史记录 | `createBrowserHistory()` | 需要 | 现代 SPA 应用 |
| hash | url/#/login | 监听hashChange事件 | `createHashHistory()` | 不需要 | 静态页面如 GitHub Pages |



#### 嵌套路由

1. 使用 `children` 属性配置路由嵌套关系  
2.  二级路由渲染位置: `<Outlet/>` 组件


微前端？




## 架构解析


### Fiber

React 16版本对虚拟DOM的升级，解决DOM树更新效率问题。

拆分渲染任务，将渲染任务分解成更小的任务，并将任务存储在一个队列中，React可以根据优先级和时间分配资源，最大限度地提高渲染效率。

每个Fiber都代表了一个工作单元，React可以在处理任何Fiber之前判断是否有足够的时间完成该工作，并在必要时中断和恢复工作。



#### 工作单元

- 任务：渲染一个组件
- 工作单元：包含一个任务，包括组件类型、props、状态、子节点等信息
- 工作单元队列：包含多个工作单元，React会按顺序执行每个工作单元



### 更新流程

- Scheduler：调度器，维护时间切片，管理工作单元队列，根据优先级和时间分配资源
- Reconciler：协调器，负责对比新旧虚拟DOM树，计算出最小更新范围，并根据更新范围更新DOM树
- Renderer：渲染器，负责将虚拟DOM渲染成真实DOM树

比较 `current Tree` 和 `workInProgres Tree`：



