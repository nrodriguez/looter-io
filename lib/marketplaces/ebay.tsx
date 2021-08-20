import { Marketplace, TransformedItem } from '../marketplace';
import eBayApi from '@hendt/ebay-api';
import { LimitOffset, SearchParams } from '../search';

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
  offset: number;
  limit: number;

  constructor({offset, limit}: LimitOffset) {
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

    this.offset = offset;
    this.limit = limit;
  }

  async search(searchParams: SearchParams): Promise<Array<TransformedItem>> {
    console.log("EBAY LIMIT: ", this.limit, 'EBAY OFFSET', this.offset);
    const results = await this.ebay.buy.browse.search({ 
      q: searchParams.searchQuery,
      limit: this.limit,
      offset: this.offset
    });

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
