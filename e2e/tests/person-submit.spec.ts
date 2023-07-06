import { expect } from "@playwright/test";
import { test } from "./personFixture";

test("redirects to home without prompt when submit succeeds and clears values", async ({
  personPage,
}) => {
  await personPage.gotoPersonTab();
  await personPage.fillName("Atro Karvinen");
  await personPage.submitForm();

  await personPage.verifySubmitSuccess();
  await expect(personPage.getPrompt()).toBeHidden();

  await personPage.gotoPersonTab();
  await personPage.verifyFormEmpty();
});

test("stays in page when submit fails", async ({ personPage }) => {
  const name = "Atro Karvinen";
  await personPage.gotoPersonTab();
  await personPage.fillName(name);
  await personPage.setupSubmitFailure();
  await personPage.submitForm();

  await personPage.verifySubmitFailure();
  await personPage.verifyNameHasValue(name);
});
