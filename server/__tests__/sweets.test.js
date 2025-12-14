require("dotenv").config({ path: ".env.test" });

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "Admin123!",
    role: "admin",
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "Admin123!",
  });

  adminToken = login.body.token;
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Sweets API", () => {
  test("admin should add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Rasgulla",
        category: "Milk",
        price: 20,
        quantity: 10,
      });

    expect(res.statusCode).toBe(201);
  });

  test("should list sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
  });
});
