import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pageobjects/HomePage";
import { LeadListPage } from "../pageobjects/LeadListPage";
import { LeadPage } from "../pageobjects/LeadPage";
import { SalesforceDataPage } from "../pageobjects/SalesforceDataPage";

type AppFixtures = {
  homePage: HomePage;
  leadListPage: LeadListPage;
  leadPage: LeadPage;
  salesforceDataPage: SalesforceDataPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  leadListPage: async ({ page }, use) => {
    await use(new LeadListPage(page));
  },
  leadPage: async ({ page }, use) => {
    await use(new LeadPage(page));
  },
  salesforceDataPage: async ({ page }, use) => {
    await use(new SalesforceDataPage(page));
  },
});

export { expect };
