const express = require('express')

const productRouter = require('./router/product.router')
const carritoRouter = require('./router/carrito.router')

const app = express()

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter)
app.use('/api/carrito', carritoRouter)

app.use((req, res) => {
    res.status(404).send({ 
        descripción: `Ruta: ${req.baseUrl}${req.url} método ${req.method} no existe`
    })
})

server.on('error', (error) => console.log(`Error en server: `, error.message));