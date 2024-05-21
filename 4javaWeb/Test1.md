> HelloServlet.java

```java
import jakarta.servlet.Servlet;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.ServletConfig;
import java.io.*;

public class HelloServlet implements Servlet{
	//共5个方法
	public void init(ServletConfig config) throws ServletException{
	}
	public void service(ServletRequest request, ServletResponse response) throws ServletException, java.io.IOException{
		System.out.println("Hello Servlet!");
		/*怎么将一个信息输出到浏览器上？
			需要使用ServletResponse接口：response
			表示响应：从服务器向浏览器发送数据
		*/
		//可以设置响应的内容类型
		response.setContentType("text/html");//注意：这行代码必须设置在拿到流之前

		PrintWriter out = response.getWriter();//这个流不需要close和flush，tomcat帮我们做了，手动关闭的话更好
		out.print("hello Servlet, you are my love!");
		out.print("<h1>hello</h1>");//这行代码最终还是会原样显示，不会呈现html代码的形式

	}
	public String getServletInfo(){
		return "";
	}
	public ServletConfig getServletConfig(){
		return null;
	}
	public void destroy(){
	}
}
```

> StudentServlet.java

```java
import jakarta.servlet.Servlet;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.ServletConfig;
import java.io.*;
import java.sql.*;

public class StudentServlet implements Servlet{
	//共5个方法
	public void init(ServletConfig config) throws ServletException{
	}
	public void service(ServletRequest request, ServletResponse response) throws ServletException, java.io.IOException{
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		//编写jdbc代码，连接数据库，查询所有员工信息
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try{
			//注册驱动
			Class.forName("com.mysql.jdbc.Driver");
			//获取连接
			String url = "jdbc:mysql://localhost:3306/test?useSSL=true&characterEncoding=utf8";
			String username = "root";
			String password = "a123456789";
			conn = DriverManager.getConnection(url, username, password);
			//预编译数据库操作对象
			String sql = "select ename, sal from emp;";
			ps = conn.prepareStatement(sql);
			//执行sql语句
			rs = ps.executeQuery();
			//处理查询结果集
			while(rs.next()){
				String ename = rs.getString("ename");
				String sal = rs.getString("sal");
				out.print(ename +":"+ sal +"<br/>");//响应给B端
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			//从小到大释放资源
			if(rs != null){
				try{
					rs.close();
				}catch(Exception e){
					e.printStackTrace();
				}
			}
			if(ps != null){
				try{
					ps.close();
				}catch(Exception e){
					e.printStackTrace();
				}
			}
			if(conn != null){
				try{
					conn.close();
				}catch(Exception e){
					e.printStackTrace();
				}
			}
			if(out != null){
				try{
					out.close();
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		}
	}
	public String getServletInfo(){
		return "";
	}
	public ServletConfig getServletConfig(){
		return null;
	}
	public void destroy(){
	}
}
```

```txt
==========day01===================================================================================

· 一个WEB系统的通信原理？步骤：
	1、用户输入网址（URL）：http://www.baidu.com
		什么是URL：网络上的，统一资源定位符
	2、浏览器的域名解析器进行域名解析：http://110.242.68.3:80/index.html
	3、浏览器在网络中找到对应的服务器，再连上对应的端口，由端口对应的web服务器软件将
	用户指定的资源找到，通过网络返回给浏览器
	4、浏览器接收到服务器返回的代码（HTML\CSS\JS），执行代码，显示效果

· web服务器软件有吗：
	有很多，都是别人开发好的，其中有：
	Tomcat(Apache)：
		开源、免费、轻量级的web服务器，apache公司用纯java语言开发的，体积小运行速度快，又叫catalina
		只实现了javaEE的Servlet + JSP两个核心规范。要想运行，必须先有jre，再配置环境变量：JAVAHOME、PATH..
	jetty：最轻量级的免费Web服务器，当然功能要少于tomcat一些；
	JBOSS(应用服务器)
	WebLogic(应用服务器)
	WebSphere(应用服务器)
	...

· 应用服务器和web服务器的关系？
	1、应用服务器实现了JavaEE的所有规范（JavaEE有13个不同的规范）
	2、web服务器只实现了JavaEE中的Servlet + JSP两个核心的规范，体积较小
	3、"应用服务器"是包含"web服务器"的
	4、JBOSS服务器中内嵌了一个Tomcat服务器
（JavaEE完全包含了JavaSE，它是专门做web开发的库；JavaME包含一小部分JavaSE，是轻量级的做嵌入式开发的库，它们3个可以互相衔接使用）

· 关于Tomcat服务器目录：
	bin：存放Tomcat服务器的“命令文件”，如：启动Tomcat，关闭Tomcat等命令
	conf：存放Tomcat服务器的“配置文件”，如：server.xml文件中可以配置端口号，默认8080；web.xml文件可以配置欢迎页，等等..
	lib：Tomcat服务器的“核心程序”目录，因为Tomcat是java写的，所以这里存放jar包；这里的jar包会被webapps目录下的所有程序共享；
	logs：存放Tomcat服务器的“日志文件”的目录，如：启动信息，log方法的日志文件等，后面会讲到
	temp：Tomcat服务器的临时目录，存储“临时文件”
	webapps：存放大量的web应用（web app，一个webapp就是一个项目）
	work：用来存放JSP文件翻译之后的java文件以及java再编译之后的class文件

· 启动Tomcat服务器：
	# Tomcat的bin目录下有一个文件：startup.bat，通过它可以启动Tomcat服务器
		* xxx.bat文件：它是windows系统专用的，batch批处理文件，这种文件中存放大量的DOS命令；
		执行bat文件就相当于批量的执行dos命令

		* startup.sh，这个文件在windows中无法执行，是linux系统专用的shell文件，在linux
		中执行.sh文件就是执行了大量的shell命令，类似于windows的.bat文件和dos命令

		* tomcat服务器提供了bat和shell文件，充分说明这个tomcat服务器的通用性

	# 打开startup.bat文件得出，执行这个文件，主要是去CATALINAHOME中去找catalina.bat文件，通过该文件来启动tomcat；
	而catalina.bat文件是如何启动的呢？其中有这样一行配置：MAINCLASS=org.apache.catalina.startup.Bootstrap，这个类
	就是java程序的main方法所在的类，启动tomcat就是执行java程序的main方法；
	# 知道了这层关系，那么我们尝试去启动startup.bat，报错了：它说找不到此文件。将path环境变量配置好之后再执行，继续报错：
	说找不到CATALINA_HOME环境变量，所以找不到catalina.bat文件。继续配置CATALINA_HOME之后再执行，还是报错：说找不到JAVA_HOME。
	# 为啥？因为Tomcat服务器配置好了，但是由于它是java写的，所以需要Java的支持，电脑上虽然装好了JDK可以运行java程序了，
	但是你没有告诉Tomcat去哪里找jre运行tomcat它的程序；于是想要启动Tomcat服务器，还需要配置JAVA_HOME，让tomcat能找到Java

· 配置Tomcat服务器需要配哪些环境变量？
	1、JAVA_HOME=Java的家（要让tomcat能找到Java）
	2、CATALINA_HOME=tomcat的家（要让startup.bat能够找到tomcat的catalina.bat来运行main程序）
	上面哥俩有了，那么你的path环境变量还按原来的方式写就很low，能不能用一下以上俩配置？可以：
	3、Path=%JAVA_HOME%\bin;%CATALINA_HOME%\bin（jdk的环境变量和tomcat的环境变量）

· 最后：
	启动Tomcat：startup | startup.bat
	关闭Tomcat：stopup | stopup.bat（shutdown.bat文件重命名为stopup.bat，为什么，因为和关机命令shutdown冲突）

· 测试是否配置成功：启动Tomcat服务器，打开浏览器，输入：http://127.0.0.1:8080 ，如果出现了Tomcat页面说明配置成功

· 实现一个web小应用：
	第一步：找到CATALINA_HOME\webapps目录
		因为所有的webapp要放在此目录下，否则Tomcat服务器找不到，这是规定
	第二步：在CATALINA_HOME\webapps目录下新建一个目录：oa
		这个oa就是webapp的名字
	第三步：在oa下新建资源文件，例如：index.html
		在index.html中编写前端代码
	第四步：启动Tomcat服务器
	第五步：打开浏览器，输入：http://localhost:8080/oa/index.html
（注意：html界面的路径中，可以省略：协议、ip、端口号，直接以"/项目名"开始，这就是一个绝对路径，后面说原因）

=====day02================================================================================================


· 访问这个页面：http://localhost:8080/oa/index.html
	可以展示一个用户列表界面。但是这个用户列表页面是写死在HTML文件当中的，这种资源我们称为“静态资源”；
	怎么能变成动态资源，显然需要链接数据库

· 链接数据库需要用到JDBC技术，也就是说需要编写Java程序连接数据库，数据库中有多少条记录，页面上就显示多少
	条记录。这种技术被称为“动态网页技术”。（动态网页技术并不是说页面中有flash动画，是说页面中的数据
	是动态的，是根据数据库中的数据条数而变化的）
-------------------------------------------------------------------------------------------------------
· 要做到以上，首先要了解web程序的开发流程：
	当用户在浏览器地址栏输入路径访问web服务器上对应的资源，一个路径就代表一个资源。这个资源可能是
	一个静态资源（http://localhost:8080/oa/index.html） ，也可能是一个动态资源（java小程序）：
	http://localhost:8080/oa/userLogin，一个路径对应web服务器上的一个动态的程序；
	那么这个资源的路径可以随便整吗？http://localhost:8080/oa/xxx/aaa/xx/pp 显然不可以，
	如果这个路径随便整的话，那么写好的java程序换到另一个web服务器上（jetty）可能就运行不了了，
	因此所有的web服务器厂商做的服务器都需要遵守一些规范，而Servlet就是JavaEE制定的一套规范之一，
	我们就按照这个规范来学习去开发webapp

· 在整个BS结构中，有哪些人参与进去了？
	-浏览器/客户端的开发团队（Google、FireFox、IE...）
	-web服务器/应用服务器的开发团队（Tomcat、jetty...）
	-DB server的开发团队（Oracle、Mysql、SQLServer）
	-WebApp的开发团队（Java程序员）

· 角色和角色之间需要遵守哪些规范、协议？
	-用户的浏览器Browser和Web服务器之间数据传输的规范/协议：HTTP协议（超文本传输协议）
	-WebApp开发者需要和Web服务器之间制定一套规范：javaEE规范之一，Servlet规范
		Servlet作用：让WebApp和Web服务器之间解耦合
	-WebApp开发者和数据库厂商之间的规范：JDBC

· Servlet本质：
	通过分析：
		对于程序员来说，只需要做两件事：
		-编写一个类实现Servlet接口
		-将编写的类配置到配置文件中，在配置文件中：指定“请求路径”和“类名”的对应关系
	注意：
		这个配置文件的“文件名”和“路径”不能乱来，Servlet规范固定好了，在Tomcat中服务器写死了；
		文件名、路径都是SUN公司制定的Servlet规范中的明细
	严格意义上来说Servlet并不只是一个接口：
		Servlet规范中规定了：
		*一个合格的WebApp应该是一个怎样的目录结构
		*一个合格的WebApp应该有一个怎样的配置文件
		*一个合格的WebApp配置文件应该放在哪里
		*一个合格的WebApp中的java程序放在哪里
	Tomcat服务器要遵循Servlet规范，javaWEB程序员也要遵守这个规范，这样编写的程序才能和web服务器解耦合


====day03=================================================================================================


· Servlet规范是一个什么规范？
	遵循Servlet规范的webApp，这个webApp就可以放在不同的web服务器上运行，因为其他的web服务器也是遵循Servlet规范的

· Servlet规范包括什么呢？
	*规范了哪些接口
	*规范了哪些类
	*规范了一个web应用中应该有哪些配置文件
	*规范了一个web应用中配置文件的名字
	*规范了一个web应用中配置文件存放的路径
	*规范了一个web应用中配置文件的内容
	*规范了一个合法有效的web应用它的目录结构应该是怎样的
	.....
--------------------------------------------------------------------------------------
· 开发一个带有Servlet（java小程序）的webApp（重点）
	开发步骤：
	1、webapps目录下新建一个项目目录，起名crm（crm就是项目的根），名字随意

	2、（必须）在webapp的根下新建一个目录：WEB-INF
		注意：这个是必须的，目录名字是Servlet规范中规定的，必须一模一样，必须的必须

	3、（必须）WEB-INF下新建一个目录：classes
		注意：这是必须的，这里放的一定是java的字节码文件class文件

	4、（必须）在WEB-INF下新建一个目录：lib
		注意：这个不是必须的。但如果一个webapp需要第三方的jar包的话，这个jar包在tomcat的
		lib目录中没有的话，就得放到webappWEB-INF的lib目录下，名字必须是lib。
		例如jdbc的jar包，就必须放在这个目录下
		（tomcat的lib目录下的所有jar包，也就是Java类，所有的webapp都共享）

	5、（必须）在WEB-INF下新建一个文件：web.xml
		注意：这个是必须的，它是一个webapp的核心配置文件，一个合法的webapp必须包含这个文件。这个
		配置文件中描述了请求路径和Servlet之间的对照关系
		注意：这个配置文件最好从别的webapp中拷贝，最好别手写。没必要，tomcat的webapps目录下就有
		如：<?xml version="1.0" encoding="UTF-8"?>
			<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
			  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			  xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
					      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
			  version="5.0" metadata-complete="true">
			</web-app>

	6、编写一个Java程序，这个Java程序也不能随便写，必须实现Servlet接口
		-Servlet不在JDK中（因为Servlet不是javaSE了，是javaEE）
		-Servlet接口是Sun/Oracle提供的
		-Tomcat服务器实现了Servlet规范，所以Tomcat服务器需要使用Servlet接口，那么Tomcat服务器中
		应该有这个接口。Tomcat的lib目录下有一个servlet-api.jar
		解压这个文件之后，你会找到一个：jakarta.servlet.Servlet.class

	注意：你的java源码不管在哪里写都可以，只要把编译好的class字节码放在classes目录下就行；那么：
	怎么让你的源码编译通过呢，你用到了别人呢写的jar包Servlet，所以需要在classpath中配置：
	Tomcat中的lib下的servlet-api.jar

	7、编译好的class文件放在classes之后，在web.xml编写配置信息，让“请求路径”和“servlet”类名相匹配，
		这一步的专业术语叫：在web.xml文件中“注册”Servlet类
			<!--servlet描述信息-->
			<servlet>
				<servlet-name>名字随便写，但是要一样</servlet-name>
				<!--这个位置必须是带有包名的完整类名-->
				<servlet-class>HelloServlet</servlet-class>
			</servlet>

			<!--servlet映射信息-->
			<servlet-mapping>
				<servlet-name>名字随便写，但是要一样</servlet-name>
				<!--这里需要一个路径，这个路径后面再说，目前先以斜杠‘/’开头-->
				<url-pattern>/fsa/saf/asfd/sfd</url-pattern>
			</servlet-mapping>
		注意：每一个实现servlet的class文件都要注册到xml文件中，以上代码都要写一份

	8、启动Tomcat服务器，cmd中输入startup.bat然后回车

	9、打开浏览器，在浏览器地址栏上输入一个URL，这个url必须根据刚才xml文件中地址来的：
	http://127.0.0.1:8080/crm/fsa/saf/asfd/sfd
		-浏览器上的请求路径不能随便写，这个路径必须是：协议 + ip + 端口 + 项目名 + url-pattern路径
		-但是这个路径很复杂怎么办？可以使用超链接
		-以后就不需要我们编写main方法了，Tomcat负责调用main方法，服务启动的时候执行的就是main
		我们程序员只需要编写servlet接口的实现类，然后将其注册到web.xml文件中即可
	（注意index.html必须放在和WEB-INF同级的目录中）

/*关于路径问题：（分为相对路径和绝对路径）

·相对路径：不以/开头的都是相对路径。它以当前资源所在路径，作为出发点（基路径）去找目标资源；相对是相对于浏览器当前url的同级目录中来找；
	./表示当前资源的路径，../表示当前资源的上一层路径；规则是：将目前资源的所在路径，拼接给出的相对路径，形成完整的url去找资源；
	缺点：相对路径的起点会受到用户浏览器的url的影响。

·绝对路径：以/开头的都是绝对路径。以固定的位置作为出发点去找目标资源；不同项目中的固定出发点可能不同，可以自己测试下；
	在tomcat的javaweb项目中，该固定位置是“协议://ip:端口号/”，也就是/会被替换成这个；
	缺点：绝对路径需要补充“项目名”，也就是项目上下文，难在这个东西会经常变化。

（重点）我们通常这样做：用head>base>href来设置相对路径的基路径。通常写“/项目名/”，这样页面中所有的资源的相对路径，
都会拼接上这个基路径，把相对路径变成一个绝对路径，项目名变只需要改这一个标签的值就行了。
（还不完美，href还得我们改，解决办法：通常我们一个服务器只部署一个项目，所以项目名直接不给了，idea中部署上下文路径直接给/就行了，
我们项目中的路径统一用绝对路径的写法）
*/

· 总结：一个合法的webapp目录结构应该是怎样的？
	xx项目xx
		----WEB-INF
			|-------classes		（必须）
			|-------lib			（必须）
			|-------web.xml		（必须）
		---static
			|---css
			|---javascript
			|---image
		---page
			|---index.html
		....

· 从浏览器发送请求，到web服务器调用Servlet中的方法，是怎样的一个过程（以下这个过程很粗糙，省略了一些步骤）
	- 用户输入URL，或者点击超链接：http://127.0.0.1:8080/crm/fsa/saf/asfd/sfd
	- 然后Tomcat接收请求，截取路径：/crm/fsa/saf/asfd/sfd
	- Tomcat找到crm项目，Tomcat在web.xml文件中查找/fsa/saf/asfd/sfd对应的servlet是：
		<servlet-class>HelloServlet</servlet-class>
	- Tomcat通过反射机制创建HelloServlet对象，多态的方式创建
	- Tomcat调用对象中的service方法

· 其实url中端口号后面的“项目上下文路径/项目名”，它可以和部署目录/webapp下的文件名不同，不过以下配置起来比较复杂，idea中好弄；
	项目也不是必须放在webapp目录下，可以是电脑上任意位置的文件，但需要配置：在tomcat的conf下创建Catalina/localhost目录，
	在里面准备一个"项目名.xml"文件，里面写：
	<Context path="项目上下文路径/项目名" docBase="在电脑的哪个位置"/>
	目前path的名字要和xml的文件名，还有docBase的文件名保持一致，否则要设置更多；
--------------------------------------------------------------------------------------------------
(关于JavaEE规范的版本)
JavaEE目前的最高版本是JavaEE8，JavaEE被Oracle捐给了Apache了，Apache把JavaEE改名了，叫做JakartaEE
以后就没有JavaEE了，以后都叫做JakartaEE。所以JavaEE8之后的版本“JavaEE9”不再是原来的9了，叫做JakartaEE9
JavaEE8之前对应的Servlet类名是：javax.servlet.Servlet
JakartaEE9对应的Servlet类名是：jakarta.servlet.Servlet
如果你之前的项目还是使用javax.servlet.Servlet，那么你的项目就无法部署在Tomcat10+版本上了，只能部署在9版本上了
（并且21版本之前的idea会识别不了tomcat10，因为目录结构变了，因此tomcat10必须使用高版本的idea）
Tomcat通常会跟随Java EE规范的更新而更新，以支持最新的Servlet和JSP规范。因此，Tomcat的每个版本通常都与JavaEE的
某个版本相关联，但并不是一一对应的关系
-------------------------------------------------------------------------------------------------------
解决Tomcat服务器在DOS命令窗口中的乱码问题（dos是GBK）
将CATALINA_HOME/conf/logging.properties文件中的：java.util.logging.ConsoleHandler.encoding修改为GBK即可
------------------------------------------------------------------------------------------------------
在Java Web应用程序中，HTML文件如果放在WEB-INF文件夹，那么这些html不能直接被外部访问，只可以被内部跳转，
因为WEB-INF是Web应用程序的配置和组件的私有区域，受保护的，不是直接对用户开放的。将HTML文件放在WEB-INF文件夹里
会导致它们无法直接通过Web浏览器访问，因为WEB-INF文件夹内的内容被设计为在应用程序内部使用，而不是直接对用户公开。
-----------------------------------------------------

java程序在html中响应一段html代码：
	public void service(ServletRequest request, ServletResponse response) throws ServletException, java.io.IOException{
		//这个会输出到catalina控制台信息中，不会响应在web页面上，因为主程序是tomcat
		System.out.println("Hello Servlet!");
		/*
		怎么将一个信息输出到浏览器上？
			需要使用ServletResponse接口：response
			表示响应：从服务器向浏览器发送数据
		*/
		//可以设置响应流的内容类型
		response.setContentType("text/html");//注意：这行代码必须设置在拿到流之前
/*
	响应报文里响应头的Content-Type是设置响应内容的“MIME类型”的，也叫媒体类型/响应类型，用来告诉浏览器响应文件的类型，
浏览器会根据这个MIME类型来决定用什么方式解析响应内容；
	默认情况下访问.html文档我们并没有设置这个，那B怎么知道响应的二进制数据是html文档呢？
	在tomcat配置文件web.xml中，几乎记录了所有文件类型对应的MIME类型，MIME类型决定了响应时要给Content-Type赋的值；
不设置的话默认也是text/html，当作响应的是html文档；通常我们都应该设置响应头的Content-Type，不知道的话就去tomcat的
conf目录下的web.xml中找就行了；设置响应头：resp.setHeader("Content-Type", "text/html");
由于它很重要，所以做成了单独的方法；后面post请求上传文件，也有Content-Type；
*/

		PrintWriter out = response.getWriter();//获取响应流，这个流不需要close，tomcat帮我们做了
		out.print("hello Servlet!");
		out.print("<h1>hello</h1>");//设置响应内容类型为html后，这行代码就会以html代码的形式响应给浏览器然后解析
		/*
		out.print()方法用于，将各种数据类型的内容自动以“字符串”形式输出到客户端，且会自动调用flush()刷新缓冲区；
			它可以输出任意数据类型，如字符串、数字、对象等。
		out.write()方法用于，向输出流直接写入“字符”，不会进行任何类型转换；如果不是字符串需要手动转换为字符形式输出，
			且不会自动刷新缓冲区，需要手动调用flush()或待缓冲区满才会刷新。通常用于输出字符数据，如文本、HTML等。
		总之，print更方便、自动化，适合输出各种数据类型的内容；而write方法更灵活，需要手动控制数据类型转换和缓冲区刷新，适合输出字符数据。
		*/
	}

在Servlet中连接数据库：
	sevice方法中编写jdbc代码，编写完成之后要配置web.xml文件，再将配置好再将jdbc的jar包放在lib下

---------------------------------------------------------------------------------------

上面的方式写程序很麻烦，以后使用idea工具快速开发webapp
	1、新建一个空的Project，再新建一个Module(java)，命名为：web01
	2、让Module变成JavaEE的模块：（让module的格式符合webapp/Servlet规范）
		打开项目结构，选中模块点加号，选web Application，剩下的基本不动确定即可；（tomcat10必须是web.xml版本5.0）
		注意：生成的web目录就代表，webapps下webapp(crm)的根
	3、(非必须)生成的文件中web目录下有index.jsp目前可以删除，暂时用不到
	4、在src上新建一个class：StudentServlet，编写servlet代码，实现Servlet接口，发现编译报错
	5、为了用别人写好的类jar包完成编译，在idea中的projectstructure中添加两个libraries，导入tomcat的lib目录的
		servlet-api.jar和jsp-api.jar两个类库，然后加入到我们目前module的dependencies中
	6、在service中编写Java代码，这里要连接数据库，运行时要用到，所以需要在web---WEB-INF目录下创建lib目录，
		将jdbc的jar包放进去，然后右键lib添加作为库；编译时也要用jdbc接口，JDK包下java.sql中有了；
	7、在web.html文件中将写好的StudentServlet注册进去
	8、给一个主页面index.html，在html界面中编写一个超链接，href指向web.xml文件配置好的url-pattern（注意加项目名）
	9、编写好后，怎么让这一堆工程变成可以放在服务器webapps下的工件呢？
		-- 菜单栏build下的build Artifacts（如果不能点的话，就到工程结构设置中的工件选项添加工件）
		-- 然后out目录的artifacts中就有我们的可以发布的app了，里面WEB-INF下会有classes，其中就是src下的java编译的字节码，
			如果你的配置文件目录不在src下，那么你要右键目录，标记为resources root，
			所以我们自己的工程目录的WEB-INF下是无需加classes目录的；
		-- artifacts目录下构建后的的文件名很长很怪，但不用担心，跟我们最终url里的项目名可以不同，idea帮我们做了
	10、然后就要启动服务器了，先让IDEA去关联Tomcat：
		-- IDEA工具右上角，绿色小锤子右边有一个：Add Configuration（run/debug Configurations）
		-- 左上角加号，点击Tomcat Server --> local
		-- 在弹出的界面中设置服务器，Server栏表示服务器（基本不用动，就配置tomcathome就行）
		再将我们做好的工件部署在tomcat上：
		--选择deployment点加号，选择工件即可，然后下面有Application context，这里面就是我们要访问的项目名了，通常设置为/
	10、启动Tomcat服务器：点击debug，在开发中建议用debug的模式启动tomcat服务器
	11、打开浏览器，在地址栏输入：http://localhost:8080/web01/index.html
```

```txt
====day04==================================================================================

请求和响应的过程：
	当浏览器发送来“请求报文”时（其中包含请求行、头、体等信息），tomcat将报文信息new成一个
HttpServletRequest对象，由该对象进行请求信息的承载；我们通过对该对象进行操作，然后返回给
浏览器响应信息，这些信息同样会自动装载到HttpServletResponse对象中，然后tomcat会根据该对象
转换成“响应报文”发送给浏览器；我们不需要去拼接很复杂的请求报文和响应报文，而是直接从http请求
和响应对象中直接用；
	而浏览器请求的动态资源就是我们Java编写的一个个“实现了Servlet接口”的特殊类，我们根据servlet
规范来编写的代码才可以在各种Java服务器上运行；而这个特殊类要想完成动态资源的接收、跳转、转发等操作，
就需要实现Servlet接口，按照Servlet规范的指示去处理和转发请求响应，这样服务器才能放心的将资源转发调度
的工作交给它，而不至于http请求到了，该类不会处理了，不知道咋办了；
	所以这个“特殊类”必须要担负起网站请求报文的处理工作，不能是请求来了，该对象还不存在，没人去
接受请求报文了。所以这个很重要的特殊类必须由tomcat来统一管理，服务器一启动，可以接收请求了，那
该对象就得准备干活了；服务器关闭时，该对象就得下班了，不能还有没处理完的工作；
	因此，所有这些实现了Servlet规范，也就是实现了Servlet接口的特殊类，对应对象的创建和销毁，
都要交给tomcat，程序员不能干预；所以不要在代码里出现我们自己new了一个servlet对象，这是非法的。

-------关于Servlet的生命周期:---------------------------------------------------------------

· 什么是Servlet对象生命周期？
	- Servlet对象什么时候被服务器创建
	- Servlet对象什么时候被服务器销毁
	- Servlet对象创建了几个？
	- Servlet对象的生命周期表示：一个Servlet对象从出生到最后的死亡，整个过程是怎样的？

· Servlet对象是由谁来维护的？
	-Servlet对象的new，对象上方法的调用，对象最终的销毁，java程序员是无权干预的，都是tomcat做的；
	-Servlet对象的生命周期是由Tomcat服务器（Web Server）全权负责的
	-Tomcat服务器通常我们又称为：WEB容器（WEB Container），因为tomcat里面部署了很多的webapp
	-WEB容器来管理Servlet对象的存活

思考：我们自己new的Servlet对象受WEB容器的管理吗？
	答：我们自己new的Servlet对象是不会受到WEB容器的管理的。Tomcat创建的Servlet对象，
	这些Servlet对象都会被放到一个集合（HashMap）中，key是servletName，只有放到这个集合中的
	Servlet对象才会被WEB容器所管理，自己new的Servlet对象不会被WEB容器管理的。所以在Servlet开发中
	我们程序员不被允许自己new一个Servlet对象，因为这个对象不会被Tomcat管理。

研究：服务器在启动的时候Servlet对象有没有被创建出来（默认情况下）
	答：默认情况下，web服务器启动时，并不会实例化Servlet对象；那么它启动时做了什么呢？
	它会去解析web.xml文件，找到对应的url-pattern和servlet-class，然后将放在map集合中。
	这个设计是合理的，用户没有发送请求之前，如果提前在jvm的堆中创建了大量的servlet对象，必然是耗费内存的，
	并且创建出来的Servlet如果一直没有用户访问，显然这个Servlet对象是一个废物，没有必要启动就创建

· 怎么让服务器启动的时候创建就Servlet对象呢？（一般情况下是不用创建的）
	在web.xml配置文件中，找到你写的Servlet对应的配置标签里：servlet标签内部创建一个子标签load-on-startup，
	意思是在启动时创建，内容填一个非负整数，整数越小创建的优先级越高，创建servlet的次序是按照这个来的，默认-1不创建。

· Servlet对象生命周期
	-默认情况下服务器启动的时候Servlet对象并不会new出来
	-用户发送第一次请求的时候，请求的Servlet对象被tomcat实例化new出来，放在在tomcat服务器的堆中，执行的是无参构造；
	-Servlet对象被创建出来之后，Tomcat服务器马上调用了init方法
	-init方法执行过后，web服务器马上调用它的service来处理用户发送的请求
	-用户发送第二次请求或者第n次请求的时候，Servlet对象并没有新建，还是用之前服务器堆中创建好的Servlet对象，
		并且第二次请求过来的话直接调用service方法就行了
	-这说明：
		1、Servlet对象是单例的（单实例的，注意：Servlet类并不符合单例模式。我们称为假单例，真单例构造方法也是私有的）
			Servlet对象的创建程序员管不着，这个对象的创建只能由Tomcat说了算。不论访问几次，访问的都是这一个
			servlet对象，所以设置为假单例。
		2、无参构造方法、init方法会在servlet对象创建的时候只执行1次，
		3、service方法只要用户发送一次请求request，必然会被执行一次
	-服务器关闭时会调用该servlet对象的destory()方法做销毁前的一些工作，比如关闭out输出流等工作；它同样只执行一次，
		执行结束后，堆中的Servlet对象就会被销毁了；

---------------------------------------------------------------------------------------------------------
· 当我们Servlet对象中编写了有参构造方法，没有无参构造的话会发生什么？
	- 浏览器访问该地址会出现500错误；500是HTTP协议的一个错误状态码，5开头的一般是指服务器端的java程序出现了问题，
		如果没有无参构造，会无法实例化Servlet对象
	- 所以在servlet开发中，不建议程序员手动编写构造器，因为一不小心就会导致实例化对象异常

思考：init和无参构造都是在对象第一次创建的时候执行，并且只执行一次，init也是如此。那么无参构造可以替代init吗？
	不能。Servlet规范中由要求，作为javaweb程序员，编写servlet类的时候，不建议自己手动编写构造器，因为这样
	很容易忘记重写无参构造导致servlet对象无法实例化，所以init方法的存在是很有必要的，我们希望在构造器中做的
	东西都放在init方法中做即可

· init、service、destroy方法使用最多的是哪个？
	- 使用最多的就是service方法，service是一定要实现的，因为这个是处理用户请求的核心方法
	- 那什么时候用init呢？很少用。通常在init方法中执行初始化操作，并且这个初始化操作只需要执行一次。例如：
		初始化线程池、数据库链接池...
	- 什么时候用destroy方法呢？destroy方法也很少用。通常在destroy方法中对资源进行关闭，还有什么没关闭的，
	没保存的等等

--------------------------------------------------------------------------------------------------------
· 我们编写一个Servlet类直接实现Servlet接口有什么缺点？
	我们只需要service方法，其他方法大部分情况下是不需要使用的，每次实现都重写代码很丑陋，怎么办？

----适配器设计模式Adapter---------------------------------------------------------------------

（手机直接插到220V电源上就报废了，怎么办，用一个充电器问题就解决了。手机充电器就是一个面向于手机的适配器）
· 编写一个GenericServlet抽象类，翻译为“通用的servlet”，其中有一个抽象方法service必须实现:
	-GenericServlet抽象类实现了Servlet接口，所有方法都实现了，但都是空的，叫做“假实现”；
		只有一个没实现service是抽象的，我们只需要去实现service就行了
	-GenericServlet就是一个适配器，为了解决servlet代码很丑陋的问题
	-以后编写的所有Servlet类直接extends继承GenericServlet，重写service方法即可
		（我只需要重写一个service，其他的方法用到了再去进行方法覆盖喽）

· 好消息：GenericServlet其实Servlet-api源码中已经帮程序员写好了
思考：这个GenericServlet抽象类是否需要改造一下，怎么改造更利于子类程序的编写？
	-我们先来看下init方法的参数，从它init入手：
		*init方法是谁调用的？Tomcat服务器调用的
		*init方法中的参数ServletConfig对象是谁创建的？谁传过来的？
			Tomcat干的，它先创建了ServletConfig对象，然后调用init方法时将ServletConfig对象作为参数传进去；
			也就是说，继承了GenericServlet的Servlet类创建的时候会初始化进去一个SerlvetConfig（Servlet配置）对象
		*源码：
			private transient ServletConfig config;
			@Override
			public void init(ServletConfig config) throws ServletException {
				this.config = config;
				this.init();
			}
			public void init() throws ServletException {//注意：这是GenericServlet自己写的无参的init
			}
		*为什么要将ServletConfig这个对象初始化呢？
			因为这样的话，每个servlet对象都能够获取属于它自己的web.xml里的配置信息了，这个配置信息就是
			web.xml文件中servlet标签里的内容。
		*GenericServlet对象在init方法中（有参数的那个）对ServletConfig进行了初始化操作，所以GenericServlet
			中的无参的init方法可以重写，有参的init不要重写，会影响ServletConfig对象的config属性的值，导致
			该属性无法进行初始化赋值，也就不能获取到该Servlet标签的配置信息了；所以用的话我们用无参的init。

	-我们发现这个ServletConfig对象很有用，我们如果想在service中用它怎么办，它是init的局部变量？
		很简单，我们将它变成实例的就行了（私有化），有参的init给它初始化之后，我们就可以在service中用了；
		那么子类也想用，就提供一个getServletConfig就行了，这下我们知道Servlet里的这几个方法都是做啥的了。

（了解：Servlet还有一个方法getServletInfo：返回描述该Servlet作用的字符串的方法；
	该方法用来提供关于Servlet的描述信息。具体的实现取决于程序员，所以这个方法的返回值可以是任何格式的字符串；
	通常，这个方法通常返回一个描述该Servlet作用的字符串，包括Servlet的版本，功能，和其他有用的信息。例如
	一个Servlet可能会返回这样的信息：“版本1.0，用于处理HTTP GET请求”。不是必须的，你可以自己看着整）

· GenericServlet就是一个Servlet的包装，Servlet中啥也没有就是接口，而前者可以给你servlet的配置信息，更通用

· 至此，我们已经搞定了Servlet接口，但是我们在webapp的开发中一般也不会直接继承GenericServlet，一般继承
GenericServlet的子类：HttpServlet，它更适合web项目的开发（后面继续了解这俩抽象类）

· 关于jakarta.servlet包下的GenericServlet：
=========================================================================
public abstract class GenericServlet implements Servlet, ServletConfig, Serializable {
	//这是唯一标识
    private static final long serialVersionUID = 1L;
	//这是servlet对应的配置信息对象，私有的
    private transient ServletConfig config;
	//无参构造器一定要有，否则子类的super()就报错了
    public GenericServlet() { }

	//重写了Servlet接口的destory，但里面什么也没，子类用到了再重写
    @Override
    public void destroy() { }

	//通过配置信息对象config来获取该servlet对应的初始化参数
    @Override
    public String getInitParameter(String name) {
        return getServletConfig().getInitParameter(name);
    }
    @Override
    public Enumeration<String> getInitParameterNames() {
        return getServletConfig().getInitParameterNames();
    }

	//获取config对象的方法
    @Override
    public ServletConfig getServletConfig() {
        return config;
    }
	//通过config来获取application应用上下文对象
    @Override
    public ServletContext getServletContext() {
        return getServletConfig().getServletContext();
    }
	//获取程序员自定义的，关于这个servlet的信息
    @Override
    public String getServletInfo() {
        return "";
    }
	//这个方法用于给config对象初始化，不能动
    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
        this.init();
    }
	//用下面这个init方法
    public void init() throws ServletException { }
	//记录日志方法，日志信息在tomcat中log目录下
    public void log(String message) {
        getServletContext().log(getServletName() + ": " + message);
    }
    public void log(String message, Throwable t) {
        getServletContext().log(getServletName() + ": " + message, t);
    }
	//核心业务方法
    @Override
    public abstract void service(ServletRequest req, ServletResponse res)
            throws ServletException, IOException;
    @Override
	//获取servlet别名
    public String getServletName() {
        return config.getServletName();
    }
}
=========================================================================
```

```txt
=======day05=======================================================================================

----GenericServlet类重写了ServletConfig后新加了很多方法，我们先来看看这个jakarta.servlet.ServletConfig---

· ServletConfig是什么？显然它是Servlet规范下的一员，是一个接口
· 谁去实现了这个接口呢？
	Tomcat的：org.apache.catalina.core.StandardWrapperFacade实现了ServletConfig接口；
	不同的服务器的实现类名字会有所不同
· 每个Servlet对象实例都会关联一个它自己的ServletConfig对象，因为ServletConfig就是servlet标签中的内容，
	而每个servlet类都对应不同的servlet标签
------------------------------------------------------------------------------------
· ServletConfig到底是干啥的，有什么用？
	是获取Servlet对象的配置信息的，不过我们一般在servlet标签里也不设置什么配置信息
· ServletConfig对象中包装了什么信息呢？
	其实就是web.xml配置信息中每个Servlet信息对应的servlet标签的内容：
	<servlet>
		<servlet-name>studentServlet</servlet-name>
		<servlet-class>com.bjpowernode.javaweb.servlet.StudentServlet</servlet-class>

		<load-on-startup>1</load-on-startup>//启动加载参数
		<init-param>						//初始化参数，自定义的，可以有多个
			<init-name>key1</init-name>
			<init-value>value1</init-value>
		</init-param>
		<init-param>
			<init-name>key2</init-name>
			<init-value>value2</init-value>
		</init-param>
		...
	</servlet>
【Tomcat解析web.xml了文件，将配置文件中servlet标签中的信息自动包装到ServletConfig对象中】

----------------ServletConfig接口中的方法-------------------------------------------------------------------------

# String					getServletName()：获取servlet的name的
# Enumeration<String>		getInitParameterNames()：获取所有的初始化参数信息的key，返回一个迭代器
# String					getInitParameter(String name)：根据初始化参数信息的key来获取value
# ServletContext			getServletContext()：获取servlet上下文，什么意思？

· 我们可以通过ServletConfig对象的getServletContext方法拿到ServletContext对象，该对象在tomcat中的实现为： 
	org.apache.catalina.core.ApplicationContextFacade@19187bbb
	单例的，同样只有一个；ServletContext对象是什么？一会再说

（其实我们编写的Servlet类直接继承GenericServlet后，要调用以上4个方法可以用config.也可以用this.；
因为GenericServlet接口已经实现了ServletConfig接口，重写了它的四个方法）

=====ServletContext=============================================================================

· 关于ServletContext：
	它是一个接口，是Servlet规范中的一员，翻译为（Servlet上下文对象）
· ServletContext是谁实现的？
	Tomcat服务器（WEB服务器）实现了ServletContext接口
		org.apache.catalina.core.ApplicationContextFacade@4302b632
· ServletContext对象是谁创建的？在什么时候创建的？
	ServletContext对象在：Tomcat服务器启动的时候创建，并且在服务器关闭的时候销毁
· 对于一个webapp来说，ServletContext对象只有一个，也可以理解为它就是对应的web.xml文件；
	ServletContext对象就是Servlet的环境对象，上下文对象，对应的就是整个web.xml文件。
	如：一个班50个学生，每个学生就是一个Servlet，这些学生都在一个教室里，这个
	教室就是ServletContext对象。放在ServletContext对象当中的数据，所有的Servlet
	一定是共享的。所以如果你有一个数据需要共享的话，你可以选择给它放在ServletContext
	对象的“应用域”application中
(注意：它不是容器级别的，容器是Tomcat，它里面有很多的webapp，每一个都有自己的配置文件
web.xml文件，每一个都有自己的ServletContext)

---------------ServletContext接口中的重要方法--------------------------------------------------------

# Enumeration<String>	getInitParameterNames()
# String				getInitParameter(String name)

		-实际上在web.xml文件中可以用context-param标签，来配置上下文的参数，应用级的，该信息可以
		通过ServletContext对象获取：
			<context-param>
				<param-name>startIndex</param-name>
				<param-value>0</param-value>
			</context-param>
			<context-param>
				<param-name>stopIndex</param-name>
				<param-value>10</param-value>
			</context-param>
			...
		-那这些配置信息什么时候写到webapp标签里，什么时候写到servlet标签里呢？
		实际上，这就是全局和局部的意思。如果你的配置想要全局使用，那就写到外面，如果只在局部中使用，那就写到里面

# String				getRealPath("相对于部署位置下，某个文件的路径")：它可以返回该文件在服务器电脑上的绝对路径；
# String				getContextPath()：获取项目的上下文路径，是项目名，非常重要；
		-在java的源代码中有些地方可能会用到应用的根路径，如果这个路径写死了，后面改项目名了，那程序还得改很多地方，为了
			解耦合，这些地方不要写死，动态获取根路径就行了，因为你永远也不确定后面项目部署到服务器上的时候用的是什么名字；
		-测试结果："/servlet02"，拿到了项目名

# void					log(String message)
# void					log(String message, Throwable throwable)
	（GenericServlet中的2个log方法是就调用该方法）
		-记录该应用日志的方法；会记录到哪里呢？CATALINA_HOME/logs/
		-由于我们用的idea关联的Tomcat方式写的，所以日志文件会记录在idea关联的备份的Tomcat目录下:
			tomcat启动信息中：Using CATALINA_BASE: 
（C:\Users\zcbook\AppData\Local\JetBrains\IntelliJIdea2021.2\tomcat\e6bd276f-aef2-4099-bd8b-fdd2e3f31ee3）
		它有三个文件：
			catalina.2023-02-24.log：tomcat控制台信息（log文件）
			localhost_access_log.2023-02-24.txt：访问web服务器的日志信息，b端每次请求来访问web服务器
				都会留下访问日志（txt文件）
			localhost.2023-02-24.log：servlet对象的log方法记录的日志存储到这个文件中（log文件）
		这些日志每次启动不会清空重置
		该方法记录的时候也可以有异常：参数传进去一个异常对象就行（异常并没有发生，只是记录一下）

# Object				getAttribute(String name)://类似于map集合的：get(K)
# void					setAttribute(String name, Object object)://put(K,V)
# void					removeAttribute(String name):			//remove(K)
		-ServletContext对象是一个webapp中所有Servlet共享的，它还有一个名字：应用域application
		（后面还有其他域：请求域、会话域），如果所有的用户共享一个数据，并且这个数据很少被修改（几乎不），
		并且数据量很小，那就可以将它放在应用域中。
		-为什么数据要很少被修改？
			因为数据涉及到共享，会有线程安全问题。所以放在ServletContext中的对象一般都是只读的
		-为什么数据量要小？
			因为它会跟随着Tomcat的启动一块被创建出来，很占用服务器的运行内存
		-放在应用域中的数据相当于放在了缓存中，不需要每次从数据库中取，大大提升效率
		-往application应用域中存、取、删数据就用以上三个方法
======================================================================================================
以上的Servlet、GenericServlet、ServletConfig、ServletContext这4个我们已经搞定了
```

```txt
=====day06===========================================================================================

我们现在接触过哪些缓存机制了？
	* 堆内存中的字符串常量池
		"abc"先去常量池中找，如果有的话就不创建了，直接拿来用
	* 堆内存中的Integer整型常量池
		【-128~127】一共256个Integer类型的引用，放在整型常量池中，没有超过这个范围的话直接从常量池中取
	* druid连接池
	* 线程池
		* tomcat服务器本身就是支持多线程的
		* tomcat服务器是在用户发送一次请求，就新建一个Thread线程对象吗？
			当然不是，实际上是在Tomcat服务器启动的时候，会创建好N多个线程Thread对象，然后将线程对象放
			到集合当中，这个集合称为：线程池。用户发送请求过来之后，需要有一个对应的线程来处理这个请求
			这时候线程对象就会直接从线程池中取，效率比较高
		* 所有的WEB服务器，或者应用服务器，都是支持多线程的，都有线程机制
	* redis
		不是SQL数据库，非关系型数据库，缓存数据库
	* 向ServletContext的应用域中存取数据，也是放在缓存cache中了
-------------------------------------------------------------------------------------------	
	以后我们编写的Servlet类并不会直接继承GenericServlet，因为B/S系统是基于HTTP协议的，在
Servlet规范中，提供了一个类叫：HttpServlet，它是专门为HTTP协议准备的一个Servlet类
我们编写的Servlet类要继承：HttpServlet（HttpServlet是HTTP协议专用的），使用它去处理
HTTP协议更加便捷方便，可以享受一些服务
==========================================================================================
·关于HttpServlet：
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
· 关于HTTP协议：（http1.1）
	* 什么是HTTP协议？
		- HTTP协议是W3C制定的一种超文本传输协议。超文本：不是普通文本，比如流媒体：声音图片视频...
		通过超文本协议传输的数据很多样化
		- 这种协议游走在B和S之间。B向S发送数据，要遵循一套协议（请求协议），S向B发送数据，也要
		遵循一套协议（响应协议），都遵循这个协议，这样B和S就能够解耦合了

	* 怎么查看HTTP协议的内容：浏览器F12，找到网络，通过net网络面板查看（控制台、源代码、元素、网络）
------------------------------------------------------------------------------------------------
· HTTP请求协议（B->S）：
	包括4部分：
	请求行、请求头、空白行、请求体
	- 请求协议具体报文：
		GET请求：
			请求行-->	GET /servlet03/get?username=adfas&password=sdfsfa HTTP/1.1
			请求头-->	Host: localhost:8080
						Connection: keep-alive
						Upgrade-Insecure-Requests: 1
						User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36
						Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
						Referer: http://localhost:8080/servlet03/index.html
						Accept-Encoding: gzip, deflate, br
						Accept-Language: zh-CN,zh;q=0.9
			空白行-->
			请求体-->

		POST请求：
			请求行-->	POST /servlet03/post HTTP/1.1
			请求头-->	Host: localhost:8080
						Connection: keep-alive
						Content-Length: 31
						Cache-Control: max-age=0
						Origin: http://localhost:8080
						Upgrade-Insecure-Requests: 1
						Content-Type: application/x-www-form-urlencoded
						User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36
						Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
						Referer: http://localhost:8080/servlet03/index.html
						Accept-Encoding: gzip, deflate, br
						Accept-Language: zh-CN,zh;q=0.9
			空白行-->
			请求体-->username=gggg&password=asfasfas（post请求提交的数据格式不变，在请求体中）

	- 请求行（三部分组成）：
		* 请求方式：get/post/delete/put/head/options/trace（共7个）
		* URI：/servlet03/get?username=adfas&password=sdfsfa
			- 什么是URI？
				统一资源标识符。代表网络中某个资源的名字，但是通过URI是无法定位资源的
			- 什么是URL？
				统一资源定位符。代表网络中某个资源，同时在网络中可以定位到该资源的
			- URI和URL有什么区别？
				URI：资源标识的要求和规范；
				URL：它是资源定位的具体实现；
				通常不区分它们，可以暂时理解为：URL是URI的一种具体实现
				http://localhost:8080/servlet03/index.html 这是URL
				/servlet03/index.html 这是URI
		* 协议版本号：HTTP/1.1
	- 请求头：
		包括请求的主机、主机的端口、浏览器信息、平台信息、cookie..等等信息
	- 空白行：区分请求头和请求体
	- 请求体：向服务器发送的具体数据

* 常见的请求头：
	Host: localhost:8080[浏览器要请求的主机]

	Date: xx[浏览器发送数据的请求时间]

	Connection: close/Keep-Alive[表示是否启用http1.1支持的长连接]

	Upgrade-Insecure-Requests: 1[如果发现请求的服务器是https的，则自动将请求协议升级为https]

	User-Agent: Nozilla/4.0(Com...)[告诉服务器用户请求浏览器的信息]

	Accept: text/html,image/*[告诉服务器，浏览器可以什么类型文件]

	Referer: http://localhost:8080/test/abc.html[告诉服务器，我是被这个资源推荐来的]

	Accept-Encoding: gzip,compress[用户浏览器可以接受的压缩格式]

	Accept-Charaset: ISO-8859-1 [用户浏览器可以接受的字符编码]

	Accept-Language: zh-cn[用户浏览器可以支持的语言]

	IF-MODIFIED-Since: Tue,11Jul 2000 18:23:51[告诉服务器这缓存中有这个文件,该文件的最后修改时间是...]

	Cookie: [HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器]

* 怎么向浏览器发送get请求或post请求？
	目前为止，只有一种情况可以发送post，其他一律发送get请求。就是：是用form表单，并且form表单中的method
	指定为post方式；在浏览器直接输入URL属于get请求，在浏览器点击超链接也属于get请求

* get和post有什么区别？
	* get请求发送数据的时候，数据会挂在URL的后面，后面是一个“?”，问号后面是数据，这种方式；
		发送的数据会显示在地址栏中（get在请求行上发送数据）
	* post是在请求体中发送数据，不会显示在地址栏上（请求行上）；但数据格式都是“?key=value&..”的格式；
	* get请求只能发送普通字符串，并且发送字符串长度有限制，不同浏览器长度限制不同。这个没有明确规范
	* post请求可以发送大数据量，理论上没有大小限制，并且可以发送任何类型的数据(文件上传一定要是post)
	* W3C是这样说的：get请求用于从浏览器获取数据，post请求适合向浏览器传输数据/文件
	* get请求是绝对安全的，因为get请求只是为了从服务器获取数据，不会影响到服务器安全；post请求是危险的，
		因为post请求是向服务器传输数据，如果这些数据通过走后门的方式进入到服务器中，服务器是很危险的；
		一般大部分选择拦截（监听）的是post；
	* get请求支持缓存，post请求不支持缓存；任何一个get请求的响应结果都会被浏览器缓存起来，保存在浏览器缓存中；
		每一个get请求都有一个对应的响应结果在浏览器缓存中存在；
	* 实际上，你只要发送get请求，浏览器就先去缓存里找，找不到才从服务器获取。就算浏览器关了缓存也还在；
		缓存机制目的是为了提高用户的体验（缓存一定时间后会失效，也可以被使用者手动删除）

* get请求和post如何选择？
	·如果是从浏览器上获取数据，建议get，如果是给浏览器发送数据，建议post
	·大部分form表单提交，都是post
	·做文件上传，一定是post。因为上传的数据大多都不是普通文本
	·其他情况可以get
-------------------------------------------------------------------------------------------------
· HTTP响应协议（S->B）：
	包括4部分：
	状态行(响应行)、响应头、空白行、响应体
	- 响应协议具体报文：
		状态行-->	HTTP/1.1 200 ok
		响应头-->	Content-Length: 154[数据量是多少]
				   Date: Fri, 24 Feb 2023 15:15:33 GMT
				   Keep-Alive: timeout=20[表示如果长连接一直不用的话，20秒就关掉]
				   Connection: keep-alive
				   Content-Type: text/html[告诉浏览器响应回来的是什么数据]
		空白行-->
		响应体-->	<!doctype html>
					<html>
					<head>
						<title>postServlet响应的页面</title>
					</head>
					<body>
						<h1>postServlet响应的页面</h1>
					</body>
					</html>
	- 状态行：三部分组成：
		* 第一部分：协议版本号（HTTP/1.1）
		* 第二部分：状态码（HTTP协议中规定的响应状态号。不同的响应结果对应不同的状态码）
			- 200：请求响应成功，正常结束；
			- 302：服务器让浏览器进行重定向，重新访问一个url；
			- 304：使用了本地缓存，请求没有走网络；
			- 400：表示前端提交的数据格式有问题，和后端的数据格式对不上；
			- 404：访问的资源不存在；前端错误，通常是因为你的路径写错了，或者服务器对应的资源没有启动成功；
			- 405：“前端发送的请求方式”与“后端请求的处理方式”不一致导致的；如：B发送请求是post，S处理请求是get；
			- 500：资源找到了，但是服务器端的程序出现异常；
		（一般2xx开头都是成功的，3xx开头都是重定向的，4xx开头的前端浏览器的错误，5xx开头的是后端程序的错误导致的）
		* 第三部分：状态的描述信息
			ok：表示成功
			not found：资源找不到
	- 响应头：响应的内容长度、时间、内容类型等等之类的
	- 空白行：用来分隔响应头和响应体的
	- 响应体：就是响应的正文内容，这些内容是一个长字符串，被浏览器解释之后展示出来

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

