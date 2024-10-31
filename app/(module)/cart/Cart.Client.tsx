"use client"

import { useEffect, useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { fallbackImage } from "services/api/api"
import { useCartStore } from "@utils/providers/CartStore.Providers"

export default function Cart() {
  const { items, addToCart, removeItem, removeFromCart } = useCartStore((state) => state)
  const [cartItems, setCartItems] = useState<ProductProps[]>([])

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price - item.price * (item.discountPercentage / 100)) * item.count!,
    0
  )

  // + useEffect call to calculate cart items
  useEffect(() => {
    const uniqueProducts = items.reduce((acc: ProductProps[], item) => {
      const found = acc.find((prod) => prod.id === item.id)
      if (found) {
        found.count! += 1
      } else {
        acc.push({ ...item, count: 1 })
      }
      return acc
    }, [])
    console.log("Debug Cart Items", uniqueProducts)
    setCartItems(uniqueProducts)
  }, [items])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center space-x-4 py-4">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    height={400}
                    width={300}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-500">
                        ৳ {Number(item.price - item.price * (item.discountPercentage / 100)).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">৳ {item.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      disabled={item.count! <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.count}</span>
                    <Button variant="outline" size="icon" onClick={() => addToCart(item)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 text-xl font-semibold sm:mb-0">Subtotal: ৳{subtotal.toFixed(2)}</div>
          <Button className="w-full sm:w-auto" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
