import { element, by, ElementFinder } from 'protractor';

export class SailComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sail div table .btn-danger'));
  title = element.all(by.css('jhi-sail div h2#page-heading span')).first();
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

export class SailUpdatePage {
  pageTitle = element(by.id('jhi-sail-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  sailIdInput = element(by.id('field_sailId'));
  nameInput = element(by.id('field_name'));
  areaInput = element(by.id('field_area'));
  levelSelect = element(by.id('field_level'));
  usableInput = element(by.id('field_usable'));
  commentInput = element(by.id('field_comment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSailIdInput(sailId: string): Promise<void> {
    await this.sailIdInput.sendKeys(sailId);
  }

  async getSailIdInput(): Promise<string> {
    return await this.sailIdInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setAreaInput(area: string): Promise<void> {
    await this.areaInput.sendKeys(area);
  }

  async getAreaInput(): Promise<string> {
    return await this.areaInput.getAttribute('value');
  }

  async setLevelSelect(level: string): Promise<void> {
    await this.levelSelect.sendKeys(level);
  }

  async getLevelSelect(): Promise<string> {
    return await this.levelSelect.element(by.css('option:checked')).getText();
  }

  async levelSelectLastOption(): Promise<void> {
    await this.levelSelect.all(by.tagName('option')).last().click();
  }

  getUsableInput(): ElementFinder {
    return this.usableInput;
  }

  async setCommentInput(comment: string): Promise<void> {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput(): Promise<string> {
    return await this.commentInput.getAttribute('value');
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

export class SailDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sail-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sail'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
