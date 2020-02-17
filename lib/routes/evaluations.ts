import { Router } from "express";
import { Evaluation } from "../models/Evaluation";
import { convert_evaluation } from "../output";

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
    if (!evaluation) {
      res.json(null);
      return;
    }
    console.log(evaluation);
    const version = evaluation.version;
    console.log("Data version: " + version);
    const platform = await evaluation.$get("platform");
    console.log("Data platform: " + JSON.stringify(platform));
    const eval_obj = await convert_evaluation(evaluation);
    const nested_platform = eval_obj.platform;
    console.log("eval_obj: " + nested_platform);
    const JSON_string = JSON.stringify(eval_obj);
    //let value = duration ? duration['duration'] : "";
    console.log("JSON_string: " + JSON_string);
    //console.log("duration: " + value);

    res.json(eval_obj);
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});
