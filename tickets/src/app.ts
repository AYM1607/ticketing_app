import express from "express";
//  Import this so express can handle errors thrown inside async functions.
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@aymticketing/common";

import { createTicketRouter } from "./routes/new";

const app = express();
// Traffic is proxied by ingress-nginx.
// Trus it regardless.
app.set("trust proxy", true);
app.use(json());

// Handle the cookie headers.
app.use(
  cookieSession({
    // No encryption.
    signed: false,
    // Use https when not under test.
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

// Any error thrown inside any handler will be processed by this middleware.
app.use(errorHandler);

export { app };
