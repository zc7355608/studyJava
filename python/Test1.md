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

