import env from "dotenv";

env.config();

const __dirname = process.env.MY_VAR;

console.log(__dirname);
