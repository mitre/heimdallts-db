import { Router } from "express";
import { Evaluation } from "../models/Evaluation";
import { convert_evaluation } from "../output";
import { intake_evaluation } from "../intake";
import { parse } from "inspecjs";
import * as fs from "fs";
import { ExecJSON } from "inspecjs/dist/versions/v_1_0";
import { Control } from "../models/Control";
import { Result } from "../models/Result";

export const evaluations = Router();

evaluations.get("", async (req, res, next) => {
  /** 
  const js_content = fs.readFileSync(
    "/Users/jchenry/Desktop/jsons/rhel7_cms_simp.json",
    "utf-8"
  );
  const parsed = parse.convertFile(js_content)[
    "1_0_ExecJson"
  ] as ExecJSON.Execution;
  const intaken = await intake_evaluation(parsed);
    res.json(
      await intaken.$get("profiles", {
        include: [
          {
            model: Control,
            include: [Result]
          }
        ]
      })
    );
  */
  try {
    res.json(await Evaluation.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.error("error " + e);
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
    const eval_obj = await convert_evaluation(evaluation);

    res.json(eval_obj);
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});
