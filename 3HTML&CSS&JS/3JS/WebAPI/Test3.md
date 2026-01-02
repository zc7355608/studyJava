- ## `Intl.RelativeTimeFormat`

  > 很多日期库支持显示相对时间，比如“昨天”、“五分钟前”、“两个月之前”等等。由于不同的语言，日期显示的格式和相关词语都不同，造成这些库的体积非常大。
  >
  > 现在，浏览器提供内置的 Intl.RelativeTimeFormat API，可以不使用这些库，直接显示相对时间。

  - #### 基本用法

    > `Intl.RelativeTimeFormat()`是一个构造函数，接受一个语言代码作为参数，返回一个相对时间的实例对象。如果省略参数，则默认传入当前运行时的语言代码。
    >
    > ```
    > const rtf = new Intl.RelativeTimeFormat('en');
    > 
    > rtf.format(3.14, 'second') // "in 3.14 seconds"
    > rtf.format(-15, 'minute') // "15 minutes ago"
    > rtf.format(8, 'hour') // "in 8 hours"
    > rtf.format(-2, 'day') // "2 days ago"
    > rtf.format(3, 'week') // "in 3 weeks"
    > rtf.format(-5, 'month') // "5 months ago"
    > rtf.format(2, 'quarter') // "in 2 quarters"
    > rtf.format(-42, 'year') // "42 years ago"
    > ```
    >
    > 上面代码指定使用英语显示相对时间。
    >
    > 下面是使用西班牙语显示相对时间的例子。
    >
    > ```
    > const rtf = new Intl.RelativeTimeFormat('es');
    > 
    > rtf.format(3.14, 'second') // "dentro de 3,14 segundos"
    > rtf.format(-15, 'minute') // "hace 15 minutos"
    > rtf.format(8, 'hour') // "dentro de 8 horas"
    > rtf.format(-2, 'day') // "hace 2 días"
    > rtf.format(3, 'week') // "dentro de 3 semanas"
    > rtf.format(-5, 'month') // "hace 5 meses"
    > rtf.format(2, 'quarter') // "dentro de 2 trimestres"
    > rtf.format(-42, 'year') // "hace 42 años"
    > ```
    >
    > `Intl.RelativeTimeFormat()`还可以接受一个配置对象，作为第二个参数，用来精确指定相对时间实例的行为。配置对象共有下面这些属性。
    >
    > - options.style：表示返回字符串的风格，可能的值有`long`（默认值，比如“in 1 month”）、`short`（比如“in 1 mo.”）、`narrow`（比如“in 1 mo.”）。对于一部分语言来说，`narrow`风格和`short`风格是类似的。
    > - options.localeMatcher：表示匹配语言参数的算法，可能的值有`best fit`（默认值）和`lookup`。
    > - options.numeric：表示返回字符串是数字显示，还是文字显示，可能的值有`always`（默认值，总是文字显示）和`auto`（自动转换）。
    >
    > ```
    > // 下面的配置对象，传入的都是默认值
    > const rtf = new Intl.RelativeTimeFormat('en', {
    >   localeMatcher: 'best fit', // 其他值：'lookup'
    >   style: 'long', // 其他值：'short' or 'narrow'
    >   numeric: 'always', // 其他值：'auto'
    > });
    > 
    > // Now, let’s try some special cases!
    > 
    > rtf.format(-1, 'day') // "1 day ago"
    > rtf.format(0, 'day') // "in 0 days"
    > rtf.format(1, 'day') // "in 1 day"
    > rtf.format(-1, 'week') // "1 week ago"
    > rtf.format(0, 'week') // "in 0 weeks"
    > rtf.format(1, 'week') // "in 1 week"
    > ```
    >
    > 上面代码中，显示的是“1 day ago”，而不是“yesterday”；显示的是“in 0 weeks”，而不是“this week”。这是因为默认情况下，相对时间显示的是数值形式，而不是文字形式。
    >
    > 改变这个行为，可以把配置对象的`numeric`属性改成`auto`。
    >
    > ```js
    > const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    > 
    > rtf.format(-1, 'day') // "yesterday"
    > rtf.format(0, 'day') // "today"
    > rtf.format(1, 'day') // "tomorrow"
    > rtf.format(-1, 'week') // "last week"
    > rtf.format(0, 'week') // "this week"
    > rtf.format(1, 'week') // "next week"
    > ```

  - #### `Intl.RelativeTimeFormat.prototype.format()`

    > 相对时间实例对象的`format`方法，接受两个参数，依次为时间间隔的数值和单位。其中，“单位”是一个字符串，可以接受以下八个值。
    >
    > - year
    > - quarter
    > - month
    > - week
    > - day
    > - hour
    > - minute
    > - second
    >
    > ```js
    > let rtf = new Intl.RelativeTimeFormat('en');
    > rtf.format(-1, "day") // "yesterday"
    > rtf.format(2.15, "day") // "in 2.15 days
    > ```

  - #### `Intl.RelativeTimeFormat.prototype.formatToParts()`

    > 相对时间实例对象的`formatToParts()`方法的参数跟`format()`方法一样，但是返回的是一个数组，用来精确控制相对时间的每个部分。
    >
    > ```
    > const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    > 
    > rtf.format(-1, 'day') 
    > // "yesterday"
    > rtf.formatToParts(-1, 'day');
    > // [{ type: "literal", value: "yesterday" }]
    > 
    > rtf.format(3, 'week');
    > // "in 3 weeks"
    > rtf.formatToParts(3, 'week');
    > // [
    > //   { type: 'literal', value: 'in ' },
    > //   { type: 'integer', value: '3', unit: 'week' },
    > //   { type: 'literal', value: ' weeks' }
    > // ]
    > ```
    >
    > 返回数组的每个成员都是一个对象，拥有两个属性。
    >
    > - type：字符串，表示输出值的类型。
    > - value：字符串，表示输出的内容。
    > - unit：如果输出内容表示一个数值（即`type`属性不是`literal`），那么还会有`unit`属性，表示数值的单位。

- ## `Intl.Segmenter` API

  - #### 简介

    > Intl.Segmenter 是浏览器内置的用于文本分词的 API。
    >
    > 使用时，先用`Intl.Segmenter()`新建一个分词器对象。
    >
    > ```
    > const segmenter = new Intl.Segmenter(
    >   'en',
    >   { granularity: 'word' }
    > );
    > ```
    >
    > `Intl.Segmenter()`接受两个参数，第一个是所要分词的语言简称（上例是`en`），第二个参数是一个配置对象，有以下两个属性。
    >
    > - `localeMatcher`：指定分词算法，有两个可能的值，一个是`lookup`，表示采用特定的算法（BCP 47），另一个是`best fit`（默认值），表示采用操作系统或浏览器现有的尽可能适用的算法。
    > - `granularity`：表示分词的颗粒度，有三个可能的值：grapheme（字符，这是默认值），word（词语），sentence（句子）。
    >
    > 拿到分词器对象以后，就可以进行分词了。
    >
    > ```
    > const segmenter = new Intl.Segmenter(
    >   'en',
    >   { granularity: 'word' }
    > );
    > 
    > const segments = segmenter.segment('This has four words!');
    > 
    > Array.from(segments).map((segment) => segment.segment);
    > // ['This', ' ', 'has', ' ', 'four', ' ', 'words', '!']
    > ```
    >
    > 上面示例中，变量`segmenter`是分词器对象，可以对英语进行分词，颗粒度是词语。所以，“This has four words!”被分成了8个部分，包括4个词语、3个空格和1个标点符号。
    >
    > 分词器对象的`segment()`方法是实际的分词方法，它的参数是需要分词的文本，返回值是一个具有迭代器接口的分词结果对象。`Array.from()`将这个分词结果对象转成数组，也可以采用`[...segments]`的写法。
    >
    > 下面的例子是过滤掉非词语字符。
    >
    > ```
    > const segments = segmenter.segment('This has four words!');
    > 
    > Array.from(segments)
    >   .filter((segment) => segment.isWordLike)
    >   .map((segment) => segment.segment);
    > // ['This', 'has', 'four', 'words']
    > ```
    >
    > 上面示例中，`Array.from()`将分词结果对象转成一个数组，变量`segment`是数组的每个成员，它也是一个对象。该对象的`isWordLike`属性是一个布尔值，表示当前值是否为一个真正的词，而该对象的`segment`属性（上例的`segment.segment`）则是真正的分词结果。
    >
    > Intl Segmenter 支持各种语言，下面是日语分词的例子。
    >
    > ```
    > const segmenter = new Intl.Segmenter('ja', { granularity: 'word' });
    > const segments = segmenter.segment('これは日本語のテキストです');
    > 
    > Array.from(segments).map((segment) => segment.segment);
    > // ['これ', 'は', '日本語', 'の', 'テキスト', 'です']
    > ```
    >
    > 下面是法语的例子。
    >
    > ```js
    > const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
    > const string1 = 'Que ma joie demeure';
    > 
    > const iterator1 = segmenterFr.segment(string1)[Symbol.iterator]();
    > 
    > iterator1.next().value.segment // 'Que'
    > iterator1.next().value.segment // ' '
    > ```

  - #### 静态方法

    - ##### `Intl.Segmenter.supportedLocalesOf()`

      > `Intl.Segmenter.supportedLocalesOf()`返回一个数组，用来检测当前环境是否支持指定语言的分词。
      >
      > ```js
      > const locales1 = ['ban', 'id-u-co-pinyin', 'de-ID'];
      > const options1 = { localeMatcher: 'lookup', granularity: 'string' };
      > 
      > Intl.Segmenter.supportedLocalesOf(locales1, options1)
      > // ["id-u-co-pinyin", "de-ID"]
      > ```
      >
      > 它接受两个参数，第一个参数是一个数组，数组成员是需要检测的语言简称；第二个参数是配置对象，跟构造方法的第二个参数是一致的，可以省略。
      >
      > 上面示例中，需要检测的三种语言分别是巴厘岛语（ban）、印度尼西亚语（id-u-co-pinyin）、德语（de-ID）。结果显示只支持前两者，不支持巴厘岛语。

  - #### 实例方法

    - ##### `resolvedOptions()`

      > 实例对象的`resolvedOptions()`方法，用于获取构造该实例时的参数。
      >
      > ```
      > const segmenter1 = new Intl.Segmenter('fr-FR');
      > const options1 = segmenter1.resolvedOptions();
      > 
      > options1.locale // "fr-FR"
      > options1.granularity // "grapheme"
      > ```
      >
      > 上面示例中，`resolveOptions()`方法返回了一个对象，该对象的`locale`属性对应构造方法的第一个参数，`granularity`属性对应构造方法第二个参数对象的颗粒度属性。

    - ##### `segment()`

      > 实例对象的`segment()`方法进行实际的分词。
      >
      > ```
      > const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
      > const string1 = 'Que ma joie demeure';
      > 
      > const segments = segmenterFr.segment(string1);
      > 
      > segments.containing(5)
      > // {segment: 'ma', index: 4, input: 'Que ma joie demeure', isWordLike: true}
      > ```
      >
      > `segment()`方法的返回结果是一个具有迭代器接口的分词结果对象，有三种方法进行处理。
      >
      > （1）使用`Array.from()`或扩展运算符（`...`）将分词结果对象转成数组。
      >
      > ```
      > const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
      > const string1 = 'Que ma joie demeure';
      > 
      > const iterator1 = segmenterFr.segment(string1);
      > 
      > Array.from(iterator1).map(segment => {
      >   if (segment.segment.length > 4) {
      >     console.log(segment.segment);
      >   }
      > })
      > // demeure
      > ```
      >
      > 上面示例中，`segmenterFr.segment()`返回一个针对`string1`的分词结果对象，该对象具有迭代器接口。`Array.from()`将其转为数组，数组的每个成员是一个分词颗粒对象，该对象的`segment`属性就是分词结果。分词颗粒对象的介绍，详见后文。
      >
      > （2）使用`for...of`循环，遍历分词结果对象。
      >
      > ```
      > const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
      > const string1 = 'Que ma joie demeure';
      > 
      > const iterator1 = segmenterFr.segment(string1);
      > 
      > for (const segment of iterator1) {
      >   if (segment.segment.length > 4) {
      >     console.log(segment.segment);
      >   }
      > }
      > // demeure
      > ```
      >
      > 上面示例中，`for...of`默认调用分词结果对象的迭代器接口，获取每一轮的分词颗粒对象。
      >
      > 由于迭代器接口是在`Symbol.iterator`属性上面，所以实际执行的代码如下。
      >
      > ```
      > const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
      > const string1 = 'Que ma joie demeure';
      > 
      > const iterator1 = segmenterFr.segment(string1)[Symbol.iterator]();
      > 
      > for (const segment of iterator1) {
      >   if (segment.segment.length > 4) {
      >     console.log(segment.segment);
      >   }
      > }
      > // "demeure"
      > ```
      >
      > `for...of`循环每一轮得到的是一个分词颗粒对象，该对象的`segment`属性就是当前的分词结果，详见下文。
      >
      > （3）使用`containing()`方法获取某个位置的分词颗粒对象。
      >
      > ```
      > const segmenterFr = new Intl.Segmenter('fr', { granularity: 'word' });
      > const string1 = 'Que ma joie demeure';
      > 
      > const segments = segmenterFr.segment(string1);
      > 
      > segments.containing(5)
      > // {segment: 'ma', index: 4, input: 'Que ma joie demeure', isWordLike: true}
      > ```
      >
      > `containing()`方法的参数是一个整数，表示原始字符串的指定位置（从0开始计算）。如果省略该参数，则默认为0。
      >
      > `containing()`的返回值是该位置的分词颗粒对象，如果参数位置超出原始字符串，则返回`undefined`。分词颗粒对象有以下属性。
      >
      > - segment：指定位置对应的分词结果。
      > - index：本次分词在原始字符串的开始位置（从0开始）。
      > - input：进行分词的原始字符串。
      > - isWordLike：如果分词颗粒度为`word`，该属性返回一个布尔值，表示当前值是否一个真正的词。如果分词颗粒度不为`word`，则返回`undefined`。
      >
      > ```
      > const input = "Allons-y!";
      > 
      > const segmenter = new Intl.Segmenter("fr", { granularity: "word" });
      > const segments = segmenter.segment(input);
      > 
      > let current = segments.containing();
      > // { index: 0, segment: "Allons", isWordLike: true }
      > 
      > current = segments.containing(4);
      > // { index: 0, segment: "Allons", isWordLike: true }
      > 
      > current = segments.containing(6);
      > // { index: 6, segment: "-", isWordLike: false }
      > 
      > current = segments.containing(current.index + current.segment.length);
      > // { index: 7, segment: "y", isWordLike: true }
      > 
      > current = segments.containing(current.index + current.segment.length);
      > // { index: 8, segment: "!", isWordLike: false }
      > 
      > current = segments.containing(current.index + current.segment.length);
      > // undefined
      > ```
      >
      > 上面示例中，分词结果中除了空格和标点符号，其他情况下，`isWordLike`都返回`false`。

- ## Page Lifecycle API

  > Android、iOS 和最新的 Windows 系统可以随时自主地停止后台进程，及时释放系统资源。也就是说，网页可能随时被系统丢弃掉。以前的浏览器 API 完全没有考虑到这种情况，导致开发者根本没有办法监听到系统丢弃页面。
  >
  > 为了解决这个问题，W3C 新制定了一个 Page Lifecycle API，统一了网页从诞生到卸载的行为模式，并且定义了新的事件，允许开发者响应网页状态的各种转换。
  >
  > 有了这个 API，开发者就可以预测网页下一步的状态，从而进行各种针对性的处理。Chrome 68 支持这个 API，对于老式浏览器可以使用谷歌开发的兼容库 [PageLifecycle.js](https://github.com/GoogleChromeLabs/page-lifecycle)。

  - #### 生命周期阶段

    > 网页的生命周期分成六个阶段，每个时刻只可能处于其中一个阶段。
    >
    > ![img](https://www.wangbase.com/blogimg/asset/201811/bg2018110401.png)
    >
    > **（1）Active 阶段**
    >
    > 在 Active 阶段，网页处于可见状态，且拥有输入焦点。
    >
    > **（2）Passive 阶段**
    >
    > 在 Passive 阶段，网页可见，但没有输入焦点，无法接受输入。UI 更新（比如动画）仍然在执行。该阶段只可能发生在桌面同时有多个窗口的情况。
    >
    > **（3）Hidden 阶段**
    >
    > 在 Hidden 阶段，用户的桌面被其他窗口占据，网页不可见，但尚未冻结。UI 更新不再执行。
    >
    > **（4）Terminated 阶段**
    >
    > 在 Terminated 阶段，由于用户主动关闭窗口，或者在同一个窗口前往其他页面，导致当前页面开始被浏览器卸载并从内存中清除。注意，这个阶段总是在 Hidden 阶段之后发生，也就是说，用户主动离开当前页面，总是先进入 Hidden 阶段，再进入 Terminated 阶段。
    >
    > 这个阶段会导致网页卸载，任何新任务都不会在这个阶段启动，并且如果运行时间太长，正在进行的任务可能会被终止。
    >
    > **（5）Frozen 阶段**
    >
    > 如果网页处于 Hidden 阶段的时间过久，用户又不关闭网页，浏览器就有可能冻结网页，使其进入 Frozen 阶段。不过，也有可能，处于可见状态的页面长时间没有操作，也会进入 Frozen 阶段。
    >
    > 这个阶段的特征是，网页不会再被分配 CPU 计算资源。定时器、回调函数、网络请求、DOM 操作都不会执行，不过正在运行的任务会执行完。浏览器可能会允许 Frozen 阶段的页面，周期性复苏一小段时间，短暂变回 Hidden 状态，允许一小部分任务执行。
    >
    > **（6）Discarded 阶段**
    >
    > 如果网页长时间处于 Frozen 阶段，用户又不唤醒页面，那么就会进入 Discarded 阶段，即浏览器自动卸载网页，清除该网页的内存占用。不过，Passive 阶段的网页如果长时间没有互动，也可能直接进入 Discarded 阶段。
    >
    > 这一般是在用户没有介入的情况下，由系统强制执行。任何类型的新任务或 JavaScript 代码，都不能在此阶段执行，因为这时通常处在资源限制的状况下。
    >
    > 网页被浏览器自动 Discarded 以后，它的 Tab 窗口还是在的。如果用户重新访问这个 Tab 页，浏览器将会重新向服务器发出请求，再一次重新加载网页，回到 Active 阶段。

  - #### 常见场景

    > 以下是几个常见场景的网页生命周期变化。
    >
    > （1）用户打开网页后，又切换到其他 App，但只过了一会又回到网页。
    >
    > 网页由 Active 变成 Hidden，又变回 Active。
    >
    > （2）用户打开网页后，又切换到其他 App，并且长时候使用后者，导致系统自动丢弃网页。
    >
    > 网页由 Active 变成 Hidden，再变成 Frozen，最后 Discarded。
    >
    > （3）用户打开网页后，又切换到其他 App，然后从任务管理器里面将浏览器进程清除。
    >
    > 网页由 Active 变成 Hidden，然后 Terminated。
    >
    > （4）系统丢弃了某个 Tab 里面的页面后，用户重新打开这个 Tab。
    >
    > 网页由 Discarded 变成 Active。

  - #### 事件

    > 生命周期的各个阶段都有自己的事件，以供开发者指定监听函数。这些事件里面，只有两个是新定义的（`freeze`事件和`resume`事件），其它都是现有的。
    >
    > 注意，网页的生命周期事件是在所有帧（frame）触发，不管是底层的帧，还是内嵌的帧。也就是说，内嵌的`<iframe>`网页跟顶层网页一样，都会同时监听到下面的事件。

    - ##### `focus` 事件

      > `focus`事件在页面获得输入焦点时触发，比如网页从 Passive 阶段变为 Active 阶段。

    - ##### `blur` 事件

      > `blur`事件在页面失去输入焦点时触发，比如网页从 Active 阶段变为 Passive 阶段。

    - ##### `visibilitychange` 事件

      > `visibilitychange`事件在网页可见状态发生变化时触发，一般发生在以下几种场景：
      >
      > - 用户隐藏页面（切换 Tab、最小化浏览器），页面由 Active 阶段变成 Hidden 阶段。
      > - 用户重新访问隐藏的页面，页面由 Hidden 阶段变成 Active 阶段。
      > - 用户关闭页面，页面会先进入 Hidden 阶段，然后进入 Terminated 阶段。
      >
      > 可以通过`document.onvisibilitychange`属性指定这个事件的回调函数。

    - ##### `freeze` 事件

      > `freeze`事件在网页进入 Frozen 阶段时触发。
      >
      > 可以通过`document.onfreeze`属性指定在进入 Frozen 阶段时调用的回调函数。
      >
      > ```
      > function handleFreeze(e) {
      >   // Handle transition to FROZEN
      > }
      > document.addEventListener('freeze', handleFreeze);
      > 
      > # 或者
      > document.onfreeze = function() { … }
      > ```
      >
      > 这个事件的监听函数，最长只能运行500毫秒。并且只能复用已经打开的网络连接，不能发起新的网络请求。
      >
      > 注意，从 Frozen 阶段进入 Discarded 阶段，不会触发任何事件，无法指定回调函数，只能在进入 Frozen 阶段时指定回调函数。

    - ##### `resume` 事件

      > `resume`事件在网页离开 Frozen 阶段，变为 Active / Passive / Hidden 阶段时触发。
      >
      > `document.onresume`属性指的是页面离开 Frozen 阶段、进入可用状态时调用的回调函数。
      >
      > ```js
      > function handleResume(e) {
      >   // handle state transition FROZEN -> ACTIVE
      > }
      > document.addEventListener("resume", handleResume);
      > 
      > # 或者
      > document.onresume = function() { … }
      > ```

    - ##### `pageshow` 事件

      > `pageshow`事件在用户加载网页时触发。这时，有可能是全新的页面加载，也可能是从缓存中获取的页面。如果是从缓存中获取，则该事件对象的`event.persisted`属性为`true`，否则为`false`。
      >
      > 这个事件的名字有点误导，它跟页面的可见性其实毫无关系，只跟浏览器的 History 记录的变化有关。

    - ##### `pagehide` 事件

      > `pagehide`事件在用户离开当前网页、进入另一个网页时触发。它的前提是浏览器的 History 记录必须发生变化，跟网页是否可见无关。
      >
      > 如果浏览器能够将当前页面添加到缓存以供稍后重用，则事件对象的`event.persisted`属性为`true`。 如果为`true`。如果页面添加到了缓存，则页面进入 Frozen 状态，否则进入 Terminatied 状态。

    - ##### `beforeunload` 事件

      > `beforeunload`事件在窗口或文档即将卸载时触发。该事件发生时，文档仍然可见，此时卸载仍可取消。经过这个事件，网页进入 Terminated 状态。

    - ##### `unload` 事件

      > `unload`事件在页面正在卸载时触发。经过这个事件，网页进入 Terminated 状态。

  - #### 获取当前阶段

    > 如果网页处于 Active、Passive 或 Hidden 阶段，可以通过下面的代码，获得网页当前的状态。
    >
    > ```
    > const getState = () => {
    >   if (document.visibilityState === 'hidden') {
    >     return 'hidden';
    >   }
    >   if (document.hasFocus()) {
    >     return 'active';
    >   }
    >   return 'passive';
    > };
    > ```
    >
    > 如果网页处于 Frozen 和 Terminated 状态，由于定时器代码不会执行，只能通过事件监听判断状态。进入 Frozen 阶段，可以监听`freeze`事件；进入 Terminated 阶段，可以监听`pagehide`事件。

  - #### `document.wasDiscarded`

    > 如果某个选项卡处于 Frozen 阶段，就随时有可能被系统丢弃，进入 Discarded 阶段。如果后来用户再次点击该选项卡，浏览器会重新加载该页面。
    >
    > 这时，开发者可以通过判断`document.wasDiscarded`属性，了解先前的网页是否被丢弃了。
    >
    > ```
    > if (document.wasDiscarded) {
    >   // 该网页已经不是原来的状态了，曾经被浏览器丢弃过
    >   // 恢复以前的状态
    >   getPersistedState(self.discardedClientId);
    > }
    > ```
    >
    > 同时，`window`对象上会新增`window.clientId`和`window.discardedClientId`两个属性，用来恢复丢弃前的状态。

- ## Page Visibility API

  - #### 简介

    > 有时候，开发者需要知道，用户正在离开页面。常用的方法是监听下面三个事件：
    >
    > - `pagehide`
    > - `beforeunload`
    > - `unload`
    >
    > 但是，这些事件在手机上可能不会触发，页面就直接关闭了。因为手机系统可以将一个进程直接转入后台，然后杀死。
    >
    > - 用户点击了一条系统通知，切换到另一个 App。
    > - 用户进入任务切换窗口，切换到另一个 App。
    > - 用户点击了 Home 按钮，切换回主屏幕。
    > - 操作系统自动切换到另一个 App（比如，收到一个电话）。
    >
    > 上面这些情况，都会导致手机将浏览器进程切换到后台，然后为了节省资源，可能就会杀死浏览器进程。
    >
    > 以前，页面被系统切换，以及系统清除浏览器进程，是无法监听到的。开发者想要指定，任何一种页面卸载情况下都会执行的代码，也是无法做到的。为了解决这个问题，就诞生了 Page Visibility API。不管手机或桌面电脑，所有情况下，这个 API 都会监听到页面的可见性发生变化。
    >
    > 这个新的 API 的意义在于，通过监听网页的可见性，可以预判网页的卸载，还可以用来节省资源，减缓电能的消耗。比如，一旦用户不看网页，下面这些网页行为都是可以暂停的：
    >
    > - 对服务器的轮询
    > - 网页动画
    > - 正在播放的音频或视频

  - #### `document.visibilityState`

    > 这个 API 主要在`document`对象上，新增了一个`document.visibilityState`属性。该属性返回一个字符串，表示页面当前的可见性状态，共有三个可能的值：
    >
    > - `hidden`：页面彻底不可见。
    > - `visible`：页面至少一部分可见。
    > - `prerender`：页面即将或正在渲染，处于不可见状态。
    >
    > 其中，`hidden`状态和`visible`状态是所有浏览器都必须支持的。`prerender`状态只在支持“预渲染”的浏览器上才会出现，比如 Chrome 浏览器就有预渲染功能，可以在用户不可见的状态下，预先把页面渲染出来，等到用户要浏览的时候，直接展示渲染好的网页。
    >
    > 只要页面可见，哪怕只露出一个角，`document.visibilityState`属性就返回`visible`。只有以下四种情况，才会返回`hidden`：
    >
    > - 浏览器最小化。
    > - 浏览器没有最小化，但是当前页面切换成了背景页。
    > - 浏览器将要卸载（unload）页面。
    > - 操作系统触发锁屏屏幕。
    >
    > 可以看到，上面四种场景涵盖了页面可能被卸载的所有情况。也就是说，页面卸载之前，`document.visibilityState`属性一定会变成`hidden`。事实上，这也是设计这个 API 的主要目的。
    >
    > 另外，早期版本的 API，这个属性还有第四个值`unloaded`，表示页面即将卸载，现在已经被废弃了。
    >
    > 注意，`document.visibilityState`属性只针对顶层窗口，内嵌的`<iframe>`页面的`document.visibilityState`属性由顶层窗口决定。使用 CSS 属性隐藏`<iframe>`页面（比如`display: none;`），并不会影响内嵌页面的可见性。

  - #### `document.hidden`

    > 由于历史原因，这个 API 还定义了`document.hidden`属性。该属性只读，返回一个布尔值，表示当前页面是否可见。
    >
    > 当`document.visibilityState`属性返回`visible`时，`document.hidden`属性返回`false`；其他情况下，都返回`true`。
    >
    > 该属性只是出于历史原因而保留的，只要有可能，都应该使用`document.visibilityState`属性，而不是使用这个属性。

  - #### `visibilitychange` 事件

    > 只要`document.visibilityState`属性发生变化，就会触发`visibilitychange`事件。因此，可以通过监听这个事件（通过`document.addEventListener()`方法或`document.onvisibilitychange`属性），跟踪页面可见性的变化。
    >
    > ```
    > document.addEventListener('visibilitychange', function () {
    >   // 用户离开了当前页面
    >   if (document.visibilityState === 'hidden') {
    >     document.title = '页面不可见';
    >   }
    > 
    >   // 用户打开或回到页面
    >   if (document.visibilityState === 'visible') {
    >     document.title = '页面可见';
    >   }
    > });
    > ```
    >
    > 上面代码是 Page Visibility API 的最基本用法，可以监听可见性变化。
    >
    > 下面是另一个例子，一旦页面不可见，就暂停视频播放。
    >
    > ```js
    > var vidElem = document.getElementById('video-demo');
    > document.addEventListener('visibilitychange', startStopVideo);
    > 
    > function startStopVideo() {
    >   if (document.visibilityState === 'hidden') {
    >     vidElem.pause();
    >   } else if (document.visibilityState === 'visible') {
    >     vidElem.play();
    >   }
    > }
    > ```

  - #### 页面卸载

    > 下面专门讨论一下，如何正确监听页面卸载。
    >
    > 页面卸载可以分成三种情况：
    >
    > - 页面可见时，用户关闭 Tab 页或浏览器窗口。
    > - 页面可见时，用户在当前窗口前往另一个页面。
    > - 页面不可见时，用户或系统关闭浏览器窗口。
    >
    > 这三种情况，都会触发`visibilitychange`事件。前两种情况，该事件在用户离开页面时触发；最后一种情况，该事件在页面从可见状态变为不可见状态时触发。
    >
    > 由此可见，`visibilitychange`事件比`pagehide`、`beforeunload`、`unload`事件更可靠，所有情况下都会触发（从`visible`变为`hidden`）。因此，可以只监听这个事件，运行页面卸载时需要运行的代码，不用监听后面那三个事件。
    >
    > 甚至可以这样说，`unload`事件在任何情况下都不必监听，`beforeunload`事件只有一种适用场景，就是用户修改了表单，没有提交就离开当前页面。另一方面，指定了这两个事件的监听函数，浏览器就不会缓存当前页面。

- ## `Request` API

  > 浏览器原生提供 Request() 构造函数，用来构造发给服务器的 HTTP 请求。它生成的 Response 实例，可以作为`fetch()`的参数。
  >
  > 注意，构造一个 Request 对象，只是构造出一个数据结构，本身并不会发出 HTTP 请求，只有将它传入`fetch()`方法才会真的发出请求。

  - #### 构造方法

    > Request 作为构造函数的语法如下，返回一个 Request 实例对象。
    >
    > ```
    > new Request(url: String, [init: Object]): Request
    > ```
    >
    > 它的第一个参数是请求的 URL 字符串，第二个参数是一个可选的配置对象，用来构造 HTTP 请求，该对象的类型描述如下。
    >
    > ```
    > {
    >   body: Object
    >   cache: String
    >   credentials: String
    >   headers: Object
    >   integrity: String
    >   keepalive: Boolean
    >   method: String
    >   mode: String
    >   redirect:	String
    >   referrer:	String
    >   referrerPolicy: String
    >   requestMode: String
    >   requestCredentials: String
    >   signal: AbortSignal
    > }
    > ```
    >
    > 第二个参数配置对象的各个属性的含义如下。
    >
    > - `body`：HTTP 请求的数据体，必须是 Blob、BufferSource、FormData、String、URLSearchParams 类型之一。
    > - `cache`：请求的缓存模式。
    > - `credentials`：请求所用的凭证，可以设为 omit、same-origini、include。Chrome 47 之前，默认值为 same-origin；Chrome 47 之后，默认值为 include。
    > - `headers`：一个代表 HTTP 请求数据头的对象，类型为 Headers 对象实例。
    > - `integrity`：请求的资源的资源完整度验证值，比如`sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=`。
    > - `method`：HTTP 方法，一般为`GET`、`POST`、`DELETE`，默认是`GET`。
    > - `mode`：请求模式，比如 cors、no-cors、navigate，默认为 cors。
    > - `redirect`：请求所用的模式，可以设为 error、follow、manual，默认为 follow。
    > - `referrer`：请求的来源，默认为 about:client。
    >
    > 下面是两个示例。
    >
    > ```
    > // 示例一
    > const request = new Request('flowers.jpg');
    > 
    > // 示例二
    > const myInit = {
    >   method: "GET",
    >   headers: {
    >     "Content-Type": "image/jpeg",
    >   },
    >   mode: "cors",
    >   cache: "default",
    > };
    > 
    > const request = new Request('flowers.jpg', myInit);
    > ```
    >
    > `Request()`还有另一种语法，第一个参数是另一个 Request 对象，第二个参数还是一个配置对象。它返回一个新的 Request 对象，相当于对第一个参数 Request 对象进行修改。
    >
    > ```js
    > new Request(request: Request, [init: Object]): Request
    > ```

  - #### 实例属性

    > Request 实例对象的属性，大部分就是它的构造函数第二个参数配置对象的属性。
    >
    > （1）`body`
    >
    > `body`属性返回 HTTP 请求的数据体，它的值是一个 ReadableStream 对象或 null（`GET`或`HEAD`请求时没有数据体）。
    >
    > ```
    > const request = new Request('/myEndpoint', {
    >   method: "POST",
    >   body: "Hello world",
    > });
    > 
    > request.body; // ReadableStream 对象
    > ```
    >
    > 注意，Firefox 不支持该属性。
    >
    > （2）`bodyused`
    >
    > `bodyUsed`属性是一个布尔值，表示`body`是否已经被读取了。
    >
    > （3）`cache`
    >
    > `cache`属性是一个只读字符串，表示请求的缓存模式，可能的值有 default、force-cache、no-cache、no-store、only-if-cached、reload。
    >
    > （4）`credentials`
    >
    > `credentials`属性是一个只读字符串，表示跨域请求时是否携带其他域的 cookie。可能的值有 omit（不携带）、 include（携带）、same-origin（只携带同源 cookie）。
    >
    > （5）`destination`
    >
    > `destination`属性是一个字符串，表示请求内容的类型，可能的值有 ''、'audio'、'audioworklet'、'document'、'embed'、'font'、'frame'、'iframe'、'image'、'manifest'、'object'、'paintworklet'、 'report'、'script'、'sharedworker'、'style'、'track'、'video'、'worker'、'xslt' 等。
    >
    > （6）`headers`
    >
    > `headers`属性是一个只读的 Headers 实例对象，表示请求的数据头。
    >
    > （7）`integrity`
    >
    > `integrity`属性表示所请求资源的完整度的验证值。
    >
    > （8）`method`
    >
    > `method`属性是一个只读字符串，表示请求的方法（GET、POST 等）。
    >
    > （9）`mode`
    >
    > `mode`属性是一个只读字符串，用来验证是否可以有效地发出跨域请求，可能的值有 same-origin、no-cors、cors。
    >
    > （10）`redirect`
    >
    > `redirect`属性是一个只读字符串，表示重定向时的处理模式，可能的值有 follow、error、manual。
    >
    > （11）`referrer`
    >
    > `referrer`属性是一个只读字符串，表示请求的引荐 URL。
    >
    > （12）`referrerPolicy`
    >
    > `referrerPolicy`属性是一个只读字符串，决定了`referrer`属性是否要包含在请求里面的处理政策。
    >
    > （13）`signal`
    >
    > `signal`是一个只读属性，包含与当前请求相对应的中断信号 AbortSignal 对象。
    >
    > （14）`url`
    >
    > `url`是一个只读字符串，包含了当前请求的字符串。
    >
    > ```js
    > const myRequest = new Request('flowers.jpg');
    > const myURL = myRequest.url;
    > ```

  - #### 实例方法

    - ##### 取出数据体的方法

      > - `arrayBuffer()`：返回一个 Promise 对象，将 Request 的数据体作为 ArrayBuffer 对象返回。
      > - `blob()`：返回一个 Promise 对象，将 Request 的数据体作为 Blob 对象返回。
      > - `json()`：返回一个 Promise 对象，将 Request 的数据体作为 JSON 对象返回。
      > - `text()`：返回一个 Promise 对象，将 Request 的数据体作为字符串返回。
      > - `formData()`：返回一个 Promise 对象，将 Request 的数据体作为表单数据 FormData 对象返回。
      >
      > 下面是`json()`方法的一个示例。
      >
      > ```
      > const obj = { hello: "world" };
      > 
      > const request = new Request("/myEndpoint", {
      >   method: "POST",
      >   body: JSON.stringify(obj),
      > });
      > 
      > request.json().then((data) => {
      >   // 处理 JSON 数据
      > });
      > ```
      >
      > `.formData()`方法返回一个 Promise 对象，最终得到的是一个 FormData 表单对象，里面是用键值对表示的各种表单元素。该方法很少使用，因为需要拦截发给服务器的请求的场景不多，一般用在 Service Worker 拦截和处理网络请求，以修改表单数据，然后再发送到服务器。
      >
      > ```
      > self.addEventListener('fetch', event => {
      >   // 拦截表单提交请求
      >   if (
      >     event.request.method === 'POST' &&
      >     event.request.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
      >   ) {
      >     event.respondWith(handleFormSubmission(event.request));
      >   }
      > });
      > 
      > async function handleFormSubmission(request) {
      >   const formData = await request.formData();
      >   formData.append('extra-field', 'extra-value');
      > 
      >   const newRequest = new Request(request.url, {
      >     method: request.method,
      >     headers: request.headers,
      >     body: new URLSearchParams(formData)
      >   });
      > 
      >   return fetch(newRequest);
      > }
      > ```
      >
      > 上面示例中，Service Worker 拦截表单请求以后，添加了一个表单成员，再调用`fetch()`向服务器发出修改后的请求。

    - ##### `clone()`

      > `clone()`用来复制 HTTP 请求对象。
      >
      > ```js
      > const myRequest = new Request('flowers.jpg');
      > const newRequest = myRequest.clone();
      > ```

- ## `Response` API

  > 浏览器原生提供`Response()`构造函数，用来构造服务器响应。
  >
  > `fetch()`方法返回的就是一个 Response 对象。

  - #### 构造方法

    > `Response()`作为构造方法调用时，返回 Response 实例。
    >
    > ```
    > // 定义
    > new Response([body:Object, [init : Object]]): Response
    > 
    > // 用法
    > new Response()
    > new Response(body)
    > new Response(body, options)
    > ```
    >
    > 它带有两个参数，都是可选的。
    >
    > 第一个参数`body`代表服务器返回的数据体，必须是下面类型之一：ArrayBuffer、ArrayBufferView、Blob、FormData、ReadableStream、String、URLSearchParams。
    >
    > 第二个参数`init`是一个对象，代表服务器返回的数据头，类型描述如下。
    >
    > ```
    > {
    >   status: Number
    >   statusText: String
    >   headers: Object
    > }
    > ```
    >
    > 下面是一个例子。
    >
    > ```
    > const myBlob = new Blob();
    > const myOptions = { status: 200, statusText: "OK" };
    > const myResponse = new Response(myBlob, myOptions);
    > ```
    >
    > 注意，如果返回 JSON 数据，必须将其转成字符串返回。
    >
    > ```
    > const data = {
    >   hello: "world",
    > };
    > 
    > const json = JSON.stringify(data, null, 2);
    > 
    > const result = new Response(json, {
    >   headers: {
    >     "content-type": "application/json;charset=UTF-8",
    >   },
    > });
    > ```
    >
    > 上面示例中，构造一个返回 JSON 数据的 Response 对象，就必须用`JSON.stringify()`方法，将第一个参数转为字符串。

  - #### 实例属性

    - ##### `body，bodyUsed`

      > `body`属性代表数据体，是一个只读的 ReadableStream 对象。
      >
      > ```
      > const res = await fetch('/fireworks.ogv');
      > const reader = res.body.getReader();
      > 
      > let result;
      > while (!(result = await reader.read()).done) {
      >   console.log('chunk size:', result.value.byteLength);
      > }
      > ```
      >
      > 上面示例中，先建立一个 body 的读取器，然后每次读取一段数据，输出这段数据的字段长度。
      >
      > 注意，`body`是一个 Stream 对象，只能读取一次。取出所有数据以后，第二次就读不到了。
      >
      > `bodyUsed`属性是一个只读的布尔值，表示`body`属性是否已经读取。

    - ##### `headers`

      > `headers`属性代表服务器返回的数据头，是一个只读的 Headers 对象。
      >
      > ```
      > const res = await fetch('/flowers.jpg');
      > console.log(...res.headers);
      > ```
      >
      > 上面示例中，发出请求后，展开打印`res.headers`属性，即服务器回应的所有消息头。

    - ##### `ok`

      > `ok`属性是一个布尔值，表示服务器返回的状态码是否成功（200到299），该属性只读。
      >
      > ```js
      > const res1 = await fetch('https://httpbin.org/status/200');
      > console.log(res1.ok); // true
      > 
      > const res2 = await fetch('https://httpbin.org/status/404');
      > console.log(res2.ok); // false
      > ```

    - ##### `redirected`

      > `redirected`是一个布尔值，表示服务器返回的状态码是否跳转类型（301，302等），该属性只读。
      >
      > ```js
      > const res1 = await fetch('https://httpbin.org/status/200');
      > console.log(res1.redirected); // false
      > 
      > const res2 = await fetch('https://httpbin.org/status/301');
      > console.log(res2.redirected); // true
      > ```

    - ##### `status，statusText`

      > `status`属性是一个数值，代表服务器返回的状态码，该属性只读。
      >
      > ```
      > const res1 = await fetch('https://httpbin.org/status/200');
      > console.log(res1.status); // 200
      > 
      > const res2 = await fetch('https://httpbin.org/status/404');
      > console.log(res2.status); // 404
      > ```
      >
      > `statusText`属性是一个字符串，代表服务器返回的状态码的文字描述。比如，状态码200的`statusText`一般是`OK`，也可能为空。

    - ##### `type`

      > `type`属性是一个只读字符串，表示服务器回应的类型，它的值有下面几种：basic、cors、default、error、opaque、opaqueredirect。

    - ##### `url`

      > `url`属性是一个字符串，代表服务器路径，该属性只读。如果请求是重定向的，该属性就是重定向后的 URL。

  - #### 实例方法

    - ##### 数据读取

      > 以下方法可以获取服务器响应的消息体，根据返回数据的不同类型，调用相应方法。
      >
      > - .json()：返回一个 Promise 对象，最终得到一个解析后的 JSON 对象。
      > - .text()：返回一个 Promise 对象，最终得到一个字符串。
      > - .blob()：返回一个 Promise 对象，最终得到一个二进制 Blob 对象，代表某个文件整体的原始数据。
      > - .arrayBuffer()：返回一个 Promise 对象，最终得到一个 ArrayBuffer 对象，代表一段固定长度的二进制数据。
      > - .formData()：返回一个 Promise 对象，最终得到一个 FormData 对象，里面是键值对形式的表单提交数据。
      >
      > 下面是从服务器获取 JSON 数据的一个例子，使用`.json()`方法，其他几个方法的用法都大同小异。
      >
      > ```
      > async function getRedditPosts() {
      >   try {
      >     const response = await fetch('https://www.reddit.com/r/all/top.json?limit=10');
      >     const data = await response.json();
      >     const posts = data.data.children.map(child => child.data);
      >     console.log(posts.map(post => post.title));
      >   } catch (error) {
      >     console.error(error);
      >   }
      > }
      > ```
      >
      > 下面是从服务器获取二进制文件的例子，使用`.blob()`方法。
      >
      > ```
      > async function displayImageAsync() {
      >   try {
      >     const response = await fetch('https://www.example.com/image.jpg');
      >     const blob = await response.blob();
      >     const url = URL.createObjectURL(blob);
      >     const img = document.createElement('img');
      >     img.src = url;
      >     document.body.appendChild(img);
      >   } catch (error) {
      >     console.error(error);
      >   }
      > }
      > ```
      >
      > 下面是从服务器获取音频文件，直接解压播放的例子，使用`.arrayBuffer()`方法。
      >
      > ```js
      > async function playAudioAsync() {
      >   try {
      >     const response = await fetch('https://www.example.com/audio.mp3');
      >     const arrayBuffer = await response.arrayBuffer();
      >     const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
      >     const source = new AudioBufferSourceNode(new AudioContext(), { buffer: audioBuffer });
      >     source.connect(new AudioContext().destination);
      >     source.start(0);
      >   } catch (error) {
      >     console.error(error);
      >   }
      > }
      > ```

    - ##### `clone()`

      > `clone()`方法用来复制 Response 对象。
      >
      > ```
      > const res1 = await fetch('/flowers.jpg');
      > const res2 = res1.clone();
      > ```
      >
      > 复制以后，读取一个对象的数据，不会影响到另一个对象。

  - #### 静态方法

    - ##### `Response.json()`

      > `Response.json()`返回一个 Response 实例，该实例对象的数据体就是作为参数的 JSON 数据，数据头的`Content-Type`字段自动设为`application/json`。
      >
      > ```
      > Response.json(data)
      > Response.json(data, options)
      > ```
      >
      > `Response.json()`基本上就是`Response()`构造函数的变体。
      >
      > 下面是示例。
      >
      > ```js
      > const jsonResponse1 = Response.json({ my: "data" });
      > 
      > const jsonResponse2 = Response.json(
      >   { some: "data", more: "information" },
      >   { status: 307, statusText: "Temporary Redirect" },
      > );
      > ```

    - ##### `Response.error()`

      > `Response.error()`用来构造一个表示报错的服务器回应，主要用在 Service worker，表示拒绝发送。
      >
      > ```js
      > self.addEventListener('fetch', (event) => {
      >   const url = new URL(event.request.url);
      >   if (url.pathname === '/flowers.jpg') {
      >     event.respondWith(Response.error());
      >   }
      > });
      > ```

    - ##### `Response.redirect()`

      > `Response.redirect()`用来构造一个表示跳转的服务器回应，主要用在 Service worker，表示跳转到其他网址。
      >
      > ```
      > Response.redirect(url)
      > Response.redirect(url, status)
      > ```
      >
      > 这个方法的第一个参数`url`是所要跳转的目标网址，第二个参数是状态码，一般是301或302（默认值）。
      >
      > ```js
      > Response.redirect("https://www.example.com", 302);
      > ```

- ## Server-Sent Events（SSE）

  - #### 简介

    > 服务器向客户端推送数据，有很多解决方案。除了“轮询” 和 WebSocket，HTML 5 还提供了 Server-Sent Events（以下简称 SSE）。
    >
    > 一般来说，HTTP 协议只能客户端向服务器发起请求，服务器不能主动向客户端推送。但是有一种特殊情况，就是服务器向客户端声明，接下来要发送的是流信息（streaming）。也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。
    >
    > SSE 就是利用这种机制，使用流信息向浏览器推送信息。它基于 HTTP 协议，目前除了 IE/Edge，其他浏览器都支持。

  - #### 与 WebSocket 的比较

    > SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。
    >
    > 总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为 streaming 本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。
    >
    > 但是，SSE 也有自己的优点。
    >
    > - SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
    > - SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
    > - SSE 默认支持断线重连，WebSocket 需要自己实现断线重连。
    > - SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
    > - SSE 支持自定义发送的消息类型。
    >
    > 因此，两者各有特点，适合不同的场合。

  - #### 客户端 API

    - ##### `EventSource` 对象

      > SSE 的客户端 API 部署在`EventSource`对象上。下面的代码可以检测浏览器是否支持 SSE。
      >
      > ```
      > if ('EventSource' in window) {
      >   // ...
      > }
      > ```
      >
      > 使用 SSE 时，浏览器首先生成一个`EventSource`实例，向服务器发起连接。
      >
      > ```
      > var source = new EventSource(url);
      > ```
      >
      > 上面的`url`可以与当前网址同域，也可以跨域。跨域时，可以指定第二个参数，打开`withCredentials`属性，表示是否一起发送 Cookie。
      >
      > ```js
      > var source = new EventSource(url, { withCredentials: true });
      > ```

    - ##### `readyState` 属性

      > `EventSource`实例的`readyState`属性，表明连接的当前状态。该属性只读，可以取以下值。
      >
      > - 0：相当于常量`EventSource.CONNECTING`，表示连接还未建立，或者断线正在重连。
      > - 1：相当于常量`EventSource.OPEN`，表示连接已经建立，可以接受数据。
      > - 2：相当于常量`EventSource.CLOSED`，表示连接已断，且不会重连。
      >
      > ```js
      > var source = new EventSource(url);
      > console.log(source.readyState);
      > ```

    - ##### `url` 属性

      > `EventSource`实例的`url`属性返回连接的网址，该属性只读。

    - ##### `withCredentials` 属性

      > `EventSource`实例的`withCredentials`属性返回一个布尔值，表示当前实例是否开启 CORS 的`withCredentials`。该属性只读，默认是`false`。

    - ##### `onopen` 属性

      > 连接一旦建立，就会触发`open`事件，可以在`onopen`属性定义回调函数。
      >
      > ```js
      > source.onopen = function (event) {
      >   // ...
      > };
      > 
      > // 另一种写法
      > source.addEventListener('open', function (event) {
      >   // ...
      > }, false);
      > ```

    - ##### `onmessage` 属性

      > 客户端收到服务器发来的数据，就会触发`message`事件，可以在`onmessage`属性定义回调函数。
      >
      > ```
      > source.onmessage = function (event) {
      >   var data = event.data;
      >   var origin = event.origin;
      >   var lastEventId = event.lastEventId;
      >   // handle message
      > };
      > 
      > // 另一种写法
      > source.addEventListener('message', function (event) {
      >   var data = event.data;
      >   var origin = event.origin;
      >   var lastEventId = event.lastEventId;
      >   // handle message
      > }, false);
      > ```
      >
      > 上面代码中，参数对象`event`有如下属性。
      >
      > - `data`：服务器端传回的数据（文本格式）。
      > - `origin`： 服务器 URL 的域名部分，即协议、域名和端口，表示消息的来源。
      > - `lastEventId`：数据的编号，由服务器端发送。如果没有编号，这个属性为空。

    - ##### `onerror` 属性

      > 如果发生通信错误（比如连接中断），就会触发`error`事件，可以在`onerror`属性定义回调函数。
      >
      > ```js
      > source.onerror = function (event) {
      >   // handle error event
      > };
      > 
      > // 另一种写法
      > source.addEventListener('error', function (event) {
      >   // handle error event
      > }, false);
      > ```

    - ##### 自定义事件

      > 默认情况下，服务器发来的数据，总是触发浏览器`EventSource`实例的`message`事件。开发者还可以自定义 SSE 事件，这种情况下，发送回来的数据不会触发`message`事件。
      >
      > ```
      > source.addEventListener('foo', function (event) {
      >   var data = event.data;
      >   var origin = event.origin;
      >   var lastEventId = event.lastEventId;
      >   // handle message
      > }, false);
      > ```
      >
      > 上面代码中，浏览器对 SSE 的`foo`事件进行监听。如何实现服务器发送`foo`事件，请看下文。

    - ##### `close()` 方法

      > `close`方法用于关闭 SSE 连接：`source.close();`

  - #### 服务器实现

    - ##### 数据格式

      > 服务器向浏览器发送的 SSE 数据，必须是 UTF-8 编码的文本，具有如下的 HTTP 头信息。
      >
      > ```
      > Content-Type: text/event-stream
      > Cache-Control: no-cache
      > Connection: keep-alive
      > ```
      >
      > 上面三行之中，第一行的`Content-Type`必须指定 MIME 类型为`event-steam`。
      >
      > 每一次发送的信息，由若干个`message`组成，每个`message`之间用`\n\n`分隔。每个`message`内部由若干行组成，每一行都是如下格式。
      >
      > ```
      > [field]: value\n
      > ```
      >
      > 上面的`field`可以取四个值。
      >
      > - data
      > - event
      > - id
      > - retry
      >
      > 此外，还可以有冒号开头的行，表示注释。通常，服务器每隔一段时间就会向浏览器发送一个注释，保持连接不中断。
      >
      > ```
      > : This is a comment
      > ```
      >
      > 下面是一个例子。
      >
      > ```tex
      > : this is a test stream\n\n
      > 
      > data: some text\n\n
      > 
      > data: another message\n
      > data: with two lines \n\n
      > ```

    - ##### `data` 字段

      > 数据内容用`data`字段表示。
      >
      > ```
      > data:  message\n\n
      > ```
      >
      > 如果数据很长，可以分成多行，最后一行用`\n\n`结尾，前面行都用`\n`结尾。
      >
      > ```
      > data: begin message\n
      > data: continue message\n\n
      > ```
      >
      > 下面是一个发送 JSON 数据的例子。
      >
      > ```tex
      > data: {\n
      > data: "foo": "bar",\n
      > data: "baz", 555\n
      > data: }\n\n
      > ```

    - ##### `id` 字段

      > 数据标识符用`id`字段表示，相当于每一条数据的编号。
      >
      > ```
      > id: msg1\n
      > data: message\n\n
      > ```
      >
      > 浏览器用`lastEventId`属性读取这个值。一旦连接断线，浏览器会发送一个 HTTP 头，里面包含一个特殊的`Last-Event-ID`头信息，将这个值发送回来，用来帮助服务器端重建连接。因此，这个头信息可以被视为一种同步机制。

    - ##### `event` 字段

      > `event`字段表示自定义的事件类型，默认是`message`事件。浏览器可以用`addEventListener()`监听该事件。
      >
      > ```
      > event: foo\n
      > data: a foo event\n\n
      > 
      > data: an unnamed event\n\n
      > 
      > event: bar\n
      > data: a bar event\n\n
      > ```
      >
      > 上面的代码创造了三条信息。第一条的名字是`foo`，触发浏览器的`foo`事件；第二条未取名，表示默认类型，触发浏览器的`message`事件；第三条是`bar`，触发浏览器的`bar`事件。
      >
      > 下面是另一个例子。
      >
      > ```tex
      > event: userconnect
      > data: {"username": "bobby", "time": "02:33:48"}
      > 
      > event: usermessage
      > data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}
      > 
      > event: userdisconnect
      > data: {"username": "bobby", "time": "02:34:23"}
      > 
      > event: usermessage
      > data: {"username": "sean", "time": "02:34:36", "text": "Bye, bobby."}
      > ```

    - ##### `retry` 字段

      > 服务器可以用`retry`字段，指定浏览器重新发起连接的时间间隔。
      >
      > ```
      > retry: 10000\n
      > ```
      >
      > 两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错。

  - #### Node 服务器实例

    > SSE 要求服务器与浏览器保持连接。对于不同的服务器软件来说，所消耗的资源是不一样的。Apache 服务器，每个连接就是一个线程，如果要维持大量连接，势必要消耗大量资源。Node 则是所有连接都使用同一个线程，因此消耗的资源会小得多，但是这要求每个连接不能包含很耗时的操作，比如磁盘的 IO 读写。
    >
    > 下面是 Node 的 SSE 服务器[实例](http://cjihrig.com/blog/server-sent-events-in-node-js/)。
    >
    > ```js
    > var http = require("http");
    > 
    > http.createServer(function (req, res) {
    >   var fileName = "." + req.url;
    > 
    >   if (fileName === "./stream") {
    >     res.writeHead(200, {
    >       "Content-Type":"text/event-stream",
    >       "Cache-Control":"no-cache",
    >       "Connection":"keep-alive",
    >       "Access-Control-Allow-Origin": '*',
    >     });
    >     res.write("retry: 10000\n");
    >     res.write("event: connecttime\n");
    >     res.write("data: " + (new Date()) + "\n\n");
    >     res.write("data: " + (new Date()) + "\n\n");
    > 
    >     interval = setInterval(function () {
    >       res.write("data: " + (new Date()) + "\n\n");
    >     }, 1000);
    > 
    >     req.connection.addListener("close", function () {
    >       clearInterval(interval);
    >     }, false);
    >   }
    > }).listen(8844, "127.0.0.1");
    > ```

------

