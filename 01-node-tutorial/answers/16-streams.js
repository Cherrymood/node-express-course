import fs from "fs";
import path from "path";
import EventEmitter from "events";

const __dirname = path.dirname(new URL(import.meta.url).pathname); //get the directory name of the current module (the file where the code is written
const filePath = path.join(__dirname, "content", "big.txt");
console.log(filePath);

const highWaterMark = 200;
const encoding = "utf8";
let chunkCounter = 0;
const emitter = new EventEmitter();

const stream = fs.createReadStream(filePath, {
  highWaterMark: highWaterMark,
  encoding: encoding,
});

stream.on("data", (chunk) => {
  chunkCounter++;
  console.log(`Chunk:`, chunk);
});

stream.on("end", () => {
  console.log(`Chunks recieved`, chunkCounter);
});

stream.on("error", (error) => {
  console.log(error);
});
