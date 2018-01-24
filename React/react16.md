# React v16.x
React v16.x的发布，新版本变更包含了一些存在已久的特性，包括碎片（fragments），错误边界，portals，支持自定义 DOM 属性，提升服务端渲染以及减小库的大小等。

## React v16：新核心架构
React 16 从顶层采用全新的核心架构，代号“Fiber”。Fiber负责大部分React 16里的新特性，例如错误边界和 fragments。更令人激动的莫过于，通过异步渲染，应用能够更好的响应，React避免阻塞了主线程。  
想要了解更多关于新核心架构，参考：
- [React Fiber是什么](https://zhuanlan.zhihu.com/p/26027085)

## React v16.2.0：Fragments
### 为什么使用 Fragments？
若要将以下代码作为组件的 children 使用的。
```js
Some text.
<h2>A heading</h2>
More text.
<h2>Another heading</h2>
Even more text.
```
在React v16之前的版本中，需要把以上代码外面包裹一个标签中：
``` js
render() {
  return (
    <div>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </div>
  )
}
```
在React v16中，可以在组件中渲染数组：
``` js
render() {
 return [
  "Some text.",
  <h2 key="heading-1">A heading</h2>,
  "More text.",
  <h2 key="heading-2">Another heading</h2>,
  "Even more text."
 ];
}
```
该写法需要注意：
1. 每个子元素需要使用逗号分隔
2. 数组的每一项必须要有 key 值，否则会产生警告
3. 字符串必须使用引号

而在最新的React版本中，引入了 Fragment 组件：
``` js
render() {
  return (
    <Fragment>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </Fragment>
  );
}
```
Fragment 是 React 对象的属性，也可以这么写：
``` js
const Fragment = React.Fragment;
<Fragment>
  <ChildA />
  <ChildB />
  <ChildC />
</Fragment>
```
或者：
``` js
<React.Fragment>
  <ChildA />
  <ChildB />
  <ChildC />
</React.Fragment>
```
### JSX Fragment Syntax
``` js
render() {
  return (
    <>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </>
  );
}
```
当编译时，<> 被转化为 <React.Fragment/>。
  
**注意：<></> 并不接受任何属性，包括 key 属性。**

如果需要使用有key值的Fragment，只能使用 <Fragment /> 组件。Fragment 只有唯一的一个属性：key。

## React v16：异常/错误处理
过去，组件内部的JavaScript异常经常阻断React内部状态，并导致其在下一次渲染时触发了未知的隐藏错误。这些错误往往是由应用程序代码中之前的错误引起的，但React并未提供一种在组件内部优雅处理的方式，也不会从异常中恢复。

### 错误边界
在讲新版本的错误处理之前，先了解错误边界这个概念。React v16引入了“错误边界（error boundary）”这一新概念为解决一个问题： UI部分发生的JavaScript异常不应该阻断整个应用。
  
错误边界作为React组件，用以捕获在子组件树中任何地方的JavaScript异常，打印这些错误，并展示备用UI组件而非让组件树崩溃。**错误边界会捕获渲染期间，在生命周期方法中以及在其整个树的构造函数中的异常。**  

### 错误处理
定义一个名称为 componentDidCatch(error, info) 的新生命周期方法，则类组件会成为错误边界：
``` javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

而后可作为一个正常组件进行使用：
``` javascript
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

注意：
- 错误边界仅可以捕获组件树中的后代组件错误，一个错误边界无法捕获其自身的错误。
- 若错误边界在渲染错误信息时失败，则该错误会传递至上一层最接近的错误边界。

最后一点，这一改变有一个重要的意义：在React v16 中不是由错误边界引起的错误将会使得整个React组件树被卸载。  

想要了解更多关于错误处理，参考：
- [Error Handling in React 16](https://doc.react-china.org/blog/2017/07/26/error-handling-in-react-16.html)

## React v16：Portals
Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。
``` js
render() {
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  );
}
```
想要了解更多关于Portals，参考：
- [传送门：React Portal](https://zhuanlan.zhihu.com/p/29880992)
- [Portals](https://doc.react-china.org/docs/portals.html)

## React v16：更好的服务端渲染
React v16 包含了一个完全重写的服务端渲染器。其是真的快。支持流，因此你能够更快地将数据发送到客户端。同时由于新的打包策略，即编译不再进行 process.env 检查。  
想要了解更多关于服务端渲染，参考：
- [ReactDOMServer](https://doc.react-china.org/docs/react-dom-server.html)

## React v16：支持自定义DOM属性
React 现在会将自定义属性传递给DOM，而不是忽略不认识的HTML和SVG属性。  
想要了解更多自定义DOM属性，参考：
- [DOM Attributes in React 16
](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)

## React v16：减少文件体积
- react 从20.7kb（gzip 后：6.9 kb）减至大小为 5.3 kb（gzip 后：2.2 kb）
- react-dom 从141 kb（gzip 后：42.9 kb）减至 103.7 kb（gzip 后：32.6 kb
- eact + react-dom 从 161.7 kb（gzip 后：49.8 kb）减至 109 kb（gzip 后：34.8 kb）

## MIT协议
React 16使用 MIT协议。同时也为那些无法立刻升级的，在MIT协议下发布了React 15.6.2。