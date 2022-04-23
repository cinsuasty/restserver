const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, crearProducto, obtenerPrducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const {existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validatos');

const {validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener los productos - publico middleware para validar id categoria
router.get('/',
    obtenerProductos
    )

// Obtener un producto por id - publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],obtenerPrducto)

// Crear producto - privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
],crearProducto)

// Actualizar producto por id - privado - cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
],actualizarProducto)

// Borrar producto por id - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],borrarProducto)


module.exports = router;