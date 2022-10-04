const express = require('express')

const route = express.Router()

const ProductManager = require('../controllers/product.manager.js')

const productManager = new ProductManager('src/data/products.json')

const admin = true

const isAdmin = (req, res, next) => {
    if(admin)
    {
        next()
    }
    else{
        res.send({descripcion: 'Usuario no autorizado'})
    }
}

// GET: '/:id?' - Permite listar todos los productos disponibles o un producto por su id (Disponible para usuarios y administradores)
route.get('/', async (req, res) => {
    try{
        res.send(await productManager.getAllProducts())
    }
    catch (error){
        res.send(error)
    }
})

route.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    req.id = id
    try{
        res.send(await productManager.getProduct(req.id))
    }
    catch (error){
        res.send(error)
    }
})

// POST: '/' Para incorporar productos al listado (Disponible para administradores)
route.post('/', isAdmin, async (req, res) => {
    try{
        res.send(await productManager.createProduct(req.body))
    }
    catch (error){
        res.send(error)
    }
})

// PUT: '/:id' - Actualiza un producto por su id (Disponible para administradores)
route.put('/:id', isAdmin, async (req, res) => {

    let id = parseInt(req.params.id)
    req.id = id

    try{
        res.send(await productManager.updateProduct(req.id, req.body))
    }
    catch (error){
        res.send(error)
    }
})

// DELETE: '/:id' - Borra un producto por su id (Disponible para administradores)
route.delete('/:id', isAdmin, async (req, res) => {

    let id = parseInt(req.params.id)
    req.id = id

    try{
        res.send(await productManager.deleteProduct(req.id))
    }
    catch (error){
        res.send(error)
    }
})
module.exports = route