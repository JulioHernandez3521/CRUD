const Cliente = require("../models/Cliente");

const getNames =(array) => {
    const ordenes = array;
    return (new Promise((resolve, reject) => {
        ordenes.forEach(async (orden, i) => {
            let nombre = await Cliente.findByPk(orden.cliente_fk);
            orden.cliente_fk = nombre.nombre;
            orden.apellido = nombre.apellido;
            orden.telefono = nombre.telefono;
            orden.fecha_recepcion = new Date(orden.createdAt).toDateString();//2022-05-29T01:51:12.676Z
            orden.hora = new Date(orden.createdAt).toLocaleTimeString();

            if((ordenes.length-1) === i){
                 resolve(ordenes);
            }
          });
    }));

}

module.exports = {
    getNames
}