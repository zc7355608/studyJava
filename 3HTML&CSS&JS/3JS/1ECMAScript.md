# JavaScript（基于 ECMAScript 5.1 版本）

------

- ### 什么是JavaScript：

  > JavaScript 是一种轻量级的脚本语言。所谓“脚本语言”（script language），指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。JavaScript 也是一种嵌入式（embedded）语言。它本身提供的核心语法不算很多，只能用来做一些数学和逻辑运算。
  >
  > JavaScript 本身不提供任何与 I/O（输入/输出）相关的 API，都要靠宿主环境（host）提供，所以 JavaScript 只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层 API。目前，已经嵌入 JavaScript 的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是 Node 环境的项目。
  >
  > 从语法角度看，JavaScript 语言是一种“对象模型”语言。各种宿主环境通过这个模型，描述自己的功能和操作接口，从而通过 JavaScript 控制这些功能。但是，JavaScript 并不是纯粹的“面向对象语言”，还支持其他编程范式（比如函数式编程）。这导致几乎任何一个问题，JavaScript 都有多种解决方法。
  >
  > JavaScript 的核心语法部分相当精简，只包括两个部分：基本的语法构造（比如操作符、控制结构、语句）和标准库（就是一系列具有各种功能的对象比如`Array`、`Date`、`Math`等）。除此之外，各种宿主环境提供额外的 API（即只能在该环境使用的接口，如浏览器的document、XMLHttpRequest，Node环境的global），以便 JavaScript 调用。以浏览器为例，它提供的额外 API 可以分成三大类。
  >
  > - 浏览器控制类（BOM）：操作浏览器。BOM的顶级对象是`window`，DOM的顶级对象是`document`，BOM包括DOM。其实是`window.document.querySelector()`，JS在浏览器环境中时，所有全局的属性和函数都是window对象上的属性和方法，并且使用时`window.`可以省略。
  > - DOM 类：操作网页的各种元素。
  > - Web 类：实现互联网的各种功能
  >
  > 如果宿主环境是服务器，则会提供各种操作系统的 API，比如文件操作 API、网络通信 API等等。这些你都可以在 Node 环境中找到（参考NodeJS教程）。
  >
  > 这里主要介绍 JavaScript 核心语法和浏览器网页开发的基本知识，不涉及 Node。主要分成以下四大部分：
  >
  > - 基本语法
  > - JS标准库
  > - 浏览器 API（BOM浏览器控制类API）
  > - DOM

- ### HTML文件中嵌入JavaScript代码：（3种方式）

  1. **行内JS：**通过HTML元素属性的方式。JS是一门**事件驱动型语言**，依靠事件去驱动执行代码。在JS中有很多事件，每个事件都对应一个“事件句炳”，事件句柄是以标签的属性存在的。其中一个事件：鼠标单击事件`click`，它对应的事件句柄是`onclick`。事件和事件句柄的区别是：事件句柄是在“事件”前面加上on。（超链接的href可以在其中写：`javascript:JS表达式;`，表示点击时不跳转了，不是链接而是执行其中js表达式）

     ```html
     <input type="button" value="hello" onclick="alert('hello js!');"/><!--外面用双引号，里面就用单引号，区分开-->
     ```

     ###### 上面`onclick`属性中的JS代码，它的执行原理是什么？
     
     > 当页面内容被浏览器解释加载的时候，js代码并不会执行，只是把这段JS代码注册到按钮的`click`事件上了，on可以理解为注册（将该事件绑定到dom元素上）。等这个按钮发生click事件之后，注册在click事件上的**JS表达式**会被浏览器自动调用，这样就可以在网页上弹窗了。（注意：`alert()`函数的调用会阻塞页面加载）

  2. **内部JS：**通过HTML的`<script>`标签的方式。脚本块可以在html文件中任何位置，可以有多个，没有特殊设置的话是按照html中出现的位置，**同步执行**的（而外部css、img等链接资源是异步的）。通常我们都写在`<body>`标签前面位置。

     ```html
     <script type="text/javascript">  // type可省略
     	alert('hi')
     </script>
     ```

  3. **外部JS：**引入外部独立js文件（发get请求，同步的）。在HTML文件中通过两个`<script>`标签并指定`src`属性引入外部的js文件：

     ```html
     <script src="./1.js"></script><!--该标签位置随意，但结束标签不能省-->
     ```

     > **注意：**可以通过多种方式执行外部脚本。
     >
     > - `<script>`标签引入外部JS，浏览器解释到此处时脚本被立即下载并执行，阻塞页面解析，直到脚本下载并执行完成。（同步）
     >- 如果标签设置 async 属性：脚本会在解析页面的同时并行下载，并在可用时立即执行。（异步）
     > - 如果标签设置 defer（而未设置 async）属性：脚本会在解析页面的同时并行下载，并在页面解析完成后执行其中的JS代码。（异步）
  
- ### 关于js的一点说明：

  > JS中的代码块严格按照HTML文档流顺序执行（也可以设置异步加载，但通常是同步加载）。其中某些js代码可能会阻挡页面加载渲染，如：`alert()`、`prompt()`、`confirm()`等函数；而css和img等链接的外部资源通常是异步加载。

- ### JS的输入：

  > `prompt('请输入:')`，显示一个对话框，包含一条提示信息，用来提示用户输入，返回值是输入的字符串或点击取消的`null`。

- ### JS的输出：

  1. 网页弹窗输出：
     - `alert('信息')`：弹出警告框。
     - `confirm('确定吗？')`：弹出确认框，返回值布尔类型。
  2. 开发者控制台输出：
     - `console.log(值)`：浏览器开发者控制台输出信息。该函数也可以接受多个参数，会依次打印每个参数的值，用空格分隔。
     - `console.dir(obj)`：这种方式用于控制台打印对象的详细信息。
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

- ###### JS中的字符串可以使用双引号`""`，也可以使用单引号`''`，甚至飘号``也可以。

- ###### JavaScript的语法和Java语言类似，每个语句以`;`结束，语句块用`{...}`。但是，JavaScript并不强制要求在每个语句的结尾加`;`，浏览器中负责执行JS代码的引擎会自动在每个语句的结尾补上`;`。

- ###### JS区分大小写。

- ###### JS中两个整数做除法运算时，不能整除时结果会带小数点。

- ###### JS中，`&&`两边是表达式时，左边表达式判为`false`，则整个表达式的结果为左边表达式；若左边表达式判为为`true`，则整个表达式的结果为右边表达式。（`||`左边判为false，则返回右边的表达式，正好与其相反）

- ###### JS中的注释和其他类c语言相同，都是`//`和`/**/`。

- ###### JS中虽然允许函数的嵌套定义，但是最好别用。

------

## JavaScript基础语法：

1. ### 变量：

   > - 声明变量语法：`let 变量名 = 值;`，右边说了算，没有类型要求，弱类型。
   >
   > - 如果一个变量只声明没有赋值，默认值为`undefined`，如果没声明直接用，控制台报错。
   >
   > - 变量还可以用`var`或其他关键字声明，后面再说区别，目前都用`let`。
   >
   > - 常量使用`const`声明，声明后值就不可改了，所以声明时必须初始化，常量名字一般用大写（规范）。
   >
   >   （通常我们声明变量先用`const`，后面发现要改报错了，再用`let`。**var不要用！**）
   >
   > - 全局变量和局部变量：
   >
   >   > - 全局变量：在JS中的函数外部（全局作用域）声明的变量是**全局变量**。这些变量在多个script块中共用，作用域是整个html文件。浏览器打开时空间就开辟，直到浏览器关掉该页面才销毁，生命周期较长耗费内存，尽量少用。
   >   >
   >   > - 局部变量：在JS的函数体内部声明的变量。局部变量在函数被调用时内存才开辟，函数执行结束一般空间就释放了。

2. ### 字符串：

   > - JS中用：单引号'、双引号"、飘号`括起来的都是字符串。JS中的字符串类似于字符数组（不可变）。
   >
   > - JS中字符串的拼接，除了用+/+=号，还有一种**模板字符串**的方式。语法：外面用``号，里面${变量/表达式}来完成字符串的拼接。
   >
   > - 字符串默认只能写在一行内，分成多行将会报错。如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。
   >
   >   ```js
   >   var longString = 'Long \
   >   long \
   >   long \
   >   string';
   >   ```
   >
   >   > 上面代码表示，加了反斜杠以后，原来写在一行的字符串，可以分成多行书写。但是，输出的时候还是单行，效果与写在同一行完全一样。注意，反斜杠的后面必须是换行符，而不能有其他字符（比如空格），否则会报错。要想输出多行字符串，可以用拼接'\n'字符的方式。
   >
   > - `\`是转移字符。如果在非特殊字符前面使用反斜杠转义，则该转义字符会被省略。
   >
   > - JavaScript 使用 Unicode 字符集。不仅以 Unicode 储存字符，还允许直接在程序中使用 Unicode 码点表示字符，即将字符写成`\uxxxx`的形式，其中`xxxx`代表该字符的 Unicode 码点。比如，`\u00A9`代表版权符号。
   >
   >   - 解析代码的时候，JavaScript 会自动识别一个字符是字面形式表示，还是 Unicode 形式表示。输出给用户的时候，所有字符都会转成字面形式。
   >
   >     ```js
   >     var f\u006F\u006F = 'abc';
   >     foo  // "abc"
   >     ```
   >
   >     > 上面代码中，第一行的变量名`foo`是 Unicode 形式表示，第二行是字面形式表示。JavaScript 会自动识别。
   >
   >   - 我们还需要知道，每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节。
   >
   >     > 但是，UTF-16 有两种长度：对于码点在`U+0000`到`U+FFFF`之间的字符，长度为16位（即2个字节）；对于码点在`U+10000`到`U+10FFFF`之间的字符，长度为32位（即4个字节），而且前两个字节在`0xD800`到`0xDBFF`之间，后两个字节在`0xDC00`到`0xDFFF`之间。举例来说，码点`U+1D306`对应的字符为`𝌆，`它写成 UTF-16 就是`0xD834 0xDF06`。
   >     >
   >     > JavaScript 对 UTF-16 的支持是不完整的，由于历史原因，只支持两字节的字符，不支持四字节的字符。这是因为 JavaScript 第一版发布的时候，Unicode 的码点只编到`U+FFFF`，因此两字节足够表示了。后来，Unicode 纳入的字符越来越多，出现了四字节的编码。但是，JavaScript 的标准此时已经定型了，统一将字符长度限制在两字节，导致无法识别四字节的字符。上一节的那个四字节字符`𝌆`，浏览器会正确识别这是一个字符，但是 JavaScript 无法识别，会认为这是两个字符：`'𝌆'.length // 2`，这里 JavaScript 认为`𝌆`的长度为2，而不是1。
   >     >
   >     > 总结一下，对于码点在`U+10000`到`U+10FFFF`之间的字符，JavaScript 总是认为它们是两个字符（`length`属性为2）。所以处理的时候，必须把这一点考虑在内，也就是说，JavaScript 返回的字符串长度可能是不正确的。
   >
   > - 字符串类型常用的实例属性和方法：
   >   - 方法：`indexOf()`、`replace(正则对象,'替换的文本')`、`replaceAll()`、`split()`、`substring()`、`startsWith()`、`includes()`、`join(':')字符串拼接，大量拼接用它效率高`
   >   - 属性：`length`。（不可变）

3. ### 数组：

   > - JS的数组类型、长度都随意，可以保存多种类型数据、自动扩容长度不固定，属于object对象类型的子类型。
   > - JS中声明数组，语法：`let arr = [1, 3, '3.14', 3.15]`或者：`let arr = new Array(1, 3, '3.14', 3.15)`
   > - 给数组末尾添加元素可以用下标，也可以用数组对象的`push()`函数，可以一次添加多个，返回值是数组的长度。`pop()`删除并返回数组末尾元素。
   > - `unshift()`是将元素添加到数组头部并返回长度。`shift()`是删除数组头部元素。
   > - `splice(start,len)`可以一次删除数组中多个元素，第2个参数没有从start开始全删。

4. ### 函数：

   > - JS中定义函数语法：`function 函数名(形式参数列表){函数体}`
   >
   > - JS中的函数没有重载，名不能相同，否则函数会被覆盖掉。
   >
   > - （了解）函数的**动态参数**：**每个函数中都有**一个`arguments`变量（除了箭头函数），它是一个**伪数组**，用于在数组参数不确定数量时，接收所有的实参。（后面ES6会用函数的**剩余参数**来代替它）
   >
   >   > 伪数组（对象）：有`length`和下标，但是没有数组对象的`push/pop/map`等方法，要遍历只能用for{}
   >
   > - **立即执行函数/立即执行表达式**：为了避免全局变量的污染，定义即执行。（函数名也可以自己加，有名的立即执行函数）
   >
   >   - 方式1：`( function[函数名](形参){代码} )(实参)`
   >   - 方式2：`( function[函数名](形参){代码}(实参) )`
   >
   >   > 后面的括号表示调用这个函数。
   >
   > - **匿名函数**：
   >
   >   - 方式1：`var sum = function(){}`，这是函数表达式的方式。调用：`sum();`
   >
   >   - 方式2：`obj.onclick = function(){}`。
   >   - （了解）方式3：使用`Function()`构造器，来创建构造一个匿名函数。语法：`var sum = new Function("参数1", "参数2", .., "函数体");`
   >
   > - **回调函数**：将函数A的地址或函数名作为参数，传递给了函数B，那么对于B来说，A就是回调函数，因为B中要回头去调用A。简而言之就是，需要别的对象或函数去调用的函数，就是回调函数。
   >
   > - 常用的**全局函数**：（都是window对象上属性和方法）
   >
   >   - 数值处理：
   >     - `parseInt(string, [n])`：将字符串转为十进制整数，失败结果是`NaN`。第2个参数可选，表示字符串数据是几进制的。
   >       - 如果字符串头部有空格，空格会被自动去除。
   >       - 如果`parseInt`的参数不是字符串，则会先转为字符串再转换。字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。比如传入字符串`'121px'`，后面的px会忽略掉结果为121。
   >       - 除了十进制数字，也支持其他进制表示的数字。但是不支持科学计数法形式的字符串，因此要注意那些会自动转为科学计数法的数字。
   >     - `parseFloat(string)`：将字符串转成浮点数，支持科学计数法。
   >     - `isNaN(v)`：`isNaN`方法可以用来判断一个值是否为`NaN`。但是，`isNaN`只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成`NaN`，所以最后返回`true`，这一点要特别引起注意。也就是说，`isNaN`为`true`的值，有可能不是`NaN`，而是一个字符串。因此建议用`Number.isNaN()`，它不会做转换更符合我们的认知。
   >     - `isFinite(v)`：用于检测值v是否是有限值。除了`Infinity`、`-Infinity`、`NaN`和`undefined`这几个值会返回`false`，`isFinite`对其他所有的值都会返回`true`。
   >     
   >   - 字符串处理：
   >     - （慎用）`eval(string)`：执行字符串中的js代码，并将代码的执行结果返回。
   >   
   >       > 注意：如果字符串中是对象的话，它会将最外层的“{}”大括号解析为代码块，所以为了正确解析对象需要外层再拼上`()`小括号。
   >   
   >     - `encodeURI/decodeURI('url')`：encodeURI用于对url进行URI编码，decodeURI是URI解码。
   >   
   >     - （**只读**）`getComputedStyle(obj,null)`：获取obj元素对应的样式对象，该对象中可以查看当前的dom对象上**生效的**CSS样式。

5. ### JS中的数据类型：

   > - JS中数据类型分为：**基本数据类型（值类型）**和**引用数据类型**。基本类型存储的是值本身，引用类型存储的是对象的地址。
   > - ES6之前的类型有6种：`undefined`、`null`、`number`、`string`、`boolean`、`object`。ES6后加了：`symbol`和`bigint`（后面讲）。其中`object`对象类型是最复杂的数据类型，又可以分成三个子类型：
   >   - 狭义的对象（object）：除非特殊说明，一般都指这个对象。
   >   - 数组（array）
   >   - 函数（function）
   > - `undefined`和`null`类型只有一个值，就是`undefined`和`null`；`null`是专门表示一个空引用，一个变量里面准备放对象，但还没放，可以给一个`null`。（因此`typeof null`为object）
   > - `number`类型包括哪些值：`-1 0 1 4.32 1000...NaN Infinity -Infinity`，整数、小数、正数、负数、不是数字、正负无穷大都属于`number`类型。
   >   - JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此（都采用IEEE 754标准）。所以，`1`与`1.0`是相同的，是同一个数。
   >   - JavaScript 能够表示的数值范围为21024到2-1023（开区间），超出这个范围的数无法表示。如果一个数小于等于2的-1075次方（指数部分最小值-1023，再加上小数部分的52位），那么就会发生为“负向溢出”，即 JavaScript 无法表示这么小的数，这时会直接返回0。JavaScript 提供`Number`对象的`MAX_VALUE`和`MIN_VALUE`属性，返回可以表示的具体的最大值和最小值。
   >   - 一个简单的法则是：**JavaScript 对15位的十进制数都可以精确处理**。
   >   - 容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算。
   >   - JS中整数的最大范围是±2^53，超过这个范围的整数可能就无法精确表示了。此时可以使用内置的`BigInt`类型。也可以在整数后加一个`n`来使用BigInt，例如`9223372036854775808n`。并且两个BigInt类型之间仍然用算数运算符做运算，且结果仍然是BigInt。但BigInt不能和Number一起运算。
   >   - 数值的表示法：
   >     - JavaScript 的数值可以用二、十、八、十六进制表示。默认情况下，JavaScript 内部会自动将八进制、十六进制、二进制转为十进制。（ES5的严格模式以及ES6的新语法中，八进制数字必须以`0o`或`00`开头）
   >     - 也允许使用科学计数法。当**小数点前的数字多于21位**，或**小数点后的零多于5个**，此时 JavaScript 会自动将数值转为科学计数法表示。
   >   - `NaN`（Not a Number）是`number`类型的一个特殊值，表示不是一个数字。当运算结果本该是一个数字，但最后结果非数字时，结果是`NaN`。
   >     - **NaN不等于（===）任何值，包括它自己**。
   >     - 此后面用`Object.is()`来判断两个基本类型值是否相等（不包括对象类型），而不能用`===`。
   >     - `NaN`在布尔运算时被当作`false`。
   >     - 除了`**`运算符之外，`NaN`与任何数（包括它自己）的运算，得到的都是`NaN`。

6. ### 运算符：

   > - `typeof`运算符：该运算符可以在程序的**运行阶段动态的获取变量的数据类型**，语法：`typeof 变量/值`，也可以：`typeof(变量/值)`。`typeof`运算符的结果是以下6个字符串之一：
   >
   >   > `"undefined"`、`"number"`、`"string"`、`"boolean"`、`"object"`、`"function"`
   > 
   > - 基本类型的比较：`==`是等同运算符只判断值，而`===`是全等运算符，判断值和类型，它才是真正的等于。
   > 
   > - `void`运算符：它可以让某个JS表达式返回undefined，用法：`void 表达式;`或`void(表达式);`
   > 
   >- `in`运算符：它用于检测对象是否包含某个属性，返回布尔值；如：`if( 'age' in obj )`。`in`运算符会去原型链上找，而`Object.hasOwnProperty()`只判断当前对象中（不包括原型）有没有该属性。
   > 
   >- `new`运算符：该运算符用来调用构造函数，返回该构造函数在堆中创建的动态对象，叫做**实例化对象**，都是引用类型，变量保存的都是对象在堆中的地址。

7. ### 类型转换：

   > - 自动类型转换：算数运算符做运算前，都会先把数据转换成`Number`类型，再做运算。`+`号在字符串前作为正号解析时，也会将字符串转成数字类型。
   > - 强制类型转换，通过函数转成对应的包装类型：
   >   - `Number('11')`，它会将串‘11’强转成`Number`型。
   >   - `Boolean(x)`函数可以将x强制转成布尔类型，规则：有true没有false。
   >   - `String(参数)`将参数强转成`String`型。
   >   - `Object(参数)`将参数强转成对象`Object`对象。

8. ### 无用链接：

   > 如何做到点击超链接不跳转，做一个“死链接”，不是href中写#，这是跳转到页面顶部，不是死链接。href中这样写：
   >
   > - `javascript:void(0);`
   > - 也可以写：`javascript:;`
   >
   > 注意：`javascript:`在html中表示，a标签的href后面是JS表达式而不是链接地址。

9. ### Base64 转码：

   > 有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。
   >
   > 所谓 Base64 就是一种编码方法，可以将二进制数据转成它使用 64 个可打印的 ASCII 字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。

   > JavaScript 原生提供两个和 Base64 相关的方法：
   >
   > - `btoa()`：任意值转为 Base64 编码
   > - `atob()`：Base64 编码转为原来的值
   >
   > ```js
   > btoa('Hello World!') // "SGVsbG8gV29ybGQh"
   > atob('SGVsbG8gV29ybGQh') // "Hello World!"
   > ```
   >
   > 注意，这两个方法不适合非 ASCII 码的字符，会报错。（`btoa('你好') // 报错`）
   >
   > 要将非 ASCII 码字符转为 Base64 编码，可以在中间插入一个URI转码环节，再使用这两个方法。
   >
   > ```js
   > function b64Encode(str) {
   >     return btoa(encodeURIComponent(str));
   > }
   > function b64Decode(str) {
   >     return decodeURIComponent(atob(str));
   > }
   > b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
   > b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
   > ```

10. ### JS的作用域：

   > - 局部作用域：分为函数作用域和块作用域。其中块作用域指，在`{}`代码块中声明的变量，在块外部就可能无法被访问了，不同块之间无法被访问（如果是var声明的是没有块作用域的，块外部仍然可以被访问）。函数作用域是在函数内部的作用域。
   > - 全局作用域：`<script>`标签块中声明的就是全局作用域，全局作用域其实就是给`window`对象添加属性，尽可能少用全局变量，防止全局变量被污染。
   >
   > **注意：**函数中未使用任何关键字声明的变量就是`var`的全局变量，不推荐！

11. ### JS的垃圾回收机制：

    > JS同样由自动垃圾回收机制，它的原理是：
    >
    > - 全局变量一般不会被回收，直到页面被关闭。而堆中的局部变量一旦不用就会被GC（垃圾回收器）立即释放掉。
    > - 两种浏览器中常用的垃圾回收算法：
    >   1. **引用计数法**（ie）：看某个对象是否还有指向它的引用，如果没有了就回收掉。算法的核心是跟踪计录被引用的次数，次数为0则回收。该算法存在一个致命的**嵌套引用**问题：两个对象之间相互引用，别人访问不到这两个对象，但这两个对象不会被回收。
    >   2. **标记清除法**：现代的浏览器已经不再使用引用计数法了，大多是用基于标记清除法的改进算法。它是从JS的全局根对象`window`出发，定期扫描内存中的对象，凡是通过根部无法到达的对象，都是要被回收的垃圾对象。

12. ### 闭包：

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

13. ### 环境对象this：

    > `this`是**函数内部**的特殊变量，它代表了当前函数运行时的不同环境，不同环境下`this`的指向不同（也可以改变this的指向）。那怎么看this指向谁呢？
    >
    > - 粗略判断：谁调用的该函数，函数中的`this`就是谁，指向调用函数的这个对象。
    > - 细致分析：普通的`<script>`中调用的函数，`this`就是全局作用域的`window`对象。回调函数指向事件的调用者。箭头函数中没有`this`，它继承了上个作用域的`this`。

14. ### 改变this指向：

    > 有3个函数可以改变“普通函数”中的`this`指向：（箭头函数的`this`改不了，因为箭头函数没有`this`）
    >
    > - `fnc.call(thisObj, 函数参数..)`：它会调用fnc函数，且指定函数中的`this`指向第1个参数。
    > - `fnc.apply(thisObj, 数组)`：和`call()`函数类似，只不过函数参数放在了数组中。比如求数组最大值可以：`Math.max.apply(null, arr)`
    > - `fnc.bind(thisObj, 函数参数..)`：它不调用函数，只改变函数内`this`的指向。返回值是，由指定的this和初始化参数改造过的原函数的备份，是一个新函数。

15. ### JS中的异常：

    > - JS中也有异常机制，语法和Java类似，也是在代码中直接用`throw`关键字抛出一个异常实例对象。此时如果不处理程序会中断执行。如：`throw new Error('错误信息')`，抛出`Error`错误对象。
    > - JS中的`Error`对象是基本的错误对象，里面封装了错误信息。其他的像`TypeError`、`URIError`等错误对象都继承于它。
    > - 处理异常：和Java类似，同样是用`try{可能发生异常的代码}catch(e){e.message/e.name}finally{}`
    > - **注意：**try{}中的异步任务发生异常catch()是捕获不到的。因此，**开发者应避免使用Try Catch捕获由异步任务引发的错误**。
    > - 关于`debugger`关键字：该关键字以JS语句的形式直接出现在JS代码中。当程序执行到这个关键字时，如果浏览器的**开发者工具是打开的**，代码执行将会暂停，这就为开发者提供了检查当前程序执行环境（包括变量值、调用栈、作用域等）的机会。
    > - **严格模式**：严格模式是指，通过在脚本或函数的开头添加字面量`"use strict"`作为单独的语句，来声明以下作用域中的代码按照严格模式。此时普通函数没有明确的调用者，`this`指向`undefined`而不是`window`。

------

## JS对象

> - 对象是JS中的一种引用类型，是一种复合数据类型，对象中保存了多个不同类型的数据。（数组是有序的数据集合）
> - 对象分为静态对象和动态对象，`new`创建的都是动态对象，我们这里先说静态对象。静态对象的语法：`let 对象名 = {}`
> - JS对象由属性和方法组成，如：`let 对象名 = { 属性名:值, 方法名:匿名函数,... }`
> - 对象的所有键名都是字符串（ES6 又引入了 Symbol 值也可以作为键名），所以加不加引号都可以（不能是`飘号）。一般不加，除非遇到名字里含有特殊符号（-、空格等）。**如果键名是数值，会被自动转为字符串。**
> - 对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。
> - 如果想拿外部变量`name`的值来作为对象的属性名，可以用中括号括起来`[name]: 值`。因为没有中括号`[]`的话，`:`左边的属性名是左值会被当作变量名字符串，不会取name中保存的字符串值作为变量名。

- ##### 访问/修改对象中的属性和方法：

  > - 获取属性值：`对象名.属性名`或`对象名["属性名"]`，当属性名包含特殊字符时只能用后者（单引号双引号都行）。
  >
  >   > 方括号运算符内部可以是一个表达式或变量。如果是一个数字，那么会自动转成字符串。
  >
  > - 修改属性值 / 给对象新增属性（有就是改没有就是增）：`对象名.属性名=值`。（对象的属性可以动态创建，不必在对象声明时就指定）
  >
  > - 删除（对象本身的）某个属性：`delete 对象名.属性名`。删除成功返回`true`。
  >
  >   > **注意：**
  >   >
  >   > - 删除一个不存在的属性，`delete`不报错，而且返回`true`。
  >   > - 只有一种情况，`delete`命令会返回`false`，那就是该属性存在，且不得删除。
  >   > - `delete`命令只能删除对象本身的属性，无法删除原型链上的属性。
  >
  > - 调用方法 / 新增方法（本质上方法也是函数）：`对象名.方法名(实参)`

- ##### for...in循环：

  > 对象没有像数组那样的`length`属性，所以普通for无法遍历对象，而且对象中属性是无序的，所以目前我们遍历对象**只能用`for in`遍历对象**。用法：

  ```js
  let obj = {
  	name: "张三",
  	age: 18,
  	sex: "男"
  }
  for(let key in obj){
  	alert(key);//string型的'name','age','sex'
  	//也就是说forin遍历一个对象时，遍历的是对象中的属性名字符串
  	alert(obj[key]);
  }
  ```

  > `for in`还可以遍历数组，但是一般不这样用：
  >
  > ```js
  > let a = [2, 3.14, false, "abc"];
  > for(let i in a){
  > 	alert(a[i]);
  > }
  > /*
  > 	1、和遍历对象不同，这里的i是（字符串型）下标不是属性名
  > 	2、数组a['1']访问也不会报错，但是不建议这样访问数组，所以实际forin我们不会用它遍历数组
  > */
  > ```

- ##### JS的内置对象：

  > 内置对象就是浏览器中提前写好的对象，直接就可以用。如：`document、console、window`等。

  - Math：Math对象是JS为我们提供数学相关的对象，里面有一系列数学运算相关的属性和方法，常用的如下：

    `ceil()、floor()、round()、max(参数1,2,...)、min(参数1,2,...)、pow()、abs()、trunc()抹掉小数位、sign()判断符号`

    > - 还可以通过`Math.random()`来生成`[0,1)`间的随机数。
    >
    > - 如何生成`[0-n]`之间的随机整数：`Math.floor( Math.random()*(n+1) )`
    >
    > - 生成`[min-max]`之间的随机数：`Math.floor(Math.random() * (max - min + 1)) + min`，另一种是：`parseInt(Math.random() * (max - min + 1) + min);`

  - Date：可以用来获取时间/日期。语法：`new Date()`，可以得到当前的时间戳。或传字符串得到指定时间戳：`new Date('2008-02-15[ 10:30:30]')`

    > Date对象常用方法：
    >
    > - `toLocaleString()`，以本地格式输出日期字符串
    > - `getFullYear()`：获取4位年份
    > - `getMonth()`：获取月份，取值0-11
    > - `getDate()`：获取月份中的天数
    > - `getDay()`：获取星期中天数，取值0-6
    > - `getHour()`：获取小时，取值0-23
    > - `getMinutes()`：获取分钟，取值0-59
    > - `getSeconds()`：获取秒，取值0-59
    >
    > 获取时间戳：
    >
    > - `t.getTime()`
    > - `new Date()`
    > - `Date.now()`：这是内置构造器Date中的静态方法now，它只能获取当前的时间戳。

  - Array：数组对象中的常用实例方法。
  
    > -  `arr.forEach(function(item, index){})`：遍历数组，没有返回值且无法修改数组。
    > -  `arr.map(function(item,index){ return ele+'像素'})`：遍历数组并返回新数组。不同于`forEach()`的是，它可以在原数组的基础做修改并返回一个新数组。
    > -  `arr.filter(function(item,index){ return item>=20 })`：过滤数组并返回新数组，新数组元素是其中符合条件的。
    > -  `arr.reduce(function(pre,current){ return 处理一次的结果 }, 初始值)`：数组值的累计处理。返回累计处理的结果，常用于数组求和。第1个参数回调函数的调用次数取决于数组长度，第2个参数是reduce最终结果的初值。它的执行过程为：第1次调用时pre的值就是初始值，之后每一次pre的值为上一次回调函数执行后的返回值。current就是数组中每一个元素。
    > -  `arr.find(function(item,index){ return item.color==='blue' })`：返回数组中满足条件的第一个元素
    > -  `arr.every(function(item,index){ return item>=10 })`：如果数组所有元素都符合条件，返回true
    > -  `arr.some(function(item,index){ return item>=10 })`：数组只要有一个元素符合条件，就返回true
  
- Number：实例方法`num.toFixed(3)`会将数字型对象num保留3位小数，返回一个字符串。


------

# JS高级

------

## JSON

- #### 什么是JSON：

  > - JSON全称JavaScript Object Notation（JavaScript对象标记），它是一种标准的轻量级的“数据交换格式”，主要用于做数据的交换，目前非常流行，90%以上的系统数据，交换数据用的就是JSON。JSON的特点：体积小、易解析。
  > - 在实际的开发中，有两种数据交换格式用的最多：
  >   1. JSON
  >   2. XML：缺点是体积较大、解析麻烦。优点是语法严谨。通常银行的数据交换会用XML。HTML和XML有一个父亲：SGML（标准通用的标记语言）。HTML主要做页面展示，所以语法松散，很随意。XML主要做数据存储和数据描述的，所以语法相当严格。XML文件可以用浏览器打开，验证是否有语法错误（浏览器打开如果显示的是xml的代码就没问题）。XML也常用来做程序的配置文件（重结构轻数据）。
  > - 本质上来说JSON是一种文本规范，字符串的规范。它和JS的对象格式很像，`{key:value,..}`的格式。不同的是，JSON的key必须是字符串型且必须加**双引号**（单引号不行），value可以是JS中的：`null、number、boolean、string`，且这几种不允许嵌套。还可以是：JSON对象、JS数组，数组中的类型可以是任何JSON的value支持的类型。
  > - 由于JSON对象和JS数组这两种类型存在，JSON可以表示复杂的树形结构，并且**JSON数据必须以`{}/[]`作为最外层**（`.json`文件必须以`{}`作为最外层）。另外JSON中的换行和空格不会有任何影响，仅仅是方便阅读。
  > - JSON不支持注释，JSON数据中不允许出现多余的逗号。JSON本质上是可处理的文本，如果要在JS中将JSON串真正当作对象去处理，就需要`JSON.parse(str)`将JSON串传进去，解析成JS对象返回才行。
  > - 由于JSON的灵活性大、数据量小、简单易读的特点，所以有些数据库的数据也是JSON格式（MongoDB）。
  > - 由于JSON来源于JS，所以JS对JSON对象有原生的支持。其他的如Java或C中，就只能将它作为规范化的字符串去处理。

- #### JS对象 => JSON串：

  > 用内置对象`JSON`的字符串化方法`JSON.stringify(obj)`，可以将对象转换成JSON字符串并返回。

- #### JSON串 => JS对象：

  > `JSON.parse(jsonStr)`，返回值是JS对象。

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

- #### 构造函数/构造器：

  > - 构造函数是一种特殊的函数（其实和普通函数没有本质区别），是一类对象的模板，主要用来初始化对象的。使用构造函数可以快速创建多个，类似的，值不同的对象。同一个构造函数创建的对象，我们称为一类对象，所以构造函数有时也称为类。
  >
  > - 调用构造函数时必须使用`new`关键字，使用`new`关键字调用构造函数的行为称为**动态对象的实例化**。此时JS解释器会执行以下操作：
  >
  >   - 创建一个新对象，并将这个对象的原型（`__proto__`）设置为构造函数的`prototype`属性。
  >   - 将构造函数内的`this`绑定到这个新对象。
  >   - 执行构造函数内部的代码，为这个新对象添加属性和方法。
  >   - 最终返回这个新对象。
  >
  >   > **忘记使用`new`关键字来调用构造函数**：如果不使用`new`关键字调用构造函数，`this`将指向全局对象（在浏览器环境中是`window`，在Node.js环境中是`global`），这可能会导致意外的行为。
  >
  > - 调用构造函数不传参时小括号可省略。
  >
  > - 构造函数中不要出现`return`，没用，因为构造函数的返回值就是我们实例化的对象的地址。（当返回了引用类型时，new创造的实例就是返回的引用地址了）
  >
  > - 构造函数名像Java类名一样，开头一般大写。
  >
  > - 使用构造函数：
  >
  >   ```js
  >   //建议每个对象独有的实例属性和实例方法写在构造函数中；而属于构造函数自己的“静态属性和静态方法”建议单独定义到外部的构造函数中
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
  >   ```
  >
  > - 注意：JS中的构造函数一般用纯函数来定义。什么是纯函数？
  >
  >   > **纯函数：**类似与数学中的函数，相同的输入永远得到相同的输出，而且没有任何可观察的*副作用*。纯函数有以下的特征：
  >   >
  >   > 1. **只负责自己的任务**。它不会更改在该函数调用前就已存在的对象或变量。因为这可能影响到其他使用该对象的地方，产生不可预期的副作用。
  >   > 2. **输入相同，则输出相同**。给定相同的输入，纯函数总是返回相同的结果。

- #### 实例成员：

  > 通过构造函数创建的对象称为实例对象，实例对象的属性和方法称为实例成员（实例属性和实例方法）

- #### 静态成员：

  > 构造函数的独有属性和方法称为静态成员，只有一份。静态成员只能通过`构造函数名.`来访问（静态成员的`this`指向构造函数的地址）

- #### 包装类型：

  > - 之前说过，`''`括起来的都是字符串，属于基本类型`string`。但为什么可以`'abc'.indexOf()`的方式调用`String`对象上的方法呢？就是因为包装类型的存在。
  >
  > - 实际上使用基本类型字面量直接调用方法和属性时，JS底层会做一个**自动装箱**，将小string包装成大String，然后再调用。由于自动装箱和自动拆箱，所以小string和大String用起来感觉一模一样，但实际上它们是两个截然不同的数据类型，一个`typeof`是`string`，另一个是`object`。
  > - JS中所有基本类型的包装类型，都可以通过`new`关键字调用其构造函数去创建。

- #### 关于Object()构造函数：

  > 以前遍历对象只能用`for in`，现在我们可以使用`Object`构造函数里面的静态方法：
  >
  > - `Object.keys(obj)`：返回obj的所有属性，字符串数组。
  >
  > - `Object.values(obj)`：返回obj的所有属性值，数组。
  >
  > - `Object.assign(o1,o2,..)`：对象合并，将o2（及后面所有对象中的内容）合并到o1中，属性重名o2会覆盖o1。
  >
  > - `Object.is(o1,o2)`：判断两个对象是否完全相等，和`===`有点像，不同的是`Object.is(NaN,NaN)`为`true`。
  >
  > - `Object.setPrototypeOf(o1,o2)`：单独设置某个对象原型对象，将o1的原型设置为o2。一般不用。
  >
  > - `Object.getPrototype(obj)`：获取obj对象的原型，推荐使用该方式获取对象的原型。
  >
  > - `Object.defineProperty(obj,'属性名',{配置})`：方法可以给对象定义属性（加/改/细节限制），返回此对象。配置项这样写：
  >
  >   ```js
  >   {
  >       value: 属性值,
  >       enumerable: true,//是否可以被遍历，默认false不行
  >       writable: true,//是否可以被修改，默认false不行
  >       configuration: true//该属性是否可以被配置和删除，默认false不行
  >       //也可以设置get(){}或set(){}方法，此时该属性实际上是虚拟属性，调用该属性实际上是执行的方法
  >   }
  >   ```

- #### JS的面向对象：

  > Java中有类，可以通过类和对象来实现面向对象，JS中如何面向对象呢？首先JS中构造函数可以实现面向对象的封装性，实例化的对象之间互相不受影响。而多态特性JS中弱类型所以不需要多态。JS中对象之间怎么完成继承呢？我们先看几个概念：

  - **原型**：JS中，**所有函数都有`prototype`属性**（除了箭头函数），该属性值默认是一个空对象`{}`。我们通常称这个对象为**原型对象**或**原型**。如果该函数是普通函数，那么该原型对象没有任何用。只有当该函数作为构造函数来`new`时，该构造函数创建的**所有对象中都有**一个隐含的**只读**属性`__proto__`（对象原型）指向该构造函数上的**原型对象（prototype）**。如果一些属性和方法，需要被（该构造函数创建的）所有对象所共享，我们都应该将其放到对象的构造函数的原型对象上。这样所有new出来的对象，大家都可以通过`__proto__`找到原型并使用原型对象上的公共成员，避免内存浪费。（原型对象中的this和构造函数中的this一样，都指向该实例对象）
  - **constrator属性**：每个原型对象`prototype`都应该唯一属于某个构造器，所以每个原型对象上都有`constrator`属性，该属性指向原型对象的构造函数。这样原型对象和构造器就一一对应起来了。
  - **原型链**：我们说所有对象都有隐含属性`__proto__`指向**构造该对象的构造函数的原型**，那么该原型对象的`__proto__`指向谁呢？**原型的`__proto__`指向`Object`构造器的原型**，而`Object`的原型对象的`__proto__`是`null`。这些对象原型之间的指向关系就是**原型链**。简单来说：原型链就是一个查找规则，当我们要使用对象中的属性和方法时，先去当前对象中找，找不到再去原型链上的所有原型对象中依次找，直到`Object`的原型中也没有，那么就报错。（可以使用`instanceof`运算符检测，对象是否出现在一个构造函数的原型链上，如：`obj instanceof Person`）

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
  > - `hasOwnProperty('属性名')`：由于`in`运算符只会从对象自身以及原型对象中找，都找不到才返回`false`，而对象的`hasOwnProperty('属性名')`方法只在当前对象中找是否有该属性，不去原型链上找了。

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

    - （推荐）用lodash库里的`_.cloneDeep(obj)`函数：（lodash是一个一致性、模块化、高性能的JS实用工具库，我们直接引入它的JS文件，内部函数都以`_.`开头）

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

