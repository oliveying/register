
### 依赖node，npm，express

* 安装express

```bash
npm install -g express // 显示安装成功，但是命令行无法使用 express 命令
npm install -g express-generator // 进行全局安装之后
express --version // 4.16.1
```

* 初始化项目
```bash
express -e register// 初始化项目
npm install

npm start // 启动项目
```

```bash
.
├── README.md
├── app.js
├── bin  // 是项目的启动文件，配置以什么方式启动项目，默认 npm start
│   └── www
├── package-lock.json
├── package.json
├── public // public是项目的静态文件，放置js css img等文件
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes  // routes是项目的路由信息文件,控制地址路由
│   ├── index.js
│   └── users.js
├── tree.md
├── views  // views是视图文件，放置模板文件ejs或jade等（其实就相当于html形式文件啦~)
│   ├── error.ejs
│   └── index.ejs
└── yarn.lock

```
* express这样的MVC框架模式，是一个Web项目的基本构成。


