import * as dotenv from "dotenv";
import express from "express";
import createRouter from "./router";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", createRouter());

module.exports = app;
