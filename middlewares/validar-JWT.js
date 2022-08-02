

const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');



const validarJWT = async (req = request, res = response, next)=>{
    const token = req.header('x-token')

    if(!token){
         throw new Error ("No existe el token");
    }

    try {
        
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById( uid);
        //validar que el usuario exista
        if(!usuario){
            throw new Error("El usuario no existe")
        }
        //verificar si el usuario esta activo 
        if(!usuario.estado){
            throw new Error("El usuarios no esta activo")
        }
        
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        });
        
    }



}

module.exports = {
    validarJWT
}