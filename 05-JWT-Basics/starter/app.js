import express from "express";
import env from "dotenv";
import "express-async-errors";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import router from "./routes/main.js";

env.config;
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
