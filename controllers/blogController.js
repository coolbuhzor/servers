import { sendResponse } from "../utils/index.js";
import { db } from "../index.js";
import { FileStorage } from "../models/fileStorage/index.js";

const getBlogsFromDb = () => {
  const data = db.all();
  const blogs = Object.keys(data).filter((k) => k === "blogs");
  return data[blogs]; // []
};

export const getBlogs = (req, res) => {
  const blogs = getBlogsFromDb();
  sendResponse(res, 200, "Blogs fetched successfully", blogs);
};

// {
//     key: value
// }

// [["key", "value"]]

// const arr = [1, 2, 3]
// const [one, two, three] = arr;
// console.log(one); //1

export const addBlog = async (req, res) => {
  try {
    const blogPost = req.body;
    if (!blogPost?.title || blogPost?.title === "")
      return sendResponse(res, 400, "title is required", null);
    if (!blogPost?.content || blogPost?.content === "")
      return sendResponse(res, 400, "content is required", null);

    const newPost = await db.new("blogs", { id: Date.now(), ...blogPost });
    sendResponse(res, 201, "Blog posted successfully", newPost);
  } catch (error) {
    sendResponse(res, 500, error.message, error);
  }
};

export const updateBlog = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // find blog that matches id
    const blogs = getBlogsFromDb();
    console.log(blogs);
    const foundBlog = blogs.find((item) => item.id === +id);
    console.log({ foundBlog });
    // if blog exists, update it and return the updated data
    if (!foundBlog) return sendResponse(res, 404, "Blog post not found");

    const update = db.update("blogs", { id: +id, ...data });
    sendResponse(res, 201, "Blog post updated successfully", update);

    // if it does not exist. send back a 404
  } catch (error) {
    sendResponse(res, 500, error.message, error);
  }
};

export const getBlog = (req, res) => {};

export const deleteBlog = (req, res) => {};
