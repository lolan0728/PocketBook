/*
 * @Date: 2023-02-18 09:31:18
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-13 10:28:21
 * @FilePath: /PocketBook/app.js
 * @Description:
 */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 导入session包
const session = require("express-session");
const mongoStore = require("connect-mongo");

// 导入配置项
const { DB_HOST, DB_PORT, DB_NAME } = require("./config/config");

// 一般路由
var indexRouter = require("./routes/web/index");
// 注册登录路由
var authRouter = require("./routes/web/auth");

// api接口
var accountRouter = require("./routes/api/account");
var authAPIRouter = require("./routes/api/auth");

var app = express();
// 设置session中间件
app.use(
  session({
    // 设置cookie的name，默认值是：connect.sid
    name: "sid",
    // 参与加密的字符串(又称密钥，签名)
    secret: "secret",
    // 是否为每次请求都设置一个cookie用来存储session的id
    saveUninitialized: false,
    // 是否每次请求时重新保存session
    resave: true,
    store: mongoStore.create({
      // 数据库连接配置
      mongoUrl: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    }),
    cookie: {
      // 开启后前段无法通过JS操作
      httpOnly: true,
      // session的有效时间
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", authRouter);
// 使用account路由
app.use("/api", accountRouter);
app.use("/api", authAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  // 响应404
  res.render("404");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
