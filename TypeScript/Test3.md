- ### declare关键字

  > `declare`用来告诉编译器，某个类型是存在的（全局或其他ts文件中），可以在当前文件中使用。
  >
  > 它的主要作用，就是让当前文件可以使用其他文件声明的类型。举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用`declare`关键字，明确声明出该类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。
  >
  > declare 关键字可以描述以下类型：
  >
  > - 变量（const、let、var 声明）
  > - type 类型别名或 interface 接口类型
  > - Class 类
  > - Enum 枚举
  > - 函数（function）
  > - 模块（module）及 命名空间（namespace）
  >
  > declare 关键字的重要特点是，它只是通知编译器某个类型是存在的，不用给出具体实现。比如，只描述函数的类型，不给出函数的实现，如果不使用`declare`，这是做不到的。
  >
  > declare 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构。另外，所有 declare 语句都不会出现在编译后的 JS 文件里面。

  - **变量：**`declare` 可以给出外部变量的类型描述。

    > 举例来说，当前脚本使用了其他脚本定义的全局变量`x`。
    >
    > ```ts
    > x = 123  // 报错
    > ```
    >
    > 上面示例中，变量`x`是其他脚本定义的，当前脚本不知道它的类型，编译器就会报错。
    >
    > 这时使用`declare`给出它的类型，就不会报错了。
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

    > 注意，这种单独的函数类型声明语句，只能用于`declare`命令后面。一方面，TS 不支持单独的函数类型声明语句；另一方面，declare 关键字后面也不能带有函数的具体实现。

  - **类：**

    > declare 给出 class 类型描述的写法如下。
    >
    > ```ts
    > declare class Animal {
    >     constructor(name: string);
    >     eat(): void;
    >     sleep(): void;
    > }
    > ```
    >
    > 下面是一个复杂一点的例子。
    >
    > ```ts
    > declare class C {
    >     // 静态成员
    >     public static s0(): string;
    >     private static s1: string;
    > 
    >     // 属性
    >     public a: number;
    >     private b: number;
    > 
    >     // 构造函数
    >     constructor(arg: number);
    > 
    >     // 方法
    >     m(x: number, y: number): number;
    > 
    >     // 存取器
    >     get c(): number;
    >     set c(value: number);
    > 
    >     // 索引签名
    >     [index:string]: any;
    > }
    > ```
    >
    > 同样的，declare 后面不能给出 Class 的具体实现或初始值。

  - **模块、命名空间：**

    > 如果想把变量、函数、类组织在一起，可以将 declare 与 module 或 namespace 一起使用。

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
    
    // 命名空间，了解即可
    declare namespace AnimalLib {
        class Animal {
            constructor(name:string);
            eat():void;
            sleep():void;
        }
    
        type Animals = 'Fish' | 'Dog';
    }
    ```

    > declare module 和 declare namespace 里面，如果不加`export`关键字则是全局的，可以直接使用。一般都加`export`区分不同模块中的接口，使用时通过`import`来导入。
    >
    > ```ts
    > declare module 'io' {
    > 	export function readFile(filename: string): string;
    > }
    > declare namespace Foo {
    > 	export var a: boolean;
    > }
    > ```

    > 下面的例子是当前脚本使用了`myLib`这个外部 JS 库，它有方法`makeGreeting()`和属性`numberOfGreetings`。`myLib`的类型描述就可以这样写。
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
    >     interface Foo {
    >         custom: {
    >         	prop1: string
    >         }
    >     }
    > }
    > ```
    >
    > 下面是另一个例子。一个项目有多个模块，可以在一个模块中，对另一个模块的接口进行类型扩展。
    >
    > ```ts
    > // a.ts
    > export interface A {
    > 	x: number;
    > }
    > 
    > // b.ts
    > import { A } from './a';
    > 
    > declare module './a' {
    >     interface A {
    >     	y: number;
    >     }
    > }
    > 
    > const a:A = { x: 0, y: 0 };
    > ```
    >
    > 使用这种语法进行模块的类型扩展时，有两点需要注意：
    >
    > 1. `declare module NAME`语法里面的模块名`NAME`，跟 import 和 export 的模块名规则是一样的，且必须跟当前文件加载该模块的语句写法（上例`import { A } from './a'`）保持一致。
    > 2. 不能创建新的顶层类型。也就是说，只能对`a.ts`模块中已经存在的类型进行扩展，不允许增加新的顶层类型，比如新定义一个接口`B`。
    > 3. 不能对默认的`default`接口进行扩展，只能对 export 命令输出的命名接口进行扩充。这是因为在进行类型扩展时，需要依赖输出的接口名。

    > **某些第三方库是纯 JS 写的，没有类型声明文件**，此时`import`导入该 JS 模块会报错，因为编译器不认为这是一个合法的 TS 模块。解决办法之一就是，在自己的脚本顶部加上一行命令：`declare module "模块名";`。
    >
    > 加上上面的命令以后，外部模块即使没有类型声明，也可以通过编译。但是，从该模块输入的所有接口都将为`any`类型。

    > declare module 描述的模块名可以使用通配符。
    >
    > ```ts
    > declare module 'my-plugin-*' {
    >     interface PluginOptions {
    >         enabled: boolean;
    >         priority: number;
    >     }
    >     function initialize(options: PluginOptions): void;
    >    export = initialize;
    > }
    >```
    > 
    >上面示例中，模块名`my-plugin-*`表示适配所有以`my-plugin-`开头的模块名（比如`my-plugin-logger`）。

  - **枚举：**declare 关键字给出 Enum 枚举类型描述的例子如下，下面的写法都是允许的。

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

  - **declare global：**如果要为 JS 的内置对象（`window/document/global/String`等）添加属性和方法，可以使用`declare global {}`语法。

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

    > 上面示例中，为 JavaScript 原生的`String`对象添加了`toSmallString()`方法。`declare global`给出这个新增方法的类型描述。
    >
    > 这个示例第一行的空导出语句`export {}`，作用是强制编译器将这个脚本当作模块处理。这是因为**`declare global`必须用在模块里面**。
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
    > `declare global`同样只能扩充现有对象的类型描述，不能增加新的顶层类型。

  - **declare module 用于类型声明文件：**

    > 我们可以为每个模块脚本，定义一个`.d.ts`文件，把该脚本用到的类型定义都放在这个文件里面。但是，更方便的做法是为整个项目，定义一个大的`.d.ts`文件，在这个文件里面使用`declare module`定义每个模块脚本的类型。

    > 下面的示例是`node.d.ts`文件的一部分。
    >
    > ```ts
    > declare module "url" {
    >        export interface Url {
    >            protocol?: string;
    >            hostname?: string;
    >            pathname?: string;
    >        }
    >     export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
    >    }
    >    declare module "path" {
    >        export function normalize(p: string): string;
    >        export function join(...paths: any[]): string;
    >        export var sep: string;
    > }
    > // ...
    > ```
    >    
    >    上面示例中，`url`和`path`都是单独的模块文件，但是它们的类型都定义在`node.d.ts`这个文件里面。
    >    
    > 使用时，自己的脚本也可以使用三斜杠命令，来加载这个类型声明文件。（旧方式，目前更推荐使用新方式或`import`引入类型声明文件中的类型声明）
    > 
    > ```ts
    >/// <reference path="node.d.ts" />  // 必须写在文件第一行
    > ```
    >
    > 如果没有上面这一行命令，自己的脚本使用外部模块时，就需要在脚本里面使用 declare 命令单独给出外部模块的类型。
  
- ### `.d.ts`类型声明文件

  > 单独使用的模块，一般会同时提供一个单独的类型声明文件（declaration file），把本模块的外部接口的所有类型都写在这个文件里面，便于模块使用者了解接口，也便于编译器检查使用者的用法是否正确。它的文件名一般为`[模块名].d.ts`的形式。
  >

  - ###### 用法：

    > 举例来说，有一个模块的代码如下。
    >
    > ```ts
    > const maxInterval = 12;
    > function getArrayLength(arr) {
    > 	return arr.length;
    > }
    > module.exports = {
    >     getArrayLength,
    >     maxInterval,
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
    >     function moment(): any;
    >     export = moment;
    > }
    > ```
    >
    > 除了使用`export =`，模块输出在类型声明文件中，也可以使用`export default`表示。
    >
    > ```ts
    > // 写法一
    > declare const pi: number;
    > export default pi;
    > 
    > // 写法二
    > declare const pi: number;
    > export= pi;
    > ```
    >
    > 下面是一个如何使用类型声明文件的简单例子。有一个类型声明文件`types.d.ts`。
    >
    > ```ts
    > // types.d.ts
    > export interface Character {
    >     catchphrase?: string;
    >     name: string;
    > }
    > ```
    >
    > 然后，就可以在 TypeScript 脚本里面导入该文件声明的类型。
    >
    > ```ts
    > // index.ts
    > import { Character } from "./types";
    > 
    > export const character:Character = {
    >     catchphrase: "Yee-haw!",
    >     name: "Sandy Cheeks",
    > };
    > ```

  - ###### 类型声明文件也可以在 `tsconfig.json` 中通过`files`配置项加入编译，这样的话，编译器打包项目时会自动将该类型声明文件加入编译，而不必在每个脚本里面加载类型声明文件。比如，moment 模块的类型声明文件是`moment.d.ts`，使用 moment 模块的项目可以将其加入项目的 `tsconfig.json` 文件：

    ```ts
    {
    	"compilerOptions": {},
        "files": [
            "src/index.ts",
            "typings/moment.d.ts"
        ]
    }
    ```

    > 这种方式加入的文件，文件中的声明全局有效。（除非使用了模块化语法，如 `export`）。

  - ###### 类型声明文件只包含类型描述，不包含具体实现，所以非常适合使用`declare`语句来描述类型。

    > 类型声明文件里面，变量的类型描述必须使用`declare`命令，否则会报错，因为变量声明语句是值相关代码。
    >
    > ```ts
    > declare let foo: string;
    > ```
    >
    > 接口有没有`declare`都可以，因为接口是完全的类型代码。
    >
    > ```ts
    > interface Foo {}  // 正确
    > declare interface Foo {}  // 正确
    > ```
    >
    > 类型声明文件里面，顶层可以使用`export`命令，也可以不用，除非使用者脚本会显式使用`import`命令导入类型。
    >
    > ```ts
    > export interface Data {
    >     version: string;
    > }
    > ```
    >
    > 下面是`moment`和`D3`库类型声明文件的例子。
    >
    > ```ts
    > declare module 'moment' {
    >    export interface Moment {
    >     	format(format:string): string;
    > 
    >         add(
    >             amount: number,
    >             unit: 'days' | 'months' | 'years'
    >         ): Moment;
    > 
    >         subtract(
    >             amount:number,
    >             unit:'days' | 'months' | 'years'
    >         ): Moment;
    >    }
    > 
    >    function moment(
    >         input?: string | Date
    >    ): Moment;
    > 
    >    export default moment;
    > }
    > ```
    >
    > ```ts
    > declare namespace D3 {
    >    export interface Selectors {
    >         select: {
    >             (selector: string): Selection;
    >             (element: EventTarget): Selection;
    >         };
    > 	}
    > 
    >    export interface Event {
    >         x: number;
    >         y: number;
    >    }
    > 
    >    export interface Base extends Selectors {
    >     	event: Event;
    >    }
    > }
    > 
    > declare var d3: D3.Base;
    > ```
    >

  - #### 类型声明文件的来源

    - **TS 编译器生成**：只要启用编译选项`declaration`，编译器就会在编译时自动生成单独的类型声明文件。

    - ##### TS 内置类型声明文件：

      > 安装 TypeScript 语言时，会同时安装一些内置的类型声明文件，主要是内置的全局对象（JavaScript 语言接口和运行环境 API）的类型声明。这些内置声明文件位于 TypeScript 语言安装目录的`lib`目录中，数量大概有几十个，下面是其中一些主要文件：
      >
      > - lib.d.ts
      > - lib.dom.d.ts
      > - lib.es2015.d.ts
      > - lib.es2016.d.ts
      > - lib.es2017.d.ts
      > - lib.es2018.d.ts
      > - lib.es2019.d.ts
      > - lib.es2020.d.ts
      > - lib.es5.d.ts
      > - lib.es6.d.ts
      >
      > 这些内置声明文件的文件名统一为`lib.[description].d.ts`的形式，其中`description`部分描述了文件内容。比如，`lib.dom.d.ts`这个文件就描述了 DOM 结构的类型。
      >
      > 如果开发者想了解全局对象的类型接口（比如 ES6 全局对象的类型），那么就可以去查看这些内置声明文件。
      >
      > TypeScript 编译器会自动根据编译选项`target`的值，加载对应的内置声明文件，所以不需要特别的配置。但是，可以使用编译选项`lib`，指定加载哪些内置声明文件。（编译选项`noLib`会禁止加载任何内置声明文件）

    - ##### 外部模块的类型声明文件，需要通过`npm`来安装：

      > 如果项目中使用了外部的某个第三方代码库（JS），那么就需要这个库的类型声明文件。这时又分成三种情况：

      - **这个库自带了类型声明文件**：一般来说，如果这个库的源码包含了`库名.d.ts`文件，那么就自带了类型声明文件。此时TypeScript 一般会自动加载这些类型声明文件，无需额外配置。（类型声明文件的位置一般在`package.json`的`types`或`typings`字段中指定，或是`包名.d.ts`和`index.d.ts`）

      - **这个库没有自带，但是可以找到社区制作的类型声明文件（`@types/xxx`）**：第三方库如果没有提供类型声明文件，社区往往会提供。TypeScript 社区主要使用 DefinitelyTyped 仓库，各种类型声明文件都会提交到那里，已经包含了几千个第三方库。这些声明文件都会作为一个单独的库，发布到 npm 的`@types/xxx`包下。比如，jQuery 的类型声明文件就发布成`@types/jquery`这个库，使用时安装这个库就可以了。

        > **注意：**
        >
        > 1. TS 会自动加载`node_modules/@types`目录下的模块，可以使用编译配置项`typeRoots`来改变这种行为。
        > 2. 默认情况下，TypeScript 会自动加载`typeRoots`指定的这些目录中的所有模块，编译选项`types`可以指定加载这些目录中的哪些模块。

      - **找不到类型声明文件，那就需要自己写了。**（或者用declare声明模块名，这样其中的接口都为any类型）

  - #### 模块发布

    > 当前模块如果包含自己的类型声明文件，可以在 `package.json` 文件里面添加一个`types`字段或`typings`字段，指明类型声明文件的位置。（`types`是新写法，兼容性更好）
    >
    > ```ts
    > {
    >        "name": "awesome",
    >        "author": "Vandelay Industries",
    >        "version": "1.0.0",
    >        "main": "./lib/main.js",
    >        "types": "./lib/main.d.ts"
    > }
    > ```
    >
    > **注意：**如果类型声明文件名为`index.d.ts`，且在项目的根目录中，那就不需要在`package.json`里面注明了。

    > 有些包的类型声明文件会单独发布成一个 npm 模块，这时用户就必须同时安装该模块的类型声明模块。如`browserify`：
    >
    > ```ts
    > {
    >     "name": "browserify-typescript-extension",
    >     "author": "Vandelay Industries",
    >     "version": "1.0.0",
    >     "main": "./lib/main.js",
    >     "types": "./lib/main.d.ts",
    >     "dependencies": {
    >         "browserify": "latest",
    >         "@types/browserify": "latest",  // 其实这个包只安装为开发依赖即可
    >         "typescript": "next"
    >     }
    > }
    > ```
    >
    > 上面示例是某个模块的 `package.json` 文件，该模块需要依赖 browserify 模块。由于后者的类型声明文件是一个单独的模块`@types/browserify`，所以还需要加载那个模块。

  - #### 三斜杠命令

    > 如果类型声明文件的内容非常多，可以拆分成多个文件，然后入口文件使用三斜杠命令，加载其他拆分后的文件。
    
    > 举例来说，入口文件是`main.d.ts`，里面的接口定义在`interfaces.d.ts`，函数定义在`functions.d.ts`。那么，`main.d.ts`里面可以用三斜杠命令，加载后面两个文件。
    >
    > ```ts
    > /// <reference path="./interfaces.d.ts" />
    > /// <reference path="./functions.d.ts" />
    > ```
    >
    > 注意：
    >
    > - 三斜杠命令（`///`）是一个 TypeScript 编译器命令，用来指定编译器行为。它只能用在文件的头部，如果用在其他地方，会被当作普通的注释。另外，**若一个文件中使用了三斜线命令，那么在三斜线命令之前只允许使用单行注释、多行注释和其他三斜线命令，否则三斜杠命令也会被当作普通的注释**。
    > - 除了拆分类型声明文件，**普通 TS 脚本中也可以使用三斜杠命令来引入类型声明文件**。
    
    > 三斜杠命令主要包含三个参数，代表三种不同的命令：
    
    - **path：**`/// <reference path="" />`是最常见的三斜杠命令，告诉编译器在编译时需要包括的类型文件（`.d.ts`或`.ts`），常用来声明当前脚本依赖的类型声明文件。
    
      > ```ts
      > /// <reference path="./lib.ts" />
      > let count = add(1, 2);
      > ```
      >
      > 上面示例表示，当前脚本依赖于`./lib.ts`，里面是`add()`的定义。编译当前脚本时，还会同时编译`./lib.ts`。编译产物会有两个 JS 文件，一个当前脚本，另一个就是`./lib.js`。
      >
      > 下面的例子是当前脚本依赖于 Node.js 类型声明文件。
      >
      > ```ts
      > /// <reference path="node.d.ts"/>
      > import * as URL from "url";
      > let myUrl = URL.parse("https://www.typescriptlang.org");
      > ```
      >
      > **编译器会在预处理阶段，找出所有三斜杠引用的文件，将其添加到编译列表中，然后一起编译。**
      >
      > `path`参数指定了所引入文件的路径。如果该路径是一个相对路径，则基于当前脚本的路径进行计算。
      >
      > 使用该命令时，有以下两个注意事项。
      >
      > - `path`参数必须指向一个存在的文件，若文件不存在会报错。
      > - `path`参数不允许指向当前文件。
      >
      > 默认情况下，每个三斜杠命令引入的脚本，都会编译成单独的 JS 文件。如果希望编译后只产出一个合并文件，可以使用编译选项`outFile`。但是，**`outFile`编译选项不支持合并 CommonJS 模块和 ES 模块**。只有当编译参数`module`的值设为 None、System 或 AMD 时，才能编译成一个文件。
      >
      > 如果打开了编译参数`noResolve`，则忽略三斜杠指令，将其当作一般的注释，原样保留在编译产物中。
    
    - **types：**`types` 参数用来告诉编译器当前脚本依赖某个 DefinitelyTyped 类型库，通常安装在`node_modules/@types`目录。types 参数的值是类型库的名称，也就是安装到`node_modules/@types`目录中的子目录的名字。
    
      > ```ts
      > /// <reference types="node" />
      > ```
      >
      > 上面示例中，这个三斜杠命令表示编译时添加 Node.js 的类型库，实际添加的脚本是`node_modules`目录里面的`@types/node/index.d.ts`。可以看到，这个命令的作用类似于`import`命令。
      >
      > 注意，这个命令只在你自己手写类型声明文件（`.d.ts`文件）时，才有必要用到。也就是说，只应该出现在`.d.ts`文件中，普通的`.ts`脚本文件不需要写这个命令。如果是普通的`.ts`脚本，可以使用`tsconfig.json`文件的`types`属性指定依赖的类型库。
      
    - **lib：**`/// <reference lib="..." />`命令允许脚本文件显式包含内置 lib 库，等同于在`tsconfig.json`文件里面使用`lib`属性指定 lib 库。
    
      > 前文说过，安装 TypeScript 软件包时，会同时安装一些内置的类型声明文件，即内置的 lib 库。这些库文件位于 TypeScript 安装目录的`lib`文件夹中，它们描述了 JavaScript 语言和引擎的标准 API。
      >
      > 库文件并不是固定的，会随着 TypeScript 版本的升级而更新。库文件统一使用 **lib.[description].d.ts** 的命名方式，而该命令里的`lib`属性的值就是库文件名的`description`部分，比如 `/// <reference lib="es2015" />` 就表示加载库文件`lib.es2015.d.ts`。
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

