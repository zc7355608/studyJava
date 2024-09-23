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
    > - **Webpack**
    > - Rollup
    > - **Vite**
    > - ...
    >
    > 目前市面上最流行的是 Webpack，所以我们主要以 Webpack 来介绍使用打包工具。

  - #### Webpack概述：

    > Webpack是一个**静态资源打包工具**（就是别人写好的一个基于Node的开发依赖工具包）。它会以一个或多个文件作为打包的入口，将我们整个项目的所有文件编译组合成一个或多个文件输出到项目根目录的`dist`目录下（默认）。输出的文件就可以直接在浏览器环境下运行了。通常将输出的文件称为`bundle`（束、捆）。

  - #### Webpack初识：

    > Webpack本身的功能很有限，仅能编译ES6的模块化语法（ESM）。

    1. 首先初始化`package.json`文件：`npm init`

    2. 下载`webpack`作为项目的开发依赖：`npm i webpack webpack-cli -D`

       > `webpack-cli`是Webpack的命令工具，有很多webpack命令可以供我们使用。其实node命令我们之所以可以直接运行，就是因为它已经内置了node的命令工具cli，而Webpack没有，所以需要手动安装这个工具才能够使用Webpack命令。

    3. 用命令`webpack`打包静态资源，也就是将一堆JS的模块化文件编译为一个JS文件：

       > `npx`命令会将`./node_modules/.bin`目录临时添加为环境变量，并执行后面的`webpack`命令。也就是说执行npm安装的局部工具包中的命令需要用npx来执行。

       - 开发模式打包：`npx webpack ./src/main.js --mode=development`

       - 生产模式打包（默认）：`npx webpack ./src/main.js --mode=production`

         > - 在`webpack`命令后面指定打包的入口文件，也就是从main.js开始打包，将该入口文件内通过`import`所关联的所有资源一起打包输出为一个JS文件。
         > - `--mode=xxx`参数用于指定Webpack的工作模式。若开发模式则输出易读代码，生产模式会压缩JS代码。

  - #### 观察输出文件：

    > - 默认`Webpack`将文件输出到`dist`目录下，查看`dist`目录下编译后的`main.js`文件即可。
    > - `Webpack`本身功能很少，**只能编译ES6模块化语法**，其他的新语法如箭头函数等都原封不动输出的。如果入口文件中import了其他的Less、CSS、IMG等静态资源，它不知道如何处理后就会报错编译失败。
    >

  ###### 	因此，我们主要学习如何让`Webpack`处理其他资源，让它能做更多事情。

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

  -   #### 处理图片、字体、多媒体等资源：
  
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
    >  // 还可以指定输出图片的路径和文件名。该配置项是`file-loader`中独有的
    >  generator: {
    >      // 指定输出的文件名。将图片文件命名为[hash][ext][query]，其中：
    >        // [hash]: 原来图片的文件名改为hash值，如果觉得文件名hash值太长了，可以指定hash值长度：[hash:10]
    >        // [ext]: 使用之前的文件扩展名
    >        // [query]: 添加之前的query参数
    >      filename: "imgs/[hash][ext][query]"
    >  }
    > },
    > ```
  
    > 还需要处理字体、音视频等需要原封不动输出的文件，它们都用`file-loader`将这些文件原封不动输出到指定目录中：
    >
    > ```js
    > {
    > 	test: /\.(ttf|woff2?|map4|map3|avi)$/,
    > 	type: "asset/resource",// 表示使用`file-loader`
    > 	generator: {
    >      // 指定文件的输出目录
    > 		filename: "media/[hash:8][ext][query]",
    > 	},
    > },
    > ```
  
  - #### 自动清空上次打包的内容：
  
    > 只需要在`output`中添加配置：`clean: true`，这样每次打包前会先将path目录进行清空，再输出。（Webpack4需要安装插件来完成：`clean-webpack-plugin`）
  
  - ------
  
  -   #### 处理JS资源：
  
    > 你可能会问，JS资源Webpack不是已经能处理了吗，为什么我们还要去配置处理JS资源呢？原因是：
    >
    > > Webpack对JS的处理是有限的，只能编译中ES6的模块化语法，不能做其他事情了。我们有时候还想做代码的格式检查、兼容性处理、性能优化、编译JS的扩展语法JSX或Vue的模板语法...，这些都需要在Webpack中配置才行。
    >
    > 对JS、JSX代码进行格式检查一般都用Eslint，对JS代码做兼容性处理一般用Babel。
  
    ###### 我们先用Eslint检查代码格式，无误后再用Babel做兼容性处理。
  
    - **Eslint**：可组装的 JavaScript 和 JSX 检查工具（Facebook公司的）。我们用Eslint关键是写Eslint的配置文件，里面写上各种rules规则，将来运行Eslint进行语法检查时就可以根据写的规则对JS/TS代码进行检查了。
  
      - ###### Eslint的配置文件：（以`.eslintrc.js`为例）
  
        > EsLint的配置文件格式可以是：`.eslintrc`、`.eslintrc.js`、`.eslintrc.json`多种（最新版推荐用`eslint.config.js`），只是格式不同罢了。并且不创建Eslint的配置文件也行，可以直接在`package.json`中通过`eslintConfig`配置项写Eslint的检查规则。（配置方式使用一种即可，运行时ESLint会自动查找读取）
  
        ```js
        module.exports = {
          // 解析选项
          parserOptions: {
            ecmaVersion: 6, // ES的语法版本
            sourceType: "module", // 用的哪个模块化
            ecmaFeatures: { // 用的ES的其他特性
            	jsx: true // 是否检查JSX语法
            }
          },
        
          // 继承其他规则。开发中一点点写rules规则太费劲了，有更好的办法，继承现有的规则。
              /* 有以下较为有名的规则：
        				Eslint 官方的规则：eslint:recommended
        				Vue Cli 官方的规则：plugin:vue/essential
        				React Cli 官方的规则：react-app
              */
        	extends: ["eslint:recommended"], // 我们自己配置的rules写在extends下面，这样可以改掉eslint的默认规则
        
          		/*
          			"off" 或 0 - 关闭规则
              	"warn" 或 1 - 开启规则，使用警告级别的错误，不会导致程序退出
              	"error" 或 2 - 开启规则，使用错误级别的错误，当被触发的时候程序会退出，打包失败
          		*/
        	// 具体的检查规则
          rules: {
            semi: "error", // 禁止使用分号
            'array-callback-return': 1, // 强制数组方法的回调函数中有 return 语句，否则警告
            'default-case': [ // 如果需要再配置详细的规则，需要用数组的第2个参数
            	'warn', // 要求 switch 语句中有 default 分支，否则警告
            	{ commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
            ],
            eqeqeq: ['warn','smart'],
            // ...其他规则参考官网
          },
        }
        ```
  
      - ###### ESLint的使用：
  
        > ESLint在Webpack4中是一个Loader，在5中是作为插件使用。步骤如下：
  
        1. 下载包：`npm i eslint-webpack-plugin eslint -D`（后者是要用的eslint工具，前者是将eslint集成到Webpack的插件）
  
        2. 在项目根目录下编写`.eslintrc.js`文件，并将eslint配置到`webpack.config.js`中：
  
           ```js
           const ESLintPlugin = require('eslint-webpack-plugin');
           
           module.exports = {
             // ...
             plugins: [
               new ESLintWebpackPlugin({
               	// 指定检查的目录为src，其他配置项参考webpack官网
               	context: path.resolve(__dirname, "src"),
               }),
             ],
             // ...
           }
           ```
  
           > 此时执行`npx webpack`打包时，打包前会先用eslint检查语法，检查通过后才会进行打包输出。检查不通过则程序终止不输出文件。
  
        ###### 如果想忽略某个文件，可以在项目根目录下新建eslint的忽略文件`.eslintignore`：
  
        ```yaml
        # 不检查根目录下的dist目录
        dist
        ```
  
      ------
  
    - **Babel**：它是一个JavaScript编译器。主要用于将ES6语法编写的代码转换为向后兼容的JavaScript代码，以便能够运行在旧版本的浏览器中。
  
      - ###### Babel的配置文件：（以`babel.config.js`为例）
  
        > Babel的配置文件格式可以是：`babel.config.js`、`babel.config.json`、`.babelrc`、`.babelrc.js`、`.babelrc.json`多种。并且不创建Babel的配置文件也行，直接在`package.json`中通过`babel`配置项写Babel的转换规则。（配置方式使用一种即可，运行时Babel会自动查找读取）
  
        ```js
        module.exports = {
          // 预设。就是添加一组Babel的插件，扩展Babel的功能，想让Babel转换哪些语法就要添加哪些插件进去
          		/* 常用的预设插件有：
                @babel/preset-env: 用来编译最新的JS语法
                @babel/preset-react：用来编译React的JSX语法的预设插件
                @babel/preset-typescript：用来编译TS语法的预设插件
          		*/
          presets: ["@babel/preset-env"],
        }
        ```
  
      - ###### Babel的使用：
  
        1. 下载包：`npm i babel-loader @babel/core @babel/preset-env -D`（分别是babel的loader、babel、babel的预设插件）
  
        2. 项目根目录下编写Babel的配置文件`babel.config.js`，并将Babel的Loader配置到Webpack的配置文件中：
  
           ```js
           module: {
             rules: [
               ...
               {
               	test: /\.js$/,
               	exclude: /node_modules/, // 排除node_modules代码不编译
               	loader: "babel-loader",
               },
               ...
             ]
           }
           ```
  
           > 然后运行指令`npx webpack`，查看打包后的文件会发现：箭头函数等ES6的语法已经被转换了。
  
    ------
  
  - #### 处理HTML资源：
  
    > 之所以要处理HTML资源，是因为我们打包完成后，还需要在index.html中手动通过script标签来引入bundle。其实可以通过插件来自动引入bundle：
  
    1. 下载包：`npm i html-webpack-plugin -D`
  
    2. `webpack.config.js`中：
  
       ```js
       const HtmlWebpackPlugin = require("html-webpack-plugin")
       
       module.exports = {
         // ...
         plugins: [
         	new HtmlWebpackPlugin({
             // 以 public/index.html 为模板创建文件。生成的新html内容和源文件一致，且会自动引入打包生成的bundle
             template: path.resolve(__dirname, "public/index.html"),
         	}),
         ],
         // ...
       }
       ```
  
       > 然后运行指令`npx webpack`，此时dist目录还会输出一个index.html文件。并且使用了该插件后，如果设置的是开发模式：`mode: 'development'`，那么默认会压缩生成的html代码。
  
    ------
  
  - #### 开发服务器&自动化：

    > 我们现在每次修改源代码时，都需要重新执行下`npx webpack`才能看到最新的效果，很麻烦。可以配置一个开发服务器来将整个流程自动化。
  
    1. 下载包：`npm i webpack-dev-server -D`（webpack-dev-server会自动开启一个服务器来监视src/下的代码，当代码变化后会自动重新打包）
  
    2. `webpack.config.js`中：
  
       ```js
       module.exports = {
         // ...
         // 配置开发服务器
         devServer: {
         	host: "localhost", // 启动服务器ip
         	port: "3000", // 启动服务器端口号
         	open: true, // 是否自动打开浏览器
         },
         // ...
       }
       ```
  
       > 此时就不是执行`npx webpack`了，而是用`npx webpack serve`启动开发服务器，内存编译打包没有输出。（因为开发时我们只关心代码能运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道）


------

- ## 生产模式的配置：

  > 生产模式是开发完成代码后，我们需要得到代码将来部署上线。这个模式下我们主要对代码进行优化，让其运行性能更好。优化主要从两个角度出发：
  >
  > 1. 优化代码运行性能
  > 2. 优化代码打包速度

  - #### 生产模式准备：

    1. 我们准备2个配置文件，分别存放不同环境下的webpack配置文件。在根目录下新建2个文件：`config/webpack.dev.js`和`config/webpack.prod.js`。

    2. 开发环境下的配置文件：`config/webpack.dev.js`

       ```js
       const path = require("path")
       const ESLintWebpackPlugin = require("eslint-webpack-plugin")
       const HtmlWebpackPlugin = require("html-webpack-plugin")
       
       module.exports = {
         // 由于`webpack`命令是在项目根目录下执行的，所以相对路径不用变。绝对路径得改
         entry: "./src/main.js",
         output: {
           path: undefined, // 开发模式没有输出，不需要指定输出目录
           filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
           // clean: true, // 开发模式没有输出，不需要清空输出结果
         },
         module: {
           rules: [
             {
               // 用来匹配 .css 结尾的文件
               test: /\.css$/,
               // use 数组里面 Loader 执行顺序是从右到左
               use: ["style-loader", "css-loader"],
             },
             {
               test: /\.less$/,
               use: ["style-loader", "css-loader", "less-loader"],
             },
             {
               test: /\.s[ac]ss$/,
               use: ["style-loader", "css-loader", "sass-loader"],
             },
             {
               test: /\.styl$/,
               use: ["style-loader", "css-loader", "stylus-loader"],
             },
             {
               test: /\.(png|jpe?g|gif|webp)$/,
               type: "asset",
               parser: {
                 dataUrlCondition: {
                   maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                 },
               },
               generator: {
                 // 将图片文件输出到 static/imgs 目录中
                 // 将图片文件命名 [hash:8][ext][query]
                 // [hash:8]: hash值取8位
                 // [ext]: 使用之前的文件扩展名
                 // [query]: 添加之前的query参数
                 filename: "static/imgs/[hash:8][ext][query]",
               },
             },
             {
               test: /\.(ttf|woff2?)$/,
               type: "asset/resource",
               generator: {
                 filename: "static/media/[hash:8][ext][query]",
               },
             },
             {
               test: /\.js$/,
               exclude: /node_modules/, // 排除node_modules代码不编译
               loader: "babel-loader",
             },
           ],
         },
         plugins: [
           new ESLintWebpackPlugin({
             // 指定检查文件的根目录（绝对路径要改下）
             context: path.resolve(__dirname, "../src"),
           }),
           new HtmlWebpackPlugin({
             // 以 public/index.html 为模板创建文件
             // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
             template: path.resolve(__dirname, "../public/index.html"),
           }),
         ],
         // 开发时用开发服务器启动项目
         devServer: {
           host: "localhost", // 启动服务器域名
           port: "3000", // 启动服务器端口号
           open: true, // 是否自动打开浏览器
         },
         mode: "development",
       }
       ```

       > 运行开发模式的命令：`npx webpack serve --config ./config/webpack.dev.js`

    3. 生产环境下的配置文件：`config/webpack.prod.js`（生产环境下还有其他配置，后面会补充）

       ```js
       const path = require("path")
       const ESLintWebpackPlugin = require("eslint-webpack-plugin")
       const HtmlWebpackPlugin = require("html-webpack-plugin")
       
       module.exports = {
         entry: "./src/main.js",
         output: {
           path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
           filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
           clean: true, // 自动清理上次打包的资源
         },
         module: {
           rules: [
             {
               test: /\.css$/,
               use: ["style-loader", "css-loader"],
             },
             {
               test: /\.less$/,
               use: ["style-loader", "css-loader", "less-loader"],
             },
             {
               test: /\.s[ac]ss$/,
               use: ["style-loader", "css-loader", "sass-loader"],
             },
             {
               test: /\.styl$/,
               use: ["style-loader", "css-loader", "stylus-loader"],
             },
             {
               test: /\.(png|jpe?g|gif|webp)$/,
               type: "asset",
               parser: {
                 dataUrlCondition: {
                   maxSize: 10 * 1024,
                 },
               },
               generator: {
                 filename: "static/imgs/[hash:8][ext][query]",
               },
             },
             {
               test: /\.(ttf|woff2?)$/,
               type: "asset/resource",
               generator: {
                 filename: "static/media/[hash:8][ext][query]",
               },
             },
             {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: "babel-loader",
             },
           ],
         },
         plugins: [
           new ESLintWebpackPlugin({
             context: path.resolve(__dirname, "../src"),
           }),
           new HtmlWebpackPlugin({
             template: path.resolve(__dirname, "../public/index.html"),
           }),
         ],
         // 生产时不使用开发服务器
         // devServer: {
         //   host: "localhost", // 启动服务器域名
         //   port: "3000", // 启动服务器端口号
         //   open: true, // 是否自动打开浏览器
         // },
         mode: "production", // 生产模式下`html-webpack-plugin`会压缩html代码，js默认webpack就会压缩
       }
       ```

       > 运行生产模式的指令：`npx webpack --config ./config/webpack.prod.js`

    4. 配置运行指令：

       > 为了方便运行不同模式的指令，我们将指令定义在package.json中scripts里面：

       ```json
       {
         "scripts": {
           "start": "npm run dev",
           "dev": "npx webpack serve --config ./config/webpack.dev.js",// 其实配置在scripts中的命令别名可以不用npx开头
           "build": "npx webpack --config ./config/webpack.prod.js"
         }
       }
       ```

       > 以后启动项目：
       >
       > - 开发模式：`npm start` 或 `npm run dev`
       > - 生产模式：`npm run build`

  ------

  - #### 生产模式下CSS的处理：

    1. ##### 将CSS提取为单独文件：

       > 开发模式下的CSS文件被打包到JS文件中有助于在代码更改时立即查看到效果，但是在生产环境下这种方式就不太好了。当JS文件加载时，会动态创建style标签来生成样式。这种方式网络差时会出现闪屏现象，并且没有link标签加载CSS的性能好，代码也无法复用。因此得处理CSS。

       1. 下载包：`npm i mini-css-extract-plugin -D`

       2. 在`webpack.prod.js`中进行配置：

          ```js
          const MiniCssExtractPlugin = require("mini-css-extract-plugin")
          
          module.exports = {
            // 需要将原来所有用到"style-loader"的地方替换成：MiniCssExtractPlugin.loader
            module: {
              rules: [
                {
                	test: /\.css$/,
                	use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                // ...其他地方的"style-loader"也要替换
              ]
            }
            // ...
            plugins: [
              // 它会将所以css提取合并为一个单独文件
              new MiniCssExtractPlugin({
              	// 定义输出文件名
              	filename: "static/css/main.css",
              }),
            ],
            // ...
          }
          ```

    2. ------

       ##### 为CSS做兼容性处理：

       > CSS样式也是有兼容性的，所以需要让Webpack来帮我们加上私有前缀去处理下。步骤：

       1. 下载包：`npm i postcss-loader postcss postcss-preset-env -D`

       2. 在`webpack.prod.js`中进行配置：

          ```js
          module.exports = {
            // 需要在所有的"css-loader"前面，"less-loader"后面加上该对象
            module: {
              rules: [
                {
                  test: /\.less$/,
                  use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                      loader: "postcss-loader",
                      options: {
                        postcssOptions: {
                          plugins: [
                            "postcss-preset-env", // 能解决大多数样式兼容性问题
                          ],
                        },
                      },
                    },
                    "less-loader",
                  ],
                },
                // ...用到css-loader的地方都需要换
              ]
            }
            // ...
          }
          ```

       3. （可不做）控制兼容性的处理程度：

          > 我们可以在`package.json`中添加`browserslist`来控制CSS的兼容性做到什么程度。（以上配置已经可以处理大部分兼容性问题了）

          ```js
          {
            // 其他省略
            "browserslist": ["ie >= 8"] // 设置兼容ie8以上的浏览器
            /* 但是实际开发中我们一般不考虑旧版本浏览器了，所以我们可以这样设置：
            	"browserslist": ["last 2 version", "> 1%", "not dead"]
            	表示市面上所有浏览器只兼容其最近2个版本，且只覆盖99%的浏览器冷门的不管，且不管没人维护的浏览器了（交集）
            */
          }
          ```

       4. （可不做）合并配置：

          > 我们发现做兼容性配置时有大量的重复代码，可以这样做，在`webpack.prod.js`中加一个函数：（得是JS配置文件才可以）

          ```js
          // 定义处理样式的函数，返回（Loaders）数组
          const getStyleLoaders = (preProcessor) => {
            return [
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                  },
                },
              },
              preProcessor,
            ].filter(Boolean)
          }
          ```

          > css-loader、less-loader中这样写：

          ```js
          module: {
              rules: [
                {
                  test: /\.css$/,
                  use: getStyleLoaders(),
                },
                {
                  test: /\.less$/,
                  use: getStyleLoaders("less-loader"),
                },
              ]
          }
          ```

    3. ------

       ##### 压缩CSS：

       1. 下载包：`npm i css-minimizer-webpack-plugin -D`

       2. 在`webpack.prod.js`中进行配置该插件：

          ```js
          const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
          
          module.exports = {
            // ...
            plugins: [
              // 配置CSS压缩插件
              new CssMinimizerPlugin(),
            ],
            // ...
          }
          ```

------

