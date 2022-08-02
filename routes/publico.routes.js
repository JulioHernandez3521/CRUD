const  { Router } =  require("express");
const { index } = require("../controllers/publico.controller");

const router = Router();

router.get('/',[], index);


module.exports = router;
