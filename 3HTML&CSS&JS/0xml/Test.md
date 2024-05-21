```txt
XML（由于现代开发过程中，不需要开发人员手动的解析XML文档了，因此主要了解xml即可）
==================================================================================================
# XML：可扩展标记语言（代码见IdeaProjects项目中），虽然可扩展可自定义，但是如果编写了约束规则，就不能随意写了；
	XML文档是用XML标记写的，最初的XML文档作为网页来使用，后来被淘汰了。目前在java使用xml文档来代替
	properties作为配置文件，因为它可以表示比较复杂的配置关系，不只是key=value这种一对一的形式。
	XML用于数据的传输或当作配置文件来使用，它是更严格的HTML版本；此外XML还有另一个版本XHTML，它是可扩展的HTML；
（在IDEA中使用xml文件：settings->editor->文件和代码模板-->
新建文件，名字可以叫：XML Template，extension扩展名可以为：xml）

# XML语法：
	- 开头必须顶行声明，上面连空格也不能有：<?xml version="1.0" encoding="utf-8" standalone='yes/no'?>，
		表示xml版本是1.0，字符编码utf-8，standalone说明这个文档是否是独立的，默认为no非独立；
		（注意：如果xml引入了外部的dtd约束文件，那么standalone不能设置为yes）

	- XML中，主题内容都是由元素（Element）组成的，元素一般由：开始标签、属性、元素内容、结束标签组成；
		如果一个元素中没有嵌套子元素，且没有元素内容，这样的元素叫“空元素”，结束标签可以用/代替；

	- XML区分大小写，且空格不会像HTML那样被自动删除；

	- 一个XML文档必须以一个【根目录标签】开始，其他标签作为【根目录标签】的“子标签”或者“间接子标签”出现的；html可以有多个根元素；

	- xml中，属性的内容，必须包含在单引号('')或双引号("")内；
		<?xml version="1.0" encoding="utf-8"?>
		<学校 name="某某大学" address="xxx">
			<班级 name="软工1班">
				<学生>张三</学生>
			</班级>
			<班级 name="软工2班">
				<学生>李四</学生>
			</班级>
			...
		</学校>
		（注意：只能有一个根，它就是学校元素）

	- 	“ <学校></学校> ”：根节点
		“ <班级></班级> ”：元素节点
		“ 张三 ” 		：文本节点/文本值
		“name="软工2班"”：属性节点

	- 实体符号：（在xml中一定要注意，你的这些特殊符号都要用实体符号转义才行）
		&lt;		<
		&gt;		>
		&amp;		&
		&apos;		'
		&quot;		"
		（或者使用转义标签：<![CDATA[]]>）

------------------------------------------------------------------------------------------------
由于xml语法松散，元素名字怎么写都行，为了规范化，出现了xml约束，作用是：
	* 设置可以出现的“元素名”
	* 设置可以在元素中出现的“属性名”
	* 设置元素之间的父子关系和兄弟关系
==================常见的xml约束有2种：===========================================================

# dtd约束：（是一种简单约束，上手快，但没schema细致）

	- DTD约束有3种方式：
		内部dtd：<!DOCTYPE 根元素名 [
					DTD语句...
				]>
		外部dtd：<!DOCTYPE 根元素名 SYSTEM "本地dtd文件地址">
		公共dtd（引入网络中的dtd）：<!DOCTYPE 根元素名 PUBLIC "dtd名" "网络中dtd的URL">

	- 语法：
（*是0到多次，+是至少一次，?是0或1次，不写就是必须且只能出现1次，逗号,表示必须按照指定的顺序，括号()给元素进行分组，竖线|表示或）
		<!ELEMENT 标签名>：可以在xml中出现的标签名；

		<!ELEMENT 标签名 EMPTY/ANY>：该标签是一个空元素/该标签中可以出现任何东西；

		<!ELEMENT 标签名 (name,age)>：标签里必须有两个属性name和age且得按顺序出现；

		<!ELEMENT 标签名 (#PCDATA) >：当前标签的里的内容是普通文本txt，缩写为：parsed character普通文本数据；

		<!ATTLIST 标签名 属性名 属性类型 类型说明>：给标签定义属性
			属性类型：
				CDATA：字符数据，类似于#PCDATA；
				Enumerated（枚举）：这样用，(老虎|兔子|大象) "大象"，表示有3个供选择的值，不写默认是大象；
				ID：将该属性值设置为唯一的，不能重复，类型说明只能设置为#REQUIRED必须的，或#IMPLIED可有可无的；
				IDREF/IDREFS：为属性值之间设置关系；
			类型说明：
				#REQUIRED：必须有；
				#FIXED "值"：属性默认有一个固定值，写不写都有
				#IMPLIED：可有可无；
				"值"：默认值


# xsd约束：（也叫Schema约束，是更高级的约束，是dtd约束的升级版，后缀名.xsd，开发中大多是这种约束方式）
	* 由于原来的约束方式中，xml文件中只能有一个约束，如果想要多个约束文件共同约束一个xml，或者在原来的基础上再加一些约束，
	dtd约束就不行了，此时就必须使用高级约束XSD；
	* XSD约束文件本身也是一种xml文件，其中内容遵循xml语法；dtd的验证需要用另一套机制，但XSD则采用与xml文档相同的合法性验证机制；
	* XSD对命名空间支持的非常好，而dtd不支持命名空间；XSD支持的数据类型也更多，可以是自定义类型；
	* 由于XSD对文档的约束更细致，所以它的语法也复杂的多；

===============================================================================================================

xsd文件内容：
-----------------------------------------------------------------------------------------------------------
<!--文档声明-->
<?xml version="1.0" encoding="UTF-8"?>
<!--
	# 以abc:schema表示模式定义的开始，后面的命名空间的声明表示，abc标签中用到的元素和数据类型来自该命名空间：
		"http://www.w3.org/2001/XMLSchema"；它还规定了使用来自该命名空间的元素和数据类型，
		应该使用“前缀abc：”去标记；
	# xmlns:abc="http://www.w3.org/2001/XMLSchema"表示，引入网络中这个命名空间来约束本文件（本文件也是约束文件）
	# abc:element表示element来自http://www.w3.org/2001/XMLSchema文档，它里面的约束来约束着element；
	# xmln="http://www.w3school.com.cn"表示默认的命名空间；
-->
<abc:schema xmlns:abc="http://www.w3.org/2001/XMLSchema">//给这个命名空间起别名为：abc；

<abc:element name="students">	//abc:element指定根元素名为students
    <abc:complexType>			//设置根标签元素内容为复杂类型
		<abc:sequence>			//指定内置标签的顺序

			<abc:element name="student" maxOccurs="2">//maxOccurs表示最多出现2次
				<abc:complexType>
					<abc:sequence>
						<abc:element name="name" type="abc:string"/>
						<abc:element name="age" type="abc:int"/>
						<abc:element name="sex" type="abc:string"/>
					</abc:sequence>

					//给student指定了一个id属性，可选的，固定值001
					<abc:attribute name="id" use="optional" fixed="001"></abc:attribute>
				</abc:complexType>
			</abc:element>

		</abc:sequence>
    </abc:complexType>
</abc:element>

<!--模式定义的结束-->
</abc:schema>
-----------------------------------------------------------------------------------------------------------
	* 怎么在xml中引入使用呢？
		1)开头加上：<?xml version="1.0" encoding="UTF-8"?>
				   <根标签名 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"//遵循标准命名空间，xsi:schemaLocation在这定义
				   xsi:schemaLocation="自定义的命名空间  xsd文件的URL地址">//相当于import

				   </跟标签名>
			引入多个约束文件：
					<?xml version="1.0" encoding="UTF-8"?>
					<根标签名 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
							 xmlns:demo="http://www.bjpowernode.com/demo/mydemo"//给命名空间起别名

					xsi:schemaLocation="http://www.node.com/bj/pw  http://www.bjpowernode.com/demo.xsd
	（另一个namespace的名和地址）	http://www.bjpowernode.com/demo/mydemo http://www.bjpowernode.com/demo.xsd">

					</跟标签名>
		2)直接引入同一目录下本地文件：
			<?xml version="1.0" encoding="UTF-8"?>
			<根标签名 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"//约束遵循xsd标准，xsi:noNamespaceSchemaLocation在这
			xsi:noNamespaceSchemaLocation="文件名.xsd">

			</根标签名>

==========XML解析============================================================================================
在Java中默认提供了两种解析xml的方式，分别是DOM和SAX方式解析：

	1、DOM(文档对象模型)：
		一次性将xml文档中所有的dom加载到内存中去，并转为树状模型，然后一个节点去访问或更改；这种方式解析的效率较高，
		但是比较消耗内存，适合小的xml文件；

	2、SAX解析：
		这种方式会逐行地去扫描XML文档，当遇到标签时会触发解析处理器，采用事件处理的方式解析XML，是基于事件模型
		完成的，所有的api都在org.xml中被封装好了，相对来说简单一些；根据开发人员的需要，一次只将若干个满足条件
		的标签加载到内存当中；优点是：在读取文档的同时即可对XML进行处理，不必等到文档加载结束，相对快捷；
		xml资源不会长久保留在内存中，因此不存在占用内存的问题，可以用来解析超大XML；缺点是只能读取xml，无法增删改；

（在实际开发中，我们一般采用DOM的方式解析；dom4j封装了dom很好用，我们一般用xpath+dom4j来解析）

什么是 XPath?
	# XPath是使用“路径表达式”来选取XML文档中的节点或节点集。这些路径表达式和我们在常规的电脑文件系统中看到的路径非常类似；
	# 语法：
		常用的：
			节点名		选取此节点的所有子节点
			/			从根节点开始进行选取，代表绝对路径
			//			从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置
			.			选取当前节点
			..			选取当前节点的父节点
			@			选取属性

				例如：
				bookstore 		选取 bookstore 元素的所有子节点
				/bookstore 		选取根元素bookstore
				bookstore/book 	选取bookstore下的所有book子元素
				//book			选取当前路径下的所有book子元素，而不管它们在文档中的位置
				bookstore//book 选择属于 bookstore 元素的后代的所有 book 元素，而不管它们位于 bookstore 之下的什么位置
				//@lang		 	选取名为 lang 的所有属性

		谓语：用来查找某个特定的节点或者包含某个指定的值的节点，谓语被嵌在方括号中
			例如：
				/bookstore/book[1] 				选取属于 bookstore 子元素的第一个 book 元素；
				/bookstore/book[last()] 		选取属于 bookstore 子元素的最后一个 book 元素；
				/bookstore/book[last()-1] 		选取属于 bookstore 子元素的倒数第二个 book 元素；
				/bookstore/book[position()<3] 	选取最前面的两个属于 bookstore 元素的子元素的 book 元素；
				//title[@lang] 					选取所有属性名为 lang 的 title 元素；
				//title[@lang='eng'] 			选取所有 title 元素，且这些元素拥有值为 eng 的 lang 属性；
				/bookstore/book[price>35.00] 	选取 bookstore 元素的所有 book 元素，且其中的 price 元素的值须大于 35.00；
```