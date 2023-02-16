const PostModel = require("../models/PostModel");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = new PostModel({ title, content, user: req.params.userId });
  await post.save();
  res.send(post);
};
const getPost = async () => {
  const posts = await PostModel.find({ user: req.params.userId });
  res.send(posts);
};
module.exports = { createPost, getPost };
