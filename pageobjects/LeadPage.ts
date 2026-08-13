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
import { SalesforceDataPage } from "./salesforce-data";

// Salesforce object: Lead (schema-verified via Autonix Recorder)
export class LeadPage {
  private static readonly L = {
    lead: { strategy: 'text' as const, value: 'Lead', shadowHost: 'forcegenerated-highlightspanel_lead___012000000000000aaa___compact___view___recordlayout2', actionKind: 'text' as const },
    leadName: { strategy: 'css' as const, value: 'h1 [name="primaryField"]', shadowHost: 'forcegenerated-highlightspanel_lead___012000000000000aaa___compact___view___recordlayout2', actionKind: 'text' as const },
    activity: { strategy: 'role' as const, value: 'Activity', role: 'link', shadowHost: 'lightning-tab-bar', actionKind: 'link' as const },
    details: { strategy: 'role' as const, value: 'Details', role: 'link', shadowHost: 'lightning-tab-bar', actionKind: 'link' as const },
    openNotContacted: { strategy: 'css' as const, value: 'a[title="Open - Not Contacted"]', shadowHost: 'flexipage-aura-wrapper', actionKind: 'link' as const },
    leadStatus: { strategy: 'css' as const, value: '[field-label="Lead Status"] lightning-formatted-text', shadowHost: 'records-record-layout-item', actionKind: 'text' as const },
  } as const;

  constructor(private readonly page: Page, private readonly sfData: SalesforceDataPage = new SalesforceDataPage(page)) {}

  async expectLeadVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadPage.L.lead), timeoutMs, soft);
  }

  async getInnerTextLeadName(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadPage.L.leadName));
  }

  async clickActivity(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadPage.L.activity));
  }

  async expectActivityVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadPage.L.activity), timeoutMs, soft);
  }

  async clickDetails(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadPage.L.details));
  }

  async expectDetailsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadPage.L.details), timeoutMs, soft);
  }

  async expectOpenNotContactedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadPage.L.openNotContacted), timeoutMs, soft);
  }

  async getInnerTextLeadStatus(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadPage.L.leadStatus));
  }

  async generateLeadData() { return this.sfData.generateLeadData(); }


  async clickLead(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadPage.L.lead));
  }

  async doubleClickLead(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadPage.L.lead));
  }

  async longPressLead(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadPage.L.lead));
  }

  async expectLeadHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadPage.L.lead), timeoutMs);
  }

  async expectLeadText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadPage.L.lead), expected, timeoutMs);
  }

  async expectLeadContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadPage.L.lead), substring, timeoutMs);
  }

  async expectLeadValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadPage.L.lead), value, timeoutMs);
  }

  async expectLeadEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadPage.L.lead), timeoutMs);
  }

  async expectLeadDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadPage.L.lead), timeoutMs);
  }

  async expectLeadChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadPage.L.lead), timeoutMs);
  }

  async expectLeadUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadPage.L.lead), timeoutMs);
  }

  async expectLeadFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadPage.L.lead), timeoutMs);
  }

  async expectLeadCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadPage.L.lead), count, timeoutMs);
  }

  async scrollLeadIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadPage.L.lead));
  }

  async clickLeadName(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadPage.L.leadName));
  }

  async doubleClickLeadName(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadPage.L.leadName));
  }

  async longPressLeadName(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadPage.L.leadName));
  }

  async expectLeadNameVisible(timeoutMs = 30_000): Promise<void> {
    await expectVisible(webLocator(this.page, LeadPage.L.leadName), timeoutMs);
  }

  async expectLeadNameHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadPage.L.leadName), timeoutMs);
  }

  async expectLeadNameText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadPage.L.leadName), expected, timeoutMs);
  }

  async expectLeadNameContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadPage.L.leadName), substring, timeoutMs);
  }

  async expectLeadNameValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadPage.L.leadName), value, timeoutMs);
  }

  async expectLeadNameEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadPage.L.leadName), timeoutMs);
  }

  async expectLeadNameDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadPage.L.leadName), timeoutMs);
  }

  async expectLeadNameChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadPage.L.leadName), timeoutMs);
  }

  async expectLeadNameUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadPage.L.leadName), timeoutMs);
  }

  async expectLeadNameFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadPage.L.leadName), timeoutMs);
  }

  async expectLeadNameCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadPage.L.leadName), count, timeoutMs);
  }

  async scrollLeadNameIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadPage.L.leadName));
  }

  async doubleClickActivity(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadPage.L.activity));
  }

  async longPressActivity(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadPage.L.activity));
  }

  async expectActivityHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadPage.L.activity), timeoutMs);
  }

  async expectActivityText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadPage.L.activity), expected, timeoutMs);
  }

  async expectActivityContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadPage.L.activity), substring, timeoutMs);
  }

  async expectActivityValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadPage.L.activity), value, timeoutMs);
  }

  async expectActivityEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadPage.L.activity), timeoutMs);
  }

  async expectActivityDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadPage.L.activity), timeoutMs);
  }

  async expectActivityChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadPage.L.activity), timeoutMs);
  }

  async expectActivityUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadPage.L.activity), timeoutMs);
  }

  async expectActivityFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadPage.L.activity), timeoutMs);
  }

  async expectActivityCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadPage.L.activity), count, timeoutMs);
  }

  async scrollActivityIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadPage.L.activity));
  }

  async doubleClickDetails(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadPage.L.details));
  }

  async longPressDetails(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadPage.L.details));
  }

  async expectDetailsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadPage.L.details), timeoutMs);
  }

  async expectDetailsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadPage.L.details), expected, timeoutMs);
  }

  async expectDetailsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadPage.L.details), substring, timeoutMs);
  }

  async expectDetailsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadPage.L.details), value, timeoutMs);
  }

  async expectDetailsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadPage.L.details), timeoutMs);
  }

  async expectDetailsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadPage.L.details), timeoutMs);
  }

  async expectDetailsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadPage.L.details), timeoutMs);
  }

  async expectDetailsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadPage.L.details), timeoutMs);
  }

  async expectDetailsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadPage.L.details), timeoutMs);
  }

  async expectDetailsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadPage.L.details), count, timeoutMs);
  }

  async scrollDetailsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadPage.L.details));
  }

  async clickOpenNotContacted(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadPage.L.openNotContacted));
  }

  async doubleClickOpenNotContacted(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadPage.L.openNotContacted));
  }

  async longPressOpenNotContacted(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadPage.L.openNotContacted));
  }

  async expectOpenNotContactedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadPage.L.openNotContacted), timeoutMs);
  }

  async expectOpenNotContactedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadPage.L.openNotContacted), expected, timeoutMs);
  }

  async expectOpenNotContactedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadPage.L.openNotContacted), substring, timeoutMs);
  }

  async expectOpenNotContactedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadPage.L.openNotContacted), value, timeoutMs);
  }

  async expectOpenNotContactedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadPage.L.openNotContacted), timeoutMs);
  }

  async expectOpenNotContactedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadPage.L.openNotContacted), timeoutMs);
  }

  async expectOpenNotContactedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadPage.L.openNotContacted), timeoutMs);
  }

  async expectOpenNotContactedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadPage.L.openNotContacted), timeoutMs);
  }

  async expectOpenNotContactedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadPage.L.openNotContacted), timeoutMs);
  }

  async expectOpenNotContactedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadPage.L.openNotContacted), count, timeoutMs);
  }

  async scrollOpenNotContactedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadPage.L.openNotContacted));
  }

  async clickLeadStatus(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadPage.L.leadStatus));
  }

  async doubleClickLeadStatus(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadPage.L.leadStatus));
  }

  async longPressLeadStatus(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadPage.L.leadStatus));
  }

  async expectLeadStatusVisible(timeoutMs = 30_000): Promise<void> {
    await expectVisible(webLocator(this.page, LeadPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadPage.L.leadStatus), expected, timeoutMs);
  }

  async expectLeadStatusContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadPage.L.leadStatus), substring, timeoutMs);
  }

  async expectLeadStatusValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadPage.L.leadStatus), value, timeoutMs);
  }

  async expectLeadStatusEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadPage.L.leadStatus), count, timeoutMs);
  }

  async scrollLeadStatusIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadPage.L.leadStatus));
  }
}
