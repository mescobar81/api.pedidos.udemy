const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

exports.nuevoProducto = async (req, res, next) =>{

    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({
            ok: true,
            mensaje: 'Producto agregado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.listarProductos = async (req, res) =>{
    try {
        const productos = await Productos.find({});
        res.json({
            ok: true,
            productos
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.mostrarProductoById = async (req, res) =>{

    try {
        const producto = await Productos.findById(req.params.idProducto);
        if(!producto){
            return res.json({
                ok: false,
                mensaje: 'No existe producto con el id ingresado'
            });
        }
        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.actualizarProductoByid = async (req, res) =>{

    try {
        //obtiene un producto de la base de datos
        let producto = await Productos.findById(req.params.idProducto);

        //construimos un nuevo producto
        let nuevoProducto = req.body;

        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else {
            nuevoProducto.imagen = producto.imagen;
        }

        let productoActualizado = await Productos.findOneAndUpdate({_id: req.params.idProducto},
             nuevoProducto,
             {new: true}//para devolver el producto actualizado
            )
            res.json({
                ok: true,
                productoActualizado
            });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.eliminarProductoById = async (req, res) =>{

    try {
        await Productos.findByIdAndDelete({_id: req.params.idProducto});
        res.json({
            ok: true,
            mensaje: 'Producto eliminado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}