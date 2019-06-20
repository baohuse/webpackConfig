这个插件源自一个需求，或者说问题？

我们想要提取多个入口 thunk 的公共代码

举例（- 代表用到了一些模块）

a.js - lodash
     - user.js
     - c.js

b.js - lodash
     - user.js
     - d.js

那我们在打包时会打两个包，一般来说是 a.bundle.js  b.bundle.js, 而在这两个包里面都包含了 lodash跟 user , 这不是我们所希望的，我们往往希望 公共的代码 单独打出来， ？

还有那些不太会变化的，例如，react等基础库