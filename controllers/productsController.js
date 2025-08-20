import { Products } from "../models/Products.js"


export const createProduct = async (req, res) => {
    const {body} = req

    try {

        const prod = await Products.findOne({name: body.name})

        if (prod) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un producto con este nombre."
            })
        }

        const newProd = await Products.create(body)

        res.json({
            ok: true,
            msg: "Producto creado correctamente.",
            product: newProd
        }) 
    } catch (error) {
        console.log("Error interno:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor."
        })
    }
}