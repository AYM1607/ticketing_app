import request from "supertest";
import { app } from "../../app";

it("Clears the cookie once the user signs out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "mariano@gmail.com", password: "123456" })
    .expect(201);

  const response = await request(app).post("/api/users/signout").expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
