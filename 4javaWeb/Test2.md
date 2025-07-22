- ## Servlet

  - #### Servlet规范

    > Servlet是Java提供的一门动态Web资源开发技术，是JavaEE的规范之一。其实就是一个接口，每一个实现了Servlet接口的Java类，都有资格去处理HTTP请求了。Servlet规范是Web服务器和JavaWeb程序之间的桥梁。实现了该规范的Web服务器和按照该规范开发的Web程序可以做到解耦合，这样写的代码换到其他Web服务器（实现了Servlet规范的）上也可以部署和运行。

    > ##### 关于JavaEE规范（了解）：
    >
    > - JavaEE规范包括（不完全）：JDBC和数据源、JSP、Servlet、JNDI、XML、JMS、JTA、JPA、JTS、RMI、IDL、JavaMail、EJB、JAF..等等。
    >
    > - JavaEE目前的最高版本是JavaEE11，JavaEE被Oracle捐给了Apache了，Apache把JavaEE改名了，叫做JakartaEE。以后就没有JavaEE了，以后都叫做JakartaEE。所以JavaEE8之后的版本“JavaEE11”不再是javaEE11了，叫做JakartaEE11。JavaEE8之前对应的包名是`javax.*`，现在最新规范的包都是`jakarta.*`
    > - Tomcat11用的是JakartaEE11规范，如果你的项目包用的javax的包，那么就无法部署在Tomcat10+版本上了，只能部署在9及以下的版本上，或者将源代码所有包重新导包。
    > - 21版本之前的IDEA会识别不了Tomcat10，因为目录结构变了，因此tomcat10必须使用高版本的idea
    > - Tomcat通常会跟随Java EE规范的更新而更新，以支持最新的Servlet和JSP规范。因此Tomcat的每个版本通常都与JavaEE的某个版本相关联，但并不是一一对应。

    - ##### Servlet规范中规定了：

      > 1. 一个合格的webapp应该是一个怎样的目录结构。类文件（class文件）、资源文件（img、html等资源）、配置文件应该以什么样的目录结构进行存放。
      > 2. 规范了一些Java的接口和类，程序员需要面向这个接口编程，以此为基础来处理用户的请求。
      > 3. 请求路径和Java程序之间的对应关系应该怎么做。
      >
      > Tomcat服务器要遵循Servlet规范。程序员编写的JavaWeb程序也要遵循这个Servlet规范。这样Tomcat服务器和webapp才能解耦合。

    - ##### JavaWeb程序的目录：（运行程序的目录结构）

      > firstapp
      >
      > ​     |------WEB-INF
      >
      > ​     		  |------classes(存放字节码)
      >
      > ​     		  |------lib(第三方jar包)
      >
      > ​     		  |------web.xml(注册Servlet)
      >
      > ​     |------其他的静态资源
      >
      > ###### 详解：
      >
      > - 该xx项目目录的结构如上，该目录要放在webapps目录下。
      > - 其中动态资源（Servlet类）需要放在`WEB-INF`目录中，该目录是受到保护的，只能通过编写的程序来跳转，直接发送请求是访问不到的。
      > - 静态资源放在外面任意其他目录中。
      > - `classes`目录中的是Java字节码文件，以及程序运行所需要的配置文件。
      > - `lib`目录是项目运行所依赖的第三方程序jar包。
      > - `web.xml`是JavaWeb项目的核心配置文件，用于对项目进行配置。

    - ##### 关于后端的URL：

      > 网络路径URL也分为绝对路径和相对路径：（和本地路径一样，`./`表示当前路径，`../`表示当前资源的上一层）
      >
      > - **相对路径**：不以协议开头、且不以`/`开头的都是相对路径。它默认以当前地址栏上的url的同级目录为基路径，拼接该相对路径后形成绝对路径去寻找目标资源。相对路径的优点是灵活，缺点是不稳定，容易受到浏览器当前地址栏的url的影响。
      > - **绝对路径**：以协议或`/`开头的都是绝对路径。绝对路径可以是带协议ip端口的，也可以不带。不带协议ip端口的话默认用的是当前地址栏上的协议ip和端口。绝对路径通过固定的url去找目标资源，因此非常稳定。但缺点是不灵活，尤其是项目上下文（项目名）变化之后，可能会导致项目中使用绝对路径的地方都会受到影响，导致资源找不到。（因为绝对路径要在URI中加上项目名）
      >
      > 那我们开发中，资源的路径写相对还是绝对呢？如果是绝对。那么项目名变了不就出问题了吗，这样做：
      >
      > - 在HTML中通过`<base>`标签的`href`属性来设置相对路径的基路径，如：`/项目名/`，不让其以当前地址栏的url为基路径了。这样页面中所有的资源的相对路径，都会拼接上这个基路径，把相对路径变成一个绝对路径，项目名变的话，每个页面中只需要改href属性的值就行了。
      >
      > - 但这还不够完美，如果HTML很多，也很麻烦。通常我们开发中会这样做（项目上线才换成上面的方式）：由于我们一个服务器中通常只跑一个项目，所以项目名直接不给了，IDEA中热部署时项目名设置为`/`，此时项目中的路径统一采用绝对路径的写法：
      >
      >   ![sfssa7sadf215602](./assets/sfssa7sadf215602.png)

  - #### Servlet的生命周期

    - 当浏览器发送来“请求报文”时（其中包含请求行、头、体等信息），tomcat将报文信息封装成一个HttpServletRequest对象，该对象承载了HTTP请求报文；通过该对象可以处理用户的请求，最终我们返回给一个HTTP响应报文即可。

    - 通常我们只需要指定响应的内容即可，tomcat会自动将我们指定的内容封装成一个HttpServletResponse对象。最终tomcat会将该对象转换成“HTTP响应报文”发送给浏览器；我们不需要去拼接很复杂的请求报文和响应报文，而是直接用HttpServletRequest和HttpServletResponsehttp类提供的API即可。

    - 用户请求的某个动态资源，会有某个对应的Java对象去处理。这个特殊的Java对象要想完成动态资源的接收、跳转、转发等操作，就需要实现Servlet接口。实现了Servlet接口的类，相当于具备了处理用户请求的功能，这样服务器才能放心的将资源转发调度的工作交给该类对应的实例。

    - 这个用于处理用户请求的、实现了Servlet接口的实例，必须由Tomcat服务器来统一管理，统一为它们分配任务。当服务器启动完成，可以接收请求了，此时该对象就必须得准备好了，已经存在了并可以干活了（处理请求）；服务器关闭时，该对象就得下班了，不能还有没处理完的工作。因此，所有这些实现了Servlet规范，即Servlet类，它们对应的对象的创建和销毁，都要交给Tomcat，程序员不能干预。所以不要在代码里出现：我们自己new了一个Servlet对象，这是非法的。

    - 即：网站中所有的Servlet接口实现类的实例对象，只能由WEB容器（Tomcat服务器）来创建。**开发人员不能手动创建Servlet接口实现类的实例对象**。

      > **我们自己new的Servlet对象受WEB容器的管理吗？**
      >
      > 我们自己new的Servlet对象是不会受到WEB容器的管理的。Tomcat创建的Servlet对象，这些Servlet对象都会被放到一个HashMap中（集合的key是servletName），只有放到这个集合中的Servlet对象才会被WEB容器所管理，自己new的Servlet对象不会被WEB容器管理的。
      >
      > 而不被WEB容器所管理的Servlet类（即未注册的Servlet），服务器在分配HTTP请求时，压根就不会分配到它的头上，它也无法处理用户发送的请求。所以在Servlet开发中我们程序员不被允许自己new一个Servlet对象，因为这个Servlet对象是没用的，不能处理请求。

    - 而Tomcat创建和销毁一个Servlet实例的过程，就是Servlet的生命周期。即Servlet对象什么时候被服务器创建？Servlet对象什么时候被服务器销毁？一个Servlet对象从出生到最后的死亡，整个过程是怎样的？

    - 默认情况下，服务器启动时并不会实例化Servlet对象。那么它启动时做了什么呢？

    - > 服务器启动后会去解析web.xml文件，找到对应的url-pattern和servlet-class，然后将这个信息保存在map中。
      > 这个设计是合理的。用户没有发送请求之前，提前在JVM中创建了大量的Servlet对象，必然是耗费内存的。因为创建出来的某个Servlet如果一直没有用户访问，显然这个Servlet对象此时压根没用，没有必要启动就创建。

    - 默认当用户第一次请求某个Servlet对应的URL的时候，该Servlet实例才会被Tomcat实例化出来，调用无参构造器。

    - 在手动配置情况下，要求服务器在启动时自动创建某个Servlet实例：

      - 基于XML：

        ```xml
        <servlet>
        	<servlet-name>hello</servlet-name>
        	<servlet-class>com.bjpowernode.controller.OneServlet</servlet-class>
        	<!-- 填写一个大于0的整数即可 -->
        	<load-on-startup>30<load-on-startup>
        </servlet>

        <servlet-mapping>
        	<servlet-name>hello</servlet-name>
        	<url-pattern>/newhello</url-pattern> <!-- urlPattern必须以"/"为开头 -->
        </servlet-mapping>
        ```

        > `load-on-startup`的值是一个非负整数，整数越小创建的优先级越高。创建Servlet的顺序是按照这个优先级来的，默认-1不创建。（优先级一样的话按照在web.xml文件中注册的顺序）

      - 基于注解：

        ```java
        @WebServlet("/newhello")
        public class HelloServlet implements Servlet {}
        ```

        > **关于注解`jakarta.servlet.annotation.WebServlet`注解**：
        >
        > `@WebServlet`注解只能在Servlet类上使用，该注解中有以下属性：
        >
        > - name属性：用来指定Servlet的名字。等同于：`<servlet-name>`
        > - urlPatterns/value属性：用来指定Servlet的映射路径。可以指定多个字符串。等同于：`<url-pattern>`
        > - loadOnStartUp属性：用来指定在服务器启动阶段是否加载该Servlet。等同于：`<load-on-startup>`
        >
        > ```java
        > @WebServlet("/wel")
        > public class WelcomeServlet extends HttpServlet {}
        > ```

    - 关于Servlet类中方法的调用次数？

      - 构造方法只执行一次。
      - init方法只执行一次。
      - service方法：用户发送一次请求则执行一次，发送N次请求则执行N次。
      - destroy方法只执行一次。

      > 说明：
      >
      > - 默认用户在发送第一次请求的时候Servlet对象被实例化，并且执行的是无参数构造器。
      > - Servlet对象被创建出来之后，Tomcat服务器马上调用它的init方法。然后才是service方法。
      > - 此后用户每发送一次请求，Servlet对象的service方法就会执行一次。
      > - 当服务器被正常关闭时，Tomcat 会依次销毁所有 **已初始化** 的 Servlet 实例，在销毁前触发它们的 `destroy()` 方法，做销毁前的一些工作，比如关闭out输出流等。该方法执行结束后，堆中的Servlet对象就不存在了。

    - Servlet对象是单例的（假单例，真单例构造方法也是私有的）。用户无论发送了几个请求，处理该请求的都是这一个Servlet对象。

    - **思考**：init和无参构造都是在Servlet第一次创建时执行，并且都是只执行一次。那么无参构造可以替代init吗？

      > 不能。
      >
      > Servlet规范中由要求，作为javaweb程序员，编写Servlet类的时候，不建议自己手动编写构造器，因为这样很容易忘记写无参构造导致Servlet对象无法实例化。因此init方法的存在是很有必要的，我们希望在构造器中做的事情都可以放在init方法中。
      >
      > 通常我们在init方法中执行初始化操作，并且这个初始化操作只需要执行一次。例如：初始化线程池、数据库链接池...
      >
      > 什么时候用destroy方法呢？通常我们在destroy方法中对资源进行关闭、信息的保存等等。

  - #### GenericServlet

    > 我们编写一个Servlet类直接实现Servlet接口有一个缺点，我们只需要用到service方法，其他方法大部分情况下是不需要实现的，直接实现Servlet接口每次都要重写很多不需要的方法，能不能优化一下？
    >
    > 可以。生活中，手机直接插到220V电源上就报废了，怎么办，用一个充电器问题就解决了。手机充电器就是一个面向于手机的适配器。
    >
    > 关于（Adapter）**适配器设计模式**：
    >
    > 我们编写一个`GenericServlet`抽象类，翻译为“通用的Servlet”。该类实现了Servlet接口，其中只有一个抽象方法`service`，其他所有的方法都做了空的实现（假实现）。这里的`GenericServlet`就是一个适配器，解决了上面的问题，以后编写的所有Servlet类直接继承`GenericServlet`、重写service方法即可，其他的方法用到了再进行覆盖。
    >
    > 好消息：在servlet-api中已经有了GenericServlet。
    >
    > 关于`jakarta.servlet.GenericServlet`：
    >
    > ```java
    > public abstract class GenericServlet implements Servlet, ServletConfig, Serializable {
    > 	//这是唯一标识
    >     private static final long serialVersionUID = 1L;
    > 	//这是servlet对应的配置信息对象，私有的
    >     private transient ServletConfig config;
    > 	//无参构造器一定要有，否则子类的super()就报错了
    >     public GenericServlet() { }
    > 
    > 	//重写了Servlet接口的destory，但里面什么也没，子类用到了再重写
    >     @Override
    >     public void destroy() { }
    > 
    > 	//通过配置信息对象config来获取该servlet对应的初始化参数
    >     @Override
    >     public String getInitParameter(String name) {
    >         return getServletConfig().getInitParameter(name);
    >     }
    >     @Override
    >     public Enumeration<String> getInitParameterNames() {
    >         return getServletConfig().getInitParameterNames();
    >     }
    > 
    > 	//获取config对象的方法
    >     @Override
    >     public ServletConfig getServletConfig() {
    >         return config;
    >     }
    > 	//通过config来获取application应用上下文对象
    >     @Override
    >     public ServletContext getServletContext() {
    >         return getServletConfig().getServletContext();
    >     }
    > 	//获取程序员自定义的，关于这个servlet的信息
    >     @Override
    >     public String getServletInfo() {
    >         return "";
    >     }
    > 	//这个方法用于给config对象初始化，不能动
    >     @Override
    >     public void init(ServletConfig config) throws ServletException {
    >         this.config = config;
    >         this.init();
    >     }
    > 	//用下面这个init方法
    >     public void init() throws ServletException { }
    > 	//记录日志方法，日志信息在tomcat中log目录下
    >     public void log(String message) {
    >         getServletContext().log(getServletName() + ": " + message);
    >     }
    >     public void log(String message, Throwable t) {
    >         getServletContext().log(getServletName() + ": " + message, t);
    >     }
    > 	//核心业务方法
    >     @Override
    >     public abstract void service(ServletRequest req, ServletResponse res)
    >             throws ServletException, IOException;
    >     @Override
    > 	//获取servlet别名
    >     public String getServletName() {
    >         return config.getServletName();
    >     }
    > }
    > ```

    - ##### `GenericServlet`抽象类中的`init()`方法：

      > 当Tomcat实例化Servlet对象后会立即调用该方法。Tomcat会首先创建每个Servlet对应的`ServletConfig`对象，在调用init方法时将`ServletConfig`对象作为参数传进去。也就是说，继承了GenericServlet的Servlet类，会存在一个ServletConfig属性，该属性对应的是`web.xml`中，程序员为每个Servlet添加的配置信息。

      ```java
      //这是servlet对应的配置信息对象，私有的
      private transient ServletConfig config;
      
      //这个方法用于给config对象初始化，不能动
      @Override
      public void init(ServletConfig config) throws ServletException {
          this.config = config;
          this.init();
      }
      //用下面这个init方法
      public void init() throws ServletException { }
      ```

      > 我们看到这个有参数的init方法就是为了给ServletConfig赋值，并且赋值后调用了无参数的init方法。因此我们重新`GenericServlet`抽象类中的init方法时，不要重写有参数的init，而要重写无参数的init。这样才能在Servlet中获取到我们为Servlet添加的配置信息。
      >
      > 在`web.xml`中为Servlet添加初始化参数：
      >
      > ```xml
      > <?xml version="1.0" encoding="UTF-8"?>
      > <web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
      >          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      >          xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
      >                         https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
      >          version="5.0"
      >          metadata-complete="true">
      > 
      >     <!--servlet描述信息-->
      >     <servlet>
      >         <servlet-name>HelloServlet</servlet-name>
      >         <!--这个位置必须是带有包名的全限定类名-->
      >         <servlet-class>com.bjpowernode.servlet.HelloServlet</servlet-class>
      > 
      >         <load-on-startup>1</load-on-startup>
      >         <init-param>
      >             <init-name>key1</init-name>
      >             <init-value>value1</init-value>
      >         </init-param>
      >         <init-param>
      >             <init-name>key2</init-name>
      >             <init-value>value2</init-value>
      >         </init-param>
      >     </servlet>
      > 
      >     <!--servlet映射信息-->
      >     <servlet-mapping>
      >         <servlet-name>HelloServlet</servlet-name>
      >         <url-pattern>/HelloServlet.index</url-pattern><!-- 可以有多个url-pattern标签 -->
      >     </servlet-mapping>
      > 
      > </web-app>
      > ```

      > **总结**：
      >
      > - GenericServlet就是一个Servlet的包装。Servlet只是一个接口，里面啥也没有；而GenericServlet可以给你获取到该Servlet的配置信息，因此更通用。
      > - 但是我们在JavaWeb开发中，一般并不会直接继承GenericServlet，而是去继承GenericServlet的子类`HttpServlet`，它更适合Web应用的开发（后面会讲`HttpServlet`）。

    - ##### `ServletConfig`接口中的方法：

      - `String getServletName()`：获取servletName。
      - `Enumeration<String> getInitParameterNames()`：获取所有的初始化参数信息的key，返回一个迭代器。
      - `String getInitParameter(String name)`：根据初始化参数信息的key来获取value。
      - `ServletContext getServletContext()`：获取ServletContext即Servlet上下文。（后面再说）

      ###### 注意：在`GenericServlet`抽象类中有4个同名方法，其实调用的也是上面4个方法。（为了方便）

    - ##### `Servlet`接口中的`getServletInfo`：

      > 该方法返回一个字符串，用于描述该Servlet类的作用的。具体的实现取决于程序员，非必须。通常这个字符串会包括Servlet的版本、功能、以及其他有用的信息。例如：“版本1.0，用于处理HTTP GET请求”。

    - ##### `ServletContext`（应用域）：

      > - `ServletContext`是一个接口，是Servlet规范中的一员，翻译为Servlet上下文。该对象在Tomcat服务器启动的时创建，在服务器关闭的时销毁。
      > - ServletContext对象就是Servlet的环境对象，上下文对象，它是一个容器（application应用域）。对于一个WEB应用来说，ServletContext对象只有一个，也可以理解为它就是对应的web.xml文件。放在ServletContext当中的数据，所有的Servlet对象都可以共用。
      > - 注意：它不是容器级别的，容器是Tomcat，它里面有很多的webapp，每一个都有自己的上下文（web.xml）。
      
      ###### ServletContext接口中的方法：
      
      - `public String getInitParameter(String name)`：通过初始化参数的name获取value。
      
      - `public Enumeration<String> getInitParameterNames()`：获取所有的初始化参数的name。
      
        ```xml
        <!--以上两个方法是ServletContext对象的方法，这个方法获取的是什么信息？是以下的配置信息-->
        <web-app ...>
        	...
            <context-param>
                <param-name>pageSize</param-name>
                <param-value>10</param-value>
            </context-param>
            <context-param>
                <param-name>startIndex</param-name>
                <param-value>0</param-value>
            </context-param>
        	...
        </web-app>
        <!--注意：以上的配置信息属于应用级的配置信息，一般一个项目中共享的配置信息会放到以上的标签当中。-->
        <!--如果你的配置信息只是想给某一个servlet作为参考，那么你配置到servlet标签当中即可，使用ServletConfig对象来获取。-->
        ```
      
      - （非常重要）`public String getContextPath()`：获取应用的根路径（项目上下文，即项目名）。因为在java源码中有一些地方可能会需要应用的根路径，这个方法可以动态获取应用的根路径（`/firstapp`）。记住：不要将应用的根路径写死，因为你永远都不知道这个应用在最终部署的时候，是一个什么名字。
      
      - `public String getRealPath(String path)`：获取某个文件的绝对路径。
      
      - `public void log(String message)`、`public void log(String message, Throwable t)`：通过ServletContext对象也是可以记录日志的。这些日志信息记录到`CATALINA_HOME/logs/localhost.2021-11-05.log`文件中了，这些日志每次重新启动也不会清空重置。并且该方法记录的时候也可以传进去一个异常对象，异常并没有发生只是记录一下。
      
        > Tomcat服务器的logs目录下都有哪些日志文件？
        >
        > - catalina.2021-11-05.log：服务器端的java程序运行的控制台信息。即tomcat控制台信息。
        > - localhost.2021-11-05.log：ServletContext对象的log方法记录的日志信息存储到这个文件中。
        > - localhost_access_log.2021-11-05.txt：访问web服务器的日志信息。用户每次请求Web服务器都会自动记录下访问日志。
      
      - `public void setAttribute(String key, Object value)`：向ServletContext应用域中存数据。
      
      - `public Object getAttribute(String key)`：从ServletContext应用域中取数据。
      
      - `public void removeAttribute(String key)`：从ServletContext应用域中删数据。
      
        > ServletContext对象还有另一个名字：应用域（后面还有其他域，例如：请求域、会话域）。如果所有的用户共享一份数据，并且这个数据很少的被修改，并且这个数据量很少，可以考虑将这些数据放到应用域中。
        >
        > 1. 为什么数据要很少被修改？因为数据涉及到共享，会有线程安全问题。所以放在ServletContext中的对象一般都是只读的。
        > 2. 为什么数据量要小？因为它会跟随着Tomcat的启动一块被创建出来，很占用服务器的运行内存。
        > 3. 放在应用域中的数据相当于放在了缓存中，不需要每次从数据库中取，大大提升效率。
      
        ###### 关于线程池：
      
        > Tomcat服务器本身就支持多线程。那么在用户发送一次请求，Tomcat就新建一个Thread线程对象来并发处理用户的请求吗？
        >
        > 当然不是！实际上是在Tomcat服务器启动的时候，会提前创建好N多个线程Thread对象，然后将线程对象放到集合当中，这个集合被称为：**线程池**。用户发送请求过来之后，需要有一个对应的线程来处理这个请求，这时候就会直接从线程池中取Thread对象，效率比较高。
        >
        > 所有的WEB服务器或应用服务器，都是支持多线程的，都有线程池机制。

  - #### HttpServlet

    > 我们编写Servlet类的时候，实际上是不会去直接继承GenericServlet类的，因为我们是B/S结构的系统，这种系统是基于HTTP超文本传输协议的。
    >
    > 在Servlet规范当中，提供了一个类叫做`jakarta.servlet.http.HttpServlet`，它是`GenericServlet`的子类，是专门为HTTP协议准备的一个Servlet类。我们编写的Servlet类要继承HttpServlet。HttpServlet是为HTTP协议专门准备的，使用HttpServlet处理HTTP协议更便捷。
    >
    > 它们之间的继承关系是：
    >
    > - jakarta.servlet.Servlet（接口）【爷爷】
    > - jakarta.servlet.GenericServlet implements Servlet（抽象类）【儿子】
    > - jakarta.servlet.http.HttpServlet extends GenericServlet（抽象类）【孙子】

  - #### HttpServletRequest接口详解

    - 常用的方法
      - 获取用户提交的数据
      - HttpServletRequest接口的其他常用方法：
    - 请求域对象request
    - 请求转发
    - 重定向
      - 转发和重定向区别

  - #### session和cookie

    - session
    - cookie

  - #### 过滤器和监听器

    - 过滤器
    - Listener监听器

- ## JSP

- ## MVC架构模式

