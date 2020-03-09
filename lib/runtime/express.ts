import express from "express";
import * as bodyParser from "body-parser";
import { evaluations } from "../routes/evaluations";
import { profiles } from "../routes/profiles";
import { statistics } from "../routes/statistics";
import { controls } from "../routes/controls";

export const app = express();

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for json body parsing
app.use(bodyParser.json({ limit: "5mb" }));

// enable corse for all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

  next();
});

app.use("/evaluations", evaluations);
app.use("/profiles", profiles);
app.use("/statistics", statistics);
app.use("/controls", controls);
