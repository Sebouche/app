import { element, by, ElementFinder } from 'protractor';

export class TracksuitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tracksuit div table .btn-danger'));
  title = element.all(by.css('jhi-tracksuit div h2#page-heading span')).first();
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

export class TracksuitUpdatePage {
  pageTitle = element(by.id('jhi-tracksuit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tracksuitIdInput = element(by.id('field_tracksuitId'));
  nameInput = element(by.id('field_name'));
  sizeMinInput = element(by.id('field_sizeMin'));
  sizeMaxInput = element(by.id('field_sizeMax'));
  weightMinInput = element(by.id('field_weightMin'));
  weightMaxInput = element(by.id('field_weightMax'));
  commentInput = element(by.id('field_comment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTracksuitIdInput(tracksuitId: string): Promise<void> {
    await this.tracksuitIdInput.sendKeys(tracksuitId);
  }

  async getTracksuitIdInput(): Promise<string> {
    return await this.tracksuitIdInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSizeMinInput(sizeMin: string): Promise<void> {
    await this.sizeMinInput.sendKeys(sizeMin);
  }

  async getSizeMinInput(): Promise<string> {
    return await this.sizeMinInput.getAttribute('value');
  }

  async setSizeMaxInput(sizeMax: string): Promise<void> {
    await this.sizeMaxInput.sendKeys(sizeMax);
  }

  async getSizeMaxInput(): Promise<string> {
    return await this.sizeMaxInput.getAttribute('value');
  }

  async setWeightMinInput(weightMin: string): Promise<void> {
    await this.weightMinInput.sendKeys(weightMin);
  }

  async getWeightMinInput(): Promise<string> {
    return await this.weightMinInput.getAttribute('value');
  }

  async setWeightMaxInput(weightMax: string): Promise<void> {
    await this.weightMaxInput.sendKeys(weightMax);
  }

  async getWeightMaxInput(): Promise<string> {
    return await this.weightMaxInput.getAttribute('value');
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

export class TracksuitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tracksuit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tracksuit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
