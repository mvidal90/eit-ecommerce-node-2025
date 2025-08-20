import { model, Schema } from "mongoose";


const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    largeDescription: {
        type: String
    },
    freeDelivery: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        required: true
    },
    ageFrom: {
        type: Number,
    },
    ageTo: {
        type: Number,
    },
}, {timestamps: true})

export const Products = model("Product", ProductSchema)