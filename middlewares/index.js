const validarCampos = require('./validarCampos');
const validarJWT = require('./validar-jwt');

module.exports ={
    ...validarCampos,
    ...validarJWT
}