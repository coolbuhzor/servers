import express from "express";
import { sendResponse } from "../../utils/index.js";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    sendResponse(res, 200, "Blogs fetched successfully", []);
  })
//   .post();

// router.use("/:id").put().get().delete();

export default router;
