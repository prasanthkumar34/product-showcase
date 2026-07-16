import { createContext, type ReactNode } from 'react'
import type { Product } from '../types/product'

export interface ProductContextValue {
  products: Product[]
  loading: boolean
  error: string | null
}

export const ProductContext = createContext<ProductContextValue | undefined>(undefined)

interface ProductProviderProps {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const value: ProductContextValue = {
    products: [],
    loading: false,
    error: null,
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
