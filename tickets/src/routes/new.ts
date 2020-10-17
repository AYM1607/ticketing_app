import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@aymticketing/common";

import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket_created_publisher";
import { natsWrapper } from "../nats_wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const newTicket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await newTicket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: newTicket.id,
      title: newTicket.title,
      price: newTicket.price,
      userId: newTicket.userId,
    });

    res.status(201).send(newTicket);
  }
);

export { router as createTicketRouter };
