import {Router} from 'express';
import {Statistic} from '../models/Statistic';

export const statistics = Router();

statistics.get('', async (req, res, next) => {
  try {
    res.json(await Statistic.scope(req.query['scope']).findAll());
  } catch (e) {
    console.log('error ' + e);
    next(e);
  }
});

statistics.get('/:id', async (req, res, next) => {
  try {
    const statistic = await Statistic.scope(req.query['scope']).findByPk(req.params['id']);
    console.log(statistic);
    res.json(statistic);
  } catch (e) {
    console.log('error ' + e);
    next(e);
  }
});
