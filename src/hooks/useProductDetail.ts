import { useEffect, useReducer } from 'react'
import type { Product } from '../types/product'
import { getProductById } from '../services/productService'

type State = {
  product: Product | null
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product }
  | { type: 'FETCH_ERROR'; payload: string }

const initialState: State = {
  product: null,
  loading: false,
  error: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { product: null, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { product: action.payload, loading: false, error: null }
    case 'FETCH_ERROR':
      return { product: null, loading: false, error: action.payload }
    default:
      return state
  }
}

export function useProductDetail(productId: number) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!Number.isFinite(productId) || productId <= 0) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Product not found' })
        return
      }

      dispatch({ type: 'FETCH_START' })

      try {
        const product = await getProductById(productId)
        if (cancelled) return

        if (!product) {
          dispatch({ type: 'FETCH_ERROR', payload: 'Product not found' })
          return
        }

        dispatch({ type: 'FETCH_SUCCESS', payload: product })
      } catch (err) {
        if (cancelled) return
        const message = err instanceof Error ? err.message : 'Failed to load product'
        dispatch({ type: 'FETCH_ERROR', payload: message })
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [productId])

  return state
}
