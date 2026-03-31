import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../form/FormInput"
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";


type AddressProps = {
    name: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    isDefault?: boolean
}

const CartAddAddress = ({ fetchAddress }: { fetchAddress: () => Promise<void> }) => {
    const [isOpen, setIsOpen] = useState(false)

    const addressSchema = z.object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters"),

        address: z
            .string()
            .min(5, "Address is too short"),

        city: z
            .string()
            .min(2, "City is required"),

        state: z
            .string()
            .min(2, "State is required"),

        zip: z
            .string()
            .min(5, "Zip must be at least 5 digits")
            .max(6, "Zip must be at most 6 digits"),

        phone: z
            .string()
            .min(10, "Phone must be 10 digits")
            .max(10, "Phone must be exactly 10 digits"),
        isDefault: z.boolean().optional()
    });

    const { register, control, formState: { errors, isSubmitting }, reset, handleSubmit } = useForm({
        resolver: zodResolver(addressSchema), defaultValues: {
            isDefault: false
        }
    })

    const addAddress = async (formData: AddressProps) => {
        try {
            const response = await fetch("/api/address/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed request");
            }
            const responseData = await response.json()
            toast.success(responseData?.message, {
                position: "bottom-right",
            })
            fetchAddress()
            setIsOpen(false)
            reset()
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error, "Error while adding new Address")
        }
    }

    return (
        <>
            <Toaster />
            <Sheet open={isOpen} onOpenChange={() => { setIsOpen(!isOpen); reset() }}>
                <SheetTrigger asChild>
                    <Button variant="outline" className='py-5 border border-shop_light_green hover:bg-shop_btn_dark_green hover:text-white hoverEffect'>Add New Address</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className='mt-20'>
                        <SheetTitle>Add new address</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit(addAddress)} className="flex flex-col justify-between h-full">
                        <div className="grid flex-1 auto-rows-min gap-5 px-4">
                            <FormInput id="sheet-demo-name" name="name" label="Name" register={register} error={errors.name} />
                            <FormInput id="sheet-demo-address" name="address" label="Address" register={register} error={errors.address} />
                            <FormInput id="sheet-demo-city" name="city" label="City" register={register} error={errors.city} />
                            <FormInput id="sheet-demo-state" name="state" label="State" register={register} error={errors.state} />
                            <FormInput id="sheet-demo-zip" name="zip" label="zip" register={register} error={errors.zip} />
                            <FormInput id="sheet-demo-phone" name="phone" label="Phone" register={register} error={errors.phone} />

                            <div className="grid gap-3">
                                <FieldGroup>
                                    <Field orientation="horizontal">
                                        <Controller
                                            name="isDefault"
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    id="terms-checkbox-invalid"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            )}
                                        />
                                        <FieldLabel htmlFor="terms-checkbox-invalid">
                                            Make Default
                                        </FieldLabel>
                                    </Field>
                                </FieldGroup>
                            </div>
                        </div>
                        <SheetFooter>
                            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Save changes"}</Button>
                            <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet></>
    )
}

export default CartAddAddress