const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models/');


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

//Verificar si la categoria exite por id
const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`Èl id ${id}, no existe en la DB`);
    }
}

//Verificar si la producto exite por id
const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`Èl id ${id}, no existe en la DB`);
    }
}

//Verificar sicolecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones=[]) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${incluida} no es permitida, ${colecciones}`);
    }

    return true;
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}
