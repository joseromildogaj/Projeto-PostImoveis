
const express = require('express');
const enderecoRoute = express.Router();
const { getAll, getById, create, update, remove } = require('../controller/enderecoController');

enderecoRoute.get('/', getAll);
enderecoRoute.get('/:id', getById);
enderecoRoute.post('/', create);
enderecoRoute.put('/', update);
enderecoRoute.delete('/', remove);

module.exports = enderecoRoute;