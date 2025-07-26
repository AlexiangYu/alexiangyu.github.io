---
title: vue笔记
description: 'Write your description here.'
publishDate: 2024-07-25 10:47:32
tags:
  - web前端
  - Vue
---


## Vue2


### 组件通信


#### 父子组件通信

- 父 -> 子: props
- 子 -> 父: $emit

```html
<template>
	<div id="app">
		APP组件
		<!-- 向子组件添加属性来传值，监听自定义事件接收 -->
		<child :msg="msg" @update:msg="changeMsg"></child>
	<div>
</template>

<script>
import child from './child.vue'
export default {
  name: 'app',
  components: {
    child
  },
  data() {
    return {
      msg: 'Hello, parent!'
    }
  },
  methods: {		// 回调的方法，形参为传回的值
    changeMsg(newMsg) {
      this.msg = newMsg
    }
  }
}
</script>
```

```html
<template>
	<div>
		子组件
		<input type="text" v-model="msg"> 	<!-- 可直接使用props -->
		<button @click="changeMsg">更新父组件</button>	<!-- 触发父组件的事件 -->
	</div>
</template>

<script>
export default {
  name: 'child',
  props: {		// 通过props接收
    msg: {
      type: String,
      default: 'Hello, child!'
    }
  },
  methods: {
    changeMsg() {
      this.$emit('update:msg', this.msg)	// $emit + 事件名，传回的数据
    }
  }
}
</script>
```

#### eventBus: 任意组件传值

- 通过`this.$bus.$on`接收
- 通过`this.$bus.$emit`发送

```js
Vue.prototype.$bus = new Vue()

// 任意组件发送
this.$bus.$emit('update:msg', 'Hello, any component!')

// 接收
this.$bus.$on('update:msg', (newMsg) => {
  this.msg = newMsg
})
```

#### 一个祖先对任意后代注入

- provide: 向后代提供数据
- inject: 接收数据

```html
<template>
	<div id="app">
		ancestor组件
		<child></child>
	</div>
</template>

<script>
import child from './child.vue'
export default {
  name: 'app',
  components: {
    child
  },
  provide() {
    return {
      city: '北京'
    }
  }
}
</script>
```

```html
<template>
	<div>
		progeny组件
		<p>{{ city }}</p>	<!-- 直接使用inject的数据 -->
	</div>
</template>

<script>
export default {
  name: 'child',
  inject: ['city'],		// 注入provide的数据
  created() {
    console.log(this.city)	// 打印provide的数据
  }
}
</script>
```


### Vuex: 全局状态管理



## 指令


#### V-model封装原理

`:value` 与 `@input` 实现绑定属性+监听事件的语法糖。

```html
<input type="text" :value="msg" @input="msg = $event.target.value" />
```

子组件中数据在props中，不能直接用 `v-model`。但父组件中可 `v-model` 绑定。

```html
<template>
  <div class="app">
    <BaseSelect v-model="selectId"></BaseSelect>
  </div>
</template>

<script>
import BaseSelect from './components/BaseSelect.vue'
export default {
  data() {
    return {
      selectId: '102',
    }
  },
  components: {
    BaseSelect,
  },
}
</script>
```

```html
<select :value="selectId" @change="selectCity">
    <option value="101">北京</option>
    <option value="102">上海</option>
    <option value="103">武汉</option>
    <option value="104">广州</option>
    <option value="105">深圳</option>
</select>

<script>
export default {
  props: {
    selectId: String,
  },
  methods: {
    selectCity(e) {
      this.$emit('changeCity', e.target.value)
    },
  },
}
</script>
```

#### `.sync` 修饰符

父组件中使用`.sync`修饰符，实现双向绑定。

事件名为`update:xxx`。props值不必为`value`时使用。

```xml
<!-- isShow.sync  => :isShow="isShow" @update:isShow="isShow=$event" -->
<BaseDialog :visible.sync="isShow"></BaseDialog>
``` 

```js
inputChangeComp(e) {  // 子组件中
  this.$emit('update:visible', e.target.value)
},
```


#### 插槽

父组件中使用`<slot>`标签，子组件中使用`slot`属性，将内容插入到插槽位置。



**组件内使用ref获取元素/组件实例**

```js
import * as echarts from 'echarts'

export default {
  mounted() {
    // $refs只会在当前组件查找盒子，而querySelector 会查找项目中所有的元素
    // 等价于 var myChart = echarts.init(document.querySelector('.base-chart-box'))
    var myChart = echarts.init(this.$refs.baseChartBox)
    myChart.setOption({    // 绘制图表
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    })
  },
  template: '<div class="base-chart-box" ref="baseChartBox">子组件</div>',
}
```

**$nextTick**

需要等到dom更新后，才能获取元素的引用，使用`$nextTick`方法，在下一个事件循环开始时执行

```js
this.$nextTick(() => {  // 等待dom更新后，获取输入框的引用
  this.$refs.inp.focus();
})
// setTimeout(()=> {        效果相同
//   this.$refs.inp.focus();
// })
```




自定义指令

- 全局注册：`Vue.directive('xxx', {})`
- 局部注册：`directives: {}`


传递指令的值：`binding.value`
```js
export default {
  directives: {
    color: {
      inserted (el, binding) {
        el.style.color = binding.value
        console.log(binding.value)
      }
    }
  },
  template: '<div v-color="'red'">tex</div>'  // 指令的值为字符串格式
}
```




## Vue3 


**setup选项**

`<script setup>` 初始化

> `setup()` 返回暴露对象，需要 `return` 



### 响应式API

- `ref()`：接收简单类型或者对象类型的数据，返回响应式对象。
- `computed()`: 计算属性，返回计算结果。
- `watch()`: 观察数据变化，执行回调函数。
  - immediate: 创建时立即执行回调函数。
  - deep: 深度监听。ref复杂类型用。

```js
import { ref } from 'vue'

const count = ref(0)
const setCount = () => { count.value++ }

// 计算属性：依赖于响应式数据
const computedCount = computed(() => count.value * 2)

watch(count, (newValue, oldValue) => onsole.log(newValue, oldValue))

// 精确监听
const userInfo = ref({
  name: 'zs',
  age: 18
})
watch(() => userInfo.value.age, (newValue, oldValue) => console.log(newValue, oldValue))
```


**父子组件通信**

- `defineProps({name: String})`: 定义子组件接收的数据
- `defineEmits(['event1', 'event2'])`: 生成 `emit` 方法。



**模板引用**

可以获取dom，也可以获取组件

1. `const testRef = ref(null)`: 生成一个ref对象
2. `<TestCom ref="testRef"></TestCom>`: 通过ref标识绑定

```vue
<script setup>
import TestCom from '@/components/test-com.vue'
import { onMounted, ref } from 'vue'

const testRef = ref(null)
const getCom = () => {
  // 通过ref对象.value即可访问到绑定的元素(必须渲染完成后，才能拿到)
  console.log(testRef.value.count)
  testRef.value.sayHi()
}
</script>

<template>
  <TestCom ref="testRef"></TestCom>
  <button @click="getCom">获取组件</button>
</template>
```

- `defineExpose({name})`: 子组件向上暴露可引用的数据。

```js
const count = 999
const sayHi = () => {console.log('打招呼')}

defineExpose({ count, sayHi })
```


**跨层组件通信**

provide和inject: 祖先组件向子孙后代提供数据/方法。


- `provide('key', obj)`: 顶层组传递
- `const count = inject('key')`: 接收数据


**其他**

`defineOptions({name: String})`: 定义 Options API 的选项。`props`, `emits`, `expose`, `slot` 除外。

> 在自定义组件上使用v-model, 相当于传递一个modelValue属性，同时触发 update:modelVal

使用 `defineModel()` 获得的 `modelValue` 可直接需改。

```vue
<script setup>
import { defineModel } from 'vue'
const modelValue = defineModel()
</script>

<template>
<div>
  <input 
    type="text" 
    :value="modelValue" 
    @input="e => modelValue = e.target.value"
  >
</div>
</template>
```


### Pinia

状态管理库，无 `mutation`，独立 `store`。


- `defineStore(id, ()=>{ })`: 创建一个 Pinia 仓库。
- 组合式函数：定义了一些响应式属性和方法，返回要暴露的内容。
- `storeToRefs()`: 解构出响应式对象。
- action可直接解构。

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

组件中使用：

```vue
<script setup>
import { useCounterStore } from '@/store/counter'
const counterStore = useCounterStore()
</script>

<template>
  <div>
    x2倍count - {{ counterStore.doubleCount }}
    <button @click="counterStore.increment">+</button>
  </div>
</template>

<style scoped>
</style>
```


持久化：`pinia-plugin-persistedstate` 模块store中配置。

