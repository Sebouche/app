import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SemesterInscriptionComponentsPage,
  SemesterInscriptionDeleteDialog,
  SemesterInscriptionUpdatePage,
} from './semester-inscription.page-object';

const expect = chai.expect;

describe('SemesterInscription e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let semesterInscriptionComponentsPage: SemesterInscriptionComponentsPage;
  let semesterInscriptionUpdatePage: SemesterInscriptionUpdatePage;
  let semesterInscriptionDeleteDialog: SemesterInscriptionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SemesterInscriptions', async () => {
    await navBarPage.goToEntity('semester-inscription');
    semesterInscriptionComponentsPage = new SemesterInscriptionComponentsPage();
    await browser.wait(ec.visibilityOf(semesterInscriptionComponentsPage.title), 5000);
    expect(await semesterInscriptionComponentsPage.getTitle()).to.eq('ecomApp.semesterInscription.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(semesterInscriptionComponentsPage.entities), ec.visibilityOf(semesterInscriptionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SemesterInscription page', async () => {
    await semesterInscriptionComponentsPage.clickOnCreateButton();
    semesterInscriptionUpdatePage = new SemesterInscriptionUpdatePage();
    expect(await semesterInscriptionUpdatePage.getPageTitle()).to.eq('ecomApp.semesterInscription.home.createOrEditLabel');
    await semesterInscriptionUpdatePage.cancel();
  });

  it('should create and save SemesterInscriptions', async () => {
    const nbButtonsBeforeCreate = await semesterInscriptionComponentsPage.countDeleteButtons();

    await semesterInscriptionComponentsPage.clickOnCreateButton();

    await promise.all([
      semesterInscriptionUpdatePage.setNoteMaxInput('5'),
      semesterInscriptionUpdatePage.setNoteGivenInput('5'),
      semesterInscriptionUpdatePage.studentSelectLastOption(),
      semesterInscriptionUpdatePage.semesterSelectLastOption(),
    ]);

    const selectedNoted = semesterInscriptionUpdatePage.getNotedInput();
    if (await selectedNoted.isSelected()) {
      await semesterInscriptionUpdatePage.getNotedInput().click();
      expect(await semesterInscriptionUpdatePage.getNotedInput().isSelected(), 'Expected noted not to be selected').to.be.false;
    } else {
      await semesterInscriptionUpdatePage.getNotedInput().click();
      expect(await semesterInscriptionUpdatePage.getNotedInput().isSelected(), 'Expected noted to be selected').to.be.true;
    }
    expect(await semesterInscriptionUpdatePage.getNoteMaxInput()).to.eq('5', 'Expected noteMax value to be equals to 5');
    expect(await semesterInscriptionUpdatePage.getNoteGivenInput()).to.eq('5', 'Expected noteGiven value to be equals to 5');
    const selectedPaid = semesterInscriptionUpdatePage.getPaidInput();
    if (await selectedPaid.isSelected()) {
      await semesterInscriptionUpdatePage.getPaidInput().click();
      expect(await semesterInscriptionUpdatePage.getPaidInput().isSelected(), 'Expected paid not to be selected').to.be.false;
    } else {
      await semesterInscriptionUpdatePage.getPaidInput().click();
      expect(await semesterInscriptionUpdatePage.getPaidInput().isSelected(), 'Expected paid to be selected').to.be.true;
    }

    await semesterInscriptionUpdatePage.save();
    expect(await semesterInscriptionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await semesterInscriptionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SemesterInscription', async () => {
    const nbButtonsBeforeDelete = await semesterInscriptionComponentsPage.countDeleteButtons();
    await semesterInscriptionComponentsPage.clickOnLastDeleteButton();

    semesterInscriptionDeleteDialog = new SemesterInscriptionDeleteDialog();
    expect(await semesterInscriptionDeleteDialog.getDialogTitle()).to.eq('ecomApp.semesterInscription.delete.question');
    await semesterInscriptionDeleteDialog.clickOnConfirmButton();

    expect(await semesterInscriptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
