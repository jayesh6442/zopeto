import React from 'react'
import { Card } from './ui/card'

const OrderCardInner = ({ name, status, deliveryAddress, totalPrice, bid }: { name: string, status: string, deliveryAddress: string, totalPrice: number, bid: number }) => {
    return (
        <Card className="flex flex-col gap-4 p-6 bg-red-500 text-black mt-4">
            <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <BanknoteIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{name}</h3>
            </div>
            <div className="text-4xl font-bold">₹{totalPrice}</div>
            <p className=" md:text-xl">{status}</p>
            <p className="md:text-xl">{deliveryAddress}</p>
            <p className="md:text-xl">Biding: {bid}</p>
        </Card>
    )
}


function BanknoteIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
        </svg>
    )
}

export default OrderCardInner

