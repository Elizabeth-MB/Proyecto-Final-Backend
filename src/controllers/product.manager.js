const fs = require('fs')

// Trabajando con persistencia en archivos
const pathToFile = '../data/products.json'

class ProductManager {
    getAll = () => {
        try {
            
        } catch (err) {
            return {
                status: "error", 
                message: err.message
            }
        }
    }

    getById  = (id) => {
        try {
            
        } catch (err) {
            return {
                status: "error", 
                message: err.message
            }
        }
    }

    create = (product) => {
        let id
        if (products.length ===0 ) id = 1
        else id = products[products.length-1].id+1
        product.price = parseInt(product.price)
        product = {
            id,
            ...product
        }
        products.push(product)
        return products
    }

    update = (id, product) => {
        try {
            
        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }
    }

    delete = (id) => {
        try {
            
        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }
    }
}

module.exports = ProductManager