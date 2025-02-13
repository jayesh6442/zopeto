"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"





const AddItemToMenu = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Add Item to Menu</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                price
                            </Label>
                            <Input id="username" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <DialogFooter>
                        <Button onClick={() => {
                            axios.post("http://localhost:3000/api/v1/items/create", {
                                name,
                                description,
                                price
                            }).then((response) => {
                                console.log(response.data)
                                window.location.href = "/dashboard"
                            }).catch((error) => {
                                console.log(error)
                                setError(error.response.data.message)
                            })
                        }} type="submit" >Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog></div>
    )
}

export default AddItemToMenu