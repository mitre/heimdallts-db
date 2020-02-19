import { Router } from "express";
import { Profile } from "../models/Profile";
import { convert_exec_profile } from "../output";

export const profiles = Router();

profiles.get("", async (req, res, next) => {
  try {
    res.json(await Profile.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});

/*
profiles.get("/:id", async (req, res, next) => {
  try {
    const profile = await Profile.scope(req.query["scope"]).findByPk(
      req.params["id"]
    );
    res.json(profile);
  } catch (e) {
    console.error("error " + e);
    next(e);
  }
});
*/
