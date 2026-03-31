'use server'

import stripe from "@/lib/stripe"
import { urlFor } from "@/sanity/lib/image";
import { ProductTypes } from "@/store/store";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

type MetaDataProps = {
    orderId: string,
    customerName: string,
    customerEmail: string,
    clerkUserId: string,
    clerkStripeId: string,
}

export const createStripeSession = async (metadata: MetaDataProps, items: ProductTypes[]) => {
    const client = await clerkClient();
    let customerId = metadata?.clerkStripeId

    if (!customerId) {
        const newCustomer = await stripe.customers.create({
            name: metadata?.customerName,
            email: metadata?.customerEmail
        })
        customerId = newCustomer?.id
        await client.users.updateUser(metadata?.clerkUserId, {
            publicMetadata: {
                stripeCustomerId: newCustomer?.id,
            },
        })
    }
    try {
        const params: Stripe.Checkout.SessionCreateParams = {
            mode: 'payment',
            payment_method_types: ['card'],
            allow_promotion_codes: true,
            line_items:
                items.map((item: ProductTypes) => ({
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(item?.price! * 100),
                        product_data: {
                            metadata: { id: item?._id },
                            name: item?.name || "",
                            images: item?.images && item?.images.length > 0 ? [urlFor(item?.images[0])?.url()] : []
                        }
                    },
                    quantity: item?.quantity
                }))
            ,
            metadata: metadata,
            customer: customerId,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success-order?session_id={CHECKOUT_SESSION_ID}&orderId=${metadata.orderId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        };

        const session = await stripe.checkout.sessions.create(params)
        return session.url
    } catch (error) {
        throw new Error("Error while creating stripe session")
    }
}

