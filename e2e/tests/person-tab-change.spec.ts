import { expect } from "@playwright/test";
import { test } from "./personFixture";

test("prompts when there are unsaved changes", async ({ personPage }) => {
  await personPage.gotoPersonTab();
  await personPage.fillName("Atro Karvinen");
  await personPage.changeTab();

  await expect(personPage.getPrompt()).toBeVisible();
});

test("does not prompt when there are no changes", async ({ personPage }) => {
  await personPage.gotoPersonTab();
  await personPage.changeTab();

  expect(personPage.page.url()).toContain("/account");
  await expect(personPage.getPrompt()).toBeHidden();
});

test("proceeds and erases typed form values when user confirms prompt", async ({
  personPage,
}) => {
  await personPage.gotoPersonTab();
  await personPage.fillName("Atro Karvinen");
  await personPage.changeTab();

  await expect(personPage.getPrompt()).toBeVisible();

  await personPage.confirmPrompt();

  await expect(personPage.getPrompt()).toBeHidden();
  expect(personPage.page.url()).toContain("/account");

  await personPage.gotoPersonTab();
  await personPage.verifyFormEmpty();
});

test("stays in tab when user cancels prompt", async ({ personPage }) => {
  const name = "Atro Karvinen";
  await personPage.gotoPersonTab();
  await personPage.fillName(name);
  await personPage.changeTab();

  await expect(personPage.getPrompt()).toBeVisible();

  await personPage.cancelPrompt();

  await expect(personPage.getPrompt()).toBeHidden();
  await personPage.verifyNameHasValue(name);
});
