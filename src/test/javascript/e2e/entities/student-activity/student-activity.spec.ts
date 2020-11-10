import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StudentActivityComponentsPage, StudentActivityDeleteDialog, StudentActivityUpdatePage } from './student-activity.page-object';

const expect = chai.expect;

describe('StudentActivity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentActivityComponentsPage: StudentActivityComponentsPage;
  let studentActivityUpdatePage: StudentActivityUpdatePage;
  let studentActivityDeleteDialog: StudentActivityDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StudentActivities', async () => {
    await navBarPage.goToEntity('student-activity');
    studentActivityComponentsPage = new StudentActivityComponentsPage();
    await browser.wait(ec.visibilityOf(studentActivityComponentsPage.title), 5000);
    expect(await studentActivityComponentsPage.getTitle()).to.eq('ecomApp.studentActivity.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(studentActivityComponentsPage.entities), ec.visibilityOf(studentActivityComponentsPage.noResult)),
      1000
    );
  });

  it('should load create StudentActivity page', async () => {
    await studentActivityComponentsPage.clickOnCreateButton();
    studentActivityUpdatePage = new StudentActivityUpdatePage();
    expect(await studentActivityUpdatePage.getPageTitle()).to.eq('ecomApp.studentActivity.home.createOrEditLabel');
    await studentActivityUpdatePage.cancel();
  });

  it('should create and save StudentActivities', async () => {
    const nbButtonsBeforeCreate = await studentActivityComponentsPage.countDeleteButtons();

    await studentActivityComponentsPage.clickOnCreateButton();

    await promise.all([
      studentActivityUpdatePage.setCommentToIntructorInput('commentToIntructor'),
      studentActivityUpdatePage.setCommentByInstructorInput('commentByInstructor'),
      studentActivityUpdatePage.studentSelectLastOption(),
      studentActivityUpdatePage.activitySelectLastOption(),
    ]);

    expect(await studentActivityUpdatePage.getCommentToIntructorInput()).to.eq(
      'commentToIntructor',
      'Expected CommentToIntructor value to be equals to commentToIntructor'
    );
    expect(await studentActivityUpdatePage.getCommentByInstructorInput()).to.eq(
      'commentByInstructor',
      'Expected CommentByInstructor value to be equals to commentByInstructor'
    );

    await studentActivityUpdatePage.save();
    expect(await studentActivityUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await studentActivityComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last StudentActivity', async () => {
    const nbButtonsBeforeDelete = await studentActivityComponentsPage.countDeleteButtons();
    await studentActivityComponentsPage.clickOnLastDeleteButton();

    studentActivityDeleteDialog = new StudentActivityDeleteDialog();
    expect(await studentActivityDeleteDialog.getDialogTitle()).to.eq('ecomApp.studentActivity.delete.question');
    await studentActivityDeleteDialog.clickOnConfirmButton();

    expect(await studentActivityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
