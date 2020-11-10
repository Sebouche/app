import { element, by, ElementFinder } from 'protractor';

export class CursusComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cursus div table .btn-danger'));
  title = element.all(by.css('jhi-cursus div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CursusUpdatePage {
  pageTitle = element(by.id('jhi-cursus-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  composantSelect = element(by.id('field_composant'));
  academicLevelInput = element(by.id('field_academicLevel'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setComposantSelect(composant: string): Promise<void> {
    await this.composantSelect.sendKeys(composant);
  }

  async getComposantSelect(): Promise<string> {
    return await this.composantSelect.element(by.css('option:checked')).getText();
  }

  async composantSelectLastOption(): Promise<void> {
    await this.composantSelect.all(by.tagName('option')).last().click();
  }

  async setAcademicLevelInput(academicLevel: string): Promise<void> {
    await this.academicLevelInput.sendKeys(academicLevel);
  }

  async getAcademicLevelInput(): Promise<string> {
    return await this.academicLevelInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CursusDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cursus-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cursus'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
