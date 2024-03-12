/*
 * @Date: 2023-12-13 10:11:03
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-07 15:00:34
 * @FilePath: /PocketBook/models/UserModel.js
 * @Description:
 */
const mongoose = require("mongoose");

// 创建文档结构对象
// 设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
  // 用户名
  username: {
    type: String,
    required: true,
  },
  // 密码
  password: {
    type: String,
    required: true,
  },
});

// 创建模型对象，users为集合名称
// 对文档操作的封装对象，可以实现对文档的增删改查
let UserModel = mongoose.model("users", UserSchema);

// 暴露模型对象
module.exports = UserModel;
