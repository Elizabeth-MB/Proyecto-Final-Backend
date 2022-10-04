const fs = require('fs')

class CarritoManager {

    constructor(path){
        this.path = path
    }

    async getCarrito(){
        if(!fs.existsSync(this.path)){
            throw {error, descripción : 'El archivo carrito no existe' }
        }
        try {
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } 
        catch {
            throw { descripción : 'Error al leer el archivo carrito' }
        }
    }

    async getProductosOnCarrito(id){
        const carts = await this.getCarrito()

        const cart = carts.find(c => c.id === id)
        if(cart){
            return cart.productos
        }

        throw {descripcion : `No existe el carrito de id ${id}` }
    }

    async createCarrito(){
        let carts = []
        let newCart

        if(fs.existsSync(this.path)){
            carts = await this.getCarrito()
                
            if(carts.length > 0){
                newCart = { id : (carts[carts.length - 1].id + 1), timestamp : Date.now(), productos: [] }
            }
            else {
                newCart = { id : 1, timestamp : Date.now(), productos: [] }
            }
        }
        else {
            newCart = { id : 1, timestamp : Date.now(), productos: [] }
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify([...carts, newCart], null, 2))    
            return { newCartId : newCart.id }
        }
        catch {
            throw {descripcion : 'No se pudo crear el archivo de carritos'}
        }
    }

    async deleteCarrito(id){
        const carts = await this.getCarrito()

        const index = carts.findIndex(c => c.id === id)
        if(index === -1){
            throw {descripcion : `No existe el carrito de id ${id}` }
        }

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(carts.filter(c => c.id !== id), null, 2))    
            return carts[index]
        }
        catch {
            throw {descripcion : 'No se pudo modificar el archivo de carritos'}
        }
    }

    async addProductToCarrito(id, p){
        const carts = await this.getCarrito()
        const index = carts.findIndex(c => c.id === id)
        const newProd = p

        if(index === -1){
            throw {descripcion : `No existe el carrito de id ${id}` }
        }

        const cartProducts = carts[index].productos
        const cartProdLength = cartProducts.length
        
        if(cartProdLength > 0){
            newProd.id = cartProducts[cartProdLength - 1].id + 1
        }
        else {
            newProd.id = 1
        }
        newProd.timestamp = Date.now()

        cartProducts.push(newProd)

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))    
            return newProd
        }
        catch {
            throw {descripcion : 'No se pudo modificar el archivo de productos'}
        }
    }

    async deleteProductFromCarrito(cartId, prodId){
        const carts = await this.getCarrito()
        const index = carts.findIndex(c => c.id === cartId)

        if(index === -1){
            throw { error : -4, descripcion : `No existe el carrito de id ${cartId}` }
        }

        const cartProducts = carts[index].productos
        const prod = cartProducts.find(p => p.id === prodId)

        if(!prod){
            throw {descripcion : `No existe el producto de id ${prodId}` }
        }

        carts[index].productos = cartProducts.filter(p => p.id !== prodId)

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))    
            return prod
        }
        catch {
            throw {descripcion : 'No se pudo modificar el archivo de carritos' }
        }
    }    
}

module.exports = CarritoManager