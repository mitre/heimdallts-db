import { Router } from "express";
import { Evaluation } from "../models/Evaluation";

export const evaluations = Router();

evaluations.get("", async (req, res, next) => {
  try {
    res.json(await Evaluation.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});

evaluations.get("/:id", async (req, res, next) => {
  try {
    const evaluation = await Evaluation.scope(req.query["scope"]).findByPk(
      req.params["id"]
    );
    console.log(evaluation);
    res.json(evaluation);
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});
