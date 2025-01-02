- ### 接口

  > 接口（interface）是对象的模板，可以看作是一种类型约定。使用了某个模板的对象，就拥有了指定的类型结构。接口的主要作用是对象、类、函数等（本质上都是对象），规定一种契约，这样可以确保代码的一致性和安全性。（*注意：接口只能定义格式不能包含任何的实现*）
  >
  > ```ts
  > interface Person {  // 接口的分隔符可以是（; , 换行）
  >     firstName: string
  >     lastName: string
  >     age: number
  > }
  > ```
  >
  > 上面示例中，定义了一个接口`Person`，它指定一个对象模板，都有三个属性`firstName`、`lastName`和`age`。任何实现这个接口的对象，都必须包含这三个属性，并且必须符合规定的类型。实现该接口很简单，只要指定它作为对象的类型即可：（**注意：TS 不区分对象自身的属性和原型上的属性，只要有就行**）
  >
  > ```ts
  > const p: Person = {
  >     firstName: "John",
  >     lastName: "Smith",
  >     age: 25,
  > }
  > ```
  >
  
  ###### 方括号运算符也可以取出接口中某个属性的类型：
  
  ```ts
  interface Foo {
  	a: string;
  }
  type A = Foo["a"]  // string
  ```
  
  ###### 如果希望属性值是只读的，声明时前面加上`readonly`关键字：
  
  ```ts
  const person: {
  	readonly age: number;  // 属性名前面加上readonly关键字，表示这个属性是只读属性，不能修改
  } = { age: 20 };
  person.age = 21;  // 报错
  ```

  ###### 严格字面量检查：
  
  > 如果变量赋值了一个对象字面量，此时会触发 TS 的**严格字面量检查**。此时该变量指向的对象中，有且仅能有接口中定义的这些属性，不能多也不能少：（TypeScript 对字面量进行严格检查的目的，主要是防止拼写错误，可以使用类型断言规避严格字面量检查）
  
  ```ts
  const p: {
      firstName: string
      lastName: string
      age: number
  } = {
      firstName: "John",
      lastName: "Smith",
      age: 25,
      sex: '男',  // 报错，不能多一个sex属性
  }
  ```

  > 编译器选项`suppressExcessPropertyErrors`，可以关闭多余属性检查。下面是它在 tsconfig.json 文件里面的写法：
  >
  > ```json
  > {
  >     "compilerOptions": {
  >     	"suppressExcessPropertyErrors": true
  >     }
  > }
  > ```
  
  ###### 最小可选属性规则：
  
  > 如果一个对象的所有属性都是可选的，会触发最小可选属性规则。
  >
  > ```ts
  > type Options = {
  >     a?: number;
  >     b?: number;
  >     c?: number;
  > }
  > const obj: Options = {
  >   d: 123, // 报错
  > }
  > ```
  >
  > 上面示例中，类型`Options`是一个对象，它的所有属性都是可选的，这导致任何对象实际都符合`Options`类型。
  >
  > 为了避免这种情况，TypeScript 添加了最小可选属性规则，规定这时属于`Options`类型的对象，必须至少存在一个可选属性，不能所有可选属性都不存在。这就是为什么上例的`myObj`对象会报错的原因。
  
  ###### 接口可以描述对象的各种语法：
  
  - ##### 对象的属性索引（属性名）：
  
    > TypeScript 允许采用**属性名表达式**的写法来描述类型，称为“属性名的索引类型”。索引类型里面，最常见的就是属性名的字符串索引：
  
    ```ts
    interface A {
    	[prop: string]: number
    }
    ```
  
    > - 上面示例中，接口`A`的属性名类型就采用了表达式形式，写在方括号里面。`[prop: string]`的`prop`表示属性名，这个是可以随便起的，它的类型是`string`，即属性名类型为`string`。也就是说，不管这个对象有多少属性，只要属性名为字符串，且属性值是number，就符合这个类型声明。
    >
    > - 属性索引共有`string`、`number`和`symbol`三种类型。一个接口中，字符串索引和数值索引最多定义一个。字符串索引会约束该类型中所有名字为字符串的属性；属性的数值索引，其实约定的是数组元素的类型。
    >
    >   ```ts
    >   interface A {
    >   	[prop: number]: string
    >   }
    >   const obj: A = ["a", "b", "c"]
    >   ```
    >
    > - 如果一个 interface 同时定义了字符串索引和数值索引，那么数值索引必须兼容字符串索引的类型声明。因为在 JavaScript 中，数值属性名最终会自动转换成字符串属性名。
  
  - ##### 对象的方法：
  
    ```ts
    // 写法一
    interface A {
    	f(x: boolean): string  // 该对象中必须包含f方法
    }
    // 写法二
    interface B {
    	f: (x: boolean) => string  // 该对象中必须包含f属性，它的值是一个函数
    }
    // 写法三
    interface C {
    	(x: boolean): string  // 类型C是一个函数，因为JS中函数是特殊的对象
    }
    ```
  
    > - 前面加`new`关键字，表示构造函数：
    >
    >   ```ts
    >   interface StudentConstructor {
    >   	new (message?: string): Student
    >   }
    >   ```
    >
    > - 属性名可以采用表达式，所以下面的写法也是可以的。
    >
    >   ```ts
    >   const f = "f";
    >   interface A {
    >   	[f](x: boolean): string;
    >   }
    >   ```
    >
    > - 接口中，方法的类型也可以重载。
    >
    >   ```ts
    >   interface A {
    >       f(): number;
    >       f(x: boolean): boolean;
    >       f(x: string, y: string): string;
    >   }
    >   ```
    >
    >   > interface 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。
    >   >
    >   > ```ts
    >   > interface A {
    >   >     f(): number;
    >   >     f(x: boolean): boolean;
    >   >     f(x: string, y: string): string;
    >   > }
    >   > 
    >   > function MyFunc(): number;
    >   > function MyFunc(x: boolean): boolean;
    >   > function MyFunc(x: string, y: string): string;
    >   > function MyFunc(x?: boolean | string, y?: string): number | boolean | string {
    >   >     if (x === undefined && y === undefined) return 1;
    >   >     if (typeof x === "boolean" && y === undefined) return true;
    >   >     if (typeof x === "string" && typeof y === "string") return "hello";
    >   >     throw new Error("wrong parameters");
    >   > }
    >   > 
    >   > const a: A = {
    >   > 	f: MyFunc,
    >   > };
    >   > ```
  
  ###### 接口的继承：
  
  > 接口可以使用`extends`关键字继承其他的接口，并且可以多继承。多重接口继承，实际上相当于多个父接口合并之后再继承。
  
  - 如果子接口与父接口存在同名属性，那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。
  - 多重继承时，如果多个父接口存在同名属性，那么这些同名属性同样要兼容，否则会报错。
  - 接口继承class：todo
  
  ###### 接口合并：
  
  > 多个同名接口会自动合并成一个接口（当然合并时类型也要兼容）。
  >
  > 这是因为，JavaScript 开发者常常对全局对象或者外部库，添加自己的属性和方法。那么，只要使用 interface 给出这些自定义属性和方法的类型，就能自动跟原始的 interface 合并，使得扩展外部类型非常方便。
  
  - 同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。
  
    ```ts
    interface Cloner {
    	clone(animal: Animal): Animal;
    }
    interface Cloner {
    	clone(animal: Sheep): Sheep;
    }
    interface Cloner {
        clone(animal: Dog): Dog;
        clone(animal: Cat): Cat;
    }
    // 等同于
    interface Cloner {
        clone(animal: Dog): Dog;
        clone(animal: Cat): Cat;
        clone(animal: Sheep): Sheep;
        clone(animal: Animal): Animal;
    }
    ```
  
    > 上面示例中，`clone()`方法有不同的类型声明，会发生函数重载。这时，**越靠后的定义，优先级越高，排在函数重载的越前面。**比如，`clone(animal: Animal)`是最先出现的类型声明，就排在函数重载的最后，属于`clone()`函数最后匹配的类型。**这个规则有一个例外，同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。**
  
  - 如果两个 interface 组成的联合类型存在同名属性，那么该属性的类型也是联合类型。
  
    ```ts
    interface Circle {
      area: bigint;
    }
    interface Rectangle {
      area: number;
    }
    declare const s: Circle | Rectangle;
    s.area; // bigint | number
    ```
  
    



> 

> - 定义类的接口：（类要用`implements`来实现某个接口）
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
>   > 
>   >
>   > ```ts
>   > 
>   > ```
>
> - 定义对象的接口：
>
>   ```ts
>   interface Person {
>       readonly name: string  // 如果属性是只读的，需要加上 readonly 修饰符
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
>  name: '张三',
>  age: 11
> }
> ```
>
> 接口中我们还可以将数组的索引值和元素设置为不同类型。索引值可以是数字或字符串。
>
> ```ts
> // 设置元素为字符串类型
> interface namelist { 
> [index: number]: string 
> }
> // 类型一致，正确
> var list2: namelist = ["Google","Runoob","Taobao"]
> // 错误元素 1 不是 string 类型
> // var list2: namelist = ["Runoob",1,"Taobao"]
> ```
>
> **接口继承**：接口继承就是说接口可以通过继承其他接口来扩展自己。Typescript 允许接口继承多个接口，继承使用关键字**extends**。继承语法格式：`接口名 extends 接口1,接口2,.. {}`。