import { Publisher, Subjects, TicketCreatedEvent } from "@aymticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
