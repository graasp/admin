import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/player/')({
  beforeLoad: () => {
    throw redirect({
      to: '/home',
    });
  },
});
