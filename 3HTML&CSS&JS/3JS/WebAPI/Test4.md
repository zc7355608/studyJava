- ## SVG 图像

  - #### 概述

    > SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。其他图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。
    >
    > SVG 文件可以直接插入网页，成为 DOM 的一部分，然后用 JavaScript 和 CSS 进行操作。
    >
    > ```html
    > <!DOCTYPE html>
    > <html>
    > <head></head>
    > <body>
    > <svg
    >   id="mysvg"
    >   xmlns="http://www.w3.org/2000/svg"
    >   viewBox="0 0 800 600"
    >   preserveAspectRatio="xMidYMid meet"
    > >
    >   <circle id="mycircle" cx="400" cy="300" r="50" />
    > </svg>
    > </body>
    > </html>
    > ```
    >
    > 上面是 SVG 代码直接插入网页的例子。
    >
    > SVG 代码也可以写在一个独立文件中，然后用`<img>`、`<object>`、`<embed>`、`<iframe>`等标签插入网页。
    >
    > ```html
    > <img src="circle.svg">
    > <object id="object" data="circle.svg" type="image/svg+xml"></object>
    > <embed id="embed" src="icon.svg" type="image/svg+xml">
    > <iframe id="iframe" src="icon.svg"></iframe>
    > ```
    >
    > CSS 也可以使用 SVG 文件。
    >
    > ```css
    > .logo {
    >   background: url(icon.svg);
    > }
    > ```
    >
    > SVG 文件还可以转为 BASE64 编码，然后作为 Data URI 写入网页。
    >
    > ```html
    > <img src="data:image/svg+xml;base64,[data]">
    > ```

  - #### 语法

    - ##### `<svg>` 标签

      > SVG 代码都放在顶层标签`<svg>`之中。下面是一个例子。
      >
      > ```
      > <svg width="100%" height="100%">
      >   <circle id="mycircle" cx="50" cy="50" r="50" />
      > </svg>
      > ```
      >
      > `<svg>`的width属性和height属性，指定了 SVG 图像在 HTML 元素中所占据的宽度和高度。除了相对单位，也可以采用绝对单位（单位：像素）。如果不指定这两个属性，SVG 图像的大小默认为300像素（宽）x 150像素（高）。
      >
      > 如果只想展示 SVG 图像的一部分，就要指定`viewBox`属性。
      >
      > ```
      > <svg width="100" height="100" viewBox="50 50 50 50">
      >   <circle id="mycircle" cx="50" cy="50" r="50" />
      > </svg>
      > ```
      >
      > `<viewBox>`属性的值有四个数字，分别是左上角的横坐标和纵坐标、视口的宽度和高度。上面代码中，SVG 图像是100像素宽 x 100像素高，`viewBox`属性指定视口从`(50, 50)`这个点开始。所以，实际看到的是右下角的四分之一圆。
      >
      > 注意，视口必须适配所在的空间。上面代码中，视口的大小是 50 x 50，由于 SVG 图像的大小是 100 x 100，所以视口会放大去适配 SVG 图像的大小，即放大了四倍。
      >
      > 如果不指定`width`属性和`height`属性，只指定`viewBox`属性，则相当于只给定 SVG 图像的长宽比。这时，SVG 图像的大小默认是所在的 HTML 元素的大小。

    - ##### `<circle>` 标签

      > `<circle>`标签代表圆形。
      >
      > ```html
      > <svg width="300" height="180">
      >   <circle cx="30"  cy="50" r="25" />
      >   <circle cx="90"  cy="50" r="25" class="red" />
      >   <circle cx="150" cy="50" r="25" class="fancy" />
      > </svg>
      > ```
      >
      > 上面的代码定义了三个圆。`<circle>`标签的`cx`、`cy`、`r`属性分别为横坐标、纵坐标和半径，单位为像素。坐标都是相对于`<svg>`画布的左上角原点。
      >
      > `class`属性用来指定对应的 CSS 类。
      >
      > ```css
      > .red {
      >   fill: red;
      > }
      > 
      > .fancy {
      >   fill: none;
      >   stroke: black;
      >   stroke-width: 3pt;
      > }
      > ```
      >
      > SVG 的 CSS 属性与网页元素有所不同：
      >
      > - `fill`：填充色
      > - `stroke`：描边色
      > - `stroke-width`：边框宽度

    - ##### `<line>` 标签

      > `<line>`标签用来绘制直线。
      >
      > ```
      > <svg width="300" height="180">
      >   <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:5" />
      > </svg>
      > ```
      >
      > 上面代码中，`<line>`标签的`x1`属性和`y1`属性，表示线段起点的横坐标和纵坐标；`x2`属性和`y2`属性，表示线段终点的横坐标和纵坐标；`style`属性表示线段的样式。

    - ##### `<polyline>` 标签

      > `<polyline>`标签用于绘制一根折线。
      >
      > ```
      > <svg width="300" height="180">
      >   <polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
      > </svg>
      > ```
      >
      > `<polyline>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

    - ##### `<rect>` 标签

      > `<rect>`标签用于绘制矩形。
      >
      > ```
      > <svg width="300" height="180">
      >   <rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
      > </svg>
      > ```
      >
      > `<rect>`的`x`属性和`y`属性，指定了矩形左上角端点的横坐标和纵坐标；`width`属性和`height`属性指定了矩形的宽度和高度（单位像素）。

    - ##### `<ellipse>` 标签

      > `<ellipse>`标签用于绘制椭圆。
      >
      > ```
      > <svg width="300" height="180">
      >   <ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>
      > </svg>
      > ```
      >
      > `<ellipse>`的`cx`属性和`cy`属性，指定了椭圆中心的横坐标和纵坐标（单位像素）；`rx`属性和`ry`属性，指定了椭圆横向轴和纵向轴的半径（单位像素）。

    - ##### `<polygon>` 标签

      > `<polygon>`标签用于绘制多边形。
      >
      > ```
      > <svg width="300" height="180">
      >   <polygon fill="green" stroke="orange" stroke-width="1" points="0,0 100,0 100,100 0,100 0,0"/>
      > </svg>
      > ```
      >
      > `<polygon>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

    - ##### `<path>` 标签

      > `<path>`标签用于制路径。
      >
      > ```
      > <svg width="300" height="180">
      > <path d="
      >   M 18,3
      >   L 46,3
      >   L 46,40
      >   L 61,40
      >   L 32,68
      >   L 3,40
      >   L 18,40
      >   Z
      > "></path>
      > </svg>
      > ```
      >
      > `<path>`的`d`属性表示绘制顺序，它的值是一个长字符串，每个字母表示一个绘制动作，后面跟着坐标：
      >
      > - M：移动到（moveto）
      > - L：画直线到（lineto）
      > - Z：闭合路径

    - ##### `<text>` 标签

      > `<text>`标签用于绘制文本。
      >
      > ```
      > <svg width="300" height="180">
      >   <text x="50" y="25">Hello World</text>
      > </svg>
      > ```
      >
      > `<text>`的`x`属性和`y`属性，表示文本区块基线（baseline）起点的横坐标和纵坐标。文字的样式可以用`class`或`style`属性指定。

    - ##### `<use>` 标签

      > `<use>`标签用于复制一个形状。
      >
      > ```
      > <svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
      >   <circle id="myCircle" cx="5" cy="5" r="4"/>
      > 
      >   <use href="#myCircle" x="10" y="0" fill="blue" />
      >   <use href="#myCircle" x="20" y="0" fill="white" stroke="blue" />
      > </svg>
      > ```
      >
      > `<use>`的`href`属性指定所要复制的节点，`x`属性和`y`属性是`<use>`左上角的坐标。另外，还可以指定`width`和`height`坐标。

    - ##### `<g>` 标签

      > `<g>`标签用于将多个形状组成一个组（group），方便复用。
      >
      > ```html
      > <svg width="300" height="100">
      >   <g id="myCircle">
      >     <text x="25" y="20">圆形</text>
      >     <circle cx="50" cy="50" r="20"/>
      >   </g>
      > 
      >   <use href="#myCircle" x="100" y="0" fill="blue" />
      >   <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
      > </svg>
      > ```

    - ##### `<defs>` 标签

      > `<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。
      >
      > ```html
      > <svg width="300" height="100">
      >   <defs>
      >     <g id="myCircle">
      >       <text x="25" y="20">圆形</text>
      >       <circle cx="50" cy="50" r="20"/>
      >     </g>
      >   </defs>
      > 
      >   <use href="#myCircle" x="0" y="0" />
      >   <use href="#myCircle" x="100" y="0" fill="blue" />
      >   <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
      > </svg>
      > ```

    - ##### `<pattern>` 标签

      > `<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。
      >
      > ```
      > <svg width="500" height="500">
      >   <defs>
      >     <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      >       <circle fill="#bee9e8" cx="50" cy="50" r="35" />
      >     </pattern>
      >   </defs>
      >   <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
      > </svg>
      > ```
      >
      > 上面代码中，`<pattern>`标签将一个圆形定义为`dots`模式。`patternUnits="userSpaceOnUse"`表示`<pattern>`的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形。

    - ##### `<image>` 标签

      > `<image>`标签用于插入图片文件。
      >
      > ```
      > <svg viewBox="0 0 100 100" width="100" height="100">
      >   <image xlink:href="path/to/image.jpg"
      >     width="50%" height="50%"/>
      > </svg>
      > ```
      >
      > 上面代码中，`<image>`的`xlink:href`属性表示图像的来源。

    - ##### `<animate>` 标签

      > `<animate>`标签用于产生动画效果。
      >
      > ```
      > <svg width="500px" height="500px">
      >   <rect x="0" y="0" width="100" height="100" fill="#feac5e">
      >     <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
      >   </rect>
      > </svg>
      > ```
      >
      > 上面代码中，矩形会不断移动，产生动画效果。
      >
      > `<animate>`的属性含义如下：
      >
      > - `attributeName`：发生动画效果的属性名。
      > - `from`：单次动画的初始值。
      > - `to`：单次动画的结束值。
      > - `dur`：单次动画的持续时间。
      > - `repeatCount`：动画的循环模式。
      >
      > 可以在多个属性上面定义动画。
      >
      > ```html
      > <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
      > <animate attributeName="width" to="500" dur="2s" repeatCount="indefinite" />
      > ```

    - ##### `<animateTransform>` 标签

      > `<animate>`标签对 CSS 的`transform`属性不起作用，如果需要变形，就要使用`<animateTransform>`标签。
      >
      > ```html
      > <svg width="500px" height="500px">
      >   <rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
      >     <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
      >   </rect>
      > </svg>
      > ```
      >
      > 上面代码中，`<animateTransform>`的效果为旋转（`rotate`），这时`from`和`to`属性值有三个数字，第一个数字是角度值，第二个值和第三个值是旋转中心的坐标。`from="0 200 200"`表示开始时，角度为0，围绕`(200, 200)`开始旋转；`to="360 400 400"`表示结束时，角度为360，围绕`(400, 400)`旋转。

  - #### JavaScript 操作

    - ##### DOM 操作

      > 如果 SVG 代码直接写在 HTML 网页之中，它就成为网页 DOM 的一部分，可以直接用 DOM 操作。
      >
      > ```
      > <svg
      >   id="mysvg"
      >   xmlns="http://www.w3.org/2000/svg"
      >   viewBox="0 0 800 600"
      >   preserveAspectRatio="xMidYMid meet"
      > >
      >   <circle id="mycircle" cx="400" cy="300" r="50" />
      > <svg>
      > ```
      >
      > 上面代码插入网页之后，就可以用 CSS 定制样式。
      >
      > ```
      > circle {
      >   stroke-width: 5;
      >   stroke: #f00;
      >   fill: #ff0;
      > }
      > 
      > circle:hover {
      >   stroke: #090;
      >   fill: #fff;
      > }
      > ```
      >
      > 然后，可以用 JavaScript 代码操作 SVG。
      >
      > ```
      > var mycircle = document.getElementById('mycircle');
      > 
      > mycircle.addEventListener('click', function(e) {
      >   console.log('circle clicked - enlarging');
      >   mycircle.setAttribute('r', 60);
      > }, false);
      > ```
      >
      > 上面代码指定，如果点击图形，就改写`circle`元素的`r`属性。

    - ##### 获取 SVG DOM

      > 使用`<object>`、`<iframe>`、`<embed>`标签插入 SVG 文件，可以获取 SVG DOM。
      >
      > ```
      > var svgObject = document.getElementById('object').contentDocument;
      > var svgIframe = document.getElementById('iframe').contentDocument;
      > var svgEmbed = document.getElementById('embed').getSVGDocument();
      > ```
      >
      > 注意，如果使用`<img>`标签插入 SVG 文件，就无法获取 SVG DOM。

    - ##### 读取 SVG 源码

      > 由于 SVG 文件就是一段 XML 文本，因此可以通过读取 XML 代码的方式，读取 SVG 源码。
      >
      > ```
      > <div id="svg-container">
      >   <svg
      >     xmlns="http://www.w3.org/2000/svg"
      >     xmlns:xlink="http://www.w3.org/1999/xlink"
      >     xml:space="preserve" width="500" height="440"
      >   >
      >     <!-- svg code -->
      >   </svg>
      > </div>
      > ```
      >
      > 使用`XMLSerializer`实例的`serializeToString()`方法，获取 SVG 元素的代码。
      >
      > ```js
      > var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
      > ```

    - ##### SVG 图像转为 Canvas 图像

      > 首先，需要新建一个`Image`对象，将 SVG 图像指定到该`Image`对象的`src`属性。
      >
      > ```js
      > var img = new Image();
      > var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
      > 
      > var DOMURL = self.URL || self.webkitURL || self;
      > var url = DOMURL.createObjectURL(svg);
      > 
      > img.src = url;
      > ```
      >
      > 然后，当图像加载完成后，再将它绘制到`<canvas>`元素。
      >
      > ```js
      > img.onload = function () {
      >   var canvas = document.getElementById('canvas');
      >   var ctx = canvas.getContext('2d');
      >   ctx.drawImage(img, 0, 0);
      > };
      > ```

  - #### 实例：折线图

    > 下面将一张数据表格画成折线图。
    >
    > ```
    > Date |Amount
    > -----|------
    > 2014-01-01 | $10
    > 2014-02-01 | $20
    > 2014-03-01 | $40
    > 2014-04-01 | $80
    > ```
    >
    > 上面的图形，可以画成一个坐标系，`Date`作为横轴，`Amount`作为纵轴，四行数据画成一个数据点。
    >
    > ```html
    > <svg width="350" height="160">
    >   <g class="layer" transform="translate(60,10)">
    >     <circle r="2" cx="0" cy="105" />
    >     <circle r="2" cx="90" cy="90" />
    >     <circle r="2" cx="180" cy="60" />
    >     <circle r="2" cx="270" cy="0" />
    > 
    >     <polyline points="0,105 90,90 180,60 270,0" fill="none" stroke="red" />
    > 
    >     <g class="y axis">
    >       <line x1="0" y1="0" x2="0" y2="120" style="stroke:black;stroke-width:1" />
    >       <text x="-40" y="115" dy="5">$10</text>
    >       <text x="-40" y="5" dy="5">$80</text>
    >     </g>
    >     <g class="x axis" transform="translate(0, 120)">
    >       <line x1="0" y1="0" x2="270" y2="0" style="stroke:black;stroke-width:1" />
    >       <text x="-10" y="20">Jan.</text>
    >       <text x="255" y="20">Apr.</text>
    >     </g>
    >   </g>
    > </svg>
    > ```

- ## URL 对象

  > 浏览器内置的 URL 对象，代表一个网址。通过这个对象，就能生成和操作网址。

  - #### 构造函数

    > URL 可以当作构造函数使用，生成一个实例对象。
    >
    > 它接受一个网址字符串作为参数。
    >
    > ```
    > let url = new URL('https://example.com');
    > ```
    >
    > 如果网址字符串无法解析，它会报错，所以它要放在`try...catch`代码块里面。
    >
    > 如果这个参数只是一个网站路径，比如`/foo/index.html`，那么需要提供基准网址，作为第二个参数。
    >
    > ```
    > const url1 = new URL('page2.html', 'http://example.com/page1.html');
    > url1.href // "http://example.com/page2.html"
    > 
    > const url2 = new URL('..', 'http://example.com/a/b.html')
    > url2.href // "http://example.com/"
    > ```
    >
    > 这种写法很方便基于现有网址，构造新的 URL。
    >
    > `URL()`的参数也可以是另一个 URL 实例。这时，`URL()`会自动读取该实例的href属性，作为实际参数。

  - #### 实例属性

    > 一旦得到了 URL 实例对象，就可以从它的各种属性，方便地获取 URL 的各个组成部分。
    >
    > - href：完整的网址
    > - protocol：访问协议，带结尾冒号`:`。
    > - search：查询字符串，以问号`?`开头。
    > - hash：哈希字符串，以`#`开头。
    > - username：需要认证的网址的用户名。
    > - password：需要认证的网址的密码。
    > - host：主机名，不带协议，但带有端口。
    > - hostname：主机名，不带协议和端口。
    > - port：端口。
    > - origin：包括协议、域名和端口。
    > - pathname：服务器路径，以根路径`/`开头，不带有查询字符串。
    > - searchParams：指向一个 URLSearchParams 实例，方便用来构造和操作查询字符串。
    >
    > 下面是用法示例。
    >
    > ```
    > const url = new URL('http://user:pass@example.com:8080/resource/path?q=1#hash');
    > 
    > url.href // http://user:pass@example.com:8080/resource/path?q=1#hash
    > url.protocol // http:
    > url.username // user
    > url.password // pass
    > url.host // example.com:8080
    > url.hostname // example.com
    > url.port // 8080
    > url.pathname // /resource/path
    > url.search // ?q=1
    > url.hash // #hash
    > url.origin // http://example.com:8080 
    > ```
    >
    > 这些属性里面，只有`origin`属性是只读的，其他属性都可写，并且会立即生效。
    >
    > ```
    > const url = new URL('http://example.com/index.html#part1');
    > 
    > url.pathname = 'index2.html';
    > url.href // "http://example.com/index2.html#part1"
    > 
    > url.hash = '#part2';
    > url.href // "http://example.com/index2.html#part2"
    > ```
    >
    > 上面示例中，改变 URL 实例的`pathname`属性和`hash`属性，都会实时反映在 URL 实例当中。
    >
    > 下面是`searchParams`属性的用法示例，它的具体属性和方法介绍参见 《URLSearchParams》一章。
    >
    > ```js
    > const url = new URL('http://example.com/path?a=1&b=2');
    > 
    > url.searchParams.get('a') // 1
    > url.searchParams.get('b') // 2
    > 
    > for (const [k, v] of url.searchParams) {
    >   console.log(k, v);
    > }
    > // a 1
    > // b 2
    > ```

  - #### 静态方法

    - ##### `URL.createObjectURL()`

      > `URL.createObjectURL()`方法用来为文件数据生成一个临时网址（URL 字符串），供那些需要网址作为参数的方法使用。该方法的参数必须是 Blob 类型（即代表文件的二进制数据）。
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
      > const div = document.getElementById('display');
      > 
      > function handleFiles(files) {
      >   for (let i = 0; i < files.length; i++) {
      >     let img = document.createElement('img');
      >     img.src = window.URL.createObjectURL(files[i]);
      >     div.appendChild(img);
      >   }
      > }
      > ```
      >
      > 上面示例中，`URL.createObjectURL()`方法用来为上传的文件生成一个临时网址，作为`<img>`元素的图片来源。
      >
      > 该方法生成的 URL 就像下面的样子。
      >
      > ```
      > blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1
      > ```
      >
      > 注意，每次使用`URL.createObjectURL()`方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的临时网址，为了节省内存，可以使用`URL.revokeObjectURL()`方法释放这个实例。
      >
      > 下面是生成 Worker 进程的一个示例。
      >
      > ```html
      > <script id='code' type='text/plain'>
      >   postMessage('foo');
      > </script>
      > <script>
      >   var code = document.getElementById('code').textContent;
      >   var blob = new Blob([code], { type: 'application/javascript' });
      >   var url = URL.createObjectURL(blob);
      >   var worker = new Worker(url);
      >   URL.revokeObjectURL(url);
      > 
      >   worker.onmessage = function(e) {
      >     console.log('worker returned: ', e.data);
      >   };
      > </script>
      > ```

    - ##### `URL.revokeObjectURL()`

      > `URL.revokeObjectURL()`方法用来释放`URL.createObjectURL()`生成的临时网址。它的参数就是`URL.createObjectURL()`方法返回的 URL 字符串。
      >
      > 下面为上一小节的示例加上`URL.revokeObjectURL()`。
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
      > 上面代码中，一旦图片加载成功以后，为本地文件生成的临时网址就没用了，于是可以在`img.onload`回调函数里面，通过`URL.revokeObjectURL()`方法释放资源。

    - ##### `URL.canParse()`

      > `URL()`构造函数解析非法网址时，会抛出错误，必须用`try...catch`代码块处理，这样终究不是非常方便。因此，URL 对象又引入了`URL.canParse()`方法，它返回一个布尔值，表示当前字符串是否为有效网址。
      >
      > ```
      > URL.canParse(url)
      > URL.canParse(url, base)
      > ```
      >
      > `URL.canParse()`可以接受两个参数。
      >
      > - `url`：字符串或者对象（比如`<a>`元素的 DOM 对象），表示 URL。
      > - `base`：字符串或者 URL 实例对象，表示 URL 的基准位置。它是可选参数，当第一个参数`url`为相对 URL 时，会使用这个参数，计算出完整的 URL，再进行判断。
      >
      > ```
      > URL.canParse("https://developer.mozilla.org/") // true
      > URL.canParse("/en-US/docs") // false
      > URL.canParse("/en-US/docs", "https://developer.mozilla.org/") // true
      > ```
      >
      > 上面示例中，如果第一个参数是相对 URL，这时必须要有第二个参数，否则返回`false`。
      >
      > 下面的示例是第二个参数为 URL 实例对象。
      >
      > ```
      > let baseUrl = new URL("https://developer.mozilla.org/");
      > let url = "/en-US/docs";
      > 
      > URL.canParse(url, baseUrl) // true
      > ```
      >
      > 该方法内部使用`URL()`构造方法相同的解析算法，因此可以用`URL()`构造方法代替。
      >
      > ```
      > function isUrlValid(string) {
      >   try {
      >     new URL(string);
      >     return true;
      >   } catch (err) {
      >     return false;
      >   }
      > }
      > ```
      >
      > 上面示例中，给出了`URL.canParse()`的替代实现`isUrlValid()`。

    - ##### `URL.parse()`

      > `URL.parse()`是一个新添加的方法，Chromium 126 和 Firefox 126 开始支持。
      >
      > 它的主要目的就是，改变`URL()`构造函数解析非法网址抛错的问题。这个新方法不会抛错，如果参数是有效网址，则返回 URL 实例对象，否则返回`null`。
      >
      > ```
      > const urlstring = "this is not a URL";
      > 
      > const not_a_url = URL.parse(urlstring); // null
      > ```
      >
      > 上面示例中，`URL.parse()`的参数不是有效网址，所以返回`null`。

  - #### 实例方法

    - ##### `toString()`

      > URL 实例对象的`toString()`返回`URL.href`属性，即整个网址。

- ## URL Pattern API

  - #### 简介

    > URL Pattern API 基于正则表达式和通配符，对 URL 进行匹配和解析。
    >
    > 它提供一个构造函数`URLPattern()`，用于新建一个 URL 模式实例。
    >
    > ```
    > const pattern = new URLPattern(input);
    > ```
    >
    > 有了模式实例，就可以知道某个 URL 是否符合该模式。
    >
    > ```
    > const pattern = new URLPattern({ pathname: "/books" });
    > console.log(pattern.test("https://example.com/books")); // true
    > ```
    >
    > 上面示例中，模式实例是 包含`/books`路径的 URL，实例方法`test()`用来检测指定网址是否符合该模式，结果为`true`。
    >
    > URL Pattern 支持多种协议，不仅是 HTTP 协议。
    >
    > ```
    > const pattern = new URLPattern("data\\:foo*");
    > ```
    >
    > 上面示例中，URL Pattern 新建了一个 Data 协议的模式。

  - #### 构造函数 `URLPattern()`

    - ##### 基本用法

      > 构造函数`URLPattern()`用于新建一个 URL 模式实例。
      >
      > ```
      > const pattern = new URLPattern(input);
      > ```
      >
      > 该构造函数的参数`input`是一个模式字符串或者模式对象。
      >
      > ```
      > new URLPattern("https://example.com/books/:id")
      > // {
      > //   hasRegExpGroups: false,
      > //   hash: "*",
      > //   hostname: "example.com",
      > //   password: "*",
      > //   pathname: "/books/:id",
      > //   port: "",
      > //   protocol: "https",
      > //   search: "*",
      > //   username: "*",
      > //   ...
      > // }
      > ```
      >
      > 上面示例中，参数`https://example.com/books/:id`就是一个模式字符串，执行后返回一个 URLPattern 实例对象，包含模式的各个组成部分。
      >
      > 参数`input`也可以写成一个对象，用属性指定模式 URL 的每个部分。也就是说，模式对象可以有以下属性。
      >
      > - protocol
      > - username
      > - password
      > - hostname
      > - port
      > - pathname
      > - search
      > - hash
      > - baseURL
      >
      > 上面的示例，如果参数改成模式对象，就是下面这样。
      >
      > ```
      > new URLPattern({
      >   protocol: 'https',
      >   hostname: 'example.com',
      >   pathname: '/books/:id',
      > })
      > ```
      >
      > 模式字符串或者模式对象之中，没有定义的部分，默认为`*`，表示所有可能的字符，包括零字符的情况。
      >
      > `URLPattern()`正常情况下将返回一个 URLPattern 实例对象，但是遇到参数无效或语法不正确，则会报错。
      >
      > ```
      > new URLPattern(123) // 报错
      > ```
      >
      > 上面示例中，参数`123`不是一个有效的 URL 模式，就报错了。
      >
      > 需要注意的是，如果模式字符串为相对路径，那么`URLPattern()`还需要第二个参数，用来指定基准 URL。
      >
      > ```
      > new URLPattern(input, baseURL)
      > ```
      >
      > 上面代码中，第二个参数`baseURL`就是基准 URL。
      >
      > ```
      > new URLPattern('/books/:id') // 报错
      > new URLPattern('/books/:id', 'https://example.com') // 正确
      > ```
      >
      > 上面示例中，第一个参数`/books/:id`是一个相对路径，这时就需要第二个参数`https://example.com`，用来指定基准 URL，否则报错。
      >
      > 但是，如果参数为模式对象，则可以只指定 URL 模式的某个部分。
      >
      > ```
      > new URLPattern({
      >   pathname: '/books/:id'
      > }) // 正确
      > ```
      >
      > 上面示例中，参数是一个模式对象，那么参数允许只指定 URL 的部分模式。
      >
      > 模式对象里面，也可以指定基准 URL。
      >
      > ```
      > let pattern4 = new URLPattern({
      >   pathname: "/books/:id",
      >   baseURL: "https://example.com",
      > });
      > ```
      >
      > 基准 URL 必须是合法的 URL，不能包含模式。
      >
      > 注意，如果用了模式对象，就不能使用基准 URL 作为第二个参数，这样会报错。
      >
      > ```
      > new URLPattern({ pathname: "/foo/bar" }, "https://example.com") // 报错
      > new URLPattern({ pathname: "/foo/bar" }, "https://example.com/baz") // 报错
      > ```
      >
      > 上面示例中，同时使用了模式对象和第二个参数，结果就报错了。
      >
      > `URLpattern()`还可以加入配置对象参数，用于定制匹配行为。
      >
      > ```
      > new URLPattern(input, options)
      > new URLPattern(input, baseURL, options)
      > ```
      >
      > 上面代码中，参数`options`就是一个配置对象。
      >
      > 目前，这个配置对象`options`只有`ignoreCase`一个属性，如果设为`true`，将不区分大小写，默认值为`false`，表示区分大小写。
      >
      > ```
      > new URLPattern(input, {
      >   ignoreCase: false // 默认值，区分大小写
      > })
      > ```
      >
      > 请看下面的例子。
      >
      > ```
      > const pattern = new URLPattern("https://example.com/2022/feb/*");
      > 
      > pattern.test("https://example.com/2022/feb/xc44rsz") // true
      > pattern.test("https://example.com/2022/Feb/xc44rsz") // false
      > ```
      >
      > 上面示例，默认匹配时，会区分`feb`和`Feb`。
      >
      > 我们可以用`ignoreCase`将其关闭。
      >
      > ```js
      > const pattern = new URLPattern(
      >   "https://example.com/2022/feb/*",
      >   {  ignoreCase: true, }
      > );
      > 
      > pattern.test("https://example.com/2022/feb/xc44rsz") // true
      > pattern.test("https://example.com/2022/Feb/xc44rsz") // true
      > ```

    - ##### 模式写法

      > 模式字符串基本上采用正则表达式的写法，但是不是所有的正则语法都支持，比如先行断言和后行断言就不支持。
      >
      > （1）普通字符
      >
      > 如果都是普通字符，就表示原样匹配。
      >
      > ```
      > const p = new URLPattern('https://example.com/abc');
      > ```
      >
      > 上面代码就表示确切匹配路径`https://example.com/abc`。
      >
      > ```
      > p.test('https://example.com') // false
      > p.test('https://example.com/a') //false
      > p.test('https://example.com/abc') // true
      > p.test('https://example.com/abcd') //false
      > p.test('https://example.com/abc/') //false
      > p.test('https://example.com/abc?123') //true
      > ```
      >
      > 上面示例中，URL 必须严格匹配路径`https://example.com/abc`，即使尾部多一个斜杠都不行，但是加上查询字符串是可以的。
      >
      > （2）`?`
      >
      > 量词字符`?`表示前面的字符串，可以出现0次或1次，即该部分可选。
      >
      > ```
      > let pattern = new URLPattern({
      >   protocol: "http{s}?",
      > });
      > ```
      >
      > 上面示例中，`{s}?`表示字符组`s`可以出现0次或1次。
      >
      > `?`不包括路径的分隔符`/`。
      >
      > ```
      > const pattern = new URLPattern("/books/:id?", "https://example.com");
      > 
      > pattern.test("https://example.com/books/123") // true
      > pattern.test("https://example.com/books") // true
      > pattern.test("https://example.com/books/") // false
      > pattern.test("https://example.com/books/123/456") // false
      > pattern.test("https://example.com/books/123/456/789") // false
      > pattern.test("https://example.com/books/123/456/") // false
      > ```
      >
      > 上面示例中，`?`不能匹配网址结尾的斜杠。
      >
      > 如果一定要匹配，可以把结尾的斜杠放在`{}`里面。
      >
      > ```
      > const pattern = new URLPattern({ pathname: "/product{/}?" });
      > 
      > pattern.test({ pathname: "/product" }) // true
      > pattern.test({ pathname: "/product/" }) // true
      > ```
      >
      > 上面示例中，不管网址有没有结尾的斜杠，`{/}?`都会成功匹配。
      >
      > （3）`+`
      >
      > 量词字符`+`表示前面的字符串出现1次或多次。
      >
      > ```
      > const pattern = new URLPattern({
      >   pathname: "/books/(\\d+)",
      > })
      > ```
      >
      > 上面示例中，`\\d+`表示1个或多个数字，其中的`\d`是一个内置的字符类，表示0-9的数字，因为放在双引号里面，所以反斜杠前面还要再加一个反斜杠进行转义。
      >
      > `+`可以包括`/`分隔的路径的多个部分，但不包括路径结尾的斜杠。
      >
      > ```
      > const pattern = new URLPattern("/books/:id+", "https://example.com");
      > 
      > pattern.test("https://example.com/books/123") // true
      > pattern.test("https://example.com/books") // false
      > pattern.test("https://example.com/books/") // false
      > pattern.test("https://example.com/books/123/456") // true
      > pattern.test("https://example.com/books/123/456/789") // true
      > pattern.test("https://example.com/books/123/456/") // false
      > ```
      >
      > （4）`*`
      >
      > 量词字符`*`表示出现零次或多次。
      >
      > ```
      > const pattern = new URLPattern('https://example.com/{abc}*');
      > 
      > pattern.test('https://example.com') // true
      > pattern.test('https://example.com/') // true
      > pattern.test('https://example.com/abc') // true
      > pattern.test('https://example.com/abc/') // false
      > pattern.test('https://example.com/ab') // false
      > pattern.test('https://example.com/abcabc') // true
      > pattern.test('https://example.com/abc/abc/abc') // false
      > ```
      >
      > 上面示例中，`{abc}*`表示`abc`出现零次或多次，也不包括路径分隔符`/`。
      >
      > 如果`*`前面没有任何字符，就表示所有字符，包括零字符的情况，也包括分隔符`/`。
      >
      > ```
      > let pattern = new URLPattern({
      >   search: "*",
      >   hash: "*",
      > });
      > ```
      >
      > 上面示例中，`*`表示匹配所有字符，包括零字符。
      >
      > 下面是另一个例子。
      >
      > ```
      > const pattern = new URLPattern("/*.png", "https://example.com");
      > 
      > pattern.test("https://example.com/image.png") // true
      > pattern.test("https://example.com/image.png/123") // false
      > pattern.test("https://example.com/folder/image.png") // true
      > pattern.test("https://example.com/.png") // true
      > ```
      >
      > `*`匹配的部分可以从对应部分的数字属性上获取。
      >
      > ```
      > const pattern = new URLPattern({
      >   hostname: "example.com",
      >   pathname: "/foo/*"
      > });
      > 
      > const result = pattern.exec("/foo/bar", "https://example.com/baz");
      > 
      > result.pathname.input // '/foo/bar'
      > result.pathname.groups[0] // 'bar'
      > ```
      >
      > 上面示例中，`*`的匹配结果可以从`pathname.groups[0]`获取。
      >
      > ```
      > const pattern = new URLPattern({ hostname: "*.example.com" });
      > const result = pattern.exec({ hostname: "cdn.example.com" });
      > 
      > result.hostname.groups[0] // 'cdn'
      > result.hostname.input // 'cdn.example.com'
      > ```
      >
      > 上面示例中，`*`的匹配结果可以从`hostname.groups[0]`获取。
      >
      > （5）`{}`
      >
      > 特殊字符`{}`用来定义量词`?`、`+`、`+`的生效范围。
      >
      > 如果`{}`后面没有量词，那就跟没有使用的效果一样。
      >
      > ```
      > const pattern = new URLPattern('https://example.com/{abc}');
      > 
      > pattern.test('https://example.com/') // false
      > pattern.test('https://example.com/abc') // true
      > ```
      >
      > （6）`()`
      >
      > 特殊字符`()`用来定义一个组匹配，匹配结果可以按照出现顺序的编号，从`pathname.groups`对象上获取。
      >
      > ```
      > const pattern = new URLPattern("/books/(\\d+)", "https://example.com");
      > pattern.exec("https://example.com/books/123").pathname.groups
      > // { '0': '123' }
      > ```
      >
      > 上面示例中，`(\\d+)`是一个组匹配，因为它是第一个组匹配，所以匹配结果放在`pathname.groups`的属性`0`。
      >
      > （7）`|`
      >
      > 特殊字符`|`表示左右两侧的字符，都可以出现，即表示逻辑`OR`。
      >
      > ```
      > let pattern = new URLPattern({
      >   port: "(80|443)",
      > });
      > ```
      >
      > 上面示例中，`(80|443)`表示80或者443都可以。
      >
      > （8）`:`
      >
      > 特殊字符`:`用来定义一个具名组匹配，后面跟着变量名。
      >
      > ```
      > let pattern = new URLPattern({
      >   pathname: "/:path",
      > });
      > ```
      >
      > 上面示例中，`/:path`表示斜杠后面的部分，都被捕捉放入变量`path`，可以从匹配结果的`pathname.groups`上的对应属性获取。
      >
      > ```
      > const pattern = new URLPattern({ pathname: "/books/:id" });
      > 
      > pattern.exec("https://example.com/books/123").pathname.groups
      > // { id: '123' }
      > ```
      >
      > 上面示例中，`pathname.groups`返回一个对象，该对象的属性就是所有捕捉成功的组变量，上例是`id`。
      >
      > 下面是另一个例子。
      >
      > ```
      > const pattern = new URLPattern({ pathname: "/:product/:user/:action" });
      > const result = pattern.exec({ pathname: "/store/wanderview/view" });
      > 
      > result.pathname.groups.product // 'store'
      > result.pathname.groups.user // 'wanderview'
      > result.pathname.groups.action // 'view'
      > result.pathname.input // '/store/wanderview/view'
      > ```
      >
      > 上面示例中，`:product`、`:user`、`:action`的匹配结果，都可以从`pathname.groups`的对应属性上获取。
      >
      > 组匹配可以放在模式的前面。
      >
      > ```
      > const pattern = new URLPattern(
      >   "/books/:id(\\d+)",
      >   "https://example.com"
      > );
      > ```
      >
      > 上面示例中，组匹配`:id`后面跟着模型定义`\\d+`，模式需要放在括号里面。
      >
      > **（9）特殊字符转义**
      >
      > 如果要将特殊字符当作普通字符使用，必须在其前面加入双重反斜杠进行转义。
      >
      > ```
      > let pattern1 = new URLPattern({
      >   pathname: "/a:b",
      > });
      > 
      > let pattern2 = new URLPattern({
      >   pathname: "/a\\:b",
      > });
      > ```
      >
      > 上面示例中，`a:b`表示路径以字符`a`开头，后面的部分都放入变量`b`。而`a\\:b`表示路径本身就是`a:b`就是。

  - #### 实例属性

    > URLPattern 实例的属性对应`URLPattern()`模式对象参数的各个部分。
    >
    > ```
    > const pattern = new URLPattern({
    >   hostname: "{*.}?example.com",
    > });
    > 
    > pattern.hostname // '{*.}?example.com'
    > pattern.protocol // '*'
    > pattern.username // '*'
    > pattern.password // '*'
    > pattern.port // ""
    > pattern.pathname // '*'
    > pattern.search // '*'
    > pattern.hash // '*'
    > ```
    >
    > 上面示例中，`pattern`是一个实例对象，它的属性与`URLPattern()`的参数对象的属性一致。
    >
    > 注意，`search`不包括开头的`?`，`hash`不包括开头的`#`，但是`pathname`包括开头的`/`。
    >
    > 下面是另一个例子。
    >
    > ```js
    > const pattern = new URLPattern("https://cdn-*.example.com/*.jpg");
    > 
    > pattern.protocol // 'https'
    > pattern.hostname // 'cdn-*.example.com'
    > pattern.pathname // '/*.jpg'
    > pattern.username // ''
    > pattern.password // ''
    > pattern.search // ''
    > pattern.hash // ''
    > ```

  - #### 实例方法

    - ##### `exec()`

      > 实例的`exec()`方法，把模式用于解析参数网址，返回匹配结果。
      >
      > `exec()`方法的参数与`new URLPattern()`是一致的。它可以是一个 URL 字符串。
      >
      > ```
      > pattern.exec("https://store.example.com/books/123");
      > ```
      >
      > 如果第一个参数是相对 URL，那么需要基准 URL，作为第二个参数。
      >
      > ```
      > pattern.exec("/foo/bar", "https://example.com/baz");
      > ```
      >
      > `exec()`方法的参数，也可以是一个对象。
      >
      > ```
      > pattern.exec({
      >   protocol: "https",
      >   hostname: "store.example.com",
      >   pathname: "/books/123",
      > });
      > ```
      >
      > 如果匹配成功，它返回一个包括匹配结果的对象。如果匹配失败，返回`null`。
      >
      > ```
      > const pattern = new URLPattern("http{s}?://*.example.com/books/:id");
      > pattern.exec("https://example.com/books/123") // null
      > ```
      >
      > 上面示例中，匹配失败返回`null`。
      >
      > 匹配成功返回的对象，有一个`inputs`属性，包含传入`pattern.exec()`的参数数组。其他属性的值也是一个对象，该对象的`input`属性对应传入值，`groups`属性包含各个组匹配。
      >
      > ```js
      > const pattern = new URLPattern("http{s}?://*.example.com/books/:id");
      > let match = pattern.exec("https://store.example.com/books/123");
      > 
      > match.inputs // ['https://store.example.com/books/123']
      > match.protocol // { input: "https", groups: {} }
      > match.username // { input: "", groups: {} }
      > match.password // { input: "", groups: {} }
      > match.hostname // { input: "store.example.com", groups: { "0": "store" } }
      > match.port // { input: "", groups: {} }
      > match.pathname // { input: "/books/123", groups: { "id": "123" } }
      > match.search // { input: "", groups: {} }
      > match.hash // { input: "", groups: {} }
      > ```

    - ##### `test()`

      > 实例的`test()`方法，用来检测参数网址是否符合当前模式。
      >
      > 它的参数跟`URLPattern()`是一样的，可以是模式字符串，也可以是模式对象。
      >
      > ```
      > const pattern = new URLPattern({
      >   hostname: "example.com",
      >   pathname: "/foo/*"
      >  });
      > 
      > pattern.test({
      >   pathname: "/foo/bar",
      >   baseURL: "https://example.com/baz",
      > }) // true
      > 
      > pattern.test("/foo/bar", "https://example.com/baz") // true
      > ```
      >
      > 正常情况下，它返回一个布尔值。但是，如果语法不合法，它也会抛错。
      >
      > ```js
      > pattern.test({ pathname: "/foo/bar" }, "https://example.com/baz") // 报错
      > ```

- ## `URLSearchParams` 对象

  - #### 简介

    > URLSearchParams 对象表示 URL 的查询字符串（比如`?foo=bar`）。它提供一系列方法，用来操作这些键值对。URL 实例对象的`searchParams`属性，就是指向一个 URLSearchParams 实例对象。
    >
    > URLSearchParams 实例对象可以用`for...of`进行遍历。
    >
    > ```js
    > for (const [key, value] of mySearchParams) {}
    > ```

  - #### 构造方法

    > URLSearchParams 可以作为构造函数使用，生成一个实例对象。
    >
    > ```
    > const params = new URLSearchParams();
    > ```
    >
    > 它可以接受一个查询字符串作为参数，将其转成对应的实例对象。
    >
    > ```
    > const params = new URLSearchParams('?a=1&b=2');
    > ```
    >
    > 注意，它最多只能去除查询字符串的开头问号`?`，并不能解析完整的网址字符串。
    >
    > ```
    > const paramsString = "http://example.com/search?query=%40";
    > const params = new URLSearchParams(paramsString);
    > ```
    >
    > 上面示例中，URLSearchParams 会认为键名是`http://example.com/search?query`，而不是`query`。
    >
    > 它也可以接受表示键值对的对象或数组作为参数。
    >
    > ```
    > // 参数为数组
    > const params3 = new URLSearchParams([
    >   ["foo", "1"],
    >   ["bar", "2"],
    > ]);
    > 
    > // 参数为对象
    > const params1 = new URLSearchParams({ foo: "1", bar: "2" });
    > ```
    >
    > 浏览器向服务器发送表单数据时，可以直接使用 URLSearchParams 实例作为表单数据。
    >
    > ```
    > const params = new URLSearchParams({foo: 1, bar: 2});
    > fetch('https://example.com/api', {
    >   method: 'POST',
    >   body: params
    > }).then(...)
    > ```
    >
    > 上面示例中，fetch 向服务器发送命令时，可以直接使用 URLSearchParams 实例对象作为数据体。
    >
    > 它还可以接受另一个 URLSearchParams 实例对象作为参数，等于复制了该对象。
    >
    > ```
    > const params1 = new URLSearchParams('?a=1&b=2');
    > const params2 = new URLSearchParams(params1);
    > ```
    >
    > 上面示例中，`params1`和`params2`是两个一模一样的实例对象，但是修改其中一个，不会影响到另一个。
    >
    > URLSearchParams会对查询字符串自动编码。
    >
    > ```
    > const params = new URLSearchParams({'foo': '你好'});
    > params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
    > ```
    >
    > 上面示例中，`foo`的值是汉字，URLSearchParams 对其自动进行 URL 编码。
    >
    > 键名可以没有键值，这时 URLSearchParams 会认为键值等于空字符串。
    >
    > ```
    > const params1 = new URLSearchParams("foo&bar=baz");
    > const params2 = new URLSearchParams("foo=&bar=baz");
    > ```
    >
    > 上面示例中，`foo`是一个空键名，不管它后面有没有等号，URLSearchParams 都会认为它的值是一个空字符串。

  - #### 实例方法

    - ##### `append()`

      > `append()`用来添加一个查询键值对。如果同名的键值对已经存在，它依然会将新的键值对添加到查询字符串的末尾。
      >
      > 它的第一个参数是键名，第二个参数是键值，下面是用法示例。
      >
      > ```
      > const params = new URLSearchParams('?a=1&b=2');
      > 
      > params.append('a', 3);
      > params.toString() // 'a=1&b=2&a=3'
      > ```
      >
      > 上面示例中，键名`a`已经存在，但是`append()`依然会将`a=3`添加在查询字符串的末尾。

    - ##### `delete()`

      > `delete()`删除给定名字的键值对。

    - ##### `get()`

      > `get()`返回指定键名所对应的键值。如果存在多个同名键值对，它只返回第一个键值。
      >
      > ```
      > const params = new URLSearchParams('?a=1&b=2');
      > params.get('a') // 1
      > ```
      >
      > 对于不存在的键名，它会返回`null`。
      >
      > 注意，`get()`会将键值里面的加号转为空格。
      >
      > ```
      > const params = new URLSearchParams(`c=a+b`);
      > params.get('c') // 'a b'
      > ```
      >
      > 上面示例中，`get()`将`a+b`转为`a b`。如果希望避免这种行为，可以先用`encodeURIComponent()`对键值进行转义。

    - ##### `getAll()`

      > `getAll()`返回一个数组，里面是指定键名所对应的所有键值。
      >
      > ```js
      > const params = new URLSearchParams('?a=1&b=2&a=3');
      > params.getAll('a') // [ '1', '3' ]
      > ```

    - ##### `has()`

      > `has()`返回一个布尔值，表示指定键名是否存在。
      >
      > ```js
      > const params = new URLSearchParams('?a=1&b=2');
      > params.has('a') // true
      > params.has('c') // false
      > ```

    - ##### `set()`

      > `set()`用来设置一个键值对。如果相同键名已经存在，则会替换当前值，这是它与`append()`的不同之处。该方法适合用来修改查询字符串。
      >
      > ```
      > const params = new URLSearchParams('?a=1&b=2');
      > params.set('a', 3);
      > params.toString() // 'a=3&b=2'
      > ```
      >
      > 上面示例中，`set()`修改了键`a`。
      >
      > 如果有多个的同名键，`set()`会移除现存所有的键，再添加新的键值对。
      >
      > ```
      > const params = new URLSearchParams('?foo=1&foo=2');
      > params.set('foo', 3);
      > params.toString() // "foo=3"
      > ```
      >
      > 上面示例中，有两个`foo`键，`set()`会将它们都删掉，再添加一个新的`foo`键。

    - ##### `sort()`

      > `sort()`按照键名（以 Unicode 码点为序）对键值对排序。如果有同名键值对，它们的顺序不变。
      >
      > ```js
      > const params = new URLSearchParams('?a=1&b=2&a=3');
      > params.sort();
      > params.toString() // 'a=1&a=3&b=2'
      > ```

    - ##### `entries()`

      > `entries()`方法返回一个 iterator 对象，用来遍历键名和键值。
      >
      > ```
      > const params = new URLSearchParams("key1=value1&key2=value2");
      > 
      > for (const [key, value] of params.entries()) {
      >   console.log(`${key}, ${value}`);
      > }
      > // key1, value1
      > // key2, value2
      > ```
      >
      > 如果直接对 URLSearchParams 实例进行`for...of`遍历，其实内部调用的就是`entries`接口。
      >
      > ```js
      > for (var p of params) {}
      > // 等同于
      > for (var p of params.entries()) {}
      > ```

    - ##### `forEach()`

      > `forEach()`用来依次对每个键值对执行一个回调函数。
      >
      > 它接受两个参数，第一个参数`callback`是回调函数，第二个参数`thisArg`是可选的，用来设置`callback`里面的`this`对象。
      >
      > ```
      > forEach(callback)
      > forEach(callback, thisArg)
      > ```
      >
      > `callback`函数可以接收到以下三个参数。
      >
      > - value：当前键值。
      > - key：当前键名。
      > - searchParams：当前的 URLSearchParams 实例对象。
      >
      > 下面是用法示例。
      >
      > ```js
      > const params = new URLSearchParams("key1=value1&key2=value2");
      > 
      > params.forEach((value, key) => {
      >   console.log(value, key);
      > });
      > // value1 key1
      > // value2 key2
      > ```

    - ##### `keys()`

      > `keys()`返回一个 iterator 对象，用来遍历所有键名。
      >
      > ```js
      > const params = new URLSearchParams("key1=value1&key2=value2");
      > 
      > for (const key of params.keys()) {
      >   console.log(key);
      > }
      > // key1
      > // key2
      > ```

    - ##### `values()`

      > `values()`返回一个 iterator 对象，用来遍历所有键值。
      >
      > ```
      > const params = new URLSearchParams("key1=value1&key2=value2");
      > 
      > for (const value of params.values()) {
      >   console.log(value);
      > }
      > // value1
      > // value2
      > ```
      >
      > 这个方法也可以用来将所有键值，转成一个数组。
      >
      > ```js
      > Array.from(params.values()) // ['value1', 'value2']
      > ```

    - ##### `toString()`

      > `toString()`用来将 URLSearchParams 实例对象转成一个字符串。它返回的字符串不带问号，这一点与`window.location.search`不同。

  - #### 实例属性

    - ##### `size`

      > `size`是一个只读属性，返回键值对的总数。
      >
      > ```
      > const params = new URLSearchParams("c=4&a=2&b=3&a=1");
      > params.size; // 4
      > ```
      >
      > 上面示例中，键名`a`在查询字符串里面有两个，`size`不会将它们合并。
      >
      > 如果想统计不重复的键名，可以将使用 Set 结构。
      >
      > ```
      > [...new Set(params.keys())].length // 3
      > ```
      >
      > `size`属性可以用来判别，某个网址是否有查询字符串。
      >
      > ```js
      > const url = new URL("https://example.com?foo=1&bar=2");
      > 
      > if (url.searchParams.size) {
      >   console.log("该 URL 有查询字符串");
      > }
      > ```

- ## WebSocket

  > WebSocket 是一种网络通信协议，很多高级功能都需要它。
  >
  > 初次接触 WebSocket 的人，都会问同样的问题：我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？
  >
  > 答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。HTTP 协议的这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用“轮询”：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。
  >
  > 轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

  - #### 简介

    > WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。
    >
    > 它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。WebSocket 允许服务器端与客户端进行全双工（full-duplex）的通信。举例来说，HTTP 协议有点像发电子邮件，发出后必须等待对方回信；WebSocket 则是像打电话，服务器端和客户端可以同时向对方发送数据，它们之间存着一条持续打开的数据通道。
    >
    > 其他特点包括：
    >
    > （1）建立在 TCP 协议之上，服务器端的实现比较容易。
    >
    > （2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
    >
    > （3）数据格式比较轻量，性能开销小，通信高效。
    >
    > （4）可以发送文本，也可以发送二进制数据。
    >
    > （5）没有同源限制，客户端可以与任意服务器通信，完全可以取代 Ajax。
    >
    > （6）协议标识符是`ws`（如果加密，则为`wss`，对应 HTTPS 协议），服务器网址就是 URL。
    >
    > ```url
    > ws://example.com:80/some/path
    > ```

  - #### WebSocket 握手

    > 浏览器发出的 WebSocket 握手请求类似于下面的样子：
    >
    > ```
    > GET / HTTP/1.1
    > Connection: Upgrade
    > Upgrade: websocket
    > Host: example.com
    > Origin: null
    > Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
    > Sec-WebSocket-Version: 13
    > ```
    >
    > 上面的头信息之中，有一个 HTTP 头是`Upgrade`。HTTP1.1 协议规定，`Upgrade`字段表示将通信协议从`HTTP/1.1`转向该字段指定的协议。`Connection`字段表示浏览器通知服务器，如果可以的话，就升级到 WebSocket 协议。`Origin`字段用于提供请求发出的域名，供服务器验证是否许可的范围内（服务器也可以不验证）。`Sec-WebSocket-Key`则是用于握手协议的密钥，是 Base64 编码的16字节随机字符串。
    >
    > 服务器的 WebSocket 回应如下。
    >
    > ```
    > HTTP/1.1 101 Switching Protocols
    > Connection: Upgrade
    > Upgrade: websocket
    > Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
    > Sec-WebSocket-Origin: null
    > Sec-WebSocket-Location: ws://example.com/
    > ```
    >
    > 上面代码中，服务器同样用`Connection`字段通知浏览器，需要改变协议。`Sec-WebSocket-Accept`字段是服务器在浏览器提供的`Sec-WebSocket-Key`字符串后面，添加 [RFC6456](http://tools.ietf.org/html/rfc6455) 标准规定的“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”字符串，然后再取 SHA-1 的哈希值。浏览器将对这个值进行验证，以证明确实是目标服务器回应了 WebSocket 请求。`Sec-WebSocket-Location`字段表示进行通信的 WebSocket 网址。
    >
    > 完成握手以后，WebSocket 协议就在 TCP 协议之上，开始传送数据。

  - #### 客户端的简单示例

    > WebSocket 的用法相当简单。
    >
    > 下面是一个网页脚本的例子，基本上一眼就能明白。
    >
    > ```js
    > var ws = new WebSocket('wss://echo.websocket.org');
    > 
    > ws.onopen = function(evt) {
    >   console.log('Connection open ...');
    >   ws.send('Hello WebSockets!');
    > };
    > 
    > ws.onmessage = function(evt) {
    >   console.log('Received Message: ' + evt.data);
    >   ws.close();
    > };
    > 
    > ws.onclose = function(evt) {
    >   console.log('Connection closed.');
    > };
    > ```

  - #### 客户端 API

    > 浏览器对 WebSocket 协议的处理，无非就是三件事：
    >
    > - 建立连接和断开连接
    > - 发送数据和接收数据
    > - 处理错误

    - ##### 构造函数 `WebSocket`

      > `WebSocket`对象作为一个构造函数，用于新建`WebSocket`实例。
      >
      > ```js
      > var ws = new WebSocket('ws://localhost:8080');
      > ```
      >
      > 执行上面语句之后，客户端就会与服务器进行连接。

    - ##### `webSocket.readyState`

      > `readyState`属性返回实例对象的当前状态，共有四种。
      >
      > - CONNECTING：值为0，表示正在连接。
      > - OPEN：值为1，表示连接成功，可以通信了。
      > - CLOSING：值为2，表示连接正在关闭。
      > - CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
      >
      > 下面是一个示例。
      >
      > ```js
      > switch (ws.readyState) {
      >   case WebSocket.CONNECTING:
      >     // do something
      >     break;
      >   case WebSocket.OPEN:
      >     // do something
      >     break;
      >   case WebSocket.CLOSING:
      >     // do something
      >     break;
      >   case WebSocket.CLOSED:
      >     // do something
      >     break;
      >   default:
      >     // this never happens
      >     break;
      > }
      > ```

    - ##### `webSocket.onopen`

      > 实例对象的`onopen`属性，用于指定连接成功后的回调函数。
      >
      > ```
      > ws.onopen = function () {
      >   ws.send('Hello Server!');
      > }
      > ```
      >
      > 如果要指定多个回调函数，可以使用`addEventListener`方法。
      >
      > ```js
      > ws.addEventListener('open', function (event) {
      >   ws.send('Hello Server!');
      > });
      > ```

    - ##### `webSocket.onclose`

      > 实例对象的`onclose`属性，用于指定连接关闭后的回调函数。
      >
      > ```js
      > ws.onclose = function(event) {
      >   var code = event.code;
      >   var reason = event.reason;
      >   var wasClean = event.wasClean;
      >   // handle close event
      > };
      > 
      > ws.addEventListener("close", function(event) {
      >   var code = event.code;
      >   var reason = event.reason;
      >   var wasClean = event.wasClean;
      >   // handle close event
      > });
      > ```

    - ##### `webSocket.onmessage`

      > 实例对象的`onmessage`属性，用于指定收到服务器数据后的回调函数。
      >
      > ```
      > ws.onmessage = function(event) {
      >   var data = event.data;
      >   // 处理数据
      > };
      > 
      > ws.addEventListener("message", function(event) {
      >   var data = event.data;
      >   // 处理数据
      > });
      > ```
      >
      > 注意，服务器数据可能是文本，也可能是二进制数据（`blob`对象或`Arraybuffer`对象）。
      >
      > ```
      > ws.onmessage = function(event){
      >   if(typeOf event.data === String) {
      >     console.log("Received data string");
      >   }
      > 
      >   if(event.data instanceof ArrayBuffer){
      >     var buffer = event.data;
      >     console.log("Received arraybuffer");
      >   }
      > }
      > ```
      >
      > 除了动态判断收到的数据类型，也可以使用`binaryType`属性，显式指定收到的二进制数据类型。
      >
      > ```js
      > // 收到的是 blob 数据
      > ws.binaryType = "blob";
      > ws.onmessage = function(e) {
      >   console.log(e.data.size);
      > };
      > 
      > // 收到的是 ArrayBuffer 数据
      > ws.binaryType = "arraybuffer";
      > ws.onmessage = function(e) {
      >   console.log(e.data.byteLength);
      > };
      > ```

    - ##### `webSocket.send()`

      > 实例对象的`send()`方法用于向服务器发送数据。
      >
      > 发送文本的例子。
      >
      > ```
      > ws.send('your message');
      > ```
      >
      > 发送 Blob 对象的例子。
      >
      > ```
      > var file = document
      >   .querySelector('input[type="file"]')
      >   .files[0];
      > ws.send(file);
      > ```
      >
      > 发送 ArrayBuffer 对象的例子。
      >
      > ```js
      > // Sending canvas ImageData as ArrayBuffer
      > var img = canvas_context.getImageData(0, 0, 400, 320);
      > var binary = new Uint8Array(img.data.length);
      > for (var i = 0; i < img.data.length; i++) {
      >   binary[i] = img.data[i];
      > }
      > ws.send(binary.buffer);
      > ```

    - ##### `webSocket.bufferedAmount`

      > 实例对象的`bufferedAmount`属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
      >
      > ```js
      > var data = new ArrayBuffer(10000000);
      > socket.send(data);
      > 
      > if (socket.bufferedAmount === 0) {
      >   // 发送完毕
      > } else {
      >   // 发送还没结束
      > }
      > ```

    - ##### `webSocket.onerror`

      > 实例对象的`onerror`属性，用于指定报错时的回调函数。
      >
      > ```js
      > socket.onerror = function(event) {
      >   // handle error event
      > };
      > 
      > socket.addEventListener("error", function(event) {
      >   // handle error event
      > });
      > ```

  - #### WebSocket 服务器

    > WebSocket 协议需要服务器支持。各种服务器的实现，可以查看维基百科的[列表](https://en.wikipedia.org/wiki/Comparison_of_WebSocket_implementations)。
    >
    > 常用的 Node 实现有以下三种。
    >
    > - [µWebSockets](https://github.com/uWebSockets/uWebSockets)
    > - [Socket.IO](http://socket.io/)
    > - [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)
    >
    > 具体的用法请查看它们的文档，本教程不详细介绍了。

- ## Web Share API

  - #### 概述

    > 网页内容如果要分享到其他应用，通常要自己实现分享接口，逐一给出目标应用的连接方式。这样很麻烦，也对网页性能有一定影响。Web Share API 就是为了解决这个问题而提出的，允许网页调用操作系统的分享接口，实质是 Web App 与本机的应用程序交换信息的一种方式。
    >
    > 这个 API 不仅可以改善网页性能，而且不限制分享目标的数量和类型。社交媒体应用、电子邮件、即时消息、以及本地系统安装的、且接受分享的应用，都会出现在系统的分享弹窗，这对手机网页尤其有用。另外，使用这个接口只需要一个分享按钮，而传统的网页分享有多个分享目标，就有多少个分享按钮。
    >
    > 目前，桌面的 Safari 浏览器，手机的安卓 Chrome 浏览器和 iOS Safari 浏览器，支持这个 API。
    >
    > 这个 API 要求网站必须启用 HTTPS 协议，但是本地 Localhost 开发可以使用 HTTP 协议。另外，这个 API 不能直接调用，只能用来响应用户的操作（比如`click`事件）。

  - #### 接口细节

    > 该接口部署在`navigator.share`，可以用下面的代码检查本机是否支持该接口。
    >
    > ```
    > if (navigator.share) {
    >   // 支持
    > } else {
    >   // 不支持
    > }
    > ```
    >
    > `navigator.share`是一个函数方法，接受一个配置对象作为参数。
    >
    > ```
    > navigator.share({
    >   title: 'WebShare API Demo',
    >   url: 'https://codepen.io/ayoisaiah/pen/YbNazJ',
    >   text: '我正在看《Web Share API》'
    > })
    > ```
    >
    > 配置对象有三个属性，都是可选的，但至少必须指定一个。
    >
    > - `title`：分享文档的标题。
    > - `url`：分享的 URL。
    > - `text`：分享的内容。
    >
    > 一般来说，`url`是当前网页的网址，`title`是当前网页的标题，可以采用下面的写法获取。
    >
    > ```
    > const title = document.title;
    > const url = document.querySelector('link[rel=canonical]') ?
    >   document.querySelector('link[rel=canonical]').href :
    >   document.location.href;
    > ```
    >
    > `navigator.share`的返回值是一个 Promise 对象。这个方法调用之后，会立刻弹出系统的分享弹窗，用户操作完毕之后，Promise 对象就会变为`resolved`状态。
    >
    > ```
    > navigator.share({
    >   title: 'WebShare API Demo',
    >   url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
    > }).then(() => {
    >   console.log('Thanks for sharing!');
    > }).catch((error) => {
    >   console.error('Sharing error', error);
    > });
    > ```
    >
    > 由于返回值是 Promise 对象，所以也可以使用`await`命令。
    >
    > ```js
    > shareButton.addEventListener('click', async () => {
    >   try {
    >     await navigator.share({ title: 'Example Page', url: '' });
    >     console.log('Data was shared successfully');
    >   } catch (err) {
    >     console.error('Share failed:', err.message);
    >   }
    > });
    > ```

  - #### 分享文件

    > 这个 API 还可以分享文件，先使用`navigator.canShare()`方法，判断一下目标文件是否可以分享。因为不是所有文件都允许分享的，目前图像，视频，音频和文本文件可以分享2。
    >
    > ```
    > if (navigator.canShare && navigator.canShare({ files: filesArray })) {
    >   // ...
    > }
    > ```
    >
    > 上面代码中，`navigator.canShare()`方法的参数对象，就是`navigator.share()`方法的参数对象。这里的关键是`files`属性，它的值是一个`FileList`实例对象。
    >
    > `navigator.canShare()`方法返回一个布尔值，如果为`true`，就可以使用`navigator.share()`方法分享文件了。
    >
    > ```js
    > if (navigator.canShare && navigator.canShare({ files: filesArray })) {
    >   navigator.share({
    >     files: filesArray,
    >     title: 'Vacation Pictures',
    >     text: 'Photos from September 27 to October 14.',
    >   })
    >   .then(() => console.log('Share was successful.'))
    >   .catch((error) => console.log('Sharing failed', error));
    > }
    > ```

- ## `window.postMessage()` 方法

  - #### 简介

    > `window.postMessage()`用于浏览器不同窗口之间的通信，主要包括 iframe 嵌入窗口和新开窗口两种情况。它不要求两个窗口同源，所以有着广泛的应用。
    >
    > `window.postMessage()`里面的`window`对象，是发送消息的目标窗口。比如，父窗口通过`window.open()`打开子窗口，那么子窗口可以通过`targetWindow = window.opener`获取父窗口。再比如，父窗口通过`iframe`嵌入了子窗口，那么子窗口可以通过`window.parent`获取父窗口。

  - #### 参数和返回值

    > `window.postMessage()`方法有几种使用形式。
    >
    > 最简单的一种就是直接发送消息。
    >
    > ```
    > window.postMessage(message)
    > ```
    >
    > 上面写法中的`message`就是发送的消息，可以是字符串，也可以是对象。如果是对象，浏览器会自动将该对象序列化，以字符串形式发送。
    >
    > 由于`window.postMessage()`可以用于任意两个源（协议+域名+端口）之间的通信，为了减少安全隐患，可以使用第二个参数`targetOrigin`，指定目标窗口的源。
    >
    > ```
    > window.postMessage(message, targetOrigin)
    > ```
    >
    > 上面写法中的`targetOrigin`是一个字符串，表示目标窗口里面的网页的源（origin），比如`https://example.com`。如果对目标窗口不加限制，可以省略这个参数，或者写成`*`。一旦指定了该参数，只有目标窗口符合指定的源（协议+域名+端口），目标窗口才会接收到消息发送事件。
    >
    > `window.postMessage()`还可以指定第三个参数，用于发送一些可传送物体（transferable object），比如 ArrayBuffer 对象。
    >
    > ```
    > window.postMessage(message, targetOrigin, transfer)
    > ```
    >
    > 上面写法中的`transfer`就是可传送物体。该物体一旦发送以后，所有权就转移到了目标窗口，当前窗口将无法再使用该物体。这样的设计是为了发送大量数据时，可以提高效率。
    >
    > `targetOrigin`和`transfer`这两个参数，也可以写在一个对象里面，作为第二个参数。
    >
    > ```
    > window.postMessage(message, { targetOrigin, transfer })
    > ```
    >
    > 下面是一个跟弹出窗口发消息的例子。
    >
    > ```
    > const popup = window.open('http://example.com');
    > popup.postMessage("hello there!", "http://example.com");
    > ```
    >
    > `window.postMessage()`方法没有返回值。

  - #### `message` 事件

    > 当前窗口收到其他窗口发送的消息时，会发生 message 事件。通过监听该事件，可以接收对方发送的消息。
    >
    > ```
    > window.addEventListener(
    >   "message",
    >   (event) => {
    >     if (event.origin !== "http://example.com") return;
    >     // ...
    >   },
    >   false,
    > );
    > ```
    >
    > 事件的监听函数，可以接收到一个 event 参数对象。该对象有如下属性。
    >
    > - data：其他窗口发送的消息。
    > - origin：发送该消息的窗口的源（协议+域名+端口）。
    > - source：发送该消息的窗口对象的引用，使用该属性可以建立双向通信，下面是一个示例。
    >
    > ```js
    > window.addEventListener("message", (event) => {
    >   if (event.origin !== "http://example.com:8080") return;
    >   event.source.postMessage(
    >     "hi there!",
    >     event.origin,
    >   );
    > });
    > ```

  - #### 实例

    > 父页面是`origin1.com`，它打开了子页面`origin2.com`，并向其发送消息。
    >
    > ```js
    > function sendMessage() {
    >   const otherWindow = window.open('https://origin2.com/origin2.html');
    >   const message = 'Hello from Origin 1!';
    >   const targetOrigin = 'https://origin2.com';
    >   otherWindow.postMessage(message, targetOrigin);
    > }
    > ```
    >
    > 子页面`origin2.com`监听父页面发来的消息。
    >
    > ```js
    > window.addEventListener('message', receiveMessage, false);
    > 
    > function receiveMessage(event) {
    >   if (event.origin === 'https://origin1.com') {
    >     console.log('Received message: ' + event.data);
    >   }
    > }
    > ```
    >
    > 下面是 iframe 嵌入窗口向父窗口`origin1.com`发送消息的例子。
    >
    > ```js
    > function sendMessage() {
    >   const message = 'Hello from Child Window!';
    >   window.parent.postMessage(message, 'https://origin1.com');
    > }
    > ```

------

