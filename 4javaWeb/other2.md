```txt
=======day09=============================================================================================

（第一阶段结束了：先做一个oa的项目，在idea中，一个部门页面，给它进行简单的增删改查（IDEA中oa1项目）

注解式开发：---------------------------------------------------------------------------------------------
		通过我们之前oa项目实践发现，一个小项目就需要在web.xml中注册特别多次，如果项目特别大，那这个web.xml文件
	还能保存的下吗？而且开发效率比较低，写了多少个java类就需要配置多少次，所以此时需要一个方式来改进我们的开发，
	这就是“注解式开发”；
--------------------------
· 这些配置信息基本不修改，所以这些配置能不能写到java类当中呢？
	-可以，Servlet3.0之后推出了各种Servlet基于注解式开发
	-优点：开发效率高，不需要在配置文件中大量配置，直接在类上进行标注；xml文件体积变小了
	-在开发中一般都是采用“注解+web.xml文件”的开发模式
	-一些不会经常变的配置信息应该写在注解中，可能会经常变的写到xml文件中
	-注意：在高版本的web.xml配置文件中，<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
												 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
												 xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
															  https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
												 version="5.0"
												 metadata-complete="false">//关闭“元数据完整性”
										</web-app>
		文件中的metadate-coplete属性要设置为false，表示支持注解和web.xml配置文件两种方式联合使用
	（web.xml文件的版本号跟随着Servlet规范的版本号的更迭）
· 怎么用注解来标注Servlet？
	在java类上面使用： @WebServlet ，这样它就注册成为一个Servlet类了，被tomcat管理了
· 那么这个@WebServlet注解都有什么属性呢？
	-name属性（String）：用来指定servlet标签里的servlet-name的
	-urlPatterns属性（String[]）：用来指定servlet-mapping标签里的url-pattern的，实际上url-pattern标签
		可以写多个，每一个路径都指向该Servlet类；该属性还有另一个名字，叫value，俩属性一模一样
	-loadOnStartup属性（int default -1）：用来指定servlet标签里load-on-startup标签的“默认加载因子”的，
		默认-1表示启动服务器不加载
	-initParams属性（@WebInitParam[]）：用来放servlet标签里init-param标签（初始化参数标签）的，
		参数@WebInitParam是一个注解类型数组，该数组的类型是注解类型 @WebInitParam，它里有两个属性
		name和value，都是String；

例如：	@WebServlet(name="hello", urlPatterns={"/b/d","/s/c",..}, loadOnStartup=1, initParams=
		{ @WebInitParam(name="y0",value="y"),@WebInitParam(name="x1",value="x"),..} )

		public class HelloServlet extends HttpServlet{
			@override
			protected void doGet(..)..{
			}
		}

-----------------------------------------------------------------------------------------
分析使用纯粹Servlet开发web应用的缺陷：
	# 在Servlet当中编写HTML/CSS/JavaScript等前端代码。存在什么样的问题？
		-在Java程序中编写前端代码，编写难度大，麻烦，不利于查错
		-显然程序的耦合度非常高
		-代码非常不美观
		-维护成本高：修改一个小小的前端代码，还需要动Java程序，那就得重新编译，生成新的class文件，
			打一个新的war包，重新发布
	# 思考一下，如果是你的话，你准备怎么解决这个问题？
		-上面那个Servlet能不能不写了（又是继承HttpServlet，又是重写doGet方法，还得拼接前端代码），
		让机器自动生成。我们程序员只需要写这个Servlet程序中的“前端的那段代码”，然后让机器将我们
		写的那段“前端代码”自动翻译成“Servlet的这种java程序”，然后机器再自动将java程序编译生成
		class文件。然后再使用JVM调用这个class中的方法。
		-有没有这种机制呢？有，JSP就是，看JSP。
```

```txt
========day10=============================================================================

JSP（Java Server Pages）:是由Sun公司主导创建的一种动态网页技术标准。JSP将Java代码和特定变动内容嵌入到静态的页面中，实现以静态页面为模板，动态生成其中的部分内容。JSP本质还是servlet，一般每个jsp页面都会生成一个java文件和clsss文件。tomcat内部就有一个jsp的编译器。
---------------------------------------------------------------------------------------------------------
	*编写第一个JSP程序：
		- 在webapp下创建一个index.jsp，里面没有任何内容，空的，这就是第一个JSP程序
		- 打开浏览器：http://localhost:8080/jsp/index.jsp 页面是空白
		- 实际上，访问以上的这个index.jsp文件，底层执行的是：index_jsp.class这个java程序
		- 这个jsp翻译后生成的java程序的位置：如果用IDEA生成的话，位置在：Tomcat启动的时候有一个CATALINA_BASE：
			后面的路径打开，然后work/Catalina/localhost/jsp/org/apache/jsp，这就是它程序的位置
		- 这个index.jsp会被tomcat翻译成index_jsp.java文件，然后tomcat服务器会将index_jsp.java文件编译生成
			index_jsp.class文件
		- 访问jsp文件，实际上就是执行java的Servlet程序，只不过这个java程序是tomcat自动给生成的
		- 访问index.jsp，实际上执行的是index_jsp.class中的方法
		- index_jsp类继承的是HttpJspBase，而HttpJspBase类继承的就是HttpServlet，所以index_jsp类就是一个
			Servlet类；index_jsp类和HttpServlet生命周期完全相同，就是一个东西，没有任何区别，同样是假单例；
	*JSP文件在浏览器中第一次访问的时候是比较慢的（服务器开启后，B端第一次访问jsp），为什么？
		第一次比较麻烦：
			- 要把jsp文件翻译生成java文件
			- java文件要编译生成class文件
			- 然后通过class去创建servlet对象，该对象保存在堆内存中
			- 然后调用servlet对象的init方法
			- 最后调用servlet对象的service方法
		第二次就比较快了，为什么？
			- 因为第二次直接调用单例Servlet对象的service方法即可，文件已经翻译生成了class在服务器的work目录下，
			并且该对象已经在服务器中被创建好了，用户请求过来就直接调用它的service方法，进行请求的处理了
	*这也是jsp的一个缺点，每个jsp界面第一次打开太慢，所以一般项目部署的时候会先给所有的jsp都打开一遍
（注意：虽然各种品牌的服务器都实现了Servlet和JSP规范，但是同样的jsp用不同的服务器翻译成的java文件可能是不同的）

· JSP是什么？
	·JSP是java程序，本质上还是一个Servlet
	·Servlet和JSP都是JavaEE的13个子规范之一
	·所有的web容器/web服务器都是遵循这套规范的，都是按照这套规范进行翻译的
	·每个web容器里都内置有一个JSP翻译引擎
（注意：JSP访问出错，专业人员都是直接打开jsp的java程序进行的调错，不要在jsp文件里找半天，没用，开发JSP的最高境界：
	眼前是JSP，但是脑袋中都是Java代码）
---------------------------------
· JSP语法：

	# 在jsp文件中直接编写文字，都会被自动翻译到哪里？
（JSP语法1：）jsp中直接编写的文字都会翻译到servlet类的service方法的out.write("翻译到这里")，
		被java程序当作字符串打印输出到浏览器，除非你对它进行特殊的处理
	# 先用JSP的page指令，解决响应中文乱码问题（JSP默认并不是UTF8），在jsp文件的头部，加一个：
		<%@ page contentType="text/html;charset=UTF-8" %>，表示响应的内容类型是text/html，
		字符集为UTF-8，这个指令后面再详细说，先解决下中文乱码问题

（JSP语法2：）在JSP中编写java程序：<%java语句%>
	# 在这个符号当中编写的被视为java程序，被翻译到servlet类的service方法内部
	# 这里你要细心点，在<%  %>这个符号里面写java代码，你要时刻记住你正在service方法的方法体当中写代码，
	方法体中可以出现什么内容，我们java程序员要非常清楚才行
	# <%-- --%>是JSP的专业注释，它并不会被翻译到java源代码当中，建议使用这种方式；
		而<!-- -->这个注释是html注释，这个注释不专业，它会被翻译到out.print里面，不建议使用
	（注意，这个注释标签不要在其他的<%标签内嵌套使用）
	# 编译不通过的jsp不会生成class，但仍会翻译为java源文件

（JSP语法3：）如果想在service方法外部编写java代码，需要用：<%! %>
	# 这种方式会被编译到service方法之外，几乎不用，而且不建议用
		为什么？因为会有线程安全问题，Servlet类就一个，在类体中写的是成员变量，这个成员变量多个线程共享，
		如果在tomcat多线程环境下，共享数据存在修改，就会有线程安全问题
	# 这种方式编写的代码，出现的位置是从jsp类体的开头

	# 怎么在JSP中向浏览器上输出一个name变量
			<%
				String name="Jack";
				out.print("name="+ name);
			%>
		以上的out是JSP的九大内置对象之一，可以直接拿来用。这九大内置对象在service方法开始中有声明，
		所以只能在service方法中使用这些内置对象；

（JSP语法4：）
		·如果输出的东西有java代码也有字符串，两种格式拼接在一块的，不用out.write有没有更好的方式
	# 有，用这个：<%= %>，注意：在=号后面编写要输出的内容
	# 那么这种格式：<%= %>会被翻译到哪里呢，翻译成什么东西呢？
		·翻译成了service中这个java代码：out.print(); ，就在这个括号里面，和上面不同的是，不带双引号
	# 所以如果需要输出java变量加字符串，那么只需要这样：<%= "name="+ name %>

----------------
JSP语法总结：
	·JSP中直接编写普通字符串
		# 翻译到service方法的out.write("这里");
	·<% %>
		# 翻译到service方法内部，里面是一条一条java语句
	·<%! %>
		# 翻译到service方法之外
	·<%= %>
		# 翻译到service方法体内部，out.print(这里);
	·<%@ page contentType="text/html;charset=UTF-8" %>
		# page指令，通过contentType属性用来设置响应的内容类型

---------------------------------
既然JSP说到底还是一个Servlet，那么它和Servlet有什么区别呢？
	# 职责不同：
		- Servlet的职责：收集数据。Servlet的强项是逻辑处理，业务处理，连接数据库，获取/收集数据
		- JSP的职责：展示数据。JSP的强项是做数据的展示，只要是B上展示数据，都用JSP写
(纯用JSP可不可以写一个webapp？可以，但是没有必要，你懂的)

----------------------------------------------------
*JSP文件的扩展名是必须的吗？
	不是，是可以在Tomcat的conf中配置的：CATALINA_HOME/conf/web.xml
	<servlet-mapping>
		<servlet-name>jsp</servlet-name>
		<url-pattern>*.jsp</url-pattern>
		<url-pattern>*.jspx</url-pattern>
	</servlet-mapping>
其实这个jsp就是一个普通txt文本，tomcat认为哪个文件是jsp文件，就翻译哪个

-------------------------------------------------------------------------------------
*包名bean是什么意思？
	javabean(java的logo是一杯冒着热气的咖啡，故javabean被翻译为咖啡豆)
	java是一杯咖啡，咖啡是由一个个的咖啡豆研磨而成。整个java程序是由一个个的bean组成
	什么是JavaBean，你可以理解为：符合某种规范的java类
		·含有无参构造
		·属性私有化
		·对外提供公开的set和get方法
		·实现java.io.Serializable接口(可序列化)private static final long serialVersionUID=xxxL
		·重写toString、equals和hashCode方法
	JavaBean其实就是java的实体类。负责数据的封装
	JavaBean符合JavaBean规范，具有更强的通用性

-------------------------------------------------------------------------------

关于JSP的指令：
	# 指令的作用：指导JSP的翻译引擎如何翻译jsp文件
	# 指令包括哪些呢：
		page：通过该指令可以操作jsp生成的servlet类中的一些信息。
		taglib：引入标签库的指令。
		include：包含指令，在jsp中完成静态包含或动态包含。
	# 指令的使用语法：
		<%@ 指令名 属性名1=属性值1 属性名2=属性值2 属性名3=属性值3 %>
	# page指令的属性：

		session属性：<%@ page session="true|false" %>
				设置jsp内置对象session是否启用，默认值就是true启用9大内置对象的session

		contentType属性：<%@ page contentType="text/html;charset=UTF-8" %>
				设置jsp中响应的内容类型，但同时也可以设置响应的字符编码。不写的话默认就是：
				response.setContextType("text/html");

		pageEncoding属性：<%@ page pageEncoding="GBK" %>
				设置响应的字符编码，可以直接用上面的方式直接设置，两种方式是一模一样的

		import属性：<%@ page import="xxx,xxx,xxx,..." %>jsp中导包

		errorPage属性：<%@ page errorPage="url" %>设置当前jsp，也就是JSP代码出现异常后的跳转位置

		isErrorPage属性：<%@ page isErrorPage="true|false" %>
				如果jsp界面使用了这个并且设置为true，表示它是一个error的jsp界面，那么此时这个界面会启用
				9大内置对象中的exception，程序员可以使用该对象去打印异常堆栈信息到tomcat控制台上

		isELIgnored属性：<%@ page isELIgnored="true|false" %>
				true表示忽略jsp页面中的EL表达式，将它当作普通字符串，默认false启用
				（如果想只忽略其中某一个EL表达式，可以用转义字符\${xxx}）

		（了解）language属性：<%@ page language="java" %>
				该属性用于设置当前JSP页面使用的语言，目前只支持Java语言，所以这个属性只需要知道就行

	# include包含指令：可以将一些重复的jsp代码提取到一个公共的jsp中，然后通过使用该指令将公共jsp引入到某个文件中使用。分为静态包含和动态包含2种。
	静态包含：使用include指令，<%@ include file="jsp的相对路径" %>，它就是将该标签，直接替换了jsp文件中的所有内容，最后生成一个servlet源代码。虽然运行效率高一点点，但耦合度较高，不够灵活。而且要注意公共jsp中应该出现哪些内容，避免在同一个servlet代码中出现Java语法错误。
	动态包含：使用jsp的语法标签，<jsp:include page="jsp的相对路径"></jsp:include>，它相当于在运行时方法的调用，会生成多个servlet，效率也高耦合度还低。如果不需要传参数标签中间不要出现任何内容。需要传参数时：在该标签之间使用，<jsp:param name="参数名" value="<%=变量名%>"/>，注意name属性不支持表达式，只能是字符串。获取参数就req.getParameter(变量名);，因为参数是放在了request请求域中。
	page和file属性都是可以写表达式的。
	
	#jsp页面之间做转发，<jsp:forward page=""></jsp:forward>，其中可以携带数据。
--------------------------------------------------------------------------

关于JSP的九大内置对象：
	(jakarta.servlet.jsp.PageContext)pageContext：页面域。本页面中有效
	(jakarta.servlet.http.HttpServletRequest)request：请求域
	(jakarta.servlet.http.HttpSession)session：会话域
	(jakarta.servlet.ServletContext)application：应用域
	(jakarta.servlet.http.HttpServletResponse)response：负责响应
其中这四个域：pageContext<request<session<application，它们都有
setAttribute()、getApplication()、removeAttribute()
	(jakarta.servlet.ServletConfig)config：配置对象
	(java.lang.Throwable)exception：异常对象
	(java.lang.Object)page：当前的jsp对象的引用，其实就是this
	(jakarta.servlet.jsp.JspWriter)out：负责输出


========day11===(关于EL表达式)============================================================

# EL表达式是干什么的？
	·Expression Language(表达式语言)
	·el表达式是为了使jsp写起来更简单，灵感来自于ECMAScript的模板字符串和xpath表达式语言。它提供了在jsp中简化表达式的方法，让jsp的代码更加简化。EL表达式属于JSP语法的一部分。
	·在JSP中使用EL表达式可以简化jsp页面的Java代码，提高了页面的可读性和维护性，使得页面更易于理解和维护
	·JSP中夹杂着各种java代码，导致jsp页面很混乱，不好看，不好维护，所以才有了后期的EL表达式

# EL表达式一般操作的都是域中的数据，操作不了局部变量。它会自动调用tostring()将其转换成字符串输出到浏览器：
	1、从某个域中取数据（页面域pageContext、请求域request、会话域session、应用域application）
	2、将取出的数据转换成字符串，底层是调用了toString方法
	3、将字符串输出在浏览器上，和<%=%>一样

# EL表达式从域中取数据的语法：${表达式}，默认从小域往大域开始找。全找不到返回空串。指定域去找用jsp的隐式对象：pageScope，requestScope，sessionScope，applicationScope。例如：${pageScope.user}。不过一般域中的数据不会重名。
			<%
				User user = new User();
				user.setUsername("jack");
				user.setPassword("a123");
				user.setAge(34);
				request.setAttribute("userObj", user);
			%>
		使用EL表达式来取：${userObj}
			等同于这段代码：<%=request.getAttribute("userObj")%>

# EL表达式从域中取数据的另一种形式：[""]，如果你的key中有特殊字符，可以用中括号[]的方式来取，例如：
	如果你的域的key是"abc.def"这种形式，为了让浏览器不认为这是对象，你可以用这种方式来取:
		${requestScope["abc.def"]}

# ${"userObj"}这个表示将字符串"userObj"输出在浏览器上，和${userObj不同}

# EL表达式取出来的对象，还可以再去获取对象中的私有属性：${user.age}，相当于调用了User类的getAge()方法，前提是
	必须有getter方法，且按照驼峰命名规则。可以一层层往下找。
	也可以直接${user.getAge()}

# 域中的对象是个数组或集合，可以从集合或数组中取数据：
		${map.key}		${数组[0]}		${list[3]}list集合也是通过下标取的，和数组一样

# 通过EL表达式获取应用的根：
	EL表达式有一个隐式对象叫pageContext，它和JSP的9大内置对象pageContext是一个东西，
	pageContext里面有这这个方法：getRequest()返回ServletRequest类型对象，获取的其实就是
	9大内置对象之一的request，然后request.getContextPath()可以获取根路径；
	于是EL表达式可以通过这种方式来动态获取应用的根：
		${pageContext.request.contextPath}
	*--------------------------------------------------------------------
		常用的EL表达式：
			协议:${ pageContext.request.scheme }
			服务器ip: ${ pageContext.request.serverName }
			服务器端口: ${ pageContext.request.serverPort }
			获取应用根路径: ${ pageContext.request.contextPath }
			获取请求方式（GET/POST/..）: ${ pageContext.request.method }
			获取B端ip地址: ${ pageContext.request.remoteHost }
			获取会话的id编号: ${ pageContext.session.id }
	*--------------------------------------------------------------------

# 关于EL表达式的隐含对象：
	1、pageContext
	2、param		(获取前端请求域提交过来的数据)
	3、paramValues	(获取前端请求域提交过来的数据)
	4、initParam
	5、其他（不是重点）
	* pageContext：
		<%=(HttpServlet)(pageContext.getRequest()).getContextPath()%>等同于：
		${pageContext.request.contextPath}
	* param：
		<%=request.getParameter("key")%>等同于：
		${param.key}
	* paramValues：
		<%= (request.getParameterValues("key"))[0] %>等同于：
		${paramValues.key[0]}
	* initParam：获取全局初始化参数
			<context-param>
				<param-name>startIndex</param-name>
				<param-value>0</param-value>
			</context-param>
			<context-param>
				<param-name>stopIndex</param-name>
				<param-value>10</param-value>
			</context-param>
			...
		<%=application.getInitParameter("key")%>等同于：
		${initParam.key}
所以EL表达式是干什么的？就是从域中或对象中取数据，输出；取数据，输出....

----------------------------------------------------------
关于EL表达式的运算符：
			1、算术运算符：+ - * / %
				${10 + "20"}		30
				（在EL表达式中+只会做求和运算，当两边不是数字的时候，一定会转成数字，这点和Java不同）
				${10 + "abc"}		数字格式化异常
				（/还可以用div）
			2、关系运算符：== != > >= < <= eq
				${"abc" == "abc"}	true
				${"abc" eq "abc"}	true
				k1 = new Object();k2 = k1;	${k1 == k2}	true
				（双等号==和eq运算符在EL表达式中都是调用了equals方法）
			3、逻辑运算符：&& || ! not and or	(注意!和not都是取反)
			4、条件运算符：?:
			5、取值运算符：[] .
			6、empty运算符：判断是否为null，如果为空，返回true。遵循，没有就是空。
				${empty param.aihao}		true
---------------------------------------------------
JSTL标签库：
---------------------------------------------
	# 什么是JSTL标签库？
		- JSP Standard Tag Lib：JSP标准标签库，它是一个JSP标签集合，它封装了JSP应用的通用核心功能。就是一个定制的标签库。
		- JSTL标签库通常与EL表达式在jsp页面中一起用，目的是让jsp中的java代码消失
		- 根据JSTL标签所提供的功能，可以将其分为5个类别：
			核心标签（常用的功能都在这）
			格式化标签（做数据格式化的）
			SQL 标签
			XML 标签
			JSTL 函数
		- JSTL的标签是写在JSP中的，但实际上最终还是执行的java程序，而java程序在jar包中的

	# 使用JSTL标签库的步骤：
		* 第一步：引入JSTL对应的依赖
										jakarta.servlet.jsp.jstl-2.0.0.jar（对应关系的xml约束文件）
			tomcat10之后对应的jar包是{
										jakarta.servlet.jsp.jstl-api-2.0.0.jar（约束文件对应的Java代码文件）

			tomcat10之前对应的jar包是：
                    <dependency>
                        <groupId>javax.servlet.jsp.jstl</groupId>
                        <artifactId>jstl</artifactId>
                        <version>1.2</version>
                    </dependency>
                    <dependency>
                        <groupId>taglibs</groupId>
                        <artifactId>standard</artifactId>
                        <version>1.1.2</version>
                    </dependency>
			将这些jar包放在lib目录下就行了
		* 第二步：在jsp页面中引入要使用的标签库（taglib指令引入）
			<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
			<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
		这是常用的核心标签库和格式化标签库。prefix是一个标识，指定该标签是哪个库中的标签，核心和格式化标签库一般叫c和fmt
---------------------------------------------------------------------------------
	# JSTL标签的原理：
		* 实际上你在jsp中使用这个：<c:catch></c:catch>标签，它会根据uri去匹配标签库
			<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>，
			这个uri指向了jar包中的一个xxx.tld文件，这个文件本质上就是一个
			xml文件(配置文件)，在该文件中描述了Java类和JSTL标签之间的对应关系。
			以上核心库对应的配置文件是c.tld，它在：jakarta.servlet.jsp.jstl-2.0.0.jar的META-INF文件中
		* 源码解析：
		  <tag>
			<description>对该标签的描述</description>
			<name>catch</name>标签名
			<tag-class>org.apache.taglibs.standard.tag.common.core.CatchTag</tag-class>标签名对应的java类
			<body-content>JSP</body-content>标签体中可以出现哪些内容，jsp表示可以出现所有jsp代码，包括EL表达式
			<attribute>
				<description>属性的描述</description>
				<name>属性名</name>
				<required>属性是否是必须的</required>
				<rtexprvalue>该属性里面是否可以写el表达式</rtexprvalue>
			</attribute>
		  </tag>

===================JSTL核心库常用的标签========================================================================
以下的标签操作的都是域对象

# <c:if test="${!empty obj.username}">test属性是必须的，里面可以跟一个boolean类型的东西，支持EL表达式
	<h1>hello</h1>		//if标签体里面写jsp代码
  </c:if>
  	相当于if(obj的username属性非空){out.print("<h1>hello</h1>");}
	if标签里面还有var和scope属性，可以保存if的结果，非必须。var是变量名，scopevar的作用域，
	（page/request/session/application），指将test中的值true|false存储到该变量中，而该变量保存在域中。

# <c:choose>			//类似于switch语句
	<c:when test="${age}<20">青年</c:when>
	<c:when test="${age}>30">中年</c:when>
	<c:when test="${age}>60">老年</c:when>
	<c:otherwise>默认</c:otherwise>
  </c:choose>

# <c:forEach var="i" begin="1" end="10" step="1">		分别有var、begin、end、step属性，类似于for循环
	${i}<br/>
  </c:forEach>		//循环输出1-10
	（这里其实有隐含的东西，我们既然可以用${i}取出来i，所以i一定被保存在域中，i其实是在最小的域页面域中保存）

# <c:forEach items="${lists}" var="list" varStatus="num">
				编号${num.count},${list[0]}<br/>
				编号${num.count},${list[1]}<br/>
  </c:forEach>输出：编号1,xxx
	它里面有一个items属性和var属性，类似于forEach循环。
	varStatus属性保存循环的状态，该状态对象里面有很多属性：
		index：保存循环的下标
		count：保存循环的次数
		first：是否是第一次循环
		last：是否是最后一次循环

=================================格式化标签库===================================
<fmt:formatNumber>：将数值格式化为指定格式字符串。属性value是源数据，type是格式化类型，var是变量，scope结果放在哪个域中。
			如果不设置var那么会直接输出，如果设置了就不输出而存放在域中。type可以是NUMBER/CURRENCY/PERCENT，默认number
			<fmt:setLocale value="en_US">设置时区为美国。此时格式化默认的形式就变了。
<fmt:formatDate>（重要）：日期格式化。同样有value和type属性。type可以是DATE/TIME/BOTH，默认date。
<fmt:parseNumber>：将指定字符串转成数值。
<fmt:parseDate>：将指定字符串转成日期。
具体其他的用法用的时候可以查文档。
```

```txt
===========day12=================================================================================

# 关于Session：
		Session是一种保留更多信息在S端的一种技术，服务器为每一个客户端开辟一块内存空间，即session对象，
	客户端在发送请求时，都可以使用自己的session，这样S端就可以通过session来记录某个客户的信息了；

# 关于BS结构的会话机制：
	·什么是会话？
		-用户打开浏览器，进行一系列操作，然后到最终浏览器关闭，整个这个过程就叫做一次“会话”
		-会话在web服务器端有对应的java对象，这个对象叫做：HttpSession，一次会话对应一个session对象
		-一次会话包含多次请求，一个session对应多个request请求对象
	·在Java的Servlet规范中，session机制对应的Java类是：jakarta.servlet.http.HttpSession
	·session机制属于BS结构的一部分，如果使用php开发web项目，同样会有session，session机制实际上是一种http协议规范
	·session对象最主要的作用是：保存会话状态（必须你目前网页上登陆成功了，怎么把这个登陆的状态保存下来，然后在其他
		窗口打开的时候同样是已登陆的状态，如：b站登陆上之后，不管你浏览器开了几个窗口，它右上角都是你的用户名）
	·为什么需要session对象来保存会话状态呢？
		-因为http协议是一种无状态协议
		-什么是无状态：请求的时候，B和S是连接到，但是请求完成之后，BS之间的链接就断开了，为什么要这样做？
			因为这样无状态的协议可以降低服务器压力，请求是瞬间的，这个瞬间结束后，服务器压力就小了
		-那么B和S断开之后，关闭浏览器的这个动作，服务器知道吗？
			服务器是不知道浏览器何时关闭的
		-张三打开一个浏览器，李四打开一个浏览器，访问服务器后，在服务器上会生成：
			张三专属的session会话对象，李四专属的session会话对象
		-为什么不使用HttpRequest对象(请求域)保存会话状态？为什么不使用ServletContext对象(应用域)保存会话状态？
			ServletContext应用域太大，而HttpRequest请求域又太小了
		-HttpSession对象同样有setAttribute()、getAttribute()、removeAttribute()这些3个方法

# session的实现原理：
	HttpSession session = request.getSession();
	**这行代码的作用是，判断请求中有没有jsessionid：
		*如果没有，它会在服务器中创建HttpSession对象，并自动向resp对象中响应一个存放jsessionid的cookie；
			如果不想自动创建，可以在getSession()中传false参数；
		*如果有，它会根据jsessionid去找对应的session对象，找到就返回对应的session对象，没找到也是自动创建session，
			并自动响应存放jsessionid的cookie；
（实际上保存在web服务器内存中的session对象，会有一个默认的时间设定，如果超过一定时间没有人来访问，这个session对象会自动销毁，默认是30min）

# 关于session对象：
	1、session对象是存储在服务器中的，一个session对象对应一个会话，一个会话包含多次请求
	2、session对象怎么获取？req.getSession(true/false);
	3、session实现原理：
		·在web服务器中有一个放session的表，类似于map集合。这个map的key存储的是sessionid，这个map的value存储的
			是对应的session对象
		·用户发送第一次请求的时候：服务器会创建一个新的session对象，同时给session生成一个对应的sessionid；
			响应时tomcat会自动将这个id以cookie的形式（jsessionid=xx）放在response对象中响应给浏览器，
			浏览器将session的id以cookie的形式保存在浏览器的缓存中，每个cookie都根据响应对象所关联了不同的路径；
		·用户发送第二次请求的时候，会自动将B端和这个路径有关联的cookie携带在请求头中发送给服务器；服务器可以获取到
			cookie中的sessionid，然后找到S端堆中对应的session对象，用里面保存的数据响应给用户浏览器；
-------------------------------------
此时应该清楚了，到底什么是一次会话？
	说白了就是，从session对象被创建，到最后session对象死掉，这个过程就是一次“会话”
为什么关闭浏览器，会话结束？
	原因是关闭浏览器后，浏览器内存消失，其中保存的cookie也消失，下次重新打开浏览器发送请求后，该路径关联的cookie
	也没有，自然不会提交sessionid，没有这个sessionid当然也找不到S端的session对象了，当没有session对象等同于会话结束
为什么浏览器登录后长时间不操作，会自动下线？
	因为session对象的会话域里保存着用户的登录信息，长时间没有被访问，这个对象就会被服务器销毁，
	于是之后拿着sessionid去找，找不到了，被销毁了，于是提示需要重新登录

# session对象什么时候被销毁？
	1、S端自动超时销毁
		超时销毁是可以配置到web.xml文件中去的：
			<session-config>
				<session-timeout>30</session-timeout>
			</session-config>
		表示：如果30分钟过去了session对象仍然没有被访问，session对象会被销毁
		tomcat默认的session-timeout就是30分钟(CATALINA_HOME\conf\web.xml)
	2、也可以使用Java代码设置session存活时间：session.setMaxInactiveInterval(60) 单位秒
	3、S端Java程序进行手动销毁：	void  session.invalidate();

# 浏览器中的sessionid是以什么形式存在的？
	JSESSIONID=xxxxxxx，即字符串key=value的形式保存在浏览器缓存中的；
	这个东西实际上就是用“ cookie ”的形式保存在浏览器的运行内存中的，浏览器只要关闭，这个cookie就没有了

# 那么如果cookie禁用了，session还可以找到吗？
	cookie禁用：
		服务器正常发送cookie给浏览器，但是浏览器不要了，拒收了
	cookie禁用了，session机制还可以实现吗？
		可以，需要使用“URL重写机制”：在所有的URL后面跟一个“;jsessionid=26bb49b009aec0dc78”
		https://www.bilibili.com/?name=value&name=value;jsessionid=26bb49b009aec0dc78
		这种做法并不总是最佳实践，因为它可能会暴露敏感的会话信息。在现代的Web应用程序中，更常见的做法是
	使用cookies来存储会话信息，因为这种方式更安全，并且可以更好地控制和保护用户的会话数据。
	URL重写机制会提高开发者的成本。开发人员在编写任何请求路径的时候，后面都要手动添加一个jsessionid，
	给开发带来了很大的难度，很大的成本。所以大部分的网站都是这样设计的：你要是禁用cookie，你就别用了；

# 怎么获取S中创建好的session对象的id：session.getId(); 判断是新的还是旧的session：session.isNew();

# 总结一下目前为止我们所了解的域对象都有哪些？
	request():		请求域		ServletRequest()	请求级别
	session():		会话域		HttpSession()		用户级别
	application():	应用域		ServletContext()	项目级别，所有用户共享
	这三个域的大小关系：
		request<session<application
	他们三个域都有以下三个方法：
		setAttribute(String,Object)
		getAttribute(String)
		removeAttribute(String)
	使用原则：尽量使用小的域

--------------------------------
注意：jsp中的九大内置对象之一就有session对象，只要访问jsp页面，九大内置对象之一的session对象就被创建好了


===========day13=================================================================================


---关于Cookie-------------------------------------------------------------------

# cookie是一种会话技术，它由服务器产生，是放在浏览器上的一小段数据，浏览器每次访问改服务器路径，都会携带路径下关联的cookie；
	服务器根据这个cookie找到用户的，在服务器中保存的数据；

# 服务器创建session对象后，会自动将sessionid封装成cookie对象放入response对象中，然后最终作为Set-Cookie响应头给浏览器；
	由于cookie是存储在B端的数据，比较容易暴露，一般不存储一些敏感或影响安全的数据。它的数据是字符串的键值对形式；
	敏感的数据一般都在服务器的session域中存储；

# session的实现原理中，每一个session对象都会关联一个jsessionid，例如：
		JSESSIONID=26bb49b009aec0dc78
	以上这个字符串键值对就是Cookie对象中的信息；

# cookie怎么生成？保存在什么地方？有什么用？浏览器什么时候会发送cookie？发送的是哪些cookie？
	浏览器是怎么区别它是哪一个网站的cookie呢？
	# cookie可以保存在浏览器的运行内存中(浏览器关闭就消失)，也可以保存在硬盘文件上(永久保存)
	# cookie有啥用呢？
		cookie和session其实就是保存会话的状态。cookie是将会话的状态保存在B端上，而session是
		将会话状态保存在S端上
	# 为什么要存在cookie和session呢？就是因为Http协议它是一种无状态协议
	# cookie和session机制是http协议中的，并不是java或某种语言中的，只要做web开发，不管是什么语言，这些机制都是需要的
	# HTTP协议中规定：任何一个cookie都是由name和value组成的。name和value都是字符串
	# 在java中对cookie提供了哪些支持呢？在JavaEE中的jakarta.servlet.http.Cookie
	# 在HTTP协议中是这样规定的：当浏览器发送过来请求的时候，会自动携带该path下的cookie数据给服务器
	# 当用户第一次访问的时候，java程序是怎么把创建的servlet对象的session的id，通过cookie响应给浏览器的呢？
		response.add(Cookie cookie)将cookie添加到响应对象中，响应头中就会有“Set-Cookie: key=value”返回cookie信息给浏览器；
		此时再次访问该路径，请求头就多了“Cookie: key=value;..”携带cookie信息给服务器了；

# 关于Cookie对象的方法：
	# 创建cookie：new Cookie("key","value");
	# response.add(Cookie cookie)：将保存有该用户信息的cookie响应给浏览器，B端的浏览器自动保存这个cookie（除非禁用了）
	# void setMaxAge(int second)：设置cookie的失效时间（单位second秒）
		·如果没有设置有效时间，那么它默认的maxAge值为–1，只保存在浏览器的内存上，浏览器关闭cookie失效并消失
			如果maxAge为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后
			该Cookie即失效。maxAge为负数的Cookie，为临时性Cookie，不会被持久化，不会被写到Cookie文件中
		·如果设置cookie的有效时间>0，那么它一定会被浏览器自动保存在B端的电脑硬盘上second秒，过时自动删除
		·如果设置为0，则表示删除该Cookie，只用这种方式主要应用在：删除B端浏览器上的同名cookie
	# setPath("path")：设置cookie关联的路径；
		只要是访问这个路径或它的子路径，那么浏览器会自动携带本地与该路径关联的cookie，在请求中一块发送给S端；
-----------------------------
# 没有设置path的情况下，cookie它关联的路径是什么？
	# 假设现在将cookie响应给B端是：http://localhost:8080/servlet13/cookie/generic 这个资源，在这里
		response.add(Cookie cookie)响应的cookie，如果cookie没有设置setPath("path")，默认的path是什么？
		默认的path是：http://localhost:8080/servlet13/cookie 以及它的所有子路径。
	# 也就是说，只要请求的路径是与它同级目录的路径或其子路径，那么cookie都会被携带发送给服务器端。
	# 所以如果这样设置：cookie.setPath("/servlet13")：表示B端只要访问这个servlet13项目里，都会提交这个cookie给服务器；

---------------------------
# 浏览器发送cookie给服务器了，服务器中的java程序怎么接收？
	通过request对象的方法：Cookie[] cookie = request.getCookies() 可以拿到所有的Cookie对象，
	然后调用Cookie对象的getName()和getValue()方法拿到这个cookie的key和value；如果没有cookie返回null；

========================
改进oa1项目：用户登录，点击十天内免登录，可以实现免登录
========================
```

```txt
========day14======================================================================================

过滤器Filter：
		jakarta.servlet.Filter接口，即过滤器，是JavaEE规范之一，作为目标资源的请求进行过滤的一套技术规范，
	是JavaWeb最实用的技术之一。Filter接口定义了过滤器的开发规范，所有的过滤器都要实现该接口；过滤器的工作位置是
	项目中所有目标资源之前，容器在创建http请求和响应目标资源之前，会调用过滤器的doFilter方法，该方法中可以控制请求
	是否继续，放行就由其后的过滤器或servlet进行请求处理；拒绝就在过滤器本身做出响应；过滤器不仅对请求进行过滤，
	还可以在请求前后做一些其他的操作。
		过滤器是GoF中责任链设计模式的典型案例。应用场景：日志信息、性能分析、登录控制、事务处理、跨域处理等..

----------------------------------------------------------------
· 一个过滤器怎么写呢？
	第一步：编写一个Java类实现一个接口：jakarta.servlet.Filter，并实现这个接口中所有的方法
		init()：仅在Filter对象被创建时调用一次，该方法是接口中的默认方法，可以不实现。
		doFilter()：用户发送请求就执行一次，在该方法中编写过滤代。
		destory()：仅在Filter对象被销毁前调用一次，同样是默认方法。
	第二步：在web.xml文件中配置过滤器负责的请求路径，这些请求会先走过滤器。
			<filter>
				<filter-name>login</filter-name>
				<filter-class>com.test.login.LoginFilter</filter-class>
			</filter>
			<filter-mapping>
				<filter-name>login</filter-name>
				<url-pattern>/*</url-pattern>过滤所有请求
				<servlet-name>servlet1<servlet-name>过滤器路径还可以写servlet的别名
			</filter-mapping>
			注解方式配置，在过滤器类上面加注解： @WebFilter("/xx/xx/x")
	* 注意：Fileter对象在服务器启动就会创建，其他的类似servlet。

· 编写过滤规则：
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	 throws IOException,ServletException{
		System.out.println("在目标程序执行前过滤");
		chain.doFilter(request, response);//放行代码，请求执行结束还会重新回到此处
		System.out.println("在目标程序执行后过滤");
	}

· chain.doFilter(request, response);这行代码的作用，执行这条请求链上的下一个过滤器，下面没有过滤器了，才执行Servlet；
	*注意：Filter的优先级天生就比Servlet或html优先级高：/a.do路径对应一个Filter和Servlet，那么一定会先执行Filter

· 此时问题来了，如果我有多个过滤器，且路径相同，怎么确定先走哪个过滤器呢？
	根据web.xml中配置的mapping的先后顺序来走的。
· 那么如果我采用了注解的方式来配置路径，并且多个过滤器的路径相同，此时是按照“过滤器的类名”在字典上的先后顺序来执行的。

------------------
# 过滤器这里有一个比较重要的GoF设计模式：责任链设计模式
	* 过滤器最大的优点：它在编译阶段不会确定调用顺序，因为Filter的执行顺序是根据配置文件来确定的，只要修改配置文件就
	可以实现过滤器之间执行顺序的动态组合，这种设计模式就叫做责任链设计模式
	* 它的核心思想是：在程序运行阶段，动态的组合程序的调用顺序
过滤器同样有GenericFilter和HttpFilter这两个抽象类，前者比Filter多了一个过滤器配置属性filterConfig，更通用，
否则你想用过滤器的初始化参数信息就得自己重写init方法；后者就是将doFilter()的前2个参数变为了HttpServletRequest的，
更适合web开发，这点类似于前面的Servlet接口。



=============================监听器Listener================================================================

# 什么是监听器：专门对3个域对象身上发生的事件，进行监听和处理相应代码的对象。
	·监听器是GoF中“观察者模式”的典型案例，即当被观察的对象发生某些改变时应该要自动采取行动的一种模式；
	·监听器是Servlet规范中的一员，就像Filter一样，都是Servlet规范中的一员；
	·在Servlet中，所有的监听器接口都是以“Listener”结尾，它一般只监听域对象；

# 监听器有什么用？
	·监听器实际上是Servlet规范留给我们javaweb程序员的特殊时机
	·特殊的时刻如果想做一些事情，就需要用到javaweb对应的监听器

# Servlet规范中提供了哪些监听器接口？
	·sevlet中定义了9个监听器接口作为监听器实现的规范，这9个监听器按照不同的功能可以进行分类：
		*ServletContextListener
		*HttpSessionListener
		*ServletRequestListener
		*ServletContextAttributeListener
		*ServletRequestAttributeListener
		*HttpSessionAttributeListener
		*HttpSessionIdListener：当session的id发生改变的时候，监听器中的唯一一个方法就会被掉用；
	（以上是关于域对象创建/销毁，以及域对象中数据的增删改的监听器接口）

	·特殊的2个http包下关于HttpSession的3个监听器接口：（这两个监听器接口的实现类不需要在servlet中写<listener>标签进行注册）
		*HttpSessionBindingListener：实现了该接口的对象，放到了session域中，或从session域中移除，就会触发绑定和解绑方法；
		*HttpSessionActivationListener：用来监听服务器中某些session对象，即将钝化的和已经活化的，对某些进行监听；
			# 如果某个session对象需要被它监听，那么就需要将这个监听器对象new出来放在该session域中，此时该session对象钝化或活化会触发监听器执行；
			（钝化和活化：服务器中有很多session对象，会大量占用服务器资源，如果某些对象不常使用，可以暂时放在
				服务器电脑磁盘上，当需要的时候再加载到内存。保存到磁盘就是钝化，加载到内存就是活化）
			# 怎么让你的项目可以发生session对象的钝化和活化呢，需要在项目上下文路径中，新建META-INF目录，里面新建context.xml，在该文件中配置钝化活化：
			------------
			<?xml version="1.0" encoding="UTF-8"?>
			<Context>
				<Manager className="" maxIdleSwap="">
					<Store className="" directory=""></Store>
				</Manager>
			</Context>
			------------

# 使用过监听器：（以ServletContextListener为例）
	·第一步：编写一个类实现ServletContextListener接口，并且实现里面的方法：（2个默认方法）
		void	contextInitialized(ServletContextEvent event)：创建事件发生自动调用的方法
		void	contextDestroyed(ServletContextEvent event)：销毁事件发生自动调用的方法
		参数是ServletContextEvent对象是事件对象，可以通过它来拿到发生此次事件的对象源

	·第二步：在web.xml文件中对监听器实现类进行注册，如下：
		<listener>
			<listener-class>监听器完整类名</listener-class>
		</listener>
		这样监听器就生效了。当然也可以使用注解的方式： @WebListener，不过一般很少用
（注意：所有监听器中的方法都是不需要javaweb程序员去调用的，由tomcat去调用，什么时候调用呢？当某个特殊的事件发生之后，tomcat自动调用）
-----------------------------------------------------------


=======day15================================================================================================


#关于MVC架构模式：
		它是软件工程的一种“软件架构模式”，它把软件系统分为“模型”、“视图”和“控制器”三个基本部分，用一种业务逻辑、数据、界面分开的方法来
	组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面以及用户交互的同时，不需要重新编写业务逻辑。

	1、系统为什么要分层？
		希望专人干专事、各司其职，职能分工要明确，这样可以让代码耦合度降低，扩展力变强，组件复用性高
	2、MVC解释：
		M：Model/数据/业务，m是负责业务处理，数据处理的一个秘书；像实体类（pojo/domain/bean）、数据库访问（dao/mapper）、
			处理业务的service包，这些内容都属于M层；
		V：View/视图/展示，v是负责展示的一个秘书（JSP/html/css/js/img）
		C：Controller/控制器，c是核心，是控制器，是司令官（SpringMVC），如Servlet类，都是C层；
		MVC：一个司令官两个秘书，去管理控制一个项目
	用户通过html发送请求给S端服务器，服务器统一交给C控制器来处理用户的请求，C可以通过调用M和V来进行业务逻辑处理和前端页面展示。

#关于三层架构（web层/表示层、服务层/业务层、持久层/DAO层）：
	每一层之间互相都通过接口来调用，具体每一层的实现类在每一层包下会有一个impl包，实现类的类名以impl结尾；

	*表示层/表现层/web层：Servlet、JSP，用于处理前端发送过来的请求以及界面的展示；
	*业务逻辑层Service：java代码，用于具体业务的具体处理与实现，调用DAO进行数据的持久化，调用各种javabean进行数据的封装；
		一般情况下，每张表都对应处理这张表相关业务的service类；
	*持久化层DAO：和业务无关的jdbc代码，将数据持久化保存到数据库；我们之后会学一些DAO层的框架，如：MyBatis、SpringData..

#什么是DAO：Data Access Object（数据访问对象）
	DAO实际上是一种设计模式，属于JavaEE设计模式之一（不是23种设计模式），它只负责数据库的CRUD，没有任何的业务逻辑在里面，
	这样的对象被称为DAO对象；如果是处理t_user表的，这个DAO就可以叫做：UserDao，一般情况下每张表对应一个DAO对象类；



===================servlet做文件上传===================================================================================
1、前端：
------------------------
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>上传文件</title>
</head>
<body>
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="img"><p>
    <input type="submit" value=" 提 交 ">
</form>
</body>
</html>
------------------------
2、后端的web.xml配置：
------------------------
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <servlet>
        <servlet-name>FileUploadServlet</servlet-name>
        <servlet-class>FileUploadServlet</servlet-class>
	<!-- 重点是在servlet中配置这个，表示该servlet支持文件上传，在这里面设置文件上传属性 -->
        <multipart-config>
	    <!--设置单个支持最大文件的大小-->
	    <max-file-size>102400</max-file-size>
            <!--设置整个表单所有文件上传的最大值-->
            <max-request-size>102400</max-request-size>
            <!--设置最小上传文件大小-->
            <file-size-threshold>0</file-size-threshold>
        </multipart-config>
    </servlet>
    <servlet-mapping>
        <servlet-name>FileUploadServlet</servlet-name>
        <url-pattern>/upload</url-pattern>
    </servlet-mapping>
</web-app>
------------------------
3、后端servlet：
------------------------
//也可以使用注解来代替xml中的配置：@MultipartConfig( fileSizeThreshold = 1024 * 1024,  maxFileSize = 1024 * 1024 * 10,  maxRequestSize = 1024 * 1024 * 50 )
public class FileUploadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//重点方法，request.getPart("img");获取请求体中上传文件的流信息，返回的是一个part对象
        Part part = req.getPart("img");

        //手下声明一个保存路径，这里保存在D盘的File文件下
        String filePath = "D:\File\";

	//part.getSubmittedFileName()可以获取文件名，UUID.randomUUID().toString()是避免文件名冲突的
	String fileName = UUID.randomUUID().toString()+
                part.getSubmittedFileName().substring(part.getSubmittedFileName().indexOf("."));

        //通过write方法，可以将这个png文件保存在任意路径下，write里面的参数，就是要保存的路径；这种方式比较适合简单的写入，也可以part.getInputStream();手动写入控制更多读写细节
        part.write(filePath+fileName);

        //然后给前端返回响应的结果
        resp.setContentType("text/html");
        resp.setCharacterEncoding("utf-8");
        PrintWriter writer = resp.getWriter();
        writer.println("<h1>上传成功</h1>");
    }}
```

------

