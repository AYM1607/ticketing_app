import request from "supertest";
import { app } from "../../app";
import { getMockCookie } from "../../test/helpers";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title: "Some title", price: 20 });
};

it("Can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
