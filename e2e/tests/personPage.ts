import { Page, expect } from "@playwright/test";

export class PersonPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoPersonTab() {
    await this.page.getByText(/person/i).click();
  }

  async fillName(name: string) {
    const nameField = this.page.getByLabel(/name/i);
    await nameField.fill(name);
    await nameField.blur();
  }

  async typeNameSlowly(name: string) {
    const nameField = this.page.getByLabel(/name/i);
    await nameField.type(name, { delay: 100 });
    await nameField.blur();
  }

  async changeTab() {
    await this.page.getByText(/account/i).click();
  }

  getPrompt() {
    return this.page.getByText(/Are you sure/i);
  }

  async confirmPrompt() {
    await this.page.getByText(/confirm/i).click();
  }

  async cancelPrompt() {
    await this.page.getByText(/cancel/i).click();
  }

  async verifyFormEmpty() {
    await expect(this.page.getByLabel(/name/i)).toBeEmpty();
    await expect(this.page.getByLabel(/address/i)).toBeEmpty();
    await expect(this.page.getByLabel(/age/i)).toHaveValue("0");
  }

  async verifyNameHasValue(name: string) {
    await expect(this.page.getByLabel(/name/i)).toHaveValue(name);
  }

  async submitForm() {
    await this.page.getByText(/submit/i).click();
  }

  async verifySubmitSuccess() {
    const homeTab = this.page.getByRole("tab", { name: /home/i });
    await expect(homeTab).toHaveClass(/selected/);
  }

  async setupSubmitFailure() {
    await this.page.getByText(/fail submission/i).click();
  }

  async verifySubmitFailure() {
    await expect(this.page.getByText(/submission failed/i)).toBeVisible();
  }

  getAutosaveIcon() {
    return this.page.getByTestId("save-icon");
  }

  async verifyAutosaveComplete() {
    const saveIcon = this.getAutosaveIcon();
    await expect(saveIcon).toBeVisible();
    await expect(saveIcon).toBeHidden();
  }
}
