import path from "path";

console.log(path.delimiter);

const filePath = path.join("/downloads/", "new", "test.txt");
console.log(filePath);

const base = path.basename(filePath);
const __dirname = path.dirname(filePath);

console.log(base);
console.log(__dirname);

console.log(path.isAbsolute(filePath));
console.log(path.extname(filePath));
