import { element, by, ElementFinder } from 'protractor';

export class BoardComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-board div table .btn-danger'));
  title = element.all(by.css('jhi-board div h2#page-heading span')).first();
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

export class BoardUpdatePage {
  pageTitle = element(by.id('jhi-board-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  boardIdInput = element(by.id('field_boardId'));
  nameInput = element(by.id('field_name'));
  volumeInput = element(by.id('field_volume'));
  levelSelect = element(by.id('field_level'));
  usableInput = element(by.id('field_usable'));
  commentInput = element(by.id('field_comment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setBoardIdInput(boardId: string): Promise<void> {
    await this.boardIdInput.sendKeys(boardId);
  }

  async getBoardIdInput(): Promise<string> {
    return await this.boardIdInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setVolumeInput(volume: string): Promise<void> {
    await this.volumeInput.sendKeys(volume);
  }

  async getVolumeInput(): Promise<string> {
    return await this.volumeInput.getAttribute('value');
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

export class BoardDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-board-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-board'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
