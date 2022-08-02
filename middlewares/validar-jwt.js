

const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');



const validarJWT = async (req = request, res = response, next)=>{

    const token = req.header('x-token')

    if(!token){
        return res.status(400).json({
            msg:'No hat token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById( uid);
        //validar que el usuario exista
        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido - el usuarion no existe en BD '
            });
        }
        //verificar si el usuario esta activo 
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido - Usuarion inactivo '
            });
        }
        
        req.usuario = usuario;

        // req.uid = uid;//Crear propiedad nueva para el Uid

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