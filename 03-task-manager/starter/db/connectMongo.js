import mongoose from "mongoose";
// import Task from "../models/Task.js";

export default async function connectDB(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

// const tasks = [
//   { name: "Finish project", completed: true },
//   { name: "Buy groceries", completed: false },
//   { name: "Clean the house", completed: true },
//   { name: "Study for exams", completed: false },
//   { name: "Prepare dinner", completed: false },
// ];

// // Insert tasks into MongoDB
// Task.insertMany(tasks)
//   .then((result) => {
//     console.log("Tasks inserted:", result);
//     mongoose.connection.close(); // Close connection after operation
//   })
//   .catch((err) => {
//     console.log("Error inserting tasks:", err);
//   });
