import mongoose from "mongoose"


export const dbConection = async () => {
    try {
        const mongoDB = await mongoose.connect(process.env.BASE_URL_DB)
        console.log("Se conectó satisfatoriamente a la BD de: ", mongoDB.connections[0].name)
    } catch (error) {
        console.error("Error al conectar la BD.")
        throw Error(error)
    }
}