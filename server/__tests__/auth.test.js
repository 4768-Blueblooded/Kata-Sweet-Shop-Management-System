require("dotenv").config({ path: ".env.test" });

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Auth API", () => {
  const user = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123!",
  };

  test("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.token).toBeDefined();
  });

  test("should login existing user", async () => {
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should fail login with wrong password", async () => {
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
  });
});
