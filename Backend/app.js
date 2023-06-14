var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dbPostImoveis',
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
      .then(() => {console.log('Conectado ao banco de dados') },
      err => { console.log('Não foi possível conectar a base de dados'+ err)});


const enderecoRoute = require('./routes/endereco.route');
const corretorRoute = require('./routes/corretor.route');
const imovelRoute = require('./routes/imovel.route');
const anuncioRoute = require('./routes/anuncio.route');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://192.168.1.9:19006'}));


app.use('/enderecos', enderecoRoute);
app.use('/corretores', corretorRoute);
app.use('/imoveis', imovelRoute);
app.use('/anuncios', anuncioRoute);

app.listen(port,function(){
    console.log(`Servidor rodando em http://localhost:${port}`);
});