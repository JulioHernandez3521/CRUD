const  { Router, response } =  require("express");
const { login } = require("../controllers/auth.controller");

const router = Router();

router.get('/', (req, resp = response)=>{

    //resp.status(200).json({msg:"Jalando Auth"})

    resp.render('auth/login', {layout: false});
});

router.post('/login', login);


module.exports = router;