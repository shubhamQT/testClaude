import type { Page } from "@playwright/test";
import {
  checkWhenVisible,
  clearWhenVisible,
  clickOpensNewPage,
  clickWhenVisible,
  closePage,
  doubleClickWhenVisible,
  expectChecked,
  expectContainsText,
  expectCount,
  expectCountGreaterThan,
  expectDisabled,
  expectEnabled,
  expectFocused,
  expectHidden,
  expectPageTitle,
  expectSelected,
  expectText,
  expectUnchecked,
  expectValue,
  expectVisible,
  fill,
  fillWhenVisible,
  getTextWhenVisible,
  goBack,
  hoverWhenVisible,
  longPressWhenVisible,
  navigateTo,
  scrollIntoView,
  scrollIntoViewWhenVisible,
  selectOptionWhenVisible,
  takeScreenshot,
  typeTextWhenVisible,
  uncheckWhenVisible,
  waitForHidden,
  waitForNewPage,
  waitForVisible,
  waitMs,
  webLocator,
} from "../support/web-actions";

export class HomePage {
  private static readonly L = {
    leads: { strategy: 'text' as const, value: 'Leads', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'generic' as const },
    sellerHome: { strategy: 'css' as const, value: '*.sellerHomeTitle', actionKind: 'text' as const },
  } as const;

  constructor(private readonly page: Page) {}

  async clickLeads(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.leads));
  }

  async expectLeadsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.leads), timeoutMs, soft);
  }

  async expectSellerHomeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sellerHome), timeoutMs, soft);
  }


  async doubleClickLeads(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.leads));
  }

  async longPressLeads(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.leads));
  }

  async expectLeadsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.leads), timeoutMs);
  }

  async expectLeadsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.leads), expected, timeoutMs);
  }

  async expectLeadsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.leads), substring, timeoutMs);
  }

  async expectLeadsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.leads), value, timeoutMs);
  }

  async expectLeadsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.leads), timeoutMs);
  }

  async expectLeadsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.leads), timeoutMs);
  }

  async expectLeadsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.leads), timeoutMs);
  }

  async expectLeadsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.leads), timeoutMs);
  }

  async expectLeadsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.leads), timeoutMs);
  }

  async expectLeadsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.leads), count, timeoutMs);
  }

  async scrollLeadsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.leads));
  }

  async clickSellerHome(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sellerHome));
  }

  async doubleClickSellerHome(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sellerHome));
  }

  async longPressSellerHome(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sellerHome));
  }

  async expectSellerHomeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sellerHome), timeoutMs);
  }

  async expectSellerHomeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sellerHome), expected, timeoutMs);
  }

  async expectSellerHomeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sellerHome), substring, timeoutMs);
  }

  async expectSellerHomeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sellerHome), value, timeoutMs);
  }

  async expectSellerHomeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sellerHome), timeoutMs);
  }

  async expectSellerHomeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sellerHome), timeoutMs);
  }

  async expectSellerHomeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sellerHome), timeoutMs);
  }

  async expectSellerHomeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sellerHome), timeoutMs);
  }

  async expectSellerHomeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sellerHome), timeoutMs);
  }

  async expectSellerHomeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sellerHome), count, timeoutMs);
  }

  async scrollSellerHomeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sellerHome));
  }
}
