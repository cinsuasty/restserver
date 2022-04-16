const { response , request} = require('express')

const usuariosGet = (req = request, res = response) => {
    const {q, nombre, key} = req.query;
    res.json({
        ok: true,
        mgs: 'get API - controlador',
        q,
        nombre,
        key
    })
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        ok: true,
        mgs: 'post API - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        ok: true,
        mgs: 'put API - controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        mgs: 'patch API - controlador'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        mgs: 'delete API - controlador'
    })
}


module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
