- ## DOM

  > ## DOM
  >
  > DOM 是 JS 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JS 对象，从而可以用脚本进行各种操作（比如增删内容）。
  >
  > 浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。
  >
  > DOM 只是一个接口规范，可以用各种语言实现。所以严格地说，DOM 不是 JS 语法的一部分，但是 DOM 操作是 JS 最常见的任务，离开了 DOM，JS 就无法控制网页。另一方面，JS 也是最常用于 DOM 操作的语言。后面介绍的就是 JS 对 DOM 标准的实现和用法。
  >
  > ## 节点
  >
  > DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。
  >
  > 节点的类型有七种。
  >
  > - `Document`：整个文档树的顶层节点
  > - `DocumentType`：`doctype`标签（比如`<!DOCTYPE html>`）
  > - `Element`：网页的各种HTML标签（比如`<body>`、`<a>`等）
  > - `Attr`：网页元素的属性（比如`class="right"`）
  > - `Text`：标签之间或标签包含的文本
  > - `Comment`：注释
  > - `DocumentFragment`：文档的片段
  >
  > 浏览器提供一个原生的节点对象`Node`，上面这七种节点都继承了`Node`，因此具有一些共同的属性和方法。
  >
  > ## 节点树
  >
  > 一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 DOM 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，又像一棵树。
  >
  > 浏览器原生提供`document`节点，代表整个文档。
  >
  > ```
  > document
  > // 整个文档树
  > ```
  >
  > 文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 HTML 网页的顶层容器标签`<html>`。后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。
  >
  > 除了根节点，其他节点都有三种层级关系。
  >
  > - 父节点关系（parentNode）：直接的那个上级节点
  > - 子节点关系（childNodes）：直接的下级节点
  > - 同级节点关系（sibling）：拥有同一个父节点的节点
  >
  > DOM 提供操作接口，用来获取这三种关系的节点。比如，子节点接口包括`firstChild`（第一个子节点）和`lastChild`（最后一个子节点）等属性，同级节点接口包括`nextSibling`（紧邻在后的那个同级节点）和`previousSibling`（紧邻在前的那个同级节点）属性。

  - Node 接口

    > 所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础。
    >
    > ## 属性
    >
    > ### Node.prototype.nodeType
    >
    > `nodeType`属性返回一个整数值，表示节点的类型。
    >
    > ```
    > document.nodeType // 9
    > ```
    >
    > 上面代码中，文档节点的类型值为9。
    >
    > Node 对象定义了几个常量，对应这些类型值。
    >
    > ```
    > document.nodeType === Node.DOCUMENT_NODE // true
    > ```
    >
    > 上面代码中，文档节点的`nodeType`属性等于常量`Node.DOCUMENT_NODE`。
    >
    > 不同节点的`nodeType`属性值和对应的常量如下。
    >
    > - 文档节点（document）：9，对应常量`Node.DOCUMENT_NODE`
    > - 元素节点（element）：1，对应常量`Node.ELEMENT_NODE`
    > - 属性节点（attr）：2，对应常量`Node.ATTRIBUTE_NODE`
    > - 文本节点（text）：3，对应常量`Node.TEXT_NODE`
    > - 文档片断节点（DocumentFragment）：11，对应常量`Node.DOCUMENT_FRAGMENT_NODE`
    > - 文档类型节点（DocumentType）：10，对应常量`Node.DOCUMENT_TYPE_NODE`
    > - 注释节点（Comment）：8，对应常量`Node.COMMENT_NODE`
    >
    > 确定节点类型时，使用`nodeType`属性是常用方法。
    >
    > ```
    > var node = document.documentElement.firstChild;
    > if (node.nodeType === Node.ELEMENT_NODE) {
    >   console.log('该节点是元素节点');
    > }
    > ```
    >
    > ### Node.prototype.nodeName
    >
    > `nodeName`属性返回节点的名称。
    >
    > ```
    > // HTML 代码如下
    > // <div id="d1">hello world</div>
    > var div = document.getElementById('d1');
    > div.nodeName // "DIV"
    > ```
    >
    > 上面代码中，元素节点`<div>`的`nodeName`属性就是大写的标签名`DIV`。
    >
    > 不同节点的`nodeName`属性值如下。
    >
    > - 文档节点（document）：`#document`
    > - 元素节点（element）：大写的标签名
    > - 属性节点（attr）：属性的名称
    > - 文本节点（text）：`#text`
    > - 文档片断节点（DocumentFragment）：`#document-fragment`
    > - 文档类型节点（DocumentType）：文档的类型
    > - 注释节点（Comment）：`#comment`
    >
    > ### Node.prototype.nodeValue
    >
    > `nodeValue`属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。
    >
    > 只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的`nodeValue`可以返回结果，其他类型的节点一律返回`null`。同样的，也只有这三类节点可以设置`nodeValue`属性的值，其他类型的节点设置无效。
    >
    > ```
    > // HTML 代码如下
    > // <div id="d1">hello world</div>
    > var div = document.getElementById('d1');
    > div.nodeValue // null
    > div.firstChild.nodeValue // "hello world"
    > ```
    >
    > 上面代码中，`div`是元素节点，`nodeValue`属性返回`null`。`div.firstChild`是文本节点，所以可以返回文本值。
    >
    > ### Node.prototype.textContent
    >
    > `textContent`属性返回当前节点和它的所有后代节点的文本内容。
    >
    > ```
    > // HTML 代码为
    > // <div id="divA">This is <span>some</span> text</div>
    > 
    > document.getElementById('divA').textContent
    > // This is some text
    > ```
    >
    > `textContent`属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容。
    >
    > 该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容。
    >
    > ```
    > document.getElementById('foo').textContent = '<p>GoodBye!</p>';
    > ```
    >
    > 上面代码在插入文本时，会将`<p>`标签解释为文本，而不会当作标签处理。
    >
    > 对于文本节点（text）、注释节点（comment）和属性节点（attr），`textContent`属性的值与`nodeValue`属性相同。对于其他类型的节点，该属性会将每个子节点（不包括注释节点）的内容连接在一起返回。如果一个节点没有子节点，则返回空字符串。
    >
    > 文档节点（document）和文档类型节点（doctype）的`textContent`属性为`null`。如果要读取整个文档的内容，可以使用`document.documentElement.textContent`。
    >
    > ### Node.prototype.baseURI
    >
    > `baseURI`属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读。
    >
    > ```
    > // 当前网页的网址为
    > // http://www.example.com/index.html
    > document.baseURI
    > // "http://www.example.com/index.html"
    > ```
    >
    > 如果无法读到网页的 URL，`baseURI`属性返回`null`。
    >
    > 该属性的值一般由当前网址的 URL（即`window.location`属性）决定，但是可以使用 HTML 的`<base>`标签，改变该属性的值。
    >
    > ```
    > <base href="http://www.example.com/page.html">
    > ```
    >
    > 设置了以后，`baseURI`属性就返回`<base>`标签设置的值。
    >
    > ### Node.prototype.ownerDocument
    >
    > `Node.ownerDocument`属性返回当前节点所在的顶层文档对象，即`document`对象。
    >
    > ```
    > var d = p.ownerDocument;
    > d === document // true
    > ```
    >
    > `document`对象本身的`ownerDocument`属性，返回`null`。
    >
    > ### Node.prototype.nextSibling
    >
    > `Node.nextSibling`属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <div id="d1">hello</div><div id="d2">world</div>
    > var d1 = document.getElementById('d1');
    > var d2 = document.getElementById('d2');
    > 
    > d1.nextSibling === d2 // true
    > ```
    >
    > 上面代码中，`d1.nextSibling`就是紧跟在`d1`后面的同级节点`d2`。
    >
    > 注意，该属性还包括文本节点和注释节点（`<!-- comment -->`）。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。
    >
    > `nextSibling`属性可以用来遍历所有子节点。
    >
    > ```
    > var el = document.getElementById('div1').firstChild;
    > 
    > while (el !== null) {
    >   console.log(el.nodeName);
    >   el = el.nextSibling;
    > }
    > ```
    >
    > 上面代码遍历`div1`节点的所有子节点。
    >
    > ### Node.prototype.previousSibling
    >
    > `previousSibling`属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <div id="d1">hello</div><div id="d2">world</div>
    > var d1 = document.getElementById('d1');
    > var d2 = document.getElementById('d2');
    > 
    > d2.previousSibling === d1 // true
    > ```
    >
    > 上面代码中，`d2.previousSibling`就是`d2`前面的同级节点`d1`。
    >
    > 注意，该属性还包括文本节点和注释节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格。
    >
    > ### Node.prototype.parentNode
    >
    > `parentNode`属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。
    >
    > ```
    > if (node.parentNode) {
    >   node.parentNode.removeChild(node);
    > }
    > ```
    >
    > 上面代码中，通过`node.parentNode`属性将`node`节点从文档里面移除。
    >
    > 文档节点（document）和文档片段节点（documentfragment）的父节点都是`null`。另外，对于那些生成后还没插入 DOM 树的节点，父节点也是`null`。
    >
    > ### Node.prototype.parentElement
    >
    > `parentElement`属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回`null`。
    >
    > ```
    > if (node.parentElement) {
    >   node.parentElement.style.color = 'red';
    > }
    > ```
    >
    > 上面代码中，父元素节点的样式设定了红色。
    >
    > 由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（documentfragment）。`parentElement`属性相当于把后两种父节点都排除了。
    >
    > ### Node.prototype.firstChild，Node.prototype.lastChild
    >
    > `firstChild`属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <p id="p1"><span>First span</span></p>
    > var p1 = document.getElementById('p1');
    > p1.firstChild.nodeName // "SPAN"
    > ```
    >
    > 上面代码中，`p`元素的第一个子节点是`span`元素。
    >
    > 注意，`firstChild`返回的除了元素节点，还可能是文本节点或注释节点。
    >
    > ```
    > // HTML 代码如下
    > // <p id="p1">
    > //   <span>First span</span>
    > //  </p>
    > var p1 = document.getElementById('p1');
    > p1.firstChild.nodeName // "#text"
    > ```
    >
    > 上面代码中，`p`元素与`span`元素之间有空白字符，这导致`firstChild`返回的是文本节点。
    >
    > `lastChild`属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回`null`。用法与`firstChild`属性相同。
    >
    > ### Node.prototype.childNodes
    >
    > `childNodes`属性返回一个类似数组的对象（`NodeList`集合），成员包括当前节点的所有子节点。
    >
    > ```
    > var children = document.querySelector('ul').childNodes;
    > ```
    >
    > 上面代码中，`children`就是`ul`元素的所有子节点。
    >
    > 使用该属性，可以遍历某个节点的所有子节点。
    >
    > ```
    > var div = document.getElementById('div1');
    > var children = div.childNodes;
    > 
    > for (var i = 0; i < children.length; i++) {
    >   // ...
    > }
    > ```
    >
    > 文档节点（document）就有两个子节点：文档类型节点（docType）和 HTML 根元素节点。
    >
    > ```
    > var children = document.childNodes;
    > for (var i = 0; i < children.length; i++) {
    >   console.log(children[i].nodeType);
    > }
    > // 10
    > // 1
    > ```
    >
    > 上面代码中，文档节点的第一个子节点的类型是10（即文档类型节点），第二个子节点的类型是1（即元素节点）。
    >
    > 注意，除了元素节点，`childNodes`属性的返回值还包括文本节点和注释节点。如果当前节点不包括任何子节点，则返回一个空的`NodeList`集合。由于`NodeList`对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。
    >
    > ### Node.prototype.isConnected
    >
    > `isConnected`属性返回一个布尔值，表示当前节点是否在文档之中。
    >
    > ```
    > var test = document.createElement('p');
    > test.isConnected // false
    > 
    > document.body.appendChild(test);
    > test.isConnected // true
    > ```
    >
    > 上面代码中，`test`节点是脚本生成的节点，没有插入文档之前，`isConnected`属性返回`false`，插入之后返回`true`。
    >
    > ## 方法
    >
    > ### Node.prototype.appendChild()
    >
    > `appendChild()`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
    >
    > ```
    > var p = document.createElement('p');
    > document.body.appendChild(p);
    > ```
    >
    > 上面代码新建一个`<p>`节点，将其插入`document.body`的尾部。
    >
    > 如果参数节点是 DOM 已经存在的节点，`appendChild()`方法会将其从原来的位置，移动到新位置。
    >
    > ```
    > var div = document.getElementById('myDiv');
    > document.body.appendChild(div);
    > ```
    >
    > 上面代码中，插入的是一个已经存在的节点`myDiv`，结果就是该节点会从原来的位置，移动到`document.body`的尾部。
    >
    > 如果`appendChild()`方法的参数是`DocumentFragment`节点，那么插入的是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值是一个空的`DocumentFragment`节点。
    >
    > ### Node.prototype.hasChildNodes()
    >
    > `hasChildNodes`方法返回一个布尔值，表示当前节点是否有子节点。
    >
    > ```
    > var foo = document.getElementById('foo');
    > 
    > if (foo.hasChildNodes()) {
    >   foo.removeChild(foo.childNodes[0]);
    > }
    > ```
    >
    > 上面代码表示，如果`foo`节点有子节点，就移除第一个子节点。
    >
    > 注意，子节点包括所有类型的节点，并不仅仅是元素节点。哪怕节点只包含一个空格，`hasChildNodes`方法也会返回`true`。
    >
    > 判断一个节点有没有子节点，有许多种方法，下面是其中的三种。
    >
    > - `node.hasChildNodes()`
    > - `node.firstChild !== null`
    > - `node.childNodes && node.childNodes.length > 0`
    >
    > `hasChildNodes`方法结合`firstChild`属性和`nextSibling`属性，可以遍历当前节点的所有后代节点。
    >
    > ```
    > function DOMComb(parent, callback) {
    >   if (parent.hasChildNodes()) {
    >     for (var node = parent.firstChild; node; node = node.nextSibling) {
    >       DOMComb(node, callback);
    >     }
    >   }
    >   callback(parent);
    > }
    > 
    > // 用法
    > DOMComb(document.body, console.log)
    > ```
    >
    > 上面代码中，`DOMComb`函数的第一个参数是某个指定的节点，第二个参数是回调函数。这个回调函数会依次作用于指定节点，以及指定节点的所有后代节点。
    >
    > ### Node.prototype.cloneNode()
    >
    > `cloneNode`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
    >
    > ```
    > var cloneUL = document.querySelector('ul').cloneNode(true);
    > ```
    >
    > 该方法有一些使用注意点。
    >
    > （1）克隆一个节点，会拷贝该节点的所有属性，但是会丧失`addEventListener`方法和`on-`属性（即`node.onclick = fn`），添加在这个节点上的事件回调函数。
    >
    > （2）该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如`Node.appendChild`这样的方法添加到文档之中。
    >
    > （3）克隆一个节点之后，DOM 有可能出现两个有相同`id`属性（即`id="xxx"`）的网页元素，这时应该修改其中一个元素的`id`属性。如果原节点有`name`属性，可能也需要修改。
    >
    > ### Node.prototype.insertBefore()
    >
    > `insertBefore`方法用于将某个节点插入父节点内部的指定位置。
    >
    > ```
    > var insertedNode = parentNode.insertBefore(newNode, referenceNode);
    > ```
    >
    > `insertBefore`方法接受两个参数，第一个参数是所要插入的节点`newNode`，第二个参数是父节点`parentNode`内部的一个子节点`referenceNode`。`newNode`将插在`referenceNode`这个子节点的前面。返回值是插入的新节点`newNode`。
    >
    > ```
    > var p = document.createElement('p');
    > document.body.insertBefore(p, document.body.firstChild);
    > ```
    >
    > 上面代码中，新建一个`<p>`节点，插在`document.body.firstChild`的前面，也就是成为`document.body`的第一个子节点。
    >
    > 如果`insertBefore`方法的第二个参数为`null`，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。
    >
    > ```
    > var p = document.createElement('p');
    > document.body.insertBefore(p, null);
    > ```
    >
    > 上面代码中，`p`将成为`document.body`的最后一个子节点。这也说明`insertBefore`的第二个参数不能省略。
    >
    > 注意，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。
    >
    > 由于不存在`insertAfter`方法，如果新节点要插在父节点的某个子节点后面，可以用`insertBefore`方法结合`nextSibling`属性模拟。
    >
    > ```
    > parent.insertBefore(s1, s2.nextSibling);
    > ```
    >
    > 上面代码中，`parent`是父节点，`s1`是一个全新的节点，`s2`是可以将`s1`节点，插在`s2`节点的后面。如果`s2`是当前节点的最后一个子节点，则`s2.nextSibling`返回`null`，这时`s1`节点会插在当前节点的最后，变成当前节点的最后一个子节点，等于紧跟在`s2`的后面。
    >
    > 如果要插入的节点是`DocumentFragment`类型，那么插入的将是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值将是一个空的`DocumentFragment`节点。
    >
    > ### Node.prototype.removeChild()
    >
    > `removeChild`方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
    >
    > ```
    > var divA = document.getElementById('A');
    > divA.parentNode.removeChild(divA);
    > ```
    >
    > 上面代码移除了`divA`节点。注意，这个方法是在`divA`的父节点上调用的，不是在`divA`上调用的。
    >
    > 下面是如何移除当前节点的所有子节点。
    >
    > ```
    > var element = document.getElementById('top');
    > while (element.firstChild) {
    >   element.removeChild(element.firstChild);
    > }
    > ```
    >
    > 被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。
    >
    > 如果参数节点不是当前节点的子节点，`removeChild`方法将报错。
    >
    > ### Node.prototype.replaceChild()
    >
    > `replaceChild`方法用于将一个新的节点，替换当前节点的某一个子节点。
    >
    > ```
    > var replacedNode = parentNode.replaceChild(newChild, oldChild);
    > ```
    >
    > 上面代码中，`replaceChild`方法接受两个参数，第一个参数`newChild`是用来替换的新节点，第二个参数`oldChild`是将要替换走的子节点。返回值是替换走的那个节点`oldChild`。
    >
    > ```
    > var divA = document.getElementById('divA');
    > var newSpan = document.createElement('span');
    > newSpan.textContent = 'Hello World!';
    > divA.parentNode.replaceChild(newSpan, divA);
    > ```
    >
    > 上面代码是如何将指定节点`divA`替换走。
    >
    > ### Node.prototype.contains()
    >
    > `contains`方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。
    >
    > - 参数节点为当前节点。
    > - 参数节点为当前节点的子节点。
    > - 参数节点为当前节点的后代节点。
    >
    > ```
    > document.body.contains(node)
    > ```
    >
    > 上面代码检查参数节点`node`，是否包含在当前文档之中。
    >
    > 注意，当前节点传入`contains`方法，返回`true`。
    >
    > ```
    > nodeA.contains(nodeA) // true
    > ```
    >
    > ### Node.prototype.compareDocumentPosition()
    >
    > `compareDocumentPosition`方法的用法，与`contains`方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系。
    >
    > | 二进制值 | 十进制值 | 含义                                               |
    > | -------- | -------- | -------------------------------------------------- |
    > | 000000   | 0        | 两个节点相同                                       |
    > | 000001   | 1        | 两个节点不在同一个文档（即有一个节点不在当前文档） |
    > | 000010   | 2        | 参数节点在当前节点的前面                           |
    > | 000100   | 4        | 参数节点在当前节点的后面                           |
    > | 001000   | 8        | 参数节点包含当前节点                               |
    > | 010000   | 16       | 当前节点包含参数节点                               |
    > | 100000   | 32       | 浏览器内部使用                                     |
    >
    > ```
    > // HTML 代码如下
    > // <div id="mydiv">
    > //   <form><input id="test" /></form>
    > // </div>
    > 
    > var div = document.getElementById('mydiv');
    > var input = document.getElementById('test');
    > 
    > div.compareDocumentPosition(input) // 20
    > input.compareDocumentPosition(div) // 10
    > ```
    >
    > 上面代码中，节点`div`包含节点`input`（二进制`010000`），而且节点`input`在节点`div`的后面（二进制`000100`），所以第一个`compareDocumentPosition`方法返回`20`（二进制`010100`，即`010000 + 000100`），第二个`compareDocumentPosition`方法返回`10`（二进制`001010`）。
    >
    > 由于`compareDocumentPosition`返回值的含义，定义在每一个比特位上，所以如果要检查某一种特定的含义，就需要使用比特位运算符。
    >
    > ```
    > var head = document.head;
    > var body = document.body;
    > if (head.compareDocumentPosition(body) & 4) {
    >   console.log('文档结构正确');
    > } else {
    >   console.log('<body> 不能在 <head> 前面');
    > }
    > ```
    >
    > 上面代码中，`compareDocumentPosition`的返回值与`4`（又称掩码）进行与运算（`&`），得到一个布尔值，表示`<head>`是否在`<body>`前面。
    >
    > ### Node.prototype.isEqualNode()，Node.prototype.isSameNode()
    >
    > `isEqualNode`方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。
    >
    > ```
    > var p1 = document.createElement('p');
    > var p2 = document.createElement('p');
    > 
    > p1.isEqualNode(p2) // true
    > ```
    >
    > `isSameNode`方法返回一个布尔值，表示两个节点是否为同一个节点。
    >
    > ```
    > var p1 = document.createElement('p');
    > var p2 = document.createElement('p');
    > 
    > p1.isSameNode(p2) // false
    > p1.isSameNode(p1) // true
    > ```
    >
    > ### Node.prototype.normalize()
    >
    > `normalize`方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。
    >
    > ```
    > var wrapper = document.createElement('div');
    > 
    > wrapper.appendChild(document.createTextNode('Part 1 '));
    > wrapper.appendChild(document.createTextNode('Part 2 '));
    > 
    > wrapper.childNodes.length // 2
    > wrapper.normalize();
    > wrapper.childNodes.length // 1
    > ```
    >
    > 上面代码使用`normalize`方法之前，`wrapper`节点有两个毗邻的文本子节点。使用`normalize`方法之后，两个文本子节点被合并成一个。
    >
    > 该方法是`Text.splitText`的逆方法，可以查看《Text 节点对象》一章，了解更多内容。
    >
    > ### Node.prototype.getRootNode()
    >
    > `getRootNode()`方法返回当前节点所在文档的根节点`document`，与`ownerDocument`属性的作用相同。
    >
    > ```
    > document.body.firstChild.getRootNode() === document
    > // true
    > document.body.firstChild.getRootNode() === document.body.firstChild.ownerDocument
    > // true
    > ```
    >
    > 该方法可用于`document`节点自身，这一点与`document.ownerDocument`不同。
    >
    > ```
    > document.getRootNode() // document
    > document.ownerDocument // null
    > ```

  - NodeList 接口，HTMLCollection 接口

    > 节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：`NodeList`和`HTMLCollection`。
    >
    > 这两种集合都属于接口规范。许多 DOM 属性和方法，返回的结果是`NodeList`实例或`HTMLCollection`实例。主要区别是，`NodeList`可以包含各种类型的节点，`HTMLCollection`只能包含 HTML 元素节点。
    >
    > ## NodeList 接口
    >
    > ### 概述
    >
    > `NodeList`实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到`NodeList`实例。
    >
    > - `Node.childNodes`
    > - `document.querySelectorAll()`等节点搜索方法
    >
    > ```
    > document.body.childNodes instanceof NodeList // true
    > ```
    >
    > `NodeList`实例很像数组，可以使用`length`属性和`forEach`方法。但是，它不是数组，不能使用`pop`或`push`之类数组特有的方法。
    >
    > ```
    > var children = document.body.childNodes;
    > 
    > Array.isArray(children) // false
    > 
    > children.length // 34
    > children.forEach(console.log)
    > ```
    >
    > 上面代码中，NodeList 实例`children`不是数组，但是具有`length`属性和`forEach`方法。
    >
    > 如果`NodeList`实例要使用数组方法，可以将其转为真正的数组。
    >
    > ```
    > var children = document.body.childNodes;
    > var nodeArr = Array.prototype.slice.call(children);
    > ```
    >
    > 除了使用`forEach`方法遍历 NodeList 实例，还可以使用`for`循环。
    >
    > ```
    > var children = document.body.childNodes;
    > 
    > for (var i = 0; i < children.length; i++) {
    >   var item = children[i];
    > }
    > ```
    >
    > 注意，NodeList 实例可能是动态集合，也可能是静态集合。所谓动态集合就是一个活的集合，DOM 删除或新增一个相关节点，都会立刻反映在 NodeList 实例。目前，只有`Node.childNodes`返回的是一个动态集合，其他的 NodeList 都是静态集合。
    >
    > ```
    > var children = document.body.childNodes;
    > children.length // 18
    > document.body.appendChild(document.createElement('p'));
    > children.length // 19
    > ```
    >
    > 上面代码中，文档增加一个子节点，NodeList 实例`children`的`length`属性就增加了1。
    >
    > ### NodeList.prototype.length
    >
    > `length`属性返回 NodeList 实例包含的节点数量。
    >
    > ```
    > document.querySelectorAll('xxx').length
    > // 0
    > ```
    >
    > 上面代码中，`document.querySelectorAll`返回一个 NodeList 集合。对于那些不存在的 HTML 标签，`length`属性返回`0`。
    >
    > ### NodeList.prototype.forEach()
    >
    > `forEach`方法用于遍历 NodeList 的所有成员。它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的`forEach`方法完全一致。
    >
    > ```
    > var children = document.body.childNodes;
    > children.forEach(function f(item, i, list) {
    >   // ...
    > }, this);
    > ```
    >
    > 上面代码中，回调函数`f`的三个参数依次是当前成员、位置和当前 NodeList 实例。`forEach`方法的第二个参数，用于绑定回调函数内部的`this`，该参数可省略。
    >
    > ### NodeList.prototype.item()
    >
    > `item`方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
    >
    > ```
    > document.body.childNodes.item(0)
    > ```
    >
    > 上面代码中，`item(0)`返回第一个成员。
    >
    > 如果参数值大于实际长度，或者索引不合法（比如负数），`item`方法返回`null`。如果省略参数，`item`方法会报错。
    >
    > 所有类似数组的对象，都可以使用方括号运算符取出成员。一般情况下，都是使用方括号运算符，而不使用`item`方法。
    >
    > ```
    > document.body.childNodes[0]
    > ```
    >
    > ### NodeList.prototype.keys()，NodeList.prototype.values()，NodeList.prototype.entries()
    >
    > 这三个方法都返回一个 ES6 的迭代器对象，可以通过`for...of`循环遍历获取每一个成员的信息。区别在于，`keys()`返回键名的迭代器，`values()`返回键值的迭代器，`entries()`返回的迭代器同时包含键名和键值的信息。
    >
    > ```
    > var children = document.body.childNodes;
    > 
    > for (var key of children.keys()) {
    >   console.log(key);
    > }
    > // 0
    > // 1
    > // 2
    > // ...
    > 
    > for (var value of children.values()) {
    >   console.log(value);
    > }
    > // #text
    > // <script>
    > // ...
    > 
    > for (var entry of children.entries()) {
    >   console.log(entry);
    > }
    > // Array [ 0, #text ]
    > // Array [ 1, <script> ]
    > // ...
    > ```
    >
    > ## HTMLCollection 接口
    >
    > ### 概述
    >
    > `HTMLCollection`是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点。它的返回值是一个类似数组的对象，但是与`NodeList`接口不同，`HTMLCollection`没有`forEach`方法，只能使用`for`循环遍历。
    >
    > 返回`HTMLCollection`实例的，主要是一些`Document`对象的集合属性，比如`document.links`、`document.forms`、`document.images`等。
    >
    > ```
    > document.links instanceof HTMLCollection // true
    > ```
    >
    > `HTMLCollection`实例都是动态集合，节点的变化会实时反映在集合中。
    >
    > 如果元素节点有`id`或`name`属性，那么`HTMLCollection`实例上面，可以使用`id`属性或`name`属性引用该节点元素。如果没有对应的节点，则返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <img id="pic" src="http://example.com/foo.jpg">
    > 
    > var pic = document.getElementById('pic');
    > document.images.pic === pic // true
    > ```
    >
    > 上面代码中，`document.images`是一个`HTMLCollection`实例，可以通过`<img>`元素的`id`属性值，从`HTMLCollection`实例上取到这个元素。
    >
    > ### HTMLCollection.prototype.length
    >
    > `length`属性返回`HTMLCollection`实例包含的成员数量。
    >
    > ```
    > document.links.length // 18
    > ```
    >
    > ### HTMLCollection.prototype.item()
    >
    > `item`方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
    >
    > ```
    > var c = document.images;
    > var img0 = c.item(0);
    > ```
    >
    > 上面代码中，`item(0)`表示返回0号位置的成员。由于方括号运算符也具有同样作用，而且使用更方便，所以一般情况下，总是使用方括号运算符。
    >
    > 如果参数值超出成员数量或者不合法（比如小于0），那么`item`方法返回`null`。
    >
    > ### HTMLCollection.prototype.namedItem()
    >
    > `namedItem`方法的参数是一个字符串，表示`id`属性或`name`属性的值，返回当前集合中对应的元素节点。如果没有对应的节点，则返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <img id="pic" src="http://example.com/foo.jpg">
    > 
    > var pic = document.getElementById('pic');
    > document.images.namedItem('pic') === pic // true
    > ```
    >
    > `Collection.namedItem('value')`等同于`Collection['value']`。

  - ParentNode 接口，ChildNode 接口

    > 节点对象除了继承 Node 接口以外，还拥有其他接口。`ParentNode`接口表示当前节点是一个父节点，提供一些处理子节点的方法。`ChildNode`接口表示当前节点是一个子节点，提供一些相关方法。
    >
    > ## ParentNode 接口
    >
    > 如果当前节点是父节点，就会混入了（mixin）`ParentNode`接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会拥有`ParentNode`接口。
    >
    > ### ParentNode.children
    >
    > `children`属性返回一个`HTMLCollection`实例，成员是当前节点的所有元素子节点。该属性只读。
    >
    > 下面是遍历某个节点的所有元素子节点的示例。
    >
    > ```
    > for (var i = 0; i < el.children.length; i++) {
    >   // ...
    > }
    > ```
    >
    > 注意，`children`属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）。如果没有元素类型的子节点，返回值`HTMLCollection`实例的`length`属性为`0`。
    >
    > 另外，`HTMLCollection`是动态集合，会实时反映 DOM 的任何变化。
    >
    > ### ParentNode.firstElementChild
    >
    > `firstElementChild`属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回`null`。
    >
    > ```
    > document.firstElementChild.nodeName
    > // "HTML"
    > ```
    >
    > 上面代码中，`document`节点的第一个元素子节点是`<HTML>`。
    >
    > ### ParentNode.lastElementChild
    >
    > `lastElementChild`属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回`null`。
    >
    > ```
    > document.lastElementChild.nodeName
    > // "HTML"
    > ```
    >
    > 上面代码中，`document`节点的最后一个元素子节点是`<HTML>`（因为`document`只包含这一个元素子节点）。
    >
    > ### ParentNode.childElementCount
    >
    > `childElementCount`属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回`0`。
    >
    > ```
    > document.body.childElementCount // 13
    > ```
    >
    > ### ParentNode.append()，ParentNode.prepend()
    >
    > **（1）ParentNode.append()**
    >
    > `append()`方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。
    >
    > 该方法不仅可以添加元素子节点（参数为元素节点），还可以添加文本子节点（参数为字符串）。
    >
    > ```
    > var parent = document.body;
    > 
    > // 添加元素子节点
    > var p = document.createElement('p');
    > parent.append(p);
    > 
    > // 添加文本子节点
    > parent.append('Hello');
    > 
    > // 添加多个元素子节点
    > var p1 = document.createElement('p');
    > var p2 = document.createElement('p');
    > parent.append(p1, p2);
    > 
    > // 添加元素子节点和文本子节点
    > var p = document.createElement('p');
    > parent.append('Hello', p);
    > ```
    >
    > 该方法没有返回值。
    >
    > 注意，该方法与`Node.prototype.appendChild()`方法有三点不同。
    >
    > - `append()`允许字符串作为参数，`appendChild()`只允许子节点作为参数。
    > - `append()`没有返回值，而`appendChild()`返回添加的子节点。
    > - `append()`可以添加多个子节点和字符串（即允许多个参数），`appendChild()`只能添加一个节点（即只允许一个参数）。
    >
    > **（2）ParentNode.prepend()**
    >
    > `prepend()`方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与`append()`方法完全一致，也是没有返回值。
    >
    > ## ChildNode 接口
    >
    > 如果一个节点有父节点，那么该节点就拥有了`ChildNode`接口。
    >
    > ### ChildNode.remove()
    >
    > `remove()`方法用于从父节点移除当前节点。
    >
    > ```
    > el.remove()
    > ```
    >
    > 上面代码在 DOM 里面移除了`el`节点。
    >
    > ### ChildNode.before()，ChildNode.after()
    >
    > **（1）ChildNode.before()**
    >
    > `before()`方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
    >
    > 注意，该方法不仅可以插入元素节点，还可以插入文本节点。
    >
    > ```
    > var p = document.createElement('p');
    > var p1 = document.createElement('p');
    > 
    > // 插入元素节点
    > el.before(p);
    > 
    > // 插入文本节点
    > el.before('Hello');
    > 
    > // 插入多个元素节点
    > el.before(p, p1);
    > 
    > // 插入元素节点和文本节点
    > el.before(p, 'Hello');
    > ```
    >
    > **（2）ChildNode.after()**
    >
    > `after()`方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与`before`方法完全相同。
    >
    > ### ChildNode.replaceWith()
    >
    > `replaceWith()`方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。
    >
    > ```
    > var span = document.createElement('span');
    > el.replaceWith(span);
    > ```
    >
    > 上面代码中，`el`节点将被`span`节点替换。

  - Document 节点

    > ## 概述
    >
    > `document`节点对象代表整个文档，每张网页都有自己的`document`对象。`window.document`属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。
    >
    > `document`对象有不同的办法可以获取。
    >
    > - 正常的网页，直接使用`document`或`window.document`。
    > - `iframe`框架里面的网页，使用`iframe`节点的`contentDocument`属性。
    > - Ajax 操作返回的文档，使用`XMLHttpRequest`对象的`responseXML`属性。
    > - 内部节点的`ownerDocument`属性。
    >
    > `document`对象继承了`EventTarget`接口和`Node`接口，并且混入（mixin）了`ParentNode`接口。这意味着，这些接口的方法都可以在`document`对象上调用。除此之外，`document`对象还有很多自己的属性和方法。
    >
    > ## 属性
    >
    > ### 快捷方式属性
    >
    > 以下属性是指向文档内部的某个节点的快捷方式。
    >
    > **（1）document.defaultView**
    >
    > `document.defaultView`属性返回`document`对象所属的`window`对象。如果当前文档不属于`window`对象，该属性返回`null`。
    >
    > ```
    > document.defaultView === window // true
    > ```
    >
    > **（2）document.doctype**
    >
    > 对于 HTML 文档来说，`document`对象一般有两个子节点。第一个子节点是`document.doctype`，指向`<DOCTYPE>`节点，即文档类型（Document Type Declaration，简写DTD）节点。HTML 的文档类型节点，一般写成`<!DOCTYPE html>`。如果网页没有声明 DTD，该属性返回`null`。
    >
    > ```
    > var doctype = document.doctype;
    > doctype // "<!DOCTYPE html>"
    > doctype.name // "html"
    > ```
    >
    > `document.firstChild`通常就返回这个节点。
    >
    > **（3）document.documentElement**
    >
    > `document.documentElement`属性返回当前文档的根元素节点（root）。它通常是`document`节点的第二个子节点，紧跟在`document.doctype`节点后面。HTML网页的该属性，一般是`<html>`节点。
    >
    > **（4）document.body，document.head**
    >
    > `document.body`属性指向`<body>`节点，`document.head`属性指向`<head>`节点。
    >
    > 这两个属性总是存在的，如果网页源码里面省略了`<head>`或`<body>`，浏览器会自动创建。另外，这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。
    >
    > **（5）document.scrollingElement**
    >
    > `document.scrollingElement`属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。
    >
    > 标准模式下，这个属性返回的文档的根元素`document.documentElement`（即`<html>`）。兼容（quirk）模式下，返回的是`<body>`元素，如果该元素不存在，返回`null`。
    >
    > ```
    > // 页面滚动到浏览器顶部
    > document.scrollingElement.scrollTop = 0;
    > ```
    >
    > **（6）document.activeElement**
    >
    > `document.activeElement`属性返回获得当前焦点（focus）的 DOM 元素。通常，这个属性返回的是`<input>`、`<textarea>`、`<select>`等表单元素，如果当前没有焦点元素，返回`<body>`元素或`null`。
    >
    > **（7）document.fullscreenElement**
    >
    > `document.fullscreenElement`属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回`null`。
    >
    > ```
    > if (
    >   document.fullscreenElement && 
    >   document.fullscreenElement.nodeName == 'VIDEO'
    > ) {
    >   console.log('全屏播放视频');
    > }
    > ```
    >
    > 上面代码中，通过`document.fullscreenElement`可以知道`<video>`元素有没有处在全屏状态，从而判断用户行为。
    >
    > ### 节点集合属性
    >
    > 以下属性返回一个`HTMLCollection`实例，表示文档内部特定元素的集合。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。
    >
    > **（1）document.links**
    >
    > `document.links`属性返回当前文档所有设定了`href`属性的`<a>`及`<area>`节点。
    >
    > ```
    > // 打印文档所有的链接
    > var links = document.links;
    > for(var i = 0; i < links.length; i++) {
    >   console.log(links[i]);
    > }
    > ```
    >
    > **（2）document.forms**
    >
    > `document.forms`属性返回所有`<form>`表单节点。
    >
    > ```
    > var selectForm = document.forms[0];
    > ```
    >
    > 上面代码获取文档第一个表单。
    >
    > 除了使用位置序号，`id`属性和`name`属性也可以用来引用表单。
    >
    > ```
    > /* HTML 代码如下
    >   <form name="foo" id="bar"></form>
    > */
    > document.forms[0] === document.forms.foo // true
    > document.forms.bar === document.forms.foo // true
    > ```
    >
    > **（3）document.images**
    >
    > `document.images`属性返回页面所有`<img>`图片节点。
    >
    > ```
    > var imglist = document.images;
    > 
    > for(var i = 0; i < imglist.length; i++) {
    >   if (imglist[i].src === 'banner.gif') {
    >     // ...
    >   }
    > }
    > ```
    >
    > 上面代码在所有`img`标签中，寻找某张图片。
    >
    > **（4）document.embeds，document.plugins**
    >
    > `document.embeds`属性和`document.plugins`属性，都返回所有`<embed>`节点。
    >
    > **（5）document.scripts**
    >
    > `document.scripts`属性返回所有`<script>`节点。
    >
    > ```
    > var scripts = document.scripts;
    > if (scripts.length !== 0 ) {
    >   console.log('当前网页有脚本');
    > }
    > ```
    >
    > **（6）document.styleSheets**
    >
    > `document.styleSheets`属性返回网页内嵌或引入的 CSS 样式表集合，详细介绍请看《CSS 操作》一章。
    >
    > **（7）小结**
    >
    > 除了`document.styleSheets`属性，以上的其他集合属性返回的都是`HTMLCollection`实例。`document.styleSheets`属性返回的是`StyleSheetList`实例。
    >
    > ```
    > document.links instanceof HTMLCollection // true
    > document.images instanceof HTMLCollection // true
    > document.forms instanceof HTMLCollection // true
    > document.embeds instanceof HTMLCollection // true
    > document.scripts instanceof HTMLCollection // true
    > ```
    >
    > `HTMLCollection`实例是类似数组的对象，所以上面这些属性都有`length`属性，都可以使用方括号运算符引用成员。如果成员有`id`或`name`属性，还可以用这两个属性的值，在`HTMLCollection`实例上引用到这个成员。
    >
    > ```
    > // HTML 代码如下
    > // <form name="myForm">
    > document.myForm === document.forms.myForm // true
    > ```
    >
    > ### 文档静态信息属性
    >
    > 以下属性返回文档信息。
    >
    > **（1）document.documentURI，document.URL**
    >
    > `document.documentURI`属性和`document.URL`属性都返回一个字符串，表示当前文档的网址。不同之处是它们继承自不同的接口，`documentURI`继承自`Document`接口，可用于所有文档；`URL`继承自`HTMLDocument`接口，只能用于 HTML 文档。
    >
    > ```
    > document.URL
    > // http://www.example.com/about
    > 
    > document.documentURI === document.URL
    > // true
    > ```
    >
    > 如果文档的锚点（`#anchor`）变化，这两个属性都会跟着变化。
    >
    > **（2）document.domain**
    >
    > `document.domain`属性返回当前文档的域名，不包含协议和端口。比如，网页的网址是`http://www.example.com:80/hello.html`，那么`document.domain`属性就等于`www.example.com`。如果无法获取域名，该属性返回`null`。
    >
    > `document.domain`基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把`document.domain`设为对应的上级域名。比如，当前域名是`a.sub.example.com`，则`document.domain`属性可以设置为`sub.example.com`，也可以设为`example.com`。修改后，`document.domain`相同的两个网页，可以读取对方的资源，比如设置的 Cookie。
    >
    > 另外，设置`document.domain`会导致端口被改成`null`。因此，如果通过设置`document.domain`来进行通信，双方网页都必须设置这个值，才能保证端口相同。
    >
    > **（3）document.location**
    >
    > `Location`对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过`window.location`和`document.location`属性，可以拿到这个对象。
    >
    > 关于这个对象的详细介绍，请看《浏览器模型》部分的《Location 对象》章节。
    >
    > **（4）document.lastModified**
    >
    > `document.lastModified`属性返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的。
    >
    > ```
    > document.lastModified
    > // "03/07/2018 11:18:27"
    > ```
    >
    > 注意，`document.lastModified`属性的值是字符串，所以不能直接用来比较。`Date.parse`方法将其转为`Date`实例，才能比较两个网页。
    >
    > ```
    > var lastVisitedDate = Date.parse('01/01/2018');
    > if (Date.parse(document.lastModified) > lastVisitedDate) {
    >   console.log('网页已经变更');
    > }
    > ```
    >
    > 如果页面上有 JS 生成的内容，`document.lastModified`属性返回的总是当前时间。
    >
    > **（5）document.title**
    >
    > `document.title`属性返回当前文档的标题。默认情况下，返回`<title>`节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值。
    >
    > ```
    > document.title = '新标题';
    > document.title // "新标题"
    > ```
    >
    > **（6）document.characterSet**
    >
    > `document.characterSet`属性返回当前文档的编码，比如`UTF-8`、`ISO-8859-1`等等。
    >
    > **（7）document.referrer**
    >
    > `document.referrer`属性返回一个字符串，表示当前文档的访问者来自哪里。
    >
    > ```
    > document.referrer
    > // "https://example.com/path"
    > ```
    >
    > 如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，`document.referrer`返回一个空字符串。
    >
    > `document.referrer`的值，总是与 HTTP 头信息的`Referer`字段保持一致。但是，`document.referrer`的拼写有两个`r`，而头信息的`Referer`字段只有一个`r`。
    >
    > **（8）document.dir**
    >
    > `document.dir`返回一个字符串，表示文字方向。它只有两个可能的值：`rtl`表示文字从右到左，阿拉伯文是这种方式；`ltr`表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。
    >
    > **（9）document.compatMode**
    >
    > `compatMode`属性返回浏览器处理文档的模式，可能的值为`BackCompat`（向后兼容模式）和`CSS1Compat`（严格模式）。
    >
    > 一般来说，如果网页代码的第一行设置了明确的`DOCTYPE`（比如`<!doctype html>`），`document.compatMode`的值都为`CSS1Compat`。
    >
    > ### 文档状态属性
    >
    > **（1）document.hidden**
    >
    > `document.hidden`属性返回一个布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得`document.hidden`返回`true`。
    >
    > 这个属性是 Page Visibility API 引入的，一般都是配合这个 API 使用。
    >
    > **（2）document.visibilityState**
    >
    > `document.visibilityState`返回文档的可见状态。
    >
    > 它的值有四种可能。
    >
    > > - `visible`：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
    > > - `hidden`：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
    > > - `prerender`：页面处于正在渲染状态，对于用户来说，该页面不可见。
    > > - `unloaded`：页面从内存里面卸载了。
    >
    > 这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。
    >
    > **（3）document.readyState**
    >
    > `document.readyState`属性返回当前文档的状态，共有三种可能的值。
    >
    > - `loading`：加载 HTML 代码阶段（尚未完成解析）
    > - `interactive`：加载外部资源阶段
    > - `complete`：加载完成
    >
    > 这个属性变化的过程如下。
    >
    > 1. 浏览器开始解析 HTML 文档，`document.readyState`属性等于`loading`。
    > 2. 浏览器遇到 HTML 文档中的`<script>`元素，并且没有`async`或`defer`属性，就暂停解析，开始执行脚本，这时`document.readyState`属性还是等于`loading`。
    > 3. HTML 文档解析完成，`document.readyState`属性变成`interactive`。
    > 4. 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，`document.readyState`属性变成`complete`。
    >
    > 下面的代码用来检查网页是否加载成功。
    >
    > ```
    > // 基本检查
    > if (document.readyState === 'complete') {
    >   // ...
    > }
    > 
    > // 轮询检查
    > var interval = setInterval(function() {
    >   if (document.readyState === 'complete') {
    >     clearInterval(interval);
    >     // ...
    >   }
    > }, 100);
    > ```
    >
    > 另外，每次状态变化都会触发一个`readystatechange`事件。
    >
    > ### document.cookie
    >
    > `document.cookie`属性用来操作浏览器 Cookie，详见《浏览器模型》部分的《Cookie》章节。
    >
    > ### document.designMode
    >
    > `document.designMode`属性控制当前文档是否可编辑。该属性只有两个值`on`和`off`，默认值为`off`。一旦设为`on`，用户就可以编辑整个文档的内容。
    >
    > 下面代码打开`iframe`元素内部文档的`designMode`属性，就能将其变为一个所见即所得的编辑器。
    >
    > ```
    > // HTML 代码如下
    > // <iframe id="editor" src="about:blank"></iframe>
    > var editor = document.getElementById('editor');
    > editor.contentDocument.designMode = 'on';
    > ```
    >
    > ### document.currentScript
    >
    > `document.currentScript`属性只用在`<script>`元素的内嵌脚本或加载的外部脚本之中，返回当前脚本所在的那个 DOM 节点，即`<script>`元素的 DOM 节点。
    >
    > ```
    > <script id="foo">
    >   console.log(
    >     document.currentScript === document.getElementById('foo')
    >   ); // true
    > </script>
    > ```
    >
    > 上面代码中，`document.currentScript`就是`<script>`元素节点。
    >
    > ### document.implementation
    >
    > `document.implementation`属性返回一个`DOMImplementation`对象。该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象。
    >
    > - `DOMImplementation.createDocument()`：创建一个 XML 文档。
    > - `DOMImplementation.createHTMLDocument()`：创建一个 HTML 文档。
    > - `DOMImplementation.createDocumentType()`：创建一个 DocumentType 对象。
    >
    > 下面是创建 HTML 文档的例子。
    >
    > ```
    > var doc = document.implementation.createHTMLDocument('Title');
    > var p = doc.createElement('p');
    > p.innerHTML = 'hello world';
    > doc.body.appendChild(p);
    > 
    > document.replaceChild(
    >   doc.documentElement,
    >   document.documentElement
    > );
    > ```
    >
    > 上面代码中，第一步生成一个新的 HTML 文档`doc`，然后用它的根元素`doc.documentElement`替换掉`document.documentElement`。这会使得当前文档的内容全部消失，变成`hello world`。
    >
    > ## 方法
    >
    > ### document.open()，document.close()
    >
    > `document.open`方法清除当前文档所有内容，使得文档处于可写状态，供`document.write`方法写入内容。
    >
    > `document.close`方法用来关闭`document.open()`打开的文档。
    >
    > ```
    > document.open();
    > document.write('hello world');
    > document.close();
    > ```
    >
    > ### document.write()，document.writeln()
    >
    > `document.write`方法用于向当前文档写入内容。
    >
    > 在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行`document.close()`），`document.write`写入的内容就会追加在已有内容的后面。
    >
    > ```
    > // 页面显示“helloworld”
    > document.open();
    > document.write('hello');
    > document.write('world');
    > document.close();
    > ```
    >
    > 注意，`document.write`会当作 HTML 代码解析，不会转义。
    >
    > ```
    > document.write('<p>hello world</p>');
    > ```
    >
    > 上面代码中，`document.write`会将`<p>`当作 HTML 标签解释。
    >
    > 如果页面已经解析完成（`DOMContentLoaded`事件发生之后），再调用`write`方法，它会先调用`open`方法，擦除当前文档所有内容，然后再写入。
    >
    > ```
    > document.addEventListener('DOMContentLoaded', function (event) {
    >   document.write('<p>Hello World!</p>');
    > });
    > 
    > // 等同于
    > document.addEventListener('DOMContentLoaded', function (event) {
    >   document.open();
    >   document.write('<p>Hello World!</p>');
    >   document.close();
    > });
    > ```
    >
    > 如果在页面渲染过程中调用`write`方法，并不会自动调用`open`方法。（可以理解成，`open`方法已调用，但`close`方法还未调用。）
    >
    > ```
    > <html>
    > <body>
    > hello
    > <script type="text/javascript">
    >   document.write("world")
    > </script>
    > </body>
    > </html>
    > ```
    >
    > 在浏览器打开上面网页，将会显示`hello world`。
    >
    > `document.write`是 JS 语言标准化之前就存在的方法，现在完全有更符合标准的方法向文档写入内容（比如对`innerHTML`属性赋值）。所以，除了某些特殊情况，应该尽量避免使用`document.write`这个方法。
    >
    > `document.writeln`方法与`write`方法完全一致，除了会在输出内容的尾部添加换行符。
    >
    > ```
    > document.write(1);
    > document.write(2);
    > // 12
    > 
    > document.writeln(1);
    > document.writeln(2);
    > // 1
    > // 2
    > //
    > ```
    >
    > 注意，`writeln`方法添加的是 ASCII 码的换行符，渲染成 HTML 网页时不起作用，即在网页上显示不出换行。网页上的换行，必须显式写入`<br>`。
    >
    > ### document.querySelector()，document.querySelectorAll()
    >
    > `document.querySelector`方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回`null`。
    >
    > ```
    > var el1 = document.querySelector('.myclass');
    > var el2 = document.querySelector('#myParent > [ng-click]');
    > ```
    >
    > `document.querySelectorAll`方法与`querySelector`用法类似，区别是返回一个`NodeList`对象，包含所有匹配给定选择器的节点。
    >
    > ```
    > elementList = document.querySelectorAll('.myclass');
    > ```
    >
    > 这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。
    >
    > ```
    > var matches = document.querySelectorAll('div.note, div.alert');
    > ```
    >
    > 上面代码返回`class`属性是`note`或`alert`的`div`元素。
    >
    > 这两个方法都支持复杂的 CSS 选择器。
    >
    > ```
    > // 选中 data-foo-bar 属性等于 someval 的元素
    > document.querySelectorAll('[data-foo-bar="someval"]');
    > 
    > // 选中 myForm 表单中所有不通过验证的元素
    > document.querySelectorAll('#myForm :invalid');
    > 
    > // 选中div元素，那些 class 含 ignore 的除外
    > document.querySelectorAll('DIV:not(.ignore)');
    > 
    > // 同时选中 div，a，script 三类元素
    > document.querySelectorAll('DIV, A, SCRIPT');
    > ```
    >
    > 但是，它们不支持 CSS 伪元素的选择器（比如`:first-line`和`:first-letter`）和伪类的选择器（比如`:link`和`:visited`），即无法选中伪元素和伪类。
    >
    > 如果`querySelectorAll`方法的参数是字符串`*`，则会返回文档中的所有元素节点。另外，`querySelectorAll`的返回结果不是动态集合，不会实时反映元素节点的变化。
    >
    > 最后，这两个方法除了定义在`document`对象上，还定义在元素节点上，即在元素节点上也可以调用。
    >
    > ### document.getElementsByTagName()
    >
    > `document.getElementsByTagName()`方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个类似数组对象（`HTMLCollection`实例），可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。
    >
    > ```
    > var paras = document.getElementsByTagName('p');
    > paras instanceof HTMLCollection // true
    > ```
    >
    > 上面代码返回当前文档的所有`p`元素节点。
    >
    > HTML 标签名是大小写不敏感的，因此`getElementsByTagName()`方法的参数也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。
    >
    > 如果传入`*`，就可以返回文档中所有 HTML 元素。
    >
    > ```
    > var allElements = document.getElementsByTagName('*');
    > ```
    >
    > 注意，元素节点本身也定义了`getElementsByTagName`方法，返回该元素的后代元素中符合条件的元素。也就是说，这个方法不仅可以在`document`对象上调用，也可以在任何元素节点上调用。
    >
    > ```
    > var firstPara = document.getElementsByTagName('p')[0];
    > var spans = firstPara.getElementsByTagName('span');
    > ```
    >
    > 上面代码选中第一个`p`元素内部的所有`span`元素。
    >
    > ### document.getElementsByClassName()
    >
    > `document.getElementsByClassName()`方法返回一个类似数组的对象（`HTMLCollection`实例），包括了所有`class`名字符合指定条件的元素，元素的变化实时反映在返回结果中。
    >
    > ```
    > var elements = document.getElementsByClassName(names);
    > ```
    >
    > 由于`class`是保留字，所以 JS 一律使用`className`表示 CSS 的`class`。
    >
    > 参数可以是多个`class`，它们之间使用空格分隔。
    >
    > ```
    > var elements = document.getElementsByClassName('foo bar');
    > ```
    >
    > 上面代码返回同时具有`foo`和`bar`两个`class`的元素，`foo`和`bar`的顺序不重要。
    >
    > 注意，正常模式下，CSS 的`class`是大小写敏感的。（`quirks mode`下，大小写不敏感。）
    >
    > 与`getElementsByTagName()`方法一样，`getElementsByClassName()`方法不仅可以在`document`对象上调用，也可以在任何元素节点上调用。
    >
    > ```
    > // 非document对象上调用
    > var elements = rootElement.getElementsByClassName(names);
    > ```
    >
    > ### document.getElementsByName()
    >
    > `document.getElementsByName()`方法用于选择拥有`name`属性的 HTML 元素（比如`<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>`和`<object>`等），返回一个类似数组的的对象（`NodeList`实例），因为`name`属性相同的元素可能不止一个。
    >
    > ```
    > // 表单为 <form name="x"></form>
    > var forms = document.getElementsByName('x');
    > forms[0].tagName // "FORM"
    > ```
    >
    > ### document.getElementById()
    >
    > `document.getElementById()`方法返回匹配指定`id`属性的元素节点。如果没有发现匹配的节点，则返回`null`。
    >
    > ```
    > var elem = document.getElementById('para1');
    > ```
    >
    > 注意，该方法的参数是大小写敏感的。比如，如果某个节点的`id`属性是`main`，那么`document.getElementById('Main')`将返回`null`。
    >
    > `document.getElementById()`方法与`document.querySelector()`方法都能获取元素节点，不同之处是`document.querySelector()`方法的参数使用 CSS 选择器语法，`document.getElementById()`方法的参数是元素的`id`属性。
    >
    > ```
    > document.getElementById('myElement')
    > document.querySelector('#myElement')
    > ```
    >
    > 上面代码中，两个方法都能选中`id`为`myElement`的元素，但是`document.getElementById()`比`document.querySelector()`效率高得多。
    >
    > 另外，这个方法只能在`document`对象上使用，不能在其他元素节点上使用。
    >
    > ### document.elementFromPoint()，document.elementsFromPoint()
    >
    > `document.elementFromPoint()`方法返回位于页面指定位置最上层的元素节点。
    >
    > ```
    > var element = document.elementFromPoint(50, 50);
    > ```
    >
    > 上面代码选中在`(50, 50)`这个坐标位置的最上层的那个 HTML 元素。
    >
    > `elementFromPoint`方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回`null`。
    >
    > `document.elementsFromPoint()`返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。
    >
    > ```
    > var elements = document.elementsFromPoint(x, y);
    > ```
    >
    > ### document.createElement()
    >
    > `document.createElement`方法用来生成元素节点，并返回该节点。
    >
    > ```
    > var newDiv = document.createElement('div');
    > ```
    >
    > `createElement`方法的参数为元素的标签名，即元素节点的`tagName`属性，对于 HTML 网页大小写不敏感，即参数为`div`或`DIV`返回的是同一种节点。如果参数里面包含尖括号（即`<`和`>`）会报错。
    >
    > ```
    > document.createElement('<div>');
    > // DOMException: The tag name provided ('<div>') is not a valid name
    > ```
    >
    > 注意，`document.createElement`的参数可以是自定义的标签名。
    >
    > ```
    > document.createElement('foo');
    > ```
    >
    > ### document.createTextNode()
    >
    > `document.createTextNode`方法用来生成文本节点（`Text`实例），并返回该节点。它的参数是文本节点的内容。
    >
    > ```
    > var newDiv = document.createElement('div');
    > var newContent = document.createTextNode('Hello');
    > newDiv.appendChild(newContent);
    > ```
    >
    > 上面代码新建一个`div`节点和一个文本节点，然后将文本节点插入`div`节点。
    >
    > 这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。
    >
    > ```
    > var div = document.createElement('div');
    > div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
    > console.log(div.innerHTML)
    > // &lt;span&gt;Foo &amp; bar&lt;/span&gt;
    > ```
    >
    > 上面代码中，`createTextNode`方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。
    >
    > 需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。
    >
    > ```
    > function escapeHtml(str) {
    >   var div = document.createElement('div');
    >   div.appendChild(document.createTextNode(str));
    >   return div.innerHTML;
    > };
    > 
    > var userWebsite = '" onmouseover="alert(\'derp\')" "';
    > var profileLink = '<a href="' + escapeHtml(userWebsite) + '">Bob</a>';
    > var div = document.getElementById('target');
    > div.innerHTML = profileLink;
    > // <a href="" onmouseover="alert('derp')" "">Bob</a>
    > ```
    >
    > 上面代码中，由于`createTextNode`方法不转义双引号，导致`onmouseover`方法被注入了代码。
    >
    > ### document.createAttribute()
    >
    > `document.createAttribute`方法生成一个新的属性节点（`Attr`实例），并返回它。
    >
    > ```
    > var attribute = document.createAttribute(name);
    > ```
    >
    > `document.createAttribute`方法的参数`name`，是属性的名称。
    >
    > ```
    > var node = document.getElementById('div1');
    > 
    > var a = document.createAttribute('my_attrib');
    > a.value = 'newVal';
    > 
    > node.setAttributeNode(a);
    > // 或者
    > node.setAttribute('my_attrib', 'newVal');
    > ```
    >
    > 上面代码为`div1`节点，插入一个值为`newVal`的`my_attrib`属性。
    >
    > ### document.createComment()
    >
    > `document.createComment`方法生成一个新的注释节点，并返回该节点。
    >
    > ```
    > var CommentNode = document.createComment(data);
    > ```
    >
    > `document.createComment`方法的参数是一个字符串，会成为注释节点的内容。
    >
    > ### document.createDocumentFragment()
    >
    > `document.createDocumentFragment`方法生成一个空的文档片段对象（`DocumentFragment`实例）。
    >
    > ```
    > var docFragment = document.createDocumentFragment();
    > ```
    >
    > `DocumentFragment`是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为`DocumentFragment`不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。
    >
    > ```
    > var docfrag = document.createDocumentFragment();
    > 
    > [1, 2, 3, 4].forEach(function (e) {
    >   var li = document.createElement('li');
    >   li.textContent = e;
    >   docfrag.appendChild(li);
    > });
    > 
    > var element  = document.getElementById('ul');
    > element.appendChild(docfrag);
    > ```
    >
    > 上面代码中，文档片段`docfrag`包含四个`<li>`节点，这些子节点被一次性插入了当前文档。
    >
    > ### document.createEvent()
    >
    > `document.createEvent`方法生成一个事件对象（`Event`实例），该对象可以被`element.dispatchEvent`方法使用，触发指定事件。
    >
    > ```
    > var event = document.createEvent(type);
    > ```
    >
    > `document.createEvent`方法的参数是事件类型，比如`UIEvents`、`MouseEvents`、`MutationEvents`、`HTMLEvents`。
    >
    > ```
    > var event = document.createEvent('Event');
    > event.initEvent('build', true, true);
    > document.addEventListener('build', function (e) {
    >   console.log(e.type); // "build"
    > }, false);
    > document.dispatchEvent(event);
    > ```
    >
    > 上面代码新建了一个名为`build`的事件实例，然后触发该事件。
    >
    > ### document.addEventListener()，document.removeEventListener()，document.dispatchEvent()
    >
    > 这三个方法用于处理`document`节点的事件。它们都继承自`EventTarget`接口，详细介绍参见《EventTarget 接口》一章。
    >
    > ```
    > // 添加事件监听函数
    > document.addEventListener('click', listener, false);
    > 
    > // 移除事件监听函数
    > document.removeEventListener('click', listener, false);
    > 
    > // 触发事件
    > var event = new Event('click');
    > document.dispatchEvent(event);
    > ```
    >
    > ### document.hasFocus()
    >
    > `document.hasFocus`方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。
    >
    > ```
    > var focused = document.hasFocus();
    > ```
    >
    > 注意，有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如，用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。
    >
    > ### document.adoptNode()，document.importNode()
    >
    > `document.adoptNode`方法将某个节点及其子节点，从原来所在的文档或`DocumentFragment`里面移除，归属当前`document`对象，返回插入后的新节点。插入的节点对象的`ownerDocument`属性，会变成当前的`document`对象，而`parentNode`属性是`null`。
    >
    > ```
    > var node = document.adoptNode(externalNode);
    > document.appendChild(node);
    > ```
    >
    > 注意，`document.adoptNode`方法只是改变了节点的归属，并没有将这个节点插入新的文档树。所以，还要再用`appendChild`方法或`insertBefore`方法，将新节点插入当前文档树。
    >
    > `document.importNode`方法则是从原来所在的文档或`DocumentFragment`里面，拷贝某个节点及其子节点，让它们归属当前`document`对象。拷贝的节点对象的`ownerDocument`属性，会变成当前的`document`对象，而`parentNode`属性是`null`。
    >
    > ```
    > var node = document.importNode(externalNode, deep);
    > ```
    >
    > `document.importNode`方法的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为`true`。
    >
    > 注意，`document.importNode`方法只是拷贝外部节点，这时该节点的父节点是`null`。下一步还必须将这个节点插入当前文档树。
    >
    > ```
    > var iframe = document.getElementsByTagName('iframe')[0];
    > var oldNode = iframe.contentWindow.document.getElementById('myNode');
    > var newNode = document.importNode(oldNode, true);
    > document.getElementById("container").appendChild(newNode);
    > ```
    >
    > 上面代码从`iframe`窗口，拷贝一个指定节点`myNode`，插入当前文档。
    >
    > ### document.createNodeIterator()
    >
    > `document.createNodeIterator`方法返回一个子节点迭代器。
    >
    > ```
    > var nodeIterator = document.createNodeIterator(
    >   document.body,
    >   NodeFilter.SHOW_ELEMENT
    > );
    > ```
    >
    > 上面代码返回`<body>`元素子节点的迭代器。
    >
    > `document.createNodeIterator`方法第一个参数为所要遍历的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点（`NodeFilter.SHOW_ELEMENT`）。几种主要的节点类型写法如下。
    >
    > - 所有节点：NodeFilter.SHOW_ALL
    > - 元素节点：NodeFilter.SHOW_ELEMENT
    > - 文本节点：NodeFilter.SHOW_TEXT
    > - 评论节点：NodeFilter.SHOW_COMMENT
    >
    > `document.createNodeIterator`方法返回一个“迭代器”对象（`NodeFilter`实例）。该实例的`nextNode()`方法和`previousNode()`方法，可以用来遍历所有子节点。
    >
    > ```
    > var nodeIterator = document.createNodeIterator(document.body);
    > var pars = [];
    > var currentNode;
    > 
    > while (currentNode = nodeIterator.nextNode()) {
    >   pars.push(currentNode);
    > }
    > ```
    >
    > 上面代码中，使用迭代器的`nextNode`方法，将根节点的所有子节点，依次读入一个数组。`nextNode`方法先返回迭代器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回`null`。`previousNode`方法则是先将指针移向上一个节点，然后返回该节点。
    >
    > ```
    > var nodeIterator = document.createNodeIterator(
    >   document.body,
    >   NodeFilter.SHOW_ELEMENT
    > );
    > 
    > var currentNode = nodeIterator.nextNode();
    > var previousNode = nodeIterator.previousNode();
    > 
    > currentNode === previousNode // true
    > ```
    >
    > 上面代码中，`currentNode`和`previousNode`都指向同一个的节点。
    >
    > 注意，迭代器返回的第一个节点，总是根节点。
    >
    > ```
    > pars[0] === document.body // true
    > ```
    >
    > ### document.createTreeWalker()
    >
    > `document.createTreeWalker`方法返回一个 DOM 的子树迭代器。它与`document.createNodeIterator`方法基本是类似的，区别在于它返回的是`TreeWalker`实例，后者返回的是`NodeIterator`实例。另外，它的第一个节点不是根节点。
    >
    > `document.createTreeWalker`方法的第一个参数是所要遍历的根节点，第二个参数指定所要遍历的节点类型（与`document.createNodeIterator`方法的第二个参数相同）。
    >
    > ```
    > var treeWalker = document.createTreeWalker(
    >   document.body,
    >   NodeFilter.SHOW_ELEMENT
    > );
    > 
    > var nodeList = [];
    > 
    > while(treeWalker.nextNode()) {
    >   nodeList.push(treeWalker.currentNode);
    > }
    > ```
    >
    > 上面代码遍历`<body>`节点下属的所有元素节点，将它们插入`nodeList`数组。
    >
    > ### document.execCommand()，document.queryCommandSupported()，document.queryCommandEnabled()
    >
    > **（1）document.execCommand()**
    >
    > 如果`document.designMode`属性设为`on`，那么整个文档用户可编辑；如果元素的`contenteditable`属性设为`true`，那么该元素可编辑。这两种情况下，可以使用`document.execCommand()`方法，改变内容的样式，比如`document.execCommand('bold')`会使得字体加粗。
    >
    > ```
    > document.execCommand(command, showDefaultUI, input)
    > ```
    >
    > 该方法接受三个参数。
    >
    > - `command`：字符串，表示所要实施的样式。
    > - `showDefaultUI`：布尔值，表示是否要使用默认的用户界面，建议总是设为`false`。
    > - `input`：字符串，表示该样式的辅助内容，比如生成超级链接时，这个参数就是所要链接的网址。如果第二个参数设为`true`，那么浏览器会弹出提示框，要求用户在提示框输入该参数。但是，不是所有浏览器都支持这样做，为了兼容性，还是需要自己部署获取这个参数的方式。
    >
    > ```
    > var url = window.prompt('请输入网址');
    > 
    > if (url) {
    >   document.execCommand('createlink', false, url);
    > }
    > ```
    >
    > 上面代码中，先提示用户输入所要链接的网址，然后手动生成超级链接。注意，第二个参数是`false`，表示此时不需要自动弹出提示框。
    >
    > `document.execCommand()`的返回值是一个布尔值。如果为`false`，表示这个方法无法生效。
    >
    > 这个方法大部分情况下，只对选中的内容生效。如果有多个内容可编辑区域，那么只对当前焦点所在的元素生效。
    >
    > `document.execCommand()`方法可以执行的样式改变有很多种，下面是其中的一些：bold、insertLineBreak、selectAll、createLink、insertOrderedList、subscript、delete、insertUnorderedList、superscript、formatBlock、insertParagraph、undo、forwardDelete、insertText、unlink、insertImage、italic、unselect、insertHTML、redo。这些值都可以用作第一个参数，它们的含义不难从字面上看出来。
    >
    > **（2）document.queryCommandSupported()**
    >
    > `document.queryCommandSupported()`方法返回一个布尔值，表示浏览器是否支持`document.execCommand()`的某个命令。
    >
    > ```
    > if (document.queryCommandSupported('SelectAll')) {
    >   console.log('浏览器支持选中可编辑区域的所有内容');
    > }
    > ```
    >
    > **（3）document.queryCommandEnabled()**
    >
    > `document.queryCommandEnabled()`方法返回一个布尔值，表示当前是否可用`document.execCommand()`的某个命令。比如，`bold`（加粗）命令只有存在文本选中时才可用，如果没有选中文本，就不可用。
    >
    > ```
    > // HTML 代码为
    > // <input type="button" value="Copy" onclick="doCopy()">
    > 
    > function doCopy(){
    >   // 浏览器是否支持 copy 命令（选中内容复制到剪贴板）
    >   if (document.queryCommandSupported('copy')) {
    >     copyText('你好');
    >   }else{
    >     console.log('浏览器不支持');
    >   }
    > }
    > 
    > function copyText(text) {
    >   var input = document.createElement('textarea');
    >   document.body.appendChild(input);
    >   input.value = text;
    >   input.focus();
    >   input.select();
    > 
    >   // 当前是否有选中文字
    >   if (document.queryCommandEnabled('copy')) {
    >     var success = document.execCommand('copy');
    >     input.remove();
    >     console.log('Copy Ok');
    >   } else {
    >     console.log('queryCommandEnabled is false');
    >   }
    > }
    > ```
    >
    > 上面代码中，先判断浏览器是否支持`copy`命令（允许可编辑区域的选中内容，复制到剪贴板），如果支持，就新建一个临时文本框，里面写入内容“你好”，并将其选中。然后，判断是否选中成功，如果成功，就将“你好”复制到剪贴板，再删除那个临时文本框。
    >
    > ### document.getSelection()
    >
    > 这个方法指向`window.getSelection()`，参见`window`对象一节的介绍。

  - Element 节点

    > ## 简介
    >
    > `Element`节点对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个`Element`节点对象（以下简称元素节点）。
    >
    > 元素节点的`nodeType`属性都是`1`。
    >
    > ```
    > var p = document.querySelector('p');
    > p.nodeName // "P"
    > p.nodeType // 1
    > ```
    >
    > `Element`对象继承了`Node`接口，因此`Node`的属性和方法在`Element`对象都存在。
    >
    > 此外，不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点，比如`<a>`元素的构造函数是`HTMLAnchorElement()`，`<button>`是`HTMLButtonElement()`。因此，元素节点不是一种对象，而是许多种对象，这些对象除了继承`Element`对象的属性和方法，还有各自独有的属性和方法。
    >
    > ## 实例属性
    >
    > ### 元素特性的相关属性
    >
    > **（1）Element.id**
    >
    > `Element.id`属性返回指定元素的`id`属性，该属性可读写。
    >
    > ```
    > // HTML 代码为 <p id="foo">
    > var p = document.querySelector('p');
    > p.id // "foo"
    > ```
    >
    > 注意，`id`属性的值是大小写敏感，即浏览器能正确识别`<p id="foo">`和`<p id="FOO">`这两个元素的`id`属性，但是最好不要这样命名。
    >
    > **（2）Element.tagName**
    >
    > `Element.tagName`属性返回指定元素的大写标签名，与`nodeName`属性的值相等。
    >
    > ```
    > // HTML代码为
    > // <span id="myspan">Hello</span>
    > var span = document.getElementById('myspan');
    > span.id // "myspan"
    > span.tagName // "SPAN"
    > ```
    >
    > **（3）Element.dir**
    >
    > `Element.dir`属性用于读写当前元素的文字方向，可能是从左到右（`"ltr"`），也可能是从右到左（`"rtl"`）。
    >
    > **（4）Element.accessKey**
    >
    > `Element.accessKey`属性用于读写分配给当前元素的快捷键。
    >
    > ```
    > // HTML 代码如下
    > // <button accesskey="h" id="btn">点击</button>
    > var btn = document.getElementById('btn');
    > btn.accessKey // "h"
    > ```
    >
    > 上面代码中，`btn`元素的快捷键是`h`，按下`Alt + h`就能将焦点转移到它上面。
    >
    > **（5）Element.draggable**
    >
    > `Element.draggable`属性返回一个布尔值，表示当前元素是否可拖动。该属性可读写。
    >
    > **（6）Element.lang**
    >
    > `Element.lang`属性返回当前元素的语言设置。该属性可读写。
    >
    > ```
    > // HTML 代码如下
    > // <html lang="en">
    > document.documentElement.lang // "en"
    > ```
    >
    > **（7）Element.tabIndex**
    >
    > `Element.tabIndex`属性返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
    >
    > `tabIndex`属性值如果是负值（通常是`-1`），则 Tab 键不会遍历到该元素。如果是正整数，则按照顺序，从小到大遍历。如果两个元素的`tabIndex`属性的正整数值相同，则按照出现的顺序遍历。遍历完所有`tabIndex`为正整数的元素以后，再遍历所有`tabIndex`等于`0`、或者属性值是非法值、或者没有`tabIndex`属性的元素，顺序为它们在网页中出现的顺序。
    >
    > **（8）Element.title**
    >
    > `Element.title`属性用来读写当前元素的 HTML 属性`title`。该属性通常用来指定，鼠标悬浮时弹出的文字提示框。
    >
    > ### 元素状态的相关属性
    >
    > **（1）Element.hidden**
    >
    > `Element.hidden`属性返回一个布尔值，表示当前 HTML 元素的`hidden`属性的值。该属性可读写，用来控制当前元素是否可见。
    >
    > ```
    > var btn = document.getElementById('btn');
    > var mydiv = document.getElementById('mydiv');
    > 
    > btn.addEventListener('click', function () {
    >   mydiv.hidden = !mydiv.hidden;
    > }, false);
    > ```
    >
    > 注意，该属性与 CSS 设置是互相独立的。CSS 对当前元素可见性的设置，`Element.hidden`并不能反映出来。也就是说，这个属性并不能用来判断当前元素的实际可见性。
    >
    > CSS 设置的优先级高于`Element.hidden`。如果 CSS 指定了该元素不可见（`display: none`）或可见（`visibility: visible`），那么`Element.hidden`并不能改变该元素实际的可见性。换言之，这个属性只在 CSS 没有明确设定当前元素的可见性时才有效。
    >
    > **（2）Element.contentEditable，Element.isContentEditable**
    >
    > HTML 元素可以设置`contentEditable`属性，使得元素的内容可以编辑。
    >
    > ```
    > <div contenteditable>123</div>
    > ```
    >
    > 上面代码中，`<div>`元素有`contenteditable`属性，因此用户可以在网页上编辑这个区块的内容。
    >
    > `Element.contentEditable`属性返回一个字符串，表示是否设置了`contenteditable`属性，有三种可能的值。该属性可写。
    >
    > - `"true"`：元素内容可编辑
    > - `"false"`：元素内容不可编辑
    > - `"inherit"`：元素是否可编辑，继承了父元素的设置
    >
    > `Element.isContentEditable`属性返回一个布尔值，同样表示是否设置了`contenteditable`属性。该属性只读。
    >
    > ### Element.attributes
    >
    > `Element.attributes`属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点，详见《属性的操作》一章。
    >
    > ```
    > var p = document.querySelector('p');
    > var attrs = p.attributes;
    > 
    > for (var i = attrs.length - 1; i >= 0; i--) {
    >   console.log(attrs[i].name + '->' + attrs[i].value);
    > }
    > ```
    >
    > 上面代码遍历`p`元素的所有属性。
    >
    > ### Element.className，Element.classList
    >
    > `className`属性用来读写当前元素节点的`class`属性。它的值是一个字符串，每个`class`之间用空格分割。
    >
    > `classList`属性返回一个类似数组的对象，当前元素节点的每个`class`就是这个对象的一个成员。
    >
    > ```
    > // HTML 代码 <div class="one two three" id="myDiv"></div>
    > var div = document.getElementById('myDiv');
    > 
    > div.className
    > // "one two three"
    > 
    > div.classList
    > // {
    > //   0: "one"
    > //   1: "two"
    > //   2: "three"
    > //   length: 3
    > // }
    > ```
    >
    > 上面代码中，`className`属性返回一个空格分隔的字符串，而`classList`属性指向一个类似数组的对象，该对象的`length`属性（只读）返回当前元素的`class`数量。
    >
    > `classList`对象有下列方法。
    >
    > - `add()`：增加一个 class。
    > - `remove()`：移除一个 class。
    > - `contains()`：检查当前元素是否包含某个 class。
    > - `toggle()`：将某个 class 移入或移出当前元素。
    > - `item()`：返回指定索引位置的 class。
    > - `toString()`：将 class 的列表转为字符串。
    >
    > ```
    > var div = document.getElementById('myDiv');
    > 
    > div.classList.add('myCssClass');
    > div.classList.add('foo', 'bar');
    > div.classList.remove('myCssClass');
    > div.classList.toggle('myCssClass'); // 如果 myCssClass 不存在就加入，否则移除
    > div.classList.contains('myCssClass'); // 返回 true 或者 false
    > div.classList.item(0); // 返回第一个 Class
    > div.classList.toString();
    > ```
    >
    > 下面比较一下，`className`和`classList`在添加和删除某个 class 时的写法。
    >
    > ```
    > var foo = document.getElementById('foo');
    > 
    > // 添加class
    > foo.className += 'bold';
    > foo.classList.add('bold');
    > 
    > // 删除class
    > foo.classList.remove('bold');
    > foo.className = foo.className.replace(/^bold$/, '');
    > ```
    >
    > `toggle`方法可以接受一个布尔值，作为第二个参数。如果为`true`，则添加该属性；如果为`false`，则去除该属性。
    >
    > ```
    > el.classList.toggle('abc', boolValue);
    > 
    > // 等同于
    > if (boolValue) {
    >   el.classList.add('abc');
    > } else {
    >   el.classList.remove('abc');
    > }
    > ```
    >
    > ### Element.dataset
    >
    > 网页元素可以自定义`data-`属性，用来添加数据。
    >
    > ```
    > <div data-timestamp="1522907809292"></div>
    > ```
    >
    > 上面代码中，`<div>`元素有一个自定义的`data-timestamp`属性，用来为该元素添加一个时间戳。
    >
    > `Element.dataset`属性返回一个对象，可以从这个对象读写`data-`属性。
    >
    > ```
    > // <article
    > //   id="foo"
    > //   data-columns="3"
    > //   data-index-number="12314"
    > //   data-parent="cars">
    > //   ...
    > // </article>
    > var article = document.getElementById('foo');
    > article.dataset.columns // "3"
    > article.dataset.indexNumber // "12314"
    > article.dataset.parent // "cars"
    > ```
    >
    > 注意，`dataset`上面的各个属性返回都是字符串。
    >
    > HTML 代码中，`data-`属性的属性名，只能包含英文字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`）。它们转成 JS 对应的`dataset`属性名，规则如下。
    >
    > - 开头的`data-`会省略。
    > - 如果连词线后面跟了一个英文字母，那么连词线会取消，该字母变成大写。
    > - 其他字符不变。
    >
    > 因此，`data-abc-def`对应`dataset.abcDef`，`data-abc-1`对应`dataset["abc-1"]`。
    >
    > 除了使用`dataset`读写`data-`属性，也可以使用`Element.getAttribute()`和`Element.setAttribute()`，通过完整的属性名读写这些属性。
    >
    > ```
    > var mydiv = document.getElementById('mydiv');
    > 
    > mydiv.dataset.foo = 'bar';
    > mydiv.getAttribute('data-foo') // "bar"
    > ```
    >
    > ### Element.innerHTML
    >
    > `Element.innerHTML`属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括`<HTML>`和`<body>`元素。
    >
    > 如果将`innerHTML`属性设为空，等于删除所有它包含的所有节点。
    >
    > ```
    > el.innerHTML = '';
    > ```
    >
    > 上面代码等于将`el`节点变成了一个空节点，`el`原来包含的节点被全部删除。
    >
    > 注意，读取属性值的时候，如果文本节点包含`&`、小于号（`<`）和大于号（`>`），`innerHTML`属性会将它们转为实体形式`&`、`<`、`>`。如果想得到原文，建议使用`element.textContent`属性。
    >
    > ```
    > // HTML代码如下 <p id="para"> 5 > 3 </p>
    > document.getElementById('para').innerHTML
    > // 5 &gt; 3
    > ```
    >
    > 写入的时候，如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有`<script>`标签，虽然可以生成`script`节点，但是插入的代码不会执行。
    >
    > ```
    > var name = "<script>alert('haha')</script>";
    > el.innerHTML = name;
    > ```
    >
    > 上面代码将脚本插入内容，脚本并不会执行。但是，`innerHTML`还是有安全风险的。
    >
    > ```
    > var name = "<img src=x onerror=alert(1)>";
    > el.innerHTML = name;
    > ```
    >
    > 上面代码中，`alert`方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用`textContent`属性代替`innerHTML`。
    >
    > ### Element.outerHTML
    >
    > `Element.outerHTML`属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。
    >
    > ```
    > // HTML 代码如下
    > // <div id="d"><p>Hello</p></div>
    > var d = document.getElementById('d');
    > d.outerHTML
    > // '<div id="d"><p>Hello</p></div>'
    > ```
    >
    > `outerHTML`属性是可读写的，对它进行赋值，等于替换掉当前元素。
    >
    > ```
    > // HTML 代码如下
    > // <div id="container"><div id="d">Hello</div></div>
    > var container = document.getElementById('container');
    > var d = document.getElementById('d');
    > container.firstChild.nodeName // "DIV"
    > d.nodeName // "DIV"
    > 
    > d.outerHTML = '<p>Hello</p>';
    > container.firstChild.nodeName // "P"
    > d.nodeName // "DIV"
    > ```
    >
    > 上面代码中，变量`d`代表子节点，它的`outerHTML`属性重新赋值以后，内层的`div`元素就不存在了，被`p`元素替换了。但是，变量`d`依然指向原来的`div`元素，这表示被替换的`DIV`元素还存在于内存中。
    >
    > 注意，如果一个节点没有父节点，设置`outerHTML`属性会报错。
    >
    > ```
    > var div = document.createElement('div');
    > div.outerHTML = '<p>test</p>';
    > // DOMException: This element has no parent node.
    > ```
    >
    > 上面代码中，`div`元素没有父节点，设置`outerHTML`属性会报错。
    >
    > ### Element.clientHeight，Element.clientWidth
    >
    > `Element.clientHeight`属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回`0`。如果块级元素没有设置 CSS 高度，则返回实际高度。
    >
    > 除了元素本身的高度，它还包括`padding`部分，但是不包括`border`、`margin`。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。
    >
    > `Element.clientWidth`属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和`padding`，如果有垂直滚动条，还要减去垂直滚动条的宽度。
    >
    > `document.documentElement`的`clientHeight`属性，返回当前视口的高度（即浏览器窗口的高度），等同于`window.innerHeight`属性减去水平滚动条的高度（如果有的话）。`document.body`的高度则是网页的实际高度。一般来说，`document.body.clientHeight`大于`document.documentElement.clientHeight`。
    >
    > ```
    > // 视口高度
    > document.documentElement.clientHeight
    > 
    > // 网页总高度
    > document.body.clientHeight
    > ```
    >
    > ### Element.clientLeft，Element.clientTop
    >
    > `Element.clientLeft`属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的`padding`和`margin`。如果没有设置左边框，或者是行内元素（`display: inline`），该属性返回`0`。该属性总是返回整数值，如果是小数，会四舍五入。
    >
    > `Element.clientTop`属性等于网页元素顶部边框的宽度（单位像素），其他特点都与`clientLeft`相同。
    >
    > ### Element.scrollHeight，Element.scrollWidth
    >
    > `Element.scrollHeight`属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括`padding`，但是不包括`border`、`margin`以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（`::before`或`::after`）的高度。
    >
    > `Element.scrollWidth`属性表示当前元素的总宽度（单位像素），其他地方都与`scrollHeight`属性类似。这两个属性只读。
    >
    > 整张网页的总高度可以从`document.documentElement`或`document.body`上读取。
    >
    > ```
    > // 返回网页的总高度
    > document.documentElement.scrollHeight
    > document.body.scrollHeight
    > ```
    >
    > 注意，如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，`scrollHeight`属性仍然返回元素的总高度。
    >
    > ```
    > // HTML 代码如下
    > // <div id="myDiv" style="height: 200px; overflow: hidden;">...</div>
    > document.getElementById('myDiv').scrollHeight // 200
    > ```
    >
    > 上面代码中，即使`myDiv`元素的 CSS 高度只有200像素，且溢出部分不可见，但是`scrollHeight`仍然会返回该元素的原始高度。
    >
    > ### Element.scrollLeft，Element.scrollTop
    >
    > `Element.scrollLeft`属性表示当前元素的水平滚动条向右侧滚动的像素数量，`Element.scrollTop`属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于0。
    >
    > 如果要查看整张网页的水平的和垂直的滚动距离，要从`document.documentElement`元素上读取。
    >
    > ```
    > document.documentElement.scrollLeft
    > document.documentElement.scrollTop
    > ```
    >
    > 这两个属性都可读写，设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置。
    >
    > ### Element.offsetParent
    >
    > `Element.offsetParent`属性返回最靠近当前元素的、并且 CSS 的`position`属性不等于`static`的上层元素。
    >
    > ```
    > <div style="position: absolute;">
    >   <p>
    >     <span>Hello</span>
    >   </p>
    > </div>
    > ```
    >
    > 上面代码中，`span`元素的`offsetParent`属性就是`div`元素。
    >
    > 该属性主要用于确定子元素位置偏移的计算基准，`Element.offsetTop`和`Element.offsetLeft`就是`offsetParent`元素计算的。
    >
    > 如果该元素是不可见的（`display`属性为`none`），或者位置是固定的（`position`属性为`fixed`），则`offsetParent`属性返回`null`。
    >
    > ```
    > <div style="position: absolute;">
    >   <p>
    >     <span style="display: none;">Hello</span>
    >   </p>
    > </div>
    > ```
    >
    > 上面代码中，`span`元素的`offsetParent`属性是`null`。
    >
    > 如果某个元素的所有上层节点的`position`属性都是`static`，则`Element.offsetParent`属性指向`<body>`元素。
    >
    > ### Element.offsetHeight，Element.offsetWidth
    >
    > `Element.offsetHeight`属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。
    >
    > `Element.offsetWidth`属性表示元素的 CSS 水平宽度（单位像素），其他都与`Element.offsetHeight`一致。
    >
    > 这两个属性都是只读属性，只比`Element.clientHeight`和`Element.clientWidth`多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如`display: none;`），则返回`0`。
    >
    > ### Element.offsetLeft，Element.offsetTop
    >
    > `Element.offsetLeft`返回当前元素左上角相对于`Element.offsetParent`节点的水平位移，`Element.offsetTop`返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。
    >
    > 下面的代码可以算出元素左上角相对于整张网页的坐标。
    >
    > ```
    > function getElementPosition(e) {
    >   var x = 0;
    >   var y = 0;
    >   while (e !== null)  {
    >     x += e.offsetLeft;
    >     y += e.offsetTop;
    >     e = e.offsetParent;
    >   }
    >   return {x: x, y: y};
    > }
    > ```
    >
    > ### Element.style
    >
    > 每个元素节点都有`style`用来读写该元素的行内样式信息，具体介绍参见《CSS 操作》一章。
    >
    > ### Element.children，Element.childElementCount
    >
    > `Element.children`属性返回一个类似数组的对象（`HTMLCollection`实例），包括当前元素节点的所有子元素。如果当前元素没有子元素，则返回的对象包含零个成员。
    >
    > ```
    > if (para.children.length) {
    >   var children = para.children;
    >     for (var i = 0; i < children.length; i++) {
    >       // ...
    >     }
    > }
    > ```
    >
    > 上面代码遍历了`para`元素的所有子元素。
    >
    > 这个属性与`Node.childNodes`属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点。
    >
    > `Element.childElementCount`属性返回当前元素节点包含的子元素节点的个数，与`Element.children.length`的值相同。
    >
    > ### Element.firstElementChild，Element.lastElementChild
    >
    > `Element.firstElementChild`属性返回当前元素的第一个元素子节点，`Element.lastElementChild`返回最后一个元素子节点。
    >
    > 如果没有元素子节点，这两个属性返回`null`。
    >
    > ### Element.nextElementSibling，Element.previousElementSibling
    >
    > `Element.nextElementSibling`属性返回当前元素节点的后一个同级元素节点，如果没有则返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <div id="div-01">Here is div-01</div>
    > // <div id="div-02">Here is div-02</div>
    > var el = document.getElementById('div-01');
    > el.nextElementSibling
    > // <div id="div-02">Here is div-02</div>
    > ```
    >
    > `Element.previousElementSibling`属性返回当前元素节点的前一个同级元素节点，如果没有则返回`null`。
    >
    > ## 实例方法
    >
    > ### 属性相关方法
    >
    > 元素节点提供六个方法，用来操作属性。
    >
    > - `getAttribute()`：读取某个属性的值
    > - `getAttributeNames()`：返回当前元素的所有属性名
    > - `setAttribute()`：写入属性值
    > - `hasAttribute()`：某个属性是否存在
    > - `hasAttributes()`：当前元素是否有属性
    > - `removeAttribute()`：删除属性
    >
    > 这些方法的介绍请看《属性的操作》一章。
    >
    > ### Element.querySelector()
    >
    > `Element.querySelector`方法接受 CSS 选择器作为参数，返回父元素的第一个匹配的子元素。如果没有找到匹配的子元素，就返回`null`。
    >
    > ```
    > var content = document.getElementById('content');
    > var el = content.querySelector('p');
    > ```
    >
    > 上面代码返回`content`节点的第一个`p`元素。
    >
    > `Element.querySelector`方法可以接受任何复杂的 CSS 选择器。
    >
    > ```
    > document.body.querySelector("style[type='text/css'], style:not([type])");
    > ```
    >
    > 注意，这个方法无法选中伪元素。
    >
    > 它可以接受多个选择器，它们之间使用逗号分隔。
    >
    > ```
    > element.querySelector('div, p')
    > ```
    >
    > 上面代码返回`element`的第一个`div`或`p`子元素。
    >
    > 需要注意的是，浏览器执行`querySelector`方法时，是先在全局范围内搜索给定的 CSS 选择器，然后过滤出哪些属于当前元素的子元素。因此，会有一些违反直觉的结果，下面是一段 HTML 代码。
    >
    > ```
    > <div>
    > <blockquote id="outer">
    >   <p>Hello</p>
    >   <div id="inner">
    >     <p>World</p>
    >   </div>
    > </blockquote>
    > </div>
    > ```
    >
    > 那么，像下面这样查询的话，实际上返回的是第一个`p`元素，而不是第二个。
    >
    > ```
    > var outer = document.getElementById('outer');
    > outer.querySelector('div p')
    > // <p>Hello</p>
    > ```
    >
    > ### Element.querySelectorAll()
    >
    > `Element.querySelectorAll`方法接受 CSS 选择器作为参数，返回一个`NodeList`实例，包含所有匹配的子元素。
    >
    > ```
    > var el = document.querySelector('#test');
    > var matches = el.querySelectorAll('div.highlighted > p');
    > ```
    >
    > 该方法的执行机制与`querySelector`方法相同，也是先在全局范围内查找，再过滤出当前元素的子元素。因此，选择器实际上针对整个文档的。
    >
    > 它也可以接受多个 CSS 选择器，它们之间使用逗号分隔。如果选择器里面有伪元素的选择器，则总是返回一个空的`NodeList`实例。
    >
    > ### Element.getElementsByClassName()
    >
    > `Element.getElementsByClassName`方法返回一个`HTMLCollection`实例，成员是当前元素节点的所有具有指定 class 的子元素节点。该方法与`document.getElementsByClassName`方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。
    >
    > ```
    > element.getElementsByClassName('red test');
    > ```
    >
    > 注意，该方法的参数大小写敏感。
    >
    > 由于`HTMLCollection`实例是一个活的集合，`document`对象的任何变化会立刻反应到实例，下面的代码不会生效。
    >
    > ```
    > // HTML 代码如下
    > // <div id="example">
    > //   <p class="foo"></p>
    > //   <p class="foo"></p>
    > // </div>
    > var element = document.getElementById('example');
    > var matches = element.getElementsByClassName('foo');
    > 
    > for (var i = 0; i< matches.length; i++) {
    >   matches[i].classList.remove('foo');
    >   matches.item(i).classList.add('bar');
    > }
    > // 执行后，HTML 代码如下
    > // <div id="example">
    > //   <p></p>
    > //   <p class="foo bar"></p>
    > // </div>
    > ```
    >
    > 上面代码中，`matches`集合的第一个成员，一旦被拿掉 class 里面的`foo`，就会立刻从`matches`里面消失，导致出现上面的结果。
    >
    > ### Element.getElementsByTagName()
    >
    > `Element.getElementsByTagName()`方法返回一个`HTMLCollection`实例，成员是当前节点的所有匹配指定标签名的子元素节点。该方法与`document.getElementsByClassName()`方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。
    >
    > ```
    > var table = document.getElementById('forecast-table');
    > var cells = table.getElementsByTagName('td');
    > ```
    >
    > 注意，该方法的参数是大小写不敏感的，因为 HTML 标签名也是大小写不敏感。
    >
    > ### Element.closest()
    >
    > `Element.closest`方法接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）。如果没有任何节点匹配 CSS 选择器，则返回`null`。
    >
    > ```
    > // HTML 代码如下
    > // <article>
    > //   <div id="div-01">Here is div-01
    > //     <div id="div-02">Here is div-02
    > //       <div id="div-03">Here is div-03</div>
    > //     </div>
    > //   </div>
    > // </article>
    > 
    > var div03 = document.getElementById('div-03');
    > 
    > // div-03 最近的祖先节点
    > div03.closest("#div-02") // div-02
    > div03.closest("div div") // div-03
    > div03.closest("article > div") //div-01
    > div03.closest(":not(div)") // article
    > ```
    >
    > 上面代码中，由于`closest`方法将当前节点也考虑在内，所以第二个`closest`方法返回`div-03`。
    >
    > ### Element.matches()
    >
    > `Element.matches`方法返回一个布尔值，表示当前元素是否匹配给定的 CSS 选择器。
    >
    > ```
    > if (el.matches('.someClass')) {
    >   console.log('Match!');
    > }
    > ```
    >
    > ### 事件相关方法
    >
    > 以下三个方法与`Element`节点的事件相关。这些方法都继承自`EventTarget`接口，详见相关章节。
    >
    > - `Element.addEventListener()`：添加事件的回调函数
    > - `Element.removeEventListener()`：移除事件监听函数
    > - `Element.dispatchEvent()`：触发事件
    >
    > ```
    > element.addEventListener('click', listener, false);
    > element.removeEventListener('click', listener, false);
    > 
    > var event = new Event('click');
    > element.dispatchEvent(event);
    > ```
    >
    > ### Element.scrollIntoView()
    >
    > `Element.scrollIntoView`方法滚动当前元素，进入浏览器的可见区域，类似于设置`window.location.hash`的效果。
    >
    > ```
    > el.scrollIntoView(); // 等同于el.scrollIntoView(true)
    > el.scrollIntoView(false);
    > ```
    >
    > 该方法可以接受一个布尔值作为参数。如果为`true`，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为`false`，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为`true`。
    >
    > ### Element.getBoundingClientRect()
    >
    > `Element.getBoundingClientRect`方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息。
    >
    > ```
    > var rect = obj.getBoundingClientRect();
    > ```
    >
    > 上面代码中，`getBoundingClientRect`方法返回的`rect`对象，具有以下属性（全部为只读）。
    >
    > - `x`：元素左上角相对于视口的横坐标
    > - `y`：元素左上角相对于视口的纵坐标
    > - `height`：元素高度
    > - `width`：元素宽度
    > - `left`：元素左上角相对于视口的横坐标，与`x`属性相等
    > - `right`：元素右边界相对于视口的横坐标（等于`x + width`）
    > - `top`：元素顶部相对于视口的纵坐标，与`y`属性相等
    > - `bottom`：元素底部相对于视口的纵坐标（等于`y + height`）
    >
    > 由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将`left`属性加上`window.scrollX`，`top`属性加上`window.scrollY`。
    >
    > 注意，`getBoundingClientRect`方法的所有属性，都把边框（`border`属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，`width`和`height`包括了元素本身 + `padding` + `border`。
    >
    > 另外，上面的这些属性，都是继承自原型的属性，`Object.keys`会返回一个空数组，这一点也需要注意。
    >
    > ```
    > var rect = document.body.getBoundingClientRect();
    > Object.keys(rect) // []
    > ```
    >
    > 上面代码中，`rect`对象没有自身属性，而`Object.keys`方法只返回对象自身的属性，所以返回了一个空数组。
    >
    > ### Element.getClientRects()
    >
    > `Element.getClientRects`方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形（所以方法名中的`Rect`用的是复数）。每个矩形都有`bottom`、`height`、`left`、`right`、`top`和`width`六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。
    >
    > 对于盒状元素（比如`<div>`和`<p>`），该方法返回的对象中只有该元素一个成员。对于行内元素（比如`<span>`、`<a>`、`<em>`），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。这是它和`Element.getBoundingClientRect()`方法的主要区别，后者对于行内元素总是返回一个矩形。
    >
    > ```
    > <span id="inline">Hello World Hello World Hello World</span>
    > ```
    >
    > 上面代码是一个行内元素`<span>`，如果它在页面上占据三行，`getClientRects`方法返回的对象就有三个成员，如果它在页面上占据一行，`getClientRects`方法返回的对象就只有一个成员。
    >
    > ```
    > var el = document.getElementById('inline');
    > el.getClientRects().length // 3
    > el.getClientRects()[0].left // 8
    > el.getClientRects()[0].right // 113.908203125
    > el.getClientRects()[0].bottom // 31.200000762939453
    > el.getClientRects()[0].height // 23.200000762939453
    > el.getClientRects()[0].width // 105.908203125
    > ```
    >
    > 这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移。
    >
    > 注意，如果行内元素包括换行符，那么该方法会把换行符考虑在内。
    >
    > ```
    > <span id="inline">
    >   Hello World
    >   Hello World
    >   Hello World
    > </span>
    > ```
    >
    > 上面代码中，`<span>`节点内部有三个换行符，即使 HTML 语言忽略换行符，将它们显示为一行，`getClientRects()`方法依然会返回三个成员。如果行宽设置得特别窄，上面的`<span>`元素显示为6行，那么就会返回六个成员。
    >
    > ### Element.insertAdjacentElement()
    >
    > `Element.insertAdjacentElement`方法在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回`null`。
    >
    > ```
    > element.insertAdjacentElement(position, element);
    > ```
    >
    > `Element.insertAdjacentElement`方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。
    >
    > - `beforebegin`：当前元素之前
    > - `afterbegin`：当前元素内部的第一个子节点前面
    > - `beforeend`：当前元素内部的最后一个子节点后面
    > - `afterend`：当前元素之后
    >
    > 注意，`beforebegin`和`afterend`这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。
    >
    > ```
    > var p1 = document.createElement('p')
    > var p2 = document.createElement('p')
    > p1.insertAdjacentElement('afterend', p2) // null
    > ```
    >
    > 上面代码中，`p1`没有父节点，所以插入`p2`到它后面就失败了。
    >
    > 如果插入的节点是一个文档里现有的节点，它会从原有位置删除，放置到新的位置。
    >
    > ### Element.insertAdjacentHTML()，Element.insertAdjacentText()
    >
    > `Element.insertAdjacentHTML`方法用于将一个 HTML 字符串，解析生成 DOM 结构，插入相对于当前节点的指定位置。
    >
    > ```
    > element.insertAdjacentHTML(position, text);
    > ```
    >
    > 该方法接受两个参数，第一个是一个表示指定位置的字符串，第二个是待解析的 HTML 字符串。第一个参数只能设置下面四个值之一。
    >
    > - `beforebegin`：当前元素之前
    > - `afterbegin`：当前元素内部的第一个子节点前面
    > - `beforeend`：当前元素内部的最后一个子节点后面
    > - `afterend`：当前元素之后
    >
    > ```
    > // HTML 代码：<div id="one">one</div>
    > var d1 = document.getElementById('one');
    > d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
    > // 执行后的 HTML 代码：
    > // <div id="one">one</div><div id="two">two</div>
    > ```
    >
    > 该方法只是在现有的 DOM 结构里面插入节点，这使得它的执行速度比`innerHTML`方法快得多。
    >
    > 注意，该方法不会转义 HTML 字符串，这导致它不能用来插入用户输入的内容，否则会有安全风险。
    >
    > `Element.insertAdjacentText`方法在相对于当前节点的指定位置，插入一个文本节点，用法与`Element.insertAdjacentHTML`方法完全一致。
    >
    > ```
    > // HTML 代码：<div id="one">one</div>
    > var d1 = document.getElementById('one');
    > d1.insertAdjacentText('afterend', 'two');
    > // 执行后的 HTML 代码：
    > // <div id="one">one</div>two
    > ```
    >
    > ### Element.remove()
    >
    > `Element.remove`方法继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除。
    >
    > ```
    > var el = document.getElementById('mydiv');
    > el.remove();
    > ```
    >
    > 上面代码将`el`节点从 DOM 树里面移除。
    >
    > ### Element.focus()，Element.blur()
    >
    > `Element.focus`方法用于将当前页面的焦点，转移到指定元素上。
    >
    > ```
    > document.getElementById('my-span').focus();
    > ```
    >
    > 该方法可以接受一个对象作为参数。参数对象的`preventScroll`属性是一个布尔值，指定是否将当前元素停留在原始位置，而不是滚动到可见区域。
    >
    > ```
    > function getFocus() {
    >   document.getElementById('btn').focus({preventScroll:false});
    > }
    > ```
    >
    > 上面代码会让`btn`元素获得焦点，并滚动到可见区域。
    >
    > 最后，从`document.activeElement`属性可以得到当前获得焦点的元素。
    >
    > `Element.blur`方法用于将焦点从当前元素移除。
    >
    > ### Element.click()
    >
    > `Element.click`方法用于在当前元素上模拟一次鼠标点击，相当于触发了`click`事件。

  - 属性的操作

    > HTML 元素包括标签名和若干个键值对，这个键值对就称为“属性”（attribute）。
    >
    > ```
    > <a id="test" href="http://www.example.com">
    >   链接
    > </a>
    > ```
    >
    > 上面代码中，`a`元素包括两个属性：`id`属性和`href`属性。
    >
    > 属性本身是一个对象（`Attr`对象），但是实际上，这个对象极少使用。一般都是通过元素节点对象（`HTMlElement`对象）来操作属性。本章介绍如何操作这些属性。
    >
    > ## Element.attributes 属性
    >
    > 元素对象有一个`attributes`属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。其他类型的节点对象，虽然也有`attributes`属性，但返回的都是`null`，因此可以把这个属性视为元素对象独有的。
    >
    > 单个属性可以通过序号引用，也可以通过属性名引用。
    >
    > ```
    > // HTML 代码如下
    > // <body bgcolor="yellow" onload="">
    > document.body.attributes[0]
    > document.body.attributes.bgcolor
    > document.body.attributes['ONLOAD']
    > ```
    >
    > 注意，上面代码的三种方法，返回的都是属性节点对象，而不是属性值。
    >
    > 属性节点对象有`name`和`value`属性，对应该属性的属性名和属性值，等同于`nodeName`属性和`nodeValue`属性。
    >
    > ```
    > // HTML代码为
    > // <div id="mydiv">
    > var n = document.getElementById('mydiv');
    > 
    > n.attributes[0].name // "id"
    > n.attributes[0].nodeName // "id"
    > 
    > n.attributes[0].value // "mydiv"
    > n.attributes[0].nodeValue // "mydiv"
    > ```
    >
    > 下面代码可以遍历一个元素节点的所有属性。
    >
    > ```
    > var para = document.getElementsByTagName('p')[0];
    > var result = document.getElementById('result');
    > 
    > if (para.hasAttributes()) {
    >   var attrs = para.attributes;
    >   var output = '';
    >   for(var i = attrs.length - 1; i >= 0; i--) {
    >     output += attrs[i].name + '->' + attrs[i].value;
    >   }
    >   result.textContent = output;
    > } else {
    >   result.textContent = 'No attributes to show';
    > }
    > ```
    >
    > ## 元素的标准属性
    >
    > HTML 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。
    >
    > ```
    > var a = document.getElementById('test');
    > a.id // "test"
    > a.href // "http://www.example.com/"
    > ```
    >
    > 上面代码中，`a`元素标签的属性`id`和`href`，自动成为节点对象的属性。
    >
    > 这些属性都是可写的。
    >
    > ```
    > var img = document.getElementById('myImage');
    > img.src = 'http://www.example.com/image.jpg';
    > ```
    >
    > 上面的写法，会立刻替换掉`img`对象的`src`属性，即会显示另外一张图片。
    >
    > 这种修改属性的方法，常常用于添加表单的属性。
    >
    > ```
    > var f = document.forms[0];
    > f.action = 'submit.php';
    > f.method = 'POST';
    > ```
    >
    > 上面代码为表单添加提交网址和提交方法。
    >
    > 注意，这种用法虽然可以读写属性，但是无法删除属性，`delete`运算符在这里不会生效。
    >
    > HTML 元素的属性名是大小写不敏感的，但是 JS 对象的属性名是大小写敏感的。转换规则是，转为 JS 属性名时，一律采用小写。如果属性名包括多个单词，则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如`onClick`。
    >
    > 有些 HTML 属性名是 JS 的保留字，转为 JS 属性时，必须改名。主要是以下两个。
    >
    > - `for`属性改为`htmlFor`
    > - `class`属性改为`className`
    >
    > 另外，HTML 属性值一般都是字符串，但是 JS 属性会自动转换类型。比如，将字符串`true`转为布尔值，将`onClick`的值转为一个函数，将`style`属性的值转为一个`CSSStyleDeclaration`对象。因此，可以对这些属性赋予各种类型的值。
    >
    > ## 属性操作的标准方法
    >
    > ### 概述
    >
    > 元素节点提供六个方法，用来操作属性。
    >
    > - `getAttribute()`
    > - `getAttributeNames()`
    > - `setAttribute()`
    > - `hasAttribute()`
    > - `hasAttributes()`
    > - `removeAttribute()`
    >
    > 这有几点注意。
    >
    > （1）适用性
    >
    > 这六个方法对所有属性（包括用户自定义的属性）都适用。
    >
    > （2）返回值
    >
    > `getAttribute()`只返回字符串，不会返回其他类型的值。
    >
    > （3）属性名
    >
    > 这些方法只接受属性的标准名称，不用改写保留字，比如`for`和`class`都可以直接使用。另外，这些方法对于属性名是大小写不敏感的。
    >
    > ```
    > var image = document.images[0];
    > image.setAttribute('class', 'myImage');
    > ```
    >
    > 上面代码中，`setAttribute`方法直接使用`class`作为属性名，不用写成`className`。
    >
    > ### Element.getAttribute()
    >
    > `Element.getAttribute`方法返回当前元素节点的指定属性。如果指定属性不存在，则返回`null`。
    >
    > ```
    > // HTML 代码为
    > // <div id="div1" align="left">
    > var div = document.getElementById('div1');
    > div.getAttribute('align') // "left"
    > ```
    >
    > ### Element.getAttributeNames()
    >
    > `Element.getAttributeNames()`返回一个数组，成员是当前元素的所有属性的名字。如果当前元素没有任何属性，则返回一个空数组。使用`Element.attributes`属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。
    >
    > ```
    > var mydiv = document.getElementById('mydiv');
    > 
    > mydiv.getAttributeNames().forEach(function (key) {
    >   var value = mydiv.getAttribute(key);
    >   console.log(key, value);
    > })
    > ```
    >
    > 上面代码用于遍历某个节点的所有属性。
    >
    > ### Element.setAttribute()
    >
    > `Element.setAttribute`方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值。
    >
    > ```
    > // HTML 代码为
    > // <button>Hello World</button>
    > var b = document.querySelector('button');
    > b.setAttribute('name', 'myButton');
    > b.setAttribute('disabled', true);
    > ```
    >
    > 上面代码中，`button`元素的`name`属性被设成`myButton`，`disabled`属性被设成`true`。
    >
    > 这里有两个地方需要注意，首先，属性值总是字符串，其他类型的值会自动转成字符串，比如布尔值`true`就会变成字符串`true`；其次，上例的`disable`属性是一个布尔属性，对于`<button>`元素来说，这个属性不需要属性值，只要设置了就总是会生效，因此`setAttribute`方法里面可以将`disabled`属性设成任意值。
    >
    > ### Element.hasAttribute()
    >
    > `Element.hasAttribute`方法返回一个布尔值，表示当前元素节点是否包含指定属性。
    >
    > ```
    > var d = document.getElementById('div1');
    > 
    > if (d.hasAttribute('align')) {
    >   d.setAttribute('align', 'center');
    > }
    > ```
    >
    > 上面代码检查`div`节点是否含有`align`属性。如果有，则设置为居中对齐。
    >
    > ### Element.hasAttributes()
    >
    > `Element.hasAttributes`方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回`false`，否则返回`true`。
    >
    > ```
    > var foo = document.getElementById('foo');
    > foo.hasAttributes() // true
    > ```
    >
    > ### Element.removeAttribute()
    >
    > `Element.removeAttribute`方法移除指定属性。该方法没有返回值。
    >
    > ```
    > // HTML 代码为
    > // <div id="div1" align="left" width="200px">
    > document.getElementById('div1').removeAttribute('align');
    > // 现在的HTML代码为
    > // <div id="div1" width="200px">
    > ```
    >
    > ## dataset 属性
    >
    > 有时，需要在HTML元素上附加数据，供 JS 脚本使用。一种解决方法是自定义属性。
    >
    > ```
    > <div id="mydiv" foo="bar">
    > ```
    >
    > 上面代码为`div`元素自定义了`foo`属性，然后可以用`getAttribute()`和`setAttribute()`读写这个属性。
    >
    > ```
    > var n = document.getElementById('mydiv');
    > n.getAttribute('foo') // bar
    > n.setAttribute('foo', 'baz')
    > ```
    >
    > 这种方法虽然可以达到目的，但是会使得 HTML 元素的属性不符合标准，导致网页代码通不过校验。
    >
    > 更好的解决方法是，使用标准提供的`data-*`属性。
    >
    > ```
    > <div id="mydiv" data-foo="bar">
    > ```
    >
    > 然后，使用元素节点对象的`dataset`属性，它指向一个对象，可以用来操作 HTML 元素标签的`data-*`属性。
    >
    > ```
    > var n = document.getElementById('mydiv');
    > n.dataset.foo // bar
    > n.dataset.foo = 'baz'
    > ```
    >
    > 上面代码中，通过`dataset.foo`读写`data-foo`属性。
    >
    > 删除一个`data-*`属性，可以直接使用`delete`命令。
    >
    > ```
    > delete document.getElementById('myDiv').dataset.foo;
    > ```
    >
    > 除了`dataset`属性，也可以用`getAttribute('data-foo')`、`removeAttribute('data-foo')`、`setAttribute('data-foo')`、`hasAttribute('data-foo')`等方法操作`data-*`属性。
    >
    > 注意，`data-`后面的属性名有限制，只能包含字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`)。而且，属性名不应该使用`A`到`Z`的大写字母，比如不能有`data-helloWorld`这样的属性名，而要写成`data-hello-world`。
    >
    > 转成`dataset`的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，`dataset`的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。比如，`dataset.helloWorld`会转成`data-hello-world`。

  - Text 节点和 DocumentFragment 节点

    > ## Text 节点的概念
    >
    > 文本节点（`Text`）代表元素节点（`Element`）和属性节点（`Attribute`）的文本内容。如果一个节点只包含一段文本，那么它就有一个文本子节点，代表该节点的文本内容。
    >
    > 通常我们使用父节点的`firstChild`、`nextSibling`等属性获取文本节点，或者使用`Document`节点的`createTextNode`方法创造一个文本节点。
    >
    > ```
    > // 获取文本节点
    > var textNode = document.querySelector('p').firstChild;
    > 
    > // 创造文本节点
    > var textNode = document.createTextNode('Hi');
    > document.querySelector('div').appendChild(textNode);
    > ```
    >
    > 浏览器原生提供一个`Text`构造函数。它返回一个文本节点实例。它的参数就是该文本节点的文本内容。
    >
    > ```
    > // 空字符串
    > var text1 = new Text();
    > 
    > // 非空字符串
    > var text2 = new Text('This is a text node');
    > ```
    >
    > 注意，由于空格也是一个字符，所以哪怕只有一个空格，也会形成文本节点。比如，`<p> </p>`包含一个空格，它的子节点就是一个文本节点。
    >
    > 文本节点除了继承`Node`接口，还继承了`CharacterData`接口。`Node`接口的属性和方法请参考《Node 接口》一章，这里不再重复介绍了，以下的属性和方法大部分来自`CharacterData`接口。
    >
    > ## Text 节点的属性
    >
    > ### data
    >
    > `data`属性等同于`nodeValue`属性，用来设置或读取文本节点的内容。
    >
    > ```
    > // 读取文本内容
    > document.querySelector('p').firstChild.data
    > // 等同于
    > document.querySelector('p').firstChild.nodeValue
    > 
    > // 设置文本内容
    > document.querySelector('p').firstChild.data = 'Hello World';
    > ```
    >
    > ### wholeText
    >
    > `wholeText`属性将当前文本节点与毗邻的文本节点，作为一个整体返回。大多数情况下，`wholeText`属性的返回值，与`data`属性和`textContent`属性相同。但是，某些特殊情况会有差异。
    >
    > 举例来说，HTML 代码如下。
    >
    > ```
    > <p id="para">A <em>B</em> C</p>
    > ```
    >
    > 这时，文本节点的`wholeText`属性和`data`属性，返回值相同。
    >
    > ```
    > var el = document.getElementById('para');
    > el.firstChild.wholeText // "A "
    > el.firstChild.data // "A "
    > ```
    >
    > 但是，一旦移除`<em>`节点，`wholeText`属性与`data`属性就会有差异，因为这时其实`<p>`节点下面包含了两个毗邻的文本节点。
    >
    > ```
    > el.removeChild(para.childNodes[1]);
    > el.firstChild.wholeText // "A C"
    > el.firstChild.data // "A "
    > ```
    >
    > ### length
    >
    > `length`属性返回当前文本节点的文本长度。
    >
    > ```
    > (new Text('Hello')).length // 5
    > ```
    >
    > ### nextElementSibling，previousElementSibling
    >
    > `nextElementSibling`属性返回紧跟在当前文本节点后面的那个同级元素节点。如果取不到元素节点，则返回`null`。
    >
    > ```
    > // HTML 为
    > // <div>Hello <em>World</em></div>
    > var tn = document.querySelector('div').firstChild;
    > tn.nextElementSibling
    > // <em>World</em>
    > ```
    >
    > `previousElementSibling`属性返回当前文本节点前面最近的同级元素节点。如果取不到元素节点，则返回`null：`。
    >
    > ## Text 节点的方法
    >
    > ### appendData()，deleteData()，insertData()，replaceData()，subStringData()
    >
    > 以下5个方法都是编辑`Text`节点文本内容的方法。
    >
    > - `appendData()`：在`Text`节点尾部追加字符串。
    > - `deleteData()`：删除`Text`节点内部的子字符串，第一个参数为子字符串开始位置，第二个参数为子字符串长度。
    > - `insertData()`：在`Text`节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。
    > - `replaceData()`：用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。
    > - `subStringData()`：用于获取子字符串，第一个参数为子字符串在`Text`节点中的开始位置，第二个参数为子字符串长度。
    >
    > ```
    > // HTML 代码为
    > // <p>Hello World</p>
    > var pElementText = document.querySelector('p').firstChild;
    > 
    > pElementText.appendData('!');
    > // 页面显示 Hello World!
    > pElementText.deleteData(7, 5);
    > // 页面显示 Hello W
    > pElementText.insertData(7, 'Hello ');
    > // 页面显示 Hello WHello
    > pElementText.replaceData(7, 5, 'World');
    > // 页面显示 Hello WWorld
    > pElementText.substringData(7, 10);
    > // 页面显示不变，返回"World "
    > ```
    >
    > ### remove()
    >
    > `remove`方法用于移除当前`Text`节点。
    >
    > ```
    > // HTML 代码为
    > // <p>Hello World</p>
    > document.querySelector('p').firstChild.remove()
    > // 现在 HTML 代码为
    > // <p></p>
    > ```
    >
    > ### splitText()
    >
    > `splitText`方法将`Text`节点一分为二，变成两个毗邻的`Text`节点。它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。
    >
    > 分割后，该方法返回分割位置后方的字符串，而原`Text`节点变成只包含分割位置前方的字符串。
    >
    > ```
    > // html 代码为 <p id="p">foobar</p>
    > var p = document.getElementById('p');
    > var textnode = p.firstChild;
    > 
    > var newText = textnode.splitText(3);
    > newText // "bar"
    > textnode // "foo"
    > ```
    >
    > 父元素节点的`normalize`方法可以将毗邻的两个`Text`节点合并。
    >
    > 接上面的例子，文本节点的`splitText`方法将一个`Text`节点分割成两个，父元素的`normalize`方法可以实现逆操作，将它们合并。
    >
    > ```
    > p.childNodes.length // 2
    > 
    > // 将毗邻的两个 Text 节点合并
    > p.normalize();
    > p.childNodes.length // 1
    > ```
    >
    > ## DocumentFragment 节点
    >
    > `DocumentFragment`节点代表一个文档的片段，本身就是一个完整的 DOM 树形结构。它没有父节点，`parentNode`返回`null`，但是可以插入任意数量的子节点。它不属于当前文档，操作`DocumentFragment`节点，要比直接操作 DOM 树快得多。
    >
    > 它一般用于构建一个 DOM 结构，然后插入当前文档。`document.createDocumentFragment`方法，以及浏览器原生的`DocumentFragment`构造函数，可以创建一个空的`DocumentFragment`节点。然后再使用其他 DOM 方法，向其添加子节点。
    >
    > ```
    > var docFrag = document.createDocumentFragment();
    > // 等同于
    > var docFrag = new DocumentFragment();
    > 
    > var li = document.createElement('li');
    > li.textContent = 'Hello World';
    > docFrag.appendChild(li);
    > 
    > document.querySelector('ul').appendChild(docFrag);
    > ```
    >
    > 上面代码创建了一个`DocumentFragment`节点，然后将一个`li`节点添加在它里面，最后将`DocumentFragment`节点移动到原文档。
    >
    > 注意，`DocumentFragment`节点本身不能被插入当前文档。当它作为`appendChild()`、`insertBefore()`、`replaceChild()`等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦`DocumentFragment`节点被添加进当前文档，它自身就变成了空节点（`textContent`属性为空字符串），可以被再次使用。如果想要保存`DocumentFragment`节点的内容，可以使用`cloneNode`方法。
    >
    > ```
    > document
    >   .querySelector('ul')
    >   .appendChild(docFrag.cloneNode(true));
    > ```
    >
    > 上面这样添加`DocumentFragment`节点进入当前文档，不会清空`DocumentFragment`节点。
    >
    > 下面是一个例子，使用`DocumentFragment`反转一个指定节点的所有子节点的顺序。
    >
    > ```
    > function reverse(n) {
    >   var f = document.createDocumentFragment();
    >   while(n.lastChild) f.appendChild(n.lastChild);
    >   n.appendChild(f);
    > }
    > ```
    >
    > `DocumentFragment`节点对象没有自己的属性和方法，全部继承自`Node`节点和`ParentNode`接口。也就是说，`DocumentFragment`节点比`Node`节点多出以下四个属性。
    >
    > - `children`：返回一个动态的`HTMLCollection`集合对象，包括当前`DocumentFragment`对象的所有子元素节点。
    > - `firstElementChild`：返回当前`DocumentFragment`对象的第一个子元素节点，如果没有则返回`null`。
    > - `lastElementChild`：返回当前`DocumentFragment`对象的最后一个子元素节点，如果没有则返回`null`。
    > - `childElementCount`：返回当前`DocumentFragment`对象的所有子元素数量。

  - CSS 操作

    > CSS 与 JS 是两个有着明确分工的领域，前者负责页面的视觉效果，后者负责与用户的行为互动。但是，它们毕竟同属网页开发的前端，因此不可避免有着交叉和互相配合。本章介绍如何通过 JS 操作 CSS。
    >
    > ## HTML 元素的 style 属性
    >
    > 操作 CSS 样式最简单的方法，就是使用网页元素节点的`getAttribute()`方法、`setAttribute()`方法和`removeAttribute()`方法，直接读写或删除网页元素的`style`属性。
    >
    > ```
    > div.setAttribute(
    >   'style',
    >   'background-color:red;' + 'border:1px solid black;'
    > );
    > ```
    >
    > 上面的代码相当于下面的 HTML 代码。
    >
    > ```
    > <div style="background-color:red; border:1px solid black;" />
    > ```
    >
    > `style`不仅可以使用字符串读写，它本身还是一个对象，部署了 CSSStyleDeclaration 接口（详见下面的介绍），可以直接读写个别属性。
    >
    > ```
    > e.style.fontSize = '18px';
    > e.style.color = 'black';
    > ```
    >
    > ## CSSStyleDeclaration 接口
    >
    > ### 简介
    >
    > CSSStyleDeclaration 接口用来操作元素的样式。三个地方部署了这个接口。
    >
    > - 元素节点的`style`属性（`Element.style`）
    > - `CSSStyle`实例的`style`属性
    > - `window.getComputedStyle()`的返回值
    >
    > CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。
    >
    > ```
    > var divStyle = document.querySelector('div').style;
    > 
    > divStyle.backgroundColor = 'red';
    > divStyle.border = '1px solid black';
    > divStyle.width = '100px';
    > divStyle.height = '100px';
    > divStyle.fontSize = '10em';
    > 
    > divStyle.backgroundColor // red
    > divStyle.border // 1px solid black
    > divStyle.height // 100px
    > divStyle.width // 100px
    > ```
    >
    > 上面代码中，`style`属性的值是一个 CSSStyleDeclaration 实例。这个对象所包含的属性与 CSS 规则一一对应，但是名字需要改写，比如`background-color`写成`backgroundColor`。改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写。如果 CSS 属性名是 JS 保留字，则规则名之前需要加上字符串`css`，比如`float`写成`cssFloat`。
    >
    > 注意，该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，`divStyle.width`不能写为`100`，而要写为`100px`。
    >
    > 另外，`Element.style`返回的只是行内样式，并不是该元素的全部样式。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。元素的全部样式要通过`window.getComputedStyle()`得到。
    >
    > ### CSSStyleDeclaration 实例属性
    >
    > **（1）CSSStyleDeclaration.cssText**
    >
    > `CSSStyleDeclaration.cssText`属性用来读写当前规则的所有样式声明文本。
    >
    > ```
    > var divStyle = document.querySelector('div').style;
    > 
    > divStyle.cssText = 'background-color: red;'
    >   + 'border: 1px solid black;'
    >   + 'height: 100px;'
    >   + 'width: 100px;';
    > ```
    >
    > 注意，`cssText`的属性值不用改写 CSS 属性名。
    >
    > 删除一个元素的所有行内样式，最简便的方法就是设置`cssText`为空字符串。
    >
    > ```
    > divStyle.cssText = '';
    > ```
    >
    > **（2）CSSStyleDeclaration.length**
    >
    > `CSSStyleDeclaration.length`属性返回一个整数值，表示当前规则包含多少条样式声明。
    >
    > ```
    > // HTML 代码如下
    > // <div id="myDiv"
    > //   style="height: 1px;width: 100%;background-color: #CA1;"
    > // ></div>
    > var myDiv = document.getElementById('myDiv');
    > var divStyle = myDiv.style;
    > divStyle.length // 3
    > ```
    >
    > 上面代码中，`myDiv`元素的行内样式共包含3条样式规则。
    >
    > **（3）CSSStyleDeclaration.parentRule**
    >
    > `CSSStyleDeclaration.parentRule`属性返回当前规则所属的那个样式块（CSSRule 实例）。如果不存在所属的样式块，该属性返回`null`。
    >
    > 该属性只读，且只在使用 CSSRule 接口时有意义。
    >
    > ```
    > var declaration = document.styleSheets[0].rules[0].style;
    > declaration.parentRule === document.styleSheets[0].rules[0]
    > // true
    > ```
    >
    > ### CSSStyleDeclaration 实例方法
    >
    > **（1）CSSStyleDeclaration.getPropertyPriority()**
    >
    > `CSSStyleDeclaration.getPropertyPriority`方法接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置`important`优先级。如果有就返回`important`，否则返回空字符串。
    >
    > ```
    > // HTML 代码为
    > // <div id="myDiv" style="margin: 10px!important; color: red;"/>
    > var style = document.getElementById('myDiv').style;
    > style.margin // "10px"
    > style.getPropertyPriority('margin') // "important"
    > style.getPropertyPriority('color') // ""
    > ```
    >
    > 上面代码中，`margin`属性有`important`优先级，`color`属性没有。
    >
    > **（2）CSSStyleDeclaration.getPropertyValue()**
    >
    > `CSSStyleDeclaration.getPropertyValue`方法接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。
    >
    > ```
    > // HTML 代码为
    > // <div id="myDiv" style="margin: 10px!important; color: red;"/>
    > var style = document.getElementById('myDiv').style;
    > style.margin // "10px"
    > style.getPropertyValue("margin") // "10px"
    > ```
    >
    > **（3）CSSStyleDeclaration.item()**
    >
    > `CSSStyleDeclaration.item`方法接受一个整数值作为参数，返回该位置的 CSS 属性名。
    >
    > ```
    > // HTML 代码为
    > // <div id="myDiv" style="color: red; background-color: white;"/>
    > var style = document.getElementById('myDiv').style;
    > style.item(0) // "color"
    > style.item(1) // "background-color"
    > ```
    >
    > 上面代码中，`0`号位置的 CSS 属性名是`color`，`1`号位置的 CSS 属性名是`background-color`。
    >
    > 如果没有提供参数，这个方法会报错。如果参数值超过实际的属性数目，这个方法返回一个空字符值。
    >
    > **（4）CSSStyleDeclaration.removeProperty()**
    >
    > `CSSStyleDeclaration.removeProperty`方法接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值。
    >
    > ```
    > // HTML 代码为
    > // <div id="myDiv" style="color: red; background-color: white;">
    > //   111
    > // </div>
    > var style = document.getElementById('myDiv').style;
    > style.removeProperty('color') // 'red'
    > // HTML 代码变为
    > // <div id="myDiv" style="background-color: white;">
    > ```
    >
    > 上面代码中，删除`color`属性以后，字体颜色从红色变成默认颜色。
    >
    > **（5）CSSStyleDeclaration.setProperty()**
    >
    > `CSSStyleDeclaration.setProperty`方法用来设置新的 CSS 属性。该方法没有返回值。
    >
    > 该方法可以接受三个参数。
    >
    > - 第一个参数：属性名，该参数是必需的。
    > - 第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。
    > - 第三个参数：优先级，该参数可选。如果设置，唯一的合法值是`important`，表示 CSS 规则里面的`!important`。
    >
    > ```
    > // HTML 代码为
    > // <div id="myDiv" style="color: red; background-color: white;">
    > //   111
    > // </div>
    > var style = document.getElementById('myDiv').style;
    > style.setProperty('border', '1px solid blue');
    > ```
    >
    > 上面代码执行后，`myDiv`元素就会出现蓝色的边框。
    >
    > ## CSS 模块的侦测
    >
    > CSS 的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对 CSS 模块的支持情况都不一样。有时候，需要知道当前浏览器是否支持某个模块，这就叫做“CSS模块的侦测”。
    >
    > 一个比较普遍适用的方法是，判断元素的`style`对象的某个属性值是否为字符串。
    >
    > ```
    > typeof element.style.animationName === 'string';
    > typeof element.style.transform === 'string';
    > ```
    >
    > 如果该 CSS 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回`undefined`。
    >
    > ```
    > document.body.style['maxWidth'] // ""
    > document.body.style['maximumWidth'] // undefined
    > ```
    >
    > 上面代码说明，这个浏览器支持`max-width`属性，但是不支持`maximum-width`属性。
    >
    > 注意，不管 CSS 属性名的写法带不带连词线，`style`属性上都能反映出该属性是否存在。
    >
    > ```
    > document.body.style['backgroundColor'] // ""
    > document.body.style['background-color'] // ""
    > ```
    >
    > 另外，使用的时候，需要把不同浏览器的 CSS 前缀也考虑进去。
    >
    > ```
    > var content = document.getElementById('content');
    > typeof content.style['webkitAnimation'] === 'string'
    > ```
    >
    > 这种侦测方法可以写成一个函数。
    >
    > ```
    > function isPropertySupported(property) {
    >   if (property in document.body.style) return true;
    >   var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
    >   var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);
    > 
    >   for(var i = 0; i < prefixes.length; i++){
    >     if((prefixes[i] + prefProperty) in document.body.style) return true;
    >   }
    > 
    >   return false;
    > }
    > 
    > isPropertySupported('background-clip')
    > // true
    > ```
    >
    > ## CSS 对象
    >
    > 浏览器原生提供 CSS 对象，为 JS 操作 CSS 提供一些工具方法。
    >
    > 这个对象目前有两个静态方法。
    >
    > ### CSS.escape()
    >
    > `CSS.escape`方法用于转义 CSS 选择器里面的特殊字符。
    >
    > ```
    > <div id="foo#bar">
    > ```
    >
    > 上面代码中，该元素的`id`属性包含一个`#`号，该字符在 CSS 选择器里面有特殊含义。不能直接写成`document.querySelector('#foo#bar')`，只能写成`document.querySelector('#foo\\#bar')`。这里必须使用双斜杠的原因是，单引号字符串本身会转义一次斜杠。
    >
    > `CSS.escape`方法就用来转义那些特殊字符。
    >
    > ```
    > document.querySelector('#' + CSS.escape('foo#bar'))
    > ```
    >
    > ### CSS.supports()
    >
    > `CSS.supports`方法返回一个布尔值，表示当前环境是否支持某一句 CSS 规则。
    >
    > 它的参数有两种写法，一种是第一个参数是属性名，第二个参数是属性值；另一种是整个参数就是一行完整的 CSS 语句。
    >
    > ```
    > // 第一种写法
    > CSS.supports('transform-origin', '5px') // true
    > 
    > // 第二种写法
    > CSS.supports('display: table-cell') // true
    > ```
    >
    > 注意，第二种写法的参数结尾不能带有分号，否则结果不准确。
    >
    > ```
    > CSS.supports('display: table-cell;') // false
    > ```
    >
    > ## window.getComputedStyle()
    >
    > 行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。
    >
    > `window.getComputedStyle()`方法，就用来返回浏览器计算后得到的最终规则。它接受一个节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果。
    >
    > ```
    > var div = document.querySelector('div');
    > var styleObj = window.getComputedStyle(div);
    > styleObj.backgroundColor
    > ```
    >
    > 上面代码中，得到的背景色就是`div`元素真正的背景色。
    >
    > 注意，CSSStyleDeclaration 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的。
    >
    > `getComputedStyle`方法还可以接受第二个参数，表示当前元素的伪元素（比如`:before`、`:after`、`:first-line`、`:first-letter`等）。
    >
    > ```
    > var result = window.getComputedStyle(div, ':before');
    > ```
    >
    > 下面的例子是如何获取元素的高度。
    >
    > ```
    > var elem = document.getElementById('elem-container');
    > var styleObj = window.getComputedStyle(elem, null)
    > var height = styleObj.height;
    > // 等同于
    > var height = styleObj['height'];
    > var height = styleObj.getPropertyValue('height');
    > ```
    >
    > 上面代码得到的`height`属性，是浏览器最终渲染出来的高度，比其他方法得到的高度更可靠。由于`styleObj`是 CSSStyleDeclaration 实例，所以可以使用各种 CSSStyleDeclaration 的实例属性和方法。
    >
    > 有几点需要注意。
    >
    > - CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。比如，长度都是像素单位（返回值包括`px`后缀），颜色是`rgb(#, #, #)`或`rgba(#, #, #, #)`格式。
    > - CSS 规则的简写形式无效。比如，想读取`margin`属性的值，不能直接读，只能读`marginLeft`、`marginTop`等属性；再比如，`font`属性也是不能直接读的，只能读`font-size`等单个属性。
    > - 如果读取 CSS 原始的属性名，要用方括号运算符，比如`styleObj['z-index']`；如果读取骆驼拼写法的 CSS 属性名，可以直接读取`styleObj.zIndex`。
    > - 该方法返回的 CSSStyleDeclaration 实例的`cssText`属性总是返回空字符串。
    >
    > ## CSS 伪元素
    >
    > CSS 伪元素是通过 CSS 向 DOM 添加的元素，主要是通过`:before`和`:after`选择器生成，然后用`content`属性指定伪元素的内容。
    >
    > 下面是一段 HTML 代码。
    >
    > ```
    > <div id="test">Test content</div>
    > ```
    >
    > CSS 添加伪元素`:before`的写法如下。
    >
    > ```
    > #test:before {
    >   content: 'Before ';
    >   color: #FF0;
    > }
    > ```
    >
    > 节点元素的`style`对象无法读写伪元素的样式，这时就要用到`window.getComputedStyle()`。JS 获取伪元素，可以使用下面的方法。
    >
    > ```
    > var test = document.querySelector('#test');
    > 
    > var result = window.getComputedStyle(test, ':before').content;
    > var color = window.getComputedStyle(test, ':before').color;
    > ```
    >
    > 此外，也可以使用 CSSStyleDeclaration 实例的`getPropertyValue`方法，获取伪元素的属性。
    >
    > ```
    > var result = window.getComputedStyle(test, ':before')
    >   .getPropertyValue('content');
    > var color = window.getComputedStyle(test, ':before')
    >   .getPropertyValue('color');
    > ```
    >
    > ## StyleSheet 接口
    >
    > ### 概述
    >
    > `StyleSheet`接口代表网页的一张样式表，包括`<link>`元素加载的样式表和`<style>`元素内嵌的样式表。
    >
    > `document`对象的`styleSheets`属性，可以返回当前页面的所有`StyleSheet`实例（即所有样式表）。它是一个类似数组的对象。
    >
    > ```
    > var sheets = document.styleSheets;
    > var sheet = document.styleSheets[0];
    > sheet instanceof StyleSheet // true
    > ```
    >
    > 如果是`<style>`元素嵌入的样式表，还有另一种获取`StyleSheet`实例的方法，就是这个节点元素的`sheet`属性。
    >
    > ```
    > // HTML 代码为 <style id="myStyle"></style>
    > var myStyleSheet = document.getElementById('myStyle').sheet;
    > myStyleSheet instanceof StyleSheet // true
    > ```
    >
    > 严格地说，`StyleSheet`接口不仅包括网页样式表，还包括 XML 文档的样式表。所以，它有一个子类`CSSStyleSheet`表示网页的 CSS 样式表。我们在网页里面拿到的样式表实例，实际上是`CSSStyleSheet`的实例。这个子接口继承了`StyleSheet`的所有属性和方法，并且定义了几个自己的属性，下面把这两个接口放在一起介绍。
    >
    > ### 实例属性
    >
    > `StyleSheet`实例有以下属性。
    >
    > **（1）StyleSheet.disabled**
    >
    > `StyleSheet.disabled`返回一个布尔值，表示该样式表是否处于禁用状态。手动设置`disabled`属性为`true`，等同于在`<link>`元素里面，将这张样式表设为`alternate stylesheet`，即该样式表将不会生效。
    >
    > 注意，`disabled`属性只能在 JS 脚本中设置，不能在 HTML 语句中设置。
    >
    > **（2）StyleSheet.href**
    >
    > `StyleSheet.href`返回样式表的网址。对于内嵌样式表，该属性返回`null`。该属性只读。
    >
    > ```
    > document.styleSheets[0].href
    > ```
    >
    > **（3）StyleSheet.media**
    >
    > `StyleSheet.media`属性返回一个类似数组的对象（`MediaList`实例），成员是表示适用媒介的字符串。表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。该属性只读，默认值是`screen`。
    >
    > ```
    > document.styleSheets[0].media.mediaText
    > // "all"
    > ```
    >
    > `MediaList`实例的`appendMedium`方法，用于增加媒介；`deleteMedium`方法用于删除媒介。
    >
    > ```
    > document.styleSheets[0].media.appendMedium('handheld');
    > document.styleSheets[0].media.deleteMedium('print');
    > ```
    >
    > **（4）StyleSheet.title**
    >
    > `StyleSheet.title`属性返回样式表的`title`属性。
    >
    > **（5）StyleSheet.type**
    >
    > `StyleSheet.type`属性返回样式表的`type`属性，通常是`text/css`。
    >
    > ```
    > document.styleSheets[0].type  // "text/css"
    > ```
    >
    > **（6）StyleSheet.parentStyleSheet**
    >
    > CSS 的`@import`命令允许在样式表中加载其他样式表。`StyleSheet.parentStyleSheet`属性返回包含了当前样式表的那张样式表。如果当前样式表是顶层样式表，则该属性返回`null`。
    >
    > ```
    > if (stylesheet.parentStyleSheet) {
    >   sheet = stylesheet.parentStyleSheet;
    > } else {
    >   sheet = stylesheet;
    > }
    > ```
    >
    > **（7）StyleSheet.ownerNode**
    >
    > `StyleSheet.ownerNode`属性返回`StyleSheet`对象所在的 DOM 节点，通常是`<link>`或`<style>`。对于那些由其他样式表引用的样式表，该属性为`null`。
    >
    > ```
    > // HTML代码为
    > // <link rel="StyleSheet" href="example.css" type="text/css" />
    > document.styleSheets[0].ownerNode // [object HTMLLinkElement]
    > ```
    >
    > **（8）CSSStyleSheet.cssRules**
    >
    > `CSSStyleSheet.cssRules`属性指向一个类似数组的对象（`CSSRuleList`实例），里面每一个成员就是当前样式表的一条 CSS 规则。使用该规则的`cssText`属性，可以得到 CSS 规则对应的字符串。
    >
    > ```
    > var sheet = document.querySelector('#styleElement').sheet;
    > 
    > sheet.cssRules[0].cssText
    > // "body { background-color: red; margin: 20px; }"
    > 
    > sheet.cssRules[1].cssText
    > // "p { line-height: 1.4em; color: blue; }"
    > ```
    >
    > 每条 CSS 规则还有一个`style`属性，指向一个对象，用来读写具体的 CSS 命令。
    >
    > ```
    > cssStyleSheet.cssRules[0].style.color = 'red';
    > cssStyleSheet.cssRules[1].style.color = 'purple';
    > ```
    >
    > **（9）CSSStyleSheet.ownerRule**
    >
    > 有些样式表是通过`@import`规则输入的，它的`ownerRule`属性会返回一个`CSSRule`实例，代表那行`@import`规则。如果当前样式表不是通过`@import`引入的，`ownerRule`属性返回`null`。
    >
    > ### 实例方法
    >
    > **（1）CSSStyleSheet.insertRule()**
    >
    > `CSSStyleSheet.insertRule`方法用于在当前样式表的插入一个新的 CSS 规则。
    >
    > ```
    > var sheet = document.querySelector('#styleElement').sheet;
    > sheet.insertRule('#block { color: white }', 0);
    > sheet.insertRule('p { color: red }', 1);
    > ```
    >
    > 该方法可以接受两个参数，第一个参数是表示 CSS 规则的字符串，这里只能有一条规则，否则会报错。第二个参数是该规则在样式表的插入位置（从0开始），该参数可选，默认为0（即默认插在样式表的头部）。注意，如果插入位置大于现有规则的数目，会报错。
    >
    > 该方法的返回值是新插入规则的位置序号。
    >
    > 注意，浏览器对脚本在样式表里面插入规则有很多[限制](https://drafts.csswg.org/cssom/#insert-a-css-rule)。所以，这个方法最好放在`try...catch`里使用。
    >
    > **（2）CSSStyleSheet.deleteRule()**
    >
    > `CSSStyleSheet.deleteRule`方法用来在样式表里面移除一条规则，它的参数是该条规则在`cssRules`对象中的位置。该方法没有返回值。
    >
    > ```
    > document.styleSheets[0].deleteRule(1);
    > ```
    >
    > ## 实例：添加样式表
    >
    > 网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个`<style>`节点。
    >
    > ```
    > // 写法一
    > var style = document.createElement('style');
    > style.setAttribute('media', 'screen');
    > style.innerHTML = 'body{color:red}';
    > document.head.appendChild(style);
    > 
    > // 写法二
    > var style = (function () {
    >   var style = document.createElement('style');
    >   document.head.appendChild(style);
    >   return style;
    > })();
    > style.sheet.insertRule('.foo{color:red;}', 0);
    > ```
    >
    > 另一种是添加外部样式表，即在文档中添加一个`<link>`节点，然后将`href`属性指向外部样式表的 URL。
    >
    > ```
    > var linkElm = document.createElement('link');
    > linkElm.setAttribute('rel', 'stylesheet');
    > linkElm.setAttribute('type', 'text/css');
    > linkElm.setAttribute('href', 'reset-min.css');
    > 
    > document.head.appendChild(linkElm);
    > ```
    >
    > ## CSSRuleList 接口
    >
    > CSSRuleList 接口是一个类似数组的对象，表示一组 CSS 规则，成员都是 CSSRule 实例。
    >
    > 获取 CSSRuleList 实例，一般是通过`StyleSheet.cssRules`属性。
    >
    > ```
    > // HTML 代码如下
    > // <style id="myStyle">
    > //   h1 { color: red; }
    > //   p { color: blue; }
    > // </style>
    > var myStyleSheet = document.getElementById('myStyle').sheet;
    > var crl = myStyleSheet.cssRules;
    > crl instanceof CSSRuleList // true
    > ```
    >
    > CSSRuleList 实例里面，每一条规则（CSSRule 实例）可以通过`rules.item(index)`或者`rules[index]`拿到。CSS 规则的条数通过`rules.length`拿到。还是用上面的例子。
    >
    > ```
    > crl[0] instanceof CSSRule // true
    > crl.length // 2
    > ```
    >
    > 注意，添加规则和删除规则不能在 CSSRuleList 实例操作，而要在它的父元素 StyleSheet 实例上，通过`StyleSheet.insertRule()`和`StyleSheet.deleteRule()`操作。
    >
    > ## CSSRule 接口
    >
    > ### 概述
    >
    > 一条 CSS 规则包括两个部分：CSS 选择器和样式声明。下面就是一条典型的 CSS 规则。
    >
    > ```
    > .myClass {
    >   color: red;
    >   background-color: yellow;
    > }
    > ```
    >
    > JS 通过 CSSRule 接口操作 CSS 规则。一般通过 CSSRuleList 接口（`StyleSheet.cssRules`）获取 CSSRule 实例。
    >
    > ```
    > // HTML 代码如下
    > // <style id="myStyle">
    > //   .myClass {
    > //     color: red;
    > //     background-color: yellow;
    > //   }
    > // </style>
    > var myStyleSheet = document.getElementById('myStyle').sheet;
    > var ruleList = myStyleSheet.cssRules;
    > var rule = ruleList[0];
    > rule instanceof CSSRule // true
    > ```
    >
    > ### CSSRule 实例的属性
    >
    > **（1）CSSRule.cssText**
    >
    > `CSSRule.cssText`属性返回当前规则的文本，还是使用上面的例子。
    >
    > ```
    > rule.cssText
    > // ".myClass { color: red; background-color: yellow; }"
    > ```
    >
    > 如果规则是加载（`@import`）其他样式表，`cssText`属性返回`@import 'url'`。
    >
    > **（2）CSSRule.parentStyleSheet**
    >
    > `CSSRule.parentStyleSheet`属性返回当前规则所在的样式表对象（StyleSheet 实例），还是使用上面的例子。
    >
    > ```
    > rule.parentStyleSheet === myStyleSheet // true
    > ```
    >
    > **（3）CSSRule.parentRule**
    >
    > `CSSRule.parentRule`属性返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回`null`。
    >
    > 父规则最常见的情况是，当前规则包含在`@media`规则代码块之中。
    >
    > ```
    > // HTML 代码如下
    > // <style id="myStyle">
    > //   @supports (display: flex) {
    > //     @media screen and (min-width: 900px) {
    > //       article {
    > //         display: flex;
    > //       }
    > //     }
    > //  }
    > // </style>
    > var myStyleSheet = document.getElementById('myStyle').sheet;
    > var ruleList = myStyleSheet.cssRules;
    > 
    > var rule0 = ruleList[0];
    > rule0.cssText
    > // "@supports (display: flex) {
    > //    @media screen and (min-width: 900px) {
    > //      article { display: flex; }
    > //    }
    > // }"
    > 
    > // 由于这条规则内嵌其他规则，
    > // 所以它有 cssRules 属性，且该属性是 CSSRuleList 实例
    > rule0.cssRules instanceof CSSRuleList // true
    > 
    > var rule1 = rule0.cssRules[0];
    > rule1.cssText
    > // "@media screen and (min-width: 900px) {
    > //   article { display: flex; }
    > // }"
    > 
    > var rule2 = rule1.cssRules[0];
    > rule2.cssText
    > // "article { display: flex; }"
    > 
    > rule1.parentRule === rule0 // true
    > rule2.parentRule === rule1 // true
    > ```
    >
    > **（4）CSSRule.type**
    >
    > `CSSRule.type`属性返回一个整数值，表示当前规则的类型。
    >
    > 最常见的类型有以下几种。
    >
    > - 1：普通样式规则（CSSStyleRule 实例）
    > - 3：`@import`规则
    > - 4：`@media`规则（CSSMediaRule 实例）
    > - 5：`@font-face`规则
    >
    > ### CSSStyleRule 接口
    >
    > 如果一条 CSS 规则是普通的样式规则（不含特殊的 CSS 命令），那么除了 CSSRule 接口，它还部署了 CSSStyleRule 接口。
    >
    > CSSStyleRule 接口有以下两个属性。
    >
    > **（1）CSSStyleRule.selectorText**
    >
    > `CSSStyleRule.selectorText`属性返回当前规则的选择器。
    >
    > ```
    > var stylesheet = document.styleSheets[0];
    > stylesheet.cssRules[0].selectorText // ".myClass"
    > ```
    >
    > 注意，这个属性是可写的。
    >
    > **（2）CSSStyleRule.style**
    >
    > `CSSStyleRule.style`属性返回一个对象（CSSStyleDeclaration 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。
    >
    > ```
    > // HTML 代码为
    > // <style id="myStyle">
    > //   p { color: red; }
    > // </style>
    > var styleSheet = document.getElementById('myStyle').sheet;
    > styleSheet.cssRules[0].style instanceof CSSStyleDeclaration
    > // true
    > ```
    >
    > CSSStyleDeclaration 实例的`cssText`属性，可以返回所有样式声明，格式为字符串。
    >
    > ```
    > styleSheet.cssRules[0].style.cssText
    > // "color: red;"
    > styleSheet.cssRules[0].selectorText
    > // "p"
    > ```
    >
    > ### CSSMediaRule 接口
    >
    > 如果一条 CSS 规则是`@media`代码块，那么它除了 CSSRule 接口，还部署了 CSSMediaRule 接口。
    >
    > 该接口主要提供`media`属性和`conditionText`属性。前者返回代表`@media`规则的一个对象（MediaList 实例），后者返回`@media`规则的生效条件。
    >
    > ```
    > // HTML 代码如下
    > // <style id="myStyle">
    > //   @media screen and (min-width: 900px) {
    > //     article { display: flex; }
    > //   }
    > // </style>
    > var styleSheet = document.getElementById('myStyle').sheet;
    > styleSheet.cssRules[0] instanceof CSSMediaRule
    > // true
    > 
    > styleSheet.cssRules[0].media
    > //  {
    > //    0: "screen and (min-width: 900px)",
    > //    appendMedium: function,
    > //    deleteMedium: function,
    > //    item: function,
    > //    length: 1,
    > //    mediaText: "screen and (min-width: 900px)"
    > // }
    > 
    > styleSheet.cssRules[0].conditionText
    > // "screen and (min-width: 900px)"
    > ```
    >
    > ## window.matchMedia()
    >
    > ### 基本用法
    >
    > `window.matchMedia()`方法用来将 CSS 的[`Media Query`](https://developer.mozilla.org/en-US/docs/DOM/Using_media_queries_from_code)条件语句，转换成一个 MediaQueryList 实例。
    >
    > ```
    > var mdl = window.matchMedia('(min-width: 400px)');
    > mdl instanceof MediaQueryList // true
    > ```
    >
    > 上面代码中，变量`mdl`就是 mediaQueryList 的实例。
    >
    > 注意，如果参数不是有效的`MediaQuery`条件语句，`window.matchMedia`不会报错，依然返回一个 MediaQueryList 实例。
    >
    > ```
    > window.matchMedia('bad string') instanceof MediaQueryList // true
    > ```
    >
    > ### MediaQueryList 接口的实例属性
    >
    > MediaQueryList 实例有三个属性。
    >
    > **（1）MediaQueryList.media**
    >
    > `MediaQueryList.media`属性返回一个字符串，表示对应的 MediaQuery 条件语句。
    >
    > ```
    > var mql = window.matchMedia('(min-width: 400px)');
    > mql.media // "(min-width: 400px)"
    > ```
    >
    > **（2）MediaQueryList.matches**
    >
    > `MediaQueryList.matches`属性返回一个布尔值，表示当前页面是否符合指定的 MediaQuery 条件语句。
    >
    > ```
    > if (window.matchMedia('(min-width: 400px)').matches) {
    >   /* 当前视口不小于 400 像素 */
    > } else {
    >   /* 当前视口小于 400 像素 */
    > }
    > ```
    >
    > 下面的例子根据`mediaQuery`是否匹配当前环境，加载相应的 CSS 样式表。
    >
    > ```
    > var result = window.matchMedia("(max-width: 700px)");
    > 
    > if (result.matches){
    >   var linkElm = document.createElement('link');
    >   linkElm.setAttribute('rel', 'stylesheet');
    >   linkElm.setAttribute('type', 'text/css');
    >   linkElm.setAttribute('href', 'small.css');
    > 
    >   document.head.appendChild(linkElm);
    > }
    > ```
    >
    > **（3）MediaQueryList.onchange**
    >
    > 如果 MediaQuery 条件语句的适配环境发生变化，会触发`change`事件。`MediaQueryList.onchange`属性用来指定`change`事件的监听函数。该函数的参数是`change`事件对象（MediaQueryListEvent 实例），该对象与 MediaQueryList 实例类似，也有`media`和`matches`属性。
    >
    > ```
    > var mql = window.matchMedia('(max-width: 600px)');
    > 
    > mql.onchange = function(e) {
    >   if (e.matches) {
    >     /* 视口不超过 600 像素 */
    >   } else {
    >     /* 视口超过 600 像素 */
    >   }
    > }
    > ```
    >
    > 上面代码中，`change`事件发生后，存在两种可能。一种是显示宽度从600像素以上变为以下，另一种是从600像素以下变为以上，所以在监听函数内部要判断一下当前是哪一种情况。
    >
    > ### MediaQueryList 接口的实例方法
    >
    > MediaQueryList 实例有两个方法`MediaQueryList.addListener()`和`MediaQueryList.removeListener()`，用来为`change`事件添加或撤销监听函数。
    >
    > ```
    > var mql = window.matchMedia('(max-width: 600px)');
    > 
    > // 指定监听函数
    > mql.addListener(mqCallback);
    > 
    > // 撤销监听函数
    > mql.removeListener(mqCallback);
    > 
    > function mqCallback(e) {
    >   if (e.matches) {
    >     /* 视口不超过 600 像素 */
    >   } else {
    >     /* 视口超过 600 像素 */
    >   }
    > }
    > ```
    >
    > 注意，`MediaQueryList.removeListener()`方法不能撤销`MediaQueryList.onchange`属性指定的监听函数。

  - Mutation Observer API

    > ## 概述
    >
    > Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。
    >
    > 概念上，它很接近事件，可以理解为 DOM 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。
    >
    > 这样设计是为了应付 DOM 变动频繁的特点。举例来说，如果文档中连续插入1000个`<p>`元素，就会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在1000个段落都插入结束后才会触发，而且只触发一次。
    >
    > Mutation Observer 有以下特点。
    >
    > - 它等待所有脚本任务完成后，才会运行（即异步触发方式）。
    > - 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。
    > - 它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。
    >
    > ## MutationObserver 构造函数
    >
    > 使用时，首先使用`MutationObserver`构造函数，新建一个观察器实例，同时指定这个实例的回调函数。
    >
    > ```
    > var observer = new MutationObserver(callback);
    > ```
    >
    > 上面代码中的回调函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子。
    >
    > ```
    > var observer = new MutationObserver(function (mutations, observer) {
    >   mutations.forEach(function(mutation) {
    >     console.log(mutation);
    >   });
    > });
    > ```
    >
    > ## MutationObserver 的实例方法
    >
    > ### observe()
    >
    > `observe()`方法用来启动监听，它接受两个参数。
    >
    > - 第一个参数：所要观察的 DOM 节点
    > - 第二个参数：一个配置对象，指定所要观察的特定变动
    >
    > ```
    > var article = document.querySelector('article');
    > 
    > var options = {
    >   'childList': true,
    >   'attributes':true
    > } ;
    > 
    > observer.observe(article, options);
    > ```
    >
    > 上面代码中，`observe()`方法接受两个参数，第一个是所要观察的DOM元素是`article`，第二个是所要观察的变动类型（子节点变动和属性变动）。
    >
    > 观察器所能观察的 DOM 变动类型（即上面代码的`options`对象），有以下几种。
    >
    > - **childList**：子节点的变动（指新增，删除或者更改）。
    > - **attributes**：属性的变动。
    > - **characterData**：节点内容或节点文本的变动。
    >
    > 想要观察哪一种变动类型，就在`option`对象中指定它的值为`true`。需要注意的是，至少必须同时指定这三种观察的一种，若均未指定将报错。
    >
    > 除了变动类型，`options`对象还可以设定以下属性：
    >
    > - `subtree`：布尔值，表示是否将该观察器应用于该节点的所有后代节点。
    > - `attributeOldValue`：布尔值，表示观察`attributes`变动时，是否需要记录变动前的属性值。
    > - `characterDataOldValue`：布尔值，表示观察`characterData`变动时，是否需要记录变动前的值。
    > - `attributeFilter`：数组，表示需要观察的特定属性（比如`['class','src']`）。
    >
    > ```
    > // 开始监听文档根节点（即<html>标签）的变动
    > mutationObserver.observe(document.documentElement, {
    >   attributes: true,
    >   characterData: true,
    >   childList: true,
    >   subtree: true,
    >   attributeOldValue: true,
    >   characterDataOldValue: true
    > });
    > ```
    >
    > 对一个节点添加观察器，就像使用`addEventListener()`方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。如果指定不同的`options`对象，以后面添加的那个为准，类似覆盖。
    >
    > 下面的例子是观察新增的子节点。
    >
    > ```
    > var insertedNodes = [];
    > var observer = new MutationObserver(function(mutations) {
    >   mutations.forEach(function(mutation) {
    >     for (var i = 0; i < mutation.addedNodes.length; i++) {
    >       insertedNodes.push(mutation.addedNodes[i]);
    >     }
    >   });
    >   console.log(insertedNodes);
    > });
    > observer.observe(document, { childList: true, subtree: true });
    > ```
    >
    > ### disconnect()，takeRecords()
    >
    > `disconnect()`方法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。
    >
    > ```
    > observer.disconnect();
    > ```
    >
    > `takeRecords()`方法用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。
    >
    > ```
    > observer.takeRecords();
    > ```
    >
    > 下面是一个例子。
    >
    > ```
    > // 保存所有没有被观察器处理的变动
    > var changes = mutationObserver.takeRecords();
    > 
    > // 停止观察
    > mutationObserver.disconnect();
    > ```
    >
    > ## MutationRecord 对象
    >
    > DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个`MutationRecord`实例所组成的数组。
    >
    > `MutationRecord`对象包含了DOM的相关信息，有如下属性：
    >
    > - `type`：观察的变动类型（`attributes`、`characterData`或者`childList`）。
    > - `target`：发生变动的DOM节点。
    > - `addedNodes`：新增的DOM节点。
    > - `removedNodes`：删除的DOM节点。
    > - `previousSibling`：前一个同级节点，如果没有则返回`null`。
    > - `nextSibling`：下一个同级节点，如果没有则返回`null`。
    > - `attributeName`：发生变动的属性。如果设置了`attributeFilter`，则只返回预先指定的属性。
    > - `oldValue`：变动前的值。这个属性只对`attribute`和`characterData`变动有效，如果发生`childList`变动，则返回`null`。
    >
    > ## 应用示例
    >
    > ### 子元素的变动
    >
    > 下面的例子说明如何读取变动记录。
    >
    > ```
    > var callback = function (records){
    >   records.map(function(record){
    >     console.log('Mutation type: ' + record.type);
    >     console.log('Mutation target: ' + record.target);
    >   });
    > };
    > 
    > var mo = new MutationObserver(callback);
    > 
    > var option = {
    >   'childList': true,
    >   'subtree': true
    > };
    > 
    > mo.observe(document.body, option);
    > ```
    >
    > 上面代码的观察器，观察`<body>`的所有下级节点（`childList`表示观察子节点，`subtree`表示观察后代节点）的变动。回调函数会在控制台显示所有变动的类型和目标节点。
    >
    > ### 属性的变动
    >
    > 下面的例子说明如何追踪属性的变动。
    >
    > ```
    > var callback = function (records) {
    >   records.map(function (record) {
    >     console.log('Previous attribute value: ' + record.oldValue);
    >   });
    > };
    > 
    > var mo = new MutationObserver(callback);
    > 
    > var element = document.getElementById('#my_element');
    > 
    > var options = {
    >   'attributes': true,
    >   'attributeOldValue': true
    > }
    > 
    > mo.observe(element, options);
    > ```
    >
    > 上面代码先设定追踪属性变动（`'attributes': true`），然后设定记录变动前的值。实际发生变动时，会将变动前的值显示在控制台。
    >
    > ### 取代 DOMContentLoaded 事件
    >
    > 网页加载的时候，DOM 节点的生成会产生变动记录，因此只要观察 DOM 的变动，就能在第一时间触发相关事件，也就没有必要使用`DOMContentLoaded`事件。
    >
    > ```
    > var observer = new MutationObserver(callback);
    > observer.observe(document.documentElement, {
    >   childList: true,
    >   subtree: true
    > });
    > ```
    >
    > 上面代码中，监听`document.documentElement`（即网页的`<html>`HTML 节点）的子节点的变动，`subtree`属性指定监听还包括后代节点。因此，任意一个网页元素一旦生成，就能立刻被监听到。
    >
    > 下面的代码，使用`MutationObserver`对象封装一个监听 DOM 生成的函数。
    >
    > ```js
    > (function(win){
    >   'use strict';
    > 
    >   var listeners = [];
    >   var doc = win.document;
    >   var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
    >   var observer;
    > 
    >   function ready(selector, fn){
    >     // 储存选择器和回调函数
    >     listeners.push({
    >       selector: selector,
    >       fn: fn
    >     });
    >     if(!observer){
    >       // 监听document变化
    >       observer = new MutationObserver(check);
    >       observer.observe(doc.documentElement, {
    >         childList: true,
    >         subtree: true
    >       });
    >     }
    >     // 检查该节点是否已经在DOM中
    >     check();
    >   }
    > 
    >   function check(){
    >   // 检查是否匹配已储存的节点
    >     for(var i = 0; i < listeners.length; i++){
    >       var listener = listeners[i];
    >       // 检查指定节点是否有匹配
    >       var elements = doc.querySelectorAll(listener.selector);
    >       for(var j = 0; j < elements.length; j++){
    >         var element = elements[j];
    >         // 确保回调函数只会对该元素调用一次
    >         if(!element.ready){
    >           element.ready = true;
    >           // 对该节点调用回调函数
    >           listener.fn.call(element, element);
    >         }
    >       }
    >     }
    >   }
    > 
    >   // 对外暴露ready
    >   win.ready = ready;
    > 
    > })(this);
    > 
    > // 使用方法
    > ready('.foo', function(element){
    >   // ...
    > });
    > ```

