const Role = require('../models/role');
const Usuario = require('../models/usuario');


//Verificar si el rol es valido
const esRolValido =  async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`Èl rol ${rol} no está registrado en la DB`);
    }
}

//Verificar si el correo exite
const emailExiste = async(correo = '' ) => {
    const exisxteEmail = await Usuario.findOne({correo});
    if (exisxteEmail) {
        throw new Error(`Èl correo ${correo}, ya está registrado en la DB`);
    }
}

//Verificar si el usuari exite por id
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`Èl id ${id}, no existe en la DB`);
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}
