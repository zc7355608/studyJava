- `<script>`，`<noscript>`

  > `<script>`标签用于在网页插入脚本，`<noscript>`标签用于指定浏览器不支持脚本时的显示内容。
  >
  > ## `<script>`
  >
  > `<script>`用于加载脚本代码，目前主要是加载 JavaScript 代码。
  >
  > ```
  > <script>
  > console.log('hello world');
  > </script>
  > ```
  >
  > 上面代码嵌入网页，会立即执行。
  >
  > `<script>`也可以加载外部脚本，src属性给出外部脚本的地址。
  >
  > ```
  > <script src="javascript.js"></script>
  > ```
  >
  > 上面代码会加载`javascript.js`脚本文件，并执行。
  >
  > `type`属性给出脚本的类型，默认是 JavaScript 代码，所以可省略。完整的写法其实是下面这样。
  >
  > ```
  > <script type="text/javascript" src="javascript.js"></script>
  > ```
  >
  > `type`属性也可以设成`module`，表示这是一个 ES6 模块，不是传统脚本。
  >
  > ```
  > <script type="module" src="main.js"></script>
  > ```
  >
  > 对于那些不支持 ES6 模块的浏览器，可以设置`nomodule`属性。支持 ES6 模块的浏览器，会不加载指定的脚本。这个属性通常与`type="module"`配合使用，作为老式浏览器的回退方案。
  >
  > ```
  > <script type="module" src="main.js"></script>
  > <script nomodule src="fallback.js"></script>
  > ```
  >
  > `<script>`还有下面一些其他属性，大部分跟 JavaScript 语言有关，可以参考相关的 JavaScript 教程。
  >
  > - `async`：该属性指定 JavaScript 代码为异步执行，不是造成阻塞效果，JavaScript 代码默认是同步执行。
  > - `defer`：该属性指定 JavaScript 代码不是立即执行，而是页面解析完成后执行。
  > - `crossorigin`：如果采用这个属性，就会采用跨域的方式加载外部脚本，即 HTTP 请求的头信息会加上`origin`字段。
  > - `integrity`：给出外部脚本的哈希值，防止脚本被篡改。只有哈希值相符的外部脚本，才会执行。
  > - `nonce`：一个密码随机数，由服务器在 HTTP 头信息里面给出，每次加载脚本都不一样。它相当于给出了内嵌脚本的白名单，只有在白名单内的脚本才能执行。
  > - `referrerpolicy`：HTTP 请求的`Referer`字段的处理方法。
  >
  > ## `<noscript>`
  >
  > `<noscript>`标签用于浏览器不支持或关闭 JavaScript 时，所要显示的内容。用户关闭 JavaScript 可能是为了节省带宽，以延长手机电池寿命，或者为了防止追踪，保护隐私。
  >
  > ```
  > <noscript>
  >   您的浏览器不能执行 JavaScript 语言，页面无法正常显示。
  > </noscript>
  > ```
  >
  > 上面这段代码，只有浏览器不能执行 JavaScript 代码时才会显示，否则就不会显示。

- 多媒体标签

  > 除了图像，网页还可以放置视频和音频。
  >
  > `<video>`
  > `<video>`标签是一个块级元素，用于放置视频。如果浏览器支持加载的视频格式，就会显示一个播放器，否则显示`<video>`内部的子元素。
  >
  > ```html
  > <video src="example.mp4" controls>
  >   <p>你的浏览器不支持 HTML5 视频，请下载<a href="example.mp4">视频文件</a>。</p>
  > </video>
  > ```
  >
  > 上面代码中，如果浏览器不支持该种格式的视频，就会显示`<video>`内部的文字提示。
  >
  > `<video>`有以下属性。
  >
  > src：视频文件的网址。
  > controls：播放器是否显示控制栏。该属性是布尔属性，不用赋值，只要写上属性名，就表示打开。如果不想使用浏览器默认的播放器，而想使用自定义播放器，就不要使用该属性。
  > width：视频播放器的宽度，单位像素。
  > height：视频播放器的高度，单位像素。
  > autoplay：视频是否自动播放，该属性为布尔属性。
  > loop：视频是否循环播放，该属性为布尔属性。
  > muted：是否默认静音，该属性为布尔属性。
  > poster：视频播放器的封面图片的 URL。
  > preload：视频播放之前，是否缓冲视频文件。这个属性仅适合没有设置autoplay的情况。它有三个值，分别是none（不缓冲）、metadata（仅仅缓冲视频文件的元数据）、auto（可以缓冲整个文件）。
  > playsinline：iPhone 的 Safari 浏览器播放视频时，会自动全屏，该属性可以禁止这种行为。该属性为布尔属性。
  > crossorigin：是否采用跨域的方式加载视频。它可以取两个值，分别是anonymous（跨域请求时，不发送用户凭证，主要是 Cookie），use-credentials（跨域时发送用户凭证）。
  > currentTime：指定当前播放位置（双精度浮点数，单位为秒）。如果尚未开始播放，则会从这个属性指定的位置开始播放。
  > duration：该属性只读，指示时间轴上的持续播放时间（总长度），值为双精度浮点数（单位为秒）。如果是流媒体，没有已知的结束时间，属性值为+Infinity。
  > 下面是一个例子。
  >
  > ```html
  > <video width="400" height="400"
  >        autoplay loop muted
  >        poster="poster.png">
  > </video>
  > ```
  >
  > 上面代码中，视频播放器的大小是 400 x 400，会自动播放和循环播放，并且静音，还带有封面图。这是网站首页背景视频的常见写法。
  >
  > HTML 标准没有规定浏览器需要支持哪些视频格式，完全由浏览器厂商自己决定。为了避免浏览器不支持视频格式，可以使用<source>标签，放置同一个视频的多种格式。
  >
  > ```html
  > <video controls>
  >   <source src="example.mp4" type="video/mp4">
  >   <source src="example.webm" type="video/webm">
  >   <p>你的浏览器不支持 HTML5 视频，请下载<a href="example.mp4">视频文件</a>。</p>
  > </video>
  > ```
  >
  > 上面代码中，<source>标签的type属性的值是视频文件的 MIME 类型，上例指定了两种格式的视频文件：MP4 和 WebM。如果浏览器支持 MP4，就加载 MP4 格式的视频，不再往下执行了。如果不支持 MP4，就检查是否支持 WebM，如果还是不支持，则显示提示。
  >
  > `<audio>`
  > `<audio>`标签是一个块级元素，用于放置音频，用法与`<video>`标签基本一致。
  >
  > ```html
  > <audio controls>
  >   <source src="foo.mp3" type="audio/mp3">
  >   <source src="foo.ogg" type="audio/ogg">
  >   <p>你的浏览器不支持 HTML5 音频，请直接下载<a href="foo.mp3">音频文件</a>。</p>
  > </audio>
  > ```
  >
  > 上面代码中，<audio>标签内部使用<source>标签，指定了两种音频格式：优先使用 MP3 格式，如果浏览器不支持则使用 Ogg 格式。如果浏览器不能播放音频，则提供下载链接。
  >
  > `<audio>`标签的属性与`<video>`标签类似，参见上一节。
  >
  > autoplay：是否自动播放，布尔属性。
  > controls：是否显示播放工具栏，布尔属性。如果不设置，浏览器不显示播放界面，通常用于背景音乐。
  > crossorigin：是否使用跨域方式请求。
  > loop：是否循环播放，布尔属性。
  > muted：是否静音，布尔属性。
  > preload：音频文件的缓冲设置。
  > src：音频文件网址。
  > `<track>`
  > `<track>`标签用于指定视频的字幕，格式是 WebVTT （.vtt文件），放置在`<video>`标签内部。它是一个单独使用的标签，没有结束标签。
  >
  > ```html
  > <video controls src="sample.mp4">
  >    <track label="英文" kind="subtitles" src="subtitles_en.vtt" srclang="en">
  >    <track label="中文" kind="subtitles" src="subtitles_cn.vtt" srclang="cn" default>
  > </video>
  > ```
  >
  > 上面代码指定视频文件的英文字幕和中文字幕。
  >
  > <track>标签有以下属性。
  >
  > label：播放器显示的字幕名称，供用户选择。
  > kind：字幕的类型，默认是subtitles，表示将原始声音成翻译外国文字，比如英文视频提供中文字幕。另一个常见的值是captions，表示原始声音的文字描述，通常是视频原始使用的语言，比如英文视频提供英文字幕。
  > src：vtt 字幕文件的网址。
  > srclang：字幕的语言，必须是有效的语言代码。
  > default：是否默认打开，布尔属性。
  > <source>
  > <source>标签用于<picture>、`<video>`、<audio>的内部，用于指定一项外部资源。单标签是单独使用的，没有结束标签。
  >
  > 它有如下属性，具体示例请参见相应的容器标签。
  >
  > type：指定外部资源的 MIME 类型。
  > src：指定源文件，用于`<video>`和<audio>。
  > srcset：指定不同条件下加载的图像文件，用于<picture>。
  > media：指定媒体查询表达式，用于<picture>。
  > sizes：指定不同设备的显示大小，用于<picture>，必须跟srcset搭配使用。
  > <embed>
  > <embed>标签用于嵌入外部内容，这个外部内容通常由浏览器插件负责控制。由于浏览器的默认插件都不一致，很可能不是所有浏览器的用户都能访问这部分内容，建议谨慎使用。
  >
  > 下面是嵌入视频播放器的例子。
  >
  > ```html
  > <embed type="video/webm"
  >        src="/media/examples/flower.mp4"
  >        width="250"
  >        height="200">
  > ```
  >
  > 上面代码嵌入的视频，将由浏览器插件负责控制。如果浏览器没有安装 MP4 插件，视频就无法播放。
  >
  > ```html
  > <embed>标签具有如下的通用属性。
  > ```
  >
  > height：显示高度，单位为像素，不允许百分比。
  > width：显示宽度，单位为像素，不允许百分比。
  > src：嵌入的资源的 URL。
  > type：嵌入资源的 MIME 类型。
  > 浏览器通过type属性得到嵌入资源的 MIME 类型，一旦该种类型已经被某个插件注册了，就会启动该插件，负责处理嵌入的资源。
  >
  > 下面是 QuickTime 插件播放 MOV 视频文件的例子。
  >
  > ```html
  > <embed type="video/quicktime" src="movie.mov" width="640" height="480">
  > ```
  >
  > 下面是启动 Flash 插件的例子。
  >
  > ```html
  > <embed src="whoosh.swf" quality="medium"
  >        bgcolor="#ffffff" width="550" height="400"
  >        name="whoosh" align="middle" allowScriptAccess="sameDomain"
  >        allowFullScreen="false" type="application/x-shockwave-flash"
  >        pluginspage="http://www.macromedia.com/go/getflashplayer">
  > ```
  >
  > 上面代码中，如果浏览器没有安装 Flash 插件，就会提示去pluginspage属性指定的网址下载。
  >
  > `<object>`，`<param>`
  > `<object>`标签作用跟`<embed>`相似，也是插入外部资源，由浏览器插件处理。它可以视为`<embed>`的替代品，有标准化行为，只限于插入少数几种通用资源，没有历史遗留问题，因此更推荐使用。
  >
  >
  > 下面是插入 PDF 文件的例子。
  >
  > ```html
  > <object type="application/pdf"
  >     data="/media/examples/In-CC0.pdf"
  >     width="250"
  >     height="200">
  > </object>
  > ```
  >
  > 上面代码中，如果浏览器安装了 PDF 插件，就会在网页显示 PDF 浏览窗口。
  >
  > <object>具有如下的通用属性。
  > data：嵌入的资源的 URL。
  > form：当前网页中相关联表单的id属性（如果有的话）。
  > height：资源的显示高度，单位为像素，不能使用百分比。
  > width：资源的显示宽度，单位为像素，不能使用百分比。
  > type：资源的 MIME 类型。
  > typemustmatch：布尔属性，表示data属性与type属性是否必须匹配。
  > 下面是插入 Flash 影片的例子。
  >
  > ```html
  > <object data="movie.swf"
  >   type="application/x-shockwave-flash"></object>
  > <object>标签是一个容器元素，内部可以使用<param>标签，给出插件所需要的运行参数。
  > ```
  >
  > ```html
  > <object data="movie.swf" type="application/x-shockwave-flash">
  >   <param name="foo" value="bar">
  > </object>
  > ```

- `<iframe>`

  > `<iframe>`标签用于在网页里面嵌入其他网页。
  > 基本用法
  > `<iframe>`标签生成一个指定区域，在该区域中嵌入其他网页。它是一个容器元素，如果浏览器不支持`<iframe>`，就会显示内部的子元素。
  >
  > ```html
  > <iframe src="https://www.example.com"
  >         width="100%" height="500" frameborder="0"
  >         allowfullscreen sandbox>
  >   <p><a href="https://www.example.com">点击打开嵌入页面</a></p>
  > </iframe>
  > ```
  >
  > 上面的代码在当前网页嵌入`https://www.example.com`，显示区域的宽度是100%，高度是500像素。如果当前浏览器不支持`<iframe>`，则会显示一个链接，让用户点击。
  >
  > 浏览器普遍支持`<iframe>`，所以内部的子元素可以不写。
  >
  > `<iframe>`的属性如下。
  >
  > allowfullscreen：允许嵌入的网页全屏显示，需要全屏 API 的支持，请参考相关的 JavaScript 教程。
  > frameborder：是否绘制边框，0为不绘制，1为绘制（默认值）。建议尽量少用这个属性，而是在 CSS 里面设置样式。
  > src：嵌入的网页的 URL。
  > width：显示区域的宽度。
  > height：显示区域的高度。
  > sandbox：设置嵌入的网页的权限，详见下文。
  > importance：浏览器下载嵌入的网页的优先级，可以设置三个值。high表示高优先级，low表示低优先级，auto表示由浏览器自行决定。
  > name：内嵌窗口的名称，可以用于<a>、<form>、<base>的target属性。
  > referrerpolicy：请求嵌入网页时，HTTP 请求的Referer字段的设置。参见<a>标签的介绍。
  > sandbox 属性
  > 嵌入的网页默认具有正常权限，比如执行脚本、提交表单、弹出窗口等。如果嵌入的网页是其他网站的页面，你不了解对方会执行什么操作，因此就存在安全风险。为了限制`<iframe>`的风险，HTML 提供了sandbox属性，允许设置嵌入的网页的权限，等同于提供了一个隔离层，即“沙箱”。
  >
  > sandbox可以当作布尔属性使用，表示打开所有限制。
  >
  > ```html
  > <iframe src="https://www.example.com" sandbox>
  > </iframe>
  > ```
  >
  > sandbox属性可以设置具体的值，表示逐项打开限制。未设置某一项，就表示不具有该权限。
  >
  > allow-forms：允许提交表单。
  > allow-modals：允许提示框，即允许执行window.alert()等会产生弹出提示框的 JavaScript 方法。
  > allow-popups：允许嵌入的网页使用window.open()方法弹出窗口。
  > allow-popups-to-escape-sandbox：允许弹出窗口不受沙箱的限制。
  > allow-orientation-lock：允许嵌入的网页用脚本锁定屏幕的方向，即横屏或竖屏。
  > allow-pointer-lock：允许嵌入的网页使用 Pointer Lock API，锁定鼠标的移动。
  > allow-presentation：允许嵌入的网页使用 Presentation API。
  > allow-same-origin：不打开该项限制，将使得所有加载的网页都视为跨域。
  > allow-scripts：允许嵌入的网页运行脚本（但不创建弹出窗口）。
  > allow-storage-access-by-user-activation：sandbox属性同时设置了这个值和allow-same-origin的情况下，允许`<iframe>`嵌入的第三方网页通过用户发起document.requestStorageAccess()请求，经由 Storage Access API 访问父窗口的 Cookie。
  > allow-top-navigation：允许嵌入的网页对顶级窗口进行导航。
  > allow-top-navigation-by-user-activation：允许嵌入的网页对顶级窗口进行导航，但必须由用户激活。
  > allow-downloads-without-user-activation：允许在没有用户激活的情况下，嵌入的网页启动下载。
  > 注意，不要同时设置allow-scripts和allow-same-origin属性，这将使得嵌入的网页可以改变或删除sandbox属性。
  >
  > loading 属性
  > `<iframe>`指定的网页会立即加载，有时这不是希望的行为。`<iframe>`滚动进入视口以后再加载，这样会比较节省带宽。
  >
  > loading属性可以触发`<iframe>`网页的懒加载。该属性可以取以下三个值。
  >
  > auto：浏览器的默认行为，与不使用loading属性效果相同。
  > lazy：`<iframe>`的懒加载，即将滚动进入视口时开始加载。
  > eager：立即加载资源，无论在页面上的位置如何。
  >
  > ```html
  > <iframe src="https://example.com" loading="lazy"></iframe>
  > ```
  >
  > 上面代码会启用`<iframe>`的懒加载。
  >
  > 有一点需要注意，如果`<iframe>`是隐藏的，则loading属性无效，将会立即加载。只要满足以下任一个条件，Chrome 浏览器就会认为`<iframe>`是隐藏的。
  >
  > `<iframe>`的宽度和高度为4像素或更小。
  > 样式设为display: none或visibility: hidden。
  > 使用定位坐标为负X或负Y，将`<iframe>`放置在屏幕外。

- 表格

  > 表格（table）以行（row）和列（column）的形式展示数据。
  >
  > ## `<table>`，`<caption>`
  >
  > <table>是一个块级容器标签，所有表格内容都要放在这个标签里面。
  >
  > ```
  > <table>
  >   ... ...
  > </table>
  > ```
  >
  > `<caption>`总是`<table>`里面的第一个子元素，表示表格的标题。该元素是可选的。
  >
  > ```
  > <table>
  >   <caption>示例表格</caption>
  > </table>
  > ```
  >
  > ## `<thead>`、`<tbody>`、`<tfoot>`
  >
  > `<thead>`、`<tbody>`、`<tfoot>`都是块级容器元素，且都是`<table>`的一级子元素，分别表示表头、表体和表尾。
  >
  > ```
  > <table>
  >   <thead>... ...</thead>
  >   <tbody>... ...</tbody>
  >   <tfoot>... ...</tfoot>
  > </table>
  > ```
  >
  > 这三个元素都是可选的。如果使用了`<thead>`，那么`<tbody>`和`<tfoot>`一定在`<thead>`的后面。如果使用了`<tbody>`，那么`<tfoot>`一定在`<tbody>`后面。
  >
  > 大型表格内部可以使用多个`<tbody>`，表示连续的多个部分。
  >
  > ## `<colgroup>`，`<col>`
  >
  > `<colgroup>`是`<table>`的一级子元素，用来包含一组列的定义。`<col>`是`<colgroup>`的子元素，用来定义表格的一列。
  >
  > ```
  > <table>
  >   <colgroup>
  >     <col>
  >     <col>
  >     <col>
  >   </colgroup>
  > </table>
  > ```
  >
  > 上面代码表明表格有3列。
  >
  > `<col>`不仅是一个单独使用的标签，没有结束标志，而且还是一个空元素，没有子元素。它的主要作用，除了申明表格结构，还可以为表格附加样式。
  >
  > ```
  > <table>
  >   <colgroup>
  >     <col class="c1">
  >     <col class="c2">
  >     <col class="c3">
  >   </colgroup>
  >   <tr>
  >     <td>1</td>
  >     <td>2</td>
  >     <td>3</td>
  >   </tr>
  > </table>
  > ```
  >
  > 上面代码中，`<colgroup>`声明表格有三列，每一列有自己的 class，可以使用 CSS 针对每个 class 设定样式，会对整个表格生效。
  >
  > `<col>`有一个`span`属性，值为正整数，默认为`1`。如果大于1，就表示该列的宽度包含连续的多列。
  >
  > ```
  > <table>
  >   <colgroup>
  >     <col>
  >     <col span="2">
  >     <col>
  >   </colgroup>
  > </table>
  > ```
  >
  > 上面代码中，表格的表头定义了3列，实际数据有4列。表头的第2列会连续跨2列。
  >
  > ## `<tr>`
  >
  > `<tr>`标签表示表格的一行（table row）。如果表格有`<thead>`、`<tbody>`、`<tfoot>`，那么`<tr>`就放在这些容器元素之中，否则直接放在`<table>`的下一级。
  >
  > ```
  > <table>
  >   <tr>...</tr>
  >   <tr>...</tr>
  >   <tr>...</tr>
  > </table>
  > ```
  >
  > 上面代码表示表格共有3行。
  >
  > ## `<th>`，`<td>`
  >
  > `<th>`和`<td>`都用来定义表格的单元格。其中，`<th>`是标题单元格，`<td>`是数据单元格。
  >
  > ```
  > <table>
  >   <tr>
  >     <th>学号</th><th>姓名</th>
  >   </tr>
  >   <tr>
  >     <td>001</td><td>张三</td>
  >   </tr>
  >   <tr>
  >     <td>002</td><td>李四</td>
  >   </tr>
  > </table>
  > ```
  >
  > 上面代码中，表格一共有三行。第一行是标题行，所以使用`<th>`；第二行和第三行是数据行，所以使用`<td>`。
  >
  > **（1）`colspan`属性，`rowspan`属性**
  >
  > 单元格会有跨越多行或多列的情况，这要通过`colspan`属性和`rowspan`属性设置，前者表示单元格跨越的栏数，后者表示单元格跨越的行数。它们的值都是一个非负整数，默认为1。
  >
  > ```
  > <table>
  >   <tr>
  >     <td colspan="2">A</td><td>B</td>
  >   </tr>
  >   <tr>
  >     <td>A</td><td>B</td><td>C</td>
  >   </tr>
  > </table>
  > ```
  >
  > 上面代码中，第一行的第一个单元格会跨两列。
  >
  > **（2）`headers`属性**
  >
  > 如果表格很大，单元格很多，源码里面会看不清，哪个单元格对应哪个表头，这时就可以使用`headers`属性。
  >
  > ```
  > <table>
  >   <tr>
  >     <th id="no">学号</th><th id="names">姓名</th>
  >   </tr>
  >   <tr>
  >     <td headers="no">001</td><td headers="names">张三</td>
  >   </tr>
  >   <tr>
  >     <td headers="no">002</td><td headers="names">李四</td>
  >   </tr>
  > </table>
  > ```
  >
  > 上面代码中，标题栏的`<th>`设置了`id`属性，后面的`<td>`单元格的`headers`属性就对应这些`id`属性的值，因此就能看出来这些单元格对应哪个标题栏。
  >
  > `headers`属性的值总是对应`<th>`标签的`id`属性的值。由于一个单元格可以对应多个标题栏（跨行的情况），所以`headers`属性可以是一个空格分隔的字符串，对应多个`id`属性的值。
  >
  > **（3）`scope`属性**
  >
  > `scope`属性只有`<th>`标签支持，一般不在`<td>`标签使用，表示该`<th>`单元格到底是栏的标题，还是列的标题。
  >
  > ```
  > <table>
  >   <tr>
  >     <th scope="col">姓名</th>
  >     <th scope="col">学号</th>
  >     <th scope="col">性别</th>
  >   </tr>
  >   <tr>
  >     <th scope="row">张三</th>
  >     <td>001</td>
  >     <td>男</td>
  >   </tr>
  >   <tr>
  >     <th scope="row">李四</th>
  >     <td>002</td>
  >     <td>男</td>
  >   </tr>
  > </table>
  > ```
  >
  > 上面代码中，第一行的标题栏都是列标题，所以`<th>`的`scope`属性为`col`，第二行和第三行的第一列是行标题，所以`<th>`标签的`scope`属性为`row`。
  >
  > `scope`属性可以取下面这些值。
  >
  > - `row`：该行的所有单元格，都与该标题单元格相关。
  > - `col`：该列的所有单元格，都与该标题单元格相关。
  > - `rowgroup`：多行组成的一个行组的所有单元格，都与该标题单元格相关，可以与`rowspan`属性配合使用。
  > - `colgroup`：多列组成的一个列组的所有单元格，都与该标题单元格相关，可以与`colspan`属性配合使用。
  > - `auto`：默认值，表示由浏览器自行决定。
  >
  > 下面是一个`colgroup`属性和`rowgroup`属性的例子。
  >
  > ```
  > <table>
  >   <thead>
  >     <tr>
  >       <th scope="col">海报名称</th>
  >       <th scope="col">颜色</th>
  >       <th colspan="3" scope="colgroup">尺寸</th>
  >     </tr>
  >   </thead>
  >   <tbody>
  >     <tr>
  >       <th rowspan="3" scope="rowgroup">Zodiac</th>
  >       <th scope="row">Full color</th>
  >       <td>A2</td>
  >       <td>A3</td>
  >       <td>A4</td>
  >     </tr>
  >     <tr>
  >       <th scope="row">Black and white</th>
  >       <td>A1</td>
  >       <td>A2</td>
  >       <td>A3</td>
  >     </tr>
  >     <tr>
  >       <th scope="row">Sepia</th>
  >       <td>A3</td>
  >       <td>A4</td>
  >       <td>A5</td>
  >     </tr>
  >   </tbody>
  > </table>
  > ```
  >
  > 上面的例子中，列标题“尺寸”的`scope`属性为`colgroup`，表示这个标题单元格对应多列（本例为3列）；行标题的`scope`属性为`rowgroup`，表示这个标题单元格对应多行（本例为3行）。
  >
  > 渲染结果就是下面的样子。
  >
  > | 海报名称 | 颜色            | 尺寸 |      |      |
  > | -------- | --------------- | ---- | ---- | ---- |
  > | Zodiac   | Full color      | A2   | A3   | A4   |
  > |          | Black and white | A1   | A2   | A3   |
  > |          | Sepia           | A3   | A4   | A5   |