import { element, by, ElementFinder } from 'protractor';

export class StudentActivityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-student-activity div table .btn-danger'));
  title = element.all(by.css('jhi-student-activity div h2#page-heading span')).first();
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

export class StudentActivityUpdatePage {
  pageTitle = element(by.id('jhi-student-activity-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  commentToIntructorInput = element(by.id('field_commentToIntructor'));
  commentByInstructorInput = element(by.id('field_commentByInstructor'));

  studentSelect = element(by.id('field_student'));
  activitySelect = element(by.id('field_activity'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCommentToIntructorInput(commentToIntructor: string): Promise<void> {
    await this.commentToIntructorInput.sendKeys(commentToIntructor);
  }

  async getCommentToIntructorInput(): Promise<string> {
    return await this.commentToIntructorInput.getAttribute('value');
  }

  async setCommentByInstructorInput(commentByInstructor: string): Promise<void> {
    await this.commentByInstructorInput.sendKeys(commentByInstructor);
  }

  async getCommentByInstructorInput(): Promise<string> {
    return await this.commentByInstructorInput.getAttribute('value');
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

  async activitySelectLastOption(): Promise<void> {
    await this.activitySelect.all(by.tagName('option')).last().click();
  }

  async activitySelectOption(option: string): Promise<void> {
    await this.activitySelect.sendKeys(option);
  }

  getActivitySelect(): ElementFinder {
    return this.activitySelect;
  }

  async getActivitySelectedOption(): Promise<string> {
    return await this.activitySelect.element(by.css('option:checked')).getText();
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

export class StudentActivityDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-studentActivity-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-studentActivity'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
