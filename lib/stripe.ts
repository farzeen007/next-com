import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Error finding stripe secret key")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" })

export default stripe