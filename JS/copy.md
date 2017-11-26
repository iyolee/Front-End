# JavaScript深浅拷贝
从原理出发去理解JavaScript中的深浅拷贝。

### 基本类型 & 引用类型
ECMAScript中的数据类型可分为两种：
- 基本类型：undefined,null,Boolean,String,Number,Symbol
- 引用类型：Object,Array,Date,Function,RegExp等

不同类型的存储方式：
- 基本类型：**基本类型值**在内存中占据固定大小，保存在**栈内存**中
- 引用类型：**引用类型的值**是对象，保存在**堆内存**中，而**栈内存**存储的是**对象的变量标识符**以及**对象在堆内存中的存储地址**

不同类型的复制方式：
- 基本类型：从一个变量向另外一个新变量复制基本类型的值，会创建这个值的一个副本，并将该副本复制给新变量

``` JavaScript
let foo = 1;
let bar = foo;
console.log(foo === bar); // -> true

// 修改foo变量的值并不会影响bar变量的值
let foo = 233;
console.log(foo); // -> 233
console.log(bar); // -> 1
```

- 引用类型：从一个变量向另一个新变量复制引用类型的值，其实复制的是指针，最终两个变量最终都指向同一个对象

``` JavaScript
let foo = {
  name: 'leeper',
  age: 20
}
let bar = foo;
console.log(foo === bar); // -> true

// 改变foo变量的值会影响bar变量的值
foo.age = 19;
console.log(foo); // -> {name: 'leeper', age: 19}
console.log(bar); // -> {name: 'leeper', age: 19}
```

### 深拷贝 & 浅拷贝
- 浅拷贝：仅仅是复制了引用，彼此之间的操作会互相影响
- 深拷贝：在堆中重新分配内存，不同的地址，相同的值，互不影响

总的来说，深浅拷贝的主要区别就是：*复制的是引用还是复制的是实例*

### 深浅拷贝的实现
看一看原生JavaScript中提供的一些复制方法究竟是深拷贝还是浅拷贝以及动手实现深拷贝。  
#### 浅拷贝  
- Array.prototype.slice()

``` javascript
let a = [1, 2, 3, 4];
let b = a.slice();
console.log(a === b); // -> false

a[0] = 5;
console.log(a); // -> [5, 2, 3, 4]
console.log(b); // -> [1, 2, 3, 4]
```

- Array.prototype.concat()

``` javascript
let a = [1, 2, 3, 4];
let b = a.concat();
console.log(a === b); // -> false

a[0] = 5;
console.log(a); // -> [5, 2, 3, 4]
console.log(b); // -> [1, 2, 3, 4]
```
看起来Array的slice(),concat()似乎是深拷贝，再接着看就知道它们究竟是深拷贝还是浅拷贝：
``` JavaScript
let a = [[1, 2], 3, 4];
let b = a.slice();
console.log(a === b); // -> false

a[0][0] = 0;
console.log(a); // -> [[0, 2], 3, 4]
console.log(b); // -> [[0, 2], 3, 4]
```

![slice()](http://i.niupic.com/images/2017/11/26/Oeguvl.png
)

同样，对于concat()也进行验证:

``` javascript
let a = [[1, 2], 3, 4];
let b = a.concat();
console.log(a === b); // -> false

a[0][0] = 0;
console.log(a); // -> [[0, 2], 3, 4]
console.log(b); // -> [[0, 2], 3, 4]
```

综上， Array的slice和concat方法并**不是真正的深拷贝**，对于Array的第一层的元素是深拷贝，而Array的第二层 slice和concat方法是复制引用。所以，**Array的slice和concat方法都是浅拷贝**。

#### 深拷贝
- JSON.parse()和JSON.stringify()

1. JSON.stringify()：把一个js对象序列化为一个JSON字符串
2. JSON.parse()：把JSON字符串反序列化为一个js对象

``` javascript
let obj = {
  name: 'leeper',
  age: 20,
  friend: {
    name: 'lee',
    age: 19
  }
};
let copyObj = JSON.parse(JSON.stringify(obj));
obj.name = 'Sandman';
obj.friend.name = 'Jerry';
console.log(obj);
// -> {name: "Sandman", age: 20, friend: {age: 19,name: 'Jerry'}}
console.log(copyObj);
// -> {name: "leeper", age: 20, friend: {age: 19,name: 'lee'}}
```

![deep copy](http://i.niupic.com/images/2017/11/26/bteOkq.png
)

综上，**JSON.parse()和JSON.stringify()是完全的深拷贝**。

- 动手实现深拷贝
利用递归来实现对对象或数组的深拷贝。递归思路：对属性中所有引用类型的值进行遍历，直到是基本类型值为止。
``` javascript
/*
 * @Author: leeper 
 * @Date: 2017-11-26 15:28:01 
 * @function deepCopy 实现深拷贝
 * @params obj Array or Obeject
 * @return targetObj new obj
 */

function deepCopy(obj) {
  if (!obj && typeof obj !== 'object') {
    throw new Error('error arguments');
  }
  // const targetObj = obj.constructor === Array ? [] : {};
  const targetObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    
    //只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepCopy(obj[key]);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  return targetObj;
}
```