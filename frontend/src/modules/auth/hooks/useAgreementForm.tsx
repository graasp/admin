import { useState } from 'react';

export type UseAgreementForm = {
  userHasAcceptedAllTerms: boolean;
  updateUserAgreements: (hasAgreed: boolean) => void;
  verifyUserAgreements: () => boolean;
  hasError: boolean;
};

export const useAgreementForm = (): UseAgreementForm => {
  const [userHasAcceptedAllTerms, setUserHasAcceptedAllTerms] = useState(false);
  const [hasError, setHasError] = useState(false);

  const updateUserAgreements = (hasAgreed: boolean) => {
    setUserHasAcceptedAllTerms(hasAgreed);
    if (hasAgreed && hasError) {
      setHasError(false);
    }
  };
  const verifyUserAgreements = () => {
    const valid = userHasAcceptedAllTerms;
    setHasError(!valid);
    return valid;
  };

  return {
    userHasAcceptedAllTerms,
    updateUserAgreements,
    verifyUserAgreements,
    hasError,
  };
};
