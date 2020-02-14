import { Router } from "express";
import { Statistic } from "../models/Statistic";
import { convert_statistics } from "../interop";

export const statistics = Router();

statistics.get("", async (req, res, next) => {
  try {
    res.json(await Statistic.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});

statistics.get("/:id", async (req, res, next) => {
  try {
    const statistic = await Statistic.scope(req.query["scope"]).findByPk(
      req.params["id"]
    );
    console.log(statistic);
    const duration = statistic ? await convert_statistics(statistic) : null;
    const JSON_string = duration ? JSON.stringify(duration) : "";
    const value = duration ? duration["duration"] : "";
    console.log("JSON_string: " + JSON_string);
    console.log("duration: " + value);
    res.json(statistic);
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});
