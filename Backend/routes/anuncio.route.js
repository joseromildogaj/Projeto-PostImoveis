const express = require('express');
const anuncioRoute = express.Router();
const { getAll, getById, create, update, remove } = require('../controller/imovelController');

anuncioRoute.get('/', getAll);
anuncioRoute.get('/:id', getById);
anuncioRoute.post('/', create);
anuncioRoute.put('/', update);
anuncioRoute.delete('/', remove);

module.exports = anuncioRoute;