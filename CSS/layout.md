# CSS布局
## 居中布局
### inline-block + text-align
``` html
<div class="parent">
  <div class="child>居中布局</div>
</div>
```

``` css
.parent {
  text-align: center;
}
.child {
  display: inline-block;
}
```
- 优：兼容性好
- 缺：child里面的文字也会居中，修复：.child添加text-align: left;

### flex + justify-content
``` html
<div class="parent">
  <div class="child>居中布局</div>
</div>
```

``` css
.parent {
  display:flex;
  justify-content:center;
}
```
- 缺：低版本浏览器(ie6 ie7 ie8)不支持

### absolute + transform
``` html
<div class="parent">
  <div class="child>居中布局</div>
</div>
```

``` css
.parent {
  position:relative;
}
.child {
  position:absolute;
  left:50%;
  transform:translateX(-50%);
}
```

## 垂直居中
### table-cell + vertical-align
``` html
<div class="parent">
  <div class="child>垂直布局</div>
</div>
```

``` css
.parent {
  display: table-cell;
  vertical-align: middle;
}
```
- 优：兼容性较好，ie8以上均支持
### absolute + transform
``` html
<div class="parent">
  <div class="child>垂直布局</div>
</div>
```

``` css
.parent {
  position:relative;
}
.child {
  position:absolute;
  top:50%;
  transform:translateY(-50%);
}
```
- 优：居中元素不会对其他的产生影响
- 缺：transform兼容性存在一定问题

### flex + align-items
``` html
<div class="parent">
  <div class="child>垂直布局</div>
</div>
```

``` css
.parent {
  position:relative;
}
.child {
  position:flex;
  align-items:center;
}
```
- 缺：兼容性存在一定问题

### writing-mode
``` html
<div class="parent">
  <div class="child>垂直布局</div>
</div>
```

``` css
.parent {
  writing-mode: vertical-lr;
}
.child {
  margin: auto;
}
```
- 缺：水平方向无法auto居中了

## 水平垂直居中
### absolute + transform
``` html
<div class="parent">
  <div class="child>水平垂直居中</div>
</div>
```

``` css
.parent {
  position:relative;
}
.child {
  position:absolute;
  left:50%;
  top:50%;
  transform:tranplate(-50%,-50%);
}
```

### inline-block + text-align + table-cell + vertical-align
``` html
<div class="parent">
  <div class="child>水平垂直居中</div>
</div>
```

``` css
.parent {
  text-align:center;
  display:table-cell;
  vertical-align:middle;
}
.child {
  display:inline-block;
}
```

### flex + justify-content + align-items
``` html
<div class="parent">
  <div class="child>水平垂直居中</div>
</div>
```

``` css
.parent {
  display:flex;
  justify-content:center;
  align-items:center;
}
```

- 缺：兼容性存在一定问题

### position: absolute/relative
``` html
<div class="parent">
  <div class="child>水平垂直居中</div>
</div>
```

``` css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
```

## 多列布局
### 定宽 + 自适应
1. float + overflow
``` html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>
```

``` css
.left {
  float:left;
  width:100px;
  margin-right:20px;
}
.right {
  overflow:hidden;
}
```
2. float + margin
``` html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>
```

``` css
.left {
  float:left;
  width:100px;
  position:relative;
}
.right-fix {
  float:right;
  width:100%;
  margin-left:-100px;
}
.right {
  margin-left:120px;
}
```
3. 使用flex
``` html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>
```

``` css
.parent {
  display:flex;
}
.left {
  width:100px;
  margin-right:20px;
}
.right {
  flex:1;
}
```

### 两列定宽 + 一列自适应
``` html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="center">
    <p>center</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>
```

``` css
.left, .center {
  float:left;
  width:100px;
  margin-right:20px;
}
.right {
  overflow:hidden;
}
```

### 两列不定宽 + 一列自适应
``` html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="center">
    <p>center</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>
```

``` css
.left,.center{
  float: left;
  margin-right: 20px;
}
.right{
  overflow: hidden;
}
.left p,.center p{
  width: 100px;
}
```

### 宽度自适应布局
#### 绝对定位法
``` html
<body>
  <div id="left"></div>
  <div id="center"></div>
  <div id="right"></div>
</body>
```
``` css
html, body {
  margin: 0;
  height: 100%;
}
#left, #right {
  position: absolute;
  top: 0;
  width: 200px; 
  height: 100%;
}
#left {
  left: 0;
}
#right {
  right: 0;
}
#center {
  margin: 0 210px;
  height: 100%;
}
```
#### margin 负值法
``` html
<body>
  <div id="center">
    <div id="body"></div>
  </div>
  <div id="left"></div>
  <div id="right"></div>
</body>
```
``` css
html, body {
  margin: 0;
  height: 100%;
}
#center {
  width: 100%;
  height: 100%;
  float: left;
}
#center #body{
  margin: 0 210px;
  height: 100%;
}
#left, #right {
  width: 200px;
  height: 100%;
  float: left;
}
#left {
  margin-left: -100%;
}
#right {
  margin-left: -200px;
}
```
#### 自身浮动法
``` html
<body>
  <div id="left"></div>
  <div id="right"></div>
  <div id="center"></div>
</body>
```
``` css
html, body {
  margin: 0;
  height: 100%;
}
#center {
  height: 100%;
  margin: 0 210px;
}
#left, #right {
  width: 200px;
  height: 100%;
}
#left {
  float: left;
}
#right {
  float: right;
}
```