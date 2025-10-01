- ## Fetch API

  > `fetch()`是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求。
  >
  > 浏览器原生提供这个对象。本章详细介绍它的用法。
  >
  > **注意**：Node.JS 环境下发起 HTTP 请求用的是Node的`http`模块，不能用 Fetch API，如果想用`fetch`的风格，可以借助第三方库`node-fetch`，它底层也是依赖了 http 模块的。

  - #### 基本用法

    > `fetch()`的功能与 XMLHttpRequest 基本相同，都是向服务器发出 HTTP 请求，但有三个主要的差异：
    >
    > 1. `fetch()`使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
    > 2. `fetch()`采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
    > 3. `fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHttpRequest 对象不支持数据流，所有的数据全部放在缓存里，不支持分块读取，必须等待全部获取后，再一次性读取。
    >
    > 用法上，`fetch()`接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。
    >
    > ```js
    > fetch(url)
    >   .then(...)
    >   .catch(...)
    > ```
    >
    > 下面是一个例子，从服务器获取 JSON 数据。
    >
    > ```js
    > fetch('https://api.github.com/users/ruanyf')
    >   .then(response => response.json())
    >   .then(json => console.log(json))
    >   .catch(err => console.log('Request Failed', err));
    > ```
    >
    > 上面示例中，`fetch()`接收到的`response`是一个 [Stream 对象](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)，里面的数据本例是 JSON 数据，所以使用`response.json()`方法，将其转为 JSON 对象。它是一个异步操作，返回一个 Promise 对象。
    >
    > Promise 可以使用 await 语法改写，使得语义更清晰：
    >
    > ```js
    > async function getJSON() {
    >   let url = 'https://api.github.com/users/ruanyf';
    >   try {
    >     let response = await fetch(url);
    >     return await response.json();
    >   } catch (error) {
    >   	console.log('Request Failed', error);
    >   }
    > }
    > ```
    >
    > 上面示例中，`await`语句必须放在`try...catch`里面，这样才能捕捉异步操作中可能发生的错误。
    >
    > 后文都采用`await`的写法，不再使用`.then()`的写法。

  - #### `Response` 对象：处理 HTTP 回应

    - ##### `Response` 对象的同步属性

      > `fetch()`请求成功以后，得到的是一个 [Response 对象](https://developer.mozilla.org/en-US/docs/Web/API/Response)。它对应服务器的 HTTP 回应。
      >
      > ```
      > const response = await fetch(url);
      > ```
      >
      > 前面说过，Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。
      >
      > ```js
      > async function fetchText() {
      >   	let response = await fetch('/readme.txt');
      >     console.log(response.status);
      >     console.log(response.statusText);
      > }
      > ```
      >
      > 上面示例中，`response.status`和`response.statusText`就是 Response 的同步属性，可以立即读取。
      >
      > 标头信息属性有下面这些：
      >
      > - **Response.ok**：`Response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应 HTTP 请求的状态码 200 到 299，`false`对应其他的状态码。
      >
      > - **Response.status**：`Response.status`属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
      >
      > - **Response.statusText**：`Response.statusText`属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回“OK”）。
      >
      > - **Response.url**：`Response.url`属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
      >
      > - **Response.type**：`Response.type`属性返回请求的类型。可能的值如下：
      >
      >   - `basic`：普通请求，即同源请求。
      >
      >   - `cors`：跨源请求。
      >
      >   - `error`：网络错误，主要用于 Service Worker。
      >
      >     > Service Worker是 Web Worker 的一部分，它专门用户网络模块。
      >
      >   - `opaque`：如果`fetch()`请求的`type`属性设为`no-cors`，就会返回这个值，详见请求部分。表示发出的是简单的跨源请求，类似`<form>`表单的那种跨源请求。
      >
      >   - `opaqueredirect`：如果`fetch()`请求的`redirect`属性设为`manual`，就会返回这个值，详见请求部分。
      > 
      > - **Response.redirected**：`Response.redirected`属性返回一个布尔值，表示请求是否发生过跳转。
      
    - ##### 判断请求是否成功
    
      > `fetch()`发出请求以后，有一个很重要的注意点：**只有网络错误，或者无法连接时，`fetch()`才会报错，其他情况都不会报错，而是认为请求成功**。
      >
      > 这就是说，即使服务器返回的状态码是 4xx 或 5xx，`fetch()`也不会报错（即 Promise 不会变为 `rejected`状态）。
      >
      > **只有通过`Response.status`属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功**。请看下面的例子。
      >
      > ```js
      > async function fetchText() {
      >     let response = await fetch('/readme.txt');
      >     if (response.status >= 200 && response.status < 300) {
      >      	return await response.text();
      >     } else {
      >      	throw new Error(response.statusText);
      >     }
      > }
      > ```
      >
      > 上面示例中，`response.status`属性只有等于 2xx （200~299），才能认定请求成功。这里**不用考虑网址跳转（状态码为 3xx），因为`fetch()`会将跳转的状态码自动转为 200**。
      >
      > 另一种方法是判断`response.ok`是否为`true`。
      >
      > ```js
      > if (response.ok) {
      >   	// 请求成功
      > } else {
      >   	// 请求失败
      > }
      > ```
    
    - ##### `Response.headers` 属性
    
      > Response 对象还有一个`Response.headers`属性，指向一个 [Headers 对象](https://developer.mozilla.org/en-US/docs/Web/API/Headers)，对应 HTTP 回应的所有标头。
      >
      > Headers 对象可以使用`for...of`循环进行遍历。
      >
      > ```js
      > const response = await fetch(url);
      > 
      > for (let [key, value] of response.headers) {
      >   	console.log(`${key} : ${value}`);
      > }
      > 
      > // 或者
      > for (let [key, value] of response.headers.entries()) {
      >   	console.log(`${key} : ${value}`);
      > }
      > ```
      >
      > Headers 对象提供了以下方法，用来操作标头：
      >
      > - `Headers.get()`：根据指定的键名，返回键值。
      > - `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
      > - `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
      > - `Headers.append()`：添加标头。
      > - `Headers.delete()`：删除标头。
      > - `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
      > - `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
      > - `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
      > - `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。
      >
      > 上面的有些方法可以修改标头，那是因为继承自 Headers 接口。对于 HTTP 回应来说，修改标头意义不大，况且很多标头是只读的，浏览器不允许修改。
      >
      > 这些方法中，最常用的是`response.headers.get()`，用于读取某个标头的值。
      >
      > ```js
      > let response =  await  fetch(url);
      > response.headers.get('Content-Type')
      > // application/json; charset=utf-8
      > ```
      >
      > `Headers.keys()`和`Headers.values()`方法用来分别遍历标头的键名和键值。
      >
      > ```js
      > // 键名
      > for(let key of myHeaders.keys()) {
      >   console.log(key);
      > }
      > 
      > // 键值
      > for(let value of myHeaders.values()) {
      >   console.log(value);
      > }
      > ```
      >
      > `Headers.forEach()`方法也可以遍历所有的键值和键名。
      >
      > ```js
      > let response = await fetch(url);
      > response.headers.forEach(
      >   (value, key) => console.log(key, ':', value)
      > );
      > ```
    
    - ##### 读取内容的方法
    
      > `Response`对象根据服务器返回的不同类型的数据，提供了不同的读取方法：
      >
      > - `response.text()`：得到文本字符串。
      > - `response.json()`：得到 JSON 对象。
      > - `response.blob()`：得到二进制 Blob 对象。
      > - `response.formData()`：得到 FormData 表单对象。
      > - `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象。
      >
      > 上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。
      >
      > 本质上来说：`fetch()`函数调用之后，只是去ping了一下服务器，测试网络链路是不是通的。真正去请求服务器的数据是在调用上面这些方法的时候。
      >
      > **response.text()**
      >
      > `response.text()`可以用于获取文本数据，比如 HTML 文件。
      >
      > ```js
      > const response = await fetch('/users.html');
      > const body = await response.text();
      > document.body.innerHTML = body
      > ```
      >
      > **response.json()**
      >
      > `response.json()`主要用于获取服务器返回的 JSON 数据，前面已经举过例子了。
      >
      > **response.formData()**
      >
      > `response.formData()`主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。
      >
      > **response.blob()**
      >
      > `response.blob()`用于获取二进制文件。
      >
      > ```js
      > const response = await fetch('flower.jpg');
      > const myBlob = await response.blob();
      > const objectURL = URL.createObjectURL(myBlob);
      > 
      > const myImage = document.querySelector('img');
      > myImage.src = objectURL;
      > ```
      >
      > 上面示例读取图片文件`flower.jpg`，显示在网页上。
      >
      > **response.arrayBuffer()**
      >
      > `response.arrayBuffer()`主要用于获取流媒体文件。比如播放一个实时的、非常大的视频文件。
      >
      > ```js
      > const audioCtx = new window.AudioContext();
      > const source = audioCtx.createBufferSource();
      > 
      > const response = await fetch('song.ogg');
      > const buffer = await response.arrayBuffer();
      > 
      > const decodeData = await audioCtx.decodeAudioData(buffer);
      > source.buffer = buffer;
      > source.connect(audioCtx.destination);
      > source.loop = true;
      > ```
      >
      > 上面示例是`response.arrayBuffer()`获取音频文件`song.ogg`，然后在线播放的例子。
    
    - ##### `Response.clone()`
    
      > Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。
      >
      > ```js
      > let text =  await response.text();
      > let json =  await response.json();  // 报错
      > ```
      >
      > 上面示例先使用了`response.text()`，就把 Stream 读完了。后面再调用`response.json()`，就没有内容可读了，所以报错。
      >
      > Response 对象提供`Response.clone()`方法，创建`Response`对象的副本，实现多次读取。
      >
      > ```js
      > const response1 = await fetch('flowers.jpg');
      > const response2 = response1.clone();
      > 
      > const myBlob1 = await response1.blob();
      > const myBlob2 = await response2.blob();
      > 
      > image1.src = URL.createObjectURL(myBlob1);
      > image2.src = URL.createObjectURL(myBlob2);
      > ```
      >
      > 上面示例中，`response.clone()`复制了一份 Response 对象，然后将同一张图片读取了两次。
      >
      > Response 对象还有一个`Response.redirect()`方法，用于将 Response 结果重定向到指定的 URL。该方法一般只用在 Service Worker 里面，这里就不介绍了。
    
    - ##### `Response.body` 属性
    
      > `Response.body`属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。
      >
      > 它可以用来分块读取内容，应用之一就是显示下载的进度。
      >
      > ```js
      > const response = await fetch('flower.jpg');
      > const reader = response.body.getReader();
      > 
      > while(true) {
      >   	const {done, value} = await reader.read();
      >   if (done) {
      >       break;
      >      }
      >     console.log(`Received ${value.length} bytes`)
      > }
      >   ```
      > 
      > 上面示例中，`response.body.getReader()`方法返回一个遍历器。这个遍历器的`read()`方法每次返回一个对象，表示本次读取的内容块。
      >
      > 这个对象的`done`属性是一个布尔值，用来判断有没有读完；`value`属性是一个 arrayBuffer 数组，表示内容块的内容，而`value.length`属性是当前块的大小。
    
  - #### `fetch()`的第二个参数：定制 HTTP 请求

    > `fetch()`的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。
    >
    > ```js
    > fetch(url, optionObj)
    > ```
    >
    > 上面命令的`optionObj`就是第二个参数。
    >
    > HTTP 请求的方法、标头、数据体都在这个对象里面设置。下面是一些示例。
    >
    > **（1）POST 请求**
    >
    > ```js
    > const response = await fetch(url, {
    >     method: 'POST',
    >     headers: {
    >        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    >     },
    >     body: 'foo=bar&lorem=ipsum',
    > });
    > 
    > const json = await response.json();
    > ```
    >
    > 上面示例中，配置对象用到了三个属性：
    >
    > > - `method`：HTTP 请求的方法，`POST`、`DELETE`、`PUT`都在这个属性设置。
    > > - `headers`：一个对象，用来定制 HTTP 请求的标头。
    > > - `body`：POST 请求的数据体。
    >
    > 注意，有些标头不能通过`headers`属性设置，比如`Content-Length`、`Cookie`、`Host`等等。它们是由浏览器自动生成，无法修改。
    >
    > **（2）提交 JSON 数据**
    >
    > ```js
    > const user =  { name:  'John', surname:  'Smith'  };
    > const response = await fetch('/article/fetch/post/user', {
    >   method: 'POST',
    >   headers: {
    >   	'Content-Type': 'application/json;charset=utf-8'
    >   }, 
    >   body: JSON.stringify(user) 
    > });
    > ```
    >
    > 上面示例中，标头`Content-Type`要设成`'application/json;charset=utf-8'`。因为默认发送的是纯文本，`Content-Type`的默认值是`'text/plain;charset=UTF-8'`。
    >
    > **（3）提交表单**
    >
    > ```js
    > const form = document.querySelector('form');
    > 
    > const response = await fetch('/users', {
    >   method: 'POST',
    >   body: new FormData(form)
    > })
    > ```
    >
    > **（4）文件上传**
    >
    > 如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。
    >
    > 另一种方法是用脚本添加文件，构造出一个表单，进行上传，请看下面的例子。
    >
    > ```js
    > const input = document.querySelector('input[type="file"]');
    > 
    > const data = new FormData();
    > data.append('file', input.files[0]);
    > data.append('user', 'foo');
    > 
    > fetch('/avatars', {
    >   method: 'POST',
    >   body: data
    > });
    > ```
    >
    > 上传二进制文件时，不用修改标头的`Content-Type`，浏览器会自动设置。
    >
    > **（5）直接上传二进制数据**
    >
    > `fetch()`也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在`body`属性里面。
    >
    > ```js
    > let blob = await new Promise(resolve =>
    >   canvasElem.toBlob(resolve,  'image/png')
    > );
    > 
    > let response = await fetch('/article/fetch/post/image', {
    >   method:  'POST',
    >   body: blob
    > });
    > ```

  - #### `fetch()`配置对象的完整 API

    > `fetch()`第二个参数的完整 API 如下。
    >
    > ```js
    > const response = fetch(url, {
    >     method: "GET",
    >     headers: {
    >      	"Content-Type": "text/plain;charset=UTF-8"
    >     },
    >     body: undefined,
    >     referrer: "about:client",
    >     referrerPolicy: "no-referrer-when-downgrade",
    >     mode: "cors",
    >     credentials: "same-origin",
    >     cache: "default",
    >     redirect: "follow",
    >     integrity: "",
    >     keepalive: false,
    >     signal: undefined
    > });
    > ```
    >
    > `fetch()`请求的底层用的是 [Request() 对象](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)的接口，参数完全一样，因此上面的 API 也是`Request()`的 API。
    >
    > 这些属性里面，`headers`、`body`、`method`前面已经给过示例了，下面是其他属性的介绍。
    >
    > **cache**
    >
    > `cache`属性指定如何处理缓存。可能的取值如下：
    >
    > - `default`：默认值，先在缓存里面寻找匹配的请求。
    > - `no-store`：直接请求远程服务器，并且不更新缓存。
    > - `reload`：直接请求远程服务器，并且更新缓存。
    > - `no-cache`：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
    > - `force-cache`：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
    > - `only-if-cached`：只检查缓存，如果缓存里面不存在，将返回504错误。
    >
    > **mode**
    >
    > `mode`属性指定请求的模式。可能的取值如下：
    >
    > - `cors`：默认值，允许跨源请求。
    > - `same-origin`：只允许同源请求。
    > - `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨源的复杂标头，相当于提交表单、`<script>`加载脚本、`<img>`加载图片等传统的跨源请求方法。
    >
    > **credentials**
    >
    > `credentials`属性指定是否发送 Cookie。可能的取值如下：
    >
    > - `same-origin`：默认值，同源请求时发送 Cookie，跨源请求时不发送。
    > - `include`：不管同源请求，还是跨源请求，一律发送 Cookie。
    > - `omit`：一律不发送。
    >
    > 跨源请求发送 Cookie，需要将`credentials`属性设为`include`。
    >
    > ```js
    > fetch('http://another.com', {
    >   credentials: "include"
    > });
    > ```
    >
    > **signal**
    >
    > `signal`属性指定一个 AbortSignal 实例，用于取消`fetch()`请求，详见下一节。
    >
    > **keepalive**
    >
    > `keepalive`属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。
    >
    > 一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。这时，如果不用`keepalive`属性，数据可能无法发送，因为浏览器已经把页面卸载了。
    >
    > ```js
    > window.onunload = function() {
    >   fetch('/analytics', {
    >     method: 'POST',
    >     headers: {
    >       'Content-Type': 'application/json'
    >     },
    >     body: JSON.stringify({
    >       some: 'data'
    >     }),
    >     keepalive: true
    >   });
    > };
    > ```
    >
    > **redirect**
    >
    > `redirect`属性指定 HTTP 跳转的处理方法。可能的取值如下：
    >
    > - `follow`：默认值，`fetch()`跟随 HTTP 跳转。
    > - `error`：如果发生跳转，`fetch()`就报错。
    > - `manual`：`fetch()`不跟随 HTTP 跳转，但是`response.url`属性会指向新的 URL，`response.redirected`属性会变为`true`，由开发者自己决定后续如何处理跳转。
    >
    > **integrity**
    >
    > `integrity`属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。
    >
    > 比如，下载文件时，检查文件的 SHA-256 哈希值是否相符，确保没有被篡改。
    >
    > ```js
    > fetch('http://site.com/file', {
    >   integrity: 'sha256-abcdef'
    > });
    > ```
    >
    > **referrer**
    >
    > `referrer`属性用于设定`fetch()`请求的`referer`标头。
    >
    > 这个属性可以为任意字符串，也可以设为空字符串（即不发送`referer`标头）。
    >
    > ```js
    > fetch('/page', {
    >   referrer: ''
    > });
    > ```
    >
    > **referrerPolicy**
    >
    > `referrerPolicy`属性用于设定`Referer`标头的规则。可能的取值如下：
    >
    > - `no-referrer-when-downgrade`：默认值，总是发送`Referer`标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
    > - `no-referrer`：不发送`Referer`标头。
    > - `origin`：`Referer`标头只包含域名，不包含完整的路径。
    > - `origin-when-cross-origin`：同源请求`Referer`标头包含完整的路径，跨源请求只包含域名。
    > - `same-origin`：跨源请求不发送`Referer`，同源请求发送。
    > - `strict-origin`：`Referer`标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送`Referer`标头。
    > - `strict-origin-when-cross-origin`：同源请求时`Referer`标头包含完整路径，跨源请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
    > - `unsafe-url`：不管什么情况，总是发送`Referer`标头。

  - #### 取消`fetch()`请求

    > `fetch()`请求发送以后，如果中途想要取消，需要使用`AbortController`对象。
    >
    > ```js
    > let controller = new AbortController();
    > let signal = controller.signal;
    > 
    > fetch(url, {
    >   	signal: controller.signal
    > });
    > 
    > signal.addEventListener('abort',
    >   	() => console.log('abort!')
    > );
    > 
    > controller.abort(); // 取消
    > 
    > console.log(signal.aborted); // true
    > ```
    >
    > 上面示例中，首先新建 AbortController 实例，然后发送`fetch()`请求，配置对象的`signal`属性必须指定接收 AbortController 实例发送的信号`controller.signal`。
    >
    > `controller.abort()`方法用于发出取消信号。这时会触发`abort`事件，这个事件可以监听，也可以通过`controller.signal.aborted`属性判断取消信号是否已经发出。
    >
    > 下面是一个1秒后自动取消请求的例子。
    >
    > ```js
    > let controller = new AbortController();
    > setTimeout(() => controller.abort(), 1000);
    > 
    > try {
    >     let response = await fetch('/long-operation', {
    >      	signal: controller.signal
    >   	});
    > } catch(err) {
    >     if (err.name == 'AbortError') {
    >      	console.log('Aborted!');
    >     } else {
    >      	throw err;
    >     }
    > }
    > ```

- ## FontFace API

  > FontFace API 用来控制字体加载。
  >
  > 这个 API 提供一个构造函数`FontFace()`，返回一个字体对象。
  >
  > ```js
  > new FontFace(family, source, descriptors)
  > ```
  >
  > `FontFace()`构造函数接受三个参数：
  >
  > - `family`：字符串，表示字体名，写法与 CSS 的`@font-face`的`font-family`属性相同。
  > - `source`：字体文件的 URL（必须包括 CSS 的`url()`方法），或者是一个字体的 ArrayBuffer 对象。
  > - `descriptors`：对象，用来定制字体文件。该参数可选。
  >
  > ```js
  > var fontFace = new FontFace(
  >   'Roboto',
  >   'url(https://fonts.example.com/roboto.woff2)'
  > );
  > 
  > fontFace.family // "Roboto"
  > ```
  >
  > `FontFace()`返回的是一个字体对象，这个对象包含字体信息。注意，这时**字体文件还没有开始加载**。
  >
  > 字体对象包含以下属性：
  >
  > - `FontFace.family`：字符串，表示字体的名字，等同于 CSS 的`font-family`属性。
  > - `FontFace.display`：字符串，指定字体加载期间如何展示，等同于 CSS 的`font-display`属性。它有五个可能的值：`auto`（由浏览器决定）、`block`（字体加载期间，前3秒会显示不出内容，然后只要还没完成加载，就一直显示后备字体）、`fallback`（前100毫秒显示不出内容，后3秒显示后备字体，然后只要字体还没完成加载，就一直显示后备字体）、`optional`（前100毫秒显示不出内容，然后只要字体还没有完成加载，就一直显示后备字体），`swap`（只要字体没有完成加载，就一直显示后备字体）。
  > - `FontFace.style`：字符串，等同于 CSS 的`font-style`属性。
  > - `FontFace.weight`：字符串，等同于 CSS 的`font-weight`属性。
  > - `FontFace.stretch`：字符串，等同于 CSS 的`font-stretch`属性。
  > - `FontFace.unicodeRange`：字符串，等同于`descriptors`对象的同名属性。
  > - `FontFace.variant`：字符串，等同于`descriptors`对象的同名属性。
  > - `FontFace.featureSettings`：字符串，等同于`descriptors`对象的同名属性。
  > - `FontFace.status`：字符串，表示字体的加载状态，有四个可能的值：`unloaded`、`loading`、`loaded`、`error`。该属性只读。
  > - `FontFace.loaded`：返回一个 Promise 对象，字体加载成功或失败，会导致该 Promise 状态改变。该属性只读。
  >
  > 字体对象的方法，只有一个`FontFace.load()`，该方法会真正开始加载字体。它返回一个 Promise 对象，状态由字体加载的结果决定。
  >
  > ```js
  > var f = new FontFace('test', 'url(x)');
  > 
  > f.load().then(function () {
  >   // 网页可以开始使用该字体
  > });
  > ```

- ## FormData 对象

  - #### 简介

    > FormData 代表表单数据，是浏览器的原生对象。
    >
    > 它可以当作构造函数使用，构造一个表单实例。
    >
    > ```js
    > const formData = new FormData();
    > ```
    >
    > 上面示例中，`FormData()`当作构造函数使用，返回一个空的表单实例对象。
    >
    > 它也可以接受一个表单的 DOM 节点当作参数，将表单的所有元素及其值，转换成一个个键值对，包含在返回的实例对象里面。
    >
    > ```js
    > const formData = new FormData(form);
    > ```
    >
    > 上面示例中，`FormData()`的参数`form`就是一个表单的 DOM 节点对象。
    >
    > 下面是用法示例，通过脚本发送表单数据。
    >
    > ```html
    > <form id="formElem">
    >   <input type="text" name="firstName" value="John">
    >   Picture: <input type="file" name="picture" accept="image/*">
    >   <input type="submit">
    > </form>
    > 
    > <script>
    >   formElem.onsubmit = async (e) => {
    >     e.preventDefault();
    > 
    >     let response = await fetch('/article/formdata/post/user-avatar', {
    >       method: 'POST',
    >       body: new FormData(formElem)
    >     });
    > 
    >     let result = await response.json();
    > 
    >     alert(result.message);
    >   };
    > </script>
    > ```
    >
    > 浏览器向服务器发送表单数据时，不管是用户点击 Submit 按钮发送，还是使用脚本发送，都会自动将其编码，并以`Content-Type: multipart/form-data`的形式发送。

  - #### 实例方法

    - ##### `append()`

      > `append()`用于添加一个键值对，即添加一个表单元素。它有两种使用形式。
      >
      > ```js
      > FormData.append(name, value)
      > FormData.append(name, blob, fileName)
      > ```
      >
      > 它的第一个参数是键名，第二个参数是键值。上面的第二种形式`FormData.append(name, blob, fileName)`，相当于添加一个文件选择器`<input type="file">`，第二个参数`blob`是文件的二进制内容，第三个参数`fileName`是文件名。
      >
      > 如果键名已经存在，它会为其添加新的键值，即同一个键名有多个键值。
      >
      > 下面是一个用法示例。
      >
      > ```js
      > let formData = new FormData();
      > formData.append('key1', 'value1');
      > formData.append('key2', 'value2');
      > 
      > for(let [name, value] of formData) {
      >   console.log(`${name} = ${value}`);
      > }
      > // key1 = value1
      > // key2 = value2
      > ```
      >
      > 下面是添加二进制文件的例子。
      >
      > ```js
      > // HTML 代码如下
      > // <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
      > 
      > let imageBlob = await new Promise(
      >   resolve => canvasElem.toBlob(resolve, 'image/png')
      > );
      > 
      > let formData = new FormData();
      > formData.append('image', imageBlob, 'image.png');
      > 
      > let response = await fetch('/article/formdata/post/image-form', {
      >   method: 'POST',
      >   body: formData
      > });
      > 
      > let result = await response.json();
      > console.log(result);
      > ```
      >
      > 下面是添加 XML 文件的例子：
      >
      > ```js
      > const content = '<q id="a"><span id="b">hey!</span></q>';
      > const blob = new Blob([content], { type: "text/xml" });
      > 
      > formData.append('userfile', blob);
      > ```

    - ##### `delete()`

      > `delete()`用于删除指定的键值对，它的参数为键名：`FormData.delete(name);`

    - ##### `entries()`

      > `entries()`返回一个迭代器，用于遍历所有键值对。下面是一个用法示例：
      >
      > ```js
      > const form = document.querySelector('#subscription');
      > const formData = new FormData(form);
      > const values = [...formData.entries()];
      > console.log(values);
      > ```
      >
      > 下面是使用`entries()`遍历键值对的例子：
      >
      > ```js
      > formData.append("key1", "value1");
      > formData.append("key2", "value2");
      > 
      > for (const pair of formData.entries()) {
      >   console.log(`${pair[0]}, ${pair[1]}`);
      > }
      > // key1, value1
      > // key2, value2
      > ```

    - ##### `get()`

      > `get()`用于获取指定键名的键值，它的参数为键名：`FormData.get(name)`
      >
      > 如果该键名有多个键值，只返回第一个键值。如果找不到指定键名，则返回`null`。

    - ##### `getAll()`

      > `getAll()`用于获取指定键名的所有键值，它的参数为键名，返回值为一个数组。如果找不到指定键名，则返回一个空数组：`FormData.getAll(name)`

    - ##### `has()`

      > `has()`返回一个布尔值，表示是否存在指定键名，它的参数为键名：`FormData.has(name)`

    - ##### `keys()`

      > `keys()`返回一个键名的迭代器，用于遍历所有键名。下面是用法示例：
      >
      > ```js
      > const formData = new FormData();
      > formData.append("key1", "value1");
      > formData.append("key2", "value2");
      > 
      > for (const key of formData.keys()) {
      >   console.log(key);
      > }
      > // key1
      > // key2
      > ```

    - ##### `set()`

      > `set()`用于为指定键名设置新的键值。它有两种使用形式。
      >
      > ```js
      > FormData.set(name, value);
      > FormData.set(name, blob, fileName);
      > ```
      >
      > 它的第一个参数为键名，第二个参数为键值。上面第二种形式为上传文件，第二个参数`blob`为文件的二进制内容，第三个参数`fileName`为文件名。该方法没有返回值。
      >
      > 如果指定键名不存在，它会添加该键名，否则它会丢弃所有现有的键值，确保一个键名只有一个键值。这是它跟`append()`的主要区别。

    - ##### `values()`

      > `values()`返回一个键值的迭代器，用于遍历所有键值。下面是用法示例：
      >
      > ```js
      > const formData = new FormData();
      > formData.append("key1", "value1");
      > formData.append("key2", "value2");
      > 
      > for (const value of formData.values()) {
      >   console.log(value);
      > }
      > // value1
      > // value2
      > ```

- ## Geolocation API

  > Geolocation API 用于获取用户的地理位置。
  >
  > 由于该功能涉及用户隐私，所以浏览器会提示用户，是否同意给出地理位置，用户可能会拒绝。另外，这个 API 只能在 HTTPS 环境使用。（`localhost`下也可以用）
  >
  > 浏览器通过`navigator.geolocation`属性提供该 API。

  - #### `Geolocation` 对象

    > `navigator.geolocation`属性返回一个 Geolocation 对象。该对象具有以下三个方法。
    >
    > - `Geolocation.getCurrentPosition()`：返回一个 Position 对象，表示用户的当前位置。
    > - `Geolocation.watchPosition()`：指定一个监听函数，每当用户的位置发生变化，就执行该监听函数。
    > - `Geolocation.clearWatch()`：取消`watchPosition()`方法指定的监听函数。

    - ##### `Geolocation.getCurrentPosition()`

      > `Geolocation.getCurrentPosition()`方法用于获取用户的位置。
      >
      > ```js
      > navigator.geolocation.getCurrentPosition(success, error, options)
      > ```
      >
      > 该方法接受三个参数。
      >
      > - `success`：用户同意给出位置时的回调函数，它的参数是一个 Position 对象。
      > - `error`：用户拒绝给出位置时的回调函数，它的参数是一个 PositionError 对象。该参数可选。
      > - `options`：参数对象，该参数可选。
      >
      > Position 对象有两个属性。
      >
      > - `Position.coords`：返回一个 Coordinates 对象，表示当前位置的坐标。
      > - `Position.timestamp`：返回一个对象，代表当前时间戳。
      >
      > PositionError 对象主要有两个属性。
      >
      > - `PositionError.code`：整数，表示发生错误的原因。`1`表示无权限，有可能是用户拒绝授权；`2`表示无法获得位置，可能设备有故障；`3`表示超时。
      > - `PositionError.message`：字符串，表示错误的描述。
      >
      > 参数对象`option`可以指定三个属性。
      >
      > - `enableHighAccuracy`：布尔值，是否返回高精度结果。如果设为`true`，可能导致响应时间变慢或（移动设备的）功耗增加；反之，如果设为`false`，设备可以更快速地响应。默认值为`false`。
      > - `timeout`：正整数，表示等待查询的最长时间，单位为毫秒。默认值为`Infinity`。
      > - `maximumAge`：正整数，表示可接受的缓存最长时间，单位为毫秒。如果设为`0`，表示不返回缓存值，必须查询当前的实际位置；如果设为`Infinity`，必须返回缓存值，不管缓存了多少时间。默认值为`0`。
      >
      > 下面是一个例子。
      >
      > ```js
      > var options = {
      >   enableHighAccuracy: true,
      >   timeout: 5000,
      >   maximumAge: 0
      > };
      > 
      > function success(pos) {
      >   var crd = pos.coords;
      > 
      >   console.log(`经度：${crd.latitude}`);
      >   console.log(`纬度：${crd.longitude}`);
      >   console.log(`误差：${crd.accuracy} 米`);
      > }
      > 
      > function error(err) {
      >   console.warn(`ERROR(${err.code}): ${err.message}`);
      > }
      > 
      > navigator.geolocation.getCurrentPosition(success, error, options);
      > ```

    - ##### `Geolocation.watchPosition()`

      > `Geolocation.watchPosition()`对象指定一个监听函数，每当用户的位置发生变化，就是自动执行这个函数。
      >
      > ```js
      > navigator.geolocation.watchPosition(success[, error[, options]])
      > ```
      >
      > 该方法接受三个参数。
      >
      > - `success`：监听成功的回调函数，该函数的参数为一个 Position 对象。
      > - `error`：该参数可选，表示监听失败的回调函数，该函数的参数是一个 PositionError 对象。
      > - `options`：该参数可选，表示监听的参数配置对象。
      >
      > 该方法返回一个整数值，表示监听函数的编号。该整数用来供`Geolocation.clearWatch()`方法取消监听。
      >
      > 下面是一个例子。
      >
      > ```js
      > var id;
      > 
      > var target = {
      >   latitude : 0,
      >   longitude: 0
      > };
      > 
      > var options = {
      >   enableHighAccuracy: false,
      >   timeout: 5000,
      >   maximumAge: 0
      > };
      > 
      > function success(pos) {
      >   var crd = pos.coords;
      > 
      >   if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      >     console.log('恭喜，你已经到达了指定位置。');
      >     navigator.geolocation.clearWatch(id);
      >   }
      > }
      > 
      > function error(err) {
      >   console.warn('ERROR(' + err.code + '): ' + err.message);
      > }
      > 
      > id = navigator.geolocation.watchPosition(success, error, options);
      > ```

    - ##### `Geolocation.clearWatch()`

      > `Geolocation.clearWatch()`方法用来取消`watchPosition()`方法指定的监听函数。它的参数是`watchPosition()`返回的监听函数的编号。
      >
      > ```js
      > navigator.geolocation.clearWatch(id);
      > ```
      >
      > 使用方法的例子见上一节。

  - #### `Coordinates` 对象

    > Coordinates 对象是地理位置的坐标接口，`Position.coords`属性返回的就是这个对象。
    >
    > 它有以下属性，全部为只读属性。
    >
    > - `Coordinates.latitude`：浮点数，表示纬度。
    > - `Coordinates.longitude`：浮点数，表示经度。
    > - `Coordinates.altitude`：浮点数，表示海拔（单位：米）。如果不可得，返回`null`。
    > - `Coordinates.accuracy`：浮点数，表示经度和纬度的精度（单位：米）。
    > - `Coordinates.altitudeAccuracy`：浮点数，表示海拔的精度（单位：米）。返回`null`。
    > - `Coordinates.speed`：浮点数，表示设备的速度（单位：米/秒）。如果不可得，返回`null`。
    > - `Coordinates.heading`：浮点数，表示设备前进的方向（单位：度）。方向按照顺时针，北方是0度，东方是90度，西方是270度。如果`Coordinates.speed`为0，`heading`属性返回`NaN`。如果设备无法提供方向信息，该属性返回`null`。
    >
    > 下面是一个例子。
    >
    > ```js
    > navigator.geolocation.getCurrentPosition( function (position) {
    >   let lat = position.coords.latitude;
    >   let long = position.coords.longitude;
    >   console.log(`纬度：${lat.toFixed(2)}`);
    >   console.log(`经度：${long.toFixed(2)}`);
    > });
    > ```

- ## Headers 对象

  - #### 简介

    > Headers 代表 HTTP 消息的数据头。
    >
    > 它通过`Headers()`构造方法，生成实例对象。`Request.headers`属性和`Response.headers`属性，指向的都是 Headers 实例对象。
    >
    > Headers 实例对象内部，以键值对的形式保存 HTTP 消息头，可以用`for...of`循环进行遍历，比如`for (const p of myHeaders)`。新建的 Headers 实例对象，内部是空的，需要用`append()`方法添加键值对。

  - #### 构造函数

    > `Headers()`构造函数用来新建 Headers 实例对象。
    >
    > ```js
    > const myHeaders = new Headers();
    > ```
    >
    > 它可以接受一个表示 HTTP 数据头的对象，或者另一个 Headers 实例对象，作为参数。
    >
    > ```js
    > const httpHeaders = {
    >   "Content-Type": "image/jpeg",
    >   "X-My-Custom-Header": "Zeke are cool",
    > };
    > const myHeaders = new Headers(httpHeaders);
    > ```
    >
    > 最后，它还可以接受一个键值对数组，作为参数。
    >
    > ```js
    > const headers = [
    >   ["Set-Cookie", "greeting=hello"],
    >   ["Set-Cookie", "name=world"],
    > ];
    > const myHeaders = new Headers(headers);
    > ```

  - #### 实例方法

    - ##### `append()`

      > `append()`方法用来添加字段。如果字段已经存在，它会将新的值添加到原有值的末端。
      >
      > 它接受两个参数，第一个是字段名，第二个是字段值。它没有返回值。
      >
      > ```js
      > append(name, value)
      > ```
      >
      > 下面是用法示例。
      >
      > ```js
      > const myHeaders = new Headers();
      > myHeaders.append("Content-Type", "image/jpeg");
      > ```
      >
      > 下面是同名字段已经存在的情况。
      >
      > ```js
      > myHeaders.append("Accept-Encoding", "deflate");
      > myHeaders.append("Accept-Encoding", "gzip");
      > myHeaders.get("Accept-Encoding"); // 'deflate, gzip'
      > ```
      >
      > 上面示例中，`Accept-Encoding`字段已经存在，所以`append()`会将新的值添加到原有值的末尾。

    - ##### `delete()`

      > `delete()`用来删除一个键值对，参数`name`指定删除的字段名。
      >
      > ```js
      > delete(name)
      > ```
      >
      > 如果参数`name`不是合法的字段名，或者是不可删除的字段，上面的命令会抛错。
      >
      > 下面是用法示例。
      >
      > ```js
      > const myHeaders = new Headers();
      > myHeaders.append("Content-Type", "image/jpeg");
      > myHeaders.delete("Content-Type");
      > ```

    - ##### `entries()`

      > `entries()`方法用来遍历所有键值对，返回一个 iterator 指针，供`for...of`循环使用。
      >
      > ```js
      > const myHeaders = new Headers();
      > myHeaders.append("Content-Type", "text/xml");
      > myHeaders.append("Vary", "Accept-Language");
      > 
      > for (const pair of myHeaders.entries()) {
      >   console.log(`${pair[0]}: ${pair[1]}`);
      > }
      > ```

    - ##### `forEach()`

      > `forEach()`方法用来遍历所有键值对，对每个指定键值对执行一个指定函数。
      >
      > 它的第一个参数是回调函数`callbackFn`，第二个参数`thisArg`是`callbackFn`所用的 this 对象。
      >
      > ```js
      > forEach(callbackFn)
      > forEach(callbackFn, thisArg)
      > ```
      >
      > 回调函数`callback`会接受到以下参数。
      >
      > - value：当前的字段值。
      > - key：当前的字段名。
      > - object：当前正在执行的 Headers 对象。
      >
      > 下面是用法示例。
      >
      > ```js
      > const myHeaders = new Headers();
      > myHeaders.append("Content-Type", "application/json");
      > myHeaders.append("Cookie", "This is a demo cookie");
      > myHeaders.append("compression", "gzip");
      > 
      > myHeaders.forEach((value, key) => {
      >   console.log(`${key} ==> ${value}`);
      > });
      > ```

    - ##### `get()`

      > `get()`方法用于取出指定字段的字段值，它的参数就是字段名。如果字段名不合法（比如包含中文字符），它会抛错；如果字段在当前 Headers 对象不存在，它返回`null`。
      >
      > ```js
      > get(name)
      > ```
      >
      > 下面是用法示例。
      >
      > ```js
      > myHeaders.append("Content-Type", "image/jpeg");
      > myHeaders.get("Content-Type"); // "image/jpeg"
      > ```
      >
      > 如果当前字段有多个值，`get()`会返回所有值。

    - ##### `getSetCookie()`

      > `getSetCookie()`返回一个数组，包含所有`Set-Cookie`设定的 Cookie 值。
      >
      > ```js
      > const headers = new Headers({
      >   "Set-Cookie": "name1=value1",
      > });
      > 
      > headers.append("Set-Cookie", "name2=value2");
      > 
      > headers.getSetCookie();
      > // ["name1=value1", "name2=value2"]
      > ```

    - ##### `has()`

      > `has()`返回一个布尔值，表示 Headers 对象是否包含指定字段。
      >
      > ```js
      > has(name)
      > ```
      >
      > 如果参数`name`不是有效的 HTTP 数据头的字段名，该方法会报错。
      >
      > 下面是用法示例。
      >
      > ```js
      > myHeaders.append("Content-Type", "image/jpeg");
      > myHeaders.has("Content-Type"); // true
      > myHeaders.has("Accept-Encoding"); // false
      > ```

    - ##### `keys()`

      > `keys()`方法用来遍历 Headers 数据头的所有字段名。它返回的是一个 iterator 对象，供`for...of`使用。
      >
      > ```js
      > const myHeaders = new Headers();
      > myHeaders.append("Content-Type", "text/xml");
      > myHeaders.append("Vary", "Accept-Language");
      > 
      > for (const key of myHeaders.keys()) {
      >   console.log(key);
      > }
      > ```

    - ##### `set()`

      > `set()`方法用来为指定字段添加字段值。如果字段不存在，就添加该字段；如果字段已存在，就用新的值替换老的值，这是它与`append()`方法的主要区别。
      >
      > 它的第一个参数`name`是字段名，第二个参数`value`是字段值。
      >
      > ```js
      > set(name, value)
      > ```
      >
      > 下面是用法示例。
      >
      > ```js
      > const myHeaders = new Headers();
      > myHeaders.set("Accept-Encoding", "deflate");
      > myHeaders.set("Accept-Encoding", "gzip");
      > myHeaders.get("Accept-Encoding"); // 'gzip'
      > ```
      >
      > 上面示例中，连续两次使用`set()`对`Accept-Encoding`赋值，第二个值会覆盖第一个值。

    - ##### `values()`

      > `values()`方法用来遍历 Headers 对象的字段值。它返回一个 iterator 对象，供`for...of`使用。
      >
      > ```js
      > const myHeaders = new Headers();
      > myHeaders.append("Content-Type", "text/xml");
      > myHeaders.append("Vary", "Accept-Language");
      > 
      > for (const value of myHeaders.values()) {
      >   console.log(value);
      > }
      > ```

- ## IntersectionObserver

  > 网页开发时，常常需要了解某个元素是否进入了“视口”（viewport），即用户能不能看到它。
  >
  > 传统的实现方法是，监听到`scroll`事件后，调用目标元素的`getBoundingClientRect()`方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于`scroll`事件密集发生，计算量很大，容易造成性能问题。
  >
  > [IntersectionObserver API](https://wicg.github.io/IntersectionObserver/)，可以自动“观察”元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做“交叉观察器”（intersection oberserver）。

  - #### 简介

    > IntersectionObserver API 的用法，简单来说就是两行。
    >
    > ```
    > var observer = new IntersectionObserver(callback, options);
    > observer.observe(target);
    > ```
    >
    > 上面代码中，`IntersectionObserver`是浏览器原生提供的构造函数，接受两个参数：`callback`是可见性变化时的回调函数，`option`是配置对象（该参数可选）。
    >
    > `IntersectionObserver()`的返回值是一个观察器实例。实例的`observe()`方法可以指定观察哪个 DOM 节点。
    >
    > ```
    > // 开始观察
    > observer.observe(document.getElementById('example'));
    > 
    > // 停止观察
    > observer.unobserve(element);
    > 
    > // 关闭观察器
    > observer.disconnect();
    > ```
    >
    > 上面代码中，`observe()`的参数是一个 DOM 节点对象。如果要观察多个节点，就要多次调用这个方法。
    >
    > ```
    > observer.observe(elementA);
    > observer.observe(elementB);
    > ```
    >
    > 注意，IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。规格写明，`IntersectionObserver`的实现，应该采用`requestIdleCallback()`，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。

  - #### `IntersectionObserver.observe()`

    > IntersectionObserver 实例的`observe()`方法用来启动对一个 DOM 元素的观察。该方法接受两个参数：回调函数`callback`和配置对象`options`。

    - ##### `callback` 参数

      > 目标元素的可见性变化时，就会调用观察器的回调函数`callback`。
      >
      > `callback`会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。
      >
      > ```
      > var observer = new IntersectionObserver(
      >   (entries, observer) => {
      >     console.log(entries);
      >   }
      > );
      > ```
      >
      > 上面代码中，回调函数采用的是箭头函数的写法。`callback`函数的参数（`entries`）是一个数组，每个成员都是一个[`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)对象（详见下文）。举例来说，如果同时有两个被观察的对象的可见性发生变化，`entries`数组就会有两个成员。

    - ##### `IntersectionObserverEntry` 对象

      > `IntersectionObserverEntry`对象提供目标元素的信息，一共有六个属性。
      >
      > ```
      > {
      >   time: 3893.92,
      >   rootBounds: ClientRect {
      >     bottom: 920,
      >     height: 1024,
      >     left: 0,
      >     right: 1024,
      >     top: 0,
      >     width: 920
      >   },
      >   boundingClientRect: ClientRect {
      >      // ...
      >   },
      >   intersectionRect: ClientRect {
      >     // ...
      >   },
      >   intersectionRatio: 0.54,
      >   target: element
      > }
      > ```
      >
      > 每个属性的含义如下。
      >
      > > - `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
      > > - `target`：被观察的目标元素，是一个 DOM 节点对象
      > > - `rootBounds`：容器元素的矩形区域的信息，`getBoundingClientRect()`方法的返回值，如果没有容器元素（即直接相对于视口滚动），则返回`null`
      > > - `boundingClientRect`：目标元素的矩形区域的信息
      > > - `intersectionRect`：目标元素与视口（或容器元素）的交叉区域的信息
      > > - `intersectionRatio`：目标元素的可见比例，即`intersectionRect`占`boundingClientRect`的比例，完全可见时为`1`，完全不可见时小于等于`0`
      >
      > ![bg2016110202](./assets/bg2016110202.png)
      >
      > 上图中，灰色的水平方框代表视口，深红色的区域代表四个被观察的目标元素。它们各自的`intersectionRatio`图中都已经注明。
      >
      > 我写了一个Demo，演示`IntersectionObserverEntry`对象。注意，这个 Demo 只能在 Chrome 51+ 运行。

    - ##### `Option` 对象

      > `IntersectionObserver`构造函数的第二个参数是一个配置对象。它可以设置以下属性。
      >
      > **（1）threshold 属性**
      >
      > `threshold`属性决定了什么时候触发回调函数，即元素进入视口（或者容器元素）多少比例时，执行回调函数。它是一个数组，每个成员都是一个门槛值，默认为`[0]`，即交叉比例（`intersectionRatio`）达到`0`时触发回调函数。
      >
      > 如果`threshold`属性是0.5，当元素进入视口50%时，触发回调函数。如果值为`[0.3, 0.6]`，则当元素进入30％和60％是触发回调函数。
      >
      > ```
      > new IntersectionObserver(
      >   entries => {/* … */},
      >   {
      >     threshold: [0, 0.25, 0.5, 0.75, 1]
      >   }
      > );
      > ```
      >
      > 用户可以自定义这个数组。比如，上例的`[0, 0.25, 0.5, 0.75, 1]`就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。
      >
      > **（2）root 属性，rootMargin 属性**
      >
      > `IntersectionObserver`不仅可以观察元素相对于视口的可见性，还可以观察元素相对于其所在容器的可见性。容器内滚动也会影响目标元素的可见性，参见本文开始时的那张示意图。
      >
      > IntersectionObserver API 支持容器内滚动。`root`属性指定目标元素所在的容器节点。注意，容器元素必须是目标元素的祖先节点。
      >
      > ```
      > var opts = {
      >   root: document.querySelector('.container'),
      >   rootMargin: '0px 0px -200px 0px'
      > };
      > 
      > var observer = new IntersectionObserver(
      >   callback,
      >   opts
      > );
      > ```
      >
      > 上面代码中，除了`root`属性，还有[`rootMargin`](https://wicg.github.io/IntersectionObserver/#dom-intersectionobserverinit-rootmargin)属性。该属性用来扩展或缩小`rootBounds`这个矩形的大小，从而影响`intersectionRect`交叉区域的大小。它的写法类似于 CSS 的`margin`属性，比如`0px 0px 0px 0px`，依次表示 top、right、bottom 和 left 四个方向的值。
      >
      > 上例的`0px 0px -200px 0px`，表示容器的下边缘向上收缩200像素，导致页面向下滚动时，目标元素的顶部进入可视区域200像素以后，才会触发回调函数。
      >
      > 这样设置以后，不管是窗口滚动或者容器内滚动，只要目标元素可见性变化，都会触发观察器。

  - #### 实例

    - ##### 惰加载（lazy load）

      > 有时，我们希望某些静态资源（比如图片），只有用户向下滚动，它们进入视口时才加载，这样可以节省带宽，提高网页性能。这就叫做“惰性加载”。
      >
      > 有了 IntersectionObserver API，实现起来就很容易了。图像的 HTML 代码可以写成下面这样。
      >
      > ```
      > <img src="placeholder.png" data-src="img-1.jpg">
      > <img src="placeholder.png" data-src="img-2.jpg">
      > <img src="placeholder.png" data-src="img-3.jpg">
      > ```
      >
      > 上面代码中，图像默认显示一个占位符，`data-src`属性是惰性加载的真正图像。
      >
      > ```
      > function query(selector) {
      >   return Array.from(document.querySelectorAll(selector));
      > }
      > 
      > var observer = new IntersectionObserver(
      >   function(entries) {
      >     entries.forEach(function(entry) {
      >       entry.target.src = entry.target.dataset.src;
      >       observer.unobserve(entry.target);
      >     });
      >   }
      > );
      > 
      > query('.lazy-loaded').forEach(function (item) {
      >   observer.observe(item);
      > });
      > ```
      >
      > 上面代码中，只有图像开始可见时，才会加载真正的图像文件。

    - ##### 无限滚动

      > 无限滚动（infinite scroll）指的是，随着网页滚动到底部，不断加载新的内容到页面，它的实现也很简单。
      >
      > ```
      > var intersectionObserver = new IntersectionObserver(
      >   function (entries) {
      >     // 如果不可见，就返回
      >     if (entries[0].intersectionRatio <= 0) return;
      >     loadItems(10);
      >     console.log('Loaded new items');
      >   }
      > );
      > 
      > // 开始观察
      > intersectionObserver.observe(
      >   document.querySelector('.scrollerFooter')
      > );
      > ```
      >
      > 无限滚动时，最好像上例那样，页面底部有一个页尾栏（又称[sentinels](https://wangdoc.com/webapi/sentinels)，上例是`.scrollerFooter`）。一旦页尾栏可见，就表示用户到达了页面底部，从而加载新的条目放在页尾栏前面。否则就需要每一次页面加入新内容时，都调用`observe()`方法，对新增内容的底部建立观察。

    - ##### 视频自动播放

      > 下面是一个视频元素，希望它完全进入视口的时候自动播放，离开视口的时候自动暂停。
      >
      > ```
      > <video src="foo.mp4" controls=""></video>
      > ```
      >
      > 下面是 JS 代码。
      >
      > ```
      > let video = document.querySelector('video');
      > let isPaused = false;
      > 
      > let observer = new IntersectionObserver((entries, observer) => {
      >   entries.forEach(entry => {
      >     if (entry.intersectionRatio != 1  && !video.paused) {
      >       video.pause();
      >       isPaused = true;
      >     } else if (isPaused) {
      >       video.play();
      >       isPaused=false;
      >     }
      >   });
      > }, {threshold: 1});
      > 
      > observer.observe(video);
      > ```
      >
      > 上面代码中，`IntersectionObserver()`的第二个参数是配置对象，它的`threshold`属性等于`1`，即目标元素完全可见时触发回调函数。


------

