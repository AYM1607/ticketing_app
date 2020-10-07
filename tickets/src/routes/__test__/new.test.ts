import request from "supertest";
import { app } from "../../app";

import { signup } from "../../test/helpers";

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
    .set("Cookie", signup())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("Returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signup())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signup())
    .send({ price: 10 })
    .expect(400);
});

it("Returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signup())
    .send({ title: "klajsdfkljasdf", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signup())
    .send({ title: "12341234" })
    .expect(400);
});

it("Creates a ticket if provided with valid inputs", async () => {});
