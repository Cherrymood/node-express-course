import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, "temporary", "fileA.txt");
console.log(filePath);

fs.writeFileSync(filePath, "Hello, world!\n");
fs.appendFileSync(filePath, "My name is Valeriia!\n");
fs.appendFileSync(filePath, "I am a student at CTD bootcamp\n");

const fileContents = fs.readFileSync(filePath, "utf8");

console.log(fileContents);
