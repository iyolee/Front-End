# JavaScript数组去重
又是一个老生常谈的问题，从广度上去全面认识实现的算法。  
  
对以下所有的实现算法，都使用以下代码进行粗略测试：
``` JavaScript
let arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()))
}

// ...实现算法

console.time('test');
arr.unique();
console.timeEnd('test');
```

### 双重循环
双重循环去重实现比较容易。  
实现一：
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = 0; j < newArray.length; j++) {
      if (this[i] === newArray[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```
实现二：
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```
基于思路二的写法改进版，实现三：
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        j = ++i;
      }
    }
    newArray.push(this[i]);
  }
  return newArray;
}
```

经过测试代码测试的时间如下：
```
test1: 3688.440185546875ms
test2: 4641.60498046875ms
test3: 17684.365966796875ms
```

### Array.prototype.indexOf()
基本思路：如果索引不是第一个索引，说明是重复值。  
实现一：
- 利用Array.prototype.filter()过滤功能
- Array.prototype.indexOf()返回的是第一个索引值
- 只将数组中元素第一次出现的返回
- 之后出现的将被过滤掉

``` JavaScript
Array.prototype.unique = function () {
  return this.filter((item, index) => {
    return this.indexOf(item) === index;
  })
}
```
实现二：
``` JavaScript
let arr = [1, 2, 3, 22, 233, 22, 2, 233, 'a', 3, 'b', 'a'];
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach(item => {
    if (newArray.indexOf(item) === -1) {
      newArray.push(item);
    }
  });
  return newArray;
}
```
经过测试代码测试的时间如下：
```
test1: 4887.201904296875ms
test2: 3766.324951171875ms
```

### Array.prototype.sort()
基本思路：先对原数组进行排序，然后再进行元素比较。  
实现一：  
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== this[++i]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```
经过测试代码测试的时间如下：
```
test: 4300.39990234375ms
```
实现二：  
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== newArray[newArray.length - 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```
经过测试代码测试的时间如下：
```
test1: 121.6259765625ms
test2: 123.02197265625ms
```

### Array.prototype.includes()
``` javascript
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach(item => {
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  });
  return newArray;
}
```
经过测试代码测试的时间如下：
```
test: 4123.377197265625ms
```

### 对象键值对
基本思路：利用了对象的key不可以重复的特性来进行去重。  
但需要注意：
- 无法区分隐式类型转换成字符串后一样的值，比如 1 和 '1' 
- 无法处理复杂数据类型，比如对象（因为对象作为 key 会变成 [object Object]）
- 特殊数据，比如 '__proto__'，因为对象的 __proto__ 属性无法被重写

解决第一、第三点问题，实现一：
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    if (!tmp[typeof this[i] + this[i]]) {
      tmp[typeof this[i] + this[i]] = 1;
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```
解决第二点问题，实现二：
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    // 使用JSON.stringify()进行序列化
    if (!tmp[typeof this[i] + JSON.stringify(this[i])]) {
      // 将对象序列化之后作为key来使用
      tmp[typeof this[i] + JSON.stringify(this[i])] = 1;
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```
经过测试代码测试的时间如下：
```
test1: 113.849365234375ms
test2: 157.030029296875ms
```

### Map
实现一：
``` JavaScript
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = new Map();
  for(let i = 0; i < this.length; i++){
        if(!tmp.get(this[i])){
            tmp.set(this[i], 1);
            newArray.push(this[i]);
        }
    }
    return newArray;
}
```
实现二：
``` JavaScript
Array.prototype.unique = function () {
  const tmp = new Map();
  return this.filter(item => {
    !tmp.has(item) && tmp.set(item, 1);
  })
}
```
经过测试代码测试的时间如下：
```
test1: 27.89697265625ms
test2: 21.945068359375ms
```

### Set
``` JavaScript
Array.prototype.unique = function () {
  const set = new Set(this);
  return Array.from(set);
}
```
经过测试代码测试的时间如下：
```
test: 36.8046875ms
```

### 总结
除了考虑时间复杂度外、性能之外，还要考虑数组元素的数据类型（例如下面的例子）等问题权衡选择出采用哪种算法，例如：
``` JavaScript
const arr = [1, 1, '1', '1', 0, 0, '0', '0', undefined, undefined, null, null, NaN, NaN, {}, {}, [], [], /a/, /a/];
```
经过综合考虑，最优的数组去重算法是采用Map数据结构实现的算法。