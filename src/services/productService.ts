import type { Product } from '../types/product'
import productsData from '../data/products.json'

export const getProducts = async (): Promise<Product[]> => {
  return productsData as Product[]
}

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await getProducts()
  return products.find((product) => product.id === id)
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const products = await getProducts()
  return products.filter((product) => product.category === category)
}
