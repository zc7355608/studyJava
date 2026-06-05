# React 新特性

- ### ~~PureComponent~~

  在 React 的组件中，只要父组件执行了`render()`，无论给没给子组件传递`props`，都会重新渲染子组件。

  这个还可以接受，但是当在类组件中调用`setState({})`传一个空对象，虽然没有更新任何数据，React 还是会重新渲染父组件和子组件。因此 `React.Component` 是有2个问题的：

  1. 只要执行`setState()`，即便不改变任何数据，组件也会重新渲染（效率低）。

     > 函数组件没有这个问题。在函数组件中，即使没有 `memo`，调用具有相同 state 的 [`set` 函数](https://zh-hans.react.dev/reference/react/useState#setstate)，[默认已经阻止了重新渲染](https://zh-hans.react.dev/reference/react/memo#updating-a-memoized-component-using-state)。

  2. 只要父组件执行了`render()`，无论给没给子组件传递`props`，都会重新渲染子组件（效率低）。

  效率高的做法是：只有当组件的状态或`props`发生变化时，才需要执行`render()`。

  归根结底在于：`React.Component` 的`shouldComponentUpdate()`钩子总是返回`true`。

  ##### 解决办法：

  1. 在`shouldComponentUpdate()`中手动写判断逻辑。

  2. （推荐）类组件继承 `React.PureComponent`。它已经帮我们重写了`shouldComponentUpdate()`

     > `React.PureComponent` 判断的是浅层次的更改，所以通常在`setState()`中传一个新对象。

  ##### 关于`PureComponent`：

  `PureComponent` 类似于 [`Component`](https://zh-hans.react.dev/reference/react/Component)，但是当 props 和 state 与之前保持一致时会跳过重新渲染。

  为了在 props 和 state 相同时跳过重新渲染，类式组件应该继承 `PureComponent` 而不是 `Component`。

  `PureComponent` 是 `Component` 的子类，并且支持 [所有 `Component` 的 API](https://zh-hans.react.dev/reference/react/Component#reference)。继承 `PureComponent` 的子类相当与定义了一个自定义的 [`shouldComponentUpdate`](https://zh-hans.react.dev/reference/react/Component#shouldcomponentupdate) 方法，该方法将浅比较 props 和 state。

  > React 仍然支持类式组件，但我们不建议在新代码中使用。

- ### `memo(Component, arePropsEqual?)`

  `memo` 允许你的组件在 props 没有改变的情况下跳过重新渲染。

  > 注意：`memo()` 只能用于函数组件。

  函数组件也有上方的问题2：只要父组件执行了`render()`，无论给没给子组件传递`props`，都会重新渲染子组件（效率低）。

  使用 `memo` 将组件包装起来，以获得该组件的一个 **记忆化** 版本。通常情况下，只要该组件的 props 没有改变，这个记忆化版本就不会在其父组件重新渲染时重新渲染。但 React 仍可能会重新渲染它：记忆化是一种性能优化，而非保证。

  ```jsx
  import { memo } from 'react';
  
  const SomeComponent = memo(function SomeComponent(props) {
    // ...
  });
  ```

  ##### 参数：

  - `Component`：要进行记忆化的组件。`memo` 不会修改该组件，而是返回一个新的、记忆化的组件。它接受任何有效的 React 组件，包括函数组件和 [`forwardRef`](https://zh-hans.react.dev/reference/react/forwardRef) 组件。
  - **可选参数** `arePropsEqual`：一个函数，接受两个参数：组件的前一个 props 和新的 props。如果旧的和新的 props 相等，即组件使用新的 props 渲染的输出和表现与旧的 props 完全相同，则它应该返回 `true`。否则返回 `false`。通常情况下，你不需要指定此函数。默认情况下，React 将使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每个 prop。

  ##### 返回值：

  `memo` 返回一个新的 React 组件。它的行为与提供给 `memo` 的组件相同，只是当它的父组件重新渲染时 React 不会总是重新渲染它，除非它的 props 发生了变化。

  > 当你启用 [React 编译器](https://zh-hans.react.dev/learn/react-compiler) 后，通常不再需要手动写 `memo()` 了。编译器会为你自动优化组件的重新渲染。（默认没有启用）
  >
  > ```jsx
  > // 无需 memo - 编译器会自动阻止重新渲染
  > function ExpensiveChild({ name }) {
  >   console.log('ExpensiveChild rendered');
  >   return <div>Hello, {name}!</div>;
  > }
  > ```
  >
  > **在使用 React 编译器时，你可以放心移除 `memo()`**. 编译器会自动提供相同的优化，让代码更简洁更易维护。
  >
  > 编译器的优化实际上比 `React.memo` 更全面。 它也会记忆化组件内部的中间值和昂贵计算，类似在整个组件树中结合使用 `React.memo` 和 `useMemo`。

- ### 关于 React Compiler

  React 编译器是一个新的构建时工具，它可以自动优化你的 React 应用。它支持纯 JavaScript，并且了解 [React 的规则](https://zh-hans.react.dev/reference/rules)，因此你无需重写任何代码即可使用它。

  React 编译器会在构建时通过自动处理记忆化（memoization）来优化你的 React 应用，从而无需再手动使用 `useMemo`，`useCallback`，和 `React.memo`。

  通常情况下，即使不进行优化，React  的性能也已经足够快，但有时你需要手动对组件和值进行记忆化（memoization）以保持应用的响应速度。这种手动记忆化既繁琐又容易出错，并且会增加需要维护的额外代码。React 编译器为你自动完成这些优化，减轻了你的思维负担，使你可以专注于功能的开发。

  > React 编译器专为与 React 19 配合使用而设计，但也支持 React 17 和 18。具体使用方式参考 [React 官网](https://zh-hans.react.dev/learn/react-compiler)

- ### 常用的 React Hooks

  - #### `useMemo(calculateValue, dependencies)`

    `useMemo` 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。（类似Vue中的Computed计算属性）

    在组件的顶层调用 `useMemo` 来缓存每次重新渲染都需要计算的结果。

    ```jsx
    import { useMemo } from 'react';
    
    function TodoList({ todos, tab }) {
      const visibleTodos = useMemo(
        () => filterTodos(todos, tab),
        [todos, tab]
      );
      // ...
    }
    ```

    ##### 参数：

    - `calculateValue`：要缓存计算值的函数。它应该是一个没有任何参数的纯函数，并且可以返回任意类型。React 将会在**首次渲染时调用该函数**；在之后的渲染中，如果 `dependencies` 没有发生变化，React 将直接返回相同值。否则，将会再次调用 `calculateValue` 并返回最新结果，然后缓存该结果以便下次重复使用。
    - `dependencies`：所有在 `calculateValue` 计算函数中用到的响应式变量所组成的数组。响应式变量包括 props、state 和所有你直接在组件中定义的变量和函数（通常是每次渲染时会变的变量）。如果你在代码检查工具中 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，它将会确保每一个响应式数据都被正确地定义为依赖项。依赖项数组的长度必须是固定的并且必须写成 `[dep1, dep2, dep3]` 这种形式。React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 将每个依赖项与其之前的值进行比较。

    ##### 返回值：

    在初次渲染时，`useMemo` 返回调用 `calculateValue` 的结果。

    在接下来的渲染中，如果依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用 `calculateValue`，并返回最新结果。

    > 注意：[React 编译器](https://zh-hans.react.dev/learn/react-compiler) 会自动对值和函数进行记忆化处理，从而减少手动调用 `useMemo` 的需求。你可以使用编译器自动处理记忆化。

  - #### `useCallback(fn, dependencies)`

    `useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。

    在组件顶层调用 `useCallback` 以便在多次渲染中缓存函数：

    ```jsx
    import { useCallback } from 'react';
    
    export default function ProductPage({ productId, referrer, theme }) {
      const handleSubmit = useCallback((orderDetails) => {
        post('/product/' + productId + '/buy', {
          referrer,
          orderDetails,
        });
      }, [productId, referrer]);
      // ...
    }
    ```

    ##### 参数：

    - `fn`：想要缓存的函数。此函数可以接受任何参数并且返回任何值。在**初次渲染时，React 将把函数返回**给你（而不是调用它！）。当进行下一次渲染时，如果 `dependencies` 相比于上一次渲染时没有改变，那么 React 将会返回相同的函数。否则，React 将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用。React 不会调用此函数，而是返回此函数。你可以自己决定何时调用以及是否调用。
    - `dependencies`：有关是否更新 `fn` 的所有响应式值的一个列表。响应式值包括 props、state，和所有在你组件内部直接声明的变量和函数（通常是每次渲染时会变的变量）。如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将校验每一个正确指定为依赖的响应式值。依赖列表必须具有确切数量的项，并且必须像 `[dep1, dep2, dep3]` 这样编写。React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每一个依赖和它的之前的值。

    ##### 返回值：

    在初次渲染时，`useCallback` 返回你已经传入的 `fn` 函数

    在之后的渲染中, 如果依赖没有改变，`useCallback` 返回上一次渲染中缓存的 `fn` 函数；否则返回这一次渲染传入的 `fn`。

    > [React 编译器](https://zh-hans.react.dev/learn/react-compiler) 会自动对值和函数进行记忆化处理，从而减少手动调用 `useCallback` 的需求。你可以使用编译器自动处理记忆化。

  - #### `useEffect(setup, dependencies?)`

    `useEffect` 是一个 React Hook，它允许你 [将组件与外部系统同步](https://zh-hans.react.dev/learn/synchronizing-with-effects)。Effect 允许你在渲染结束后执行一些代码，以便将组件与 React 外部的某个系统相同步。

    在组件的顶层调用 `useEffect` 来声明一个 Effect：

    ```jsx
    import { useState, useEffect } from 'react';
    import { createConnection } from './chat.js';
    
    function ChatRoom({ roomId }) {
      const [serverUrl, setServerUrl] = useState('https://localhost:1234');
    
      useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => {
          connection.disconnect();
        };
      }, [serverUrl, roomId]);
      // ...
    }
    ```

    ##### 参数：

    - `setup`：处理 Effect 的函数。setup 函数选择性返回一个 **清理（cleanup）** 函数。setup 函数相当于`componentDidmount()`和`componentDidUpdate()`的结合体。cleanup 函数（如果你提供了该函数）会在组件重新渲染时，setup 函数执行之前，先执行 setup 函数完成清理工作。并且在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数（相当于`componentWillUnmount()`）。

      ```tex
      首次挂载
      ↓
      setup
      
      依赖变化
      ↓
      cleanup(旧)
      ↓
      setup(新)
      
      组件卸载
      ↓
      cleanup(最后一次)
      ```

    - **可选** `dependencies`：`setup` 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数（通常是每次渲染时会变的变量）。如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将验证是否每个响应式值都被正确地指定为一个依赖项。依赖项列表的元素数量必须是固定的，并且必须像 `[dep1, dep2, dep3]` 这样内联编写。React 将使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较每个依赖项和它先前的值。**如果省略此参数，则在每次组件重新渲染后执行 Effect 函数**。

      如果只想让setup在首次渲染时执行，那么依赖项应该指定为空数组`[]`。

    ##### 返回值：

    `useEffect` 返回 `undefined`。

- ### 使用 Context 深层传递参数

  通常来说，你会通过 props 将信息从父组件传递到子组件。但是，如果你必须通过许多中间组件向下传递 props，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。**Context** 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。

  ##### 使用：

  1. **创建** Context。

     首先，你需要创建这个 context，并 **将其从一个文件中导出**，这样你的组件才可以使用它：

     > `LevelContext.js`：

     ```js
     import { createContext } from 'react';
     
     export const LevelContext = createContext(0);  // 为context指定默认值，它可以是任意类型
     ```

  2. **提供** Context。

     父组件中，用刚刚创建的这个 `<LevelContext>` 将内部的所有子组件包起来。`Section.jsx`：

     ```jsx
     import { LevelContext } from './LevelContext.js';
     // 父组件Section
     export default function Section({ children }) {
       return (
         <section className="section">
           <LevelContext value={5}>
             {children}
           </LevelContext>
         </section>
       );
     }
     ```

  3. **使用** Context。

     在需要数据的子组件中 **使用** 刚刚创建的 context。从 React 中引入 `useContext` Hook 以及你刚刚创建的 `LevelContext`：

     ```js
     import { useContext } from 'react';
     import { LevelContext } from './LevelContext.js';
     
     export default function Heading({ children }) {
       // 使用这个Context
       const level = useContext(LevelContext); // 5
       // ...
     }
     ```

     `useContext` 告诉 React `Heading` 组件想要读取 `LevelContext`。该组件会使用 UI 树中在它上层最近的那个 `<LevelContext>` 传递过来的值。这里读取到的是`5`。

- ### `lazy(load)`

  默认情况下，用户第一次请求`index.html`时，会将 React 应用中用到的所有组件资源，通过网络全部都加载回来。这种方式的缺点是：页面上有很多路由组件，我还没点呢，且有可能一直不用，就没有必要初始化时随着整个应用被加载进来。此时可以给组件设置懒加载。
  
  `lazy` 能够让你在组件第一次被渲染之前延迟加载组件的代码。通过在组件外部调用 `lazy()`，以声明一个懒加载的 React 组件（Lazy组件）：

  ```js
  import { lazy } from 'react';
  
  const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
  ```
  
  ##### 参数：
  
  - `load`: 一个返回 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或另一个 **thenable**（具有 `then` 方法的类 Promise 对象）的函数。React 不会在你尝试首次渲染返回的组件之前调用 `load` 函数。在 React 首次调用 `load` 后，它将等待其解析，然后将解析值的 `.default` 渲染为 React 组件。返回的 Promise 和 Promise 的解析值都将被缓存，因此 React 不会多次调用 `load` 函数。如果 Promise 被拒绝，则 React 将抛出拒绝原因给最近的**错误边界**处理。

    > 关于 `load()` 函数：
    >
    > ###### 参数：
    >
    > `load()` 不接收任何参数。
    >
    > ###### 返回值：
    >
    > 你需要返回一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或其他 **thenable**（具有 `then` 方法的类 Promise 对象）。它最终需要解析为有效的 React 组件类型，例如函数、[`memo`](https://zh-hans.react.dev/reference/react/memo) 或 [`forwardRef`](https://zh-hans.react.dev/reference/react/forwardRef) 组件。
  
  ##### 返回值：
  
  `lazy` 返回一个 React 组件，你可以在 fiber 树中渲染。当懒加载组件的代码仍在加载时，尝试渲染它将会处于 *暂停* 状态。可以配合使用 `<Suspense>` 组件在其加载时显示一个正在加载的提示。
  
  ##### 使用 Suspense 实现懒加载组件：
  
  ```jsx
  <Suspense fallback={<Loading />}>
    <!-- 等内部的所有懒加载组件都加载完毕后，再展示内部的所有内容 -->
    <h2>Preview</h2>
    <MarkdownPreview />
  </Suspense>
  ```
  
  Suspense 会等内部的所有懒加载组件都加载完毕后，再展示内部的所有内容。因此在上方代码中，`MarkdownPreview` 组件只有在你尝试渲染它时才会被加载。如果 `MarkdownPreview` 还没有加载完成，将显示 `<Loading>` 组件。
  
  > 注意：`fallback`指定的组件不要懒加载。

- ### 错误边界（Error Boundary）

  Try/catch块无法捕获React渲染过程中发生的错误。呈现方法或钩子中抛出的错误会在组件树中冒泡。只有[Error Boundary](https://zh-hans.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)才能捕获这些错误。
  
  ```jsx
// ❌ Try/catch块无法捕获React渲染过程中发生的错误。
  function Parent() {
    try {
      return <ChildComponent />; // 如果组件的render()或钩子中抛出了错误，这里的catch无法捕获到
    } catch (error) {
      return <div>Error occurred</div>;
    }
  }
  ```
  
  使用错误边界（Error Boundary）可以捕获后代组件中的错误，并渲染出备用页面。
  
  ```jsx
  // ✅ 使用错误边界（Error Boundary）
  function Parent() {
    return (
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );
  }
  ```
  
  错误边界的特点：只能捕获后代组件函数中的同步错误、Hook函数的错误，不能捕获其他组件的合成事件的错误，以及异步的错误。
  
  > 对应类组件声明周期钩子中的错误、以及`render()`方法中的错误。
  
  ##### 什么情况下使用错误边界？
  
  如果父组件中要使用某个子组件，该子组件可能会发生错误，那么需要在父组件中使用错误边界，将错误限制在子组件中，不要影响父组件中其他地方的正常展示。
  
  ##### 注意：错误边界只适用于生产环境，开发环境下页面还是会报错的。

# React Router（V6）

> 之前的 React Router（V5）是旧版本的路由，基本不会再用了。现在我们学习它的新版本 React Router（V6）。
>
> 注意：React Router（V6.3）以前，它还只是一个简单的路由组件的库，只负责根据路径渲染相应的组件。但是到React Router（V6.4）之后，它除了路由的功能，还添加了**数据加载**的功能，是**一个支持数据加载（Data Loading）的客户端路由框架**。
>
> React Router（V6.4）提出了**Data Router**的概念。这是一套新的路由系统，用一句话概括：Data Router = 路由（Routing）+ 数据加载（Data Loading）+ 数据提交（Data Mutation）。它的目标是让**路由负责数据生命周期**，而不是让组件自己在 `useEffect` 里请求数据。
>
> 而最新的 React Router（V7）已经变成了一个全栈框架了，它合并了 Remix 框架，提供了3种使用模式：声明式、数据、框架。分别对应*前端路由*、*Data Router*、*全栈能力*。其实就是在 React Router（V6）的基础上，又提供了 SSR、SSG等功能（类似Next.js），彻底整合为了一个全栈框架。其他的Data Router、API等基本没变。
>
> 因此我们这里学习的其实是React Router（V7）的路由、以及Data Router，框架的其他能力我们暂时不讲。所以对应标题还是React Router（V6）。



# React Router 6

> 2021.11月份时ReactRouter6已经成为了默认版本。它与5版本相比，改变了什么？
>
> 1. 内置组件的变化：移除了`<Switch/>`，新增了`<Routes/>`等。
>
> 2. 语法的变化：`<Route component={About} />`变为`<Route element={<About/>} />`等。
>
> 3. 新增多个Hook：useParams、useNavigate、useMatch等。
>
>    ....
>
> **官方明确推荐使用函数式组件了！！**

- 之前可以给多个`<Route>`组件包一个`<Switch>`，新版本Switch换成了Routes，且它是必须的（功能和Switch一样的）。

  > - `<Route>`还可以加`caseSensitive`属性，用于指定匹配时是否区分大小写。默认不区分大小写。
  > - `<Route/>`也可以嵌套使用，且可以配合路由表使用，但需要通过`<Outlet/>`组件来指定子路由的渲染位置。（看完后面在理解）

- 之前的`<Redirect to='/about'>`被移除了，取而代之的是：`<Route path='/' element={<Navigate to='/about'/>} />`

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

- ##### 其他几个Hook：（不常用，了解即可）

  - **useInRouterContext()**：如果组件被`<Router/>`组件包裹，则返回true。（常用于判断，当前组件是否在路由的上下文环境中）
  - **useNavigationType()**：返回3个值POP/PUSH/REPLACE，用于确定用户是通过哪种跳转方式来到（当前）页面中的。（POP表示直接在地址栏中输入路径跳转）
  - **useOutlet()**：用于呈现**当前组件中渲染的子级路由**。如果路由组件还没挂载，那么获取的是null，挂载后则获取的是该路由实例。
  - **useResolvedPath()**：该Hook可以帮我们解析一个URL路径（随便哪个URL），解析其中的path、search、hash值。返回一个对象。

# Zustand（todo）

# Redux Toolkit（todo）

### TanStack Query（todo）

### useDeferredValue\useTransitio（todo）

------

