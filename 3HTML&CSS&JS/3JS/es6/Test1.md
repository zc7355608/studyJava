# ES6

- ## ECMAScript 6 简介

  > ECMAScript 6.0（以下简称 ES6）是 JS 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JS 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

  - #### ECMAScript 和 JS 的关系

    > 一个常见的问题是，ECMAScript 和 JS 到底是什么关系？
    >
    > 要讲清楚这个问题，需要回顾历史。1996 年 11 月，JS 的创造者 Netscape 公司，决定将 JS 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。
    >
    > 该标准从一开始就是针对 JS 语言制定的，但是之所以不叫 JS，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JS 这个名字，且 JS 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。
    >
    > 因此，ECMAScript 和 JS 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。

  - #### ES6 与 ECMAScript 2015 的关系

    > ECMAScript 2015（简称 ES2015）这个词，也是经常可以看到的。它与 ES6 是什么关系呢？
    >
    > 2011 年，ECMAScript 5.1 版发布后，就开始制定 6.0 版了。因此，ES6 这个词的原意，就是指 JS 语言的下一个版本。
    >
    > 但是，因为这个版本引入的语法功能太多，而且制定过程当中，还有很多组织和个人不断提交新功能。事情很快就变得清楚了，不可能在一个版本里面包括所有将要引入的功能。常规的做法是先发布 6.0 版，过一段时间再发 6.1 版，然后是 6.2 版、6.3 版等等。
    >
    > 但是，标准的制定者不想这样做。他们想让标准的升级成为常规流程：任何人在任何时候，都可以向标准委员会提交新语法的提案，然后标准委员会每个月开一次会，评估这些提案是否可以接受，需要哪些改进。如果经过多次会议以后，一个提案足够成熟了，就可以正式进入标准了。这就是说，标准的版本升级成为了一个不断滚动的流程，每个月都会有变动。
    >
    > 标准委员会最终决定，标准在每年的 6 月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，直到下一年的 6 月份，草案就自然变成了新一年的版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。
    >
    > ES6 的第一个版本，就这样在 2015 年 6 月发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）。2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版，因为两者的差异非常小（只新增了数组实例的`includes`方法和指数运算符），基本上是同一个标准。根据计划，2017 年 6 月发布 ES2017 标准。
    >
    > 因此，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JS 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。本书中提到 ES6 的地方，一般是指 ES2015 标准，但有时也是泛指“下一代 JS 语言”。

  - #### ECMAScript 的历史

    > ES6 从开始制定到最后发布，整整用了 15 年。
    >
    > 前面提到，ECMAScript 1.0 是 1997 年发布的，接下来的两年，连续发布了 ECMAScript 2.0（1998 年 6 月）和 ECMAScript 3.0（1999 年 12 月）。3.0 版是一个巨大的成功，在业界得到广泛支持，成为通行标准，奠定了 JS 语言的基本语法，以后的版本完全继承。直到今天，初学者一开始学习 JS，其实就是在学 3.0 版的语法。
    >
    > 2000 年，ECMAScript 4.0 开始酝酿。这个版本最后没有通过，但是它的大部分内容被 ES6 继承了。因此，ES6 制定的起点其实是 2000 年。
    >
    > 为什么 ES4 没有通过呢？因为这个版本太激进了，对 ES3 做了彻底升级，导致标准委员会的一些成员不愿意接受。ECMA 的第 39 号技术专家委员会（Technical Committee 39，简称 TC39）负责制订 ECMAScript 标准，成员包括 Microsoft、Mozilla、Google 等大公司。
    >
    > 2007 年 10 月，ECMAScript 4.0 版草案发布，本来预计次年 8 月发布正式版本。但是，各方对于是否通过这个标准，发生了严重分歧。以 Yahoo、Microsoft、Google 为首的大公司，反对 JS 的大幅升级，主张小幅改动；以 JS 创造者 Brendan Eich 为首的 Mozilla 公司，则坚持当前的草案。
    >
    > 2008 年 7 月，由于对于下一个版本应该包括哪些功能，各方分歧太大，争论过于激烈，ECMA 开会决定，中止 ECMAScript 4.0 的开发，将其中涉及现有功能改善的一小部分，发布为 ECMAScript 3.1，而将其他激进的设想扩大范围，放入以后的版本，由于会议的气氛，该版本的项目代号起名为 Harmony（和谐）。会后不久，ECMAScript 3.1 就改名为 ECMAScript 5。
    >
    > 2009 年 12 月，ECMAScript 5.0 版正式发布。Harmony 项目则一分为二，一些较为可行的设想定名为 JS.next 继续开发，后来演变成 ECMAScript 6；一些不是很成熟的设想，则被视为 JS.next.next，在更远的将来再考虑推出。TC39 委员会的总体考虑是，ES5 与 ES3 基本保持兼容，较大的语法修正和新功能加入，将由 JS.next 完成。当时，JS.next 指的是 ES6，第六版发布以后，就指 ES7。TC39 的判断是，ES5 会在 2013 年的年中成为 JS 开发的主流标准，并在此后五年中一直保持这个位置。
    >
    > 2011 年 6 月，ECMAScript 5.1 版发布，并且成为 ISO 国际标准（ISO/IEC 16262:2011）。
    >
    > 2013 年 3 月，ECMAScript 6 草案冻结，不再添加新功能。新的功能设想将被放到 ECMAScript 7。
    >
    > 2013 年 12 月，ECMAScript 6 草案发布。然后是 12 个月的讨论期，听取各方反馈。
    >
    > 2015 年 6 月，ECMAScript 6 正式通过，成为国际标准。从 2000 年算起，这时已经过去了 15 年。
    >
    > 目前，各大浏览器对 ES6 的支持可以查看https://compat-table.github.io/compat-table/es6/。
    >
    > Node.js 是 JS 的服务器运行环境（runtime）。它对 ES6 的支持度更高。除了那些默认打开的功能，还有一些语法功能已经实现了，但是默认没有打开。使用下面的命令，可以查看 Node.js 默认没有打开的实验性语法。
    >
    > ```shell
    > // Linux & Mac
    > $ node --v8-options | grep harmony
    > // Windows
    > $ node --v8-options | findstr harmony
    > ```

  - #### Babel

    > [Babel](https://babeljs.io/) 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。
    >
    > ```js
    > // 转码前
    > input.map(item => item + 1);
    > 
    > // 转码后
    > input.map(function (item) {
    >   return item + 1;
    > });
    > ```
    >
    > 上面的原始代码用了箭头函数，Babel 将其转为普通函数，就能在不支持箭头函数的 JS 环境执行了。
    >
    > 下面的命令在项目目录中，安装 Babel。
    >
    > ```shell
    > $ npm install --save-dev @babel/core
    > ```

    ###### 配置文件`.babelrc`：

    > Babel 的配置文件是`.babelrc`，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。该文件用来设置转码规则和插件。其中`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。
    >
    > ```shell
    > # 最新转码规则
    > $ npm install --save-dev @babel/preset-env
    > 
    > # react 转码规则
    > $ npm install --save-dev @babel/preset-react
    > ```
    >
    > 然后，将这些规则加入`.babelrc`。
    >
    > ```js
    > {
    >     "presets": [
    >         "@babel/env",
    >         "@babel/preset-react"
    >     ],
    >     "plugins": []
    > }
    > ```
    >
    > 注意：以下所有 Babel 工具和模块的使用，都必须先写好`.babelrc`。
    >
    > ###### 命令行转码：
    >
    > Babel 提供命令行工具`@babel/cli`，用于命令行转码。它的安装命令如下。
    >
    > ```shell
    > $ npm install --save-dev @babel/cli
    > ```
    >
    > 基本用法如下。
    >
    > ```shell
    > # 转码结果输出到标准输出
    > $ npx babel example.js
    > 
    > # 转码结果写入一个文件
    > # --out-file 或 -o 参数指定输出文件
    > $ npx babel example.js --out-file compiled.js
    > # 或者
    > $ npx babel example.js -o compiled.js
    > 
    > # 整个目录转码
    > # --out-dir 或 -d 参数指定输出目录
    > $ npx babel src --out-dir lib
    > # 或者
    > $ npx babel src -d lib
    > 
    > # -s 参数生成source map文件
    > $ npx babel src -d lib -s
    > ```

    ##### 服务器环境：

    > ###### babel-node：
    >
    > 如果你的脚本中使用了 Node.js 不支持的 ES6+ 特性（如 `import/export` 模块语法），可以使用 `babel-node` 来运行这些脚本。
    >
    > `@babel/node`模块的`babel-node`命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。使用步骤：
    >
    > 1. 首先，安装这个模块：`$ npm install --save-dev @babel/node`
    > 2. 然后，执行`babel-node`就进入 REPL 环境：`npx babel-node`
    >
    > `babel-node`命令也可以直接运行一个 ES6 脚本。将上面的代码放入脚本文件`es6.js`，然后直接运行。
    >
    > ```shell
    > # es6.js 的代码
    > # console.log((x => x * 2)(1));
    > $ npx babel-node es6.js
    > 2
    > ```
    >
    > ###### @babel/register 模块：
    >
    > `@babel/register`模块改写`require`命令，为它加上一个钩子（中间件）。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用 Babel 进行转码。
    >
    > ```shell
    > $ npm install --save-dev @babel/register
    > ```
    >
    > 使用时，必须首先加载`@babel/register`。
    >
    > ```js
    > // index.js
    > require('@babel/register');
    > require('./es6.js');
    > ```
    >
    > 然后，就不需要手动对`index.js`转码了。而是在加载文件时实时转译代码（运行时）。
    >
    > ```shell
    > $ node index.js
    > 2
    > ```
    >
    > 需要注意的是，`@babel/register`只会对`require`命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。
    >
    > ###### polyfill：
    >
    > Babel 默认只转换新的 JS 句法（syntax），而不转换新的 API，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。
    >
    > 举例来说，ES6 在`Array`对象上新增了`Array.from`方法。Babel 就不会转码这个方法。如果想让这个方法运行，可以使用`core-js`和`regenerator-runtime`(后者提供generator函数的转码)，为当前环境提供一个垫片。
    >
    > 安装命令如下：
    >
    > ```shell
    > $ npm install --save-dev core-js regenerator-runtime
    > ```
    >
    > 然后，在脚本头部，加入如下两行代码。
    >
    > ```js
    > import 'core-js';
    > import 'regenerator-runtime/runtime';
    > // 或者
    > require('core-js');
    > require('regenerator-runtime/runtime');
    > ```
    >
    > Babel 默认不转码的 API 非常多，详细清单可以查看`babel-plugin-transform-runtime`模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/runtime-corejs3-definitions.js)文件。

    ##### 浏览器环境：

    > Babel 也可以用于浏览器环境，使用`@babel/standalone`模块提供的浏览器版本，将其插入网页。
    >
    > ```html
    > <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    > <script type="text/babel">// 该type值浏览器不认识因此不会做任何处理，是babel在处理该script中的代码
    > // Your ES6 code
    > </script>
    > ```
    >
    > 注意，这种网页实时将 ES6 代码转为 ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

- ## let 和 const 命令

  > `var`声明的变量有这几个问题：**变量提升、没有块级作用域、同一个作用域可以重复声明、会挂载到全局对象**。ES6 新增了`let、const`命令用来声明变量，它们声明的变量就没有这些问题：
  >
  > - `let`、`const`声明的变量必须先声明后使用，没有变量提升。
  > - `let`、`const`的变量在同一个作用域中不可重复声明。
  > - `let`、`const`的变量有块级作用域，内层作用域可以定义外层作用域的同名变量。（这点不同与Java）

  ###### const 声明常量：

  > 常量使用`const`声明，声明后值就不可改了，所以声明时必须初始化，常量名字一般用大写（规范）。
  >
  > （通常我们声明变量先用`const`，后面发现要改报错了，再用`let`。**var不要用！**）
  >
  > `const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
  >
  > （如果真的想将对象冻结，应该使用`Object.freeze`方法，将对象、以及深层次的每个层级的属性都进行冻结）

  ###### ES6 声明变量的六种方法：

  > ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：`import`命令（等同于`const`声明）和`class`命令。所以，ES6 一共有 6 种声明变量的方法。

  > 另外，JS 中的`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
  >
  > ```js
  > for (let i = 0; i < 3; i++) {
  >   let i = 'abc';
  >   console.log(i);
  > }
  > // abc
  > // abc
  > // abc
  > ```
  >
  > 上面代码正确运行，输出了 3 次`abc`。这表明函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域（同一个作用域不可使用 `let` 重复声明同一个变量）。

  ###### 暂时性死区：（这点和C++类似，不同于Java）

  > 只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
  >
  > ```js
  > var tmp = 123;
  > 
  > if (true) {
  >   tmp = 'abc'; // ReferenceError
  >   let tmp;
  > }
  > ```
  >
  > 上面代码中，存在全局变量`tmp`，但是块级作用域内`let`又声明了一个局部变量`tmp`，导致后者绑定这个块级作用域，所以在`let`声明变量前，对`tmp`赋值会报错。
  >
  > ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
  >
  > 总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
  >
  > “暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作：
  >
  > ```js
  > typeof x; // ReferenceError
  > let x;
  > ```
  >
  > 上面代码中，变量`x`使用`let`命令声明，所以在声明之前，都属于`x`的“死区”，只要用到该变量就会报错。因此，`typeof`运行时就会抛出一个`ReferenceError`。作为比较，如果一个变量根本没有被声明，使用`typeof`反而不会报错。
  >
  > ```js
  > typeof undeclared_variable // "undefined"
  > ```
  >
  > 上面代码中，`undeclared_variable`是一个不存在的变量名，结果返回“undefined”。所以，在没有`let`之前，`typeof`运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。
  >
  > 有些“死区”比较隐蔽，不太容易发现：
  >
  > ```js
  > function bar(x = y, y = 2) {
  > 	return [x, y];
  > }
  > bar(); // 报错
  > ```
  >
  > 上面代码中，调用`bar`函数之所以报错（某些实现可能不报错），是因为参数`x`默认值等于另一个参数`y`，而此时`y`还没有声明，属于“死区”。如果`y`的默认值是`x`，就不会报错，因为此时`x`已经声明了。
  >
  > ```js
  > function bar(x = 2, y = x) {
  > 	return [x, y];
  > }
  > bar(); // [2, 2]
  > ```
  >
  > 另外，下面的代码也会报错，与`var`的行为不同。
  >
  > ```js
  > // 不报错
  > var x = x;
  > 
  > // 报错
  > let x = x;
  > // ReferenceError: x is not defined
  > ```
  >
  > 上面代码报错，也是因为暂时性死区。使用`let`声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量`x`的声明语句还没有执行完成前，就去取`x`的值，导致报错”x 未定义“。

  > ES6 规定暂时性死区和`let`、`const`语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。
  >
  > 总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

  ###### 块级作用域：

  > 为什么需要块级作用域？
  >
  > ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景：
  >
  > 1. 内层变量可能会覆盖外层变量。
  > 2. 用来计数的循环变量泄露为全局变量。
  >
  > 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了：
  >
  > ```js
  > // IIFE 写法
  > (function () {
  >   var tmp = ...;
  >   ...
  > }());
  > 
  > // 块级作用域写法
  > {
  >   let tmp = ...;
  >   ...
  > }
  > ```

  ###### 块级作用域与函数声明：

  > 函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。
  >
  > ES5 规定：函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明：
  >
  > ```js
  > // 情况一
  > if (true) {
  >   function f() {}
  > }
  > 
  > // 情况二
  > try {
  >   function f() {}
  > } catch(e) {
  >   // ...
  > }
  > ```
  >
  > 上面两种函数声明，根据 ES5 的规定都是非法的。
  >
  > 但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。
  >
  > ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。
  >
  > ```js
  > function f() { console.log('I am outside!'); }
  > 
  > (function () {
  >   if (false) {
  >     // 重复声明一次函数f
  >     function f() { console.log('I am inside!'); }
  >   }
  > 
  >   f();
  > }());
  > ```
  >
  > 上面代码在 ES5 中运行，会得到“I am inside!”，因为在`if`内声明的函数`f`会被提升到函数头部，实际运行的代码如下。
  >
  > ```js
  > // ES5 环境
  > function f() { console.log('I am outside!'); }
  > 
  > (function () {
  >   function f() { console.log('I am inside!'); }
  >   if (false) {
  >   }
  >   f();
  > }());
  > ```
  >
  > ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于`let`，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？
  >
  > ```js
  > // 浏览器的 ES6 环境
  > function f() { console.log('I am outside!'); }
  > 
  > (function () {
  >   if (false) {
  >     // 重复声明一次函数f
  >     function f() { console.log('I am inside!'); }
  >   }
  > 
  >   f();
  > }());
  > // Uncaught TypeError: f is not a function
  > ```
  >
  > 上面的代码在 ES6 浏览器中，都会报错。
  >
  > 原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在[附录 B](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-block-level-function-declarations-web-legacy-compatibility-semantics)里面规定，浏览器的实现可以不遵守上面的规定，有自己的[行为方式](http://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)：
  >
  > - 允许在块级作用域内声明函数。
  > - 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
  > - 同时，函数声明还会提升到所在的块级作用域的头部。
  >
  > 注意，上面三条规则只对 ES6 的浏览器（以及Node.js）实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作`let`处理。
  >
  > 根据这三条规则，**浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于`var`声明的变量**。上面的例子实际运行的代码如下。
  >
  > ```js
  > // 浏览器的 ES6 环境
  > function f() { console.log('I am outside!'); }
  > (function () {
  >   var f = undefined;
  >   if (false) {
  >     function f() { console.log('I am inside!'); }
  >   }
  > 
  >   f();
  > }());
  > // Uncaught TypeError: f is not a function
  > ```
  >
  > 考虑到环境导致的行为差异太大，应该**避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式**，而不是函数声明语句。
  >
  > ```js
  > // 块级作用域内部的函数声明语句，建议不要使用
  > {
  >   let a = 'secret';
  >   function f() {
  >     return a;
  >   }
  > }
  > 
  > // 块级作用域内部，优先使用函数表达式
  > {
  >   let a = 'secret';
  >   let f = function () {
  >     return a;
  >   };
  > }
  > ```

  ###### 顶层对象的属性：

  > 顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。ES5 之中，顶层对象的属性与`var`声明全局变量是等价的。
  >
  > ```js
  > window.a = 1;
  > a // 1
  > 
  > var a = 2;
  > window.a // 2
  > ```
  >
  > 上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。
  >
  > 顶层对象的属性与全局变量挂钩，被认为是 JS 语言最大的设计败笔之一。这样的设计带来了几个很大的问题：
  >
  > 1. 首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
  > 2. 其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
  > 3. 最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。
  >
  > 另一方面，`window`对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。
  >
  > ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`、`const`、`class`声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

  ###### globalThis 对象：

  > JS 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的：
  >
  > - 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
  > - 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有`self`。
  > - Node 里面，顶层对象是`global`，但其他环境都不支持。
  >
  > 同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`关键字，但是有局限性：
  >
  > - 全局环境中，`this`会返回顶层对象。但是，Node.js 模块中`this`返回的是当前模块，ES6 模块中`this`返回的是`undefined`。
  > - 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
  > - 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。
  >
  > 综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法：
  >
  > ```js
  > // 方法一
  > (typeof window !== 'undefined'
  >    ? window
  >    : (typeof process === 'object' &&
  >       typeof require === 'function' &&
  >       typeof global === 'object')
  >      ? global
  >      : this);
  > 
  > // 方法二
  > var getGlobal = function () {
  >   if (typeof self !== 'undefined') { return self; }
  >   if (typeof window !== 'undefined') { return window; }
  >   if (typeof global !== 'undefined') { return global; }
  >   throw new Error('unable to locate global object');
  > };
  > ```
  >
  > ES2020 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。
  >
  > 垫片库[`global-this`](https://github.com/ungap/global-this)模拟了这个提案，可以在所有环境拿到`globalThis`。

- ## 变量的解构赋值

  > ES6 允许按照一定模式，从数组、对象、或其他可迭代的结构中提取值，对变量进行赋值，这被称为解构（Destructuring）。
  >
  > 可迭代的结构其实就是，有**`[Symbol.iterator]()`**这个方法的对象。数组是可迭代的结构、已经实现了这个方法。而普通对象`{}`虽然不是可迭代的结构，但对象的解构是基于属性名（key） 的匹配，而不是顺序遍历（迭代）。
  >
  > 因此解构分为两种：一种是可迭代结构（数组）的解构赋值，使用中括号`[]`；另一种是属性名匹配的解构赋值（对象），使用大括号`{}`。
  
  ###### 数组解构：（即：可迭代结构的解构赋值）
  
  > 以前，为变量赋值，只能直接指定值。
  >
  > ```js
  > let a = 1;
  > let b = 2;
  > let c = 3;
  > ```
  >
  > ES6 允许写成下面这样。
  >
  > ```js
  > let [a, b, c] = [1, 2, 3];
  > ```
  >
  > 上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。
  >
  > 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子：
  >
  > ```js
  > let [foo, [[bar], baz]] = [1, [[2], 3]];
  > foo // 1
  > bar // 2
  > baz // 3
  > 
  > // 解构赋值也允许等号左边的模式之中，不放置任何变量名
  > let [ , , third] = ["foo", "bar", "baz"];
  > third // "baz"
  > 
  > let [x, , y] = [1, 2, 3];
  > x // 1
  > y // 3
  > 
  > // 尾部还可以用展开运算符，将剩余的元素都放到尾部数组中
  > let [head, ...tail] = [1, 2, 3, 4];
  > head // 1
  > tail // [2, 3, 4]
  > ```
  >
  > 如果解构不成功，变量的值就等于`undefined`以及空数组：
  >
  > ```js
  > let [x, y, ...z] = ['a'];
  > x // "a"
  > y // undefined
  > z // []
  > ```
  >
  > 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
  >
  > ```js
  > let [x, y] = [1, 2, 3];
  > x // 1
  > y // 2
  > 
  > let [a, [b], d] = [1, [2, 3], 4];
  > a // 1
  > b // 2
  > d // 4
  > ```
  >
  > 上面两个例子，都属于不完全解构，但是可以成功。
  >
  > 数组解构也可以用于给变量重新赋值：
  >
  > ```js
  > let age = 1;
  > ([age] = [18]);
  > age // 18
  > ```
  >
  > 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式：
  >
  > ```js
  > // 以下语句都是合法的，可以执行
  > ([] = [true, false]);
  > ({} = 'abc');
  > ({} = []);
  > ```
  >
  > **数组解构如果等号的右边不是可迭代的结构，并且转为对象后仍不具备 Iterator 接口，那么将会报错。**
  >
  > 事实上，**只要某种数据结构具有 `Iterator` 接口、或者转为对象后可迭代，就都可以采用数组形式的解构赋值**。Set 结构由于具备了 `Iterator` 接口，因此可以使用数组的解构赋值。
  >
  > ```js
  > let [x, y, z] = new Set(['a', 'b', 'c']);
  > x // "a"
  > ```
  
  ###### 解构时指定默认值：

  > 解构赋值允许指定默认值：
  >
  > ```js
  > let [foo = true] = [];
  > foo // true
  > 
  > let [x, y = 'b'] = ['a']; // x='a', y='b'
  > let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
  > ```
  >
  > 注意：ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。
  >
  > 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
  >
  > ```js
  > function f() {
  >  console.log('aaa');
  > }
  > let [x = f()] = [1];
  > ```
  >
  > 上面代码中，因为`x`能取到值，所以函数`f`根本不会执行。
  >
  > 默认值也可以引用解构赋值的其他变量，但该变量必须已经声明。
  >
  > ```js
  > let [x = 1, y = x] = [];     // x=1; y=1
  > let [x = 1, y = x] = [2];    // x=2; y=2
  > let [x = 1, y = x] = [1, 2]; // x=1; y=2
  > let [x = y, y = 1] = [];     // ReferenceError: y is not defined
  > ```
  
  ###### 对象解构：
  
  > 解构不仅可以用于数组，还可以用于对象。并且对象的解构赋值可以取到原型链上的属性。
  >
  > ```js
  > let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
  > foo // "aaa"
  > bar // "bbb"
  > ```
  >
  > 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的解构通过属性名来匹配和提取值，而不是通过迭代接口`Iterator`。因此被解构的对象不需要实现迭代接口`Iterator`。
  >
  > ```js
  > let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
  > foo // "aaa"
  > bar // "bbb"
  > 
  > let { baz } = { foo: 'aaa', bar: 'bbb' };
  > baz // undefined
  > ```
  >
  > **注意：对象解构要求等号右边必须是一个对象或可以转换成对象的类型。**
  >
  > 对象解构赋值的规则是，如果等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。
  >
  > 如果变量名与属性key不一致，在对象解构中可以通过`:`运算符来给变量重命名。
  >
  > ```js
  > let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
  > console.log(baz) // "aaa"
  > ```
  >
  > 这实际上说明，对象的解构赋值是下面形式的简写：
  >
  > ```js
  > let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
  > ```
  >
  > 对象解构同样可用于给变量重新赋值，以及指定默认值：
  >
  > ```js
  > let obj = {};
  > let arr = [];
  > 
  > ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
  > 
  > obj // {prop:123}
  > arr // [true]
  > 
  > // 指定默认值
  > var {x = 3} = {};
  > x // 3
  > ```
  >
  > 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构：
  >
  > ```js
  > let arr = [1, 2, 3];
  > let {0 : first, [arr.length - 1] : last} = arr;
  > first // 1
  > last // 3
  > ```
  >
  > 上面代码对数组进行对象解构。数组`arr`的`0`键对应的值是`1`，`[arr.length - 1]`就是`2`键，对应的值是`3`。方括号这种写法，属于“属性名表达式”（参见《对象的扩展》一章）。
  
  ###### 圆括号问题：
  
  > 解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
  >
  > 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
  >
  > 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

------

