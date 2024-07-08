# Vuex

------

> Vuex是Vue团队打造的一个专为Vue应用程序开发的**状态管理模式**。它是专门在Vue中实现**集中式状态（数据）管理**的一个Vue**插件**，以相应的规则保证状态以一种可预测的方式发生变化，可以对Vue中的多个组件的共享状态进行集中式的管理（读/写）。并且Vuex的插件也集成到Vue的官方调试工具devtools中了，提供了诸如零配置的time-travel 调试、状态快照导入导出等高级调试功能。https://github.com/vuejs/vuex

###### Vuex的工作原理图：

![vuex](./assets/vuex.png)

###### Vuex的工作原理：

- Vuex包含3个重要的部分：（本质上就是被**store对象**所管理的3个普通的对象）
  - **Actions**：行为。里面放我们写好的一些函数，这些函数中一般都包含了很多业务逻辑。当满足条件后再通过Mutations完成对State中数据的操作。
  - **Mutations**：变化。里面放我们写好的一些直接操作State中数据的函数，这些函数中没有任何业务逻辑，只是对State的数据进行操作。
  - **State**：状态。在这里集中保存所有的状态数据，里面的数据类似data中，会自动做代理，当数据发生变化会重新渲染页面。

- 所有的Vue组件都可以通过`dispatch`来调用Actions中的函数来最终对State中的状态进行操作。Actions中需要我们提前写好对应的函数以及业务逻辑，函数里又通过`commit`调用了Mutations中的函数来完成对State中状态的操作（Mutations中的函数不包含业务逻辑）。最终当State中的状态（数据）发生变化后会重新渲染页面，因为Vue对里面的数据做了**数据劫持**（类似data中）。

- Vue组件也可以直接通过`commit`调用Mutations中的函数（如果不需要写业务代码的话），跳过Actions直接操作State中的数据。

- 其实在Actions中（或其他地方）也可以操作State中的状态（数据），不过最好按照上面的约定来写代码，就像后端代码遵循3层架构一样。

- 以上Vuex的3个组成部分得**以配置项的形式**交给**store对象**去管理，因为两个核心的API（`dispatch`和`commit`）都是store对象中的。当我们调了对应的API后，Vuex会去Actions或Mutations中找我们配置好的函数并调用，因此必须将这3个对象交给store去管理。

  > 因此我们必须让所有的vm、vc实例都能拿到这个store对象去使用Vuex。

###### 搭建Vuex的工作环境：

1. 安装`vuex`（vue2中只能用3版本的vuex）：`npm i vuex@3 --save`

2. src下新建一个文件`vuex/store.js`或`store/index.js`（官方推荐），文件中这样写：（该文件用于创建vuex中最核心的对象store）

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   //使用vuex插件。此时再去创建vm实例时，就可以传进去store配置项了，值是store对象，该对象就是整个Vuex工作环境
   Vue.use(Vuex)//必须在创建store实例之前执行这行代码
   
   //准备actions对象，里面的函数用于响应组件中的动作
   const actions = {//一般actions里的函数名是小驼峰格式
       //这是一个例子
       jia(context,value){//context是一个小型的store对象，value是调用dispatch传的数据
           context.commit('JIA',value)
       }
   }
   //准备mutations对象，里面的函数用于操作state中的状态
   const mutations = {//一般mutations里的函数名全大写
       //执行JIA
       JIA(state,value){//value是调用commit传的数据
           state.num += value
       }
   }
   //准备state对象，用于集中式地存储状态
   const state = { num:0 }
   
   //创建并暴露store对象，将3个配置项传进去
   export default new Vuex.Store({
       actions,mutations,state
   })
   ```

3. 创建vm实例时使用了`store`配置项后，所有的vm和vc上就都有了一个`$store`。

   > main.js：

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   //引入store对象
   import store from './store'
   
   Vue.config.productionTip = false
   
   new Vue({
       el: '#app',
       render: h => h(App),
       //添加store配置项，此时所有的vm和vc上就都有了$store可以获取store对象了
       store,
       beforeCreate() {
       	Vue.prototype.$bus = this
       }
   })
   ```

   > 此时就可以调用store对象上的API来使用Vuex了：
   >
   > - 组件中读取Vuex中的状态：`$store.state.num`
   > - 组件中修改Vuex中的状态：`vc.$store.dispatch('jia', 数据)`或直接`vc.$store.commit('JIA', 数据)`

#### Store中的getters配置项：

> 类似于state对象，getters也是一个对象，但对象中是方法。当state中的数据需要经过加工后再使用时，可以使用getters配置项进行加工，它就像state的代理。getters和state的关系就像computed和data的关系。使用：

1. 在`index.js`中定义并追加`getters`配置项：

   ```js
   const getters = {
       bigNum(state){
           return state.num * 10
       }
   }
   //创建并暴露store对象
   export default new Vuex.Store({
       actions,mutations,state,
       //追加getters配置项
       getters
   })
   ```

2. 组件中读取经过加工的`getters`中的数据：`$store.getters.bigNum`

------

