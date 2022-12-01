import { Router } from "express";
import * as api from '../api.js'
import { esAdmin } from "../server.js";

export const routerProducto = Router()

routerProducto.post('/' ,esAdmin,  async (req, res) => {
    const nuevoProducto = await api.cargar(req.body);
    res.status(201)
    res.json(nuevoProducto)    
})

routerProducto.get('/', async (req, res) => {
    const todosLosProductos = await api.todos();
    res.json(todosLosProductos);
    res.status(201);
})

routerProducto.get('/:id' , async (req ,  res) => {
    let producto = await api.seleccion(req.params.id);    
    res.status(201)
    res.json(producto);
})

routerProducto.put('/:id' ,esAdmin, async (req, res) => {
    let producto = await api.modificar(req.params.id , req.body)
    res.status(201)
    res.json(producto)
})

routerProducto.delete('/:id' ,esAdmin, async (req, res) => {
    let respuesta = await api.borrar(req.params.id)
    res.status(200)
    res.json(respuesta)
})

