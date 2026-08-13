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
import { webTable, type WebTable } from "../support/web-table";
import { SalesforceDataPage } from "./salesforce-data";
import { dataUtils } from "../support/data-utils";

// Salesforce object: Lead (schema-verified via Autonix Recorder)
export class LeadListPage {
  private static readonly L = {
    leadsRecentlyViewed: { strategy: 'role' as const, value: 'Leads Recently Viewed', role: 'heading', level: 1, shadowHost: 'lst-list-view-picker', actionKind: 'text' as const },
    selectAListView: { strategy: 'role' as const, value: 'Select a List View: Leads', role: 'button', shadowHost: 'lightning-button-icon', actionKind: 'button' as const },
    thisListIsPinned: { strategy: 'role' as const, value: 'This list is pinned.', role: 'button', shadowHost: 'lightning-button-icon', actionKind: 'button' as const },
    new: { strategy: 'role' as const, value: 'New', role: 'button', shadowHost: 'lst-list-view-manager-header', actionKind: 'link' as const },
    sortByName: { strategy: 'role' as const, value: 'Sort by: Name', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    sortByTitle: { strategy: 'role' as const, value: 'Sort by: Title', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    sortByCompany: { strategy: 'role' as const, value: 'Sort by: Company', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    sortByPhone: { strategy: 'role' as const, value: 'Sort by: Phone', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    sortByMobile: { strategy: 'role' as const, value: 'Sort by: Mobile', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    sortByEmail: { strategy: 'role' as const, value: 'Sort by: Email', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    sortByLeadStatus: { strategy: 'role' as const, value: 'Sort by: Lead Status', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    sortByOwnerAlias: { strategy: 'role' as const, value: 'Sort by: Owner Alias', role: 'button', shadowHost: 'lightning-primitive-header-factory', actionKind: 'link' as const },
    toDoList: { strategy: 'role' as const, value: 'To Do List', role: 'button', actionKind: 'button' as const },
    newLead: { strategy: 'role' as const, value: 'New Lead', role: 'heading', level: 2, shadowHost: 'records-lwc-detail-panel', actionKind: 'text' as const },
    leadInformation: { strategy: 'role' as const, value: 'Lead Information', role: 'heading', level: 3, shadowHost: 'records-record-layout-section', actionKind: 'text' as const },
    phone: { strategy: 'role' as const, value: 'Phone', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'Phone' },
    salutation: { strategy: 'role' as const, value: 'Salutation', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const, sfFieldApiName: 'Salutation' },
    firstName: { strategy: 'role' as const, value: 'First Name', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'FirstName' },
    mobile: { strategy: 'role' as const, value: 'Mobile', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const },
    fax: { strategy: 'role' as const, value: 'Fax', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'Fax' },
    title: { strategy: 'role' as const, value: 'Title', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'Title' },
    email: { strategy: 'role' as const, value: 'Email', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'Email' },
    leadSource: { strategy: 'role' as const, value: 'Lead Source', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const, sfFieldApiName: 'LeadSource' },
    website: { strategy: 'role' as const, value: 'Website', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'Website' },
    industry: { strategy: 'role' as const, value: 'Industry', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const, sfFieldApiName: 'Industry' },
    leadStatus: { strategy: 'role' as const, value: 'Lead Status', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const },
    annualRevenue: { strategy: 'label' as const, value: 'Annual Revenue', role: 'spinbutton', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'AnnualRevenue' },
    rating: { strategy: 'role' as const, value: 'Rating', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const, sfFieldApiName: 'Rating' },
    noOfEmployees: { strategy: 'label' as const, value: 'No. of Employees', role: 'spinbutton', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const },
    addressInformation: { strategy: 'role' as const, value: 'Address Information', role: 'heading', level: 3, shadowHost: 'records-record-layout-section', actionKind: 'text' as const },
    country: { strategy: 'role' as const, value: 'Country', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'textbox' as const, sfFieldApiName: 'Country' },
    street: { strategy: 'role' as const, value: 'Street', role: 'textbox', shadowHost: 'lightning-textarea', actionKind: 'textbox' as const, sfFieldApiName: 'Street' },
    city: { strategy: 'role' as const, value: 'City', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'City' },
    stateProvince: { strategy: 'role' as const, value: 'State/Province', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'textbox' as const, sfFieldApiName: 'State' },
    zipPostalCode: { strategy: 'role' as const, value: 'Zip/Postal Code', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'PostalCode' },
    additionalInformation: { strategy: 'role' as const, value: 'Additional Information', role: 'heading', level: 3, shadowHost: 'records-record-layout-section', actionKind: 'text' as const },
    productInterest: { strategy: 'role' as const, value: 'Product Interest', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const, sfFieldApiName: 'ProductInterest__c' },
    currentGeneratorS: { strategy: 'role' as const, value: 'Current Generator(s)', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'CurrentGenerators__c' },
    sicCode: { strategy: 'role' as const, value: 'SIC Code', role: 'textbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'SICCode__c' },
    primary: { strategy: 'role' as const, value: 'Primary', role: 'combobox', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const, sfFieldApiName: 'Primary__c' },
    numberOfLocations: { strategy: 'label' as const, value: 'Number of Locations', role: 'spinbutton', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const, sfFieldApiName: 'NumberofLocations__c' },
    descriptionInformation: { strategy: 'role' as const, value: 'Description Information', role: 'heading', level: 3, shadowHost: 'records-record-layout-section', actionKind: 'text' as const },
    description: { strategy: 'role' as const, value: 'Description', role: 'textbox', shadowHost: 'lightning-textarea', actionKind: 'textbox' as const, sfFieldApiName: 'Description' },
    cancelEdit: { strategy: 'role' as const, value: 'Cancel', role: 'button', shadowHost: 'lightning-button', actionKind: 'button' as const },
    saveAndNew: { strategy: 'role' as const, value: 'Save & New', role: 'button', shadowHost: 'lightning-button', actionKind: 'button' as const },
    saveEdit: { strategy: 'role' as const, value: 'Save', role: 'button', shadowHost: 'lightning-button', actionKind: 'button' as const },
    lastName: { strategy: 'placeholder' as const, value: 'Last Name', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const },
    company: { strategy: 'css' as const, value: 'input[name="Company"]', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const },
  } as const;

  readonly sldsTable1: WebTable; // columns: ["Row Number", "", "Name", "Title", "Company", "Phone", "Mobile", "Email", "Lead Status", "Owner Alias", "Action"]

  constructor(private readonly page: Page, private readonly sfData: SalesforceDataPage = new SalesforceDataPage(page)) {
    this.sldsTable1 = webTable(this.page, 'table');
  }

  async getInnerTextLeadsRecentlyViewed(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed));
  }

  async expectLeadsRecentlyViewedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), timeoutMs, soft);
  }

  async clickSelectAListView(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.selectAListView));
  }

  async doubleClickSelectAListView(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.selectAListView));
  }

  async expectSelectAListViewVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.selectAListView), timeoutMs, soft);
  }

  async clickThisListIsPinned(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.thisListIsPinned));
  }

  async doubleClickThisListIsPinned(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.thisListIsPinned));
  }

  async expectThisListIsPinnedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.thisListIsPinned), timeoutMs, soft);
  }

  async clickNew(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.new));
  }

  async expectNewVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.new), timeoutMs, soft);
  }

  async clickSortByName(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByName));
  }

  async expectSortByNameVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByName), timeoutMs, soft);
  }

  async clickSortByTitle(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByTitle));
  }

  async expectSortByTitleVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByTitle), timeoutMs, soft);
  }

  async clickSortByCompany(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByCompany));
  }

  async expectSortByCompanyVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByCompany), timeoutMs, soft);
  }

  async clickSortByPhone(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByPhone));
  }

  async expectSortByPhoneVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByPhone), timeoutMs, soft);
  }

  async clickSortByMobile(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByMobile));
  }

  async expectSortByMobileVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByMobile), timeoutMs, soft);
  }

  async clickSortByEmail(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByEmail));
  }

  async expectSortByEmailVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByEmail), timeoutMs, soft);
  }

  async clickSortByLeadStatus(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByLeadStatus));
  }

  async expectSortByLeadStatusVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByLeadStatus), timeoutMs, soft);
  }

  async clickSortByOwnerAlias(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.sortByOwnerAlias));
  }

  async expectSortByOwnerAliasVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), timeoutMs, soft);
  }

  async clickToDoList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.toDoList));
  }

  async doubleClickToDoList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.toDoList));
  }

  async expectToDoListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.toDoList), timeoutMs, soft);
  }

  async getInnerTextNewLead(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.newLead));
  }

  async expectNewLeadVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.newLead), timeoutMs, soft);
  }

  async getInnerTextLeadInformation(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.leadInformation));
  }

  async expectLeadInformationVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.leadInformation), timeoutMs, soft);
  }

  async fillPhone(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.phone), value);
  }

  async clearPhone(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.phone));
  }

  async getPhoneValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.phone));
  }

  async expectPhoneVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.phone), timeoutMs, soft);
  }

  async clickSalutation(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.salutation));
  }

  async doubleClickSalutation(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.salutation));
  }

  async expectSalutationVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.salutation), timeoutMs, soft);
  }

  async fillFirstName(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.firstName), value);
  }

  async clearFirstName(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.firstName));
  }

  async getFirstNameValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.firstName));
  }

  async expectFirstNameVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.firstName), timeoutMs, soft);
  }

  async fillMobile(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.mobile), value);
  }

  async clearMobile(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.mobile));
  }

  async getMobileValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.mobile));
  }

  async expectMobileVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.mobile), timeoutMs, soft);
  }

  async fillFax(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.fax), value);
  }

  async clearFax(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.fax));
  }

  async getFaxValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.fax));
  }

  async expectFaxVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.fax), timeoutMs, soft);
  }

  async fillTitle(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.title), value);
  }

  async clearTitle(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.title));
  }

  async getTitleValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.title));
  }

  async expectTitleVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.title), timeoutMs, soft);
  }

  async fillEmail(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.email), value);
  }

  async clearEmail(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.email));
  }

  async getEmailValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.email));
  }

  async expectEmailVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.email), timeoutMs, soft);
  }

  async clickLeadSource(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.leadSource));
  }

  async doubleClickLeadSource(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.leadSource));
  }

  async expectLeadSourceVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.leadSource), timeoutMs, soft);
  }

  async fillWebsite(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.website), value);
  }

  async clearWebsite(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.website));
  }

  async getWebsiteValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.website));
  }

  async expectWebsiteVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.website), timeoutMs, soft);
  }

  async clickIndustry(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.industry));
  }

  async doubleClickIndustry(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.industry));
  }

  async expectIndustryVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.industry), timeoutMs, soft);
  }

  async clickLeadStatus(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.leadStatus));
  }

  async doubleClickLeadStatus(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.leadStatus));
  }

  async expectLeadStatusVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.leadStatus), timeoutMs, soft);
  }

  async fillAnnualRevenue(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.annualRevenue), value);
  }

  async clearAnnualRevenue(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.annualRevenue));
  }

  async getAnnualRevenueValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.annualRevenue));
  }

  async expectAnnualRevenueVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.annualRevenue), timeoutMs, soft);
  }

  async clickRating(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.rating));
  }

  async doubleClickRating(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.rating));
  }

  async expectRatingVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.rating), timeoutMs, soft);
  }

  async fillNoOfEmployees(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.noOfEmployees), value);
  }

  async clearNoOfEmployees(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.noOfEmployees));
  }

  async getNoOfEmployeesValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.noOfEmployees));
  }

  async expectNoOfEmployeesVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.noOfEmployees), timeoutMs, soft);
  }

  async getInnerTextAddressInformation(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.addressInformation));
  }

  async expectAddressInformationVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.addressInformation), timeoutMs, soft);
  }

  async fillCountry(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.country), value);
  }

  async clearCountry(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.country));
  }

  async getCountryValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.country));
  }

  async expectCountryVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.country), timeoutMs, soft);
  }

  async fillStreet(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.street), value);
  }

  async clearStreet(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.street));
  }

  async getStreetValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.street));
  }

  async expectStreetVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.street), timeoutMs, soft);
  }

  async fillCity(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.city), value);
  }

  async clearCity(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.city));
  }

  async getCityValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.city));
  }

  async expectCityVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.city), timeoutMs, soft);
  }

  async fillStateProvince(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.stateProvince), value);
  }

  async clearStateProvince(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.stateProvince));
  }

  async getStateProvinceValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.stateProvince));
  }

  async expectStateProvinceVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.stateProvince), timeoutMs, soft);
  }

  async fillZipPostalCode(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.zipPostalCode), value);
  }

  async clearZipPostalCode(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.zipPostalCode));
  }

  async getZipPostalCodeValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.zipPostalCode));
  }

  async expectZipPostalCodeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.zipPostalCode), timeoutMs, soft);
  }

  async getInnerTextAdditionalInformation(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.additionalInformation));
  }

  async expectAdditionalInformationVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.additionalInformation), timeoutMs, soft);
  }

  async clickProductInterest(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.productInterest));
  }

  async doubleClickProductInterest(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.productInterest));
  }

  async expectProductInterestVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.productInterest), timeoutMs, soft);
  }

  async fillCurrentGeneratorS(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.currentGeneratorS), value);
  }

  async clearCurrentGeneratorS(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.currentGeneratorS));
  }

  async getCurrentGeneratorSValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.currentGeneratorS));
  }

  async expectCurrentGeneratorSVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.currentGeneratorS), timeoutMs, soft);
  }

  async fillSicCode(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.sicCode), value);
  }

  async clearSicCode(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.sicCode));
  }

  async getSicCodeValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.sicCode));
  }

  async expectSicCodeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.sicCode), timeoutMs, soft);
  }

  async clickPrimary(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.primary));
  }

  async doubleClickPrimary(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.primary));
  }

  async expectPrimaryVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.primary), timeoutMs, soft);
  }

  async fillNumberOfLocations(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.numberOfLocations), value);
  }

  async clearNumberOfLocations(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.numberOfLocations));
  }

  async getNumberOfLocationsValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.numberOfLocations));
  }

  async expectNumberOfLocationsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.numberOfLocations), timeoutMs, soft);
  }

  async getInnerTextDescriptionInformation(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.descriptionInformation));
  }

  async expectDescriptionInformationVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.descriptionInformation), timeoutMs, soft);
  }

  async fillDescription(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.description), value);
  }

  async clearDescription(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.description));
  }

  async getDescriptionValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, LeadListPage.L.description));
  }

  async expectDescriptionVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.description), timeoutMs, soft);
  }

  async clickCancelEdit(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.cancelEdit));
  }

  async doubleClickCancelEdit(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.cancelEdit));
  }

  async expectCancelEditVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.cancelEdit), timeoutMs, soft);
  }

  async clickSaveAndNew(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.saveAndNew));
  }

  async doubleClickSaveAndNew(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.saveAndNew));
  }

  async expectSaveAndNewVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.saveAndNew), timeoutMs, soft);
  }

  async clickSaveEdit(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.saveEdit));
  }

  async doubleClickSaveEdit(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.saveEdit));
  }

  async expectSaveEditVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.saveEdit), timeoutMs, soft);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /** Assert page title matches an expected string or regex. */
  async expectPageTitle(expected: string | RegExp, timeoutMs = 30_000): Promise<void> {
    await expectPageTitle(this.page, expected, timeoutMs);
  }

  /** Verify we are on the correct page using the title captured at record time. */
  async verifyOnPage(timeoutMs = 30_000): Promise<void> {
    await expectPageTitle(this.page, 'New Lead | Salesforce', timeoutMs);
  }

  async fillLastName(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.lastName), value);
  }

  async expectLastNameVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.lastName), timeoutMs, soft);
  }

  async fillCompany(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, LeadListPage.L.company), value);
  }

  async expectCompanyVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, LeadListPage.L.company), timeoutMs, soft);
  }

  /** Fill one or more Lead fields by API name in a single call — resolves to the
   *  right widget (text/picklist/checkbox) automatically. Unmapped fields throw so a typo
   *  in a field name fails the test instead of silently doing nothing. */
  async fillLeadFields(data: Partial<Record<string, string | boolean | null>>): Promise<void> {
    return this.sfData.fillFields(LeadListPage.L, data);
  }

  /** Read a Lead field's current displayed value by API name. */
  async getLeadFieldValue(field: string): Promise<string> {
    return this.sfData.getFieldValue(LeadListPage.L, field);
  }

  async generateLeadData() { return this.sfData.generateLeadData(); }

  /** Fills every captured Lead field on this form from a single data object and
   *  saves the record. `data` is keyed by this page's own field names below; textbox/checkbox
   *  fields left out get a Faker-generated default instead of being left blank — combobox/radio
   *  fields are only touched when explicitly provided (their valid options aren't known here).
   *  data keys: phone, firstName, mobile, fax, title, email, website, annualRevenue, noOfEmployees, country, street, city, stateProvince, zipPostalCode, currentGeneratorS, sicCode, numberOfLocations, description. */
  async createLead(data: { phone?: string; firstName?: string; mobile?: string; fax?: string; title?: string; email?: string; website?: string; annualRevenue?: string; noOfEmployees?: string; country?: string; street?: string; city?: string; stateProvince?: string; zipPostalCode?: string; currentGeneratorS?: string; sicCode?: string; numberOfLocations?: string; description?: string }): Promise<void> {
    await this.fillPhone(data.phone ?? dataUtils.phone());
    await this.fillFirstName(data.firstName ?? dataUtils.firstName());
    await this.fillMobile(data.mobile ?? dataUtils.words(2));
    await this.fillFax(data.fax ?? dataUtils.phone());
    await this.fillTitle(data.title ?? dataUtils.jobTitle());
    await this.fillEmail(data.email ?? dataUtils.email());
    await this.fillWebsite(data.website ?? dataUtils.httpsUrl());
    await this.fillAnnualRevenue(data.annualRevenue ?? dataUtils.words(2));
    await this.fillNoOfEmployees(data.noOfEmployees ?? dataUtils.words(2));
    await this.fillCountry(data.country ?? dataUtils.country());
    await this.fillStreet(data.street ?? dataUtils.streetAddress());
    await this.fillCity(data.city ?? dataUtils.city());
    await this.fillStateProvince(data.stateProvince ?? dataUtils.words(2));
    await this.fillZipPostalCode(data.zipPostalCode ?? dataUtils.words(2));
    await this.fillCurrentGeneratorS(data.currentGeneratorS ?? dataUtils.words(2));
    await this.fillSicCode(data.sicCode ?? dataUtils.words(2));
    await this.fillNumberOfLocations(data.numberOfLocations ?? dataUtils.words(2));
    await this.fillDescription(data.description ?? dataUtils.words(2));
    await this.clickSaveEdit();
  }

  // ── table ──────────────────────────────────────────────

  /** Text of any cell. row is 0-based; col is column name or 0-based index. */
  async getSldsTable1TableText(row: number, col: number | string): Promise<string> {
    return this.sldsTable1.getText(row, col);
  }

  /** All text values for a column across every row. */
  async getSldsTable1TableColumn(col: number | string): Promise<string[]> {
    return this.sldsTable1.getColumn(col);
  }

  /** All cell values for a row as { "Column Name": "value" }. */
  async getSldsTable1TableRowData(row: number): Promise<Record<string, string>> {
    return this.sldsTable1.getRowData(row);
  }

  /** First row where col equals value (exact). Pass exact=false for contains match. */
  async findSldsTable1TableRow(col: number | string, value: string, exact = true): Promise<number> {
    return this.sldsTable1.findRow(col, value, exact);
  }

  /** First row where any cell contains text (case-insensitive). */
  async findSldsTable1TableRowByText(text: string): Promise<number> {
    return this.sldsTable1.findRowByText(text);
  }

  /** Total number of body rows. */
  async getSldsTable1TableRowCount(): Promise<number> {
    return this.sldsTable1.rowCount();
  }

  /** Click the <a> link inside a cell. */
  async clickSldsTable1TableLink(row: number, col: number | string): Promise<void> {
    return this.sldsTable1.clickLink(row, col);
  }

  /** href of the link inside a cell, or null if there is no link. */
  async getSldsTable1TableLinkHref(row: number, col: number | string): Promise<string | null> {
    const cell = await this.sldsTable1.cell(row, col);
    const link = cell.locator('a');
    return (await link.count()) > 0 ? link.getAttribute('href') : null;
  }

  /** Check the row selection checkbox (idempotent). */
  async checkSldsTable1TableRow(row: number): Promise<void> {
    const cb = this.sldsTable1.row(row).locator('input[type="checkbox"]').first();
    if (await cb.isChecked()) return;
    await cb.check({ force: true });
  }

  /** Uncheck the row selection checkbox (idempotent). */
  async uncheckSldsTable1TableRow(row: number): Promise<void> {
    const cb = this.sldsTable1.row(row).locator('input[type="checkbox"]').first();
    if (!(await cb.isChecked())) return;
    await cb.uncheck({ force: true });
  }

  /** Whether the row selection checkbox is currently checked. */
  async isSldsTable1TableRowChecked(row: number): Promise<boolean> {
    return this.sldsTable1.row(row).locator('input[type="checkbox"]').first().isChecked();
  }

  /** Current state of the toggle switch (role="switch") in the row — true = on/active. */
  async getSldsTable1TableSwitchState(row: number): Promise<boolean> {
    return this.sldsTable1.getSwitchState(row);
  }

  /** Toggle the switch in a row. Pass targetState=true/false to set explicitly. */
  async toggleSldsTable1TableSwitch(row: number, targetState?: boolean): Promise<void> {
    return this.sldsTable1.toggleSwitch(row, targetState);
  }

  /** Click a button in a row by optional label; omit label to click the last button (action menu). */
  async clickSldsTable1TableButton(row: number, label?: string): Promise<void> {
    return this.sldsTable1.clickButton(row, label);
  }

  /** Click a named option inside an already-open row action dropdown. */
  async clickSldsTable1TableMenuOption(label: string): Promise<void> {
    return this.sldsTable1.clickMenuOption(label);
  }

  /** Click a column header to sort. Call twice to reverse direction. */
  async sortSldsTable1TableBy(col: string): Promise<void> {
    return this.sldsTable1.sortBy(col);
  }

  /** Locator for any element inside a row — toggles, buttons, custom controls. */
  getSldsTable1TableInRow(row: number, selector: string): Locator {
    return this.sldsTable1.getInRow(row, selector);
  }


  async clickLeadsRecentlyViewed(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed));
  }

  async doubleClickLeadsRecentlyViewed(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed));
  }

  async longPressLeadsRecentlyViewed(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed));
  }

  async expectLeadsRecentlyViewedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), timeoutMs);
  }

  async expectLeadsRecentlyViewedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), expected, timeoutMs);
  }

  async expectLeadsRecentlyViewedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), substring, timeoutMs);
  }

  async expectLeadsRecentlyViewedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), value, timeoutMs);
  }

  async expectLeadsRecentlyViewedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), timeoutMs);
  }

  async expectLeadsRecentlyViewedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), timeoutMs);
  }

  async expectLeadsRecentlyViewedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), timeoutMs);
  }

  async expectLeadsRecentlyViewedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), timeoutMs);
  }

  async expectLeadsRecentlyViewedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), timeoutMs);
  }

  async expectLeadsRecentlyViewedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed), count, timeoutMs);
  }

  async scrollLeadsRecentlyViewedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.leadsRecentlyViewed));
  }

  async longPressSelectAListView(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.selectAListView));
  }

  async expectSelectAListViewHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.selectAListView), timeoutMs);
  }

  async expectSelectAListViewText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.selectAListView), expected, timeoutMs);
  }

  async expectSelectAListViewContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.selectAListView), substring, timeoutMs);
  }

  async expectSelectAListViewValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.selectAListView), value, timeoutMs);
  }

  async expectSelectAListViewEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.selectAListView), timeoutMs);
  }

  async expectSelectAListViewDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.selectAListView), timeoutMs);
  }

  async expectSelectAListViewChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.selectAListView), timeoutMs);
  }

  async expectSelectAListViewUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.selectAListView), timeoutMs);
  }

  async expectSelectAListViewFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.selectAListView), timeoutMs);
  }

  async expectSelectAListViewCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.selectAListView), count, timeoutMs);
  }

  async scrollSelectAListViewIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.selectAListView));
  }

  async longPressThisListIsPinned(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.thisListIsPinned));
  }

  async expectThisListIsPinnedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.thisListIsPinned), timeoutMs);
  }

  async expectThisListIsPinnedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.thisListIsPinned), expected, timeoutMs);
  }

  async expectThisListIsPinnedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.thisListIsPinned), substring, timeoutMs);
  }

  async expectThisListIsPinnedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.thisListIsPinned), value, timeoutMs);
  }

  async expectThisListIsPinnedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.thisListIsPinned), timeoutMs);
  }

  async expectThisListIsPinnedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.thisListIsPinned), timeoutMs);
  }

  async expectThisListIsPinnedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.thisListIsPinned), timeoutMs);
  }

  async expectThisListIsPinnedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.thisListIsPinned), timeoutMs);
  }

  async expectThisListIsPinnedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.thisListIsPinned), timeoutMs);
  }

  async expectThisListIsPinnedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.thisListIsPinned), count, timeoutMs);
  }

  async scrollThisListIsPinnedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.thisListIsPinned));
  }

  async doubleClickNew(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.new));
  }

  async longPressNew(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.new));
  }

  async expectNewHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.new), timeoutMs);
  }

  async expectNewText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.new), expected, timeoutMs);
  }

  async expectNewContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.new), substring, timeoutMs);
  }

  async expectNewValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.new), value, timeoutMs);
  }

  async expectNewEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.new), timeoutMs);
  }

  async expectNewDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.new), timeoutMs);
  }

  async expectNewChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.new), timeoutMs);
  }

  async expectNewUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.new), timeoutMs);
  }

  async expectNewFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.new), timeoutMs);
  }

  async expectNewCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.new), count, timeoutMs);
  }

  async scrollNewIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.new));
  }

  async doubleClickSortByName(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByName));
  }

  async longPressSortByName(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByName));
  }

  async expectSortByNameHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByName), timeoutMs);
  }

  async expectSortByNameText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByName), expected, timeoutMs);
  }

  async expectSortByNameContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByName), substring, timeoutMs);
  }

  async expectSortByNameValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByName), value, timeoutMs);
  }

  async expectSortByNameEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByName), timeoutMs);
  }

  async expectSortByNameDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByName), timeoutMs);
  }

  async expectSortByNameChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByName), timeoutMs);
  }

  async expectSortByNameUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByName), timeoutMs);
  }

  async expectSortByNameFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByName), timeoutMs);
  }

  async expectSortByNameCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByName), count, timeoutMs);
  }

  async scrollSortByNameIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByName));
  }

  async doubleClickSortByTitle(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByTitle));
  }

  async longPressSortByTitle(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByTitle));
  }

  async expectSortByTitleHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByTitle), timeoutMs);
  }

  async expectSortByTitleText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByTitle), expected, timeoutMs);
  }

  async expectSortByTitleContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByTitle), substring, timeoutMs);
  }

  async expectSortByTitleValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByTitle), value, timeoutMs);
  }

  async expectSortByTitleEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByTitle), timeoutMs);
  }

  async expectSortByTitleDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByTitle), timeoutMs);
  }

  async expectSortByTitleChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByTitle), timeoutMs);
  }

  async expectSortByTitleUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByTitle), timeoutMs);
  }

  async expectSortByTitleFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByTitle), timeoutMs);
  }

  async expectSortByTitleCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByTitle), count, timeoutMs);
  }

  async scrollSortByTitleIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByTitle));
  }

  async doubleClickSortByCompany(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByCompany));
  }

  async longPressSortByCompany(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByCompany));
  }

  async expectSortByCompanyHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByCompany), timeoutMs);
  }

  async expectSortByCompanyText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByCompany), expected, timeoutMs);
  }

  async expectSortByCompanyContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByCompany), substring, timeoutMs);
  }

  async expectSortByCompanyValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByCompany), value, timeoutMs);
  }

  async expectSortByCompanyEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByCompany), timeoutMs);
  }

  async expectSortByCompanyDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByCompany), timeoutMs);
  }

  async expectSortByCompanyChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByCompany), timeoutMs);
  }

  async expectSortByCompanyUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByCompany), timeoutMs);
  }

  async expectSortByCompanyFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByCompany), timeoutMs);
  }

  async expectSortByCompanyCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByCompany), count, timeoutMs);
  }

  async scrollSortByCompanyIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByCompany));
  }

  async doubleClickSortByPhone(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByPhone));
  }

  async longPressSortByPhone(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByPhone));
  }

  async expectSortByPhoneHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByPhone), timeoutMs);
  }

  async expectSortByPhoneText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByPhone), expected, timeoutMs);
  }

  async expectSortByPhoneContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByPhone), substring, timeoutMs);
  }

  async expectSortByPhoneValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByPhone), value, timeoutMs);
  }

  async expectSortByPhoneEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByPhone), timeoutMs);
  }

  async expectSortByPhoneDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByPhone), timeoutMs);
  }

  async expectSortByPhoneChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByPhone), timeoutMs);
  }

  async expectSortByPhoneUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByPhone), timeoutMs);
  }

  async expectSortByPhoneFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByPhone), timeoutMs);
  }

  async expectSortByPhoneCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByPhone), count, timeoutMs);
  }

  async scrollSortByPhoneIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByPhone));
  }

  async doubleClickSortByMobile(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByMobile));
  }

  async longPressSortByMobile(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByMobile));
  }

  async expectSortByMobileHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByMobile), timeoutMs);
  }

  async expectSortByMobileText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByMobile), expected, timeoutMs);
  }

  async expectSortByMobileContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByMobile), substring, timeoutMs);
  }

  async expectSortByMobileValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByMobile), value, timeoutMs);
  }

  async expectSortByMobileEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByMobile), timeoutMs);
  }

  async expectSortByMobileDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByMobile), timeoutMs);
  }

  async expectSortByMobileChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByMobile), timeoutMs);
  }

  async expectSortByMobileUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByMobile), timeoutMs);
  }

  async expectSortByMobileFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByMobile), timeoutMs);
  }

  async expectSortByMobileCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByMobile), count, timeoutMs);
  }

  async scrollSortByMobileIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByMobile));
  }

  async doubleClickSortByEmail(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByEmail));
  }

  async longPressSortByEmail(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByEmail));
  }

  async expectSortByEmailHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByEmail), timeoutMs);
  }

  async expectSortByEmailText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByEmail), expected, timeoutMs);
  }

  async expectSortByEmailContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByEmail), substring, timeoutMs);
  }

  async expectSortByEmailValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByEmail), value, timeoutMs);
  }

  async expectSortByEmailEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByEmail), timeoutMs);
  }

  async expectSortByEmailDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByEmail), timeoutMs);
  }

  async expectSortByEmailChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByEmail), timeoutMs);
  }

  async expectSortByEmailUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByEmail), timeoutMs);
  }

  async expectSortByEmailFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByEmail), timeoutMs);
  }

  async expectSortByEmailCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByEmail), count, timeoutMs);
  }

  async scrollSortByEmailIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByEmail));
  }

  async doubleClickSortByLeadStatus(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByLeadStatus));
  }

  async longPressSortByLeadStatus(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByLeadStatus));
  }

  async expectSortByLeadStatusHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByLeadStatus), timeoutMs);
  }

  async expectSortByLeadStatusText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByLeadStatus), expected, timeoutMs);
  }

  async expectSortByLeadStatusContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByLeadStatus), substring, timeoutMs);
  }

  async expectSortByLeadStatusValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByLeadStatus), value, timeoutMs);
  }

  async expectSortByLeadStatusEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByLeadStatus), timeoutMs);
  }

  async expectSortByLeadStatusDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByLeadStatus), timeoutMs);
  }

  async expectSortByLeadStatusChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByLeadStatus), timeoutMs);
  }

  async expectSortByLeadStatusUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByLeadStatus), timeoutMs);
  }

  async expectSortByLeadStatusFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByLeadStatus), timeoutMs);
  }

  async expectSortByLeadStatusCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByLeadStatus), count, timeoutMs);
  }

  async scrollSortByLeadStatusIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByLeadStatus));
  }

  async doubleClickSortByOwnerAlias(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.sortByOwnerAlias));
  }

  async longPressSortByOwnerAlias(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.sortByOwnerAlias));
  }

  async expectSortByOwnerAliasHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), timeoutMs);
  }

  async expectSortByOwnerAliasText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), expected, timeoutMs);
  }

  async expectSortByOwnerAliasContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), substring, timeoutMs);
  }

  async expectSortByOwnerAliasValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), value, timeoutMs);
  }

  async expectSortByOwnerAliasEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), timeoutMs);
  }

  async expectSortByOwnerAliasDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), timeoutMs);
  }

  async expectSortByOwnerAliasChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), timeoutMs);
  }

  async expectSortByOwnerAliasUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), timeoutMs);
  }

  async expectSortByOwnerAliasFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), timeoutMs);
  }

  async expectSortByOwnerAliasCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sortByOwnerAlias), count, timeoutMs);
  }

  async scrollSortByOwnerAliasIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sortByOwnerAlias));
  }

  async longPressToDoList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.toDoList));
  }

  async expectToDoListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.toDoList), timeoutMs);
  }

  async expectToDoListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.toDoList), expected, timeoutMs);
  }

  async expectToDoListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.toDoList), substring, timeoutMs);
  }

  async expectToDoListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.toDoList), value, timeoutMs);
  }

  async expectToDoListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.toDoList), timeoutMs);
  }

  async expectToDoListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.toDoList), timeoutMs);
  }

  async expectToDoListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.toDoList), timeoutMs);
  }

  async expectToDoListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.toDoList), timeoutMs);
  }

  async expectToDoListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.toDoList), timeoutMs);
  }

  async expectToDoListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.toDoList), count, timeoutMs);
  }

  async scrollToDoListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.toDoList));
  }

  async clickNewLead(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.newLead));
  }

  async doubleClickNewLead(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.newLead));
  }

  async longPressNewLead(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.newLead));
  }

  async expectNewLeadHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.newLead), timeoutMs);
  }

  async expectNewLeadText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.newLead), expected, timeoutMs);
  }

  async expectNewLeadContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.newLead), substring, timeoutMs);
  }

  async expectNewLeadValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.newLead), value, timeoutMs);
  }

  async expectNewLeadEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.newLead), timeoutMs);
  }

  async expectNewLeadDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.newLead), timeoutMs);
  }

  async expectNewLeadChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.newLead), timeoutMs);
  }

  async expectNewLeadUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.newLead), timeoutMs);
  }

  async expectNewLeadFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.newLead), timeoutMs);
  }

  async expectNewLeadCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.newLead), count, timeoutMs);
  }

  async scrollNewLeadIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.newLead));
  }

  async clickLeadInformation(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.leadInformation));
  }

  async doubleClickLeadInformation(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.leadInformation));
  }

  async longPressLeadInformation(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.leadInformation));
  }

  async expectLeadInformationHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.leadInformation), timeoutMs);
  }

  async expectLeadInformationText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.leadInformation), expected, timeoutMs);
  }

  async expectLeadInformationContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.leadInformation), substring, timeoutMs);
  }

  async expectLeadInformationValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.leadInformation), value, timeoutMs);
  }

  async expectLeadInformationEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.leadInformation), timeoutMs);
  }

  async expectLeadInformationDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.leadInformation), timeoutMs);
  }

  async expectLeadInformationChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.leadInformation), timeoutMs);
  }

  async expectLeadInformationUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.leadInformation), timeoutMs);
  }

  async expectLeadInformationFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.leadInformation), timeoutMs);
  }

  async expectLeadInformationCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.leadInformation), count, timeoutMs);
  }

  async scrollLeadInformationIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.leadInformation));
  }

  async typeTextPhone(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.phone), value);
  }

  async expectPhoneHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.phone), timeoutMs);
  }

  async expectPhoneText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.phone), expected, timeoutMs);
  }

  async expectPhoneContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.phone), substring, timeoutMs);
  }

  async expectPhoneValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.phone), value, timeoutMs);
  }

  async expectPhoneEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.phone), timeoutMs);
  }

  async expectPhoneDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.phone), timeoutMs);
  }

  async expectPhoneChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.phone), timeoutMs);
  }

  async expectPhoneUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.phone), timeoutMs);
  }

  async expectPhoneFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.phone), timeoutMs);
  }

  async expectPhoneCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.phone), count, timeoutMs);
  }

  async scrollPhoneIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.phone));
  }

  async longPressSalutation(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.salutation));
  }

  async expectSalutationHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.salutation), timeoutMs);
  }

  async expectSalutationText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.salutation), expected, timeoutMs);
  }

  async expectSalutationContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.salutation), substring, timeoutMs);
  }

  async expectSalutationValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.salutation), value, timeoutMs);
  }

  async expectSalutationEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.salutation), timeoutMs);
  }

  async expectSalutationDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.salutation), timeoutMs);
  }

  async expectSalutationChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.salutation), timeoutMs);
  }

  async expectSalutationUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.salutation), timeoutMs);
  }

  async expectSalutationFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.salutation), timeoutMs);
  }

  async expectSalutationCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.salutation), count, timeoutMs);
  }

  async scrollSalutationIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.salutation));
  }

  async typeTextFirstName(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.firstName), value);
  }

  async expectFirstNameHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.firstName), timeoutMs);
  }

  async expectFirstNameText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.firstName), expected, timeoutMs);
  }

  async expectFirstNameContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.firstName), substring, timeoutMs);
  }

  async expectFirstNameValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.firstName), value, timeoutMs);
  }

  async expectFirstNameEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.firstName), timeoutMs);
  }

  async expectFirstNameDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.firstName), timeoutMs);
  }

  async expectFirstNameChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.firstName), timeoutMs);
  }

  async expectFirstNameUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.firstName), timeoutMs);
  }

  async expectFirstNameFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.firstName), timeoutMs);
  }

  async expectFirstNameCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.firstName), count, timeoutMs);
  }

  async scrollFirstNameIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.firstName));
  }

  async typeTextMobile(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.mobile), value);
  }

  async expectMobileHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.mobile), timeoutMs);
  }

  async expectMobileText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.mobile), expected, timeoutMs);
  }

  async expectMobileContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.mobile), substring, timeoutMs);
  }

  async expectMobileValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.mobile), value, timeoutMs);
  }

  async expectMobileEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.mobile), timeoutMs);
  }

  async expectMobileDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.mobile), timeoutMs);
  }

  async expectMobileChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.mobile), timeoutMs);
  }

  async expectMobileUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.mobile), timeoutMs);
  }

  async expectMobileFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.mobile), timeoutMs);
  }

  async expectMobileCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.mobile), count, timeoutMs);
  }

  async scrollMobileIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.mobile));
  }

  async typeTextFax(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.fax), value);
  }

  async expectFaxHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.fax), timeoutMs);
  }

  async expectFaxText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.fax), expected, timeoutMs);
  }

  async expectFaxContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.fax), substring, timeoutMs);
  }

  async expectFaxValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.fax), value, timeoutMs);
  }

  async expectFaxEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.fax), timeoutMs);
  }

  async expectFaxDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.fax), timeoutMs);
  }

  async expectFaxChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.fax), timeoutMs);
  }

  async expectFaxUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.fax), timeoutMs);
  }

  async expectFaxFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.fax), timeoutMs);
  }

  async expectFaxCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.fax), count, timeoutMs);
  }

  async scrollFaxIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.fax));
  }

  async typeTextTitle(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.title), value);
  }

  async expectTitleHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.title), timeoutMs);
  }

  async expectTitleText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.title), expected, timeoutMs);
  }

  async expectTitleContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.title), substring, timeoutMs);
  }

  async expectTitleValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.title), value, timeoutMs);
  }

  async expectTitleEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.title), timeoutMs);
  }

  async expectTitleDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.title), timeoutMs);
  }

  async expectTitleChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.title), timeoutMs);
  }

  async expectTitleUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.title), timeoutMs);
  }

  async expectTitleFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.title), timeoutMs);
  }

  async expectTitleCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.title), count, timeoutMs);
  }

  async scrollTitleIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.title));
  }

  async typeTextEmail(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.email), value);
  }

  async expectEmailHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.email), timeoutMs);
  }

  async expectEmailText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.email), expected, timeoutMs);
  }

  async expectEmailContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.email), substring, timeoutMs);
  }

  async expectEmailValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.email), value, timeoutMs);
  }

  async expectEmailEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.email), timeoutMs);
  }

  async expectEmailDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.email), timeoutMs);
  }

  async expectEmailChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.email), timeoutMs);
  }

  async expectEmailUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.email), timeoutMs);
  }

  async expectEmailFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.email), timeoutMs);
  }

  async expectEmailCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.email), count, timeoutMs);
  }

  async scrollEmailIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.email));
  }

  async longPressLeadSource(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.leadSource));
  }

  async expectLeadSourceHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.leadSource), timeoutMs);
  }

  async expectLeadSourceText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.leadSource), expected, timeoutMs);
  }

  async expectLeadSourceContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.leadSource), substring, timeoutMs);
  }

  async expectLeadSourceValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.leadSource), value, timeoutMs);
  }

  async expectLeadSourceEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.leadSource), timeoutMs);
  }

  async expectLeadSourceDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.leadSource), timeoutMs);
  }

  async expectLeadSourceChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.leadSource), timeoutMs);
  }

  async expectLeadSourceUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.leadSource), timeoutMs);
  }

  async expectLeadSourceFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.leadSource), timeoutMs);
  }

  async expectLeadSourceCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.leadSource), count, timeoutMs);
  }

  async scrollLeadSourceIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.leadSource));
  }

  async typeTextWebsite(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.website), value);
  }

  async expectWebsiteHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.website), timeoutMs);
  }

  async expectWebsiteText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.website), expected, timeoutMs);
  }

  async expectWebsiteContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.website), substring, timeoutMs);
  }

  async expectWebsiteValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.website), value, timeoutMs);
  }

  async expectWebsiteEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.website), timeoutMs);
  }

  async expectWebsiteDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.website), timeoutMs);
  }

  async expectWebsiteChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.website), timeoutMs);
  }

  async expectWebsiteUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.website), timeoutMs);
  }

  async expectWebsiteFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.website), timeoutMs);
  }

  async expectWebsiteCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.website), count, timeoutMs);
  }

  async scrollWebsiteIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.website));
  }

  async longPressIndustry(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.industry));
  }

  async expectIndustryHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.industry), timeoutMs);
  }

  async expectIndustryText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.industry), expected, timeoutMs);
  }

  async expectIndustryContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.industry), substring, timeoutMs);
  }

  async expectIndustryValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.industry), value, timeoutMs);
  }

  async expectIndustryEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.industry), timeoutMs);
  }

  async expectIndustryDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.industry), timeoutMs);
  }

  async expectIndustryChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.industry), timeoutMs);
  }

  async expectIndustryUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.industry), timeoutMs);
  }

  async expectIndustryFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.industry), timeoutMs);
  }

  async expectIndustryCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.industry), count, timeoutMs);
  }

  async scrollIndustryIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.industry));
  }

  async longPressLeadStatus(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.leadStatus));
  }

  async expectLeadStatusHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.leadStatus), expected, timeoutMs);
  }

  async expectLeadStatusContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.leadStatus), substring, timeoutMs);
  }

  async expectLeadStatusValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.leadStatus), value, timeoutMs);
  }

  async expectLeadStatusEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.leadStatus), timeoutMs);
  }

  async expectLeadStatusCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.leadStatus), count, timeoutMs);
  }

  async scrollLeadStatusIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.leadStatus));
  }

  async typeTextAnnualRevenue(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.annualRevenue), value);
  }

  async expectAnnualRevenueHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.annualRevenue), timeoutMs);
  }

  async expectAnnualRevenueText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.annualRevenue), expected, timeoutMs);
  }

  async expectAnnualRevenueContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.annualRevenue), substring, timeoutMs);
  }

  async expectAnnualRevenueValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.annualRevenue), value, timeoutMs);
  }

  async expectAnnualRevenueEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.annualRevenue), timeoutMs);
  }

  async expectAnnualRevenueDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.annualRevenue), timeoutMs);
  }

  async expectAnnualRevenueChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.annualRevenue), timeoutMs);
  }

  async expectAnnualRevenueUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.annualRevenue), timeoutMs);
  }

  async expectAnnualRevenueFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.annualRevenue), timeoutMs);
  }

  async expectAnnualRevenueCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.annualRevenue), count, timeoutMs);
  }

  async scrollAnnualRevenueIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.annualRevenue));
  }

  async longPressRating(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.rating));
  }

  async expectRatingHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.rating), timeoutMs);
  }

  async expectRatingText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.rating), expected, timeoutMs);
  }

  async expectRatingContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.rating), substring, timeoutMs);
  }

  async expectRatingValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.rating), value, timeoutMs);
  }

  async expectRatingEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.rating), timeoutMs);
  }

  async expectRatingDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.rating), timeoutMs);
  }

  async expectRatingChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.rating), timeoutMs);
  }

  async expectRatingUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.rating), timeoutMs);
  }

  async expectRatingFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.rating), timeoutMs);
  }

  async expectRatingCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.rating), count, timeoutMs);
  }

  async scrollRatingIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.rating));
  }

  async typeTextNoOfEmployees(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.noOfEmployees), value);
  }

  async expectNoOfEmployeesHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.noOfEmployees), timeoutMs);
  }

  async expectNoOfEmployeesText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.noOfEmployees), expected, timeoutMs);
  }

  async expectNoOfEmployeesContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.noOfEmployees), substring, timeoutMs);
  }

  async expectNoOfEmployeesValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.noOfEmployees), value, timeoutMs);
  }

  async expectNoOfEmployeesEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.noOfEmployees), timeoutMs);
  }

  async expectNoOfEmployeesDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.noOfEmployees), timeoutMs);
  }

  async expectNoOfEmployeesChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.noOfEmployees), timeoutMs);
  }

  async expectNoOfEmployeesUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.noOfEmployees), timeoutMs);
  }

  async expectNoOfEmployeesFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.noOfEmployees), timeoutMs);
  }

  async expectNoOfEmployeesCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.noOfEmployees), count, timeoutMs);
  }

  async scrollNoOfEmployeesIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.noOfEmployees));
  }

  async clickAddressInformation(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.addressInformation));
  }

  async doubleClickAddressInformation(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.addressInformation));
  }

  async longPressAddressInformation(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.addressInformation));
  }

  async expectAddressInformationHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.addressInformation), timeoutMs);
  }

  async expectAddressInformationText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.addressInformation), expected, timeoutMs);
  }

  async expectAddressInformationContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.addressInformation), substring, timeoutMs);
  }

  async expectAddressInformationValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.addressInformation), value, timeoutMs);
  }

  async expectAddressInformationEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.addressInformation), timeoutMs);
  }

  async expectAddressInformationDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.addressInformation), timeoutMs);
  }

  async expectAddressInformationChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.addressInformation), timeoutMs);
  }

  async expectAddressInformationUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.addressInformation), timeoutMs);
  }

  async expectAddressInformationFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.addressInformation), timeoutMs);
  }

  async expectAddressInformationCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.addressInformation), count, timeoutMs);
  }

  async scrollAddressInformationIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.addressInformation));
  }

  async typeTextCountry(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.country), value);
  }

  async expectCountryHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.country), timeoutMs);
  }

  async expectCountryText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.country), expected, timeoutMs);
  }

  async expectCountryContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.country), substring, timeoutMs);
  }

  async expectCountryValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.country), value, timeoutMs);
  }

  async expectCountryEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.country), timeoutMs);
  }

  async expectCountryDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.country), timeoutMs);
  }

  async expectCountryChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.country), timeoutMs);
  }

  async expectCountryUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.country), timeoutMs);
  }

  async expectCountryFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.country), timeoutMs);
  }

  async expectCountryCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.country), count, timeoutMs);
  }

  async scrollCountryIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.country));
  }

  async typeTextStreet(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.street), value);
  }

  async expectStreetHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.street), timeoutMs);
  }

  async expectStreetText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.street), expected, timeoutMs);
  }

  async expectStreetContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.street), substring, timeoutMs);
  }

  async expectStreetValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.street), value, timeoutMs);
  }

  async expectStreetEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.street), timeoutMs);
  }

  async expectStreetDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.street), timeoutMs);
  }

  async expectStreetChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.street), timeoutMs);
  }

  async expectStreetUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.street), timeoutMs);
  }

  async expectStreetFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.street), timeoutMs);
  }

  async expectStreetCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.street), count, timeoutMs);
  }

  async scrollStreetIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.street));
  }

  async typeTextCity(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.city), value);
  }

  async expectCityHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.city), timeoutMs);
  }

  async expectCityText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.city), expected, timeoutMs);
  }

  async expectCityContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.city), substring, timeoutMs);
  }

  async expectCityValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.city), value, timeoutMs);
  }

  async expectCityEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.city), timeoutMs);
  }

  async expectCityDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.city), timeoutMs);
  }

  async expectCityChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.city), timeoutMs);
  }

  async expectCityUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.city), timeoutMs);
  }

  async expectCityFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.city), timeoutMs);
  }

  async expectCityCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.city), count, timeoutMs);
  }

  async scrollCityIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.city));
  }

  async typeTextStateProvince(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.stateProvince), value);
  }

  async expectStateProvinceHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.stateProvince), timeoutMs);
  }

  async expectStateProvinceText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.stateProvince), expected, timeoutMs);
  }

  async expectStateProvinceContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.stateProvince), substring, timeoutMs);
  }

  async expectStateProvinceValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.stateProvince), value, timeoutMs);
  }

  async expectStateProvinceEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.stateProvince), timeoutMs);
  }

  async expectStateProvinceDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.stateProvince), timeoutMs);
  }

  async expectStateProvinceChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.stateProvince), timeoutMs);
  }

  async expectStateProvinceUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.stateProvince), timeoutMs);
  }

  async expectStateProvinceFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.stateProvince), timeoutMs);
  }

  async expectStateProvinceCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.stateProvince), count, timeoutMs);
  }

  async scrollStateProvinceIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.stateProvince));
  }

  async typeTextZipPostalCode(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.zipPostalCode), value);
  }

  async expectZipPostalCodeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.zipPostalCode), timeoutMs);
  }

  async expectZipPostalCodeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.zipPostalCode), expected, timeoutMs);
  }

  async expectZipPostalCodeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.zipPostalCode), substring, timeoutMs);
  }

  async expectZipPostalCodeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.zipPostalCode), value, timeoutMs);
  }

  async expectZipPostalCodeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.zipPostalCode), timeoutMs);
  }

  async expectZipPostalCodeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.zipPostalCode), timeoutMs);
  }

  async expectZipPostalCodeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.zipPostalCode), timeoutMs);
  }

  async expectZipPostalCodeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.zipPostalCode), timeoutMs);
  }

  async expectZipPostalCodeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.zipPostalCode), timeoutMs);
  }

  async expectZipPostalCodeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.zipPostalCode), count, timeoutMs);
  }

  async scrollZipPostalCodeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.zipPostalCode));
  }

  async clickAdditionalInformation(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.additionalInformation));
  }

  async doubleClickAdditionalInformation(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.additionalInformation));
  }

  async longPressAdditionalInformation(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.additionalInformation));
  }

  async expectAdditionalInformationHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.additionalInformation), timeoutMs);
  }

  async expectAdditionalInformationText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.additionalInformation), expected, timeoutMs);
  }

  async expectAdditionalInformationContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.additionalInformation), substring, timeoutMs);
  }

  async expectAdditionalInformationValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.additionalInformation), value, timeoutMs);
  }

  async expectAdditionalInformationEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.additionalInformation), timeoutMs);
  }

  async expectAdditionalInformationDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.additionalInformation), timeoutMs);
  }

  async expectAdditionalInformationChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.additionalInformation), timeoutMs);
  }

  async expectAdditionalInformationUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.additionalInformation), timeoutMs);
  }

  async expectAdditionalInformationFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.additionalInformation), timeoutMs);
  }

  async expectAdditionalInformationCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.additionalInformation), count, timeoutMs);
  }

  async scrollAdditionalInformationIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.additionalInformation));
  }

  async longPressProductInterest(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.productInterest));
  }

  async expectProductInterestHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.productInterest), timeoutMs);
  }

  async expectProductInterestText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.productInterest), expected, timeoutMs);
  }

  async expectProductInterestContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.productInterest), substring, timeoutMs);
  }

  async expectProductInterestValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.productInterest), value, timeoutMs);
  }

  async expectProductInterestEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.productInterest), timeoutMs);
  }

  async expectProductInterestDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.productInterest), timeoutMs);
  }

  async expectProductInterestChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.productInterest), timeoutMs);
  }

  async expectProductInterestUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.productInterest), timeoutMs);
  }

  async expectProductInterestFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.productInterest), timeoutMs);
  }

  async expectProductInterestCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.productInterest), count, timeoutMs);
  }

  async scrollProductInterestIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.productInterest));
  }

  async typeTextCurrentGeneratorS(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.currentGeneratorS), value);
  }

  async expectCurrentGeneratorSHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.currentGeneratorS), timeoutMs);
  }

  async expectCurrentGeneratorSText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.currentGeneratorS), expected, timeoutMs);
  }

  async expectCurrentGeneratorSContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.currentGeneratorS), substring, timeoutMs);
  }

  async expectCurrentGeneratorSValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.currentGeneratorS), value, timeoutMs);
  }

  async expectCurrentGeneratorSEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.currentGeneratorS), timeoutMs);
  }

  async expectCurrentGeneratorSDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.currentGeneratorS), timeoutMs);
  }

  async expectCurrentGeneratorSChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.currentGeneratorS), timeoutMs);
  }

  async expectCurrentGeneratorSUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.currentGeneratorS), timeoutMs);
  }

  async expectCurrentGeneratorSFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.currentGeneratorS), timeoutMs);
  }

  async expectCurrentGeneratorSCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.currentGeneratorS), count, timeoutMs);
  }

  async scrollCurrentGeneratorSIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.currentGeneratorS));
  }

  async typeTextSicCode(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.sicCode), value);
  }

  async expectSicCodeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.sicCode), timeoutMs);
  }

  async expectSicCodeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.sicCode), expected, timeoutMs);
  }

  async expectSicCodeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.sicCode), substring, timeoutMs);
  }

  async expectSicCodeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.sicCode), value, timeoutMs);
  }

  async expectSicCodeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.sicCode), timeoutMs);
  }

  async expectSicCodeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.sicCode), timeoutMs);
  }

  async expectSicCodeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.sicCode), timeoutMs);
  }

  async expectSicCodeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.sicCode), timeoutMs);
  }

  async expectSicCodeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.sicCode), timeoutMs);
  }

  async expectSicCodeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.sicCode), count, timeoutMs);
  }

  async scrollSicCodeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.sicCode));
  }

  async longPressPrimary(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.primary));
  }

  async expectPrimaryHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.primary), timeoutMs);
  }

  async expectPrimaryText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.primary), expected, timeoutMs);
  }

  async expectPrimaryContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.primary), substring, timeoutMs);
  }

  async expectPrimaryValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.primary), value, timeoutMs);
  }

  async expectPrimaryEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.primary), timeoutMs);
  }

  async expectPrimaryDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.primary), timeoutMs);
  }

  async expectPrimaryChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.primary), timeoutMs);
  }

  async expectPrimaryUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.primary), timeoutMs);
  }

  async expectPrimaryFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.primary), timeoutMs);
  }

  async expectPrimaryCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.primary), count, timeoutMs);
  }

  async scrollPrimaryIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.primary));
  }

  async typeTextNumberOfLocations(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.numberOfLocations), value);
  }

  async expectNumberOfLocationsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.numberOfLocations), timeoutMs);
  }

  async expectNumberOfLocationsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.numberOfLocations), expected, timeoutMs);
  }

  async expectNumberOfLocationsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.numberOfLocations), substring, timeoutMs);
  }

  async expectNumberOfLocationsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.numberOfLocations), value, timeoutMs);
  }

  async expectNumberOfLocationsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.numberOfLocations), timeoutMs);
  }

  async expectNumberOfLocationsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.numberOfLocations), timeoutMs);
  }

  async expectNumberOfLocationsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.numberOfLocations), timeoutMs);
  }

  async expectNumberOfLocationsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.numberOfLocations), timeoutMs);
  }

  async expectNumberOfLocationsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.numberOfLocations), timeoutMs);
  }

  async expectNumberOfLocationsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.numberOfLocations), count, timeoutMs);
  }

  async scrollNumberOfLocationsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.numberOfLocations));
  }

  async clickDescriptionInformation(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, LeadListPage.L.descriptionInformation));
  }

  async doubleClickDescriptionInformation(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, LeadListPage.L.descriptionInformation));
  }

  async longPressDescriptionInformation(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.descriptionInformation));
  }

  async expectDescriptionInformationHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.descriptionInformation), timeoutMs);
  }

  async expectDescriptionInformationText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.descriptionInformation), expected, timeoutMs);
  }

  async expectDescriptionInformationContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.descriptionInformation), substring, timeoutMs);
  }

  async expectDescriptionInformationValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.descriptionInformation), value, timeoutMs);
  }

  async expectDescriptionInformationEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.descriptionInformation), timeoutMs);
  }

  async expectDescriptionInformationDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.descriptionInformation), timeoutMs);
  }

  async expectDescriptionInformationChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.descriptionInformation), timeoutMs);
  }

  async expectDescriptionInformationUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.descriptionInformation), timeoutMs);
  }

  async expectDescriptionInformationFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.descriptionInformation), timeoutMs);
  }

  async expectDescriptionInformationCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.descriptionInformation), count, timeoutMs);
  }

  async scrollDescriptionInformationIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.descriptionInformation));
  }

  async typeTextDescription(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.description), value);
  }

  async expectDescriptionHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.description), timeoutMs);
  }

  async expectDescriptionText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.description), expected, timeoutMs);
  }

  async expectDescriptionContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.description), substring, timeoutMs);
  }

  async expectDescriptionValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.description), value, timeoutMs);
  }

  async expectDescriptionEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.description), timeoutMs);
  }

  async expectDescriptionDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.description), timeoutMs);
  }

  async expectDescriptionChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.description), timeoutMs);
  }

  async expectDescriptionUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.description), timeoutMs);
  }

  async expectDescriptionFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.description), timeoutMs);
  }

  async expectDescriptionCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.description), count, timeoutMs);
  }

  async scrollDescriptionIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.description));
  }

  async longPressCancelEdit(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.cancelEdit));
  }

  async expectCancelEditHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.cancelEdit), timeoutMs);
  }

  async expectCancelEditText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.cancelEdit), expected, timeoutMs);
  }

  async expectCancelEditContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.cancelEdit), substring, timeoutMs);
  }

  async expectCancelEditValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.cancelEdit), value, timeoutMs);
  }

  async expectCancelEditEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.cancelEdit), timeoutMs);
  }

  async expectCancelEditDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.cancelEdit), timeoutMs);
  }

  async expectCancelEditChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.cancelEdit), timeoutMs);
  }

  async expectCancelEditUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.cancelEdit), timeoutMs);
  }

  async expectCancelEditFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.cancelEdit), timeoutMs);
  }

  async expectCancelEditCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.cancelEdit), count, timeoutMs);
  }

  async scrollCancelEditIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.cancelEdit));
  }

  async longPressSaveAndNew(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.saveAndNew));
  }

  async expectSaveAndNewHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.saveAndNew), timeoutMs);
  }

  async expectSaveAndNewText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.saveAndNew), expected, timeoutMs);
  }

  async expectSaveAndNewContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.saveAndNew), substring, timeoutMs);
  }

  async expectSaveAndNewValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.saveAndNew), value, timeoutMs);
  }

  async expectSaveAndNewEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.saveAndNew), timeoutMs);
  }

  async expectSaveAndNewDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.saveAndNew), timeoutMs);
  }

  async expectSaveAndNewChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.saveAndNew), timeoutMs);
  }

  async expectSaveAndNewUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.saveAndNew), timeoutMs);
  }

  async expectSaveAndNewFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.saveAndNew), timeoutMs);
  }

  async expectSaveAndNewCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.saveAndNew), count, timeoutMs);
  }

  async scrollSaveAndNewIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.saveAndNew));
  }

  async longPressSaveEdit(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, LeadListPage.L.saveEdit));
  }

  async expectSaveEditHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.saveEdit), timeoutMs);
  }

  async expectSaveEditText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.saveEdit), expected, timeoutMs);
  }

  async expectSaveEditContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.saveEdit), substring, timeoutMs);
  }

  async expectSaveEditValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.saveEdit), value, timeoutMs);
  }

  async expectSaveEditEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.saveEdit), timeoutMs);
  }

  async expectSaveEditDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.saveEdit), timeoutMs);
  }

  async expectSaveEditChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.saveEdit), timeoutMs);
  }

  async expectSaveEditUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.saveEdit), timeoutMs);
  }

  async expectSaveEditFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.saveEdit), timeoutMs);
  }

  async expectSaveEditCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.saveEdit), count, timeoutMs);
  }

  async scrollSaveEditIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.saveEdit));
  }

  async clearLastName(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.lastName));
  }

  async typeTextLastName(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.lastName), value);
  }

  async expectLastNameHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.lastName), timeoutMs);
  }

  async expectLastNameText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.lastName), expected, timeoutMs);
  }

  async expectLastNameContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.lastName), substring, timeoutMs);
  }

  async expectLastNameValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.lastName), value, timeoutMs);
  }

  async expectLastNameEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.lastName), timeoutMs);
  }

  async expectLastNameDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.lastName), timeoutMs);
  }

  async expectLastNameChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.lastName), timeoutMs);
  }

  async expectLastNameUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.lastName), timeoutMs);
  }

  async expectLastNameFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.lastName), timeoutMs);
  }

  async expectLastNameCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.lastName), count, timeoutMs);
  }

  async scrollLastNameIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.lastName));
  }

  async clearCompany(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, LeadListPage.L.company));
  }

  async typeTextCompany(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, LeadListPage.L.company), value);
  }

  async expectCompanyHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, LeadListPage.L.company), timeoutMs);
  }

  async expectCompanyText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, LeadListPage.L.company), expected, timeoutMs);
  }

  async expectCompanyContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, LeadListPage.L.company), substring, timeoutMs);
  }

  async expectCompanyValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, LeadListPage.L.company), value, timeoutMs);
  }

  async expectCompanyEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, LeadListPage.L.company), timeoutMs);
  }

  async expectCompanyDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, LeadListPage.L.company), timeoutMs);
  }

  async expectCompanyChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, LeadListPage.L.company), timeoutMs);
  }

  async expectCompanyUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, LeadListPage.L.company), timeoutMs);
  }

  async expectCompanyFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, LeadListPage.L.company), timeoutMs);
  }

  async expectCompanyCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, LeadListPage.L.company), count, timeoutMs);
  }

  async scrollCompanyIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, LeadListPage.L.company));
  }

}
