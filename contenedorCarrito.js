import fs from 'fs'

export default class ContenedorCarrito{
    carrito;
    ruta;

    constructor(ruta){
        this.carrito = {};
        this.ruta = ruta;
    }

    async create(carritoId){
        try {
            this.carrito.id = carritoId
            this.carrito.productos = []
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.carrito))
            return this.carrito.id    
        } catch (error) {
            throw error;    
        }        
    }

    async save(carritoId ,producto){
        try {
            this.carrito = JSON.parse( await fs.promises.readFile(this.ruta, 'utf-8'))
            if(this.carrito.id === carritoId){
                this.carrito.productos.push(producto)
                await fs.promises.writeFile(this.ruta, JSON.stringify(this.carrito));    
                return producto    
            }else{
                return null
            }            
        } catch (error) {
            throw error;
        }        
    }

    async deleteAll(carritoId){
        try {
            this.carrito = JSON.parse(await fs.promises.readFile( this.ruta, 'utf-8'));
            if(this.carrito.id === carritoId){
                this.carrito.productos = []
                await fs.promises.writeFile(this.ruta , JSON.stringify(this.carrito))
                return this.carrito;
            }else{
                return null
            }            
        } catch (error) {
            throw error
        }
    }

    async deleteById(carritoId, productoId){
        try {
            this.carrito = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'));
            if( this.carrito.id === carritoId ){
                const indice = this.carrito.productos.findIndex(e => e.id === productoId);
                this.carrito.productos.splice(indice, 1);
                await fs.promises.writeFile(this.ruta, JSON.stringify(this.carrito));
                return this.carrito;
            }else{
                return null
            }
        } catch (error) {
            throw error;
        }
    }

    async getProducts(idCarrito){
        try {
            this.carrito = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'));
            if(this.carrito.id === idCarrito){
                return this.carrito.productos.map(e => e , [])
            }else{
                return null
            }
        } catch (error) {
            throw error
        }
    }
}



