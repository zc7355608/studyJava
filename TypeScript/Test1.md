# TypeScript

------

- ### TS简介

  > - TypeScript（简称 TS）是微软公司开发的基于 JavaScript （简称 JS）语言的编程语言。它的目的并不是创造一种全新语言，而是增强 JavaScript 的功能，使其更适合多人合作的企业级项目。
  > - TypeScript 可以看成是 JavaScript 的超集（superset），即它继承了后者的全部语法，所有 JavaScript 脚本都可以当作 TypeScript 脚本（虽然可能提示报错），此外它再增加了一些自己的语法。
  > - TypeScript 对 JavaScript 添加的最主要部分，就是一个独立的类型系统。
  > - **TS代码必须先编译为JS才能运行。**

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
    > 2. 编译TS源代码（`.ts`结尾）：`tsc demo.ts`（此时默认会在当前目录下生成一个`demo.js`文件）
    >
    
    > *（VSCode中也可以用Code Runner插件来右键直接运行一个TS文件，但需要全局安装node和ts-node两个包）*
    > 
    >关于`ts-node`工具：它是一个非官方的、用于直接运行TS代码的工具，使用：
    > 
    >1. 全局安装：`npm install -g ts-node`
    > 2. 直接执行TS代码：`ts-node a.ts`
    >
    > 如果不全局安装`ts-node`，也可以通过`npx`调用它来运行TS代码：`npx ts-node a.ts`，`npx`会在线调用 ts-node工具，从而在不安装的情况下运行TS代码。如果执行 ts-node 命令不带有任何参数，它会提供一个 TypeScript 的命令行 REPL 运行环境，你可以在这个环境中输入 TS 代码，逐步逐行执行。

- ##### 自动化编译：

  1. 在项目根目录下创建TS编译的配置文件：`tsc --init`

     > 此时会在当前目录下生成一个`tsconfig.json`配置文件（后面会详细说），其中包含着很多编译时的配置。tsc命令编译时会自动在当前目录下找该文件，根据文件中的配置项来决定编译时如何处理。

     > **TIP：**
     >
     > - jsconfig.json文件是VSCode中的，旨在为纯 JavaScript 项目提供类似TS的配置功能。该文件的出现时间稍晚于 tsconfig.json，大约在 2015 年左右。
     > - 也可以将jsconfig.json看作是tsconfig.json的简化版。因为jsconfig.json的许多概念和功能是从tsconfig.json中演变而来的。jsconfig.json是tsconfig.json与`"allowJs"`属性设置为`true`。
     > - jsconfig.json是为了满足纯 JavaScript 项目的需求而创建的，它继承了tsconfig.json的许多配置项，并简化了一些不需要的选项。

  2. 监视根目录下所有层级的`.ts/.tsx`文件的变化，只要发生变化就自动编译：`tsc --watch`。生成的js文件默认放在了和ts源文件同一目录下。

  3. （小优化，可选）TS 文件报错时，编译后不生成 JS 文件，在`tsconfig.json`中：（注意：一般用于当作配置文件的json里面可以写注释）

     ```json
     {
         "compilerOptions": {
             "noEmitOnError": true,
             // "noEmit": true,  // 仅当类型报错时，编译后不生成JS文件
         }
     }
     ```

  > ##### tsc 常用编译参数如下表所示：
  >
  > | 序号 |                         编译参数说明                         |
  > | :--: | :----------------------------------------------------------: |
  > |  1.  |                   **--help**显示帮助信息。                   |
  > |  2.  |                  **--module**载入扩展模块。                  |
  > |  3.  |                 **--target**设置 ECMA 版本。                 |
  > |  4.  | **--declaration**额外生成一个 .d.ts 扩展名的文件。`tsc ts-hw.ts --declaration`以上命令会生成 ts-hw.d.ts、ts-hw.js 两个文件。 |
  > |  5.  |              **--removeComments**删除文件的注释              |
  > |  6.  |         **--out**编译多个文件并合并到一个输出的文件          |
  > |  7.  | **--sourcemap**生成一个`.map`文件。.map文件是一个存储源代码与编译代码对应位置映射的信息文件。 |
  > |  8.  | **--module noImplicitAny**在表达式和声明上有隐含的 any 类型时报错 |
  > |  9.  | **--watch**在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。 |

- ### 关于TS

  > - TS是用来做类型检测的，只是提示作用，只在编译阶段有效，和运行阶段无关。
  > - JavaScript 的运行环境（浏览器或 Node.js）不认识 TypeScript 代码。所以，TypeScript 项目要想运行，必须先转为 JavaScript 代码，这个代码转换的过程就叫做“编译”（compile）。
  > - TypeScript 官方没有做运行环境，只提供编译器。编译时，会将类型声明和类型相关的代码全部删除，只留下能运行的 JavaScript 代码，并且不会改变 JavaScript 的运行结果。因此，TypeScript 的类型检查只是编译时的类型检查，而不是运行时的类型检查。一旦代码编译为 JavaScript，运行时就不再检查类型了。
  > - TS代码编译之后我们写的类型就消失了。但并不是说白写了，编译后可以选择给我们写的TS代码生成单独的`*.d.ts`**类型声明文件**（关于类型声明文件的作用，后面会说）。
  > - 我们学习 TS 主要学的就是如何写类型（如何给变量加约束）。TS中的类型大致分为：**基本类型、高级类型、内置类型、自定义类型、类型体操**。

  > **TIP：**
  >
  > - 需要注意的是，虽然ES6支持类，但TS编译器仍会将`.ts`代码中的类、ESM模块的代码，编译为兼容性更好的JS代码。（而JS中ES6语法的代码一般会通过打包/构建工具（webpack、esbuild）去做兼容性处理）
  > - TypeScript 提前支持了一些还未在所有环境中普及的 ES 新特性，如装饰器（ES11）、异步迭代器等，且能够将其编译成兼容的 JavaScript 版本。
  > - TypeScript 支持**块级类型声明**，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。
  > - （TS中，函数的类型声明可以重载。）

- ### 类型声明

  > - TS 规定：定义变量时，必须为其声明类型：`let a: string`。此时a的类型是string，只能存字符串，赋其他类型值会编译报错（虽然能够正常运行，但 TS 觉得你这里写的有问题，得做修改）。
  >
  > - 另外，TypeScript 还规定，变量只有赋值后才能使用，否则就会报错。
  >
  > - 定义函数时的形参、返回值也要指定类型：
  >
  >   ```ts
  >   // 此时调用该函数时，必须传2个number型作为参数，不能多也不能少。且该函数返回值也是number型
  >   function demo (x: number, y: number): number{
  >   	return x + y
  >   }
  >   ```

  > **类型推断：**
  >
  > - 类型声明并不是必需的，当类型没有给出时，TypeScript 编译器利用**自动类型推断**来推断变量的类型：
  >
  >   ```ts
  >   let num = 2  // num变量推断为 number 类型
  >   
  >   function toString(num: number) {  // 自动推断函数的返回值是 string 类型
  >   	return String(num)
  >   }
  >   ```
  >
  > - 从这里可以看到，TypeScript 的设计思想是，类型声明是可选的，你可以加，也可以不加。即使不加类型声明，依然是有效的 TypeScript 代码，只是这时不能保证 TypeScript 会正确推断出类型。由于这个原因，所有 JavaScript 代码都是合法的 TypeScript 代码。
  >
  > - 这样做的好处是：将以前的 JavaScript 项目改为 TypeScript 项目时，你可以逐步地为老代码添加类型，即使有些代码没有添加，也不会无法运行。
  >
  > - 对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`。应尽量避免any（后面会说any类型）。

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
  > - 上面示例中，变量`a`和`b`的类型是不一样的，但是变量`a`赋值给变量`b`并不会报错。这时，我们就认为，`b`的类型兼容`a`的类型（a类型的是b类型的子集）。TypeScript 为这种情况定义了一个专门术语。如果类型`A`的值可以赋值给类型`B`，那么类型`A`就称为类型`B`的**子类型（subtype）**。在上例中，类型`number`就是类型`number|string`的子类型。
  > - 类似于其他静态类型语言，TypeScript 中凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。
  > - 之所以有这样的规则，是因为子类型继承了父类型的所有特征，所以可以用在父类型的场合。但是，子类型还可能有一些父类型没有的特征，对父类型做了扩展，所以父类型不能用在子类型的场合。

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

- ### 类型别名

  > - 类型别名 (`type`) 可以为复杂的类型定义简短的别名，使代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展。语法：`type 别名 = 类型`
  >
  >   ```ts
  >   type Status = number | string
  >   let a: Status
  >   a = 1
  >   a = '404'
  >   ```
  >
  >   > 1. 类型别名默认有变量提升，声明位置在**当前块级作用域的顶部**。
  >   >
  >   > 2. 别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套：
  >   >
  >   >    ```ts
  >   >    type World = "world"
  >   >    type Greeting = `hello ${World}`
  >   >    ```
  >
  > - TS中的`typeof`还可以用于提取变量的TS类型：（注意：`typeof`后面只能是变量，不能是表达式和类型）
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

- ### TS的基本类型

  > TypeScript 继承了 JavaScript 的类型，在这个基础上，定义了一套自己的类型系统。JS的`undefined、string、symbol、object、null、number、boolean、bigint`等基础类型，都是TS的基本类型。（并且还有它们的包装对象的类型：`String/Symbol/Object/Number/Boolean/BigInt`。其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。**建议只使用小写类型**）

  > **注意：**symbol 类型和 bigint 类型无法获取它们的包装对象。即`Symbol()`和`BigInt()`不能作为构造函数使用，所以没有办法直接获得 symbol 类型和 bigint 类型的包装对象，因此`Symbol`和`BigInt`这两个类型虽然在TS中存在，但是目前没用。

  - **Object：**大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有能访问到Object原型的都算`Object`类型，这囊括了几乎所有的值（除了null和undefined），几乎没啥限制了，因此很少用。（另外，`{}`是`Object`类型的简写形式，所以使用`Object`时常常用空对象代替）

    ```ts
    let obj: Object;
    // 都能访问到 Object#toString() 方法，因此都属于Object类型
    obj = true;
    obj = "hi";
    obj = 1;
    obj = { foo: 123 };
    obj = [1, 2];
    obj = (a: number) => a + 1;
    ```

  - **object：**小写的`object`类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象（引用类型），只包含*对象、数组、函数*，不包括原始类型的值。它适用于复杂的对象结构。如果用object来限制一个变量，那么这个变量除了基本类型之外，可以赋任意的值，因为数组、函数等都属于object类型。这种在实际开发中用的很少，因为限制范围太大了，我们通常用*接口*来限制一个变量：（TS中的`?`表示age参数是可选的）

    ```ts
    // 表示person是一个有name是属性的对象，age属性可选，还可以有任意数量的其他属性（any不限类型）
    let person: { name:string; age?:number; [key:string]:any }  // 接口中的分隔符可以是, ; Enter
    ```

    > **注意：**无论是大写的`Object`类型，还是小写的`object`类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。
    >
    > ```ts
    > const o1: Object = { foo: 0 };
    > const o2: object = { foo: 0 };
    > 
    > o1.toString(); // 正确
    > o1.foo; // 报错
    > 
    > o2.toString(); // 正确
    > o2.foo; // 报错
    > ```

  - **null、undefined类型：**分别表示*空值*和*未定义*。在默认情况下，它们是所有类型的子类型，可以赋给任何变量，但可以通过 strictNullChecks 来开启空检查，使其只能赋值null/undefined。

  - **数组类型：**TypeScript 中数组类型有一个根本特征，数组中所有元素的类型都相同，但是数量不确定：`let arr: string[]`或`let arr: Array<string>`（泛型写法，后面说）。

    > - 二维数组：`T[][]`，其中`T`是最底层数组成员的类型，其中每个一维数组中必须保存T类型元素。
    >
    > - TypeScript 允许使用方括号读取数组类型：
    >
    >   ```ts
    >   type Names = string[]
    >   type Name = Names[0]  // string
    >   // 由于数组成员的索引类型都是number，所以读取成员类型也可以写成下面这样：
    >   type Name = Names[number]  // string
    >   ```
    >
    > - TypeScript 允许声明只读数组，方法是在数组类型前面加上`readonly`关键字：
    >
    >   ```ts
    >   const arr: readonly number[] = [0, 1]
    >   ```
    >
    >   > - TS将`readonly number[]`与`number[]`视为两种不一样的类型，后者是前者的子类型。这是因为只读数组没有pop()、push()之类会改变原数组的方法，所以number[]的方法数量要多于readonly number[]，这意味着number[]其实是readonly number[]的子类型。（加了readonly之后就是新类型了）
    >   >
    >   > - 注意，`readonly`关键字不能与数组的泛型写法一起使用：
    >   >
    >   >   ```ts
    >   >   // 报错，没有这样的写法，语法都不对
    >   >   const arr: readonly Array<number> = [0, 1]
    >   >   ```
    >   >
    >   > - 实际上，TypeScript 提供了两个专门的泛型，用来生成只读数组的类型。
    >   >
    >   >   ```ts
    >   >   const a1: ReadonlyArray<number> = [0, 1]
    >   >   const a2: Readonly<number[]> = [0, 1]
    >   >   // 上面示例中，泛型ReadonlyArray<T>和Readonly<T[]>都可以用来生成只读数组类型。两者尖括号里面的写法不一样，Readonly<T[]>的尖括号里面是整个数组（number[]），而ReadonlyArray<T>的尖括号里面是数组成员（number）
    >   >   ```
    >   >
    >   > - 只读数组还有一种声明方法，就是使用**const 断言**。（其实也是只读元组）
    >   >
    >   >   ```ts
    >   >   const arr = [0, 1] as const
    >   >   // as const告诉 TypeScript，推断类型时要把变量arr推断为只读数组，从而使得数组成员无法改变
    >   >   ```

  - **函数类型：**TS在定义函数时，需要给出函数参数以及返回值的类型：（返回值类型TS通常会推断出来）

    ```ts
    function hello(txt: string): string {
    	return "hello " + txt
    }
    ```

    > - 如果变量被赋值为一个函数（变量的类型是函数类型），需要这样写：
    >
    >   ```ts
    >   let hello: (txt: string) => void  // 声明变量为函数类型，其中类型里的参数名(txt)是必须的
    >   hello = function (v) {
    >   	console.log("hello " + txt)
    >   }
    >   ```
    > 
    > - 实际赋值的函数的参数个数，可以少于类型指定的参数个数，但是不能多于。
    > 
    >   ```ts
    >   let myFunc: (a: number, b: number) => number
    >  myFunc = (a: number) => a  // 正确
    >   ```
    >
    >   这是因为 JavaScript 函数在声明时往往有多余的参数，实际使用时可以只传入一部分参数。
    >
    > - 可以用`typeof`运算符获取一个函数的类型：`const myParseInt: typeof parseInt;`
    > 
    > - 函数类型还可以采用接口的写法。
    > 
    >   ```ts
    >  let add: {
    >   	(x: number, y: number): number  // 格式为 (参数列表):返回值
    >  }
    >   add = function (x, y) {
    >   	return x + y
    >   }
    >   ```
    > 
    > - TypeScript 提供了一个内置的函数类型 Function ，任何函数都属于这个类型。（用的很少，了解即可）
    > 
    >   ```ts
    >  declare type Function = (...args: any[]) => any
    >   ```

    

    > - 上面示例中，变量`hello`被赋值为一个函数，它的类型有两种写法。写法一是通过等号右边的函数类型，推断出变量`hello`的类型；写法二则是使用箭头函数的形式，为变量`hello`指定类型，参数的类型写在箭头左侧，返回值的类型写在箭头右侧。
    >
    > - 注意：函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于：
    > 
    >   ```ts
    >   let myFunc: (a: number, b: number) => number
    >   myFunc = (a: number) => a  // 正确
    >   myFunc = (a: number, b: number, c: number) => a + b + c  // 报错
    >   ```
    > 
    > - 由于函数本质上也是对象，因此函数类型还可以采用对象（接口）的写法：
    > 
    >   ```ts
    >  let add: {  // add可以是一个函数（对象）
    >     (x: number, y: number): number
    >  }
    >   add = function (x, y) {
    >    return x + y
    >   }
    >   ```
    > 
    >   这种写法平时很少用，但是非常合适用在一个场合：函数本身存在属性。
    > 
    >  ```ts
    >   function f(x: number) {
    >  	console.log(x)
    >   }
    >   f.version = '1.0'
    >   ```
    > 
    >   上面示例中，函数`f()`本身还有一个属性`version`。这时，`f`完全就是一个对象，类型就要使用对象的写法：
    > 
    >   ```ts
    >   let foo: {
    >  	(x: number): void
    >   	version: string
    >  } = f
    >   ```

  - **symbol：**TS 中用`symbol`表示 Symbol 类型，该类型包含所有的 Symbol 值。为了表示唯一的Symbol值，TS 设计了`symbol`的一个子类型`unique symbol`，它表示某个唯一的 Symbol 值。并且由于所以这个类型的变量是不能被赋其他值的，因此必须用`const`不能用`let`：`const x: unique symbol = Symbol()`。（两个`unique symbol`类型的变量其实类型并不相同，但可以用typeof拿到某个变量的`unique symbol`类型）

    > - unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。**如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol。**
    > - `unique symbol`类型也可以用作类的属性值，但只能赋值给类的`readonly static`属性。
    > - 如果变量声明时没有给出类型，TypeScript 会推断某个 Symbol 值变量的类型。`let`命令声明的变量，推断类型为 symbol；`const`命令声明的变量，推断类型为 unique symbol。
    

  *除此之外还增加了以下几个基本类型：*

  - **any：**表示没有任何限制，该类型的变量可以赋予任意类型的值。any类型的范围最大，类似于*全集*的概念，适合不确定数据类型的情况。但是使用时需谨慎，变量类型一旦设为`any`，TypeScript 实际上会关闭对这个变量的类型检查。即使有明显的类型错误，只要句法正确，都不会报错。由于这个原因，应该尽量避免使用`any`类型，否则就失去了使用 TypeScript 的意义（而是AnyScript）。

    > - 对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`。（TypeScript 提供了一个编译选项`noImplicitAny`，打开该选项，只要推断出`any`类型就会报错）
    >
    > - **污染问题：**`any`类型还有一个很大的问题，就是它会*污染*其他变量。any类型的变量可以赋值给其他任何类型的变量（因为没有类型检查），导致使用其他变量时出错。
    >
    >   > ```ts
    >   > let a: any
    >   > a = 99
    >   > let s: string
    >   > s = a // 明明s要求是string型，但是any型变量的值也可以赋给s
    >   > ```
    >   >
    >   > 污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用`any`类型的另一个主要原因。
    >
    > - any是 TS 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况：
    >
    >   1. 变量的值会任意改变时。
    >   2. 定义存储各种类型数据的数组时（`let a: any[]`）。
    >   3. 改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查。

  - **unknown：**为了解决`any`“污染”其他变量的问题，TS3.0引入了`unknown`。它与`any`含义相同，表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像`any`那样自由，可以视为严格版的`any`。`unknown`跟`any`的相似之处在于，所有类型的值都可以分配给`unknown`类型（范围最大）；不同之处在于，它不能直接使用，用之前有以下限制：

    > 1. 首先，`unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`和`unknown`类型）。这就避免了污染问题，从而克服了`any`的一大缺点。
    > 2. 其次，调用`unknown`类型变量身上的任何方法、属性，都会报错。必须先指定为具体的类型后，再使用。
    > 3. 最后，`unknown`类型变量能够进行的运算是有限的，只能进行比较运算（`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`、`instanceof`，其他运算都会报错。
    >

    > - 那么怎么才能使用`unknown`类型变量呢？答案是，只有经过“类型缩小”，`unknown`类型变量才可以使用。所谓“类型缩小”，就是缩小`unknown`变量的类型范围，给其指定确定的类型，确保不会出错。
    > - 这样设计的目的是，只有明确`unknown`变量的实际类型，才允许使用它，防止像`any`那样可以随意乱用，“污染”其他变量。
    > - 总之，`unknown`可以看作是更安全的`any`。一般来说，凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型。在集合论上，`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`一样，也属于 TypeScript 的顶层类型。

  - **never**：为了保持与集合论的对应关系，以及类型运算的完整性，TS引入了“空类型”的概念，即该类型为空集，不包含任何值。即*never是其它所有类型的子类型（包括 null 和 undefined）*。表示**任何值都不是**，不存在这样的类型。这意味着声明为`never`类型的变量只能被`never`类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）。

    > - 就像空集是任何集合的子集一样，`never`类型可以赋值给任意其他类型。TypeScript 把`never`称为“底层类型”（唯一的）。
    > - 几乎不用never去直接限制变量，因为没有意义。never一般是TS主动推断出来的。
    > - never一般用于限制函数的返回值类型，若一个函数的返回值类型为never，那么该函数不能顺利执行结束。

  - **字面量类型**：TypeScript 规定，单个值也是一种类型，称为“值类型”。字面量类型可以让变量只能拥有特定的值，通常结合union来定义变量的特定状态：

    ```ts
    let direction: "up" | "down" | "left" | 2 | boolean
    direction = "up"
    ```

    > **注意**：const定义的变量意味着不会被修改，因此`const a = 1`此时a是字面量类型1。

  - **联合类型（union）**：表示一个变量可以是多种类型之一，通过`|`符号实现：`let id: string | number`。

  - **交叉类型**：表示多个类型组成的一个新类型，取多个类型的交集，用符号`&`表示：`let x: number & string`。此时变量`x`必须同时是数值和字符串，这当然是不可能的，所以 TypeScript 会认为`x`的类型是`never`。交叉类型一般用于类型的合成和类型的扩展：

    ```ts
    // 类型合成
    let obj: { foo: string } & { bar: string }  // 表示对象中必须只包含foo和bar两个属性
    obj = {
        foo: "hello",
        bar: "world",
    }
    // 类型扩展
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

  - **tuple（元组）：**它是一种描述**定长数组**的类型。它按序规定了数组中每个元素的类型，用于精确描述一组值。如：

    ```ts
    let a: [string, number, boolean?] = ['1', 2, true]  // 定长的数组，不按照要求push会报错
    ```

    > - `?`表示元素是可选的，可选的必须放在元组的最后。如：`let a: [string, number?]`。
    >
    > - 使用扩展运算符（`...`）可以表示不限成员数量的元组：`let a: [string, ...string[]]`。（扩展运算符用在元组的任意位置都行，但它后面只能是数组或元组的类型）
    >
    > - 和上面的数组类型一样，元组同样可以通过方括号读取其类型：
    >
    >   ```ts
    >   type Tuple = [string, number]
    >   type Age = Tuple[1]  // number
    >   ```
    >
    > - 给元组的索引起别名：`let a: [a:string, b:number]`。
    >
    > - 只读元组：
    >
    >   ```ts
    >   // 写法一
    >   type t = readonly [number, string]
    >   // 写法二，用到了工具类型Readonly<T>
    >   type t = Readonly<[number, string]>
    >   ```
    >
    > - 如果没有扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）。
    >
    >   ```ts
    >   function f(point: [number, number]) {
    >     if (point.length === 3) {
    >       // 报错
    >       // ...
    >     }
    >   }
    >   ```
    >
    > - 扩展运算符（`...`）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。这会导致函数调用时，使用扩展运算符传入函数参数，可能发生参数数量与数组长度不匹配的报错。解决这个问题的一个方法，就是把成员数量不确定的数组，写成成员数量确定的元组，对元组使用扩展运算符。
    >
    > - 跟数组一样，通过`as const`断言，TypeScript会将该元组视为一个不可变的常量元组：
    >
    >   ```ts
    >  let tuple = [42, "Hello"] as const  // 元组类型：[42, "Hello"]
    >   ```
    
  - **enum（枚举值/枚举类型）：**TS中新增了枚举值，它可以定义**一组命名常量**。编译后生成的是JS对象，也叫**对象枚举**。（其中枚举类型也是枚举值/枚举常量）

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


- > 

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

