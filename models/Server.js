const express = require("express");
const  { engine } = require("express-handlebars");
//const { dbConection } from "../config/database";
const morgan =require("morgan");
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');


//Rutas 
const {publico, auth, gerencia, administracion} = require('../routes/index');
const db  = require("../config/conexion");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      auth: "/auth",
      administracion:"/administracion",
      gerencia: "/gerencia",
      publico: "/publico"
    };

    // Concetar con BD
    this.conectarDb();

    //MIddlewares
    this.middlewares();

    //Rutas de la app
    this.routes();
  }

  async conectarDb() {
    try {
      await db.authenticate();
      console.log("DB conectada....");
    } catch (error) {
      throw new Error(error);
    }
  }
  middlewares() {

    //Poner las cookies
    this.app.use(cookieParser());

    //Cors
    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}))
    //Directorio publico
    this.app.use(express.static("public"));

    //Poner las viws
    this.app.set("views", path.join(__dirname, "../views"));

    //configuracion para el uso de handdlebars
    this.app.engine(
      ".hbs",
      engine({
        layoutsDir: path.join(this.app.get("views"), "layouts"), //la cartpeta que contiene el main o plantilla pricipal
        partialsDir: path.join(this.app.get("views"), "partials"), //Esto es para configurar donde ponemos el navbar
        defaultLayout: "main", //Nombre de la plantilla principal
        extname: ".hbs",
       // helpers: require('../helpers/hbsHelpers'),
      })
    );

    this.app.set("view engine", ".hbs");

    //Configurar morgan
    this.app.use(morgan("dev"));

  }

  routes() {
    //Manda llamar el archivo de rutas segun la peticion
    this.app.use(this.paths.publico, publico);
    this.app.use(this.paths.auth, auth);
    this.app.use(this.paths.gerencia, gerencia);
    this.app.use(this.paths.administracion, administracion);
  }

  listen() {
    // this.app.listen(this.port, "127.0.0.0", () => {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en:", this.port);
    });
  }
}

module.exports = Server;
