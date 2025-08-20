import express from "express"
import dotenv from "dotenv"

import { dbConection } from "./database/dbConection.js"

import productRoutes from "./routes/products.routes.js"

const server = express();

const api = async () => {
    dotenv.config()

    await dbConection()

    server.use(express.json())

    server.use("/api/products", productRoutes)

    server.listen(process.env.PORT, () => console.log("Servidor corriendo en el puerto", process.env.PORT))
}

api()