const Endereco = require("../model/Endereco");

function getAll (req, res) {
  Endereco.find((err, enderecos) => {
    if (err) {
      res.status(400).send({ 'mssg': "Algo deu errado" });
    }
    res.status(200).json(enderecos);
  });
};

function getById (req, res) {
    let id = req.params.id;
    Endereco.findById(id, (err, endereco)=>{
    if(err){
        return res.status(400).send({ 'mssg': 'Algo deu errado'});
    }
    
    return res.status(200).json({ 'endereco': endereco});
    });
};

function create (req, res) {
  let endereco = new Endereco(req.body);
  endereco.save()
    .then((endereco) => {
      res.status(200).json(endereco);
    })
    .catch((err) => {
      res.status(409).send({ status: "failure", mssg: "unable to save to database" });
    });
};

function update (req, res) {
    Endereco.findById(req.body.id, function(err, endereco) {
        if (err){
          res.status(400).send({'status': 'Erro','mssg': 'Erro ao salvar no banco de dados'});
        } else {
            endereco.nome = req.body.nome;
            endereco.email = req.body.email;
            endereco.creci = req.body.creci;
            endereco.fone = req.body.fone;
            endereco.senha = req.body.senha;
    
            endereco.save().then(endereco => {
              res.status(200).json(endereco);
          })
        }
      });
};

function remove (req, res) {
  Endereco.findByIdAndRemove({_id: req.body.id}, (err, endereco)=>{
    if (err) {
        return res.status(400).send({ 'status': 'Erro', 'mssg': 'Algo deu errado' });
      }
      res.status(200).json(endereco);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};