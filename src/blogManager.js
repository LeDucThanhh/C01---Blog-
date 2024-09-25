const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data.json");

function readPosts() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data).posts;
}

function writePosts(posts) {
  const data = { posts };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function displayPosts() {
  const posts = readPosts();
  console.table(posts);
}

function addPost(post) {
  const posts = readPosts();
  post.id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  posts.push(post);
  writePosts(posts);
}

function editPost(id, newPost) {
  const posts = readPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...newPost };
    writePosts(posts);
  } else {
    console.log("Post not found");
  }
}

function deletePost(id) {
  let posts = readPosts();
  posts = posts.filter((post) => post.id !== id);
  writePosts(posts);
}

module.exports = { displayPosts, addPost, editPost, deletePost };
