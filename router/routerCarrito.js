import { Router } from "express";
import * as api from '../api.js'
import { esAdmin } from "../server.js";
import crypto from 'crypto'


export const routerCarrito = Router()

routerCarrito.get('/:id/products' , async ( req, res) => {
    const productos = await api.mostrarProductosCarrito(req.params.id);
    res.status(200);
    res.json(productos);    
})

routerCarrito.post('/' ,esAdmin,async (req, res) => {
    const id = crypto.randomUUID()
    const carrito = await api.crearCarrito(id)
    res.status(201)
    res.json(carrito)
})

routerCarrito.post('/:id_cart/products' ,esAdmin, async (req, res) => {   
    const productoAgregado = await api.cargarProducto(req.params.id_cart, req.body);
    res.status(200);
    res.json(productoAgregado);
})

routerCarrito.delete('/:id_carrito',esAdmin, async (req, res) => {
    const id = req.params.id_carrito;
    const nuevaLista = await api.eliminarTodo(id);
    res.status(200);
    res,jsonn(nuevaLista);
})

routerCarrito.delete('/:id_cart/products/:id_prod' ,esAdmin, async (req, res) => {
    const idCarrito = req.params.id_cart;
    const idProducto = req.params.id_prod;
    const nuevaLista = api.eliminarPorId(idCarrito, idProducto);
    res.status(200);
    res.json(nuevaLista);
})

