/*
 * @Date: 2024-03-01 16:56:52
 * @LastEditors: lolan0728 vampire.lolan@outlook.com
 * @LastEditTime: 2024-03-01 20:15:56
 * @FilePath: /PocketBook/public/js/deleteButton.js
 * @Description:
 */
let delBtns = document.querySelectorAll(".delBtn");
delBtns.forEach((item) => {
  item.addEventListener("click", function (e) {
    if (confirm("Do you want to delete this item?")) {
      return true;
    } else {
      e.preventDefault();
    }
  });
});
