const  { Router, response } =  require("express");
const { check } = require("express-validator");
const {  validarCampos } = require("../middlewares");
const { index, nuevo, guardar,eliminar,edita,actualizar } = require("../controllers/gerencia.controller");
const Opcion = require("../models/Opcion");


const router = Router();
//Pagina principal
router.get('/',[], index);
router.get('/nuevo',[], nuevo);
router.post('/store',[
    check("nombre","EL nombre es obligatorio").exists().notEmpty(),
    check("opciones","Al menos debe elejir una opcion").exists(),
    check("tiempo_sesion","El timepo de sesion es obligatorio").exists().notEmpty(),
    async (req, res=response, next)=>{
      const results = await validarCampos(req,res);
      console.log(results)
      if(results) {
        results.rol = req.body;
        const opciones = (
            await Opcion.findAll({
          where: {
              estado: "Activo",
            },
          })
      ).map((usu) => usu.dataValues);
      results.opciones = opciones;
        return res.render("gerencia/nuevo", results)
      };
      next();
    }

], guardar);

router.get('/editar/:id',[], edita);

router.post('/actualizar',[
    check("nombre","EL nombre es obligatorio").exists().notEmpty(),
    check("opciones","Al menos debe elejir una opcion").exists(),
    check("tiempo_sesion","El tiempo de sesion es obligatorio").exists().notEmpty(),
    async (req, res=response, next)=>{
      const results = await validarCampos(req,res);
      console.log(results)
      if(results) {
        results.rol = req.body;
        const opciones = (
            await Opcion.findAll({
          where: {
              estado: "Activo",
            },
          })
      ).map((usu) => usu.dataValues);
      results.opciones = opciones;
        return res.render("gerencia/nuevo", results)
      };
      next();
    }
], actualizar)
router.get('/delete/:id',[],eliminar);

module.exports = router;