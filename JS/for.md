# 理解for循环中的let
for循环语句恐怕大家都觉得熟悉得不能再熟悉了，但是真的都能解释得了for出现的各种“现象”吗？以自己的对for的学习过程记录出对for的“认知”过程演化，如果已经深入理解了for，可以就此停住。  
  
先看for的语法：
``` javascript
for ([initialization]; [condition]; [final-expression])
   statement
```
- initialization:一个表达式 (包含赋值语句) 或者变量声明
- condition:一个条件表达式被用于确定每一次循环是否能被执行
- final-expression:每次循环的最后都要执行的表达式
- statement:只要condition的结果为true就会被执行的语句

以上的语法恐怕大家都熟烂于心了，那接下来看两个例子，看看熟烂于心的for语法能不能解释得了其中的缘由。  
  
第一个例子：
``` JavaScript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```
  
第二个例子：
``` JavaScript
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```
  
第一个例子：log出来的是五个5，想必对这个结果并没有大惊小怪，可能原本需求是log出0 1 2 3 4，但也大致知道所谓的原因：回调函数在循环结束后才会被执行，因为i是使用var声明的，在全局范围内都有效，每次循环时都会对进行迭代，循环结束完毕后i的值是5，所以最终log出的定时器输出了五次i循环结束后的最终值。至于怎么修改成符合预期的输出，可以参考[这里](https://github.com/iyolee/Front-End/blob/master/Code/for.js)。  
  
第二个例子：log出符合预期的0 1 2 3 4，至于缘由大概只说得出，for循环会产生块级作用域，变量i是let声明的，而let声明的变量仅在块级作用域内有效。  
  
直到在知乎上看了[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)，受到这篇文章的启发，决定重新深入理解for循环中的var、let，真正能明白其中的缘由。  
  
参考了：
- MDN的[let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [颜海镜](https://www.zhihu.com/people/yanhaijing/activities)整理的中文版ES5.1文档的[for语句](http://yanhaijing.com/es5/#224)
- You Don't Know JS系列的[Loops + Closure](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md#loops--closure)
- ES文档的[13.7.4.7 章节](http://www.ecma-international.org/ecma-262/6.0/#sec-for-statement-runtime-semantics-labelledevaluation)
  
以自己的理解来解释上述中的第二个例子背后的缘由：
- for循环设置循环变量的那部分（小括号那块）是一个父作用域，而循环体内部是一个单独的子作用域，证实如下：

``` javascript
for (let i = 0; i < 5; i++) {
  let i = 8
  console.log(i);
}
// -> 8 8 8 8 8 
```
- 每次循环迭代之前，都会使用上一轮循环记忆的值初始声明本轮循环的变量i  

背后的运行“工作”可以大致理解成下面的代码块：
``` JavaScript
// 设置循环变量的那部分形成的作用域
{
  for (let i = 0; i < 5; i++)
    // 第一次迭代  i = 0
    {
      i = 0;
      // ... 
    }
    // 第二次迭代  初始i = 0; i++
    {
      i = 1;
      // ...
    }
    // // 第三次迭代  初始i = 1; i++
    {
      i = 2;
      // ...
    }
    // ...
    // 经过5次迭代，在父作用域里形成了5个子作用域
}
```

以上，就是对for及for中let的理解。