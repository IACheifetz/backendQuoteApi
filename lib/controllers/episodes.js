const { Router } = require('express');
const { Episode } = require('../models/Episode');
const { Quote } = require('../models/Quote');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const episode = await Quote.insert(req.body);
      res.json(episode);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const episode = await Episode.getById(req.params.id);
      res.json(episode);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const episodes = await Episode.getAll();
    const respData = episodes.map(({ id, title, season, quotes }) => ({ id, title, season, quotes }));
    res.json(respData);
  });

