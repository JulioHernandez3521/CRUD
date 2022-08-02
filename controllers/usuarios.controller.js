const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const Rol = require("../models/Rol");




const index = async (req, resp = response)=>{
    try {
        let usuarios = (await Usuario.findAll({include: { model: Rol}})).map(usu => usu.toJSON());
    
        resp.render("administracion/usuarios/index",{usuarios});
    } catch (error) {
        resp.render("administracion/usuarios/index",{error: "Ocurrio un error inesperado hable con el administrador. :("});
        
    }
};

const vistaNuevo = async (req, resp = response)=>{
    try {
        const usuario = {};
        const roles = (await Rol.findAll({where:{estado:"Activo"}})).map((rol) =>rol.toJSON());
        resp.render("administracion/usuarios/nuevoUsuario",{roles,usuario});
    } catch (error) {
        
        resp.render("administracion/usuarios/nuevoUsuario",{error: "Ocurrio un error inesperado hable con el administrador. :("});
    }
  
};


const store = async(req, resp = response)=>{
   
    const {
        nombre,
        rol_fk,
        apellido,
        telefono,
        password,
        correo,
        direccion} = req.body;

        
    try{
        
        const usuario = new Usuario({nombre,
                                     rol_fk,
                                     apellido,
                                     telefono,
                                     password,
                                     correo,
                                     direccion});
        //Encriptacion
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        
        let usua = await usuario.save();
        resp.redirect('/administracion');
    }catch(e){
        console.error(e);
        const roles = (await Rol.findAll({where:{estado:"Activo"}})).map((rol) =>rol.toJSON());
        resp.render("administracion/usuarios/nuevoUsuario",{errors:e.errors, roles});
    }
}



const editar = async(req, resp = response)=>{
    const id = req.params.id;
    try {
        const roles = (await Rol.findAll({where:{estado:"Activo"}})).map((rol) =>rol.toJSON());
        let usuario = await Usuario.findByPk(id);
        usuario  = usuario.dataValues;
        resp.render("administracion/usuarios/editar",{usuario,roles});
    } catch (error) {
        
    }
};


const actualizar = async(req, resp = response)=>{
    
    const {password,id, ...rest} = req.body;
    try{
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return resp.redirect('/administracion');
        }
        if(password){
            //Encriptacion
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }
        //Actualizar los datos
        await usuario.set(rest);
   
        const usu= await usuario.save();

        resp.redirect('/administracion');
    }catch(e){
        console.error(e);
        const roles = (await Rol.findAll({where:{estado:"Activo"}})).map((rol) =>rol.toJSON());
        let usuario = await Usuario.findByPk(id);
        usuario  = usuario.dataValues;
        resp.render("administracion/usuarios/editar",{usuario,roles});
        resp.render("administracion/usuarios/nuevoUsuario",{error:e.errors, usuario, roles});
    }
}



const eliminar = async(req, resp = response)=>{
    const id = req.params.id;
    try {
        let usuario = await Usuario.findByPk(id);
        await usuario.destroy();

        resp.status(200).json({usuario});
    } catch (error) {
        
    }
 
};

module.exports = {
    index,
    vistaNuevo,
    store,
    editar,
    eliminar,
    actualizar
}
