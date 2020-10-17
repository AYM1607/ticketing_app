import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

import { getMockCookie } from "../../test/helpers";
import { natsWrapper } from "../../nats_wrapper";

it("Has a route handler listening at /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("Can only be accessed if the user is sigend in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("Does no return a status of 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("Returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ price: 10 })
    .expect(400);
});

it("Returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title: "klajsdfkljasdf", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title: "12341234" })
    .expect(400);
});

it("Creates a ticket if provided with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = "Some valid title";
  const price = 20;

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title, price })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});

it("Publishes an event when creating a ticket", async () => {
  const title = "Some valid title";
  const price = 20;

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getMockCookie())
    .send({ title, price })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
