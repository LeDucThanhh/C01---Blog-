const readline = require("readline");
const {
  displayPosts,
  addPost,
  editPost,
  deletePost,
} = require("./src/blogManager");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(`
    1. Hiển thị danh sách bài viết
    2. Thêm bài viết mới
    3. Sửa bài viết
    4. Xóa bài viết
    5. Thoát
  `);

  rl.question("Chọn một chức năng: ", (choice) => {
    if (choice === "1") {
      displayPosts();
      showMenu();
    } else if (choice === "2") {
      rl.question("Nhập tiêu đề: ", (title) => {
        rl.question("Nhập nội dung: ", (content) => {
          rl.question("Nhập chủ đề: ", (topic) => {
            rl.question("Nhập tác giả: ", (author) => {
              const date = new Date().toISOString().split("T")[0];
              addPost({ title, content, topic, author, date });
              console.log("Đã thêm bài viết");
              showMenu();
            });
          });
        });
      });
    } else if (choice === "3") {
      rl.question("Nhập ID bài viết cần sửa: ", (id) => {
        rl.question("Nhập tiêu đề mới (bỏ qua để giữ nguyên): ", (title) => {
          rl.question(
            "Nhập nội dung mới (bỏ qua để giữ nguyên): ",
            (content) => {
              editPost(parseInt(id), { title, content });
              console.log("Đã sửa bài viết");
              showMenu();
            }
          );
        });
      });
    } else if (choice === "4") {
      rl.question("Nhập ID bài viết cần xóa: ", (id) => {
        deletePost(parseInt(id));
        console.log("Đã xóa bài viết");
        showMenu();
      });
    } else if (choice === "5") {
      rl.close();
    } else {
      console.log("Lựa chọn không hợp lệ");
      showMenu();
    }
  });
}

showMenu();
