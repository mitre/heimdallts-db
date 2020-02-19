import { Router } from "express";
import { Statistic } from "../models/Statistic";
import { convert_statistics } from "../output";

export const statistics = Router();

statistics.get("", async (req, res, next) => {
  try {
    res.json(await Statistic.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});

statistics.get("/:id", async (req, res, next) => {
  try {
    const statistic = await Statistic.scope(req.query["scope"]).findByPk(
      req.params["id"]
    );
    console.error(statistic);
    res.json(statistic);
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});
