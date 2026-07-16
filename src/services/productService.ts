import type { Product } from '../types/product'
import { API_DELAY_MS, API_ERROR_RATE } from '../utils/constants'
import productsData from '../data/products.json'

const products = productsData as unknown as Product[]

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function withMockApi<T>(work: () => T): Promise<T> {
  await delay(API_DELAY_MS)

  if (Math.random() < API_ERROR_RATE) {
    throw new Error('Mock API request failed')
  }

  return work()
}

export function getAllProducts(): Promise<Product[]> {
  return withMockApi(() => [...products])
}

export function getProductById(id: number): Promise<Product | undefined> {
  return withMockApi(() => products.find((product) => product.id === id))
}

export function getRelatedProducts(
  category: string,
  excludeId: number,
  limit = 4,
): Promise<Product[]> {
  return withMockApi(() =>
    products
      .filter((product) => product.category === category && product.id !== excludeId)
      .slice(0, limit),
  )
}

export function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase()

  return withMockApi(() => {
    if (!q) return [...products]
    return products.filter((product) => product.name.toLowerCase().includes(q))
  })
}
