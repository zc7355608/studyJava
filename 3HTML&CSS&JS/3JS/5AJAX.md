# AJAX

------

### 什么是AJAX?

> AJAX（Asynchronous Javascript And Xml）：异步js和xml的一个技术。简单来说就是使用浏览器的内置对象XMLHttpRequest对象与服务器进行异步通信的一个技术。

### 传统请求及缺点

> 传统请求有哪些方式？
> - 直接在浏览器地址栏上输入URL
> - 超链接
> - form表单
> - 使用img标签发送资源请求
> - ...
>
> 传统请求存在的问题：页面全部刷新导致了用户的体验极差。传统的请求导致用户的体验有空白期，体验不连贯。因为一点链接发送请求过去之后，页面内容就被清空了，空白了，只能等请求处理完毕之后响应回来全新的数据，如果网络不太好，那么对于用户来说体验很差。能不能只刷新网页中的部分区域呢？可以，通过AJAX。

### AJAX概述：

> - AJAX不能称为一种技术，属于JS代码发送http请求，它和普通a标签发送请求的方式不同，它默认发送的是异步请求，不会刷新整个页面。
> - 什么是异步，什么是同步？假设有t1和t2线程，t1和t2线程同时并发进行，谁也不影响谁，这就是异步。如果t1和t2排队执行，需要等待前面线程t1执行完毕t2才能开始执行，这就是同步，同步就是排队。
> - AJAX就可以发送异步http请求。也就是说，发送请求时不影响页面加载或下面代码的执行，等请求回来后，触发某事件，再执行数据的渲染，这样就完成了网页的局部刷新。
> - 我们之前通过浏览器地址栏上发送`get/post`请求就不是异步的，是同步请求。如果网络不好，页面要一直转圈直到S端响应
> - AJAX传输的数据格式可以是：xml、txt文本、JSON文本、HTML文本等。
> - AJAX可以做到在一个网页中同时启动多个请求，类似于网页中启动多个线程，一个线程对应一个请求。这些请求可以是同步的也可以是异步的。具体哪种可以设置。
> - 在js中发送http请求的其中一种方式就是使用“XMLHttpRequest对象”，我们这里就采用这种方式来发送异步请求。
> - AJAX请求也有缺点：
>   1. 没有浏览历史，不能像普通请求一样回退
>   2. 存在“AJAX跨域”的问题。跨域是指在网页中，一个域（站点）的页面通过AJAX访问另一个域的资源时，由于浏览器的同源策略（Same Origin Policy）的限制，导致请求被阻止的情况。跨域是由于浏览器的安全机制，为了防止恶意网站窃取用户信息或进行恶意操作而设立的。
>   3. 对SEO（搜索引擎优化）不友好。因为第一次请求网页时，这些内容并没有在源代码中，所以搜索引擎爬虫找不到这些内容所以无法进行优化。

### AJAX4步：

```js
document.querySelector("#btn").onclick = function(){
//AJAX4步
    //	1、创建ajax核心对象（通过XMLHttpRequest()构造函数）
    const xhr = new XMLHttpRequest()

    //	2、请求初始化，开启tcp链接通道
    //第1个参数设置请求类型（大写），第2个参数设置请求url，如果是get请求url中还有查询字符串，第3个参数true表示异步的（默认）
    xhr.open("GET","/module1?usercode=110&user=zhangsan",true)

    //	3、发送请求（请求的一些设置要在发送之前做）；如果是post请求，要将数据作为参数传进去；
    xhr.send();

    //	4、注册回调函数
    xhr.addEventListener('readystatechange', () => {//也可以用loadend事件，无论成功还是失败都会调用回调函数
        if (xhr.readyState === 4) {//readyState属性保存http请求的实时状态
            //status属性保存http协议的“响应状态码”；2开头的都是成功
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.getAllResponseHeaders());//获取所有响应头
                console.log(xhr.response);//response属性保存响应体
                console.log(responseText);//以文本的方式解析响应体
            }else{
                //响应失败打印状态码
                console.log(xhr.status);
                //响应状态描述
                console.log(xhr.statusText);
            }
        }
    })
    //第4步也可以这样
//    xhr.addEventListener('loadend', () => {
//        console.log(xhr.response)
//    }
}
```

### 关于XMLHttpRequest对象：

> `XMLHttpRequest`对象是AJAX的核心对象，发送ajax请求以及接收返回来的数据就全靠它了，xhr对象现在的浏览器都支持，都“内置”了该对象的构造函数，直接用就行。

- 属性：

  > - `readyState`：AJAX请求对象xhr的请求状态。它有5个值：0请求未初始化（xhr对象刚new出来的初值），1链接已建立（`open()`已执行），2请求已收到（`send()`已执行），3正在处理返会结果，4结构已处理完毕，请求结束。（所以`readystatechange`是一个事件，就是指，xhr的`readystate`属性发生了改变这个事件，也就是请求状态发生了改变）
  > - `status`：保存http协议的“响应状态码”
  > - `statusText`：保存http响应状态的描述信息
  > - `response`：响应体，它根据xhr对象的`responseType`属性来解析响应体。如果未设置`responseType`，默认根据S端设置的，响应头的`Content-Type`来解析响应体数据，通常不用设置`responseType`
  > - `responseText`：纯文本方式解析响应体
  > - `responseXML`：以XML文本的方式解析响应体数据
  > - `responseType`：设置响应体的内容类型（String），response中会根据该属性的设置来决定如何解析响应体数据。值可以是：'xml'、'json'、'script'、'html'、'text'等。默认是text文本数据。不设置会根据响应头的设置来解析。
  > - `timeout`：用于设置超时取消。值2000表示2000ms后还不响应就取消请求。它还对应一个事件`timeout`，用于超时处理，`error`表示断网事件

- 方法：

  > - `open('POST',url,async,user,psw)`：建立tcp链接，打开数据流通道。参数1是请求类型，参数2是url请求路径，参数3是true异步或false同步。user和psw是可选的，需不需要密码认证得看服务器端要求。
  > - `send()/send(string)`：发送请求；如果是post请求，数据要作为String型参数传进去。参数类型还可以是`ArrayBuffer、Blob、Document、FormData`等类型。
  > - `getAllResponseHeaders()`：获取所有响应头
  > - `getResponseHeader('响应头')`：获取特定的响应头
  > - `setRequestHeader()`：设置请求头。如果要发送post请求，发送之前需要通过此方法指定请求头：`xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")`，指定请求体的内容类型
  > - `abort()`：取消当前请求

------

### 通过jQuery来发送AJAX请求：

```js
//还有`$.get()`和`$.post()`函数
$.ajax({
    type: 'GET/POST',
	//设置请求体的MIME类型，相当于xhr.setRequestHeader('Content-Type','application/json')
	contentType: 'application/json',
    url: '',
    data: {},//请求体提交的数据
    dataType: 'json',//以什么方式解析响应的数据，相当于responseType
    success: function(data){},
    timeout: 2000,//超时时间为2秒钟
    error: function(xhr, status, error){},
    complete: function(xhr){},//请求完成后，无论成功或失败都会调用该函数
    headers: {
        contentType: 'application/json',
//自定义请求头，此时后端应该：response.setHeader("Access-Control-Allow-Headers", "*");允许这个自定义头，否则前端会报错
        "自定义请求头": "值"
    }
})
```

------

### 通过axios来发送AJAX请求：（axios的原理是通过Promise）

> `axios`是目前前端最热门的ajax工具包，使用频率很高，而且是Vue和React都推荐的工具。
>
> 使用之前先引入js文件，我们这里直接用在线地址：`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
>
> 使用：

```js
//还有`axios.get()`和`axios.post()`函数
axios({
    method: 'post',//请求方式
    url: 'https://api.example.com/data',
    params: {name: zs, age: 12},//查询字符串
    data: { name: 'John', age: 30 },//请求体的数据，如果data后面是对象，那么会自动转成JSON串给服务器
    headers: {//设置请求头
        'Content-Type': 'application/json', // 设置请求头中的Content-Type，这里是JSON格式
    }
}).then(function (result) {//请求完成，成功时调用该回调函数
    console.log('Response data: ', result.data)
}).catch(function (error) {//请求失败时的回调函数
    console.error(error)
})
```

> 实际上在axios函数中new了一个`Promise`对象，在该Promise构造器中完成了AJAX，最后返回了该Promise对象

------

### jQuery的fetch函数发送AJAX请求：

> 通过JS的全局函数`fetch()`也可以发送AJAX请求，它是`XMLHttpRequest`的升级版。用法：

```js
fetch('url?name=value..',{
    method: 'POST',
    headers: {(添加头文件)
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body: '请求体数据'
}).then(function(response)){
    return response.json()
}.then(response){
    console.log(response)
}
```

------

### AJAX的跨域访问：

```js
AJAX跨域问题：（默认不能跨域）
	# 什么是跨域：就是通过a服务器上的html链接跳转到b服务器上的某个资源，访问别人的东西
		* 通过超链接可以跨域
		* 通过form表单也可以跨域
		* 通过JS中的document.location.href也可以跨域
		* 通过window.open("URL")也可以跨域
		* 通过<script/>标签通过src加载js文件，也可以跨域加载
		* 图片的src属性也可以跨域加载
	# 以上这些都可以跨域访问，这是因为它们都有一个共同点：就是它们的路径都是写了一个完整的URL，并且浏览器地址栏改变了，那什么情况下跨域访问会出现问题呢？
		默认情况下，html中发送AJAX跨域请求的时候，console控制台会报错：发送ajax跨域请求已被“同源策略”阻止；
	# 什么是“同源策略”？为什么会出现这种情况？
		发送ajax请求的html资源，它当前的url地址是a服务器，此时ajax请求发给a服务器，没有问题。
        但是当发给b服务器时，浏览器发现当前资源和发送地址不属于同一个服务器，浏览器的安全机制“同源策略”
        会阻止ajax请求的发送。因为在自己的a站点当中，访问其他站点（b站点）中的资源，跨域了，浏览器中内置的
        xhr对象默认是不允许被两个不同站点同时使用的，所以ajax请求不能跨域访问，这是浏览器设计者为了安全考虑的。
	# “同源策略”是浏览器的一种安全策略
		什么是同源：协议一致、域名一致、端口一致，才是同源，只要以上的任一元素不一致，就不是同源；同源表示网络上的同一台服务器；AJAX的XMLHttpRequest对象默认要遵循同源策略；
	# 但开发中我们不免要跨域进行ajax请求，那么怎么解决ajax跨域访问呢？
-------------------------------------------------------------------------------------------------------------------------
* 方案1：jsonp（json with padding），它是非官方的跨域解决方案，野路子，纯粹是靠程序员的聪明想到的；（注意：这种方式只支持get请求）
	# 原理：jsonp不是一个真正的ajax请求，只不过同样可以完成类似于ajax的那种局部刷新的效果，顺带着可以解决跨域问题；jsonp是一种“类ajax请求”的机制；
	# 我们知道，script标签是可以跨域的，src属性可以是任意位置的js文件，那么这个路径可以是一个servlet吗？
		当然可以，我们通过script标签引入.js文件的方式，S端响应内容模拟js文件中的内容，实现跨域访问；
	# 用法：
		html中：
			<head>
				<meta charset="UTF-8">
				<title>jsonp的方式解决ajax跨域问题</title>
			</head>
			<body>
				<button id="btn">jsonp方式解决ajax跨域</button>
				<div id="mydiv"></div>
				<script>
					function sayHello(data){
						document.getELementyId("mydiv").innerHTML = data.username
					}
				</script>
				<script src="http://xx:xx/xxx/app.js"></script>
			</body>
		网络其他位置的app.js中：
			const data = {"username": "LUCY"}
			sayHello(data)
	# 上面的代码中，script标签的src就相当于给某个服务器上发送了异步请求，通过服务器返回来的“json”数据，再加上补全了函数调用（调用我自己定义的函数），
		这就是json with padding的由来；所以这种方式可以完成ajax的效果，还顺带解决了跨域问题；
		（注意：要提前告诉S端服务器，要调用函数的函数名；并且注意返回内容得是js代码）

	# 明白了上面代码的原理的话，我们也可以这样写：函数提前声明好，然后当某个事件发生时，我们用js代码给html中添加script标签，src指定下要请求的路径，
		数据和函数调用由S端响应回来，这样也可以完成ajax请求；如下：
			document.getElementById("btn").onclick = () => {
				//创建一个script标签元素
				const htmlScriptElement = document.createElement("script")
				//设置script的src属性，并在后面添加url参数，来告诉S端，一会返回时给我调用哪个函数
				htmlScriptElement.src = "http://localhost:8080/jsonp2?callback=sayHello"
				//将script元素添加到body标签中，此时就会发送请求
				document.getElementByTagName("body")[0].appendChild(htmlScriptElement)
			}

		S端服务器的servlet中这样做：
			@WebServlet("/jsonp2")
			public class JSONServlet2 extends HttpServlet {
				@Override
				protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
						throws ServletException, IOException {
						//获取函数
					String functionName = req.getParameter("callback");
						//设置响应的内容为js文件
					resp.setContentType("application/Javascript");
						//响应一段js代码，该js代码就相当于在js文件中这样配置了：sayHello({"username":"LUCY"})，
					resp.getWriter().print(functionName +"({\"username\":\"LUCY\"})");
				}
			}
-------------------------------------------------------------------------------------------------------------------------
* 方案2：jQuery库已经封装好了jsonp，它和我们方案1的原理相同，直接用即可
	html中:
		<button>获取内容</button>
		<div></div>
		<script>
			$(function (){
				$("button").click(function (){
						//使用jquery库的函数，发送伪ajax请求，本质上是jsonp乔装打扮的
					$.ajax({
						type : "GET",	//注意：jsonp只支持get请求，这里必须是get方式；省略的话默认也是get
							//注意：这里的url里没有跟数据，此时servlet不知道我给你返回数据时，要调用哪个函数
						url : "http://localhost:8080/web01",//其实这里url不告诉S端函数名的话，默认传过去的是【callback】函数
											//servlet代码需要获取callback关键字，返回数据时执行callback(data)函数
											//该函数会在本页script代码块中自动生成并且调用下方的success函数
							//一定要指定返回的数据类型为“jsonp”（关键）
						dataType : "jsonp",
						success : function (data){	//data通常是一个json数据：{"username":"张三"}
							$("#mydiv").html("欢迎你："+ data.username)
						}
					})
				})
			})
		</script>
		**如果想换个函数名，不用callback()，后端代码写的就是xxx函数名，只能前端改，可以这样：
			加两个属性：
			jsonp: "后端的函数名"
			jsonpCallback: "前端的函数名"	//指定它的话就可以将success删掉了
-------------------------------------------------------------------------------------------------------------------------
* 方案3：CORS（Cross-Origin Resource Sharing）跨域资源共享
	它是官方正统的跨域解决方案，它的特点是不需要在前端做任何操作，只在后端设置，且支持get和post（其他也可以设置），推荐；
	用法：在servlet中设置响应头；response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080/");
			表示：允许这个源：http://localhost:8080/ 也就是这台服务器对我的资源进行ajax跨域访问，允许你访问我这个xhr对象；
			如果是“*”表示该站点的资源允许所有服务器进行ajax跨域访问；
```

------

