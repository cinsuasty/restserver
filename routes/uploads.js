const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, motrarImagen, actualizarImagenCloudinary, motrarImagenCloudinar } = require('../controllers/uploads');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();

router.post('/',validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    check('id','El id debe ser de mongo').isMongoId(),
    validarCampos
],
actualizarImagenCloudinary);
// actualizarImagen);

router.get('/:coleccion/:id',[
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    check('id','El id debe ser de mongo').isMongoId(),
    validarCampos
],motrarImagenCloudinar)
// motrarImagen)



module.exports = router;