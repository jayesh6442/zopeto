


import axios from "axios"
import { cookies } from "next/headers"
async function getMyOrder() {
    const token = (await cookies()).get('token')?.value
    if (!token) {
        throw new Error("No authentication token found ")
    }
    const response = await axios.get("http://localhost:3000/api/v1/order/myorder", {
        headers: {
            Authorization: `${token}`,
        }
    })
    if (response.status !== 200) {
        throw new Error("Failed to fetch items")
    }
    return response.data.orders
}




const GetMyOrder = async () => {
    const myOrder = await getMyOrder()
    return (
        <div>
            <h1>{JSON.stringify(myOrder)}</h1>


        </div>
    )
}

export default GetMyOrder