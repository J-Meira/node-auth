const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
const jwt = require ('jsonwebtoken');

const secret = process.env.SECRECT || "FhrztE2wtSAebpw8waXlSNamCguv0jr5cugLyr6X";

function makeToken(usuario){
  const payload = {
    id: usuario.id
  };

  const token = jwt.sign(payload, secret);

  return token;
}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      //console.log(req.body);
      const usuario = new Usuario({
        nome,
        email
      });

      await usuario.adicionaSenha(senha);
      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  login: (req, res) =>{
    const token = makeToken(req.user);
    //res.status(200).body({token}).send();
    res.set('Authorization', token);
    res.status(200).send();
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
