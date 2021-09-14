import { NextApiRequest, NextApiResponse } from 'next';
import { Scrapers } from '../../../lib/scrapers/index';
import capitalize from 'lodash.capitalize';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { marketplace, page, searchQuery } = req.query;

  const searchParams = {
    page,
    searchQuery,
  };

  const marketplaceName = marketplace.toString();

  try {
    const marketplaceScraper = new Scrapers[`${capitalize(marketplaceName)}`]();
    const scrapedResults = await marketplaceScraper.scrape(searchParams);

    res.status(200).json(scrapedResults);
  } catch (error) {
    if (error.message.includes('is not a constructor')) {
      res
        .status(400)
        .json(`Marketplace type "${marketplace}" is not recognized`);
    }
  }
};
