import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

//We can call it client or stan
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to nats");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("listener");

  const subscribtion = stan.subscribe(
    "ticket:created",
    "queueGroupOne",
    options
  );

  subscribtion.on("message", (msg: Message) => {
    console.log("Message received: " + msg);
    console.log(msg.getSequence());

    //getData returns string or buffer
    console.log(msg.getData());
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
