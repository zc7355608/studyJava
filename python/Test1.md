# Python

> - Python是**吉多·范罗苏姆（Guido van Rossum）**在1989年圣诞节期间，为了打发无聊的圣诞节而创建的解释型语言（类似JS）。它虽没有C/C++那种编译型语言的执行速度，但由于它的**优雅、明确、简单**，学习成本极低且能做的事情多，因此在开发者及非开发者间被广泛使用。如今，Python广泛使用在**web开发、自动化测试、AI、大数据..**等多个领域。
>
> - Python为我们提供了非常完善的基础代码库，覆盖了网络、文件、GUI、数据库、文本等大量内容。除此之外Python还有大量的第三方库及文档资料供开发者使用。
>
> - Python源代码以`.py`结尾，运行它需要下载Python的解释器。当我们从官网下载了对应平台的解释器安装后，你会得到Python解释器（它是负责运行Python程序的）、一个命令行交互环境、一个简单的集成开发环境（IDE）、以及一些Python文档。
>
> - Windows系统中通过在命令行执行`py/python`即可进入Python提供的交互环境中执行Python代码了。或者用`py/python 文件名`来解释执行Python源程序。（Mac/Linux系统是`python3`命令）
>
> - 目前，Python有两个版本，一个是2.x版，一个是3.x版，这两个版本是不兼容的。由于3.x版越来越普及，我们的教程将以最新的Python 3.x版本为基础。请确保你的电脑上安装的Python版本是最新的3.x，这样，你才能无痛学习这个教程。
>
> - 由于整个Python语言从规范到解释器都是开源的，所以理论上，只要水平够高，任何人都可以编写Python解释器来执行Python代码（当然难度很大）。事实上，确实存在多种Python解释器：
>
>   - **CPython**（官方）：当我们从[Python官方网站](https://www.python.org/)下载并安装好Python 3.x后，我们就直接获得了一个官方版本的解释器：CPython。这个解释器是用C语言开发的，所以叫CPython。在命令行下运行`python`就是启动官方的CPython解释器。CPython是使用最广的Python解释器，教程的所有代码也都在CPython下执行。
>
>   - **IPython**：IPython是基于CPython的一个交互式解释器，也就是说，IPython只是在交互方式上有所增强，但是执行Python代码的功能和CPython是完全一样的。CPython用`>>>`作为提示符，而IPython用`In [序号]:`作为提示符。
>
>   - **PyPy**：PyPy是另一个Python解释器，它的目标是执行速度。PyPy采用[JIT技术](http://en.wikipedia.org/wiki/Just-in-time_compilation)，对Python代码进行动态编译（注意不是解释），所以可以显著提高Python代码的执行速度。虽然绝大部分Python代码都可以在PyPy下运行，但是PyPy和CPython是有一些不同的，这就导致相同的Python代码在两种解释器下执行可能会有不同的结果。如果你的代码要放到PyPy下执行，就需要了解[PyPy和CPython的不同点](http://pypy.readthedocs.org/en/latest/cpython_differences.html)。
>
>   - **Jython**：Jython是运行在Java平台上的Python解释器，可以直接把Python代码编译成Java字节码执行。
>
>   - **IronPython**：IronPython和Jython类似，只不过IronPython是运行在微软.Net平台上的Python解释器，可以直接把Python代码编译成.Net的字节码。
>
>     > 虽然Python的解释器很多，但使用最广泛的还是CPython。如果要和Java或.Net平台交互，最好的办法不是用Jython或IronPython，而是通过网络调用来交互，确保各程序之间的独立性。
>
> - **Python交互模式**：在命令行模式下敲命令`python`，就看到类似如下的一堆文本输出，然后就进入到Python交互模式，它的提示符是`>>>`。在Python交互模式下输入`exit()`并回车，就退出了Python交互模式，并回到命令行模式。这个模式类似JS在F12控制台中执行JS代码，它是用于调试Python代码的。

- ### 第1个Python程序

  > Mac/Linux中，可以直接运行`.py`文件，需要在文件开头加上一个特殊的注释：（Python中单/双引号都一样）
  >
  > ```python
  > #!/usr/bin/env python3
  > name = input('please enter your name: ')
  > print('Hello', name)  # print()函数可以接受多个字符串，用逗号“,”隔开，默认会用空格连成一串输出
  > '''
  > please enter your name: 张三
  > Hello 张三'''
  > ```

  ###### 注意：Python3/Go/Node使用UTF8编码，因此文件名可以是中文。而Python2使用Ascii编码，因此文件名必须是字母、数字、下划线的组合。

- ### Python基础语法

  - 以`#`开头的语句是Python中的单行注释。Python中没有多行注释。

  - Python程序是**大小写敏感**的。

  - Python中，标识符必须是字母、数字、下划线的组合，且不能以数字开头。（Python3虽然能用中文字符，但不推荐）

  - Python中没有`&/|/!`，只有`and/or/not`运算符。

  - Python中，`/`做除法时，结果总是浮点数。而`//`才是正常的取整除法。

  - Python中语句以行分割，而不是分号。当某个语句以冒号`:`结尾时，其后缩进的语句被视为代码块。（按照约定俗成的惯例，应始终使用*4个空格*的缩进）

    > 缩进的坏处就是“复制－粘贴”功能失效了，这是最坑爹的地方。当你重构Python代码时，粘贴过去的代码必须重新检查缩进是否正确，因为这会影响执行。此外，IDE很难像格式Java代码那样格式化Python代码。

- ### Python的数据类型

  - 整数：和Java是类似的。不同的是，Python允许在数值中间以`_`分隔，如：`10_000`和`10000`、`0xa1_c4`和`0xa1c4`是完全一样的。

  - 浮点数：和Java类似。

    > Python中的整数和浮点数都没有长度限制，但是超出一定范围就直接表示为`inf`无限大。

  - 字符串：字符串是以单引号`'`或双引号`"`括起来的任意文本。

    > - 多行字符串：Python允许用`'''...'''`的格式来表示包含多行内容的字符串（Java15之后也有这个特性）。通常会用它去定义一个未被使用的字符串，来当作多行注释使用。
    > - Python中，字符串前加r（`r''`）表示`''`内部的字符串不转义。这也适用于多行字符串。

  - 布尔值：`True/False`

  - 空值：`None`

- ### Python中的变量

  - 和Java不同的是，Python是**动态语言**，也就是定义变量时不用指定类型，类型随意。如：`name=1`，name指向了字面量1的引用地址。
  - 
