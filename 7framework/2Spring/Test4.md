### 面向切面编程AOP

> IoC使软件组件松耦合。AOP让你能够捕捉系统中经常使用的功能，把它转化成**组件**。

```txt
AOP（Aspect Oriented Programming）：面向切面编程，面向方面编程。（AOP是一种编程技术）
AOP是对OOP的补充延伸。
AOP底层使用的就是动态代理来实现的。
Spring的AOP使用的动态代理是：JDK动态代理 + CGLIB动态代理技术。Spring在这两种动态代理中灵活切换，如果是代理接口，会默认使用JDK动态代理，如果要代理某个类，这个类没有实现接口，就会切换使用CGLIB。当然，你也可以强制通过一些配置让Spring只使用CGLIB。
```

- #### AOP介绍：

  > 一般一个系统当中都会有一些系统服务，例如：日志、事务管理、安全等。这些系统服务被称为：**交叉业务**
  >
  > 这些**交叉业务**几乎是通用的，不管你是做银行账户转账，还是删除用户数据。日志、事务管理、安全，这些都是需要做的。
  >
  > 如果在每一个业务处理过程当中，都掺杂这些交叉业务代码进去的话，存在两方面问题：
  >
  > - 第一：交叉业务代码在多个业务流程中反复出现，显然这个交叉业务代码没有得到复用。并且修改这些交叉业务代码的话，需要修改多处。
  > - 第二：程序员无法专注核心业务代码的编写，在编写核心业务代码的同时还需要处理这些交叉业务。
  >
  > 使用AOP可以很轻松的解决以上问题。请看下图，可以帮助你快速理解AOP的思想：

  ![image-20240403205748721](./assets/image-20240403205748721.png)

  > **用一句话总结AOP：AOP将与核心业务无关的代码独立的抽取出来，形成一个独立的组件，然后以横向交叉的方式应用到各个业务流程当中的过程被称为AOP。**
  >
  > 使用AOP有如下优点：
  >
  > ​	1：代码复用性增强。
  >
  > ​	2：代码易维护。
  >
  > ​	3：使开发者更关注业务逻辑。

- #### AOP的七大术语：

  - **切点 Pointcut**：切点本质上就是方法。你要将增强代码切入到哪个方法上，这个要进行切入的方法就是切点。（一个切点有多个连接点）

  - **连接点 Joinpoint**：增强代码连接到，切点方法的哪个位置，这个位置就是连接点。连接点也可以是发生异常的位置或finally等位置。

  - **通知 Advice**：通知又叫增强，就是具体你要织入的方法代码。通知根据连接点的位置，又分为以下几种：
    - 前置通知Before
    
    - 后置通知AfterReturning
    
    - 环绕通知Around
    
    - 异常通知AfterThrowing
    
    - 最终通知After
    
  - **切面 Aspect**：就是**切点 + 通知**。位置加增强代码就是切面。
  
  - 织入 Weaving：把通知应用到目标位置上的过程。
  
  - 代理对象 Proxy：一个目标对象被织入通知后产生的新对象。
  
  - 目标对象 Target：被织入通知的对象。
  
  ###### 通过下图，大家可以很好的理解AOP的相关术语：
  
  ![image-20240403210629172](./assets/image-20240403210629172.png)
  
- #### 切点表达式：

  切点表达式用来定义，通知（Advice）在哪些方法（切点）上切入。切点表达式的语法格式：

  ```txt
  execution([访问控制权限修饰符] 返回值类型 [全限定类名]方法名(形式参数列表) [异常])
  	访问控制权限修饰符：可选项，没写，就是4个权限都包括，写public就表示只包括公开的方法。
  	返回值类型：必填项，*表示返回值类型任意。
  	全限定类名：可选项，2个点“..”代表当前包以及子包下的所有类，省略时表示所有的类。
  	方法名：必填项，“*”表示所有方法，“set*”表示所有以set开头的方法。
  	形式参数列表：必填项，()表示没有参数的方法，(..)表示参数类型和个数任意，(*)只有一个任意参数，(*,String)匹配两个参数的				方法，第一个参数任意类型，第二个参数String类型。
  	异常：可选项，省略时表示任意异常类型。
  ------------------------
  execution(public * com.powernode.mall.service.*.delete*(..))表示service包下所有的类中以delete开始的所有方法。
  execution(* com.powernode.mall..*(..))表示mall包下所有的类的所有的方法。
  execution(* *(..))表示所有类的所有方法。
  ```

- #### 关于Spring对AOP的实现：

  > Spring对AOP的实现包括以下3种方式：
  >
  > - **方式1：Spring框架结合AspectJ框架实现的AOP，基于注解方式。**
  > - **方式2：Spring框架结合AspectJ框架实现的AOP，基于XML方式。**
  > - 方式3：Spring框架自己实现的AOP，基于XML配置方式。（了解）
  >
  > 实际开发中，都是Spring+AspectJ来实现AOP。所以我们重点学习第一种和第二种方式。
  >
  > 什么是AspectJ？
  >
  > ​	它是Eclipse组织的一个支持AOP的框架。AspectJ框架是独立于Spring框架之外的一个框架，Spring框架用了AspectJ框架。
  >
  > AspectJ项目起源于帕洛阿尔托（Palo Alto）研究中心（缩写为PARC）。该中心由Xerox集团资助，Gregor Kiczales领导，从1997年开始致力于AspectJ的开发，1998年第一次发布给外部用户，2001年发布1.0 release。为了推动AspectJ技术和社团的发展，PARC在2003年3月正式将AspectJ项目移交给了Eclipse组织，因为AspectJ的发展和受关注程度大大超出了PARC的预期，他们已经无力继续维持它的发展。
  >
  > 使用spring的AOP：

  使用该功能前，除了已有的spring-aop依赖，还要引入spring-aspects依赖：（还要添加aop的命名空间）

  ```xml
  <!--spring aspects依赖-->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>6.0.18</version>
  </dependency>
  ```

- #### 基于注解方式的AOP的使用：

  1. 定义目标类以及目标方法：

     ```java
     // 目标类
     @Service
     public class OrderService {
         // 目标方法
         public void generate(){
             System.out.println("订单已生成！");
         }
     }
     ```
  
  2. 定义切面类：（目标类和切面类都需要纳入spring容器的管理，所以在它们上面都添加`@Service`注解，并在spring配置文件中设置组件扫描）
  
     ```java
     // 切面类
     @Aspect
     @Service
     public class MyAspect {}
     ```

  4. 在切面类中添加通知代码（增强方法），并在方法上配置注解，注解的值是String的切点表达式：

     ```java
     // 切面类
     @Aspect
     @Component
     public class MyAspect {
         // @Before表示该通知方法是前置通知，连接到切点的前面。值是切点表达式，表示织入代码的位置，织入的切点位置。
         @Before("execution(* com.itheima.service.OrderService.*(..))")
         // 这就是需要增强的代码（通知）。
         public void advice(JoinPoint jp){
             System.out.println("我是一个通知");
         }
         //通知+切点=切面
     }
     ```
  
  5. 在spring配置文件中启用自动代理：
  
     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:context="http://www.springframework.org/schema/context"
            xmlns:aop="http://www.springframework.org/schema/aop"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                                http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                                http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
         <!--开启组件扫描-->
         <context:component-scan base-package="com.itheima.service"/>
         <!--开启自动代理-->
         <aop:aspectj-autoproxy proxy-target-class="true"/>
     </beans>
     ```
  
     > 开启自动代理之后，凡事带有@Aspect注解的bean都会生成代理对象。proxy-target-class="true"表示采用cglib动态代理。false表示采用jdk动态代理。默认值是false。但即使写成false，当没有接口的时候，也会自动选择cglib动态生成代理类。
  
  ###### 通知类型包括：
  
  ```txt
  ● 前置通知：@Before 目标方法执行之前的通知
  ● 后置通知：@AfterReturning 目标方法执行之后的通知
  ● 环绕通知：@Around 在目标方法前后添加通知。它是最大的范围，包住了其他的通知。
  ● 异常通知：@AfterThrowing 发生异常之后执行的通知
  ● 最终通知：@After 放在finally语句块中执行的通知
  注意：出现异常之后，后置通知和环绕通知的结束部分是不会执行的
  ```
  
  ###### 这些通知方法中都可以写一个参数`JoinPoint`，这就是连接点，里面有很多方法可以用。如：获取目标方法名等。其中环绕通知`@Around`的方法中传的是参数`ProceedingJoinPoint proceedingJoinPoint`表示进行连接点；后置通知有第二个参数`Object ret`接收返回值；异常通知第二个参数为异常对象：
  
  ```java
  @Around("execution(* com.itheima.service.OrderService.*(..))")
  public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
      System.out.println("环绕通知开始");
      // 执行目标方法。
      proceedingJoinPoint.proceed();
      System.out.println("环绕通知结束");
  }
  ```
  
  ###### 切面的先后顺序：
  
  > 我们知道，业务流程当中不一定只有一个切面，可能有的切面控制事务，有的记录日志，有的进行安全控制，如果多个切面的话，顺序如何控制：**可以使用@Order注解来标识切面类，为@Order注解的value指定一个整数型的数字，数字越小，优先级越高**。
  
  ###### 优化使用切点表达式：可以将切点表达式单独的定义出来，在需要的位置引入即可。如下：
  
  ```java
  // 切面类
  @Component
  @Aspect
  @Order(2)
  public class MyAspect {
  //使用@Pointcut注解来定义独立的切点表达式。这个方法名随意，方法中不需要任何代码，它只是作为标识
      @Pointcut("execution(* com.itheima.service.OrderService.*(..))")
      public void pointcut(){}
  
      @Around("pointcut()")//前面也可以补上类名表示引入某个类的某个切点com.it.User.pointcut()
      public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
          System.out.println("环绕通知开始");
          // 执行目标方法。
          proceedingJoinPoint.proceed();
          System.out.println("环绕通知结束");
      }
  }
  ```
  
  ###### 全注解式开发AOP：在配置类上使用@EnableAspectJAutoProxy(proxyTargetClass = true)注解，来代替核心配置文件中的标签。

------

- ##### 基于XML的AOP的使用（了解）：

  1. 编写目标类

     ```java
     // 目标类
     public class VipService {
         public void add(){
             System.out.println("保存vip信息。");
         }
     }
     ```

  2. 编写切面类，并且编写通知方法：

     ```java
     // 负责计时的切面类
     public class TimerAspect {
         public void time(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
             long begin = System.currentTimeMillis();
             //执行目标
             proceedingJoinPoint.proceed();
             long end = System.currentTimeMillis();
             System.out.println("耗时"+(end - begin)+"毫秒");
         }
     }
     ```

  3. 编写spring配置文件：

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:context="http://www.springframework.org/schema/context"
            xmlns:aop="http://www.springframework.org/schema/aop"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                                http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                                http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
     
         <!--纳入spring bean管理-->
         <bean id="vipService" class="com.itheima.service.VipService"/>
         <bean id="timerAspect" class="com.itheima.service.TimerAspect"/>
     
         <!-- aop功能的配置 -->
         <aop:config>
             <!-- 配置切点 -->
             <aop:pointcut id="p1" expression="execution(* com.itheima.service.VipService.*(..))"/>
             <!-- 配置切面，引用切面类。切面 = 通知 + 切点 -->
             <aop:aspect ref="timerAspect">
                 <!-- 在切面类内部，将方法配置为环绕通知，指定通知的切点 -->
                 <aop:around method="time" pointcut-ref="p1"/>
             </aop:aspect>
             <!-- aop标签里还可以用<aop:advisor>标签直接引入通知bean。通常该bean需要实现某些接口 -->
         </aop:config>
     </beans>
     ```

- ##### AOP的实际案例：事务处理

  > 项目中的事务控制是在所难免的。在一个业务流程当中，可能需要多条DML语句共同完成，为了保证数据的安全，这多条DML语句要么同时成功，要么同时失败。这就需要添加事务控制的代码。而很多业务类中的很多个业务方法都是需要控制事务的，而控制事务的代码又是固定的格式，这种和业务逻辑没有任何关系的重复代码统称为“**交叉业务**”。
  >
  > 我们可以采用AOP思想解决，不用写那么多和业务无关的重复代码，将注意力放在业务逻辑上而不是代码的安全性上。可以把控制事务的代码配置为环绕通知，切入到每个需要控制事务的目标类的方法中。用AOP来完成：

  ```java
  @Aspect
  @Component
  // 事务切面类
  public class TransactionAspect {
      //指定在哪些方法上进行切入，开始事务
      @Around("execution(* com.itheima.biz..*(..))")
      public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint){
          try {
              System.out.println("开启事务");
              // 执行目标
              proceedingJoinPoint.proceed();
              System.out.println("提交事务");
          } catch (Throwable e) {
              System.out.println("发生异常回滚事务");
          }
      }
  }
  ```

  > 你看，这个事务控制代码是不是只需要写一次就行了，并且维护起来也没有成本。

------

### Spring对事务的支持

> 事务在开发中很常见，几乎任何业务都需要配置事务，并且基本都是那几行代码。虽然AOP可以完成事务的配置，但是还需要写代码。既然事务那么重要，所以Spring专门提供了一套事务相关的api，只要加上注解或下ml中配置一下就行了很方便。底层也是AOP代码的封装。

- #### 事务Transaction概述：

  > 什么是事务（tx）？
  >
  > 在一个业务流程当中，通常需要多条DML（insert delete update）语句共同联合才能完成，这多条DML语句必须同时成功，或者同时失败，这样才能保证数据的安全。将多条DML作为一个不可分割的整体，要么同时成功，或同时失败，这就是事务。
  >
  > 事务的四个处理过程：
  >
  > ​	第1步：开启事务 (start transaction)
  >
  > ​	第2步：执行核心业务代码
  >
  > ​	第3步：提交事务（如果核心业务处理过程中没有出现异常）(commit transaction)
  >
  > ​	第4步：回滚事务（如果核心业务处理过程中出现异常）(rollback transaction)
  >
  > 事务的四个特性：
  >
  > ​	A 原子性：事务是最小的工作单元，不可再分。
  >
  > ​	C 一致性：事务要求要么同时成功，要么同时失败。事务前和事务后的总量不变。
  >
  > ​	I 隔离性：事务和事务之间因为有隔离性，才可以保证互不干扰。
  >
  > ​	D 持久性：持久性是事务结束的标志。

- #### Spring对事务的支持：

  > ##### Spring实现事务有两种方式：
  >
  > - 编程式事务：通过手动编写事务代码的方式来实现事务的管理。
  >
  > - 声明式事务：（主要学这个）
  >
  >   - 基于注解方式。
  >
  >   - 基于XML配置方式。

  > ##### Spring事务管理API：Spring对事务的管理底层实现方式是基于AOP，采用AOP的方式进行了封装。所以Spring专门针对事务开发了一套API，API的核心接口如下：
  >
  > `PlatformTransactionManager`接口：spring事务管理器的核心接口。如果mybatis想让spring帮它管理事务，就需要提供一个该接口的实现类。该接口在**Spring6**中已经有两个实现类了：
  >
  > - `DataSourceTransactionManager`：支持`JdbcTemplate`、`MyBatis`、`Hibernate`等事务管理。
  >
  > - `JtaTransactionManager`：支持分布式事务管理。
  >
  > （如果要在Spring6中使用`JdbcTemplate`或`MyBatis`，就要使用`DataSourceTransactionManager`实现类来管理事务。Spring内置写好了，可以直接用）

- #### 声明式事务之，注解实现方式：（不需要spring-aspects的jar包，但是需要spring-jdbc的jar包）

  1. 在spring配置文件中配置事务管理器：

     ```xml
     <bean id="myTransactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
       <!-- 给事务管理器注入数据源，因为要调用conn.rollback()方法 -->
       <property name="dataSource" ref="dataSource"/>
     </bean>
     ```

  2. 在spring配置文件中配置“事务注解驱动器”，开启注解的方式控制事务，扫描事务注解：（还要引入tx命名空间和约束）

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:tx="http://www.springframework.org/schema/tx"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                                http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
     	<!-- 开启事务的注解驱动器，指向要使用的注解驱动对象 -->
     	<tx:annotation-driven transaction-manager="myTransactionManager"/>
     </beans>
     ```

  3. 在需要开启事务的，类或方法上添加**@Transactional**注解即可，例如：（类范围则类中所有方法都开启事务）

  ##### 重点：事务的全注解式开发：配置类上加`@EnableTransactionManagement`注解开启事务注解扫描，然后类中配置事务类即可。

  ```java
  @Configuration
  @ComponentScan("com.itheima.bank")
  @EnableTransactionManagement
  //使用spring5版本 ，需要手动设置@EnableTransactionManagement(proxyTargetClass=true)为CGLIB，不然会报异常 
  public class Spring6Config {
      //Bean注解表示，将该方法的返回值对象，自动纳入spring容器管理；不指定bean的id默认是方法名
      @Bean(name = "dataSource")
      public DataSource getDataSource(){
          DruidDataSource dataSource = new DruidDataSource();
          dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
          dataSource.setUrl("jdbc:mysql://localhost:3306/spring6");
          dataSource.setUsername("root");
          dataSource.setPassword("root");
          return dataSource;
      }
  
      @Bean("jdbcTemplate")
      //如果你的方法上有参数，那么spring会自动去容器里根据类型找对应的bean给你注入进去
      public JdbcTemplate getJdbcTemplate(DataSource dataSource){
          JdbcTemplate jdbcTemplate = new JdbcTemplate();
          jdbcTemplate.setDataSource(dataSource);
          return jdbcTemplate;
      }
  
      //默认会使用spring容器中唯一的这个DataSourceTransactionManager作为管理事务的注解驱动对象
      @Bean
      public DataSourceTransactionManager getDataSourceTransactionManager(DataSource dataSource){
          DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
          dataSourceTransactionManager.setDataSource(dataSource);
          return dataSourceTransactionManager;
      }
  }
  ```

- #### 事务注解的重点属性有哪些？

  - ###### 事务传播行为：

    ```txt
    什么是事务的传播行为？
    	在service类中有a()方法和b()方法，a()方法上有事务代码，b()方法上也有事务代码，当a()方法执行过程中调用了b()方法。当b()方法执行时发生异常，没有提交的话，a()方法中的事务会提交吗？它们两个的事务之间是如何传递的？合并到一个事务里？还是开启一个新的事务？这就是事务的传播行为。
    
    事务传播行为在spring框架中被定义为枚举类型：Propagation，一共有7个值对应7种传播行为：
    	- REQUIRED：支持当前事务，如果不存在就新建一个(默认)【没有就新建，有就加入】
    	- SUPPORTS：支持当前事务，如果当前没有事务，就以非事务方式执行【有就加入，没有就不管了】
    	- MANDATORY：必须运行在一个事务中，如果当前没有事务正在发生，将抛出一个异常【有就加入，没有就抛异常】
    	- REQUIRES_NEW：开启一个新的事务，如果一个事务已经存在，则将这个存在的事务挂起
    		【不管有没有，直接开启一个新事务，开启的新事务和之前的事务不存在嵌套关系，之前事务被挂起】
    	- NOT_SUPPORTED：以非事务方式运行，如果有事务存在，挂起当前事务【不支持事务，存在就挂起】
    	- NEVER：以非事务方式运行，如果有事务存在，抛出异常【不支持事务，存在就抛异常】
    	- NESTED：如果当前正有一个事务在进行中，则该方法应当运行在一个嵌套式事务中。被嵌套的事务可以独立于外层事务
    		进行提交或回滚。如果外层事务不存在，行为就像REQUIRED一样。【有事务的话，就在这个事务里再嵌套一个
    		完全独立的事务，嵌套的事务可以独立的提交和回滚。没有事务就和REQUIRED一样】。
    
    在代码中设置事务的传播行为：@Transactional(propagation = Propagation.REQUIRED)
    ```

  - ###### 事务隔离级别：

    > 事务隔离级就是2个事务之间的隔离性，一个事务进行的操作会不会影响另一个事务。
    >
    > 数据库中读取数据存在的三大问题：（三大读问题）
    >
    > - **脏读：读取到没有提交到数据库的数据，叫做脏读。**
    > - **不可重复读：在同一个事务当中，第一次和第二次读取的数据不一样。**
    > - **幻读：读到的数据是假的。**
    >
    > 事务隔离级别包括四个级别：
    >
    > - 读未提交：READ_UNCOMMITTED。这种隔离级别，存在脏读问题，所谓的脏读(dirty read)表示能够读取到其它事务未提交的数据。
    >
    > - 读已提交：READ_COMMITTED。解决了脏读问题，其它事务提交之后才能读到，但存在不可重复读问题。
    >
    > - 可重复读：REPEATABLE_READ。解决了不可重复读，可以达到可重复读效果，只要当前事务不结束，读取到的数据一直都是一样的。但存在幻读问题。
    >
    > - 序列化：SERIALIZABLE。解决了幻读问题，事务排队执行。不支持并发。
    >
    > 在代码中设置事务的隔离级别：**@Transactional(isolation = Isolation.READ_COMMITTED)**

  - ###### 事务超时：

    > @Transactional(timeout = 10)设置事务的超时时间为10秒。如果超过10秒该事务中**所有的DML语句**还没有执行完毕的话，最终事务会回滚。默认值-1，表示没有时间限制。
    >
    > 如果最后一条DML语句后面很有很多业务逻辑，这些业务代码执行的时间不被计入超时时间。
    >
    > 当然，如果想让整个方法的所有代码都计入超时时间的话，可以在方法最后一行添加一行无关紧要的DML语句。

  - ###### 只读事务：

    > @Transactional(readOnly = true)将当前事务设置为只读事务，在该事务执行过程中，**只允许select语句执行**，delete insert update均不可执行。该特性的作用是：**启动spring的优化策略。提高select语句执行效率。**
    >
    > 如果该事务中确实没有增删改操作，建议设置为只读事务。

  - ###### 设置出现哪些异常回滚事务：

    > @Transactional(rollbackFor = RuntimeException.class)表示只有发生RuntimeException异常才会回滚。

  - ###### 设置出现哪些异常不回滚事务：

    > @Transactional(noRollbackFor = NullPointerException.class)表示发生NullPointerException异常的话不回滚，其他异常才回滚。


------

- #### 声明式事务之，XML实现方式：（需要spring-aspects的jar包）

  > 不用@Transactional注解了，用纯配置文件的方式来加上事务。由于这种方式是通过aop切面配置的方式将事务当作切面织入到代码中去了，所以要用到spring整合的AspectJ框架的jar包，spring-aspects：

  1. 添加依赖：

     ```xml
     <dependency>
         <groupId>org.springframework</groupId>
         <artifactId>spring-aspects</artifactId>
         <version>6.0.18</version>
     </dependency>
     ```

  2. 在spring核心配置文件中进行如下配置：（**记得添加aop的命名空间**）

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:context="http://www.springframework.org/schema/context"
            xmlns:tx="http://www.springframework.org/schema/tx"
            xmlns:aop="http://www.springframework.org/schema/aop"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                                http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                                http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd
                                http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
     
         <context:component-scan base-package="com.itheima.bank"/>
         <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
             <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
             <property name="url" value="jdbc:mysql://localhost:3306/spring6"/>
             <property name="username" value="root"/>
             <property name="password" value="root"/>
         </bean>
     
     	<!--用下jdbcTemplete来操作数据库-->
         <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
             <property name="dataSource" ref="dataSource"/>//注入数据源
         </bean>
     
         <!--配置事务管理器来控制事务-->
         <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
             <property name="dataSource" ref="dataSource"/>//注入数据源
         </bean>
     
         <!-- 配置事务通知，具体的增强代码 -->
         <tx:advice id="txAdvice" transaction-manager="txManager">
     		<!-- 配置不同方法上事务的相关属性 -->
             <tx:attributes>
                 <tx:method name="save*" propagation="REQUIRED" rollback-for="java.lang.Throwable"/>
                 <tx:method name="del*" propagation="REQUIRED" rollback-for="java.lang.Throwable"/>
                 <tx:method name="update*" propagation="REQUIRED" rollback-for="java.lang.Throwable"/>
                 <tx:method name="transfer*" propagation="REQUIRED" rollback-for="java.lang.Throwable"/>
             </tx:attributes>
         </tx:advice>
     
         <!-- AOP切面相关的配置。将上面的事务通知切入到哪里 -->
         <aop:config>
     		<!-- 配置切点 -->
             <aop:pointcut id="txPointcut" expression="execution(* com.itheima.service..*(..))"/>
             <!-- 切面 = 通知 + 切点 -->
             <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut"/>
         </aop:config>
         <!-- 将事务作为通知织入到切点位置，织入到service包下的所有类的所有方法，遇到方法名以save开头就配置第一个事务标签 -->
     </beans>
     ```

------

### Spring整合JUnit5

> Spring中有一套api对junit进行了封装，用起来很方便，我们了解下：

- ##### Spring6对JUnit4的支持：

  ```xml
  <!--spring对junit的支持相关依赖-->
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>6.0.18</version>
  </dependency>
  ```

  > 测试代码：

  ```java
  @RunWith(SpringJUnit4ClassRunner.class)			//这是junit的注解
  @ContextConfiguration("classpath:spring.xml")	//这是spring的注解，用于指定spring配置文件的类路径
  //或者用这个注解代替以上两个：@SpringJUnitConfig(locations = "classpath:spring.xml")
  public class SpringTest {
      @Autowired
  	private User user;
  
      @Test
      public void testFirst(){
      	//下面这2行代码就可以不写了
          //ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
          //Object userBean = applicationContext.getBean("userBean");
          System.out.println(user);
      }
  }
  ```

- ##### Spring6对JUnit5的支持：

  上面的**@RunWith(SpringJUnit4ClassRunner.class)**替换为：**@ExtendWith(SpringExtension.class)**即可。

------

### Spring6集成MyBatis3.5.10

#### 集成步骤：

1. 准备t_car表（还是mybatis中用那个），创建模块并引入以下依赖：

   > - spring-context6.0.18
   > - spring-jdbc（要用jdbcTemplete来操作数据库以及使用事务tx）
   > - spring-test（试下spring对junit5的支持）
   > - spring-aspects
   > - mysql驱动
   > - mybatis3.5.10
   > - mybatis-spring3.0.0（核心：mybatis提供的与spring框架集成的依赖）
   > - 德鲁伊连接池
   > - junit5

2. 基于3层架构实现，所以提前创建好所有的包：

   > mapper、controller、controller.impl、service、service.impl、pojo、utils

3. pojo类准备好，编写mapper接口和mapper文件，以及jdbc.properties文件，mybatis核心配置文件，核心配置文件可以没有，大部分的配置可以转移到spring配置文件中，如果遇到mybatis相关的系统级配置，还是需要这个文件：

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE configuration
           PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-config.dtd">
   <configuration>
       <!-- 全局设置标签 -->
       <settings>
           <!-- 启用标准日志组件 -->
           <setting name="logImpl" value="STDOUT_LOGGING"/>
           <!-- 开启驼峰命名自动映射 -->
           <setting name="mapUnderscoreToCamelCase" value="true"/>
           <!-- 开启全局懒加载 -->
           <setting name="lazyLoadingEnabled" value="true"/>
       </settings>
   </configuration>
   ```

4. 编写spring.xml配置文件：配置组件扫描，引入外部的属性文件，配置数据源，配置SqlSessionFacotryBean，配置Mapper扫描器，配置事务管理器，启用事务注解：

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
   <!--    引入jdbc-->
       <context:property-placeholder location="classpath:jdbc.properties"/>
       <context:component-scan base-package="com.itheima.service"/>
   
   <!--    数据源-->
       <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">
           <property name="driverClassName" value="${jdbc.driver}"/>
           <property name="url" value="${jdbc.url}"/>
           <property name="username" value="${jdbc.username}"/>
           <property name="password" value="${jdbc.password}"/>
       </bean>
       
   <!--    SqlSessionFactory-->
       <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
           <property name="dataSource" ref="dataSource"/>
           <property name="typeAliasesPackage" value="com.itheima.bean"/>
           <property name="configLocation" value="classpath:mybatis-config.xml"/>
       </bean>
   
   <!-- mapper文件位置，配置mapper扫描器，主要扫描mapper接口，生成接口的代理类-->
       <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
           <property name="basePackage" value="com.itheima.mapper"/>
           <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
       </bean>
   
       <!-- 配置事务管理器 -->
       <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
           <property name="dataSource" ref="dataSource"/>
       </bean>
   
       <!-- 启用事务注解 -->
       <tx:annotation-driven transaction-manager="txManager"/>
   </beans>
   ```
   
5. 测试：

   ```java
   public class TestMybatis {
       @Test
       public void test(){
           ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
           SqlSessionFactory sqlSessionFactory = context.getBean("sqlSessionFactory", SqlSessionFactory.class);
           SqlSession sqlSession = sqlSessionFactory.openSession();
           CarMapper mapper = sqlSession.getMapper(CarMapper.class);
           Car car = mapper.selectById(2L);
           System.out.println(car);
       }
   }
   ```

------

#### Spring配置文件的import：

> spring配置文件可以有多个，并且可以在spring的主配置文件中使用import导入副配置文件：
>
> <import resource="common.xml"/>
>
> 注解方式在配置类上标注：@Import({DataSourceConfig.class, MyBatisConfig.class})或@ImportResource(resources="classpath:某个xml配置文件")

**注意：在实际开发中，service单独配置到一个文件中，dao单独配置到一个文件中，然后在核心配置文件中引入，养成好习惯。**

*一般你的new ClassPathXmlApplicationContext("spring.xml");里面那个就是主的配置文件*

