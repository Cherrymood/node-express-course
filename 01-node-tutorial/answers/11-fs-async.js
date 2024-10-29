import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, "temporary", "fileB.txt");
console.log(filePath);

console.log("at start");

fs.writeFile(filePath, "Hello, world!\n", (err) => {
  if (err) {
    throw err;
  } else {
    fs.appendFile(filePath, "My name is Valeriia!\n", (err) => {
      if (err) throw err;

      fs.appendFile(filePath, "I am a student at CTD bootcamp\n", (err) => {
        if (err) throw err;

        console.log("File has been written!");

        const fileContents = fs.readFileSync(filePath, "utf8");
        console.log(`${fileContents}`);
      });
    });
  }
});

console.log("at end");
