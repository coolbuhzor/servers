import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 8081;

const dataFilePath = path.join(__dirname, "data.json");

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

function readPosts() {
  try {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading posts data", err);
    return [];
  }
}

// Middleware to write posts to DATA.json
const writePosts = (posts) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
};

const middleware = (req, res, next) => {
  console.log("inside middleware");
  next();
};

app.use(middleware);

app.get("/", (req, res) => {
  const posts = readPosts();
  res.render("ejs/index", { posts });
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});

app.post("/register", (req, res) => {
  const data = req.body;
  console.log({ data });
  res.redirect("/contact");
});

// app.get("/posts", (req, res) => {
//   const posts = readPosts();
//   res.render("ejs/posts", { posts });
// });

app.get("/post/:id", (req, res) => {
  const posts = readPosts();
  const { id } = req.params;
  const post = posts.find((post) => post.id === +id);
  console.log({ post });
  res.render("ejs/post", { post });
});

app.get("/add-post", (req, res) => {
  res.render("ejs/add-post");
});

app.post("/post", (req, res) => {
  const posts = readPosts();
  posts.push({ id: posts.length + 1, ...req.body });
  writePosts(posts);
  res.redirect("/");
});

app.post("/update-post/:postId", (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const posts = readPosts();

  const postIndex = posts.findIndex((post) => post.id === +postId);
  if (postIndex !== -1) {
    posts[postIndex].title = title;
    posts[postIndex].content = content;
    writePosts(posts);
    console.log(`Post ${postId} updated successfully`);
  } else {
    console.log(`Post ${postId} not found`);
  }

  res.redirect("/");
});

app.get("/update-post/:postId", (req, res) => {
  const posts = readPosts();
  const { postId } = req.params;
  const post = posts.find((post) => post.id === +postId);
  if (post) {
    res.render("ejs/update-post", { postId, post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/views/404.html");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
