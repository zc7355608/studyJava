# JavaScript

------

- ### 什么是JavaScript：

  > ​	JavaScript是运行在浏览器上的解释型脚本语言，简称JS。它由网景公司（NetScape）的布兰登艾奇（JavaScript之父）开发的，最初叫LiveScript。LiveScript的出现让浏览器更加的生动了，不再是单纯的静态界面了，更加的灵活具有可交互性；在历史的某个阶段，SUN公司和网景公司有合作关系，于是网景公司将LiveScript的名字改为了JavaScript，但是它本身和Java语言没有任何关系。
  > ​	JavaScript源代码不需要我们做编译，可以直接运行在浏览器上，由浏览器解释执行，是源代码就是以.js结尾的普通文本。这种特性的语言称为“脚本语言”，该语言的出现是为网景公司的浏览器Navigator定制的，不支持其他浏览器。后来微软为了与之抗衡，出现了JScript，只支持IE。后来MCMA组织根据JavaScript制定了ECMA-262标准，也叫ECMA-Script，现在的JScript和JavaScript都实现了该规范，统一了HTML中的JavaScript代码。JS的出现可以让网页实现动态的交互。

- ### JavaScript在浏览器中包括三部分：

  - ECMAScript：包含JS的基础核心语法，JS的标准规范。
  - WebAPIs：浏览器和JS语言的接口，可以让JS通过这套接口来操作浏览器程序。它又分为：
    - DOM：Document Object Model（文档对象模型），对浏览器网页中的节点进行增删改的过程，html文档被当做一个dom树来看待。dom用于操作网页内容，我们要想让html页面发生变化，就得用dom来做。
    - BOM：Browser Object Model（浏览器对象模型），操作浏览器窗口、浏览器地址栏上的地址等，都是BOM编程；两者之间的联系：BOM的顶级对象：window、DOM的顶级对象：document。BOM是包括DOM的（其实是`window.document.querySelector()`），js中所有全局的属性和函数都是window对象的，全局的window.可以省略。

- ### HTML文件中嵌入JavaScript代码：（3种方式）

  1. 行内JS：通过HTML元素属性的方式。JS是一门事件驱动型语言，依靠事件去驱动执行代码。在JS中有很多事件，每个事件都对应一个“事件句炳”，事件句柄是以标签的属性存在的。其中一个事件：鼠标单击事件`click`，它对应的事件句柄是`onclick`。事件和事件句柄的区别是：事件句柄是在“事件”前面加上on。（超链接的href可以在其中写：`javascript:JS表达式;`，表示点击时不跳转了，不是链接而是执行其中js表达式）

     ```html
     <input type="button" value="hello" onclick="alert('hello js!');"/><!--外面用双引号，里面就用单引号，区分开-->
     ```

     > 上面`onclick`属性中的js代码，它的执行原理是什么？
     >
     > ​	当页面内容被浏览器解释加载的时候，js代码并不会执行，只是把这段JS代码注册到按钮的`click`事件上了，on可以理解为注册（将该事件绑定到dom元素上）。等这个按钮发生click事件之后，注册在click事件上的js代码会被按钮自动调用，这样就可以在网页上弹窗了。（注意：`alert()`函数会阻塞页面加载）

  2. 内部JS：通过HTML的<script>标签的方式。脚本块可以在html文件中任何位置，可以有多个，没有特殊设置的话是按照html中出现的位置，同步解释执行的（而外部css、img等链接资源是异步的）。通常我们都写在<body>标签前面位置。

     ```html
     <script type="text/javascript">//type可省略
     	alert('hi')
     </script>
     ```

  3. 外部JS：引入外部的独立js文件。在HTML的某个位置上通过两个<script>标签并指定`src`属性引入外部的js文件，路径可以是绝对或相对：

     ```html
     <script src="./1.js"></script><!--结束标签不能省-->
     ```

     > 这种方式的<script>标签中可以设置`defer`布尔属性（defer属性仅适用于外部脚本，只有存在 src 属性 时才应使用），表示指定脚本在解析页面的同时并行下载，并在页面解析完成后才执行。页面加载完毕后再执行里面的js代码。
     >
     > **注意：**可以通过多种方式执行外部脚本。
     >
     > - `<script>`标签引入外部JS，浏览器解释到此处时脚本被立即下载并执行，阻塞页面解析，直到脚本下载并执行完成。
     > - 如果标签设置 async 属性：脚本会在解析页面的同时并行下载，并在可用时立即执行（在解析完成之前）
     > - 如果标签设置 defer（而未设置 async）属性：脚本会在解析页面的同时并行下载，并在页面解析完成后执行

- ### 关于js的一点说明：

  > ​	JS中的代码块严格按照HTML文档流顺序执行，同步加载。其中某些js代码可能会阻挡页面加载渲染，如：`alert()`、`prompt()`、`confirm()`等函数；而css和img等链接的外部资源通常是异步加载。也可以在<script>标签中使用`async`属性来实现js代码块的异步加载，这样JS文件也可以并行加载而不阻止HTML的解析和渲染。

- ### JS的输入：

  > `prompt('请输入:')`，显示一个对话框，包含一条提示信息，用来提示用户输入，返回值是输入的字符串或点击取消的`null`

- ### JS的输出：

  1. 网页弹窗输出：
     - `alert('信息')`：弹出警告框。
     - `confirm('确定吗？')`：弹出确认框，返回值布尔类型。
  2. 开发者控制台输出：
     - `console.log(值)`：浏览器开发者控制台输出信息。该函数也可以接受多个参数，会依次打印每个参数的值，用空格分隔。
     - `console.dir(obj)`：这种方式用于控制台打印对象的信息。
     - `console.error(值)`：打印错误信息。
     - `console.warn(值)`：打印警告信息。
  3. HTML文档流中输出：`document.write('hello js')`，向html文档的body体中异步输出内容，可以识别html标签。参数可以是多个，会将内容拼接输出。（注意：由于是异步输出，所以它输出的内容可能会覆盖掉整个文档，因此谨慎使用）

- ### js常用事件：

  > `blur`：失去焦点
  >
  > `focus`：获得焦点
  >
  > `click`：鼠标单击
  >
  > `dblclick`：鼠标双击
  >
  > `keydown`：键盘按下
  >
  > `keyup`：键盘弹起
  >
  > `keypress`：键盘按下并弹起
  >
  > `mousedown`：鼠标按下
  >
  > `mouseup`：鼠标弹起
  >
  > `mouseover`：鼠标进入（mouseenter没有冒泡效果）
  >
  > `mouseout`：鼠标离开（mouseleave没有冒泡效果，这俩更常用）
  >
  > `mousemove`：鼠标移动
  >
  > `input`：用户输入
  >
  > `submit`：表单的提交按钮被点击
  >
  > `change`：下拉列表选中项改变，或文本框焦点失去内容改变时
  >
  > `select`：文本被选中
  >
  > `reset`：表单的重置按钮被点击
  >
  > `abort`：图像加载被中断
  >
  > `error`：加载文档或图像时发生错误，通常给window或img对象加
  >
  > `resize`：窗口或框架的大小被改变
  >
  > `scroll`：元素滚动条滚动时触发
  >
  > `unload`：退出页面
  >
  > `load`：图片、外部CSS、外部JS资源全部加载完毕时触发，也可以给`window`对象加，页面加载完毕触发。
  >
  > `scroll`：元素滚动时触发，动1px就触发，监听元素的滚动条（有滚动条的元素都可以加该事件）
  >
  > ​	滚动事件上的属性：`scrollTop`头部被卷去的像素值，`scrollLeft`左部被卷去的像素值，单位是px，可以被赋值和修改。
  >
  > ​	滚动事件上的方法：`scrollTo(x,y)`，将有滚动条的dom对象，滚动它到距离原点横向x像素，纵向y像素处。
  >
  > `DOMContentLoaded`：只需等待html所有标签加载完毕，无需等待css样式、img等外部资源（通常给document加）
  >
  > `copy`：文本被复制时
  >
  > （以上每一个事件都对应一个事件句柄onxxx，事件句柄以“标签的属性”存在）
  >
  > 移动端常用事件：
  >
  > `touch`：触屏事件。`touchstart`是刚触到就触发，`touchmove`是触摸且滑动，`touchend`是触摸离开后。

------

## JS的一些说明：

- ###### JS中的字符串可以使用双引号，也可以使用单引号，甚至飘号``也可以

- ###### JS中的一条语句结束之后可以使用分号";"也可以不用，用不用看团队规定（Vue的源码是没有分号的）

- ###### JS区分大小写

- ###### JS中的注释和其他类c语言相同，都是`//和/**/`

- ###### JS中虽然允许函数的嵌套定义，但是最好别用

------

## JavaScript基础语法：

1. ### 变量：

   > - 声明变量语法：`let i = 1;`，右边说了算，没有类型要求，弱类型。
   >
   > - 如果一个变量只声明没有赋值，默认值为`undefined`，如果没声明直接用，控制台报错。
   >
   > - 变量还可以用`var`或其他关键字声明，后面再说区别，目前都用`let`
   >
   > - 常量使用`const`声明，声明后值就不可改了，所以声明时必须初始化，常量名字一般用大写（规范）
   >
   >   （通常我们声明变量先用`const`，后面发现要改报错了，再用`let`。**var不要用！**）
   >
   > -  全局变量：在JS中的函数外部声明的变量是“全局变量”。这些变量在多个script块中共用，作用域是整个html文件。浏览器打开时空间就开辟，直到浏览器关掉该页面才销毁，生命周期较长耗费内存，尽量少用。
   >
   > - 局部变量：在JS的函数体内部声明的变量。局部变量在函数被调用时内存才开辟，函数执行结束一般空间就释放了。

2. ### 字符串：

   > - JS中用：单引号'、双引号"、飘号`括起来的都是字符串。
   >
   > - JS中字符串的拼接，除了用+/+=号，还有一种“模板字符串”的方式。语法：外面用``号，里面${变量/表达式}来完成字符串的拼接
   >
   > - 字符串类型常用的实例属性和方法：
   >   - 方法：`indexOf()`、`lastIndexOf()`、`replace(正则对象,'替换的文本')`、`replaceAll()`、`split()`、`substring()`、`startsWith()`、`includes()`、`join(':')字符串拼接，大量拼接用它效率高`
   >   - 属性：`length`

3. ### 数组：

   > - JS中数组中，多种类型可以在一个数组中。而且数组中的元素个数随意，自动扩容，长度不固定。JS数组属于object类型。
   > - JS中声明数组，语法：`let arr = [1, 3, '3.14', 3.15]`或者：`let arr = new Array(1, 3, '3.14', 3.15)`
   > - 给数组添加元素可以用下标，也可以用数组对象的`push()`函数，可以一次添加多个。返回值是数组此时的长度。
   > - `unshift()`是将元素添加到数组头部，也返回长度。
   > - `pop()`会使数组长度减一并返回数组最后一个元素，`shift()`是删除第一个元素。
   > - `splice(start,len)`可以一次删除数组中多个元素，第2个参数没有从start开始全删。

4. ### 函数：

   > - JS中定义函数语法：`function 函数名(形式参数列表){函数体}`
   >
   > - JS中的函数没有重载，名不能相同，否则函数会被覆盖掉（建议函数的定义在<head>中，而调用在<body>中）
   >
   > - 函数的**动态参数**：每个函数中都有一个`arguments`参数，它是一个伪数组，用于在参数不确定数量时，接收所有的实参（箭头函数中没有动态参数`arguments`）
   >
   >   > 伪数组：有`length`和下标，但是没有数组对象的`push/pop/map`等方法，要遍历只能用普通for循环
   >
   > - **立即执行函数**：为了避免全局变量的污染，定义即执行。（函数名也可以自己加，有名的立即执行函数）
   >
   >   - 方式1：`( function[函数名](形参){代码} )(实参);`
   >
   >   - 方式2：`( function[函数名](形参){代码}(实参) );`
   >
   >      （后面的括号表示调用这个函数。注意：立即执行函数的分号;必须加）
   >
   > - **匿名函数**：
   >
   >   - 方式1：`var sum = function(){}`，这是函数表达式的方式。调用：`sum();`
   >
   >   - 方式2：`obj.onclick = function(){}`，这种方式的匿名函数现在都用`addEventListener()`的写法，后面再说。
   >   - （了解）方式3：使用`Function()`构造器，来创建构造一个匿名函数。语法：`var sum = new Function("参数1", "参数2", .., "函数体");`
   >
   > - **回调函数**：将函数A的地址或函数名作为参数，传递给了函数B，那么对于B来说，A就是回调函数，因为B中要回头去调用A。简而言之就是，需要别的对象或函数去调用的函数，就是回调函数。
   >
   > - 常用的**全局函数**：
   >
   >   - 数值处理：
   >     - `parseInt(string, [n])`：将字符串转成`int`值。第2个参数可选，表示字符串数据是几进制的。（如果参数为'abc121px'，那么前面abc和后面的px会忽略掉）
   >     - `parseFloat(string)`：将字符串转成浮点数。
   >     - `isNaN(v)`：is not a Number，结果为true表示不是一个数字；建议用`Number.isNaN()`，它更符合我们的认知。
   >     - `isFinite(v)`：用于检测值v是否是有限值。
   >   - 字符串处理：
   >     - （慎用）`eval(string)`：执行字符串中的js代码，并将代码的执行结果返回。（注意：如果字符串中是对象的话，它会将最外层的“{}”大括号解析为代码块，所以为了正确解析对象需要外层再拼上“()”小括号）
   >     - `encodeURI/decodeURI('url')`：encodeURI用于对url进行URI编码，decodeURI是URI解码。
   >     - `getComputedStyle(domObj,null)`：获取domObj元素对应的样式对象，该对象中可以查看当前的css样式，不能改。

5. ### 数据类型：

   > - JS中数据类型分为：基本数据类型（值类型）和引用数据类型。基本类型存储的是值本身，引用类型存储的是对象的地址。
   > - ES6之前的类型有6种：`undefined`、`null`、`number`、`string`、`boolean`、`object`。ES6后加了：`symbol`（后面讲）
   > - 其中引用类型是：object对象类型以及它的子类，其他都是基本类型。
   > - `undefined`和`null`类型只有一个值，就是`undefined`和`null`；`null`是专门表示一个空引用，一个变量里面准备放对象，但还没放，可以给一个`null`
   > - `number`类型包括哪些值：`-1 0 1 4.32 1000...NaN +/-Infinity`，整数、小数、正数、负数、不是数字、正负无穷大都属于`number`类型。`NaN`（Not a Number）表示不是一个数字，但属于`Number`类型，当运算结果应该是一个数字，但最后结果非数字时，结果是`NaN`（NaN不等于任何值，包括它自己）

6. ### 运算符：

   > - `typeof`运算符：该运算符可以在程序的运行阶段动态的获取变量的数据类型，语法：`typeof 变量/值`，也可以：`typeof(变量/值)`。`typeof`运算符的结果是以下6个字符串之一：
   >
   >   - "undefined"
   >   - "number"
   >   - "string"
   >   - "boolean"
   >   - "object"
   >   - "function"
   >
   >   （注意：null虽然属于Null类型，但是typeof null结果是object，因为放null的地方一般准备一放个对象，所以是object）
   >
   > - 基本类型的比较：`==`是等同运算符只判断值，而`===`是全等运算符，判断值和类型，它才是真正的等于。
   >
   > - `void`运算符：用于给指定的js表达式进行求值，没有返回值，用法：`void 表达式;`或`void(表达式);`
   >
   > - `in`运算符用于检测对象中是否包含某个属性，返回布尔值；如：`if( 'age' in obj )`，（它会去原型链上找）
   >
   > - `new`运算符：该运算符用来调用构造函数，返回该构造函数在堆中创建的动态对象，叫做“实例化对象”，都是引用类型，变量保存的都是堆内存地址。

7. ### 类型转换：

   > - 自动类型转换：除了`+`号之外的其他算数运算符，做运算前都会先把数据转换成`Number`类型。`+`号在串`'100'`前作为正号解析时，也会将串转成数字型。
   > - 强制类型转换：
   >   - `Number('11')`，它会将串‘11’强转成`Number`型。
   >   - `Boolean(x)`函数可以将x强制转成布尔类型，规则：有true没有false。
   >   - `String(参数)`将参数强转成`String`型
   >   - `Object(参数)`将参数强转成对象`Object`对象。

8. ### JS的无用链接：

   > 如何做到点击超链接不跳转，做一个“死链接”，不是href中写#，这是跳转到页面顶部，不是死链接。href中这样写：
   >
   > - `javascript:void(0);`
   > - 也可以写：`javascript:;`

9. ### JS的作用域：

   > - 局部作用域：分为函数作用域和块作用域。其中块作用域指，在`{}`代码块中声明的变量，在块外部就可能无法被访问了，不同块之间无法被访问（如果是var声明的是没有块作用域的，块外部仍然可以被访问）。函数作用域是在函数内部的作用域
   > - 全局作用域：<script>标签块中声明的就是全局作用域，全局作用域其实就是给`window`对象添加属性，尽可能少用全局变量，防止全局变量被污染（函数中未使用任何关键字声明的变量就是`var`的全局变量，不推荐！）
   >

10. ### JS的垃圾回收机制：

    > JS同样由自动垃圾回收机制，它的原理是：
    >
    > - 全局变量一般不会被页面回收，直到页面被关闭。而堆中的局部变量一旦不用就会被GC立即释放掉。
    > - 两种浏览器中常用的垃圾回收算法：
    >   1. **引用计数法**（ie）：看某个对象是否还有指向它的引用，如果没有了就回收掉。算法的核心是跟踪计录被引用的次数，次数为0则回收。该算法存在一个“嵌套引用”的致命问题，两个对象之间相互引用，别人访问不到这两个对象，但这两个对象不会被回收。
    >   2. **标记清除法**：现代的浏览器已经不再使用引用计数法了，大多是用基于标记清除法的改进算法。它是从JS的全局根对象window出发，定期扫描内存中的对象，凡是通过根部无法到达的对象，都是要被回收的垃圾对象。

11. ### 闭包：

    > 一个函数，以及对周围状态的引用，绑定在一起，内层函数访问外层函数的变量，这就是闭包。简单来说就是，闭包=内层函数+外层函数的变量，如下：

    ```js
    //统计函数被调用的次数
    function count(){
        let i = 0
        return function(){
            ++i
            console.log(i)
        }
    }
    const fun = count()
    fun() //输出1
    fun() //输出2
    //虽然i是局部变量，但是由于采用标记清除法，局部变量一直在用，所以i不会被回收；所以闭包可能会有内存泄漏的风险
    ```

12. ### 环境对象this：

    > `this`是**函数内部**的特殊变量，它代表了当前函数运行时的不同环境，不同环境下`this`的指向不同（也可以改变this的指向）。那怎么看this指向谁呢？
    >
    > - 粗略判断：谁调用的该函数，函数中的`this`就是谁，指向调用函数的这个对象。
    > - 细致分析：普通的<script>中调用的函数，`this`就是全局作用域的`window`对象。回调函数指向事件的调用者。箭头函数中没有`this`，它继承了上个作用域的`this`

13. ### 改变this指向：

    > 有3个函数可以改变“普通函数”中的`this`指向：（箭头函数的`this`改不了，箭头函数没有`this`）
    >
    > - `fnc.call(thisObj, 函数参数..)`：它会调用fnc函数，且指定函数中的`this`指向第1个参数。
    > - `fnc.apply(thisObj, 数组)`：和`call()`函数类似，只不过函数参数放在了数组中。比如求数组最大值可以：`Math.max.apply(null, arr)`
    > - `fnc.bind(thisObj, 函数参数..)`：它不调用函数，只改变函数内`this`的指向。返回值是，由指定的this和初始化参数改造过的原函数的备份，是新函数。

14. ### JS中的异常：

    > - JS中也有异常机制，语法和Java类似，也是在代码中直接用`throw`关键字抛出一个异常实例对象。此时如果不处理程序会中断执行。如：`throw new Error('错误信息')`，抛出`Error`错误对象。
    > - JS中的`Error`对象是基本的错误对象，里面封装了错误信息。其他的像`TypeError`、`URIError`等错误对象都继承于它。
    > - 处理异常：和Java类似，同样是用`try{可能发生异常的代码}catch(e){e.message/e.name}finally{}`
    > - 注意：异步try语句块中的异步任务发生异常，catch块是捕获不到的。所以，开发者应**避免使用Try Catch块捕获由异步任务引发的错误**。
    > - 关于`debugger`关键字：该关键字以JS语句的形式直接出现在JS代码中。当程序执行到这个关键字时，如果浏览器的**开发者工具是打开的**，代码执行将会暂停，这就为开发者提供了检查当前程序执行环境（包括变量值、调用栈、作用域等）的机会。
    > - **严格模式**：严格模式通过在脚本或函数的头部添加字面量`"use strict"`来声明，以下作用域中的代码按照严格模式。此时普通函数没有明确的调用者，`this`指向`undefined`

------

## JS对象

> - 对象是JS中的一种引用类型，是一种复合的数据类型，对象中保存了多个不同类型的数据，而数组是有序的数据集合。
> - 对象分为静态对象和动态对象，`new`创建的都是动态对象，我们这里先说静态对象。静态对象的语法：`let 对象名 = {}`
> - JS对象由属性和方法组成，如：`let 对象名 = { 属性名: 值, 方法名: 匿名函数,... }`
> - JS对象中的属性名/方法名也可以加单引号'或双引号"（不能是`飘号），但一般不加，除非遇到名字里含有特殊符号如：-、空格等。
> - 如果想拿外部变量`name`的值来作为对象的属性名，可以用中括号括起来`[name]: 值`，因为如果没有中括号[]，那么属性名在冒号:左边，所以是左值只认为name是个字符串属性名而已，不会取name变量的值。所以想取name变量的值当作属性名需要中括号括起来`[name]`
> - 对象声明过后就可以直接用，想看哪个属性就`对象名.属性名`即可。改属性值用`对象名.属性名=值`，给对象新增属性也是这个，有了就是查，没有就是增。删掉某个属性用`delete 对象名.属性名`，但新规范不建议这样直接删除，所以了解即可。还可以这样访问属性：`对象名["属性名"]`，单引号双引号都行，当属性名有特殊字符时只能用这种方式。
> - 方法在对象中这样写：`方法名: function(形参){方法体}`，调用：`对象名.方法名(实参)`，本质上方法也是函数。给对象新增方法：`对象名.新方法名 = function(形参){方法体}`

- ##### 遍历对象：

  > 对象没有像数组那样的`length`属性，所以普通for无法遍历对象，而且对象中属性是无序的，所以目前我们遍历对象只能用`forin`遍历对象。用法：
  >
  > ```js
  > let obj = {
  > 	name: "张三",
  > 	age: 18,
  > 	sex: "男"
  > }
  > for(let key in obj){
  > 	alert(key);//string型的'name','age','sex'
  > 	//也就是说forin遍历一个对象时，遍历的是对象中的属性名字符串
  > 	alert(obj[key]);
  > }
  > ```

  > `forin`还可以遍历数组，但是一般不这样用：
  >
  > ```js
  > let a = [2, 3.14, false, "abc"];
  > for(let i in a){//i是字符串型，数组a['1']访问也不会报错，但是不建议这样访问数组，所以实际forin我们不会用它遍历数组
  > 	alert(a[i]);//和遍历对象不同，这里的i是下标不是属性名
  > }
  > ```

- ##### JS的内置对象：

  > 内置对象就是浏览器中提前声明好的对象，直接就可以用。如：`document`、`console`、`window`..等

  - Math：Math对象是JS为我们提供数学相关的对象，里面有一系列数学运算相关的属性和方法，常用的如下：

    `ceil()、floor()、round()、max(参数1,2,...)、min(参数1,2,...)、pow()、abs()、trunc()抹掉小数位、sign()判断符号`

    > - 还可以通过`Math.random()`来生成`[0,1)`间的随机数。
    >
    > - 如何生成`[0-n]`之间的随机整数：`Math.floor( Math.random()*(n+1) )`
    >
    > - 生成`[min-max]`之间的随机数：`Math.floor(Math.random() * (max - min + 1)) + min`，另一种是：`parseInt(Math.random() * (max - min + 1) + min);`

  - Date：可以用来获取时间/日期。语法：`new Date()`，可以得到当前的时间戳字符串，或传字符串得到指定时间戳：`new Date('2008-02-15[ 10:30:30]')`

    > - 日期对象常用方法：
    >   - `toLocaleString()`，以本地格式输出日期字符串
    >   - `getFullYear()`：获取4位年份
    >   - `getMonth()`：获取月份，取值0-11
    >   - `getDate()`：获取月份中的天数
    >   - `getDay()`：获取星期中天数，取值0-6
    >   - `getHour()`：获取小时，取值0-23
    >   - `getMinutes()`：获取分钟，取值0-59
    >   - `getSeconds()`：获取秒，取值0-59
    >
    > - 获取时间戳：
    >   - `t.getTime()`
    >   - `new Date()`
    >   - `Date.now()`：这是内置构造器Date中的静态方法now，它只能获取当前的时间戳。

  - Array：数组对象中的常用实例方法。

    > -  `arr.forEach(function(item, index){})`：遍历数组，没有返回值且无法修改数组。
    >
    > - `arr.map(function(item,index){ return ele+'像素'})`：遍历数组，返回新数组。不同于`forEach()`的是它可以在原数组的基础上做数组值的拼接。
    > - `arr.filter(function(item,index){ return item>=20 })`：过滤数组，返回新数组，新数组内容是原数组中符合条件的
    > - `arr.reduce(function(上一次值,当前值){ return 处理一次的结果 }, 起始值)`：数组值的累计处理。返回累计处理的结果，常用于数组求和。它的执行过程为：如果没有“起始值”，则“上一次值”是数组第一个元素的值；每一次循环，将返回值作为下一次循环的“上一次值”；当前值是数组内的每个元素；回调函数的执行次数是依据数组长度的。
    > - `arr.find(function(item,index){ return item.color==='blue' })`：返回数组中满足条件的第一个元素
    > - `arr.every(function(item,index){ return item>=10 })`：如果数组所有元素都符合条件，返回true
    > - `arr.some(function(item,index){ return item>=10 })`：数组只要有一个元素符合条件，就返回true

  - Number：实例方法`num.toFixed(3)`会将数字型对象num保留3位小数，返回一个字符串


------

# JS高级

------

## JSON

- #### 什么是JSON：

  > - JSON全称JavaScript Object Notation（JavaScript对象标记），它是一种标准的轻量级的“数据交换格式”，主要用于做数据的交换，目前非常流行，90%以上的系统数据，交换数据用的就是JSON。JSON的特点：体积小、易解析。
  > - 在实际的开发中，有两种数据交换格式用的最多：
  >   1. JSON
  >   2. （了解）XML：体积较大，解析麻烦。XML的优点是：语法严谨。通常银行的数据交换会用XML。HTML和XML有一个父亲：SGML（标准通用的标记语言）。HTML主要做页面展示，所以语法松散，很随意。XML主要做数据存储和数据描述的，所以语法相当严格。XML文件可以用浏览器打开，验证是否有语法错误（如果显示的是xml的代码，就没问题）。XML也常用来做配置文件。
  > - 本质上来说JSON是一种文本规范，字符串的规范。它和JS的对象格式很像，`{key:value,..}`的格式。不同的是，JSON的key必须是字符串型且必须加**双引号**（单引号不行），value可以是JS中的：null、Number、Boolean、String，且这几种不允许嵌套，还可以是：JSON对象、JS数组，数组中的类型可以是任何JSON的value支持的类型。
  > - 由于JSON对象和JS数组这两种类型存在，JSON可以表示复杂的树形结构，并且**JSON数据必须以{}作为最外层**。另外JSON中的换行和空格不会有任何影响，仅仅是方便阅读。
  > - JSON不支持注释，JSON数据中不允许出现多余的逗号。JSON本质上是可处理的文本，如果要在JS中将JSON串真正当作对象去处理，就需要`JSON.parse(str)`将JSON串传进去，解析成JS对象返回才行。
  > - 由于JSON的灵活性大、数据量小、简单易读的特点，所以有些数据库的数据也是JSON格式（MongoDB）。
  > - 由于JSON来源于JS，所以JS对JSON对象有原生的支持。其他的如Java或c中，就只能将它作为规范化的字符串去处理。

- #### JS中将JSON对象转成字符串：

  > 用内置对象`JSON`的字符串化方法`JSON.stringify(obj)`，可以将对象转换成字符串并返回

- #### 字符串转JS对象：

  > `JSON.parse(jsonStr)`，返回值是JS对象

- #### 示例代码：

  ```js
  //JS原生支持JSON，创建JSON对象，特点是无类型。{"key":value,"key":value,"key":value,...}
  var studentObj = {
      "sno" : 111,
      "sname" : "张三",
      "sex" : "男"
  };
  //访问JSON对象的属性
  alert(studentObj.sno +","+ studentObj.sname +","+ studentObj.sex);
  //JSON数组
  var students = [
      {"sno" : 111,"sname" : "张三","sex" : "男"},
      {"sno" : 11,"sname" : "张","sex" : "男"},
      {"sno" : 1,"sname" : "三","sex" : "男"}
  ];
  //JSON的嵌套
  var user = {
      "sno" : 111,
      "sname" : "张三",
      "sex" : true,
      "address" : {"city" : "北京", "street" : "大兴区", "zipcode" : 123134},
      "hobby" : ["smoke", "drink", "tt"]
  };
  //访问人名以及居住地
  alert(user["sno"] + user.address.city);
  ```

------

## JS的正则表达式

- JS中创建正则表达式对象：

  > 方式1：`var reg = /正则表达式/flags;`
  >
  > 方式2：`var reg = new RegExp("正则表达式", "flags");`，通过内置的RegExp构造器。
  >
  > （其中flags参数可以是：`g`表示全局匹配，`i`表示忽略大小写匹配）

- 正则表达式对象的常用方法：

  > - `test(str)`：对字符串进行全局匹配，返回布尔值。例如：`Boolean b = reg.test("要匹配的字符串"");`
  > - `exec()`：只进行部分匹配，如果匹配成功，返回伪数组，其中包含匹配的结果信息。没有找到返回null。其中伪书组的第一个元素，是匹配的文本，数组对象中的其他属性是关于这次匹配的其他信息

- 正则验证邮箱的例子：

  ```html
  <script>// 写的正则可以在这里测试：https://tool.oschina.net/regex
      window.onload = function(){
          document.getElementById("btn1").onclick = function(){
              let email = document.getElementById("text1").value;
              let emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
              let right = emailRegExp.test(email);
              //exec(string)方法用于匹配string匹配上的子串，返回一个数组
  
              let div1 = document.getElementById("div1");
              if(right){
                  div1.style = "color: green; font-size: 20px;";
                  div1.innerText = "✔邮箱格式正确";
              }else{
                  div1.style.color = "red";
                  div1.style.fontSize = "20px";
                  div1.innerText = "✘邮箱格式非法";
              }
          }
          document.getElementById("text1").onchange = function(){
              document.getElementById("div1").innerText = "";
          }
      }
  </script>
  <input type="text" id="text1"/>
  <div id="div1"></div>
  <input type="button" id="btn1" value="验证邮箱"/>
  ```

------

## JS的对象深入

- #### 创建对象的其他方式：

  > 1. `let 对象名 = {}`
  > 2. `let 对象名 = new Object({})`
  > 3. 通过**构造函数**来创建对象（推荐）

- #### 构造函数：

  > - 构造函数是一种特殊的函数，是一类对象的模板，主要用来初始化对象的。使用构造函数可以快速创建多个，类似的，值不同的对象。同一个构造函数创建的对象，我们称为一类对象，所以构造函数有时也称为类。
  >
  > - 构造函数的调用要用`new`关键字，使用`new`关键字调用构造函数的行为称为**动态对象的实例化**。构造函数不传参时括号可省
  >
  > - 构造函数中不要出现`return`，没用，因为构造函数的返回值就是我们实例化的对象的地址
  >
  > - 构造函数名像Java类名一样，开头一般大写。
  >
  > - 使用构造函数：
  >
  >   ```js
  >   function Pig(name, age){
  >       //构造函数中的this指向调用者，调用者就是p1对象，所以p1.name='佩奇'就是给p1对象中新增了name属性
  >       this.name = name,
  >   	//这里存在内存浪费，因为该函数会在每个对象中都定义一遍，后面用原型解决
  >       this.say = function(){ console.log('hi') }
  >   }
  >   //创建一个Pig对象
  >   const p1 = new Pig('佩奇', 6)
  >   //属于Pig构造器的属性和方法，是静态成员，通过类名调用
  >   Pig.eyes = 'pink'
  >   Pig.walk = function(){
  >       console.log('我们走我们走..')
  >   }
  >   //在JS中，建议将每个对象都不同的实例属性和实例方法写在构造函数中，而属于构造函数自己的“静态属性和静态方法”需要单独在外部给构造函数单独定义
  >   ```

- #### 实例成员：

  > 通过构造函数创建的对象称为实例对象，实例对象的属性和方法称为实例成员（实例属性和实例方法）

- #### 静态成员：

  > 构造函数的独有属性和方法称为静态成员，只有一份。静态成员只能通过`构造函数名.`来访问（静态成员的`this`指向构造函数）

- #### 包装类型：

  > - 之前说过，''括起来的都是字符串，属于基本类型`String`。但为什么可以`'abc'.indexOf()`的方式调用`String`对象的方法呢？就是因为包装类型的存在。
  >
  > - 实际上使用基本类型字面量直接调用方法和属性时，JS底层会做一个“自动装箱”，将小string包装成大String，然后再调用。由于自动装箱和自动拆箱，所以string和String用起来一模一样的感觉，但实际上它们是两个截然不同的数据类型，一个`typeof`是`string`，另一个是`object`
  > - JS中所有基本类型的包装类型，都可以通过该类型的构造函数去`new`创建

- #### 关于Object()构造函数：

  > 以前遍历对象只能用`forin`，现在我们可以使用`Object`构造函数里面的静态方法：
  >
  > - `Object.keys(obj)`：返回obj的所有属性，字符串数组
  >
  > - `Object.values(obj)`：返回obj的所有属性值，数组
  >
  > - `Object.assign(o1,o2)`：对象合并，将o2的内容合并到o1，属性重名o2会覆盖o1
  >
  > - `Object.is(o1,o2)`：判断两个对象是否完全相等，和`===`有点像，不同的是`Object(NaN,NaN)`是`true`
  >
  > - `Object.setPrototypeOf(o1,o2)`：单独设置某个对象原型对象，将o1的原型设置为o2。一般不用。
  >
  > - `Object.getPrototype(obj)`：获取obj对象的原型，推荐使用该方式获取对象的原型。
  >
  > - `Object.defineProperty(obj,'属性名',{配置})`：方法可以给对象定义属性（加/改），返回此对象。配置对象这样写：
  >
  >   ```js
  >   {
  >       value: 属性值,
  >       enumerable: true,//是否可以被遍历，默认false不行
  >       writable: true,//是否可以被修改，默认false不行
  >       configuration: true//该属性是否可以被配置和删除，默认false不行
  >       //也可以设置get(){}或set(){}方法，此时调用该属性实际上是执行的方法
  >   }
  >   ```

- #### JS的面向对象：

  > Java中有类，可以通过类和对象来实现面向对象，JS中如何面向对象呢？首先JS中构造函数可以实现面向对象的封装性，实例化的对象之间互相不受影响。而多态特性JS中弱类型所以不需要多态。JS中对象之间怎么完成继承呢？我们先看几个概念：

  - **原型**：JS的“所有函数”中都有`prototype`属性，该属性是一个对象类型，我们通常称该属性对象为**原型对象**或**原型**。如果该函数是普通函数，那么该属性没有任何用，只有该函数当作构造函数来`new`时，该构造函数创建的所有对象中都会有一个隐含的**只读**属性`__proto__`（对象原型）指向该构造器的“原型对象”。如果需要该类所有对象都共享的成员，我们都应该挂载到该原型对象上，这样所有new出来的对象，大家都可以通过`__proto__`找到原型并使用原型上的公共成员。避免内存浪费。（原型对象的this和构造函数的this都指向该实例对象）
  - **constrator属性**：每个原型对象`prototype`都应该唯一属于某个构造器，所以每个原型对象上都有`constrator`属性，该属性指向原型对象的构造函数。这样原型对象和构造器就一一对应起来了。
  - **原型链**：我们说所有对象都有隐含属性`__proto__`指向“构造该对象的构造函数”的原型，那么该原型对象的`__proto__`指向谁呢？原型的`__proto__`指向`Object`构造器的原型，而`Object`的原型对象的`__proto__`是`null`。这些对象原型之间的指向关系就是“原型链”。简单来说：原型链就是一个查找规则，当我们要使用对象中的属性和方法时，先去当前对象中找，找不到再去原型链上的所有原型对象中依次找，直到`Object`的原型中也没有，那么就报错。（可以使用instanceof运算符检测，对象是否出现在一个构造函数的原型链上，如：`obj instanceof Person`）

- #### 原型继承：

  > ES6之前，JS中大多数都是通过原型来实现继承的，看代码：

  ```js
  function Person(eyes, head){
      this.eyes = eyes
      this.head = head
  }
  function Woman(eyes, head, hands){
      Person.call(this, eyes, head)
      this.hands = hands
  }
  //子的原型指向父对象的实例（子构造器原来的原型对象会被GC回收掉）
  Woman.prototype = new Person(2,1)
  //子的原型的构造器指回子构造器
  Woman.prototype.constrator = Woman
  ```

  > 原型继承的原理：创建一个父对象并添加`constructor`属性指向子对象的构造器，然后将子构造器的`prototype`指向该父对象

- #### 关于Object原型中的方法：

  > - `toString()`：我们之前的`console.log()`输出对象类型时自动就调用了对象的`toString()`方法，所以输出了【object Object】，我们也可以在自己的原型对象中添加该方法，覆盖了原来的`toString()`，自定义输出的内容
  > - `hasOwnProperty('属性名')`：由于in运算符只会从对象自身以及原型对象中找，都找不到才返回`false`，而对象的`hasOwnProperty('属性名')`方法只在当前对象中找是否有该属性，不去原型链上找了。

- #### 实现对象拷贝：

  - 浅拷贝：`Object.assign(o,obj)`或`const o = {...obj}`展开运算符，都可以实现对象浅拷贝

  - 深拷贝

    - 手写递归函数完成深拷贝：

      ```js
      //对象深拷贝的函数
      function deepCopy(newObj, oldObj){
          for(let key in oldObj){
              if(oldObj[key] instanceof Array){//数组在前
                  newObj[key] = []
                  deepCopy(newObj[key], oldObj[key])
              }else if(oldObj[key] instanceof Object){//对象在后
                  newObj[key] = {}
                  deepCopy(newObj[key], oldObj[key])
              }else{//普通类型
                  newObj[key] = oldObj[key]
              }
          }
      }
      ```

    - （推荐）用JS库lodash里的`_.cloneDeep(obj)`函数：（lodash是一个一致性、模块化、高性能的JS实用工具库，我们直接引入它的JS文件，内部函数都以`_.`开头）

      ```javascript
      const obj = {
          name: '阿刁',
          age: 18,
          hobby: ['跳绳','打联盟'],
          family: {
              baby: '艾克'
          }
      }
      const newObj = _.cloneDeep(obj)
      console.log(newObj===obj)
      newObj.age = 19
      console.log(obj)
      console.log(newObj)
      ```

    - （推荐）一个更聪明的方法，通过`JSON.stringify(obj)`：先将对象转成JSON串，然后用`JSON.parse(jsonStr)`将JSON串再解析成JS对象。


------

## 防抖和节流

> 防抖和节流是两个性能优化的手段，我们看下如何做到。

- #### 防抖（debounce）：

  > 防抖是指：单位时间内频繁触发事件，只处理最后一次。如：鼠标在box上移动，停止500ms之后，才执行鼠标移动相关的操作，有助于性能优化和用户体验。防抖的实现方式：

  - 方式1：手写防抖代码，用`setTimeout()`来实现，核心思路：`声明一个定时器变量timer，当每次鼠标滑过都判断是否有定时器了，如果有就先清除以前的定时器，然后重新添加定时器`。如：

    ```js
    //手写防抖函数
    function debounce(fun, t){
        let timer
        //事件监听器真正调用的是这个函数
        return function(){
            //每次事件发生都判断下有没有开启定时器，有就删掉定时器
            if(timer) clearTimeout(timer)
            //再加定时器
            timer = setTimeout(fun,t)
        }
    }
    //-------------------------------------------
    const div = document.querySelector('.box')
    let i = 0
    function change(){
        div.innerText = i++
    }
    div.addEventListener('mousemove', debounce(change, 500))
    //注意这里的debounc函数要加括号传参；正常不能这样写，因为加括号表示调用函数，JS代码解释到这里就执行，而不是等事件发生。但由于该函数的返回值是函数地址，所以可以直接放在此处。
    ```

  - 方式2：用`lodash`提供的防抖函数`_.debounce(fun,[waitTime])`，原理和上面类似的，同样是传一个带括号的函数调用。

- #### 节流（throttle）：

  > 节流是指：单位时间内，频繁触发事件，只执行一次，单位时间内后面的事件发生了也不执行。和防抖不同的是，节流处理的不是单位时间里的最后一个事件。节流的使用场景：鼠标移动`mousemove`、页面尺寸变化`resize`、滚动条滚动`scroll`等高频事件。节流实现方式：

  - 方式1：手写节流代码，也是用`setTimeout()`来实现，核心思路：`声明一个定时器变量timer，当每次鼠标滑过都判断是否有定时器了，如果没有就添加定时器，如果有了就什么也不做`。如：

    ```js
    //手写节流函数
    function throttle(fun, t){
        let timer = null
        return function(){
            //每次事件发生都判断下有没有定时器
            if(!timer){     //没有就开一个
                timer = setTimeout(function(){
                    fun()
                    //清空定时器，为了下一次可以开启新的定时器
                    timer = null
                }, t)
            }
        }
    }
    //----------------------------------------------
    const mark = document.querySelector('mark')
    const img = document.querySelector('img')
    let k = 0
    function fly(){
        mark.innerText = k++
    }
    // 用节流函数来节流
    img.addEventListener('mousemove', throttle(fly, 2000))
    ```

  - 方式2：用`lodash`提供的节流函数`_.throttle(fun,[waitTime])`

------
