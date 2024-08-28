import express from "express";
const router = express.Router();
import blog from "./blog.js";

router.use("/blog", blog);
// router.use('/auth', auth);

export default router;
