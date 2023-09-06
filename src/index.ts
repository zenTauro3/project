import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import options from "./config/cors";
import auth from "./routes/auth";

const app = express();

//middlewares
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors(options));

//routes
app.use("/auth", auth);

//connect db and start up server
mongoose.connect(process.env.DB || "");
const connection = mongoose.connection;
const PORT = process.env.SERVER_PORT || 3001;
const URL = process.env.SERVER_DOMAIN + ":" + PORT;
const message = "\x1b[35m" + URL + "\x1b[0m";

connection.once("open", () => {
    console.log("Connected successfully to database");
    app.listen(PORT, () => console.log("Server running at", message));
});

connection.on("error", () => {
    console.error.bind("Error connecting to database");
});