import type { Locator, Page } from "@playwright/test";
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

export class CommonPage {
  private static readonly L = {
    validationErrorAppearsForCompanyField: { strategy: 'css' as const, value: 'text=/Complete this field|required/i', actionKind: 'generic' as const },
  } as const;

  constructor(private readonly page: Page) {}


  async clickValidationErrorAppearsForCompanyField(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField));
  }

  async doubleClickValidationErrorAppearsForCompanyField(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField));
  }

  async longPressValidationErrorAppearsForCompanyField(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField));
  }

  async expectValidationErrorAppearsForCompanyFieldVisible(timeoutMs = 30_000): Promise<void> {
    await expectVisible(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), expected, timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), substring, timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), value, timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), timeoutMs);
  }

  async expectValidationErrorAppearsForCompanyFieldCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField), count, timeoutMs);
  }

  async scrollValidationErrorAppearsForCompanyFieldIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, CommonPage.L.validationErrorAppearsForCompanyField));
  }

}
