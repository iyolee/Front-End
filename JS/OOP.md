# JavaScript的面向对象
JavaScript的作者在为JavaScript设计面向对象系统时，借鉴了Self和Smalltalk这两门基于原型的语言，选择了基于原型的面向对象系统。本文内容为对《JavaScript高级程序设计》面向对象部分的提炼及个人学习的总结结合而成。

### 与传统面向对象语言的区别
跟传统面向对象语言相比，JavaScript没有提供传统面向对象语言中的类式继承，而是通过原型委托的方式来实现对象与对象之间的继承，也没有在语言层面提供抽象类和接口的支持。

### 创建对象
#### 工厂模式
工厂模式是一种软件工程领域的设计模式，这种模式抽象了创建具体对象的过程。
``` JavaScript
function createPerson(name, age) {
  const o = new Object();
  o.name = name;
  o.age = age;
  o.sayHello = function () {
    console.log('My name is ' + this.name);
  };
  return o;
}

const person1 = createPerson('leeper', 20);
```
#### 构造函数模式
ECMAScript中的构造函数可以用来创建特定类型的对象，除了运行时自动出现在执行环境中的3原生构造函数，还可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。
``` JavaScript
function Person() {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log('My name is ' + this.name);
  };
}

const person1 = new Person('leeper', 20);
```
构造函数与非构造函数的区别在于调用的方式不同。如果是通过new操作符来调用，那它就可以作为构造函数，否则，跟普通函数基本一样。  
使用new操作符会经历以下4个步骤：
1. 创建一个新对象
2. 将构造函数的作用域赋给新的对象（this就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象

#### 原型模式
创建的每一个函数都有一个prototype（原型）属性，这个属性是一个指针，指向函数的原型对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。在默认情况下，所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性是一个指向prototype属性所在函数指针。
``` JavaScript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function () {
    console.log('My name is ' + this.name);
}
const person = new Person('leeper' 20);

console.log(person instanceof Object); // true
console.log(person instanceof Person); // true
console.log(person.constructor == Person); // false
console.log(person.constructor == Object); // true
```
调用构造函数时会为实例添加一个指向最初原型的[[Prototype]]指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系（指向Object），但可以手动修复。
``` JavaScript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor: Person, // 手动修复
  sayHello: function () {
    console.log('My name is ' + this.name);
  }
}
const person = new Person('leeper', 20);

console.log(person instanceof Object); // true
console.log(person instanceof Person); // true
console.log(person.constructor == Person); // true
console.log(person.constructor == Object); // true
```
总结一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象内部指针。

### 继承
#### 原型继承
原型描述事物与事物之间的相似性，可以通过原型描述两个实物之间的相似关系来复用代码，这种复用代码的模式称为原型继承。
``` JavaScript
function Cat() {

}
Cat.prototype.say = function () {
  return '喵喵';
}
Cat.prototype.climbTree = function () {
  return 'I can climb tree';
}

function Tiger() {

}
Tiger.prototype = new Cat();

// Tiger继承了Cat的climbTree的方法

// 重写Cat的say方法
Tiger.prototype.say = function () {
  return '嗷';
}
```
总结一下原型继承：
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
- 对象会记住它的原型
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型

### 类继承
ES6出了class语法糖，随之使用类继承也变得没那么繁琐。
``` JavaScript
class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}
const square = new Square(4);

console.log(square.getArea()); // -> 16
console.log(square.instanceof Square); // -> true
console.log(square.instanceof Rectangle); // -> true
```
上面相当与下面ES6之前代码：
``` JavaScript
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.getArea = function () {
  return this.length * this.width;
}

function Square(length) {
  Rectangel.call(this, length, length);
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square,
    enumerable: true,
    writable: true,
    configurable: true
  }
});
const square = new Square(4);

console.log(square.getArea()); // -> 16
console.log(square.instanceof Square); // -> true
console.log(square.instanceof Rectangle); // -> true
```

### 原型继承和类继承
原型继承和类继承是两种认知模式，本质上都是为了抽象（复用代码）。原型继承的便捷性表现在系统中对象较少的时候，原型继承不需要构造额外的抽象类和接口就可以实现复用。
