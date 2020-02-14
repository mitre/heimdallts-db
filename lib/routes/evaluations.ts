import { Router } from "express";
import { Evaluation } from "../models/Evaluation";
import { convert_execution } from "../interop";

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
    const version = evaluation ? evaluation.getDataValue("version") : "0";
    console.log("Data version: " + version);
    const platform = evaluation ? evaluation.getDataValue("platform") : {};
    console.log("Data platform: " + JSON.stringify(platform));
    const eval_obj = evaluation ? convert_execution(evaluation) : null;
    const plat = eval_obj ? eval_obj["platform"] : "nada";
    console.log("eval_obj: " + plat);
    const JSON_string = eval_obj ? JSON.stringify(eval_obj) : "";
    //let value = duration ? duration['duration'] : "";
    console.log("JSON_string: " + JSON_string);
    //console.log("duration: " + value);

    res.json(evaluation);
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});
