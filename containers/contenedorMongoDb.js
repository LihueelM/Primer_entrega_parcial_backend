import {mongoDatabase} from './mongoClient.js'

export class ContenedorMongoDb {
    
    constructor(nombreColeccion){
        this.collection = mongoDatabase.collection(nombreColeccion)
    }

    async guardar(e){
        await this.collection.insertOne(e)
    }

    async recuperar(){
        try {
            return await this.collection.find({}).toArray()    
        } catch (error) {
            
        }
        
    }

    async eliminar(id){
        try {
            await this.collection.findOne({id: id}).delete()
        } catch (error) {
            
        }
    }
}