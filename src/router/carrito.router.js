import express from 'express'

// const express = require('express')
const router = express.Router()

// POST: '/' Crea un carrito y devuelve su id
router.post('/', (req, res) => {
    res.send({status: 200, message: 'Hello POST'})
})

// DELETE: '/:id' - Vacía un carrito y lo elimina
router.delete('/:id', (req, res) => {
    res.send({status: 200, message: 'Hello DELETE'})
})

// GET: '/:id/productos' - Permite listar todos los productos guardados en el carrito
router.get('/:id/productos', (req, res) => {
    res.send({status: 200, message: 'Hello GET ALL'})
})

router.get('/:id', (req, res) => {
    res.send({status: 200, message: 'Hello GET By Id'})
})


// PUT: '/:id' - Actualiza un producto por su id (Disponible para administradores)
router.put('/:id', (req, res) => {
    res.send({status: 200, message: 'Hello PUT'})
})
