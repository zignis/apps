import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { LoggedUser } from '@dailydotdev/shared/src/lib/user';
import { TestBootProvider } from '@dailydotdev/shared/__tests__/helpers/boot';
import MainLayout from '../components/layouts/MainLayout';

describe('MainLayout', () => {
  const showLogin = jest.fn();

  beforeEach(() => {
    showLogin.mockReset();
  });

  const renderLayout = (user: LoggedUser = null): RenderResult => {
    const client = new QueryClient();

    return render(
      <TestBootProvider client={client} auth={{ user, showLogin }}>
        <MainLayout />
      </TestBootProvider>,
    );
  };

  // it('should show login button when not logged-in', async () => {
  //   renderLayout();
  //   // Experiment doesn't support mobile resolution which both yields two elements.
  //   expect(await screen.findAllByText('Access all features')).toHaveLength(2);
  //   expect(await screen.findAllByText('Sign up')).toHaveLength(2);
  // });

  it('should show profile image and reputation when logged-in', async () => {
    renderLayout({
      id: 'u1',
      username: 'idoshamun',
      name: 'Ido Shamun',
      providers: ['github'],
      email: 'ido@acme.com',
      image: 'https://daily.dev/ido.png',
      createdAt: '',
      reputation: 5,
      permalink: 'https://app.daily.dev/ido',
      infoConfirmed: true,
    });
    const [el] = await screen.findAllByAltText(`idoshamun's profile`);
    expect(el).toHaveAttribute('data-src', 'https://daily.dev/ido.png');
    expect(await screen.findAllByText('5')).toHaveLength(2);
  });
});
