import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BoardComponentsPage, BoardDeleteDialog, BoardUpdatePage } from './board.page-object';

const expect = chai.expect;

describe('Board e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let boardComponentsPage: BoardComponentsPage;
  let boardUpdatePage: BoardUpdatePage;
  let boardDeleteDialog: BoardDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Boards', async () => {
    await navBarPage.goToEntity('board');
    boardComponentsPage = new BoardComponentsPage();
    await browser.wait(ec.visibilityOf(boardComponentsPage.title), 5000);
    expect(await boardComponentsPage.getTitle()).to.eq('ecomApp.board.home.title');
    await browser.wait(ec.or(ec.visibilityOf(boardComponentsPage.entities), ec.visibilityOf(boardComponentsPage.noResult)), 1000);
  });

  it('should load create Board page', async () => {
    await boardComponentsPage.clickOnCreateButton();
    boardUpdatePage = new BoardUpdatePage();
    expect(await boardUpdatePage.getPageTitle()).to.eq('ecomApp.board.home.createOrEditLabel');
    await boardUpdatePage.cancel();
  });

  it('should create and save Boards', async () => {
    const nbButtonsBeforeCreate = await boardComponentsPage.countDeleteButtons();

    await boardComponentsPage.clickOnCreateButton();

    await promise.all([
      boardUpdatePage.setBoardIdInput('boardId'),
      boardUpdatePage.setNameInput('name'),
      boardUpdatePage.setVolumeInput('5'),
      boardUpdatePage.levelSelectLastOption(),
      boardUpdatePage.setCommentInput('comment'),
    ]);

    expect(await boardUpdatePage.getBoardIdInput()).to.eq('boardId', 'Expected BoardId value to be equals to boardId');
    expect(await boardUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await boardUpdatePage.getVolumeInput()).to.eq('5', 'Expected volume value to be equals to 5');
    const selectedUsable = boardUpdatePage.getUsableInput();
    if (await selectedUsable.isSelected()) {
      await boardUpdatePage.getUsableInput().click();
      expect(await boardUpdatePage.getUsableInput().isSelected(), 'Expected usable not to be selected').to.be.false;
    } else {
      await boardUpdatePage.getUsableInput().click();
      expect(await boardUpdatePage.getUsableInput().isSelected(), 'Expected usable to be selected').to.be.true;
    }
    expect(await boardUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');

    await boardUpdatePage.save();
    expect(await boardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await boardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Board', async () => {
    const nbButtonsBeforeDelete = await boardComponentsPage.countDeleteButtons();
    await boardComponentsPage.clickOnLastDeleteButton();

    boardDeleteDialog = new BoardDeleteDialog();
    expect(await boardDeleteDialog.getDialogTitle()).to.eq('ecomApp.board.delete.question');
    await boardDeleteDialog.clickOnConfirmButton();

    expect(await boardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
