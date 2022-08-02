const publico = require('./publico.routes');
const auth = require('./auth.routes');
const gerencia = require('./gerencia.routes');
const administracion = require('./administracion.routes');



module.exports  ={
    publico,
    auth,
    gerencia,
    administracion
}