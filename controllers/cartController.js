import { Cart } from "../models/Cart.js"


export const createCart = async (req, res) => {
    const {body} = req

    try {

        const cart = await Cart.create(body)

        res.json({
            ok: true,
            msg: "Carrito creado correctamente.",
            cart
        }) 
    } catch (error) {
        console.log("Error interno:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor."
        })
    }
}