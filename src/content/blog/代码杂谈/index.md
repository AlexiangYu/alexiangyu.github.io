---
title: 代码杂谈
publishDate: 2024-11-06 12:03:14
description: 总结编程范式、函数式编程、编译与解释、前端设计、正则表达式等。
tags:
  - 代码基础
---


## 编程范式

- 命令式编程：语句为基本单位，执行指令的步骤。
    - 面向过程：自顶向下、过程结构化。以函数、过程、模块为基本特征。
    - 面向对象：便于修改和扩展，以类、继承、多态、依赖注入为基本特征。（五大原则）
- 声明式编程：以数据为中心，以表达式为基本单位，以声明式的方式描述程序。
    - 函数式：函数是第一公民，使用纯函数、闭包、Factor、柯里化等。
    - 响应式：以数据流为中心。以异步、事件驱动、数据流驱动的方式编程。




## 函数式编程

e.g. 把运算过程定义为不同的函数

```js
let res = subtract(multiply(add(1,2), 3), 4);
```

1. 函数被视为一等公民
2. 只使用表达式、把I/O限制到最小
3. 不可变性、无状态
4. 纯函数
5. 引用透明



### 函子（Functor）

定义：一个函子是一个容器，里面封装了一个值，并提供一个映射函数。可以把一个函数作用到容器里面的值上，得到一个新的容器。

```js
class Num{
    constructor (v) {
        this.value = v
    }      
//    add5 () {
//        return  new Num( this.value + 5)
//    }
    map (fn) {
        return new Num(fn(this.value))
    }
}

let add5 = x => x + 5
let double = x => x * 2

var num = new Num(2)
num.map(add5).map(double)   // 14
```

封住了一个方法 `Functor.of` 用来创建 `Functor` 实例。

```js
class Functor{
    constructor (value) {
        this.value = value ;
    }      
    map (fn) {
        return Functor.of(fn(this.value))
    }
}
Functor.of = function (val) {
     return new Functor(val);
}

Functor.of(5).map(add5).map(double)
```







## 编译与解释

指令 -> 机器语言

`x+y` -> 词法分析(lexer) -> Token: `[x, +, y]` -> 语法分析(parser) -> AST: `[+, [x, y]]` -> 语义分析(semantic analysis) -> `[+, [Num(2), Num(3)]]` -> 解释/代码生成 -> `Num(5)` -> 运行

- Parser_LL(1)：左递归下降解析器
- Parser_LR(1)：线性规约解析器
- Parser_LALR：预测分析表法




## 前端设计

明暗模式切换：less 变量，设定全局属性


```js
if (newTheme === 'dark') 
    document.body.setAttribute('arco-theme', 'dark');
else 
    document.body.removeAttribute('arco-theme');
```


`ConfigProvider` 组件：全局默认配置，包括主题、国际语言、尺寸等。

#### lodash

- 工具函数库
- 集合处理
- 数组处理







## 其他



### 正则表达式

匹配字符串模式的工具，可以用来查找、替换、验证和拆分文本。

```py
import re

s = "pytpyppyyyppy"
res = re.findall("py", s)
print(res, len(res))         # ['py', 'py', 'py', 'py'] 4
print(re.match("py", s))     # <re.Match object; span=(0, 2), match='py'>

r = '^[0-9a-zA-Z]{6,10}$'
s = '12345666'
print(re.findall(r, s))      # ['123456']

r_mail = r'(^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$)'    # 匹配邮箱
print(re.match(r_mail, 'xxx@sb.com'))     # <re.Match object; span=(0, 10), match='xxx@sb.com'>
print(re.match(r_mail, 'abc@com'))        # None
```

**元字符**

单字符：
- `.`：匹配任何单个字符，除了 `\n`。
- `[]`：括号中的任何单个字符。例如，`[abc]` 匹配 `a`、`b` 或 `c`。
- `^`：脱字号，表示其以外的字符。例如，`[^abc]` 匹配除了 `a`、`b` 和 `c` 以外的任何字符。
- `\d`：任意数字，等价于 `[0-9]`。
- `\D`：任意非数字字符，等价于 `[^0-9]`。
- `\s`：任意空白字符，等价于 `[\t\n\r\f\v]`。
- `\S`：任意非空白字符，等价于 `[^\t\n\r\f\v]`。
- `\w`：任意字母、数字或下划线，等价于 `[a-zA-Z0-9_]`。
- `\W`：任意非字母、数字或下划线字符，等价于 `[^a-zA-Z0-9_]`。

边界匹配：
- `\b`：单词边界，`\w` 和 `\W` 之间的位置。
- `\B`：非单词边界。
- `^`：行首。
- `$`：行尾。

分组匹配：
- `|`：或。
- `(...)`：捕获组。
- `(?:...)`：非捕获组。
- `(?P<name>...)`：命名组。
- `(?#...)`：注释。
- `(?=...)`：肯定预测先行断言。
- `(?!...)`：否定预测先行断言。
- `(?<=...)`：正向肯定回顾预测。
- `(?<!...)`：正向否定回顾预测。
- `(?imx)`：设置匹配模式，`i` 忽略大小写，`m` 多行模式，`x` 忽略空白。
- `(?-imx)`：取消匹配模式。
- `(?#...)`：注释。

数量匹配：
- `*`：匹配零个或多个。
- `+`：一个或多个。
- `?`：零个或一个。
- `{m}`：出现m次。
- `{m,}`：至少出现m次。
- `{m,n}`：m到n个。
- `{m,n}?`：m到n个，非贪婪模式。

```py
print(re.findall(r'g[a-z]+d', str))     # ['gadxxgodwwgeed']
print(re.findall(r'g[a-z]+?d', str))    # ['gad', 'god', 'geed']
```

非贪婪匹配：`[a-z]+?`，限定符后面加上问号 `?`，表示匹配尽可能少的字符。

修饰符：
- `re.I`：忽略大小写。
- `re.M`：多行模式。
- `re.S`：匹配任意字符，包括换行符。
- `re.X`：使用更加精细的语法。


```py
import re

# 匹配数字
pattern = r'\d+'
result = re.findall(pattern, '123 456 789')
print(result)  # ['123', '456', '789']

# 匹配中文
pattern = r'[\u4e00-\u9fa5]+'
result = re.findall(pattern, '你好，世界！')
print(result)  # ['你好', '世界']

# 匹配邮箱
pattern = r'\w+@\w+\.\w+'
result = re.findall(pattern, 'abc@123.com def@456.com')
print(result)  # ['abc@123.com', 'def@456.com']

# 匹配日期
pattern = r'\d{4}-\d{2}-\d{2}'
result = re.findall(pattern, '2021-10-10 2022-01-01')
print(result)  # ['2021-10-10', '2022-01-01']
```





