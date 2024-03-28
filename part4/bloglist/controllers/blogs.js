const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;
  let decodedToken;
  console.log("here", request.token);
  try {
    decodedToken = await jwt.verify(request.token, process.env.SECRET);
  } catch {
    return response.status(401).json({ error: "token invalid" });
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    author,
    user: user._id,
    url,
    likes,
  });
  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    return response.status(201).json(result);
  } catch (error) {
    return response.status(400).json(error);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch {
    return response.status(401).json({ error: "token invalid" });
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const blog = await blog.findById(request.params.id);

  if (blog.user.toString() === decodedToken.id.toString()) {
    try {
      const result = await blog.findByIdAndDelete(request.params.id);
      response.status(204).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  } else {
    return response
      .status(401)
      .json({ error: "Blog can only be deleted by creator" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const newInfo = request.body;

  try {
    const result = await blog.findByIdAndUpdate(request.params.id, newInfo);
    response.json(result);
  } catch (error) {
    response.status(404).json(error);
  }
});

module.exports = blogRouter;
