# 认识RESTful
REST，是Roy Thomas Fielding博士于2000年在他的博士论文中提出来的一种万维网软件架构风格。
### 什么是RESTful
> REST的全称是Representational State Transfer，中文含义为表现层状态变化。符合REST规范的设计，都可以称为RESTful设计。

### RESTful的设计哲学
RESTful的设计哲学主要将服务器提供的内容实体看作一个资源，并表现在URL上。
> 所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。
  
比如：
```
/users/leeper
```
这个地址代表一个资源，对这个资源的操作，主要体现在HTTP请求的方法上，不是体现在URL上。  
例如，对用户的增删查改可能是这样设计URL的：
```
POST  /user/add?username=leeper
GET   /user/remove?username=leeper
POST  /user/update?username=leeper
GET   /user/get?username=leeper
```
主要使用的请求方法是POST和GET，操作行为主要体现在URL上。  
在RESTful设计中，它是这样的：
```
POST     /user/leeper
DELETE   /user/leeper
PUT      /user/leeper
GET      /user/leeper
```
对于资源的具体表现形态，不再表现在URL上了。

### 特点
来自维基百科：
> - 资源是由URI来指定
> - 对资源的操作包括获取、创建、修改和删除资源，这些操作正好对应HTTP协议提供的GET、POST、PUT和DELETE方法
> - 通过操作资源的表现形式来操作资源
> - 资源的表现形式则是XML或者HTML，取决于读者是机器还是人，是消费web服务的客户软件还是web浏览器。当然也可以是任何其他的格式

### 优点
来自维基百科：
> - 可更高效利用缓存来提高响应速度
> - 通讯本身的无状态性可以让不同的服务器的处理一系列请求中的不同请求，提高服务器的扩展性
> - 浏览器即可作为客户端，简化软件需求
> - 相对于其他叠加在HTTP协议之上的机制，REST的软件依赖性更小
> - 不需要额外的资源发现机制
> - 在软件技术演进中的长期的兼容性更好

### 误区
- 避免URI包含动词
- 避免在URI中加入版本号

### 总结
- 每一个URI代表一种资源
- 客户端和服务器之间，传递这种资源的某种表现层
- 客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"

参考：  
- [维基百科](https://zh.wikipedia.org/wiki/%E5%85%B7%E8%B1%A1%E7%8A%B6%E6%80%81%E4%BC%A0%E8%BE%93)
- [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
- 朴灵-《深入浅出Node.js》