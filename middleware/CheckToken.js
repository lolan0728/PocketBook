/*
 * @Date: 2024-03-12 14:37:03
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-12 15:41:52
 * @FilePath: /PocketBook/middleware/CheckToken.js
 * @Description:
 */

// 导入jwt工具包
const jwt = require("jsonwebtoken");
// 取得SECRET_KEY
const { SECRET_KEY } = require("../config/config");

// 检测token中间件
module.exports = (req, res, next) => {
  // 取得token
  let token = req.get("token");
  // token有无判断
  if (!token) {
    return res.json({
      // 响应编号
      code: "2003",
      // 响应信息
      msg: "token缺失",
      // 响应的数据
      data: null,
    });
  }
  // token校验
  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      return res.json({
        // 响应编号
        code: "2004",
        // 响应信息
        msg: "token校验失败",
        // 响应的数据
        data: null,
      });
    }
    // 保存用户信息
    req.user = data;
    // 如果token校验成功，继续执行
    next();
  });
};
