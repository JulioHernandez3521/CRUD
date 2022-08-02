const { response } = require("express");


const index =  (req, resp = response)=>{
    resp.render('Publico/index');
}

module.exports = {
    index,
}