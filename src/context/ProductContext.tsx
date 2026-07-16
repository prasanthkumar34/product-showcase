import { createContext, useEffect, useReducer, type ReactNode } from 'react'
import type { Product } from '../types/product'
import { getAllProducts } from '../services/productService'

type ProductState = {
  products: Product[]
  loading: boolean
  error: string | null
}

type ProductAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_ERROR'; payload: string }

type ProductContextValue = ProductState & {
  refetch: () => Promise<void>
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
}

function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { products: action.payload, loading: false, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const ProductContext = createContext<ProductContextValue | null>(null)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState)

  async function fetchProducts() {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await getAllProducts()
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load products'
      dispatch({ type: 'FETCH_ERROR', payload: message })
    }
  }

  useEffect(() => {
    void fetchProducts()
  }, [])

  return (
    <ProductContext.Provider value={{ ...state, refetch: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  )
}
