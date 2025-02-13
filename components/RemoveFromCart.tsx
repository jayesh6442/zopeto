"use client"
import axios from "axios"
import { Button } from "./ui/button"
import Cookie from 'js-cookie'  // Import js-cookie instead
const RemoveFromCart = ({ item }: { item: string }) => {
    const token = Cookie.get('token')  // Use js-cookie instead of localStorage.getItem()
    return (
        <Button className="bg-red-500 text-white hover:bg-red-700" onClick={() => {
            axios.delete("http://localhost:3000/api/v1/cart/delete", {
                data: { itemId: item },
                headers: {
                    'Authorization': `${token}`
                }
            }).then((response) => {
                console.log(response.data)
                window.location.href = "/dashboard/cart"
            }).catch((error) => {
                console.log(error)
            })
        }}> Remove</Button >
    )
}

export default RemoveFromCart