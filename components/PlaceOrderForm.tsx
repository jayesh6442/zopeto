'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

// Add this interface near the top of the file
interface Address {
    _id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

const PlaceOrderForm = () => {
    const token = Cookies.get('token')
    const [addresses, setAddresses] = useState<Address[]>([])
    const [bid, setBid] = useState("")
    const [selectedAddressId, setSelectedAddressId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/addresses/getaddress", {
                    headers: {
                        "Authorization": token,
                        'Content-Type': 'application/json',
                    },
                })
                setAddresses(response.data.address)
            } catch (error) {
                console.error('Error fetching addresses:', error)
            }
        }

        fetchAddresses()
    }, [token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (!selectedAddressId) {
            alert('Please select an address')
            setIsLoading(false)
            return
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/order/order", {
                bid: parseInt(bid),
                deliveryAddress: selectedAddressId,
            }, {
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json',
                },
            })

            if (response.status !== 201) {
                throw new Error('Failed to place order')
            }

            // Clear form and show success
            setBid("")
            alert('Order placed successfully!')
            window.location.href = "/myorder"
        } catch (error) {
            console.error('Error placing order:', error)
            alert('Failed to place order. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-medium  mb-3">Your Addresses</h2>
                {addresses.length > 0 ? (
                    <ul className="space-y-2">
                        {addresses.map((address: Address) => (
                            <li
                                key={address._id}
                                className={`p-3 rounded-md cursor-pointer border-2 ${selectedAddressId === address._id
                                    ? 'border-indigo-600 '
                                    : 'border-transparent hover:border-gray-300'
                                    }`}
                                onClick={() => setSelectedAddressId(address._id)}
                            >
                                <p>{address.street}</p>
                                <p>{address.city}, {address.state} {address.zipCode}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No addresses found <a href="/address">add here</a></p>
                )}
            </div>
            <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="bid" className="block text-sm font-medium text-gray-700">
                            Your Bid
                        </label>
                        <input
                            type="number"
                            id="bid"
                            value={bid}
                            onChange={(e) => setBid((e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter your bid amount"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrderForm
