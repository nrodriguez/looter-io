import { Marketplace } from '../marketplace';
import axios from 'axios'

type TransformedItem = {
  name: '',
  photoUrl: '',
  price: '',
  originalPrice: ''
  brand: ''
}

type MercariItem = {
  name: '',
  photos: [{
    thumbnail: ''
  }],
  price: '',
  originalPrice: '',
  brand: {
    name: ''
  }
}

export class Mercari implements Marketplace {


  async search(queryParams: string):  Promise<any>{ 
    // eslint-disable-next-line no-console
    console.log('BEFORE Fetch');
    const options = {
      method: 'GET',
      url: 'https://mercari.p.rapidapi.com/Mercari/Search',
      params: {page: '1', query: queryParams},
      headers: {
        'x-rapidapi-key': 'lEvi2CMgUeDRWqaClWeNGByxWI5LZBjL',
        'x-rapidapi-host': 'mercari.p.rapidapi.com'
      }
    };
    
    const resp =  await axios.request(options as any)
    // eslint-disable-next-line no-console
    // console.log('MERCARI', resp.data)

    const searchResults = this.transformData(resp.data)
    console.log('Transformed', searchResults)
    return {
        mercari: searchResults
    }
  }

  transformData(rawResults: Array<any>): Array<TransformedItem> {
    return rawResults.map((item: MercariItem) => {
      return {
        name: item.name,
        photoUrl: item.photos[0].thumbnail,
        price: item.price,
        originalPrice: item.originalPrice,
        brand: item.brand.name
      }
    })
  }
}