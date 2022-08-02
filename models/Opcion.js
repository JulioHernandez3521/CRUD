const {DataTypes, Sequelize} = require('sequelize');
const db = require('../config/conexion');

const Opcion = db.define("opciones",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: [false, "El nombre es obligatorio"],
        unique: true,
        validate: {
            len:[2,40]
        }
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:[false, "El estado del usuario es obligatorio"],
        validate:{
            len:[2,15]
        }
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            len:[5,100]
        },
    }

});



module.exports = Opcion;