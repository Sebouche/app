import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SailComponentsPage, SailDeleteDialog, SailUpdatePage } from './sail.page-object';

const expect = chai.expect;

describe('Sail e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sailComponentsPage: SailComponentsPage;
  let sailUpdatePage: SailUpdatePage;
  let sailDeleteDialog: SailDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sails', async () => {
    await navBarPage.goToEntity('sail');
    sailComponentsPage = new SailComponentsPage();
    await browser.wait(ec.visibilityOf(sailComponentsPage.title), 5000);
    expect(await sailComponentsPage.getTitle()).to.eq('ecomApp.sail.home.title');
    await browser.wait(ec.or(ec.visibilityOf(sailComponentsPage.entities), ec.visibilityOf(sailComponentsPage.noResult)), 1000);
  });

  it('should load create Sail page', async () => {
    await sailComponentsPage.clickOnCreateButton();
    sailUpdatePage = new SailUpdatePage();
    expect(await sailUpdatePage.getPageTitle()).to.eq('ecomApp.sail.home.createOrEditLabel');
    await sailUpdatePage.cancel();
  });

  it('should create and save Sails', async () => {
    const nbButtonsBeforeCreate = await sailComponentsPage.countDeleteButtons();

    await sailComponentsPage.clickOnCreateButton();

    await promise.all([
      sailUpdatePage.setSailIdInput('sailId'),
      sailUpdatePage.setNameInput('name'),
      sailUpdatePage.setAreaInput('5'),
      sailUpdatePage.levelSelectLastOption(),
      sailUpdatePage.setCommentInput('comment'),
    ]);

    expect(await sailUpdatePage.getSailIdInput()).to.eq('sailId', 'Expected SailId value to be equals to sailId');
    expect(await sailUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await sailUpdatePage.getAreaInput()).to.eq('5', 'Expected area value to be equals to 5');
    const selectedUsable = sailUpdatePage.getUsableInput();
    if (await selectedUsable.isSelected()) {
      await sailUpdatePage.getUsableInput().click();
      expect(await sailUpdatePage.getUsableInput().isSelected(), 'Expected usable not to be selected').to.be.false;
    } else {
      await sailUpdatePage.getUsableInput().click();
      expect(await sailUpdatePage.getUsableInput().isSelected(), 'Expected usable to be selected').to.be.true;
    }
    expect(await sailUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');

    await sailUpdatePage.save();
    expect(await sailUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Sail', async () => {
    const nbButtonsBeforeDelete = await sailComponentsPage.countDeleteButtons();
    await sailComponentsPage.clickOnLastDeleteButton();

    sailDeleteDialog = new SailDeleteDialog();
    expect(await sailDeleteDialog.getDialogTitle()).to.eq('ecomApp.sail.delete.question');
    await sailDeleteDialog.clickOnConfirmButton();

    expect(await sailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
