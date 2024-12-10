# TypeScript

------

- ### TS简介

  > - TS是由微软开发的一款，基于JS的一个扩展语言。它包含了JS的所有内容，是JS的超集。
  > - TS在JS的基础上增加了静态类型检查、接口、泛型等很多现代开发语言的特性，因此更适合大型项目的开发。
  > - TS代码必须先编译为JS才能运行。

- ### 为什么要用TS

  > JS当年“出身简陋”，没考虑到如今的应用场景和代码量，在编写大型项目时会有很多困扰：
  >
  > - 不清不楚的数据类型。
  > - 有漏洞的逻辑。
  > - 访问不存在的属性。
  > - 低级的拼写错误。
  >
  > **使用TS就可以避免以上问题：**
  >
  > - TS代码在运行前会先进行编译，编译时就可以发现代码的错误或不合理之处从而减小运行时出现异常的概率，这是TS这种**静态类型检查语言**的好处。
  > - 虽然同样的功能TS的代码量远远大于JS，但由于TS的代码结构更清晰，在后期的维护中TS远胜于JS。

- ### 运行TS

  - ##### 手动编译：

    > 1. npm安装TS的编译器：`npm i -g typescript`
    > 2. 编译TS源代码（`.ts`结尾）：`tsc demo.ts`
    >
    > 此时就会在当前目录下生成一个`demo.js`文件，就可以在浏览器或Node中运行了。
    >
    > *（VSCode中也可以用Code Runner插件来有右键直接运行一个TS文件，但需要全局安装node和ts-node两个包）*
    >
    > 关于`ts-node`工具：它是一个非官方的、用于直接运行TS代码的工具，使用：
    >
    > 1. 全局安装：`npm install -g ts-node`
    > 2. 直接执行TS代码：`ts-node a.ts`
    >
    > 如果不全局安装`ts-node`，也可以通过`npx`调用它来运行TS代码：`npx ts-node a.ts`，`npx`会在线调用 ts-node工具，从而在不安装的情况下运行TS代码。如果执行 ts-node 命令不带有任何参数，它会提供一个 TypeScript 的命令行 REPL 运行环境，你可以在这个环境中输入 TypeScript 代码，逐行执行。

  - ##### 自动化编译：

    > 1. 在项目根目录下创建TS编译的配置文件：`tsc --init`
    >
    >    > 此时会在当前目录下生成一个`tsconfig.json`配置文件，其中包含着很多编译时的配置。
    >
    >    > **TIP：**
    >    >
    >    > - jsconfig.json文件是VSCode中的，旨在为纯 JavaScript 项目提供类似TS的配置功能。该文件的出现时间稍晚于 tsconfig.json，大约在 2015 年左右。
    >    > - 也可以将jsconfig.json看作是tsconfig.json的简化版。因为jsconfig.json的许多概念和功能是从tsconfig.json中演变而来的。jsconfig.json是tsconfig.json与`"allowJs"`属性设置为`true`。
    >    > - jsconfig.json是为了满足纯 JavaScript 项目的需求而创建的，它继承了tsconfig.json的许多配置项，并简化了一些不需要的选项。
    >
    > 2. 监视根目录下所有层级的`.ts/.tsx`文件的变化，只要发生变化就自动编译：`tsc --watch`。生成的js文件默认放在了和ts源文件同一目录下。
    >
    > 3. （小优化，可选）当编译出错时不生成js文件，在`tsconfig.json`中：（注意：一般用于当作配置文件的json里面可以写注释）
    >
    >    ```json
    >    {
    >        "compilerOptions": {
    >            "noEmitOnError": true,
    >        }
    >    }
    >    ```

  - ##### tsc 常用编译参数如下表所示：

    | 序号 |                         编译参数说明                         |
    | :--: | :----------------------------------------------------------: |
    |  1.  |                   **--help**显示帮助信息。                   |
    |  2.  |                  **--module**载入扩展模块。                  |
    |  3.  |                 **--target**设置 ECMA 版本。                 |
    |  4.  | **--declaration**额外生成一个 .d.ts 扩展名的文件。`tsc ts-hw.ts --declaration`以上命令会生成 ts-hw.d.ts、ts-hw.js 两个文件。 |
    |  5.  |              **--removeComments**删除文件的注释              |
    |  6.  |         **--out**编译多个文件并合并到一个输出的文件          |
    |  7.  | **--sourcemap**生成一个`.map`文件。.map文件是一个存储源代码与编译代码对应位置映射的信息文件。 |
    |  8.  | **--module noImplicitAny**在表达式和声明上有隐含的 any 类型时报错 |
    |  9.  | **--watch**在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。 |

- ### 关于TS

  > - TS主要学的就是如何写类型。TS中的类型大致分为：**基本类型、高级类型、内置类型、自定义类型、类型体操**。
  > - TS是用来做类型检测的，只是提示作用，只在编译阶段有效，和运行阶段无关。
  > - TS代码编译之后我们写的类型就消失了。但并不是说白写了，编译后可以选择给我们写的TS代码生成单独的`*.d.ts`**类型声明文件**。
  > - 写TS就是不断的在给变量添加类型约束，约束我们程序员，这个变量是有类型的，别乱赋值影响后期维护避免bug。但并不是说所有变量都需要加类型，也麻烦。TS多数情况下会进行**自动类型推断**，根据赋的值确定变量的类型，推断不出来的再手动写出来。
  > - 需要注意的是，虽然ES6支持类，但TS编译器仍会将`.ts`代码中的类、ESM模块的代码，编译为兼容性更好的JS代码。（而JS中ES6语法的代码一般会通过打包/构建工具（webpack、esbuild）去做兼容性处理）
  > - TypeScript 提前支持了一些还未在所有环境中普及的 ES 特性，如装饰器（Decorators）、异步迭代器等，且能够将其编译成兼容的 JavaScript 版本。
  > - TS支持**函数重载**，根据函数名和参数列表来决定是否是同一个函数。（JS通过判断arguments的类型来实现重载）

- ### 类型声明

  > TS规定：定义变量时，必须为其声明类型：`let a: string`。此时a只能存字符串。函数的形参、返回值同样如此：
  >
  > ```ts
  > // 此时调用该函数时，必须传2个number型作为参数，不能多也不能少。且该函数返回值也是number型
  > function demo (x: number, y: number): number{
  > 	return x + y
  > }
  > ```
  >
  > **类型的兼容：**
  >
  > TypeScript 的类型存在兼容关系（类似于集合），某些类型可以兼容其他类型：
  >
  > ```ts
  > type T = number | string
  > let a: number = 1
  > let b: T = a
  > ```
  >
  > - 上面示例中，变量`a`和`b`的类型是不一样的，但是变量`a`赋值给变量`b`并不会报错。这时，我们就认为，`b`的类型兼容`a`的类型（b类型的集合包含a类型的集合）。TypeScript 为这种情况定义了一个专门术语。如果类型`A`的值可以赋值给类型`B`，那么类型`A`就称为类型`B`的**子类型（subtype）**。在上例中，类型`number`就是类型`number|string`的子类型。
  > - 类似于其他静态类型语言，TypeScript 中凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。
  > - 之所以有这样的规则，是因为子类型继承了父类型的所有特征，所以可以用在父类型的场合。但是，子类型还可能有一些父类型没有的特征，对父类型做了扩展，所以父类型不能用在子类型的场合。

- ### 类型推断

  > - 当类型没有给出时，TypeScript 编译器利用**自动类型推断**来推断变量的类型：
  >
  >   ```ts
  >   var num = 2  // 类型推断为 number
  >   ```
  >
  > - 对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`。应尽量避免any。
  >

- ### 类型断言

  > 类型断言可以让开发者明确告诉编译器变量的类型，常用于无法推断的情况。可以使用`as`或`<类型>`：（尖括号断言会在JSX中失效）
  >
  > ```ts
  > let someValue: any = "this is a string"
  > let strLength: number = (someValue as String).length
  > // 或者：(<String>someValue).length
  > ```
  >
  > **需要注意的是：**
  >
  > - 当 S 类型是 T 类型的子集，或 T 是 S 的子集时，S 才能被断言成 T。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以直接用 any。
  > - 也可以进行多重类型断言：`(obj as string) as any`，但要少用，因为它会破坏原有的关系。
  > - 和强制类型转换不同的是，类型断言是一个纯编译时语法，也是一种为编译器提供关于如何分析代码的方法。

- ### 非空断言、可选链、空值合并运算符

  > `!`是TS中的**非空断言运算符**，用于告诉编译器某个变量一定不是`null`或`undefined`，从而避免类型检查错误。用法：`变量!`。
  >
  > 以下两个运算符均为ES11的语法：
  >
  > - `?`是TS中的**可选链运算符**，当变量不为`null`或`undefined`时再继续去取值：
  >
  >   ```ts
  >   let user = { name: "Alice", address: { city: "Wonderland" } }
  >   console.log(user?.address?.city)  // 如果 address 存在则输出 city，否则返回 undefined
  >   ```
  >
  > - `??`是TS中的**空值合并**运算符，当变量为`null`或`undefined`时，返回后面的值。用法：
  >
  >   ```ts
  >   let value = null
  >   console.log(value ?? "default")  // 如果 value 为 null 或 undefined，则返回 "default"
  >   ```
  >
  > ###### 通过这3个运算符可以简化对代码中可能出现的空值情况的处理。

- ### TS中的类型

  - ##### 基本类型：

    - JS中的`undefined、string、symbol、object、null、number、boolean、bigint`等基础类型，都作为TS的基本类型。需要说明的是：

      > - object：表示字面量类型的对象，*对象、函数、数组*都属于普通字面量对象（引用类型），它适用于复杂的对象结构。如果用object来限制一个变量，那么这个变量除了基本类型之外，可以赋任意的值，因为数组、函数等都属于object类型。这种在实际开发中用的很少，因为限制范围太大了，我们通常用*接口*来限制对象：
      >
      >   ```ts
      >   // 表示person是一个有name是属性的对象，age属性可选，还可以有任意数量的其他属性（any不限类型）
      >   let person: { name:string; age?:number; [key:string]:any }  // 分隔符可以是, ; Enter
      >   ```
      >
      >   **注意**：TS中的`?`表示age参数是可选的。
      >
      > - Object：大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有能访问到Object原型上的都是`Object`类型。这囊括了几乎所有的值，因此很少用（除了null和undefined）。
      >
      > - 数组类型：`let arr: string[]`或`let arr: Array<string>`（后面说泛型）。`T[][]`表示二维数组，其中`T`是最底层数组成员的类型，其中每个一维数组中必须保存T类型的值。
      >
      > - `Function`函数类型：`let count: (x: number, y: number) => number`，仅存储这种形式的函数。
      >
      >   ```ts
      >   // 仅声明函数的类型：
      >   function toArray(v: string): string[]
      >   ```
      >
      > - null和undefined：分别表示*空值*和*未定义*。在默认情况下，它们是所有类型的子类型，可以赋给任何变量，但可以通过 strictNullChecks 来开启空检查，使其只能赋值null/undefined。
      >
      > - 大String和小string是不同的TS类型，其中大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。（建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错）
      >
      > - symbol 类型和 bigint 类型无法获取它们的包装对象。即`Symbol()`和`BigInt()`不能作为构造函数使用，所以没有办法直接获得 symbol 类型和 bigint 类型的包装对象，因此`Symbol`和`BigInt`这两个类型虽然在TS中存在，但是目前没用。
      >
      
    - 除此之外还增加了以下几个基本类型：（其中枚举类型也是枚举值/枚举常量）
  
      - **any：**表示任何类型，范围最大，适合不确定数据类型的情况。使用时需谨慎，因为 any 会绕过类型检查。从集合的角度看，`any`类型可以看成是所有其他类型的全集，包含了一切可能的类型。TS将这种类型称为“顶层类型”（top type），意为涵盖了所有下层。
  
        > ###### any是 TS 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况：
        >
        > 1. 变量的值会任意改变时。
        > 2. 定义存储各种类型数据的数组时（`let a: any[]`）。
        > 3. 改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查。
        >
        > **注意：**
        >
        > 1. 没有给变量显示的声明类型（自动类型推断也没起作用），那么它的类型其实就是any。如：`let a`相当于`let a: any`
        >
        > 2. any类型的变量可以赋值给任意类型的变量：（any存在**污染问题**）
        >
        >    ```ts
        >    let a: any
        >    a = 99
        >    let s: string
        >    s = a // 明明s要求是string型，但是any型变量的值也可以赋给s
        >    ```
        >
        > 3. 开发中尽量少用any，大量的使用any相当于写的不是TypeScript，而是AnyScript。
      
      - **unknown：**为了解决`any`“污染”其他变量的问题，TS3.0引入了`unknown`。它与`any`含义相同，表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像`any`那样自由，可以视为严格版的`any`。`unknown`跟`any`的相似之处在于，所有类型的值都可以分配给`unknown`类型（范围最大）；不同之处在于，它不能直接使用，主要有以下几个限制：
      
        > 1. 首先，`unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`和`unknown`类型）。这就避免了污染问题，从而克服了`any`的一大缺点。
        > 2. 其次，不能直接调用`unknown`类型变量的方法和属性。
        > 3. 最后，`unknown`类型变量能够进行的运算是有限的，只能进行比较运算（`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`和`instanceof`运算符这几种，其他运算都会报错。
        >
        > 那么怎么才能使用`unknown`类型变量呢？答案是，只有经过“类型缩小”，`unknown`类型变量才可以使用。所谓“类型缩小”，就是缩小`unknown`变量的类型范围，给其指定确定的类型，确保不会出错。
        >
        > 这样设计的目的是，只有明确`unknown`变量的实际类型，才允许使用它，防止像`any`那样可以随意乱用，“污染”其他变量。
        >
        > 总之，`unknown`可以看作是更安全的`any`。一般来说，凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型。在集合论上，`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`一样，也属于 TypeScript 的顶层类型。
      
      - **never**：为了保持与集合论的对应关系，以及类型运算的完整性，TS引入了“空类型”的概念，即该类型为空（空集），不包含任何值。即*never是其它所有类型的子类型（包括 null 和 undefined）*。表示**任何值都不是**，不存在这样的类型。这意味着声明为`never`类型的变量只能被`never`类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）。
      
        > - 几乎不用never去直接限制变量，因为没有意义。
        > - never一般是TS主动推断出来的。
        > - never一般用于限制函数的返回值类型，如果一个函数的返回值类型为never，那么该函数不能顺利的执行结束。
        > - `never`类型是任何其他类型所包含的，TypeScript 把这种情况称为“底层类型”（bottom type）。
      
      - **字面量类型/值类型**：字面量类型可以让变量只能拥有特定的值，通常结合union来定义变量的特定状态：
      
        ```ts
        let direction: "up" | "down" | "left" | 2 | boolean
        direction = "up"
        ```
      
        **注意**：const定义的变量意味着不会被修改，因此`const a = 1`此时a是字面量类型1。
      
      - **union联合类型**：表示一个变量可以是多种类型之一。通过`|`符号实现：`let id: string | number`。
      
      - **交叉类型**：取多个类型的交集，用符号`&`表示：`let x: number & string`。此时变量`x`必须同时是数值和字符串，这当然是不可能的，所以 TypeScript 会认为`x`的类型是`never`。交叉类型表示对象的合成：
      
        ```ts
        let obj: { foo: string } & { bar: string }  // 表示对象中必须包含foo和bar两个属性
        obj = {
            foo: "hello",
            bar: "world",
        }
        ```
      
        > 再比如为对象类型添加新属性：
      
        ```ts
        type A = { foo: number }
        type B = A & { bar: number }
        ```
      
      - **void：**它通常用于声明函数的返回值，含义：函数返回值为空（或undefined），调用者不应该依赖其返回值进行任何操作。如：
      
        ```ts
        function demo(): void { console.log('hello') }
        let result = demo()
        if(result){} // 这行代码会编译报错：demo函数没有返回值，不应该拿着空的返回值去做任何操作
        ```
      
        > **一个特殊情况**：当声明函数的返回值为void时，TS并不会严格要求函数返回空，这个返回值别用就行：
        >
        > ```ts
        > let f1: () => void = () => { return 666 }  // 这里不会报错
        > ```
        >
        > 这是因为：箭头函数省略大括号时，默认会有返回值，此时如果严格限制了，那么箭头函数就不能用简写形式了。因此TS并不严格限制函数返回空。
      
      - **tuple（元组）：**它是一种特殊的**定长的**数组类型，它按序规定了数组中每个元素的类型。用于精确描述一组值。如：
      
        ```ts
        let a: [string, number, boolean] = ['1', 2, true]  // 定长的数组，不按照要求push会报错
        ```
      
        > - `?`表示元素是可选的，可选的必须都放在最后。如：`let a: [string, number?]`。
        >
        > - 还可以用展开运算符，后面跟数组或元组类型，表示不限数量的元组：`let a: [string, ...string[]]`。（扩展运算符用在元组的任意位置都可以）
        >
        > - 给元组的索引起别名：`let a: [a:string, b:number]`。
        >
        > - 通过`as const`断言，TypeScript会将该元组视为一个不可变的常量元组：
        >
        >   ```ts
        >   let tuple = [42, "Hello"] as const  // 元组类型：[42, "Hello"]
        >   ```
        >
        > - 还可以用展开运算符可以轻松地将多个元组合并成一个新的元组：
        >
        >   ```ts
        >   let tuple1: [number, string] = [42, "Hello"]
        >   let tuple2: [boolean] = [true]
        >   let extendedTuple: [number, string, ...typeof tuple2] = [42, "Hello", ...tuple2]
        >   console.log(extendedTuple)  // 输出: [42, "Hello", true]
        >   ```
      
      - **enum（枚举值/枚举类型）：**TS中新增了枚举值，它可以定义**一组命名常量**。编译后生成的是JS对象，也叫**对象枚举**。
      
        - **数字枚举**：它是一种最常见的枚举类型，其枚举成员的值是数字且会自动递增，具备反向映射的特点。
      
          ```ts
          enum Direction { UP,DOWN,LEFT,RIGHT }
          Direction.LEFT  // 值为2
          Direction[0]  // 值为0
          // 一般会指定枚举的值
          enum Direction { UP=1, DOWN, LEFT, RIGHT=12 }
          ```
      
        - **字符串枚举**：枚举成员的值是字符串，字符串枚举没有反向映射，也就是不能这样：`Direction[0]`
      
          ```ts
          enum Direction { UP='up', DOWN='down', LEFT='left', RIGHT='right' }
          ```
      
        - **常量枚举**：一种特殊的、用const定义的枚举，在编译时会被换掉，不会产生定义枚举的代码，提高性能。
      
          ```ts
          const enum Direction { UP='up', DOWN='down', LEFT='left', RIGHT='right' }
          ```
  
  - ##### 类型别名：
  
    > - 类型别名 (`type`) 可以为复杂的类型定义简短的别名，便于在代码中引用，使代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展：（类型别名默认有变量提升，声明位置在*当前块级作用域的顶部*）
    >
    >   ```ts
    >   type Status = number | string
    >   let a: Status
    >   a = 1
    >   a = '404'
    >   ```
    >
    > - TS中的`typeof`关键字还可以用于提取变量的TS类型：（`typeof`后面只能是标识符，不能是表达式和类型）
    >
    >   ```ts
    >   const a = { x: 0 }
    >   type T0 = typeof a  // { x: number }
    >   type T1 = typeof a.x  // number
    >   ```
    >
    > - `keyof`关键字可以将对象中的所有key提取为字符串的联合类型：
    >
    >   ```ts
    >   type MyKeys = keyof obj  // 此时MyKeys的类型为：'name' | 'age' 的联合类型
    >   ```
  
  - ##### 高级类型：
  
    - **接口（interface）**：接口是一种定义结构的方式，主要作用是为类、对象、函数等，规定一种契约，这样可以确保代码的一致性和安全性。但要注意：接口只能定义格式不能包含任何的实现。TS中定义接口：
  
      > - 定义类的接口：
      >
      >   ```ts
      >   interface Person {
      >       name: string;  // 分隔符可以是; , Enter
      >       age: number,
      >       speak(n: number): void
      >   }
      >   class Student implements Person {
      >       constructor(public name: string, public age: number){}
      >       speak(n: number): void {
      >       	console.log('hello')
      >       }
      >   }
      >   ```
      >
      > - 定义对象的接口：
      >
      >   ```ts
      >   interface Person {
      >       readonly name: string
      >       age?: number,   // 可有可无，相当于：age: number | undefined
      >       speak: (n: number) => void
      >   }
      >   const xiaoming: Person = {
      >       name: '小明',
      >       age: 14,
      >       speak(n){
      >       	console.log('hello')
      >       }
      >   }
      >   ```
      >
      > - 定义函数的接口：
      >
      >   ```ts
      >   interface Count {
      >   	(a: number, b: number): number
      >   }
      >   const count: Count = (x,y)=>{ return x+y }
      >   ```
  
      > 接口的自动合并（可合并性）：
      >
      > ```ts
      > interface Person {
      > 	name: string
      > }
      > interface Person {
      > 	age: number
      > }
      > const p: Person = {
      >     name: '张三',
      >     age: 11
      > }
      > ```
      >
      > 接口中我们还可以将数组的索引值和元素设置为不同类型。索引值可以是数字或字符串。
      >
      > ```ts
      > // 设置元素为字符串类型
      > interface namelist { 
      >    [index: number]: string 
      > }
      > // 类型一致，正确
      > var list2: namelist = ["Google","Runoob","Taobao"]
      > // 错误元素 1 不是 string 类型
      > // var list2: namelist = ["Runoob",1,"Taobao"]
      > ```
      >
      > **接口继承**：接口继承就是说接口可以通过继承其他接口来扩展自己。Typescript 允许接口继承多个接口，继承使用关键字**extends**。继承语法格式：`接口名 extends 接口1,接口2,.. {}`。
  
    - **类（class）**：TypeScript 是面向对象的 JavaScript。类描述了所创建的对象共同的属性和方法。TypeScript 支持面向对象的所有特性，比如 类、接口等。TypeScript 类定义方式：`class 类名 {}`。类中包含*属性、方法、构造器*。
  
      > - **（类中）属性的简写形式**：（类中的override关键字）
      >
      >   - 简写前：
      >
      >     ```ts
      >     class Person {
      >         public name: string
      >         public age: number
      >         constructor(name: string, age: number){
      >         	this.name = name  // 使用this.name时，name必须在类中提前声明好
      >         	this.age = age
      >         }
      >     }
      >     ```
      >
      >   - 简写后：
      >
      >     ```ts
      >     class Person {
      >         // 此时this.name = name可以省略
      >     	constructor(public name: string, public age: number){}
      >     }
      >     ```
      >
      > - **类的继承**：TypeScript 的类支持单继承，类继承使用关键字**extends**。子类除了不能继承父类的私有成员，其他的都可以继承。语法格式：`class A extends 类名 {}`。
      >
      > - **方法重写**：类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。其中**super**指向父类的引用，使子类能访问到父类的属性和方法（私有的除外）。
      >
      > - **类中的访问控制权限修饰符**：TypeScript 中，可以用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限：
      >
      >   - **public（默认）**：公开的，可以在任何地方被访问。
      >   - **protected**：受保护的，可以被其自身以及其子类访问。
      >   - **private**：私有的，只能在本类体中使用。
      >
      >   > 还有一个`readonly`修饰符，用于设置*只读属性*，在访问控制权限修饰符和属性名之间加：`public readonly name: string`
      >
      > - **类和接口**：类可以实现接口，使用关键字`implements`，此时类中必须包含接口中定义的所有属性。
      >
      > - **鸭子类型（Duck Typing）**：鸭子类型是动态类型语言中的一种风格，是多态（polymorphism）的一种表现形式。在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由*当前对象中所有的方法和属性*来决定。
      >
      >   > 可以这样表述："当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。"
      >
      >   应用到编程中，这意味着：
      >
      >   - **不关心对象是什么**：在鸭子类型中，我们不关心一个对象的具体类型是什么，只关心它能否完成我们需要的操作。
      >   - **动态检查**：在运行时，系统会检查对象是否具有所需的方法或属性，而不是在编译时检查其类型。
      >   - **灵活性高**：这种方式使得代码更加灵活，可以更容易地扩展和修改。
      >
      >   > 举例说明：
      >   >
      >   > 假设你有一个函数 `makeSound`，它接受一个对象并调用其 `quack` 方法：
      >   >
      >   > ```ts
      >   > function makeSound(duck: any) {
      >   > 	duck.quack()
      >   > }
      >   > ```
      >   >
      >   > 在这个例子中，我们不关心传入的对象具体是什么类型，只要它有`quack`方法即可。如果传入的对象有一个`quack`方法，那么这个函数就能正常工作。因此参数duck设置为any。但是如果将duck参数的类型指定为`Duck`，那么就必须确保传入的对象实现了`Duck`接口，否则编译报错。
      >   >
      >   > 总之：鸭子类型强调的是对象的行为而不是其类型，这使得代码更加灵活和动态。
  
    - **抽象类（abstract class）**：
  
      > - TS支持抽象类，抽象类是一种无法被实例化的类，专门用来定义类的结构和行为。
      > - 抽象类中可以写抽象方法，也可以有具体的实现。
      > - 抽象类主要用来为其派生类提供一个基础结构，是用来被派生类继承的。继承时要求其派生类必须实现其中的抽象方法。
      > - 抽象类的派生类也可以是抽象类，此时可以不实现其中的抽象方法。
      > - 抽象类的作用？
      >   - 定义通用接口
      >   - 提供基础实现
      >   - 确保关键实现
      >   - 共享代码和逻辑
  
      ```ts
      abstract class Package {
          abstract calculate(): number
          printPackage(){ console.log('打印包裹重量') }
      }
      class StandPackage extends Package {
      	override calculate(): number { return 100 }
      }
      ```
  
    - **泛型（Generics）**：泛型是一种编程语言特性，允许在定义*函数、类、接口*等时使用占位符来表示类型，而不是具体的类型。将类型参数化，使代码可以适应不同的类型需求，同时保持类型安全。泛型是一种在编写可重用、灵活且类型安全的代码时非常有用的功能。泛型的优势包括：
  
      - **代码重用：** 可以编写与特定类型无关的通用代码，提高代码的复用性。
      - **类型安全：** 在编译时进行类型检查，避免在运行时出现类型错误。
      - **抽象性：** 允许编写更抽象和通用的代码，适应不同的数据类型和数据结构。
  
      > 泛型函数：
      >
      > ```ts
      > function log<K,V>(k: T, v: V) {
      > 	console.log(k,v)
      > }
      > log<string,number>('hello',100)
      > ```
      >
      > 泛型接口：
      >
      > ```ts
      > interface Person<T,U> {
      >     name: T
      >     age: U
      > }
      > let p: Person<string,number> = { name: 'zs', age: 13, }
      > ```
      >
      > 泛型类：
      >
      > ```ts
      > class Person<T> {
      >     constructor(public name: T, public age: U){}
      > }
      > let p = new Person<string,number>('zs', 13)
      > ```
  
      > **泛型约束**：有时候你想限制泛型的类型范围，可以使用泛型约束，使用`extends`（不能用`super`）。
      >
      > ```ts
      > interface Lengthwise {
      >     length: number;
      > }
      > function f1<T extends Lengthwise>(arg: T): void {
      >     console.log(arg.length)
      > }
      > ```
      >
      > **泛型默认值**：可以给泛型设置默认值，使得在不指定类型参数时能够使用默认类型。
      >
      > ```ts
      > function f1<T = string>(arg: T): T {
      >     return arg
      > }
      > ```
  
  - ##### 内置类型：
  
  - ##### 自定义类型：
  
  - ##### 类型体操：



> 交叉类型：它允许将多个类型合并为一个类型，合并后的类型将拥有**所有被合并类型的成员**。（通常用于交叉对象类型）
>
> ```ts
> type Area = {
>    	height: number;
>    	width: number;
> }
> type Address = {
> 	room: number;
>    	floor: number;
>    }
> type House = Area & Address
> const h: House = {
>        room: 1,
>        floor: 2,
>        height: 300,
>        width: 200
>    }
> ```

- ------

### 类型守卫

> TypeScript 提供了类型守卫，可以在代码中检查变量类型，帮助编译器推断更加具体的类型。这对于联合类型尤为重要。
>
> ```ts
> function printId(id: string | number) {
>        if (typeof id === "string") {
>        	console.log(id.toUpperCase())
>        } else {
>        	console.log(id.toFixed(2))
>        }
> }
> ```

### 类型兼容性和工具类型

> TypeScript 提供了一些工具类型，如 `Partial`、`Pick`、`Readonly`、`Record` 等，这些类型可以帮助生成新的类型，简化类型定义。
>
> ```ts
> interface Todo {
>       title: string;
>       description: string;
> }
> 
> let partialTodo: Partial<Todo> = { title: "Learn TypeScript" }; // 可选属性
> ```

### 模块和命名空间

> TypeScript 提供了基于 ES6 的模块系统，使用`import`和`export`导入和导出模块。此外，TypeScript 还支持命名空间（Namespace），用于组织代码和避免命名冲突。

- ------

  ### 类型声明文件

  > 以`.d.ts`后缀结尾的文件是TS中的**类型定义文件**，作用是为现有的JS代码提供类型声明。这使得TS能够在使用第三方JS库时进行类型检查和提示。

  > demo.js：
  >
  > ```js
  > export function add(a,b){ return a+b }
  > export function mul(a,b){ return a*b }
  > ```
  >
  > demo.d.ts：（文件名必须和import导入的模块名保持一致）
  >
  > ```ts
  > declare function add(a:number, b:number): number
  > declare function mul(a:number, b:number): number
  > export {add,mul}
  > ```
  >
  > index.js：
  >
  > ```js
  > import { add,mul } from './demo.js' // 如果没有“demo.d.ts”则会报错：无法找到模块“./demo.js”的类型声明文件
  > console.log(add(1,2))
  > console.log(mul(1,2))
  > ```

  > 实际开发中，类型声明文件通常放在`@types`目录下。（import导入TS的类型时，为了将类型声明和值区分开，TS最新规范要求，类型前必须加type关键字：`import {type Person} from '@/types/index.ts'`）

------

