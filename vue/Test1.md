# Vue

------

> Vue是一套用于，构建用户界面的，渐进式JS框架。简单来说就是负责将AJAX取来的数据渲染到HTML页面上。那什么是渐进式呢？就是，Vue可以自底向上逐层的应用，简单应用只需要一个清凉小巧的Vue核心库，复杂应用可以引入各种的Vue插件。Vue的特点：
>
> - 采用**组件化**模式，提高代码复用率、且让代码更好维护。它是指，Vue将页面中的某一个板块的所有样式、css、js都封装为一个`.vue`的文件，这样用的话直接引入该文件，修改内部的css、html代码即可。
> - **声明式**编码，让编码人员无需操作DOM，提高开发效率。它是指，页面中使用特殊的属性和标记，来完成特定的效果，无需我们做编写复杂的JS代码就可以实现，有点类似JSP。
> - 使用**虚拟DOM**和优秀的Diff算法，尽量**复用DOM节点**。
>
> 准备工作：下载`vue.js`文件引入到HTML，下载Vue的开发者工具（crx文件），拖到浏览器的扩展中心即可。

- ### 第一个Vue程序：

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 引入vue文件后，类似于jQuery，全局中多了一个构造函数Vue() -->
    <script src="./js/vue.js"></script>
    <!-- vue的全局配置 -->
    <script>
      Vue.config.productionTip = false
    </script>
    <title>test Vue</title>
  </head>
  <body>
  <!-- 准备好一个容器。因为vue采用组件化模式，要将vue的组件放在页面的指定位置上，所以用div包住指定位置 -->
    <div id="root">
      <!-- 先写死 -->
      <!-- <h1>Hello,Vue!</h1> -->
      <!-- 这里面的代码依旧用HTML，只是加入了vue的语法。容器中的代码被称为【Vue模板】 -->
      <h1>Hello,{{user}}!</h1><!-- 这是vue模板的插值语法，里面可以写data对象的属性，也写JS表达式 -->
    </div>
    <script>
      //想让Vue工作，就必须创建对应的Vue实例，传进去配置对象
  	const v = new Vue({
        //vue实例要将组件内容放在这个标签内部。值通常为css选择器串，还可以是dom对象
        el: '#root',
  	  //data中用于存储数据，数据供el指定的容器中使用，值目前先用对象
        data: { user: '尚硅谷' }
      })
      //修改user中的数据，页面也随之更新
      v.user = '尚学堂'
    </script>
  </body>
  </html>
  ```

- ### 第一个程序的细节：

  > - data中的数据一旦更新，vue模板对应部分也会随之更新。
  > - HTML容器和Vue实例之间是1对1关系。它会从上到下找第1个符合条件的去接管。（Vue实例还可以有多个子实例去接管容器内部的不同部分）
  > - vue实例对象中有两种属性，一种是以`$`开头的，这些都是vue供我们用的。剩下的都是vue内部的底层代码用的，一般不用管。
  > - vue对象上的属性，都可以在**Vue模板**中直接通过JS表达式访问使用。
  > - data中的数据，会被vue对象收集起来放在_data属性中。然后将里面的属性通过`Object.defineProperty()`方法再加到vue对象上（虚拟属性），访问和修改分别调用的是`Object.defineProperty()`里的`getter`和`setter`。这就是vue对象对data中数据做的**数据代理**。

------

- ## Vue模板的语法

  - ### 插值语法：

    > 如果是**标签体内容**要实现动态化，就需要用插值语法，用`{{}}`将JS表达式包起来。

  - ### 指令语法：

    > - 如果是**标签属性**要实现动态化，需要用指令语法。其中的一个`v-bind`指令：`v-bind:属性名='js表达式'`，可以实现属性的动态化。（有点像`thymeleaf`模板引擎中的`th:属性名="${域中的数据}"`）
    >
    > - 并且由于`v-bind:属性名='js表达式'`很常用，所以**可以简写**为`:属性名='js表达式'`
    >
    > - 指令语法主要用于**解析标签**，形式都是`v-xxx`，可以解析标签属性、标签体内容、绑定事件等....

- ## Vue的数据绑定

  > - 其实`v-bind`指令就是一个数据绑定指令，当data中的数据发生了变化，那么对应的属性值就会变，它是单向的数据绑定指令。
  >
  > - 而`v-model`指令则是双向的数据绑定，属性值发生变化，对应的data中的数据也会变化。但是注意：它只能用在**有value属性的元素**上，`v-model:value`可以简写为`v-model`，因为它一般绑定的都是value属性。

- ## el和data属性的另一种写法

  > - 声明vue对象可以不指定el属性，用vue对象的`$mount()`实例方法，也可以将vue对象和容器进行1对1绑定：`v.$mount('#root')`，这种方式更灵活。`$mount()`是将容器挂载到vue对象上。
  >
  > - data属性的函数式写法，要求函数的返回值必须是1个对象：（注意：不能是箭头函数，this就没了）
  >
  >   ```js
  >   const v = new Vue({
  >       el: '#root',
  >       data(){//完整形式为，data:function(){}
  >           console.log(this)//this是当前vue对象
  >           return { user: '张三' }
  >       }
  >   })
  >   //有一个原则：vue所管理的函数一定不要用箭头函数
  >   ```

------

- ## MVVM模型

  > Vue的设计一定程度上参考了MVVM模型。MVVM是指：
  >
  > - M：模型（Model），对应data中的数据，是一般的JS对象
  > - V：视图（View），Vue关联的容器
  > - VM：视图模型（ViewModel），对应Vue实例对象（因此vue实例通常叫vm）
  >
  > ![20200204123438](./assets/20200204123438.png)

------

