# Webpack5

- ## 概述

  - #### 为什么前端需要打包工具：

    > 前端进行开发时，我们会使用框架（Vue、React），ES6模块化语法，Less/Sass等CSS预处理器进行代码的编写。而这样的代码想在浏览器上运行必须先被预处理，经历很多繁琐的步骤处理后才能运行在前端。用打包工具可以让我们避免做这样复杂的工作，让Webpack帮我们做项目的打包和代码替换，这样就可以直接放在前端运行。除此之外，打包工具还能够压缩代码、做兼容性处理、提升代码性能等。

  - #### 打包工具可以帮我们做什么：

    > 1. 性能优化：通过合并文件，减少了文件的大小，从而减少HTTP请求的数量，加快页面加载速度。
    >
    > 2. 代码预处理和打包：打包工具可以将模块化语法、框架语法（Vue、React）进行预处理。
    > 3. 资源优化：能够处理各种资源（如图片、字体、样式）并将它们包含在最终的输出中。
    > 4. 转换 & 兼容性：可以将高级的 JavaScript（例如 ES6+）或其他编程语言（例如 TypeScript）转换为广泛支持的 ES5 代码。
    > 5. 依赖管理：确保代码按正确的顺序执行，满足模块间的依赖关系。


  - #### 常见的打包工具：

    > - Grunt
    > - Gulp
    > - Parcel
    > - Webpack
    > - Rollup
    > - Vite
    > - ...
    >
    > 目前市面上最流行的是 Webpack，所以我们主要以 Webpack 来介绍使用打包工具。

  - #### Webpack概述：

    > Webpack是一个**静态资源打包工具**（就是别人写好的一个node的插件）。它会以一个或多个文件作为打包的入口，将我们整个项目的所有文件编译组合成一个或多个文件输出到当前目录的`dist`目录下（默认），输出的文件就可以在浏览器环境下运行了。通常将输出的文件称为`bundle`文件（束、捆）。（Webpack是基于Node开发的，所以它的运行需要有Node环境）

  - #### Webpack初识：

    > Webpack本身的功能很有限，仅能编译ES6的模块化语法（ESM）。

    1. 首先初始化`package.json`文件：`npm init`

    2. 下载`webpack`作为项目的开发依赖：`npm i webpack webpack-cli -D`

       > `webpack-cli`是Webpack的命令工具，有很多webpack命令可以供我们使用。其实node命令我们之所以可以直接运行，就是因为它已经内置了node的命令工具cli，而Webpack没有，所以需要手动安装这个工具才能够使用Webpack命令。

    3. 用命令`webpack`打包静态资源，也就是将一堆JS的模块化文件编译为一个JS文件：

       > `npx`命令会将`./node_modules/.bin`目录临时添加为环境变量，并执行后面的`webpack`命令。也就是说执行npm安装的局部工具包中的命令需要用npx来执行。

       - 开发模式打包：`npx webpack ./src/main.js --mode=development`

       - 生产模式打包（默认）：`npx webpack ./src/main.js --mode=production`

         > - `webpack`命令后指定打包的入口文件，也就是从main.js开始打包，将该入口文件内`import`导入的所有资源一起打包输出为一个JS文件。
         > - `--mode=xxx`参数用于指定Webpack的工作模式。若开发模式则输出易读代码，生产模式则是压缩优化后的代码。

  - #### 观察输出文件：

    > - 默认`Webpack`将文件输出到`dist`目录下，查看`dist`目录下编译后的`main.js`文件即可。
    > - `Webpack`本身功能很少，**只能编译ES6模块化语法**。如果入口文件中import了其他的Less、CSS、IMG等静态资源，它不知道如何处理后就会报错编译失败。
    >

  ###### 因此，我们主要学习如何让`Webpack`处理其他资源，让它能做更多事情。

------

- ## Webpack的核心配置文件

  - #### 概念：

    1. 入口（entry）：打包时要告诉Webpack，从哪个/些文件开始打包。
    2. 输出（output）：指定打包后文件的输出位置，如何命名等。
    3. 加载器（loader）：Webpack本身只能处理JS、JSON资源，处理其他资源需要配置对应的加载器loader。
    4. 插件（plugins）：使用插件可以扩展Webpack的功能，让它做更多的事情。
    5. 模式（mode）：主要有2种输出模式，开发模式和生产模式。生产模式将代码进行了压缩、做了优化。

  - #### Webpack的配置文件：

    > 对Webpack进行配置需要用到`webpack.config.js`文件，该文件**必须放在node项目的根目录下**。
    >
    > Webpack是基于Node.js运行的，所以采用Common.js模块化规范，配置文件如下：（目前的配置等价于之前的打包命令）

    ```js
    const path = require('path')//用到了path模块
    modules.exports = {
    	//入口文件（主文件），从哪个文件开始打包（必须用相对路径）
        entry: '入口文件的相对路径',
    	//输出（bundle文件），指定打包后的输出目录（必须用绝对路径）
        output: {
            //打包后往哪个目录输出。必须用绝对路径
        	path: path.resolve(__dirname, 'dist'),
        	//指定main.js主文件打包后的文件名。此时主文件打包后输出为dist/js/main.js
        	filename: 'js/main.js'
        },
    	//加载器
        module: {
            //rules中配置loader的规则
            rules: []
            //loader的其他配置
        },
    	//插件
        plugins: [],
    	//模式
        mode: 'development'
    }
    ```
    
    > - 配置好后，项目根目录下运行：`npx webpack`，不用加参数，因为该目录下有Webpack的默认配置文件了，如果再指定就会顶替配置文件中的配置。
    > - Webpack将来都通过`webpack.config.js`文件进行配置，来增强Webpack的功能，让它能够处理CSS资源、转换语法等。
    
    ###### 接下俩我们分别通过两个模式来对Webpack进行配置。先进行开发模式的配置，再完成生产模式（会对代码进一步优化）的配置。

------

- ## 开发模式的配置：

  > 开发模式顾名思义就是我们开发代码时使用的模式。这个模式下我们主要做两件事：
  >
  > 1. 编译代码，使浏览器能够识别运行。主要是对代码进行预处理、打包，使多个静态资源文件都合并为一个JS文件。（开发时我们有样式资源、字体图标、图片资源、html 资源等，Webpack默认都不能处理这些资源，所以我们要配置来Loader来处理这些资源）
  > 2. 代码质量检查，树立代码规范。（提前检查代码的一些隐患，让代码运行时能更加健壮，还有提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观）

  - #### 处理CSS资源：（将css资源打包到JS中）

    > - 样式资源有`CSS、Less、Sass、Scss、Styl`样式资源。Webpack本身是不能识别样式资源的，所以我们需要配置加载器（Loader）来帮助Webpack解析和打包样式资源。
    > - Webpack支持用Loader（加载器）来**对任何文件进行打包**，可以处理包括JS文件在内的任何静态资源。并且可以使用Node.js来轻松编写自定义的Loader。
    >
    > - 找加载器应该去官方文档中找到对应的资源加载器（Loader），官方文档找不到的话，可以再去Github社区中找对应的Loader软件包。官方Loader地址：https://webpack.docschina.org/loaders/

    - ##### CSS资源：

      > 就是将CSS资源也打包到JS代码中，作为JS代码的一部分使用。用法：

      1. 安装`css-loader`、`style-loader`包：`npm i css-loader style-loader -D`

      2. 然后在`webpack.config.js`中配置loader：

         ```js
         module: {
             rules: [
                 {
                     //匹配.css结尾的文件
                     test: /\.css$/i,
                     //`use`表示用哪些loader来处理该文件。数组里面Loader的执行顺序是从右到左。css-loader负责将CSS文件编译成Webpack能识别的CommonJS模块；style-loader会在打包main.js时，将JS模块中的CSS代码，通过动态创建style标签的方式使用引入的CSS文件
                     use: ["style-loader", "css-loader"]//如果写loader:''配置项，则只能用一个loader
                 },
             ]
         }
         ```

      3. 在主文件`main.js`中导入`.css`文件：`import './index.css'`。只有在入口文件中导入该文件才会将该CSS打包进来。

         > 其实这是打包工具Webpack能识别的语法，它会对import导入的CSS文件用指定的Loader去处理。

    - ##### Less资源：

      > 和处理CSS资源的配置类似，只是要在最右边再加一个`less-loader`，先将.less文件编译成CSS：

      1. 安装less-loader：`npm i less-loader -D`

      2. rules配置项的数组中追加一个loader的配置对象：

         ```js
         {
         	test: /\.less$/,
         	use: ["style-loader", "css-loader", "less-loader"],
         },
         ```

    - ##### Stylus资源：

      > Stylus也是一个CSS预处理器，文件以`.styl`结尾。处理方式和Less类似，用的是`stylus-loader`。

    - ##### Sass/Scss资源：

      > Sass也是一个CSS预处理器，文件以`.sass`或`.scss`结尾。和之前不同的是，它需要安装两个依赖：`npm i sass-loader sass -D`，其中`sass-loader`需要依赖`sass`编译为CSS。loader配置对象：

      ```js
      {
      	test: /\.s[ac]ss$/,
      	use: ["style-loader", "css-loader", "sass-loader"],
      },
      ```

  - ------

    #### 处理图片、字体以、多媒体资源：
  
    > - 过去在Webpack4时，我们处理图片资源是通过`file-loader`和`url-loader`进行处理。
    > - 当CSS中通过`url()`引入了外部图片时，file-loader会将资源原封不动输出。而url-loader是在前者基础上，将小于某个大小的图片转成base64格式（做优化）。
    > - 将图片用Base64转成字符串的优点是：不需要再发送请求了。缺点是：体积会比原来大一些（图片越大大的越多）。所以一般我们综合考虑，会将小于10KB的图片进行Base64转码，减轻服务器的压力。
  
    > 现在Webpack5已经将这两个Loader的功能内置到Webpack了。默认情况下，CSS中引入图片或字体文件时，会原封不动输出到dist目录下。如果想用`url-loader`对图片进行Base54转码，我们需要手动配置`url-loader`：（不用安装了）
    >
    > ```js
    > {
    > 	test: /\.(png|jpe?g|gif|webp|svg)$/,
    > 	type: "asset",// 这个表示用url-loader，小于某个大小的图片会自动转Base64
    > 	parser: {
    > 		dataUrlCondition: {
    > 			maxSize: 10 * 1024 // 设置小于10kb的图片会被base64处理
    > 		}
    > 	},
    >     // 还可以指定输出图片的路径和文件名。该配置项是`file-loader`中独有的
    >     generator: {
    >         // 指定输出的文件名。将图片文件命名为[hash][ext][query]，其中：
    >           // [hash]: 原来图片的文件名改为hash值，如果觉得文件名hash值太长了，可以指定hash值长度：[hash:10]
    >           // [ext]: 使用之前的文件扩展名
    >           // [query]: 添加之前的query参数
    >         filename: "imgs/[hash][ext][query]"
    >     }
    > },
    > ```
  
    > 还需要处理字体、音视频等需要原封不动输出的文件，它们都用`file-loader`将这些文件原封不动输出到指定目录中：
    >
    > ```js
    > {
    > 	test: /\.(ttf|woff2?|map4|map3|avi)$/,
    > 	type: "asset/resource",// 表示使用`file-loader`
    > 	generator: {
    >         // 指定文件的输出目录
    > 		filename: "media/[hash:8][ext][query]",
    > 	},
    > },
    > ```
  
  - #### 自动清空上次打包的内容：
  
    > 只需要在`output`中添加配置：`clean: true`，这样每次打包前会先将path目录进行清空，再输出。（Webpack4需要安装插件来完成：`clean-webpack-plugin`）
  
  - ------
  
    #### 处理JS资源：
  
    > 你可能会问，JS资源Webpack不是已经能处理了吗，为什么我们还要去配置处理JS资源呢？原因是：
    >
    > > Webpack对JS的处理是有限的，只能编译中ES6的模块化语法，不能做其他事情了。我们有时候还想做代码的格式检查、兼容性处理、性能优化、编译JS的扩展语法JSX或Vue的模板语法...，这些都需要在Webpack中配置才行。
    >
    > 对JS、JSX代码进行格式检查一般都用Eslint，对JS代码做兼容性处理一般用Babel。
  
    ###### 我们先用Eslint检查代码格式，无误后再用Babel做兼容性处理。
  
    - **Eslint**：可组装的 JavaScript 和 JSX 检查工具（Facebook公司的）。我们用Eslint关键是写Eslint的配置文件，里面写上各种rules规则，将来运行Eslint进行语法检查时就可以根据写的规则对代码进行检查了。
  
      1. Eslint的配置文件：（以`.eslintrc.js`为例）
  
         > - 它的配置文件格式可以是多种，`.eslintrc`、`.eslintrc.js`、`.eslintrc.json`都可以，只是格式不同罢了。
         > - 不创建Eslint的配置文件也行，可以直接在`package.json`中通过`eslintConfig`配置项写Eslint的检查规则。
         >
         > （以上配置方式使用一种即可，运行时ESLint会自动查找并读取它们）
  
         ```js
         
         ```
  
    - **Babel**：

------

- ## 生产模式的配置：

