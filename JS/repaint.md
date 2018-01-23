# 重排与重绘

## 定义
- 重排：当DOM的变化影响了元素几何属性，浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为“重排”。
- 重绘：完成重排后，浏览器会重新绘制受影响的部分到屏幕中，这个过程称为“重绘”。

## 重排何时发生
- 添加或删除可见的DOM元素
- 元素位置的改变
- 元素尺寸的改变（包括：外边距、内边距、边框厚度、宽度、高度等属性改变）
- 内容改变（例如：文本内容改变或图片被另外一个不同尺寸的图片代替）
- 页面渲染器初始化
- 浏览器窗口尺寸改变  

还有些改变会触发整个页面的重排，例如，当滚动条出现时。

## 渲染树变化的排队与刷新
由于每次重排都会产生计算消耗，大多数浏览器通过队列化修改并批量执行来优化重排过程。  
- offsetTop, offsetLeft, offsetWidth, offsetHeight
- scrollTop, scrollLeft, scrollWidth, scrollHeight
- clientTop, clientLeft, clientWidth, clientHeight
- getComputedStyle()

以上属性和方法需要返回最新的发布信息，因此浏览器不得不执行渲染列队中的“”待处理变化并触发重排以返回正确的值。

## 最小化重排和重绘
### 改变样式

#### 批量修改样式
``` JavaScript
var el = document.getElementById('div');
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
el.style.padding = '3px';
```
优化：合并所有的改变然后一次处理，这样只会修改DOM一次。
``` JavaScript
var el document.getElementById('div');
el.style.cssText = 'border-left: 1px; border-right: 2px; padding: 3px;';
```
如果想保留现有的样式，可以把它附加在cssText字符串后面。
``` JavaScript
el.style.cssText += '; border-left: 20px;';
```
#### 添加class
``` JavaScript
var el = document.getElementById('div');
el.className = 'active';
```

### 批量修改DOM
可以通过以下步骤来减少重绘和重排的次数：
1. 使元素脱离文档流
2. 对其应用多重改变
3. 把元素带回文档中

有三种基本方法使DOM脱离文档：
- 隐藏元素，应用修改，重新显示
``` JavaScript
// ...
ul.style.display = 'none';
// ...
ul.style.display = 'block';
```
- 使用文档片断在当前DOM之外构建一个子树，再把它拷贝回文档
``` JavaScript
var fragment = document.createDocumentFragment();
// ...
list.appendChild(fragment);
```
- 将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素
``` JavaScript
var old = document.getElementById('list');
var clone = old.cloneNode(true);
// ...
old.parentNode.replaceChild(clone, old);
```

### 缓存布局信息
当查询布局信息时，比如获取偏移量（offsets）、滚动位置（scroll values）或计算出的样式值（computedstyle values）时，浏览器为了返回最新值，会刷新队列并应用所有变更。最好的做法是尽量减少布局信息的获取次数，获取后把它赋值给局部变量，然后再操作局部变量。

### 让元素脱离动画流
使用绝对位置定位页面上的动画，将其脱离文档流。