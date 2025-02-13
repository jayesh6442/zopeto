import { NavigationBar } from "@/components/NavigationBar"
import { Toaster } from "@/components/ui/toaster"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavigationBar />
            {children}
            <Toaster />
        </div>
    )
}

export default layout