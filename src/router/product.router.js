import express from 'express'
// const express = require('express')
const router = express.Router()

// GET: '/:id?' - Permite listar todos los productos disponibles o un producto por su id (Disponible para usuarios y administradores)
router.get('/', (req, res) => {
    res.send({status: 200, message: 'Hello GET ALL'})
})

router.get('/:id', (req, res) => {
    res.send({status: 200, message: 'Hello GET By Id'})
})

// POST: '/' Para incorporar productos al listado (Disponible para administradores)
router.post('/', (req, res) => {
    res.send({status: 200, message: 'Hello POST'})
})

// PUT: '/:id' - Actualiza un producto por su id (Disponible para administradores)
router.put('/:id', (req, res) => {
    res.send({status: 200, message: 'Hello PUT'})
})

// DELETE: '/:id' - Borra un producto por su id (Disponible para administradores)
router.delete('/:id', (req, res) => {
    res.send({status: 200, message: 'Hello DELETE'})
})