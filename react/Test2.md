- ### React脚手架

  > 使用React脚手架可以快速创建基于React的项目，在脚手架环境下开发React项目效率更高。

  > React官方提供了一个用于快速创建React项目的工具：create-react-app，通过它提供的命令可以快速创建一个React项目（node项目）。

  ###### 安装`create-react-app`工具并通过该工具创建React项目（React脚手架环境）：

  1. 安装create-react-app工具：`npm i -g create-react-app`（也可以用yarn，yarn和React是同一家公司的配合使用更好）
  2. 切换到你存放React项目的目录下执行：`create-react-app 项目名`
  3. 等待React项目创建成功后，cd进入项目目录中执行`npm start`即可启动React脚手架中自带的Hello Word项目。

  ###### React项目创建成功后，查看`package.json`的scripts配置项目：

  ```json
  "scripts": {
  	"start": "react-scripts start",
  	"build": "react-scripts build",
  	"test": "react-scripts test",
  	"eject": "react-scripts eject"
  },
  ```

  > - 其中`npm start`可以启动一台开发者服务器，帮助我们开发和调试React项目。
  > - `npm run build`可以将前端开发完毕的项目，打包生成静态资源文件，由后端部署在服务器上运行。
  > - `npm run test`是做前端测试的，我们几乎不用。
  > - `npm run eject`可以将React脚手架隐藏起来的，所有Webpack相关的命令及配置文件都暴露出来，方便我们更底层的配置React脚手架。这个操作是永久性的不能返回。（之所以React将其隐藏起来就是怕碰坏了导致项目崩溃，一般我们不用动）

  ###### 分析脚手架目录：

  - public：该目录下存放不参与打包的静态资源。其中包含`index.html`，它是React项目的主页面，将来所有的东西都会打包放在这个文件中（以后我们编写的都是SPA单页面应用），里面有一个id为root的div用于存放根组件App。public下的其他文件目前还用不到删除即可。

  - src：

    - App.js & App.css：分别是App组件和App组件的样式文件。**App组件是所有组件的根组件**，id为root的div中只需要引入App组件即可。

    - index.js & index.css：React项目的**入口文件**和全局样式文件。入口文件中引入了App组件并通过`ReactDOM.render()`将根组件渲染到了id为root的div中（至于为什么能找到index.html是因为脚手架的Webpack中配置好了）。全局样式文件中存放全局样式，如果不想参与打包也可以放在public目录下在index.html中进行导入。

      > - 至于`<App/>`标签外层为什么要包裹一个`<React.StrictMode>`标签，是因为包裹了之后它能帮助检查App组件及其子组件写的是否合理。
      > - App组件中还用了`reportWebVitals.js`，它是用于记录页面上的性能的，里面用的`web-vitals`库。

    - 其他的像：App.test.js是专门为App组件做测试的，setupTests.js是用于React项目的整体测试或组件测试的，这俩几乎不用。

------

