const express = require("express");
const router = express.Router();
const { getPost, createPost } = require("../controllers/postControllers");

router.get("/:userId", getPost);
router.post("/:userId", createPost);

module.exports = router;
