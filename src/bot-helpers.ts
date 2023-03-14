import playwright from 'playwright';

export const getOffers = async (page: playwright.Page) => {
  return await page.$$eval('article[data-role="offer"]', async (sections) => {
    return sections.map((offer) => {
      const title = offer.querySelector('h2');
      const url = title?.querySelector('a');
      const price = offer.querySelector('[aria-label*="cena"]');

      return {
        title: title?.innerText,
        url: url?.href,
        price: price?.textContent,
      };
    });
  });
};

export const acceptConsent = async (page: playwright.Page, delay: number) => {
  await page.click('button[data-role="accept-consent"]', { delay });
};

export const goToNextPage = async (
  page: playwright.Page,
  currentPageNumber: number,
  delay: number
) => {
  await page.click('a[rel="next"]', { delay });
  await page.waitForSelector(
    `input[data-role="page-number-input"][value="${currentPageNumber + 1}"]`
  );
};
