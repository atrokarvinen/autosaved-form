import { expect } from "@playwright/test";
import { test } from "./personFixture";

test("autosaved values persist page reload", async ({ personPage }) => {
  const name = "Atro Karvinen";
  await personPage.gotoPersonTab();
  await personPage.fillName(name);
  await personPage.verifyAutosaveComplete();

  await personPage.page.reload();

  await personPage.verifyNameHasValue(name);
});

test("autosave has debounce", async ({ personPage }) => {
  const name = "Atro Karvinen";
  await personPage.gotoPersonTab();

  const typeProgress = personPage.typeNameSlowly(name);
  for (let i = 0; i < name.length; i++) {
    await expect(personPage.getAutosaveIcon()).toBeHidden();
    await personPage.page.waitForTimeout(100);
  }
  await personPage.verifyAutosaveComplete();
});
