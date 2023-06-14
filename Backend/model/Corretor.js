const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Corretor = new Schema({
  nome: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  creci: {
    type: String,
    require: true
  },
  fone: {
    type: String
  },
  senha: {
    type: String,
    require: true,
    min: 6,
    max: 8
  },
  picture: {
    type: String,
  }
},{
    collection: 'corretor'
});

module.exports = mongoose.model('Corretor', Corretor);