import express from "express"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productsController.js"

const route = express.Router()

route
    .post("/", createProduct)
    .get("/", getProducts)
    .put("/edit/:id", updateProduct)
    .delete("/delete/:id", deleteProduct)

export default route;