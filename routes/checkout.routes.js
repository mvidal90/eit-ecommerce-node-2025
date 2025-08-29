import { Router } from "express";
import { createCheckoutPreference } from "../controllers/checkoutController.js";

const route = Router()

route.post("/", createCheckoutPreference)

export default route