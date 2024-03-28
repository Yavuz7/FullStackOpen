const { test, after, beforeEach, describe } = require("node:test");
const bcrypt = require("bcryptjs");

const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");
const Blog = require("../models/blog");
const helper = require("../utils/test_helper");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    passwordHash,
    _id: "65fdb18ede63adb903f49570",
  });

  await user.save();
});

describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
      id: "65fd8ebd82548577e60f7fc5",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));

    const response = await api.get("/api/users");
    const contents = response.body.map((e) => e);
    console.log(contents);
    assert.strictEqual(response.body.length, 2);
  });

  test("Get Users", async () => {
    const response = await api.get("/api/users");
    const contents = response.body.map((e) => e);
    console.log(contents);
    assert.strictEqual(response.body.length, 1);
  });

  test("Bad Username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mw",
      name: "Banana Joe",
      password: "salainen",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("Bad Password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mwwewe",
      name: "Banana Joe",
      password: "e",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
