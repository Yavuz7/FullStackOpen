const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { title: 1 });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

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

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id.toString()) {
      try {
        const result = await Blog.findByIdAndDelete(request.params.id);
        response.status(204).json(result);
      } catch (error) {
        response.status(400).json(error);
      }
    } else {
      return response
        .status(401)
        .json({ error: "Blog can only be deleted by creator" });
    }
  }
);

blogRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes, comments } = request.body;
  const user = request.user;

  const updatedInfo = {
    user: user._id,
    likes: likes,
    author: author,
    title: title,
    comments: comments,
    url: url,
  };

  try {
    const result = await blog.findByIdAndUpdate(request.params.id, updatedInfo);
    response.json(result);
  } catch (error) {
    response.status(404).json(error);
  }
});

blogRouter.post("/:id", async (request, response) => {
  const { title } = request.body;
  const blogId = request.params.id;

  const newComment = new Comment({
    title,
    blog: blogId,
  });
  try {
    const result = await newComment.save();
    console.log("HERE!");
    const blogToUpdate = await Blog.findById(blogId);
    await Blog.findByIdAndUpdate(blogId, {
      comments: blogToUpdate.comments.concat(result._id),
    });
    return response.status(201).json(result);
  } catch (error) {
    return response.status(400).json(error);
  }
});

module.exports = blogRouter;
