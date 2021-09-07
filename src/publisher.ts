import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticketCreatedPublisher";

//We can call it client or stan
const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on("connect", async () => {
  console.log("Publisher connected to nats");

  //must be a string
  // const data = JSON.stringify({
  //   id: "8r7t8",
  //   title: "ticket Title",
  //   price: 45,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Published to NATS");
  // });

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: "8r7t8jj",
      title: "ticket Title",
      price: 45,
    });
  } catch (error) {
    console.log(error);
  }
});
