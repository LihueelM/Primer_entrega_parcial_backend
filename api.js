import Contenedor from "./contenedor.js";
import ContenedorCarrito from "./contenedorCarrito.js";
import crypto from 'crypto'

export const nuevoContenedor = new Contenedor('./productos.txt')
export const nuevoCarrito = new ContenedorCarrito('./carritos.txt')

export function cargar(producto){
    producto.id = crypto.randomUUID();
    nuevoContenedor.save(producto);
    return producto;
}

export function todos(){
    nuevoContenedor.getAll()
    return nuevoContenedor.productos;
}

export async function seleccion(idProducto){
    let producto = await nuevoContenedor.getById(idProducto)
    return producto;
}

export async function modificar(idProducto , body){
    let producto =  await nuevoContenedor.putById(idProducto, body);
    return producto;
}

export async function borrar(idProducto){
    let producto = await nuevoContenedor.getById(idProducto)
    if(producto != undefined){
        await nuevoContenedor.deleteById(idProducto)
        return 'Producto eliminado'
    }
    else{
        return 'Producto no encontrado'
    }   
}

// Negocio para manejo de carrito;

export async function mostrarProductosCarrito(idCarrito){
    const carrito = await nuevoCarrito.getProducts(idCarrito)
    return carrito;
}

export async function crearCarrito(id){
    const carrito = await nuevoCarrito.create(id)
    return carrito;
}

export async function cargarProducto(id, producto){
    const nuevoProducto = nuevoCarrito.save(id, producto)
    return nuevoProducto;
}

export async function eliminarTodo(id){
    const nuevaLista = nuevoCarrito.deleteById(id);
    return nuevaLista;
}

export async function eliminarPorId(id, productoId){
    const nuevaLista = nuevoCarrito.deleteById(id, productoId)
    return nuevaLista;
}
