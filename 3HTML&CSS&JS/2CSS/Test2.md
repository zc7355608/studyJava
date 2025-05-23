# CSS3

------

### c3概述：

> - CSS3是CSS2的升级版，在其基础上新增了许多功能，从而解决实际面临的许多问题。
>
> - C3未来会按照模块化的方式发展，官网：https://www.w3.org/Style/CSS/current-work.html
>
> - C3的新特性如下：
>
>   - 新增了更加实用的选择器：动态伪类、目标伪类、伪元素等。
>   - 增强了颜色，如：`hsl`、`hsla`、`rgba`几种颜色模式，还有`opacity`属性来控制透明度。
>
>   （以上之前讲过了）
>
>   - 新增了更好的视觉效果，圆角、阴影、渐变等。
>
>   - 新增了更丰富的背景效果、属性、多个背景图等。
>
>   - 新增了全新的布局方案，“弹性盒子”。
>
>   - 新增了WEB字体，可以显示用户电脑上没安装的字体。
>
>   - 增加了2D和3D变换，如：旋转、扭曲、缩放、位移等。
>
>   - 增加动画与过渡效果，让效果的变换更平滑。
>
>     ......

### CSS3私有前缀：

> - 什么是私有前缀？“-webkit-”就是私有前缀，在正常属性的前面加的这个东西就是私有前缀。
>
> - 当W3C提出某个CSS3新特性后，在被浏览器正式支持之前，浏览器厂商会根据浏览器内核，使用私有前缀来测试该CSS特性，在浏览器正式支持之后，使用就不需要加前缀了。
>
> - 那怎么知道C3的新属性，在哪个浏览器中使用是加前缀还是不加呢？看网站：https://caniuse.com/
>
> - 常见浏览器的私有前缀：
>
>   - 谷歌：-webkit-
>
>   - 火狐：-moz-
>
>   - Edge：-webkit-
>
>   - Safari：-webkit-
>
>   - （旧版本Opera：-o-）
>
>   - （旧版本IE：-ms-）
>
> - 有时会看到这样的例子：
>
>   ```css
>   -o-border-radius: 20px;
>   -moz-border-radius: 20px;
>   -ms-border-radius: 20px;
>   -webkit-border-radius: 20px;
>   border-radius: 20px;
>   /*表示，不管哪个浏览器，只要认识了，就渲染，不认识就算了当作非法的跳过，最后原属性名兜底*/
>   ```
>
> - 我们在日常编码时，要一个属性写这么多次吗？不用过于关注私有前缀，不用记或用一个属性都查一下兼容性，因为常用的C3属性浏览器都支持。即使为了老的浏览器要加前缀，我们还有webpack工具帮我们做。

------

### CSS3新增的长度单位：（rem其实也是c3新增的）

- vw：它是视口（Viewport）宽度大小的百分比，50vw表示占视口宽度的50%
- vh：类似的，它是视口高度大小的百分比，50vh表示占视口高度的50%（这俩在移动端网页中很常用）
- vmax：可能是视口高的20%，也可能是视口宽的20%，它会看视口的宽高哪个大。
- vmin：类似vmax，看视口宽高哪个小。（这俩了解即可）

------

### css3的数学函数：

> c3中也有一些可供计算值的数学函数，数学函数允许将 CSS 数字值写成数学表达式。常用的如下：
>
> - （重点）`calc`计算函数：`height: calc(100vh - 70px);`，函数里写数值（单位随意），最终会得出一个值。
>
>   *还有比较函数min()、max()等很多函数，用到再说....*

------

### C3模块化：

> - C3中，可以用`@import`导入其他CSS文件中的样式。它必须放在CSS文件的开头（除了`@charset`）。
> - 作者可以在 `@import` 规则后指定一个逗号分隔的媒体查询列表，以控制在哪些媒体类型下导入样式表。
> - 如果没有指定媒体查询，则导入是无条件的，即无论媒体类型如何都会加载该样式表。
> - 指定 `"all"` 媒体类型等同于没有指定媒体查询，表示在所有媒体类型下都适用。

###### 示例：

```css
@import url("fineprint.css") print;
@import url("bluish.css") projection, tv;
@import "custom.css";
@import url("chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url("landscape.css") screen and (orientation: landscape);
```

------

### C3中的变量：

> C3中引入了自定义属性（变量），它允许你在CSS中定义一些值，然后在整个样式表中重复使用这些值。C3的变量增强了样式的可维护性和可重用性，特别是在处理如主题色、字体大小等常用值时。我们来看下怎么用：
>
> - 变量的定义使用双连字符（`--`）作为前缀，后面跟变量名（区分大小写），例如：`--primary-color`。然后就可以通过`var()`函数来引用这些变量了。例如：
>
>   ```css
>   // `<html>`标签中定义变量`primary-color`，值为`blue`（全局作用域变量）
>   :root {
>   	--primary-color: blue;
>   }
>   // 使用变量，要带上变量前缀`--`
>   body {
>   	background-color: var(--primary-color);
>   }
>   ```
>
> - C3中的变量也有作用域，变量只在（定义变量的）选择器选中的元素、及其子元素上可见。通常的最佳实践是定义在根伪类`:root`下，这样就可以在HTML文档的任何地方访问到它了。

------

### 新增的“盒子模型”相关的属性：

> - `box-sizing`：值为`content-box`或`border-box`，可以设置盒模型的类型：普通盒模型或怪异盒模型。默认值`content-box`就是内容盒子，`width`设置的是内容的宽。`border-box`是边框盒子，`width`设置的是整个盒子的宽（内容+内边距+边框）
>
> - `resize`：设置用户是否可以手动调整盒子的大小。`horizontal`表示可以水平调整，`vertical`垂直调整，`both`是水平垂直都可以调。默认值`none`不能调整。（注意：此时必须加`overflow`属性，用来指定如果调小了，盒子里面的东西怎么办）
>
> - `box-shadow`：设置盒子的阴影，默认none没有阴影。值可以分为以下几种情况：
>
>   - 2个值：`10px 20px;`，表示：盒子的影子水平方向推出10px，垂直方向推出20px
>   - 3个值：`10px 20px blue;`，表示：水平位置，垂直位置，颜色
>   - 3个值：`10px 20px 10px;`，表示：水平位置，垂直位置，模糊程度
>   - 4个值：`10px 20px 10px blue;`，表示：水平位置，垂直位置，模糊程度，颜色
>   - 5个值：`10px 20px 10px 20px blue;`表示：水平位置，垂直位置，模糊程度，阴影大小/外延值，颜色
>   - 6个值：`10px 20px 10px 20px blue inset;`，表示：水平位置，垂直位置，模糊程度，阴影大小/外延值，颜色，内阴影
>     （内阴影会往盒子里面露出；默认值是`initial`是外部阴影，值`inherit`表示继承父元素的值）
>
>   例如：`box-shadow: 0px 0px 20px black;`

------

### 新增边框属性：

> - `border-radius`：设置边框圆角，属性值`10px`表示边框角的圆形的半径大小是10像素，`radius`有半径的意思。
>
>   - 值最大不能超过盒子的宽或高，通常画一个圆就是将正方形div的`border-radius`设置为宽的一半。
>
>   - 也可以只设置某个角的圆度，如左上角`border-top-left-radius: 10px;`
>   - 如果是2个值，如：`border-top-left-radius: 10px 5px;`，表示是椭圆，x方向半径10px，y方向半径5px
>   - （了解）综合写法：`border: 左上x 右上x 左下x 右下x / 左上y 右上y 左下y 右下y;`
>
> - `outline`：设置边框的外轮廓。
>
>   - 它和margin一样不在盒子大小的计算范围；和`margin`不同之处的是，`outline`不占位置，就像是盒子发出来的光。
>   - `outline-width`是外轮廓的宽度，`outline-style`是外轮廓样式，`outline-color`是外轮廓的颜色。同样可以像border那样复合写：`outline: 1px solid red;`
>
> - `outline-offset`：是外轮廓的偏移量，离border的距离；它和外轮廓属性没任何关系，是一个独立的属性。

------

### 新增的背景属性：

> - `background-origin`：设置背景图的原点。默认值是`padding-box`，背景图的原点是`padding`内边距的左上点。值还可以是`border-box`和`content-box`
> - `background-clip`：设置背景裁切。默认值是`border-box`，背景图充满整个盒子（包括边框）。值为`padding-box`表示背景图充满整个padding区，content-box是充满整个内容区。（注意：若值为`text`，表示背景只出现在文字后，此时必须将文字颜色设置为透明色`transparent`才可见背景图。并且目前谷歌浏览器要想使用，此属性名前必须加私有前缀）
> - `background-size`：设置背景图的尺寸。
>   - 2个值：`200px 100px;`，设置背景图的宽高尺寸。此处如果采用百分比的值，表示参考其容器大小的百分比。
>   - `auto`：默认值，直接左上角对齐，不管图或容器多大。
>   - `contain`：完整的包含整个背景，如果太大就等比例缩放，空的地方重复平铺。
>   - `cover`（最优）：等比例缩放背景，会丢弃一部分背景图。
> - （了解）复合写法：`background: 背景颜色 url 是否重复 位置 / 大小 原点 裁剪方式;`，原则：位置必须在大小的前面，且有斜杠/隔开，其他顺序无所谓。而且，如果原点和裁剪方式值相同，只写一个即可，2个值都写了前面的是设置原点。
> - 设置多背景：CS3允许一个容器中设置多背景，用`background`属性设置，多个设置之间用逗号`,`隔开

------

### 新增文本属性：

> - `text-shadow`：设置文本阴影，值和盒子阴影类似，只是没有“外延值/阴影大小”和“内阴影”。
>
>   例如，背景白色，字也是白色，看不见字，可以：`text-shadow: 0px 0px 20px black;`，就可以看见字了
>
> - `white-space: pre;`：设置内部文本按原文显示，跟<pre>标签类似，通常在div容器内部使用。值`pre-wrap`表示按原文显示，还得被容器包住，多出的换行；`pre-line`表示一行前后的空格都不看了；`nowarp`不换行
>
> - `text-overflow`：设置文本溢出，值`clip`表示超出直接截掉，`ellipsis`表示超出显示3个点...占位（要使该属性值`ellipsis`生效，该容器必须显示的定义两个属性：`overflow`为非visible值，还要加`white-space: nowarp;`）

------

### 渐变：

> 渐变本质上就是一张背景图片，是我们用代码将颜色铺开的特殊图；C3新增了渐变，共三种：线性渐变、径向渐变、重复渐变

- 线性渐变：沿着一条线完成的渐变。

  > `background-image: linear-gradient(red,yellow,green,..);/*颜色写几个都行，用逗号隔开，默认颜色从上到下*/`
  > `background-image: linear-gradient(to right,red,yellow,..);/*前面写to right控制线的方向，还可以写to left top*/`
  > `background-image: linear-gradient(20deg,red,yellow,green);/*顺时针旋转20度角的线*/`
  > `background-image: linear-gradient(red 50px,yellow 100px,green 150px);/*从上往下，50px处是纯红，依次是纯黄..*/`

- 径向渐变：根据容器的形状，从圆心四散完成的渐变。

  > `background-image: radial-gradient(red,yellow,green);/*从容器正中央到容器边缘，以椭圆形完成3种颜色的渐变*/`
  > `background-image: radial-gradient(at right top,red,yellow,green);/*通过第1个参数，可以调整圆心的位置，圆心在右上角*/`
  > `background-image: radial-gradient(at 150px 50px,red,yellow,..);/*通过坐标来调整，圆心点在x方向150px，y方向50px处*/`
  > `background-image: radial-gradient(circle,red,yellow,green);/*将渐变的形状强行设置为正圆形*/`
  > `background-image: radial-gradient(30px 20px,red,yellow,green);/*手动设置椭圆的半径30px 20px*/`
  > `background-image: radial-gradient(red 50px,yellow 100px,green 150px);/*同样也可以设置半径处的颜色*/`
  >
  > 混着来：`background-image: radial-gradient(30px 20px at 150px 50px,red 50px,yellow 100px,green 150px);`

- 重复渐变：就是在以上两种渐变的基础上，前面加`repeating-`，如：`repeating-linear-gradient()`。重复渐变会在没有发生渐变的区域，重新开始渐变。（所以如果设置了渐变的区域，如：`radial-gradient(red 50px,yellow 100px,green 150px);`，那么没有发生颜色渐变的纯色区，此时会进行重复渐变）


------

### WEB字体：

> 之前我们通过`font-family`设置字体，必须电脑上下载有的才可以显示，不能自定义。怎么使用自定义的字体呢？用WEB字体。
>
> 用户电脑上不需要提前安装，直接在自己的网页中引入该字体就行，用户端解析此网页时会自动下载对应的字体文件。使用：
>
> ```html
> <style>
>     /*在style标签块中直接使用该字体选择器，可以有多个*/
>     @font-face {/*这是简写形式*/
>     	font-family: "名字随便，你自己定",
>     	src: url('字体的地址，可以是本地也可以是网络')
>     }
> </style>
> ```
>
> - 但这种方式很不好，字体文件太大了。当用户在网络不好的环境下，访问一个网页还得下载那么大的字体包，很影响使用。
>
> - 所以有一种更好的办法，网页中要呈现哪些字，给这些字单独设计一个字体。（这里用阿里的在线定制web字体的网站：https://www.iconfont.cn/webfont/）
> - 我们将网页中的所有文字粘进去，然后下载生成的各种格式的字体包放在本地。除了里面的`demo.html`之外，其余的都是该字体的不同格式文件。（这种方式字体包非常小）
> - 这么多文件怎么引入呢，直接用`demo.html`里的`@font-face`就行，然后再将里面的字体路径改下即可。

### 字体图标：

> - 字体图标看起来像图片，但实际上是一种字。字体图标它本质是字体中的一个字，只不过这个字就是用来看的，一般用作网页的图标。使用字体图标的优势：相比图片更清晰；灵活性高，更方便改变大小、颜色、风格等；兼容性好、ie也能支持。
>
> - 字体图标的使用场景：有时一个网页中的一些东西需要“高保真”，此时图片就不行了，不同设备分辨率清晰度和缩放的关系，图片呈现出来容易发虚，此时就需要使用字体图标。它像一个字一样，无论怎么放大都不发虚，是矢量图。（阿里图标库地址：https://www.iconfont.cn/）
>
> - 阿里字体图标库的使用方式：（字体图标使用方式不尽相同，我们这里根据使用最多的阿里图标库来说明）
>
>   1. 将网站的字体图标加入购物车，然后添加至项目，查看在线链接，本地什么也不需要下，直接用在线方式引入。
>
>   2. （推荐）将网站的字体图标加入购物车添加至项目，下载至本地，按照说明书`demo.html`用，引入方式分为3种：
>
>      - Unicode：最原始的方式，兼容性最好，但可读性差，默认不支持彩色。
>
>      - （常用）font class：是上面方式的变种，就是加了css文件，可读性更好了，同样不支持彩色。
>
>      - Symbol：这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。
>
>        优点：
>
>        - 支持多色图标了，不再受单色限制
>        - 通过一些技巧，支持像字体那样，通过 font-size, color 来调整样式
>
>        缺点：
>
>        - 兼容性较差，支持 IE9+，及现代浏览器
>        - 浏览器渲染 SVG 的性能一般，还不如 png

------

### 过渡（transition）：

> - 过渡可以让页面在不使用flash，不使用JS的情况下，让元素从一种样式，平滑过渡到另一种样式，慢慢变过去。
> - 想让哪个元素的哪个属性开启过渡效果，就选中该元素，在其内部加：`transition-property: 属性名1, 属性名2;`，值`all`表示让所有**能过渡的属性**都开启过渡。然后再设置过滤的持续时间：`transition-durtion: 1s,100ms;`（单位可以是s或ms，默认时间为0），此时只要该属性的值发生了变化，那么这个变化效果就是过渡过去的，不是生硬的直接变的。
> - 不是所有属性都能过渡，属性的值必须是数字，这类有明确大小值的属性才能用过渡。比如：`display:none`就不能过渡，因为`none`不是`12px/12deg/12%/orange`这些数值。
> - `transition-delay: 2s;`：设置过渡延迟，2秒后再进行过渡。
> - `transition-timing-function`：设置过渡时间函数。默认值`ease`是“平滑过渡”，刚开始慢，中间快，最后慢。还有以下值：
>   - `ease`：慢快慢、平滑过渡
>   - `linear`：匀速
>   - `ease-in`：慢快
>   - `ease-out`：快慢
>   - `ease-in-out`：慢快慢，相比于ease来说不太柔和了
>   - `step-start`：一步直接完成过渡，相当于不过渡了，直接变过去
>   - `step-end`：刚开始不动，时间到了再直接过渡
>   - `steps(20,start/end)`：分20个阶段过去，第二个参数可选（start是在第1步是直接过去的，end是在最后1步时直接过去）
>   - （最牛的一种）值还可以写`cubic-bezier(a,b,c,d);`，贝塞尔曲线（这个函数值直接到网站上自己调：https://cubic-bezier.com），横轴是时间，纵轴是距离。（它可以做橡皮筋效果）
> - 过渡复合：`transition: 1s all 2s linear;`，注意“过渡时间函数”参数一定在最后，第1个时间是过渡时间，第2个时间是过渡延迟，`all`不写默认也是所有属性都开启过渡。

------

### 变换（transform）：

> 变换是元素的一个动作，在要进行变换的元素上加`transform`属性即可。（注意：变换只对块级元素或行内块元素有效）

> 变换分为2D和3D变换：

- 2D变换：

  - 位移：当变换的值为`translateX(20px)和translateY(20%)`时，表示2D位移，x轴正向移动20px，y轴正向移动自身大小的20%，（位移的百分比参考的是自身），如果水平和垂直都移动，两个`translate`之间用空格隔开，或者直接`transform: translate(20px,20%);`，位移不脱离文档流。
  - 缩放：当变换的值为`scaleX(0.5) scaleY(2);` 时，表示2d缩放，水平缩放比例0.5，垂直缩放比例2。还可以这样写：`transform: scale(1.5,2);` ，如果只写一个值，水平和垂直都缩放。（缩放还可以是负数，很少用）借助缩放，可将浏览器字体设置为小于浏览器的字体最小值。
  - 旋转：`transform: rotateZ(30deg);`，2D是绕Z轴旋转，绕中心点顺时针转30度；当括号内一个值时，写`rotate`也是一样的。
  - 扭曲（了解）：扭曲是让元素在二维平面内被拉扯，进而走形，实际开发几乎不用。如：`transform: skewX(30deg);`，x方向扭曲（拉扯），xy同时扭曲：`transform: skew(30deg,20deg);`
  - 多重变换：可以同时使用`transform`属性来设置多个2D变换，用空格隔开，如：`transform: translateX(20px) translateY(20%) rotateZ(30deg);`，（建议给旋转放在最后，因为旋转会破坏坐标系）

  > **变换原点**：一个元素在发生变换后，围绕的哪个点在变，那个点就是变换原点。如何设置变换原点，用：`transform-origin: left top;`，此时变换围绕的“变换原点”就变为了左上角，也可以`transform-origin: 40px 20px;`或者`transform-origin: 20% 20%;`，（注意： 变换原点只对缩放和旋转有影响，对位移没影响）

- 3D变换：（没有扭曲）

  > - 3D空间：要进行3D变换，首先找到要发生3D变换元素的父元素，在其**父元素上开启**3D空间：`transform-style: flat/preserve-3d;`（默认是`flat`没有开启3D空间），此时子元素进行`transform: rotateX(30deg);`，表示依据变换原点，绕x轴顺时针旋转30度。（为了更容易看到效果，还需要给父元素设置“景深”）
  >
  > - 景深：景深就是视点离z=0平面的距离，能让发生3D变换的元素产生“透视”效果（近大远小），看起来更立体。给**父元素**设置景深：`perspective: 500px;`（一般设置为子元素高度的一半再大点，默认值`none`）
  > - 景深点（透视点/观察点）的位置：默认是开启3D变换元素的正中央（父元素的正中央），也可以手动在**父元素上**设置：`perspective-origin: 20px 30px;`（一般不改）
  > - 3D变换原点：不想让3D变换绕中心点旋转，和2D一样，子元素设置变换原点`transform-origin: 102px 102px;`（值也可以写关键字letf、top等），同样只对缩放和旋转有影响。

  - 位移：3D位移就是在2D基础上，增加了`translateZ(10px);`和`translate3d(10px, 20px, 10px);`，使其可以在z轴上移动。

    （注意z轴移动的单位不能用%号，因为位移的百分比参考的是自身）

  - 旋转：3D旋转`ratateX(30deg); ratateY(30deg);`，而`ratate3d(1,0,1,30deg);`表示绕x轴转30度，y轴不转，绕z转30度（都是顺时针）

  - 缩放：3D缩放`scaleZ(2);`，就是将景深放大了2倍，原来景深500px，缩放2倍之后，景深是250px；还可以`scale3d(1.5, 1.5, 1);`表示宽高变大1.5倍，景深不变。（旋转可以通过设置属性：`backface-visibility: hidden;`，让旋转时背部不可见）

  - 多重变换：类似于2D变换，同样旋转也破坏坐标系，建议放最后。

------

### 动画（animation）：

> - 帧：一段动画就是一段时间内连续播放n张画面，每一张画面我们叫“帧”。一定时间内连续快速播放若干个帧，就构成了人们眼中的动画。同样时间内，播放的帧越多，画面越流畅。（一秒至少24帧人眼才不会感到卡顿）
>
> - 关键帧：在若干个帧中，起到决定性作用的2-3帧。我们浏览器实现动画效果，不用你把每一帧都给出来，只需要给出关键帧的样式即可，浏览器会自动完成动画的过渡效果。
>
> - 动画的使用：
>
>   1. `style`标签中定义动画的关键帧：
>
>      ```css
>      @keyframes donghuaming {/*定义一组关键帧/动画名，动画名不能重复*/
>          //第一帧
>          from {  /*也可以用：0% {}，百分比的方式，控制的更精细*/
>              /* 刚开始不需要动，或者：transform: translate(0px); */
>          }
>          //最后一帧
>          to {    /*也可以：100% {}*/
>              transform: translate(900px);
>          }
>      }
>      ```
>
>   2. 想让哪个元素在页面打开时就播放动画，就选中它加：`animation-name: donghuaming;`，然后再给动画设置持续时间：`animation-duration: 3s;`
>
> - 精细的定义关键帧的方式可以将第一帧写为：0%，最后一帧写写100%，当然中间可以加任意的百分比（可以和form/to的方式混着来用）

> - 动画和过渡的不同：虽然看起来过渡也能实现类似的效果，但它们还是有不同之处。
>   1. 过渡是标签的动作，一般都需要事件触发。而动画不需要，它定义好后，页面打开就动了。
>   2. 过渡只关心始末，中间你控制不了。而动画从始到终的每一帧的效果都可以控制。
> - 动画的其他常用属性：
>   - `animation-delay: 0.5s;`，设置动画延迟，页面加载完毕0.5s后再开始播放动画
>   - `animation-timing-function: steps(20);`，设置动画的方式，可选值和过渡是一样的。
>   - `animation-iteration-count: 3;`，设置动画重复播放的次数，`infinite`是无限播放。
>   - `animation-direction: normal;`，设置动画播放的方向，默认`normal`从from到to，`reverse`反转，从to到from，`alternate`是从from到to来回循环往复，`alternate-reverse`是从to到from来回循环往复。（注意：这2值当动画只放1次时就失效了）
>   - `animation-fill-mode: forwards;`，动画放完不动时，停在哪一帧，`forwards`是最后一帧，`backwards`是第一帧。
>   - `animation-play-state: paused;`，动画的播放状态，`paused`表示停止播放动画，默认`running`页面打开就播放动画。
>   - 复合属性`animation: donghua 2s 0.5s linear 10 alternate-reverse forwards running;`，duration写在delay之前就行，其他的顺序无所谓。（注意：暂停要写进去其他的都不行了，一般暂停单独写）

------

### 多列布局：

> 多列布局声明提供了一种多列组织内容的方式，正如你在一些报纸中看到的那样。多列布局相关的属性是专门用来实现，文字在多个容器之间组织和布局，让容器的内容分多列显示。直接给容器加这些属性就行。常用属性如下：

- `column-count: 5;`，指定容器内的文字分几列显示（块元素p中的文字照样能完美分开）
- `column-width: 250px;`，或者设置容器中每列的宽度，自动计算列数。

（上面2个属性的复合写法：`column: 6 220px;`，能同时指定列宽和列数，列数听少的那个，不推荐使用）

- `column-rule-width: 2px;`，设置列边框的宽度
- `column-rule-style: solid;` 列边框的样式
- `column-rule-color: red;` 列边框的颜色

（上面3的复合写法：`column-rule: 1px solid red;`）

- `column-gap: 50px;`，调整列间距。（就算是0，也只是给一个最小间距）

- 如何让某些内容横跨多列？选中容器中要横跨多列的元素，给其加样式：`column-span: none/all;`，就俩值，要么跨所有要么不跨。
- 如果要在内容里加图片，就直接用图片标签<img>即可。此时如果图片宽度设置为`width: 100%;`，表示图片宽度为那一列宽的100%

------

### 伸缩盒模型：

> 伸缩盒模型Flexible Box，又叫弹性盒子。它可以轻松控制元素的分布方式、对齐方式、视觉顺序等..，就是专门做html布局的（目前除了ie部分版本不支持，其他浏览器均已全部支持），因为它的出现，逐渐演变出了一套新的布局方案=>“flex布局”（传统靠浮动、定位做的布局效果，不能很好的在移动端呈现，所以目前移动端应用flex布局很多）

- `display: flex;`，如果在某个容器上加该属性开启了flex布局，此时该容器就变成了伸缩容器，容器里的所有直接子项都成了“伸缩项目”。当内部的元素变成了“伸缩项目”后，无论原来是哪种元素（块/行内/行内块），都会“块状化”，不会独占一行，都沿着主轴排列。
- （很少用，了解）`display: inline-flex;`，如果值是`inline-flex`，那么该容器是伸缩容器，且该容器还变成了行内块。
- 伸缩容器中有2个概念，主轴和侧轴：（只能改主轴，主轴改了侧轴会跟着改）
  - 主轴：伸缩容器中的伸缩项目，默认沿着主轴方向排列，主轴默认横着从左往右。
  - 侧轴（交叉轴）：默认竖着从上到下。
- `flex-direction: row;`，该属性可以修改伸缩容器的主轴，默认`row`横着从左到右，`row-reverse`是横着从右到左，还有`column`竖着从上到下和`column-reverse`从下到上。（主轴横线侧轴就纵向，主轴纵向侧轴就横向，默认侧轴都是从左往右或从上往下）
- `flex-wrap: wrap;`，通过该属性可以设置主轴上元素的换行方式，默认值`nowrap`不会换行，是“缩”的（即使伸缩项目设置了宽度，当它们超过了父容器的宽度后，每个的宽度还会变窄）。`wrap`表示换行（超过宽度就换行），`wrap-reverse`是内容从下往上换行。
- （了解）复合属性`flex-flow: row wrap;`，同时指定主轴方向和换行方式。（顺序随意）
- `justify-content: flex-start;`，设置主轴的对齐方式，默认值`flex-start`靠主轴起始位置对齐，`flex-end`靠主轴结束位置对齐。`center`是居中对齐，`space-around`是伸缩项目在一行上均匀分布，项目之间的距离是项目距边缘的2倍。`space-between`是项目之间等距离，项目与边缘紧挨着。`space-evenly`是无论和边缘还是项目之间，都是等距离。

- 设置伸缩项目，在侧轴（伸缩轴）上的对齐方式：
  - 一行内容：`align-items: flex-start/flex-end/center;`，侧轴起始位置/结束位置/中间位置对齐。`baseline`是沿着内部文字基线对齐，默认值`stretch`，表示高度拉伸至撑满整个父容器，它只有当所有伸缩项目都没给高度时才起作用（是伸的）。
  - 多行内容：`align-content: flex-start/flex-end/center;`，侧轴起始位置/结束位置/中间位置对齐。还有其他值：`space-around`、`space-between`、`space-evenly`、`stretch`是默认值。
- 借助flex布局来实现内部元素水平垂直居中：父元素开启伸缩布局，然后再加`justify-content: center; align-items: center;`

- 如果一个容器变成了伸缩容器，那么它内部的所有伸缩项目，此时都可以设置以下和“伸缩盒模型”相关的属性了：
  - （了解）`flex-basis: 300px;`，设置伸缩项目在主轴上的基准长度，若主轴是横向，宽`width`失效，若是纵向，高`height`失效，默认值是`auto`，没有基准长度，以元素的宽/高为基准长度。（该属性了解即可，浏览器是拿着这个属性来计算容器主轴空间是否还有富裕）
  - 伸缩容器的“伸”：`flex-grow: 0;`，默认值0，伸缩项目在主轴上不进行拉伸，纵使父容器主轴还有剩余空间。如果所有伸缩项目都设置该属性值为1，那么所有伸缩项目会进行拉伸，等分剩余空间。
  - 伸缩容器的“缩”：`flex-shrink: 1;`，默认值1，父容器的主轴空间不够了，伸缩项就开始压缩（只要属性是默认的`flex-wrap: nowrap;`就行），（“缩”的计算方式和“伸”不同，它是将1乘以当前宽（当前伸缩项目的伸缩值），然后除以总伸缩值，得出当前伸缩项目的伸缩比，用伸缩比去乘以总差值得出新宽度）
  - 上面3个属性的复合写法：`flex: 0 1 auto;`，这是该属性的默认值，不拉伸，压缩，没有基准长度。
    - `flex: 1 1 auto;`，表示可以拉伸，可以压缩，不设置基准长度，和`flex: auto;`是一样的。
    - flex: 1 1 0px; ，表示可以拉伸，可以压缩，基准长度为0，和`flex: 1;`是一样的。
    - `flex: 0 0 auto;`，表示不能拉伸，不能压缩，不设置基准长度，和`flex: none;`是一样的。
  - 伸缩项目的排序：`order: 0;`，默认值0，伸缩项目按照你代码的顺序排序，也可以自定义它们的顺序，值越小越靠前。
  - 侧轴方向的单独对齐：`align-self: flex-start/flex-end/center;`，该属性可以让某个伸缩项目脱离大部队，单独设置侧轴的对齐方式。默认值`auto`，表示继承父元素的`align-items`属性的值。

------

### 媒体查询：

> - 媒体查询通常用来实现“响应式布局”，通常响应式布局在页面布局不那么复杂的情况下使用。
>
> - 之前布局时就说过，响应式布局弱化了版心的概念，照顾到了不同大小的屏幕，是一种更高级的布局方式。要实现响应式布局，浏览器得知道你的屏幕宽度，此时就用到了“媒体查询”。媒体查询的功能很强大，比如：它能查询你的媒体类型，是电脑、手机、还是打印机...

- 查询“媒体类型”：

  ```css
  /*检测到媒体类型是打印机时，大括号内容才生效渲染，就很像if代码块*/
  @media print {/*screen代表各种屏幕，all代表所有设备*/
      /*style标签里怎么写，这里面就怎么写；优先级和之前的css优先级是一样的*/
      h1 {
          background-color: red;
      }
  }
  ```

- 查询“媒体特性”：（得加小括号）

  > 媒体特性就是，屏幕的宽高等，媒体设备的属性。通过查询这些属性的不同值来渲染不同的css样式。媒体特性常用值：

  ```css
  /*检测到视口宽度等于800像素时，大括号内容才生效*/
  @media (width:800px) {
      /**/
      h1 {
          background-color: red;
      }
  }
  /*
  max-width表示视口宽度最多到800px，当<=800px时生效。同样还有min-width。
  height是视口高度，device-width是设备宽度，指电脑显示器的宽度而不是单单浏览器内部视口的宽度，而且要算上操作系统的缩放。（这俩也都有带max和min的属性）
  还有一个值是orientation，可以检测视口是宽大还是高大，看视口是横屏的还是竖屏的，值portrait表示视口是纵向的，高>宽。
      值landscape表示视口横向的，宽>高。
  */
  ```

- 媒体查询的运算符：（and , not only）

  ```css
  @media (width:800px) and screen {}/*and是且*/
  @media (max-height:800px) , screen {}/*逗号,是或，逗号可以换成or运算符*/
  @media not screen {}/*not取反*/
  /*only是仅有的意思，和不加一样的。但是由于ie浏览器只认媒体类型不认媒体特性，所以加上这个在ie上运行时，它不认识only，所以整体都不会被渲染，不会出现一部分渲染，加不加看公司要求*/
  @media only screen {}
  ```

**（媒体查询还有一种用法，就是在link标签里写media="这里写@media后面的东西"，表示只有满足条件才引入该css文件）**

------

### BFC：

> - BFC的官方定义：浮动、绝对定位元素、不是块盒子的块容器（如`inline-blocks`、`table-cells`和`table-captions`），以及`overflow`属性的值除`visible`以外的块盒，将为其内容建立新的“块格式上下文”。
>
> - MDC上对于BFC的描述：块格式上下文（BFC）是web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
>
> - 通俗的说：BFC可以理解为元素的一个“特异功能”，该特异功能在默认的条件下处于关闭状态，当元素满足了某些条件后，该特异功能被激活。专业点说就是，该元素开启了BFC。
>
> - 开启BFC之后能解决什么问题？（虽然能解决，但多多少少都有一些小问题）
>   1. 元素开启BFC后，**其子元素不会产生margin塌陷问题**
>   2. 元素开启BFC后，**不会被其他浮动元素所覆盖**
>   3. 元素开启BFC后，内部子元素就算浮动，**自身高度也不会塌陷**
>
> - 默认开启BFC的元素有：
>   - 根元素`<html>`
>   - 浮动元素
>   - 绝对定位、固定定位的元素
>   - 行内块元素
>   - 表格相关的标签，`<tr>、<table>、<tbody>、<caption>`
>   - `overflow`的值不为`visible`的“块元素”
>   - 伸缩项目
>   - 多列容器
>   - 设置了`column-span: all;`的元素（即使该元素没有包含在多列容器中）
>   - 设置了`display: flow-root;`的元素（这种方式对元素的其他影响最小，推荐使用，但ie可能不支持该属性）
>
> - 写页面的时候不要想BFC，出问题了再想想是不是BFC的事，再来找解决方案。还有，虽然BFC也可以清除浮动影响，但是还按照之前的解决方案来。

