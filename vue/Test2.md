# Vue的组件（Component）

------

> 组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的**组件**构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：
>
> ![components](./assets/components.png)
>
> 组件就是：**实现应用中局部功能代码和资源的集合**。在Vue中，一个组件本质上是一个拥有预定义选项的一个Vue实例。使用组件：

- ## 非单文件组件

  > 一个HTML文件中，定义了多个Vue的组件，这就属于**非单文件组件**。用法：

  1. 定义组件：在JS中通过`Vue.extend({})`可以定义一个Vue的组件并返回，参数中的配置对象类似vm中的。注意：

     > - 组件定义时，不能出现`el`配置项。因为最终所有的组件都要被vm对象所管理，由vm来决定服务于哪个Vue模版（容器）。
     >
     > - 没有了el配置项，那么组件的结构（Vue模版）就只能通过`template`配置项来写了：
     >
     >   ```js
     >  const school = Vue.extend({
     >       template: `
     >           <div>
     >           	<h2>学校:{{name}}</h2>
     >           	<h2>地址:{{address}}</h2>
     >           </div>
     >       `,
     >       data(){
     >           return {
     >           	name: '河西蓝翔技校',
     >           	address: '学校地址是这里'
     >           }
     >       },
     >       methods: {
     >           showName(){
     >           	alert(this.name)
     >           }
     >       }
     >   })
     >   ```
     > 
     > - `data`只能用函数式写法。因为对象式写法多个组件实例会共用这个data对象，数据不独立；而函数式写法每次调用会返回一个新的data对象，多个组件实例之间的data互不影响。
  
  2. （局部）注册组件：在使用组件的vm对象中，添加一个全新的配置项`components: { school: school, 组件名: 变量,...}`
  
     > 这种方式属于局部注册，用的最多。但是如果其他vm对象想用必须也得配置components去进行局部注册。此时可以用**全局注册**，这样其他所有vm对象接管的Vue容器中都可以编写该组件对应的组件标签了：`Vue.component('组件名', 组件)`
  
  3. 使用组件：在vm对象接管的Vue容器中编写**组件标签**，该标签会被Vue解析并替换为组件中的定义好的**组件模版**。
  
     ```html
     <div id="root">
         <!-- 给组件标签上添加属性，就相当于给school组件最外层的div上添加属性了 -->
     	<school></school>
     </div>
     ```
  
  ##### 注意事项：
  
  > - **组件名的规范**：（不要和HTML内置的标签重名）
  >   - 组件名是一个单词（注意别和HTML标签名同名）时：**全小写**或**首字母大写**。
  >   - 组件名是多个单词时：**全小写中间用`-`隔开**，或采用**大驼峰方式（需要Vue脚手架环境支持）**
  > - 组件标签也可以使用单标签，但是**需要Vue脚手架环境的支持**。
  > - 组件定义时可以使用`name:'abc'`配置项，指定组件在开发者工具中呈现的名字。（目前的作用只是在Vue工具中显示）
  > - **定义组件可以简写**：`const school = Vue.extend({})`简写为`const school = {}`，注册组件的时候会自动调用该对象的`Vue.extend({})`
  > - 组件也可以嵌套，在组件中注册其他组件，编写`components`配置项就可以了。通常会有一个管理所有组件的根组件（app组件）。
  
  ##### 关于`VueComponent`：
  
  > - `Vue.extend({})`的返回值本质上是根据不同的配置对象，来返回不同的`VueComponent`的构造函数。该构造函数不是程序员定义的，而是由`Vue.extend()`动态生成的。
  > - 每次调用`Vue.extend({})`定义一个新的组件时，返回的都是**新的**`VueComponent`构造器。不同组件的`VueComponent`不同。
  > - 我们只需要写`<school></school>`标签，Vue解析模板时会根据不同的组件构造器（school），帮我们创建对应组件的**组件实例对象（vc）**，即Vue帮我们执行的：`new VueComponent({配置对象})`
  > - 关于组件配置中的`this`：
  >   - 在`new Vue({})`的配置项中，data函数、methods中的函数、watch中的函数、computed中的函数，它们的this都是vm对象。
  >   - 而在`Vue.extend({})`定义组件的配置中，data函数、methods中的函数、watch中的函数、computed中的函数，它们的this都是`VueComponent`构造的**组件实例对象**（小型的vm对象vc）。
  > - vm（或vc）上的`$children`是一个`VueComponent`类型的数组，保存了该模板中使用的所有组件实例vc。
  > - **一个重要的关系：**`VueComponent.prototype.__proto__ === Vue.prototype`，即：`VueComponent`是`Vue`的子类。（vc是小型的vm）
  > - **为什么要有这个关系？**为了让组件实例对象vc可以访问到 Vue 原型上的属性、方法。
  
- ## 单文件组件（常用）

  > 每个组件分别定义在了一个`.vue`文件中（必须），这就属于单文件组件。使用：
  
  ##### 首先要知道：
  
  > 这种`.vue`文件浏览器是不能识别的，也就是不能直接在浏览器环境中运行。我们需要将这个`.vue`文件经过webpack工具处理打包成`.js`文件，才可以引入到HTML中使用：
  >
  > - 我们可以选择手动用**webpack**搭建**工作流**对`.vue`文件进行处理。但这种方式麻烦，且处理的结果（工作流）不一定是最好的。
  > - 通常我们会选择使用**Vue官方提供的脚手架**。就是Vue团队通过webpack给打造完的工作流，直接用就行。
  
  ##### 单文件组件的使用：
  
  1. 先新建一个`.vue`文件（**定义组件**）。该文件的名字同样遵循上面的组件名规范，一般用大写的方式：
  
     > `School.vue`：（VS Code安装插件：Vetur，作者Pine Wu）
  
     ```vue
     <template>
         <!-- 组件的结构，也就是HTML。这里写的template标签就相当于写在了template配置项中 -->
         <div class="demo">
             <h2>学校:{{name}}</h2>
             <h2>地址:{{address}}</h2>
             <button @click="showName()">弹出名字</button>
         </div>
     </template>
     <script>
     // 组件中的JS代码。注意最后一定要暴露一下该组件，因为vue文件最终会翻译为js文件，不暴露其他JS中没法引入该组件
     export default { // 这里省略Vue.extend()，用简写的形式，否则还需要导入Vue文件
         name: 'School', // 这里最好和文件名保持一致
         data(){
             return {
                 name: '河西蓝翔技校',
                 address: '学校地址是这里'
             }
         },
         methods: {
             showName(){
                 alert(this.name)
             }
         }
     }
     </script>
     <style scoped>/* style标签中的是该组件的样式，最终这些都会被JS代码动态添加到HTML的style标签中 */
     /* 组件的样式CSS，如果不加scoped，那么多个组件整合时，最终样式会混合在一起，本组件的样式可能会污染其他组件 */
     /* App组件中不要加scoped */
     .demo {
     	background-color: orange;
     }/* scoped底层就是给该组件模板内每一个标签都加了一个唯一的属性，并且style标签中的所有选择器都加了属性选择器，通过配合属性来完成的局部样式 */
     /* 另外还有lang属性，值可以是css、less、stylus，表示里面用是less写的样式。但是需要Vue脚手架项目中局部安装less-loader */
     </style>
     ```
  
     > - 之前说过，一个Vue组件中包含了HTML、CSS、JS，也就分别对应了单文件组件中的3个标签`<template>`、`<style>`、`<script>`，最终这个`.vue`文件还是会被翻译为一个`.js`文件。
     > - 最后一定要将该配置对象进行暴露。因为最终所有的`.vue`文件都会编译为JS文件，其他JS文件中要用到这个配置对象。
  
     > 再写一个App组件，它管理其他所有的组件，是根组件。`App.vue`：
     >
     > ```vue
     > <template>
     >        <div id="app">
     >        	<!-- 使用组件 -->
     >        	<School/>
     >        </div>
     > </template>
     > <script>
     >    // 引入其他文件中的子组件的配置对象
     >    import School from './School.vue'
     > export default {
     >        name: 'App',
     >        // 注册组件
     >        components: { School }
     >    }
     >    </script>
     > ```
     
  2. `main.js`入口文件中，将根组件App注册到vm对象上，让Vue实例对象管理起来App组件：
  
     ```js
     import App from './App.vue'
     new Vue({
         el: '#root',
         template: `<App></App>`,
         components: { App }
     })
     ```
     
  3. `index.html`中引入该`main.js`入口文件即可：
  
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>主页</title>
         <!-- 引入vue -->
         <script src="./js/vue.js"></script>
     </head>
     <body>
         <div id="root"></div>
         <!-- 引入入口文件main.js，注意顺序 -->
         <script src="./main.js"></script>
     </body>
     </html>
     ```
  

------

# 使用Vue脚手架

> 上面单文件组件如果不用Vue脚手架进行编译的话，是无法直接运行的。因为vue文件还没被编译为JS文件。

- ### 初始化Vue脚手架

  > Vue脚手架（Vue CLI）全称是：Vue命令行接口（Vue Command Line Interface）工具，是Vue官方提供的标准化开发工具（开发平台）。简单来说，Vue脚手架就是一个快速构建Vue项目的工具，是基于Vue框架进行快速开发的完整的Vue项目。它包括一个图形化的项目管理界面和一套完整的脚手架工具，帮助开发者快速搭建Vue项目。脚手架目前最新版本是4.X（一般用最新的），地址https://cli.vuejs.org/zh/

  1. （仅第一次使用）通过npm工具，**全局安装Vue脚手架工具**：`npm i -g @vue/cli`，然后命令行执行`vue`来查看是否安装成功。

  2. 在你要创建项目的目录下，**使用Vue脚手架的命令创建Vue项目**：`vue create vue_test`，然后选择Vue2版本。（创建的项目其实就是创建脚手架环境，只是其中给你准备了一个HelloWorld的项目（该npm项目会初始化为一个本地git仓库））

  3. 接下来cd切换到项目目录下，执行`npm run serve`，它就开始编译运行内置的HelloWorld项目的代码了，并且会启动这个项目对应的服务（修改源码自动重启服务）。在浏览器中输入url即可完成对HelloWorld项目的访问了：

     ![image-20240605134041103](./assets/image-20240605134041103.png)

- ### 脚手架相关文件的相关说明

  - `package.json`：通过查看其中的`scripts`配置项，我们知道刚才执行的`npm run serve`其实是执行了`vue-cli-service serve`，该命令会编译项目文件并启动一个node项目。`vue-cli-service build`是前端所有代码写完后，将所有源代码打包输出为静态资源文件（并将组件中`<template>`标签里的**Vue模版**进行了解析）。`lint`中是通过`eslint`工具进行语法检查（很少用）。

    ```json
    "scripts": {
    	"serve": "vue-cli-service serve",
    	"build": "vue-cli-service build",
    	"lint": "vue-cli-service lint"
    }
    ```

  - src目录中：

    - `main.js`：该文件是整个Vue项目运行或打包的入口文件。当执行了`npm run serve`后，直接去运行的该文件。

      ```js
      // 引入本地node_modules中vue的js文件包
      import Vue from 'vue'
      // 导入App根组件，所有组件的父组件
      import App from './App.vue'
      // 关闭vue的开发提示
      Vue.config.productionTip = false
      // 创建vue实例
      new Vue({
          el: '#app',
          // 这行代码将App组件（虚拟DOM）渲染为了真实DOM并替换掉了index.html中id为app的div
          render: h => h(App),
      })
      ```
    
    - `App.vue`：
    
      ```vue
      <template>
          <div id="app">
          	<img alt="Vue logo" src="./assets/logo.png">
          	<School></School>
          </div>
      </template>
      <script>
          // 导入其他子组件
          import School from './components/School.vue'
          export default {
              name: 'App',
              // 注册其他子组件
              components: { School }
          }
      </script>
      <style></style>
      ```
      
    - assets目录：该目录中存放前端开发环境下的（需要被打包的）静态资源文件。（打包前用的静态资源）
    
    - components目录：里面存放（App组件所管理的）所有的子组件`.vue`文件。
    
  - public目录中：（存放不需要打包的静态资源）
  
    - `favicon.ico`：网页的图标
    - `index.html`：Vue项目主页。里面没有引入任何文件，只有一个`<div id="app"></div>`（以后我们开发的都是SPA单页面应用）
  
  ###### 将之前我们写的单文件组件代码，放入该脚手架环境中：
  
  > 用我们的`App.vue`替换掉脚手架中的，将`Student.vue`放在components目录中即可。
  
  ###### 可能我们会有一些疑问：
  
  > 1. 凭什么main.js是入口文件？
  >
  >    答：这是在Vue的脚手架中配置好了的。
  >
  > 2. main.js都没有在index.html中进行引入，vm中也没有通过template和components注册和使用App组件标签，为什么就可以找到HTML中的容器并将组件放进去呢？
  >
  >    答：是这行代码做的：`render: h => h(App)`
  >
  
  ###### 接下来命令行执行：`npm run serve`，浏览器中输入url访问成功：
  
  ![image-20240605170021620](./assets/image-20240605170021620.png)

------

- ### 关于vm中的render配置项

  > 我们如果将render配置项去掉，还用原来的方式：将App组件注册，然后通过template使用`<App/>`组件。运行会报错：你正使用的运行时Vue的**模版解析器不可用**（不能用template配置项），要么将需要预编译的模版交给`render()`函数，要么用完整版的Vue。
  
  ###### 为什么会这样？
  
  > 因为我们脚手架环境中引入的Vue不包含模版解析器（占完整版的30%），不能用`template`配置项无法解析Vue模版，只有Vue的核心功能。只能通过`render()`函数来将`.vue`文件中的模版渲染到HTML元素中。
  
  ###### 关于`render()`函数：
  
  > - 该函数会在运行`main.js`时被自动调用。该函数有一个函数实参（通常叫`createElement`），用于创建一个虚拟DOM（JS对象）。Vue会通过`render()`函数将返回的虚拟DOM渲染成页面上的真实DOM，替换掉el配置的HTML容器。用法：
  >
  >   ```js
  >   render: function(createElement){
  >   	return createElement('h1','hello') // 代替了template: `<h1>hello</h1>`,
  >   }
  >   ```
  >
  > - 由于`render()`函数中没用`this`，所以可以用箭头函数的写法：`render: h => h(App)`
  
  ###### 为什么要这么麻烦呢？
  
  > 因为Vue源码中包含了2部分：Vue的核心功能 + 模版解析器（占30%）。其中模版解析器只是刚开始调用一次解析下`<template>`标签中的Vue模版，后面就不再用了。而脚手架环境下已经帮我们将`.vue`文件中的Vue模版做了解析（通过`vue-template-compiler`包，它是专门编译`.vue`文件中的模板的），`main.js`中没必要写Vue模版了，所以去掉这个用不到的模版解析器是一个更好的做法，直接通过`render()`将App组件对应的虚拟DOM渲染到页面上el指定的位置。
  
  ###### Vue的两个部分：核心程序 + **模版解析器**
  
  > 1. 模板解析器（Template Compiler）：模板解析器是Vue的核心功能之一，它负责将Vue组件中的（template中的）模板代码解析成虚拟DOM。模板解析器会解析Vue组件模板中的指令、插值表达式、事件绑定等语法，将其转换为虚拟DOM树。最终，模板解析器会生成`render()`渲染函数，用于将虚拟DOM渲染为真实的DOM元素。模板解析器的工作是将模板代码转换为可执行的渲染函数。 
  > 2. 渲染函数（Render Function）：渲染函数是一个JS函数，用于描述Vue组件的渲染逻辑。通过手动编写渲染函数，您可以更灵活地控制组件的渲染过程。渲染函数接收一个h函数（`createElement`函数）作为参数，通过调用h函数来创建虚拟DOM节点。在渲染函数中，您可以使用JS的逻辑控制、循环等语法来动态生成虚拟DOM节点。渲染函数的灵活性更高，但编写起来相对复杂。
  >
  > 模板解析器是将模板代码转换为渲染函数的工具，而渲染函数则是手动编写的描述组件渲染逻辑的函数。

------

- ### 在`vue.config.js`中配置Vue脚手架

  > 该文件用于配置Vue脚手架相关的东西，具体可以看VueCli官网的配置参考。如：配置对象中写`lintOnSave: false`表示关闭语法检查

------

- ### ref

  > - 有时也要在Vue中操作DOM，这时我们可以给标签上加一个特殊的属性`ref`，指定DOM节点的唯一标识（类似id）。
  > - 获取该DOM元素用`vm.$refs`，该属性是一个对象，其中对象的属性名是ref标识名，值是该DOM对象。
  > - 这种方式和原始JS的`document.getElementById()`的区别是：如果`ref`加在了组件标签`<school>`上，那么`$refs`获取的是vc组件实例对象。（原始JS获取的是组件根元素的DOM对象）

- ### 组件中的props配置项

  > - 组件中的`props`配置项可以让组件接收外部传过来的数据（属性或函数）。不局限于只用组件内部的数据，它可以让组件的使用者自定义组件，在使用组件标签的同时将自定义的数据传过来，达到自定义组件的目的。
  > - 当组件模版中用到一些数据，data中没有配置，这些数据是使用组件标签的地方传进来的，传进来的数据要用`props`配置项接收。
  
  1. ###### 使用组件的地方，通过组件标签的属性可以传递数据：`<School name="李四" age="13"/>`，一般用`:age="13"`来传数据，这样表达式传的是`Number`型数据。
  
  2. ###### 组件中通过props配置项来接收数据：
  
     ```js
     export default {
         name: 'School',
         // 组件自己的数据
         data(){
             return {
                 name: '河西蓝翔技校',
                 address: '学校地址是这里'
             }
         },
         // 方式1(用的最多)
         props: ['name','age']
         // 方式2，接收时对类型进行限制
         props: {
             name: String,
             age: Number
         }
         // 方式3，详细限制
         props: {
             name: {
                 type: String,
                 required: true
             },
             age: {
                 type: Number,
                 default: 0
             }
         }
     }
     ```
  
  > 注意：
  >
  > - props配置项中的数据也会放在vm（或vc）实例上，并且属性也做了响应式。相较于data，props里接收的数据优先被放在vc实例上。
  > - **props中的数据是只读的**，不能通过vc去改。（不过Vue监视的是浅层次的修改，深层次的修改虽然不会报错，但不建议这样做）
  > - 如果props传过来的数据在`data`或`methods`中已经定义了，重名了会报错。
  > - 我们在给标签定义属性时，不要用像`key`、`ref`这些特殊的属性名，因为这些属性Vue内部在维护。
  > - 如果传过来的数据没有用props声明接收，那么数据会被放在组件实例的`$attrs`对象中，类型是Object。若用props声明接收了，那么`$attrs`拿到的是空的Object对象。

------

- ### Mixin混入

  > `mixin`目的是为了复用配置项。我们可以将data、methods、computed等多个地方共用的键值对配置，放到一个公共的对象中。然后通过`mixin`配置项引入这些公共配置对象，达到复用配置的目的。
  
  ###### 用法：
  
  > - 将公共的配置项提取成一个配置对象放在单独的JS文件中，并暴露该对象：`export default { data:{}, methods:{} }`，这样其他组件或Vue实例中，就可以通过`mixins: [obj1,obj2..]`配置项，来将这些配置进行局部混入。这些配置项会和已有的配置项进行整合。
  > - 如果配置冲突了，以本文件中的配置为主。（但如果是生命周期函数配置项，则都会执行，且先执行`mixins`中的）
  > - **全局混入**：在main.js入口文件中通过Vue构造函数进行混入`Vue.mixin(obj)`，相当于本页面中所有的vm、vc上都加了该配置。

------

- ### Vue中的插件

  > Vue中的插件本质就是：包含`install()`方法的一个对象。通过插件可以对Vue的功能进行增强。用法：
  >
  
  1. ###### 在plugins.js中，定义插件：
  
     ```js
     export default {
         install(Vue,x,y){ // 参数1是Vue构造函数，后面是自定义参数。有了Vue构造函数可以做很多事情
             console.log("插件执行了！", Vue)
             // 全局过滤器
             Vue.filter('filter1',function(value){})
             // 全局指令
             Vue.directive('fbind',function(element,binding){})
             // 通过插件可以做很多事情...
         }
     }
     ```
  
  2. ###### main.js中，使用插件：
  
     ```js
     import plugins from "./plugins.js"
     // 使用插件，这里会调用插件对象的install()方法
     Vue.use(plugins,1,2)
     ```

------

- ### 自定义事件

  > 自定义事件是一种组件间通信的方式，适用于**子组件给父组件**传递数据。（目前还无法做到兄弟组件之间传递数据）

  - **自定义事件是给组件用的**（一般是组件用，其实vm对象也能用）。如：`<Student @atguigu='demo'/>`，该指令写在了组件标签上，表示给该组件实例对象vc绑定了一个自定义事件atguigu。当事件触发时调用demo函数（需要在`methods`中定义该demo函数）。

    > **注意**：自定义事件名必须小写，否则触发不了。多个单词使用短横线分割。

  - 给谁绑定的事件，就找谁去触发该事件。所以触发atguigu事件就得通过该组件实例对象vc的API：`vc.$emit('atguigu')`。并且触发事件时还可以传递数据：`vc.$emit('atguigu',a,b..)`，此时需要在demo函数定义时，给该函数声明实参进行接收：`demo(a,b..)`。不过一般不这样写太麻烦，可以这样：`demo(a,...params)`。

  - 另一种绑定自定义事件的方式：通过`vc.$on('atguigu', demo)`给vc实例组件绑定自定义事件。这种方式更灵活。

    > **注意：**
    >
    > - $on()的第2个参数位置上如果直接放一个回调函数的话，那么给哪个组件绑定的自定义事件，该回调中的this就是谁。因为该回调是在绑定自定义事件的组件中触发调用的。
    > - 此时该回调函数最好用箭头函数的写法，这样回调中的this仍然是当前上下文的组件实例：`vc.$on('atguigu',()=>{})`
    > - 对于自定义事件来说，`$event`占位符是$emit()的第2个参数。

  - 事件只触发一次：`<Student @atguigu.once='demo'/>`或`vc.$once('atguigu', demo)`。

  - 解绑事件：`vc.off('atguigu')`，解绑多个：`vc.off(['atguigu','other'])`，解绑所有：`vc.off()`。销毁组件实例后自定义事件就用不了了，`$emit()`不起作用了。

    > `$emit()、$on()、$off()`这些API其实是Vue原型上的，所以其实也可以给vm对象绑定自定义事件。

  - 组件上也可以用原生的JS事件，需要给事件加`native`修饰符，这样Vue才不会将其当做自定义事件，而是将该事件绑定到组件最外层的HTML容器上。（Vue3中移除了）

- ### 全局事件总线（Global Event Bus）

  > 全局事件总线可以实现**任意组件之间的通信**。

  ###### 原理是这样的：

  > - 首先找一个对象X（vm或vc实例），当A组件要给B组件传数据时，由B组件先在对象X上绑定一个自定义事件，这样事件的回调函数就留在了B组件中。当A组件拿到X，就去触发它身上的自定义事件并传数据过去。这样数据就会在B的回调中以形参的形式保存。这就完成了组件间的通信。
  >
  > - 因此，对象X需要满足以下条件：
  >
  >   1. 所有组件都能拿到对象X
  >   2. 既然能够给X绑定自定义事件，那么X必须能够调用`$on()`。也就是说X必须是一个vm或vc对象（因为该API在Vue原型上）。
  >
  > - 要满足以上2个条件的话，将vm对象放在Vue原型上即可：（放的时候注意时机，得在`beforeCreate`也就是还没解析组件模版时就得安装全局事件总线，因为通常组件挂载完毕后就要用全局事件总线了）
  >
  >   ```js
  >   new Vue({
  >       el: '#app',
  >       render: h => h(App),
  >       // 安装全局事件总线，$bus就是当前的vm实例
  >       beforeCreate(){
  >   		Vue.prototype.$bus = this
  >       }
  >   })
  >   ```
  >
  > - 这样所有的组件都能给这个X（vm对象）绑定自定义事件，然后在另一个组件中通过X去触发事件并携带数据，完成任意组件间的通信。如：
  >
  >   > B组件中给`$bus`绑定事件：
  >
  >   ```js
  >   mounted(){
  >       this.$bus.$on('hello', (data)=>{
  >           console.log(data)
  >       })
  >   }
  >   ```
  >   
  >   > B组件销毁之前，一定要将绑定的事件解绑，否则这个名字以后其他组件都用不了了：
  >   
  >   ```js
  >   beforeDestroy(){
  >       this.$bus.$off('hello')
  >   }
  >   ```
  >   
  >   > A组件给B传数据，触发总线上的`hello`事件：
  >   
  >   ```js
  >   methods: {
  >       sendData(){
  >           this.$bus.$emit('hello',666)
  >       }
  >   }
  >   ```

- ### 消息订阅与发布 -- pubsub（了解）

  > 消息订阅与发布技术，同样可以实现任意组件间的通信。它有点像**自定义事件**，原理是：
  >
  > - 假如组件A要给组件B发消息，那么B就需要先订阅消息并指定消息名（注册自定义事件），然后组件A根据消息名给B发布消息内容。
  > - 原生JS没有提供消息订阅与发布的库，所以我们用第三方库`pubsub-js`（publish发布，subscribe订阅）

  ###### 使用前要先安装：`npm i pubsub-js`，它可以在任何框架中使用。使用：

  1. 订阅消息：

     ```js
     // 导包，pubsub是一个对象
     import pubsub from 'pubsub-js'
     // 组件挂载完后就订阅一个消息
     mounted(){
         // 每次订阅消息都会返回一个订阅id，通过该id来取消消息订阅
         this.$pubId = pubsub.subscribe('消息名', (msgName,data)=>{ // 用箭头函数的写法this才是当前组件实例
             // 发布消息后执行的回调函数
             console.log(`消息名:${msgName},消息数据:${data}`)
         })
     }
     beforeDestroy(){
         // 最好在该组件销毁之前，取消订阅的消息
         pubsub.unsubscribe(this.$pubId)
     }
     ```

  2. 发布消息：

     ```js
     import pubsub from 'pubsub-js'
     methods: {
         sendData(){
             // 发布消息，携带数据
             pubsub.publish('消息名',666)
         }
     }
     ```
  
     > 我们一般通过Vue中的**全局事件总线**来完成任意组件间通信，而不是再去下载第三方库，所以了解即可。pubsub在React中比较常用。

- ### vm.$nextTick(callback)

  > 作用：下一次页面上的真实DOM更新之后，再去执行指定的回调。（该API在Vue原型上）
  >
  > 什么时候用：当数据改变后，要基于更新后的新DOM进行某些操作时，这些操作就可以放在该回调中。

------

- ### Vue封装的过渡与动画

  > Vue中对C3的过渡和动画做了封装：当我们往页面中插入、更新或删除DOM时，Vue会在合适的时候给元素加上一些类名。如下图：
  >
  > ![transition](./assets/transition.png)
  >
  > 在进入/离开的过渡中，会有6个类名进行切换：
  >
  > 1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
  > 2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
  > 3. `v-enter-to`：**2.1.8 版及以上**定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
  > 4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
  > 5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
  > 6. `v-leave-to`：**2.1.8 版及以上**定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

  ###### 用法：

  1. **用`<transition>`标签（不影响结构）包起来要发生过渡/动画的元素**：

     > 想让哪个元素发生动画或过渡，就用`<transition>`标签将其包裹起来。当该元素DOM被插入、更新或删除时，Vue就会动态的给该元素加上某些类名，以此完成动画或过渡的效果。（外层的过渡标签不会显示）

  2. **准备样式**：

     > 当该元素被插入时，Vue就会给该元素加上`v-enter-active`类名；当该元素被删除时，则加上`v-leave-active`（还加了其他的类名如上所示）。类名的持续时间是根据过渡或动画的时间来决定的，也可以自定义类名的持续时间。

  ###### 说明：

  > - `<transition>`标签如果加了`appear`属性（没有值），那么当元素初始化时就会发生过渡效果。
  >
  > - 如果页面上多个元素要不同的过渡效果，此时不同的过渡标签`<transition>`通过加`name='zs'`属性来区分。这样不同的过渡标签就去找各自对应的类名`zs-enter-active`，完成不同的过渡效果。
  >
  > - `<transition>`标签**只能包裹一个元素**。如果多个元素要实现同样的过渡效果，得用`<transition-group>`包起来，并且**里面每一个元素都要加唯一的`key`属性**。
  >
  > - 我们可以通过给`<transition>`标签设置以下属性来自定义过渡时要加的类名：
  >
  >   - `enter-class`
  >   - `enter-active-class`
  >   - `enter-to-class` (2.1.8+)
  >   - `leave-class`
  >   - `leave-active-class`
  >   - `leave-to-class` (2.1.8+)
  >
  >   （他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用）

  ###### 同一个效果，如果用过渡来写，那么需要分别在`v-enter`和`v-enter-to`中定义过渡开始和结束（进入的起点是离开的终点、进入的终点是离开的起点），最后在`v-enter-active`中设置过渡的持续时间。

  ###### 如果用动画来写，那么只需要定义好动画，然后在`v-enter-active`中设置动画的持续时间即可。

- #### 集成第三方的动画库Animate.css：

  > 我们不用自己准备CSS样式了，直接使用第三方的动画库。用法：
  >
  > 1. 通过npm安装`animate.css`：`npm i animate.css`
  > 2. 在.vue文件中引入：`import 'animate.css';`
  > 3. 设置`<transition>`标签的name属性为：`name='animate__animated animate__bounce'`，然后再加属性设置进入动画：`enter-active-class='animate__swing'`

------

- ### 通过Vue脚手架，解决AJAX跨域

  > 在Vue脚手架项目中，前端通过AJAX向另一台服务器请求数据，数据返回时会被客户端浏览器的CORS同源策略阻止，因为跨域了。而通常解决跨域的方案有：
  >
  > 1. 服务器端设置响应头允许跨域。
  > 2. JSONP。但是这种方式用的很少，且只能解决get请求跨域。
  > 3. 通过**代理服务器**。
  >
  > 而Vue脚手架就是Node写的一个项目，它就可以作为代理服务器。这样前端只需要找本机的代理服务器要数据就行，让该代理服务器（Node服务器程序）去和后端程序进行交互。（底层用的是`http-proxy-middleware`）
  
  ###### 使用：
  
  > 要将Vue脚手架程序作为我们的代理服务器，那么就需要通过`vue.config.js`文件对Vue脚手架进行配置：（开启内置的代理服务器）
  >
  > ```json
  > devServer: {
  >            // 代理服务器所代理的目标服务器地址
  >         proxy: 'http://localhost:5000'
  > }
  > ```
  >
  > 这样前端AJAX就请求本地的这个代理服务器即可。代理服务器上（public目录下）没有的资源就会去请求目标服务器，得到后再给前端。
  
  ###### 以上是简单配置，只能代理一个目标服务器，且不能灵活的配置走不走代理。可以将`proxy`的值写成一个对象：
  
  ```json
  devServer: {
      proxy: {
          // 配置url的请求前缀
          '/api': {
          	target: '目标服务器的url地址',
          	ws: true, // 默认true
          	changeOrigin: true // 默认true
          },
          // 可以配置多个请求前缀...
      }
  }
  ```
  
  > - `/api`是**请求前缀**。如果请求的url是以`/api`开头，那么本次请求就会走代理。可以配置多个请求前缀。
  > - `target`是目标服务器地址和端口号。
  > - `ws`用于支持`websocket`。
  > - `changeOrigin: false`是否骗目标服务器。目标服务器问本次请求来自于哪个地址，true则请求的Host字段为目标服务器本机。
  > - 如果想在请求目标服务器时去掉请求前缀，target下可以加这样一个配置项：`pathRewrite: {'^/api': ''}`，表示以`/api`开头的uri的开头替换为空串后，再去请求目标服务器。相当于路径重写了。
  > - **注意：**开发时在脚手架中配置的代理，不会包含在最后打包的代码中。（但是打包前需要改代码中的请求路径，端口号需要改成服务器的）

------

- ### 第三方插件vue-resource（了解）

  > `vue-resource`**插件**用于发送AJAX请求（和axios类似，都是对xhr的封装）。该库最早是Vue团队维护，后来交给了其他团队来维护，现在用的不多，早期Vue1.0用的较多。使用：

  1. npm局部安装：`npm i vue-resource`

  2. 入口文件main.js中引入并使用该插件：

     ```js
     import vueResource from 'vue-resource'
     // 使用插件
     Vue.use(vueResource)
     ```

     > 此时所有的vm和vc实例上会有一个`$http`对象，对象里面有`ajax、get、post`函数。用法、返回值都和axios一模一样。

------

- ### Vue中的插槽

  > 插槽的作用是：让父组件可以向子组件指定位置上插入HTML结构。

  > 我们之前是通过props配置项来给组件中传动态的数据。但有时我们不仅要求数据是动态的，还要求组件的结构是动态的。此时就需要通过组件中的**插槽**来完成。

  ###### 使用插槽：

  1. 组件中定义插槽：

     ```html
     <template>
         <div>
             <h3>{{title}}</h3>
             <!-- 组件模板中，定义插槽 -->
             <slot>我是默认值，当使用者没有传递标签时显示</slot>
     	</div>
     </template>
     ```

  2. 使用插槽：（往插槽中放HTML标签）

     ```html
     <template>
         <div>
             <School title="育才学校"><!-- 此时得用双标签写法 -->
                 <!-- 往插槽中放img标签。img标签是在该App组件中完成解析后，再塞到组件的插槽中的 -->
                 <img src="./a.jpg" alt="">
             </School>
     	</div>
     </template>
     ```

     > - 要往插槽中放的标签结构，它的CSS样式无论是写在定义插槽的地方、还是使用插槽的地方都行。
     >
     > - 组件中可以定义多个`<slot>`插槽，通过其`name`属性来区分不同的插槽。使用时通过给HTML标签加`slot`属性，来指定该HTML标签放在哪个插槽中。多个标签可以放到同一个插槽中。
     >
     > - 多个元素往插槽中放时，可以包在一个`<template>`标签中，好处是不会增加一层结构。并且此时可以用新写法来指定要放到哪个插槽中：`<template v-slot:插槽名>`（或v-slot='插槽名'）
     >
     > - 插槽也可以给使用者传递数据，通过给`<slot>`标签加属性：`<slot :games="g">`，使用插槽的地方想获取数据外层必须用`<template>`标签包裹：（通过`scope`或`slot-scope`属性接收。其中data是对象，对象的key是slot标签的属性名games）
     >
     >   ```html
     >   <School title="育才学校">
     >       <!-- 通过`scope`或`slot-scope`属性接收。其中data是对象，对象的key是slot标签的属性名games -->
     >   	<template slot="school" scope="data">
     >   		<img src="./a.jpg" alt="">{{data.games}}
     >       </template>
     >   </School>
     >   ```
  
  ###### 注意：其实通过组件实例的`vc.$slots.default`也可以获取到的传过来的标签结构，值是一个虚拟DOM数组。如果传结构时指定了插槽名，那么就通过`vc.$slots.插槽名`来获取对应的虚拟DOM。

------

