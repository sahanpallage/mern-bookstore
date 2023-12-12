import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS requests
//Option 1: Allow all origins with default of cors(*)
app.use(cors());

//option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:8080",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Sahan's world!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    // Handle the resolved value
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log("App is listening on port " + PORT);
    });
  })
  .catch((error) => {
    // Handle the rejected value or error
    console.log(error);
  });
