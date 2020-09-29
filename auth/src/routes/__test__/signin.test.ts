import request from "supertest";
import { app } from "../../app";

const createValidAccount = () =>
  request(app)
    .post("/api/users/signup")
    .send({ email: "mariano@gmail.com", password: "123456" })
    .expect(201);

it("Fails when non exisitng email is provided", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "mariano@gmail.com", password: "123456" })
    .expect(400);
});

it("Fails when incorrect password is provided", async () => {
  await createValidAccount();

  return request(app)
    .post("/api/users/signin")
    .send({ email: "mariano@gmail.com", password: "lkajsdfkljasldkf" })
    .expect(400);
});

it("Sets cookie when provided with valid credentials", async () => {
  await createValidAccount();

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "mariano@gmail.com", password: "123456" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
