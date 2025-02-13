import AddItemToMenu from "@/components/AddItemToMenu";
import ItemsMenu from "@/components/ItemsMenu";

const Page = () => {
    return (
        <div className="p-4">
            <AddItemToMenu />
            <ItemsMenu />
        </div>
    )
}

export default Page