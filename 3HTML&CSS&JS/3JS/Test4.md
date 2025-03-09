- ## 异步操作

  - #### 概述

    - ##### 单线程模型：

      > JS 的单线程模型指的是，JS 引擎（解释器）只在一个线程上运行。也就是说，JS 同时只能执行一个任务，其他任务都必须在后面排队等待。注意，JS 只在一个线程上运行，不代表 JS 引擎只有一个线程。事实上，JS 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。
      >
      > JS 之所以采用单线程，而不是多线程，跟历史有关系。JS 从诞生起就是单线程，原因是不想让浏览器变得太复杂，因为多线程需要共享资源、且有可能修改彼此的运行结果，对于一种网页脚本语言来说，这就太复杂了。如果 JS 同时有两个线程，一个线程在网页 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？是不是还要有锁机制？所以，为了避免复杂性，JS 从一开始就是单线程，这已经成了这门语言的核心特征，将来也不会改变。
      >
      > 这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 JS 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。JS 语言本身并不慢，慢的是读写外部数据，比如等待 Ajax 请求返回结果。这个时候，如果对方服务器迟迟没有响应，或者网络不通畅，就会导致脚本的长时间停滞。
      >
      > 如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 操作（输入输出）很慢（比如 Ajax 操作从网络读取数据），不得不等着结果出来，再往下执行。JS 语言的设计者意识到，这时 CPU 完全可以不管 IO 操作，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 操作返回了结果，再回过头，把挂起的任务继续执行下去。这种机制就是 JS 内部采用的“事件循环”机制（Event Loop）。
      >
      > 单线程模型虽然对 JS 构成了很大的限制，但也因此使它具备了其他语言不具备的优势。如果用得好，JS 程序是不会出现堵塞的，这就是 Node.js 可以用很少的资源，应付大流量访问的原因。
      >
      > 为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JS 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JS 单线程的本质。
      
    - ##### 同步任务和异步任务：

      > 程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）。
      >
      > 同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。
      >
      > 异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。
      >
      > 举例来说，Ajax 操作可以当作同步任务处理，也可以当作异步任务处理，由开发者决定。如果是同步任务，主线程就等着 Ajax 操作返回结果，再往下执行；如果是异步任务，主线程在发出 Ajax 请求以后，就直接往下执行，等到 Ajax 操作有了结果，主线程再执行对应的回调函数。
  
    - ##### 任务队列和事件循环：

      > JS 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。（实际上，根据异步任务的类型，存在多个任务队列。为了方便理解，这里假设只存在一个队列。）
      >
      > 首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。
      >
      > 异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。
      >
      > JS 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。维基百科的定义是：“事件循环是一个程序结构，用于等待和发送消息和事件（a programming construct that waits for and dispatches events or messages in a program）”。
  
    - ##### 异步操作的模式：

      1. ###### 回调函数：

         > 回调函数是异步操作最基本的方法。
         >
         > 下面是两个函数`f1`和`f2`，编程的意图是`f2`必须等到`f1`执行完成，才能执行。
         >
         > ```js
         > function f1() {/* ... */}
         > function f2() {/* ... */}
         > f1();
         > f2();
         > ```
         >
         > 上面代码的问题在于，如果`f1`是异步操作，`f2`会立即执行，不会等到`f1`结束再执行。这时，可以考虑改写`f1`，把`f2`写成`f1`的**回调函数**。
         >
         > ```js
         > function f1(callback) {
         >        /* ... */
         >        callback();
         > }
         > function f2() {/* ... */}
         > f1(f2);
         > ```
         >
         > 回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（coupling），使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。
  
      2. ###### 事件监听：

         > 另一种思路是采用事件驱动模式。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
         >
         > 还是以`f1`和`f2`为例。首先，为`f1`绑定一个事件（这里采用的 jQuery 的写法）。
         >
         > ```js
         > f1.on('done', f2);
         > ```
         >
         > 上面这行代码的意思是，当`f1`发生`done`事件，就执行`f2`。然后，对`f1`进行改写：
         >
         > ```js
         > function f1() {
         >     setTimeout(function () {
         >         // ...
         >         f1.trigger('done');
         >     }, 1000);
         > }
         > ```
         >
         > 上面代码中，`f1.trigger('done')`表示，执行完成后，立即触发`done`事件，从而开始执行`f2`。
         >
         > 这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以“去耦合”（decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。
      
      3. 发布/订阅：
      
         > 事件完全可以理解成“信号”，如果存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”发布/订阅模式”（publish-subscribe pattern），又称“观察者模式”（observer pattern）。
         >
         > 这个模式有多种实现，下面采用的是 Ben Alman 的 Tiny Pub/Sub，这是 jQuery 的一个插件。
         >
         > 首先，`f2`向信号中心`jQuery`订阅`done`信号。
         >
         > ```js
         > jQuery.subscribe('done', f2);
         > ```
         >
         > 然后，`f1`进行如下改写。
         >
         > ```js
         > function f1() {
         >     setTimeout(function () {
         >         // ...
         >         jQuery.publish('done');
         >     }, 1000);
         > }
         > ```
         >
         > 上面代码中，`jQuery.publish('done')`的意思是，`f1`执行完成后，向信号中心`jQuery`发布`done`信号，从而引发`f2`的执行。
         >
         > `f2`完成执行后，可以取消订阅（unsubscribe）。
         >
         > ```js
         > jQuery.unsubscribe('done', f2);
         > ```
         >
         > 这种方法的性质与“事件监听”类似，但是明显优于后者，是它的升级版。因为可以通过查看“消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。
         
  
  - #### 定时器
  
    > JS 提供定时执行代码的功能，叫做定时器（timer），主要由`setTimeout()`和`setInterval()`这两个全局函数来完成。它们向任务队列添加定时任务。
  
    - `setTimeout()`：该函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。用法：
  
      ```js
      var timerId = setTimeout(func|code, delay);
      ```
  
      > 上面代码中，`setTimeout`函数接受两个参数，第一个参数`func|code`是将要推迟执行的函数名或者一段代码，第二个参数`delay`是推迟执行的毫秒数。
  
      `setTimeout`的第二个参数如果省略，则默认为0。
  
      除了前两个参数，`setTimeout`还允许更多的参数。它们将依次传入推迟执行的函数（回调函数）。
  
      ```js
      setTimeout(function (a,b) {
      	console.log(a + b);
      }, 1000, 1, 1);
      ```
  
    - `setInterval()`：`setInterval`函数的用法与`setTimeout`完全一致，区别仅仅在于`setInterval`指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行，直到定时器被关闭。
  
      > `setInterval`指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。比如，`setInterval`指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始。
      >
      > 为了确保两次执行之间有固定的间隔，可以不用`setInterval`，而是每次执行结束后，使用`setTimeout`指定下一次执行的具体时间。
  
    - `clearTimeout()`和`clearInterval()`：
  
      > `setTimeout`和`setInterval`函数，都返回一个整数值，表示计数器编号。将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。
      >
      > 并且`setTimeout`和`setInterval`返回的整数值是连续的，也就是说，第二个`setTimeout`方法返回的整数值，将比第一个的整数值大1。
  
    - 定时器的运行机制：
  
      > `setTimeout`和`setInterval`的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。
      >
      > 这意味着，`setTimeout`和`setInterval`指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，`setTimeout`和`setInterval`指定的任务，一定会按照预定时间执行。注意，生效后`setInterval`不会产生累积效应。
      >
      > ```js
      > setTimeout(someTask, 100);
      > veryLongTask();
      > ```
      >
      > 上面代码的`setTimeout`，指定100毫秒以后运行一个任务。但是，如果后面的`veryLongTask`函数（同步任务）运行时间非常长，过了100毫秒还无法结束，那么被推迟运行的`someTask`就只有等着，等到`veryLongTask`运行结束，才轮到它执行。
    
      ###### `setTimeout(f, 0)`：
    
      > 实际上，`setTimeout(f, 0)`不会真的在0毫秒之后运行，不同的浏览器有不同的实现。以 Edge 浏览器为例，会等到4毫秒之后运行。如果电脑正在使用电池供电，会等到16毫秒之后运行；如果网页不在当前 Tab 页，会推迟到1000毫秒（1秒）之后运行。这样是为了节省系统资源。
    
    ###### 防抖和节流：
    
    > 防抖和节流是两个性能优化的手段，我们看下如何做到。
    
    - 防抖（debounce）：
    
      > 防抖是指：单位时间内频繁触发事件，只处理最后一次。如：鼠标在box上移动，停止500ms之后，才执行鼠标移动相关的操作，有助于性能优化和用户体验。防抖的实现方式：
    
      - 方式1：手写防抖代码，用`setTimeout()`来实现，核心思路：声明一个定时器变量timer，当每次鼠标滑过都判断是否有定时器了，如果有就先清除以前的定时器，然后重新添加定时器。如：
    
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
    
    - 节流（throttle）：
    
      > 节流是指：单位时间内，频繁触发事件，只执行一次，单位时间内后面的事件发生了也不执行。和防抖不同的是，节流处理的不是单位时间里的最后一个事件。节流的使用场景：鼠标移动`mousemove`、页面尺寸变化`resize`、滚动条滚动`scroll`等高频事件。节流实现方式：
    
      - 方式1：手写节流代码，也是用`setTimeout()`来实现，核心思路：声明一个定时器变量timer，当每次鼠标滑过都判断是否有定时器了，如果没有就添加定时器，如果有了就什么也不做。如：
    
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
    
      - 方式2：用`lodash`提供的节流函数`_.throttle(fun,[waitTime])`。
    

------

TODO:

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
     > - 如果标签设置 async 属性：脚本会在解析页面的同时并行下载，并在可用时立即执行。（异步）
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

- JS中整数的最大范围是±2^53，超过这个范围的整数可能就无法精确表示了。此时可以使用内置的`BigInt`类型。也可以在整数后加一个`n`来使用BigInt，例如`9223372036854775808n`。并且两个BigInt类型之间仍然用算数运算符做运算，且结果仍然是BigInt。但BigInt不能和Number一起运算。

- 

  > - 常用的**全局函数**：
  >
  >   - `encodeURI/decodeURI('url')`：encodeURI用于对url进行URI编码，decodeURI是URI解码。
  >
  >   - （**只读**）`getComputedStyle(obj,null)`：获取obj元素对应的样式对象，该对象中可以查看当前的dom对象上**生效的**CSS样式。


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
  >
  > - ##### JS的内置对象：
  >
  >   > 内置对象就是浏览器中提前写好的对象，直接就可以用。如：`document、console、window`等。
  >
  >   - Math：Math对象是JS为我们提供数学相关的对象，里面有一系列数学运算相关的属性和方法，常用的如下：
  >
  >     `ceil()、floor()、round()、max(参数1,2,...)、min(参数1,2,...)、pow()、abs()、trunc()抹掉小数位、sign()判断符号`
  >
  >     > - 还可以通过`Math.random()`来生成`[0,1)`间的随机数。
  >     >
  >     > - 如何生成`[0-n]`之间的随机整数：`Math.floor( Math.random()*(n+1) )`
  >     >
  >     > - 生成`[min-max]`之间的随机数：`Math.floor(Math.random() * (max - min + 1)) + min`，另一种是：`parseInt(Math.random() * (max - min + 1) + min);`
  >
  >   - Date：可以用来获取时间/日期。语法：`new Date()`，可以得到当前的时间戳。或传字符串得到指定时间戳：`new Date('2008-02-15[ 10:30:30]')`
  >
  >     > Date对象常用方法：
  >     >
  >     > - `toLocaleString()`，以本地格式输出日期字符串
  >     > - `getFullYear()`：获取4位年份
  >     > - `getMonth()`：获取月份，取值0-11
  >     > - `getDate()`：获取月份中的天数
  >     > - `getDay()`：获取星期中天数，取值0-6
  >     > - `getHour()`：获取小时，取值0-23
  >     > - `getMinutes()`：获取分钟，取值0-59
  >     > - `getSeconds()`：获取秒，取值0-59
  >     >
  >     > 获取时间戳：
  >     >
  >     > - `t.getTime()`
  >     > - `new Date()`
  >     > - `Date.now()`：这是内置构造器Date中的静态方法now，它只能获取当前的时间戳。
  >
  >   - Array：数组对象中的常用实例方法。
  >
  >     > -  `arr.forEach(function(item, index){})`：遍历数组，没有返回值且无法修改数组。
  >     > -  `arr.map(function(item,index){ return ele+'像素'})`：遍历数组并返回新数组。不同于`forEach()`的是，它可以在原数组的基础做修改并返回一个新数组。
  >     > -  `arr.filter(function(item,index){ return item>=20 })`：过滤数组并返回新数组，新数组元素是其中符合条件的。
  >     > -  `arr.reduce(function(pre,current){ return 处理一次的结果 }, 初始值)`：数组值的累计处理。返回累计处理的结果，常用于数组求和。第1个参数回调函数的调用次数取决于数组长度，第2个参数是reduce最终结果的初值。它的执行过程为：第1次调用时pre的值就是初始值，之后每一次pre的值为上一次回调函数执行后的返回值。current就是数组中每一个元素。
  >     > -  `arr.find(function(item,index){ return item.color==='blue' })`：返回数组中满足条件的第一个元素
  >     > -  `arr.every(function(item,index){ return item>=10 })`：如果数组所有元素都符合条件，返回true
  >     > -  `arr.some(function(item,index){ return item>=10 })`：数组只要有一个元素符合条件，就返回true
  >
  > - ##### Number：实例方法`num.toFixed(3)`会将数字型对象num保留3位小数，返回一个字符串。

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