const  { Router, response } =  require("express");
const { check } = require("express-validator");
const { index, vistaNuevo, store,editar, eliminar,actualizar } = require("../controllers/usuarios.controller");
const {  validarCampos } = require("../middlewares");
const {  emailExiste } = require("../helpers/db-validators");

const router = Router();

router.get('/', index);
router.get('/nuevo', vistaNuevo);
router.post('/generaUsuario',[
    check("nombre","EL nombre es obligatorio").exists().notEmpty(),
    check("rol_fk","EL Rol es obligatorio").exists().notEmpty(),
    check("apellido","El apellido es obligatorio").exists().notEmpty(),
    check("telefono","Se requiere el telefono").exists().notEmpty(),
    check("password",'El password es oblatorio con mas de 6 letras').isLength({min: 6}),//Para checar que la contra sea minimo de 6 letras
    check("correo",'El correo no es valido').exists().isEmail(),//check revisa cualquier campo del body
    check('correo').custom( emailExiste ),
    async (req, res=response, next)=>{
      const results = await validarCampos(req,res);
      console.log(results)
      if(results) {
        results.usuario = req.body;
        return res.render("administracion/usuarios/nuevoUsuario", results)
      };
      next();
    }
], store);
router.get('/editarUsuario/:id',[], editar);
router.post('/actualizaUsuario',[
  check("nombre","EL nombre es obligatorio").exists().notEmpty(),
    check("rol_fk","EL Rol es obligatorio").exists().notEmpty(),
    check("apellido","El apellido es obligatorio").exists().notEmpty(),
    check("telefono","Se requiere el telefono").exists().notEmpty(),
    check("correo",'El correo no es valido').exists().isEmail(),//check revisa cualquier campo del body
    async (req, res=response, next)=>{
      const results = await validarCampos(req,res);
      console.log(results)
      if(results) {
        results.usuario = req.body;
        return res.render("administracion/usuarios/editar", results)
      };
      next();
    }
], actualizar);
router.get('/delete/:id',[],eliminar);


module.exports = router;