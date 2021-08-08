export type TransformedItem = {
  name: string
  photoUrl: string
  price: string
  originalPrice: string
  brand: string
  merchant: string
}

export interface Marketplace {
  search(queryParams: string): Promise<Array<TransformedItem>>
}
