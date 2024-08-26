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

  ### 创建Vue3项目

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

    > Vite创建的Vue工程和脚手架不太一样，不过我们不关心，接下来我们还用脚手架的方式来创建Vue工程。

- ### 关于Vue3项目的目录结构

  > Vue Cli创建的Vue3项目的目录结构和文件和2是类似的，唯一不同的是入口文件的写法。在src/main.js中：

  ```js
  // 采用分别引入的方式引入了createApp工厂函数
  import { createApp } from 'vue'
  import App from './App.vue'
  createApp(App).mount('#root')
  ```

  > `createApp(App)`函数会通过传入App组件，去创建一个**应用实例对象**（其实就是更轻量的vm），通过该对象的mount()方法将App组件挂载到id为root的HTML容器中（填充）。它身上还有unmount()可以从容器中卸载App组件。

  ###### 注意：原来的入口文件的写法在Vue3中就不能用了。

- （Vue3中的Vue模版中可以有多个根标签）