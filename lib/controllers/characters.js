const { Router } = require('express');
const Character = require('../models/Character');
const { Quote } = require('../models/Quote');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const character = await Quote.insert(req.body);
      res.json(character);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const character = await Character.getById(req.params.id);
      res.json(character);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const characters = await Character.getAll();
    const respData = characters.map(({ id, first_name, last_name, quotes }) => ({ id, name: first_name +  last_name, quotes }));
    res.json(respData);
  });

