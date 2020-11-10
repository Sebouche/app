import { element, by, ElementFinder } from 'protractor';

export class SemesterInscriptionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-semester-inscription div table .btn-danger'));
  title = element.all(by.css('jhi-semester-inscription div h2#page-heading span')).first();
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

export class SemesterInscriptionUpdatePage {
  pageTitle = element(by.id('jhi-semester-inscription-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  notedInput = element(by.id('field_noted'));
  noteMaxInput = element(by.id('field_noteMax'));
  noteGivenInput = element(by.id('field_noteGiven'));
  paidInput = element(by.id('field_paid'));

  studentSelect = element(by.id('field_student'));
  semesterSelect = element(by.id('field_semester'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getNotedInput(): ElementFinder {
    return this.notedInput;
  }

  async setNoteMaxInput(noteMax: string): Promise<void> {
    await this.noteMaxInput.sendKeys(noteMax);
  }

  async getNoteMaxInput(): Promise<string> {
    return await this.noteMaxInput.getAttribute('value');
  }

  async setNoteGivenInput(noteGiven: string): Promise<void> {
    await this.noteGivenInput.sendKeys(noteGiven);
  }

  async getNoteGivenInput(): Promise<string> {
    return await this.noteGivenInput.getAttribute('value');
  }

  getPaidInput(): ElementFinder {
    return this.paidInput;
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

  async semesterSelectLastOption(): Promise<void> {
    await this.semesterSelect.all(by.tagName('option')).last().click();
  }

  async semesterSelectOption(option: string): Promise<void> {
    await this.semesterSelect.sendKeys(option);
  }

  getSemesterSelect(): ElementFinder {
    return this.semesterSelect;
  }

  async getSemesterSelectedOption(): Promise<string> {
    return await this.semesterSelect.element(by.css('option:checked')).getText();
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

export class SemesterInscriptionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-semesterInscription-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-semesterInscription'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
