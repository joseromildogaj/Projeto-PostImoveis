const Anuncio = require("../model/Anuncio");

function getAll (req, res) {
  Anuncio.find((err, anuncios) => {
    if (err) {
      res.status(400).send({ 'mssg': "Algo deu errado" });
    }
    res.status(200).json(anuncios);
  });
};

function getById (req, res) {
    let id = req.params.id;
    Anuncio.findById(id, (err, anuncio)=>{
    if(err){
        return res.status(400).send({ 'mssg': 'Algo deu errado'});
    }
    
    return res.status(200).json({ 'anuncio': anuncio});
    });
};

function create (req, res) {
  let anuncio = new Anuncio(req.body);
  anuncio.save()
    .then((anuncio) => {
      res.status(200).json(anuncio);
    })
    .catch((err) => {
      res.status(409).send({ status: "failure", mssg: "unable to save to database" });
    });
};

function update (req, res) {
    Anuncio.findById(req.body.id, function(err, anuncio) {
        if (err){
          res.status(400).send({'status': 'Erro','mssg': 'Erro ao salvar no banco de dados'});
        } else {
            anuncio.nome = req.body.nome;
            anuncio.email = req.body.email;
            anuncio.creci = req.body.creci;
            anuncio.fone = req.body.fone;
            anuncio.senha = req.body.senha;
    
            anuncio.save().then(anuncio => {
              res.status(200).json(anuncio);
          })
        }
      });
};

function remove (req, res) {
  Anuncio.findByIdAndRemove({_id: req.body.id}, (err, anuncio)=>{
    if (err) {
        return res.status(400).send({ 'status': 'Erro', 'mssg': 'Algo deu errado' });
      }
      res.status(200).json(anuncio);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};