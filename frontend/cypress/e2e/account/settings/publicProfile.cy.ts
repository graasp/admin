import { ACCOUNT_SETTINGS_PATH } from '../../../../src/config/paths';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_CONFIGURE_BUTTON_ID,
  PUBLIC_PROFILE_EDIT_BUTTON_ID,
  PUBLIC_PROFILE_NOT_CONFIGURED_CONTAINER_ID,
  PUBLIC_PROFILE_SAVE_BUTTON_ID,
} from '../../../../src/config/selectors';
import { MEMBERS, MEMBER_PUBLIC_PROFILE } from '../../../fixtures/members';

const SocialProfile = {
  Linkedin: 'linkedinId',
  Twitter: 'twitterId',
  Facebook: 'facebookId',
} as const;

describe('Display public profile', () => {
  describe('Completed public profile', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: MEMBERS.BOB,
        currentProfile: MEMBER_PUBLIC_PROFILE,
      });
      cy.visit(ACCOUNT_SETTINGS_PATH);
      cy.wait('@getOwnProfile');
    });

    it('displays public profile info', () => {
      // displays the correct bio
      cy.get(`#${PUBLIC_PROFILE_BIO_ID}`).should(
        'contain',
        MEMBER_PUBLIC_PROFILE.bio,
      );

      // displays the correct member linkedIn
      cy.get(`#linkedinId`).should('contain', MEMBER_PUBLIC_PROFILE.linkedinId);
      // displays the correct member linkedIn link
      cy.get(`#linkedinId a`).should(
        'have.attr',
        'href',
        `https://linkedin.com/in/${MEMBER_PUBLIC_PROFILE.linkedinId}`,
      );

      // displays the correct member twitter
      cy.get(`#twitterId`).should('contain', MEMBER_PUBLIC_PROFILE.twitterId);
      // displays the correct member twitter link
      cy.get(`#twitterId a`).should(
        'have.attr',
        'href',
        `https://twitter.com/${MEMBER_PUBLIC_PROFILE.twitterId}`,
      );

      // displays the correct member facebook
      cy.get(`#facebookId`).should('contain', MEMBER_PUBLIC_PROFILE.facebookId);
      // displays the correct member facebook link
      cy.get(`#facebookId a`).should(
        'have.attr',
        'href',
        `https://facebook.com/${MEMBER_PUBLIC_PROFILE.facebookId}`,
      );
    });
  });

  describe('Empty public profile', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: MEMBERS.BOB,
        currentProfile: null,
      });
      cy.visit(ACCOUNT_SETTINGS_PATH);
      cy.wait('@getOwnProfile');
    });

    it('display public profile when empty', () => {
      // displays a message indicating no bio is available
      cy.get(`#${PUBLIC_PROFILE_CONFIGURE_BUTTON_ID}`).should(
        'contain',
        'Configure',
      );

      // displays a message indicating no LinkedIn ID is available
      cy.get(`#${PUBLIC_PROFILE_NOT_CONFIGURED_CONTAINER_ID}`).should(
        'contain',
        "You haven't configured your public profile yet. Add a description and social links to personalize your profile for other users.",
      );
    });
  });
});

describe('Edit public profile', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: MEMBERS.BOB,
      currentProfile: MEMBER_PUBLIC_PROFILE,
    });
    cy.visit(ACCOUNT_SETTINGS_PATH);
    cy.wait('@getCurrentMember');
    cy.wait('@getOwnProfile');
    cy.get(`#${PUBLIC_PROFILE_EDIT_BUTTON_ID}`).click();
  });

  it('With initial values', () => {
    // displays the correct member bio value
    cy.get(`#${PUBLIC_PROFILE_BIO_ID}`).should(
      'have.value',
      MEMBER_PUBLIC_PROFILE.bio,
    );
    // displays the correct member linkedin value
    cy.get(`#linkedinId`).should(
      'have.value',
      MEMBER_PUBLIC_PROFILE.linkedinId,
    );
    // displays the correct member twitter value
    cy.get(`#twitterId`).should('have.value', MEMBER_PUBLIC_PROFILE.twitterId);
    // displays the correct member facebook value
    cy.get(`#facebookId`).should(
      'have.value',
      MEMBER_PUBLIC_PROFILE.facebookId,
    );
  });

  it('bio field can be empty ', () => {
    cy.get(`#${PUBLIC_PROFILE_BIO_ID}`).clear();
    cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.enabled');
  });

  [
    {
      platform: SocialProfile.Linkedin,
      urls: [
        'https://www.linke@din.com/in/sample',
        'https://www.linkedin.com/in/sam*ple',
        'https://www.linkedin.com/in/',
      ],
    },
    {
      platform: SocialProfile.Twitter,
      urls: [
        'https://www.twitte@r.com/sample',
        'https://www.twitter.com/sam*ple',
        'https://twitter.com/',
      ],
    },
    {
      platform: SocialProfile.Facebook,
      urls: [
        'https://www.faceb@ook.com/sample',
        'https://www.facebook.com/sam*ple',
        'https://www.facebook.com/',
      ],
    },
  ].forEach(({ platform, urls }) => {
    urls.forEach((url) =>
      it(url, () => {
        cy.get(`input[name=${platform}]`).clear();
        cy.get(`input[name=${platform}]`).type(url);
        cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('be.disabled');
      }),
    );
  });

  Object.values(SocialProfile).forEach((platform) => {
    it(`Can clear ${platform}`, () => {
      // clear
      cy.get(`input[name=${platform}]`).clear();
      cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
      cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
      cy.wait('@editPublicProfile').then(({ request: { body } }) => {
        expect(body[platform]).to.equal('');
      });
    });

    it(`Enter valid ${platform}`, () => {
      // set new social profile
      const validProfile = 'simple';
      cy.get(`input[name=${platform}]`).clear();
      cy.get(`input[name=${platform}]`).type(validProfile);
      cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).should('not.be.disabled');
      cy.get(`#${PUBLIC_PROFILE_SAVE_BUTTON_ID}`).click();
      cy.wait('@editPublicProfile').then(({ request: { body } }) => {
        expect(body[platform]).to.equal(validProfile);
      });
    });
  });
});
