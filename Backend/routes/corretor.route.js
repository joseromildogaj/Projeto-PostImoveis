
const express = require('express');
const corretorRoute = express.Router();
const { getAll, getById, create, update, remove } = require('../controller/corretorController');

corretorRoute.get('/', getAll);
corretorRoute.get('/:id', getById);
corretorRoute.post('/', create);
corretorRoute.put('/', update);
corretorRoute.delete('/', remove);

module.exports = corretorRoute;