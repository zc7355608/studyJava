# React新特性

------

- ### lazyload懒加载（通常要给路由组件开启懒加载）

  > 默认情况下，用户第一次请求index.html时，会将React应用中用到的所有组件资源，通过网络全部都加载回来。这种方式的缺点是：页面上有很多路由组件，我还没点呢，且有可能一直不用，就没有必要初始化时随着整个应用被加载进来。此时可以给组件设置懒加载：

  1. 在使用路由组件的地方，将import导入路由组件的方式，改为用lazy函数导入：

     ```js
     // 导入lazy函数
     import React, { Component, lazy } from 'react'
     
     const Home = lazy( () => import('./Home') )
     const About = lazy( () => import('./About') )
     ```

  2. 使用`<Suspense/>`组件，指定当网络出问题组件没有加载回来时，显示哪个组件：（fallback指定的组件就别懒加载了）

     ```xml
     <!-- 用Suspense组件包裹那些可能异步加载的组件，包括<Routes>或<Switch>组件 -->
     <Suspense  fallback={<h1>loading...</h1>}>
     	<Switch>
             <Route path='/home' component={Home}/>
         	<Route path='/about' component={About}/>
     	</Switch>
     </Suspense>
     ```

------

- ### React Hooks/Hook

  > Hook是React 16.8.0版本增加的新特性，可以让你在函数式组件中使用state、ref、生命周期钩子以及其他类组件中才能用的React特性。（类组件不能用）

  ##### 3个常用的Hook：

  - State Hook：

    > 通过调用`React.useState(initValue)`可以返回一个数组，数组第1个元素就是state中的状态，第2个元素是更新该状态的函数。useState函数的参数用于初始化state中的状态，第一次执行后会将state的值在内部进行缓存。

    ```jsx
    function Demo(){ // 该方法调用1+n次
        const [count,setCount] = React.useState(0)
        const [name,setCount] = React.useState('张三')
        function add(){
            setCount(newCount)
        }
        return (
            <div>
                <h2>当前求和为：{count}</h2>
                <button onclick={add}>点我加1</button>
            </div>
        )
    }
    ```

    > 其中更新state的方法setCount也可以传一个函数：`setXxx( preValue => newValue )`，接收原来的value，返回新的value。

  - Ref Hook：

    > 函数式组件中，通过调用`React.useRef()`来返回一个容器对象，使用方式和之前的`React.createRef()`类似。

  - Effect Hook：

    > - `React.useEffect(()=>{ return ()=>{} },[])`可以让我们在函数式组件里使用生命周期钩子。
    > - 该方法调用时传入2个参数。第1个函数参数相当于`componentDidmount()`和`componentDidUpdate()`的结合体。第2个数组参数里面写要监视的state中的状态（变量）。如果不指定第2个参数表示监视整个state。
    > - 并且第1个函数参数中，如果返回了一个函数，那么这个函数还相当于`componentWillUnmount()`
    

- ### Fragment（碎片）

  > - `<React.Fragment>`标签不会被渲染到页面上。使用它来当作组件的根标签时，不会多一层结构。
  > - 还有的组件的根标签用的是一个空标签：`<>内容</>`
  > - 这俩的区别是：`<Fragment>`标签身上可以加key和children属性，但空标签什么属性也不能有。

------

- ### Context

  > 一种组件间通信的方式，常用于祖孙组件间通信。使用：

  1. 祖组件中，创建Context容器对象（组件）：`const XxxContext = React.createContext()`，该容器对象需要放在祖孙组件都能访问到的位置。

     > 如果祖孙组件在不同的文件，那就将Context用export进行导出，需要用的地方import导入。

  2. 将祖组件的直接子组件用`<XxxContext.Provider>`组件标签包裹起来，通过组件标签的`value`属性指定给后代组件传递的数据。

  3. 需要用数据的后代组件声明接收：

     ```jsx
     import {XxxContext} from './A'
     ...
     <XxxContext.Consumer>
       { value => {} }
     </XxxContext.Consumer>
     ```

     > 以上声明接收的方式在类组件和函数组件中都可以用。下面2种分别只能在类和函数组件中使用：

     - 仅支持在类组件中声明：（类体中写）

       ```js
       import {XxxContext} from './A'
       ...
       // 声明静态属性contextType去接收祖组件A中的数据放在this.context中
       static contextType = XxxContext
       // 此时就可以使用this.context来获取传递的数据了，不声明的话获取的是空对象{}
       ```

     - 仅支持在函数组件中声明：（通过useContext Hook）

       ```js
       import XxxContext from './A'
       ...
       // 声明并获取祖组件A中传递的value数据
       const value = React.useContext(XxxContext)
       ```

  > 在实际开发中我们一般不用context，一般都用它封装的react插件。

------

- ### PureComponent

  > 默认情况下，只要父组件执行了`render()`，无论给没给子组件传递props，都会重新渲染子组件。这个还可以接收，如果是执行`setState({})`，即便没有更新任何数据，还是会重新渲染整个父子组件。因此Component是有2个问题的：
  >
  > 1. 只要执行setState()，即便不改变任何数据，组件也会重新渲染（效率）。
  > 2. 只要父组件执行了render()，无论给没给子组件传递props，都会重新渲染子组件（效率低）。
  >
  > 效率高的做法是：只有当组件的状态或props发生变化时，才需要执行render()
  >
  > 其实根本原因是：Component中的shouldComponentUpdate()总是返回true

  ##### 解决：

  - 方法1：自己在shouldComponentUpdate()中写判断逻辑。

  - 方法2（推荐）：使用PureComponent。它已经帮我们重写了shouldComponentUpdate()。

    > PureComponent判断的是浅层次的更改，所以通常在setState()中传新对象。

- ### 给组件传递标签结构

  > 我们之前用props可以给子组件传递数据，也可以指定特殊属性children去设置子组件标签体的文本内容。其实给组件传递标签结构的原理，就是通过children属性。可以通过children指定标签体内容，内容当然也可以是标签结构。
  
  ###### 使用（Children Props）：
  
  1. 给A组件中传递标签结构：
  
     ```xml
     <A>
       <B/>
     </A>
     ```
  
  2. A组件中接收标签结构并展示：
  
     ```jsx
     <div>
       <h2>我是A组件</h2>
       {this.props.children}
     </div>
     ```
  
  ###### 还有另一种使用方式（Render Props）：（这种方式支持标签之间传递数据）
  
  1. 给A组件中传递标签结构：
  
     ```jsx
     <A render={ data => <B name={data}/> } />
     ```
  
  2. A组件中接收标签结构并展示：
  
     ```jsx
     <div>
       <h2>我是A组件</h2>
       {this.props.render('张三')}
     </div>
     ```
  
     > 这个属性名render随意，但是通常叫render。这样只要一看props中传了render，就知道要传标签了。

------

- ### 错误边界（Error Boundary）

  > - 错误边界用来捕获后代组件的错误，渲染出备用页面。
  >- 特点：只能捕获后代组件生命周期钩子中产生的错误，不能捕获自己组件产生的错误以及其他组件在合成事件、定时器中产生的错误。
  > - 如果父组件中要使用某个子组件，该子组件可能会发生错误，那么需要在父组件中使用错误边界，将错误限制在子组件中，不要影响父组件中其他地方的正常展示。

  ###### 使用：
  
  ```js
  export default Parent extends Component {
    state = { hasError:'' }
    // 如果该组件中的子组件出现了任何错误，都会执行该函数，并携带错误信息
    static getDerivedStateFromError(error){
      return { hasError:error }
    }
  }
  ```
  
  > 此时就不要直接使用该子组件了，先判断下：`{this.state.hasError ? <h2>当前网络不稳定，请稍后再试！</h2> : <Child/>}`
  
  ###### 还可以做的更好：
  
  ```js
  export default Parent extends Component {
    state = { hasError:'' }
    // 它也属于生命周期钩子的一个，不常见。如果组件在渲染时，由于子组件错误而引发了一些问题，此时会调用该钩子
    componentDidCatch(){
      // 通常在该函数中统计错误次数并发送给服务器
      console.log('渲染组件时出错了！')
    }
  }
  ```
  
  ###### 注意：错误边界只适用于生产环境，开发环境下页面还是会报错的。

------

# React Router 6

> 2021.11月份时ReactRouter6已经成为了默认版本。它与5版本相比，改变了什么？
>
> 1. 内置组件的变化：移除了`<Switch/>`，新增了`<Routes/>`等。
>
> 2. 语法的变化：`component={About}`变为`element={<About/>}`等。
>
> 3. 新增多个Hook：useParams、useNavigate、useMatch等。
>
>    ....
>
> **官方明确推荐使用函数式组件了！！**

- 之前可以给多个`<Route>`组件包一个`<Switch>`，新版本Switch换成了Routes，且它是必须的（功能和Switch一样的）。

  > - `<Route>`还可以加`caseSensitive`属性，用于指定匹配时是否区分大小写。默认不区分大小写。
  > - `<Route/>`也可以嵌套使用，且可以配合路由表使用，但需要通过`<Outlet/>`组件来指定子路由的渲染位置。（看完后面在理解）

- 之前的`<Redirect to='/about'>`被移除了，取而代之的是：`<Route path='/' element={<Navigate to='/about'/>}`

  > `<Navigate>`的作用：只要Navigate组件被渲染，就会重定向切换路由。因此它也可以加`replace`属性设置路由的跳转模式。

- 之前`<NavLink>`中可以通过`activeClassName`属性指定激活时的类名，新版本中该属性被移除了。如果想写自定义类名，React Router 6中需要将`className`属性的值写成函数：

  ```jsx
  <NavLink className={ isActive => isActive ? 'link active' : 'link' } to="/home">Home</NavLink>
  ```

  > 该函数在页面初次渲染、以及每次点击路由导航时被调用。参数是布尔型表示导航是否激活，返回的字符串类名会被添加到该路由导航（a标签）上。

- 路由表的使用：

  > 观察下下面的结构：

  ```jsx
  <Routes>
  	<Route path="/about" element={<About/>}/>
  	<Route path="/home" element={<Home/>}/>
  	<Route path='/' element={<Navigate to='/about'/>}
  </Routes>
  ```

  > 有没有发现它们的格式是一致的，不同的是path和element。我们能不能只写不同的地方（路由表），由Hook拿着我们写的路由表去生成该结构，可以：

  ###### 使用`useRoutes` Hook：（路由中的Hook都是从`react-router-dom`中分别导入的）

  1. 调用`useRoutes()`函数，传进去路由表：（返回值为上面的一堆路由组件结构）

     ```jsx
     import {useRoutes} from 'react-router-dom'
     const ele = useRoutes([
       {
         path: '/about',
         element: <About/>
       },
       {
         path: '/home',
         element: <Home/>,
         // 如果有子级路由就通过children配置项来配置，不用写一层层的路径了
         children: [{path:'message',element:<Message/>},]
       },
       {
         path: '/',
         element: <Navigate to='/about'/>
       },
     ])
     ```
  
  2. 然后将以上结构替换为`{ele}`即可。
  
     > 开发中我们会单独建一个文件`src/routes/index.js`存放路由表（数组）并默认导出。
  
  ###### 但是现在有一个问题：子级路由放哪里？
  
  > - 我们之前没用路由表时，子级路由注册在哪里就放在哪。而现在子级路由在路由表中注册，路由表生成的结构放在了*使用最外层父级路由组件*的地方。那路由表中配置的子级路由怎么指定存放的位置呢？用`<Outlet/>`标签指定路由组件存放的位置。
  > - 若`to`指定的是子级路由，那么除了写完整路径之外，还可以（在父级路由path的基础上）使用相对路径，不用非得写完整路径。
  > - 默认子级路由激活时，父级路由也是激活状态所以会显示激活时的样式。可以通过给父级路由导航加`end`属性来去掉激活时样式。

------

- ##### 函数式组件中，接收路由组件传的参数：

  > 函数式路由组件没有this，也就无法访问到路由组件实例身上的location、match，那怎么接收传过来的参数呢？通过新的Hook：

  - **useParams()**：该Hook可以获取到传过来的params参数。

  - **useMatch('路由表中注册的路径path')**：返回this.match对象。

  - **useSearchParams()**：该Hook可以获取一个数组。数组第1个元素是传过来的search参数对象，需要通过get()方法传进去字符串K才能获取到search参数的V。第2个元素是setSearch函数，用于更新search参数对象，更新时需要将新的查询字符串传进去（不带?）。

  - **useLocation()**：返回this.location对象。该Hook可以用于在函数式组件中接收state参数。

    > 和5版本不同的是，6版本中传state参数可以通过`<Link/>`标签的`state`属性（值是对象），`to`中只写路径即可。

- ##### （重要）函数式组件中，使用编程式路由导航：

  > 函数式路由组件没有this，也就无法访问到路由组件实例身上的history，那怎么使用编程式路由导航呢？也是通过新的Hook：

  **useNavigate()**：该Hook返回一个函数，编程式路由导航通过这个函数就可以完成。该函数第1个参数是跳转的url，第2个参数传一个配置对象。配置对象中可以这样写：

  ```js
  import {useNavigate} from 'react-router-dom'
  const navigage = useNavigate()
  navigate('/about',{
      replace: true, // 指定路由跳转的模式，默认false是push模式
      state: {} // 携带state参数
  })// navigate()函数的参数还可以是Number型
  ```

  > 注意：在6版本中删除了`withRouter()`函数。所以history对象上的go(n)/goBack()/goForward()都变成了：`React.useNavigate(n)`

------

- ##### 其他几个Hook：（不常用，了解即可）

  - **useInRouterContext()**：如果组件被`<Router/>`组件包裹，则返回true。（常用于判断，当前组件是否在路由的上下文环境中）
  - **useNavigationType()**：返回3个值POP/PUSH/REPLACE，用于确定用户是通过哪种跳转方式来到（当前）页面中的。（POP表示直接在地址栏中输入路径跳转）
  - **useOutlet()**：用于呈现**当前组件中渲染的子级路由**。如果路由组件还没挂载，那么获取的是null，挂载后则获取的是该路由实例。
  - **useResolvedPath()**：该Hook可以帮我们解析一个URL路径（随便哪个URL），解析其中的path、search、hash值。返回一个对象。

------

