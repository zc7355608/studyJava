# Vue3

------

- ### Vue3简介

  > 2020年9月18日，Vue发布3.0版本，代号：One Piece（海贼王）。共耗时2年多、2600+次提交、30+个RFC、600+次PR、99位贡献者。

- ### Vue3相比于2的优势

  1. 性能的提升：

     - 代码打包后的体积减小41%。

     - 初次渲染快55%，更新渲染快133%。

     - 内存减少54%。

       ....

  2. 源码的升级：使用Proxy代替defineProperty实现响应式、重写虚拟DOM的实现和Tree-Shaking、...

  3. 拥抱TS：Vue3可以更好的使用TypeScript。

  4. 新的特性：

     1. 组合式API：setup配置、ref与reactive、watch和watchEffect、provide与inject、...
     2. 新的内置组件：Fragment、Teleport、Suspense、...
     3. 其他的改变：新的声明周期钩子、data配置项应始终用函数写法、移除keyCode作为v-on的修饰符、...

- ------

-   ### 创建Vue3项目

    - 方式1：通过Vue脚手架创建（确保`@vue/cli`在4.5.0以上）
    
    - 方式2：使用Vite创建。
    
      > Vite是新一代的前端打包工具。官网：https://vitejs.cn/vite3-cn/guide/，它相较于Webpack的优势：
      >
      > - 开发环境中，无需打包操作，可以快速的冷启动。
      > - 更轻量快速的热重载（HMR）。
      > - 真正的按需编译，不再等待整个应用编译完成。
      >
      > 传统构建与Vite构建对比图：
      >
      > ![image-20240826220952910](C:\Users\22737\Desktop\studyJava\vue\assets\image-20240826220952910.png)
      >
      > ![image-20240826221002655](C:\Users\22737\Desktop\studyJava\vue\assets\image-20240826221002655.png)
    
      1. `npm create vite@latest 项目名 -- --template vue`（需要NodeJS版本16+，npm7+）
      2. cd进入工程目录后安装依赖：`npm i`，然后运行项目：`npm run dev`。
    
      ###### Vite创建的Vue工程和脚手架不太一样，不过我们不关心。我们接下来还用脚手架的方式来创建Vue工程。

- ### 关于Vue3项目的目录结构

  > Vue Cli创建的Vue3项目的目录结构和文件和2是类似的，唯一不同的是入口文件的写法。在src/main.js中：

  ```js
  // 采用分别引入的方式引入了createApp工厂函数
  import { createApp } from 'vue'
  import App from './App.vue'
  createApp(App).mount('#root')
  ```

  > `createApp(App)`函数会通过传入App组件，去创建一个**应用实例对象**（其实就是更轻量的vm），通过该对象的mount()方法将App组件挂载到id为root的HTML容器中（填充）。它身上还有unmount()可以从容器中卸载App组件。

  ###### 注意：原来Vue2入口文件的写法在Vue3中不能用了。

- ------

- ### 组合式API的基础——setup配置项

    > - setup是Vue3中的一个新的配置项，值是一个函数。它是所有组合式API表演的舞台，组件中所有用到的数据、方法、生命周期钩子等，均要写在setup函数中。（之前组件中写配置项的写法叫**选项式API**）
    >
    > - setup函数的2种返回值：
    >
    >   - **若返回一个普通的JS对象，则对象中的属性和方法可以直接在Vue模板中使用。**
    >
    >   - （了解）若返回一个渲染函数，则可以自定义渲染内容，该内容会作为Vue模板被渲染到页面的容器内。
    >
    >     ```js
    >     import { h } from 'vue'
    >     export default {
    >         name: 'App',
    >         setup(){
    >             // 渲染函数的返回值是虚拟DOM，创建虚拟DOM需要从vue身上引入h函数（createElement）
    >             return ()=>{ return h('h1','你好') } // 返回的虚拟DOM会作为Vue模板渲染到页面上
    >         }
    >     }
    >     ```
    >
    > - setup()函数的3个参数：
    >
    >   - props：值为声明接收的props对象。
    >   - context：它是上下文对象，其中包含attrs、emit()、slots，分别对应了Vue2组件实例上的$attrs、$emit()、$slots。
    >   - （Vue3中给组件绑定了自定义事件后，需要在组件中用emits配置项去声明接收该自定义事件：`emits:['事件名',..]`，否则会有警告）
    >
    > - **注意：**
    >
    >   1. Vue3中尽量不要写Vue2的配置项了，虽然Vue3中的methods、data、computed...配置项仍可用，且其中可以访问到setup返回的属性和方法，但Vue3的setup中不能访问Vue2的data、methods的数据。（若混用后重名了，则setup优先）
    >   2. setup函数会在beforeCreate()之前执行，并且其中的this是undefined。
    >   3. setup不能是一个Async函数。因为Async函数的返回值是一个Promise对象，它需要用then()来获取数据。

------

- ### Vue3中常用的组合式API

  

  - #### ref()：（所有的组合式API都需要从vue中引入才能用，并且都是函数，可以重复使用）

      > 在setup()函数体中直接定义的数据是没有响应式的。Vue3中如果想让数据变成响应式的，需要用ref()加工下：

      ```vue
      <template>
      	<span>我的名字是:{{name}}</span>
      	<span>我的年龄是:{{age}}</span>
      </template>
      <script>
          // 组合式API都需要在vue中引入才能使用
          import { ref } from 'vue'
          export default {
              name: 'App',
              setup(){
                  let name = ref('张三')
                  let age = ref(18)
                  return {name,age} // 经过ref()加工后的name、age，Vue才做了响应式
              }
          }
      </script>
      ```

      ###### 说明：

      > - 数据经过`ref(initValue)`函数加工后，数据会放在RefImpl对象的value属性中。RefImpl通常被称为**引用对象/ref对象**。
      > - Vue3中，ref()给数据做响应式的原理是：通过`Object.defineProperty()`给RefImpl对象的原型上，定义了虚拟属性value，访问和修改的其实是ref()收集过来的数据。因此要修改name和age**得通过ref对象的value属性去访问和修改**：`name.value='李四'`。
      > - 并且在Vue模板中，如果数据是一个RefImpl对象，那么Vue解析时自动会去读取它的value属性，所有还这样写：`{{name}}`，加了value读取`{{name.value}}`反而会出问题。
      > - 如果传给ref的是一个对象：`ref({})`，那么Vue会对该引用类型数据（对象的地址）做响应式，并将其包装为RefImpl对象。而且该对象还会被包装成一个Proxy对象，因为Vue要对对象内部所有层次的数据，都进行响应式处理。（内部是通过Vue3的reactive()函数来给对象做的包装）

      

  - #### reactive()：

      > 我们知道，Vue2中的响应式存在以下问题：
      >
      > - 新增属性、删除属性，界面不会更新。
      > - 直接通过下标修改数组，界面不会更新。

      ###### 虽然Vue2提供了相应的解决方案，但是Vue3的reactive()函数实现的响应式更优秀，可以直接对对象和数组进行增删查改，不存在以上问题：

      > - reactive()函数的作用是：给对象或数组类型的数据做响应式（基本类型不能用它，得用ref）。
      > - reactive()会将普通对象包装为Proxy对象。语法：`const 代理对象/数组 = reactive(源对象/数组)`。
      > - reactive()会给对象/数组所有层次的数据做响应式。内部是ES6的Proxy实现的，通过代理对象来操作的源对象。

      ###### Vue3的响应式原理：

      > Vue3中通过reactive()函数为源对象生成了一个Proxy代理对象。Proxy会为对象创建一个代理，从而拦截对象中任意属性的变化（包括增删改查等）。而Proxy中对源对象的增删改查又通过Reflect（反射）来完成。

      ###### 这种方式实现的响应式，可以捕获到对代理对象属性的增、删、改、查，因此不存在Vue2的问题。模拟Vue3的响应式：

      ```js
      let person = {name:'张三',age:14}
      const p = new Proxy(person, {
          // 当读取源对象person的某个属性时调用
          get(target,propName){
              console.log(`有人读取了源对象的${propName}属性`)
              return Reflect.get(target,propName)
          },
          // 当新增、修改源对象的某个属性时调用
          set(target,propName,value){
              console.log(`有人修改/新增了源对象的${propName}属性`)
              Reflect.set(target,propName,value)
          },
          // 当删除源对象的某个属性时调用
          deleteProperty(target,propName){
          	console.log(`有人删除了源对象的${propName}，我要去更新页面了`)
              return Reflect.deleteProperty(target,propName)
          }
      })
      ```

  - #### computed()：

      > Vue3中的计算属性是一个组合式API，是一个函数，需要在vue中引入才能使用。使用：

      ```js
      import {reactive,computed} from 'vue'
      export default {
          name: 'App',
          setup(){
              // 普通数据
              let person = reactive({
                  firstName: '张',
                  lastName: '三'
              })
              // 计算出来的数据，计算属性（简写，不考虑修改fullName计算属性）
              person.fullName = computed(()=>{
                  return person.firstName + '-' + person.lastName
              })
              return {person}
          }
      }
      ```

      > - computed()函数可以接收一个函数参数，该函数参数的返回值就作为计算属性的值。
      >
      > - computed()返回一个计算属性，并且该计算属性也是响应式的。
      >
      > - 计算属性如果会被修改，需要用完整写法，给computed()传一个对象：
      >
      >   ```js
      >   person.fullName = computed({
      >       get(){ return person.firstName + '-' + person.lastName }
      >       set(v){
      >           const arr = v.split('-')
      >           person.firstName = arr[0]
      >           person.lastName = arr[1]
      >       }
      >   })
      >   ```

      

  - #### watch()：

      > Vue3中监视属性是一个组合式API，是一个函数，需要在vue中引入才能使用。使用：

      ```js
      import {reactive,watch} from 'vue'
      export default {
          name: 'App',
          setup(){
              // 普通数据
              let sum = ref(0)
              let count = ref(0)
              // 监视ref定义的多个响应式数据
      		watch(sum, (niu,old)=>{
                  console.log('sum变了：',niu,old)
              })
              watch(count, (niu,old)=>{
              	console.log('count变了：',niu,old)
              })
              return {sum,count}
          }
      }
      ```

      > - watch的第1个参数是监视的数据，可以是ref对象或reactive定义的Proxy对象。watch的第2个参数是回调。第3个参数是配置对象（可选）：`{ immediate: true, deep: true }`。
      >
      > - 如果watch的第1个参数是ref对象，那么监视的是其中所有的属性。它是浅层次的监视，可以通过配置项来开启深度监视。
      >
      > - 如果参数是Proxy对象，那么监视的是对象中所有层次的数据。它是强制的，deep配置项不起作用。此时回调中的niu和old都是该对象的内存地址，无论怎么修改对象内部的数据，niu和old都指向了同一个对象。
      >
      > - watch的第1个参数也可以是数组，数组用来同时监视多个数据。数组中也必须是ref对象或Proxy对象（此时回调的参数niu和old也是数组）。
      >
      > - **小技巧：**如果只想监视Proxy对象中的某个数据，那么watch的第1个参数可以这样写：`()=>person.name`，如果要监视Proxy对象中的多个数据，那么就用函数数组：`[()=>person.name,..]`
      >
      >   > **特殊情况：**如果监视的Proxy中的数据，类型也是对象，并且层次比较深，那么还需要开启深度监视。
  
      
  
  - #### watchEffect()：
  
      > 它和watch()监视属性不同的是：不用指定去监视哪个属性，监视的回调中用到了哪个属性，就监视哪个属性：
  
      ```js
      watchEffect(()=>{
          console.log(sum.value,person.age)
      })
      ```
  
      > 其中的回调函数的执行时机是：一上来组件初始化、以及回调函数中用到的响应式数据发生变化时。
  
      ###### watchEffect和computed有点像，都是依赖的数据发生变化后就执行。不同的是watchEffect不要求返回值。

------

- ### Vue3中组件的生命周期

  ![lifecycle_zh-CN.W0MNXI0C](./assets/lifecycle_zh-CN.W0MNXI0C-1724942113193-2.png)

  ###### Vue3组件的生命周期和Vue2中的区别：（没有什么太大的改动）

  > 1. 原来的beforeDestroy()和destroyed()改为了`beforeUnmount()`和`unmounted()`。
  >
  > 2. 由原来的`new Vue()`变为了`createApp(App).mount('#root')`，创建vm实例的同时挂载到页面上。并且销毁vm实例的vm.$destroy()变成了`vm.unmount('#root')`。
  >
  > 3. 并且这些生命周期钩子（选项式API），Vue3中也提供了对应的组合式API函数：（且组合式API的优先级更高）
  >
  >    - beforeCreate()/created()        ==>             setup()
  >    - beforeMount()                        ==>             onBeforeMount()
  >    - mounted()                              ==>              onMounted()
  >    - beforeUpdate()                      ==>              onBeforeUpdate()
  >    - updated()                               ==>              onUpdated()
  >    - beforeUnmount()                  ==>               onBeforeUnmount()
  >    - unmounted()                         ==>               onUnmounted()
  >
  >    > 以上这些组合式API函数中，参数都是一个函数，该函数参数会在对应的生命周期被调用。

------

