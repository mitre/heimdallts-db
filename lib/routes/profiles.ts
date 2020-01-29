import {Router} from 'express';
import {Profile} from '../models/Profile';

export const profiles = Router();

profiles.get('', async (req, res, next) => {
  try {
    res.json(await Profile.scope(req.query['scope']).findAll());
  } catch (e) {
    console.log('error ' + e);
    next(e);
  }
});

profiles.get('/:id', async (req, res, next) => {
  try {
    const profile = await Profile.scope(req.query['scope']).findByPk(req.params['id']);
    console.log(profile);
    res.json(profiles);
  } catch (e) {
    console.log('error ' + e);
    next(e);
  }
});
