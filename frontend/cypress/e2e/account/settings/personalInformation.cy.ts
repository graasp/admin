import { ACCOUNT_SETTINGS_PATH } from '../../../../src/config/paths';
import {
  PERSONAL_INFO_CANCEL_BUTTON_ID,
  PERSONAL_INFO_DISPLAY_CONTAINER_ID,
  PERSONAL_INFO_EDIT_BUTTON_ID,
  PERSONAL_INFO_EMAIL_DISPLAY_ID,
  PERSONAL_INFO_EMAIL_UPDATE_ALERT_ID,
  PERSONAL_INFO_INPUT_EMAIL_ID,
  PERSONAL_INFO_SAVE_BUTTON_ID,
  PERSONAL_INFO_USERNAME_DISPLAY_ID,
} from '../../../../src/config/selectors';
import { MEMBERS } from '../../../fixtures/members';

const changeUsername = (newUserName: string) => {
  cy.get('input[name=username]').clear();
  // Find the input field and type the new username
  cy.get('input[name=username]').type(newUserName);
};

describe('Display personal information', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: MEMBERS.BOB,
    });
    cy.visit(ACCOUNT_SETTINGS_PATH);
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
  });

  it('displays the correct member info', () => {
    // displays the correct member name
    cy.get(`#${PERSONAL_INFO_USERNAME_DISPLAY_ID}`).should(
      'have.text',
      MEMBERS.BOB.name,
    );
    // displays the correct member email
    cy.get(`#${PERSONAL_INFO_EMAIL_DISPLAY_ID}`).should(
      'have.text',
      MEMBERS.BOB.email,
    );
  });
});

describe('Edit personal information', () => {
  describe('Username', () => {
    beforeEach(() => {
      cy.setUpApi({ currentMember: MEMBERS.BOB });
      cy.visit(ACCOUNT_SETTINGS_PATH);
      cy.get(`#${PERSONAL_INFO_EDIT_BUTTON_ID}`).click();
    });

    it('Username field cannot be empty', () => {
      changeUsername('validUsername');
      cy.get('input[name=username]').clear();
      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('be.disabled');
    });

    it('Username too long', () => {
      const longUsername =
        'qwertyuio pasdfghjklzx cvbnmqwertr tyuiopa sdfghjklzxcvbnmqwe';
      changeUsername(longUsername);

      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('be.disabled');
    });

    it('Username too short', () => {
      const shortUsername = 'w';
      changeUsername(shortUsername);
      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('be.disabled');
    });

    it('Username can not contain special characters', () => {
      const badUsername = '<<div>%^\'"';
      changeUsername(badUsername);

      // The save button should be disabled and the helper text should display the message
      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('be.disabled');
      cy.get('[id$=-helper-text]').should(
        'have.text',
        'User name must not contain " ", ", <, >, ^, %, \\',
      );
    });

    it('Valid username can be saved', () => {
      const validUsername = 'validUsername';
      changeUsername(validUsername);
      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).should('not.be.disabled');

      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).click();
      cy.get(`#${PERSONAL_INFO_DISPLAY_CONTAINER_ID}`).should('be.visible');
      cy.wait('@editMember').then(({ request: { body } }) => {
        expect(body.name).to.equal(validUsername);
      });
    });

    it('Should not update the user name if canceling edit', () => {
      changeUsername('validUsername');
      cy.get(`#${PERSONAL_INFO_CANCEL_BUTTON_ID}`).click();
      cy.get(`#${PERSONAL_INFO_USERNAME_DISPLAY_ID}`).contains(
        MEMBERS.BOB.name,
      );
    });

    it('Saves username after trimming trailing space', () => {
      const usernameWithTrailingSpace = 'test  '; // Nom d'utilisateur avec espace à la fin
      changeUsername(usernameWithTrailingSpace);
      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).click();
      cy.wait('@editMember').then(({ request }) => {
        expect(request.body.name).to.equal(usernameWithTrailingSpace.trim());
      });
    });
  });

  describe('Email', () => {
    beforeEach(() => {
      cy.setUpApi({ currentMember: MEMBERS.BOB });
      cy.visit(ACCOUNT_SETTINGS_PATH);
      cy.get(`#${PERSONAL_INFO_EDIT_BUTTON_ID}`).click();
    });

    it('Update email should display a message', () => {
      const newEmail = 'newEmail@graasp.org';
      cy.get(`#${PERSONAL_INFO_INPUT_EMAIL_ID}`).clear();
      cy.get(`#${PERSONAL_INFO_INPUT_EMAIL_ID}`).type(newEmail);
      cy.get(`#${PERSONAL_INFO_SAVE_BUTTON_ID}`).click();
      cy.wait('@updateMemberEmail')
        .its('request.body.email')
        .should('eq', newEmail);
      // verify alert is shown to the user
      cy.get(`#${PERSONAL_INFO_EMAIL_UPDATE_ALERT_ID}`).should('be.visible');
    });
  });
});
