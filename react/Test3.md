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

- ### React Hooks/Hook

  > Hook是React 16.8.0版本增加的新特性，可以让你在函数式组件中使用state、ref、生命周期钩子以及其他类组件中才能用的React特性。

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

  > - `<Fragment>`标签类似Vue的`<template>`，它们都不影响结构。使用它来当作组件的根标签时，不会因为用组件而多一层结构。
  > - 还有的组件的根标签为空标签：`<>内容</>`
  > - 这俩的区别是，`<Fragment>`标签身上可以有key和children属性（可以用props给组件传这俩属性），空标签什么属性也不能有。

------

