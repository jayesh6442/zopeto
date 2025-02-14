import CartItem from "@/components/CartItem"
import PlaceOrderForm from "../../../../components/PlaceOrderForm"

const page = () => {
    return (
        <div className="p-4">
            <CartItem />
            <PlaceOrderForm />
        </div>
    )
}

export default page