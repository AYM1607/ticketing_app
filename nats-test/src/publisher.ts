import nats from "node-nats-streaming";

import { TicketCreatedPublisher } from "./events/ticket_created_publisher";

console.clear();

const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);

  await publisher.publish({
    id: "12345",
    title: "some valuable title",
    price: 100,
  });
});
