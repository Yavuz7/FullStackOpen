const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Tacos On Thursday?",
    author: "The Banana Man",
    url: "google.com",
    likes: 21,
  },
  {
    title: "Bananas On Friday?",
    author: "The Coconut Female",
    url: "google.com",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("Get blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("Get blog Format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Get id property", async () => {
  const response = await api.get("/api/blogs");

  assert(response.body[0].hasOwnProperty("id"));
  assert(!response.body[0].hasOwnProperty("_id"));
});

after(async () => {
  await mongoose.connection.close();
});
