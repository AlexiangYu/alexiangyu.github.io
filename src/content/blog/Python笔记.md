---
title: Python笔记
description: 'Write your description here.'
publishDate: 2024-05-18 20:29:55
tags:
  - 代码基础
---


## 基础

解释器

```py
s = "hello, python"
print(s)
```

#### 数据类型

- int
- float
- string

查看类型：`type(8963) = int_type`

`round(x, n)` 方法返回浮点数x保留`n`位小数的四舍五入值

**注解**

```py
a: int = 1
b: Union[int, float] = 1.2
```

联合类型注解：int 或 float


#### 标识符

命名只能出现：

1. 英文
2. 中文（不推荐）
3.  数字（不位于开头）
4. 下划线

- 不能是关键字
- **大小写敏感**

规范：
下划线_小写英文

#### 运算符

- // ：整除 `11/2 == 5`
- ** ：指数 `2**3 == 8`
- 可使用`a+=b`简写


## 字符串

定义方式： 单引号，双引号，三引号（支持换行）

**转义字符：** `\"` 引号解除引用

拼接：`+` 号

**格式化** `%s` 占位符

```py
age = 114514
name = "Tim"
message = "Today I am %d years elder than %s" %(age, name)"
```

快速写法 `f"内容{变量}"`：不限数据类型，不控制精度
 ```py
 name = "Alex"
 year = 1789
 print(f"我是{name}, 出生于{year}")
 ```

- `ord()` 字符转数字
- `chr()` 数字转字符

```py
>>>ord('a')
97
>>>chr(97)
'a'
```

#### 正则表达式

`re` 模块

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

- `re.match(pattern, string)` 匹配开头，成功返回匹配对象，否则返回None
- `re.search(pattern, string)` 匹配第一个
- `re.findall(pattern, string)` 匹配所有，返回列表
- `re.split(pattern, string)` 按pattern分割，返回列表
- `re.sub(pattern, repl, string)` 替换



## 输入/输出

中断，从键盘输入： `name = input("Enter your name:")`

#### 精度控制

`%m.nf` m：控制宽度；n控制小数精度，**四舍五入**。


## 条件/循环

bool数据类型：True/False

```py
b1 = True
print(type(b1))     # <class 'bool'>
```
比较运算符：==, !=, <, >=

逻辑否定: `if not A:`

#### if语句

格式（缩进）：
```py
a1 = int(input("Enter your age"))
if a1 >= 18:
    print("Adult only:")
    print(a1-18)
elif a1 > 80:
    print("Your are too old")
else:
    print("Your are too young")
```
多个组合：`elif`

#### while语句

```py
i: int = 1
while i < 6:
    print(i)
    i += 1
```

#### for语句

```py
slogan = "Free China"

for x in slogan:
    print(x)
```

range语句：
- `range(num)`: 序列, 从0到num-1的整数
- `range(num1, num2, step)`: 该序列从num1开始，到num2结束（不包括num2），步长为step．

```py
for i in range(1, 15, 2):
    print(i)

# 1
# 3
# 5
# 7
# 11
# 13
```
**临时变量作用域**: 循环外部也可以用, 有warning

#### 跳过/中断
- `continue` 中断, 进入下一次循环
- `break` 结束循环

```py
for i in range(1, 15, 2):
    if i == 9:
        continue
    print(i)
```


# 函数

#### 定义: 

```py
def function(x, y):
    body
    return n
    
    
one = function(a, b)
```
默认返回值: None, 类型: `<class 'NoneType'>` **假**

例子:
```py
def my_len(data):
    """
    求字符串长度的函数
    :param data: 传入参数字符串
    :return: 返回结果
    """
    n = 0
    for i in data:
        n += 1
    print(f"We have {n} letter(s) in {data}")
    return None


my_len("eraser")
print(type(my_len("administration")))
```

说明文档 **docstrings**: 多行注释,自动生成: `:param data:` `:return: `

函数内全局变量赋值: 用`globa`关键字

```py
num = 1


def my_function(): 
    global num
    num = 3
```

**多返回值**
```py
def func_test():
    return 1, 2

print(func_test())
# (1, 2)
```

**生成器**

yield: 惰性求值

```py
def count_up_to(n):  
    count = 1  
    while count <= n:  
        yield count  # 使用 yield 返回当前值  
        count += 1  

# 使用生成器  
counter = count_up_to(5)  
for number in counter:  
    print(number)
```

暂停并记住执行的状态，直到下一次迭代。


类型： `<class 'tuple'>`

## 多参数
- 位置参数：根据定义的参数个数、位置一致
- 关键字参数：key=value 无顺序 *args
- 参数缺省：定义默认值，**位置在最后**
- 不定长参数：
    - `*args`  一个元组
    - `**kwarg` 键值对 参数组成字典 
- 调用时：
    - `*容器` unpack成位置参数
    - `**容器` 字典 -> 关键字参数

```py
def func_test2(name, num, isTrue=True):
    print(f"Hello {name}, the num is {num} and it's {isTrue}")


func_test2("Tom", isTrue=False, num=114154)

func_test2("Jey", 11)


def func_test3(*args, **kwargs):
    print(f"The args is {args}, the K-W args is {kwargs}")


func_test3(1, 2, 3, stu_name="Alex", age=123)
```
例子：

```py
def Aniki(a, *b, **c):
    z = [a, b, c]
    print(z)
# a:一个位置参数 b:元组 c:所有键值对

Aniki(1, 2, "b", x="123", y="456")
# [1, (2, 'b'), {'x': '123', 'y': '456'}]
```

### 强制位参数

```py
def f(a, b, /, c, d, *, e, f):
    print(a, b, c, d, e, f)
```
形参 a 和 b 必须使用指定位置参数，c 或 d 可以是位置形参或关键字形参，而 e 和 f 要求为关键字形参

## 匿名函数

关键字 lambda **临时使用一次**

`引用 = lambda 参数列表:表达式`


```py
print(list(map(lambda x: x*x, [1, 2, 3, 4, 5])))
# [1, 4, 9, 16, 25]

print(reduce(lambda x, y: x + y, [1, 2, 3, 4, 5]))
# 15
```


### 闭包

在一个函数内部定义另外一个函数，并且把这个函数对象作为返回值

**需要使用外层函数的变量（包括参数）**

```py
def increment(n):
    return lambda x:x+n

f=increment(4)
print(f(10))    # 14
```

`nonlocal` 外部变量

### 装饰器

给函数增加新功能，不改变原函数

目标函数前 `@outer_decorator`

```py
def my_decorator(func):    # 装饰器函数
    def wrapper(*args, **kwargs):    # 装饰器包裹函数
        print("Before function call")
        result = func(*args, **kwargs)    # 调用被装饰函数
        print("After function call")
        return result
    return wrapper
    

@my_decorator    # 装饰器调用
def my_function(name):
    print(f"Hello {name}")


my_function("Tom")    # 输出 Before function call Hello Tom After function call
```

**多个装饰器**

```py
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper


def my_decorator2(func):
    def wrapper(*args, **kwargs):
        print("Before function call 2")
        result = func(*args, **kwargs)
        print("After function call 2")
        return result
    return wrapper


@my_decorator
@my_decorator2
def my_function(name):
    print(f"Hello {name}")


my_function("Tom")    # 输出 Before function call 2 Before function call Hello Tom After function call 2 After function call 2
```


## 数据容器

各种数据结构

#### 列表(list)

`my_list = ['Alex', 'Bob', True, [1, 2, 3]]`

- 元素可以**异类型**, 支持嵌套, **可重复**
- **有序**: 下标索引 0, 1, 2, 3……
- 下标索引(反向) ……-3, -2, -1

```py
print(my_list[1], my_list[-1][0])
# Bob 1
```

**方法**

1. **查询下标**: 返回索引, 不存在则报错
2. **修改元素**: 指定下标
3. **插入元素**: 指定下标, 指定元素
4. **追加**: 元素(容器)放到尾部 extend([29, 11])
5. **删除**: 
    - del
    - pop() 默认最后一个元素
    - remove(a) 从前到后, 仅删一个
6. **统计**: count(元素)
7. **统计总数**: len(my_list)
8. **清空**: clear()


```py
index = my_list.index("Alex")     # 0

my_list[0] = "Alice"

my_list.insert(2, "Charlie")

my_list.append('final')
my_list.extend(list2)
# ['Alice', 'Bob', 'Charlie', 2022, True, [1, 2, 3], 'final', 1949, 1989, 2019]

del list2[2]    # [1949, 1989]

elem = my_list.pop(3)    # 2022

my_list.remove(True)
# ['Alice', 'Bob', 'Charlie', [1, 2, 3], 'final', 1949, 1989, 2019]

list2.insert(1, 1989)
dup = list2.count(1989)    # 2

num = len(my_list)    # 8

my_list.clear()
# my_list == []
```

**迭代**

while循环:
```py
i = 0
while i < len(my_list):
    print(f"{i}: {my_list[i]}")
    i += 1
```

for循环(依次序): 
```py
for ele in my_list:
    print(ele)
```


#### 元组(tuple)

**不可修改**的list

`my_tuple = (1, "Hello", True)`

```py
t1 = tuple()
t2 = ((), )
```

- 但其中有list可以对内容赋值

```py
t3 = (1, "NM$L", ["Alex", "Bob"])
t3[-1][0] = "Alice"

print(t3)
# (1, 'NM$L', ['Alice', 'Bob'])
```

#### 字符串(string)

任意数量的字符 **不可修改**

`my_str = "fight for freedom" `

1. **替换**: replace("s0", "s1")   s0替换为s1，得到新字符串
2. **分隔**: split("s2") 以s2为间隔切分，装入list中
3. **规整**: strip(" ") 去除首尾空格/指定字符串
4. 查找子串出现次数
5. 获取长度


```py
my_str = "fight for freedom"

new_slogan = my_str.replace("for", "with")
print(new_slogan)
# fight with freedom 替换内容

str_list = my_str.split(" ")
print(str_list)
# ['fight', 'for', 'freedom']

print(my_str.strip('dom'))
# fight with free

```


#### 序列-切片

取出子序列：`序列[起始下标:结束下标:步长]`

步长为负：反向取
```py
str9 = "cdefgab"
print(str9[::2])
# cegb
```


#### 集合(set)

多个数据：无序 **去重** 可修改

`my_set = {"Alex", "Bob", "Alex"}`

1. **添加元素** add(el)
2. **移除** remove(el)
3. **随机取出** pop()
4. **清空** clear()
5. **取差集** set1.difference(set2) 得到新集合，为set1有 set2没有的
6. **交集** set1.union(set2)
7. 元素数量 len(my_set)
8. for 遍历

```py
my_set = {"Alex", "Bob", "Alex"}
set2 = {"Alex", "Bob", "Charlie"}
my_set.add(564)
print(my_set)

# element = my_set.pop()
# print(element)

print(my_set.difference(set2))

# my_set.difference_update(set2)
# print(my_set)

print(my_set.union(set2))


my_set.clear()
```



#### 字典(dict)

key-value **键值对** 

原生：通过key值找value **key唯一** 

`my_dict = {"Alex": 564, "Bob": 8963, "Charlie": 1918}`

value可嵌套

1. **新增/更新** dict['A'] = 123
2. **删除** pop('B')
3. **清空** clear()
4. **取全部key** keys() 是list
5. **遍历** for 

```py
my_dict = {"Alex": 564, "Bob": 8963, "Charlie": 1918}

print(my_dict["Alex"])
# 564

stu_dict = {"Alex": {"ch": 99, "Math": 101, "English": 120}, "Bob": {"ch": 101, "Math": 111, "English": 121}}
print(stu_dict["Alex"]["ch"])
# 99

my_dict["Daniel"] = 116
print(my_dict)
print(my_dict.pop("Alex"))
# 564

keys = list(my_dict.keys())

# 遍历字典
print(keys) # ['Bob', 'Charlie', 'Daniel']
for k in my_dict:
    print(f"{k}: {my_dict[k]}")
```

#### 容器通用操作

- **元素个数** len(my_list)
- **最大/小元素** max(my_dict)
- **类型转换** 不能转换成字典 list(my_set)
- **排序** sorted(my_list, [顺序])
    - 返回list
    - 降序 `reverse=True`

**zip() 函数**

将可迭代的对象中对应的元素打包成一个个元组，然后返回由这些元组组成的列表，长度与最短的对象相同。

```py
a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]

for i in zip(a, b, c):
    print(i)
# (1, 4, 7)
# (2, 5, 8)
# (3, 6, 9)
```

- `zip_longest(l1, l2, fillvalue = None)` 补全缺失值
- `unzip(l)` 解压序列为元组列表


**二分查找**

- `bisect.bisect()` 
- `bisect.bisect_right()` 返回大于x的第一个下标(相当于C++中的 `upper_bound`)
- `bisect.bisect_left()` 返回大于等于x的第一个下标(相当于C++中的 `lower_bound`)


```py
import bisect  

sorted_list = [1, 5, 9, 9, 9, 13, 17]
print(bisect.bisect(sorted_list, 9))    # 5
print(bisect.bisect_right(sorted_list, 9))  # 5
print(bisect.bisect_left(sorted_list, 9))   # 2
```



## 文件操作

#### 打开文件
open函数
```py
f = open('file_test', 'w', encoding='utf-8')
```

参数mode:
 - 'r': 只读，指针在文件开头
 - 'w': （创建）并写入，若文件不存在则覆盖
 - 'a': 追加，文件不存则创建


#### 读取

```py
s = f.read(10)
content = f.readlines() # 读取全部内容；一个列表，元素为每行内容
```
read()参数：
 - 数据长度（字节）
 - 缺省为全部读取

readlines()：
 1. 读取全部内容
 2. 一个列表，元素为每行内容

readline()
- 一次仅读一行

**for 循环读取**

```py
for l in open('./file_test', 'r'):
    print(l)
```
临时变量 `l`


#### 写入

flush 刷新缓冲区：主存->磁盘

```py
# f = open('./file_test', 'w', encoding='utf-8')
#
# for i in range(10):
#     f.write(f'hello world { i }\n')
# f.flush()
# f.close()

with open('./file_test', 'w', encoding='utf-8') as f:
    for i in range(20):
        f.write(f'hello world {i}\n')
```



#### 关闭
解除占用

`f.close()`

**with open 语法**

执行完自动关闭

```py
with open('./file_test', 'r', encoding='utf-8') as f2:
    f2.readlines()
```


## 捕获异常

try/except 语句

```py
try:
    '''执行的代码'''
except Exception as e:
    '''处理异常的代码'''
else:
    print("没有异常")
```

多个/特定异常：

```py
try:
    '''执行的代码'''
except Exception as e:
    '''处理异常的代码'''
else:
    print("没有异常")
finally:
    print("finished, goodbye")
```

顶级异常: **Exception**

从内向外传递，每层都可捕获


## 模块

 `import` 模块名


模块的名称：`__name__`内置变量


```py
if __name__ == '__main__':
    test(123)
```


限制可被 import * 的内容
```py
__all__ = ["mun", "b"]
```

package.module

具有__init__.py 的文件


#### collections

[文档](https://docs.python.org/zh-cn/3/library/collections.html#module-collections)

- Counter 计数器
    - dict的子类，可哈希对象的计数：从高到低的次数。
- defaultdict 默认字典：访问未定义的键时自动为其提供默认值。
- deque 双端队列：可以快速的在队列头部和尾部添加、删除元素。
- OrderedDict 有序字典

```py
my_list = ['apple', 'banana', 'apple', 'orange']  
counter = Counter(my_list)  
print(counter)  # 输出: Counter({'apple': 2, 'banana': 1, 'orange': 1})  


# 使用 int 的 defaultdict，默认值为 0  
int_dict = defaultdict(int)  

# 使用 list 的 defaultdict，默认值为空列表 []  
list_dict = defaultdict(list)  

# 使用 set 的 defaultdict，默认值为空集合 set()  
set_dict = defaultdict(set) 

list_dict['fruits'].append('apple')  # 添加到列表中  
print(list_dict)       # 输出: defaultdict(<class 'list'>, {'fruits': ['apple']})  

set_dict['colors'].add('red')  # 添加到集合中  
print(set_dict)       # 输出: defaultdict(<class 'set'>, {'colors': {'red'}})

d = [0, 1, 2, 3, 4, 5, 6]
d.rotate(2)            # 向右旋转 2 步  
# deque([5, 6, 0, 1, 2, 3, 4])

d2 = deque([1, 2, 3], maxlen=3)  # 添加元素，超过最大长度会自动删除最左边的元素  

d2.append(4)  # 添加 4  
print(d2)     # 输出: deque([2, 3, 4])，1 被删除
```


## 定义类

- 成员变量
- 成员方法 (self, )

**私有成员**：`__private_method` 两个下划线开头



#### 构造方法
内置的方法：魔术方法

赋值：自动执行
```py
def __init__(self, ):
    self.data = []
    self.name = name
```

重写str：一个对象成为`print()`函数参数输出的内容

print 输出的默认是内存地址

```py
def __str__(self):
     return f"This is a xxx object!"
```

重写对象之比较大小
- `__lt__`：<
- `__le__`：<=
- `__eq__`：==

#### 继承

可多继承
```py
class Derived(BaseClass1, BaseClass2):
# 父类方法名：左边最优先
```

`pass` 补全 空的代码块

可在子类中复写

调用父类成员：`super().method()` 或 `BaseClass.method(self)`

#### 多态

父类引用子类对象，调用子类方法






