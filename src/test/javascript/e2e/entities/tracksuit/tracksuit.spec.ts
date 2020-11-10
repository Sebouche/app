import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TracksuitComponentsPage, TracksuitDeleteDialog, TracksuitUpdatePage } from './tracksuit.page-object';

const expect = chai.expect;

describe('Tracksuit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tracksuitComponentsPage: TracksuitComponentsPage;
  let tracksuitUpdatePage: TracksuitUpdatePage;
  let tracksuitDeleteDialog: TracksuitDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tracksuits', async () => {
    await navBarPage.goToEntity('tracksuit');
    tracksuitComponentsPage = new TracksuitComponentsPage();
    await browser.wait(ec.visibilityOf(tracksuitComponentsPage.title), 5000);
    expect(await tracksuitComponentsPage.getTitle()).to.eq('ecomApp.tracksuit.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tracksuitComponentsPage.entities), ec.visibilityOf(tracksuitComponentsPage.noResult)), 1000);
  });

  it('should load create Tracksuit page', async () => {
    await tracksuitComponentsPage.clickOnCreateButton();
    tracksuitUpdatePage = new TracksuitUpdatePage();
    expect(await tracksuitUpdatePage.getPageTitle()).to.eq('ecomApp.tracksuit.home.createOrEditLabel');
    await tracksuitUpdatePage.cancel();
  });

  it('should create and save Tracksuits', async () => {
    const nbButtonsBeforeCreate = await tracksuitComponentsPage.countDeleteButtons();

    await tracksuitComponentsPage.clickOnCreateButton();

    await promise.all([
      tracksuitUpdatePage.setTracksuitIdInput('5'),
      tracksuitUpdatePage.setNameInput('name'),
      tracksuitUpdatePage.setSizeMinInput('5'),
      tracksuitUpdatePage.setSizeMaxInput('5'),
      tracksuitUpdatePage.setWeightMinInput('5'),
      tracksuitUpdatePage.setWeightMaxInput('5'),
      tracksuitUpdatePage.setCommentInput('comment'),
    ]);

    expect(await tracksuitUpdatePage.getTracksuitIdInput()).to.eq('5', 'Expected tracksuitId value to be equals to 5');
    expect(await tracksuitUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await tracksuitUpdatePage.getSizeMinInput()).to.eq('5', 'Expected sizeMin value to be equals to 5');
    expect(await tracksuitUpdatePage.getSizeMaxInput()).to.eq('5', 'Expected sizeMax value to be equals to 5');
    expect(await tracksuitUpdatePage.getWeightMinInput()).to.eq('5', 'Expected weightMin value to be equals to 5');
    expect(await tracksuitUpdatePage.getWeightMaxInput()).to.eq('5', 'Expected weightMax value to be equals to 5');
    expect(await tracksuitUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');

    await tracksuitUpdatePage.save();
    expect(await tracksuitUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tracksuitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tracksuit', async () => {
    const nbButtonsBeforeDelete = await tracksuitComponentsPage.countDeleteButtons();
    await tracksuitComponentsPage.clickOnLastDeleteButton();

    tracksuitDeleteDialog = new TracksuitDeleteDialog();
    expect(await tracksuitDeleteDialog.getDialogTitle()).to.eq('ecomApp.tracksuit.delete.question');
    await tracksuitDeleteDialog.clickOnConfirmButton();

    expect(await tracksuitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
