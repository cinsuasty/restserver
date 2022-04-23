const { response } = require("express");
const { Producto } = require("../models");

// obtenerProductos - Pagina - Total - Populate
const obtenerProductos= async(req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total,producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario','nombre')
            .populate('categoria','nombre')
    ]);
    res.json({
        total,
        producto
    })
}


// obtenerPrducto - Populate

const obtenerPrducto = async(req = request, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json(producto);
}


const crearProducto = async( req, res = response) =>{

    const nombre =  req.body.nombre.toUpperCase();

    const ProductoDB = await Producto.findOne({nombre});

    if (ProductoDB){
        return res.status(400).json({
            msg: `El producto ${ ProductoDB.nombre } ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        precio: req.body.precio,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        disponible: req.body.disponible
    }

    const producto = await new Producto(data);
    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

// actualizarProducto

const actualizarProducto = async (req, res = response) => {
    
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre =  data.nombre.toUpperCase();
    data.usuario =  req.usuario._id;
    const ProductoDB = await Producto.findOne({nombre: data.nombre});

    if (ProductoDB){
        return res.status(400).json({
            msg: `El producto ${ ProductoDB.nombre } ya existe`
        });
    }
    const producto = await Producto.findByIdAndUpdate(id, data,{new:true});
    res.json(producto);
}

// borrarProducto - estado:false
const borrarProducto = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false},{new:true});
    res.json(producto);
}


module.exports = {
    obtenerProductos,
    obtenerPrducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}