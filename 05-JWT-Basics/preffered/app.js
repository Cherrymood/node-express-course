import express from "express";
import env from "dotenv";
import router from "./routes/main.js";

env.config();
const app = express();
const port = 3000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", router);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
