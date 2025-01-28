- ### declare关键字

  > `declare` 用于给出，已经存在（已被定义）的变量的类型信息（外部的变量）。由它来告诉编译器：某个类型是存在的，可以在当前文件中使用。
  >
  > `declare` 主要用于声明全局变量、函数、类、命名空间、模块等。举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用`declare`关键字，告诉编译器外部函数的类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。(注意：`declare` 关键字不会生成任何 JavaScript 代码，它仅用于提供类型信息，帮助编译器进行类型检查）

  > declare 关键字可以用来描述：
  >
  > - 变量（const、let、var 命令声明）
  > - type 或者 interface 命令声明的类型
  > - class
  > - enum
  > - 函数（function）
  > - 模块（module）
  > - 命名空间（namespace）

  - **变量：**`declare` 可以给出外部变量的类型描述。

    > 举例来说，当前脚本使用了其他脚本定义的全局变量`x`。
    >
    > ```ts
    > x = 123  // 报错
    > ```
    >
    > 上面示例中，变量`x`是其他脚本定义的，当前脚本不知道它的类型，编译器就会报错。
    >
    > 这时使用 declare 命令给出它的类型，就不会报错了。
    >
    > ```ts
    > declare let x:number
    > x = 1
    > ```
    >
    > 如果 declare 关键字没有给出变量的具体类型，那么变量类型就是`any`。
    >
    > ```ts
    > declare let x
    > x = 1  // 这里x的类型为any
    > ```
    >
    > 注意，declare 关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。
    >
    > ```ts
    > declare let x:number = 1  // 报错
    > ```

  - **函数：**`declare` 可以给出外部函数的类型描述。

    ```ts
    declare function sayHello(name: string): void
    // declare 命令给出了sayHello()的类型描述，表示这个函数是由外部文件定义的，因此这里可以直接使用该函数
    sayHello('张三')
    ```

  - **类：**

    > declare 给出 class 类型描述的写法如下。
    >
    > ```ts
    > declare class Animal {
    >        constructor(name:string)
    >        eat(): void
    >        sleep(): void
    > }
    > ```
    >
    > 下面是一个复杂一点的例子。
    >
    > ```ts
    > declare class C {
    >        // 静态成员
    >        public static s0(): string;
    >        private static s1: string;
    > 
    >        // 属性
    >        public a:number;
    >        private b:number;
    > 
    >        // 构造函数
    >        constructor(arg:number);
    > 
    >        // 方法
    >        m(x:number, y:number): number;
    > 
    >        // 存取器
    >        get c(): number;
    >        set c(value:number);
    > 
    >        // 索引签名
    >        [index:string]:any;
    > }
    > ```

  - **模块、命名空间：**

    ```ts
    // 模块
    declare module AnimalLib {
        class Animal {
            constructor(name:string);
            eat(): void;
            sleep(): void;
        }
    
        type Animals = 'Fish' | 'Dog';
    }
    
    // 命名空间了解即可
    declare namespace AnimalLib {
        class Animal {
            constructor(name:string);
            eat():void;
            sleep():void;
        }
    
        type Animals = 'Fish' | 'Dog';
    }
    ```

    > declare module 和 declare namespace 里面，加不加 export 关键字都可以。
    >
    > ```ts
    > declare namespace Foo {
    > 	export var a: boolean;
    > }
    > 
    > declare module 'io' {
    > 	export function readFile(filename: string): string;
    > }
    > ```

    > 下面的例子是当前脚本使用了`myLib`这个外部库，它有方法`makeGreeting()`和属性`numberOfGreetings`。`myLib`的类型描述就可以这样写。
    >
    > ```ts
    > declare namespace myLib {
    >        function makeGreeting(s:string): string;
    >        let numberOfGreetings: number;
    > }
    > ```

    > **declare 关键字的另一个用途，是为外部模块添加属性和方法时，给出新增部分的类型描述（默认导出的值不能扩展）。**
    >
    > ```ts
    > import { Foo as Bar } from 'moduleA';
    > 
    > declare module 'moduleA' {
    >        interface Foo {
    >            custom: {
    >            	prop1: string
    >            }
    >        }
    > }
    > ```

    > 某些第三方模块，原始作者没有提供接口类型，这时可以在自己的脚本顶部加上下面一行命令。(TODO)
    >
    > ```ts
    > // 语法
    > declare module "模块名";
    > 
    > // 例子
    > declare module "hot-new-module";
    > ```
    >
    > 加上上面的命令以后，外部模块即使没有类型声明，也可以通过编译。但是，从该模块输入的所有接口都将为`any`类型。
    >
    > declare module 描述的模块名可以使用通配符。
    >
    > ```ts
    > declare module 'my-plugin-*' {
    >        interface PluginOptions {
    >            enabled: boolean;
    >            priority: number;
    >        }
    >        function initialize(options: PluginOptions): void;
    >        export = initialize;
    > }
    > ```
    >
    > 上面示例中，模块名`my-plugin-*`表示适配所有以`my-plugin-`开头的模块名（比如`my-plugin-logger`）。

  - **枚举：**declare 关键字给出 enum 类型描述的例子如下，下面的写法都是允许的。

    ```ts
    declare enum E1 {
        A,
        B,
    }
    
    declare enum E2 {
        A = 0,
        B = 1,
    }
    
    declare const enum E3 {
        A,
        B,
    }
    
    declare const enum E4 {
        A = 0,
        B = 1,
    }
    ```

  - **declare global：**如果要为 JS 的内置对象添加属性和方法，可以使用`declare global {}`语法。

    ```ts
    export {};
    
    declare global {
        interface String {
        	toSmallString(): string;
        }
    }
    
    String.prototype.toSmallString = ():string => {
        // 具体实现
        return '';
    };
    ```

    > 上面示例中，为 JavaScript 原生的`String`对象添加了`toSmallString()`方法。declare global 给出这个新增方法的类型描述。
    >
    > 这个示例第一行的空导出语句`export {}`，作用是强制编译器将这个脚本当作模块处理。这是因为`declare global`必须用在模块里面。
    >
    > 下面的示例是为 window 对象（类型接口为`Window`）添加一个属性`myAppConfig`。
    >
    > ```ts
    > export {};
    > 
    > declare global {
    >        interface Window {
    >        	myAppConfig:object;
    >        }
    > }
    > 
    > const config = window.myAppConfig;
    > ```
    >
    > declare global 只能扩充现有对象的类型描述，不能增加新的顶层类型。

  - **declare module 用于类型声明文件：**

    > 我们可以为每个模块脚本，定义一个`.d.ts`文件，把该脚本用到的类型定义都放在这个文件里面。但是，更方便的做法是为整个项目，定义一个大的`.d.ts`文件，在这个文件里面使用`declare module`定义每个模块脚本的类型。

    > 下面的示例是`node.d.ts`文件的一部分。
    >
    > ```ts
    > declare module "url" {
    >       export interface Url {
    >            protocol?: string;
    >            hostname?: string;
    >            pathname?: string;
    >       }
    > 
    >       export function parse(
    >            urlStr: string,
    >            parseQueryString?,
    >            slashesDenoteHost?
    >       ): Url;
    > }
    > 
    > declare module "path" {
    >        export function normalize(p: string): string;
    >        export function join(...paths: any[]): string;
    >        export var sep: string;
    > }
    > ```
    >
    > 上面示例中，`url`和`path`都是单独的模块脚本，但是它们的类型都定义在`node.d.ts`这个文件里面。
    >
    > 另一种情况是，使用`declare module`命令，为模块名指定加载路径。
    >
    > ```ts
    > declare module "lodash" {
    >        export * from "../../dependencies/lodash";
    >        export default from "../../dependencies/lodash";
    > }
    > ```
    >
    > 上面示例中，`declare module "lodash"`为模块`lodash`，指定具体的加载路径。
    >
    > 使用时，自己的脚本使用三斜杠命令，加载这个类型声明文件。
    >
    > ```ts
    > /// <reference path="node.d.ts"/>
    > ```
    >
    > 如果没有上面这一行命令，自己的脚本使用外部模块时，就需要在脚本里面使用 declare 命令单独给出外部模块的类型。

- ### `.d.ts`类型声明文件

  > 单独使用的模块，一般会同时提供一个单独的类型声明文件（declaration file），把本模块的外部接口的所有类型都写在这个文件里面，便于模块使用者了解接口，也便于编译器检查使用者的用法是否正确。
  >
  > 类型声明文件里面只有类型代码，没有具体的代码实现。它的文件名一般为`[模块名].d.ts`的形式，其中的`d`表示 declaration（声明）。

  > 举例来说，有一个模块的代码如下。
  >
  > ```ts
  > const maxInterval = 12;
  > 
  > function getArrayLength(arr) {
  >   	return arr.length;
  > }
  > 
  > module.exports = {
  >        getArrayLength,
  >        maxInterval,
  > };
  > ```
  >
  > 它的类型声明文件可以写成下面这样。
  >
  > ```ts
  > export function getArrayLength(arr: any[]): number;
  > export const maxInterval: 12;
  > ```
  >
  > 类型声明文件也可以使用`export =`命令，输出对外接口。下面是 moment 模块的类型声明文件的例子。
  >
  > ```ts
  > declare module 'moment' {
  >        function moment(): any;
  >        export = moment;
  > }
  > ```
  >
  > 上面示例中，模块`moment`内部有一个函数`moment()`，而`export =`表示`module.exports`输出的就是这个函数。
  >
  > 除了使用`export =`，模块输出在类型声明文件中，也可以使用`export default`表示。
  >
  > ```ts
  > // 模块输出
  > module.exports = 3.142;
  > 
  > // 类型输出文件
  > // 写法一
  > declare const pi: number;
  > export default pi;
  > 
  > // 写法二
  > declare const pi: number;
  > export= pi;
  > ```
  >
  > 上面示例中，模块输出的是一个整数，那么可以用`export default`或`export =`表示输出这个值。
  >
  > 下面是一个如何使用类型声明文件的简单例子。有一个类型声明文件`types.d.ts`。
  >
  > 

- ### 类型运算符

  > TypeScript 提供强大的类型运算能力，可以使用各种类型运算符，对已有的类型进行计算，得到新类型。

  - ##### `keyof` 运算符

    > TS 中的 `keyof` 是一个单目运算符，接受一个**接口**类型作为参数，返回该接口的所有键名(字符串)组成的联合类型：
    >
    > ```ts
    > type A = {
    >        name: string,
    >        age: number,
    > }
    > type MyKeys = keyof A  // 此时MyKeys的类型为：'name' | 'age' 的联合类型
    > ```
    >
    > 该运算符的主要用途是：精确表达对象的属性类型，以及用于*属性映射*（后面说）。

    > **注意：**
    >
    > - 由于 JS 对象的键名只有三种类型，所以`keyof any`的结果是`string|number|symbol`。
    >
    > - 对于没有自定义键名的类型使用 keyof，返回`never`类型，表示不可能有这样类型的键名。
    >
    >   ```ts
    >   type A = keyof {}  // never
    >   ```
    >
    > - 如果接口的属性名采用索引形式，keyof 会返回属性名的索引类型。
    >
    >   ```ts
    >   // 示例一
    >   interface T {
    >   	[prop: number]: number;
    >   }
    >   type KeyT = keyof T;  // number
    >   
    >   // 示例二
    >   interface T {
    >   	[prop: string]: number;
    >   }
    >   type KeyT = keyof T;  // string|number
    >   ```
    >
    > - 如果 keyof 运算符用于数组或元组类型，得到的结果可能出人意料。
    >
    >   ```ts
    >   type Result = keyof ['a', 'b', 'c'];
    >   // 返回 number | "0" | "1" | "2" | ... | "length" | "pop" | "push" | ···
    >   ```
    >
    >   > 上面示例中，keyof 会返回数组的所有键名，包括数字键名和继承的键名。
    >
    > - 对于联合类型，keyof 返回成员共有的键名。对于交叉类型，keyof 返回所有键名。
    >
    >   ```ts 
    >   type A = { a: string; z: boolean };
    >   type B = { b: string; z: boolean };
    >   // 联合类型：返回 'Z'
    >   type T1 = keyof (A | B);
    >   // 交叉类型：返回 'a' | 'b' | 'z'
    >   type T2 = keyof (A & B);  // 相当于 keyof (A & B) ≡ keyof A | keyof B
    >   ```
    >
    > - keyof 取出的是键名组成的联合类型，如果想取出键值组成的联合类型，可以像下面这样写。
    >
    >   ```ts
    >   type MyObj = {
    >       foo: number,
    >       bar: string,
    >   };
    >   type Keys = keyof MyObj;
    >   type Values = MyObj[Keys];  // number|string
    >   ```
    >
    >   > 上面示例中，`Keys`是键名组成的联合类型，而`MyObj[Keys]`会取出每个键名对应的键值类型，组成一个新的联合类型，即`number|string`。

  - ##### `in` 运算符

    > 在 JS 中，`in`运算符用来确定对象是否包含某个属性。而在 TS 中，`in`运算符还可以**取出（遍历）联合类型中的每一个成员类型。**
    >
    > ```ts
    > type U = 'a'|'b'|'c';
    > 
    > type Foo = {
    >    	[Prop in U]: number;
    > };
    > // 等同于
    > type Foo = {
    >        a: number,
    >        b: number,
    >        c: number
    > };
    > ```
    >
    > 上面示例中，`[Prop in U]`表示依次取出联合类型`U`中的每一个成员。

  - ##### `[]` 运算符

    > TS 中，`[]`运算符还可以取出接口中键的类型，比如`T[K]`会返回接口`T`中属性`K`的类型。（`[]`中不能包含值的运算）
    >
    > ```ts
    > type Person = {
    >        age: number;
    >        name: string;
    >        alive: boolean;
    > };
    > type Age = Person['age'];  // Age 的类型是 number
    > ```
    >
    > 方括号的参数如果是联合类型，那么返回的也是联合类型。
    >
    > ```ts 
    > type Person = {
    >        age: number;
    >        name: string;
    >        alive: boolean;
    > };
    > // number|string
    > type T = Person['age'|'name'];
    > // number|string|boolean
    > type A = Person[keyof Person];
    > ```
    >
    > 如果访问不存在的属性，会报错。
    >
    > ```ts
    > type T = Person['notExisted'];  // 报错
    > ```
    >
    > 方括号运算符的参数也可以是属性名的索引类型。
    >
    > ```ts
    > type Obj = {
    > 	[key:string]: number,
    > };
    > type T = Obj[string];  // number
    > ```
    >
    > 这个语法对于数组也适用，可以使用`number`作为方括号的参数。
    >
    > ```ts
    > // MyArray 的类型是 { [key:number]: string }
    > const MyArray = ['a','b','c'];
    > 
    > // 等同于 (typeof MyArray)[number]
    > type Person = typeof MyArray[number];  // 返回 string
    > ```

  - ##### `extends...?:` 条件运算符

    > 条件运算符可以根据当前类型是否符合某种条件，返回不同的类型：`T extends U ? X : Y`。该运算符可以嵌套使用。（注意：条件运算符的参数都是类型）
    >
    > 上面式子中的`extends`用来判断，类型`T`是否可以赋值给类型`U`，即`T`是否为`U`的子类型，这里的`T`和`U`可以是任意类型。如果`T`能够赋值给类型`U`，表达式的结果为类型`X`，否则结果为类型`Y`。

    > 如果对泛型使用 extends 条件运算，有一个地方需要注意。当泛型的类型参数是一个联合类型时，那么条件运算符会展开这个类型参数，即`T<A|B> = T<A> | T<B>`，所以 extends 对类型参数的每个部分是分别计算的。也就是说，如果类型参数是联合类型，条件运算的返回结果依然是一个联合类型。
    >
    > ```ts
    > type Cond<T> = T extends U ? X : Y;
    > 
    > type MyType = Cond<A|B>;
    > // 等同于 Cond<A> | Cond<B>
    > // 等同于 (A extends U ? X : Y) | (B extends U ? X : Y)
    > ```
    >
    > *如果不想分别计算，有一个小窍门是：将泛型参数放在`[T]`中，这样类型就变成了一个元组。（了解即可，不重要）*

  - ##### `infer` 关键字

    > sd

  - ##### `is` 运算符

    > `is`运算符用来**描述**返回值属于`true`还是`false`。函数返回布尔值的时候，可以使用`is`运算符，限定返回的布尔值与参数之间的关系（通常用于类型保护）。
    >
    > ```ts
    > function isFish(pet: Fish|Bird): pet is Fish {
    > 	return (pet as Fish).swim !== undefined;
    > }
    > ```
    >
    > 上面示例中，函数`isFish()`的返回值类型为`pet is Fish`，它告诉编译器：表示如果参数`pet`类型为`Fish`，则返回`true`，否则返回`false`。
    >
    > `is`运算符总是用于描述函数的返回值类型，写法采用`parameterName is Type`的形式，即左侧为当前函数的参数名，右侧为某一种类型。它返回一个**布尔值**，表示左侧参数是否属于右侧的类型。

  - ##### 模板字符串

    > TS 中的模板字符串还可以用来**构建类型**。TS 中的模板字符串的特点就是：内部可以引用其他类型。
    >
    > ```ts
    > type World = "world";
    > type Greeting = `hello ${World}`;  // 类型为："hello world"
    > ```
    >
    > 上面示例中，类型`Greeting`是一个模板字符串，里面引用了另一个字符串类型`world`，因此类型`Greeting`实际上是字符串`hello world`。
    >
    > 模板字符串可以引用的类型一共7种，分别是：`string、number、bigint、boolean、null、undefined、Enum`。引用这7种以外的类型会报错。
    >
    > ```ts
    > type Num = 123;
    > type Obj = { n : 123 };
    > 
    > type T1 = `${Num} received`; // 正确
    > type T2 = `${Obj} received`; // 报错
    > ```
    >
    > 模板字符串里面引用的类型，如果是一个联合类型，那么它返回的也是一个联合类型，即模板字符串可以展开联合类型。
    >
    > ```ts
    > type T = 'A'|'B';
    > type U = `${T}_id`;  // "A_id"|"B_id"
    > ```
    >
    > 如果模板字符串引用两个联合类型，它会交叉展开这两个类型。
    >
    > ```ts
    > type T = 'A'|'B';
    > type U = '1'|'2';
    > type V = `${T}${U}`;  // 'A1'|'A2'|'B1'|'B2'
    > ```

  - ##### `satisfies` 运算符

    > sd

- ### 类型映射

- ### 类型工具

- ### 注释指令

- ### `tsconfig.json` 文件

- ### `tsc` 命令

