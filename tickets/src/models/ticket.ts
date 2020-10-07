import mongoose from "mongoose";

// Required attributes to create a ticket.
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// Fields contained in a Ticket doc.
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// Requiered for the static build method in the model.
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.it = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
