import { Suspense } from "react";
import SuccessPageClient from "@/components/cart/SuccessPageClient"

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageClient />
        </Suspense>
    )
}