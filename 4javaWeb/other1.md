# JavaWeb

```txt
------------------------------------------------------------------------------------------------
· 关于HttpServletRequest接口：
	* 它的父接口是ServletRequest（顶级父接口）。在doGet方法中有2个参数，我们直接把传进来的参数拿来用。
	为什么呢？这是谁new的（实现的）传过来了呢？
		通过测试，我们得到了：org.apache.catalina.connector.RequestFacade，它实现了HttpServletRequest接口；
		所以，tomcat容器实现了HttpServletRequest接口，而对于我们程序员来说，实际上不需要关心这个，我们
		只需要面向接口编程即可。我们只需要知道HttpServletRequest接口中有哪些方法，各自实现了哪些功能即可
	* HttpServletRequest对象是tomcat服务器负责创建的，它里面都封装了什么信息呢？
		- 里面封装了Http的请求协议
		- 实际上，用户发送请求的时候遵循了HTTP协议，发送的是HTTP请求协议，tomcat服务器将http协议中的信息
			以及数据全部解析出来，然后封装到了HttpServletRequest对象中，传给了我们的程序员。javaweb程序员
			通过面向接口编程，就可以获取到请求的信息了
	* HttpServletRequest对象和HttpServletResponse对象，它们的的生命周期？
		这两个对象只在用户发送第一次请求当中存活，用户发送第二次请求时这两个对象封装的信息就变了
-------------------------------------------------------------------------------------------------------
· 要学习HttpServletRequest接口的方法，首先看下它的父接口ServletRequest中的方法：
	- 怎么获取前端用户提交的数据？通过以下4个方法来获取：（无论放在了请求体还是uri后面的）
	- 学这四个方法之前，我们先思考：如果是你，前端的form表单提交了数据之后，你准备怎么
		存储这些数据，你准备采用什么样的数据结构去存储这些数据呢？
		* 前端提交的数据格式：协议ip端口号?username=abc&userpwd=123&aihao=t&aihao=d&aihao=tt
		* 用map集合来存储键值对：
			- Map<String, String>
					这种想法对吗？不对，如果采用这种方式，那么key重复value覆盖
					有3个一样的key，你的value怎么存？
			这样做就行了
			- Map<String, String[]>
					==========================
					key			value
					--------------------------
					username	{"abc"}
					usepwd		{"123"}
					aihao		{"t","d","tt"}
					==========================
			key存储String，value存储String[]，这样将我的value依次放在数组中
（注意：前端提交的111之类的数字，后端获取的一定是一个字符串）
-------------------------------------------------
# Map<String,String[]>		getParameterMap():				这个是获取Map
# Enumeration<String>		getParameterNames():			这个是获取Map集合中所有的key
# String[]					getParameterValues(String name):这个是通过key获取value字符串数组
# String					getParameter(String name):		这个是通过key获取第一个value（最常用）

· 如果提交的数据是json字符串或者file文件怎么获取：
	BufferedReader buf = req.getReader()：获取一个从请求体中读取字符数据的字符输入流
	ServletInputStream sis = req.getInputStream()：获取一个从请求体中读取二进制数据的字节输入流

----------------------------------------------------------------------------------------------------------

· ServletRequest对象常用的方法还有3个：
	Object getAttriubute(String)、void setAttribute(String, Object)、void removeAttribute(String)
· 学这3个之前先复习：
		ServletContext上下文对象又被称为“应用域application”对象，放在它里面的数据其实就是放在服务器缓存中了，
	减少了IO流的操作，使用缓存机制是提高执行效率的重要手段，大大提高读取速度；但是要慎用，因为会占用JVM的堆内存。
	ServletContext里面有三个操作“应用域”的方法：getAttriubute()、setAttribute()、removeAttribute()，
	可以将一些几乎不修改、所有用户共享的、数据量很小的、这部分数据放在应用域里
· request对象又被称为“请求域”对象，请求域：
		请求域对象要比应用域对象范围小很多，生命周期短很多。请求域只在一次请求内有效；请求域对象也有这三个方法：
	getAttriubute()、setAttribute()、removeAttribute()；ServletContext对象创建的时候（web服务器开启时创建），
	应用域就开启了，直到服务器关闭，此时ServletContext对象被销毁，应用域才关闭。实际开发中服务器一般是不会
	关闭的；所以，应用域里面的东西很有可能一直存在，要谨慎使用；
		一个ServletRequest请求对象对应一个请求域，一次请求结束之后，这个请求域就被销毁了；用户发送请求的时候，
	ServletRequest对象创建，请求域开启，当下一条请求发送的时候，ServletRequest对象创建了一个新的，获取的也是
	新的ServletRequest对象和请求域，旧的对象和域就被销毁了。
· 请求域和应用域的选用原则？
	尽量使用范围更小的请求域，因为小的域占用资源少


-------请求转发------------------------------------------------------------

· 资源转发/调度Dispatcher：转发还是同一个请求；
	* 获取“请求调度器”对象：Dispatcher dispatcher = request.getRequestDispatcher("url");
		参数是转发路径，和前端的路径类似，如果url是相对路径，它会以当前请求的路径比如
		“http://localhost:8080/oa/servlet1”，以“http://localhost:8080/oa/”
		为开头将给的参数拼过去，转给这个资源；如果是绝对路径url，参数可以只给“url-pattern”，可以不添加项目上下文；
	* 用调度器的forward转发方法完成请求的转发：dispatcher.forward(request, response);参数传进去；
· 两个Servlet怎么共享数据？
	* 将数据放到ServletContext应用域当中，当然是可以的，但是应用域范围太大，有可能在服务器运行期间一直存在，
		占用资源太多，不建议；
	* 这时可以将其放在ServletRequest请求域中，然后AServlet转发给BServlet，保证AServlet和BServlet在
		同一次请求中，这样就可以做到两个Servlet对象共享一次请求一份数据；
（注意：我们程序员是不可以自己new一个Servlet对象的，因为new出来的不会受到web服务器的管理，所以别自己newServlet）
· 转发的下一个资源可以是一个Servlet也可以是一个html都可以，只要是webapp中合法的资源即可；
	转发到webapp目录下的index.html：request.getRequestDispatcher("/index.html").forward(request, response);



-------重定向--------------------------------------------------------------

· 重定向（重新定方向）：response.sendRedirect("url");
	* 如何重定向的：参数是新路径，和前端的路径类似，如果url是相对路径，它会以当前请求的路径比如
		“http://localhost:8080/oa/servlet1”，以“http://localhost:8080/oa/”
		为开头将给的参数拼过去，转给这个资源；如果是绝对路径url，固定位置是“http://localhost:8080/”
	* 形式上有什么区别：
		-转发：在浏览器上发送的请求是：http://localhost:8080/servlet05/a，最终请求结束后，浏览器地址栏
			上的地址还是这个，没变；转发还是同一次请求，不管你转发了多少次。转发说白了就是，你服务器内部的资源
			在不断地跳转，它是由Tomcat调配的。
		-重定向：相当于，服务器通过response响应的方式，将这个路径相应给了浏览器，浏览器自发的，用新路径
			重新发了一次新的请求：http://localhost:8080/项目名/url-pattern，所以浏览器一共发送了
			两次请求，地址栏上显示的地址当然是第二次请求的地址，它是由浏览器来控制的。

-----转发和重定向怎么选择----------------------------------------------------------
	转发会存在浏览器的刷新问题；由于转发是一次请求，当页面携带数据转发给另一个servlet时，程序会对数据进行操作；
当继续刷新该页面，转发过去多次，程序会对数据操作多次，可能会出问题；这时可以使用重定向，因为重定向相当于浏览器
发送了新的请求，刷新的时候不会携带数据，所以大部分都是用重定向。
	如果在一个Servlet中向请求域中添加了数据，希望从下一个Servlet中使用“请求域”中的数据，那么就只能用“转发”了，
其他所有的，需要重新跳转资源的情况，均使用“重定向”，所以重定向使用较多；

------------------------------------------------------------------------------------------------
· ServletRequest还有什么方法呢？
	# String		getRemoteAdder()：用户浏览器的ip地址
	# int			getRemotePort()：用户浏览器的端口号
	# int			getLocalPort()：本地服务器的端口号
	# int			getServerPort()：用户请求的端口号
	# String		getRemoteHost()：获取浏览器的主机号，通常这个目前不怎么用了，获取ip用上面那个
	# String		getScheme()：请求的协议
	# String		getProtocol()：请求的协议及版本号

	# String		getCharacterEncoding()：获取请求头的字符集编码参数；
	# int			getContentLength()：获取请求内容长度；
	# String		getContentType()：获取请求体的内容类型（MIME类型）；
	# void			setCharacterEncoding(String env)：设置解析请求体内容，所使用的解码方式

· post请求乱码？
	get请求是在请求行上提交数据，post请求是在请求体中提交数据；设置“请求体”的字符编码
	（显然只能处理POST请求的乱码问题）：request.setCharacterEncoding("UTF-8");
	Tomcat10之后request请求体当中的字符集默认就是utf-8，不需要设置字符集，不会出现乱码问题；
	但在Tomcat9及以前，如果前端post请求提交的数据是中文，后端获取就会出现乱码，怎么解决呢？就用这个方法去解决
· get请求乱码怎么解决？
	get请求数据是在请求行上提交的，不是请求体，那怎么解决？
	首先我用get请求发送了一些中文数据，然后使用Tomcat9输出到控制台发现没有乱码问题，这是怎么回事？
	在CATALINA_HOME/conf/server.xml配置文件中：<Connector URIEncoding="UTF-8" />
	注意：从Tomcat8之后，URIEncoding的默认值就是UTF-8，所以get请求也没有乱码问题；
	URIEncoding就是设置浏览器地址栏中URL的字符集的；我们并不严格区分URL和URI
· 响应乱码？
	如果用的是Tomcat9的话，response.print()响应中文的时候，也会出现乱码情况，怎么解决？
	response.setContentType("text/html;charset=UTF-8");就解决了；
	（注意：这里不推荐用response.setCharacterEncoding()设置我们响应内容采用的字符集，因为如果前端换环境了，
		我们是不是后端还得改；所以直接用上述Content-Type设置响应头，告诉对方浏览器自己的字符集是什么就行了；
		建议响应时，显式的设置自己响应内容所采用的字符集，然后再setHeader("Content-Encoding")告诉用户浏览器）

---------------看下ServletResponse的方法------------------------------------
	# ServletOutputStream		getOutputStream()：获取响应对象的二进制输出流
	# PrintWriter				getWriter()：获取响应对象的字符输出流
	# void						setCharacterEncoding(String charset)：设置响应的字符集
	# void						setContentLength(int len)：设置响应内容长度
	# void						setContentType(String type)：设置响应内容MIME类型

----------再来看下HttpServletRequest接口的常用方法----------------------------

	# String					getMethod()：请求的方式
	# StringBuffer				getRequestURL()：请求的完整URL
	# String					getRequestURI()：完整URL去掉了协议ip端口
	# String					getContextPath()：获取应用的根路径（/项目名）
	# String					getServletPath()：获取请求的urlPattern，不带项目名

	# String					getHeader(String name)：根据key获取请求头的value
	# Enumeration<String>		getHeaderNames()
	# Enumeration<String>		getHeaders(String name)

（前面我们学过了在HttpServlet抽象类的直接父类GenericServlet当中，可以通过this.或config.的
getServletContext().getContextPath()来获取应用的根路径，现在我们又有一个方式获取它，就是
直接用HttpServletRequest接口中的request.getContextPath()方法来获取根路径，其实底层
servletContext对象中的获取上下文对象就是调用的httpservletrequest的）

-----------HttpServletResponse接口常用方法-------------------------------------

	# void			setStatus(int code)：设置响应状态码
	# void			setHeader(String name, String value)：设置响应头的；
		通常用来设置Content-Type和Content-Length，由于这两个比较重要，所以单独在
		ServletRequest类中做成了俩方法；（addHeader()和这个差不多，只是不覆盖原来的）
```

