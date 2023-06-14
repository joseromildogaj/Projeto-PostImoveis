const mongoose = require('mongoose');
const Imovel = require('./Imovel');
const Corretor = require('./Corretor');
const Endereco = require('./Endereco');

const Schema = mongoose.Schema;

let Anuncio = new Schema({
  titulo: {
    type: String,
    require: true
  },
  categoria: {
    type: String,
    require: true,
    default: "Venda"
  },
  imovel: {
    type: mongoose.ObjectId,
    ref: Imovel,
    require: true,
    endereco:{type: mongoose.ObjectId, ref: "Endereco"}
  },

  corretor: {
    type: mongoose.ObjectId,
    ref: Corretor,
    require: true
  }
},{
    collection: 'anuncio'
});

module.exports = mongoose.model('Anuncio', Anuncio);