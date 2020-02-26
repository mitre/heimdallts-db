import { Router } from "express";
import { Control } from "../models/Control";

export const controls = Router();

controls.get("", async (req, res, next) => {
  try {
    res.json(await Control.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});

/** 
controls.get("/:id", async (req, res, next) => {
  try {
    const control = await Control.scope(req.query["scope"]).findByPk(
      req.params["id"]
    );
    if (!control) {
      res.json(null);
    } else {
      res.json(control_obj);
    }
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});
*/
