const JWT = require('jsonwebtoken');


const generaJWT = (id = '',nombre = '',rol='',expira='')=>{

    const payload = {id, nombre, rol}
    return new Promise((resolve, reject) =>{

        JWT.sign(payload,process.env.SECRETORPRIVATEKEY, {
            expiresIn: expira
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('El token no se pudo generear');
            }else{
                resolve(token);
            }

        });

    })
}


module.exports = {
    generaJWT
}