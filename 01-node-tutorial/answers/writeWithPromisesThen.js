import { error } from "console";
import fs from "fs/promises";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname); //get the directory name of the current module (the file where the code is written
const filePath = path.join(__dirname, "temporary", "temp.txt");
console.log(filePath);

console.log("at start");

fs.writeFile(filePath, "Hello, World!\n")
  .then(() => {
    return fs.appendFile(filePath, "My name is");
  })
  .then(() => {
    return fs.appendFile(filePath, " Valeriia!");
  })
  .then(() => {
    const data = fs.readFile(filePath, "utf-8");
    return data;
  })
  .then((data) => {
    console.log(data);
  })
  .then(() => {
    console.log("Success");
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
