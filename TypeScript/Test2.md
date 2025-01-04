- ### 接口

  > 接口（interface）是对象的模板，可以看作是一种类型约定。使用了某个模板的对象，就拥有了指定的类型结构。接口的主要作用是对象、类、函数等（本质上都是对象），规定一种契约，这样可以确保代码的一致性和安全性。
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
  > **注意：**
  >
  > 1. 接口只能定义格式不能包含任何的实现。
  > 2. interface 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法。

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

  > 如果变量赋值了一个对象字面量，此时会触发 TS 的**严格字面量检查**。此时该变量指向的对象中，有且仅能有接口中定义的这些属性，不能多也不能少：（TypeScript 对字面量进行严格检查的目的，主要是防止拼写错误，可以使用*类型断言规避严格字面量检查*）

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
  >        "compilerOptions": {
  >        	"suppressExcessPropertyErrors": true
  >        }
  > }
  > ```

  ###### 最小可选属性规则：

  > 如果一个对象的所有属性都是可选的，会触发最小可选属性规则。
  >
  > ```ts
  > type Options = {
  >        a?: number;
  >        b?: number;
  >        c?: number;
  > }
  > const obj: Options = {
  >   	d: 123, // 报错
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
    >   > 注意：接口里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。
    >   >
    >   > ```ts
    >   > interface A {
    >   >        f(): number;
    >   >        f(x: boolean): boolean;
    >   >        f(x: string, y: string): string;
    >   > }
    >   > 
    >   > function MyFunc(): number;
    >   > function MyFunc(x: boolean): boolean;
    >   > function MyFunc(x: string, y: string): string;
    >   > function MyFunc(x?: boolean | string, y?: string): number | boolean | string {
    >   >        if (x === undefined && y === undefined) return 1;
    >   >        if (typeof x === "boolean" && y === undefined) return true;
    >   >        if (typeof x === "string" && typeof y === "string") return "hello";
    >   >        throw new Error("wrong parameters");
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

  - 两个接口组成的联合类型若存在同名属性，那么该属性的类型也是联合类型。

    ```ts
    interface Circle {
        area: bigint;
    }
    interface Rectangle {
        area: number;
    }
    declare const s: Circle | Rectangle;
    s.area;  // bigint | number
    ```

- ### 类

  > 类（class）是面向对象编程的基本构件，封装了属性和方法，TypeScript 给予了全面支持。

  - **属性的类型：**类的属性可以在顶层声明，也可以在构造方法内部声明。对于顶层声明的属性，可以在声明时同时给出类型。如果不给出类型，TypeScript 会认为`x`和`y`的类型都是`any`。

    ```ts
    class Point {
        x: number;
        y = 1;  // 如果声明时给出初值，可以不写类型，TS 会自行推断属性的类型
        readonly id = "foo";  // 属性名前面加上 readonly 修饰符，就表示该属性是只读的，实例对象不能去修改。
        /* 注意：构造方法里面可以修改 readonly 只读属性的值 */
    }
    ```

    > TypeScript 有一个配置项`strictPropertyInitialization`，只要打开，就会检查类的属性是否设置了初值，如果没有就报错。但是某些情况下，不是在声明时赋值或在构造方法里面赋值，为了防止报错，可以使用非空断言。

    ###### 注意：类中的构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象。

  - **getter和setter：**TS 对存取器有以下规则。

    1. 如果某个属性只有`get`方法，没有`set`方法，那么该属性自动成为只读属性。
    2. `set`方法的参数类型，必须兼容`get`方法的返回值类型，否则报错。
    3. `get`方法与`set`方法的可访问性必须一致，要么都为公开方法，要么都为私有方法。

  - **属性索引：**类中同样允许定义属性索引。

    ```ts
    class MyClass {
        [s: string]: boolean | ((s: string) => boolean)
        get(s: string) {
            return this[s] as boolean
        }
    }
    ```

  - **类实现接口（`implements`）：**类用`implements`可以实现某个接口，从而为类指定一组检查条件。

    > `implements`关键字后面，不仅可以是接口，也可以是另一个类。这时，后面的类将被当作接口。
    >
    > ```ts
    > class Car {
    >     id: number = 1
    >     move(): void {}
    > }
    > class MyCar implements Car {
    >     id = 2  // 不可省略
    >     move(): void {}  // 不可省略
    > }
    > ```

  - **类与接口的合并：**TS 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类。

    ```ts
    class A {
        x: number = 1
    }
    interface A {
        y: number
    }
    let a = new A()
    a.y = 10
    a.x  // 1
    a.y  // 10
    ```

    上面示例中，类`A`与接口`A`同名，后者会被合并进前者的类型定义。

  - **类的类型：**TS 中的类本身就是一种类型。

    ```ts
    class Color {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    const green: Color = new Color("green");
    ```

    > 上面示例中，定义了一个类`Color`。它的类名就代表一种类型，实例对象`green`就属于该类型。
    >
    > 但是这个Color不能直接拿来当类型来用，因为本质上来说Color是一个函数，所以这样写会报错：
    >
    > ```ts
    > // 报错
    > function createPoint(PointClass: Point, x: number, y: number) {
    > 	return new PointClass(x, y);
    > }
    > ```
    >
    > PointClass变量的类型是Point，但是前面要加上typeof，否则会报错。
    >
    > ```ts
    > function createPoint(PointClass: typeof Point, x: number, y: number): Point {
    > 	return new PointClass(x, y);
    > }
    > ```
    >
    > 或者这样做：由于在 JS 中，类只是构造函数的一种语法糖，本质上是构造函数的另一种写法。所以，类的自身类型可以写成构造函数的形式。
    >
    > ```ts
    > function createPoint(
    > 	PointClass: new (x: number, y: number) => Point,
    >     // 或者用接口的写法：
    > 	// PointClass: {
    > 	//	new (x: number, y: number): Point;
    > 	// },
    > 	x: number,
    > 	y: number,
    > ): Point {
    > 	return new PointClass(x, y);
    > }
    > ```

  - **结构类型原则：**

    > 和接口一样，类也遵循**结构类型原则**。一个对象只要满足类的实例结构，就跟该类属于同一个类型。
    >
    > 由于这种情况，运算符`instanceof`不适用于判断某个对象是否跟某个 class 属于同一类型，它只是原型链上的判断。
    >
    > **注意，确定两个类的兼容关系时，只检查实例成员，不考虑静态成员和构造方法**
    >
    > 如果类中存在私有成员（private）或保护成员（protected），那么确定兼容关系时，TypeScript 要求私有成员和保护成员来自同一个类，这意味着两个类需要存在继承关系。

    

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
  >   
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

    

- 


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