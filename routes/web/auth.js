/*
 * @Date: 2023-02-18 15:59:02
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-07 19:53:51
 * @FilePath: /PocketBook/routes/web/auth.js
 * @Description: 登录相关路由规则
 */

var express = require("express");
var router = express.Router();

// 导入 account模型对象
const UserModel = require("../../models/UserModel");
// 导入md5加密工具包
const md5 = require("md5");

// 注册页面
router.get("/reg", function (req, res) {
  // 响应html内容
  res.render("auth/reg");
});

// 注册操作
router.post("/reg", function (req, res) {
  // 获取请求体的数据
  console.log(req.body);
  UserModel.create({
    // 把body的所有属性都解构
    ...req.body,
    // 密码加密后存储
    password: md5(req.body.password),
  }).then((data) => {
    // 成功提醒
    res.render("success", { msg: "用户注册成功哦~~~", url: "/login" });
  });
});

// 登录页面
router.get("/login", function (req, res) {
  // 响应html内容
  res.render("auth/login");
});

// 登录操作
router.post("/login", function (req, res) {
  // 获取用户名和密码
  let { username, password } = req.body;
  // 查询数据库
  UserModel.findOne({ username: username, password: md5(password) }).then(
    (data) => {
      // 如果data为null则没有找到响应的记录。
      if (!data) {
        res.send("Login failed");
        return;
      }
      // 写入session
      req.session.username = data.username;
      req.session._id = data._id;
      // 成功提醒
      res.render("success", { msg: "登录成功~~~", url: "/account" });
    }
  );
});

// 退出登录操作
router.post("/logout", function (req, res) {
  req.session.destroy(() => {
    // 成功提醒
    res.render("success", { msg: "退出成功~~~", url: "/login" });
  });
});

module.exports = router;
