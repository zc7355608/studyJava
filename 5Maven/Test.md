```txt
================================================maven基础=====================================================================
（看工程javaweb下的模块mvn1）

# 传统开发项目的问题（没有使用maven）：
	*很多模块，模块之间有父子或依赖关系，手工管理关系比较费劲；
	*各个第三方的jar包之间相互依赖，a依赖b，使用a之前还得先引入b；各个依赖之间的版本也需要兼容，自己手动加及其浪费时间且容易出错；
	*编译测试打包部署我们自己做很麻烦；

# 什么是maven？
		maven就是一个项目的管理工具，它将项目开发和管理过程抽象成一个“项目对象模型”POM（Project Object Model），这个模型由maven来做，
	项目模型信息通过程序员给定的pom.xml文件，每个项目的pom文件就代表了不同的项目对象模型POM，通过这个POM模型maven就可以帮我们来做Java
	项目的构建和依赖管理，极大地减少了我们的工作量，maven就是Java写的；
		maven有两大功能：项目构建和依赖管理；依赖管理就是我们用到的jar包，我们配置以下它就帮我们自己去仓库里找资源了，不需要我们配置classpath
	或添加编译时的依赖了；项目构建是测试、打包、部署、编译、运行等一系列构建项目相关的操作，它都帮我们做了，这些构建项目相关的功能是由一些插件程序来做的，
	我们直接通过命令使用即可非常方便；
		不仅如此，它提供了一个统一的、标准的，项目结构目录；以前我们得根据使用的开发工具，eclipse或idea提供的项目目录，项目部署运行很不方便，
	即使JavaWeb约定了项目上线时的目录，但不同编译器上项目的源代码目录结构还是不同；现在我们的maven将项目源码的目录结构进行了统一，这个很棒；

# maven的安装：（http://maven.apache.org/）
	将下载的压缩包解压即安装；
	如果要在cmd中运行，需要配置MAVEN_HOME；由于maven是Java写的，所以也需要JAVA_HOME环境变量的支撑；然后在cmd中输入“mvn -v”测试是否成功；
		（后期我们用idea操作maven，所以也可以不配置）
	maven的安装目录：
		bin：存放maven的核心运行程序文件，包括清理、编译、测试、打包等工具的启动程序都在这里存放；
		boot：这里存放maven的类加载器；maven帮我们管理依赖，所以它有自己的类加载器去帮我们加载Java类，我们不需要自己配置classpath去使用jdk的类加载器；
		conf：配置文件目录；settings.xml是maven的核心配置文件，logging是日志目录；
		lib：maven运行所需要的jar包依赖；

------------------------------------------
maven的核心概念：
	1、仓库：仓库中存放了大量jar包，我们项目中需要的所有jar包，都会通过pom文件去指定jar包位置，然后maven自动去仓库中加载jar包来用，共分为为3种：
		*本地仓库：pom中指定jar的包，maven会先到本地计算机中的本地仓库中去找，没有的话再去私服中找，还没有就去中央仓库找；只要找到就下载到本地/私服；
		*私服仓库：它是公司范围内存储资源的仓库，在公司的局域网内部；如果你的项目/模块做完了，希望别人用，也可以安装/上传到私服中；并且可以保护
				公司内部具有版权或购买的私有项目jar包；
		*中央仓库：它由maven团队维护，里面存放了世界上99%的jar包，所有开源的jar包都在中央仓库中存放，这些都是全世界共享的；以后开发，
			开源的jar包可以不去官网找了，直接去maven中央仓库网站上下载就行；（中央仓库地址：https://mvnrepository.com）

	2、坐标：它是标识资源在仓库的唯一位置的，是maven找依赖的地方；坐标由3部分顺序组成：
			组织id（groupId）：通常由【com.公司名.业务线.子业务线】最多4层构成，每一层都是一个目录，如org.mybatis就是2层目录；
			项目名（artifactId）：通常由【产品线名-模块名】组成，它是一层目录，如junit
			项目版本（version）：通常由【主版本号.次版本号.修订版本号】组成，它是一层目录，如1.1.0-SNAPSHOT；
							如果该项目还在开发中，是不稳定版本，通常在版本号后带【-SNAPSHOT】快照的意思；【RELEASE】是正式发布版本）
			（了解）打包方式（packaging）：这个项目最终是以jar还是war包形式打包，默认是jar包，包名通常是【artifactId-version.war/jar】

本地仓库的位置：只要命令行执行了mvn，那么本地仓库文件夹就会在计算机中创建好，不配置的话默认在C:\Users\用户名\.m2\repository这就是仓库的根目录；
	但是这个位置在c盘中，以后这个仓库会越来越庞大，我想改位置不希望在c盘，怎么自定义仓库位置呢，需要在maven的配置文件settings.xml中配置；
	找到注释中的：<localRepository>/path/to/local/repo</localRepository>给它拿出来配置即可；

中央仓库的位置：在maven的lib中用压缩软件随便打开一个jar包，然后返回上一级查找“pom*.*”，找到“pom-4.0.0.xml”，定位过去打开，里面配置了中央仓库地址：
	<url>https://repo.maven.apache.org/maven2</url>
	我们如果每次找文件去这个国外服务器就很慢，所以我们需要配置一个中央仓库的国内镜像地址，这里用阿里云镜像，以后找东西去镜像服务器找更快；
	配置镜像服务器地址：在settings.xml中进行配置，在其中找到<mirrors>标签，里面加上：
---------------------
<mirror>
	<!-- 镜像名称 -->
	<id>nexus-aliyun</id>
	<!-- 镜像谁 -->
	<mirrorOf>central</mirrorOf>
	<!-- 名称不重要 -->
	<name>Nexus aliyun</name>
	<!-- 阿里云镜像地址 -->
	<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
</mirror>
<!-- 备选镜像，也是可以通过 url 去查找确定一下，该镜像是否含有你想要的包，它比 spring-libs-milestone 快  -->
<mirror>
    <id>central-repository</id>
    <mirrorOf>*</mirrorOf>
    <name>Central Repository</name>
    <url>http://central.maven.org/maven2/</url>
</mirror>
---------------------

（全局settings和局部settings：如果其他用户登录上此电脑，不想用刚刚的设置，可以在repository同级目录中新建一个settings.xml然后进行配置，
	这是该用户自己的局部settings，换用户登录就不起作用了；如果局部和全局不同，局部会覆盖windows全局的配置）

高版本的jdk还得在配置文件中配置jdk版本，找到profiles环境标签内部添加：（后面再说环境标签<profile>）
---------------------
<profile>
	<id>jdk17</id>
	<activation>
		<activeByDefault>true</activeByDefault>
		<jdk>17</jdk>
	</activation>
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<maven.compiler.source>17</maven.compiler.source>
		<maven.compiler.target>17</maven.compiler.target>
		<maven.compiler.compilerVersion>17</maven.compiler.compilerVersion>
	</properties>
</profile>
---------------------

这里用的maven-3.8.4版本，它默认使用的插件版本太低，我们给它插件版本设置高一点：到
	【apache-maven-3.8.4\lib\maven-core-3.8.4.jar\META-INF\plexus\components.xml】目录中将默认的插件版本改成最新的；
	https://maven.apache.org/plugins/index.html中有插件的版本；
	插件在本地仓库的【org.apache.maven.plugins】里面

===========================手工使用maven=============================================================================

# maven项目的目录结构：在工程的src类路径下进行maven项目结构的搭建：（用nova.rar就行）
---------------------------------------------------
xx项目目录
	--src
		--main（主程序目录）
			--java（主程序代码，这就是类路径了）
			--resources（主程序的配置文件，这也是类路径）
		--test（测试程序目录）
			--java（测试程序）
			--resources（测试程序的配置文件）
	--pom.xml（重要：maven工程的核心文件，没有它就不是maven工程，它和项目中的src平级）
-----暂时pom中这样写：
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

	<!-- maven的POM模型对象的版本，对于maven2.x和maven3.x来说，它只能是4.0.0版本 -->
	<modelVersion>4.0.0</modelVersion>
	
	<!-- 自己项目的坐标，这些只决定，将来只决定将来安装在仓库中的目录结构；-->
	<groupId>com.itheima</groupId><!-- java目录下的源代码的包结构通常和groupId结构保持一致，不一致也没事 -->
	<artifactId>nova</artifactId><!-- 工程名通常和我们建的maven模块的模块名保持一致，不一致也没事 -->
	<version>1.1.0-SNAPSHOT</version>
	<packaging>war</packaging>
	
	<!-- 项目的依赖 -->
	<dependencies>
		<dependency>
			<!-- 别人项目的坐标 -->
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>8.5.10</version>
			<!-- 依赖的生效范围，后面再说 -->
			<scope>compile</scope>
		</dependency>
		...
	</dependencies>
</project>
---------------------------------------------------然后在项目中写个主程序和测试程序，再进行maven的构建

#  <!--手动激活profiles的列表，按照profile被应用的顺序定义activeProfile。 该元素包含了一组activeProfile元素，每个activeProfile都含有一个profile id。任何在activeProfile中定义的profile id，不论环境设置如何，其对应的        profile都会被激活。如果没有匹配的profile，则什么都不会发生。例如，env-test是一个activeProfile，则在pom.xml（或者profile.xml）中对应id的profile会被激活。如果运行过程中找不到这样一个profile，Maven则会像往常一样运行。 -->   <activeProfiles>    <activeProfile>env-test</activeProfile>   </activeProfiles></settings>XML
	刚开始maven仓库是空的，执行这些命令时就会下载maven命令需要的插件jar包和项目需要的依赖jar包到本地仓库中；
		mvn clean：清理；把之前项目编译的东西都删除掉，为新的编译代码做准备，也就是删掉target目录；
		mvn compile：编译主程序；将主程序源代码编译为可执行代码，放在target/classes目录下；
		mvn test-compile：编译测试程序；
		mvn test：测试；用测试代码对主程序进行测试，其中测试的字节码放在target/test-classes目录下；测试结果在surefire-reports目录中；
		mvn package：打包；将项目主程序进行打包（jar/war），放到target目录的压缩文件中；
		mvn install：安装；将生成的jar/war文件安装到“本地仓库”；
		mvn deploy：部署；只将jar/war部署maven“私服”上，这里的部署并不是将war放在tomcat中；（后面再说）
		（下面的执行了对应上面的某些阶段也会自动执行）
	我们执行mvn compile后等待，出现【BUILD SUCCESS】就说明ok了；成功后我们发现，pom同级目录中出现了一个文件target，
	这就是存放，我们操作完成的生成物的；target下有一个classes是存放主程序类文件的；
	以后我们会用linux环境下的maven来将项目源码进行编译部署和打包的操作；

# 刚刚我们是手工创建maven工程的目录结构，很麻烦，也可以使用maven提供的命令来做：mvn archetype:generate命令使用maven工程模板来创建maven项目目录；
	后面可以跟参数：-DgroupId=组织id -DartifactId=项目名 -Dversion=版本号-snapshot -DarchetypeArtifactId=模板名称 -DinteractiveMode=false
	模板名称通常有两个选择，web工程用【maven-archetype-webapp】，java工程用【maven-archetype-quickstart】
	（注意：这个命令必须在maven工程外面执行，不能在出现pom的目录中执行）

# 如果是打war包可能会出现war包插件和jdk17版本不匹配，需要在pom中指定war插件的版本：（后面再说插件的配置<plugin>）
	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins/groupId>
				<artifactId>maven-war-plugin</artifactId>
				<version>3.2.2</version>
			</plugin>
		</plugins>
	</build>

------------------------------------------接下来在idea中使用maven-------------------------------------------------------------------

# idea中内置了一个maven，但是我们不用这个不方便，我们用自己的maven，在idea中关联maven；设置-BuildTools-maven-mavenhome和mavensettings；
	然后创建maven模块，以后创建模块都是用maven了；构建项目用右边maven窗口来做，也可以在idea运行栏中进行配置；
```

```txt
============================================关于pom文件的配置=====================================================================

# 依赖：pom文件中的依赖在<dependencies></dependencies>标签中通过<dependency>来配置，里面写坐标和一些配置信息，这些直接在中央仓库网站copy；
# 依赖传递：依赖具有传递性；如果依赖jar包中还用到了其他项目依赖，那么maven会自动将这些依赖都导入，这些此时你的项目也可以使用这些依赖；
	*如果我不想用对方项目中的某个依赖，不要依赖传递怎么办，可以进行依赖断开；在引入的依赖的<dependency>中添加：
			<exclusions>
				<exclusion>
					<groupId>log4j</groupId>
					<artifactId>log4j</artifactId>
					//不需要写版本
				</exclusion>
				...
			</exclusions>
	*如果不希望对方通过依赖传递来使用我项目中的依赖，可以将我用的依赖设置为可选的，在我的依赖标签<dependency>中添加<optional>true</optional>；
# 依赖范围scope：依赖的jar默认可以在任何地方使用是compile，可以通过依赖中的<scope>标签来设置依赖的使用范围，可选值有：
		compile所有范围（log4j）；provided已经提供，仅在编译、主程序运、测试程序运行范围内有效，不参与打包（servlet-api）；
		runtime仅主程序、测试程序运行时有效，编译时无效，参与打包（jdbcDriver）；test仅供测试目录编译运行，不参与打包（junit）；
		（了解）system表示不用仓库中的，用本地磁盘上的jar包依赖，需要再加<systemPath>标签指定jar包在磁盘的路径；
# 依赖冲突：如果多个依赖之间有冲突，那么默认会使用离自己近的，如果一样近，pom中先声明的有优先；

--------------------------------------------------------------------------------------------------------------------------------------
# 生命周期：maven对项目构建的生命周期分为3套，clean清理工作，default核心工作（编译、测试、打包、安装、部署），site产生报告发布站点等；
	clean：包含pre-clean清理之前做的事、clean进行清理、post-clean清理之后做的事；
	default：从validate校验、compile编译，一直到deploy部署阶段（中间还有很多阶段这里不一一列举），每一个阶段都对应做一些事，
			我们指定执行某个阶段会将前面的阶段都执行，这些事都是通过maven的插件来做的；我们也可以通过配置插件，指定它在哪个阶段上执行；
	site：presite、site生成站点文档、post-site、site-deploy文档部署到指定服务器上；

# 插件：它和生命周期的阶段绑定，在执行对应的生命周期时会执行对应的一些插件，也可以自定义在某个生命阶段上执行指定插件；
	pom中配置插件需要在<build>标签中的<plugins>中配置插件：
-------------------------------
<build>
	<plugins>
		<!-- 对源码打包的插件 -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-source-plugin</artifactId>
			<version>3.1.1</version>

			<!-- 该标签用于指定，插件的执行阶段 -->
			<executions>
				<execution>
					<!-- 执行目标 -->
					<goals>
						<!-- 对主程序打包 -->
						<goal>jar</goal>
						<!-- 对测试程序打包 -->
						<goal>test-jar</goal>
					</goals>
					<!-- 阶段名 -->
					<phase>generate-test-resources</phase>
				</execution>
				...
			</executions>
		</plugin>
		...
	</plugins>
	...
</build>
-------------------------------

# maven的属性<properties>：maven的<properties>中的属性有5大类；（该标签不只可以定义在pom中，还可以在pom的某些标签内）
	1、自定义属性：就是在<properties>自定义一个标签，然后pom文件后使用${标签名}来引用；
	2、内置属性：有一些内置的属性直接用project.来调用，${project.version}就是使用<version>标签的内容；${basedir}是当前pom所在目录的绝对路径，project可省；
	3、Settings属性：获取maven的配置文件settings.xml中的值，用${settings.localRepository}；
	4、Java系统属性：Java可以System.getProperties()获取的属性名，都可以在${}中获取；
	5、环境变量属性：也可以在${env.环境变量名}中获取windows系统的环境变量；系统属性也可以在cmd中通过mvn help:system来拿，里面有环境变量和Java系统属性；
	例如：
------------------------
<properties>
	<!-- 设置当前maven，构建项目采用的编码 -->
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

	<!-- 告诉mavenjdk的版本 -->
	<maven.compiler.source>17</maven.compiler.source>
	<maven.compiler.target>17</maven.compiler.target>

	<!-- 自定义的全局属性，在后面的junit依赖中，版本号可以用${junit.version}来指定 -->
	<junit.version>5.0.1</junit.version>
</properties>
------------------------

# maven的构建<build>：它本身有默认的配置，也可以通过在build标签中，自定义构建过程；

	*指定打包文件的文件名：我们打包的jar和war包都有默认的文件名是【artifactId-version.jar】，我们也可以通过<final-name>标签指定，注意加文件后缀；

	*指定配置文件路径：<resources>标签用于配置项目的资源文件（如配置文件、静态资源文件等）的位置和处理方式。这个标签通常用于指定项目构建时需要复制到输出目录的资源文件。
		就是告诉maven，主程序配置文件和测试程序配置文件去哪里找。
		当你显式地指定了<resource>标签时，Maven会只处理你指定的资源文件，就不会再去默认的src/main/resources目录下复制文件了。
------------------------主程序配置在哪里：
<resources>
	<!-- resource是告诉maven主程序配置文件在哪个目录去找 -->
	<resource>
		<directory>配置文件目录，如【${project.basedir}/src/main/resources】</directory>

		<!-- 指定包含的文件；excludes是不包含的文件。如果没有指定<includes>或<excludes>，那么<resources>标签中指定的<directory>目录下的
			所有文件都会被复制到输出目录。这意味着所有文件都会被处理，包括子目录中的文件。-->
		<includes>
			<!-- 表示java目录下的，所有的xml和properties文件。，路径支持ant风格 -->
			<include>**/*.properties</include>
			<include>**/*.xml</include>
		</includes>
		<!--指定复制到哪里，不指定的话默认复制到生成的classes类路径下-->
		<targetPath>xx/xx</targetPath>
		<!-- 启用过滤器，表示该配置文件中启用占位符，${}在其中可以用了 -->
		<filtering>true</filtering>
	</resource>
</resources>
------------------------类似的，指定测试程序的配置文件位置：
<testResources>
	<!-- testResource是告诉maven测试程序配置文件在哪个目录去找 -->
	<testResource>
		<directory>配置文件目录，如【${project.basedir}/src/test/resources】</directory>

		<!-- 启用过滤器，表示该文件启用占位符，${}在其中可以用了 -->
		<filtering>true</filtering>
	</testResource>
</testResources>
------------------------

	*设置插件：使用<plugins>标签，在其中可以自定义使用的插件，以及对插件进行配置；
------------------------
<plugins>
	<!-- 对源码打包的插件 -->
	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-compiler-plugin</artifactId>
		<version>3.1.1</version>

		<!-- 对插件进行配置 -->
		<configuration>
			<!-- 源码是Java17，目标class也是Java17，编码采用UTF-8 -->
			<source>17</source>
			<target>17</target>
			<encoding>UTF-8</encoding>
		</configuration>
	</plugin>
</plugins>
------------------------

# 多环境配置：你的程序在测试时要用a配置文件，在运行时要用b配置文件，那么换环境还得改怎么办，我们在maven的pom中配置多环境；
------------------------
<!-- 配置多环境 -->
<profiles>
	<!-- 环境1 -->
	<profile>
		<id>env-1</id>
		<!-- 环境1的属性 -->
		<properties>
			<jdbc-dev>jdbc:mysql://localhost:3306/crm</jdbc-dev>
		</properties>

		<!-- 配置默认启动，没有参数运行的话默认用该环境 -->
		<activation>
			<activeByDefault>true</activeByDefault>
		</activation>
	</profile>
	<!-- 环境2 -->
	<profile>
		<id>env-2</id>
		<!-- 环境2的属性 -->
		<properties>
			<jdbc-dev>jdbc:mysql://localhost:3306/test</jdbc-dev>
		</properties>
	</profile>
</profiles>
------------------------
	环境怎么用呢，在idea的启动项里配置maven运行的参数【clean -P 环境id】就行了；idea里maven命令不用写前面的【mvn】

# 跳过测试：idea中mvn面板可以直接点击跳过，也可以用命令【mvn install -D skipTests】跳过所有测试；
	还可以在<build>中通过配置测试插件：<plugin>中除了测试插件surefire的坐标，再加<configuration>，里面写<skipTests>true</skipTests>即可；
	我们常用的是，指定执行哪些测试类，或不测试哪类，在<configuration>中写<includes>或<excludes>，如：
------------------------
<includes>
	
</includes>

<plugins>
	<!-- 测试的插件 -->
	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-surefire-plugin</artifactId>
		<version>3.1.1</version>

		<!-- 对插件进行配置 -->
		<configuration>
			<skipTests>true</skipTests>
			<includes>
				<include>**/UserServiceTest.java</include>
			</includes>
		</configuration>
	</plugin>
</plugins>
------------------------
```

```txt
================================================maven继承和聚合=====================================================================

# 我们之前的项目都是一个模块下多个包，pojo、service、dao、controller每层都是一个包，但是我们多模块开发的场景下，每一层都是一个module，
    模块之间的调用通过接口；这种非整合开发情况下，依赖和构建工作就更复杂了，所以我们通过maven来管理整个工程的所有模块的依赖和构建；

# pom文件（项目对象模型）是可以被继承的，maven多模块管理其实就是让子模块的pom来继承父工程的pom，以此来完成模块之间继承关系；（注意：父子模块必是maven模块）

# maven的继承是指，在maven项目中，让一个模块使用另一个模块中的配置和依赖信息。继承可以让我们在多个模块中，共享同一个配置和依赖，简化项目的管理和维护；
    多个模块中，我们只在父模块pom中统一配置依赖信息，子模块继承父模块，它的pom就会继承父模块的pom，这样子模块就可以用父模块的依赖和配置了，方便管理了；

# 被继承的maven父工程/模块必须满足2点：1、<packaging>标签设置为pom；2、src必须删除掉，父模块没有src；

# 如何继承：创建一个maven工程，然后src删掉，在父工程的pom中指定<packaging>为pom；然后创建子模块（也是maven模块），添加maven子模块时指定parent为父工程；
    而且此时只能设置项目名artifactId，且不能和其他模块重复；
        *父工程的pom中多了一个<modules>标签，里面一个个的<module>是父工程包含的所有的“直接子模块”，父工程聚合了子模块；
        *此时子模块的pom文件会多一个<parent>标签，里面是父maven工程的gav坐标，子模块继承了父工程；
    这样父工程的pom就被子模块的pom所继承了，父子模块之间就完成了模块之间的继承关系，此时对父工程进行构建，其下的所有子模块都会依次进行构建，这就是聚合和继承；
（子模块也可以有子模块，仍然要遵循以上2点要求；层级可以无穷多，但一般开发中就2层）
（如果忘了给子模块设置parent，那就手动在子模块pom中添加<parent>标签，然后手动在父模块中添加<modules>标签就行；子模块的坐标只留artifactId）
（同级结构的maven模块之间也可以继承，方式和上面类似；只是子模块的<parent>标签中需要加<relativePath>标签，指明父模块pom文件的相对路径）

# 如果每个模块都用到了同一个依赖，但各自的版本不同，怎么办？子模块的依赖去掉，直接在父工程的pom中添加依赖就行了；此时子模块无条件地继承父工程的所有依赖；
    但是子模块并不是需要父工程中所有的依赖，这样打的包很冗余，怎么办？此时父工程就要对依赖进行加强管理了；
    *在父工程中写<dependencyManagement>标签，将<dependencies>依赖标签放在这个标签里，所有的依赖加强管理，此时子模块全都用不了这些依赖了；
        如果哪个子模块需要用某个依赖，在它自己的pom中配置依赖即可，别写<version>版本标签，相当于告诉父工程我需要哪个依赖，此时子模块中才会出现这些依赖；
        如果子模块依赖中指定了版本号，那么相当于就没用父工程的依赖，这个依赖没受到父工程的管理；
    *插件<plugins>也应该被父工程管理起来，类似的用<pluginManagement>来将它包起来；
    *依赖里面也可以写此时自己正在写的某个模块的坐标，同样在其他模块中可以被使用；

# 通常我们在父工程的pom中的<properties>标签中定义“全局属性”，比如：某个依赖的版本号，定义为依赖的【artifactId-version】；
    如果artifactId就一个单词，也可以【artifactId.version】；

（可以被继承的标签有：<groupId>、<version>、<url>、<properties>、<dependencies>、<dependencyManagement>、<repositories>、<build>）



================================================maven私服=====================================================================


# maven私服是特殊的服务器，它除了maven官方服务器、其他大型maven云之外的，私人用的服务器软件；它是架设在局域网中的个人maven服务器软件，
    用来代理位于外部的中央仓库；maven私服不仅可以在局域网中使用，也可以部署在外网上供其他人使用；

# 常见的maven私服有：apache的Archiva，jFrog的Artifactory，Sonatype的Nexus；（当下最流行，使用最广泛的，阿里云就是Nexus）

# 安装即解压，解压后有两个文件夹【nexus-3.54.1-01】私服的程序目录和【sonatype-work】私服的工作目录；以管理员运行cmd，cd进入安装目录下的bin，
    执行【nexus.exe /run】启动nexus服务器然后等待，最后的参数是服务器名；当看到Started Sonatype Nexus OSS 3.54.1-01则表示成功；
    否则就需要删掉这俩目录重新解压执行；etc目录下nexus的默认配置文件中可以看到默认的配置，访问的端口号等信息，可以修改；服务器性能相关的配置
    在bin中nexus.vmoptions中可以设置；
（私服仓库里的jar包都是二进制文件，别想着在windows目录中找到jar，只能通过私服网页去看）

-----------------------------start------------------------------------------------------------------------------

# nexus本质上是一个web工程，所以我们在浏览器中输入【http://localhost:8081/】就可以了，如果访问很慢，可以在命令行【Ctrl+c】关闭服务然后重启；
    *对nexus进行初始化：在主页右上角登录，用户名是admin，密码看提示；然后提示设置新密码(a123456789)，下一步是设置匿名访问，我们这里禁止匿名访问；
    *完成后推出重新登录，左边的search是查找jar的，upload是上传下载用的，browse是浏览全部的仓库资源；上边六边形盒子是浏览用的，旁边的齿轮是设置服务器的；
    *首先在主页点browse浏览就可以看到当前私服上的各种仓库，默认有7个；我们主要用4个maven开头的仓库，剩下的3个是.net的仓库不用管；

# maven-central：它的类型是proxy远程仓库的代理，本质上就是一个链接，它帮我们去中央仓库下载jar包的，我们可以通过设置该仓库的链接地址，将链接的中央仓库地址
    改成阿里云的镜像；在设置中找到仓库，双击进去设置，找到Remote Storage，将里面的【https://repo1.maven.org/maven2/】中央仓库改成阿里云镜像地址即可；
    maven-public：它的类型是group组仓库，它默认存放从中央仓库下载的jar包；组的意思就是，拿东西就直接从类型是group的“组仓库”中拿，别管具体是哪个仓库的，都在组里；
    maven-releases：它的类型是hosted本地仓库，我们自己开发的稳定版项目jar包放在这里；hosted类型的仓库是我们上传jar包的仓库，或者不开源的jar包；
    maven-snapshots：同样类型是hosted本地仓库，但是它是存放我们的测试版jar包；这俩仓库都默认在maven-public的组中，所以拿东西也会在这两个仓库中找；
（现在这几个仓库中没有任何内容）

# 但是现在还不行，我们本地仓库配置的中央仓库镜像是阿里云的，也就是说本地没有的直接去阿里云远程下载了，我们想让它链接到私服下载；在maven的settings.xml中配置：

    *我们私服有密码，所以先在<servers>中配置私服的密码：
-------------
<!-- 访问该id的仓库时，使用的用户名和密码；server可以有多个 -->
<server>
    <!-- 设置访问某个私服的id和密码，id自定义，下面上传要用 -->
    <id>mynexus</id>
    <username>admin</username>
    <password>密码</password>
</server>
-------------

    *找到mirrors标签，将中央仓库镜像改成我们私服的，访问资源先去私服找：
-------------
<mirror>
    <!-- id要和上面server中id保持一致，用于携带，访问私服的密码 -->
	<id>mynexus</id>
	<mirrorOf>central</mirrorOf>
	<name>Nexus central</name>
	<url>http://localhost:8081/repository/maven-public/</url><!-- 找的话就到该url对应仓库的组中找，找这一组仓库看有没，没有再去中央仓库下载 -->
</mirror>
-------------此时私服中没有，私服会通过之前设置过的，中央仓库的镜像去找；这样就完成了仓库的3级查找；


# 我们怎么将自己的项目install安装到私服上呢？在maven项目的pom文件中设置：
    <distributionManagement>
        <snapshotRepository>
            <id>写私服的id，发布到哪个私服上</id>
            <name>随意</name>
            <!-- 写发布到私服的哪个仓库的url -->
            <url>http://localhost:8081/repository/maven-snapshots/</url>
        </snapshotRepository>
        <repository>
            <id>mynexus</id>
            <name>Nexus Release</name>
            <url>http://localhost:8081/repository/maven-releases/</url>
        </repository>
    </distributionManagement>

# 除了默认的中央仓库，我们还可以配置多个远程仓库；<repositories>标签就是设置多个远程仓库的地址的：
    <repositories>
        <!- 私服依赖 -->
        <repository>
            <!-- 私服的id，需要和<server>的保持一致，用于给私服出示密码 -->
            <id>mynexus</id>
            <name>随意</name>
            <url>私服中某个仓库的url</url>
        </repository>

        <!-- 我们能否使用正式/测试的依赖 -->
        <snapshots>
            <enabled>false</enabled>//如果是true就表示，我们如果用了snapshot型的jar包，那么每次使用都会去远程仓库看看版本更新了没，更新就下载最新版本用
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repositories>
```

