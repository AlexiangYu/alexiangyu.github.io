---
title: TS与ES6+
description: '前端进阶'
publishDate: 2024-09-12 16:16:26
tags:
  - web前端
---


## 运行

JavaScript 的超集，**面向对象**、类型检测等

```ts
class Greeting {
    constructor(public message: string) { }
    greet() {
        console.log(this.message);
    }
}

let g = new Greeting("Hello, world!");
g.greet();  // Output: "Hello, world!"
```

命令

```bash
tsc hello.ts    # 编译成js文件
node hello.js   
```

在node中运行
```bash
ts-node hello.ts
```

## 类型

数据类型 | 关键字 | 描述 | 示例
---|---|--- | ---
布尔值 | boolean | true/false | `let isDone: boolean = true`
数字 | number | 整数或双精度64位浮点数 | `let decimal: number = 6;`
字符串 | string | 文本 | `let greeting: string = "Hello, world!";`
任意值 | any | 可以赋予任意类型 | `let variable: any = "Hello, world!";`
空值 | void | 没有返回值的函数
Never | never | 会抛出异常或死循环的函数返回值
Null | null | 空对象引用
Undefined | undefined | 未定义的值
复杂类型 |
数组 | Array | 有序的集合，不限制长度、元素类型 | `let numbers: number[] = [1, 2, 3];`
对象 | Object | 任意属性的集合
函数 | Function | 接受参数并返回值
元组 | Tuple | 相比数组，有固定对应位置类型和长度 | `let tuple: [string, number] = ["hello", 123];`
枚举 | enum | 定义数值集合


### 类型别名

用 `type` 关键字，自定义一个（复杂）类型，方便重复使用。

```ts
type Person = {
    name: string;
    age: number;
}

let Alex: Person = {
    name: "Alex",
    age: 15
}
let Bob: Person = {
    name: "Bob",
    age: 20
}
```

#### 枚举类型

> 字面量类型：右值，表示一组固定的值 `const str2: 'Hello TS' = 'Hello TS'` 更高效（无需编译转换）

关键字 `enum`定义数值集合，可以用数字或字符串作为值
- 原理：将枚举类型编译成对象，对象属性名为枚举值，属性值为对应值

```ts
enum Direction { Up, Down, Left, Right }    // 定义枚举类型
function changeDirection(direction: Direction) {}    // 参数为枚举类型

changeDirection(Direction.Left) // call
```

编译后的代码：
```js
var Direction;
(function (Direction) {     // 自调用函数
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));  // Direction: { Up: 'UP', Down: 'DOWN', Left: 'LEFT', Right: 'RIGHT' }

function changeDirection(direction) {
    console.log("方向：" + direction);
}
changeDirection(Direction.Up);  // 方向：UP
```

#### 联合类型

通过管道 `|` 将变量设置多种类型，其中任意一种。

```ts
let arr: (string|number|boolean)[] = ["hello", 123, true]
arr.push("world");  // OK
arr.push(null);     // Error
```

#### 交叉类型

通过 `&` 将变量设置多种类型，所有类型都必须满足。

```ts
interface Person {
    name: string;
    age: number;
}

function greetPerson(person: Person & { gender: string }) {
    console.log(`Hello, ${person.name}! You are ${person.age} years old. You are a ${person.gender}.`);
}

let john: Person & { gender: string } = {
    name: "John",
    age: 30,
    gender: "male"
};

greetPerson(john);
```

同名属性类型冲突处理：视为联合类型

#### 类型断言

若自动推断出来的类型是 `number|undefined`，可以自己断言明确变量类型

将一个变量或表达式转换为另一种类型。

```ts
let someValue: any = "hello";
let strLength: number = (someValue as string).length;

// 转换 HTMLElement | null，获得href属性
const aLink = document.getElementById('link') as HTMLAnchorElement
consl.log(aLink.href)
```

#### 类型保护

通过 `typeof` 关键字，判断变量是否属于某种类型。

在类型上下位中，引用变量的类型

```ts
function isNumber(value: any): value is number {
    return typeof value === "number";
}

function add(x: number, y: number): number {
    if (isNumber(x) && isNumber(y)) {
        return x + y;
    } else {
        throw new Error("Both arguments must be numbers.");
    }
}
```


### 类型兼容性
一种类型的值是否可以被视为另一种类型的值？

> TS 属于Structural Type System（结构化类型系统）：
> 结构（属性和方法）相同的类型之间兼容

**对象/接口**：X是Y的子集 -> X兼容Y

```ts
class Point2D { x: number; y: number }
class Point3D extends Point2D { z: number }

const p1: Point2D = new Point3D()   // 成员多的可以赋值给少的

interface P2D { x: number; y: number }
let p2: P2D = new Point3D()   // 接口同理
```

**函数**：类型相同
- X参数比Y多 -> X兼容Y
- 返回值：同 对象的兼容性

```ts
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void
type F3 = () => { name: string }
type F4 = () => { name: string; age: number }

let f1: F1
let f2: F2 = f1

let f7: F7 = f8: F8
```


## 函数

**参数 + 返回值** 的类型

```ts
function add(x: number, y: number): number {
    return x + y;
}

const myAdd = (x: number, y: number): number => x+y;
```

#### 可选参数

参数名后添加 `?`，表示参数可选。

```ts
function greet(name: string, age?: number) {
    if (age) {
        console.log(`Hello, ${name}! You are ${age} years old.`);
    } else {
        console.log(`Hello, ${name}!`);
    }
}

// 默认参数
function greet2(name: string, age: number = 18) {
    console.log(`Hello, ${name}! You are ${age} years old.`);
}

greet("Alex", 30); // Hello, Alex! You are 30 years old.
greet("Ben");     // Hello, Ben!

greet2("Chloe"); // Hello, Chloe! You are 18 years old.
```

#### 剩余参数

```ts
function sum(...numbers: number[]) {
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
        result += numbers[i];
    }
    return result;
}
console.log(sum(1, 2, 3)); // Output: 6
```



## 对象

**属性 + 方法** 的类型

- 一行内写多个：加 `;` 分隔
- 方法可用箭头函数形式

```ts
let person: { name: string; age: number; sayHi: () => void; greet(name: string): void } = {
  name: 'Alex',
  age: 18,
  sayHi() {},
  greet(name) {}
}

// 可选属性
function myAxios(config: { url: string; method?: string }) {}
```



## 接口

为了给对象指定类型，实现复用。

```ts
interface IPerson { // 定义接口
  name: string
  age: number
  sayHi(): void
}

let person: IPerson = {
  name: 'Alex',
  age: 18,
  sayHi() {}
}
```

**接口和类型别名对比**

- 接口仅为对象指定类型
- 类型别名可以给任意（复杂）类型起别名

```ts
type IPerson = {    // 定义类型别名
  name: string
  age: number
  sayHi(): void
}
```

**抽象类和接口的区别**

- 继承：一个类只能继承一个抽象类，可以实现多个接口。
- 抽象类可以包含一些具体的方法（有实现），可以有构造函数和成员变量。接口（Interface）仅定义结构，不能包含任何实现。接口的所有属性和方法默认为抽象的，不能有构造函数。
- 接口不能使用访问修饰符，所有属性和方法默认是 public


## 类

不仅是class, 还作为一种类型存在

- `public` 默认，外部可访问
- `private` 私有，外部不可访问
- `protected` 受保护，外部不可访问，子类可访问
- `readonly` 只读属性，仅在构造函数中初始化赋值
    - 需供明确的类型
    - 接口中也能用
- `static` 静态属性，类中所有实例共享
- `abstract` 抽象类，不能实例化，子类必须实现抽象方法

声明成员方法： `sayHi (params) {xxx}` 不用关键字

存取器: `get` 和 `set` 方法，用于访问和修改属性

```ts
class Person {
  name: string // 默认不加的为public
  private age: number //私有成员，外部无法访问
  protected gender: boolean // 外部无法访问，子类可以访问
  readonly rid: number // 只能在构造函数中初始化

  constructor(name: string, age: number, rid: number) {
    this.name = name
    this.age = age
    this.gender = true
    this.rid = rid
  }
  sayHi(msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
  }
}

class Student extends Person {
  identity: string = 'student'
  constructor(name: string, age: number) {
    super(name, age)
    console.log(this.gender)
  }
}

let tom = new Student('tom', 15, 123)
console.log(tom)    // { name: 'tom', age: 15, gender: true, identity:'student', rid: 123 }
tom.sayHi('hello')  // Output: I am tom, hello
```

```ts
class Animal {
  static num = 0
  constructor(public name: string) {
    Animal.num++
  }
  eat() {
    console.log(`${this.name} is eating`)
  }
  abstract sleep(): void
}

class Dog extends Animal {
  sleep() {
    console.log(`${this.name} is sleeping`)
  }
}

let dog = new Dog('wangcai')
dog.eat()  // Output: wangcai is eating
dog.sleep()  // Output: wangcai is sleeping
console.log(Animal.num)  // Output: 1
```


#### 继承与实现

- `extends` 继承父类
- `implements` 实现接口

```ts
interface Singale {
  sing(): void
  name: string
}

class Prompt implements Singale {
  name = 'CNM'
  sing() {
    console.log('阿米诺斯')
  }
}
```

#### 方法拓展

- `Object.assign()` 合并对象
- `Object.create()` 创建对象
- `Object.getOwnPropertyDescriptor()` 获取属性描述符
- `Object.getOwnPropertyNames()` 获取所有属性名
- `Object.getOwnPropertySymbols()` 获取所有 Symbol 属性名
- `Object.getPrototypeOf()` 获取原型对象
- `Object.setPrototypeOf()` 设置原型对象
- `Object.is()` 判断两个值是否相等
- `Object.keys()` 获取对象所有可枚举属性名
- `Object.values()` 获取对象所有可枚举属性值
- `Object.entries()` 获取对象所有可枚举属性名和值
- `Object.fromEntries()` 从键值对数组创建对象

```ts
interface Person {
  name: string
  age: number
}

interface Student extends Person {
  grade: number
}

let person: Person = {
  name: 'Alex',
  age: 18
}

let student: Student = Object.assign(person, { grade: 3 })
console.log(student)  // Output: { name: 'Alex', age: 18, grade: 3 }

let obj = Object.create(null)
obj.name = 'Alex'
console.log(obj)  // Output: { name: 'Alex' }

let desc = Object.getOwnPropertyDescriptor(person, 'name')
console.log(desc)  // Output: { value: 'Alex', writable: true, enumerable: true, configurable: true }

let names = Object.getOwnPropertyNames(person)
console.log(names)  // Output: [ 'name', 'age' ]

let symbols = Object.getOwnPropertySymbols(person)
console.log(symbols)  // Output: []

let proto = Object.getPrototypeOf(person)
console.log(proto)  // Output: {}

let obj2 = { name: 'Alex', age: 18 }
Object.setPrototypeOf(student, obj2)
console.log(Object.getPrototypeOf(student))  // Output: { name: 'Alex', age: 18 }

console.log(Object.is(1, 1))  // Output: true
console.log(Object.is(1, '1'))  // Output: false

let obj3 = { name: 'Alex', age: 18, gender: 'female' }
let keys = Object.keys(obj3)
console.log(keys)  // Output: [ 'name', 'age', 'gender' ]

let values = Object.values(obj3)
console.log(values)  // Output: [ 'Alex', 18, 'female' ]

let entries = Object.entries(obj3)
console.log(entries)  // Output: [ [ 'name', 'Alex' ], [ 'age', 18 ], [ 'gender', 'female' ] ]

let obj4 = Object.fromEntries([['name', 'Alex'], ['age', 18]])
console.log(obj4)  // Output: { name: 'Alex', age: 18 }

type Excluded = 'name' | 'age'
type OmitPerson = Omit<Person, Excluded>
let person2: OmitPerson = {
  gender: 'female'
}
console.log(person2)  // Output: { gender: 'female' }

type Extracted = 'name' | 'age'
type ExtractPerson = Extract<Person, Extracted>
let person3: ExtractPerson = {
  name: 'Alex',
  age: 18
}
console.log(person3)  // Output: { name: 'Alex', age: 18 }

type NonNullablePerson = NonNullable<Person>
let person4: NonNullablePerson = {
  name: 'Alex',
  age: 18,
  gender: null
}
console.log(person4)  // Output: { name: 'Alex', age: 18 }
```


## 泛型

> 允许函数、类、接口、类型别名，实现复用，在定义时使用类型参数。

`<T>` 定义一个类型变量，调用时指定类型（可自动推断）。

```ts
function identity<T>(arg: T): T {
  return arg
}

let output = identity<string>('hello');
console.log(output)   // Output: hello

class Queue<T> {
  private data: T[] = []
  push(item: T) {
    this.data.push(item)
  }
  pop(): T | undefined {
    return this.data.shift()
  }
}

let queue = new Queue<number>()
queue.push(1)
queue.push(2)
queue.push(3)
console.log(queue.pop())  // Output: 1
console.log(queue.pop())  // Output: 2
console.log(queue.pop())  // Output: 3
console.log(queue.pop())  // Output: undefined
```


#### 约束

- 创建具有 `length` 属性的约束接口 `ILength`
- 函数的参数类型使用 `extends` 关键字添加约束，要求**返回类型 `T` 必须具有相应属性**
- 第二个类型变量 `Key`，受 `T` 约束，即只能是 `Type` 所有键中的任意一个，或者说只能访问对象中存在的属性


> `keyof` 关键字接收一个对象类型，生成其键名称（可能是字符串或数字）的联合类型

```ts
interface ILength { length: number }

function getLength<T extends ILength>(arg: T): T {
  console.log(arg.length)
  return arg
}

console.log(getLength('hello'))  // Output: 5
console.log(getLength([0, 1, 2]))  // Output: 3
console.log(getLength({ length: 4, name: 'Alex' }))  // Output: 4
console.log(getLength(123))  // Error: Type 'number' is not assignable to type 'ILength'.


function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}

getProp({ name: 'jack', age: 18 }, 'age')  // 18
getProp(18, 'toFixed')  // [Function: toFixed]
getProp('abc', 1)   // b
console.log('object'[1]) // Output: b
```


#### 泛型接口

- 添加类型变量 `<T>`，接口中所有其他成员可以使用 `T`
- 使用时需要显式指定

```ts
interface IArray<T> {
  push(item: T): void
  pop(): T | undefined
}

class Array<T> implements IArray<T> {
  private data: T[] = []
  push(item: T) {
    this.data.push(item)
  }
  pop(): T | undefined {
    return this.data.shift()
  }
}

let arr = new Array<number>()
arr.push(1)
arr.push(2)
arr.push(3)
console.log(arr.pop())  // Output: 1
console.log(arr.pop())  // Output: 2
console.log(arr.pop())  // Output: 3
console.log(arr.pop())  // Output: undefined
```

#### 泛型类

```ts
class Box<T> {
  private data: T
  constructor(data: T) {
    this.data = data
  }
  getData(): T {
    return this.data
  }
}

let box = new Box<string>('hello')
console.log(box.getData())  // Output: hello
```

### 工具类型

- `Partial<T>` 所有属性可选
- `Readonly<T>` 所有属性只读
- `Required<T>` 所有属性必填
- `Pick<T, K>` 选择属性 `K`
- `Omit<T, K>` 排除属性 `K`
- `Record<K, T>` 创建一个对象，其键为 `K`，值为 `T`
- `Exclude<T, U>` 从 `T` 中排除 `U`
- `Extract<T, U>` 提取 `T` 中存在于 `U` 的类型
- `NonNullable<T>` 排除 `null` 和 `undefined`
- `Parameters<T>` 获取函数参数类型
- `ConstructorParameters<T>` 获取构造函数参数类型
- `ReturnType<T>` 获取函数返回值类型
- `InstanceType<T>` 获取构造函数返回值类型
- `ThisType<T>` 用于 `this` 类型推断

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type Record<K extends keyof any, T> = {
  [P in K]: T
}

type Exclude<T, U> = T extends U? never : T
type Extract<T, U> = T extends U ? T : never

type NonNullable<T> = T extends null | undefined ? never : T

type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : never

type ThisType<T> = T extends infer R ? ThisType<R> : T
```


### 集合

es6新增
- 数据类型：Symbol
- 两种数据结构：Set、Map

symbol是为了标识唯一性



