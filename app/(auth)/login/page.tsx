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
import useAuth from "@/hooks/useAuth"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookie from "js-cookie";
const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, router]);
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
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Enter Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Enter Your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <a className="" href="/signup"> dont have an account? Signup</a>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/users/login", {
                            email,
                            password
                        }).then((response) => {
                            console.log(response.data)
                            const token = response.data.token;
                            Cookie.set("token", token);
                            window.location.href = "/dashboard"
                        }).catch((error) => {
                            console.log(error)
                            setError(error.response.data.message)
                        })
                    }}>Login Now</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page

