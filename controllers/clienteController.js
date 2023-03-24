const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res, next) =>{
    //mapea directamente los datos que vienen en el request
    //en el modelo de schema
    const cliente = new Clientes(req.body);

    try {
        //guardamos el cliente
        await cliente.save();
        res.json({
            ok:true,
            mensaje:'Se agrego correctamente el registro'
        })
    } catch (error) {
        console.log(error);
        next();// para que la aplicacion no se quede pegado
    }
}

exports.mostrarClientes = async (req, res, next) =>{

    try {
        const clientes = await Clientes.find({});
        res.json({
            ok:true,
            clientes
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarClienteById = async (req, res, next) =>{

    const {idCliente} = req.params;
    try {
        const cliente = await Clientes.findById(idCliente);
        if(!cliente){
            return res.json({
                ok:false,
                mensaje:'No existe el cliente con el id especificado'
            });
        }
        res.json({
            ok:true,
            cliente
        });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarClienteById = async (req, res, next) =>{
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente}, req.body,
            {new: true});
            res.json({
                ok:true,
                cliente
            });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        })
    }
}

exports.eliminarClienteById = async (req, res) =>{
    try {
        await Clientes.findOneAndDelete({_id:req.params.idCliente});
        res.json({
            ok: true,
            mensaje: 'Cliente eliminado con éxito'
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            error
        })
    }
}