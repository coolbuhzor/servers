import express from "express";
import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../../controllers/blogController.js";
const router = express.Router();

router.route("/").get(getBlogs).post(addBlog);

router.route("/:id").put(updateBlog).get(getBlog).delete(deleteBlog);

export default router;
