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

------

