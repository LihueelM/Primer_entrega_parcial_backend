import fs from 'fs'

export default class Contenedor{    
    productos;
    ruta;

    constructor(ruta){
        this.productos = []
        this.ruta = ruta
    }

    async save(producto){
        this.productos.push(producto)
        await fs.promises.writeFile(this.ruta , JSON.stringify(this.productos))
    }

    async getById(idProducto){
        this.productos = JSON.parse(await fs.promises.readFile(this.ruta ,'utf-8'))
        const producto = this.productos.find(e => e.id === idProducto)
        return producto === undefined ? undefined : producto
    }

    async putById(idProducto, bodyProducto){
        this.productos = JSON.parse(await fs.promises.readFile(this.ruta , 'utf-8'))
        const producto = this.productos.findIndex(e => e.id === idProducto)
        this.productos.splice(producto , 1, bodyProducto)
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos))
    }

    async getAll(){
        this.productos = JSON.parse(await fs.promises.readFile(this.ruta , 'utf-8'))
        return this.productos
    }

    async deleteById(idProducto){
        this.productos = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
        const producto = this.productos.findIndex(e => e.id === idProducto)
        this.productos.splice(producto, 1)
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos))
    }
}