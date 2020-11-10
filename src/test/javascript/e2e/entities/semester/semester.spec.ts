import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SemesterComponentsPage, SemesterDeleteDialog, SemesterUpdatePage } from './semester.page-object';

const expect = chai.expect;

describe('Semester e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let semesterComponentsPage: SemesterComponentsPage;
  let semesterUpdatePage: SemesterUpdatePage;
  let semesterDeleteDialog: SemesterDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Semesters', async () => {
    await navBarPage.goToEntity('semester');
    semesterComponentsPage = new SemesterComponentsPage();
    await browser.wait(ec.visibilityOf(semesterComponentsPage.title), 5000);
    expect(await semesterComponentsPage.getTitle()).to.eq('ecomApp.semester.home.title');
    await browser.wait(ec.or(ec.visibilityOf(semesterComponentsPage.entities), ec.visibilityOf(semesterComponentsPage.noResult)), 1000);
  });

  it('should load create Semester page', async () => {
    await semesterComponentsPage.clickOnCreateButton();
    semesterUpdatePage = new SemesterUpdatePage();
    expect(await semesterUpdatePage.getPageTitle()).to.eq('ecomApp.semester.home.createOrEditLabel');
    await semesterUpdatePage.cancel();
  });

  it('should create and save Semesters', async () => {
    const nbButtonsBeforeCreate = await semesterComponentsPage.countDeleteButtons();

    await semesterComponentsPage.clickOnCreateButton();

    await promise.all([semesterUpdatePage.setStartDateInput('2000-12-31'), semesterUpdatePage.setEndDateInput('2000-12-31')]);

    expect(await semesterUpdatePage.getStartDateInput()).to.eq('2000-12-31', 'Expected startDate value to be equals to 2000-12-31');
    expect(await semesterUpdatePage.getEndDateInput()).to.eq('2000-12-31', 'Expected endDate value to be equals to 2000-12-31');

    await semesterUpdatePage.save();
    expect(await semesterUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await semesterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Semester', async () => {
    const nbButtonsBeforeDelete = await semesterComponentsPage.countDeleteButtons();
    await semesterComponentsPage.clickOnLastDeleteButton();

    semesterDeleteDialog = new SemesterDeleteDialog();
    expect(await semesterDeleteDialog.getDialogTitle()).to.eq('ecomApp.semester.delete.question');
    await semesterDeleteDialog.clickOnConfirmButton();

    expect(await semesterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
