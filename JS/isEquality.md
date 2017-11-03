# 假值的相等比较

JavaScript中的值可以分为以下两类：
1. 可以被强制类型转换成false值
2. 其他（被强制类型转换为true的值）  


以下这些都是假值:
- undefined
- null
- false
- +0, -0和NaN
- ""  

**假值的布尔强制类型转换结果为false**。假值之外都是真值。  
  
一些常见情况如下：

``` JavaScript
'0' == null; // false
'0' == undefined; // false
'0' == false; // false
'0' == NaN; // false
'0' == 0; // true
'0' == ''; // false

false == null; // false
false == undefined; // false
false == NaN; // false
false == 0; // true
false == ''; // true
false == []; // true
false == {}; //false

"" == null; // false
"" == undefined; // false
"" == NaN; // false
"" == 0; // true
"" == []; // true
"" == {}; // false

0 == null; // false
0 == undefined; // false
0 == NaN; // false
0 == []; // true
0 == {}; // false
```

以上情况总结：
1. 在 == 中null和undefined相等（它们也与其自身相等），除此之外其他值都不存在这种情况
2. 如果需要将非数字值当做数字来使用，规范规定了一些规则：true转换为1，false转换为0，undefined转换为NaN，null转换为0，[]转换为0，{}转换为NaN 

### 执行类型转换的规则
- 如果一个运算数是Boolean 值，在检查相等性之前，把它转换成数字值。false转换成 0，true 为 1
- 如果一个运算数是字符串，另一个是数字，在检查相等性之前，要尝试把字符串转换成数字
- 如果一个运算数是对象，另一个是字符串，在检查相等性之前，要尝试把对象转换成字符串
- 如果一个运算数是对象，另一个是数字，在检查相等性之前，要尝试把对象转换成数字  

### 其他情况
- NaN不等于NaN
- +0 == -0
- [] == ![]
- 0 == "\n"