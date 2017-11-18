# JS相等性引发的思考
前段时间系统性再次学习了JS，重温到 == ，由一个小东西引发对自己学习过程中的一些反思。
先来看是啥小东西：
``` JavaScript
let foo = {
  b: 42
};
let bar = {
  b: 42
};
console.log(foo == bar);
// -> false
```
== 不是严格相等，对于两个对象使用 ==，由于对象是引用类型，会判断两个对象指向的是否是同一个引用。如果是则true，否则false。
试完 == 再试试 > , < 看看：
``` JavaScript
let foo = {
  b: 42
};
let bar = {
  b: 42
};

console.log(foo < bar);  // -> false
console.log(foo > bar);  // -> false
```
自然不能落下<= , =>
``` JavaScript
let foo = {
  b: 42
};
let bar = {
  b: 42
};

console.log(foo <= bar);  // -> true
console.log(foo >= bar);  // -> true
```
有图有真相：（注：使用Node的REPL进行演示）
![image](http://i.niupic.com/images/2017/09/29/CuBfD1.png
)  

为什么会这样？开始了查阅文档之路，先看平时习惯查阅的[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)关于[JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)似乎找不到解释，再查看[W3school](http://www.w3school.com.cn/js/pro_js_operators_relational.asp)和[菜鸟教程](http://www.runoob.com/js/js-comparisons.html)相关的都只是陈列一些，都没有找到解释……最后去翻阅[官方文档](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-11.8.3)才找到了解释：
![image](http://i.niupic.com/images/2017/09/29/JhWnEP.png
)
可以将 >= , <= 理解成底层是这样 !(<) , !(>) 调用的。那么为什么是 true 就找到了解释。
****
总结：JS学习过程中，它的[官方文档(ES5.1)](http://www.ecma-international.org/ecma-262/5.1/)往往是翻阅最少的，但它却是JS渊源最权威的记录。
