const {DataTypes, Sequelize} = require('sequelize');
const db = require('../config/conexion');
const Opcion = require('./Opcion');
const Rol = require('./Rol');

const roles_opciones = db.define('roles_opciones',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rol_fk:{
        type: DataTypes.UUID,
        references: {
            model: 'Rol',
            key: 'id',
        },
        allowNull: [false,"El id de Rol es obligatorio"]
    },
    opcion_fk:{
        type: DataTypes.UUID,
        references: {
            model: 'Opcion',
            key: 'id',
        },
        allowNull:[false, "El id de la opcion es obligatoria"]
    },
 
});

roles_opciones.belongsTo(Opcion, {
    foreignKey: 'opcion_fk'
  });

roles_opciones.belongsTo(Rol, {
    foreignKey: 'rol_fk'
  });
    

module.exports = roles_opciones;