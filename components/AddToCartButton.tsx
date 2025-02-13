"use client"
import axios from "axios"
import { Button } from "./ui/button"
import Cookie from 'js-cookie'  // Import js-cookie instead
import { useToast } from "@/hooks/use-toast"

const AddToCartButton = ({ item }: { item: string }) => {  // Remove async
    // Get token using js-cookie
    const token = Cookie.get("token")
    const toast = useToast()
    const handleAddToCart = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/v1/cart/add",
                { itemId: item },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,  // Use token from js-cookie
                    },
                    withCredentials: true,
                }
            )
            toast.toast({
                title: "Item added to cart",
            })
            // Handle successful response
        } catch (error) {
            // Handle error
            console.error('Error adding item to cart:', error)
        }
    }

    return (
        <Button onClick={handleAddToCart}>
            Add to cart
        </Button>
    )
}

export default AddToCartButton