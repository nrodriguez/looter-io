import { Marketplace, TransformedItem } from '../marketplace';
import eBayApi from '@hendt/ebay-api';
import { SearchParams } from '../search';

type EbayPrice = {
  value: string;
  currency: string;
};

type EbayThumbnailImages = [
  {
    imageUrl: string;
  }
];

type EbayItem = {
  title: string;
  price: EbayPrice;
  marketingPrice: any;
  thumbnailImages: EbayThumbnailImages;
  itemWebUrl: string;
};

export class EBay extends Marketplace {
  ebay: eBayApi;

  constructor() {
    super();
    this.ebay = new eBayApi({
      appId: process.env.EBAY_APP_ID,
      certId: process.env.EBAY_CERT_ID,
      sandbox: false,
      scope: ['https://api.ebay.com/oauth/api_scope'],
      siteId: eBayApi.SiteId.EBAY_US, // required for traditional APIs, see https://developer.ebay.com/DevZone/merchandising/docs/Concepts/SiteIDToGlobalID.html
      marketplaceId: eBayApi.MarketplaceId.EBAY_US,
      devId: process.env.EBAY_DEV_ID, // required for traditional trading API
    });
  }

  async search(searchParams: SearchParams): Promise<Array<TransformedItem>> {
    //TODO: Add in offset logic
    const results = await this.ebay.buy.browse.search({ q: searchParams.searchQuery });
    return this.transformData(results.itemSummaries);
  }

  transformData(rawResults: Array<any>): Array<TransformedItem> {
    return rawResults.map((item: EbayItem) => {
      return {
        name: item.title,
        photoUrl: item.thumbnailImages[0].imageUrl,
        price: this.transformPrice(item.price.value),
        originalPrice: '', //item.marketingPrice.originalPrice.value,
        brand: '',
        merchant: 'EBay',
        url: item.itemWebUrl,
      };
    });
  }
}
