import playwright from 'playwright';

export class AllegroBot {
  private currentPageNumber: number;

  constructor(
    private page: playwright.Page,
    private readonly buttonActionsDelay: number = 5000
  ) {
    this.currentPageNumber = 1;
  }

  get currentPage(): number {
    return this.currentPage;
  }

  async openPage(pageUrl: string) {
    await this.page.goto(pageUrl);
  }

  async acceptConsent() {
    await this.page.click('button[data-role="accept-consent"]', {
      delay: this.buttonActionsDelay,
    });
  }

  async getOffers() {
    return await this.page.$$eval(
      'article[data-role="offer"]',
      async (sections) => {
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
      }
    );
  }

  async goToNextPage() {
    await this.page.click('a[rel="next"]', { delay: this.buttonActionsDelay });
    await this.page.waitForSelector(
      `input[data-role="page-number-input"][value="${
        this.currentPageNumber + 1
      }"]`
    );
    ++this.currentPageNumber;
  }
}
