---
title: module.exports与exports
date: 2017-10-24 11:03:24
tags: [Node.js]
---
刚接触Node的时候有个疑惑，为什么有exports存在的情况下还会有module.exports的存在呢？
<!--more--> 

### 具体区别
module.exports对象是由模块系统创建的：  
- **module.exports 初始值为一个空对象 {}** 

exports只是对module.exports的一个全
局引用，最初被定义为一个可以添加属性的 空对象：  
- **exports 是指向的 module.exports 的引用**

最终在程序里导出的是 module.exports：  
- **require() 返回的是 module.exports 而不是 exports**

综上可知：  
```exports.myFunc```只是```module.exports.myFunc```的简写。

### 使用场景
- 如果模块返回的函数或变量不止一个,可以通过设定exports对象的属性来指明它们
- 如果模块只返回一个函数或变量,则可以设定module.exports属性
- 如果希望模块成为某个类的实例，需要将期望导出的对象赋值给module.exports

### 注意点
- 如果创建了一个既有exports又有 module.exports的模块,那它会返回module.exports，而exports会被忽略
- 如果一个新的值被赋值给 exports，它就不再绑定到 module.exports，就打破了module.exports和exports之间的引用关系  

真正导出的是module.exports，那样exports就不能用了,因为它不再指向 module.exports了。如果想维持那个链 接，可以让module.exports再次引用exports：
``` javascript
module.exports = exports = currentReference;
```