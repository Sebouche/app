import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InstructorComponentsPage, InstructorDeleteDialog, InstructorUpdatePage } from './instructor.page-object';

const expect = chai.expect;

describe('Instructor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let instructorComponentsPage: InstructorComponentsPage;
  let instructorUpdatePage: InstructorUpdatePage;
  let instructorDeleteDialog: InstructorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Instructors', async () => {
    await navBarPage.goToEntity('instructor');
    instructorComponentsPage = new InstructorComponentsPage();
    await browser.wait(ec.visibilityOf(instructorComponentsPage.title), 5000);
    expect(await instructorComponentsPage.getTitle()).to.eq('ecomApp.instructor.home.title');
    await browser.wait(ec.or(ec.visibilityOf(instructorComponentsPage.entities), ec.visibilityOf(instructorComponentsPage.noResult)), 1000);
  });

  it('should load create Instructor page', async () => {
    await instructorComponentsPage.clickOnCreateButton();
    instructorUpdatePage = new InstructorUpdatePage();
    expect(await instructorUpdatePage.getPageTitle()).to.eq('ecomApp.instructor.home.createOrEditLabel');
    await instructorUpdatePage.cancel();
  });

  it('should create and save Instructors', async () => {
    const nbButtonsBeforeCreate = await instructorComponentsPage.countDeleteButtons();

    await instructorComponentsPage.clickOnCreateButton();

    await promise.all([
      instructorUpdatePage.internalUserSelectLastOption(),
      // instructorUpdatePage.participateActivitySelectLastOption(),
      // instructorUpdatePage.editableActivitySelectLastOption(),
    ]);

    await instructorUpdatePage.save();
    expect(await instructorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await instructorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Instructor', async () => {
    const nbButtonsBeforeDelete = await instructorComponentsPage.countDeleteButtons();
    await instructorComponentsPage.clickOnLastDeleteButton();

    instructorDeleteDialog = new InstructorDeleteDialog();
    expect(await instructorDeleteDialog.getDialogTitle()).to.eq('ecomApp.instructor.delete.question');
    await instructorDeleteDialog.clickOnConfirmButton();

    expect(await instructorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
