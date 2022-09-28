import { fs } from 'fs'
// const fs = require('fs')

// Trabajando con persistencia en archivos
const pathToFile = '../data/products.json'

class ProductManager {
    
    // Permite listar todos los productos disponibles (Disponible para usuarios y administradores)
    getAll = async () => {
        let products = []
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                products = JSON.parse(data)
            }
            return products
        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }
    }

    // Permite listar un producto por su ID (Disponible para usuarios y administradores)
    getById = async (id) => {
        try {

            if (!id) return { status: "error", message: "id required" };
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let product = products.find((product) => product.id === id);
                if (product) return { status: "success", message: product };
                return { status: "error", message: "product not found" };
            } else {
                return { status: "error", message: err.message };
            }

        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }
    }

    // POST: '/' - Permite incorporar productos al listado (Disponible para administradores)
    create = async (product) => {
        try {
            if (fs.existsSync(pathToFile)) {

                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let id = products[products.length - 1].id + 1;
                product.id = id;
                products.push(product);
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify(products, null, 2)
                );
                return {
                    status: "success",
                    message: `Product added with id ${product.id}`,
                };
            } else {
                product.id = 1;
                // Pasamos el producto como array
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify([product], null, 2)
                );
                return {
                    status: "success",
                    message: `Product Added with id ${product.id}`,
                };
            }
        } catch (err) {
            return { status: "error", message: err.message };
        }
    }

    // PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
    update = (id, product) => {
        try {

        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }
    }

    // DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
    delete = async (id) => {
        try {

            if (!id) return { status: "error", message: "id required" };
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let newProducts = products.filter((product) => product.id !== id);

                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify(newProducts, null, 2)
                );
                return {
                    status: "success",
                    message: "Product deleted",
                };
            } else {
                return { status: "error", message: err.message };
            }

        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }
    }
}

export default ProductManager
// module.exports = ProductManager