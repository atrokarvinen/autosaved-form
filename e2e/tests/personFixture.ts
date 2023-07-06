import { test as base } from "@playwright/test";
import { PersonPage } from "./personPage";

type Fixture = { personPage: PersonPage };

export const test = base.extend<Fixture>({
  personPage: async ({ page }, use) => {
    const personPage = new PersonPage(page);
    await page.goto("/");
    await use(personPage);
  },
});
