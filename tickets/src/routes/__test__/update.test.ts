import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { getMockCookie } from "../../test/helpers";

it("Returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", getMockCookie())
    .send({ title: "A valid title", price: 20 })
    .expect(404);
});

it("Returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "A valid title", price: 20 })
    .expect(401);
});

it("Returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title: "A valid title", price: 20 })
    .expect(201);

  // By calling getMockCookie a second time we're guaaranteeing we'll have a different userId.
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", getMockCookie())
    .send({ title: "Updated title", price: 100 })
    .expect(401);
});

it("Returns a 400 if the an invalid title or price is provided", async () => {
  const cookie = getMockCookie();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "A valid title", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "A valid title again", price: -10 })
    .expect(400);
});

it("Updates the ticket provided valid inputs", async () => {
  const cookie = getMockCookie();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "A valid title", price: 20 })
    .expect(201);

  const newTitle = "An updated title";
  const newPrice = 100;
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: newTitle, price: newPrice })
    .expect(200);

  const newTicketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(newTicketResponse.body.title).toEqual(newTitle);
  expect(newTicketResponse.body.price).toEqual(newPrice);
});
