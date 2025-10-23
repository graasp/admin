import {
  type JSX,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import {
  AccountType,
  DiscriminatedItem,
  getCurrentAccountLang,
} from '@graasp/sdk';

import * as Sentry from '@sentry/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DEFAULT_LANG } from './config/constants';
import { LocalStorage } from './config/localStorage';
import { hooks } from './config/queryClient';
import {
  loginMutation,
  signOutMutation,
} from './openapi/client/@tanstack/react-query.gen';
import { memberKeys } from './query/keys';
import CustomInitialLoader from './ui/CustomInitialLoader/CustomInitialLoader';

type LoginInput = {
  email: string;
  captcha: string;
  url?: string;
};
export type AuthenticatedMember = {
  name: string;
  id: string;
  lang: string;
  type: AccountType.Individual;
};
export type AuthenticatedGuest = {
  name: string;
  id: string;
  lang: string;
  type: AccountType.Guest;
  item: DiscriminatedItem;
};
export type AuthenticatedUser = AuthenticatedMember | AuthenticatedGuest;
type AuthContextLoggedMember = {
  isAuthenticated: true;
  user: AuthenticatedUser;
  logout: () => Promise<void>;
  login: null;
};
type AuthContextSignedOut = {
  isAuthenticated: false;
  user: null;
  logout: null;
  login: (args: LoginInput) => Promise<void>;
};
/**
 * Auth context used inside the router to know if the user is logged in
 */
export type AuthContextType = AuthContextLoggedMember | AuthContextSignedOut;

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  const { data: currentMember, isPending } = hooks.useCurrentMember();
  const useLogin = useMutation(loginMutation());
  const useLogout = useMutation(signOutMutation());
  const queryClient = useQueryClient();

  const logout = useCallback(async () => {
    const url = window.location.href;
    // call the logout mutation
    await useLogout.mutateAsync({});
    queryClient.resetQueries();
    queryClient.setQueryData(memberKeys.current().content, undefined);

    // unset the user in Sentry session
    Sentry.setUser(null);
    // redirect to auth page with url from the page that we just left.
    const redirectionURL = new URL('/auth/login', window.location.origin);
    redirectionURL.searchParams.set('url', url);
    // navigate to the auth page with the right params
    window.location.assign(redirectionURL);
  }, [queryClient, useLogout]);

  const login = useCallback(
    async (args: LoginInput) => {
      await useLogin.mutateAsync({ body: args });
    },
    [useLogin],
  );

  useEffect(() => {
    if (currentMember) {
      LocalStorage.setItem(
        'i18nextLng',
        getCurrentAccountLang(currentMember, DEFAULT_LANG),
      );
    } else {
      LocalStorage.removeItem('i18nextLng');
    }
  }, [currentMember]);

  const value = useMemo(() => {
    Sentry.setUser(currentMember ? { id: currentMember.id } : null);

    if (currentMember) {
      if (currentMember.type === AccountType.Individual) {
        return {
          isAuthenticated: true as const,
          user: {
            name: currentMember.name,
            id: currentMember.id,
            lang: getCurrentAccountLang(currentMember, DEFAULT_LANG),
            type: AccountType.Individual as const,
          },
          logout,
          login: null,
        };
      } else {
        return {
          isAuthenticated: true as const,
          user: {
            name: currentMember.name,
            id: currentMember.id,
            lang: getCurrentAccountLang(currentMember, DEFAULT_LANG),
            type: AccountType.Guest as const,
            item: currentMember.itemLoginSchema.item,
          },
          logout,
          login: null,
        };
      }
    } else {
      return {
        isAuthenticated: false as const,
        user: null,
        login,
        logout: null,
      };
    }
  }, [currentMember, login, logout]);

  // if the query has not resolved yet, we can not render the rest of the tree
  if (isPending) {
    return <CustomInitialLoader />;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Auth context accessible via the router to know if the user is logged in
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
