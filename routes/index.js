const express = require('express');
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');
const router = express.Router();

module.exports = function () {

    router.post('/clientes', clienteController.nuevoCliente);
    router.get('/clientes', clienteController.mostrarClientes);
    router.get('/clientes/:idCliente', clienteController.mostrarClienteById);
    router.put('/clientes/:idCliente', clienteController.actualizarClienteById);
    router.delete('/clientes/:idCliente', clienteController.eliminarClienteById);


    // rutas para productos

    router.post('/productos', 
    productoController.subirArchivo,
    productoController.nuevoProducto);
    router.get('/productos', productoController.listarProductos);
    router.get('/productos/:idProducto', productoController.mostrarProductoById);
    router.put('/productos/:idProducto', productoController.subirArchivo,
    productoController.actualizarProductoByid);
    router.delete('/productos/:idProducto', productoController.eliminarProductoById)


    //rutas para pedidos
    router.post('/pedidos', pedidoController.nuevoPedido);

    //mostrar todos los pedidos
    router.get('/pedidos', pedidoController.mostrarPedidos);

    //mostrar un pedido por id
    router.get('/pedidos/:idPedido', pedidoController.mostrarPedidoById);

    //actualizar un pedido por id
    router.put('/pedidos/:idPedido', pedidoController.actualizarPedidoById);

    //eliminar un pedido por id
    router.delete('/pedidos/:idPedido', pedidoController.eliminarProductoById);
    return router;
}