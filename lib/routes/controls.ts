import {Router} from 'express';
import {Control} from '../models/Control';

export const controls = Router();

controls.get('', async (req, res, next) => {
  try {
    res.json(await Control.scope(req.query['scope']).findAll());
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});

controls.get('/:id', async (req, res, next) => {
  try {
    const control = await Control.scope(req.query['scope']).findByPk(req.params['id']);
    console.log(control);
    res.json(control);
  } catch (e) {
    console.log("error " + e);
    next(e);
  }
});
