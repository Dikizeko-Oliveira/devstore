'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface CartItem {
  productId: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    const productInCart = cartItems.some((item) => item.productId === productId)

    if (productInCart) {
      setCartItems(
        cartItems.map((item) => {
          if (item.productId === productId) {
            item.quantity = item.quantity + 1
          }
          return item
        }),
      )
    } else {
      setCartItems([...cartItems, { productId, quantity: 1 }])
    }
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
