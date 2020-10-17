import { Subjects, Publisher, TicketUpdatedEvent } from "@aymticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
