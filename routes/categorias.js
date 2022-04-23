const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerCategorias ,
    crearCategoria, 
    obtenerCategoria, 
    actualizarCategoria, 
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validatos');

const {validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener las categorias - publico middleware para validar id categoria
router.get('/',
    obtenerCategorias
    )

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],obtenerCategoria)

// Crear categoria - privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    validarCampos
],crearCategoria)

// Actualizar categoria por id - privado - cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria)

// Borrar categoria por id - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],borrarCategoria)


module.exports = router;