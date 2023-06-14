const Imovel = require("../model/Imovel");

function getAll (req, res) {
  Imovel.find((err, imoveis) => {
    if (err) {
      res.status(400).send({ 'mssg': "Algo deu errado" });
    }
    res.status(200).json(imoveis);
  });
};

function getById (req, res) {
    let id = req.params.id;
    Imovel.findById(id, (err, imovel)=>{
    if(err){
        return res.status(400).send({ 'mssg': 'Algo deu errado'});
    }
    
    return res.status(200).json({ 'imovel': imovel});
    });
};

function create (req, res) {
  let imovel = new Imovel(req.body);
  imovel.save()
    .then((imovel) => {
      res.status(200).json(imovel);
    })
    .catch((err) => {
      res.status(409).send({ status: "failure", mssg: "unable to save to database" });
    });
};

function update (req, res) {
    Imovel.findById(req.body.id, function(err, imovel) {
        if (err){
          res.status(400).send({'status': 'Erro','mssg': 'Erro ao salvar no banco de dados'});
        } else {
            imovel.nome = req.body.nome;
            imovel.email = req.body.email;
            imovel.creci = req.body.creci;
            imovel.fone = req.body.fone;
            imovel.senha = req.body.senha;
    
            imovel.save().then(imovel => {
              res.status(200).json(imovel);
          })
        }
      });
};

function remove (req, res) {
  Imovel.findByIdAndRemove({_id: req.body.id}, (err, imovel)=>{
    if (err) {
        return res.status(400).send({ 'status': 'Erro', 'mssg': 'Algo deu errado' });
      }
      res.status(200).json(imovel);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};