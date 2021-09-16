import React from "react";
import { useLocation } from "react-router";
import { API_ROUTES } from "@graasp/query-client";
import { AUTHENTICATION_HOST, NODE_ENV } from "../../config/constants";
import { hooks } from "../../config/queryClient";
import Loader from "./Loader";
import RedirectPage from "./RedirectionContent";
import { redirect } from "../../utils/navigation";

const Authorization = () => (ChildComponent) => {
  const ComposedComponent = (props) => {
    const { pathname } = useLocation();

    const redirectToSignIn = () => {
      redirect(
        `${AUTHENTICATION_HOST}/${API_ROUTES.buildSignInPath(
          `${window.location.origin}${pathname}`
        )}`
      );
    };

    const { data: currentMember, isLoading } = hooks.useCurrentMember();

    if (isLoading) {
      return <Loader />;
    }

    // check authorization: user shouldn't be empty
    if (currentMember?.size) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <ChildComponent {...props} />;
    }

    // do not redirect in test environment to fully load a page
    // eslint-disable-next-line no-unused-expressions
    NODE_ENV !== "test" && redirectToSignIn();

    // redirect page if redirection is not working
    return (
      <RedirectPage
        link={`${AUTHENTICATION_HOST}/${API_ROUTES.buildSignInPath(
          `${window.location.origin}${pathname}`
        )}`}
      />
    );
  };
  return ComposedComponent;
};

export default Authorization;
