import express from "express";
import { router } from "./routes/tasks.js";
import connectDB from "./db/connectMongo.js";
import env from "dotenv";
import notFound from "./middleware/not-found.js";

const app = express();
const port = 3000;
env.config();

// middleware
app.use(express.json());
app.use(express.static("./public"));
app.use(notFound);

async function startServer() {
  try {
    // Connect to the database
    await connectDB(process.env.URL_MD);

    app.use("/api/v1/tasks", router);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Start the server
startServer();
