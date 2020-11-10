import { element, by, ElementFinder } from 'protractor';

export class ActivityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-activity div table .btn-danger'));
  title = element.all(by.css('jhi-activity div h2#page-heading span')).first();
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

export class ActivityUpdatePage {
  pageTitle = element(by.id('jhi-activity-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  dateInput = element(by.id('field_date'));
  placeInput = element(by.id('field_place'));
  capacityInput = element(by.id('field_capacity'));
  inscriptionOpenInput = element(by.id('field_inscriptionOpen'));
  coeffInput = element(by.id('field_coeff'));
  lakeSelect = element(by.id('field_lake'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setPlaceInput(place: string): Promise<void> {
    await this.placeInput.sendKeys(place);
  }

  async getPlaceInput(): Promise<string> {
    return await this.placeInput.getAttribute('value');
  }

  async setCapacityInput(capacity: string): Promise<void> {
    await this.capacityInput.sendKeys(capacity);
  }

  async getCapacityInput(): Promise<string> {
    return await this.capacityInput.getAttribute('value');
  }

  getInscriptionOpenInput(): ElementFinder {
    return this.inscriptionOpenInput;
  }

  async setCoeffInput(coeff: string): Promise<void> {
    await this.coeffInput.sendKeys(coeff);
  }

  async getCoeffInput(): Promise<string> {
    return await this.coeffInput.getAttribute('value');
  }

  async setLakeSelect(lake: string): Promise<void> {
    await this.lakeSelect.sendKeys(lake);
  }

  async getLakeSelect(): Promise<string> {
    return await this.lakeSelect.element(by.css('option:checked')).getText();
  }

  async lakeSelectLastOption(): Promise<void> {
    await this.lakeSelect.all(by.tagName('option')).last().click();
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

export class ActivityDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-activity-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-activity'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
