# Node.js中使用基于token的身份校验

### token身份校验流程
1. 第一次请求时，用户发送账号和密码
2. 后端校验通过后生成一个具有时效性的token返回给前端
3. 前端将返回的token存储在本地，一般存储在localStorage或cookie中
4. 之后的带有权限操作的请求都将token添加在请求头中，后端校验token

### 公钥、私钥的生成
1. 打开终端，输入openssl，打开OpenSSL
2. 生成私钥：**genrsa -out rsa_private_key.pem 2048**
3. 生成公钥：**rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem**

### token的生成与校验
在Node.js中使用了jsonwebtoken包  
  
生成token：createToken.js
```js
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = data => {
  // 设置一天有效期
  const created = Math.floor(Date.now() / 1000) + 3600 * 24
  // 私钥
  const cert = fs.readFileSync(path.join(__dirname, '../config/rsa_private_key.pem'))
  const token = jwt.sign({
    exp: created,
    data
  }, cert, {algorithm: 'RS256'})

  return token
}
```
校验token：verifyToken.js
``` js
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = token => {
  let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_public_key.pem')),res = {};
  try {
    const tokenStr = JSON.parse(token)
    const decoded = jwt.verify(tokenStr, cert, {algorithms: ['RS256']})
    return decoded
  } catch(err) {
    // err
  }
}

```

### 参考
- [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [jwt](https://jwt.io/)
