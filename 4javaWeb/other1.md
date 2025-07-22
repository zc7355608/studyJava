# JavaWeb

```txt
关于HttpServlet：
	它是GenericServlet的一个直接子类，同样也是抽象类；HttpServlet继承了GenericServlet，重写了service方法，
	在该方法中调用了它自己的一个特有的protected的service方法：
protected void service(HttpServletRequest req, HttpServletResponse res)throws ServletException,IOException{...};
（注意：GenericServlet和Servlet中的service方法都是抽象方法，但HttpServlet的service不是抽象的，
HttpServlet抽象类中没有抽象方法）

· 那么HttpServlet为什么要设置成抽象类呢？
	因为它生来就是要被继承的。如果不设置为抽象类，那么我们就可以new出其实例，但是这个实例内部方法如doGet()、
doPost()并没有任何实现（业务逻辑的代码只有自己知道怎么写），所以new出来的这个实例是没有意义的；一个实例，
它不能做任何事情，所以为了防止我们做这种没有意义的事情，将其设置为抽象类是优雅的做法。
-----------------------------------------------------------------------------------------------
* 

------------关于后面springmvc中要用的DefaultServlet-----------------------------------------------------

（重要）其实服务器启动时会默认new一个DefaultServlet对象，它的url-pattern是/，表示除了jsp所有的；当静态资源的请求过来时，
tomcat会将路径先和所有servlet以及jsp进行对比，如果都没匹配上，那么会将请求交给DefaultServlet，然后由它去找对应的静态资源文件，
然后通过io流读取文件放在response上，同时判断文件扩展名选择合适的MIME类型设置Content-Type的值，并根据文件大小设置响应头，
最后才响应给浏览器。
```

```txt
=======day07======================================================================================

关于一些设计模式：
--------------------------------------------------------------------------------------------
· 都有哪些设计模式？
		·GoF设计模式：通常我们所说的23种设计模式（Gang Of Four：4人组提出的设计模式）
			* 单例模式
			* 工厂模式
			* 代理模式
			* 门面模式
			* 责任链设计模式
			* 观察者设计模式
			* 模板方法设计模式（HttpServlet抽象类）
			...
		·JavaEE设计模式：
			* DAO
			* DTO
			* VO
			* PO
			* pojo/JavaBean/domain
			...
（模板方法设计模式：在模板类中定义核心算法，具体处细节的实现交给子类来做，通常模板类是一个抽象类）
----------------------------------------------------------------------------------
· 关于jakarta.servlet.http.HttpServlet：
	-HttpServlet抽象类是专门为HTTP协议开发准备的，比GenericServlet更适合HTTP协议下的开发
	-目前为止我们接触了哪些servlet规范中的接口？
		jakarta.servlet.Servlet：						Servlet核心接口
		jakarta.servlet.ServletConfig：					Servlet配置信息接口
		jakarta.servlet.ServletContext：				Servlet上下文接口
		jakarta.servlet.ServletRequest：				Servlet请求接口
		jakarta.servlet.ServletResponse：				Servlet响应接口
		jakarta.servlet.ServletException：				Servlet异常
		jakarta.servlet.GenericServlet：				标准通用Servlet抽象类
	-jakarta.servlet.http包下都有哪些接口或类呢？
		* jakarta.servlet.http.HttpServlet：			(HTTP协议专用servlet抽象类)
		* jakarta.servlet.http.HttpServletRequest：		(HTTP协议专用请求接口)
		* jakarta.servlet.http.HttpServletResponse：	(HTTP协议专用响应接口)
	-HttpServletRequest是ServletRequest的子接口（还有response），它们之间有继承关系；
		在HttpServlet中，tomcat能够保证调用service方法时，传递的实参一定是一个HttpServletRequest
	-HttpServletRequest对象中封装了什么信息？
		* 请求对象中封装了请求协议的全部内容（就是包括了HTTP请求协议中：请求行、请求头、空白行、请求体）
			tomcat服务器将请求协议解析出来，然后全部封装到request对象当中了
		* 也就是说，我们只需要面向HttpServletRequest，就可以获取请求协议中的数据
		* HttpServletResponse是专门用来响应HTTP协议到浏览器的
----------------------------------------------------------------------------------------------------
HttpServlet源码分析：它将service方法中的两个参数做了强制类型转换之后，调用了以下它自己的service方法：
	service源码：
		//这里的两个参数带有http，是一个模板方法，该方法中定义核心算法骨架，具体的实现步骤在实现的子类中
		protected void service(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {...}
----------------------------------------------------源码：
//getMethod是HttpServletRequest接口中的方法，获取的是浏览器端发来的request请求的方式，可能是以下7种之一：
//GET POST PUT DELETE HEAD OPTIONS TRACE
				String method = req.getMethod();
				//如果是get请求，那就调用doGet方法
				if (method.equals(METHOD_GET)) {
					long lastModified = getLastModified(req);
					if (lastModified == -1) {
						// servlet doesn't support if-modified-since, no reason
						// to go through further expensive logic
						doGet(req, resp);
					} else {
						long ifModifiedSince;
						try {
							ifModifiedSince = req.getDateHeader(HEADER_IFMODSINCE);
						} catch (IllegalArgumentException iae) {
							// Invalid date header - proceed as if none was set
							ifModifiedSince = -1;
						}
						if (ifModifiedSince < (lastModified / 1000 * 1000)) {
							// If the servlet mod time is later, call doGet()
							// Round down to the nearest second for a proper compare
							// A ifModifiedSince of -1 will always be less
							maybeSetLastModified(resp, lastModified);
							doGet(req, resp);
						} else {
							resp.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
						}
					}
				} else if (method.equals(METHOD_HEAD)) {//如果是Head请求，那就调用doHead方法
					long lastModified = getLastModified(req);
					maybeSetLastModified(resp, lastModified);
					doHead(req, resp);
				} else if (method.equals(METHOD_POST)) {
					doPost(req, resp);
				} else if (method.equals(METHOD_PUT)) {
					doPut(req, resp);
				} else if (method.equals(METHOD_DELETE)) {
					doDelete(req, resp);
				} else if (method.equals(METHOD_OPTIONS)) {
					doOptions(req,resp);
				} else if (method.equals(METHOD_TRACE)) {
					doTrace(req,resp);
				} else {
					// Note that this means NO servlet supports whatever
					// method was requested, anywhere on this server.
					String errMsg = lStrings.getString("http.method_not_implemented");
					Object[] errArgs = new Object[1];
					errArgs[0] = method;
					errMsg = MessageFormat.format(errMsg, errArgs);
					resp.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, errMsg);
				}

	* HttpServlet的service方法已经重写了，在里面将形参进行类型转换之后，调用了它自己的service，
		其中的形参为：（HttpServletRequest request, HttpServletResponse response）；该方法是模板方法设计模式中
		的核心算法框架
		- 这2个service方法程序员继承HttpServlet后可以选择重写，也可以拿来直接用，如果重写的话就享受不到405错误，
			享受不到HTTP协议专属的东西
		- 什么意思呢？
			当浏览器端发送过来请求的时候，会走HttpServlet的service方法，先req.getMethod()方法调用请求类型
			根据请求类型来调用doXxx方法，这些doXxx方法都是HttpServlet自己写的：
			protected void doGet(HttpServletRequest req, HttpServletResponse resp)throws ServletException, IOException{
				String msg = lStrings.getString("http.method_get_not_supported");
				//如果不重写doGet方法，那么就会调用这个doGet，也就是这行代码导致浏览器界面报405错误
				sendMethodNotAllowed(req, resp, msg);
			}
		- 假如程序只重写了doPost方法，那就是希望浏览器只能以post请求的方式给浏览器提交数据，如果S端发送的请求
			不是post，那么就会走doXxx方法，也就是HttpServlet里默认的doXxx这个方法执行才出现的405错误页面。
		- 如果S端只写了doPost方法，而你的请求是get请求，那我就能给你准确的提供405错误，这就是HttpServlet提供给我们的服务。
		- 怎么避免405错误？
			如果后端重写了doPost方法，那么前端一定要发post请求；后端重写了doGet方法，那么前端一定要发get请求
		- 最好只重写doPost或者doGet方法其中一个，不要都重写，都重写那么405错误就没有存在的意义了。如果都重写了，
			还不如直接重写service；

---------------------------------------
最终的Servlet类的开发步骤：
	1、编写一个类直接继承HttpServlet（该类一般称为控制器类）
	2、重写doGet或者doPost方法之一（程序员说了算）
	3、将Servlet类配置到web.xml文件中
	4、准备前端的页面（form表单指定请求的路径即可）


========day08==========================================================================================


关于一个web站点的欢迎页面：
-------------------------------------------------------------------------------------------------
· 什么是一个web站点的欢迎界面？
	对于一个webapp来说，我们是可以设置它的欢迎页面的，设置了欢迎页面之后，当你访问这个webapp的时候，
	或者访问这个web站点的时候，没有指定下面的任何“资源路径”，这个时候会默认访问你的欢迎页面。
	（我们一般的访问方式是：http://localhost:8080/web01/login.html这种方式就是指定了
	要访问的就是web01项目的login.html资源；如果我们访问的方式是：http://localhost:8080/web01，访问的就是
	这个项目，没有指定具体的资源，它默认会访问谁呢？默认会访问你设置的欢迎页面，但如果不设置，那么就会404）

· 怎么设置欢迎页呢？
	只需要在web.xml配置文件中进行配置：
		<welcome-file-list>
			<welcome-file>login1.html</welcome-file>
			<welcome-file>login2.html</welcome-file>
			...
			<!--一个webapp是可以设置多个欢迎页面的，越靠上优先级越高，找不到就向下找-->
		</welcome-file-list>
	（注意：这里只写资源名即可，开头不需要带/，默认从项目的根webapp下开始寻找）

· 你有没有注意到一件事：
	如果一个webapp下有一个名叫index.html的文件，不需要在web.xml中配置，它已经是欢迎页了，为什么？
		实际上Tomcat服务器的配置文件中做了默认的全局配置了；配置这个欢迎界面实际上有两种方式：
			一种是在web.xml中配置(局部配置)，另一种是在CATALINA_HOME\conf\web.xml文件中进行配置(全局配置)
		    <welcome-file-list>
				<welcome-file>index.html</welcome-file>
				<welcome-file>index.htm</welcome-file>
				<welcome-file>index.jsp</welcome-file>
			</welcome-file-list>
· 欢迎页可以是一个Servlet吗？
	可以，说白了这个欢迎页就是一个资源，既然可以是静态的也可以是动态的
-------------------------------------------------------------------------------------------------

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

