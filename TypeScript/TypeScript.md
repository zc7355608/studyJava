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
    > 此时就会在当前目录下生成一个`demo.js`文件，就可以在浏览器或Node中运行了。
    >
    > （VSCode中也可以用Code Runner插件来有右键直接运行一个TS文件，但需要全局安装node和ts-node两个包）

  - ##### 自动化编译：

    > 1. 在项目根目录下创建TS编译的配置文件：`tsc --init`
    >
    >    > 此时会在当前目录下生成一个`tsconfig.json`配置文件，其中包含着很多编译时的配置。
    >
    >    > **TIP：**
    >    >
    >    > - jsconfig.json文件是VSCode中的，旨在为纯 JavaScript 项目提供类似TS的配置功能。该文件的出现时间稍晚于 tsconfig.json，大约在 2015 年左右。
    >    > - 也可以将tsconfig.json看作是jsconfig.json的简化版。因为jsconfig.json的许多概念和功能是从tsconfig.json中演变而来的。jsconfig.json是tsconfig.json与`"allowJs"`属性设置为`true`。
    >    > - jsconfig.json是为了满足纯 JavaScript 项目的需求而创建的，它继承了tsconfig.json的许多配置项，并简化了一些不需要的选项。
    >
    > 2. 监视根目录下所有层级的`.ts/.tsx`文件的变化，只要发生变化就自动编译：`tsc --watch`。生成的js文件默认放在了和ts源文件同一目录下。
    >
    > 3. （小优化，可选）当编译出错时不生成js文件，在`tsconfig.json`中：（特殊：该json文件可以加注释）
    >
    >    ```json
    >    {
    >        "compilerOptions": {
    >            "noEmitOnError": true,
    >        }
    >    }
    >    ```

- ### 关于TS

  > - TS主要学的就是如何写类型。TS中的类型大致分为：**基本类型、高级类型、内置类型、自定义类型、类型体操**。
  > - TS是用来做类型检测的，只是提示作用，只在编译阶段有效，和运行阶段无关。
  > - TS代码编译之后我们写的类型就消失了。但并不是说白写了，编译后可以选择给我们写的TS代码生成单独的*.d.ts类型声明文件。
  > - 写TS就是不断的在给变量添加类型约束，约束我们程序员，这个变量是有类型的，别乱赋值影响后期维护避免bug。但并不是说所有变量都需要加类型，也麻烦。TS支持**类型推导**，根据赋的值确定变量的类型，推断不出来的再手动写出来。

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

- ### TS中的类型

  - 基本类型：

    - JS中的`undefined、string、symbol、object、null、number、boolean、bigint、function`等关键字，都作为TS的基本类型。需要说明的是：

      > - 对象类型object/Object：`let a: object`，如果用对象类型限制一个变量，那么这个变量除了基本类型之外，可以赋任意的值，因为数组、函数等类型都属于对象类型。实际开发中用的较少，因为限制范围太大了。object表示**任何非原始类型**，Object表示**Object类的子类**，也就是所有可以调用Object身上方法的类型（也就是除了null和undefined的任何类型）。因此我们通常用对象的**字面量**类型来指定对象类型：
      >
      >   ```ts
      >   // 表示person是一个有name是属性的对象，age属性可选，还可以有任意数量的其他属性（any不限类型）
      >   let person: { name:string; age?:18; [key:string]:any }  // 分隔符可以是, ; Enter
      >   ```
      >
      > - 数组类型：`let arr: string[]`或`let arr: Array<string>`。（后面说泛型）
      >
      > - 函数类型：`let count: (x: number, y: number) => number`，只能存储这种形式的函数。
      >
      > - null和undefined：当`strickNullChecks`关闭后，null和undefined就不再检查了，它俩可以任意赋值了。

    - 除此之外还新增了6个作为基本类型：（其中枚举类型也是枚举值/枚举常量）

      - **any：**它表示任意类型。一旦将变量类型声明为any，那就意味着放弃了对该变量的类型检查。

        > **注意：**
        >
        > 1. 没有显示的声明变量的类型，那么它的类型其实就是any。如：`let a`相当于`let a: any`
        >
        > 2. any类型的变量可以赋值给任意类型的变量：（any会搞破坏）
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

      - **void：**它通常用于声明函数的返回值，含义：函数返回值为空（或undefined），调用者不应该依赖其返回值进行任何操作。如：

        ```ts
        function demo(): void { console.log('hello') }
        let result = demo()
        if(result){} // 这行代码会编译报错：demo函数没有返回值，不应该拿着空的返回值去做任何操作
        ```

      - **tuple（元组）：**它是一种特殊的**定长的**数组类型，它按序规定了数组中每个元素的类型。用于精确描述一组值。如：

        ```ts
        let a: [string, number, boolean] = ['1', 2, true]  // 定长的数组，不按照要求push会报错
        ```

        > - `?`表示元素是可选的。如：`let a: [string, number?]`，...string表示任意个string类型：`let a: [string, ...string]`。还可以给元组的索引起别名：`let a: [a:string, b:number]`

      - **enum（枚举值/枚举类型）：**TS中新增了枚举值，它可以定义**一组命名常量**。编译后生成的是JS对象，也叫**对象枚举**。

        - **数字枚举**：它是一种最常见的枚举类型，其枚举成员的值是数字且会自动递增。数字枚举具备反向映射的特点。

          ```ts
          enum Direction { UP,DOWN,LEFT,RIGHT }
          Direction.LEFT  // 值为2
          Direction[0]  // 值为0
          // 一般会指定枚举的值
          enum Direction { UP=1,DOWN,LEFT,RIGHT=12 }
          ```

        - **字符串枚举**：枚举成员的值是字符串，字符串枚举没有反向映射，也就是不能这样：`Direction[0]`

          ```ts
          enum Direction { UP='up',DOWN='down',LEFT='left',RIGHT='right' }
          ```

        - **常量枚举**：它是一种用特殊的、用const定义的枚举，在编译时会被换掉，不会产生定义枚举的代码，提高性能。

          ```ts
          const enum Direction { UP='up',DOWN='down',LEFT='left',RIGHT='right' }
          ```

  - 高级类型：联合类型

  - 内置类型：

  - 自定义类型：

  - 类型体操

  > （2个用于自定义类型的方式type和interface）

  - Object/object：。


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
    
  - **interface：**
  
- ### 一个特殊的情况

  > 当使用类型声明限制函数的返回值为void时，TS并不会严格要求函数返回空。

  ```ts
  let f1: ()=>void = ()=>{ return 666 } // 这里不会报错
  ```

  > 这是因为：箭头函数省略大括号时，默认会有一个return，此时如果严格限制了，那么箭头函数就不能简写了。因此TS并不严格限制函数返回空。

  （类中的override关键字）

- ### 类中的成员修饰符

  > 类中的成员修饰符可以加在属性或方法前，用于设置属性或方法的访问权限。

  - public（默认）：公开的，可在任何地方使用
  - protected：只可以在类体、子类中使用
  - private：只可以类中使用

  - readonly：只读属性。在成员修饰符和成员变量名之间加。

  - （类中）属性的简写形式：

    - 简写前：

      ```ts
      class Person {
          public name: string
          public age: number
          constructor(name:string, age:number){
          	this.name = name // 使用this.name时，name必须在类中提前声明好
          	this.age = age
          }
      }
      ```
  
    - 简写后：

      ```ts
      class Person {
      	constructor(public name:string, public age:number){}
      }
      ```

------

- ### 抽象类（abstract class）

  > - 抽象类是一种无法被实例化的类，专门用来定义类的结构和行为。
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

- ### 接口（interface）

  > 接口是一种定义结构的方式，主要作用是为类、对象、函数等，规定一种契约，这样可以确保代码的一致性和安全性。但要注意：接口只能定义格式不能包含任何的实现。（一个类可以实现多个接口，但只能单继承）

  - 定义类的结构：

    ```ts
    interface Person {
        name: string
        age: number
        speak(n: number): void
    }
    class Student implements Person {
        constructor(public name: string, public age: number){}
        speak(n: number): void {
        	console.log('hello')
        }
    }
    ```

  - 定义对象的结构：

    ```ts
    interface Person {
        readonly name: string
        age?: number
        speak: (n: number) => void
    }
    const xiaoming: Person = {
        name: '小明',
        age: 14, // 可以没有
        speak(n){
        	console.log('hello')
        }
    }
    ```

  - 定义函数的结构：

    ```ts
    interface Count {
    	(a:number,b:number): number
    }
    const count: Count = (x,y)=>{ return x+y }
    ```

  - 接口之间的继承：

  - 接口的自动合并（可合并性）：

    ```ts
    interface Person {
    	name: string
    }
    interface Person {
    	age: number
    }
    const p: Person = {
        name: '张三',
        age: 11
    }
    ```

    > 何时使用接口：（接口和type都可用于定义对象的结构）
    >
    > 1. 定义对象的格式
    > 2. 类的契约
    > 3. 自动合并：一般用于扩展第三方库的类型。

- ------

  ### 泛型

  > 泛型可以将类型参数化。它能让一个类型的定义适用于多种类型，同时仍然保持类型的安全性。

  - 泛型函数：

    ```ts
    function log<K,V>(k: T, v: V) {
    	console.log(k,v)
    }
    log<string,number>('hello',100)
    ```

  - 泛型接口：

    ```ts
    interface Person<T> {
        name: string,
        extraInfo: T
    }
    ```

  - 泛型类：

    ```ts
    class Person<T> {
        constructor(
            public name: string,
            public extraInfo: T
        ){}
    }
    ```

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

