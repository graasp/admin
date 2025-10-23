import { ACCOUNT_SETTINGS_PATH } from '../../../../src/config/paths';
import {
  PASSWORD_CREATE_CONTAINER_ID,
  PASSWORD_DISPLAY_CONTAINER_ID,
  PASSWORD_EDIT_BUTTON_ID,
  PASSWORD_EDIT_CONTAINER_ID,
  PASSWORD_INPUT_CONFIRM_PASSWORD_ID,
  PASSWORD_INPUT_CURRENT_PASSWORD_ID,
  PASSWORD_INPUT_NEW_PASSWORD_ID,
  PASSWORD_SAVE_BUTTON_ID,
} from '../../../../src/config/selectors';
import { MEMBERS } from '../../../fixtures/members';

const MOCK_CURRENT_PASSWORD = 'qwertzuiop1!D';
const WEAK_PASSWORD = 'weakPassword';
const STRONG_PASSWORD = 'StrongPassword123';

const submitPasswordForm = ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}: {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}) => {
  if (currentPassword) {
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}`).type(currentPassword);
  }
  if (newPassword) {
    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(newPassword);
  }
  if (confirmNewPassword) {
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(confirmNewPassword);
  }
};

const openPasswordEdition = () => {
  cy.get(`#${PASSWORD_EDIT_BUTTON_ID}`).click();
};

describe('Create new password', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: MEMBERS.BOB,
      hasPassword: false,
    });
    cy.visit(ACCOUNT_SETTINGS_PATH);
    cy.wait('@getCurrentMember');
  });

  it('Show configure message when no password is set', () => {
    cy.get(`#${PASSWORD_DISPLAY_CONTAINER_ID}`).should(
      'contain',
      "Add a password by clicking on the 'Configure' button",
    );
    cy.get(`#${PASSWORD_EDIT_BUTTON_ID}`).should('contain', 'Configure');
  });

  it('Show error on empty inputs', () => {
    openPasswordEdition();

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).should('be.disabled');

    // should show input required message
    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}-helper-text`).should(
      'contain',
      'This field is required',
    );
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}-helper-text`).should(
      'contain',
      'This field is required',
    );
  });

  it('Show error on weak new password', () => {
    openPasswordEdition();

    submitPasswordForm({
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: WEAK_PASSWORD,
    });
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show weak message
    cy.get(`#${PASSWORD_CREATE_CONTAINER_ID}`).should(
      'contain',
      'This password is too weak, please follow the password requirements above.',
    );
  });

  it('Show error on new password not matching', () => {
    openPasswordEdition();

    submitPasswordForm({
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: `${WEAK_PASSWORD}wrong`,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show not-matching new passwords
    cy.get(`#${PASSWORD_CREATE_CONTAINER_ID}`).should(
      'contain',
      'This input does not match the new password.',
    );
  });

  it('Should set password successfully when password is strong', () => {
    openPasswordEdition();

    submitPasswordForm({
      newPassword: STRONG_PASSWORD,
      confirmNewPassword: STRONG_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.wait('@createPassword').then(({ request: { body } }) => {
      expect(body.password).to.eq(STRONG_PASSWORD);
    });
  });
});

describe('Create new password - network error', () => {
  it('Show error network message', () => {
    cy.setUpApi({
      currentMember: MEMBERS.BOB,
      hasPassword: false,
      createPasswordError: true,
    });
    cy.visit(ACCOUNT_SETTINGS_PATH);
    cy.wait('@getCurrentMember');

    openPasswordEdition();

    submitPasswordForm({
      newPassword: STRONG_PASSWORD,
      confirmNewPassword: STRONG_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.get(`#${PASSWORD_CREATE_CONTAINER_ID}`).should(
      'contain',
      'An unexpected error occurred',
    );
  });
});

describe('Update password', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: MEMBERS.BOB,
      hasPassword: true,
    });
    cy.visit(ACCOUNT_SETTINGS_PATH);
    cy.wait('@getCurrentMember');
  });

  it('Show error on empty inputs', () => {
    openPasswordEdition();

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).should('be.disabled');

    // should show input required message
    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}-helper-text`).should(
      'contain',
      'This field is required',
    );
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}-helper-text`).should(
      'contain',
      'This field is required',
    );
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}-helper-text`).should(
      'contain',
      'This field is required',
    );
  });

  it('Show edit message when a password is set', () => {
    cy.get(`#${PASSWORD_DISPLAY_CONTAINER_ID}`).should(
      'contain',
      "Update your password by clicking on the 'Edit' button",
    );
    cy.get(`#${PASSWORD_EDIT_BUTTON_ID}`).should('contain', 'Edit');
  });

  it('Show error on weak new password', () => {
    openPasswordEdition();

    submitPasswordForm({
      currentPassword: MOCK_CURRENT_PASSWORD,
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: WEAK_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show weak message
    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      'This password is too weak, please follow the password requirements above.',
    );
  });

  it('Show error on new password not matching', () => {
    openPasswordEdition();

    submitPasswordForm({
      currentPassword: MOCK_CURRENT_PASSWORD,
      newPassword: WEAK_PASSWORD,
      confirmNewPassword: `${WEAK_PASSWORD}wrong`,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show not-matching new passwords
    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      'This input does not match the new password.',
    );
  });

  it('Show error if new password is same as current', () => {
    openPasswordEdition();

    submitPasswordForm({
      currentPassword: MOCK_CURRENT_PASSWORD,
      newPassword: MOCK_CURRENT_PASSWORD,
      confirmNewPassword: MOCK_CURRENT_PASSWORD,
    });

    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click().should('be.disabled');

    // should show matching current and new password
    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      'The new password should not match the current one.',
    );
  });

  it('Should update password successfully when password is strong', () => {
    openPasswordEdition();

    // fill current password with mock password
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}`).type(
      MOCK_CURRENT_PASSWORD,
    );

    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.wait('@updatePassword').then(({ request: { body } }) => {
      expect(body.password).to.eq(STRONG_PASSWORD);
      expect(body.currentPassword).to.eq(MOCK_CURRENT_PASSWORD);
    });
  });
});
describe('Update password - network error', () => {
  it('Show error network message', () => {
    cy.setUpApi({
      currentMember: MEMBERS.BOB,
      hasPassword: true,
      updatePasswordError: true,
    });
    cy.visit(ACCOUNT_SETTINGS_PATH);
    cy.wait('@getCurrentMember');

    openPasswordEdition();

    // fill current password with mock password
    cy.get(`#${PASSWORD_INPUT_CURRENT_PASSWORD_ID}`).type(
      MOCK_CURRENT_PASSWORD,
    );

    cy.get(`#${PASSWORD_INPUT_NEW_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_INPUT_CONFIRM_PASSWORD_ID}`).type(STRONG_PASSWORD);
    cy.get(`#${PASSWORD_SAVE_BUTTON_ID}`).click();

    cy.get(`#${PASSWORD_EDIT_CONTAINER_ID}`).should(
      'contain',
      'An unexpected error occurred',
    );
  });
});
