const { response } = require("express");
const { validationResult } = require("express-validator");
const Rol = require("../models/Rol");

const validarCampos =async ( req, res=response, next) => {
  const errores = validationResult(req);
  console.log(errores)
  if (!errores.isEmpty()) {
    // return res.status(400).json(errors);
    const {errors} = errores;
    const roles = (await Rol.findAll({where:{estado:"Activo"}})).map((rol) =>rol.toJSON());
    return {errors,roles};
  }
};


module.exports = {
    validarCampos
}