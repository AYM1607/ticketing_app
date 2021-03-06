import request from "supertest";
import { app } from "../app";

export const signup = async () => {
  const email = "mariano@gmail.com";
  const password = "123456";
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  return signupResponse.get("Set-Cookie");
};
