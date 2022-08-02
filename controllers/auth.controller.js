const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generaJWT } = require("../helpers/generar-jwt");
const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");



const login = async (req, res = response) =>{

    const {correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({where: {correo}});
        if(!usuario){
            return res.render('auth/login',{layout:false ,error: "Usuario / Contraseña incorrecta. Por favor verifica los datos e intenta nuevamente."});
        }
        
        //Si el usuario esta activo
        if(usuario.estado != "Activo"){
            return res.render('auth/login',{layout:false ,error: "Usuario inactivo por favor hable con el administrador. :("});
        }

        //Verificar la contrasena
        const contraVal = bcryptjs.compareSync(password, usuario.password); 
        if(!contraVal){
            return res.render('auth/login',{layout:false ,error: "Usuario / Contraseña incorrecta. Por favor verifica los datos e intenta nuevamente."});
        }
        //Busca el nombre del rol
        const rol = (await Rol.findByPk(usuario.rol_fk)).toJSON();
        const nombrerol= rol.nombre;
        usuario.rol_fk = nombrerol;
        rol.tiempo_sesion = (rol.tiempo_sesion * 60);
        const expira = rol.tiempo_sesion + 's';
        //Generar el JWT
        //TODO: Chcar si poner el rol en el token 
        const token  = await generaJWT(usuario.id, usuario.nombre, nombrerol, expira);
        // res.cookie("token", token, {maxAge: 360000});
        res.cookie("token", token);
        
        res.redirect("/publico") ; 


    } catch (error) {
        console.log(error);
        return res.render('auth/login',{layout:false ,error: "Ocurrio un error inesperado hable con el administrador. :("});
        
    }


}

module.exports = {
    login
}