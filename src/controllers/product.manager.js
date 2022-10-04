const fs = require('fs')

class ProductManager {

    constructor(path){
        this.path = path
    }
    
    // Permite listar todos los productos disponibles (Disponible para usuarios y administradores)
    async getAllProducts(){
        if(!fs.existsSync(this.path)){
            throw {error, descripcion : 'El archivo de productos no existe' }
        }

        try {
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } 
        catch {
            throw {descripcion : 'Error al leer el archivo productos' }
        }
    }

    // Permite listar un producto por su ID (Disponible para usuarios y administradores)
    async getProduct(id){
        const products = await this.getAllProducts()

        const product = products.find(p => p.id === id)
        if(product){
            return product
        }

        throw {descripcion : `No existe el producto de id ${id}` }
    }

    // POST: '/' - Permite incorporar productos al listado (Disponible para administradores)
    async createProduct(p){
        let products = []
        let newProd

        if(fs.existsSync(this.path)){
            products = await this.getAllProducts()
                
            if(products.length > 0)
            {
                newProd = { id : (products[products.length - 1].id + 1), timestamp : Date.now(), ...p}
            }
            else {
                newProd = { id : 1, timestamp : Date.now(), ...p }
            }
        }
        else{
            newProd = { id : 1, timestamp : Date.now(), ...p }
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify([...products, newProd], null, 2))    
            return newProd
        }
        catch {
            throw {descripcion : 'No se pudo crear el archivo productos'}
        }
    }

    // PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
    async updateProduct(id, p){
        const products = await this.getAllProducts()
        const index = products.findIndex(p => p.id === id)

        if(index === -1){
            throw { descripcion : `No existe el producto de id ${id}` }
        }

        products[index] = {...products[index], ...p}
        try{
            await fs.promises.writeFile(this.path, JSON.stringify([...products], null, 2))    
            return products[index]
        }
        catch {
            throw {descripcion : 'No se pudo modificar el archivo productos'}
        }
    }

    // DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
    async deleteProduct(id){
        const products = await this.getAllProducts()

        const index = products.findIndex(p => p.id === id)
        if(index === -1){
            throw {descripcion : `No existe el producto de id ${id}` }
        }

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(products.filter(p => p.id !== id), null, 2))    
            return products[index]
        }
        catch {
            throw {descripcion : 'No se pudo eliminar el producto'}
        }
    }
}

module.exports = ProductManager