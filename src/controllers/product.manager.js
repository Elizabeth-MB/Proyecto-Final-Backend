let products = []

class ProductManager {
    getAll = () => {
        return products
    }

    getById  = (id) => {
        id = parseInt(id)
        return products.find(item => item.id === id)
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
        id = parseInt(id)
        let newProducts = products.map(item => {
            if (item.id === id) {
                return {
                    id,
                    ...product
                }
            } else return item
        })
        products = newProducts
        return this.getById(id)
    }

    delete = (id) => {
        id = parseInt(id)
        let newProducts = products.filter(item => item.id !== id)
        products = newProducts
        return products
    }
}

module.exports = ProductManager