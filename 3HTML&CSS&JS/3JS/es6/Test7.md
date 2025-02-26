- ## Promise 对象

  > > `Promise`是ES6提供的新的**异步编程解决方案**。从语法上来说Promise是一个构造函数，可以进行对象的实例化，通过实例化的promise对象可以封装一个异步操作，并且保存该异步操作执行成功或失败的结果值。
  >
  > - #### 使用Promise的好处：
  >
  >   > 1. 指定回调函数的方式更加灵活。以往我们必须在启动异步任务之前就指定其回调，使用Promise可以在异步任务结束之后再指定（一个或多个）回调。
  >   > 2. 支持链式调用，可以解决**回调地狱**问题。代码逻辑也更加清晰。
  >   >
  >   > > **回调地狱：**在回调函数中继续调用另一个回调，层层嵌套下去就形成了回调地狱。此时回调函数的层级很深，代码耦合度高可读性差，牵一发而动全身，且异常捕获比较困难。
  >
  > - #### Promise的基本使用：
  >
  >   1. 使用Promise构造函数来实例化一个promise对象，用于封装异步操作：
  >
  >      ```js
  >      const p = new Promise((resolve, reject) => {
  >          /* 这里写异步操作，当操作成功则调用resolve()，失败则调用reject() */
  >      })
  >      ```
  >
  >      > - Promise构造器接收一个函数作为参数（该函数体中的代码是同步执行的），我们将要执行的异步操作写在该函数中即可。这样实例化的promise对象就会帮我们管理函数中的异步操作了。
  >      > - 该函数有2个函数型的形参`resolve(v)`和`reject(v)`。当异步任务执行成功时我们就调用resolve(v)并传进去成功的结果值，当异步任务执行失败时我们则调用reject(v)传进去失败的结果值。
  >      > - `resolve(v)`和`reject(v)`第1次执行后，会将当前promise对象的状态分别设置为成功和失败。并且会在promise对象中保存成功或失败的结果值。（之后再执行resolve/reject，promise对象中的结果值会变，但状态不会再变了）
  >
  >   2. 调用promise对象的实例方法`then()`，给异步操作指定成功或失败时要执行的回调：
  >
  >      ```js
  >      p.then(
  >          (v)=>{},
  >          (v)=>{}
  >      )
  >      ```
  >
  >      > - then()方法接收2个函数作为参数。第1个函数是promise对象的状态变为成功时要执行的回调，第2个函数是状态变为失败时要执行的回调。这俩函数的参数是promise对象中保存的（成功或失败的）结果值。
  >      > - **then()方法的返回值是一个新的promise对象**。
  >      > - 可以多次调用`then()`方法去指定多个成功或失败的回调，这些回调会按照注册的顺序依次执行。
  >
  > - #### Promise对象的状态和结果值：
  >
  >   > - 状态其实是promise对象中的一个私有属性`[[PromiseState]]`。它的值有3种：**pending（未决定）**、**resolved/fulfilled（成功）**、**rejected（失败）**。
  >   >
  >   > - promise对象初始化时默认是pending状态。之后该对象的**状态只会变一次**且只有如下2种改变方式：
  >   >
  >   >   1. pending ==> resolved
  >   >   2. pending ==> rejected
  >   >
  >   >   这两种状态的改变分别是在第1次调用`resolve(v)`和`reject(v)`时发生的。当promise对象的状态发生变化时，会立即调用then()方法中指定的成功或失败的回调。
  >   >
  >   > - 只有第1次调用resolve()或reject()函数时，promise对象的状态才会发生变化，后面再调用状态也不会变了，变的只是promise中保存的结果值。
  >   >
  >   > - 无论状态变为成功还是失败，promise对象中都会保存一个结果值（一般成功结果值叫value、失败结果值叫reason）。它是promise对象中的一个私有属性`[[PromiseResult]]`。只有执行了resolve(v)和reject(v)函数才可以修改promise对象中的结果值。
  >   >
  >   > - 若promise对象中封装的异步操作发生了异常，promise对象的状态也会变为失败rejected，此时失败的结果值为异常实例。也就是说：**throw语句也可以改变promise对象的状态**。
  >
  > - #### Promise API：
  >
  >   > - **Promise.prototype.catch(callback)：**用于指定失败时的回调。它其实是由then()做了单独的封装。
  >   >
  >   > - **Promise.resolve(v)：**根据传入的值的类型，快速返回一个成功或失败状态的promise对象。规则为：
  >   >
  >   >   > - 如果传入的值为非promise对象，则返回成功的promise对象。结果值为传入的值。
  >   >   > - 如果传入的值为promise对象，则根据该promise返回一个新的promise对象。结果值和状态都来自于传入的promise。
  >   >
  >   > - **Promise.reject(v)：**将参数作为结果值，快速返回一个失败状态的promise对象。（只会返回失败的promise）
  >   >
  >   > - **Promise.all(iterable)：**参数`iterable`是一个可迭代对象（如数组、Set、Map 等），其中每个元素都是一个promise对象或可以被转为promise对象的值，一般是一个promise对象的数组。该函数返回一个新的promise对象，只有传入的所有promise对象的状态都成功，这个新的promise的状态才算成功。成功的结果是所有promise对象成功结果值所组成的数组（顺序一致）；失败的结果是所有promise中，第一个失败的promise的结果值。
  >   >
  >   > - **Promise.race(promises)：**它和上面的all类似，区别在于：`Promise.race`会立即返回第一个被解决或拒绝的promise对象，以它的状态和结果值作为新的promise对象返回。
  >
  > - #### Promise的关键问题：
  >
  >   - **`then()`方法返回的新的promise对象的结果和状态由什么来决定？**
  >
  >     > 新的promise对象的结果和状态由指定回调的执行结果来决定的。具体如下：
  >     >
  >     > - 如果回调执行时抛出了异常，此时新的promise对象的结果值为抛出的异常，状态为失败rejected。
  >     > - 返回结果不是一个promise对象，此时新的promise对象的结果为返回值，状态为成功resolved。
  >     > - 返回结果是一个promise对象，此时新的promise对象的结果和返回值和该promise对象保持一致。
  >     >
  >     > 根据then()方法的返回结果可以实现**Promise的链式调用**。
  >
  >   - **Promise的异常穿透**
  >
  >     > 当使用then()进行多次链式调用时，可以在最后去指定一个失败的回调即可，中间的then()不需要指定失败的回调。因为如果其中任何一层的异步任务失败了，都会抛出一个Error对象，如果错误没有指定失败的回调去捕获处理的话，会一直传递到最后的catch()方法中。
  >
  >   - **中断Promise链**
  >
  >     > 根据then()方法返回值来推断：只有返回一个pending状态的promise对象才能够中断Promise链：`return new Promise(()=>{})`。
  >
  > - #### await和async：（ES8）
  >
  >   - ##### 关于async异步函数：
  >
  >     > - 使用`async`关键字标识的函数是**Async函数**（表示函数中有异步任务），它的返回结果是一个promise对象。该promise对象的结果值是由Async函数的返回值来决定的（和then()方法的规则一样的）。
  >     > - 只有在**Async函数**中才允许使用`await`关键字（也可以不使用）。
  >
  >   - ##### 关于await：
  >
  >     > - 在一个表达式左边加上`await`关键字，这样的表达式被称为**await表达式**。通过在Async函数中使用await表达式可以取代.then()回调函数的写法，简化Promise代码。
  >     > - await关键字会**暂停**JS语句的执行，等待异步操作成功完成后，将成功的结果值作为整个表达式的返回值。
  >     > - await的右侧一般为promise对象。当await表达式右侧为promise对象时，整个表达式的结果是promise对象成功状态的结果值；当await右侧不是promise对象时，await表达式的结果就是await右侧表达式的值。也就是说：**给返回值非promise对象的表达式左侧加await，不会对表达式的值有任何影响**。
  >
  >   ###### 注意：若await表达式右侧是一个失败状态的promise对象，那么该语句会抛出异常。此时需要通过try...catch去捕获失败状态promise对象的结果值。
  >
  > - #### Promise的自定义封装

  > ## Promise 的含义
  >
  > Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。
  >
  > 所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
  >
  > `Promise`对象有以下两个特点。
  >
  > （1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
  >
  > （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
  >
  > 注意，为了行文方便，本章后面的`resolved`统一只指`fulfilled`状态，不包含`rejected`状态。
  >
  > 有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。
  >
  > `Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
  >
  > 如果某些事件不断地反复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署`Promise`更好的选择。
  >
  > ## 基本用法
  >
  > ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。
  >
  > 下面代码创造了一个`Promise`实例。
  >
  > ```
  > const promise = new Promise(function(resolve, reject) {
  >   // ... some code
  > 
  >   if (/* 异步操作成功 */){
  >     resolve(value);
  >   } else {
  >     reject(error);
  >   }
  > });
  > ```
  >
  > `Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
  >
  > `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
  >
  > `Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。
  >
  > ```
  > promise.then(function(value) {
  >   // success
  > }, function(error) {
  >   // failure
  > });
  > ```
  >
  > `then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。这两个函数都是可选的，不一定要提供。它们都接受`Promise`对象传出的值作为参数。
  >
  > 下面是一个`Promise`对象的简单例子。
  >
  > ```
  > function timeout(ms) {
  >   return new Promise((resolve, reject) => {
  >     setTimeout(resolve, ms, 'done');
  >   });
  > }
  > 
  > timeout(100).then((value) => {
  >   console.log(value);
  > });
  > ```
  >
  > 上面代码中，`timeout`方法返回一个`Promise`实例，表示一段时间以后才会发生的结果。过了指定的时间（`ms`参数）以后，`Promise`实例的状态变为`resolved`，就会触发`then`方法绑定的回调函数。
  >
  > Promise 新建后就会立即执行。
  >
  > ```
  > let promise = new Promise(function(resolve, reject) {
  >   console.log('Promise');
  >   resolve();
  > });
  > 
  > promise.then(function() {
  >   console.log('resolved');
  > });
  > 
  > console.log('Hi!');
  > 
  > // Promise
  > // Hi!
  > // resolved
  > ```
  >
  > 上面代码中，Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。
  >
  > 下面是异步加载图片的例子。
  >
  > ```
  > function loadImageAsync(url) {
  >   return new Promise(function(resolve, reject) {
  >     const image = new Image();
  > 
  >     image.onload = function() {
  >       resolve(image);
  >     };
  > 
  >     image.onerror = function() {
  >       reject(new Error('Could not load image at ' + url));
  >     };
  > 
  >     image.src = url;
  >   });
  > }
  > ```
  >
  > 上面代码中，使用`Promise`包装了一个图片加载的异步操作。如果加载成功，就调用`resolve`方法，否则就调用`reject`方法。
  >
  > 下面是一个用`Promise`对象实现的 Ajax 操作的例子。
  >
  > ```
  > const getJSON = function(url) {
  >   const promise = new Promise(function(resolve, reject){
  >     const handler = function() {
  >       if (this.readyState !== 4) {
  >         return;
  >       }
  >       if (this.status === 200) {
  >         resolve(this.response);
  >       } else {
  >         reject(new Error(this.statusText));
  >       }
  >     };
  >     const client = new XMLHttpRequest();
  >     client.open("GET", url);
  >     client.onreadystatechange = handler;
  >     client.responseType = "json";
  >     client.setRequestHeader("Accept", "application/json");
  >     client.send();
  > 
  >   });
  > 
  >   return promise;
  > };
  > 
  > getJSON("/posts.json").then(function(json) {
  >   console.log('Contents: ' + json);
  > }, function(error) {
  >   console.error('出错了', error);
  > });
  > ```
  >
  > 上面代码中，`getJSON`是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个`Promise`对象。需要注意的是，在`getJSON`内部，`resolve`函数和`reject`函数调用时，都带有参数。
  >
  > 如果调用`resolve`函数和`reject`函数时带有参数，那么它们的参数会被传递给回调函数。`reject`函数的参数通常是`Error`对象的实例，表示抛出的错误；`resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。
  >
  > ```
  > const p1 = new Promise(function (resolve, reject) {
  >   // ...
  > });
  > 
  > const p2 = new Promise(function (resolve, reject) {
  >   // ...
  >   resolve(p1);
  > })
  > ```
  >
  > 上面代码中，`p1`和`p2`都是 Promise 的实例，但是`p2`的`resolve`方法将`p1`作为参数，即一个异步操作的结果是返回另一个异步操作。
  >
  > 注意，这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数将会立刻执行。
  >
  > ```
  > const p1 = new Promise(function (resolve, reject) {
  >   setTimeout(() => reject(new Error('fail')), 3000)
  > })
  > 
  > const p2 = new Promise(function (resolve, reject) {
  >   setTimeout(() => resolve(p1), 1000)
  > })
  > 
  > p2
  >   .then(result => console.log(result))
  >   .catch(error => console.log(error))
  > // Error: fail
  > ```
  >
  > 上面代码中，`p1`是一个 Promise，3 秒之后变为`rejected`。`p2`的状态在 1 秒之后改变，`resolve`方法返回的是`p1`。由于`p2`返回的是另一个 Promise，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态。所以，后面的`then`语句都变成针对后者（`p1`）。又过了 2 秒，`p1`变为`rejected`，导致触发`catch`方法指定的回调函数。
  >
  > 注意，调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。
  >
  > ```
  > new Promise((resolve, reject) => {
  >   resolve(1);
  >   console.log(2);
  > }).then(r => {
  >   console.log(r);
  > });
  > // 2
  > // 1
  > ```
  >
  > 上面代码中，调用`resolve(1)`以后，后面的`console.log(2)`还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
  >
  > 一般来说，调用`resolve`或`reject`以后，Promise 的使命就完成了，后继操作应该放到`then`方法里面，而不应该直接写在`resolve`或`reject`的后面。所以，最好在它们前面加上`return`语句，这样就不会有意外。
  >
  > ```
  > new Promise((resolve, reject) => {
  >   return resolve(1);
  >   // 后面的语句不会执行
  >   console.log(2);
  > })
  > ```
  >
  > ## Promise.prototype.then()
  >
  > Promise 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。
  >
  > `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。
  >
  > ```
  > getJSON("/posts.json").then(function(json) {
  >   return json.post;
  > }).then(function(post) {
  >   // ...
  > });
  > ```
  >
  > 上面的代码使用`then`方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
  >
  > 采用链式的`then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该`Promise`对象的状态发生变化，才会被调用。
  >
  > ```
  > getJSON("/post/1.json").then(function(post) {
  >   return getJSON(post.commentURL);
  > }).then(function (comments) {
  >   console.log("resolved: ", comments);
  > }, function (err){
  >   console.log("rejected: ", err);
  > });
  > ```
  >
  > 上面代码中，第一个`then`方法指定的回调函数，返回的是另一个`Promise`对象。这时，第二个`then`方法指定的回调函数，就会等待这个新的`Promise`对象状态发生变化。如果变为`resolved`，就调用第一个回调函数，如果状态变为`rejected`，就调用第二个回调函数。
  >
  > 如果采用箭头函数，上面的代码可以写得更简洁。
  >
  > ```
  > getJSON("/post/1.json").then(
  >   post => getJSON(post.commentURL)
  > ).then(
  >   comments => console.log("resolved: ", comments),
  >   err => console.log("rejected: ", err)
  > );
  > ```
  >
  > ## Promise.prototype.catch()
  >
  > `Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。
  >
  > ```
  > getJSON('/posts.json').then(function(posts) {
  >   // ...
  > }).catch(function(error) {
  >   // 处理 getJSON 和 前一个回调函数运行时发生的错误
  >   console.log('发生错误！', error);
  > });
  > ```
  >
  > 上面代码中，`getJSON()`方法返回一个 Promise 对象，如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。
  >
  > ```
  > p.then((val) => console.log('fulfilled:', val))
  >   .catch((err) => console.log('rejected', err));
  > 
  > // 等同于
  > p.then((val) => console.log('fulfilled:', val))
  >   .then(null, (err) => console.log("rejected:", err));
  > ```
  >
  > 下面是一个例子。
  >
  > ```
  > const promise = new Promise(function(resolve, reject) {
  >   throw new Error('test');
  > });
  > promise.catch(function(error) {
  >   console.log(error);
  > });
  > // Error: test
  > ```
  >
  > 上面代码中，`promise`抛出一个错误，就被`catch()`方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。
  >
  > ```
  > // 写法一
  > const promise = new Promise(function(resolve, reject) {
  >   try {
  >     throw new Error('test');
  >   } catch(e) {
  >     reject(e);
  >   }
  > });
  > promise.catch(function(error) {
  >   console.log(error);
  > });
  > 
  > // 写法二
  > const promise = new Promise(function(resolve, reject) {
  >   reject(new Error('test'));
  > });
  > promise.catch(function(error) {
  >   console.log(error);
  > });
  > ```
  >
  > 比较上面两种写法，可以发现`reject()`方法的作用，等同于抛出错误。
  >
  > 如果 Promise 状态已经变成`resolved`，再抛出错误是无效的。
  >
  > ```
  > const promise = new Promise(function(resolve, reject) {
  >   resolve('ok');
  >   throw new Error('test');
  > });
  > promise
  >   .then(function(value) { console.log(value) })
  >   .catch(function(error) { console.log(error) });
  > // ok
  > ```
  >
  > 上面代码中，Promise 在`resolve`语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。
  >
  > Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。
  >
  > ```
  > getJSON('/post/1.json').then(function(post) {
  >   return getJSON(post.commentURL);
  > }).then(function(comments) {
  >   // some code
  > }).catch(function(error) {
  >   // 处理前面三个Promise产生的错误
  > });
  > ```
  >
  > 上面代码中，一共有三个 Promise 对象：一个由`getJSON()`产生，两个由`then()`产生。它们之中任何一个抛出的错误，都会被最后一个`catch()`捕获。
  >
  > 一般来说，不要在`then()`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。
  >
  > ```
  > // bad
  > promise
  >   .then(function(data) {
  >     // success
  >   }, function(err) {
  >     // error
  >   });
  > 
  > // good
  > promise
  >   .then(function(data) { //cb
  >     // success
  >   })
  >   .catch(function(err) {
  >     // error
  >   });
  > ```
  >
  > 上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议总是使用`catch()`方法，而不使用`then()`方法的第二个参数。
  >
  > 跟传统的`try/catch`代码块不同的是，如果没有使用`catch()`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
  >
  > ```
  > const someAsyncThing = function() {
  >   return new Promise(function(resolve, reject) {
  >     // 下面一行会报错，因为x没有声明
  >     resolve(x + 2);
  >   });
  > };
  > 
  > someAsyncThing().then(function() {
  >   console.log('everything is great');
  > });
  > 
  > setTimeout(() => { console.log(123) }, 2000);
  > // Uncaught (in promise) ReferenceError: x is not defined
  > // 123
  > ```
  >
  > 上面代码中，`someAsyncThing()`函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示`ReferenceError: x is not defined`，但是不会退出进程、终止脚本执行，2 秒之后还是会输出`123`。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
  >
  > 这个脚本放在服务器执行，退出码就是`0`（即表示执行成功）。不过，Node.js 有一个`unhandledRejection`事件，专门监听未捕获的`reject`错误，上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误。
  >
  > ```
  > process.on('unhandledRejection', function (err, p) {
  >   throw err;
  > });
  > ```
  >
  > 上面代码中，`unhandledRejection`事件的监听函数有两个参数，第一个是错误对象，第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。
  >
  > 注意，Node 有计划在未来废除`unhandledRejection`事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。
  >
  > 再看下面的例子。
  >
  > ```
  > const promise = new Promise(function (resolve, reject) {
  >   resolve('ok');
  >   setTimeout(function () { throw new Error('test') }, 0)
  > });
  > promise.then(function (value) { console.log(value) });
  > // ok
  > // Uncaught Error: test
  > ```
  >
  > 上面代码中，Promise 指定在下一轮“事件循环”再抛出错误。到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。
  >
  > 一般总是建议，Promise 对象后面要跟`catch()`方法，这样可以处理 Promise 内部发生的错误。`catch()`方法返回的还是一个 Promise 对象，因此后面还可以接着调用`then()`方法。
  >
  > ```
  > const someAsyncThing = function() {
  >   return new Promise(function(resolve, reject) {
  >     // 下面一行会报错，因为x没有声明
  >     resolve(x + 2);
  >   });
  > };
  > 
  > someAsyncThing()
  > .catch(function(error) {
  >   console.log('oh no', error);
  > })
  > .then(function() {
  >   console.log('carry on');
  > });
  > // oh no [ReferenceError: x is not defined]
  > // carry on
  > ```
  >
  > 上面代码运行完`catch()`方法指定的回调函数，会接着运行后面那个`then()`方法指定的回调函数。如果没有报错，则会跳过`catch()`方法。
  >
  > ```
  > Promise.resolve()
  > .catch(function(error) {
  >   console.log('oh no', error);
  > })
  > .then(function() {
  >   console.log('carry on');
  > });
  > // carry on
  > ```
  >
  > 上面的代码因为没有报错，跳过了`catch()`方法，直接执行后面的`then()`方法。此时，要是`then()`方法里面报错，就与前面的`catch()`无关了。
  >
  > `catch()`方法之中，还能再抛出错误。
  >
  > ```
  > const someAsyncThing = function() {
  >   return new Promise(function(resolve, reject) {
  >     // 下面一行会报错，因为x没有声明
  >     resolve(x + 2);
  >   });
  > };
  > 
  > someAsyncThing().then(function() {
  >   return someOtherAsyncThing();
  > }).catch(function(error) {
  >   console.log('oh no', error);
  >   // 下面一行会报错，因为 y 没有声明
  >   y + 2;
  > }).then(function() {
  >   console.log('carry on');
  > });
  > // oh no [ReferenceError: x is not defined]
  > ```
  >
  > 上面代码中，`catch()`方法抛出一个错误，因为后面没有别的`catch()`方法了，导致这个错误不会被捕获，也不会传递到外层。如果改写一下，结果就不一样了。
  >
  > ```
  > someAsyncThing().then(function() {
  >   return someOtherAsyncThing();
  > }).catch(function(error) {
  >   console.log('oh no', error);
  >   // 下面一行会报错，因为y没有声明
  >   y + 2;
  > }).catch(function(error) {
  >   console.log('carry on', error);
  > });
  > // oh no [ReferenceError: x is not defined]
  > // carry on [ReferenceError: y is not defined]
  > ```
  >
  > 上面代码中，第二个`catch()`方法用来捕获前一个`catch()`方法抛出的错误。
  >
  > ## Promise.prototype.finally()
  >
  > `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
  >
  > ```
  > promise
  > .then(result => {···})
  > .catch(error => {···})
  > .finally(() => {···});
  > ```
  >
  > 上面代码中，不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。
  >
  > 下面是一个例子，服务器使用 Promise 处理请求，然后使用`finally`方法关掉服务器。
  >
  > ```
  > server.listen(port)
  >   .then(function () {
  >     // ...
  >   })
  >   .finally(server.stop);
  > ```
  >
  > `finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
  >
  > `finally`本质上是`then`方法的特例。
  >
  > ```
  > promise
  > .finally(() => {
  >   // 语句
  > });
  > 
  > // 等同于
  > promise
  > .then(
  >   result => {
  >     // 语句
  >     return result;
  >   },
  >   error => {
  >     // 语句
  >     throw error;
  >   }
  > );
  > ```
  >
  > 上面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。
  >
  > 它的实现也很简单。
  >
  > ```
  > Promise.prototype.finally = function (callback) {
  >   let P = this.constructor;
  >   return this.then(
  >     value  => P.resolve(callback()).then(() => value),
  >     reason => P.resolve(callback()).then(() => { throw reason })
  >   );
  > };
  > ```
  >
  > 上面代码中，不管前面的 Promise 是`fulfilled`还是`rejected`，都会执行回调函数`callback`。
  >
  > 从上面的实现还可以看到，`finally`方法总是会返回原来的值。
  >
  > ```
  > // resolve 的值是 undefined
  > Promise.resolve(2).then(() => {}, () => {})
  > 
  > // resolve 的值是 2
  > Promise.resolve(2).finally(() => {})
  > 
  > // reject 的值是 undefined
  > Promise.reject(3).then(() => {}, () => {})
  > 
  > // reject 的值是 3
  > Promise.reject(3).finally(() => {})
  > ```
  >
  > ## Promise.all()
  >
  > `Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
  >
  > ```
  > const p = Promise.all([p1, p2, p3]);
  > ```
  >
  > 上面代码中，`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
  >
  > `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。
  >
  > （1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
  >
  > （2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。
  >
  > 下面是一个具体的例子。
  >
  > ```
  > // 生成一个Promise对象的数组
  > const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  >   return getJSON('/post/' + id + ".json");
  > });
  > 
  > Promise.all(promises).then(function (posts) {
  >   // ...
  > }).catch(function(reason){
  >   // ...
  > });
  > ```
  >
  > 上面代码中，`promises`是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。
  >
  > 下面是另一个例子。
  >
  > ```
  > const databasePromise = connectDatabase();
  > 
  > const booksPromise = databasePromise
  >   .then(findAllBooks);
  > 
  > const userPromise = databasePromise
  >   .then(getCurrentUser);
  > 
  > Promise.all([
  >   booksPromise,
  >   userPromise
  > ])
  > .then(([books, user]) => pickTopRecommendations(books, user));
  > ```
  >
  > 上面代码中，`booksPromise`和`userPromise`是两个异步操作，只有等到它们的结果都返回了，才会触发`pickTopRecommendations`这个回调函数。
  >
  > 注意，如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。
  >
  > ```
  > const p1 = new Promise((resolve, reject) => {
  >   resolve('hello');
  > })
  > .then(result => result)
  > .catch(e => e);
  > 
  > const p2 = new Promise((resolve, reject) => {
  >   throw new Error('报错了');
  > })
  > .then(result => result)
  > .catch(e => e);
  > 
  > Promise.all([p1, p2])
  > .then(result => console.log(result))
  > .catch(e => console.log(e));
  > // ["hello", Error: 报错了]
  > ```
  >
  > 上面代码中，`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 Promise 实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用`then`方法指定的回调函数，而不会调用`catch`方法指定的回调函数。
  >
  > 如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。
  >
  > ```
  > const p1 = new Promise((resolve, reject) => {
  >   resolve('hello');
  > })
  > .then(result => result);
  > 
  > const p2 = new Promise((resolve, reject) => {
  >   throw new Error('报错了');
  > })
  > .then(result => result);
  > 
  > Promise.all([p1, p2])
  > .then(result => console.log(result))
  > .catch(e => console.log(e));
  > // Error: 报错了
  > ```
  >
  > ## Promise.race()
  >
  > `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
  >
  > ```
  > const p = Promise.race([p1, p2, p3]);
  > ```
  >
  > 上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。
  >
  > `Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是 Promise 实例，就会先调用下面讲到的`Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。
  >
  > 下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为`reject`，否则变为`resolve`。
  >
  > ```
  > const p = Promise.race([
  >   fetch('/resource-that-may-take-a-while'),
  >   new Promise(function (resolve, reject) {
  >     setTimeout(() => reject(new Error('request timeout')), 5000)
  >   })
  > ]);
  > 
  > p
  > .then(console.log)
  > .catch(console.error);
  > ```
  >
  > 上面代码中，如果 5 秒之内`fetch`方法无法返回结果，变量`p`的状态就会变为`rejected`，从而触发`catch`方法指定的回调函数。
  >
  > ## Promise.allSettled()
  >
  > 有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。
  >
  > `Promise.all()`方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。
  >
  > ```
  > const urls = [url_1, url_2, url_3];
  > const requests = urls.map(x => fetch(x));
  > 
  > try {
  >   await Promise.all(requests);
  >   console.log('所有请求都成功。');
  > } catch {
  >   console.log('至少一个请求失败，其他请求可能还没结束。');
  > }
  > ```
  >
  > 上面示例中，`Promise.all()`可以确定所有请求都成功了，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束。
  >
  > 为了解决这个问题，[ES2020](https://github.com/tc39/proposal-promise-allSettled) 引入了`Promise.allSettled()`方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。
  >
  > `Promise.allSettled()`方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是`fulfilled`还是`rejected`），返回的 Promise 对象才会发生状态变更。
  >
  > ```
  > const promises = [
  >   fetch('/api-1'),
  >   fetch('/api-2'),
  >   fetch('/api-3'),
  > ];
  > 
  > await Promise.allSettled(promises);
  > removeLoadingIndicator();
  > ```
  >
  > 上面示例中，数组`promises`包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），`removeLoadingIndicator()`才会执行。
  >
  > 该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是`fulfilled`，不会变成`rejected`。状态变成`fulfilled`后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。
  >
  > ```
  > const resolved = Promise.resolve(42);
  > const rejected = Promise.reject(-1);
  > 
  > const allSettledPromise = Promise.allSettled([resolved, rejected]);
  > 
  > allSettledPromise.then(function (results) {
  >   console.log(results);
  > });
  > // [
  > //    { status: 'fulfilled', value: 42 },
  > //    { status: 'rejected', reason: -1 }
  > // ]
  > ```
  >
  > 上面代码中，`Promise.allSettled()`的返回值`allSettledPromise`，状态只可能变成`fulfilled`。它的回调函数接收到的参数是数组`results`。该数组的每个成员都是一个对象，对应传入`Promise.allSettled()`的数组里面的两个 Promise 对象。
  >
  > `results`的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。
  >
  > ```
  > // 异步操作成功时
  > {status: 'fulfilled', value: value}
  > 
  > // 异步操作失败时
  > {status: 'rejected', reason: reason}
  > ```
  >
  > 成员对象的`status`属性的值只可能是字符串`fulfilled`或字符串`rejected`，用来区分异步操作是成功还是失败。如果是成功（`fulfilled`），对象会有`value`属性，如果是失败（`rejected`），会有`reason`属性，对应两种状态时前面异步操作的返回值。
  >
  > 下面是返回值的用法例子。
  >
  > ```
  > const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
  > const results = await Promise.allSettled(promises);
  > 
  > // 过滤出成功的请求
  > const successfulPromises = results.filter(p => p.status === 'fulfilled');
  > 
  > // 过滤出失败的请求，并输出原因
  > const errors = results
  >   .filter(p => p.status === 'rejected')
  >   .map(p => p.reason);
  > ```
  >
  > ## Promise.any()
  >
  > ES2021 引入了[`Promise.any()`方法](https://github.com/tc39/proposal-promise-any)。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
  >
  > ```
  > Promise.any([
  >   fetch('https://v8.dev/').then(() => 'home'),
  >   fetch('https://v8.dev/blog').then(() => 'blog'),
  >   fetch('https://v8.dev/docs').then(() => 'docs')
  > ]).then((first) => {  // 只要有一个 fetch() 请求成功
  >   console.log(first);
  > }).catch((error) => { // 所有三个 fetch() 全部请求失败
  >   console.log(error);
  > });
  > ```
  >
  > 只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。
  >
  > `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束。
  >
  > 下面是`Promise()`与`await`命令结合使用的例子。
  >
  > ```
  > const promises = [
  >   fetch('/endpoint-a').then(() => 'a'),
  >   fetch('/endpoint-b').then(() => 'b'),
  >   fetch('/endpoint-c').then(() => 'c'),
  > ];
  > 
  > try {
  >   const first = await Promise.any(promises);
  >   console.log(first);
  > } catch (error) {
  >   console.log(error);
  > }
  > ```
  >
  > 上面代码中，`Promise.any()`方法的参数数组包含三个 Promise 操作。其中只要有一个变成`fulfilled`，`Promise.any()`返回的 Promise 对象就变成`fulfilled`。如果所有三个操作都变成`rejected`，那么`await`命令就会抛出错误。
  >
  > `Promise.any()`抛出的错误是一个 AggregateError 实例（详见《对象的扩展》一章），这个 AggregateError 实例对象的`errors`属性是一个数组，包含了所有成员的错误。
  >
  > 下面是一个例子。
  >
  > ```
  > var resolved = Promise.resolve(42);
  > var rejected = Promise.reject(-1);
  > var alsoRejected = Promise.reject(Infinity);
  > 
  > Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  >   console.log(result); // 42
  > });
  > 
  > Promise.any([rejected, alsoRejected]).catch(function (results) {
  >   console.log(results instanceof AggregateError); // true
  >   console.log(results.errors); // [-1, Infinity]
  > });
  > ```
  >
  > ## Promise.resolve()
  >
  > 有时需要将现有对象转为 Promise 对象，`Promise.resolve()`方法就起到这个作用。
  >
  > ```
  > const jsPromise = Promise.resolve($.ajax('/whatever.json'));
  > ```
  >
  > 上面代码将 jQuery 生成的`deferred`对象，转为一个新的 Promise 对象。
  >
  > `Promise.resolve()`等价于下面的写法。
  >
  > ```
  > Promise.resolve('foo')
  > // 等价于
  > new Promise(resolve => resolve('foo'))
  > ```
  >
  > `Promise.resolve()`方法的参数分成四种情况。
  >
  > **（1）参数是一个 Promise 实例**
  >
  > 如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。
  >
  > **（2）参数是一个`thenable`对象**
  >
  > `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。
  >
  > ```
  > let thenable = {
  >   then: function(resolve, reject) {
  >     resolve(42);
  >   }
  > };
  > ```
  >
  > `Promise.resolve()`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then()`方法。
  >
  > ```
  > let thenable = {
  >   then: function(resolve, reject) {
  >     resolve(42);
  >   }
  > };
  > 
  > let p1 = Promise.resolve(thenable);
  > p1.then(function (value) {
  >   console.log(value);  // 42
  > });
  > ```
  >
  > 上面代码中，`thenable`对象的`then()`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then()`方法指定的回调函数，输出42。
  >
  > **（3）参数不是具有`then()`方法的对象，或根本就不是对象**
  >
  > 如果参数是一个原始值，或者是一个不具有`then()`方法的对象，则`Promise.resolve()`方法返回一个新的 Promise 对象，状态为`resolved`。
  >
  > ```
  > const p = Promise.resolve('Hello');
  > 
  > p.then(function (s) {
  >   console.log(s)
  > });
  > // Hello
  > ```
  >
  > 上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve()`方法的参数，会同时传给回调函数。
  >
  > **（4）不带有任何参数**
  >
  > `Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。
  >
  > 所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。
  >
  > ```
  > const p = Promise.resolve();
  > 
  > p.then(function () {
  >   // ...
  > });
  > ```
  >
  > 上面代码的变量`p`就是一个 Promise 对象。
  >
  > 需要注意的是，立即`resolve()`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
  >
  > ```
  > setTimeout(function () {
  >   console.log('three');
  > }, 0);
  > 
  > Promise.resolve().then(function () {
  >   console.log('two');
  > });
  > 
  > console.log('one');
  > 
  > // one
  > // two
  > // three
  > ```
  >
  > 上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。
  >
  > ## Promise.reject()
  >
  > `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。
  >
  > ```
  > const p = Promise.reject('出错了');
  > // 等同于
  > const p = new Promise((resolve, reject) => reject('出错了'))
  > 
  > p.then(null, function (s) {
  >   console.log(s)
  > });
  > // 出错了
  > ```
  >
  > 上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。
  >
  > `Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。
  >
  > ```
  > Promise.reject('出错了')
  > .catch(e => {
  >   console.log(e === '出错了')
  > })
  > // true
  > ```
  >
  > 上面代码中，`Promise.reject()`方法的参数是一个字符串，后面`catch()`方法的参数`e`就是这个字符串。
  >
  > ## 应用
  >
  > ### 加载图片
  >
  > 我们可以将图片的加载写成一个`Promise`，一旦加载完成，`Promise`的状态就发生变化。
  >
  > ```
  > const preloadImage = function (path) {
  >   return new Promise(function (resolve, reject) {
  >     const image = new Image();
  >     image.onload  = resolve;
  >     image.onerror = reject;
  >     image.src = path;
  >   });
  > };
  > ```
  >
  > ### Generator 函数与 Promise 的结合
  >
  > 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个`Promise`对象。
  >
  > ```
  > function getFoo () {
  >   return new Promise(function (resolve, reject){
  >     resolve('foo');
  >   });
  > }
  > 
  > const g = function* () {
  >   try {
  >     const foo = yield getFoo();
  >     console.log(foo);
  >   } catch (e) {
  >     console.log(e);
  >   }
  > };
  > 
  > function run (generator) {
  >   const it = generator();
  > 
  >   function go(result) {
  >     if (result.done) return result.value;
  > 
  >     return result.value.then(function (value) {
  >       return go(it.next(value));
  >     }, function (error) {
  >       return go(it.throw(error));
  >     });
  >   }
  > 
  >   go(it.next());
  > }
  > 
  > run(g);
  > ```
  >
  > 上面代码的 Generator 函数`g`之中，有一个异步操作`getFoo`，它返回的就是一个`Promise`对象。函数`run`用来处理这个`Promise`对象，并调用下一个`next`方法。
  >
  > ## Promise.try()
  >
  > 实际开发中，经常遇到一种情况：不知道或者不想区分，函数`f`是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管`f`是否包含异步操作，都用`then`方法指定下一步流程，用`catch`方法处理`f`抛出的错误。一般就会采用下面的写法。
  >
  > ```
  > Promise.resolve().then(f)
  > ```
  >
  > 上面的写法有一个缺点，就是如果`f`是同步函数，那么它会在本轮事件循环的末尾执行。
  >
  > ```
  > const f = () => console.log('now');
  > Promise.resolve().then(f);
  > console.log('next');
  > // next
  > // now
  > ```
  >
  > 上面代码中，函数`f`是同步的，但是用 Promise 包装了以后，就变成异步执行了。
  >
  > 那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用`async`函数来写。
  >
  > ```
  > const f = () => console.log('now');
  > (async () => f())();
  > console.log('next');
  > // now
  > // next
  > ```
  >
  > 上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的`async`函数，因此如果`f`是同步的，就会得到同步的结果；如果`f`是异步的，就可以用`then`指定下一步，就像下面的写法。
  >
  > ```
  > (async () => f())()
  > .then(...)
  > ```
  >
  > 需要注意的是，`async () => f()`会吃掉`f()`抛出的错误。所以，如果想捕获错误，要使用`promise.catch`方法。
  >
  > ```
  > (async () => f())()
  > .then(...)
  > .catch(...)
  > ```
  >
  > 第二种写法是使用`new Promise()`。
  >
  > ```
  > const f = () => console.log('now');
  > (
  >   () => new Promise(
  >     resolve => resolve(f())
  >   )
  > )();
  > console.log('next');
  > // now
  > // next
  > ```
  >
  > 上面代码也是使用立即执行的匿名函数，执行`new Promise()`。这种情况下，同步函数也是同步执行的。
  >
  > 鉴于这是一个很常见的需求，所以现在有一个[提案](https://github.com/ljharb/proposal-promise-try)，提供`Promise.try`方法替代上面的写法。
  >
  > ```
  > const f = () => console.log('now');
  > Promise.try(f);
  > console.log('next');
  > // now
  > // next
  > ```
  >
  > 事实上，`Promise.try`存在已久，Promise 库[`Bluebird`](http://bluebirdjs.com/docs/api/promise.try.html)、[`Q`](https://github.com/kriskowal/q/wiki/API-Reference#promisefcallargs)和[`when`](https://github.com/cujojs/when/blob/master/docs/api.md#whentry)，早就提供了这个方法。
  >
  > 由于`Promise.try`为所有操作提供了统一的处理机制，所以如果想用`then`方法管理流程，最好都用`Promise.try`包装一下。这样有[许多好处](http://cryto.net/~joepie91/blog/2016/05/11/what-is-promise-try-and-why-does-it-matter/)，其中一点就是可以更好地管理异常。
  >
  > ```
  > function getUsername(userId) {
  >   return database.users.get({id: userId})
  >   .then(function(user) {
  >     return user.name;
  >   });
  > }
  > ```
  >
  > 上面代码中，`database.users.get()`返回一个 Promise 对象，如果抛出异步错误，可以用`catch`方法捕获，就像下面这样写。
  >
  > ```
  > database.users.get({id: userId})
  > .then(...)
  > .catch(...)
  > ```
  >
  > 但是`database.users.get()`可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用`try...catch`去捕获。
  >
  > ```
  > try {
  >   database.users.get({id: userId})
  >   .then(...)
  >   .catch(...)
  > } catch (e) {
  >   // ...
  > }
  > ```
  >
  > 上面这样的写法就很笨拙了，这时就可以统一用`promise.catch()`捕获所有同步和异步的错误。
  >
  > ```
  > Promise.try(() => database.users.get({id: userId}))
  >   .then(...)
  >   .catch(...)
  > ```
  >
  > 事实上，`Promise.try`就是模拟`try`代码块，就像`promise.catch`模拟的是`catch`代码块。

- ## Iterator 和 for...of 循环

  > > 迭代器是一种接口，为各种不同的数据提供统一的遍历机制。任何数据解构只要实现了该接口，就可以完成遍历操作。
  > >
  > > ES6中新增了一种新的`for of`遍历方式，类似于Java中的forEach，任何对象只要提供了Iterator迭代器接口，就可以使用这种方式遍历。像：`Array、Arguments、Set、Map、String、TypedArray、NodeList...`等都具备了该接口。
  > >
  > > 其实JS中的接口就是对象中的属性。具备迭代器接口就是说对象中存在`Symbol.iterator`属性，该属性的值是一个函数。
  > >
  > > 此时就可以这样遍历：
  >
  > ```javascript
  > const arr = ['孙悟空', '唐僧', '猪八戒']
  > for(let i of arr){
  >     console.log(i)//孙悟空 唐僧 猪八戒
  > }
  > ```
  >
  > > 迭代器原理如下：
  > >
  > > 1. 由`Symbol.iterator`属性对应的函数，由它来创建一个指针对象，指向起始位置。
  > > 2. 第1次调用`next()`方法，指向对象中的第1个成员。
  > > 3. 接下来不断调用`next()`方法，直到指向最后一个成员，此时迭代结束。
  > > 4. 每次`next()`方法的返回值，都是一个包含了2个属性`value`和`done`的一个对象。`value`是数据结构中的成员，`done`是布尔型。`done`为true时迭代结束并退出循环，此时的value是`undefined`
  >
  > > 如果你自己定义的对象数据想用`for of`来遍历，那么就需要定义这样一个迭代器属性，这样：
  >
  > ```js
  > const myObj = {
  >     name: "小王",
  >     age: 13,
  >     address: "南城区老街北11号",
  > 	//定义迭代器属性：Symbol.iterator
  >     [Symbol.iterator](){
  >         let i=1
  >         let _this = this
  >         //该方法必须返回一个next指针对象，指针对象中一定要有next()方法
  >         return {
  >             //next()方法的返回值必须是包含了2个属性`value`和`done`的一个对象
  >             next(){
  >                 switch(i){
  >                     case 1: i++;return {value:_this.name, done:false};
  >                     case 2: i++;return {value:_this.age, done:false};
  >                     case 3: i++;return {value:_this.address, done:false};
  >                     default: return {value:undefined, done:true};
  >                 }
  >             }
  >         }
  >     }
  > }
  > //测试
  > for(let i of myObj){
  >     console.log(i)
  > }
  > ```
  
  
  
  > ## Iterator（遍历器）的概念
  >
  > JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
  >
  > 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
  >
  > Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。
  >
  > Iterator 的遍历过程是这样的。
  >
  > （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
  >
  > （2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
  >
  > （3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
  >
  > （4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。
  >
  > 每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。
  >
  > 下面是一个模拟`next`方法返回值的例子。
  >
  > ```
  > var it = makeIterator(['a', 'b']);
  > 
  > it.next() // { value: "a", done: false }
  > it.next() // { value: "b", done: false }
  > it.next() // { value: undefined, done: true }
  > 
  > function makeIterator(array) {
  > var nextIndex = 0;
  > return {
  >  next: function() {
  >    return nextIndex < array.length ?
  >      {value: array[nextIndex++], done: false} :
  >      {value: undefined, done: true};
  >  }
  > };
  > }
  > ```
  >
  > 上面代码定义了一个`makeIterator`函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组`['a', 'b']`执行这个函数，就会返回该数组的遍历器对象（即指针对象）`it`。
  >
  > 指针对象的`next`方法，用来移动指针。开始时，指针指向数组的开始位置。然后，每次调用`next`方法，指针就会指向数组的下一个成员。第一次调用，指向`a`；第二次调用，指向`b`。
  >
  > `next`方法返回一个对象，表示当前数据成员的信息。这个对象具有`value`和`done`两个属性，`value`属性返回当前位置的成员，`done`属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用`next`方法。
  >
  > 总之，调用指针对象的`next`方法，就可以遍历事先给定的数据结构。
  >
  > 对于遍历器对象来说，`done: false`和`value: undefined`属性都是可以省略的，因此上面的`makeIterator`函数可以简写成下面的形式。
  >
  > ```
  > function makeIterator(array) {
  > var nextIndex = 0;
  > return {
  >  next: function() {
  >    return nextIndex < array.length ?
  >      {value: array[nextIndex++]} :
  >      {done: true};
  >  }
  > };
  > }
  > ```
  >
  > 由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。下面是一个无限运行的遍历器对象的例子。
  >
  > ```
  > var it = idMaker();
  > 
  > it.next().value // 0
  > it.next().value // 1
  > it.next().value // 2
  > // ...
  > 
  > function idMaker() {
  > var index = 0;
  > 
  > return {
  >  next: function() {
  >    return {value: index++, done: false};
  >  }
  > };
  > }
  > ```
  >
  > 上面的例子中，遍历器生成函数`idMaker`，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍历器对象自己描述了一个数据结构出来。
  >
  > 如果使用 TypeScript 的写法，遍历器接口（Iterable）、指针对象（Iterator）和`next`方法返回值的规格可以描述如下。
  >
  > ```
  > interface Iterable {
  > [Symbol.iterator]() : Iterator,
  > }
  > 
  > interface Iterator {
  > next(value?: any) : IterationResult,
  > }
  > 
  > interface IterationResult {
  > value: any,
  > done: boolean,
  > }
  > ```
  >
  > ## 默认 Iterator 接口
  >
  > Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环（详见下文）。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
  >
  > 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
  >
  > ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内（参见《Symbol》一章）。
  >
  > ```
  > const obj = {
  > [Symbol.iterator] : function () {
  >  return {
  >    next: function () {
  >      return {
  >        value: 1,
  >        done: true
  >      };
  >    }
  >  };
  > }
  > };
  > ```
  >
  > 上面代码中，对象`obj`是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有`next`方法。每次调用`next`方法，都会返回一个代表当前成员的信息对象，具有`value`和`done`两个属性。
  >
  > ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。
  >
  > 原生具备 Iterator 接口的数据结构如下。
  >
  > - Array
  > - Map
  > - Set
  > - String
  > - TypedArray
  > - 函数的 arguments 对象
  > - NodeList 对象
  >
  > 下面的例子是数组的`Symbol.iterator`属性。
  >
  > ```
  > let arr = ['a', 'b', 'c'];
  > let iter = arr[Symbol.iterator]();
  > 
  > iter.next() // { value: 'a', done: false }
  > iter.next() // { value: 'b', done: false }
  > iter.next() // { value: 'c', done: false }
  > iter.next() // { value: undefined, done: true }
  > ```
  >
  > 上面代码中，变量`arr`是一个数组，原生就具有遍历器接口，部署在`arr`的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。
  >
  > 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在`Symbol.iterator`属性上面部署，这样才会被`for...of`循环遍历。
  >
  > 对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。
  >
  > 一个对象如果要具备可被`for...of`循环调用的 Iterator 接口，就必须在`Symbol.iterator`的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
  >
  > ```
  > class RangeIterator {
  >   constructor(start, stop) {
  >     this.value = start;
  >     this.stop = stop;
  >   }
  > 
  >   [Symbol.iterator]() { return this; }
  > 
  >   next() {
  >     var value = this.value;
  >     if (value < this.stop) {
  >       this.value++;
  >       return {done: false, value: value};
  >     }
  >     return {done: true, value: undefined};
  >   }
  > }
  > 
  > function range(start, stop) {
  >   return new RangeIterator(start, stop);
  > }
  > 
  > for (var value of range(0, 3)) {
  >   console.log(value); // 0, 1, 2
  > }
  > ```
  >
  > 上面代码是一个类部署 Iterator 接口的写法。`Symbol.iterator`属性对应一个函数，执行后返回当前对象的遍历器对象。
  >
  > 下面是通过遍历器实现“链表”结构的例子。
  >
  > ```
  > function Obj(value) {
  >   this.value = value;
  >   this.next = null;
  > }
  > 
  > Obj.prototype[Symbol.iterator] = function() {
  >   var iterator = { next: next };
  > 
  >   var current = this;
  > 
  >   function next() {
  >     if (current) {
  >       var value = current.value;
  >       current = current.next;
  >       return { done: false, value: value };
  >     }
  >     return { done: true };
  >   }
  >   return iterator;
  > }
  > 
  > var one = new Obj(1);
  > var two = new Obj(2);
  > var three = new Obj(3);
  > 
  > one.next = two;
  > two.next = three;
  > 
  > for (var i of one){
  >   console.log(i); // 1, 2, 3
  > }
  > ```
  >
  > 上面代码首先在构造函数的原型链上部署`Symbol.iterator`方法，调用该方法会返回遍历器对象`iterator`，调用该对象的`next`方法，在返回一个值的同时，自动将内部指针移到下一个实例。
  >
  > 下面是另一个为对象添加 Iterator 接口的例子。
  >
  > ```
  > let obj = {
  >   data: [ 'hello', 'world' ],
  >   [Symbol.iterator]() {
  >     const self = this;
  >     let index = 0;
  >     return {
  >       next() {
  >         if (index < self.data.length) {
  >           return {
  >             value: self.data[index++],
  >             done: false
  >           };
  >         }
  >         return { value: undefined, done: true };
  >       }
  >     };
  >   }
  > };
  > ```
  >
  > 对于类似数组的对象（存在数值键名和`length`属性），部署 Iterator 接口，有一个简便方法，就是`Symbol.iterator`方法直接引用数组的 Iterator 接口。
  >
  > ```
  > NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  > // 或者
  > NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
  > 
  > [...document.querySelectorAll('div')] // 可以执行了
  > ```
  >
  > NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的`Symbol.iterator`属性，可以看到没有任何影响。
  >
  > 下面是另一个类似数组的对象调用数组的`Symbol.iterator`方法的例子。
  >
  > ```
  > let iterable = {
  >   0: 'a',
  >   1: 'b',
  >   2: 'c',
  >   length: 3,
  >   [Symbol.iterator]: Array.prototype[Symbol.iterator]
  > };
  > for (let item of iterable) {
  >   console.log(item); // 'a', 'b', 'c'
  > }
  > ```
  >
  > 注意，普通对象部署数组的`Symbol.iterator`方法，并无效果。
  >
  > ```
  > let iterable = {
  >   a: 'a',
  >   b: 'b',
  >   c: 'c',
  >   length: 3,
  >   [Symbol.iterator]: Array.prototype[Symbol.iterator]
  > };
  > for (let item of iterable) {
  >   console.log(item); // undefined, undefined, undefined
  > }
  > ```
  >
  > 如果`Symbol.iterator`方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。
  >
  > ```
  > var obj = {};
  > 
  > obj[Symbol.iterator] = () => 1;
  > 
  > [...obj] // TypeError: [] is not a function
  > ```
  >
  > 上面代码中，变量`obj`的`Symbol.iterator`方法对应的不是遍历器生成函数，因此报错。
  >
  > 有了遍历器接口，数据结构就可以用`for...of`循环遍历（详见下文），也可以使用`while`循环遍历。
  >
  > ```
  > var $iterator = ITERABLE[Symbol.iterator]();
  > var $result = $iterator.next();
  > while (!$result.done) {
  >   var x = $result.value;
  >   // ...
  >   $result = $iterator.next();
  > }
  > ```
  >
  > 上面代码中，`ITERABLE`代表某种可遍历的数据结构，`$iterator`是它的遍历器对象。遍历器对象每次移动指针（`next`方法），都检查一下返回值的`done`属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（`next`方法），不断循环。
  >
  > ## 调用 Iterator 接口的场合
  >
  > 有一些场合会默认调用 Iterator 接口（即`Symbol.iterator`方法），除了下文会介绍的`for...of`循环，还有几个别的场合。
  >
  > **（1）解构赋值**
  >
  > 对数组和 Set 结构进行解构赋值时，会默认调用`Symbol.iterator`方法。
  >
  > ```
  > let set = new Set().add('a').add('b').add('c');
  > 
  > let [x,y] = set;
  > // x='a'; y='b'
  > 
  > let [first, ...rest] = set;
  > // first='a'; rest=['b','c'];
  > ```
  >
  > **（2）扩展运算符**
  >
  > 扩展运算符（...）也会调用默认的 Iterator 接口。
  >
  > ```
  > // 例一
  > var str = 'hello';
  > [...str] //  ['h','e','l','l','o']
  > 
  > // 例二
  > let arr = ['b', 'c'];
  > ['a', ...arr, 'd']
  > // ['a', 'b', 'c', 'd']
  > ```
  >
  > 上面代码的扩展运算符内部就调用 Iterator 接口。
  >
  > 实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。
  >
  > ```
  > let arr = [...iterable];
  > ```
  >
  > **（3）yield\***
  >
  > `yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
  >
  > ```
  > let generator = function* () {
  >   yield 1;
  >   yield* [2,3,4];
  >   yield 5;
  > };
  > 
  > var iterator = generator();
  > 
  > iterator.next() // { value: 1, done: false }
  > iterator.next() // { value: 2, done: false }
  > iterator.next() // { value: 3, done: false }
  > iterator.next() // { value: 4, done: false }
  > iterator.next() // { value: 5, done: false }
  > iterator.next() // { value: undefined, done: true }
  > ```
  >
  > **（4）其他场合**
  >
  > 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
  >
  > - for...of
  > - Array.from()
  > - Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
  > - Promise.all()
  > - Promise.race()
  >
  > ## 字符串的 Iterator 接口
  >
  > 字符串是一个类似数组的对象，也原生具有 Iterator 接口。
  >
  > ```
  > var someString = "hi";
  > typeof someString[Symbol.iterator]
  > // "function"
  > 
  > var iterator = someString[Symbol.iterator]();
  > 
  > iterator.next()  // { value: "h", done: false }
  > iterator.next()  // { value: "i", done: false }
  > iterator.next()  // { value: undefined, done: true }
  > ```
  >
  > 上面代码中，调用`Symbol.iterator`方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。
  >
  > 可以覆盖原生的`Symbol.iterator`方法，达到修改遍历器行为的目的。
  >
  > ```
  > var str = new String("hi");
  > 
  > [...str] // ["h", "i"]
  > 
  > str[Symbol.iterator] = function() {
  >   return {
  >     next: function() {
  >       if (this._first) {
  >         this._first = false;
  >         return { value: "bye", done: false };
  >       } else {
  >         return { done: true };
  >       }
  >     },
  >     _first: true
  >   };
  > };
  > 
  > [...str] // ["bye"]
  > str // "hi"
  > ```
  >
  > 上面代码中，字符串 str 的`Symbol.iterator`方法被修改了，所以扩展运算符（`...`）返回的值变成了`bye`，而字符串本身还是`hi`。
  >
  > ## Iterator 接口与 Generator 函数
  >
  > `Symbol.iterator()`方法的最简单实现，还是使用下一章要介绍的 Generator 函数。
  >
  > ```
  > let myIterable = {
  >   [Symbol.iterator]: function* () {
  >     yield 1;
  >     yield 2;
  >     yield 3;
  >   }
  > };
  > [...myIterable] // [1, 2, 3]
  > 
  > // 或者采用下面的简洁写法
  > 
  > let obj = {
  >   * [Symbol.iterator]() {
  >     yield 'hello';
  >     yield 'world';
  >   }
  > };
  > 
  > for (let x of obj) {
  >   console.log(x);
  > }
  > // "hello"
  > // "world"
  > ```
  >
  > 上面代码中，`Symbol.iterator()`方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。
  >
  > ## 遍历器对象的 return()，throw()
  >
  > 遍历器对象除了具有`next()`方法，还可以具有`return()`方法和`throw()`方法。如果你自己写遍历器对象生成函数，那么`next()`方法是必须部署的，`return()`方法和`throw()`方法是否部署是可选的。
  >
  > `return()`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句），就会调用`return()`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return()`方法。
  >
  > ```
  > function readLinesSync(file) {
  >   return {
  >     [Symbol.iterator]() {
  >       return {
  >         next() {
  >           return { done: false };
  >         },
  >         return() {
  >           file.close();
  >           return { done: true };
  >         }
  >       };
  >     },
  >   };
  > }
  > ```
  >
  > 上面代码中，函数`readLinesSync`接受一个文件对象作为参数，返回一个遍历器对象，其中除了`next()`方法，还部署了`return()`方法。下面的两种情况，都会触发执行`return()`方法。
  >
  > ```
  > // 情况一
  > for (let line of readLinesSync(fileName)) {
  >   console.log(line);
  >   break;
  > }
  > 
  > // 情况二
  > for (let line of readLinesSync(fileName)) {
  >   console.log(line);
  >   throw new Error();
  > }
  > ```
  >
  > 上面代码中，情况一输出文件的第一行以后，就会执行`return()`方法，关闭这个文件；情况二会在执行`return()`方法关闭文件之后，再抛出错误。
  >
  > 注意，`return()`方法必须返回一个对象，这是 Generator 语法决定的。
  >
  > `throw()`方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。请参阅《Generator 函数》一章。
  >
  > ## for...of 循环
  >
  > ES6 借鉴 C++、Java、C# 和 Python 语言，引入了`for...of`循环，作为遍历所有数据结构的统一的方法。
  >
  > 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。
  >
  > `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
  >
  > ### 数组
  >
  > 数组原生具备`iterator`接口（即默认部署了`Symbol.iterator`属性），`for...of`循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。
  >
  > ```
  > const arr = ['red', 'green', 'blue'];
  > 
  > for(let v of arr) {
  >   console.log(v); // red green blue
  > }
  > 
  > const obj = {};
  > obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
  > 
  > for(let v of obj) {
  >   console.log(v); // red green blue
  > }
  > ```
  >
  > 上面代码中，空对象`obj`部署了数组`arr`的`Symbol.iterator`属性，结果`obj`的`for...of`循环，产生了与`arr`完全一样的结果。
  >
  > `for...of`循环可以代替数组实例的`forEach`方法。
  >
  > ```
  > const arr = ['red', 'green', 'blue'];
  > 
  > arr.forEach(function (element, index) {
  >   console.log(element); // red green blue
  >   console.log(index);   // 0 1 2
  > });
  > ```
  >
  > JavaScript 原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6 提供`for...of`循环，允许遍历获得键值。
  >
  > ```
  > var arr = ['a', 'b', 'c', 'd'];
  > 
  > for (let a in arr) {
  >   console.log(a); // 0 1 2 3
  > }
  > 
  > for (let a of arr) {
  >   console.log(a); // a b c d
  > }
  > ```
  >
  > 上面代码表明，`for...in`循环读取键名，`for...of`循环读取键值。如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法（参见《数组的扩展》一章）。
  >
  > `for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟`for...in`循环也不一样。
  >
  > ```
  > let arr = [3, 5, 7];
  > arr.foo = 'hello';
  > 
  > for (let i in arr) {
  >   console.log(i); // "0", "1", "2", "foo"
  > }
  > 
  > for (let i of arr) {
  >   console.log(i); //  "3", "5", "7"
  > }
  > ```
  >
  > 上面代码中，`for...of`循环不会返回数组`arr`的`foo`属性。
  >
  > ### Set 和 Map 结构
  
  > - > ES6提供了新的数据结构：Set集合（Object）。它就是一个无序、无下标、不重复的容器。它实现了`iterator`接口，所以...扩展运算符和forof都可以对它进行遍历。Set的属性和方法：
  >   >
  >   > - `size`：集合的大小
  >   > - `add()`：添加元素
  >   > - `delete()`：删除元素
  >   > - `clear()`：清空集合
  >   > - `has()`：判断是否包含
  >   >
  >   > 用法：
  >
  >   ```javascript
  >   const s = new Set(['zs',21,'北京'])//或new Set()
  >   console.log(s.size)
  >   s.add('haha')
  >   s.delete('zs')
  >   console.log(s)
  >   s.clear()
  >   console.log(s.has('北京'))
  >   ```
  >
  >   > 使用场景：
  >
  >   ```javascript
  >   //数组去重
  >   let ret1 = [ ...new Set([1,2,2,3]) ]//123
  >   //交集
  >   let ret2 = [ ...new Set([1,2,2,3]) ].filter( item => {
  >       return new Set([3,4,5]).has(item)
  >   } )
  >   ```
  >
  > - ### Map
  >
  >   > ES6提供了Map数据结构，是键值对集合（Object）。它类似于对象，只是key可以是任何类型，不仅限于字符串。并且也实现了`iterator`接口。它的属性和方法：
  >   >
  >   > - `size`：集合的大小
  >   > - `set(k,v)`：添加元素
  >   > - `get(k)`：获取通过key元素
  >   > - `clear()`：清空集合
  >   > - `has(k)`：判断是否包含某个key
  
  > Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用`for...of`循环。
  >
  > ```
  >var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
  > for (var e of engines) {
  >  console.log(e);
  > }
  >// Gecko
  > // Trident
  >// Webkit
  > 
  >var es6 = new Map();
  > es6.set("edition", 6);
  >es6.set("committee", "TC39");
  > es6.set("standard", "ECMA-262");
  >for (var [name, value] of es6) {
  >   console.log(name + ": " + value);
  >}
  > // edition: 6
  >// committee: TC39
  > // standard: ECMA-262
  >```
  > 
  > 上面代码演示了如何遍历 Set 结构和 Map 结构。值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。
  > 
  > ```
  > let map = new Map().set('a', 1).set('b', 2);
  > for (let pair of map) {
  >   console.log(pair);
  > }
  >   // ['a', 1]
  >   // ['b', 2]
  >    
  >    for (let [key, value] of map) {
  >      console.log(key + ' : ' + value);
  >    }
  >    // a : 1
  >   // b : 2
  > ```
  > 
  >### 计算生成的数据结构
  > 
  >有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。
  > 
  >- `entries()` 返回一个遍历器对象，用来遍历`[键名, 键值]`组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用`entries`方法。
  > - `keys()` 返回一个遍历器对象，用来遍历所有的键名。
  >- `values()` 返回一个遍历器对象，用来遍历所有的键值。
  > 
  >这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。
  > 
  >```
  > let arr = ['a', 'b', 'c'];
  > for (let pair of arr.entries()) {
  >     console.log(pair);
  >   }
  >    // [0, 'a']
  >    // [1, 'b']
  >    // [2, 'c']
  > ```
  >    
  >   ### 类似数组的对象
  > 
  > 类似数组的对象包括好几类。下面是`for...of`循环用于字符串、DOM NodeList 对象、`arguments`对象的例子。
  >
  > ```
  >// 字符串
  > let str = "hello";
  > 
  > for (let s of str) {
  >   console.log(s); // h e l l o
  > }
  > 
  > // DOM NodeList对象
  > let paras = document.querySelectorAll("p");
  > 
  >   for (let p of paras) {
  >   p.classList.add("test");
  >   }
  >    
  >    // arguments对象
  >    function printArgs() {
  >     for (let x of arguments) {
  >     console.log(x);
  >   }
  >}
  > printArgs('a', 'b');
  >// 'a'
  > // 'b'
  >```
  > 
  > 对于字符串来说，`for...of`循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。
  >   
  > ```
  > for (let x of 'a\uD83D\uDC0A') {
  >   console.log(x);
  >   }
  > // 'a'
  > // '\uD83D\uDC0A'
  > ```
  >   
  >   并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用`Array.from`方法将其转为数组。
  > 
  > ```
  >let arrayLike = { length: 2, 0: 'a', 1: 'b' };
  > 
  >// 报错
  > for (let x of arrayLike) {
  >  console.log(x);
  > }
  >
  > // 正确
  >for (let x of Array.from(arrayLike)) {
  >   console.log(x);
  > }
  > ```
  >    
  >    ### 对象
  >    
  >    对于普通的对象，`for...of`结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，`for...in`循环依然可以用来遍历键名。
  >    
  >    ```
  >    let es6 = {
  >      edition: 6,
  >     committee: "TC39",
  >   standard: "ECMA-262"
  > };
  >
  > for (let e in es6) {
  >  console.log(e);
  > }
  >// edition
  > // committee
  >// standard
  > 
  > for (let e of es6) {
  >   console.log(e);
  > }
  > // TypeError: es6[Symbol.iterator] is not a function
  >    ```
  > 
  >上面代码表示，对于普通的对象，`for...in`循环可以遍历键名，`for...of`循环会报错。
  > 
  >一种解决方法是，使用`Object.keys`方法将对象的键名生成一个数组，然后遍历这个数组。
  > 
  > ```
  > for (var key of Object.keys(someObject)) {
  >   console.log(key + ': ' + someObject[key]);
  > }
  > ```
  > 
  > 另一个方法是使用 Generator 函数将对象重新包装一下。
  > 
  >```
  > const obj = { a: 1, b: 2, c: 3 }
  >
  > function* entries(obj) {
  >  for (let key of Object.keys(obj)) {
  >     yield [key, obj[key]];
  >  }
  > }
  >
  > for (let [key, value] of entries(obj)) {
  >   console.log(key, '->', value);
  > }
  > // a -> 1
  > // b -> 2
  > // c -> 3
  > ```
  > 
  > ### 与其他遍历语法的比较
  > 
  > 以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是`for`循环。
  > 
  > ```
  > for (var index = 0; index < myArray.length; index++) {
  >   console.log(myArray[index]);
  > }
  > ```
  > 
  > 这种写法比较麻烦，因此数组提供内置的`forEach`方法。
  > 
  > ```
  > myArray.forEach(function (value) {
  >   console.log(value);
  > });
  > ```
  > 
  > 这种写法的问题在于，无法中途跳出`forEach`循环，`break`命令或`return`命令都不能奏效。
  >
  > `for...in`循环可以遍历数组的键名。
  >
  > ```
  >for (var index in myArray) {
  >   console.log(myArray[index]);
  > }
  > ```
  > 
  > `for...in`循环有几个缺点。
  > 
  > - 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
  > - `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
  > - 某些情况下，`for...in`循环会以任意顺序遍历键名。
  > 
  > 总之，`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。
  > 
  > `for...of`循环相比上面几种做法，有一些显著的优点。
  > 
  > ```
  > for (let value of myArray) {
  >   console.log(value);
  > }
  > ```
  > 
  > - 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
  > - 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
  > - 提供了遍历所有数据结构的统一操作接口。
  > 
  > 下面是一个使用 break 语句，跳出`for...of`循环的例子。
  > 
  > ```
  > for (var n of fibonacci) {
  >   if (n > 1000)
  >     break;
  >   console.log(n);
  > }
  > ```
  >
  > 上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用`break`语句跳出`for...of`循环。