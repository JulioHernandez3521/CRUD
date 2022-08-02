const {DataTypes, Sequelize} = require('sequelize');
const db = require('../config/conexion');

const Rol = db.define("roles",{
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
    tiempo_sesion:{
        type:DataTypes.INTEGER,
        allowNull: false,
    }
    ,
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



module.exports = Rol;