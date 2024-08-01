# Vuex

------

> Vuex是Vue团队打造的一个，用于Vue应用程序开发的**状态管理模式（插件）**。它可以在Vue中实现**集中式状态（数据）管理**，以相应的规则保证状态以一种可预测的方式发生变化，可以对Vue中的多个组件的共享状态进行集中式的管理（读/写）。并且Vuex的插件也集成到Vue的官方调试工具DevTools中了，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。https://github.com/vuejs/vuex

###### 什么时候使用Vuex？

> 1. 多个组件依赖同一状态。
> 2. 多个组件要变更同一状态。
>
> 此时这个状态（数据）就应该放在Vuex中。

###### Vuex的工作原理图：

![vuex](./assets/vuex.png)

###### Vuex的工作原理：

> - Vuex包含3个重要的部分：（本质上就是被**store对象**所管理的3个普通的对象）
>
>   - **Actions**：行为。里面放我们写好的一些函数，这些函数中一般都包含了很多业务逻辑。处理完业务逻辑之后再通过Mutations完成对State中数据的修改/访问。
>   - **Mutations**：转变。里面放我们写好的一些（直接操作State中数据的）函数，这些函数中没有业务逻辑。最终是通过它来操作State。
>   - **State**：状态。在这里集中保存所有的状态数据。里面的数据类似data中，会自动做代理，当数据变化后Vue会去重新渲染页面。
> - 所有的Vue组件都可以通过**store对象**的`dispatch()`方法来调用`Actions`中的函数。Actions中需要我们提前写好对应的函数，真正操作State数据之前，将其他的业务逻辑提前在Actions中处理好。然后再通过**store对象**的`commit()`方法去调用`Mutations`中的函数完成对State数据的修改/访问。Mutations中只对State进行修改/访问，不包含任何其他的逻辑。最终当`State`中的状态（数据）发生变化后Vue会重新渲染页面，Vue也对State里的数据做了**数据劫持**（类似data）。
> - Actions中的函数也可以通过**store对象**的`dispatch()`方法继续调用`Actions`中的其他处理业务逻辑的函数。
> - Vue组件也可以直接通过**store对象**的`commit()`方法去调用`Mutations`中的函数，如果访问`State`前不需要做业务处理的话。即跳过`Actions`直接操作`State`中的数据。
> - 其实在`Actions`中也可以直接操作State中的状态，不过最好按照上面约定的流程来写代码，就像后端遵循3层架构一样。
> - 以上Vuex的3个组成部分都是**以配置项的形式**交给**store对象**去管理，因为两个核心的API（`dispatch()`和`commit()`）都是store对象中的。当我们调了对应的API后，Vuex会根据配置项去`Actions`和`Mutations`中找我们配置好的函数并调用。
>
>
> > 要完成以上工作原理，首先我们必须让所有的vm、vc实例都能拿到这个store对象，进而通过该对象去使用Vuex的处理流程。

###### 搭建Vuex的工作环境：

1. 安装`vuex`插件：`npm i vuex@3`，（Vue3对应Vuex的4版本，而Vue2要用Vuex的3版本，否则会报错）

2. src下新建文件`vuex/store.js`或`store/index.js`（官方推荐后者），文件中这样写：（该文件用于创建Vuex中最核心的对象`store`）

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   //使用vuex插件。此时再去创建vm实例时，就可以传进去store配置项了，值是store对象，该对象就是整个Vuex的工作环境
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

3. 创建vm实例时使用了`store`配置项后，所有的vm和vc上就都有了一个`$store`，通过它可以访问到**store对象**。

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
   > - 组件中读取Vuex中的状态：`vc.$store.state.数据`
   > - 组件中修改Vuex中的状态：`vc.$store.dispatch('jia', 数据)`或直接`vc.$store.commit('JIA', 数据)`

- #### Store中的getters配置项：

  > 类似于state对象，getters也是一个对象，但对象中是方法不是属性。当state中的数据需要经过加工后再使用时，可以使用getters配置项进行加工，它就像state的代理。getters和state的关系就像computed和data的关系。使用：

  1. 在`./store/index.js`中定义并追加`getters`配置项：

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

- #### mapState与mapGetters

  > 我们发现，如果要在Vue模版中使用`state`和`getters`中的数据，需要`{{$store.state.数据}}`来拿很麻烦，此时可以用计算属性：
  >
  > ```js
  > computed: {
  >        计算属性名(){
  >        	return this.$store.state.数据
  >        },
  >        ...
  > }
  > ```
  >
  > 但是写一堆计算属性也很麻烦，此时可以通过Vuex中提供的`mapState`与`mapGetters`函数，来帮我们**自动生成计算属性函数**，只需要告诉它计算属性名和`state/getters`中的数据名即可。

  ###### 使用：

  ```js
  import {mapState,mapGetters} from 'vuex'
  export default {
  	name: 'Count',
  	computed: {
  		// 写法1：对象写法。mapState()函数返回一个对象，对象中是所有生成的计算属性函数
  		...mapState({计算属性名:"数据名",...}),
  		// 写法2：数组写法。当计算属性名和数据名保持一致时使用
  		...mapGetters(['数据名1','数据名2',...]),
  	},
  }
  ```

- #### mapActions与mapMutations

  > 如果我们写的函数中，只包含这行代码：`this.$store.dispatch/commit('函数名', 数据)`，那么这个函数也可以让Vuex自动生成，通过`mapActions`和`mapMutations`。

  ###### 使用：

  ```js
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
  	name: 'Count',
  	methods: {
  		// 写法1：对象写法
  		...mapActions({methods中的函数名:"Actions中的函数名",...}),
  		// 写法2：数组写法。当methods中的函数名和Mutations中的函数名保持一致时使用
  		...mapMutations(['函数名1','函数名2',...]),
  	},
  }
  ```

  > 此时数据需要在调用该函数时，以函数实参的的方式：`函数名(数据)`，将数据传递过去。最终生成的methods中的函数是这样的：
  >
  > ```js
  > methods: {
  >        函数名(value){
  >        	this.$store.dispatch/commit('函数名', value)
  >        },
  > }
  > ```

- #### Vuex的模块化

  > 随着组件越来越多，Actions、Mutations、State、Getters中保存的数据和函数也会越来越多，此时我们想找为某些组件服务的数据和函数就很困难。能不能用模块化的思想，将Actions、Mutations、State、Getters中的数据和函数，根据功能类别再分成不同模块，访问时通过`state.模块名`的方式访问呢？可以，这就是Vuex的模块化。

  ###### 使用：

  1. 在外部单独定义两个配置对象：（可以分别放在2个JS文件中）

     > countOptions.js：
     >
     > ```js
     > export default {
     >       namespaced: true,//加上这行代码后，mapState才能通过第1个参数去指定的模块中找数据
     >       actions: {},
     >       mutations: {},
     >       state: {},
     >       getters: {}
     > }
     > ```
     >
     > personOptions.js：
     >
     > ```js
     > export default {
     >       namespaced: true,
     >       actions: {},
     >       mutations: {},
     >       state: {},
     >       getters: {}
     > }
     > ```

  2. store对象的配置中这样写：

     ```js
     import countOptions from './store/countOptions.js'
     import personOptions from './store/personOptions.js'
     export default new Vuex.Store({
     	modules: {a:countOptions,模块名:personOptions,..}
     })
     ```

     > - 这样store对象中的Actions、Mutations、State、Getters就开始分模块了。以后得这样写：
     >
     >   - 访问state：`$store.state.模块名.数据`
     >   - 访问getters：`$store.getters['模块名/数据']`
     >   - 修改：`$store.dispatch/commit('模块名/函数名', 数据)`
     >
     > - mapState方式这样写：
     >
     >   ```js
     >   computed: {
     >   	// 第1个参数指定模块名。前提是countOptions对象的namespaced属性值为true
     >   	...mapState('a', {计算属性名:"数据名",...}),
     >   	...mapGetters('模块名', ['数据名1','数据名2',...]),
     >   },
     >   ```

------

# 路由（前端路由）

> **路由（Route）**就是一组K-V的对应关系。多个路由需要经过**路由器（Router）**的管理。

> Vue中的路由是一个Vue的**插件库（vue-router）**，专门为了实现SPA（单页面）应用的。其中K为路径，V是组件。原理是：当页面导航栏的路径发生变化后（没有发请求），就会被**vue-router**监测到，然后根据路径找对应的组件渲染到页面上。

> SPA应用（Single Page web Application）的特点：
>
> 1. 整个应用只有**一个完整的页面**（1个html）。
>2. 点击页面导航**不会刷新页面，只做局部的组件更换**。
> 3. 数据需要通过AJAX来获取。

###### 路由的配置：

1. 安装`vue-router`插件：`npm i vue-router@3`，（Vue3对应vue-router的4版本，而Vue2要用vue-router的3版本，否则会报错）

2. 入口文件main.js中使用下该插件，这样vm实例中就可以写`router`配置项了：

   ```js
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   import App from './App.vue'
   Vue.use(VueRouter)
   
   new Vue({
       el: '#app',
       render: h => h(App),
       // 使用插件后，就可以写router配置项了，值是VueRouter的实例
       router: router对象,
   })
   ```

3. src下新建`router/index.js`，里面创建`VueRouter`实例：

   ```js
   // 该文件专门用于创建整个应用的路由器实例
   import VueRouter from "vue-router"
   import About from '../pages/About'
   import Home from '../pages/Home'
   
   // 创建一个路由器实例VueRouter并暴露出去
   export default new VueRouter({
     routes: [
       {
         path: '/about',
         component: About
       },
       {
         path: '/home',
         component: Home
       }
     ]
   })
   ```

   > 其中`routes`配置项的值是对象数组，用于配置多个路由规则。`path`指定路径，`component`是路径对应的组件。

   ###### 注意：通常在routes中配置的组件称为路由组件，路由组件单独放在`src/pages/`目录下。路由组件实例对象身上会多两个API：`$route`是路由组件的路由信息对象，`$router`是全局唯一的VueRouter实例（路由器）。

4. 此时回到main.js中，将`VueRouter`实例配置到`router`配置项里：

   ```js
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   import App from './App.vue'
   // 导入创建好的VueRouter路由器实例
   import router from './router'
   Vue.use(VueRouter)
   
   new Vue({
       el: '#app',
       render: h => h(App),
       // 配置路由器
       router,
   })
   ```

   > 此时路由器就配置好了。

###### 使用路由：

1. 找到导航链接所在的`<a>`标签，将其替换为vue-router已经给你注册好的`<router-link>`标签（其实就是写好的组件，**本质就是a标签**）。

   > - **注意：**原来a标签的href到了`<router-link>`标签上变成了`to`，to的值写上面`path`配好的路径。
   > - 如果导航链接不是a标签，此时就不能用`<router-link>`了，用后面的**编程式路由导航**。
   > - `<router-link>`标签还有`active-class`属性，用于指定路由导航被激活（点击）时要加的样式类名。

2. 在要呈现和切换组件的位置加上`<router-view>`标签。

###### 此时点击对应的`<router-link>`标签就会在`<router-view>`所在位置挂载对应的路由组件。路由切换时导航栏路径也随之变化，但是并没有发送网络请求。当切换其他路由组件时，默认是将原来的组件实例销毁（也可以配置为不销毁）。

![image-20240801230601759](./assets/image-20240801230601759.png)

![image-20240801230621415](./assets/image-20240801230621415.png)

------

路由：

------

