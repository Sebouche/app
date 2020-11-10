import { element, by, ElementFinder } from 'protractor';

export class MaterialComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-material div table .btn-danger'));
  title = element.all(by.css('jhi-material div h2#page-heading span')).first();
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

export class MaterialUpdatePage {
  pageTitle = element(by.id('jhi-material-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  studentSelect = element(by.id('field_student'));
  boardSelect = element(by.id('field_board'));
  sailSelect = element(by.id('field_sail'));
  tracksuitSelect = element(by.id('field_tracksuit'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async studentSelectLastOption(): Promise<void> {
    await this.studentSelect.all(by.tagName('option')).last().click();
  }

  async studentSelectOption(option: string): Promise<void> {
    await this.studentSelect.sendKeys(option);
  }

  getStudentSelect(): ElementFinder {
    return this.studentSelect;
  }

  async getStudentSelectedOption(): Promise<string> {
    return await this.studentSelect.element(by.css('option:checked')).getText();
  }

  async boardSelectLastOption(): Promise<void> {
    await this.boardSelect.all(by.tagName('option')).last().click();
  }

  async boardSelectOption(option: string): Promise<void> {
    await this.boardSelect.sendKeys(option);
  }

  getBoardSelect(): ElementFinder {
    return this.boardSelect;
  }

  async getBoardSelectedOption(): Promise<string> {
    return await this.boardSelect.element(by.css('option:checked')).getText();
  }

  async sailSelectLastOption(): Promise<void> {
    await this.sailSelect.all(by.tagName('option')).last().click();
  }

  async sailSelectOption(option: string): Promise<void> {
    await this.sailSelect.sendKeys(option);
  }

  getSailSelect(): ElementFinder {
    return this.sailSelect;
  }

  async getSailSelectedOption(): Promise<string> {
    return await this.sailSelect.element(by.css('option:checked')).getText();
  }

  async tracksuitSelectLastOption(): Promise<void> {
    await this.tracksuitSelect.all(by.tagName('option')).last().click();
  }

  async tracksuitSelectOption(option: string): Promise<void> {
    await this.tracksuitSelect.sendKeys(option);
  }

  getTracksuitSelect(): ElementFinder {
    return this.tracksuitSelect;
  }

  async getTracksuitSelectedOption(): Promise<string> {
    return await this.tracksuitSelect.element(by.css('option:checked')).getText();
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

export class MaterialDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-material-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-material'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
