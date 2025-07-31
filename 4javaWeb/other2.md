



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
```

------

