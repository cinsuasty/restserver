const { response , request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

// Listar usuarios
const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    })
}
// Crear usuario
const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();

    res.json(usuario);
}
//Actualizar usuario
const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id,password, google,correo, ...resto} = req.body;

    // TODO validar contra db

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findOneAndUpdate(id, resto,{new:true});

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        mgs: 'patch API - controlador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false},{new:true});
    res.json(usuario);
}


module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
