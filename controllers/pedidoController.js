const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) =>{

    const Pedido = new Pedidos(req.body);

    try {
        await Pedido.save();
        res.json({
            ok: true,
            mensaje: 'Pedido grabado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.mostrarPedidos = async (req, res, next) =>{

    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json({
            ok: true,
            pedidos
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.mostrarPedidoById = async (req, res, next) =>{

    try {
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        if(!pedido){
            return res.json({
                ok: false,
                mensaje: 'El pedido no existe con el id ingresado'
            });
        }
        res.json({
            ok: true,
            pedido
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.actualizarPedidoById = async (req, res, next) =>{

    try {
        const pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, 
            {
                new: true //para devolver el pedido actualizado en la respuesta
            }).populate('cliente').populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
            res.json({
                ok: true,
                pedido
            });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

exports.eliminarProductoById = async (req, res, next) =>{

    try {
        await Pedidos.findOneAndDelete({_id: req.params.idPedido});
        res.json({
            ok: true,
            mensaje: 'Pedido eliminado con éxito'
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            error
        });
    }
}