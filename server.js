import express from 'express'
import { routerProducto } from './router/routerProductos.js'
import { routerCarrito } from './router/routerCarrito.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

export function esAdmin(req, res, next){
    if(esAdmin){
        next()
    }else{
        res.sendStatus(403)
    }
}

app.post('/login', (req, res) =>{
    esAdmin=true;
    res.sendStatus(200)
})

app.post('/logout', (req, res) => {
    esAdmin=false;
    res.sendStatus(200)
})


app.use('/api/products' , routerProducto)
app.use('/api/shoppingcart' , routerCarrito)


const PORT =  process.env.PORT ?? 8080
const servidor = app.listen(PORT, () => {
    console.log(`conectado al puerto: ${servidor.address().port}`);
})