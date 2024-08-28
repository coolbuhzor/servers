import express from "express";
import { addBlog, getBlog } from "../../controllers/blogController.js";
const router = express.Router();

router.route("/").get(getBlog).post(addBlog);

// router.use("/:id").put().get().delete();

export default router;
