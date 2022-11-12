import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1505782",
  key: "c712813f8631d768fee9",
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

export const clientPusher = new ClientPusher("c712813f8631d768fee9", {
  cluster: "eu",
  forceTLS: true,
});
