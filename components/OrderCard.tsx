/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dkOVQFGfhKC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import OrderCardInner from "./OrderCardInner";

interface OrderCardProps {
  name: string;
  status: string;
  deliveryAddress: string;
  totalPrice: number;
}

export default function OrderCard({ name, status, deliveryAddress, totalPrice }: OrderCardProps) {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Orders</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <OrderCardInner name={name} status={status} deliveryAddress={deliveryAddress} totalPrice={totalPrice} />
          </div>
        </div>
      </main>
    </div>
  )
}
