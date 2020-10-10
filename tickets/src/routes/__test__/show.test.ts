import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { getMockCookie } from "../../test/helpers";

it("Returns a 404 if the ticket is not found", async () => {
  // We provide a fake id which can we whatever since collections are empty
  // for every test.
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("Returns a ticket if it is found", async () => {
  const title = "A valid title for a ticket";
  const price = 100;

  const createResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title, price })
    .expect(201);

  const ticketId = createResponse.body.id;

  const getResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send()
    .expect(200);

  expect(getResponse.body.title).toEqual(title);
  expect(getResponse.body.price).toEqual(price);
});
