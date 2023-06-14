const Corretor = require("../model/Corretor");

function getAll (req, res) {
  Corretor.find((err, corretores) => {
    if (err) {
      res.status(400).send({ 'mssg': "Algo deu errado" });
    }
    res.status(200).json(corretores);
  });
};

function getById (req, res) {
    let id = req.params.id;
    Corretor.findById(id, (err, corretor)=>{
    if(err){
        return res.status(400).send({ 'mssg': 'Algo deu errado'});
    }
    return res.status(200).json({ 'corretor': corretor});
    });
};

function create (req, res) {
  let corretor = new Corretor(req.body);
  corretor.save()
    .then((corretor) => {
      res.status(200).json(corretor);
    })
    .catch((err) => {
      res.status(409).send({ status: "failure", mssg: "Não foi possível salvar os dados no banco" });
    });
};

function update (req, res) {
    Corretor.findById(req.body.id, function(err, corretor) {
        if (err){
          res.status(400).send({'status': 'Erro','mssg': 'Erro ao salvar no banco de dados'});
        } else {
            corretor.nome = req.body.nome;
            corretor.email = req.body.email;
            corretor.creci = req.body.creci;
            corretor.fone = req.body.fone;
            corretor.senha = req.body.senha;
            corretor.picture = req.body.picture;
    
            corretor.save().then(corretor => {
              res.status(200).json(corretor);
          })
        }
      });
};

function remove (req, res) {
  Corretor.findByIdAndRemove({_id: req.body.id}, (err, corretor)=>{
    if (err) {
        return res.status(400).send({ 'status': 'Erro', 'mssg': 'Algo deu errado' });
      }
      res.status(200).json(corretor);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};