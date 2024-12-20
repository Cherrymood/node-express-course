import express from "express";
import env from "dotenv";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();
const port = 3000;
env.config();

// middleware
app.use(express.json());
app.use(express.static("./public"));

//routes
app.get("/", (req, res) => {
  res.send(
    '<h1> Store API </h1><a href="/api/v1/products"> products route</a>'
  );
});

app.use(notFound);
app.use(errorHandlerMiddleware);

async function Start() {
  try {
    //connect DB
    app.listen(port, console.log(`Server is listening port ${3000}`));
  } catch (error) {
    console.log(error);
  }
}

Start();
