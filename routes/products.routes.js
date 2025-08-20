import express from "express"
import { createProduct } from "../controllers/productsController.js"

const route = express.Router()

route.post("/", createProduct)

export default route;