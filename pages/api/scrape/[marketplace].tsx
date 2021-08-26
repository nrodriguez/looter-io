import { NextApiRequest, NextApiResponse } from "next";
import scraper from "../../../lib/scraper";

type MarketplaceType = {
  marketplace: string
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { marketplace } = req.query as MarketplaceType;
  const scrapedResults = scraper(marketplace);

  res.status(200).json(scrapedResults);
};
