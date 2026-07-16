import { useEffect, useState } from 'react'
import type { Product } from '../types/product'
import { getRelatedProducts } from '../services/productService'

export function useRelatedProducts(category: string, excludeId: number) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const items = await getRelatedProducts(category, excludeId)
        if (!cancelled) {
          setRelatedProducts(items)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setRelatedProducts([])
          setError(err instanceof Error ? err.message : 'Failed to load related products')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [category, excludeId])

  return { relatedProducts, loading, error }
}
