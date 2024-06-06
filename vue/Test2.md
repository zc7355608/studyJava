# Vue的组件（Component）

------

> 组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的**组件**构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：
>
> ![components](./assets/components.png)
>
> 在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。接下来看下组件怎么用。

- ## 非单文件组件

  > 一个HTML中，定义了多个vue组件，这就属于非单文件组件。使用：

  1. 定义组件：通过`Vue.extend({})`可以定义一个vue的组件并返回，参数中的配置项对象类似vm中。注意：

     > - 组件的配置中，不能出现`el`配置项。
     >
     > - data只能用函数式写法。因为对象式写法多个组件会共用这个data对象，组件之间数据不独立；而函数式写法会返回一个新的data对象，多个组件之间用的data互不影响。
     >
     > - 组件中只能通过`template`配置项来配置组件的结构：
     >
     >   ```js
     >   const school = Vue.extend({
     >   	template: `
     >   		<div>
     >               <h2>学校:{{name}}</h2>
     >               <h2>地址:{{address}}</h2>
     >   		</div>
     >   	`,
     >       data(){
     >           return {
     >   			name: '河西蓝翔技校',
     >   			address: '学校地址是这里'
     >   		}
     >       },
     >       methods: {
     >           showName(){
     >               alert(this.name)
     >           }
     >       }
     >   })
     >   ```
  
  2. 注册组件（局部）：在使用组件的vm对象中，添加一个全新的配置项`components: { school: school, 组件名: 组件}`
  
     > 这种方式属于局部注册，用的较多，但是如果其他vm对象想用必须也得配置components去进行局部注册。此时可以用**全局注册**，这样其他所有vm对象接管的vue容器中都可以编写该组件对应的组件标签了：`Vue.component('组件名', 组件)`
  
  3. 使用组件：在vm对象接管的vue容器中编写**组件标签**，该标签会被vue渲染替换为组件中的定义好的模版。
  
     ```html
     <div id="root">
     	<school></school>
     </div>
     ```
  
  ##### 一些注意事项：
  
  > - **组件名规范**：组件名如果是一个单词（别和HTML标签名同名），可以**全小写**或**首字母大写**；如果是多个单词，可以**全小写**中间用`-`隔开，也可以采用**大驼峰方式（需要Vue脚手架环境支持）**
  > - 组件定义时可以使用`name: 'abc'`配置项，指定组件在开发者工具中呈现的名字。（只是在插件中显示，其他地方的用法没变）
  > - 组件标签也可以使用单标签，但是**需要Vue脚手架环境的支持**。
  > - **定义组件可以简写**：`const school = Vue.extend({})`简写为`const school = {}`，注册的时候会自动调用该对象的`Vue.extend({})`
  > - 组件也可以嵌套，在组件注册其他组件，编写`components`配置项就可以了（注意组件的定义顺序）。（通常会有一个管理所有组件的根组件，叫app）
  
  ##### 关于`VueComponent`：
  
  > 1. school组件本质是一个名为`VueComponent`的构造函数，不是程序员定义的，是`Vue.extend()`生成的。**注意**：每次调用`Vue.extend({})`定义了一个新的组件时，返回的都是一个**全新的**`VueComponent`的构造器。
  > 2. 我们只需要写`<school></school>`标签，Vue解析时会帮我们自动创建school组件的**组件实例对象**，即vue帮我们执行的：`new VueComponent({配置对象})`
  > 4. 关于this指向：
  >    - 在`new Vue({})`的配置项中，data函数、methods中的函数、watch中的函数、computed中的函数，它们的this都是vm对象。
  >    - 而在`Vue.extend({})`定义组件的配置中，data函数、methods中的函数、watch中的函数、computed中的函数，它们的this都是`VueComponent`构造的**组件实例对象**（小型的vm对象vc）。
  > 5. vm对象上的`$children`是一个`VueComponent`类型（组件实例对象）的数组，保存了vm实例上注册的所有组件。
  
  ##### 重要的关系：
  
  > `VueComponent.prototype.__proto__ === Vue.prototype`，即：`VueComponent`是`Vue`的子类。
  
- ## 单文件组件（常用）

  > 每个组件一一对应了一个`.vue`文件，这就属于单文件组件。使用：
  
  ##### 首先要知道：
  
  > - 这种`.vue`文件浏览器是不能识别的，也就是不能直接在浏览器环境中运行。我们需要将这个`.vue`文件经过webpack工具处理成`.js`文件，才可以引入到HTML中使用。
  > - 我们可以选择手动通过webpack来自己对vue文件进行处理，但这种方式比较麻烦，且处理的结果（工作流）不一定是最好的。
  > - 通常我们会选择使用，Vue官方提供的**脚手架**。就是Vue团队通过webpack给打造完的工作流，直接用就行。
  
  ##### 单文件组件的使用：
  
  1. 先新建一个`.vue`文件（**定义组件**），该单文件组件的文件名，同样遵循上面的组件名规范，我们一般用大写的方式：
  
     > `School.vue`：（VS Code安装插件：Vetur，作者Pine Wu）
  
     ```vue
     <template>
     	<!-- 组件的结构，也就是HTML。template配置项中怎么写，这里就怎么写，并且我们知道外部的template标签不会影响结构 -->
         <div class="demo">
         	<h2>学校:{{name}}</h2>
         	<h2>地址:{{address}}</h2>
             <button @click="showName()">弹出名字</button>
         </div>
     </template>
     <script>
     	//组件的交互（JS脚本）。注意最后一定要暴漏一下该组件，因为vue文件最终会翻译为js文件，不暴露其他JS中没法引入该组件
         export default {//这里要省略Vue.extend()，用简写的形式，否则还需要导入Vue文件
             name: 'School',//这里一般和文件名保持一致
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
     <style>
     	/* 组件的样式CSS */
         .demo {
             background-color: orange;
         }
     </style>
     ```
  
     > - 之前说过，一个vue组件中包含了HTML、CSS、JS，也就分别对应了单文件组件中的3个标签`<template>`、`<style>`、`<script>`
     > - 最后一定要将组件暴露下。因为最终所有的`.vue`文件都会编译为JS文件，其他JS中要用该组件所以要暴露一下该组件对象。
  
     > 再写一个App组件，它管理其他所有的组件，是根组件。`App.vue`：
     >
     > ```vue
     > <template>
     >     <div id="app">
     >     	<!-- 使用组件 -->
     >     	<School/>
     >     </div>
     > </template>
     > <script>
     >    //引入其他文件中的组件对象
     >    import School from './School.vue'
     > 
     >    export default {
     >         name: 'App',
     >         //注册组件
     >         components: { School }
     >     }
     > </script>
     > <style></style>
     > ```
  
  2. `main.js`入口文件中，将根组件App注册到vm对象上，让vue实例对象管理起来App组件对象：
  
     ```js
     import App from './App.vue'
     
     new Vue({
         el: '#root',
         template: `<App></App>`,
         components: {App}
     })
     ```
  
  3. `index.html`中使用：
  
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>主页</title>
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

> 上面单文件组件如果不用Vue脚手架进行编译的话，是无法直接运行的。

- ## 初始化Vue脚手架

  > Vue脚手架（Vue CLI）全称是：Vue命令行接口（Vue Command Line Interface）工具，是Vue官方提供的标准化开发工具（开发平台）。简单来说，Vue脚手架就是一个基于Vue框架进行快速开发的完整系统。它包括一个图形化的项目管理界面和一套完整的脚手架工具，帮助开发者快速搭建Vue项目。脚手架工具的最新版本是4.X（一般用最新的），地址https://cli.vuejs.org/zh/

  1. 通过npm工具，**全局安装vue脚手架工具**：`npm i -g @vue/cli`，然后命令行执行`vue`来查看是否安装成功。

  2. **切换到你要创建项目的目录，使用vue命令创建项目**：`vue create vue_test`，然后选择vue2版本。（创建的项目其实就是创建脚手架环境，只是其中给你准备了一个HelloWorld的项目）

  3. 接下来cd切换到项目目录下，执行`npm run serve`，它就开始编译HelloWorld项目的代码了，而且会启动这个项目对应的服务。在浏览器中输入url即可完成对HelloWorld项目的访问了：

     ![image-20240605134041103](./assets/image-20240605134041103.png)

- ## 脚手架相关文件的相关说明：

  - `package.json`：通过查看其中的scripts配置项，我们知道刚才执行的`npm run serve`其实是执行了`vue-cli-service serve`，该命令会部署项目文件并启动一个服务器。`vue-cli-service build`是所有代码写完后，将前端工程化的源代码vue文件编译为JS文件。lint中是进行语法检查（很少用）。

    ```json
    "scripts": {
    	"serve": "vue-cli-service serve",
    	"build": "vue-cli-service build",
    	"lint": "vue-cli-service lint"
    },
    ```

  - src目录中：

    - `main.js`：该文件是整个项目的入口文件。当执行了`npm run serve`后，直接去运行的该文件。

      ```js
      //引入本地node_modules中vue的js文件包
      import Vue from 'vue'
      //导入App根组件，所有组件的父组件
      import App from './App.vue'
      //关闭vue的开发提示
      Vue.config.productionTip = false
      //创建vm实例
      new Vue({
          //这行代码一会再细说，是它将App组件放入了HTML文件里id为app的容器中
          render: h => h(App),
      }).$mount('#app')//这里也可以用el的方式
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
          //导入其他子组件
          import School from './components/School.vue'
          export default {
              name: 'App',
              //注册其他子组件
              components: { School }
          }
      </script>
      <style>
      </style>
      ```
  
    - assets目录：该目录中存放前端开发环境下的静态资源文件。（打包前用的静态资源）
  
    - components目录：里面存放（App组件所管理的）所有的子组件。
  
  - public目录中：

    - `favicon.ico`：网页的图标
    - `index.html`：网站首页，里面没有引入任何文件，只有一个`<div id="app"></div>`（以后我们开发的都是单页面应用）
  
  ###### 将之前我们写的单文件组件代码，放入该脚手架环境中：
  
  > 用我们的App.vue替换掉脚手架中的，将Student.vue放在components目录中即可。
  
  ###### 可能我们会有一些疑问：

  > 1. 凭什么main.js是入口文件？
  >
  > 2. main.js都没有在index.html中进行引入，main.js的vm中也没有template和components配置项，为什么就可以找到HTML中的容器呢？
  >
  >
  > 这两个问题的答案是：这些都是在Vue的脚手架中配置好了的。如果想配置vue脚手架，在`vue.config.js`中配置。
  
  ###### 接下来命令行执行：`npm run serve`，浏览器中输入url访问成功：
  
  ![image-20240605170021620](./assets/image-20240605170021620.png)

------

- ### 关于vm中的render配置项：

  > 

