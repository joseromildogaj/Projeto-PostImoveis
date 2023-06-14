const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Endereco = new Schema({
  logradouro: {
    type: String,
    require: true,
    max: 30
  },
  bairro: {
    type: String,
    require: true,
    max: 30
  },
  cidade: {
    type: String,
    require: true,
    max: 30

  },
  estado: {
    type: String,
    require: true,
    min: 2,
    max: 2
  },
  cep: {
    type: String
    
  },
  numero: {
    type: Number
  }
  
},{
    collection: 'endereco'
});

module.exports = mongoose.model('Endereco', Endereco);