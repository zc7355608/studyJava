# Webpack5

- ## 概述

  - #### 为什么前端需要打包工具：

    > 前端进行开发时，我们会使用框架（Vue、React），ES6模块化语法，Less/Sass等css预处理器进行代码的编写。而这样的代码要想在纯前端环境运行必须先被预处理，经历很多繁琐的步骤处理后才能运行在前端。用打包工具可以让我们避免做这样复杂的工作，让Webpack帮我们做项目的打包和代码替换，这样就可以直接放在前端运行。除此之外，打包工具还能够压缩代码、做兼容性处理、提升代码性能等。
  
  - #### Webpack可以帮我们做什么：
  
    > 1. 性能优化：通过合并文件，减少了文件的大小，从而减少HTTP请求的数量，加快页面加载速度。
    >
    > 2. 代码预处理和打包：打包工具可以将模块化语法、框架语法（vue、react）进行预处理。
    > 3. 资源优化：能够处理各种资源（如图片、字体、样式）并将它们包含在最终的输出中。
    > 4. 转换 & 兼容性：可以将高级的 JavaScript（例如 ES6+）或其他编程语言（例如 TypeScript）转换为广泛支持的 ES5 代码。
    > 5. 依赖管理：确保代码按正确的顺序执行，满足模块间的依赖关系。
  
  - #### Webpack概述：
  
    > Webpack是一个**静态资源打包工具**（就是别人写好的一个npm包）。它会以一个或多个文件作为打包的入口，将我们整个项目的所有文件编译组合成一个或多个文件输出到当前目录的`dist`目录（默认）下，输出的文件就可以在纯前端环境下运行了。通常将输出的文件称为`bundle`文件。（Webpack是基于Node开发的，所以它的运行需要有Node环境）
  
  - #### Webpack初识：
  
    > Webpack本身的功能很有限，仅可以将JS的模块化语法预处理为前端支持的JS语法。
  
    1. 首先初始化`package.json`文件：`npm init -y`
  
    2. 下载`webpack`作为项目的开发依赖：`npm i webpack webpack-cli -D`
  
       > `webpack-cli`是webpack的命令工具，有很多webpack命令可以供我们使用。其实node命令我们之所以可以直接运行，就是因为它已经内置了node的命令工具cli，而webpack没有，所以需要手动安装这个工具才能够使用webpack命令。
  
    3. 使用`webpack`将静态资源进行打包，以及对JS的模块化语法进行预编译：（`npx`命令会将`./node_modules/.bin`目录临时添加为环境变量，并执行后面的`webpack`命令。也就是说执行npm局部包的命令需要用npx来执行）
  
       - 开发模式打包：`npx webpack ./src/main.js --mode=development`
       - （默认）生产模式打包：`npx webpack ./src/main.js --mode=production`
  
       （`./src/main.js`指定`Webpack`从入口文件`main.js`开始打包，不但会打包`main.js`，还会将其模块化`import`的依赖也一起打包进来。`--mode=xxx`指定打包模式，如果是开发模式则为易读代码，生产模式是压缩代码）
  
  - #### 观察输出文件：
  
    > 默认 `Webpack` 会将文件打包输出到 `dist` 目录下，我们查看 `dist` 目录下`main.js`文件即可。
    >
    > `Webpack`本身功能较少，**只能预处理`js`的ES6模块化语法**。其他`css`等资源它不知道怎么去处理就会报错。所以我们主要是学习如何让`Webpack`处理其他资源，让它能做更多事情。

------

- ## Webpack的核心配置文件

  - #### 概念：

    1. 入口（entry）：打包时要告诉webpack，从哪个/些文件开始打包。
    2. 输出（output）：指定打包后文件的输出位置，如何命名等。
    3. 加载器（loader）：webpack本身只能处理js、json等资源，处理其他资源需要配置对应的资源加载器。
    4. 插件（plugins）：使用插件可以扩展webpack的功能，让它做更多的事情。
    5. 模式（mode）：主要有2种输出模式，开发模式和生产模式。生产模式将代码进行了压缩、做了优化。

  - #### Webpack的配置文件：

    > 对webpack进行配置需要用到`webpack.config.js`文件，该文件必须放在**npm项目根目录**下。
    >
    > Webpack是基于Node.js运行的，所以采用Common.js模块化规范，配置文件如下：

    ```js
    const path = require('path')//用到了path模块
    modules.exports = {
    	//入口
        entry: '入口文件的相对路径',
    	//输出
        output: {
            //输出文件夹的绝对路径
        	path: path.resolve(__dirname, 'dist'),
        	//输出的文件名
        	filename: 'main.js'
        },
    	//加载器
        module: {
            rules: []//配置加载规则
            //其他配置
        },
    	//插件
        plugins: [
        	//插件的配置
        ],
    	//模式
        mode: 'development'
    }
    ```
    
    > 配置好后运行：`npx webpack`，不用加参数了，因为有配置文件了，如果再指定就会顶替配置文件。
    >
    > Webpack 将来都通过 `webpack.config.js` 文件进行配置，来增强 Webpack 的功能，让它能够处理CSS资源、转换语法等。
    
    ###### 下面我们通过两个模式来分别对Webpack进行配置。先进行开发模式的配置，再完成生产模式（会对代码进一步优化）的配置。

------

- ## 开发模式Webpack的配置：

  > 开发模式顾名思义就是我们开发代码时使用的模式。这个模式下我们主要做两件事：
  >
  > 1. 编译代码，使浏览器能够识别运行。主要是对代码进行预处理、打包，使多个静态资源文件都合并为一个JS文件。（开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack默认都不能处理这些资源，所以我们要配置来编译加载这些资源）
  > 2. 代码质量检查，树立代码规范。（提前检查代码的一些隐患，让代码运行时能更加健壮，还有提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观）

  - #### 处理CSS资源：（将css资源打包到JS中）

    > - 样式资源有`css、Less、Sass、Scss、Styl`样式资源。Webpack本身是不能识别样式资源的，所以我们需要配置加载器（Loader）来帮助Webpack解析样式资源。
    > - Webpack支持使用加载器（loader）来**对任何文件进行打包**，可以处理包括JS文件在内的任何静态资源。并且可以使用Node.js来轻松编写自定义的loader。
    >
    > - 找加载器应该去官方文档中找到对应的资源加载器（Loader），官方文档找不到的话，可以再去社区Github中搜索查询对应的软件包。官方加载器地址：https://webpack.docschina.org/loaders/

    - ##### CSS资源：就是将CSS资源也打包到JS代码中，作为JS代码的一部分使用。用法：

      1. 安装`css-loader`、`style-loader`包：`npm i css-loader style-loader -D`
  
      2. 然后在`webpack.config.js`中配置加载器规则：
  
         ```js
         module: {
             rules: [
                 {
                     //用来匹配.css结尾的文件
                     test: /\.css$/i,
                     //`use`数组里面Loader的执行顺序是从右到左
                     //css-loader负责将CSS文件编译成Webpack能识别的CommonJS模块
                     //style-loader会在main.js运行时，在当前HTML中动态创建一个style标签，里面放着				CSS模块的内容，这样CSS样式就会以style标签的形式在页面上生效
                     use: ["style-loader", "css-loader"]
                 }
             ]
         }
         ```
  
      3. 在主文件`main.js`中导入`.css`文件：`import css from './index.css'`（变量名无所谓，甚至可以import后直接跟路径），主要是导入该文件才会对该文件打包。但是导入css文件很怪，其实这是打包工具的语法，它会对其做预处理。

    - ##### Less资源：

    - ##### Sass资源：

    - ##### Scss资源：
  
    - ##### Styl资源：
  
  - #### 处理图片资源：
