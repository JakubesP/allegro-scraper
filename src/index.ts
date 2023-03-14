import playwright from 'playwright';
import { Offer } from './models/offer';
import { stringify } from 'csv-stringify';
import fs from 'fs';
import { config } from './config';
import { acceptConsent, getOffers, goToNextPage } from './bot-helpers';

(async () => {
  // Configure

  const { pageUrl, pagesNumber, timestamp, buttonActionsDelay, headless } =
    await config();

  const browser = await playwright['firefox'].launch({
    headless,
  });

  const contex = await browser.newContext();
  const page = await contex.newPage();

  await page.goto(pageUrl);
  await acceptConsent(page, buttonActionsDelay);

  // Scrape data and save to the database

  for (let i = 1; i <= pagesNumber; ++i) {
    const offers = await getOffers(page);
    if (!offers.length) throw new Error('Cannot get any offers');

    console.log(`Loaded ${offers.length} offers from page ${i}`);

    await Offer.create(
      offers.map((offer) => ({ ...offer, extractionTimestamp: timestamp }))
    );

    if (i < pagesNumber) await goToNextPage(page, i, buttonActionsDelay);
  }

  // Retrieve & export data

  const offers = await Offer.find({ extractionTimestamp: timestamp });

  if (offers) {
    const columns = { title: 'title', url: 'url', price: 'price' };
    const data = offers.map((offer) => ({
      title: offer.title,
      url: offer.url,
      price: offer.price,
    }));

    stringify(data, { header: true, columns }, (err, output) => {
      if (err) throw err;
      fs.writeFile(`${timestamp}.csv`, output, (err) => {
        if (err) throw err;
        console.log('CSV file saved');
      });
    });
  }
})();
