# JDBC编程

> 程序运行的时候，往往需要存取数据。现代应用程序最基本，也是使用最广泛的数据存储就是关系数据库。
>
> Java为关系数据库定义了一套标准的访问接口：JDBC（Java Database Connectivity），本章我们介绍如何在Java程序中使用JDBC。

- ## JDBC概述

  - #### 什么是JDBC

    > JDBC（Java DataBase Connectivity）就是Java数据库连接，说白了就是用Java语言来操作数据库。原来我们操作数据库是在控制台使用SQL语句来操作数据库，JDBC是用Java语言向数据库发送SQL语句。
  
  - #### JDBC原理
  
    > 早期SUN公司的天才们想编写一套可以连接天下所有数据库的API，但是当他们刚刚开始时就发现这是不可完成的任务，因为各个厂商的数据库服务器差异太大了。后来SUN开始与数据库厂商们讨论，最终得出的结论是，由SUN提供一套访问数据库的规范（就是一组接口），并提供连接数据库的协议标准，然后各个数据库厂商会遵循SUN的规范提供一套访问自己公司数据库服务器的API。SUN提供的规范命名为JDBC，而各个厂商提供的，遵循了JDBC规范的，可以访问自己数据库的API被称之为驱动！
    >
    > ![图片2.png](./assets/1701931393355-983a997d-c44c-4a48-b1b0-91b281b5a98b.webp)
    >
    > JDBC是接口，而JDBC驱动才是接口的实现，没有驱动无法完成数据库连接！每个数据库厂商都有自己的驱动，用来连接自己公司的数据库。
    >
    > 当然还有第三方公司专门为某一数据库提供驱动，这样的驱动往往不是开源免费的！
  
  - #### 模拟JDBC接口
  
    1. ##### 接口在开发中的作用：
  
       > Java中接口的作用主要有以下几个方面：
       >
       > 1.  定义标准：接口可以用于定义标准，规范应该如何完成某个任务或应该具有哪些属性、方法等。 
       > 2.  隐藏实现：接口隔离了类的实现和外界的逻辑使用，使得外部无论是访问接口的常量或是接口的方法都不需要关心接口的实现。 
       > 3.  实现多态：一个类实现多个接口，在实现接口的过程中，类便会具有接口中的所有方法。这样我们就可以在实际应用中方便的实现多态的效果。 
       > 4.  扩展性和灵活性：通过接口可以为项目提供更好的扩展性和灵活性，接口定义了一个共同的标准，使得新的类可以很容易地加入到已有的系统中，而且不需要修改现有的代码。 
       >
       > 总的来说，Java中的接口可以让我们通过规范来编写更加标准和灵活的代码，使得代码易于维护和扩展，并通过多态的特性来提高代码的重用性和可读性。**Java接口在使用场景中，一定是存在两个角色的，一个是接口的调用者，一个是接口的实现者，接口的出现让调用者和实现者解耦合了。**
  
    2. ##### 编写程序模拟JDBC接口：
  
       > **接口的制定者**：SUN公司负责制定的
       >
       > ```java
       > // SUN公司负责制定JDBC接口
       > public interface JDBC {
       >     // 负责连接数据库的方法
       >     void getConnection();
       > }
       > ```
  
       > **接口的实现者**：各大数据库厂商分别对JDBC接口进行实现，实现类被称为**驱动**
       >
       > - MySQL数据库厂商对JDBC接口的实现：MySQL驱动
       >
       >   ```java
       >   public class MySQLDriver implements JDBC{
       >       public void getConnection(){
       >       	System.out.println("与MySQL数据库连接建立成功，您正在操作MySQL数据库");
       >       }
       >   }
       >   ```
       >
       > - Oracle数据库厂商对JDBC接口的实现：Oracle驱动
       >
       >   ```java
       >   public class OracleDriver implements JDBC{
       >       public void getConnection(){
       >       	System.out.println("与Oracle数据库连接建立成功，您正在操作Oracle数据库");
       >       }
       >   }
       >   ```
  
       > **接口的调用者**：要操作数据库的Java程序员（我们）
       >
       > ```java
       > public class Client{
       >     public static void main(String[] args){
       >         JDBC jdbc = new MySQLDriver();
       >         // 只需要面向接口编程即可，不需要关心具体的实现，不需要关心具体是哪个厂商的数据库
       >         jdbc.getConnection();
       >     }
       > }
       > ```
       >
       > 以上是操作MySQL数据库，如果要操作Oracle数据库的话，需要`new OracleDriver()`：
       >
       > ```java
       > public class Client{
       >     public static void main(String[] args){
       >         JDBC jdbc = new OracleDriver();
       >         // 只需要面向接口编程即可，不需要关心具体的实现，不需要关心具体是哪个厂商的数据库
       >         jdbc.getConnection();
       >     }
       > }
       > ```

       > 可能你会说，最终还是修改了java代码，不符合OCP原则呀，如果你想达到OCP，那可以将创建对象的任务交给反射机制，将类名配置到文件中，例如：
       >
       > 配置文件如下：（jdbc.properties）
       >
       > ```properties
       > driver=MySQLDriver
       > ```
       >
       > Java代码如下：
       >
       > ```java
       > import java.util.ResourceBundle;
       > 
       > public class Client{
       > public static void main(String[] args) throws Exception{
       >     String driverClassName = ResourceBundle.getBundle("jdbc").getString("driver");
       >         Class c = Class.forName(driverClassName);
       >         JDBC jdbc = (JDBC)c.newInstance();
       >         // 只需要面向接口编程即可，不需要关心具体的实现，不需要关心具体是哪个厂商的数据库
       >         jdbc.getConnection();
       >     }
       > }
       > ```
       >
       > 最终通过修改jdbc.properties配置文件即可做到数据库的切换。这样就完全做到了调用者和实现者的解耦合。调用者不需要关心实现者，实现者也不需要关心调用者。双方都是面向接口编程。这就是JDBC的本质：它就是一套接口。
  
  - #### 配置CLASSPATH
  
    > 经过上面内容的讲解，大家应该知道JDBC开发有三个角色的参与：
    >
    > - 我们（对数据库中数据进行增删改查的Java程序员）
    > - JDBC接口的制定者
    > - JDBC接口的实现者（驱动）
    >
    > 以上三者凑齐了我们才能进行JDBC的开发。它们三个都在哪里呢？“我们”就不用多说了，写操作数据库的代码就行了。JDBC接口在哪（接口的class文件在哪）？JDBC接口实现类在哪（驱动在哪）？
  
    1. ##### JDBC接口在哪：
  
       > JDBC接口在JDK中。对应的包是：**java.sql.\*;**
       >
       > ![image.png](./assets/1701939712048-f4487a29-3eb7-494f-b7c0-b72c6c0c03ad.webp)
       >
       > ![image.png](./assets/1701939824373-e1c98bbf-cc6a-44c0-95b6-d2c3a0ecbf52.webp)
  
    2. ##### 驱动在哪：
  
       > 驱动是JDBC接口的实现类，这些实现类是各大数据库厂家自己实现的，所以这些实现类的就需要去数据库厂商相关的网站上下载了。通常这些实现类被全部放到一个xxx.jar包中。
  
    3. ##### 如果使用文本编辑器开发：
  
       > 如果使用文本编辑器开发，不使用集成开发环境的话，以上的jar包就需要手动配置到环境变量CLASSPATH当中。
  
    4. ##### 如果使用IDEA工具开发：
  
       > 如果是采用集成开发工具，例如IDEA，就不需要手动配置CLASSPATH了，只需要将jar包放到IDEA中（实际上放到IDEA工具中的过程就是等同于在配置CLASSPATH）。具体操作这里不再赘述。
  
- ## JDBC的增删改

  - #### JDBC六步

    > JDBC编程的步骤是很固定的，通常包含以下六步：
    >
    > 1. 注册驱动
    >
    >    - 作用一：将 JDBC 驱动程序从硬盘上的文件系统中加载到内存中。
    >
    >    - 作用二：使得 DriverManager 可以通过一个统一的接口来管理该驱动程序的所有连接操作。
    >
    > 2. 获取（数据库）连接
    >
    >    - 获取java.sql.Connection对象，该对象的创建标志着mysql进程和jvm进程之间的通道打开了。
    >
    > 3. 获取（数据库）操作对象
    >
    >    - 获取java.sql.Statement对象，该对象负责将SQL语句发送给数据库，数据库负责执行该SQL语句。
    >
    > 4. 执行SQL语句
    >
    >    - 执行具体的SQL语句，例如：insert delete update select等。
    >
    > 5. 处理查询结果集
    >
    >    - 如果之前的操作是DQL查询语句，才会有处理查询结果集这一步。
    >
    >    - 执行DQL语句通常会返回查询结果集对象：java.sql.ResultSet。
    >
    >    - 对于ResultSet查询结果集来说，通常的操作是针对查询结果集进行结果集的遍历。
    >
    > 6. 释放资源
    >
    >    - 释放资源可以避免资源的浪费。在 JDBC 编程中，每次使用完 Connection、Statement、ResultSet 等资源后，都需要显式地调用对应的 close() 方法来释放资源，避免资源的浪费。
    >
    >    - 释放资源可以避免出现内存泄露问题。在 Java 中，当一个对象不再被引用时，会被 JVM 的垃圾回收机制进行回收。但是在 JDBC 编程中，如果不显式地释放资源，那么这些资源就不会被 JVM 的垃圾回收机制自动回收，从而导致内存泄露问题。

  - #### 数据库中准备数据

    > 1. 使用PowerDesigner设计用户表t_user。
    > 2. 使用Navicat for MySQL创建数据库，创建表，插入数据。

  - #### JDBC完成增/删/改

    1. ##### 注册驱动：

      > 注册驱动有两个作用：
      >
      > 1. 将 JDBC 驱动程序从硬盘上的文件系统中加载到内存。
      > 2. 让 DriverManager 可以通过一个统一的接口来管理该驱动程序的所有连接操作。
      >
      > ![image.png](./assets/1702375429683-7a25727f-4615-45f1-a56c-fd02eea60dd2.webp)

      ```java
      import java.sql.Driver;
      import java.sql.DriverManager;
      import java.sql.SQLException;
      
      public class JDBCTest01 {
          public static void main(String[] args){
              try {
                  // 1. 注册驱动
                  Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
                  DriverManager.registerDriver(driver); // 完成驱动注册
              } catch(SQLException e){
                  e.printStackTrace();
              }
          }
      }
      ```

      > **注意：注册驱动调用的是java.sql.DriverManager的registerDriver()方法。这些方法的使用要参阅JDK的API帮助文档。**
      >
      > **思考1：为什么以上代码中new的时候，后面类名要带上包名呢？**
      >
      > **思考2：以上代码中哪些是JDBC接口，哪些是JDBC接口的实现？**

    2. ##### 获取连接：

      > 获取java.sql.Connection对象，该对象的创建标志着mysql进程和jvm进程之间的通道打开了。
      >
      > ![image.png](./assets/1702375535525-fad3b7e2-b7f5-4079-a2e1-31c597ae8165.webp)

      ```java
      import java.sql.Driver;
      import java.sql.DriverManager;
      import java.sql.SQLException;
      import java.sql.Connection;
      
      public class JDBCTest01 {
          public static void main(String[] args){
              try {
                  // 1. 注册驱动
                  Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
                  DriverManager.registerDriver(driver); // 完成驱动注册
      
                  // 2. 获取连接
                  String url = "jdbc:mysql://localhost:3306/jdbc";
                  String user = "root";
                  String password = "123456";
                  Connection conn = DriverManager.getConnection(url, user, password);
      
                  System.out.println("连接对象：" + conn);
              } catch(SQLException e){
                  e.printStackTrace();
              }
          }
      }
      ```

      > 执行结果如下：
      >
      > ![image.png](./assets/1702372789612-ac3b38a8-6f6d-44f2-8024-ccab0bac9380.webp)
      >
      > 看到以上的输出结果，表示数据库已经连接成功了。
      >
      > 通过以上程序的输出结果得知：com.mysql.cj.jdbc.ConnectionImpl是java.sql.Connection接口的实现类，大家可以想象一下，如果换成Oracle数据库的话，这个实现类的类名是不是就会换一个呢？答案是肯定的。不过对于我们来说是不需要关心具体实现类的，因为后续的代码都是直接面向java.sql.Connection接口来调用方法的。面向接口编程在这里体现的淋漓尽致。确实降低了耦合度。
      >
      > 以上程序中演示了连接数据库需要提供三个信息：url，用户名，密码。其中用户名和密码容易理解。url是什么？

      ###### 什么是URL？

      > URL 是统一资源定位符 (Uniform Resource Locator) 的缩写，是互联网上标识、定位、访问资源的字符串。它可以用来指定互联网上各种类型的资源的位置，如网页、图片、视频等。
      >
      > URL 通常由协议、服务器名、服务器端口、路径和查询字符串组成。其中：
      >
      > - 协议是规定了访问资源所采用的通信协议，例如 HTTP、HTTPS、FTP 等；
      > - 服务器名是资源所在的服务器主机名或 IP 地址，可以是域名或 IP 地址；
      > - 服务器端口是资源所在的服务器的端口号；
      > - 路径是资源所在的服务器上的路径、文件名等信息；
      > - 查询字符串是向服务器提交的参数信息，用来定位更具体的资源。
      >
      > URL 在互联网中广泛应用，比如在浏览器中输入 URL 来访问网页或下载文件，在网站开发中使用 URL 来访问 API 接口或文件，在移动应用和桌面应用中使用 URL 来访问应用内部的页面或功能，在搜索引擎中使用 URL 来爬取网页内容等等。
      >
      > 总之，URL 是互联网上所有资源的唯一识别标识，是互联网通信的基础和核心技术之一。

      ###### JDBC连接MySQL时的URL格式：

      > JDBC URL 是在使用 JDBC 连接数据库时的一个 URL 字符串，它用来标识要连接的数据库的位置、认证信息和其他配置参数等。JDBC URL 的格式可以因数据库类型而异，但通常包括以下几个部分：
      >
      > - 协议：表示要使用的数据库管理系统（DBMS）的类型，如 `jdbc:mysql` 表示要使用 MySQL 数据库，`jdbc:postgresql` 表示要使用 PostgreSQL 数据库。
      > - 主机地址和端口号：表示要连接的数据库所在的服务器的 IP 地址或域名，以及数据库所在服务器监听的端口号。
      > - 数据库名称：表示要连接的数据库的名称。
      > - 其他可选参数：这些参数包括连接的超时时间、使用的字符集、连接池相关配置等。
      >
      > 例如，连接 MySQL 数据库的 JDBC URL 的格式一般如下：
      >
      > ```url
      > jdbc:mysql://<host>:<port>/<database_name>?<connection_parameters>
      > ```
      >
      > 其中：
      >
      > - `<host>` 是 MySQL 数据库服务器的主机名或 IP 地址；
      > - `<port>` 是 MySQL 服务器的端口号（默认为 3306）；
      > - `<database_name>` 是要连接的数据库名称；
      > - `<connection_parameters>` 包括连接的额外参数，例如用户名、密码、字符集等。
      >
      > JDBC URL 是连接数据库的关键，通过 JDBC URL，应用程序可以通过特定的 JDBC 驱动程序与数据库服务器进行通信，从而实现与数据库的交互。在开发 Web 应用和桌面应用时，使用 JDBC URL 可以轻松地连接和操作各种类型的数据库，例如 MySQL、PostgreSQL、Oracle 等。
      >
      > 以下是一个常见的JDBC MySQL URL：
      >
      > ```url
      > jdbc:mysql://localhost:3306/jdbc
      > ```
      >
      > - `jdbc:mysql://`是协议
      > - `localhost`表示连接本地主机的MySQL数据库，也可以写作`127.0.0.1`
      > - `3306`是MySQL数据库的端口号
      > - `jdbc`是数据库实例名

      ###### MySQL URL中的其它常用配置：

      > 在 JDBC MySQL URL 中，常用的配置参数有：

      - `serverTimezone`：MySQL 服务器时区，默认为 UTC，可以通过该参数来指定客户端和服务器的时区；

        > 在 JDBC URL 中设置 `serverTimezone` 的作用是指定数据库服务器的时区。这个时区信息会影响 JDBC 驱动在处理日期时间相关数据类型时如何将其映射到服务器上的日期时间值。
        >
        > 如果不设置 `serverTimezone`，则 JDBC 驱动程序默认将使用本地时区，也就是客户端机器上的系统时区，来处理日期时间数据。在这种情况下，如果服务器的时区和客户端机器的时区不同，那么处理日期时间数据时可能会出现问题，从而导致数据错误或不一致。
        >
        > 例如，假设服务器位于美国加州，而客户端位于中国上海，如果不设置 `serverTimezone` 参数，在客户端执行类似下面的查询：
        >
        > ```sql
        > SELECT * FROM orders WHERE order_date = '2022-11-11';
        > ```
        >
        > 由于客户端和服务器使用了不同的时区，默认使用的是客户端本地的时区，那么实际查询的时间就是客户端本地时间对应的时间，而不是服务器的时间。这可能会导致查询结果不正确，因为服务器上的时间可能是比客户端慢或者快了多个小时。
        >
        > 通过在 JDBC URL 中设置 `serverTimezone` 参数，可以明确告诉 JDBC 驱动程序使用哪个时区来处理日期时间值，从而避免这种问题。在上述例子中，如果把时区设置为 `America/Los_Angeles`（即加州的时区）：
        >
        > ```url
        > jdbc:mysql://localhost:3306/mydatabase?user=myusername&password=mypassword&serverTimezone=America/Los_Angeles
        > ```
        >
        > 那么上面的查询就会在数据库服务器上以加州的时间来执行，结果更加准确。

      - `useSSL`：是否使用 SSL 进行连接，默认为 true；

        > `useSSL` 参数用于配置是否使用 SSL（Secure Sockets Layer）安全传输协议来加密 JDBC 和 MySQL 数据库服务器之间的通信。其设置为 `true` 表示使用 SSL 连接，设置为 `false` 表示不使用 SSL 连接。其区别如下：
        >
        > 当设置为 `true` 时，JDBC 驱动程序将使用 SSL 加密协议来保障客户端和服务器之间的通信安全。这种方式下，所有数据都会使用 SSL 加密后再传输，可以有效防止数据在传输过程中被窃听、篡改等安全问题出现。当然，也要求服务器端必须支持 SSL，否则会连接失败。
        >
        > 当设置为 `false` 时，JDBC 驱动程序会以明文方式传输数据，这种方式下，虽然数据传输的速度会更快，但也会存在被恶意攻击者截获和窃听数据的风险。因此，在不安全的网络环境下，或是要求数据传输安全性较高的情况下，建议使用 SSL 加密连接。
        >
        > 需要注意的是，使用 SSL 连接会对系统资源和性能消耗有一定的影响，特别是当连接数较多时，对 CPU 和内存压力都比较大。因此，在性能和安全之间需要权衡，根据实际应用场景合理设置 `useSSL` 参数。

      - `useUnicode`：是否使用Unicode编码进行数据传输，默认是true启用；

        > `useUnicode`是 JDBC 驱动程序连接数据库时的一个参数，用于告诉驱动程序在传输数据时是否使用 Unicode 编码。Unicode 是计算机科学中的一种字符编码方案，可以用于表示全球各种语言中的字符，包括 ASCII 码、中文、日文、韩文等。因此，使用 Unicode 编码可以确保数据在传输过程中能够正确、完整地呈现各种语言的字符。
        >
        > 具体地说，如果设置 `useUnicode=true`，JDBC 驱动程序会在传输数据时使用 Unicode 编码。这意味着，无论数据源中使用的是什么编码方案，都会先将数据转换为 Unicode 编码进行传输，确保数据能够跨平台、跨数据库正确传输。当从数据库中获取数据时，驱动程序会根据 `characterEncoding` 参数指定的字符集编码将数据转换为指定编码格式，以便应用程序正确处理数据。
        >
        > 需要注意的是，如果设置 `useUnicode=false`，则表示使用当前平台默认的字符集进行数据传输。这可能会导致在跨平台或跨数据库时出现字符编码不一致的问题，因此通常建议在进行数据传输时启用 Unicode 编码。
        >
        > 综上所述，设置 `useUnicode` 参数可以确保数据在传输过程中正确呈现各种字符集编码。对于应用程序处理多语言环境数据的场景，启用 `useUnicode` 参数尤为重要。

      - `characterEncoding`：连接使用的字符编码，默认为 UTF-8；

        > `characterEncoding` 参数用于设置 MySQL 服务器和 JDBC 驱动程序之间进行字符集转换时使用的字符集编码。其设置为 `UTF-8` 表示使用 UTF-8 编码进行字符集转换，设置为 `GBK` 表示使用 GBK 编码进行字符集转换。其区别如下：
        >
        > UTF-8 编码是一种可变长度的编码方式，可以表示世界上的所有字符，包括 ASCII、Unicode 和不间断空格等字符，是一种通用的编码方式。UTF-8 编码在国际化应用中被广泛使用，并且其使用的字节数较少，有利于提高数据传输的效率和节约存储空间。
        >
        > GBK 编码是一种固定长度的编码方式，只能表示汉字和部分符号，不能表示世界上的所有字符。GBK 编码通常只用于中文环境中，因为在英文和数字等字符中会出现乱码情况。
        >
        > 因此，在 MySQL 中使用 `UTF-8` 编码作为字符集编码的优势在于能够支持世界上的所有字符，而且在国际化应用中使用广泛，对于不同语言和地区的用户都能够提供良好的支持。而使用 `GBK` 编码则主要在于适用于中文环境中的数据存储和传输。
        >
        > 需要注意的是，在选择编码方式时需要考虑到应用本身的实际需要和数据的特性，根据具体情况进行选择，避免出现字符集编码错误的问题。同时，还要确保 MySQL 服务器、JDBC 驱动程序和应用程序之间的字符集编码一致，避免出现字符集转换错误的问题。

      > **注意：useUnicode和characterEncoding有什么区别？**
      >
      > - **useUnicode设置的是数据在传输过程中是否使用Unicode编码方式。**
      > - **characterEncoding设置的是数据被传输到服务器之后，服务器采用哪一种字符集进行编码。**
      >
      > 例如，连接 MySQL 数据库的 JDBC URL 可以如下所示：
      >
      > ```url
      > jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8
      > ```
      >
      > 这里演示的是使用本地 MySQL 数据库，使用Unicode编码进行数据传输，服务器时区为 Asia/Shanghai，启用 SSL 连接，服务器接收到数据后使用 UTF-8 编码。

    3. ##### 获取操作对象：

      > 数据库操作对象是这个接口：java.sql.Statement。这个对象负责将SQL语句发送给数据库服务器，服务器接收到SQL后进行编译，然后执行SQL。
      >
      > ![image.png](./assets/1702441460073-15a0cb32-b979-442c-900b-ec3109722750.webp)

      ```java
      import java.sql.Driver;
      import java.sql.DriverManager;
      import java.sql.SQLException;
      import java.sql.Connection;
      import java.sql.Statement;
      
      public class JDBCTest01 {
          public static void main(String[] args){
              try {
                  // 1. 注册驱动
                  Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
                  DriverManager.registerDriver(driver); // 完成驱动注册
      
                  // 2. 获取连接
                  String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
                  String user = "root";
                  String password = "123456";
                  Connection conn = DriverManager.getConnection(url, user, password);
      
                  // 3. 获取数据库操作对象
                  Statement stmt = conn.createStatement();
                  System.out.println("数据库操作对象stmt = " + stmt);
      				// 通过一个Connection对象是可以创建多个Statement对象的：
                  Statement stmt2 = conn.createStatement();
                  System.out.println("数据库操作对象stmt2 = " + stmt2);
              } catch(SQLException e){
                  e.printStackTrace();
              }
          }
      }
      ```

      > 执行结果如下：
      >
      > ![image.png](./assets/1702441181097-76775506-0d8a-4c6b-a077-4feaf637c82a.webp)
      >
      > 同样可以看到：java.sql.Statement接口在MySQL驱动中的实现类是：com.mysql.cj.jdbc.StatementImpl。不过我们同样是不需要关心这个具体的实现类。因为后续的代码仍然是面向Statement接口写代码的。

    4. ##### 执行SQL：

      > 当获取到Statement对象后，调用这个接口中的相关方法即可执行SQL语句。
      >
      > ![image.png](./assets/1702441577751-223506b2-73c9-47ee-a614-4b95fe555df3.webp)
      >
      > - 该方法的参数是一个SQL语句，只要将insert语句传递过来即可。当执行executeUpdate(sql)方法时，JDBC会将sql语句发送给数据库服务器，数据库服务器对SQL语句进行编译，然后执行SQL。
      > - 该方法的返回值是int类型，返回值的含义是：影响了数据库表当中几条记录。例如：返回1表示1条数据插入成功，返回2表示2条数据插入成功，以此类推。如果一条也没有插入，则返回0。
      > - 该方法适合执行的SQL语句是DML，包括：insert delete update。

      ```java
      import java.sql.Driver;
      import java.sql.DriverManager;
      import java.sql.SQLException;
      import java.sql.Connection;
      import java.sql.Statement;
      
      public class JDBCTest01 {
          public static void main(String[] args){
              try {
                  // 1. 注册驱动
                  Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
                  DriverManager.registerDriver(driver); // 完成驱动注册
      
                  // 2. 获取连接
                  String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
                  String user = "root";
                  String password = "123456";
                  Connection conn = DriverManager.getConnection(url, user, password);
      
                  // 3. 获取数据库操作对象
                  Statement stmt = conn.createStatement();
      
                  // 4. 执行SQL语句
                  String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
                  int count = stmt.executeUpdate(sql);
                  System.out.println("插入了" + count + "条记录");
                  
              } catch(SQLException e){
                  e.printStackTrace();
              }
          }
      }
      ```

      > 执行结果如下：
      >
      > ![image.png](./assets/1702441948716-d8c4638f-5d7a-4d26-b3d0-a2ed4872e6a4.webp)
      >
      > ![image.png](./assets/1702441971625-ba842802-4881-48ab-a4f3-17acc229d9c2.webp)

    5. ##### 释放资源：

      > 第五步去哪里了？第五步是处理查询结果集，以上操作不是select语句，所以第五步直接跳过，直接先看一下第六步释放资源。【后面学习查询语句的时候，再详细看第五步】

      ###### 为什么要释放资源？

      > 在 JDBC 编程中，建立数据库连接、创建 Statement 对象等操作都需要申请系统资源，例如打开网络端口、申请内存等。为了避免占用过多的系统资源和避免出现内存泄漏等问题，我们需要在使用完资源后及时释放它们。

      ###### 释放资源的原则：

      1. 原则1：在finally语句块中释放

         > 建议在finally语句块中释放，因为程序执行过程中如果出现了异常，finally语句块中的代码是一定会执行的。也就是说：我们需要保证程序在执行过程中，不管是否出现了异常，最后的关闭是一定要执行的。当然了，也可以使用Java7的新特性：Try-with-resources。Try-with-resources 是 Java 7 引入的新特性。它简化了资源管理的代码实现，可以自动释放资源，减少了代码出错的可能性，同时也可以提供更好的代码可读性和可维护性。

      2. 原则2：释放有顺序

         > 从小到大依次释放，创建的时候，先创建Connection，再创建Statement。那么关闭的时候，先关闭Statement，再关闭Connection。

      3. 原则3：分别进行try...catch...

         > 关闭的时候调用close()方法，该方法有异常需要处理，建议分别对齐try...catch...进行异常捕获。如果只编写一个try...catch...进行一块捕获，在关闭过程中，如果某个关闭失败，会影响下一个资源的关闭。

      ###### 代码：

      ```java
      import java.sql.Driver;
      import java.sql.DriverManager;
      import java.sql.SQLException;
      import java.sql.Connection;
      import java.sql.Statement;
      
      public class JDBCTest01 {
          public static void main(String[] args){
              Connection conn = null;
              Statement stmt = null;
              try {
                  // 1. 注册驱动
                  Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
                  DriverManager.registerDriver(driver); // 完成驱动注册
      
                  // 2. 获取连接
                  String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
                  String user = "root";
                  String password = "123456";
                  conn = DriverManager.getConnection(url, user, password);
      
                  // 3. 获取数据库操作对象
                  stmt = conn.createStatement();
      
                  // 4. 执行SQL语句
                  String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
                  int count = stmt.executeUpdate(sql);
                  System.out.println("插入了" + count + "条记录");
                  
              } catch(SQLException e){
                  e.printStackTrace();
              } finally {
                  // 6. 释放资源
                  if(stmt != null){
                      try{
                          stmt.close();
                      }catch(SQLException e){
                          e.printStackTrace();
                      }
                  }
                  if(conn != null){
                      try{
                          conn.close();
                      }catch(SQLException e){
                          e.printStackTrace();
                      }
                  }
              }
          }
      }
      ```

  - #### 注册驱动的常用方式

    > 上面在注册驱动的时候，执行了这样的代码：
    >
    > ```java
    > java.sql.Driver driver = new com.mysql.cj.jdbc.Driver();
    > java.sql.DriverManager.registerDriver(driver);
    > ```
    >
    > 这种方式是自己new驱动对象，然后调用DriverManager的registerDriver()方法来完成驱动注册，还有另一种方式，并且这种方式是常用的：
    >
    > ```java
    > Class.forName("com.mysql.cj.jdbc.Driver");
    > ```
    >
    > 为什么这种方式常用？
    >
    > - 第一：代码少了很多。
    > - 第二：这种方式可以很方便的将`com.mysql.cj.jdbc.Driver`类名配置到属性文件当中。
    >
    > 实现原理是什么？找一下`com.mysql.cj.jdbc.Driver`的源码：
    >
    > ![image.png](./assets/1702447333885-23189b4e-5767-4dba-ae21-bdc543241db6.webp)
    >
    > 通过源码不难发现，在`com.mysql.cj.jdbc.Driver`类中有一个静态代码块，在这个静态代码块中调用了`java.sql.DriverManager.registerDriver(new Driver());`完成了驱动的注册。而`Class.forName("com.mysql.cj.jdbc.Driver");`代码的作用就是让`com.mysql.cj.jdbc.Driver`类完成加载，执行它的静态代码块。

  - #### JDBC4.0后不用手动注册驱动（了解）

    > 从JDBC 4.0（**也就是Java6**）版本开始，驱动的注册不需要再手动完成，系统会根据URL自动选择合适的驱动来完成。
    >
    > ```java
    > import java.sql.DriverManager;
    > import java.sql.SQLException;
    > import java.sql.Connection;
    > import java.sql.Statement;
    > 
    > public class JDBCTest03 {
    >     public static void main(String[] args){
    >         Connection conn = null;
    >         Statement stmt = null;
    >         try {
    >             // 2. 获取连接
    >             String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
    >             String user = "root";
    >             String password = "123456";
    >             conn = DriverManager.getConnection(url, user, password);
    > 
    >             // 3. 获取数据库操作对象
    >             stmt = conn.createStatement();
    > 
    >             // 4. 执行SQL语句
    >             String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
    >             int count = stmt.executeUpdate(sql);
    >             System.out.println("插入了" + count + "条记录");
    >             
    >         } catch(SQLException e){
    >             e.printStackTrace();
    >         } finally {
    >             // 6. 释放资源
    >             if(stmt != null){
    >                 try{
    >                     stmt.close();
    >                 }catch(SQLException e){
    >                     e.printStackTrace();
    >                 }
    >             }
    >             if(conn != null){
    >                 try{
    >                     conn.close();
    >                 }catch(SQLException e){
    >                     e.printStackTrace();
    >                 }
    >             }
    >         }
    >     }
    > }
    > ```
    >
    > **注意**：虽然大部分情况下不需要进行手动注册驱动了，但在实际的开发中有些数据库驱动程序不支持自动发现功能，仍然需要手动注册。所以建议大家还是别省略了。

  - #### 动态配置连接数据库的信息

    > 为了程序的通用性，为了切换数据库的时候不需要修改Java程序，为了符合OCP开闭原则，建议将连接数据库的信息配置到属性文件中，例如：
    >
    > ```properties
    > driver=com.mysql.cj.jdbc.Driver
    > url=jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8
    > user=root
    > password=123456
    > ```
    >
    > 然后使用IO流读取属性文件，动态获取连接数据库的信息：
    >
    > ```java
    > import java.sql.DriverManager;
    > import java.sql.SQLException;
    > import java.sql.Connection;
    > import java.sql.Statement;
    > import java.util.ResourceBundle;
    > 
    > public class JDBCTest04 {
    >     public static void main(String[] args){
    >         
    >     	// 通过以下代码获取属性文件中的配置信息
    > 		ResourceBundle bundle = ResourceBundle.getBundle("jdbc");
    > 		String driver = bundle.getString("driver");
    > 		String url = bundle.getString("url");
    > 		String user = bundle.getString("user");
    > 		String password = bundle.getString("password");
    > 
    >         Connection conn = null;
    >         Statement stmt = null;
    >         try {
    >             // 1. 注册驱动
    >             Class.forName(driver);
    > 
    >             // 2. 获取连接
    >             conn = DriverManager.getConnection(url, user, password);
    > 
    >             // 3. 获取数据库操作对象
    >             stmt = conn.createStatement();
    > 
    >             // 4. 执行SQL语句
    >             String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
    >             int count = stmt.executeUpdate(sql);
    >             System.out.println("插入了" + count + "条记录");
    >             
    >         } catch(SQLException | ClassNotFoundException e){
    >             e.printStackTrace();
    >         } finally {
    >             // 6. 释放资源
    >             if(stmt != null){
    >                 try{
    >                     stmt.close();
    >                 }catch(SQLException e){
    >                     e.printStackTrace();
    >                 }
    >             }
    >             if(conn != null){
    >                 try{
    >                     conn.close();
    >                 }catch(SQLException e){
    >                     e.printStackTrace();
    >                 }
    >             }
    >         }
    >     }
    > }
    > ```
    >
    > 以后要连接其他数据库，只要修改属性文件中的配置即可。

  - #### 获取连接的其他方式（了解）

    > 除了以上的这种方式之外，还有两种方式，通过API帮助文档可以看到：
    >
    > ![image.png](./assets/1702453145756-8174de75-a789-4030-b496-8b7fd700afb6.webp)

    - ##### `getConnection(String url)`：

      > 这种方式参数只有一个url，那用户名和密码放在哪里呢？可以放到url当中，代码如下：
      >
      > ```java
      > import java.sql.Driver;
      > import java.sql.DriverManager;
      > import java.sql.SQLException;
      > import java.sql.Connection;
      > 
      > public class JDBCTest05 {
      >     public static void main(String[] args){
      >         try {
      >             // 1. 注册驱动
      >             Class.forName("com.mysql.cj.jdbc.Driver");
      > 
      >             // 2. 获取连接
      >             String url = "jdbc:mysql://localhost:3306/jdbc?user=root&password=123456";
      >             Connection conn = DriverManager.getConnection(url);
      > 
      >             System.out.println("连接对象：" + conn);
      >         } catch(SQLException|ClassNotFoundException e){
      >             e.printStackTrace();
      >         }
      >     }
      > }
      > ```

    - ##### `getConnection(String url, Properties info)`：

      > 这种方式有两个参数，一个是url，一个是Properties对象。
      >
      > - url：可以单纯提供一个url地址
      > - info：可以将url的参数存放到该对象中
      >
      > ```java
      > import java.sql.Driver;
      > import java.sql.DriverManager;
      > import java.sql.SQLException;
      > import java.sql.Connection;
      > import java.util.Properties;
      > 
      > public class JDBCTest06 {
      >     public static void main(String[] args){
      >         try {
      >             // 1. 注册驱动
      >             Class.forName("com.mysql.cj.jdbc.Driver");
      > 
      >             // 2. 获取连接
      >             String url = "jdbc:mysql://localhost:3306/jdbc";
      >             
      >             Properties info = new Properties();
      >             info.setProperty("user", "root");
      >             info.setProperty("password", "123456");
      >             info.setProperty("useUnicode", "true");
      >             info.setProperty("serverTimezone", "Asia/Shanghai");
      >             info.setProperty("useSSL", "true");
      >             info.setProperty("characterEncoding", "utf-8");
      >             
      >             Connection conn = DriverManager.getConnection(url, info);
      > 
      >             System.out.println("连接对象：" + conn);
      >         } catch(SQLException|ClassNotFoundException e){
      >             e.printStackTrace();
      >         }
      >     }
      > }
      > ```

- ## JDBC的查询

- ## SQL注入

- ## JDBC事务

- ## JDBC调用存储过程

- ## JDBC实现员工管理

- ## DAO

- ## 连接池

  > 前面我们讲了Java程序要通过JDBC接口来查询数据库。JDBC是一套接口规范，它在哪呢？就在Java的标准库`java.sql`里放着，不过这里面大部分都是接口。接口并不能直接实例化，而是必须实例化对应的实现类，然后通过接口引用这个实例。那么问题来了：JDBC接口的实现类在哪？
  >
  > 因为JDBC接口并不知道我们要使用哪个数据库，所以，用哪个数据库，我们就去使用哪个数据库的“实现类”，我们把某个数据库实现了JDBC接口的jar包称为JDBC驱动。
  >
  > 因为我们选择了MySQL 8.x作为数据库，所以我们首先得找一个MySQL的JDBC驱动。所谓JDBC驱动，其实就是一个第三方jar包，我们直接添加一个Maven依赖就可以了：
  >
  > ```xml
  > <dependency>
  >        <groupId>mysql</groupId>
  >        <artifactId>mysql-connector-java</artifactId>
  >        <version>8.0.16</version>
  >        <scope>runtime</scope>
  > </dependency>
  > ```
  >
  > 注意到这里添加依赖的`scope`是`runtime`，因为编译Java程序并不需要MySQL的这个jar包，只有在运行期才需要使用。如果把`runtime`改成`compile`，虽然也能正常编译，但是在IDE里写程序的时候，会多出来一大堆类似`com.mysql.jdbc.Connection`这样的类，非常容易与Java标准库的JDBC接口混淆，所以坚决不要设置为`compile`。
  >
  > 有了驱动，我们还要确保MySQL在本机正常运行，并且还需要准备一点数据。这里我们用一个脚本创建数据库和表，然后插入一些数据：
  >
  > ```sql
  > -- 创建数据库learjdbc:
  > DROP DATABASE IF EXISTS learnjdbc;
  > CREATE DATABASE learnjdbc;
  > 
  > -- 创建登录用户learn/口令learnpassword
  > CREATE USER IF NOT EXISTS 'learn'@'%' IDENTIFIED BY 'learnpassword';
  > GRANT ALL PRIVILEGES ON learnjdbc.* TO learn@'%' WITH GRANT OPTION;
  > FLUSH PRIVILEGES;
  > 
  > -- 创建表students:
  > USE learnjdbc;
  > CREATE TABLE students (
  >       id BIGINT AUTO_INCREMENT NOT NULL,
  >       name VARCHAR(50) NOT NULL,
  >       gender TINYINT(1) NOT NULL,
  >       grade INT NOT NULL,
  >       score INT NOT NULL,
  >       PRIMARY KEY(id)
  > ) Engine=INNODB DEFAULT CHARSET=UTF8;
  > 
  > -- 插入初始数据:
  > INSERT INTO students (name, gender, grade, score) VALUES ('小明', 1, 1, 88);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小红', 1, 1, 95);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小军', 0, 1, 93);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小白', 0, 1, 100);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小牛', 1, 2, 96);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小兵', 1, 2, 99);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小强', 0, 2, 86);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小乔', 0, 2, 79);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小青', 1, 3, 85);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小王', 1, 3, 90);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小林', 0, 3, 91);
  > INSERT INTO students (name, gender, grade, score) VALUES ('小贝', 0, 3, 77);
  > ```
  >
  > 在控制台输入`mysql -u root -p`，输入`root`口令后以`root`身份，把上述SQL贴到控制台执行一遍就行。

  - ##### JDBC连接：

    > 使用JDBC时，我们先了解什么是Connection。Connection代表一个JDBC连接，它相当于Java程序到数据库的连接（Mysql传输层使用的网络协议也是TCP）。打开一个Connection时，需要准备URL、用户名和口令，才能成功连接到数据库。
    >
    > URL是由数据库厂商指定的格式，例如，MySQL的URL是：
    >
    > ```url
    > jdbc:mysql://<hostname>:<port>/<db>?key1=value1&key2=value2
    > ```
    >
    > 其中：JDBC连接Mysql使用的协议是`jdbc:mysql`，后面跟上数据库所在的主机地址（IP/PORT）及数据库名，最后是额外的查询参数。
    >
    > 假设数据库运行在本机`localhost`，端口使用标准的`3306`，数据库名称是`learnjdbc`，那么URL如下：
    >
    > ```url
    > jdbc:mysql://localhost:3306/learnjdbc?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    > ```
    >
    > 后面的两个参数表示不使用SSL加密，传输数据时使用UTF-8作为字符编码（注意MySQL的UTF-8是`utf8`）。
    >
    > 要获取数据库连接，使用如下代码：
    >
    > ```java
    > // JDBC连接的URL, 不同数据库有不同的格式:
    > String JDBC_URL = "jdbc:mysql://localhost:3306/test";
    > String JDBC_USER = "root";
    > String JDBC_PASSWORD = "password";
    > // 获取连接:
    > Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
    > // TODO: 访问数据库...
    > // 关闭连接:
    > conn.close();
    > ```
    >
    > 核心代码是`DriverManager`提供的静态方法`getConnection()`。`DriverManager`会自动扫描classpath，找到所有的JDBC驱动，然后根据我们传入的URL自动挑选一个合适的JDBC驱动。
    >
    > 因为JDBC连接是一种昂贵的资源，所以使用后要及时释放。使用`try (resource)`来自动释放JDBC连接是一个好方法：
    >
    > ```java
    > try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {...}
    > ```
    >

  - ##### JDBC查询：

    > 获取到JDBC连接后，下一步我们就可以查询数据库了。查询数据库分以下几步：
    >
    > 第一步，通过`Connection`提供的`createStatement()`方法创建一个`Statement`对象，用于执行一个查询；
    >
    > 第二步，执行`Statement`对象提供的`executeQuery("SELECT * FROM students")`并传入SQL语句，执行查询并获得返回的结果集，使用`ResultSet`来引用这个结果集；
    >
    > 第三步，反复调用`ResultSet`的`next()`方法并读取每一行结果。
    >
    > 完整查询代码如下：
    >
    > ```java
    > try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
    >     try (Statement stmt = conn.createStatement()) {
    >         try (ResultSet rs = stmt.executeQuery("SELECT id, grade, name, gender FROM students WHERE gender=1")) {
    >             while (rs.next()) {
    >                 long id = rs.getLong(1); // 注意：索引从1开始
    >                 long grade = rs.getLong(2);
    >                 String name = rs.getString(3);
    >                 int gender = rs.getInt(4);
    >             }
    >         }
    >     }
    > }
    > ```
    >
    > 注意要点：
    >
    > `Statement`和`ResultSet`都是需要关闭的资源，因此嵌套使用`try (resource)`确保及时关闭；
    >
    > `rs.next()`用于判断是否有下一行记录，如果有，将自动把当前行移动到下一行（一开始获得`ResultSet`时当前行不是第一行）；
    >
    > `ResultSet`获取列时，索引从`1`开始而不是`0`；
    >
    > 必须根据`SELECT`的列的对应位置来调用`getLong(1)`，`getString(2)`这些方法，否则对应位置的数据类型不对，将报错。

  - ##### SQL注入：

    > 使用`Statement`拼字符串非常容易引发SQL注入的问题，这是因为SQL参数往往是从方法参数传入的。
    >
    > 我们来看一个例子：假设用户登录的验证方法如下：
    >
    > ```java
    > User login(String name, String pass) {
    >  ...
    >  stmt.executeQuery("SELECT * FROM user WHERE login='" + name + "' AND pass='" + pass + "'");
    >  ...
    > }
    > ```
    >
    > 其中，参数`name`和`pass`通常都是Web页面输入后由程序接收到的。
    >
    > 如果用户的输入是程序期待的值，就可以拼出正确的SQL。例如：name = `"bob"`，pass = `"1234"`：
    >
    > ```sql
    > SELECT * FROM user WHERE login='bob' AND pass='1234'
    > ```
    >
    > 但是，如果用户的输入是一个精心构造的字符串，就可以拼出意想不到的SQL，这个SQL也是正确的，但它查询的条件不是程序设计的意图。例如：name = `"bob' OR pass="`, pass = `" OR pass='"`：
    >
    > ```sql
    > SELECT * FROM user WHERE login='bob' OR pass=' AND pass=' OR pass=''
    > ```
    >
    > 这个SQL语句执行的时候，根本不用判断口令是否正确，这样一来，登录就形同虚设。
    >
    > 要避免SQL注入攻击，一个办法是针对所有字符串参数进行转义，但是转义很麻烦，而且需要在任何使用SQL的地方增加转义代码。
    >
    > 还有一个办法就是使用`PreparedStatement`。使用`PreparedStatement`可以*完全避免SQL注入*的问题，因为`PreparedStatement`始终使用`?`作为占位符，并且把数据连同SQL本身传给数据库，这样可以保证每次传给数据库的SQL语句是相同的，只是占位符的数据不同，还能高效利用数据库本身对查询的缓存。上述登录SQL如果用`PreparedStatement`可以改写如下：
    >
    > ```java
    > User login(String name, String pass) {
    >  ...
    >  String sql = "SELECT * FROM user WHERE login=? AND pass=?";
    >  PreparedStatement ps = conn.prepareStatement(sql);
    >  ps.setObject(1, name);
    >  ps.setObject(2, pass);
    >  ...
    > }
    > ```
    >
    > 所以，`PreparedStatement`比`Statement`更安全，而且更快。
    >
    > 注意
    >
    > 使用Java对数据库进行操作时，必须使用PreparedStatement，严禁任何通过参数拼字符串的代码！
    >
    > 我们把上面使用`Statement`的代码改为使用`PreparedStatement`：
    >
    > ```java
    > try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
    >  try (PreparedStatement ps = conn.prepareStatement("SELECT id, grade, name, gender FROM students WHERE gender=? AND grade=?")) {
    >      ps.setObject(1, "M"); // 注意：索引从1开始
    >      ps.setObject(2, 3);
    >      try (ResultSet rs = ps.executeQuery()) {
    >          while (rs.next()) {
    >              long id = rs.getLong("id");
    >              long grade = rs.getLong("grade");
    >              String name = rs.getString("name");
    >              String gender = rs.getString("gender");
    >          }
    >      }
    >  }
    > }
    > ```
    >
    > 使用`PreparedStatement`和`Statement`稍有不同，必须首先调用`setObject()`设置每个占位符`?`的值，最后获取的仍然是`ResultSet`对象。
    >
    > 另外注意到从结果集读取列时，使用`String`类型的列名比索引要易读，而且不易出错。
    >
    > 注意到JDBC查询的返回值总是`ResultSet`，即使我们写这样的聚合查询`SELECT SUM(score) FROM ...`，也需要按结果集读取：
    >
    > ```java
    > ResultSet rs = ...
    > if (rs.next()) {
    > 	double sum = rs.getDouble(1);
    > }
    > ```
    >

  - ##### 数据类型：

    > 有的童鞋可能注意到了，使用JDBC的时候，我们需要在Java数据类型和SQL数据类型之间进行转换。JDBC在`java.sql.Types`定义了一组常量来表示如何映射SQL数据类型，但是平时我们使用的类型通常也就以下几种：
    >
    > | SQL数据类型   | Java数据类型             |
    > | ------------- | ------------------------ |
    > | BIT, BOOL     | boolean                  |
    > | INTEGER       | int                      |
    > | BIGINT        | long                     |
    > | REAL          | float                    |
    > | FLOAT, DOUBLE | double                   |
    > | CHAR, VARCHAR | String                   |
    > | DECIMAL       | BigDecimal               |
    > | DATE          | java.sql.Date, LocalDate |
    > | TIME          | java.sql.Time, LocalTime |
    >
    > 注意：只有最新的JDBC驱动才支持`LocalDate`和`LocalTime`。

  > JDBC接口的`Connection`代表一个JDBC连接；
  >
  > 使用JDBC查询时，总是使用`PreparedStatement`进行查询而不是`Statement`；
  >
  > 查询结果总是`ResultSet`，即使使用聚合查询也不例外。

- ### JDBC更新

  > 数据库操作总结起来就四个字：增删改查，行话叫CRUD：Create，Retrieve，Update和Delete。
  >
  > 查就是查询，我们已经讲过了，就是使用`PreparedStatement`进行各种`SELECT`，然后处理结果集。现在我们来看看如何使用JDBC进行增删改。
  >
  > ### 插入
  >
  > 插入操作是`INSERT`，即插入一条新记录。通过JDBC进行插入，本质上也是用`PreparedStatement`执行一条SQL语句，不过最后执行的不是`executeQuery()`，而是`executeUpdate()`。示例代码如下：
  >
  > ```java
  > try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
  >     try (PreparedStatement ps = conn.prepareStatement(
  >             "INSERT INTO students (id, grade, name, gender) VALUES (?,?,?,?)")) {
  >         ps.setObject(1, 999); // 注意：索引从1开始
  >         ps.setObject(2, 1); // grade
  >         ps.setObject(3, "Bob"); // name
  >         ps.setObject(4, "M"); // gender
  >         int n = ps.executeUpdate(); // 1
  >     }
  > }
  > ```
  >
  > 
  >
  > 设置参数与查询是一样的，有几个`?`占位符就必须设置对应的参数。虽然`Statement`也可以执行插入操作，但我们仍然要严格遵循*绝不能手动拼SQL字符串*的原则，以避免安全漏洞。
  >
  > 当成功执行`executeUpdate()`后，返回值是`int`，表示插入的记录数量。此处总是`1`，因为只插入了一条记录。
  >
  > ### 插入并获取主键
  >
  > 如果数据库的表设置了自增主键，那么在执行`INSERT`语句时，并不需要指定主键，数据库会自动分配主键。对于使用自增主键的程序，有个额外的步骤，就是如何获取插入后的自增主键的值。
  >
  > 要获取自增主键，不能先插入，再查询。因为两条SQL执行期间可能有别的程序也插入了同一个表。获取自增主键的正确写法是在创建`PreparedStatement`的时候，指定一个`RETURN_GENERATED_KEYS`标志位，表示JDBC驱动必须返回插入的自增主键。示例代码如下：
  >
  > ```java
  > try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
  >     try (PreparedStatement ps = conn.prepareStatement(
  >             "INSERT INTO students (grade, name, gender) VALUES (?,?,?)",
  >             Statement.RETURN_GENERATED_KEYS)) {
  >         ps.setObject(1, 1); // grade
  >         ps.setObject(2, "Bob"); // name
  >         ps.setObject(3, "M"); // gender
  >         int n = ps.executeUpdate(); // 1
  >         try (ResultSet rs = ps.getGeneratedKeys()) {
  >             if (rs.next()) {
  >                 long id = rs.getLong(1); // 注意：索引从1开始
  >             }
  >         }
  >     }
  > }
  > ```
  >
  > 
  >
  > 观察上述代码，有两点注意事项：
  >
  > 一是调用`prepareStatement()`时，第二个参数必须传入常量`Statement.RETURN_GENERATED_KEYS`，否则JDBC驱动不会返回自增主键；
  >
  > 二是执行`executeUpdate()`方法后，必须调用`getGeneratedKeys()`获取一个`ResultSet`对象，这个对象包含了数据库自动生成的主键的值，读取该对象的每一行来获取自增主键的值。如果一次插入多条记录，那么这个`ResultSet`对象就会有多行返回值。如果插入时有多列自增，那么`ResultSet`对象的每一行都会对应多个自增值（自增列不一定必须是主键）。
  >
  > ### 更新
  >
  > 更新操作是`UPDATE`语句，它可以一次更新若干列的记录。更新操作和插入操作在JDBC代码的层面上实际上没有区别，除了SQL语句不同：
  >
  > ```java
  > try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
  >     try (PreparedStatement ps = conn.prepareStatement("UPDATE students SET name=? WHERE id=?")) {
  >         ps.setObject(1, "Bob"); // 注意：索引从1开始
  >         ps.setObject(2, 999);
  >         int n = ps.executeUpdate(); // 返回更新的行数
  >     }
  > }
  > ```
  >
  > 
  >
  > `executeUpdate()`返回数据库实际更新的行数。返回结果可能是正数，也可能是0（表示没有任何记录更新）。
  >
  > ### 删除
  >
  > 删除操作是`DELETE`语句，它可以一次删除若干行。和更新一样，除了SQL语句不同外，JDBC代码都是相同的：
  >
  > ```java
  > try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
  >     try (PreparedStatement ps = conn.prepareStatement("DELETE FROM students WHERE id=?")) {
  >         ps.setObject(1, 999); // 注意：索引从1开始
  >         int n = ps.executeUpdate(); // 删除的行数
  >     }
  > }
  > ```
  >
  > 
  >
  > ### 练习
  >
  > 使用JDBC更新数据库。
  >
  > [下载练习](https://liaoxuefeng.com/books/java/jdbc/update/jdbc-update.zip)
  >
  > ### 小结
  >
  > 使用JDBC执行`INSERT`、`UPDATE`和`DELETE`都可视为更新操作；
  >
  > 更新操作使用`PreparedStatement`的`executeUpdate()`进行，返回受影响的行数。

- ### JDBC事务

  > 数据库事务（Transaction）是由若干个SQL语句构成的一个操作序列，有点类似于Java的`synchronized`同步。数据库系统保证在一个事务中的所有SQL要么全部执行成功，要么全部不执行，即数据库事务具有ACID特性：
  >
  > - Atomicity：原子性
  > - Consistency：一致性
  > - Isolation：隔离性
  > - Durability：持久性
  >
  > 数据库事务可以并发执行，而数据库系统从效率考虑，对事务定义了不同的隔离级别。SQL标准定义了4种隔离级别，分别对应可能出现的数据不一致的情况：
  >
  > | Isolation Level  | 脏读（Dirty Read） | 不可重复读（Non Repeatable Read） | 幻读（Phantom Read） |
  > | ---------------- | ------------------ | --------------------------------- | -------------------- |
  > | Read Uncommitted | Yes                | Yes                               | Yes                  |
  > | Read Committed   | -                  | Yes                               | Yes                  |
  > | Repeatable Read  | -                  | -                                 | Yes                  |
  > | Serializable     | -                  | -                                 | -                    |
  >
  > 对应用程序来说，数据库事务非常重要，很多运行着关键任务的应用程序，都必须依赖数据库事务保证程序的结果正常。
  >
  > 举个例子：假设小明准备给小红支付100，两人在数据库中的记录主键分别是`123`和`456`，那么用两条SQL语句操作如下：
  >
  > ```sql
  > UPDATE accounts SET balance = balance - 100 WHERE id = 123 AND balance >= 100;
  > UPDATE accounts SET balance = balance + 100 WHERE id = 456;
  > ```
  >
  > 
  >
  > 这两条语句必须以事务方式执行才能保证业务的正确性，因为一旦第一条SQL执行成功而第二条SQL失败的话，系统的钱就会凭空减少100，而有了事务，要么这笔转账成功，要么转账失败，双方账户的钱都不变。
  >
  > 这里我们不讨论详细的SQL事务，如果对SQL事务不熟悉，请参考[SQL事务](https://liaoxuefeng.com/books/sql/transaction/index.html)。
  >
  > 要在JDBC中执行事务，本质上就是如何把多条SQL包裹在一个数据库事务中执行。我们来看JDBC的事务代码：
  >
  > ```java
  > Connection conn = openConnection();
  > try {
  >     // 关闭自动提交:
  >     conn.setAutoCommit(false);
  >     // 执行多条SQL语句:
  >     insert(); update(); delete();
  >     // 提交事务:
  >     conn.commit();
  > } catch (SQLException e) {
  >     // 回滚事务:
  >     conn.rollback();
  > } finally {
  >     conn.setAutoCommit(true);
  >     conn.close();
  > }
  > ```
  >
  > 
  >
  > 其中，开启事务的关键代码是`conn.setAutoCommit(false)`，表示关闭自动提交。提交事务的代码在执行完指定的若干条SQL语句后，调用`conn.commit()`。要注意事务不是总能成功，如果事务提交失败，会抛出SQL异常（也可能在执行SQL语句的时候就抛出了），此时我们必须捕获并调用`conn.rollback()`回滚事务。最后，在`finally`中通过`conn.setAutoCommit(true)`把`Connection`对象的状态恢复到初始值。
  >
  > 实际上，默认情况下，我们获取到`Connection`连接后，总是处于“自动提交”模式，也就是每执行一条SQL都是作为事务自动执行的，这也是为什么前面几节我们的更新操作总能成功的原因：因为默认有这种“隐式事务”。只要关闭了`Connection`的`autoCommit`，那么就可以在一个事务中执行多条语句，事务以`commit()`方法结束。
  >
  > 如果要设定事务的隔离级别，可以使用如下代码：
  >
  > ```java
  > // 设定隔离级别为READ COMMITTED:
  > conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
  > ```
  >
  > 
  >
  > 如果没有调用上述方法，那么会使用数据库的默认隔离级别。MySQL的默认隔离级别是`REPEATABLE_READ`。
  >
  > ### 练习
  >
  > 使用数据库事务。
  >
  > [下载练习](https://liaoxuefeng.com/books/java/jdbc/tx/jdbc-transaction.zip)
  >
  > ### 小结
  >
  > 数据库事务（Transaction）具有ACID特性：
  >
  > - Atomicity：原子性
  > - Consistency：一致性
  > - Isolation：隔离性
  > - Durability：持久性
  >
  > JDBC提供了事务的支持，使用Connection可以开启、提交或回滚事务。

- ### JDBC批处理

  > 使用JDBC操作数据库的时候，经常会执行一些批量操作。
  >
  > 例如，一次性给会员增加可用优惠券若干，我们可以执行以下SQL代码：
  >
  > ```sql
  > INSERT INTO coupons (user_id, type, expires) VALUES (123, 'DISCOUNT', '2030-12-31');
  > INSERT INTO coupons (user_id, type, expires) VALUES (234, 'DISCOUNT', '2030-12-31');
  > INSERT INTO coupons (user_id, type, expires) VALUES (345, 'DISCOUNT', '2030-12-31');
  > INSERT INTO coupons (user_id, type, expires) VALUES (456, 'DISCOUNT', '2030-12-31');
  > ...
  > ```
  >
  > 
  >
  > 实际上执行JDBC时，因为只有占位符参数不同，所以SQL实际上是一样的：
  >
  > ```java
  > for (var params : paramsList) {
  >     PreparedStatement ps = conn.preparedStatement("INSERT INTO coupons (user_id, type, expires) VALUES (?,?,?)");
  >     ps.setLong(params.get(0));
  >     ps.setString(params.get(1));
  >     ps.setString(params.get(2));
  >     ps.executeUpdate();
  > }
  > ```
  >
  > 
  >
  > 类似的还有，给每个员工薪水增加10%～30%：
  >
  > ```sql
  > UPDATE employees SET salary = salary * ? WHERE id = ?
  > ```
  >
  > 
  >
  > 通过一个循环来执行每个`PreparedStatement`虽然可行，但是性能很低。SQL数据库对SQL语句相同，但只有参数不同的若干语句可以作为batch执行，即批量执行，这种操作有特别优化，速度远远快于循环执行每个SQL。
  >
  > 在JDBC代码中，我们可以利用SQL数据库的这一特性，把同一个SQL但参数不同的若干次操作合并为一个batch执行。我们以批量插入为例，示例代码如下：
  >
  > ```java
  > try (PreparedStatement ps = conn.prepareStatement("INSERT INTO students (name, gender, grade, score) VALUES (?, ?, ?, ?)")) {
  >     // 对同一个PreparedStatement反复设置参数并调用addBatch():
  >     for (Student s : students) {
  >         ps.setString(1, s.name);
  >         ps.setBoolean(2, s.gender);
  >         ps.setInt(3, s.grade);
  >         ps.setInt(4, s.score);
  >         ps.addBatch(); // 添加到batch
  >     }
  >     // 执行batch:
  >     int[] ns = ps.executeBatch();
  >     for (int n : ns) {
  >         System.out.println(n + " inserted."); // batch中每个SQL执行的结果数量
  >     }
  > }
  > ```
  >
  > 
  >
  > 执行batch和执行一个SQL不同点在于，需要对同一个`PreparedStatement`反复设置参数并调用`addBatch()`，这样就相当于给一个SQL加上了多组参数，相当于变成了“多行”SQL。
  >
  > 第二个不同点是调用的不是`executeUpdate()`，而是`executeBatch()`，因为我们设置了多组参数，相应地，返回结果也是多个`int`值，因此返回类型是`int[]`，循环`int[]`数组即可获取每组参数执行后影响的结果数量。
  >
  > ### 练习
  >
  > 使用Batch操作。
  >
  > [下载练习](https://liaoxuefeng.com/books/java/jdbc/batch/jdbc-batch.zip)
  >
  > ### 小结
  >
  > 使用JDBC的batch操作会大大提高执行效率，对内容相同，参数不同的SQL，要优先考虑batch操作。

- ### JDBC连接池

  > 我们在讲多线程的时候说过，创建线程是一个昂贵的操作，如果有大量的小任务需要执行，并且频繁地创建和销毁线程，实际上会消耗大量的系统资源，往往创建和消耗线程所耗费的时间比执行任务的时间还长，所以，为了提高效率，可以用线程池。
  >
  > 类似的，在执行JDBC的增删改查的操作时，如果每一次操作都来一次打开连接，操作，关闭连接，那么创建和销毁JDBC连接的开销就太大了。为了避免频繁地创建和销毁JDBC连接，我们可以通过连接池（Connection Pool）复用已经创建好的连接。
  >
  > JDBC连接池有一个标准的接口`javax.sql.DataSource`，注意这个类位于Java标准库中，但仅仅是接口。要使用JDBC连接池，我们必须选择一个JDBC连接池的实现。常用的JDBC连接池有：
  >
  > - HikariCP
  > - C3P0
  > - BoneCP
  > - Druid
  >
  > 目前使用最广泛的是HikariCP。我们以HikariCP为例，要使用JDBC连接池，先添加HikariCP的依赖如下：
  >
  > - com.zaxxer:HikariCP:2.7.1
  >
  > 紧接着，我们需要创建一个`DataSource`实例，这个实例就是连接池：
  >
  > ```java
  > HikariConfig config = new HikariConfig();
  > config.setJdbcUrl("jdbc:mysql://localhost:3306/test");
  > config.setUsername("root");
  > config.setPassword("password");
  > config.addDataSourceProperty("connectionTimeout", "1000"); // 连接超时：1秒
  > config.addDataSourceProperty("idleTimeout", "60000"); // 空闲超时：60秒
  > config.addDataSourceProperty("maximumPoolSize", "10"); // 最大连接数：10
  > DataSource ds = new HikariDataSource(config);
  > ```
  >
  > 
  >
  > 注意创建`DataSource`也是一个非常昂贵的操作，所以通常`DataSource`实例总是作为一个全局变量存储，并贯穿整个应用程序的生命周期。
  >
  > 有了连接池以后，我们如何使用它呢？和前面的代码类似，只是获取`Connection`时，把`DriverManage.getConnection()`改为`ds.getConnection()`：
  >
  > ```java
  > try (Connection conn = ds.getConnection()) { // 在此获取连接
  >     ...
  > } // 在此“关闭”连接
  > ```
  >
  > 
  >
  > 通过连接池获取连接时，并不需要指定JDBC的相关URL、用户名、口令等信息，因为这些信息已经存储在连接池内部了（创建`HikariDataSource`时传入的`HikariConfig`持有这些信息）。一开始，连接池内部并没有连接，所以，第一次调用`ds.getConnection()`，会迫使连接池内部先创建一个`Connection`，再返回给客户端使用。当我们调用`conn.close()`方法时（`在try(resource){...}`结束处），不是真正“关闭”连接，而是释放到连接池中，以便下次获取连接时能直接返回。
  >
  > 因此，连接池内部维护了若干个`Connection`实例，如果调用`ds.getConnection()`，就选择一个空闲连接，并标记它为“正在使用”然后返回，如果对`Connection`调用`close()`，那么就把连接再次标记为“空闲”从而等待下次调用。这样一来，我们就通过连接池维护了少量连接，但可以频繁地执行大量的SQL语句。
  >
  > 通常连接池提供了大量的参数可以配置，例如，维护的最小、最大活动连接数，指定一个连接在空闲一段时间后自动关闭等，需要根据应用程序的负载合理地配置这些参数。此外，大多数连接池都提供了详细的实时状态以便进行监控。
  >
  > ### 练习
  >
  > 使用JDBC连接池。
  >
  > [下载练习](https://liaoxuefeng.com/books/java/jdbc/pool/jdbc-pool.zip)
  >
  > ### 小结
  >
  > 数据库连接池是一种复用`Connection`的组件，它可以避免反复创建新连接，提高JDBC代码的运行效率；
  >
  > 可以配置连接池的详细参数并监控连接池。



