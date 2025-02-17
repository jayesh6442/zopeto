"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import Cookie from "js-cookie"
const Page = () => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [error, setError] = useState("");
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-4 py-20">

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Street flat no</Label>
                                <Input id="name" placeholder="Enter Your street flat no" type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">city</Label>
                                <Input id="email" placeholder="Enter Your city" type="email" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">state</Label>
                                <Input id="password" placeholder="Enter Your state" value={state} onChange={(e) => setState(e.target.value)} />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">zipCodeF</Label>
                                <Input id="password" placeholder="Enter Your zip " value={zip} onChange={(e) => setZip(e.target.value)} />                        </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/addresses/create", {
                            street,
                            city,
                            state,
                            zip
                        },
                            {
                                headers: {
                                    Authorization: `${Cookie.get("token")}`
                                }
                            }
                        ).then((response) => {
                            console.log(response.data)
                            Cookie.set("token", response.data.token)
                            window.location.href = "/dashboard"
                        }).catch((error) => {
                            console.log(error)
                            setError(error.response.data.message)
                        })
                    }}>Add Address</Button>
                </CardFooter>
            </Card>
        </div >
    )
}

export default Page

