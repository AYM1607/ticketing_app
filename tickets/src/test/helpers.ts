import jwt from "jsonwebtoken";

/**
 * Returns a cookie array containing a valid jwt of a user in a supertest cookie format.
 */
export const getMockCookie = () => {
  const token = jwt.sign(
    { id: "123456", email: "mariano@gmail.com" },
    process.env.JWT_KEY!
  );
  const sessionJSON = JSON.stringify({ jwt: token });
  const base64JSON = Buffer.from(sessionJSON).toString("base64");

  return `express:sess=${base64JSON}`;
};
