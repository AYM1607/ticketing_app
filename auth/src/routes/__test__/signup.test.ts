import request from "supertest";
import { app } from "../../app";

it("Returns 201 on successulf signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mariano@gmail.com",
      password: "123456",
    })
    .expect(201);
});

it("Returns 400 when receiving an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mariano.com",
      password: "123456",
    })
    .expect(400);
});

it("Returns 400 when receiving an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mariano@gmail.com",
      password: "12",
    })
    .expect(400);
});

it("Returns 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "12",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "mariano@gmail.com",
    })
    .expect(400);

  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("Disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "mariano@gmail.com", password: "123456" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "mariano@gmail.com", password: "123456" })
    .expect(400);
});

it("Sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "mariano@gmail.com", password: "123456" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
