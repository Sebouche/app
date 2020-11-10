import { element, by, ElementFinder } from 'protractor';

export class StudentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-student div table .btn-danger'));
  title = element.all(by.css('jhi-student div h2#page-heading span')).first();
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

export class StudentUpdatePage {
  pageTitle = element(by.id('jhi-student-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  sportLevelSelect = element(by.id('field_sportLevel'));
  drivingLicenceInput = element(by.id('field_drivingLicence'));
  meetingPlaceSelect = element(by.id('field_meetingPlace'));

  internalUserSelect = element(by.id('field_internalUser'));
  cursusSelect = element(by.id('field_cursus'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSportLevelSelect(sportLevel: string): Promise<void> {
    await this.sportLevelSelect.sendKeys(sportLevel);
  }

  async getSportLevelSelect(): Promise<string> {
    return await this.sportLevelSelect.element(by.css('option:checked')).getText();
  }

  async sportLevelSelectLastOption(): Promise<void> {
    await this.sportLevelSelect.all(by.tagName('option')).last().click();
  }

  getDrivingLicenceInput(): ElementFinder {
    return this.drivingLicenceInput;
  }

  async setMeetingPlaceSelect(meetingPlace: string): Promise<void> {
    await this.meetingPlaceSelect.sendKeys(meetingPlace);
  }

  async getMeetingPlaceSelect(): Promise<string> {
    return await this.meetingPlaceSelect.element(by.css('option:checked')).getText();
  }

  async meetingPlaceSelectLastOption(): Promise<void> {
    await this.meetingPlaceSelect.all(by.tagName('option')).last().click();
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

  async cursusSelectLastOption(): Promise<void> {
    await this.cursusSelect.all(by.tagName('option')).last().click();
  }

  async cursusSelectOption(option: string): Promise<void> {
    await this.cursusSelect.sendKeys(option);
  }

  getCursusSelect(): ElementFinder {
    return this.cursusSelect;
  }

  async getCursusSelectedOption(): Promise<string> {
    return await this.cursusSelect.element(by.css('option:checked')).getText();
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

export class StudentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-student-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-student'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
