import { Marketplace, TransformedItem } from '../marketplace';
import amazonPaapi from 'amazon-paapi';

// type AmazonPrice = {
//   value: string;
//   currency: string;
// };

// type AmazonThumbnailImages = [
//   {
//     imageUrl: string;
//   }
// ];

// type AmazonItem = {
//   title: string;
//   price: AmazonPrice;
//   marketingPrice: any;
//   thumbnailImages: AmazonThumbnailImages;
//   itemWebUrl: string;
// };

export class Amazon extends Marketplace {
  amazon: amazonPaapi;

  constructor() {
    super();
    this.amazon = amazonPaapi;
  }

  async search(queryParams: string): Promise<Array<TransformedItem>> {
    const commonParameters = {
      AccessKey: process.env.AMAZON_ACCESS_KEY,
      SecretKey: process.env.AMAZON_SECRET_KEY,
      PartnerTag: process.env.AMAZON_PARTNER_TAG, // yourtag-20
      PartnerType: 'Associates', // Default value is Associates.
      Marketplace: 'www.amazon.com', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
    };

    const requestParameters = {
      Keywords: queryParams,
      SearchIndex: 'All', //Maybe we add the ability for category search for all api's?
      ItemCount: 10,
      Resource: [
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'Offers.Listings.Price',
      ],
    };
    console.log(commonParameters, requestParameters);
    const results = await amazonPaapi.SearchItems(commonParameters, requestParameters);
    return this.transformData(results);
  }

  transformData(rawResults: Array<any>): Array<TransformedItem> {
    console.log('R', rawResults);
    return [];
    // return rawResults.map((item: EbayItem) => {
    //   return {
    //     name: item.title,
    //     photoUrl: item.thumbnailImages[0].imageUrl,
    //     price: this.transformPrice(item.price.value),
    //     originalPrice: '', //item.marketingPrice.originalPrice.value,
    //     brand: '',
    //     merchant: 'EBay',
    //     url: item.itemWebUrl,
    //   };
    // });
  }
}
