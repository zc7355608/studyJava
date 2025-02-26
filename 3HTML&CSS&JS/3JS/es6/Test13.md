- ## 最新提案

  > 本章介绍一些尚未进入标准、但很有希望的最新提案。
  >
  > ## do 表达式
  >
  > 本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。
  >
  > ```
  > {
  >   let t = f();
  >   t = t * t + 1;
  > }
  > ```
  >
  > 上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到`t`的值，因为块级作用域不返回值，除非`t`是全局变量。
  >
  > 现在有一个[提案](https://github.com/tc39/proposal-do-expressions)，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上`do`，使它变为`do`表达式，然后就会返回内部最后执行的表达式的值。
  >
  > ```
  > let x = do {
  >   let t = f();
  >   t * t + 1;
  > };
  > ```
  >
  > 上面代码中，变量`x`会得到整个块级作用域的返回值（`t * t + 1`）。
  >
  > `do`表达式的逻辑非常简单：封装的是什么，就会返回什么。
  >
  > ```
  > // 等同于 <表达式>
  > do { <表达式>; }
  > 
  > // 等同于 <语句>
  > do { <语句> }
  > ```
  >
  > `do`表达式的好处是可以封装多个语句，让程序更加模块化，就像乐高积木那样一块块拼装起来。
  >
  > ```
  > let x = do {
  >   if (foo()) { f() }
  >   else if (bar()) { g() }
  >   else { h() }
  > };
  > ```
  >
  > 上面代码的本质，就是根据函数`foo`的执行结果，调用不同的函数，将返回结果赋给变量`x`。使用`do`表达式，就将这个操作的意图表达得非常简洁清晰。而且，`do`块级作用域提供了单独的作用域，内部操作可以与全局作用域隔绝。
  >
  > 值得一提的是，`do`表达式在 JSX 语法中非常好用。
  >
  > ```
  > return (
  >   <nav>
  >     <Home />
  >     {
  >       do {
  >         if (loggedIn) {
  >           <LogoutButton />
  >         } else {
  >           <LoginButton />
  >         }
  >       }
  >     }
  >   </nav>
  > )
  > ```
  >
  > 上面代码中，如果不用`do`表达式，就只能用三元判断运算符（`?:`）。那样的话，一旦判断逻辑复杂，代码就会变得很不易读。
  >
  > ## throw 表达式
  >
  > JavaScript 语法规定`throw`是一个命令，用来抛出错误，不能用于表达式之中。
  >
  > ```
  > // 报错
  > console.log(throw new Error());
  > ```
  >
  > 上面代码中，`console.log`的参数必须是一个表达式，如果是一个`throw`语句就会报错。
  >
  > 现在有一个[提案](https://github.com/tc39/proposal-throw-expressions)，允许`throw`用于表达式。
  >
  > ```
  > // 参数的默认值
  > function save(filename = throw new TypeError("Argument required")) {
  > }
  > 
  > // 箭头函数的返回值
  > lint(ast, {
  >   with: () => throw new Error("avoid using 'with' statements.")
  > });
  > 
  > // 条件表达式
  > function getEncoder(encoding) {
  >   const encoder = encoding === "utf8" ?
  >     new UTF8Encoder() :
  >     encoding === "utf16le" ?
  >       new UTF16Encoder(false) :
  >       encoding === "utf16be" ?
  >         new UTF16Encoder(true) :
  >         throw new Error("Unsupported encoding");
  > }
  > 
  > // 逻辑表达式
  > class Product {
  >   get id() {
  >     return this._id;
  >   }
  >   set id(value) {
  >     this._id = value || throw new Error("Invalid value");
  >   }
  > }
  > ```
  >
  > 上面代码中，`throw`都出现在表达式里面。
  >
  > 语法上，`throw`表达式里面的`throw`不再是一个命令，而是一个运算符。为了避免与`throw`命令混淆，规定`throw`出现在行首，一律解释为`throw`语句，而不是`throw`表达式。
  >
  > ## 函数的部分执行
  >
  > ### 语法
  >
  > 多参数的函数有时需要绑定其中的一个或多个参数，然后返回一个新函数。
  >
  > ```
  > function add(x, y) { return x + y; }
  > function add7(x) { return x + 7; }
  > ```
  >
  > 上面代码中，`add7`函数其实是`add`函数的一个特殊版本，通过将一个参数绑定为`7`，就可以从`add`得到`add7`。
  >
  > ```
  > // bind 方法
  > const add7 = add.bind(null, 7);
  > 
  > // 箭头函数
  > const add7 = x => add(x, 7);
  > ```
  >
  > 上面两种写法都有些冗余。其中，`bind`方法的局限更加明显，它必须提供`this`，并且只能从前到后一个个绑定参数，无法只绑定非头部的参数。
  >
  > 现在有一个[提案](https://github.com/tc39/proposal-partial-application)，使得绑定参数并返回一个新函数更加容易。这叫做函数的部分执行（partial application）。
  >
  > ```
  > const add = (x, y) => x + y;
  > const addOne = add(1, ?);
  > 
  > const maxGreaterThanZero = Math.max(0, ...);
  > ```
  >
  > 根据新提案，`?`是单个参数的占位符，`...`是多个参数的占位符。以下的形式都属于函数的部分执行。
  >
  > ```
  > f(x, ?)
  > f(x, ...)
  > f(?, x)
  > f(..., x)
  > f(?, x, ?)
  > f(..., x, ...)
  > ```
  >
  > `?`和`...`只能出现在函数的调用之中，并且会返回一个新函数。
  >
  > ```
  > const g = f(?, 1, ...);
  > // 等同于
  > const g = (x, ...y) => f(x, 1, ...y);
  > ```
  >
  > 函数的部分执行，也可以用于对象的方法。
  >
  > ```
  > let obj = {
  >   f(x, y) { return x + y; },
  > };
  > 
  > const g = obj.f(?, 3);
  > g(1) // 4
  > ```
  >
  > ### 注意点
  >
  > 函数的部分执行有一些特别注意的地方。
  >
  > （1）函数的部分执行是基于原函数的。如果原函数发生变化，部分执行生成的新函数也会立即反映这种变化。
  >
  > ```
  > let f = (x, y) => x + y;
  > 
  > const g = f(?, 3);
  > g(1); // 4
  > 
  > // 替换函数 f
  > f = (x, y) => x * y;
  > 
  > g(1); // 3
  > ```
  >
  > 上面代码中，定义了函数的部分执行以后，更换原函数会立即影响到新函数。
  >
  > （2）如果预先提供的那个值是一个表达式，那么这个表达式并不会在定义时求值，而是在每次调用时求值。
  >
  > ```
  > let a = 3;
  > const f = (x, y) => x + y;
  > 
  > const g = f(?, a);
  > g(1); // 4
  > 
  > // 改变 a 的值
  > a = 10;
  > g(1); // 11
  > ```
  >
  > 上面代码中，预先提供的参数是变量`a`，那么每次调用函数`g`的时候，才会对`a`进行求值。
  >
  > （3）如果新函数的参数多于占位符的数量，那么多余的参数将被忽略。
  >
  > ```
  > const f = (x, ...y) => [x, ...y];
  > const g = f(?, 1);
  > g(2, 3, 4); // [2, 1]
  > ```
  >
  > 上面代码中，函数`g`只有一个占位符，也就意味着它只能接受一个参数，多余的参数都会被忽略。
  >
  > 写成下面这样，多余的参数就没有问题。
  >
  > ```
  > const f = (x, ...y) => [x, ...y];
  > const g = f(?, 1, ...);
  > g(2, 3, 4); // [2, 1, 3, 4];
  > ```
  >
  > （4）`...`只会被采集一次，如果函数的部分执行使用了多个`...`，那么每个`...`的值都将相同。
  >
  > ```
  > const f = (...x) => x;
  > const g = f(..., 9, ...);
  > g(1, 2, 3); // [1, 2, 3, 9, 1, 2, 3]
  > ```
  >
  > 上面代码中，`g`定义了两个`...`占位符，真正执行的时候，它们的值是一样的。
  >
  > ## 管道运算符
  >
  > Unix 操作系统有一个管道机制（pipeline），可以把前一个操作的值传给后一个操作。这个机制非常有用，使得简单的操作可以组合成为复杂的操作。许多语言都有管道的实现，现在有一个[提案](https://github.com/tc39/proposal-pipeline-operator)，让 JavaScript 也拥有管道机制。
  >
  > JavaScript 的管道是一个运算符，写作`|>`。它的左边是一个表达式，右边是一个函数。管道运算符把左边表达式的值，传入右边的函数进行求值。
  >
  > ```
  > x |> f
  > // 等同于
  > f(x)
  > ```
  >
  > 管道运算符最大的好处，就是可以把嵌套的函数，写成从左到右的链式表达式。
  >
  > ```
  > function doubleSay (str) {
  >   return str + ", " + str;
  > }
  > 
  > function capitalize (str) {
  >   return str[0].toUpperCase() + str.substring(1);
  > }
  > 
  > function exclaim (str) {
  >   return str + '!';
  > }
  > ```
  >
  > 上面是三个简单的函数。如果要嵌套执行，传统的写法和管道的写法分别如下。
  >
  > ```
  > // 传统的写法
  > exclaim(capitalize(doubleSay('hello')))
  > // "Hello, hello!"
  > 
  > // 管道的写法
  > 'hello'
  >   |> doubleSay
  >   |> capitalize
  >   |> exclaim
  > // "Hello, hello!"
  > ```
  >
  > 管道运算符只能传递一个值，这意味着它右边的函数必须是一个单参数函数。如果是多参数函数，就必须进行柯里化，改成单参数的版本。
  >
  > ```
  > function double (x) { return x + x; }
  > function add (x, y) { return x + y; }
  > 
  > let person = { score: 25 };
  > person.score
  >   |> double
  >   |> (_ => add(7, _))
  > // 57
  > ```
  >
  > 上面代码中，`add`函数需要两个参数。但是，管道运算符只能传入一个值，因此需要事先提供另一个参数，并将其改成单参数的箭头函数`_ => add(7, _)`。这个函数里面的下划线并没有特别的含义，可以用其他符号代替，使用下划线只是因为，它能够形象地表示这里是占位符。
  >
  > 管道运算符对于`await`函数也适用。
  >
  > ```
  > x |> await f
  > // 等同于
  > await f(x)
  > 
  > const userAge = userId |> await fetchUserById |> getAgeFromUser;
  > // 等同于
  > const userAge = getAgeFromUser(await fetchUserById(userId));
  > ```
  >
  > 管道运算符对多步骤的数据处理，非常有用。
  >
  > ```
  > const numbers = [10, 20, 30, 40, 50];
  > 
  > const processedNumbers = numbers
  >   |> (_ => _.map(n => n / 2)) // [5, 10, 15, 20, 25]
  >   |> (_ => _.filter(n => n > 10)); // [15, 20, 25]
  > ```
  >
  > 上面示例中，管道运算符可以清晰表达数据处理的每一步，增加代码的可读性。
  >
  > ## Math.signbit()
  >
  > JavaScript 内部使用64位浮点数（国际标准 IEEE 754）表示数值。IEEE 754 规定，64位浮点数的第一位是符号位，`0`表示正数，`1`表示负数。所以会有两种零，`+0`是符号位为`0`时的零，`-0`是符号位为`1`时的零。实际编程中，判断一个值是`+0`还是`-0`非常麻烦，因为它们是相等的。
  >
  > ```
  > +0 === -0 // true
  > ```
  >
  > ES6 新增的`Math.sign()`方法，只能用来判断数值的正负，对于判断数值的符号位用处不大。因为如果参数是`-0`，它会返回`-0`，还是不能直接知道符号位是`1`还是`0`。
  >
  > ```
  > Math.sign(-0) // -0
  > ```
  >
  > 目前，有一个[提案](https://github.com/tc39/proposal-Math.signbit)，引入了`Math.signbit()`方法判断一个数的符号位是否设置了。
  >
  > ```
  > Math.signbit(2) //false
  > Math.signbit(-2) //true
  > Math.signbit(0) //false
  > Math.signbit(-0) //true
  > ```
  >
  > 可以看到，该方法正确返回了`-0`的符号位是设置了的。
  >
  > 该方法的算法如下。
  >
  > - 如果参数是`NaN`，返回`false`
  > - 如果参数是`-0`，返回`true`
  > - 如果参数是负值，返回`true`
  > - 其他情况返回`false`
  >
  > ## 双冒号运算符
  >
  > 箭头函数可以绑定`this`对象，大大减少了显式绑定`this`对象的写法（`call()`、`apply()`、`bind()`）。但是，箭头函数并不适用于所有场合，所以现在有一个[提案](https://github.com/zenparsing/es-function-bind)，提出了“函数绑定”（function bind）运算符，用来取代`call()`、`apply()`、`bind()`调用。
  >
  > 函数绑定运算符是并排的两个冒号（`::`），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即`this`对象），绑定到右边的函数上面。
  >
  > ```
  > foo::bar;
  > // 等同于
  > bar.bind(foo);
  > 
  > foo::bar(...arguments);
  > // 等同于
  > bar.apply(foo, arguments);
  > 
  > const hasOwnProperty = Object.prototype.hasOwnProperty;
  > function hasOwn(obj, key) {
  >   return obj::hasOwnProperty(key);
  > }
  > ```
  >
  > 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
  >
  > ```
  > var method = obj::obj.foo;
  > // 等同于
  > var method = ::obj.foo;
  > 
  > let log = ::console.log;
  > // 等同于
  > var log = console.log.bind(console);
  > ```
  >
  > 如果双冒号运算符的运算结果，还是一个对象，就可以采用链式写法。
  >
  > ```
  > import { map, takeWhile, forEach } from "iterlib";
  > 
  > getPlayers()
  > ::map(x => x.character())
  > ::takeWhile(x => x.strength > 100)
  > ::forEach(x => console.log(x));
  > ```
  >
  > ## Realm API
  >
  > [Realm API](https://github.com/tc39/proposal-realms) 提供沙箱功能（sandbox），允许隔离代码，防止那些被隔离的代码拿到全局对象。
  >
  > 以前，经常使用`<iframe>`作为沙箱。
  >
  > ```
  > const globalOne = window;
  > let iframe = document.createElement('iframe');
  > document.body.appendChild(iframe);
  > const globalTwo = iframe.contentWindow;
  > ```
  >
  > 上面代码中，`<iframe>`的全局对象是独立的（`iframe.contentWindow`）。Realm API 可以取代这个功能。
  >
  > ```
  > const globalOne = window;
  > const globalTwo = new Realm().global;
  > ```
  >
  > 上面代码中，`Realm API`单独提供了一个全局对象`new Realm().global`。
  >
  > Realm API 提供一个`Realm()`构造函数，用来生成一个 Realm 对象。该对象的`global`属性指向一个新的顶层对象，这个顶层对象跟原始的顶层对象类似。
  >
  > ```
  > const globalOne = window;
  > const globalTwo = new Realm().global;
  > 
  > globalOne.evaluate('1 + 2') // 3
  > globalTwo.evaluate('1 + 2') // 3
  > ```
  >
  > 上面代码中，Realm 生成的顶层对象的`evaluate()`方法，可以运行代码。
  >
  > 下面的代码可以证明，Realm 顶层对象与原始顶层对象是两个对象。
  >
  > ```
  > let a1 = globalOne.evaluate('[1,2,3]');
  > let a2 = globalTwo.evaluate('[1,2,3]');
  > a1.prototype === a2.prototype; // false
  > a1 instanceof globalTwo.Array; // false
  > a2 instanceof globalOne.Array; // false
  > ```
  >
  > 上面代码中，Realm 沙箱里面的数组的原型对象，跟原始环境里面的数组是不一样的。
  >
  > Realm 沙箱里面只能运行 ECMAScript 语法提供的 API，不能运行宿主环境提供的 API。
  >
  > ```
  > globalTwo.evaluate('console.log(1)')
  > // throw an error: console is undefined
  > ```
  >
  > 上面代码中，Realm 沙箱里面没有`console`对象，导致报错。因为`console`不是语法标准，是宿主环境提供的。
  >
  > 如果要解决这个问题，可以使用下面的代码。
  >
  > ```
  > globalTwo.console = globalOne.console;
  > ```
  >
  > `Realm()`构造函数可以接受一个参数对象，该参数对象的`intrinsics`属性可以指定 Realm 沙箱继承原始顶层对象的方法。
  >
  > ```
  > const r1 = new Realm();
  > r1.global === this;
  > r1.global.JSON === JSON; // false
  > 
  > const r2 = new Realm({ intrinsics: 'inherit' });
  > r2.global === this; // false
  > r2.global.JSON === JSON; // true
  > ```
  >
  > 上面代码中，正常情况下，沙箱的`JSON`方法不同于原始的`JSON`对象。但是，`Realm()`构造函数接受`{ intrinsics: 'inherit' }`作为参数以后，就会继承原始顶层对象的方法。
  >
  > 用户可以自己定义`Realm`的子类，用来定制自己的沙箱。
  >
  > ```
  > class FakeWindow extends Realm {
  >   init() {
  >     super.init();
  >     let global = this.global;
  > 
  >     global.document = new FakeDocument(...);
  >     global.alert = new Proxy(fakeAlert, { ... });
  >     // ...
  >   }
  > }
  > ```
  >
  > 上面代码中，`FakeWindow`模拟了一个假的顶层对象`window`。
  >
  > ## JSON 模块
  >
  > import 命令目前只能用于加载 ES 模块，现在有一个[提案](https://github.com/tc39/proposal-json-modules)，允许加载 JSON 模块。
  >
  > 假定有一个 JSON 模块文件`config.json`。
  >
  > ```
  > {
  >   "appName": "My App"
  > }
  > ```
  >
  > 目前，只能使用`fetch()`加载 JSON 模块。
  >
  > ```
  > const response = await fetch('./config.json');
  > const json = await response.json();
  > ```
  >
  > import 命令能够直接加载 JSON 模块以后，就可以像下面这样写。
  >
  > ```
  > import configData from './config.json' assert { type: "json" };
  > console.log(configData.appName);
  > ```
  >
  > 上面示例中，整个 JSON 对象被导入为`configData`对象，然后就可以从该对象获取 JSON 数据。
  >
  > `import`命令导入 JSON 模块时，命令结尾的`assert {type: "json"}`不可缺少。这叫做导入断言，用来告诉 JavaScript 引擎，现在加载的是 JSON 模块。你可能会问，为什么不通过`.json`后缀名判断呢？因为浏览器的传统是不通过后缀名判断文件类型，标准委员会希望遵循这种做法，这样也可以避免一些安全问题。
  >
  > 导入断言是 JavaScript 导入其他格式模块的标准写法，JSON 模块将是第一个使用这种语法导入的模块。以后，还会支持导入 CSS 模块、HTML 模块等等。
  >
  > 动态加载模块的`import()`函数也支持加载 JSON 模块。
  >
  > ```
  > import('./config.json', { assert: { type: 'json' } })
  > ```
  >
  > 脚本加载 JSON 模块以后，还可以再用 export 命令输出。这时，可以将 export 和 import 结合成一个语句。
  >
  > ```
  > export { config } from './config.json' assert { type: 'json' };
  > ```

- ## 装饰器（Decorator）

  > [说明] Decorator 提案经历了重大的语法变化，目前处于第三阶段，定案之前不知道是否还有变化。本章现在属于草稿阶段，凡是标注“新语法”的章节，都是基于当前的语法，不过没有详细整理，只是一些原始材料；未标注“新语法”的章节基于以前的语法，是过去遗留的稿子。之所以保留以前的内容，有两个原因，一是 TypeScript 装饰器会用到这些语法，二是里面包含不少有价值的内容。等到标准完全定案，本章将彻底重写：删去过时内容，补充材料，增加解释。（2022年6月）
  >
  > [说明] Decorator 提案经历了重大的语法变化，目前处于第三阶段，定案之前不知道是否还有变化。本章现在属于草稿阶段，凡是标注“新语法”的章节，都是基于当前的语法，不过没有详细整理，只是一些原始材料；未标注“新语法”的章节基于以前的语法，是过去遗留的稿子。之所以保留以前的内容，有两个原因，一是 TypeScript 装饰器会用到这些语法，二是里面包含不少有价值的内容。等到标准完全定案，本章将彻底重写：删去过时内容，补充材料，增加解释。（2022年6月）
  >
  > ##### 目录 [隐藏]
  >
  > - [简介（新语法）](https://wangdoc.com/es6/decorator#简介新语法)
  > - [装饰器 API（新语法）](https://wangdoc.com/es6/decorator#装饰器-api新语法)
  > - [类的装饰](https://wangdoc.com/es6/decorator#类的装饰)
  > - [类装饰器（新语法）](https://wangdoc.com/es6/decorator#类装饰器新语法)
  > - [方法装饰器（新语法）](https://wangdoc.com/es6/decorator#方法装饰器新语法)
  > - [方法的装饰](https://wangdoc.com/es6/decorator#方法的装饰)
  > - [为什么装饰器不能用于函数？](https://wangdoc.com/es6/decorator#为什么装饰器不能用于函数)
  > - [存取器装饰器（新语法）](https://wangdoc.com/es6/decorator#存取器装饰器新语法)
  > - [属性装饰器（新语法）](https://wangdoc.com/es6/decorator#属性装饰器新语法)
  > - [accessor 命令（新语法）](https://wangdoc.com/es6/decorator#accessor-命令新语法)
  > - [addInitializer() 方法（新语法）](https://wangdoc.com/es6/decorator#addinitializer-方法新语法)
  > - [core-decorators.js](https://wangdoc.com/es6/decorator#core-decoratorsjs)
  > - [使用装饰器实现自动发布事件](https://wangdoc.com/es6/decorator#使用装饰器实现自动发布事件)
  > - [Mixin](https://wangdoc.com/es6/decorator#mixin)
  > - [Trait](https://wangdoc.com/es6/decorator#trait)
  >
  > ## 简介（新语法）
  >
  > 装饰器（Decorator）用来增强 JavaScript 类（class）的功能，许多面向对象的语言都有这种语法，目前有一个[提案](https://github.com/tc39/proposal-decorators)将其引入了 ECMAScript。
  >
  > 装饰器是一种函数，写成`@ + 函数名`，可以用来装饰四种类型的值。
  >
  > - 类
  > - 类的属性
  > - 类的方法
  > - 属性存取器（accessor）
  >
  > 下面的例子是装饰器放在类名和类方法名之前，大家可以感受一下写法。
  >
  > ```
  > @frozen class Foo {
  >   @configurable(false)
  >   @enumerable(true)
  >   method() {}
  > 
  >   @throttle(500)
  >   expensiveMethod() {}
  > }
  > ```
  >
  > 上面代码一共使用了四个装饰器，一个用在类本身（@frozen），另外三个用在类方法（@configurable()、@enumerable()、@throttle()）。它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能。
  >
  > ## 装饰器 API（新语法）
  >
  > 装饰器是一个函数，API 的类型描述如下（TypeScript 写法）。
  >
  > ```
  > type Decorator = (value: Input, context: {
  >   kind: string;
  >   name: string | symbol;
  >   access: {
  >     get?(): unknown;
  >     set?(value: unknown): void;
  >   };
  >   private?: boolean;
  >   static?: boolean;
  >   addInitializer?(initializer: () => void): void;
  > }) => Output | void;
  > ```
  >
  > 装饰器函数有两个参数。运行时，JavaScript 引擎会提供这两个参数。
  >
  > - `value`：所要装饰的值，某些情况下可能是`undefined`（装饰属性时）。
  > - `context`：上下文信息对象。
  >
  > 装饰器函数的返回值，是一个新版本的装饰对象，但也可以不返回任何值（void）。
  >
  > `context`对象有很多属性，其中`kind`属性表示属于哪一种装饰，其他属性的含义如下。
  >
  > - `kind`：字符串，表示装饰类型，可能的取值有`class`、`method`、`getter`、`setter`、`field`、`accessor`。
  > - `name`：被装饰的值的名称: The name of the value, or in the case of private elements the description of it (e.g. the readable name).
  > - `access`：对象，包含访问这个值的方法，即存值器和取值器。
  > - `static`: 布尔值，该值是否为静态元素。
  > - `private`：布尔值，该值是否为私有元素。
  > - `addInitializer`：函数，允许用户增加初始化逻辑。
  >
  > 装饰器的执行步骤如下。
  >
  > 1. 计算各个装饰器的值，按照从左到右，从上到下的顺序。
  > 2. 调用方法装饰器。
  > 3. 调用类装饰器。
  >
  > ## 类的装饰
  >
  > 装饰器可以用来装饰整个类。
  >
  > ```
  > @testable
  > class MyTestableClass {
  >   // ...
  > }
  > 
  > function testable(target) {
  >   target.isTestable = true;
  > }
  > 
  > MyTestableClass.isTestable // true
  > ```
  >
  > 上面代码中，`@testable`就是一个装饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`。`testable`函数的参数`target`是`MyTestableClass`类本身。
  >
  > 基本上，装饰器的行为就是下面这样。
  >
  > ```
  > @decorator
  > class A {}
  > 
  > // 等同于
  > 
  > class A {}
  > A = decorator(A) || A;
  > ```
  >
  > 也就是说，装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。
  >
  > ```
  > function testable(target) {
  >   // ...
  > }
  > ```
  >
  > 上面代码中，`testable`函数的参数`target`，就是会被装饰的类。
  >
  > 如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。
  >
  > ```
  > function testable(isTestable) {
  >   return function(target) {
  >     target.isTestable = isTestable;
  >   }
  > }
  > 
  > @testable(true)
  > class MyTestableClass {}
  > MyTestableClass.isTestable // true
  > 
  > @testable(false)
  > class MyClass {}
  > MyClass.isTestable // false
  > ```
  >
  > 上面代码中，装饰器`testable`可以接受参数，这就等于可以修改装饰器的行为。
  >
  > 注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。
  >
  > 前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的`prototype`对象操作。
  >
  > ```
  > function testable(target) {
  >   target.prototype.isTestable = true;
  > }
  > 
  > @testable
  > class MyTestableClass {}
  > 
  > let obj = new MyTestableClass();
  > obj.isTestable // true
  > ```
  >
  > 上面代码中，装饰器函数`testable`是在目标类的`prototype`对象上添加属性，因此就可以在实例上调用。
  >
  > 下面是另外一个例子。
  >
  > ```
  > // mixins.js
  > export function mixins(...list) {
  >   return function (target) {
  >     Object.assign(target.prototype, ...list)
  >   }
  > }
  > 
  > // main.js
  > import { mixins } from './mixins.js'
  > 
  > const Foo = {
  >   foo() { console.log('foo') }
  > };
  > 
  > @mixins(Foo)
  > class MyClass {}
  > 
  > let obj = new MyClass();
  > obj.foo() // 'foo'
  > ```
  >
  > 上面代码通过装饰器`mixins`，把`Foo`对象的方法添加到了`MyClass`的实例上面。可以用`Object.assign()`模拟这个功能。
  >
  > ```
  > const Foo = {
  >   foo() { console.log('foo') }
  > };
  > 
  > class MyClass {}
  > 
  > Object.assign(MyClass.prototype, Foo);
  > 
  > let obj = new MyClass();
  > obj.foo() // 'foo'
  > ```
  >
  > 实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
  >
  > ```
  > class MyReactComponent extends React.Component {}
  > 
  > export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
  > ```
  >
  > 有了装饰器，就可以改写上面的代码。
  >
  > ```
  > @connect(mapStateToProps, mapDispatchToProps)
  > export default class MyReactComponent extends React.Component {}
  > ```
  >
  > 相对来说，后一种写法看上去更容易理解。
  >
  > ## 类装饰器（新语法）
  >
  > 类装饰器的类型描述如下。
  >
  > ```
  > type ClassDecorator = (value: Function, context: {
  >   kind: "class";
  >   name: string | undefined;
  >   addInitializer(initializer: () => void): void;
  > }) => Function | void;
  > ```
  >
  > 类装饰器的第一个参数，就是被装饰的类。第二个参数是上下文对象，如果被装饰的类是一个匿名类，`name`属性就为`undefined`。
  >
  > 类装饰器可以返回一个新的类，取代原来的类，也可以不返回任何值。如果返回的不是构造函数，就会报错。
  >
  > 下面是一个例子。
  >
  > ```
  > function logged(value, { kind, name }) {
  >   if (kind === "class") {
  >     return class extends value {
  >       constructor(...args) {
  >         super(...args);
  >         console.log(`constructing an instance of ${name} with arguments ${args.join(", ")}`);
  >       }
  >     }
  >   }
  > 
  >   // ...
  > }
  > 
  > @logged
  > class C {}
  > 
  > new C(1);
  > // constructing an instance of C with arguments 1
  > ```
  >
  > 如果不使用装饰器，类装饰器实际上执行的是下面的语法。
  >
  > ```
  > class C {}
  > 
  > C = logged(C, {
  >   kind: "class",
  >   name: "C",
  > }) ?? C;
  > 
  > new C(1);
  > ```
  >
  > ## 方法装饰器（新语法）
  >
  > 方法装饰器会修改类的方法。
  >
  > ```
  > class C {
  >   @trace
  >   toString() {
  >     return 'C';
  >   }
  > }
  > 
  > // 相当于
  > C.prototype.toString = trace(C.prototype.toString);
  > ```
  >
  > 上面示例中，`@trace`装饰`toString()`方法，就相当于修改了该方法。
  >
  > 方法装饰器使用 TypeScript 描述类型如下。
  >
  > ```
  > type ClassMethodDecorator = (value: Function, context: {
  >   kind: "method";
  >   name: string | symbol;
  >   access: { get(): unknown };
  >   static: boolean;
  >   private: boolean;
  >   addInitializer(initializer: () => void): void;
  > }) => Function | void;
  > ```
  >
  > 方法装饰器的第一个参数`value`，就是所要装饰的方法。
  >
  > 方法装饰器可以返回一个新函数，取代原来的方法，也可以不返回值，表示依然使用原来的方法。如果返回其他类型的值，就会报错。下面是一个例子。
  >
  > ```
  > function replaceMethod() {
  >   return function () {
  >     return `How are you, ${this.name}?`;
  >   }
  > }
  > 
  > class Person {
  >   constructor(name) {
  >     this.name = name;
  >   }
  >   @replaceMethod
  >   hello() {
  >     return `Hi ${this.name}!`;
  >   }
  > }
  > 
  > const robin = new Person('Robin');
  > 
  > robin.hello(), 'How are you, Robin?'
  > ```
  >
  > 上面示例中，`@replaceMethod`返回了一个新函数，取代了原来的`hello()`方法。
  >
  > ```
  > function logged(value, { kind, name }) {
  >   if (kind === "method") {
  >     return function (...args) {
  >       console.log(`starting ${name} with arguments ${args.join(", ")}`);
  >       const ret = value.call(this, ...args);
  >       console.log(`ending ${name}`);
  >       return ret;
  >     };
  >   }
  > }
  > 
  > class C {
  >   @logged
  >   m(arg) {}
  > }
  > 
  > new C().m(1);
  > // starting m with arguments 1
  > // ending m
  > ```
  >
  > 上面示例中，装饰器`@logged`返回一个函数，代替原来的`m()`方法。
  >
  > 这里的装饰器实际上是一个语法糖，真正的操作是像下面这样，改掉原型链上面`m()`方法。
  >
  > ```
  > class C {
  >   m(arg) {}
  > }
  > 
  > C.prototype.m = logged(C.prototype.m, {
  >   kind: "method",
  >   name: "m",
  >   static: false,
  >   private: false,
  > }) ?? C.prototype.m;
  > ```
  >
  > ## 方法的装饰
  >
  > 装饰器不仅可以装饰类，还可以装饰类的属性。
  >
  > ```
  > class Person {
  >   @readonly
  >   name() { return `${this.first} ${this.last}` }
  > }
  > ```
  >
  > 上面代码中，装饰器`readonly`用来装饰“类”的`name`方法。
  >
  > 装饰器函数`readonly`一共可以接受三个参数。
  >
  > ```
  > function readonly(target, name, descriptor){
  >   // descriptor对象原来的值如下
  >   // {
  >   //   value: specifiedFunction,
  >   //   enumerable: false,
  >   //   configurable: true,
  >   //   writable: true
  >   // };
  >   descriptor.writable = false;
  >   return descriptor;
  > }
  > 
  > readonly(Person.prototype, 'name', descriptor);
  > // 类似于
  > Object.defineProperty(Person.prototype, 'name', descriptor);
  > ```
  >
  > 装饰器第一个参数是类的原型对象，上例是`Person.prototype`，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时`target`参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。
  >
  > 另外，上面代码说明，装饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。
  >
  > 下面是另一个例子，修改属性描述对象的`enumerable`属性，使得该属性不可遍历。
  >
  > ```
  > class Person {
  >   @nonenumerable
  >   get kidCount() { return this.children.length; }
  > }
  > 
  > function nonenumerable(target, name, descriptor) {
  >   descriptor.enumerable = false;
  >   return descriptor;
  > }
  > ```
  >
  > 下面的`@log`装饰器，可以起到输出日志的作用。
  >
  > ```
  > class Math {
  >   @log
  >   add(a, b) {
  >     return a + b;
  >   }
  > }
  > 
  > function log(target, name, descriptor) {
  >   var oldValue = descriptor.value;
  > 
  >   descriptor.value = function() {
  >     console.log(`Calling ${name} with`, arguments);
  >     return oldValue.apply(this, arguments);
  >   };
  > 
  >   return descriptor;
  > }
  > 
  > const math = new Math();
  > 
  > // passed parameters should get logged now
  > math.add(2, 4);
  > ```
  >
  > 上面代码中，`@log`装饰器的作用就是在执行原始的操作之前，执行一次`console.log`，从而达到输出日志的目的。
  >
  > 装饰器有注释的作用。
  >
  > ```
  > @testable
  > class Person {
  >   @readonly
  >   @nonenumerable
  >   name() { return `${this.first} ${this.last}` }
  > }
  > ```
  >
  > 从上面代码中，我们一眼就能看出，`Person`类是可测试的，而`name`方法是只读和不可枚举的。
  >
  > 下面是使用 Decorator 写法的[组件](https://github.com/ionic-team/stencil)，看上去一目了然。
  >
  > ```
  > @Component({
  >   tag: 'my-component',
  >   styleUrl: 'my-component.scss'
  > })
  > export class MyComponent {
  >   @Prop() first: string;
  >   @Prop() last: string;
  >   @State() isVisible: boolean = true;
  > 
  >   render() {
  >     return (
  >       <p>Hello, my name is {this.first} {this.last}</p>
  >     );
  >   }
  > }
  > ```
  >
  > 如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
  >
  > ```
  > function dec(id){
  >   console.log('evaluated', id);
  >   return (target, property, descriptor) => console.log('executed', id);
  > }
  > 
  > class Example {
  >     @dec(1)
  >     @dec(2)
  >     method(){}
  > }
  > // evaluated 1
  > // evaluated 2
  > // executed 2
  > // executed 1
  > ```
  >
  > 上面代码中，外层装饰器`@dec(1)`先进入，但是内层装饰器`@dec(2)`先执行。
  >
  > 除了注释，装饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。
  >
  > ## 为什么装饰器不能用于函数？
  >
  > 装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
  >
  > ```
  > var counter = 0;
  > 
  > var add = function () {
  >   counter++;
  > };
  > 
  > @add
  > function foo() {
  > }
  > ```
  >
  > 上面的代码，意图是执行后`counter`等于 1，但是实际上结果是`counter`等于 0。因为函数提升，使得实际执行的代码是下面这样。
  >
  > ```
  > var counter;
  > var add;
  > 
  > @add
  > function foo() {
  > }
  > 
  > counter = 0;
  > 
  > add = function () {
  >   counter++;
  > };
  > ```
  >
  > 下面是另一个例子。
  >
  > ```
  > var readOnly = require("some-decorator");
  > 
  > @readOnly
  > function foo() {
  > }
  > ```
  >
  > 上面代码也有问题，因为实际执行是下面这样。
  >
  > ```
  > var readOnly;
  > 
  > @readOnly
  > function foo() {
  > }
  > 
  > readOnly = require("some-decorator");
  > ```
  >
  > 总之，由于存在函数提升，使得装饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。
  >
  > 另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。
  >
  > ```
  > function doSomething(name) {
  >   console.log('Hello, ' + name);
  > }
  > 
  > function loggingDecorator(wrapped) {
  >   return function() {
  >     console.log('Starting');
  >     const result = wrapped.apply(this, arguments);
  >     console.log('Finished');
  >     return result;
  >   }
  > }
  > 
  > const wrapped = loggingDecorator(doSomething);
  > ```
  >
  > ## 存取器装饰器（新语法）
  >
  > 存取器装饰器使用 TypeScript 描述的类型如下。
  >
  > ```
  > type ClassGetterDecorator = (value: Function, context: {
  >   kind: "getter";
  >   name: string | symbol;
  >   access: { get(): unknown };
  >   static: boolean;
  >   private: boolean;
  >   addInitializer(initializer: () => void): void;
  > }) => Function | void;
  > 
  > type ClassSetterDecorator = (value: Function, context: {
  >   kind: "setter";
  >   name: string | symbol;
  >   access: { set(value: unknown): void };
  >   static: boolean;
  >   private: boolean;
  >   addInitializer(initializer: () => void): void;
  > }) => Function | void;
  > ```
  >
  > 存取器装饰器的第一个参数就是原始的存值器（setter）和取值器（getter）。
  >
  > 存取器装饰器的返回值如果是一个函数，就会取代原来的存取器。本质上，就像方法装饰器一样，修改发生在类的原型对象上。它也可以不返回任何值，继续使用原来的存取器。如果返回其他类型的值，就会报错。
  >
  > 存取器装饰器对存值器（setter）和取值器（getter）是分开作用的。下面的例子里面，`@foo`只装饰`get x()`，不装饰`set x()`。
  >
  > ```
  > class C {
  >   @foo
  >   get x() {
  >     // ...
  >   }
  > 
  >   set x(val) {
  >     // ...
  >   }
  > }
  > ```
  >
  > 上一节的`@logged`装饰器稍加修改，就可以用在存取装饰器。
  >
  > ```
  > function logged(value, { kind, name }) {
  >   if (kind === "method" || kind === "getter" || kind === "setter") {
  >     return function (...args) {
  >       console.log(`starting ${name} with arguments ${args.join(", ")}`);
  >       const ret = value.call(this, ...args);
  >       console.log(`ending ${name}`);
  >       return ret;
  >     };
  >   }
  > }
  > 
  > class C {
  >   @logged
  >   set x(arg) {}
  > }
  > 
  > new C().x = 1
  > // starting x with arguments 1
  > // ending x
  > ```
  >
  > 如果去掉语法糖，使用传统语法来写，就是改掉了类的原型链。
  >
  > ```
  > class C {
  >   set x(arg) {}
  > }
  > 
  > let { set } = Object.getOwnPropertyDescriptor(C.prototype, "x");
  > set = logged(set, {
  >   kind: "setter",
  >   name: "x",
  >   static: false,
  >   private: false,
  > }) ?? set;
  > 
  > Object.defineProperty(C.prototype, "x", { set });
  > ```
  >
  > ## 属性装饰器（新语法）
  >
  > 属性装饰器的类型描述如下。
  >
  > ```
  > type ClassFieldDecorator = (value: undefined, context: {
  >   kind: "field";
  >   name: string | symbol;
  >   access: { get(): unknown, set(value: unknown): void };
  >   static: boolean;
  >   private: boolean;
  > }) => (initialValue: unknown) => unknown | void;
  > ```
  >
  > 属性装饰器的第一个参数是`undefined`，即不输入值。用户可以选择让装饰器返回一个初始化函数，当该属性被赋值时，这个初始化函数会自动运行，它会收到属性的初始值，然后返回一个新的初始值。属性装饰器也可以不返回任何值。除了这两种情况，返回其他类型的值都会报错。
  >
  > 下面是一个例子。
  >
  > ```
  > function logged(value, { kind, name }) {
  >   if (kind === "field") {
  >     return function (initialValue) {
  >       console.log(`initializing ${name} with value ${initialValue}`);
  >       return initialValue;
  >     };
  >   }
  > 
  >   // ...
  > }
  > 
  > class C {
  >   @logged x = 1;
  > }
  > 
  > new C();
  > // initializing x with value 1
  > ```
  >
  > 如果不使用装饰器语法，属性装饰器的实际作用如下。
  >
  > ```
  > let initializeX = logged(undefined, {
  >   kind: "field",
  >   name: "x",
  >   static: false,
  >   private: false,
  > }) ?? (initialValue) => initialValue;
  > 
  > class C {
  >   x = initializeX.call(this, 1);
  > }
  > ```
  >
  > ## accessor 命令（新语法）
  >
  > 类装饰器引入了一个新命令`accessor`，用来属性的前缀。
  >
  > ```
  > class C {
  >   accessor x = 1;
  > }
  > ```
  >
  > 它是一种简写形式，相当于声明属性`x`是私有属性`#x`的存取接口。上面的代码等同于下面的代码。
  >
  > ```
  > class C {
  >   #x = 1;
  > 
  >   get x() {
  >     return this.#x;
  >   }
  > 
  >   set x(val) {
  >     this.#x = val;
  >   }
  > }
  > ```
  >
  > `accessor`命令前面，还可以加上`static`命令和`private`命令。
  >
  > ```
  > class C {
  >   static accessor x = 1;
  >   accessor #y = 2;
  > }
  > ```
  >
  > `accessor`命令前面还可以接受属性装饰器。
  >
  > ```
  > function logged(value, { kind, name }) {
  >   if (kind === "accessor") {
  >     let { get, set } = value;
  > 
  >     return {
  >       get() {
  >         console.log(`getting ${name}`);
  > 
  >         return get.call(this);
  >       },
  > 
  >       set(val) {
  >         console.log(`setting ${name} to ${val}`);
  > 
  >         return set.call(this, val);
  >       },
  > 
  >       init(initialValue) {
  >         console.log(`initializing ${name} with value ${initialValue}`);
  >         return initialValue;
  >       }
  >     };
  >   }
  > 
  >   // ...
  > }
  > 
  > class C {
  >   @logged accessor x = 1;
  > }
  > 
  > let c = new C();
  > // initializing x with value 1
  > c.x;
  > // getting x
  > c.x = 123;
  > // setting x to 123
  > ```
  >
  > 上面的示例等同于使用`@logged`装饰器，改写`accessor`属性的 getter 和 setter 方法。
  >
  > 用于`accessor`的属性装饰器的类型描述如下。
  >
  > ```
  > type ClassAutoAccessorDecorator = (
  >   value: {
  >     get: () => unknown;
  >     set(value: unknown) => void;
  >   },
  >   context: {
  >     kind: "accessor";
  >     name: string | symbol;
  >     access: { get(): unknown, set(value: unknown): void };
  >     static: boolean;
  >     private: boolean;
  >     addInitializer(initializer: () => void): void;
  >   }
  > ) => {
  >   get?: () => unknown;
  >   set?: (value: unknown) => void;
  >   initialize?: (initialValue: unknown) => unknown;
  > } | void;
  > ```
  >
  > `accessor`命令的第一个参数接收到的是一个对象，包含了`accessor`命令定义的属性的存取器 get 和 set。属性装饰器可以返回一个新对象，其中包含了新的存取器，用来取代原来的，即相当于拦截了原来的存取器。此外，返回的对象还可以包括一个`initialize`函数，用来改变私有属性的初始值。装饰器也可以不返回值，如果返回的是其他类型的值，或者包含其他属性的对象，就会报错。
  >
  > ## addInitializer() 方法（新语法）
  >
  > 除了属性装饰器，其他装饰器的上下文对象还包括一个`addInitializer()`方法，用来完成初始化操作。
  >
  > 它的运行时间如下。
  >
  > - 类装饰器：在类被完全定义之后。
  > - 方法装饰器：在类构造期间运行，在属性初始化之前。
  > - 静态方法装饰器：在类定义期间运行，早于静态属性定义，但晚于类方法的定义。
  >
  > 下面是一个例子。
  >
  > ```
  > function customElement(name) {
  >   return (value, { addInitializer }) => {
  >     addInitializer(function() {
  >       customElements.define(name, this);
  >     });
  >   }
  > }
  > 
  > @customElement('my-element')
  > class MyElement extends HTMLElement {
  >   static get observedAttributes() {
  >     return ['some', 'attrs'];
  >   }
  > }
  > ```
  >
  > 上面的代码等同于下面不使用装饰器的代码。
  >
  > ```
  > class MyElement {
  >   static get observedAttributes() {
  >     return ['some', 'attrs'];
  >   }
  > }
  > 
  > let initializersForMyElement = [];
  > 
  > MyElement = customElement('my-element')(MyElement, {
  >   kind: "class",
  >   name: "MyElement",
  >   addInitializer(fn) {
  >     initializersForMyElement.push(fn);
  >   },
  > }) ?? MyElement;
  > 
  > for (let initializer of initializersForMyElement) {
  >   initializer.call(MyElement);
  > }
  > ```
  >
  > 下面是方法装饰器的例子。
  >
  > ```
  > function bound(value, { name, addInitializer }) {
  >   addInitializer(function () {
  >     this[name] = this[name].bind(this);
  >   });
  > }
  > 
  > class C {
  >   message = "hello!";
  > 
  >   @bound
  >   m() {
  >     console.log(this.message);
  >   }
  > }
  > 
  > let { m } = new C();
  > 
  > m(); // hello!
  > ```
  >
  > 上面的代码等同于下面不使用装饰器的代码。
  >
  > ```
  > class C {
  >   constructor() {
  >     for (let initializer of initializersForM) {
  >       initializer.call(this);
  >     }
  > 
  >     this.message = "hello!";
  >   }
  > 
  >   m() {}
  > }
  > 
  > let initializersForM = []
  > 
  > C.prototype.m = bound(
  >   C.prototype.m,
  >   {
  >     kind: "method",
  >     name: "m",
  >     static: false,
  >     private: false,
  >     addInitializer(fn) {
  >       initializersForM.push(fn);
  >     },
  >   }
  > ) ?? C.prototype.m;
  > ```
  >
  > ## core-decorators.js
  >
  > [core-decorators.js](https://github.com/jayphelps/core-decorators.js)是一个第三方模块，提供了几个常见的装饰器，通过它可以更好地理解装饰器。
  >
  > **（1）@autobind**
  >
  > `autobind`装饰器使得方法中的`this`对象，绑定原始对象。
  >
  > ```
  > import { autobind } from 'core-decorators';
  > 
  > class Person {
  >   @autobind
  >   getPerson() {
  >     return this;
  >   }
  > }
  > 
  > let person = new Person();
  > let getPerson = person.getPerson;
  > 
  > getPerson() === person;
  > // true
  > ```
  >
  > **（2）@readonly**
  >
  > `readonly`装饰器使得属性或方法不可写。
  >
  > ```
  > import { readonly } from 'core-decorators';
  > 
  > class Meal {
  >   @readonly
  >   entree = 'steak';
  > }
  > 
  > var dinner = new Meal();
  > dinner.entree = 'salmon';
  > // Cannot assign to read only property 'entree' of [object Object]
  > ```
  >
  > **（3）@override**
  >
  > `override`装饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。
  >
  > ```
  > import { override } from 'core-decorators';
  > 
  > class Parent {
  >   speak(first, second) {}
  > }
  > 
  > class Child extends Parent {
  >   @override
  >   speak() {}
  >   // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
  > }
  > 
  > // or
  > 
  > class Child extends Parent {
  >   @override
  >   speaks() {}
  >   // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  >   //
  >   //   Did you mean "speak"?
  > }
  > ```
  >
  > **（4）@deprecate (别名@deprecated)**
  >
  > `deprecate`或`deprecated`装饰器在控制台显示一条警告，表示该方法将废除。
  >
  > ```
  > import { deprecate } from 'core-decorators';
  > 
  > class Person {
  >   @deprecate
  >   facepalm() {}
  > 
  >   @deprecate('We stopped facepalming')
  >   facepalmHard() {}
  > 
  >   @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  >   facepalmHarder() {}
  > }
  > 
  > let person = new Person();
  > 
  > person.facepalm();
  > // DEPRECATION Person#facepalm: This function will be removed in future versions.
  > 
  > person.facepalmHard();
  > // DEPRECATION Person#facepalmHard: We stopped facepalming
  > 
  > person.facepalmHarder();
  > // DEPRECATION Person#facepalmHarder: We stopped facepalming
  > //
  > //     See http://knowyourmeme.com/memes/facepalm for more details.
  > //
  > ```
  >
  > **（5）@suppressWarnings**
  >
  > `suppressWarnings`装饰器抑制`deprecated`装饰器导致的`console.warn()`调用。但是，异步代码发出的调用除外。
  >
  > ```
  > import { suppressWarnings } from 'core-decorators';
  > 
  > class Person {
  >   @deprecated
  >   facepalm() {}
  > 
  >   @suppressWarnings
  >   facepalmWithoutWarning() {
  >     this.facepalm();
  >   }
  > }
  > 
  > let person = new Person();
  > 
  > person.facepalmWithoutWarning();
  > // no warning is logged
  > ```
  >
  > ## 使用装饰器实现自动发布事件
  >
  > 我们可以使用装饰器，使得对象的方法被调用时，自动发出一个事件。
  >
  > ```
  > const postal = require("postal/lib/postal.lodash");
  > 
  > export default function publish(topic, channel) {
  >   const channelName = channel || '/';
  >   const msgChannel = postal.channel(channelName);
  >   msgChannel.subscribe(topic, v => {
  >     console.log('频道: ', channelName);
  >     console.log('事件: ', topic);
  >     console.log('数据: ', v);
  >   });
  > 
  >   return function(target, name, descriptor) {
  >     const fn = descriptor.value;
  > 
  >     descriptor.value = function() {
  >       let value = fn.apply(this, arguments);
  >       msgChannel.publish(topic, value);
  >     };
  >   };
  > }
  > ```
  >
  > 上面代码定义了一个名为`publish`的装饰器，它通过改写`descriptor.value`，使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是[Postal.js](https://github.com/postaljs/postal.js)。
  >
  > 它的用法如下。
  >
  > ```
  > // index.js
  > import publish from './publish';
  > 
  > class FooComponent {
  >   @publish('foo.some.message', 'component')
  >   someMethod() {
  >     return { my: 'data' };
  >   }
  >   @publish('foo.some.other')
  >   anotherMethod() {
  >     // ...
  >   }
  > }
  > 
  > let foo = new FooComponent();
  > 
  > foo.someMethod();
  > foo.anotherMethod();
  > ```
  >
  > 以后，只要调用`someMethod`或者`anotherMethod`，就会自动发出一个事件。
  >
  > ```
  > $ bash-node index.js
  > 频道:  component
  > 事件:  foo.some.message
  > 数据:  { my: 'data' }
  > 
  > 频道:  /
  > 事件:  foo.some.other
  > 数据:  undefined
  > ```
  >
  > ## Mixin
  >
  > 在装饰器的基础上，可以实现`Mixin`模式。所谓`Mixin`模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。
  >
  > 请看下面的例子。
  >
  > ```
  > const Foo = {
  >   foo() { console.log('foo') }
  > };
  > 
  > class MyClass {}
  > 
  > Object.assign(MyClass.prototype, Foo);
  > 
  > let obj = new MyClass();
  > obj.foo() // 'foo'
  > ```
  >
  > 上面代码之中，对象`Foo`有一个`foo`方法，通过`Object.assign`方法，可以将`foo`方法“混入”`MyClass`类，导致`MyClass`的实例`obj`对象都具有`foo`方法。这就是“混入”模式的一个简单实现。
  >
  > 下面，我们部署一个通用脚本`mixins.js`，将 Mixin 写成一个装饰器。
  >
  > ```
  > export function mixins(...list) {
  >   return function (target) {
  >     Object.assign(target.prototype, ...list);
  >   };
  > }
  > ```
  >
  > 然后，就可以使用上面这个装饰器，为类“混入”各种方法。
  >
  > ```
  > import { mixins } from './mixins.js';
  > 
  > const Foo = {
  >   foo() { console.log('foo') }
  > };
  > 
  > @mixins(Foo)
  > class MyClass {}
  > 
  > let obj = new MyClass();
  > obj.foo() // "foo"
  > ```
  >
  > 通过`mixins`这个装饰器，实现了在`MyClass`类上面“混入”`Foo`对象的`foo`方法。
  >
  > 不过，上面的方法会改写`MyClass`类的`prototype`对象，如果不喜欢这一点，也可以通过类的继承实现 Mixin。
  >
  > ```
  > class MyClass extends MyBaseClass {
  >   /* ... */
  > }
  > ```
  >
  > 上面代码中，`MyClass`继承了`MyBaseClass`。如果我们想在`MyClass`里面“混入”一个`foo`方法，一个办法是在`MyClass`和`MyBaseClass`之间插入一个混入类，这个类具有`foo`方法，并且继承了`MyBaseClass`的所有方法，然后`MyClass`再继承这个类。
  >
  > ```
  > let MyMixin = (superclass) => class extends superclass {
  >   foo() {
  >     console.log('foo from MyMixin');
  >   }
  > };
  > ```
  >
  > 上面代码中，`MyMixin`是一个混入类生成器，接受`superclass`作为参数，然后返回一个继承`superclass`的子类，该子类包含一个`foo`方法。
  >
  > 接着，目标类再去继承这个混入类，就达到了“混入”`foo`方法的目的。
  >
  > ```
  > class MyClass extends MyMixin(MyBaseClass) {
  >   /* ... */
  > }
  > 
  > let c = new MyClass();
  > c.foo(); // "foo from MyMixin"
  > ```
  >
  > 如果需要“混入”多个方法，就生成多个混入类。
  >
  > ```
  > class MyClass extends Mixin1(Mixin2(MyBaseClass)) {
  >   /* ... */
  > }
  > ```
  >
  > 这种写法的一个好处，是可以调用`super`，因此可以避免在“混入”过程中覆盖父类的同名方法。
  >
  > ```
  > let Mixin1 = (superclass) => class extends superclass {
  >   foo() {
  >     console.log('foo from Mixin1');
  >     if (super.foo) super.foo();
  >   }
  > };
  > 
  > let Mixin2 = (superclass) => class extends superclass {
  >   foo() {
  >     console.log('foo from Mixin2');
  >     if (super.foo) super.foo();
  >   }
  > };
  > 
  > class S {
  >   foo() {
  >     console.log('foo from S');
  >   }
  > }
  > 
  > class C extends Mixin1(Mixin2(S)) {
  >   foo() {
  >     console.log('foo from C');
  >     super.foo();
  >   }
  > }
  > ```
  >
  > 上面代码中，每一次`混入`发生时，都调用了父类的`super.foo`方法，导致父类的同名方法没有被覆盖，行为被保留了下来。
  >
  > ```
  > new C().foo()
  > // foo from C
  > // foo from Mixin1
  > // foo from Mixin2
  > // foo from S
  > ```
  >
  > ## Trait
  >
  > Trait 也是一种装饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。
  >
  > 下面采用[traits-decorator](https://github.com/CocktailJS/traits-decorator)这个第三方模块作为例子。这个模块提供的`traits`装饰器，不仅可以接受对象，还可以接受 ES6 类作为参数。
  >
  > ```
  > import { traits } from 'traits-decorator';
  > 
  > class TFoo {
  >   foo() { console.log('foo') }
  > }
  > 
  > const TBar = {
  >   bar() { console.log('bar') }
  > };
  > 
  > @traits(TFoo, TBar)
  > class MyClass { }
  > 
  > let obj = new MyClass();
  > obj.foo() // foo
  > obj.bar() // bar
  > ```
  >
  > 上面代码中，通过`traits`装饰器，在`MyClass`类上面“混入”了`TFoo`类的`foo`方法和`TBar`对象的`bar`方法。
  >
  > Trait 不允许“混入”同名方法。
  >
  > ```
  > import { traits } from 'traits-decorator';
  > 
  > class TFoo {
  >   foo() { console.log('foo') }
  > }
  > 
  > const TBar = {
  >   bar() { console.log('bar') },
  >   foo() { console.log('foo') }
  > };
  > 
  > @traits(TFoo, TBar)
  > class MyClass { }
  > // 报错
  > // throw new Error('Method named: ' + methodName + ' is defined twice.');
  > //        ^
  > // Error: Method named: foo is defined twice.
  > ```
  >
  > 上面代码中，`TFoo`和`TBar`都有`foo`方法，结果`traits`装饰器报错。
  >
  > 一种解决方法是排除`TBar`的`foo`方法。
  >
  > ```
  > import { traits, excludes } from 'traits-decorator';
  > 
  > class TFoo {
  >   foo() { console.log('foo') }
  > }
  > 
  > const TBar = {
  >   bar() { console.log('bar') },
  >   foo() { console.log('foo') }
  > };
  > 
  > @traits(TFoo, TBar::excludes('foo'))
  > class MyClass { }
  > 
  > let obj = new MyClass();
  > obj.foo() // foo
  > obj.bar() // bar
  > ```
  >
  > 上面代码使用绑定运算符（::）在`TBar`上排除`foo`方法，混入时就不会报错了。
  >
  > 另一种方法是为`TBar`的`foo`方法起一个别名。
  >
  > ```
  > import { traits, alias } from 'traits-decorator';
  > 
  > class TFoo {
  >   foo() { console.log('foo') }
  > }
  > 
  > const TBar = {
  >   bar() { console.log('bar') },
  >   foo() { console.log('foo') }
  > };
  > 
  > @traits(TFoo, TBar::alias({foo: 'aliasFoo'}))
  > class MyClass { }
  > 
  > let obj = new MyClass();
  > obj.foo() // foo
  > obj.aliasFoo() // foo
  > obj.bar() // bar
  > ```
  >
  > 上面代码为`TBar`的`foo`方法起了别名`aliasFoo`，于是`MyClass`也可以混入`TBar`的`foo`方法了。
  >
  > `alias`和`excludes`方法，可以结合起来使用。
  >
  > ```
  > @traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
  > class MyClass {}
  > ```
  >
  > 上面代码排除了`TExample`的`foo`方法和`bar`方法，为`baz`方法起了别名`exampleBaz`。
  >
  > `as`方法则为上面的代码提供了另一种写法。
  >
  > ```
  > @traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
  > class MyClass {}
  > ```