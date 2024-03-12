/*
 * @Date: 2024-03-07 19:29:37
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-07 19:37:57
 * @FilePath: /PocketBook/middleware/CheckLogin.js
 * @Description:
 */

// 检测登录中间件
module.exports = (req, res, next) => {
  // 如果session里不包含username，则跳转到登录页面
  if (!req.session.username) {
    return res.redirect("/login");
  }
  next();
};
