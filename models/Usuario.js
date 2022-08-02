const {DataTypes, Sequelize} = require('sequelize');
const db = require('../config/conexion');
const Rol = require('./Rol');

const Usuario = db.define("usuario",{
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
    correo:{
        type:DataTypes.STRING,
        allowNull: [false, "El correo es obligatorio"],
        unique: true,
        validate: {
            len:[2,60]
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: [false, "El password es obligatorio"],
        validate: {
            len:[2,100]
        }
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: [false, "El nombre es obligatorio"],
        validate: {
            len:[2,40]
        }
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull: true,
        validate: {
            len:[2,40]
        }
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull: true,
        validate: {
            len:[2,20]
        }
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:[false, "El estado del usuario es obligatorio"],
        validate:{
            len:[2,50]
        }
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            len:[5,150]
        },
    }

});
Usuario.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
  
    // no mandar contraseña
    delete values.contrasena;
    return values;
  };

Usuario.belongsTo(Rol, {
  foreignKey: 'rol_fk'
});


module.exports = Usuario;