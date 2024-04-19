import * as React from 'react';
import type { Addon_StoryContext } from '@storybook/types';
import { AppRouterProvider } from './app-router-provider';
import { PageRouterProvider } from './page-router-provider';
import type { RouteParams, NextAppDirectory } from './types';
import { RedirectBoundary } from 'next/dist/client/components/redirect-boundary';

const defaultRouterParams: RouteParams = {
  pathname: '/',
  query: {},
};

export const RouterDecorator = (
  Story: React.FC,
  { parameters }: Addon_StoryContext
): React.ReactNode => {
  const nextAppDirectory =
    (parameters.nextjs?.appDirectory as NextAppDirectory | undefined) ?? false;

  if (nextAppDirectory) {
    if (!AppRouterProvider) {
      return null;
    }
    return (
      <AppRouterProvider
        routeParams={{
          ...defaultRouterParams,
          ...parameters.nextjs?.navigation,
        }}
      >
        <RedirectBoundary>
          <Story />
        </RedirectBoundary>
      </AppRouterProvider>
    );
  }

  return (
    <PageRouterProvider>
      <Story />
    </PageRouterProvider>
  );
};
