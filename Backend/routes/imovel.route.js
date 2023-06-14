const express = require('express');
const imovelRoute = express.Router();
const { getAll, getById, create, update, remove } = require('../controller/imovelController');

imovelRoute.get('/', getAll);
imovelRoute.get('/:id', getById);
imovelRoute.post('/', create);
imovelRoute.put('/', update);
imovelRoute.delete('/', remove);

module.exports = imovelRoute;