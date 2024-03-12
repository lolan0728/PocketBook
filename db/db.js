/*
 * @Date: 2023-12-12 09:58:56
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-07 19:00:44
 * @FilePath: /PocketBook/db/db.js
 * @param {*} success: 数据库连接成功的回调
 * @param {*} error: 数据库连接错误的回调
 * @Description:
 */

// 导入mongoose
const mongoose = require("mongoose");
const { DB_HOST, DB_PORT, DB_NAME } = require("../config/config");

// 整个文件内容作为一个函数暴露出去
module.exports = function (success, error) {
  // 如果没有传错误处理函数，使用默认值
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败");
    };
  }

  // 连接mongodb服务
  // bilibili是数据库名，不存在会自动创建
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

  mongoose.connection.on("open", () => {
    success();
  });

  mongoose.connection.on("error", () => {
    // 连接错误的回调函数
    error();
  });

  mongoose.connection.on("close", () => {
    // 连接关闭的回调函数
    console.log("连接关闭");
  });
};
