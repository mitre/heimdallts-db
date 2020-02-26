import { Router } from "express";
import { Evaluation } from "../models/Evaluation";
import { convert_evaluation } from "../output";
import { intake_evaluation } from "../intake";
import { parse } from "inspecjs";
import * as fs from "fs";
import { ExecJSON } from "inspecjs/dist/versions/v_1_0";
import { Control } from "../models/Control";
import { ApiKey } from "../models/ApiKey";
import { User } from "../models/User";
import { output } from "..";

export const evaluations = Router();

evaluations.get("", async (req, res, next) => {
  try {
    res.json(await Evaluation.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});

evaluations.get("test", async (req, res) => {
  const js_content = fs.readFileSync(
    "/Users/jchenry/Desktop/jsons/rhel-ece-results-simp.json",
    "utf-8"
  );
  const parsed = parse.convertFile(js_content)[
    "1_0_ExecJson"
  ] as ExecJSON.Execution;
  const intaken = await intake_evaluation(parsed);

  const new_intaken = await Evaluation.findByPk(intaken.id);
  const converted = await output.convert_evaluation(new_intaken as Evaluation);
  res.json(converted);
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
    const eval_obj = await convert_evaluation(evaluation);

    res.json(eval_obj);
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});
