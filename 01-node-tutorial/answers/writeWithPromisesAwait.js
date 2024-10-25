import { error } from "console";
import fs from "fs/promises";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname); //get the directory name of the current module (the file where the code is written
const filePath = path.join(__dirname, "temporary", "temp.txt");
console.log(filePath);

async function writer() {
  try {
    console.log("at start");
    const data = fs.writeFile(filePath, "Hello, World!\n");

    await data;
    await fs.appendFile(filePath, "My name is");
    await fs.appendFile(filePath, " Valeriia!");
    console.log("Success");
  } catch (error) {
    console.log("Error", error);
  }
}

async function reader() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}

async function readWrite() {
  await writer();
  reader();
}

readWrite();
