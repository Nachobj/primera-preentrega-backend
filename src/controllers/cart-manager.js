const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultimoId = 0;

        this.cargarCarrito();
    }

    async cargarCarrito() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if(this.carts.length > 0) {
                this.ultimoId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.error("Error al crear los carritos: ", error);

            await this.guardarCarrito();
        }
    }

    async guardarCarrito() {
        await fs.readFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.ultimoId,
            productos: []
        }

        this.carts.push(nuevoCarrito);

        await this.guardarCarrito();
    }

    async getCarritoById(carritoId) {
        try {
            const carrito = this.carts.find(ci => ci.id === carritoId);
            if(!carrito) {
                console.log("No hay carrito con ese id");
                return;
            }
            return carrito;

        } catch (error) {
            console.error("Ocurrio un error al obtener un carrito por id: ", id);
        }
    }   

    async agregarProductoAlCarrito(carritoId, productoId, quantity) {
        const carrito = await this.getCarritoById(carritoId);
        const exProducto = carrito.products.find(p => p.product === productoId);

        if(exProducto) {
            exProducto.quantity += quantity;
        } else {
            carrito.products.push({product: productoId, quantity});
        }

        await this.guardarCarrito();
        return carrito;
    }
}

module.exports = CartManager;