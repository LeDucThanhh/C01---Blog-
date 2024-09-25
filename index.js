const readlineSync = require("readline-sync");
const {
  displayPosts,
  addPost,
  editPost,
  deletePost,
} = require("./src/blogManager");

function menu() {
  console.log(`
    1. Hiển thị danh sách bài viết
    2. Thêm bài viết mới
    3. Sửa bài viết
    4. Xóa bài viết
    5. Thoát
  `);
}

let shouldContinue = true;

while (shouldContinue) {
  menu();
  const choice = readlineSync.questionInt("Chọn chức năng: ");

  switch (choice) {
    case 1:
      displayPosts();
      break;
    case 2:
      const title = readlineSync.question("Nhập tiêu đề: ");
      const content = readlineSync.question("Nhập nội dung: ");
      const topic = readlineSync.question("Nhập chủ đề: ");
      const author = readlineSync.question("Nhập tác giả: ");
      const date = new Date().toISOString().split("T")[0]; // Auto-generate today's date
      addPost({ title, content, topic, author, date });
      console.log("Bài viết đã được thêm!");
      break;
    case 3:
      const idToEdit = readlineSync.questionInt("Nhập ID bài viết cần sửa: ");
      const newTitle = readlineSync.question("Nhập tiêu đề mới: ");
      const newContent = readlineSync.question("Nhập nội dung mới: ");
      const newTopic = readlineSync.question("Nhập chủ đề mới: ");
      const newAuthor = readlineSync.question("Nhập tác giả mới: ");
      editPost(idToEdit, {
        title: newTitle,
        content: newContent,
        topic: newTopic,
        author: newAuthor,
      });
      console.log("Bài viết đã được cập nhật!");
      break;
    case 4:
      const idToDelete = readlineSync.questionInt("Nhập ID bài viết cần xóa: ");
      deletePost(idToDelete);
      console.log("Bài viết đã bị xóa!");
      break;
    case 5:
      console.log("Thoát chương trình.");
      shouldContinue = false;
      break;
    default:
      console.log("Chọn không hợp lệ. Hãy chọn lại.");
      break;
  }

  if (shouldContinue) {
    const continueChoice = readlineSync.question(
      "Bạn có muốn tiếp tục không? (y/n): "
    );
    shouldContinue = continueChoice.toLowerCase() === "y";
  }
}
