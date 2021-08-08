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
      //We hit a rate limiting error or something, just return no results for now
      return []
    }
  }

  private transformPrice(originalPrice: string) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })

    //Mercari API prices comes back with two extra 00's on them
    //Remove that first by dividing by 100
    const fixedPrice = parseInt(originalPrice) / 100

    //Format fixed price to show with proper us currency
    return formatter.format(fixedPrice)
  }

  transformData(rawResults: Array<any>): Array<TransformedItem> {
    return rawResults.map((item: MercariItem) => {
      return {
        name: item.name,
        photoUrl: item.photos[0].thumbnail, //.split("?")[0],
        price: this.transformPrice(item.price),
        originalPrice: this.transformPrice(item.originalPrice),
        brand: item.brand.name,
        merchant: 'mercari',
      }
    })
  }
}
