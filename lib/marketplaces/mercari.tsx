import { Marketplace, TransformedItem } from '../marketplace'
import axios from 'axios'

type MercariItem = {
  name: ''
  photos: [
    {
      thumbnail: ''
    }
  ]
  price: ''
  originalPrice: ''
  brand: {
    name: ''
  }
}

export class Mercari implements Marketplace {
  async search(queryParams: string): Promise<Array<TransformedItem>> {
    const options = {
      method: 'GET',
      url: 'https://mercari.p.rapidapi.com/Mercari/Search',
      params: { page: '1', query: queryParams },
      headers: {
        'x-rapidapi-key': 'lEvi2CMgUeDRWqaClWeNGByxWI5LZBjL',
        'x-rapidapi-host': 'mercari.p.rapidapi.com',
      },
    }

    try {
      const resp = await axios.request(options as any)
      return this.transformData(resp.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error', error)
    }
  }

  transformData(rawResults: Array<any>): Array<TransformedItem> {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })

    return rawResults.map((item: MercariItem) => {
      return {
        name: item.name,
        photoUrl: item.photos[0].thumbnail, //.split("?")[0],
        price: formatter.format(parseInt(item.price)),
        originalPrice: formatter.format(parseInt(item.originalPrice)),
        brand: item.brand.name,
        merchant: 'mercari',
      }
    })
  }
}
