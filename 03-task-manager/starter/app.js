import express from "express";
import tasks from "./routes/tasks.js";
import { clientMongo } from "./db/connectMongo.js";

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.static("./public"));

await clientMongo.connect();
//routes
app.use("/api/v1/tasks", tasks);

await clientMongo.close();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
