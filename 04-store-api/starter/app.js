import express from "express";
import env from "dotenv";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";

const app = express();
const port = 3000;
env.config();

// middleware
app.use(express.json());
app.use(express.static("./public"));

//routes
app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

async function Start() {
  try {
    await connectDB(process.env.URL_MD);
    app.listen(port, console.log(`Server is listening port ${3000}`));
  } catch (error) {
    console.log(error);
  }
}

Start();
