import fs from "fs"
import { Products } from "../models/Products.js"
import { Images } from "../models/Images.js"

export const createProduct = async (req, res) => {
    const {body, file} = req

    try {

        if (!file) {
            return res.status(400).json({
                ok: false,
                msg: "La imagen no se guardó correctamente."
            })
        }

        const prod = await Products.findOne({name: body.name})

        if (prod) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un producto con este nombre."
            })
        }

        const imageBuffer = fs.readFileSync("./" + file.path)

        const image = await Images.create({
            fileName: file.filename,
            img: {
                data: imageBuffer,
                contentType: "image/png"
            }
        })

        if (!image) {
            return res.status(400).json({
                ok: false,
                msg: "La imagen no se guardó correctamente."
            })
        }

        const newProd = await Products.create({
            ...body,
            img: `${process.env.BASE_URL_API}/images/${image._id}`
        })

        fs.rm("./" + file.path, error => {
            if (error) console.log("Lo sentimos, no hemos podido eliminar la imagen temporal")
            else console.log("El archivo se eliminó correctamente.")
        })

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

export const getProducts = async (req, res) => {

    const { query } = req; // name pageNumber documentsPerPage

    const documentsPerPage = parseInt(query.documentsPerPage) || 20;
    const skip = ((parseInt(query.pageNumber) || 1) - 1) * documentsPerPage

    try {

        const queryRegExp = query.name ? { name: new RegExp(query.name, "i") } : undefined

        const totalDocs = await Products.countDocuments({
            ...queryRegExp,
            deletedAt: { $in: [null, undefined] }
        })

        const products = await Products.find({
            ...queryRegExp,
            deletedAt: { $in: [null, undefined] }
        })
            .skip(skip)
            .limit(documentsPerPage)

        res.json({
            ok: true,
            products,
            pageNumber: parseInt(query.pageNumber) || 1,
            totalPages: Math.ceil(totalDocs / documentsPerPage)
        })
        
    } catch (error) {
        console.log("Error interno:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor."
        })
    }
}

export const updateProduct = async (req, res) => {
    const { params: {id}, body } = req;
    try {
        const existProduct = await Products.findById(id)

        if (!existProduct || existProduct.deletedAt) {
            return res.status(404).json({
                ok: false,
                msg: "El producto no existe."
            })
        }

        const newProduct = await Products.findByIdAndUpdate(
            id,
            body,
            { new: true }
        )

        res.json({
            ok: true,
            msg: "Producto modificado correctamente",
            product: newProduct
        })
    } catch (error) {
        console.log("Error interno:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor."
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { params: {id} } = req;

    try {
        const existProduct = await Products.findById(id)

        if (!existProduct || existProduct.deletedAt) {
            return res.status(404).json({
                ok: false,
                msg: "El producto no existe."
            })
        }

        await Products.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        )

        res.json({
            ok: true,
            msg: "Producto eliminado correctamente",
        })
    } catch (error) {
        console.log("Error interno:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor."
        })
    }

}