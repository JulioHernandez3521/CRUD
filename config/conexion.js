const { Sequelize } = require('sequelize');

const name = process.env.USENAME
const pass = process.env.PASS

const db = new Sequelize('C&A',name,pass,{
    host:process.env.HOST,
    dialect: 'mysql',
    //logging: false
});


module.exports = db;