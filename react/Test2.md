# React路由（前端路由）

------

> - **路由（Route）**就是一组K-V的对应关系。多个路由需要经过**路由器（Router）**的管理。
> - React中的路由是一个React的**插件（react-router）**，专门为了实现SPA（单页面）应用的。其中K为路径，V是组件。原理是：当页面导航栏的路径发生变化后（没有发请求），就会被react-router监测到，然后根据路径找对应的组件渲染到页面上。
> - SPA应用（Single Page web Application）的特点：
>   1. 整个应用只有**一个完整的页面**（1个html）。
>   2. 点击页面导航**不会刷新页面，只做局部的组件更换**。
>   3. 数据需要通过AJAX来获取。
> - `react-router`专门用于在React中实现路由。它有3个分支，分别是在web、native、anywhere环境下使用。我们用的是web方向的`react-router-dom`。

###### React中路由的使用：

> 使用前要先安装：`npm i react-router-dom@5`，这里先用5版本。

1. 编写路由导航：React中靠`<Link>`标签来切换组件。它是一个组件，本质上就是a标签。所以首先将页面中的a标签（路由导航）换成`<Link/>`标签。

   ```jsx
   import { Link } from 'react-router-dom'
   
   export default class App extends Component{
     render(){
       return (
         ...
         <div>
           <Link className="list-group-item" to="/about">About</Link>
           <Link className="list-group-item" to="/home">Home</Link>
         </div>
         ...
       )
     }
   }
   ```

   > 但此时运行会报错，因为还没有路由器实例呢。路由相关的标签都需要写在`<BrowserRouter>`或`<HashRouter>`路由器标签（Router实例）里面，都要收到路由器的管理。而一般项目中我们就用一个路由器，并且不同文件中写的路由标签都需要被这一个路由器标签包起来。因此路由器标签我们直接写在入口文件index.js中`<App/>`组件的外面：
   >
   > ```jsx
   > import React from 'react'
   > import ReactDOM from 'react-dom'
   > // 引入路由器
   > import { BrowserRouter } from 'react-router-dom'
   > import App from './App' // React脚手架中可以省略扩展名.jsx
   > 
   > ReactDOM.render(
   >      <BrowserRouter>
   >    	<App/>
   >      </BrowserRouter>,
   >      document.getElementById('root')
   > )
   > ```

   > **路由的两种工作模式：**
   >
   > React中路由器有两种：一种是`<BrowserRouter>`底层是H5的History API，路径上没有哈希值。另一种是`<HashRouter>`底层是`#`号实现的，路径上有哈希值。

2. 注册路由：在要切换组件的地方写`<Route>`标签，并通过它的path和component属性注册路由。

   ```jsx
   import { Link, Route } from 'react-router-dom'
   import About from './pages/About'
   import Home from './pages/Home'
   
   export default class App extends Component{
     render(){
       return (
         ...
         <div>
           <Route path="/about" component={About}/>
           <Route path="/home" component={Home}/>
         </div>
         ...
       )
     }
   }
   ```

------

- #### NavLink标签（组件）

  > - 它和`<Link>`标签的区别是：`<NavLink>`标签对应的**组件被激活时**会给自身加`active`类名。
  > - 并且`<NavLink>`标签还多了一个`activeClassName`属性，可以自己指定**组件被激活时**要加的类名。

- #### Switch标签（组件）

  > - 默认情况下，组件切换时一个path可以匹配多个组件。如果你切换的地方注册了多个路径path相同的组件：
  >
  >   ```xml
  >   <div>
  >   	<Route path="/about" component={About}/>
  >   	<Route path="/home" component={Home}/>
  >   	<Route path="/home" component={Home1}/>
  >   	<Route path="/home" component={Home2}/>
  >   </div>
  >   ```
  >
  >   那么路由切换时匹配上了`/home`之后还会继续往下匹配，将符合路径的所有组件都激活展示。
  >
  > - 这其实这是存在效率问题的，我们希望它匹配上第一个path之后就不要再激活下面的其他组件了。此时就可以用`<Switch>`标签将`<Route>`包起来。
  >
  > - 通常情况下，path和component是一一对应的关系。如果注册了多个组件，通常为了提高效率，会用`<Switch>`标签给这些`<Route>`包起来。

- #### 路由的严格匹配和模糊匹配

  > 默认情况下，每个`<Route path="/home" component={Home2}/>`标签中注册的组件都是模糊匹配，也就是说`<Link to="/home/a/b" >Home</Link>`也可以匹配上该组件。如果想设置为严格匹配，加属性：`<Link exact={true}/>`

  ###### 注意：通常页面没问题的话，我们不去开启严格匹配。如果严格匹配随便开，有时候会引发很严重的问题（如：无法匹配二级路由等问题）。

- #### Redirect标签（组件）

  > Redirect标签用于兜底。如果前面的`<Route path="/home" component={Home2}/>`都没匹配上，那么就听Redirect标签（组件）的：

  ```jsx
  import { Link, Route, Switch, Redirect } from 'react-router-dom'
  ...
  <div>
    <Switch>
      <Route path="/about" component={About}/>
      <Route path="/home" component={Home}/>
      <Redirect to="/home"/>
    </Switch>
  </div>
  ```

  > 它实际上是将path进行了重定向。

------

- #### 路由的嵌套（多级路由）

  > **路由注册的顺序：**
  >
  > - 组件初始化执行`render()`方法时，如果其中写了`<Route/>`标签，那么会顺序注册这些组件。
  > - 注册组件时会根据路径分层级。若某个组件的path是另一个组件的子组件，那么该组件会注册到另一个组件中。
  > - 当路由切换进行路径匹配时，只有父组件的路径匹配成功，才会继续匹配其中的子组件。
  >
  > 这也是为什么开启路由的严格匹配，会导致无法匹配二级路由。

  ###### 路由的嵌套：

  > 根据路由的注册和匹配模式：子路由的path开头要加上父路由的path值。

------

- #### React中的路由组件和一般组件的区别

  > 我们知道Vue中路由组件身上会多两个API：`$router`和`$route`，那么React的路由组件和一般组件有什么区别呢？路由组件激活后props会收到数据：
  >
  > - history：该属性是**全局唯一**的。因为历史记录是Router路由器在维护，而路由器只有一个。
  >   - go(n)/goBack()/goForward()：用于操作历史记录栈针。（后面会说）
  >   - push(url, state)/replace(url, state)：用于实现**编程式路由导航**，让路由跳转不再依赖于`<Link/>`标签。参数1是路由的path，参数2是state对象用于state传参。
  > - location：
  >   - pathname：存放该路由组件所注册的path值。
  >   - search：存放路由路径`?`以及后面的查询字符串。默认值为空串。
  >   - state：存放传过来的state对象的。默认值为`undefined`。
  > - match：
  >   - params：存放传过来的params参数，值是一个对象（默认值为`{}`）。
  >   - path：存放该路由组件的path值。不同于pathname，它可能会包含动态参数（params参数的占位符）。
  >   - url：存放该路由组件的path值。不同于path，它是实际传过来的path，会将动态参数替换为值。

- #### 路由传参

  > 由于路由组件没有办法直接写组件标签，所以之前通过props给普通组件传递数据的方式就不能用了。路由组件有自己独有的传参方式。路由组件可以接收三种参数：**search参数**、**params参数**、**state参数**。（使用频率从上到下）
  >
  
  - ##### search参数（query参数）：
  
    - 路由导航`<Link/>`标签中传数据：
  
      ```jsx
      <Link to={`/home?id=${id}&title=${title}`}>Home</Link>
      ```
  
    - 从`this.props.location.search`对象中取数据，数据React并没有整理成对象，而是：`?id=001&title=abc`
  
    - 一般我们用`querystring`库将这个数据再处理下：（无需安装，React脚手架已经下载好了）
  
      ```js
      import qs from 'querystring'
      // url编码格式的字符串都可以用该方法转成对象（不带?）
      // qs.parse(str)
      // 对象转成url编码字符串（不带?）
      // qs.stringify(obj)
      
      // 处理数据
      const str = this.props.location.search.slice(1)
      const result = qs.parse(str)
      ```
  
  - ##### params参数（路径参数）：
  
    - 路由导航`<Link/>`标签中传数据：
  
      ```jsx
      <Link to={`/home/${id}/${title}`}>Home</Link>
      ```
  
    - 在`<Route/>`标签中，使用占位符声明接收params参数：
  
      ```jsx
      <Route path="/home/:id/:title" component={Home}/>
      ```
  
      > 然后就可以从`this.props.match.params`对象中取对应的数据了，数据已经整理成对象了。
  
  - ##### state参数：
  
    > 前两种参数都会将数据暴露在地址栏url中，state参数不会在地址栏中暴露数据。
  
    - 路由导航`<Link/>`标签中传数据，state参数要求**to的值必须是一个对象**：（其实前两种方式to的值也可以是对象）
  
      ```jsx
      <Link to={{
          pathname: '/about/message',
          state: { id,title }
        }}>Home</Link>
      ```
  
    - 从`this.props.location.state`中可以拿到这个state对象。
  
    > - 这种方式就算地址栏url中没东西，但**刷新页面仍可以保留住参数**，不会丢数据。因为BrowserRouter的url是靠浏览器的历史记录来维护的，所以没问题。
    > - 但是HashRouter刷新页面state参数会丢失，因为它底层的实现方式不同，没有人帮它去保存和维护url。

------

- #### 路由的push和replace

  > - 点击`<Link/>`写的路由导航时，由于是a标签所以每一次点击更改地址栏路径后，都会形成历史记录。历史记录栈会将当前路径url进行push压栈（默认），栈针默认指向栈顶。而点击前进、后退按钮其实就是在操作历史记录栈的栈针。
  > - 浏览器中有前进和后退按钮，这两个按钮都是依赖于浏览器的历史记录在工作的。浏览器的历史记录有2种写入模式，分别是：push和replace。push是追加历史记录，replace是替换当前记录。`<Link/>`路由导航跳转的时候默认为push。
  > - 对历史记录栈的操作其实还有另一种模式：替换（replace），它是用当前url对栈顶记录进行替换。开启替换模式：`<Link replace/>`

- #### `withRouter()`的使用

  > 编程式路由导航要想用，必须先拿到history对象，但是该对象是路由组件所独有的，普通组件没办法拿到怎么办？通过withRouter()函数给普通组件加上：

  ```js
  import App, { Component } from 'react'
  import { withRouter } from 'react-router-dom'
  
  class Header extends Component {...
  }
  // 普通组件Header经过withRouter()函数的加工后，返回一个新组件再暴露出去，此时它身上就也有了路由组件的3个API
  export default withRouter(Header)
  ```

------

# React UI组件库

> - 所谓的UI组件库就是：将我们常用的元素、样式及交互，封装成各种组件供我们使用。只需要将组件拿过来即可使用。React常用的UI组件库是Ant Design。
> - UI组件库分为两大类：移动端和PC端。移动端常用的UI组件库：Vant、Cube UI、Mint UI..，PC端常用的UI组件库：Element UI、IView UI..

------

# Redux

> Redux是一个专门用于做状态管理的JS库。作用：集中式管理React应用中多个组件共享的state状态。（它不是专门用于React的插件库，还可以用在Vue、Angular中，但一般都与React配合使用）

###### 什么时候使用Redux？

> 1. 多个组件依赖同一状态。
> 2. 多个组件要变更同一状态。
>
> 此时这个状态（数据）就应该放在Redux中。

###### Redux的工作原理图：

![06211f8b0271dd7d56175899e6376c2d](./assets/06211f8b0271dd7d56175899e6376c2d.png)

###### Redux的工作原理：

> - 当某个组件的数据需要多个组件共享时，最好的方式就是将其放在Redux中，让它帮我们维护每个组件的数据（状态）。此时数据不在自身了，当组件要操作数据（状态）时，需要通知Redux，由它来管理状态。
>
> - Redux中有3个重要的组成部分：**Action、Store、Reducer**。其中`Action`是一个对象，其中定义了对状态的操作。`Store`是Redux的核心对象，它维护着状态。`Reducer`完成状态的初始化、以及后续状态的更新，返回值作为新状态，是**纯函数**。流程如下：
>
>   - 当你要操作状态时，首先需要将要做的操作，通过`ActionCreator`创建出来一个操作对象action（当然也可以自己写action）。
>   - 然后调用Store对象上的`dispatch(action)`方法并传进去该action对象，通知Store完成对状态的操作。
>   - 当调用了`store.dispatch(action)`方法后，Store对象会根据action对象的内容，自动调用对应的Reducer函数完成对state的操作。
>
>   > **纯函数：**
>
> - Action对象有2个属性：其中type属性是必须的，表示操作的类型，值是Reducer函数中定义好的操作名字符串。data属性是可选的，存放操作值。
>
> - Reducer函数接收2个参数：preState（先前的state）和action对象。Reducer函数的返回值会作为新的状态交给Store维护。
>
> - 当Store对象初始化时，会调用1次Reducer函数去初始化对应的状态state。此时Reducer函数的preState为undefined、action对象中只有type属性且值为随机字符串。
>
> - 通过Store对象的`getState()`方法可以获取对应的状态数据。
>
> - Redux只负责管理状态，至于状态的改变驱动着页面的展示，需要我们自己写。因此Redux提供了一个API，只要任何的state更新，就会帮你调指定的函数：`store.subscribe(func)`。只要我们将重新渲染页面的函数订阅到Redux中，那么state更新就可以重新渲染页面了。
>



> - 通常不同组件的Reducer函数放在不同的JS文件中，文件名一般叫`组件名_reducer.js`（全小写）。
> - 通常不同组件的ActionCreator函数放在不同的JS文件中，文件名一般叫`组件名_action_creator.js/组件名_action.js`（全小写）。
>
> 每一个操作都对应一个`ActionCreator`（函数），由它在更改state之前，去处理相应的业务逻辑。`Store`是2者之间的桥梁，根据state的不同去调用不同的`Reducer`、获取不同的state。
>
> - 组件可以通过`store.getState()`去读取`Store`中管理的某个状态state。
> - 当组件需要更改某个state时：
>   - 如果改之前还需要处理业务逻辑，那么就通知`ActionCreators`，在其中处理完业务逻辑后，再调用Store对象的`dispatch(action)`。该方法需要传进去一个action对象，里面包含两个固定名的属性type和data。type是操作的类型（增/删），data是要更新的数据。
>   - 如果改之前不需要处理逻辑了，那么可以直接调用`store.dispatch(action)`
> - 和Vue中不同的是，Redux中state更新后并不会重新渲染页面，需要手动调用`setState({})`重新进行页面的渲染（也就是执行render()）

###### 搭建Redux环境：

1. 安装Redux（`npm i redux`）并在src下新建目录redux/，用于存放所有redux的东西。

2. 编写`redux/store.js`，用于创建全局唯一的store对象：

   ```js
   // 引入createStore()函数，它专门用于创建核心的store对象
   import { createStore } from 'redux'
   // 引入为Count组件服务的Reducer
   import countReducer from './count_reducer'
   
   // 创建并暴露store对象，参数是Reducer函数，目前就一个Reducer
   export default createStore(countReducer)
   ```

3. 编写`redux/count_reducer.js`，用于创建**为Count组件服务的Reducer（函数）**：

   ```js
   // 定义初始化状态
   const initState = 0
   // 创建并暴露Reducer函数
   export default function countReducer(preState=initState, action){
     // 从action对象中获取type和data
     const {type, data} = action
     // 根据type决定如何加工数据
     switch (type) {
       // 如果是increment就加
       case 'increment':
         return preState + data
       // 如果是decrement就减
       case 'decrement':
         return preState - data
       // 如果是没定义的操作，就还返回原来的state
       default:
         return preState
     }
   }
   ```

###### 使用Redux：

- 通过`store.getState()`获取state：

  ```jsx
  import React, { Component } from 'react'
  // 引入store对象
  import store from '../../redux/store'
  
  export default class Count extends Component {
    ...
    render() {
      return (
        <div>
          ...
          {/* 获取store中的状态数据 */}
          <h1>当前求和为：{store.getState()}</h1>
          ...
        </div>
      )
    }
    ...
  }
  ```

- 通过`store.dispathch({})`修改state：

  ```js
  store.dispatch({type:'increment',data:value*1})
  ```

  > 但是这里有一个问题：Redux只负责管理状态，至于状态的改变驱动着页面的展示，需要我们自己写。
  >
  > 也就是说：Store中的状态数据变化后，并没有重新渲染页面，所以页面还是旧的state。怎么办呢？需要用到store对象的`subscribe(func)`方法：
  >
  > ```js
  > export default class Count extends Component {
  >       ...
  >     // 组件挂载完毕后，就调用subscribe检测redux中的状态。只要store中任意state发生变化，该回调就会执行
  >       componentDidMount(){
  >        	store.subscribe(()=>{
  >        		// state变化后，手动调用`setState({})`更新页面
  >        		this.setState({})
  >        	})
  >       }
  >     ...
  > }
  > ```
  >
  
  > 但还不行。如果有多个组件，难不成在每个组件挂载完毕时都去subscribe订阅一下吗？有个一劳永逸的办法，在入口文件index.js中：
  >
  > ```jsx
  >import React from 'react'
  > import ReactDOM from 'react-dom/client'
  > import App from './App'
  >   import store from './redux/store'
  > 
  >   const root = ReactDOM.createRoot(document.getElementById('root'))
  >    root.render(<React.StrictMode><App/></React.StrictMode>)
  >    
  >    // 只要store中的状态发生变化，就重新渲染整个应用
  >    store.subscribe(()=>{
  >   	root.render(<React.StrictMode><App/></React.StrictMode>)
  > })
  > ```
  > 
  >给最大的App组件订阅下即可。

###### 优化：

- 我们每次还得手动写action对象很麻烦，可以用ActionCreator函数**为组件生成action对象**。编写`redux/count_action_creator.js`：

  ```js
  export const createIncrementAction = data => ({ type: 'increment', data })
  export const createDecrementAction = data => ({ type: 'decrement', data })
  ```

  > 这样就不用自己亲自写action对象了，在组件中：
  >
  > ```js
  > import { createIncrementAction, createDecrementAction } from '../../redux/count_action_creator'
  > ...
  > store.dispatch(createIncrementAction(value*1))
  > ```
  >

- 我们发现Reducer中操作状态的**操作名**很重要，一旦这个字符串写错了玩儿完。所以通常我们会新建一个`redux/constant.js`，将这些操作名都定义为常量。这样不仅防止出错，还便于管理：（然后Reducer和ActionCreator中都用这些常量来写）

  ```js
  export const INCREMENT = 'increment'
  export const DECREMENT = 'decrement'
  ```
------
