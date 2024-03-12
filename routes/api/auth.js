/*
 * @Date: 2023-02-18 15:59:02
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-12 15:02:20
 * @FilePath: /PocketBook/routes/api/auth.js
 * @Description: 登录相关路由规则
 */

const express = require("express");
const router = express.Router();

// 导入 account模型对象
const UserModel = require("../../models/UserModel");
// 导入md5加密工具包
const md5 = require("md5");
// 导入jwt工具包
const jwt = require("jsonwebtoken");
// 取得SECRET_KEY
const { SECRET_KEY } = require("../../config/config");

// 登录操作
router.post("/login", function (req, res) {
  // 获取用户名和密码
  let { username, password } = req.body;
  // 查询数据库
  UserModel.findOne({ username: username, password: md5(password) }).then(
    (data) => {
      // 如果data为null则没有找到响应的记录。
      if (!data) {
        return res.json({
          code: "2002",
          msg: "id or psw error",
          data: null,
        });
      }

      // 生成token
      let token = jwt.sign(
        {
          username: data.username,
          _id: data._id,
        },
        SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24 * 7,
        }
      );

      // 响应token
      res.json({
        code: "0000",
        msg: "登录成功",
        data: token,
      });
    },
    (err) => {
      res.json({
        code: "2001",
        msg: "database read error",
        data: null,
      });
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
