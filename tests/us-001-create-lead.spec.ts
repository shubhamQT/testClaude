import { test, expect } from '@support/fixtures';
import env from '@support/env';
import testData from '@testdata/test-data.json';

test.describe('US-001 — Create Lead E2E', () => {
  test('E2E: Validation error shown when Last Name is left blank during Lead creation', { tag: ["@e2e","@regression","@lead","@P0","@case-a35ba65a-9111-44bb-a2c4-b046a47fad44"] }, async ({ page, homePage, leadListPage }) => {
    await test.step('Before — User is authenticated as Sales Representative', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Click — Navigate to Leads tab', async () => {
      await homePage.clickLeads();
    });

    await test.step('Click — Click New button', async () => {
      await leadListPage.clickNew();
    });

    await test.step('Assert visible — New Lead form is displayed', async () => {
      await leadListPage.expectNewLeadVisible();
    });

    await test.step('Fill — Enter First Name', async () => {
      await leadListPage.fillFirstName(testData.e2eValidationErrorShownWhenLastNameIsLeftBlankDuringLeadCreation.enterFirstName);
    });

    await test.step('Fill — Enter Company only, leave Last Name blank', async () => {
      await leadListPage.fillCompany(testData.e2eValidationErrorShownWhenLastNameIsLeftBlankDuringLeadCreation.enterCompanyOnlyLeaveLastNameBlank);
    });

    await test.step('Click — Click Save button', async () => {
      await leadListPage.clickSaveEdit();
    });

    await test.step('Assert visible — Validation error appears for Last Name field', async () => {
      await expect(page.getByText(/Complete this field|required/i).first()).toBeVisible();
    });

    await test.step('Assert visible — User remains on New Lead form (not saved)', async () => {
      await leadListPage.expectNewLeadVisible();
    });
  });
});

  test('E2E: Validation error shown when Company is left blank during Lead creation', { tag: ["@e2e","@regression","@lead","@P0","@case-1d359d6b-c158-4800-885b-1fd23364f0fb"] }, async ({ page, homePage, leadListPage }) => {
    await test.step('Before — User is authenticated as Sales Representative', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Click — Navigate to Leads tab', async () => {
      await homePage.clickLeads();
    });

    await test.step('Click — Click New button', async () => {
      await leadListPage.clickNew();
    });

    await test.step('Assert visible — New Lead form is displayed', async () => {
      await leadListPage.expectNewLeadVisible();
    });

    await test.step('Fill — Enter First Name', async () => {
      await leadListPage.fillFirstName(testData.e2eValidationErrorShownWhenCompanyIsLeftBlankDuringLeadCreation.enterFirstName);
    });

    await test.step('Fill — Enter Last Name only, leave Company blank', async () => {
      await leadListPage.fillLastName(testData.e2eValidationErrorShownWhenCompanyIsLeftBlankDuringLeadCreation.enterLastNameOnlyLeaveCompanyBlank);
    });

    await test.step('Click — Click Save button', async () => {
      await leadListPage.clickSaveEdit();
    });

    await test.step('Assert visible — Validation error appears for Company field', async () => {
      await expect(page.locator('text=/Complete this field|required/i').first()).toBeVisible();
    });

    await test.step('Assert visible — User remains on New Lead form (not saved)', async () => {
      await leadListPage.expectNewLeadVisible();
    });
  });
