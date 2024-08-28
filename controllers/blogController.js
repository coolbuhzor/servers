import { sendResponse } from "../utils/index.js";
import { db } from "../index.js";
import { FileStorage } from "../models/fileStorage/index.js";
// const db = new FileStorage();

export const getBlog = (req, res) => {
  const data = db.all();
  const blogs = Object.entries(data).map(([k, v]) => {
    if (k === "blogs") return v;
  });
  console.log(blogs);
  sendResponse(res, 200, "Blogs fetched successfully", blogs);
};

// {
//     key: value
// }

// [["key", "value"]]

// const arr = [1, 2, 3]
// const [one, two, three] = arr;
// console.log(one); //1

export const addBlog = (req, res) => {
  console.log(db.all());
  try {
    const blogPost = req.body;
    if (!blogPost?.title || blogPost?.title === "")
      return sendResponse(res, 400, "title is required", null);
    if (!blogPost?.content || blogPost?.content === "")
      return sendResponse(res, 400, "content is required", null);

    console.log({ posts: { id: Date.now(), ...blogPost } });
    const newPost = db.new("blogs", blogPost);
    sendResponse(res, 201, "Blog posted successfully", newPost);
  } catch (error) {
    sendResponse(res, 500, error.message, error);
  }
};
