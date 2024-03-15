const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json(error);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    const result = await blog.findByIdAndDelete(request.params.id);
    response.status(204).json(result);
  } catch (error) {
    response.status(400).json(error);
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
