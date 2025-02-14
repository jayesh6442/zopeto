import axios from "axios"
import { cookies } from "next/headers"
import OrderCardInner from "./OrderCardInner";

interface Order {
    _id: string;
    userOf: {
        name: string;
    };
    status: string;
    deliveryAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    totalPrice: number;
    bid: number;
    createdAt: string;
}

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
    console.log(myOrder)
    return (
        <div>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Orders</h1>
            </div>
            {myOrder.map((order: Order) => (
                <OrderCardInner
                    key={order._id}
                    name={order.userOf.name}
                    status={order.status}
                    deliveryAddress={`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.zip}`}
                    totalPrice={order.totalPrice}
                    bid={order.bid}
                />
            ))}

        </div>
    )
}


export default GetMyOrder