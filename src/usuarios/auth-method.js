const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros');

const secret = process.env.SECRECT || "FhrztE2wtSAebpw8waXlSNamCguv0jr5cugLyr6X";

const verificaUsuario = (usuario) =>{
  if(!usuario){
    throw new InvalidArgumentError('usuario ou senha invalidos');
  }
}
async function verificaSenha(senha, senhaHash){
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if(!senhaValida){
    throw new InvalidArgumentError('usuario ou senha invalidos');
  }
}

passport.use(
  new LocalStrategy({
    usernameField: "email",
    passwordField: "senha",
    session: false
  }, async (email, senha, done) => {
    try {
      const usuario = await Usuario.buscaPorEmail(email);
      verificaUsuario(usuario);
      await verificaSenha(senha, usuario.senhaHash);
      done(null, usuario);

    } catch (erro) {
      done(erro);
    }
  })
);
 
passport.use(
  new BearerStrategy(
    async(token, done) => {      
      try {
        const payload = jwt.verify(token, secret);
        const usuario = await Usuario.buscaPorId(payload.id);
        done(null, usuario);
      } catch (erro) {
        done(erro);
      }
    } 
  )
);