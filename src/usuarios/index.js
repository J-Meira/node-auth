module.exports = {
  rotas: require('./usuarios-rotas'),
  controlador: require('./usuarios-controlador'),
  modelo: require('./usuarios-modelo'),
  authMethod: require('./auth-method'),
  middlewaresAutenticacao: require('./middlewares-autenticacao')
  //middlewaresAutenticacao: require('./middlewares-autenticacao')
}