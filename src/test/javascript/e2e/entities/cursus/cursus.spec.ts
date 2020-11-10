import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CursusComponentsPage, CursusDeleteDialog, CursusUpdatePage } from './cursus.page-object';

const expect = chai.expect;

describe('Cursus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cursusComponentsPage: CursusComponentsPage;
  let cursusUpdatePage: CursusUpdatePage;
  let cursusDeleteDialog: CursusDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cursuses', async () => {
    await navBarPage.goToEntity('cursus');
    cursusComponentsPage = new CursusComponentsPage();
    await browser.wait(ec.visibilityOf(cursusComponentsPage.title), 5000);
    expect(await cursusComponentsPage.getTitle()).to.eq('ecomApp.cursus.home.title');
    await browser.wait(ec.or(ec.visibilityOf(cursusComponentsPage.entities), ec.visibilityOf(cursusComponentsPage.noResult)), 1000);
  });

  it('should load create Cursus page', async () => {
    await cursusComponentsPage.clickOnCreateButton();
    cursusUpdatePage = new CursusUpdatePage();
    expect(await cursusUpdatePage.getPageTitle()).to.eq('ecomApp.cursus.home.createOrEditLabel');
    await cursusUpdatePage.cancel();
  });

  it('should create and save Cursuses', async () => {
    const nbButtonsBeforeCreate = await cursusComponentsPage.countDeleteButtons();

    await cursusComponentsPage.clickOnCreateButton();

    await promise.all([cursusUpdatePage.composantSelectLastOption(), cursusUpdatePage.setAcademicLevelInput('5')]);

    expect(await cursusUpdatePage.getAcademicLevelInput()).to.eq('5', 'Expected academicLevel value to be equals to 5');

    await cursusUpdatePage.save();
    expect(await cursusUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cursusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cursus', async () => {
    const nbButtonsBeforeDelete = await cursusComponentsPage.countDeleteButtons();
    await cursusComponentsPage.clickOnLastDeleteButton();

    cursusDeleteDialog = new CursusDeleteDialog();
    expect(await cursusDeleteDialog.getDialogTitle()).to.eq('ecomApp.cursus.delete.question');
    await cursusDeleteDialog.clickOnConfirmButton();

    expect(await cursusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
