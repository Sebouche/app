import { element, by, ElementFinder } from 'protractor';

export class InstructorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-instructor div table .btn-danger'));
  title = element.all(by.css('jhi-instructor div h2#page-heading span')).first();
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

export class InstructorUpdatePage {
  pageTitle = element(by.id('jhi-instructor-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  internalUserSelect = element(by.id('field_internalUser'));
  participateActivitySelect = element(by.id('field_participateActivity'));
  editableActivitySelect = element(by.id('field_editableActivity'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async internalUserSelectLastOption(): Promise<void> {
    await this.internalUserSelect.all(by.tagName('option')).last().click();
  }

  async internalUserSelectOption(option: string): Promise<void> {
    await this.internalUserSelect.sendKeys(option);
  }

  getInternalUserSelect(): ElementFinder {
    return this.internalUserSelect;
  }

  async getInternalUserSelectedOption(): Promise<string> {
    return await this.internalUserSelect.element(by.css('option:checked')).getText();
  }

  async participateActivitySelectLastOption(): Promise<void> {
    await this.participateActivitySelect.all(by.tagName('option')).last().click();
  }

  async participateActivitySelectOption(option: string): Promise<void> {
    await this.participateActivitySelect.sendKeys(option);
  }

  getParticipateActivitySelect(): ElementFinder {
    return this.participateActivitySelect;
  }

  async getParticipateActivitySelectedOption(): Promise<string> {
    return await this.participateActivitySelect.element(by.css('option:checked')).getText();
  }

  async editableActivitySelectLastOption(): Promise<void> {
    await this.editableActivitySelect.all(by.tagName('option')).last().click();
  }

  async editableActivitySelectOption(option: string): Promise<void> {
    await this.editableActivitySelect.sendKeys(option);
  }

  getEditableActivitySelect(): ElementFinder {
    return this.editableActivitySelect;
  }

  async getEditableActivitySelectedOption(): Promise<string> {
    return await this.editableActivitySelect.element(by.css('option:checked')).getText();
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

export class InstructorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-instructor-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-instructor'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
