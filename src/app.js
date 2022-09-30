import express from 'express';

import { productRouter } from './router/product.router'
import { carritoRouter } from './router/product.router'

const app = express()

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

server.on('error', (error) => console.log(`Error en server: `, error.message));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter)
app.use('/api/carrito', carritoRouter)