import { test as base, expect } from "@playwright/test";
import { CommonPage } from "../pageobjects/CommonPage";
import { HomePage } from "../pageobjects/HomePage";
import { LeadListPage } from "../pageobjects/LeadListPage";
import { LeadPage } from "../pageobjects/LeadPage";

type AppFixtures = {
  commonPage: CommonPage;
  homePage: HomePage;
  leadListPage: LeadListPage;
  leadPage: LeadPage;
};

export const test = base.extend<AppFixtures>({
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  leadListPage: async ({ page }, use) => {
    await use(new LeadListPage(page));
  },
  leadPage: async ({ page }, use) => {
    await use(new LeadPage(page));
  },
});

export { expect };
