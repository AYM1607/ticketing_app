import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Returns a cookie array containing a valid jwt of a user in a supertest cookie format.
 * Every time the function is called a new user id is generated.
 */
export const getMockCookie = () => {
  const token = jwt.sign(
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: "mariano@gmail.com",
    },
    process.env.JWT_KEY!
  );
  const sessionJSON = JSON.stringify({ jwt: token });
  const base64JSON = Buffer.from(sessionJSON).toString("base64");

  return `express:sess=${base64JSON}`;
};
