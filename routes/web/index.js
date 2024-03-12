/*
 * @Date: 2023-02-18 15:59:02
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-12 14:41:38
 * @FilePath: /PocketBook/routes/web/index.js
 * @Description: 主路由规则
 */

// 导入express
const express = require("express");
const router = express.Router();
// 导入moment
const moment = require("moment");
// 导入account模型对象
const AccountModel = require("../../models/AccountModel");
// 导入检测登录中间件
const checkLoginMiddleware = require("../../middleware/CheckLogin");

// 添加首页路由规则
router.get("/", function (req, res) {
  res.redirect("/account");
});

// 记账本的列表
// 加入登录检测中间件
router.get("/account", checkLoginMiddleware, function (req, res, next) {
  // 获取所有的账单信息，按时间倒序显示
  AccountModel.find()
    .sort({ time: -1 })
    .then(
      (data) => {
        res.render("list", { accounts: data, moment: moment });
      },
      (err) => {
        console.log("error:", err);
      }
    );
});

// 添加记录
router.get("/account/create", checkLoginMiddleware, function (req, res, next) {
  res.render("create");
});

// 新增记录
router.post("/account", checkLoginMiddleware, (req, res) => {
  // 查看表单数据
  console.log(req.body);
  // 插入数据库
  AccountModel.create({
    // 把body的所有属性都解构
    ...req.body,
    // 修改time属性的值
    time: moment(req.body.time).toDate(),
  }).then((data) => {
    // 成功提醒
    res.render("success", { msg: "添加成功哦~~~", url: "/account" });
  });
});

// 删除记录
router.get("/account/:id", checkLoginMiddleware, (req, res) => {
  // 获取 params 的 id 参数
  let id = req.params.id;
  console.log(id);
  // 删除
  AccountModel.deleteOne({ _id: id }).then(
    (data) => {
      // 提醒
      res.render("success", { msg: "删除成功~~~", url: "/account" });
    },
    (err) => {
      console.log("error:", err);
    }
  );
});

module.exports = router;
