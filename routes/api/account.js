/*
 * @Date: 2023-02-18 15:59:02
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-12 14:48:18
 * @FilePath: /PocketBook/routes/api/account.js
 * @Description: API用Router，返回JSON格式的数据。
 */

const express = require("express");
const router = express.Router();
// 导入moment
const moment = require("moment");
// 导入account模型对象
const AccountModel = require("../../models/AccountModel");
// 导入检测token中间件
const checkTokenMiddleware = require("../../middleware/CheckToken");

// 记账本的列表
router.get("/account", checkTokenMiddleware, function (req, res, next) {
  // 获取所有的账单信息，按时间倒序显示
  AccountModel.find()
    .sort({ time: -1 })
    .then(
      (data) => {
        // 成功
        res.json({
          // 响应编号
          code: "0000",
          // 响应信息
          msg: "读取成功",
          // 响应的数据
          data: data,
        });
      },
      (err) => {
        // 失败
        res.json({
          // 响应编号
          code: "1001",
          // 响应信息
          msg: "读取失败",
          // 响应的数据
          data: null,
        });
      }
    );
});

// 获取单条账单数据
router.get("/account/:id", checkTokenMiddleware, function (req, res, next) {
  // 获取 params 的 id 参数
  let id = req.params.id;
  // 获取单条数据
  AccountModel.findById({ _id: id }).then(
    (data) => {
      // 成功
      res.json({
        // 响应编号
        code: "0000",
        // 响应信息
        msg: "读取成功",
        // 响应的数据
        data: data,
      });
    },
    (err) => {
      // 失败
      res.json({
        // 响应编号
        code: "1004",
        // 响应信息
        msg: "读取失败",
        // 响应的数据
        data: null,
      });
    }
  );
});

// 新增记录
router.post("/account", checkTokenMiddleware, (req, res) => {
  // 查看表单数据
  console.log(req.body);
  // 插入数据库
  AccountModel.create({
    // 把body的所有属性都结构
    ...req.body,
    // 修改time属性的值
    time: moment(req.body.time).toDate(),
  }).then(
    (data) => {
      // 成功
      res.json({
        // 响应编号
        code: "0000",
        // 响应信息
        msg: "添加成功",
        // 响应的数据
        data: data,
      });
    },
    (err) => {
      // 失败
      res.json({
        // 响应编号
        code: "1002",
        // 响应信息
        msg: "添加失败",
        // 响应的数据
        data: null,
      });
    }
  );
});

// 更新单条记录
router.patch("/account/:id", checkTokenMiddleware, (req, res) => {
  // 获取 params 的 id 参数
  let id = req.params.id;
  // 插入数据库
  AccountModel.updateOne(
    { _id: id },
    {
      // 把body的所有属性都结构
      ...req.body,
      // 修改time属性的值
      time: moment(req.body.time).toDate(),
    }
  ).then(
    (data) => {
      // updateOne函数返回的并不是更新的数据。
      // 为了保持REST API风格，所以再用id查找一次，把结果返回。
      AccountModel.findById({ _id: id }).then(
        (data) => {
          // 成功
          res.json({
            // 响应编号
            code: "0000",
            // 响应信息
            msg: "更新成功",
            // 响应的数据
            data: data,
          });
        },
        (err) => {
          // 查找失败
          res.json({
            // 响应编号
            code: "1004",
            // 响应信息
            msg: "读取失败",
            // 响应的数据
            data: null,
          });
        }
      );
    },
    (err) => {
      // 更新失败
      res.json({
        // 响应编号
        code: "1005",
        // 响应信息
        msg: "更新失败",
        // 响应的数据
        data: null,
      });
    }
  );
});

// 删除记录
router.delete("/account/:id", checkTokenMiddleware, (req, res) => {
  // 获取 params 的 id 参数
  let id = req.params.id;
  console.log(id);
  // 删除
  AccountModel.deleteOne({ _id: id }).then(
    (data) => {
      // 删除成功
      res.json({
        // 响应编号
        code: "0000",
        // 响应信息
        msg: "删除成功",
        // 响应的数据
        data: data,
      });
    },
    (err) => {
      // 删除失败
      res.json({
        // 响应编号
        code: "1003",
        // 响应信息
        msg: "删除失败",
        // 响应的数据
        data: null,
      });
    }
  );
});

module.exports = router;
