'use client'
import { useCartStore } from "@/store/store"
import { Check, Home, Package, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { AnimatePresence, motion } from "motion/react";

const page = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const orderId = searchParams.get("orderId")
    const { resetCart } = useCartStore()

    useEffect(() => {
        if (sessionId) {
            resetCart()
        }
    }, [resetCart])

    return <motion.section className="h-[75vh] my-10 lg:my-0 flex justify-center items-center" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
    >
        <div className="flex flex-col gap-10  shadow-2xl p-5 rounded-lg max-w-xl">
            <motion.div className="bg-black rounded-full p-5 mx-auto" initial={{ scale: 0 }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.6, ease: "easeOut" }}><Check color="white" size={50} /></motion.div>
            <h2 className="text-center text-2xl font-semibold">Order Confirmed!</h2>
            <p className="text-black/40 font-semibold">Thankyou for your purchase. We're processing your order and will ship it soon. A confirmation mail with your order details will be sent to your inbox soon.</p>
            <div><span className="text-black/40 font-semibold">Order number :</span><span className="text-base font-semibold">{orderId ? orderId : "N/A"}</span></div>
            <div className="flex flex-col lg:flex-row justify-between gap-5 items-stretch">
                <Link href="/" className="bg-black text-white py-3 px-8 text-center  rounded-lg flex-1 font-semibold flex items-center justify-center gap-2 hover:scale-110 hoverEffect"><Home size={18} />Home</Link>
                <Link href="/orders" className="border border-black/20 py-3 px-8 text-center rounded-lg flex-1 font-semibold flex items-center justify-center gap-2 hover:scale-110 hoverEffect"><Package size={18} />Orders</Link>
                <Link href="/shop" className="bg-black text-white py-3 px-8 text-center rounded-lg flex-1 font-semibold flex items-center justify-center gap-2 hover:scale-110 hoverEffect"><ShoppingBag size={18} />Shop</Link>
            </div>
        </div>
    </motion.section>
}

export default page