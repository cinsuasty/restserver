const dbValidator   = require('./db-validatos');
const generarJWT    = require('./generar-jwt');
const googleVerify  = require('./google-verify');
const subiArchivo   = require('./subir-archivo');

module.exports ={
    ...dbValidator,  
    ...generarJWT,    
    ...googleVerify,  
    ...subiArchivo,  
}