// import axios from "axios"
// import Cookie from 'js-cookie'
// async function getCart() {
//     const token = await Cookie.get("token")
//     const response = await axios.get("http://localhost:3000/api/v1/cart/mycart", {
//         headers: {
//             Authorization: `${token}`,
//         }
//     })

//     if (response.status !== 200) {
//         throw new Error("Failed to fetch items")
//     }
//     return response.data.cart
// }
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// const CartItem = async () => {
//     const cart = await getCart()
//     return (
//         <Table>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[100px]">Price</TableHead>
//                     <TableHead>name</TableHead>
//                     <TableHead>Description</TableHead>
//                     <TableHead className="text-right">Action</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {cart.items.map((item: { _id: string; price: number; name: string; description: string; quantity: number }) => (
//                     <TableRow key={item._id}>
//                         <TableCell className="font-medium">{item.price}</TableCell>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.description}</TableCell>
//                         <TableCell className="text-right">{item.quantity}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table >
//     )
// }

// export default CartItem


import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cookies } from 'next/headers';
async function getCart() {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        throw new Error("No authentication token found ");
    }

    try {
        const response = await axios.get("http://localhost:3000/api/v1/cart/mycart", {
            headers: {
                Authorization: `${token}`,

            },

        });

        return response.data.cart;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw new Error("Failed to fetch cart items");
    }
}
interface Cart {
    _id: string;
    itemId: {
        _id: string;
        name: string;
        description: string;
        price: number;
    };
    quantity: number;

}
const CartItem = async () => {
    let cart;

    try {
        cart = await getCart();
    } catch (error) {
        console.log(error);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Price</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.items.map((item: Cart) => (
                    <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.itemId.price}</TableCell>
                        <TableCell>{item.itemId.name}</TableCell>
                        <TableCell>{item.itemId.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CartItem;

