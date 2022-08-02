const { response } = require("express");
const jwt = require("jsonwebtoken");
const Opcion = require("../models/Opcion");
const Rol = require("../models/Rol");
const roles_opciones = require("../models/roles_opciones");
const Usuario = require("../models/Usuario");

const index = async (req, resp = response) => {
  let roles = (await Rol.findAll({where: {estado: "Activo"}})).map((usu) => usu.toJSON());
  resp.render("gerencia/index", { roles });
};

const nuevo = async (req, resp = response) => {
  // const cookie = req.cookies.token;
  // const { id } = jwt.verify(cookie, process.env.SECRETORPRIVATEKEY);
  
  try {
    const opciones = (
          await Opcion.findAll({
        where: {
            estado: "Activo",
          },
        })
    ).map((usu) => usu.dataValues);
    const rol = {};
  resp.render("gerencia/nuevo", { opciones, rol });
} catch (error) {
  console.log(error);
  }
};


const guardar = async (req, resp = response) => {
  // const cookie = req.cookies.token;
  // const { id } = jwt.verify(cookie, process.env.SECRETORPRIVATEKEY);
  const {nombre, tiempo_sesion, descripcion, opciones} = req.body;
  try {
      const rol = new Rol({nombre,tiempo_sesion,descripcion});

      const rolc = await rol.save();
      const miFuncion = (opciones, rolc)=>{
        return new Promise((resolve, reject)=>{
            opciones.forEach(async (opc,i) => {
                let op = new roles_opciones({rol_fk: rolc.id, opcion_fk: opc});
                await op.save();
                if(i===(opciones.length-1) ){
                    return resolve();
                }
            });
        })
    }
    if(Array.isArray(opciones)){
      await miFuncion(opciones,rolc);
      
    }else{
      let op = new roles_opciones({rol_fk: rolc.id, opcion_fk: opciones});
      await op.save();
    }
     
      resp.redirect('/gerencia');
    
  } catch (error) {
    console.log(error);
    }
  };


const edita = async(req, resp = response)=>{
    const id = req.params.id;
    try {
        const opcionesd = (await roles_opciones.findAll({where:{rol_fk: id}})).map((rol) =>rol.toJSON()).map(opc => opc.opcion_fk);
        const opciones = (
          await Opcion.findAll({
        where: {
            estado: "Activo",
          },
        })
    ).map((usu) => usu.dataValues);
        let rol = await Rol.findByPk(id);
        rol  = rol.dataValues;
        resp.render("gerencia/editar",{opcionesd,rol, opciones});
    } catch (error) {
        
    }
};


const actualizar = async(req, resp = response)=>{
    
  const {id,opciones,...data} = req.body;
  try{
      const opcionesOld = (await roles_opciones.findAll({where:{rol_fk: id}})).map((rol) =>rol.toJSON()).map(opc =>  opc.opcion_fk.toString());
      const opcionesCrear = opciones.includes(opcionesOld);
      //resp.json({old:opcionesOld,new:opciones,crear:opcionesCrear})
      if(!opcionesCrear){

        const reg = await roles_opciones.findAll({where: { rol_fk: id}});
        reg.forEach(async (e) => await e.destroy() );


        const miFuncion = (opciones, id)=>{
          return new Promise((resolve, reject)=>{
              opciones.forEach(async (opc,i) => {
                  let op = new roles_opciones({rol_fk: id, opcion_fk: opc});
                  await op.save();
                  if(i===(opciones.length-1) ){
                      return resolve();
                    }
                });
            })
        }
        if(Array.isArray(opciones)){
          await miFuncion(opciones,id);
          
        }else{
          let op = new roles_opciones({rol_fk: id, opcion_fk: opciones});
          await op.save();
        }
        const rol = await Rol.findByPk(id);
        if(!rol){
            return resp.redirect('/gerencia');
        }
        
        await rol.set(data);
    
        await rol.save();
  
        return resp.redirect('/gerencia');
      }


      const rol = await Rol.findByPk(id);
      if(!rol){
          return resp.redirect('/gerencia');
      }
      
      await rol.set(data);
  
      await rol.save();

      resp.redirect('/gerencia');
    }catch(e){
        console.error(e);
        resp.json(e)
        // const roles = (await opciones.findAll({where:{estado:"Activo"}})).map((rol) =>rol.toJSON());
        // let usuario = await Rol.findByPk(id);
        // usuario  = usuario.dataValues;
        // resp.render("administracion/usuarios/editar",{usuario,roles});
        // resp.render("administracion/usuarios/nuevoUsuario",{error:e.errors, usuario, roles});
    }
}



const eliminar = async(req, resp = response)=>{
    const id = req.params.id;
    try {
        const reg = await roles_opciones.findAll({where: { rol_fk: id}});
        reg.forEach(async (e) => await e.destroy() );

        let rol = await Rol.findByPk(id);
        await rol.destroy();

        resp.status(200).json({rol});
    } catch (error) {
        
    }
 
};

module.exports = {
  index,
  nuevo,
  guardar,
  eliminar,
  edita,
  actualizar
};
