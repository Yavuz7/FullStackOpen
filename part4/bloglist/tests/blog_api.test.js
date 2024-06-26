const { test, after, beforeEach, describe } = require("node:test");
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
    user: "65fdb18ede63adb903f49570",
    likes: 21,
  },
  {
    title: "Bananas On Friday?",
    author: "The Coconut Female",
    user: "65fdb18ede63adb903f49570",
    url: "google.com",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Checking Blogs for the right info", () => {
  test("Get blogs", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test("Get blog Format", async () => {
    const response = await api
      .get("/api/blogs")
      .set(
        "Authorization",
        "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
      )
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Get id property", async () => {
    const response = await api
      .get("/api/blogs")
      .set(
        "Authorization",
        "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
      );

    assert(response.body[0].hasOwnProperty("id"));
    assert(!response.body[0].hasOwnProperty("_id"));
  });
});

const newBlogPost = {
  title: "Sombreos on Sunday?",
  author: "Sunglasses",
  url: "google.com",
  likes: 40,
};
test("Sending out a bad token", async () => {
  await api
    .post("/api/blogs")
    .set(
      "Authorization",
      "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
    )
    .send(newBlogPost)
    .expect(401);
});

test("Posting blog to Database", async () => {
  await api
    .post("/api/blogs")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
    )
    .send(newBlogPost);

  const response = await api
    .get("/api/blogs")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
    );

  const contents = response.body.map((e) => e.title);
  console.log(contents);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(contents.includes("Sombreos on Sunday?"));
});

describe("Checking If Bad Data is caught", () => {
  test("Check if likes defaulted", async () => {
    const response = await api
      .get("/api/blogs")
      .set(
        "Authorization",
        "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
      );

    const likes = response.body.map((e) => e.likes);
    assert.strictEqual(likes.length, 2);
  });

  const badBlogPost = {
    author: "Eggman",
    likes: 2,
  };

  test("Posting bad data to database", async () => {
    await api
      .post("/api/blogs")
      .set(
        "Authorization",
        "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
      )
      .send(badBlogPost)
      .expect(400);
  });
});

describe("Deleting blogs from database", () => {
  test("delete one blog from the database", async () => {
    const blogs = await api
      .get("/api/blogs")
      .set(
        "Authorization",
        "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
      );

    const blogToDelete = blogs.body[1].id;

    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set(
        "Authorization",
        "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
      )
      .expect(204);

    const blogs2 = await api.get("/api/blogs");

    assert.strictEqual(blogs2.body.length, 1);
  });

  test("Delete nonexistent blog"),
    async () => {
      const blogToDelete = "2";

      await api
        .delete(`/api/blogs/${blogToDelete}`)
        .set(
          "Authorization",
          "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
        )
        .expect(400);
    };
});

describe("Updating Database", () => {
  test("update one blog from the database", async () => {
    const blogs = await api.get("/api/blogs");

    const blogToEdit = blogs.body[0].id;

    await api.put(`/api/blogs/${blogToEdit}`).send({ likes: 35 });

    const blogs2 = await api.get("/api/blogs");

    console.log(blogs2.body);
    assert.strictEqual(blogs2.body[0].likes, 35);
  });

  test("update with bad id", async () => {
    const blogToEdit = 2;

    await api
      .put(`/api/blogs/${blogToEdit}`)
      .set(
        "Authorization",
        "Bearer hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmFuYSIsImlkIjoiNjYwNmQzNWRiMDFjNTNlMDBkNDIxYjJlIiwiaWF0IjoxNzExNzIzMzU3fQ.H9wj7SChl0emJNomlqsJZq5X6NIjdP_2DV-QAbCs7kM"
      )
      .send({ author: "egg" })
      .expect(404);
  });
});

after(async () => {
  await mongoose.connection.close();
});
