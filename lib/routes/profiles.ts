import { Router } from "express";
import { Profile } from "../models/Profile";
import { convert_exec_profile } from "../output";

export const profiles = Router();

profiles.get("", async (req, res, next) => {
  try {
    res.json(await Profile.scope(req.query["scope"]).findAll());
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});

/*
profiles.get("/:id", async (req, res, next) => {
  try {
    const profile = await Profile.scope(req.query["scope"]).findByPk(
      req.params["id"]
    );
    console.log(profile);
    const profile_obj = profile ? await convert_exec_profile(profile) : null;
    const JSON_string = profile_obj ? JSON.stringify(profile_obj) : "";
    console.log("JSON_string: " + JSON_string);
    res.json(profile);
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});
*/
