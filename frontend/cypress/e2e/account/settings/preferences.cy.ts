import { EmailFrequency } from '@graasp/sdk';

import { LANGS } from '../../../../src/config/langs';
import { ACCOUNT_SETTINGS_PATH } from '../../../../src/config/paths';
import {
  PREFERENCES_ANALYTICS_SWITCH_ID,
  PREFERENCES_CANCEL_BUTTON_ID,
  PREFERENCES_EDIT_BUTTON_ID,
  PREFERENCES_EDIT_CONTAINER_ID,
  PREFERENCES_EMAIL_FREQUENCY_ID,
  PREFERENCES_LANGUAGE_DISPLAY_ID,
  PREFERENCES_LANGUAGE_SWITCH_ID,
  PREFERENCES_SAVE_BUTTON_ID,
} from '../../../../src/config/selectors';
import { CURRENT_MEMBER, MEMBERS } from '../../../fixtures/members';

describe('Display preferences', () => {
  describe('Language', () => {
    for (const [lang, expectedLabel] of Object.entries(LANGS)) {
      it(lang, () => {
        const currentMember = {
          ...CURRENT_MEMBER,
          extra: { ...CURRENT_MEMBER.extra, lang },
        };
        cy.setUpApi({
          currentMember,
        });
        cy.visit(ACCOUNT_SETTINGS_PATH);
        cy.wait('@getCurrentMember');

        // displays the correct member language
        cy.get(`#${PREFERENCES_LANGUAGE_DISPLAY_ID}`).should(
          'have.text',
          expectedLabel,
        );
      });
    }
  });

  describe('Email frequency', () => {
    for (const { emailFreq, expectedText } of [
      {
        emailFreq: EmailFrequency.Always,
        expectedText: 'Always receive email notifications',
      },
      {
        emailFreq: EmailFrequency.Never,
        expectedText: 'Disable email notifications',
      },
    ]) {
      it(emailFreq, () => {
        const currentMember = {
          ...CURRENT_MEMBER,
          extra: { ...CURRENT_MEMBER.extra, emailFreq },
        };

        cy.setUpApi({
          currentMember,
        });
        cy.visit(ACCOUNT_SETTINGS_PATH);
        cy.wait('@getCurrentMember');
        cy.get(`#${PREFERENCES_EMAIL_FREQUENCY_ID}`).should(
          'contain',
          expectedText,
        );
      });
    }
  });

  describe('Enable Analytics', () => {
    for (const { enableSaveActions, expectedLabel } of [
      { enableSaveActions: true, expectedLabel: 'Enabled' },
      { enableSaveActions: false, expectedLabel: 'Disabled' },
    ]) {
      it(expectedLabel, () => {
        const currentMember = {
          ...CURRENT_MEMBER,
          enableSaveActions,
        };

        cy.setUpApi({
          currentMember,
        });
        cy.visit(ACCOUNT_SETTINGS_PATH);
        cy.wait('@getCurrentMember');

        cy.get(`#${PREFERENCES_ANALYTICS_SWITCH_ID}`).should(
          'have.text',
          expectedLabel,
        );
      });
    }
  });
});

const switchLanguage = (newLang: string) => {
  cy.get(`#${PREFERENCES_LANGUAGE_SWITCH_ID}`).should('be.visible'); // Ensure the element is visible
  cy.get(`#${PREFERENCES_LANGUAGE_SWITCH_ID}`).click();
  cy.get(`[role="menuitem"][value="${newLang}"]`).click();
};

const switchEmailFreq = (to: string) => {
  cy.get(`#${PREFERENCES_EMAIL_FREQUENCY_ID}`).should('be.visible'); // Ensure the element is visible
  cy.get(`#${PREFERENCES_EMAIL_FREQUENCY_ID}`).click();
  cy.get(`[role="option"][data-value="${to}"]`).click();
};

describe('Edit preferences', () => {
  describe('Language', () => {
    it('Change language', () => {
      cy.setUpApi({
        currentMember: {
          ...CURRENT_MEMBER,
          extra: { ...CURRENT_MEMBER.extra, lang: 'en' },
        },
      });
      cy.visit(ACCOUNT_SETTINGS_PATH);
      cy.wait('@getCurrentMember');
      cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();
      cy.get(`#${PREFERENCES_EDIT_CONTAINER_ID}`).should('be.visible');

      const newLang = 'de';
      switchLanguage(newLang);
      // Ensure the selected language is shown as the select value
      cy.get(`#${PREFERENCES_LANGUAGE_SWITCH_ID}`).should(
        'contain.text',
        LANGS[newLang],
      );

      cy.get(`#${PREFERENCES_SAVE_BUTTON_ID}`).click();
      cy.wait('@editMember').then(({ request }) => {
        expect(request.body.extra.lang).to.equal(newLang);
      });
    });
  });

  describe('Enable Analytics', () => {
    for (const enableSaveActions of [true, false]) {
      it(`Switch to ${!enableSaveActions}`, () => {
        cy.setUpApi({
          currentMember: {
            ...CURRENT_MEMBER,
            enableSaveActions,
          },
        });
        cy.visit(ACCOUNT_SETTINGS_PATH);
        cy.wait('@getCurrentMember');
        cy.wait('@getCurrentMemberAvatarUrl');
        cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();

        if (enableSaveActions) {
          cy.get(`#${PREFERENCES_ANALYTICS_SWITCH_ID}`).should('be.checked');
        } else {
          cy.get(`#${PREFERENCES_ANALYTICS_SWITCH_ID}`).should(
            'not.be.checked',
          );
        }
        cy.get(`#${PREFERENCES_ANALYTICS_SWITCH_ID}`).click();

        cy.get(`#${PREFERENCES_SAVE_BUTTON_ID}`).click();
        cy.wait('@editMember')
          .its('request.body.enableSaveActions')
          .should('eq', !enableSaveActions);
      });
    }
  });

  for (const { initial, final } of [
    { initial: EmailFrequency.Never, final: EmailFrequency.Always },
    { initial: EmailFrequency.Always, final: EmailFrequency.Never },
  ]) {
    it(`Email Frequency from ${initial} to ${final}`, () => {
      cy.setUpApi({
        currentMember: {
          ...CURRENT_MEMBER,
          extra: {
            ...CURRENT_MEMBER.extra,
            emailFreq: initial,
          },
        },
      });
      cy.visit(ACCOUNT_SETTINGS_PATH);
      cy.wait('@getCurrentMember');
      cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();

      switchEmailFreq(final);

      cy.get(`#${PREFERENCES_SAVE_BUTTON_ID}`).click();

      cy.wait('@editMember').then(({ request }) => {
        expect(request.body.extra.emailFreq).to.equal(final);
      });
    });
  }

  describe('Cancel should not update preferences', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: MEMBERS.BOB,
      });
      cy.visit(ACCOUNT_SETTINGS_PATH);
      cy.wait('@getCurrentMember');
      cy.get(`#${PREFERENCES_EDIT_BUTTON_ID}`).click();
    });

    it('Language', () => {
      switchLanguage('de');
      cy.get(`#${PREFERENCES_CANCEL_BUTTON_ID}`).click();
    });

    it('Email Frequency', () => {
      switchEmailFreq('never');
      cy.get(`#${PREFERENCES_CANCEL_BUTTON_ID}`).click();
    });

    it('Enable Analytics', () => {
      cy.get(`#${PREFERENCES_ANALYTICS_SWITCH_ID}`).click();
      cy.get(`#${PREFERENCES_CANCEL_BUTTON_ID}`).click();
    });
  });
});
