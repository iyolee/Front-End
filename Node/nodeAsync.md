# 理解Node.js的异步
在Node中，绝大多数的操作都以异步的方式进行调用，在底层构建了很多异步I/O的API，从文件读取到网络请求。

## 异步I/O
听到Node的介绍时经常会听到异步，非阻塞事件等词语混在一起。从效果看，异步和阻塞都达到了并行I/O的目的。但是从计算机内核I/O而言，异步/同步和非阻塞/阻塞实际上是两回事。

### 非阻塞I/O与阻塞I/O
- 阻塞I/O：阻塞I/O调用之后一定等到系统内核层面完成所有的操作后才结束调用。显然易见，这样会使CPU的处理能力等不到充分利用。
- 非阻塞I/O：非阻塞I/O调用后立即返回，返回之后，CPU的时间片可以用来处理其他事务。

### 非阻塞I/O相关概念介绍
在讲Node的异步I/O流程之前，了解一些相关概念介绍有助于后面异步I/O流程的理解。
- 文件描述符：应用程序如果需要进行I/O调用，需先打开文件描述符，然后再根据文件描述符去实现文件的数据读写，文件描述符类似于应用程序与系统内核之间的凭证。
- 轮询：由于非阻塞I/O并未完成完整的I/O，为了获取完整的数据，应用程序需要重复调用I/O操作来确认是否完成，这种重复调用判断操作是否完成的技术就是轮询。  
轮询技术主要有：
  - read：通过重复调用来检查I/O的状态来完成完整数据的读取。
  - select：通过文件描述符上的事件状态来进行判断。
  - poll：与select相似，性能限制有所改善。
  - epoll：在进入轮询的时候如果没有检查到I/O事件，将会进行休眠，直到事件发生将它唤醒。 
- *nix平台下异步I/O：采用线程池与阻塞I/O模拟异步I/O。
- IOCP：Windows下的异步I/O方案，内部是由操作系统内核管理的线程池。
- libuv：由于平台的差异，Node提供了libuv作为抽象封装层，保证上层的Node与下层的自定义线程池（*nix）及IOCP（Windows）之间各自独立，所有平台兼容性的判断都是由这一层来完成。
- Tick：在进程启动时，Node便会创建一个类似于while(true)的循环，每执行一次循环体的过程称为Tick。每个Tick过程就是查看是否有事件待处理，如果有，就取出事件及相关的回调函数。
- 观察者：每个事件循环中有一个或多个观察者，判断是否有事件要处理的过程就是向这些观察者询问是否有要处理的事件。
- 请求对象：从javascript发起调用到内核执行完I/O操作的过度过程中存在的一种中间产物。所有的状态都保存在这个对象中，包括送入线程池等待执行以及I/O操作完毕后的回调处理。

### 异步I/O的流程
以fs.open(path, flags[, mode], callback)为例：
1. 根据路径和参数去打开一个文件，得到一个**文件描述符**；
2. JavaScript调用Node的核心模块，核心模块调用C++内建模块，内建模块通过**libuv**进行系统调用；
3. 将JavaScript层传入的参数和当前方法都封装在一个**请求对象**中，然后将这个封装好的对象推入到线程池中等待执行；
4. JavaScript调用返回，JavaScript线程可以继续执行当前任务的后续操作；
5. 线程池中的I/O操作执行完毕后将获取的结果储存起来，并将线程归还线程池；
6. 在每次Tick的执行中，检查线程池中是否有执行完的请求，如果存在会将**请求对象**加入到I/O**观察者**的队列中，然后将其当作事件处理；
7. I/O**观察者**回调函数取出**请求对象**的result属性作为参数取出oncomplete_sym属性作为方法，然后调用执行；
至此，整个异步I/O的流程结束。

## 非I/O的异步
Node中还存在一些与I/O无关的异步API，它们分别是setTimeout()、setInterval()、setImmediate()、process.nextTick()。
- 定时器  
调用setTimeout()或者setInterval()创建的定时器会被插入到定时器观察者内部的一个红黑树中。每次事件循环执行过程中，会从该红黑树中迭代取出定时器对象，检查是否超过定时时间，如果超过，就形成一个事件，立即执行它的回调函数。
- process.nextTick()  
每次调用process.nextTick()方法，会将回调函数添加到"next tick队列"中。 一旦当前事件轮询队列的任务全部完成，在下一轮在next tick队列中的所有回调函数会被依次调用。事件轮询随后的Tick调用，会在任何I/O事件（包括定时器）之前运行。这种方式不是setTimeout(fn, 0)的别名。它更加有效率。
- setImmediate()  
在Node事件循环的当前回合结束时要调用的函数。

## 总结
1. Node的单线程仅仅只是JavaScript执行在单线程中，内部完成I/O任务另有线程池；
2. 事件循环、观察者、请求对象、I/O线程池共同构成了Node异步I/O模型的基本要素；
3. 事件循环是异步实现的核心。