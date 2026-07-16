export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  shortDescription: string
  longDescription: string
  specs: Record<string, string>
  rating: number
  stock: number
}
