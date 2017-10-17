# 初探React Native
### 什么是React Native
>React Native 是一款用来开发真正原生、可渲染iOS和Android移动应用的JavaScript框架。

### React Native与React的关系
都是由Facebook推出的开源框架（React解决的是View层不算是真正意义上的框架），与React相似，都是使用JSX来进行开发，也就是说，具备了使用JavaScript和React的能力，就可以不用太大的学习成本就可以使用React Native进行移动应用开发了。

### React Native的优点
React Native 将代码解析成真正的原生UI组件，对于Web开发者而言，意味着可以使用熟悉的工具开发原生移动应用。由于它使用了JavaScript，查看修改结果时并不需要重新编译，这点对开发者而言具有比较好的开发体验。


### React Native工作原理
React Native在后台通过“桥接”的方式调用由Objective-C（iOS）和Java（Android）开放的原生渲染接口。在代码和实际渲染之间加入一个抽象层，这个强大的抽象层叫做Virtual DOM。它除了优化性能，还提供了强大的抽象能力，渲染出原生的移动UI组件，而不是传统的WebView渲染。
