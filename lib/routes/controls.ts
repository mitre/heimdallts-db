import { Router } from "express";
import { Control } from "../models/Control";
import { convert_exec_control } from "../output";

export const controls = Router();

controls.get("", async (req, res, next) => {
  try {
    res.json(await Control.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});

/** 
controls.get("/:id", async (req, res, next) => {
  try {
    const control = await Control.scope(req.query["scope"]).findByPk(
      req.params["id"]
    );
    console.log(control);
    if (!control) {
      res.json(null);
    } else {
      const control_obj = await convert_exec_control(control);
      const JSON_string = JSON.stringify(control_obj);
      console.log("JSON_string: " + JSON_string);
      res.json(control_obj);
    }
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});
*/
