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

  > **使用TS就可以避免以上问题：**
  >
  > - TS代码在运行前会先进行编译，编译时就可以发现代码的错误或不合理之处从而减小运行时出现异常的概率，这是TS静态类型检查语言的好处。
  > - 虽然同样的功能TS的代码量远远大于JS，但由于TS的代码结构更清晰，在后期的维护中TS远胜于JS。

- ### 运行TS

  - ##### 手动编译：

    > 1. npm安装TS的编译器：`npm i -g typescript`
    > 2. 编译TS源代码（`.ts`结尾）：`tsc demo.ts`
    >
    > > 最终会在当前目录下生成一个`demo.js`文件。

  - ##### 自动化编译：

    > 1. 在项目根目录下创建TS编译的配置文件：`tsc --init`
    >
    >    > 此时会在当前目录下生成一个`tsconfig.json`配置文件，其中包含着很多编译时的配置。
    >
    > 2. 监视根目录下所有层级`.ts`文件的变化，只要发生变化就进行编译：`tsc --watch`
    >
    >    > 默认是放在和`.ts`文件相同位置。
    >
    > 3. （小优化，可选）当编译出错时不生成js文件，在`tsconfig.json`中：（该文件可以加注释）
    >
    >    ```json
    >    {
    >        "compilerOptions": {
    >            "noEmitOnError": true,
    >        }
    >    }
    >    ```

------

- ### 类型声明

  > TS规定：定义变量时必须声明其类型，如：`let a: string`，此时a只能存字符串。

  > 函数的形参、返回值也要指定类型：
  >
  > ```ts
  > function demo(x:number,y:number):number{
  >     return x+y
  > }
  > ```
  >
  > 此时调用该函数时，必须传2个number型作为参数，不能多也不能少。且该函数返回值也是number型。

  字面量类型

  1. 对象：`let person = { name:string; age?:18; [key:string]:any }`（最后可以加索引签名），（分割符可以是`,/;/回车`）

     > 索引签名：允许定义对象可以具有**任意数量的属性**，这些属性的K和类型是可变的。常用于：描述类型和数量都不确定的属性，（具有动态属性的对象）

  2. 函数：`let count: (x:number,y:number)=>number`，只能存储这种形式的函数

  3. 数组：`let arr: string[]`，或`let arr: Array<string>`（后面说泛型），

  类型推断（建议手动写出来）

- ### TS中的类型

  > TS包含了JS中的所有类型，并且还新增了6个新类型。（2个用于自定义类型的方式type和interface）

  - **any：**它表示任意类型。一旦将变量类型声明为any，那就意味着放弃了对该变量的类型检查。

    > **注意：**
    >
    > 1. 没有显示的声明变量的类型，那么它的类型其实就是any。如：`let a`相当于`let a: any`
    >
    > 2. any类型的变量可以赋值给任意类型的变量：
    >
    >    ```ts
    >    let a: any
    >    a = 99
    >    let s: string
    >    s = a // 明明s要求是string型，但是any型变量的值也可以赋给s
    >    ```
    >
    > 3. 开发中尽量少用any，大量的使用any相当于写的不是TypeScript，而是AnyScript。

  - **unknown：**它的含义是**未知的**，可以理解为一个类型安全的any，适用于：不确定数据的具体类型。

    > - 它和any的区别是：unknown类型的变量不允许赋值给任意类型的变量。
    > - knknown会强制开发者在使用前进行类型检查，从而提供更强安全型。（上面的a如果换成unknown则会报错）
    > - 读取any的任何属性都不会报错，而unknown恰恰与其相反。
    > - 断言：`a as string` | `<string> a`

  - **never：**任何值都不是，简言之就是不能有值（`undefined、null、''`都不行）。

    > - 几乎不用never去直接限制变量，因为没有意义。
    > - never一般是TS主动推断出来的。
    > - never一般用于限制函数的返回值类型，如果一个函数的返回值类型为never，那么该函数不能顺利的执行结束。

  - **void：**它通常用于声明函数的返回值，含义：【函数返回值为空（undefined），调用者不应该依赖其返回值进行任何操作】。如：

    ```ts
    function demo():void{ console.log('hello') }
    let result = demo()
    if(result){} // 这行代码会报错：demo函数没有返回值，不应该拿着空的返回值去做任何操作
    ```

  - **tuple（元组）：**它是一种特殊的定长的**数组类型**，其中**每个元素的类型已知且可以不同**。用于精确描述一组值的类型，?表示可选元素。如：`let a: [string,number?]`，...string[]表示任意个string类型：`let a: [string, ...string[]]`，

  - **enum（枚举）：**它可以定义**一组命名常量**，能够增强代码可读性，让代码更好维护。

    - 数字枚举：它是一种最常见的枚举类型，其枚举成员的值是数字且会自动递增。数字枚举具备反向映射的特点。

      ```ts
      enum Direction { UP,DOWN,LEFT,RIGHT }
      Direction.LEFT
      Direction[0]
      // 也可以指定常量的值
      // enum Direction { UP=1,DOWN,LEFT,RIGHT=12 }
      ```

    - 字符串枚举：枚举成员的值是字符串，字符串枚举没有反向映射，也就是不能这样：`Direction[0]`

      ```ts
      enum Direction { UP='up',DOWN='down',LEFT='left',RIGHT='right' }
      ```

    - 常量枚举：它是一种特殊的、使用const关键字定义的枚举类型，在编译时会被内联，不会产生定义枚举类型的代码。

      > **编译时内联：**所谓内联其实就是TS在编译时，会将枚举成员替换为实际的枚举值，而不生成额外的枚举对象。这可以减少生成的JS代码量，并提高运行时性能。

  - Object/object：实际开发中用的较少，因为限制范围太大了。object表示**任何非原始类型**。Object表示**Object的子类型**，也就是所有可以调用Object方法的类型（除了null和undefined的任何类型都可以）。

------

- ### 在TS中自定义类型

  > 手动

  - **type：**它可以为任意类型创建别名，让代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展。

    ```ts
    type Status = number | string
    let a: Status
    a = 1
    a = '404'
    ```

    > 联合类型：它是一种高级类型，表示一个值可以是几种类型之一。
    >
    > ```ts
    > type StringOrNumber = string | number
    > let id: StringOrNumber
    > ```

    > 交叉类型：它允许将多个类型合并为一个类型，合并后的类型将拥有**所有被合并类型的成员**。（通常用于交叉对象类型）
    >
    > ```ts
    > type Area = {
    >     height: number;
    >     width: number;
    > }
    > 
    > type Address = {
    >     room: number;
    >     floor: number;
    > }
    > type House = Area & Address
    > const h: House = {
    >     room: 1,
    >     floor: 2,
    >     height: 300,
    >     width: 200
    > }
    > ```

  - **interface：**

- ### 一个特殊的情况

  > 如果使用类型声明，限制函数类型的返回值为void，此时TS并不会严格限制函数的返回值类型。

  ```ts
  let f1: ()=>void
  f1 = function(){ return 666 } // 这里不会报错
  ```

  > 这是因为：箭头函数省略大括号时，默认会有一个return，此时如果严格限制了，那么箭头函数就不能简写了。因此TS不会严格限制。