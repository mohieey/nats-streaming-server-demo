import nats from "node-nats-streaming";

//We can call it client or stan
const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on("connect", () => {
  console.log("Publisher connected to nats");

  //must be a string
  const data = JSON.stringify({
    id: "8r7t8",
    title: "ticket Title",
    price: 45,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Published to NATS");
  });
});
