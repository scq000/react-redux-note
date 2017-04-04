# Description

通常项目实践中，我们会搭建mock server来方便前端的开发。起码要实现以下两个功能：
1. 请求路由的映射
2. 数据接口代理或数据模拟

在这个项目中，后端我采用了Mongodb数据库来管理数据，api设计成是RESTFUL的风格。如果是单纯为了数据的模拟，也可以改造成数据持久化的方式，从而避免操作数据库的问题。

# Get Start

```
yarn start
//or
npm start
```

# Tools
以下是一些在开发过程中可能会有所帮助的工具：

[json generator](http://beta.json-generator.com/) 在线json生成器，可用于方便地生成假数据

mock server:
[pretender](https://github.com/pretenderjs/pretender#timing-parameter) restful mock server

[faker](https://github.com/marak/faker.js) 可以生成大量假数据

[RAP](https://github.com/thx/RAP) web接口管理工具，功能十分强大，可以一试
