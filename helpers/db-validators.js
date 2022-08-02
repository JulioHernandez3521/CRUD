// const { Categoria, Usuario, Producto } = require('../models');
// const Role = require('../models/role');
const Usuario = require('../models/Usuario');

// const esRolValido =  async (rol = '' ) =>{

//     const existeRol = await Role.findOne({rol});
//     if(!existeRol){
//       throw new Error(`el rol ${rol} no esta registrado en la BD`)
//     }
// }

const emailExiste = async (correo = '')=>{
    const Email = await Usuario.findAll({where: {correo: correo}});
    console.error("dasdasdasdasasdas",{Email})
    if (Email.length > 0)  throw new Error(`el email ${correo} ya esta registrado`)
}



module.exports = {
    emailExiste,
}