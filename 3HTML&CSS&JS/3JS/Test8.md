- ## 附录：网页元素接口

  - `<a>`

    > <a>元素用来设置链接。除了网页元素的通用接口（Node接口、Element接口、HTMLElement接口），它还继承了HTMLAnchorElement接口和HTMLHyperlinkElementUtils接口。
    >
    > ## 属性
    >
    > ### URL 相关属性
    >
    > <a>元素有一系列 URL 相关属性，可以用来操作链接地址。这些属性的含义，可以参见Location对象的实例属性。
    >
    > - hash：片段识别符（以`#`开头）
    > - host：主机和端口（默认端口80和443会省略）
    > - hostname：主机名
    > - href：完整的 URL
    > - origin：协议、域名和端口
    > - password：主机名前的密码
    > - pathname：路径（以`/`开头）
    > - port：端口
    > - protocol：协议（包含尾部的冒号`:`）
    > - search：查询字符串（以`?`开头）
    > - username：主机名前的用户名
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="http://user:passwd@example.com:8081/index.html?bar=1#foo">test</a>
    > var a = document.getElementById('test');
    > a.hash // "#foo"
    > a.host // "example.com:8081"
    > a.hostname // "example.com"
    > a.href // "http://user:passed@example.com:8081/index.html?bar=1#foo"
    > a.origin // "http://example.com:8081"
    > a.password // "passwd"
    > a.pathname // "/index.html"
    > a.port // "8081"
    > a.protocol // "http:"
    > a.search // "?bar=1"
    > a.username // "user"
    > ```
    >
    > 除了`origin`属性是只读的，上面这些属性都是可读写的。
    >
    > ### accessKey 属性
    >
    > `accessKey`属性用来读写`<a>`元素的快捷键。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="http://example.com">test</a>
    > var a = document.getElementById('test');
    > a.accessKey = 'k';
    > ```
    >
    > 上面代码设置`<a>`元素的快捷键为`k`，以后只要按下这个快捷键，浏览器就会跳转到`example.com`。
    >
    > 注意，不同的浏览器在不同的操作系统下，唤起快捷键的功能键组合是[不一样](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)的。比如，Chrome 浏览器在 Linux 系统下，需要按下`Alt + k`，才会跳转到`example.com`。
    >
    > ### download 属性
    >
    > `download`属性表示当前链接不是用来浏览，而是用来下载的。它的值是一个字符串，表示用户下载得到的文件名。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="foo.jpg">下载</a>
    > var a = document.getElementById('test');
    > a.download = 'bar.jpg';
    > ```
    >
    > 上面代码中，`<a>`元素是一个图片链接，默认情况下，点击后图片会在当前窗口加载。设置了`download`属性以后，再点击这个链接，就会下载对话框，询问用户保存位置，而且下载的文件名为`bar.jpg`。
    >
    > ### hreflang 属性
    >
    > `hreflang`属性用来读写`<a>`元素的 HTML 属性`hreflang`，表示链接指向的资源的语言，比如`hreflang="en"`。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="https://example.com" hreflang="en">test</a>
    > var a = document.getElementById('test');
    > a.hreflang // "en"
    > ```
    >
    > ### referrerPolicy 属性
    >
    > `referrerPolicy`属性用来读写`<a>`元素的 HTML 属性`referrerPolicy`，指定当用户点击链接时，如何发送 HTTP 头信息的`referer`字段。
    >
    > HTTP 头信息的`referer`字段，表示当前请求是从哪里来的。它的格式可以由`<a>`元素的`referrerPolicy`属性指定，共有三个值可以选择。
    >
    > - `no-referrer`：不发送`referer`字段。
    > - `origin`：`referer`字段的值是`<a>`元素的`origin`属性，即协议 + 主机名 + 端口。
    > - `unsafe-url`：`referer`字段的值是`origin`属性再加上路径，但不包含`#`片段。这种格式提供的信息最详细，可能存在信息泄漏的风险。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="https://example.com" referrerpolicy="no-referrer">test</a>
    > var a = document.getElementById('test');
    > a.referrerPolicy // "no-referrer"
    > ```
    >
    > ### rel 属性
    >
    > `rel`属性用来读写`<a>`元素的 HTML 属性`rel`，表示链接与当前文档的关系。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="https://example.com" rel="license">license.html</a>
    > var a = document.getElementById('test');
    > a.rel // "license"
    > ```
    >
    > ### tabIndex 属性
    >
    > `tabIndex`属性的值是一个整数，用来读写当前`<a>`元素在文档里面的 Tab 键遍历顺序。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="https://example.com">test</a>
    > var a = document.getElementById('test');
    > a.tabIndex // 0
    > ```
    >
    > ### target 属性
    >
    > `target`属性用来读写`<a>`元素的 HTML 属性`target`。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="https://example.com" target="_blank">test</a>
    > var a = document.getElementById('test');
    > a.target // "_blank"
    > ```
    >
    > ### text 属性
    >
    > `text`属性用来读写`<a>`元素的链接文本，等同于当前节点的`textContent`属性。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" href="https://example.com">test</a>
    > var a = document.getElementById('test');
    > a.text // "test"
    > ```
    >
    > ### type 属性
    >
    > `type`属性用来读写`<a>`元素的 HTML 属性`type`，表示链接目标的 MIME 类型。
    >
    > ```
    > // HTML 代码如下
    > // <a id="test" type="video/mp4" href="example.mp4">video</a>
    > var a = document.getElementById('test');
    > a.type // "video/mp4"
    > ```
    >
    > ## 方法
    >
    > <a>元素的方法都是继承的，主要有以下三个。
    >
    > - `blur()`：从当前元素移除键盘焦点，详见`HTMLElement`接口的介绍。
    > - `focus()`：当前元素得到键盘焦点，详见`HTMLElement`接口的介绍。
    > - `toString()`：返回当前`<a>`元素的 HTML 属性`href`。

  - `img`

    > ## 概述
    >
    > <img>元素用于插入图片，主要继承了 HTMLImageElement 接口。
    >
    > 浏览器提供一个原生构造函数`Image`，用于生成`HTMLImageElement`实例。
    >
    > ```
    > var img = new Image();
    > img instanceof Image // true
    > img instanceof HTMLImageElement // true
    > ```
    >
    > `Image`构造函数可以接受两个整数作为参数，分别表示`<img>`元素的宽度和高度。
    >
    > ```
    > // 语法
    > Image(width, height)
    > 
    > // 用法
    > var myImage = new Image(100, 200);
    > ```
    >
    > <img>实例的src属性可以定义图像的网址。
    >
    > ```
    > var img = new Image();
    > img.src = 'picture.jpg';
    > ```
    >
    > 新生成的`<img>`实例并不属于文档的一部分。如果想让它显示在文档中，必须手动插入文档。
    >
    > ```
    > var img = new Image();
    > img.src = 'image1.png';
    > document.body.appendChild(img);
    > ```
    >
    > 除了使用`Image`构造，下面的方法也可以得到`HTMLImageElement`实例。
    >
    > - `document.images`的成员
    > - 节点选取方法（比如`document.getElementById`）得到的`<img>`节点
    > - `document.createElement('img')`生成的`<img>`节点
    >
    > ```
    > document.images[0] instanceof HTMLImageElement
    > // true
    > 
    > var img = document.getElementById('myImg');
    > img instanceof HTMLImageElement
    > // true
    > 
    > var img = document.createElement('img');
    > img instanceof HTMLImageElement
    > // true
    > ```
    >
    > `HTMLImageElement`实例除了具有 Node、Element、HTMLElement 接口以外，还拥有一些独有的属性。这个接口没有定义自己的方法。
    >
    > ## 特性相关的属性
    >
    > **（1）HTMLImageElement.src**
    >
    > `HTMLImageElement.src`属性返回图像的完整网址。
    >
    > ```
    > // HTML 代码如下
    > // <img width="300" height="400" id="myImg" src="http://example.com/pic.jpg">
    > var img = document.getElementById('img');
    > img.src // http://example.com/pic.jpg
    > ```
    >
    > **（2）HTMLImageElement.currentSrc**
    >
    > `HTMLImageElement.currentSrc`属性返回当前正在展示的图像的网址。JS 和 CSS 的 mediaQuery 都可能改变正在展示的图像。
    >
    > **（3）HTMLImageElement.alt**
    >
    > `HTMLImageElement.alt`属性可以读写`<img>`的 HTML 属性`alt`，表示对图片的文字说明。
    >
    > **（4）HTMLImageElement.isMap，HTMLImageElement.useMap**
    >
    > `HTMLImageElement.isMap`属性对应`<img>`元素的 HTML 属性`ismap`，返回一个布尔值，表示图像是否为服务器端的图像映射的一部分。
    >
    > `HTMLImageElement.useMap`属性对应`<img>`元素的 HTML 属性`usemap`，表示当前图像对应的`<map>`元素。
    >
    > **（5）HTMLImageElement.srcset，HTMLImageElement.sizes**
    >
    > `HTMLImageElement.srcset`属性和`HTMLImageElement.sizes`属性，分别用于读写`<img>`元素的`srcset`属性和`sizes`属性。它们用于`<img>`元素的响应式加载。`srcset`属性可以单独使用，但是`sizes`属性必须与`srcset`属性同时使用。
    >
    > ```
    > // HTML 代码如下
    > // <img srcset="example-320w.jpg 320w,
    > //              example-480w.jpg 480w,
    > //              example-800w.jpg 800w"
    > //      sizes="(max-width: 320px) 280px,
    > //             (max-width: 480px) 440px,
    > //             800px"
    > //      id="myImg"
    > //      src="example-800w.jpg">
    > var img = document.getElementById('myImg');
    > img.srcset
    > // "example-320w.jpg 320w,
    > //  example-480w.jpg 480w,
    > //  example-800w.jpg 800w"
    > 
    > img.sizes
    > // "(max-width: 320px) 280px,
    > //  (max-width: 480px) 440px,
    > //  800px"
    > ```
    >
    > 上面代码中，`sizes`属性指定，对于小于`320px`的屏幕，图像的宽度为`280px`；对于小于`480px`的屏幕，图像宽度为`440px`；其他情况下，图像宽度为`800px`。然后，浏览器会根据当前屏幕下的图像宽度，到`srcset`属性加载宽度最接近的图像。
    >
    > ## HTMLImageElement.width，HTMLImageElement.height
    >
    > `width`属性表示`<img>`的 HTML 宽度，`height`属性表示高度。这两个属性返回的都是整数。
    >
    > ```
    > // HTML 代码如下
    > // <img width="300" height="400" id="myImg" src="pic.jpg">
    > var img = document.getElementById('img');
    > img.width // 300
    > img.height // 400
    > ```
    >
    > 如果图像还没有加载，这两个属性返回的都是`0`。
    >
    > 如果 HTML 代码没有设置`width`和`height`属性，则它们返回的是图像的实际宽度和高度，即`HTMLImageElement.naturalWidth`属性和`HTMLImageElement.naturalHeight`属性。
    >
    > ## HTMLImageElement.naturalWidth，HTMLImageElement.naturalHeight
    >
    > `HTMLImageElement.naturalWidth`属性表示图像的实际宽度（单位像素），`HTMLImageElement.naturalHeight`属性表示实际高度。这两个属性返回的都是整数。
    >
    > 如果图像还没有指定或不可得，这两个属性都等于`0`。
    >
    > ```
    > var img = document.getElementById('img');
    > if (img.naturalHeight > img.naturalWidth) {
    >   img.classList.add('portrait');
    > }
    > ```
    >
    > 上面代码中，如果图片的高度大于宽度，则设为`portrait`模式。
    >
    > ## HTMLImageElement.complete
    >
    > `HTMLImageElement.complete`属性返回一个布尔值，表示图表是否已经加载完成。如果`<img>`元素没有`src`属性，也会返回`true`。
    >
    > ## HTMLImageElement.crossOrigin
    >
    > `HTMLImageElement.crossOrigin`属性用于读写`<img>`元素的`crossorigin`属性，表示跨域设置。
    >
    > 这个属性有两个可能的值。
    >
    > - `anonymous`：跨域请求不要求用户身份（credentials），这是默认值。
    > - `use-credentials`：跨域请求要求用户身份。
    >
    > ```
    > // HTML 代码如下
    > // <img crossorigin="anonymous" id="myImg" src="pic.jpg">
    > var img = document.getElementById('img');
    > img.crossOrigin // "anonymous"
    > ```
    >
    > ## HTMLImageElement.referrerPolicy
    >
    > `HTMLImageElement.referrerPolicy`用来读写`<img>`元素的 HTML 属性`referrerpolicy`，表示请求图像资源时，如何处理 HTTP 请求的`referrer`字段。
    >
    > 它有五个可能的值。
    >
    > - `no-referrer`：不带有`referrer`字段。
    > - `no-referrer-when-downgrade`：如果请求的地址不是 HTTPS 协议，就不带有`referrer`字段，这是默认值。
    > - `origin`：`referrer`字段是当前网页的地址，包含协议、域名和端口。
    > - `origin-when-cross-origin`：如果请求的地址与当前网页是同源关系，那么`referrer`字段将带有完整路径，否则将只包含协议、域名和端口。
    > - `unsafe-url`：`referrer`字段包含当前网页的地址，除了协议、域名和端口以外，还包括路径。这个设置是不安全的，因为会泄漏路径信息。
    >
    > ## HTMLImageElement.x，HTMLImageElement.y
    >
    > `HTMLImageElement.x`属性返回图像左上角相对于页面左上角的横坐标，`HTMLImageElement.y`属性返回纵坐标。
    >
    > ## 事件属性
    >
    > 图像加载完成，会触发`onload`属性指定的回调函数。
    >
    > ```
    > // HTML 代码为 <img src="example.jpg" onload="loadImage()">
    > function loadImage() {
    >   console.log('Image is loaded');
    > }
    > ```
    >
    > 图像加载过程中发生错误，会触发`onerror`属性指定的回调函数。
    >
    > ```
    > // HTML 代码为 <img src="image.gif" onerror="myFunction()">
    > function myFunction() {
    >   console.log('There is something wrong');
    > }
    > ```

  - `form`

    > `<form>`元素代表了表单，继承了 HTMLFormElement 接口。
    >
    > ## HTMLFormElement 的实例属性
    >
    > - `elements`：返回一个类似数组的对象，成员是属于该表单的所有控件元素。该属性只读。
    > - `length`：返回一个整数，表示属于该表单的控件数量。该属性只读。
    > - `name`：字符串，表示该表单的名称。
    > - `method`：字符串，表示提交给服务器时所使用的 HTTP 方法。
    > - `target`：字符串，表示表单提交后，服务器返回的数据的展示位置。
    > - `action`：字符串，表示表单提交数据的 URL。
    > - `enctype`（或`encoding`）：字符串，表示表单提交数据的编码方法，可能的值有`application/x-www-form-urlencoded`、`multipart/form-data`和`text/plain`。
    > - `acceptCharset`：字符串，表示服务器所能接受的字符编码，多个编码格式之间使用逗号或空格分隔。
    > - `autocomplete`：字符串`on`或`off`，表示浏览器是否要对`<input>`控件提供自动补全。
    > - `noValidate`：布尔值，表示是否关闭表单的自动校验。
    >
    > ## HTMLFormElement 的实例方法
    >
    > - `submit()`：提交表单，但是不会触发`submit`事件和表单的自动校验。
    > - `reset()`：重置表单控件的值为默认值。
    > - `checkValidity()`：如果控件能够通过自动校验，返回`true`，否则返回`false`，同时触发`invalid`事件。
    >
    > 下面是一个创建表单并提交的例子。
    >
    > ```
    > var f = document.createElement('form');
    > document.body.appendChild(f);
    > f.action = '/cgi-bin/some.cgi';
    > f.method = 'POST';
    > f.submit();
    > ```

  - `input`

    > `<input>`元素主要用于表单组件，它继承了 HTMLInputElement 接口。
    >
    > ## HTMLInputElement 的实例属性
    >
    > ### 特征属性
    >
    > - `name`：字符串，表示`<input>`节点的名称。该属性可读写。
    > - `type`：字符串，表示`<input>`节点的类型。该属性可读写。
    > - `disabled`：布尔值，表示`<input>`节点是否禁止使用。一旦被禁止使用，表单提交时不会包含该`<input>`节点。该属性可读写。
    > - `autofocus`：布尔值，表示页面加载时，该元素是否会自动获得焦点。该属性可读写。
    > - `required`：布尔值，表示表单提交时，该`<input>`元素是否必填。该属性可读写。
    > - `value`：字符串，表示该`<input>`节点的值。该属性可读写。
    > - `validity`：返回一个`ValidityState`对象，表示`<input>`节点的校验状态。该属性只读。
    > - `validationMessage`：字符串，表示该`<input>`节点的校验失败时，用户看到的报错信息。如果该节点不需要校验，或者通过校验，该属性为空字符串。该属性只读。
    > - `willValidate`：布尔值，表示表单提交时，该`<input>`元素是否会被校验。该属性只读。
    >
    > ### 表单相关属性
    >
    > - `form`：返回`<input>`元素所在的表单（`<form>`）节点。该属性只读。
    > - `formAction`：字符串，表示表单提交时的服务器目标。该属性可读写，一旦设置了这个属性，会覆盖表单元素的`action`属性。
    > - `formEncType`：字符串，表示表单提交时数据的编码方式。该属性可读写，一旦设置了这个属性，会覆盖表单元素的`enctype`的属性。
    > - `formMethod`：字符串，表示表单提交时的 HTTP 方法。该属性可读写，一旦设置了这个属性，会覆盖表单元素的`method`属性。
    > - `formNoValidate`：布尔值，表示表单提交时，是否要跳过校验。该属性可读写，一旦设置了这个属性，会覆盖表单元素的`formNoValidate`属性。
    > - `formTarget`：字符串，表示表单提交后，服务器返回数据的打开位置。该属性可读写，一旦设置了这个属性，会覆盖表单元素的`target`属性。
    >
    > ### 文本输入框的特有属性
    >
    > 以下属性只有在`<input>`元素可以输入文本时才有效。
    >
    > - `autocomplete`：字符串`on`或`off`，表示该`<input>`节点的输入内容可以被浏览器自动补全。该属性可读写。
    > - `maxLength`：整数，表示可以输入的字符串最大长度。如果设为负整数，会报错。该属性可读写。
    > - `size`：整数，表示`<input>`节点的显示长度。如果类型是`text`或`password`，该属性的单位是字符个数，否则单位是像素。该属性可读写。
    > - `pattern`：字符串，表示`<input>`节点的值应该满足的正则表达式。该属性可读写。
    > - `placeholder`：字符串，表示该`<input>`节点的占位符，作为对元素的提示。该字符串不能包含回车或换行。该属性可读写。
    > - `readOnly`：布尔值，表示用户是否可以修改该节点的值。该属性可读写。
    > - `min`：字符串，表示该节点的最小数值或日期，且不能大于`max`属性。该属性可读写。
    > - `max`：字符串，表示该节点的最大数值或日期，且不能小于`min`属性。该属性可读写。
    > - `selectionStart`：整数，表示选中文本的起始位置。如果没有选中文本，返回光标在`<input>`元素内部的位置。该属性可读写。
    > - `selectionEnd`：整数，表示选中文本的结束位置。如果没有选中文本，返回光标在`<input>`元素内部的位置。该属性可读写。
    > - `selectionDirection`：字符串，表示选中文本的方向。可能的值包括`forward`（与文字书写方向一致）、`backward`（与文字书写方向相反）和`none`（文字方向未知）。该属性可读写。
    >
    > ### 复选框和单选框的特有属性
    >
    > 如果`<input>`元素的类型是复选框（checkbox）或单选框（radio），会有下面的特有属性。
    >
    > - `checked`：布尔值，表示该`<input>`元素是否选中。该属性可读写。
    > - `defaultChecked`：布尔值，表示该`<input>`元素默认是否选中。该属性可读写。
    > - `indeterminate`：布尔值，表示该`<input>`元素是否还没有确定的状态。一旦用户点击过一次，该属性就会变成`false`，表示用户已经给出确定的状态了。该属性可读写。
    >
    > ### 图像按钮的特有属性
    >
    > 如果`<input>`元素的类型是`image`，就会变成一个图像按钮，会有下面的特有属性。
    >
    > - `alt`：字符串，图像无法显示时的替代文本。该属性可读写。
    > - `height`：字符串，表示该元素的高度（单位像素）。该属性可读写。
    > - `src`：字符串，表示该元素的图片来源。该属性可读写。
    > - `width`：字符串，表示该元素的宽度（单位像素）。该属性可读写。
    >
    > ### 文件上传按钮的特有属性
    >
    > 如果`<input>`元素的类型是`file`，就会变成一个文件上传按钮，会有下面的特有属性。
    >
    > - `accept`：字符串，表示该元素可以接受的文件类型，类型之间使用逗号分隔。该属性可读写。
    > - `files`：返回一个`FileList`实例对象，包含了选中上传的一组`File`实例对象。
    >
    > ### 其他属性
    >
    > - `defaultValue`：字符串，表示该`<input>`节点的原始值。
    > - `dirName`：字符串，表示文字方向。
    > - `accessKey`：字符串，表示让该`<input>`节点获得焦点的某个字母键。
    > - `list`：返回一个`<datalist>`节点，该节点必须绑定`<input>`元素，且`<input>`元素的类型必须可以输入文本，否则无效。该属性只读。
    > - `multiple`：布尔值，表示是否可以选择多个值。
    > - `labels`：返回一个`NodeList`实例，代表绑定当前`<input>`节点的`<label>`元素。该属性只读。
    > - `step`：字符串，表示在`min`属性到`max`属性之间，每次递增或递减时的数值或时间。
    > - `valueAsDate`：`Date`实例，一旦设置，该`<input>`元素的值会被解释为指定的日期。如果无法解析该属性的值，`<input>`节点的值将是`null`。
    > - `valueAsNumber`：浮点数，当前`<input>`元素的值会被解析为这个数值。如果输入框为空，该属性返回`NaN`。
    >
    > 下面是`valueAsNumber`属性的例子。
    >
    > ```
    > /* HTML 代码如下
    >    <input type="number" value="1.234" />
    > */
    > 
    > input.value // "1.234"
    > input.valueAsNumber // 1.234
    > ```
    >
    > ## HTMLInputElement 的实例方法
    >
    > - `focus()`：当前`<input>`元素获得焦点。
    > - `blur()`：移除`<input>`元素的焦点。
    > - `select()`：选中`<input>`元素内部的所有文本。该方法不能保证`<input>`获得焦点，最好先用`focus()`方法，再用这个方法。
    > - `click()`：模拟鼠标点击当前的`<input>`元素。
    > - `setSelectionRange()`：选中`<input>`元素内部的一段文本，但不会将焦点转移到选中的文本。该方法接受三个参数，第一个参数是开始的位置（从0开始），第二个参数是结束的位置（不包括该位置），第三个参数是可选的，表示选择的方向，有三个可能的值（`forward`、`backward`和默认值`none`）。
    > - `setRangeText()`：新文本替换选中的文本。该方法接受四个参数，第一个参数是新文本，第二个参数是替换的开始位置(从`0`开始计算)，第三个参数是结束位置（该位置不包括在内），第四个参数表示替换后的行为（可选），有四个可能的值：`select`（选中新插入的文本）、`start`（光标位置移到插入的文本之前）、`end`（光标位置移到插入的文本之后）、`preserve`（默认值，如果原先就有文本被选中且本次替换位置与原先选中位置有交集，则替换后同时选中新插入的文本与原先选中的文本，否则保持原先选中的文本）。
    > - `setCustomValidity()`：该方法用于自定义校验失败时的报错信息。它的参数就是报错的提示信息。注意，一旦设置了自定义报错信息，该字段就不会校验通过了，因此用户重新输入时，必须将自定义报错信息设为空字符串，请看下面的例子。
    > - `checkValidity()`：返回一个布尔值，表示当前节点的校验结果。如果返回`false`，表示不满足校验要求，否则就是校验成功或不必校验。
    > - `stepDown()`：将当前`<input>`节点的值减少一个步长。该方法可以接受一个整数`n`作为参数，表示一次性减少`n`个步长，默认是`1`。有几种情况会抛错：当前`<input>`节点不适合递减或递增、当前节点没有`step`属性、`<input>`节点的值不能转为数字、递减之后的值小于`min`属性或大于`max`属性。
    > - `stepUp()`：将当前`<input>`节点的值增加一个步长。其他与`stepDown()`方法相同。
    >
    > 下面是`setSelectionRange()`方法的一个例子。
    >
    > ```
    > /* HTML 代码如下
    >   <p><input type="text" id="mytextbox" size="20" value="HelloWorld"/></p>
    >   <p><button onclick="SelectText()">选择文本</button></p>
    > */
    > 
    > function SelectText() {
    >   var input = document.getElementById('mytextbox');
    >   input.focus();
    >   input.setSelectionRange(2, 5);
    > }
    > ```
    >
    > 上面代码中，点击按钮以后，会选中`llo`三个字符。
    >
    > 下面是`setCustomValidity()`的例子。
    >
    > ```
    > /* HTML 代码如下
    >   <form id="form">
    >     <input id="field" type="text" pattern="[a-f,0-9]{4}" autocomplete=off>
    >   </form>
    > */
    > 
    > const form   = document.querySelector('#form');
    > const field  = document.querySelector('#field');
    > 
    > form.addEventListener('submit', (e) => {
    >   e.preventDefault(); // 防止这个例子发出 POST 请求
    > });
    > 
    > field.oninvalid = (event) => {
    >   event.target.setCustomValidity('必须是一个 4 位十六进制数');
    > }
    > 
    > field.oninput = (event) => {
    >   event.target.setCustomValidity('');
    > }
    > ```
    >
    > 上面代码中，输入框必须输入一个4位的十六进制数。如果不满足条件（比如输入`xxx`），按下回车键以后，就会提示自定义的报错信息。一旦自定义了报错信息，输入框就会一直处于校验失败状态，因此重新输入时，必须把自定义报错信息设为空字符串。另外，为了避免自动补全提示框遮住报错信息，必须将输入框的`autocomplete`属性关闭。

  - `button`

    > `<button>`元素继承了`HTMLButtonElement`接口。它有以下的实例属性。
    >
    > **（1）HTMLButtonElement.accessKey**
    >
    > `HTMLButtonElement.accessKey`属性返回一个字符串，表示键盘上对应的键，通过`Alt + 这个键`可以让按钮获得焦点。该属性可读写。
    >
    > **（2）HTMLButtonElement.autofocus**
    >
    > `HTMLButtonElement.autofocus`属性是一个布尔值，表示页面加载过程中，按钮是否会自动获得焦点。该属性可读写。
    >
    > **（3）HTMLButtonElement.disabled**
    >
    > `HTMLButtonElement.disabled`属性是一个布尔值，表示该按钮是否禁止点击。该属性可读写。
    >
    > **（4）HTMLButtonElement.form**
    >
    > `HTMLButtonElement.form`属性是一个表单元素，返回该按钮所在的表单。该属性只读。如果按钮不属于任何表单，该属性返回`null`。
    >
    > **（5）HTMLButtonElement.formAction**
    >
    > `HTMLButtonElement.formAction`返回一个字符串，表示表单提交的 URL。该属性可读写，一旦设置了值，点击按钮就会提交到该属性指定的 URL，而不是`<form>`元素指定的 URL。
    >
    > **（6）HTMLButtonElement.formEnctype**
    >
    > `HTMLButtonElement.formEnctype`属性是一个字符串，表示数据提交到服务器的编码类型。该属性可读写，一旦设置了值，点击按钮会按照该属性指定的编码方式，而不是`<form>`元素指定的编码方式。
    >
    > 该属性可以取以下的值。
    >
    > - `application/x-www-form-urlencoded`（默认值）
    > - `multipart/form-data`（上传文件的编码方式）
    > - `text/plain`
    >
    > **（7）HTMLButtonElement.formMethod**
    >
    > `HTMLButtonElement.formMethod`属性是一个字符串，表示浏览器提交表单的 HTTP 方法。该属性可读写，一旦设置了值，点击后就会采用该属性指定的 HTTP 方法，而不是`<form>`元素指定的编码方法。
    >
    > **（8）HTMLButtonElement.formNoValidate**
    >
    > `HTMLButtonElement.formNoValidate`属性是一个布尔值，表示点击按钮提交表单时，是否要跳过表单校验的步骤。该属性可读写，一旦设置会覆盖`<form>`元素的`novalidate`属性。
    >
    > **（9）HTMLButtonElement.formTarget**
    >
    > `HTMLButtonElement.formTarget`属性是一个字符串，指定了提交了表单以后，哪个窗口展示服务器返回的内容。该属性可读写，一旦设置会覆盖`<form>`元素的`target`属性。
    >
    > **（10）HTMLButtonElement.labels**
    >
    > `HTMLButtonElement.labels`返回`NodeList`实例，表示那些绑定按钮的`<label>`元素。该属性只读。
    >
    > ```
    > /* HTML 代码如下
    >   <label id="label1" for="test">Label 1</label>
    >   <button id="test">Button</button>
    >   <label id="label2" for="test">Label 2</label>
    > */
    > 
    > const button = document.getElementById('test');
    > 
    > for(var i = 0; i < button.labels.length; i++) {
    >   console.log(button.labels[i].textContent);
    > }
    > // "Label 1"
    > // "Label 2"
    > ```
    >
    > 上面代码中，两个`<label>`元素绑定`<button>`元素。`button.labels`返回这两个`<label>`元素。
    >
    > **（11）HTMLButtonElement.name**
    >
    > `HTMLButtonElement.name`属性是一个字符串，表示按钮元素的`name`属性。如果没有设置`name`属性，则返回空字符串。该属性可读写。
    >
    > **（12）HTMLButtonElement.tabIndex**
    >
    > `HTMLButtonElement.tabIndex`是一个整数，代表按钮元素的 Tab 键顺序。该属性可读写。
    >
    > **（13）HTMLButtonElement.type**
    >
    > `HTMLButtonElement.type`属性是一个字符串，表示按钮的行为。该属性可读写，可能取以下的值。
    >
    > - `submit`：默认值，表示提交表单。
    > - `reset`：重置表单。
    > - `button`：没有任何默认行为。
    >
    > **（14）HTMLButtonElement.validationMessage**
    >
    > `HTMLButtonElement.validationMessage`属性是一个字符串，表示没有通过校验时显示的提示信息。该属性只读。
    >
    > **（15）HTMLButtonElement.validity**
    >
    > `HTMLButtonElement.validity`属性返回该按钮的校验状态（`ValidityState`）。该属性只读。
    >
    > **（16）HTMLButtonElement.value**
    >
    > `HTMLButtonElement.value`属性返回该按钮绑定的值。该属性可读写。
    >
    > **（17）HTMLButtonElement.willValidate**
    >
    > `HTMLButtonElement.willValidate`属性是一个布尔值，表示该按钮提交表单时是否将被校验，默认为`false`。该属性只读。

  - `option`

    > `<option>`元素表示下拉框（`<select>`，`<optgroup>`或`<datalist>`）里面的一个选项。它是 HTMLOptionElement 接口的实例。
    >
    > ## 属性
    >
    > 除了继承 HTMLElement 接口的属性和方法，HTMLOptionElement 接口具有下面的属性。
    >
    > - `disabled`：布尔值，表示该项是否可选择。
    > - `defaultSelected`：布尔值，表示该项是否默认选中。一旦设为`true`，该项的值就是`<select>`的默认值。
    > - `form`：返回`<option>`所在的表单元素。如果不属于任何表单，则返回`null`。该属性只读。
    > - `index`：整数，表示该选项在整个下拉列表里面的位置。该属性只读。
    > - `label`：字符串，表示对该选项的说明。如果该属性未设置，则返回该选项的文本内容。
    > - `selected`：布尔值，表示该选项是否选中。
    > - `text`：字符串，该选项的文本内容。
    > - `value`：字符串，该选项的值。表单提交时，上传的就是选中项的这个属性。
    >
    > ## Option() 构造函数
    >
    > 浏览器原生提供`Option()`构造函数，用来生成 HTMLOptionElement 实例。
    >
    > ```
    > new Option(text, value, defaultSelected, selected)
    > ```
    >
    > 它接受四个参数，都是可选的。
    >
    > - text：字符串，表示该选项的文本内容。如果省略，返回空字符串。
    > - value：字符串，表示该选项的值。如果省略，默认返回`text`属性的值。
    > - defaultSelected：布尔值，表示该项是否默认选中，默认为`false`。注意，即使设为`true`，也不代表该项的`selected`属性为`true`。
    > - selected：布尔值，表示该项是否选中，默认为`false`。
    >
    > ```
    > var newOption = new Option('hello', 'world', true);
    > 
    > newOption.text // "hello"
    > newOption.value // "world"
    > newOption.defaultSelected // true
    > newOption.selected // false
    > ```
    >
    > 上面代码中，`newOption`的`defaultSelected`属性为`true`，但是它没有被选中（即`selected`属性为`false`）。

  - `video`，`audio`

    > ## 概述
    >
    > <video>元素用来加载视频，是HTMLVideoElement对象的实例。<audio>元素用来加载音频，是HTMLAudioElement对象的实例。而HTMLVideoElement和HTMLAudioElement都继承了HTMLMediaElement，所以这两个 HTML 元素有许多共同的属性和方法，可以放在一起介绍。
    >
    > 理论上，这两个 HTML 元素直接用`src`属性指定媒体文件，就可以使用了。
    >
    > ```
    > <audio src="background_music.mp3"/>
    > <video src="news.mov" width=320 height=240/>
    > ```
    >
    > 注意，`<video>`元素有`width`属性和`height`属性，可以指定宽和高。`<audio>`元素没有这两个属性，因为它的播放器外形是浏览器给定的，不能指定。
    >
    > 实际上，不同的浏览器支持不同的媒体格式，我们不得不用`<source>`元素指定同一个媒体文件的不同格式。
    >
    > ```
    > <audio id="music">
    > <source src="music.mp3" type="audio/mpeg">  
    > <source src="music.ogg" type='audio/ogg; codec="vorbis"'>
    > </audio>
    > ```
    >
    > 浏览器遇到支持的格式，就会忽略后面的格式。
    >
    > 这两个元素都有一个`controls`属性，只有打开这个属性，才会显示控制条。注意，`<audio>`元素如果不打开`controls`属性，根本不会显示，而是直接在背景播放。
    >
    > ## HTMLMediaElement 接口
    >
    > `HTMLMediaElement`并没有对应的 HTML 元素，而是作为`<video>`和`<audio>`的基类，定义一些它们共同的属性和方法。
    >
    > `HTMLMediaElement`接口有以下属性。
    >
    > - HTMLMediaElement.audioTracks：返回一个类似数组的对象，表示媒体文件包含的音轨。
    > - HTMLMediaElement.autoplay：布尔值，表示媒体文件是否自动播放，对应 HTML 属性`autoplay`。
    > - HTMLMediaElement.buffered：返回一个 TimeRanges 对象，表示浏览器缓冲的内容。该对象的`length`属性返回缓存里面有多少段内容，`start(rangeId)`方法返回指定的某段内容（从0开始）开始的时间点，`end()`返回指定的某段内容结束的时间点。该属性只读。
    > - HTMLMediaElement.controls：布尔值，表示是否显示媒体文件的控制栏，对应 HTML 属性`controls`。
    > - HTMLMediaElement.controlsList：返回一个类似数组的对象，表示是否显示控制栏的某些控件。该对象包含三个可能的值：`nodownload`、`nofullscreen`和`noremoteplayback`。该属性只读。
    > - HTMLMediaElement.crossOrigin：字符串，表示跨域请求时是否附带用户信息（比如 Cookie），对应 HTML 属性`crossorigin`。该属性只有两个可能的值：`anonymous`和`use-credentials`。
    > - HTMLMediaElement.currentSrc：字符串，表示当前正在播放的媒体文件的绝对路径。该属性只读。
    > - HTMLMediaElement.currentTime：浮点数，表示当前播放的时间点。
    > - HTMLMediaElement.defaultMuted：布尔值，表示默认是否关闭音量，对应 HTML 属性`muted`。
    > - HTMLMediaElement.defaultPlaybackRate：浮点数，表示默认的播放速率，默认是1.0。
    > - HTMLMediaElement.disableRemotePlayback：布尔值，是否允许远程回放，即远程回放的时候是否会有工具栏。
    > - HTMLMediaElement.duration：浮点数，表示媒体文件的时间长度（单位秒）。如果当前没有媒体文件，该属性返回0。该属性只读。
    > - HTMLMediaElement.ended：布尔值，表示当前媒体文件是否已经播放结束。该属性只读。
    > - HTMLMediaElement.error：返回最近一次报错的错误对象，如果没有报错，返回`null`。
    > - HTMLMediaElement.loop：布尔值，表示媒体文件是否会循环播放，对应 HTML 属性`loop`。
    > - HTMLMediaElement.muted：布尔值，表示音量是否关闭。
    > - HTMLMediaElement.networkState：当前网络状态，共有四个可能的值。0表示没有数据；1表示媒体元素处在激活状态，但是还没开始下载；2表示下载中；3表示没有找到媒体文件。
    > - HTMLMediaElement.paused：布尔值，表示媒体文件是否处在暂停状态。该属性只读。
    > - HTMLMediaElement.playbackRate：浮点数，表示媒体文件的播放速度，1.0是正常速度。如果是负数，表示向后播放。
    > - HTMLMediaElement.played：返回一个 TimeRanges 对象，表示播放的媒体内容。该属性只读。
    > - HTMLMediaElement.preload：字符串，表示应该预加载哪些内容，可能的值为`none`、`metadata`和`auto`。
    > - HTMLMediaElement.readyState：整数，表示媒体文件的准备状态，可能的值为0（没有任何数据）、1（已获取元数据）、2（可播放当前帧，但不足以播放多个帧）、3（可以播放多帧，至少为两帧）、4（可以流畅播放）。该属性只读。
    > - HTMLMediaElement.seekable：返回一个 TimeRanges 对象，表示一个用户可以搜索的媒体内容范围。该属性只读。
    > - HTMLMediaElement.seeking：布尔值，表示媒体文件是否正在寻找新位置。该属性只读。
    > - HTMLMediaElement.src：字符串，表示媒体文件所在的 URL，对应 HTML 属性`src`。
    > - HTMLMediaElement.srcObject：返回`src`属性对应的媒体文件资源，可能是`MediaStream`、`MediaSource`、`Blob`或`File`对象。直接指定这个属性，就可以播放媒体文件。
    > - HTMLMediaElement.textTracks：返回一个类似数组的对象，包含所有文本轨道。该属性只读。
    > - HTMLMediaElement.videoTracks：返回一个类似数组的对象，包含多有视频轨道。该属性只读。
    > - HTMLMediaElement.volume：浮点数，表示音量。0.0 表示静音，1.0 表示最大音量。
    >
    > `HTMLMediaElement`接口有如下方法。
    >
    > - HTMLMediaElement.addTextTrack()：添加文本轨道（比如字幕）到媒体文件。
    > - HTMLMediaElement.captureStream()：返回一个 MediaStream 对象，用来捕获当前媒体文件的流内容。
    > - HTMLMediaElement.canPlayType()：该方法接受一个 MIME 字符串作为参数，用来判断这种类型的媒体文件是否可以播放。该方法返回一个字符串，有三种可能的值，`probably`表示似乎可播放，`maybe`表示无法在不播放的情况下判断是否可播放，空字符串表示无法播放。
    > - HTMLMediaElement.fastSeek()：该方法接受一个浮点数作为参数，表示指定的时间（单位秒）。该方法将媒体文件移动到指定时间。
    > - HTMLMediaElement.load()：重新加载媒体文件。
    > - HTMLMediaElement.pause()：暂停播放。该方法没有返回值。
    > - HTMLMediaElement.play()：开始播放。该方法返回一个 Promise 对象。
    >
    > 下面是`play()`方法的一个例子。
    >
    > ```
    > var myVideo = document.getElementById('myVideoElement');
    > 
    > myVideo
    > .play()
    > .then(() => {
    >   console.log('playing');
    > })
    > .catch((error) => {
    >   console.log(error);
    > });
    > ```
    >
    > ## HTMLVideoElement 接口
    >
    > `HTMLVideoElement`接口代表了`<video>`元素。这个接口继承了`HTMLMediaElement`接口，并且有一些自己的属性和方法。
    >
    > HTMLVideoElement 接口的属性。
    >
    > - HTMLVideoElement.height：字符串，表示视频播放区域的高度（单位像素），对应 HTML 属性`height`。
    > - HTMLVideoElement.width：字符串，表示视频播放区域的宽度（单位像素），对应 HTML 属性`width`。
    > - HTMLVideoElement.videoHeight：该属性只读，返回一个整数，表示视频文件自身的高度（单位像素）。
    > - HTMLVideoElement.videoWidth：该属性只读，返回一个整数，表示视频文件自身的宽度（单位像素）。
    > - HTMLVideoElement.poster：字符串，表示一个图像文件的 URL，用来在无法获取视频文件时替代显示，对应 HTML 属性`poster`。
    >
    > HTMLVideoElement 接口的方法。
    >
    > - HTMLVideoElement.getVideoPlaybackQuality()：返回一个对象，包含了当前视频回放的一些数据。
    >
    > ## HTMLAudioElement 接口
    >
    > `HTMLAudioElement`接口代表了`<audio>`元素。
    >
    > 该接口继承了`HTMLMediaElement`，但是没有定义自己的属性和方法。浏览器原生提供一个`Audio()`构造函数，返回的就是`HTMLAudioElement`实例。
    >
    > ```
    > var song = new Audio([URLString]);
    > ```
    >
    > `Audio()`构造函数接受一个字符串作为参数，表示媒体文件的 URL。如果省略这个参数，可以稍后通过`src`属性指定。
    >
    > 生成`HTMLAudioElement`实例以后，不用插入 DOM，可以直接用`play()`方法在背景播放。
    >
    > ```
    > var a = new Audio();
    > if (a.canPlayType('audio/wav')) {
    >   a.src = 'soundeffect.wav';
    >   a.play();
    > }
    > ```
    >
    > ## 事件
    >
    > `<video>`和`<audio>`元素有以下事件。
    >
    >
    > - loadstart：开始加载媒体文件时触发。
    > - progress：媒体文件加载过程中触发，大概是每秒触发2到8次。
    > - loadedmetadata：媒体文件元数据加载成功时触发。
    > - loadeddata：当前播放位置加载成功后触发。
    > - canplay：已经加载了足够的数据，可以开始播放时触发，后面可能还会请求数据。
    > - canplaythrough：已经加载了足够的数据，可以一直播放时触发，后面不需要继续请求数据。
    > - suspend：已经缓冲了足够的数据，暂时停止下载时触发。
    > - stalled：尝试加载数据，但是没有数据返回时触发。
    > - play：调用`play()`方法时或自动播放启动时触发。如果已经加载了足够的数据，这个事件后面会紧跟`playing`事件，否则会触发`waiting`事件。
    > - waiting：由于没有足够的缓存数据，无法播放或播放停止时触发。一旦缓冲数据足够开始播放，后面就会紧跟`playing`事件。
    > - playing：媒体开始播放时触发。
    > - timeupdate：`currentTime`属性变化时触发，每秒可能触发4到60次。
    > - pause：调用`pause()`方法、播放暂停时触发。
    > - seeking：脚本或者用户要求播放某个没有缓冲的位置，播放停止开始加载数据时触发。此时，`seeking`属性返回`true`。
    > - seeked：`seeking`属性变回`false`时触发。
    > - ended：媒体文件播放完毕时触发。
    > - durationchange：`duration`属性变化时触发。
    > - volumechange：音量变化时触发。
    > - ratechange：播放速度或默认的播放速度变化时触发。
    > - abort：停止加载媒体文件时触发，通常是用户主动要求停止下载。
    > - error：网络或其他原因导致媒体文件无法加载时触发。
    > - emptied：由于`error`或`abort`事件导致`networkState`属性变成无法获取数据时触发。