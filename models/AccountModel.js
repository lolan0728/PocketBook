/*
 * @Date: 2023-12-13 10:11:03
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2023-12-13 11:44:23
 * @FilePath: /PocketBook/models/AccountModel.js
 * @Description:
 */
const mongoose = require("mongoose");

// 创建文档结构对象
// 设置集合中文档的属性以及属性值的类型
let AccountSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true,
  },
  // 时间
  time: Date,
  // 类型
  type: {
    type: Number,
    enum: [-1, 1],
    default: -1,
  },
  // 金额
  account: {
    type: Number,
    required: true,
  },
  // 备注项
  remarks: String,
});

// 创建模型对象，Accounts为集合名称
// 对文档操作的封装对象，可以实现对文档的增删改查
let AccountModel = mongoose.model("accounts", AccountSchema);

// 暴露模型对象
module.exports = AccountModel;
