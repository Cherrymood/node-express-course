import EventEmitter from "events";

const emitter = new EventEmitter();

const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event!", msg);
};

doWait();
emitter.emit("happens", "Hello World!");
