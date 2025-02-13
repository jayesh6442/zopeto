import axios from "axios"
interface Item {
    _id: string;
    price: string;
    name: string;
    description: string;
    amount: string;
}

async function getItems() {
    const response = await axios.get("http://localhost:3000/api/v1/items/getall")

    if (response.status !== 200) {
        throw new Error("Failed to fetch items")
    }
    return response.data.items
}
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AddToCartButton from "./AddToCartButton";
const ItemsMenu = async () => {
    const items = await getItems()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Price</TableHead>
                    <TableHead>name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item: Item) => (
                    <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.price}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">
                            <AddToCartButton item={item._id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    )
}

export default ItemsMenu



// import axios from "axios";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { Button } from "./ui/button";

// interface Item {
//     _id: string;
//     price: string;
//     name: string;
//     description: string;
// }

// async function getItems() {
//     const response = await axios.get("http://localhost:3000/api/v1/items/getall");

//     if (response.status !== 200) {
//         throw new Error("Failed to fetch items");
//     }

//     return response.data.items;
// }

// const ItemsMenu = async () => {
//     const items = await getItems(); // Server fetch before rendering

//     return (
//         <Table>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[100px]">Price</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Description</TableHead>
//                     <TableHead className="text-right">Action</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {items.map((item: Item) => (
//                     <TableRow key={item._id}>
//                         <TableCell className="font-medium">{item.price}</TableCell>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.description}</TableCell>
//                         <TableCell className="text-right">
//                             <form action="/api/cart/add" method="POST">
//                                 <input type="hidden" name="itemId" value={item._id} />
//                                 <Button type="submit">Add to cart</Button>
//                             </form>
//                         </TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     );
// };

// export default ItemsMenu;
