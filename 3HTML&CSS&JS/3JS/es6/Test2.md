- ## 字符串的扩展

  > JS 允许采用`\uxxxx`形式表示一个字符，其中`xxxx`表示字符的 Unicode 码点。但是，这种表示法只限于码点在`\u0000`~`\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的UTF-16代理对形式。
  >
  > ```js
  > "\uD842\uDFB7"
  > // "𠮷"
  > "\u20BB7"
  > // " 7"
  > ```
  >
  > 上面代码表示，如果直接在`\u`后面跟上超过`0xFFFF`的数值（比如`\u20BB7`），JS 会理解成`\u20BB+7`。由于`\u20BB`是一个不可打印字符，所以只会显示一个空格，后面跟着一个`7`。
  >
  > ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符：
  >
  > ```js
  > "\u{20BB7}"
  > // "𠮷"
  > 
  > "\u{41}\u{42}\u{43}"
  > // "ABC"
  > 
  > let hello = 123;
  > hell\u{6F} // 123
  > 
  > '\u{1F680}' === '\uD83D\uDE80'
  > // true
  > ```
  >
  > 上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。
  >
  > 有了这种表示法之后，JS 共有 6 种方法可以表示一个字符。
  >
  > ```js
  > '\z' === 'z'  // true
  > '\172' === 'z' // true
  > '\x7A' === 'z' // true
  > '\u007A' === 'z' // true
  > '\u{7A}' === 'z' // true
  > ```

  ###### 字符串的遍历器接口：

  > ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被`for...of`循环遍历。
  >
  > 除了遍历字符串，这个遍历器最大的优点是可以识别大于`0xFFFF`的码点，传统的`for`循环无法识别这样的码点。

  ###### 直接输入 U+2028 和 U+2029：(TODO)

  > JS 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式`\u4e2d`，两者是等价的。
  >
  > ```js
  > '中' === '\u4e2d' // true
  > ```
  >
  > 但是，JS 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
  >
  > - U+005C：反斜杠（reverse solidus)
  > - U+000D：回车（carriage return）
  > - U+2028：行分隔符（line separator）
  > - U+2029：段分隔符（paragraph separator）
  > - U+000A：换行符（line feed）
  >
  > 举例来说，字符串里面不能直接包含反斜杠，一定要转义写成`\\`或者`\u005c`。
  >
  > 这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被`JSON.parse`解析，就有可能直接报错。
  >
  > ```js
  > const json = '"\u2028"';
  > JSON.parse(json); // 可能报错
  > ```
  >
  > JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JS 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
  >
  > ```js
  > const PS = eval("'\u2029'");
  > ```
  >
  > 根据这个提案，上面的代码不会报错。
  >
  > 注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。

  ###### `JSON.stringify()` 的改造：(TODO)

  > 根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的`JSON.stringify()`方法有可能返回不符合 UTF-8 标准的字符串。
  >
  > 具体来说，UTF-8 标准规定，`0xD800`到`0xDFFF`之间的码点，不能单独使用，必须配对使用。比如，`\uD834\uDF06`是两个码点，但是必须放在一起配对使用，代表字符`𝌆`。这是为了表示码点大于`0xFFFF`的字符的一种变通方法。单独使用`\uD834`和`\uDF06`这两个码点是不合法的，或者颠倒顺序也不行，因为`\uDF06\uD834`并没有对应的字符。
  >
  > `JSON.stringify()`的问题在于，它可能返回`0xD800`到`0xDFFF`之间的单个码点。
  >
  > ```js
  > JSON.stringify('\u{D834}') // "\u{D834}"
  > ```
  >
  > 为了确保返回的是合法的 UTF-8 字符，ES2019 改变了`JSON.stringify()`的行为。如果遇到`0xD800`到`0xDFFF`之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
  >
  > ```js
  > JSON.stringify('\u{D834}') // ""\\uD834""
  > JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
  > ```
  >

  ###### 模板字符串：

  > 传统的 JS 语言，输出模板通常是这样写的（下面使用了 jQuery 的方法）。
  >
  > ```js
  > $('#result').append(
  >   'There are <b>' + basket.count + '</b> ' +
  >   'items in your basket, ' +
  >   '<em>' + basket.onSale +
  >   '</em> are on sale!'
  > );
  > ```
  >
  > 上面这种写法相当繁琐不方便，ES6 引入了模板字符串解决这个问题。
  >
  > ```js
  > $('#result').append(`
  >   There are <b>${basket.count}</b> items
  >    in your basket, <em>${basket.onSale}</em>
  >   are on sale!
  > `);
  > ```
  >
  > 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
  >
  > ```js
  > // 普通字符串
  > `In JS '\n' is a line-feed.`
  > 
  > // 多行字符串
  > `In JS this is
  >  not legal.`
  > 
  > console.log(`string text line 1
  > string text line 2`);
  > 
  > // 字符串中嵌入变量
  > let name = "Bob", time = "today";
  > `Hello ${name}, how are you ${time}?`
  > ```
  >
  > 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的`toString`方法。
  >
  > 模板字符串甚至还能嵌套。
  >
  > ```js
  > const tmpl = addrs => `
  >   <table>
  >   ${addrs.map(addr => `
  >     <tr><td>${addr.first}</td></tr>
  >     <tr><td>${addr.last}</td></tr>
  >   `).join('')}
  >   </table>
  > `;
  > ```
  >

  ###### 标签模板：

  > 模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
  >
  > ```js
  >alert`hello`
  > // 等同于
  > alert(['hello'])
  > ```
  >   
  >    标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
  >   
  > 但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
  > 
  > ```js
  >let a = 5;
  > let b = 10;
  >
  > tag`Hello ${ a + b } world ${ a * b }`;
  >// 等同于
  > tag(['Hello ', ' world ', ''], 15, 50);
  >```
  > 
  > 上面代码中，模板字符串前面有一个标识名`tag`，它是一个函数。整个表达式的返回值，就是`tag`函数处理模板字符串后的返回值。
  > 
  >   函数`tag`依次会接收到多个参数。
  >   
  >   ```js
  > function tag(stringArr, value1, value2){
  > // ...
  > }
  >
  > // 等同于
  >
  > function tag(stringArr, ...values){
  > // ...
  > }
  > ```
  > 
  >   `tag`函数的第一个参数是一个伪数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。
  >   
  > `tag`函数的其他参数，都是模板字符串各个变量被替换后的值。由于本例中，模板字符串含有两个变量，因此`tag`会接受到`value1`和`value2`两个参数。
  > 
  > `tag`函数所有参数的实际值如下。
  >
  > - 第一个参数：`['Hello ', ' world ', '']`
  >- 第二个参数: 15
  > - 第三个参数：50
  > 
  > 也就是说，`tag`函数实际上以下面的形式调用。
  >   
  > ```js
  >   tag(['Hello ', ' world ', ''], 15, 50)
  > ```
  >   
  > 我们可以按照需要编写`tag`函数的代码。下面是`tag`函数的一种写法，以及运行结果。
  >   
  > ```js
  >   let a = 5;
  > let b = 10;
  > 
  > function tag(s, v1, v2) {
  >   console.log(s[0]);
  >  console.log(s[1]);
  >   console.log(s[2]);
  >  console.log(v1);
  >   console.log(v2);
  > 
  >     return "OK";
  >   }
  > 
  >   tag`Hello ${ a + b } world ${ a * b}`;
  >    // "Hello "
  >    // " world "
  > // ""
  >   // 15
  > // 50
  >   // "OK"
  > ```
  >    
  > “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
  >    
  >    ```js
  >    let message =
  >   SaferHTML`<p>${sender} has sent you a message.</p>`;
  >    
  > function SaferHTML(templateData) {
  >      let s = templateData[0];
  >     for (let i = 1; i < arguments.length; i++) {
  >     let arg = String(arguments[i]);
  >   
  >     // Escape special characters in the substitution.
  >     s += arg.replace(/&/g, "&amp;")
  >            .replace(/</g, "&lt;")
  >             .replace(/>/g, "&gt;");
  >
  >     // Don't escape special characters in the template.
  >     s += templateData[i];
  >   }
  >   return s;
  > }
  >    ```
  > 
  > 上面代码中，`sender`变量往往是用户提供的，经过`SaferHTML`函数处理，里面的特殊字符都会被转义。
  > 
  >```js
  > let sender = '<script>alert("abc")</script>'; // 恶意代码
  >let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
  > 
  >message
  > // <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
  > ```
  > 
  > 标签模板的另一个应用，就是多语言转换（国际化处理）。
  > 
  >```js
  > i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
  >// "欢迎访问xxx，您是第xxxx位访问者！"
  > ```
  >
  > 模板字符串本身并不能取代 `Mustache` 之类的模板库，因为没有条件判断和循环处理功能，但是通过**标签函数**，你可以自己添加这些功能。
  > 
  > ```js
  > // 下面的hashTemplate函数
  > // 是一个自定义的模板处理函数
  > let libraryHtml = hashTemplate`
  >   <ul>
  >     #for book in ${myBooks}
  >      <li><i>#{book.title}</i> by #{book.author}</li>
  >     #end
  >  </ul>
  > `;
  >```
  > 
  > 除此之外，你甚至可以使用标签模板，在 JS 语言之中嵌入其他语言。
  >   
  > ```js
  > jsx`
  >   <div>
  >     <input
  >       ref='input'
  >         onChange='${this.handleChange}'
  >       defaultValue='${this.state.value}' />
  >       ${this.state.value}
  >   </div>
  > `
  >```
  > 
  >上面的代码通过`jsx`函数，将一个 DOM 字符串转为 React 对象。你可以在 GitHub 找到`jsx`函数的[具体实现](https://gist.github.com/lygaret/a68220defa69174bdec5)。
  > 
  >下面则是一个假想的例子，通过`java`函数，在 JS 代码之中运行 Java 代码。
  > 
  > ```js
  > java`
  >class HelloWorldApp {
  >   public static void main(String[] args) {
  >    System.out.println("Hello World!"); // Display the string.
  >   }
  > }
  > `
  >HelloWorldApp.main();
  > ```
  >
  > 模板处理函数的第一个参数（模板字符串伪数组），还有一个`raw`属性。
  > 
  > ```js
  > console.log`123`
  > // ["123", raw: Array[1]]
  > ```
  > 
  > 上面代码中，`console.log`接受的参数，实际上是一个伪数组。该数组有一个`raw`属性，保存的是转义后的原字符串。
  > 
  > 请看下面的例子。
  > 
  > ```js
  > tag`First line\nSecond line`
  > 
  > function tag(strings) {
  >   console.log(strings.raw[0]);
  >   // strings.raw[0] 为 "First line\\nSecond line"
  >   // 打印输出 "First line\nSecond line"
  > }
  > ```
  > 
  > 上面代码中，`tag`函数的第一个参数`strings`，有一个`raw`属性，也指向一个数组。该数组的成员与`strings`数组完全一致。比如，`strings`数组是`["First line\nSecond line"]`，那么`strings.raw`数组就是`["First line\\nSecond line"]`。两者唯一的区别，就是字符串里面的斜杠都被转义了。比如，`strings.raw` 数组会将`\n`视为`\\`和`n`两个字符，而不是换行符。这是为了方便取得转义之前的原始模板而设计的。
  
  ###### 模板字符串的限制：
  
  > 前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。
  >
  > 举例来说，标签模板里面可以嵌入 LaTEX 语言。
  >
  > ```js
  > function latex(strings) {
  >   // ...
  >   }
  >    
  >   let document = latex`
  > \newcommand{\fun}{\textbf{Fun!}}  // 正常工作
  > \newcommand{\unicode}{\textbf{Unicode!}} // 报错
  > \newcommand{\xerxes}{\textbf{King!}} // 报错
  >
  > Breve over the h goes \u{h}ere // 报错
  >`
  > ```
  >
  > 上面代码中，变量`document`内嵌的模板字符串，对于 LaTEX 语言来说完全是合法的，但是 JS 引擎会报错。原因就在于字符串的转义。
  >
  > 模板字符串会将`\u00FF`和`\u{42}`当作 Unicode 字符进行转义，所以`\unicode`解析时报错；而`\x56`会被当作十六进制字符串转义，所以`\xerxes`会报错。也就是说，`\u`和`\x`在 LaTEX 里面有特殊含义，但是 JS 将它们转义了。
  > 
  > 为了解决这个问题，ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回`undefined`，而不是报错，并且从`raw`属性上面可以得到原始字符串。
  >   
  >   ```js
  >   function tag(strs) {
  >   strs[0] === undefined
  >   strs.raw[0] === "\\unicode and \\u{55}";
  > }
  >tag`\unicode and \u{55}`
  > ```
  >
  > 上面代码中，模板字符串原本是应该报错的，但是由于放松了对字符串转义的限制，所以不报错了，JS 引擎将第一个字符设置为`undefined`，但是`raw`属性依然可以得到原始字符串，因此`tag`函数还是可以对原字符串进行处理。
  > 
  > 注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。
  > 
  > ```js
  >   let bad = `bad escape sequence: \unicode`; // 报错
  >   ```
  
- ## 正则的扩展

  ###### `RegExp` 构造函数：

  > 

  

  > 在 ES5 中，`RegExp`构造函数的参数有两种情况。
  >
  > 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
  >
  > ```js
  > var regex = new RegExp('xyz', 'i');
  > // 等价于
  > var regex = /xyz/i;
  > ```
  >
  > 第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
  >
  > ```js
  > var regex = new RegExp(/xyz/i);
  > // 等价于
  > var regex = /xyz/i;
  > ```
  >
  > 但是，ES5 不允许此时使用第二个参数添加修饰符，否则会报错。
  >
  > ```js
  > var regex = new RegExp(/xyz/, 'i');
  > // Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
  > ```
  >
  > ES6 改变了这种行为。如果`RegExp`构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
  >
  > ```js
  > new RegExp(/abc/ig, 'i').flags
  > // "i"
  > ```
  >
  > 上面代码中，原有正则对象的修饰符是`ig`，它会被第二个参数`i`覆盖。

  ###### 字符串的正则方法：

  > ES6 出现之前，字符串对象共有 4 个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`。
  >
  > ES6 将这 4 个方法，在语言内部全部调用`RegExp`的实例方法，从而做到所有与正则相关的方法，全都定义在`RegExp`对象上。
  >
  > - `String.prototype.match` 调用 `RegExp.prototype[Symbol.match]`
  > - `String.prototype.replace` 调用 `RegExp.prototype[Symbol.replace]`
  > - `String.prototype.search` 调用 `RegExp.prototype[Symbol.search]`
  > - `String.prototype.split` 调用 `RegExp.prototype[Symbol.split]`

  ###### u 修饰符：

  > ES6 对正则表达式添加了`u`修饰符，含义为“Unicode 模式”，用来正确处理大于`\uFFFF`的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码：
  >
  > ```js
  > /^\uD83D/u.test('\uD83D\uDC2A') // false
  > /^\uD83D/.test('\uD83D\uDC2A') // true
  > ```
  >
  > 上面代码中，`\uD83D\uDC2A`是一个四个字节的 UTF-16 编码，代表一个字符。但是，ES5 不支持四个字节的 UTF-16 编码，会将其识别为两个字符，导致第二行代码结果为`true`。加了`u`修饰符以后，ES6 就会识别其为一个字符，所以第一行代码结果为`false`。
  >
  > 一旦加上`u`修饰符号，就会修改下面这些正则表达式的行为：
  >
  > 1. 点字符：点（`.`）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于`0xFFFF`的 Unicode 字符，点字符不能识别，必须加上`u`修饰符。
  >
  >    ```js
  >    var s = '𠮷';
  >    
  >    /^.$/.test(s) // false
  >    /^.$/u.test(s) // true
  >    ```
  >
  >    > 上面代码表示，如果不添加`u`修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。
  >
  > 2. Unicode 字符表示法：ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上`u`修饰符，才能识别当中的大括号，否则会被解读为正则中的量词。
  >
  >    ```js
  >    /\u{61}/.test('a') // false
  >    /\u{61}/u.test('a') // true
  >    /\u{20BB7}/u.test('𠮷') // true
  >    ```
  >
  >    > 上面代码表示，如果不加`u`修饰符，正则表达式无法识别`\u{61}`这种表示法，只会认为这匹配 61 个连续的`u`。
  >
  > 3. 量词：使用`u`修饰符后，所有量词都会正确识别码点大于`0xFFFF`的 Unicode 字符。
  >
  >    ```js
  >    /a{2}/.test('aa') // true
  >    /a{2}/u.test('aa') // true
  >    /𠮷{2}/.test('𠮷𠮷') // false
  >    /𠮷{2}/u.test('𠮷𠮷') // true
  >    ```
  >
  > 4. 预定义模式：`u`修饰符也影响到预定义模式，能否正确识别码点大于`0xFFFF`的 Unicode 字符。
  >
  >    ```js
  >    /^\S$/.test('𠮷') // false
  >    /^\S$/u.test('𠮷') // true
  >    ```
  >
  >    > 上面代码的`\S`是预定义模式，匹配所有非空白字符。只有加了`u`修饰符，它才能正确匹配码点大于`0xFFFF`的 Unicode 字符。利用这一点，可以写出一个正确返回字符串长度的函数。
  >    >
  >    > ```js
  >    > function codePointLength(text) {
  >    >   var result = text.match(/[\s\S]/gu);
  >    >   return result ? result.length : 0;
  >    > }
  >    > 
  >    > var s = '𠮷𠮷';
  >    > 
  >    > s.length // 4
  >    > codePointLength(s) // 2
  >    > ```
  >
  > 5. i 修饰符：有些 Unicode 字符的编码不同，但是字型很相近，比如，`\u004B`与`\u212A`都是大写的`K`。
  >
  >    ```js
  >    /[a-z]/i.test('\u212A') // false
  >    /[a-z]/iu.test('\u212A') // true
  >    ```
  >
  >    > 上面代码中，不加`u`修饰符，就无法识别非规范的`K`字符。
  >
  > 6. 转义：没有`u`修饰符的情况下，正则中没有定义的转义（如逗号的转义`\,`）无效，而在`u`模式会报错。
  >
  >    ```js
  >    /\,/ // /\,/
  >    /\,/u // 报错
  >    ```
  >
  >    > 上面代码中，没有`u`修饰符时，逗号前面的反斜杠是无效的，加了`u`修饰符就报错。
  >
  > `RegExp.prototype.unicode`：正则实例对象新增`unicode`属性，表示是否设置了`u`修饰符（只读）。

  ###### y 修饰符：

  > 除了`u`修饰符，ES6 还为正则表达式添加了`y`修饰符，叫做“粘连”（sticky）修饰符。
  >
  > `y`修饰符的作用与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，`g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
  >
  > ```js
  > var s = 'aaa_aa_a';
  > var r1 = /a+/g;
  > var r2 = /a+/y;
  > 
  > r1.exec(s) // ["aaa"]
  > r2.exec(s) // ["aaa"]
  > 
  > r1.exec(s) // ["aa"]
  > r2.exec(s) // null
  > ```
  >
  > 上面代码有两个正则表达式，一个使用`g`修饰符，另一个使用`y`修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是`_aa_a`。由于`g`修饰没有位置要求，所以第二次执行会返回结果，而`y`修饰符要求匹配必须从头部开始，所以返回`null`。
  >
  > 使用`lastIndex`属性，可以更好地说明`y`修饰符。
  >
  > ```js
  > const REGEX = /a/g;
  > 
  > // 指定从2号位置（y）开始匹配
  > REGEX.lastIndex = 2;
  > 
  > // 匹配成功
  > const match = REGEX.exec('xaya');
  > 
  > // 在3号位置匹配成功
  > match.index // 3
  > 
  > // 下一次匹配从4号位开始
  > REGEX.lastIndex // 4
  > 
  > // 4号位开始匹配失败
  > REGEX.exec('xaya') // null
  > ```
  >
  > 上面代码中，`lastIndex`属性指定每次搜索的开始位置，`g`修饰符从这个位置开始向后搜索，直到发现匹配为止。
  >
  > `y`修饰符同样遵守`lastIndex`属性，但是要求必须在`lastIndex`指定的位置发现匹配。
  >
  > ```js
  > const REGEX = /a/y;
  > 
  > // 指定从2号位置开始匹配
  > REGEX.lastIndex = 2;
  > 
  > // 不是粘连，匹配失败
  > REGEX.exec('xaya') // null
  > 
  > // 指定从3号位置开始匹配
  > REGEX.lastIndex = 3;
  > 
  > // 3号位置是粘连，匹配成功
  > const match = REGEX.exec('xaya');
  > match.index // 3
  > REGEX.lastIndex // 4
  > ```
  >
  > 实际上，`y`修饰符号隐含了头部匹配的标志`^`。
  >
  > ```js
  > /b/y.exec('aba')
  > // null
  > ```
  >
  > 上面代码由于不能保证头部匹配，所以返回`null`。`y`修饰符的设计本意，就是让头部匹配的标志`^`在全局匹配中都有效。
  >
  > 下面是字符串对象的`replace`方法的例子。
  >
  > ```js
  > const REGEX = /a/gy;
  > 'aaxa'.replace(REGEX, '-') // '--xa'
  > ```
  >
  > 上面代码中，最后一个`a`因为不是出现在下一次匹配的头部，所以不会被替换。
  >
  > 单单一个`y`修饰符对`match`方法，只能返回第一个匹配，必须与`g`修饰符联用，才能返回所有匹配。
  >
  > ```js
  > 'a1a2a3'.match(/a\d/y) // ["a1"]
  > 'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]
  > ```
  >
  > `y`修饰符的一个应用，是从字符串提取 token（词元），`y`修饰符确保了匹配之间不会有漏掉的字符。
  >
  > ```js
  > const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
  > const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;
  > 
  > tokenize(TOKEN_Y, '3 + 4')
  > // [ '3', '+', '4' ]
  > tokenize(TOKEN_G, '3 + 4')
  > // [ '3', '+', '4' ]
  > 
  > function tokenize(TOKEN_REGEX, str) {
  >       let result = [];
  >       let match;
  >       while (match = TOKEN_REGEX.exec(str)) {
  >        	result.push(match[1]);
  >       }
  >       return result;
  > }
  > ```
  >
  > 上面代码中，如果字符串里面没有非法字符，`y`修饰符与`g`修饰符的提取结果是一样的。但是，一旦出现非法字符，两者的行为就不一样了。
  >
  > ```js
  > tokenize(TOKEN_Y, '3x + 4')
  > // [ '3' ]
  > tokenize(TOKEN_G, '3x + 4')
  > // [ '3', '+', '4' ]
  > ```
  >
  > 上面代码中，`g`修饰符会忽略非法字符，而`y`修饰符不会，这样就很容易发现错误。
  >
  > `RegExp.prototype.sticky` 属性：与`y`修饰符相匹配，ES6 的正则实例对象多了`sticky`属性，表示是否设置了`y`修饰符（只读）。

  ###### `RegExp.prototype.flags` 属性：ES6 为正则表达式新增了`flags`属性，会返回正则表达式的修饰符（只读）。

  > ## s 修饰符：dotAll 模式(TODO)
  > 
  > 正则表达式中，点（`.`）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用`u`修饰符解决；另一个是行终止符（line terminator character）。
  > 
  > 所谓行终止符，就是该字符表示一行的终结。以下四个字符属于“行终止符”。
  > 
  > - U+000A 换行符（`\n`）
  > - U+000D 回车符（`\r`）
  > - U+2028 行分隔符（line separator）
  > - U+2029 段分隔符（paragraph separator）
  > 
  >```
  > /foo.bar/.test('foo\nbar')
  >// false
  > ```
  >
  > 上面代码中，因为`.`不匹配`\n`，所以正则表达式返回`false`。
  >
  > 但是，很多时候我们希望匹配的是任意单个字符，这时有一种变通的写法。
  > 
  > ```
  > /foo[^]bar/.test('foo\nbar')
  >// true
  > ```
  > 
  > 这种解决方案毕竟不太符合直觉，ES2018 [引入](https://github.com/tc39/proposal-regexp-dotall-flag)`s`修饰符，使得`.`可以匹配任意单个字符。
  > 
  >```
  > /foo.bar/s.test('foo\nbar') // true
  >```
  > 
  >这被称为`dotAll`模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个`dotAll`属性，返回一个布尔值，表示该正则表达式是否处在`dotAll`模式。
  > 
  > ```
  > const re = /foo.bar/s;
  > // 另一种写法
  >// const re = new RegExp('foo.bar', 's');
  > 
  >re.test('foo\nbar') // true
  > re.dotAll // true
  > re.flags // 's'
  > ```
  >
  > `/s`修饰符和多行修饰符`/m`不冲突，两者一起使用的情况下，`.`匹配所有字符，而`^`和`$`匹配每一行的行首和行尾。
  >
  > ## 后行断言
  > 
  > JavaScript 语言的正则表达式，只支持先行断言（lookahead）和先行否定断言（negative lookahead），不支持后行断言（lookbehind）和后行否定断言（negative lookbehind）。ES2018 引入[后行断言](https://github.com/tc39/proposal-regexp-lookbehind)，V8 引擎 4.9 版（Chrome 62）已经支持。
  > 
  > “先行断言”指的是，`x`只有在`y`前面才匹配，必须写成`/x(?=y)/`。比如，只匹配百分号之前的数字，要写成`/\d+(?=%)/`。“先行否定断言”指的是，`x`只有不在`y`前面才匹配，必须写成`/x(?!y)/`。比如，只匹配不在百分号之前的数字，要写成`/\d+(?!%)/`。
  > 
  > ```
  > /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
  > /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
  >```
  > 
  >上面两个字符串，如果互换正则表达式，就不会得到相同结果。另外，还可以看到，“先行断言”括号之中的部分（`(?=%)`），是不计入返回结果的。
  > 
  >“后行断言”正好与“先行断言”相反，`x`只有在`y`后面才匹配，必须写成`/(?<=y)x/`。比如，只匹配美元符号之后的数字，要写成`/(?<=\$)\d+/`。“后行否定断言”则与“先行否定断言”相反，`x`只有不在`y`后面才匹配，必须写成`/(?<!y)x/`。比如，只匹配不在美元符号后面的数字，要写成`/(?<!\$)\d+/`。
  > 
  >```
  > /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
  >/(?<!\$)\d+/.exec('it’s worth about €90')                   // ["90"]
  > ```
  > 
  > 上面的例子中，“后行断言”的括号之中的部分（`(?<=\$)`），也是不计入返回结果。
  > 
  >下面的例子是使用后行断言进行字符串替换。
  > 
  >```
  > const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
  >'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
  > // '$bar %foo foo'
  > ```
  > 
  > 上面代码中，只有在美元符号后面的`foo`才会被替换。
  >
  > “后行断言”的实现，需要先匹配`/(?<=y)x/`的`x`，然后再回到左边，匹配`y`的部分。这种“先右后左”的执行顺序，与所有其他正则操作相反，导致了一些不符合预期的行为。
  >
  > 首先，后行断言的组匹配，与正常情况下结果是不一样的。
  >
  > ```
  > /(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
  > /^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]
  > ```
  > 
  >上面代码中，需要捕捉两个组匹配。没有“后行断言”时，第一个括号是贪婪模式，第二个括号只能捕获一个字符，所以结果是`105`和`3`。而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符，所以结果是`1`和`053`。
  > 
  >其次，“后行断言”的反斜杠引用，也与通常的顺序相反，必须放在对应的那个括号之前。
  > 
  >```
  > /(?<=(o)d\1)r/.exec('hodor')  // null
  >/(?<=\1d(o))r/.exec('hodor')  // ["r", "o"]
  > ```
  > 
  > 上面代码中，如果后行断言的反斜杠引用（`\1`）放在括号的后面，就不会得到匹配结果，必须放在前面才可以。因为后行断言是先从左到右扫描，发现匹配以后再回过头，从右到左完成反斜杠引用。
  > 
  >## Unicode 属性类
  > 
  >ES2018 [引入](https://github.com/tc39/proposal-regexp-unicode-property-escapes)了 Unicode 属性类，允许使用`\p{...}`和`\P{...}`（`\P`是`\p`的否定形式）代表一类 Unicode 字符，匹配满足条件的所有字符。
  > 
  >```
  > const regexGreekSymbol = /\p{Script=Greek}/u;
  > regexGreekSymbol.test('π') // true
  > ```
  > 
  >上面代码中，`\p{Script=Greek}`表示匹配一个希腊文字母，所以匹配`π`成功。
  > 
  >Unicode 属性类的标准形式，需要同时指定属性名和属性值。
  > 
  >```
  > \p{UnicodePropertyName=UnicodePropertyValue}
  >```
  > 
  > 但是，对于某些属性，可以只写属性名，或者只写属性值。
  > 
  > ```
  >\p{UnicodePropertyName}
  > \p{UnicodePropertyValue}
  >```
  > 
  >`\P{…}`是`\p{…}`的反向匹配，即匹配不满足条件的字符。
  > 
  > 注意，这两种类只对 Unicode 有效，所以使用的时候一定要加上`u`修饰符。如果不加`u`修饰符，正则表达式使用`\p`和`\P`会报错。
  > 
  >由于 Unicode 的各种属性非常多，所以这种新的类的表达能力非常强。
  > 
  >```
  > const regex = /^\p{Decimal_Number}+$/u;
  > regex.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼') // true
  > ```
  > 
  >上面代码中，属性类指定匹配所有十进制字符，可以看到各种字型的十进制字符都会匹配成功。
  > 
  >`\p{Number}`甚至能匹配罗马数字。
  > 
  >```
  > // 匹配所有数字
  >const regex = /^\p{Number}+$/u;
  > regex.test('²³¹¼½¾') // true
  > regex.test('㉛㉜㉝') // true
  > regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true
  > ```
  >
  > 下面是其他一些例子。
  >
  > ```
  >// 匹配所有空格
  > \p{White_Space}
  > 
  > // 匹配十六进制字符
  > \p{Hex_Digit}
  > 
  > // 匹配各种文字的所有字母，等同于 Unicode 版的 \w
  > [\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]
  >
  > // 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
  >[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]
  > 
  > // 匹配 Emoji
  > /\p{Extended_Pictographic}/u
  > 
  > // 匹配所有的箭头字符
  > const regexArrows = /^\p{Block=Arrows}+$/u;
  > regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
  > ```
  > 
  > ## v 修饰符：Unicode 属性类的运算
  > 
  > 有时，需要向某个 Unicode 属性类添加或减少字符，即需要对属性类进行运算。[ES2024](https://github.com/tc39/proposal-regexp-v-flag) 增加了 Unicode 属性类的运算功能。
  > 
  > 它提供两种形式的运算，一种是差集运算（A 集合减去 B 集合），另一种是交集运算。
  > 
  > ```
  > // 差集运算（A 减去 B）
  > [A--B]
  > 
  > // 交集运算（A 与 B 的交集）
  >[A&&B]
  > ```
  >
  > 上面两种写法中，A 和 B 要么是字符类（例如`[a-z]`），要么是 Unicode 属性类（例如`\p{ASCII}`）。
  >
  > 而且，这种运算支持方括号之中嵌入方括号，即方括号的嵌套。
  >
  > ```
  > // 方括号嵌套的例子
  > [A--[0-9]]
  > ```
  > 
  > 这种运算的前提是，正则表达式必须使用新引入的`v`修饰符。前面说过，Unicode 属性类必须搭配`u`修饰符使用，这个`v`修饰符等于代替`u`，使用了它就不必再写`u`了。
  > 
  >下面是一些例子。
  > 
  >```
  > // 十进制字符去除 ASCII 码的0到9
  >[\p{Decimal_Number}--[0-9]]
  > 
  > // Emoji 字符去除 ASCII 码字符
  > [\p{Emoji}--\p{ASCII}]
  > ```
  >
  > 看一个实际的例子，`0`属于十进制字符类。
  >
  > ```
  >/[\p{Decimal_Number}]/u.test('0') // true
  > ```
  > 
  > 上面示例中，字符类是 Unicode 专用的，所以必须使用`u`修饰符。
  > 
  > 如果把`0-9`从十进制字符类里面去掉，那么`0`就不属于这个类了。
  > 
  > ```
  >/[\p{Decimal_Number}--[0-9]]/v.test('0') // false
  > ```
  >
  > 上面示例中，`v`修饰符只能用于 Unicode，所以可以省略`u`修饰符。
  > 
  > ## 具名组匹配
  >
  > ### 简介
  >
  > 正则表达式使用圆括号进行组匹配。
  >
  > ```
  > const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
  > ```
  >
  > 上面代码中，正则表达式里面有三组圆括号。使用`exec`方法，就可以将这三组匹配结果提取出来。
  >
  > ```
  >const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
  > 
  >const matchObj = RE_DATE.exec('1999-12-31');
  > const year = matchObj[1]; // 1999
  >const month = matchObj[2]; // 12
  > const day = matchObj[3]; // 31
  > ```
  > 
  >组匹配的一个问题是，每一组的匹配含义不容易看出来，而且只能用数字序号（比如`matchObj[1]`）引用，要是组的顺序变了，引用的时候就必须修改序号。
  > 
  >ES2018 引入了[具名组匹配](https://github.com/tc39/proposal-regexp-named-groups)（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
  > 
  > ```
  > const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
  > 
  > const matchObj = RE_DATE.exec('1999-12-31');
  > const year = matchObj.groups.year; // "1999"
  > const month = matchObj.groups.month; // "12"
  > const day = matchObj.groups.day; // "31"
  >```
  > 
  >上面代码中，“具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（`?<year>`），然后就可以在`exec`方法返回结果的`groups`属性上引用该组名。同时，数字序号（`matchObj[1]`）依然有效。
  > 
  >具名组匹配等于为每一组匹配加上了 ID，便于描述匹配的目的。如果组的顺序变了，也不用改变匹配后的处理代码。
  > 
  > 如果具名组没有匹配，那么对应的`groups`对象属性会是`undefined`。
  > 
  > ```
  > const RE_OPT_A = /^(?<as>a+)?$/;
  > const matchObj = RE_OPT_A.exec('');
  > 
  > matchObj.groups.as // undefined
  >'as' in matchObj.groups // true
  > ```
  >
  > 上面代码中，具名组`as`没有找到匹配，那么`matchObj.groups.as`属性值就是`undefined`，并且`as`这个键名在`groups`是始终存在的。
  >
  > ### 解构赋值和替换
  >
  > 有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量赋值。
  > 
  > ```
  > let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
  > one  // foo
  > two  // bar
  > ```
  >
  > 字符串替换时，使用`$<组名>`引用具名组。
  >
  > ```
  >let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
  > 
  >'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
  > // '02/01/2015'
  > ```
  > 
  > 上面代码中，`replace`方法的第二个参数是一个字符串，而不是正则表达式。
  > 
  >`replace`方法的第二个参数也可以是函数，该函数的参数序列如下。
  > 
  >```
  > '2015-01-02'.replace(re, (
  >    matched, // 整个匹配结果 2015-01-02
  >    capture1, // 第一个组匹配 2015
  >    capture2, // 第二个组匹配 01
  >    capture3, // 第三个组匹配 02
  >    position, // 匹配开始的位置 0
  >   S, // 原字符串 2015-01-02
  >    groups // 具名组构成的一个对象 {year, month, day}
  > ) => {
  >  let {day, month, year} = groups;
  > return `${day}/${month}/${year}`;
  > });
  > ```
  > 
  > 具名组匹配在原来的基础上，新增了最后一个函数参数：具名组构成的一个对象。函数内部可以直接对这个对象进行解构赋值。
  > 
  > ### 引用
  > 
  > 如果要在正则表达式内部引用某个“具名组匹配”，可以使用`\k<组名>`的写法。
  > 
  > ```
  > const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
  > RE_TWICE.test('abc!abc') // true
  > RE_TWICE.test('abc!ab') // false
  > ```
  >
  > 数字引用（`\1`）依然有效。
  >
  > ```
  >const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
  > RE_TWICE.test('abc!abc') // true
  >RE_TWICE.test('abc!ab') // false
  > ```
  > 
  > 这两种引用语法还可以同时使用。
  > 
  > ```
  >const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
  > RE_TWICE.test('abc!abc!abc') // true
  >RE_TWICE.test('abc!abc!ab') // false
  > ```
  > 
  > ## d 修饰符：正则匹配索引
  > 
  > 组匹配的结果，在原始字符串里面的开始位置和结束位置，目前获取并不是很方便。正则实例的`exec()`方法有一个`index`属性，可以获取整个匹配结果的开始位置。但是，组匹配的每个组的开始位置，很难拿到。
  >
  > [ES2022](https://github.com/tc39/proposal-regexp-match-Indices) 新增了`d`修饰符，这个修饰符可以让`exec()`、`match()`的返回结果添加`indices`属性，在该属性上面可以拿到匹配的开始位置和结束位置。
  >
  > ```
  > const text = 'zabbcdef';
  > const re = /ab/d;
  > const result = re.exec(text);
  > 
  >result.index // 1
  > result.indices // [ [1, 3] ]
  >```
  > 
  >上面示例中，`exec()`方法的返回结果`result`，它的`index`属性是整个匹配结果（`ab`）的开始位置。由于正则表达式`re`有`d`修饰符，`result`现在就会多出一个`indices`属性。该属性是一个数组，它的每个成员还是一个数组，包含了匹配结果在原始字符串的开始位置和结束位置。由于上例的正则表达式`re`没有包含组匹配，所以`indices`数组只有一个成员，表示整个匹配的开始位置是`1`，结束位置是`3`。
  > 
  >注意，开始位置包含在匹配结果之中，相当于匹配结果的第一个字符的位置。但是，结束位置不包含在匹配结果之中，是匹配结果的下一个字符。比如，上例匹配结果的最后一个字符`b`的位置，是原始字符串的2号位，那么结束位置`3`就是下一个字符的位置。
  > 
  > 如果正则表达式包含组匹配，那么`indices`属性对应的数组就会包含多个成员，提供每个组匹配的开始位置和结束位置。
  > 
  > ```
  > const text = 'zabbcdef';
  > const re = /ab+(cd)/d;
  > const result = re.exec(text);
  > 
  >result.indices // [ [ 1, 6 ], [ 4, 6 ] ]
  > ```
  >
  > 上面例子中，正则表达式`re`包含一个组匹配`(cd)`，那么`indices`属性数组就有两个成员，第一个成员是整个匹配结果（`abbcd`）的开始位置和结束位置，第二个成员是组匹配（`cd`）的开始位置和结束位置。
  >
  > 下面是多个组匹配的例子。
  >
  > ```
  > const text = 'zabbcdef';
  > const re = /ab+(cd(ef))/d;
  > const result = re.exec(text);
  > 
  > result.indices // [ [1, 8], [4, 8], [6, 8] ]
  > ```
  >
  > 上面例子中，正则表达式`re`包含两个组匹配，所以`indices`属性数组就有三个成员。
  >
  > 如果正则表达式包含具名组匹配，`indices`属性数组还会有一个`groups`属性。该属性是一个对象，可以从该对象获取具名组匹配的开始位置和结束位置。
  >
  > ```
  > const text = 'zabbcdef';
  > const re = /ab+(?<Z>cd)/d;
  > const result = re.exec(text);
  > 
  > result.indices.groups // { Z: [ 4, 6 ] }
  > ```
  >
  > 上面例子中，`exec()`方法返回结果的`indices.groups`属性是一个对象，提供具名组匹配`Z`的开始位置和结束位置。
  >
  > 如果获取组匹配不成功，`indices`属性数组的对应成员则为`undefined`，`indices.groups`属性对象的对应成员也是`undefined`。
  >
  > ```
  > const text = 'zabbcdef';
  > const re = /ab+(?<Z>ce)?/d;
  > const result = re.exec(text);
  > 
  > result.indices[1] // undefined
  > result.indices.groups['Z'] // undefined
  >```
  > 
  >上面例子中，由于组匹配`ce`不成功，所以`indices`属性数组和`indices.groups`属性对象对应的组匹配成员`Z`都是`undefined`。
  > 
  >## String.prototype.matchAll()
  > 
  > 如果一个正则表达式在字符串里面有多个匹配，现在一般使用`g`修饰符或`y`修饰符，在循环里面逐一取出。
  > 
  > ```
  > var regex = /t(e)(st(\d?))/g;
  > var string = 'test1test2test3';
  > 
  > var matches = [];
  >var match;
  > while (match = regex.exec(string)) {
  >  matches.push(match);
  > }
  >
  > matches
  >// [
  > //   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
  > //   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
  > //   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
  > // ]
  > ```
  > 
  > 上面代码中，`while`循环取出每一轮的正则匹配，一共三轮。
  > 
  > ES2020 增加了`String.prototype.matchAll()`方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。
  > 
  > ```
  > const string = 'test1test2test3';
  > const regex = /t(e)(st(\d?))/g;
  > 
  > for (const match of string.matchAll(regex)) {
  >   console.log(match);
  > }
  >// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
  > // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
  >// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
  > ```
  >
  > 上面代码中，由于`string.matchAll(regex)`返回的是遍历器，所以可以用`for...of`循环取出。相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。
  > 
  > 遍历器转为数组是非常简单的，使用`...`运算符和`Array.from()`方法就可以了。
  > 
  > ```js
  > // 转为数组的方法一
  > [...string.matchAll(regex)]
  > 
  > // 转为数组的方法二
  > Array.from(string.matchAll(regex))
  > ```
  
- ## 数值的扩展（TODO）

  > ### 数值扩展：
  >
  > 1. `Number.EPSILON`是JS可以表示的最小精度，接近于2.22E-16次幂。常用于比较两个小数是否相等。
  >
  > 2. `Number.isNaN()`可以检测一个数值是否是NaN。
  >
  > 3. `Number.isFinite()`可以检测一个数是否是有限的。
  >
  > 4. `Number.parseInt()`/`Number.parseFloat()`可以将字符串转成数值。
  >
  > 5. `Number.isInteger()`判断一个数是否是整数。
  >
  > 6. ES6中又增加了2进制和8进制的字面量，如：
  >
  >    ```js
  >    let a = 0b1010
  >    let b = 0o777
  >    let c = 100
  >    let d = 0xff
  >    ```
  
  > ## 二进制和八进制表示法
  >
  > ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。
  >
  > ```
  > 0b111110111 === 503 // true
  > 0o767 === 503 // true
  > ```
  >
  > 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀`0`表示，ES6 进一步明确，要使用前缀`0o`表示。
  >
  > ```
  > // 非严格模式
  > (function(){
  > console.log(0o11 === 011);
  > })() // true
  > 
  > // 严格模式
  > (function(){
  > 'use strict';
  > console.log(0o11 === 011);
  > })() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
  > ```
  >
  > 如果要将`0b`和`0o`前缀的字符串数值转为十进制，要使用`Number`方法。
  >
  > ```
  > Number('0b111')  // 7
  > Number('0o10')  // 8
  > ```
  >
  > ## 数值分隔符
  >
  > 欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，`1000`可以写作`1,000`。
  >
  > [ES2021](https://github.com/tc39/proposal-numeric-separator)，允许 JavaScript 的数值使用下划线（`_`）作为分隔符。
  >
  > ```
  > let budget = 1_000_000_000_000;
  > budget === 10 ** 12 // true
  > ```
  >
  > 这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。
  >
  > ```
  > 123_00 === 12_300 // true
  > 
  > 12345_00 === 123_4500 // true
  > 12345_00 === 1_234_500 // true
  > ```
  >
  > 小数和科学计数法也可以使用数值分隔符。
  >
  > ```
  > // 小数
  > 0.000_001
  > 
  > // 科学计数法
  > 1e10_000
  > ```
  >
  > 数值分隔符有几个使用注意点。
  >
  > - 不能放在数值的最前面（leading）或最后面（trailing）。
  > - 不能两个或两个以上的分隔符连在一起。
  > - 小数点的前后不能有分隔符。
  > - 科学计数法里面，表示指数的`e`或`E`前后不能有分隔符。
  >
  > 下面的写法都会报错。
  >
  > ```
  > // 全部报错
  > 3_.141
  > 3._141
  > 1_e12
  > 1e_12
  > 123__456
  > _1464301
  > 1464301_
  > ```
  >
  > 除了十进制，其他进制的数值也可以使用分隔符。
  >
  > ```
  > // 二进制
  > 0b1010_0001_1000_0101
  > // 十六进制
  > 0xA0_B0_C0
  > ```
  >
  > 可以看到，数值分隔符可以按字节顺序分隔数值，这在操作二进制位时，非常有用。
  >
  > 注意，分隔符不能紧跟着进制的前缀`0b`、`0B`、`0o`、`0O`、`0x`、`0X`。
  >
  > ```
  > // 报错
  > 0_b111111000
  > 0b_111111000
  > ```
  >
  > 数值分隔符只是一种书写便利，对于 JavaScript 内部数值的存储和输出，并没有影响。
  >
  > ```
  > let num = 12_345;
  > 
  > num // 12345
  > num.toString() // 12345
  > ```
  >
  > 上面示例中，变量`num`的值为`12_345`，但是内部存储和输出的时候，都不会有数值分隔符。
  >
  > 下面三个将字符串转成数值的函数，不支持数值分隔符。主要原因是语言的设计者认为，数值分隔符主要是为了编码时书写数值的方便，而不是为了处理外部输入的数据。
  >
  > - Number()
  > - parseInt()
  > - parseFloat()
  >
  > ```
  > Number('123_456') // NaN
  > parseInt('123_456') // 123
  > ```
  >
  > ## Number.isFinite(), Number.isNaN()
  >
  > ES6 在`Number`对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法。
  >
  > `Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。
  >
  > ```
  > Number.isFinite(15); // true
  > Number.isFinite(0.8); // true
  > Number.isFinite(NaN); // false
  > Number.isFinite(Infinity); // false
  > Number.isFinite(-Infinity); // false
  > Number.isFinite('foo'); // false
  > Number.isFinite('15'); // false
  > Number.isFinite(true); // false
  > ```
  >
  > 注意，如果参数类型不是数值，`Number.isFinite`一律返回`false`。
  >
  > `Number.isNaN()`用来检查一个值是否为`NaN`。
  >
  > ```
  > Number.isNaN(NaN) // true
  > Number.isNaN(15) // false
  > Number.isNaN('15') // false
  > Number.isNaN(true) // false
  > Number.isNaN(9/NaN) // true
  > Number.isNaN('true' / 0) // true
  > Number.isNaN('true' / 'true') // true
  > ```
  >
  > 如果参数类型不是`NaN`，`Number.isNaN`一律返回`false`。
  >
  > 它们与传统的全局方法`isFinite()`和`isNaN()`的区别在于，传统方法先调用`Number()`将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，`Number.isFinite()`对于非数值一律返回`false`, `Number.isNaN()`只有对于`NaN`才返回`true`，非`NaN`一律返回`false`。
  >
  > ```
  > isFinite(25) // true
  > isFinite("25") // true
  > Number.isFinite(25) // true
  > Number.isFinite("25") // false
  > 
  > isNaN(NaN) // true
  > isNaN("NaN") // true
  > Number.isNaN(NaN) // true
  > Number.isNaN("NaN") // false
  > Number.isNaN(1) // false
  > ```
  >
  > ## Number.parseInt(), Number.parseFloat()
  >
  > ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。
  >
  > ```
  > // ES5的写法
  > parseInt('12.34') // 12
  > parseFloat('123.45#') // 123.45
  > 
  > // ES6的写法
  > Number.parseInt('12.34') // 12
  > Number.parseFloat('123.45#') // 123.45
  > ```
  >
  > 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
  >
  > ```
  > Number.parseInt === parseInt // true
  > Number.parseFloat === parseFloat // true
  > ```
  >
  > ## Number.isInteger()
  >
  > `Number.isInteger()`用来判断一个数值是否为整数。
  >
  > ```
  > Number.isInteger(25) // true
  > Number.isInteger(25.1) // false
  > ```
  >
  > JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
  >
  > ```
  > Number.isInteger(25) // true
  > Number.isInteger(25.0) // true
  > ```
  >
  > 如果参数不是数值，`Number.isInteger`返回`false`。
  >
  > ```
  > Number.isInteger() // false
  > Number.isInteger(null) // false
  > Number.isInteger('15') // false
  > Number.isInteger(true) // false
  > ```
  >
  > 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，`Number.isInteger`可能会误判。
  >
  > ```
  > Number.isInteger(3.0000000000000002) // true
  > ```
  >
  > 上面代码中，`Number.isInteger`的参数明明不是整数，但是会返回`true`。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个`2`被丢弃了。
  >
  > 类似的情况还有，如果一个数值的绝对值小于`Number.MIN_VALUE`（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，`Number.isInteger`也会误判。
  >
  > ```
  > Number.isInteger(5E-324) // false
  > Number.isInteger(5E-325) // true
  > ```
  >
  > 上面代码中，`5E-325`由于值太小，会被自动转为0，因此返回`true`。
  >
  > 总之，如果对数据精度的要求较高，不建议使用`Number.isInteger()`判断一个数值是否为整数。
  >
  > ## Number.EPSILON
  >
  > ES6 在`Number`对象上面，新增一个极小的常量`Number.EPSILON`。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
  >
  > 对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的`1.00..001`，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。
  >
  > ```
  > Number.EPSILON === Math.pow(2, -52)
  > // true
  > Number.EPSILON
  > // 2.220446049250313e-16
  > Number.EPSILON.toFixed(20)
  > // "0.00000000000000022204"
  > ```
  >
  > `Number.EPSILON`实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
  >
  > 引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。
  >
  > ```
  > 0.1 + 0.2
  > // 0.30000000000000004
  > 
  > 0.1 + 0.2 - 0.3
  > // 5.551115123125783e-17
  > 
  > 5.551115123125783e-17.toFixed(20)
  > // '0.00000000000000005551'
  > ```
  >
  > 上面代码解释了，为什么比较`0.1 + 0.2`与`0.3`得到的结果是`false`。
  >
  > ```
  > 0.1 + 0.2 === 0.3 // false
  > ```
  >
  > `Number.EPSILON`可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即`Number.EPSILON * Math.pow(2, 2)`），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。
  >
  > ```
  > 5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2)
  > // true
  > ```
  >
  > 因此，`Number.EPSILON`的实质是一个可以接受的最小误差范围。
  >
  > ```
  > function withinErrorMargin (left, right) {
  >   return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
  > }
  > 
  > 0.1 + 0.2 === 0.3 // false
  > withinErrorMargin(0.1 + 0.2, 0.3) // true
  > 
  > 1.1 + 1.3 === 2.4 // false
  > withinErrorMargin(1.1 + 1.3, 2.4) // true
  > ```
  >
  > 上面的代码为浮点数运算，部署了一个误差检查函数。
  >
  > ## 安全整数和 Number.isSafeInteger()
  >
  > JavaScript 能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。
  >
  > ```
  > Math.pow(2, 53) // 9007199254740992
  > 
  > 9007199254740992  // 9007199254740992
  > 9007199254740993  // 9007199254740992
  > 
  > Math.pow(2, 53) === Math.pow(2, 53) + 1
  > // true
  > ```
  >
  > 上面代码中，超出 2 的 53 次方之后，一个数就不精确了。
  >
  > ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。
  >
  > ```
  > Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
  > // true
  > Number.MAX_SAFE_INTEGER === 9007199254740991
  > // true
  > 
  > Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
  > // true
  > Number.MIN_SAFE_INTEGER === -9007199254740991
  > // true
  > ```
  >
  > 上面代码中，可以看到 JavaScript 能够精确表示的极限。
  >
  > `Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。
  >
  > ```
  > Number.isSafeInteger('a') // false
  > Number.isSafeInteger(null) // false
  > Number.isSafeInteger(NaN) // false
  > Number.isSafeInteger(Infinity) // false
  > Number.isSafeInteger(-Infinity) // false
  > 
  > Number.isSafeInteger(3) // true
  > Number.isSafeInteger(1.2) // false
  > Number.isSafeInteger(9007199254740990) // true
  > Number.isSafeInteger(9007199254740992) // false
  > 
  > Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
  > Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
  > Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
  > Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
  > ```
  >
  > 这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。
  >
  > ```
  > Number.isSafeInteger = function (n) {
  >   return (typeof n === 'number' &&
  >     Math.round(n) === n &&
  >     Number.MIN_SAFE_INTEGER <= n &&
  >     n <= Number.MAX_SAFE_INTEGER);
  > }
  > ```
  >
  > 实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。
  >
  > ```
  > Number.isSafeInteger(9007199254740993)
  > // false
  > Number.isSafeInteger(990)
  > // true
  > Number.isSafeInteger(9007199254740993 - 990)
  > // true
  > 9007199254740993 - 990
  > // 返回结果 9007199254740002
  > // 正确答案应该是 9007199254740003
  > ```
  >
  > 上面代码中，`9007199254740993`不是一个安全整数，但是`Number.isSafeInteger`会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以`9007199254740992`的形式储存。
  >
  > ```
  > 9007199254740993 === 9007199254740992
  > // true
  > ```
  >
  > 所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。
  >
  > ```
  > function trusty (left, right, result) {
  >   if (
  >     Number.isSafeInteger(left) &&
  >     Number.isSafeInteger(right) &&
  >     Number.isSafeInteger(result)
  >   ) {
  >     return result;
  >   }
  >   throw new RangeError('Operation cannot be trusted!');
  > }
  > 
  > trusty(9007199254740993, 990, 9007199254740993 - 990)
  > // RangeError: Operation cannot be trusted!
  > 
  > trusty(1, 2, 3)
  > // 3
  > ```
  >
  > ## Math 对象的扩展
  >
  > ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。
  >
  > ### Math.trunc()
  >
  > `Math.trunc`方法用于去除一个数的小数部分，返回整数部分。
  >
  > ```
  > Math.trunc(4.1) // 4
  > Math.trunc(4.9) // 4
  > Math.trunc(-4.1) // -4
  > Math.trunc(-4.9) // -4
  > Math.trunc(-0.1234) // -0
  > ```
  >
  > 对于非数值，`Math.trunc`内部使用`Number`方法将其先转为数值。
  >
  > ```
  > Math.trunc('123.456') // 123
  > Math.trunc(true) //1
  > Math.trunc(false) // 0
  > Math.trunc(null) // 0
  > ```
  >
  > 对于空值和无法截取整数的值，返回`NaN`。
  >
  > ```
  > Math.trunc(NaN);      // NaN
  > Math.trunc('foo');    // NaN
  > Math.trunc();         // NaN
  > Math.trunc(undefined) // NaN
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.trunc = Math.trunc || function(x) {
  >   return x < 0 ? Math.ceil(x) : Math.floor(x);
  > };
  > ```
  >
  > ### Math.sign()
  >
  > `Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
  >
  > 它会返回五种值。
  >
  > - 参数为正数，返回`+1`；
  > - 参数为负数，返回`-1`；
  > - 参数为 0，返回`0`；
  > - 参数为-0，返回`-0`;
  > - 其他值，返回`NaN`。
  >
  > ```
  > Math.sign(-5) // -1
  > Math.sign(5) // +1
  > Math.sign(0) // +0
  > Math.sign(-0) // -0
  > Math.sign(NaN) // NaN
  > ```
  >
  > 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回`NaN`。
  >
  > ```
  > Math.sign('')  // 0
  > Math.sign(true)  // +1
  > Math.sign(false)  // 0
  > Math.sign(null)  // 0
  > Math.sign('9')  // +1
  > Math.sign('foo')  // NaN
  > Math.sign()  // NaN
  > Math.sign(undefined)  // NaN
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.sign = Math.sign || function(x) {
  >   x = +x; // convert to a number
  >   if (x === 0 || isNaN(x)) {
  >     return x;
  >   }
  >   return x > 0 ? 1 : -1;
  > };
  > ```
  >
  > ### Math.cbrt()
  >
  > `Math.cbrt()`方法用于计算一个数的立方根。
  >
  > ```
  > Math.cbrt(-1) // -1
  > Math.cbrt(0)  // 0
  > Math.cbrt(1)  // 1
  > Math.cbrt(2)  // 1.2599210498948732
  > ```
  >
  > 对于非数值，`Math.cbrt()`方法内部也是先使用`Number()`方法将其转为数值。
  >
  > ```
  > Math.cbrt('8') // 2
  > Math.cbrt('hello') // NaN
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.cbrt = Math.cbrt || function(x) {
  >   var y = Math.pow(Math.abs(x), 1/3);
  >   return x < 0 ? -y : y;
  > };
  > ```
  >
  > ### Math.clz32()
  >
  > `Math.clz32()`方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
  >
  > ```
  > Math.clz32(0) // 32
  > Math.clz32(1) // 31
  > Math.clz32(1000) // 22
  > Math.clz32(0b01000000000000000000000000000000) // 1
  > Math.clz32(0b00100000000000000000000000000000) // 2
  > ```
  >
  > 上面代码中，0 的二进制形式全为 0，所以有 32 个前导 0；1 的二进制形式是`0b1`，只占 1 位，所以 32 位之中有 31 个前导 0；1000 的二进制形式是`0b1111101000`，一共有 10 位，所以 32 位之中有 22 个前导 0。
  >
  > `clz32`这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。
  >
  > 左移运算符（`<<`）与`Math.clz32`方法直接相关。
  >
  > ```
  > Math.clz32(0) // 32
  > Math.clz32(1) // 31
  > Math.clz32(1 << 1) // 30
  > Math.clz32(1 << 2) // 29
  > Math.clz32(1 << 29) // 2
  > ```
  >
  > 对于小数，`Math.clz32`方法只考虑整数部分。
  >
  > ```
  > Math.clz32(3.2) // 30
  > Math.clz32(3.9) // 30
  > ```
  >
  > 对于空值或其他类型的值，`Math.clz32`方法会将它们先转为数值，然后再计算。
  >
  > ```
  > Math.clz32() // 32
  > Math.clz32(NaN) // 32
  > Math.clz32(Infinity) // 32
  > Math.clz32(null) // 32
  > Math.clz32('foo') // 32
  > Math.clz32([]) // 32
  > Math.clz32({}) // 32
  > Math.clz32(true) // 31
  > ```
  >
  > ### Math.imul()
  >
  > `Math.imul`方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
  >
  > ```
  > Math.imul(2, 4)   // 8
  > Math.imul(-1, 8)  // -8
  > Math.imul(-2, -2) // 4
  > ```
  >
  > 如果只考虑最后 32 位，大多数情况下，`Math.imul(a, b)`与`a * b`的结果是相同的，即该方法等同于`(a * b)|0`的效果（超过 32 位的部分溢出）。之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，`Math.imul`方法可以返回正确的低位数值。
  >
  > ```
  > (0x7fffffff * 0x7fffffff)|0 // 0
  > ```
  >
  > 上面这个乘法算式，返回结果为 0。但是由于这两个二进制数的最低位都是 1，所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是 1。这个错误就是因为它们的乘积超过了 2 的 53 次方，JavaScript 无法保存额外的精度，就把低位的值都变成了 0。`Math.imul`方法可以返回正确的值 1。
  >
  > ```
  > Math.imul(0x7fffffff, 0x7fffffff) // 1
  > ```
  >
  > ### Math.fround()
  >
  > `Math.fround`方法返回一个数的32位单精度浮点数形式。
  >
  > 对于32位单精度格式来说，数值精度是24个二进制位（1 位隐藏位与 23 位有效位），所以对于 -224 至 224 之间的整数（不含两个端点），返回结果与参数本身一致。
  >
  > ```
  > Math.fround(0)   // 0
  > Math.fround(1)   // 1
  > Math.fround(2 ** 24 - 1)   // 16777215
  > ```
  >
  > 如果参数的绝对值大于 224，返回的结果便开始丢失精度。
  >
  > ```
  > Math.fround(2 ** 24)       // 16777216
  > Math.fround(2 ** 24 + 1)   // 16777216
  > ```
  >
  > `Math.fround`方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）。
  >
  > ```
  > // 未丢失有效精度
  > Math.fround(1.125) // 1.125
  > Math.fround(7.25)  // 7.25
  > 
  > // 丢失精度
  > Math.fround(0.3)   // 0.30000001192092896
  > Math.fround(0.7)   // 0.699999988079071
  > Math.fround(1.0000000123) // 1
  > ```
  >
  > 对于 `NaN` 和 `Infinity`，此方法返回原值。对于其它类型的非数值，`Math.fround` 方法会先将其转为数值，再返回单精度浮点数。
  >
  > ```
  > Math.fround(NaN)      // NaN
  > Math.fround(Infinity) // Infinity
  > 
  > Math.fround('5')      // 5
  > Math.fround(true)     // 1
  > Math.fround(null)     // 0
  > Math.fround([])       // 0
  > Math.fround({})       // NaN
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.fround = Math.fround || function (x) {
  >   return new Float32Array([x])[0];
  > };
  > ```
  >
  > ### Math.hypot()
  >
  > `Math.hypot`方法返回所有参数的平方和的平方根。
  >
  > ```
  > Math.hypot(3, 4);        // 5
  > Math.hypot(3, 4, 5);     // 7.0710678118654755
  > Math.hypot();            // 0
  > Math.hypot(NaN);         // NaN
  > Math.hypot(3, 4, 'foo'); // NaN
  > Math.hypot(3, 4, '5');   // 7.0710678118654755
  > Math.hypot(-3);          // 3
  > ```
  >
  > 上面代码中，3 的平方加上 4 的平方，等于 5 的平方。
  >
  > 如果参数不是数值，`Math.hypot`方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。
  >
  > ### 对数方法
  >
  > ES6 新增了 4 个对数相关方法。
  >
  > **（1） Math.expm1()**
  >
  > `Math.expm1(x)`返回 ex - 1，即`Math.exp(x) - 1`。
  >
  > ```
  > Math.expm1(-1) // -0.6321205588285577
  > Math.expm1(0)  // 0
  > Math.expm1(1)  // 1.718281828459045
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.expm1 = Math.expm1 || function(x) {
  >   return Math.exp(x) - 1;
  > };
  > ```
  >
  > **（2）Math.log1p()**
  >
  > `Math.log1p(x)`方法返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于-1，返回`NaN`。
  >
  > ```
  > Math.log1p(1)  // 0.6931471805599453
  > Math.log1p(0)  // 0
  > Math.log1p(-1) // -Infinity
  > Math.log1p(-2) // NaN
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.log1p = Math.log1p || function(x) {
  >   return Math.log(1 + x);
  > };
  > ```
  >
  > **（3）Math.log10()**
  >
  > `Math.log10(x)`返回以 10 为底的`x`的对数。如果`x`小于 0，则返回 NaN。
  >
  > ```
  > Math.log10(2)      // 0.3010299956639812
  > Math.log10(1)      // 0
  > Math.log10(0)      // -Infinity
  > Math.log10(-2)     // NaN
  > Math.log10(100000) // 5
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.log10 = Math.log10 || function(x) {
  >   return Math.log(x) / Math.LN10;
  > };
  > ```
  >
  > **（4）Math.log2()**
  >
  > `Math.log2(x)`返回以 2 为底的`x`的对数。如果`x`小于 0，则返回 NaN。
  >
  > ```
  > Math.log2(3)       // 1.584962500721156
  > Math.log2(2)       // 1
  > Math.log2(1)       // 0
  > Math.log2(0)       // -Infinity
  > Math.log2(-2)      // NaN
  > Math.log2(1024)    // 10
  > Math.log2(1 << 29) // 29
  > ```
  >
  > 对于没有部署这个方法的环境，可以用下面的代码模拟。
  >
  > ```
  > Math.log2 = Math.log2 || function(x) {
  >   return Math.log(x) / Math.LN2;
  > };
  > ```
  >
  > ### 双曲函数方法
  >
  > ES6 新增了 6 个双曲函数方法。
  >
  > - `Math.sinh(x)` 返回`x`的双曲正弦（hyperbolic sine）
  > - `Math.cosh(x)` 返回`x`的双曲余弦（hyperbolic cosine）
  > - `Math.tanh(x)` 返回`x`的双曲正切（hyperbolic tangent）
  > - `Math.asinh(x)` 返回`x`的反双曲正弦（inverse hyperbolic sine）
  > - `Math.acosh(x)` 返回`x`的反双曲余弦（inverse hyperbolic cosine）
  > - `Math.atanh(x)` 返回`x`的反双曲正切（inverse hyperbolic tangent）
  >
  > ## BigInt 数据类型
  >
  > ### 简介
  >
  > JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回`Infinity`。
  >
  > ```
  > // 超过 53 个二进制位的数值，无法保持精度
  > Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
  > 
  > // 超过 2 的 1024 次方的数值，无法表示
  > Math.pow(2, 1024) // Infinity
  > ```
  >
  > [ES2020](https://github.com/tc39/proposal-bigint) 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的第八种数据类型。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
  >
  > ```
  > const a = 2172141653n;
  > const b = 15346349309n;
  > 
  > // BigInt 可以保持精度
  > a * b // 33334444555566667777n
  > 
  > // 普通整数无法保持精度
  > Number(a) * Number(b) // 33334444555566670000
  > ```
  >
  > 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀`n`。
  >
  > ```
  > 1234 // 普通整数
  > 1234n // BigInt
  > 
  > // BigInt 的运算
  > 1n + 2n // 3n
  > ```
  >
  > BigInt 同样可以使用各种进制表示，都要加上后缀`n`。
  >
  > ```
  > 0b1101n // 二进制
  > 0o777n // 八进制
  > 0xFFn // 十六进制
  > ```
  >
  > BigInt 与普通整数是两种值，它们之间并不相等。
  >
  > ```
  > 42n === 42 // false
  > ```
  >
  > `typeof`运算符对于 BigInt 类型的数据返回`bigint`。
  >
  > ```
  > typeof 123n // 'bigint'
  > ```
  >
  > BigInt 可以使用负号（`-`），但是不能使用正号（`+`），因为会与 asm.js 冲突。
  >
  > ```
  > -42n // 正确
  > +42n // 报错
  > ```
  >
  > JavaScript 以前不能计算70的阶乘（即`70!`），因为超出了可以表示的精度。
  >
  > ```
  > let p = 1;
  > for (let i = 1; i <= 70; i++) {
  >   p *= i;
  > }
  > console.log(p); // 1.197857166996989e+100
  > ```
  >
  > 现在支持大整数了，就可以算了，浏览器的开发者工具运行下面代码，就 OK。
  >
  > ```
  > let p = 1n;
  > for (let i = 1n; i <= 70n; i++) {
  >   p *= i;
  > }
  > console.log(p); // 11978571...00000000n
  > ```
  >
  > ### BigInt 函数
  >
  > JavaScript 原生提供`BigInt`函数，可以用它生成 BigInt 类型的数值。转换规则基本与`Number()`一致，将其他类型的值转为 BigInt。
  >
  > ```
  > BigInt(123) // 123n
  > BigInt('123') // 123n
  > BigInt(false) // 0n
  > BigInt(true) // 1n
  > ```
  >
  > `BigInt()`函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。
  >
  > ```
  > new BigInt() // TypeError
  > BigInt(undefined) //TypeError
  > BigInt(null) // TypeError
  > BigInt('123n') // SyntaxError
  > BigInt('abc') // SyntaxError
  > ```
  >
  > 上面代码中，尤其值得注意字符串`123n`无法解析成 Number 类型，所以会报错。
  >
  > 参数如果是小数，也会报错。
  >
  > ```
  > BigInt(1.5) // RangeError
  > BigInt('1.5') // SyntaxError
  > ```
  >
  > BigInt 继承了 Object 对象的两个实例方法。
  >
  > - `BigInt.prototype.toString()`
  > - `BigInt.prototype.valueOf()`
  >
  > 它还继承了 Number 对象的一个实例方法。
  >
  > - `BigInt.prototype.toLocaleString()`
  >
  > 此外，还提供了三个静态方法。
  >
  > - `BigInt.asUintN(width, BigInt)`： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。
  > - `BigInt.asIntN(width, BigInt)`：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。
  > - `BigInt.parseInt(string[, radix])`：近似于`Number.parseInt()`，将一个字符串转换成指定进制的 BigInt。
  >
  > ```
  > const max = 2n ** (64n - 1n) - 1n;
  > 
  > BigInt.asIntN(64, max)
  > // 9223372036854775807n
  > BigInt.asIntN(64, max + 1n)
  > // -9223372036854775808n
  > BigInt.asUintN(64, max + 1n)
  > // 9223372036854775808n
  > ```
  >
  > 上面代码中，`max`是64位带符号的 BigInt 所能表示的最大值。如果对这个值加`1n`，`BigInt.asIntN()`将会返回一个负值，因为这时新增的一位将被解释为符号位。而`BigInt.asUintN()`方法由于不存在符号位，所以可以正确返回结果。
  >
  > 如果`BigInt.asIntN()`和`BigInt.asUintN()`指定的位数，小于数值本身的位数，那么头部的位将被舍弃。
  >
  > ```
  > const max = 2n ** (64n - 1n) - 1n;
  > 
  > BigInt.asIntN(32, max) // -1n
  > BigInt.asUintN(32, max) // 4294967295n
  > ```
  >
  > 上面代码中，`max`是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。
  >
  > 下面是`BigInt.parseInt()`的例子。
  >
  > ```
  > // Number.parseInt() 与 BigInt.parseInt() 的对比
  > Number.parseInt('9007199254740993', 10)
  > // 9007199254740992
  > BigInt.parseInt('9007199254740993', 10)
  > // 9007199254740993n
  > ```
  >
  > 上面代码中，由于有效数字超出了最大限度，`Number.parseInt`方法返回的结果是不精确的，而`BigInt.parseInt`方法正确返回了对应的 BigInt。
  >
  > 对于二进制数组，BigInt 新增了两个类型`BigUint64Array`和`BigInt64Array`，这两种数据类型返回的都是64位 BigInt。`DataView`对象的实例方法`DataView.prototype.getBigInt64()`和`DataView.prototype.getBigUint64()`，返回的也是 BigInt。
  >
  > ### 转换规则
  >
  > 可以使用`Boolean()`、`Number()`和`String()`这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。
  >
  > ```
  > Boolean(0n) // false
  > Boolean(1n) // true
  > Number(1n)  // 1
  > String(1n)  // "1"
  > ```
  >
  > 上面代码中，注意最后一个例子，转为字符串时后缀`n`会消失。
  >
  > 另外，取反运算符（`!`）也可以将 BigInt 转为布尔值。
  >
  > ```
  > !0n // true
  > !1n // false
  > ```
  >
  > ### 数学运算
  >
  > 数学运算方面，BigInt 类型的`+`、`-`、`*`和`**`这四个二元运算符，与 Number 类型的行为一致。除法运算`/`会舍去小数部分，返回一个整数。
  >
  > ```
  > 9n / 5n
  > // 1n
  > ```
  >
  > 几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。
  >
  > - 不带符号的右移位运算符`>>>`
  > - 一元的求正运算符`+`
  >
  > 上面两个运算符用在 BigInt 会报错。前者是因为`>>>`运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符`>>`。后者是因为一元运算符`+`在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定`+1n`会报错。
  >
  > BigInt 不能与普通数值进行混合运算。
  >
  > ```
  > 1n + 1.3 // 报错
  > ```
  >
  > 上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如`(2n**53n + 1n) + 0.5`这个表达式，如果返回 BigInt 类型，`0.5`这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。
  >
  > 同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。
  >
  > ```
  > // 错误的写法
  > Math.sqrt(4n) // 报错
  > 
  > // 正确的写法
  > Math.sqrt(Number(4n)) // 2
  > ```
  >
  > 上面代码中，`Math.sqrt`的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用`Number`方法转一下类型，才能进行计算。
  >
  > asm.js 里面，`|0`跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与`|0`进行运算会报错。
  >
  > ```
  > 1n | 0 // 报错
  > ```
  >
  > ### 其他运算
  >
  > BigInt 对应的布尔值，与 Number 类型一致，即`0n`会转为`false`，其他值转为`true`。
  >
  > ```
  > if (0n) {
  >   console.log('if');
  > } else {
  >   console.log('else');
  > }
  > // else
  > ```
  >
  > 上面代码中，`0n`对应`false`，所以会进入`else`子句。
  >
  > 比较运算符（比如`>`）和相等运算符（`==`）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。
  >
  > ```
  > 0n < 1 // true
  > 0n < true // true
  > 0n == 0 // true
  > 0n == false // true
  > 0n === 0 // false
  > ```
  >
  > BigInt 与字符串混合运算时，会先转为字符串，再进行运算。
  >
  > ```js
  > '' + 123n // "123"
  > ```