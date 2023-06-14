const mongoose = require('mongoose');
const Endereco = require('./Endereco');
const Schema = mongoose.Schema;

let Imovel = new Schema({
  descricao: {
    type: String
  },
  tipo: {
    type: String
  },
  qtdQuarto: {
    type: Number
  },
  qtdBanheiro: {
    type: Number
  },
  qtdGaragem: {
    type: Number
  },
  area: {
    type: Number
  },
  condominio: {
    type: Number
  },
  valor: {
    type: Number
  },
  endereco: {
    type: mongoose.ObjectId,
    ref: Endereco,
    require: true
  }
  
},{
    collection: 'imovel'
});

module.exports = mongoose.model('Imovel', Imovel);