import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@ui/styles/theme';
import MyApp from '@pages/_app';

jest.mock('@ui/components/Layout/AppLayout', () => {
  const MockedAppLayout = ({ children }) => (
    <div data-testid="mocked-app-layout">{children}</div>
  );

  MockedAppLayout.displayName = 'MockedAppLayout';

  return MockedAppLayout;
});

describe('MyApp', () => {
  test('renders MyApp component with ChakraProvider and AppLayout', () => {
    render(
      <ChakraProvider theme={theme}>
        <MyApp Component={() => <div data-testid="mocked-component" />} pageProps={{}} />
      </ChakraProvider>
    );

    expect(screen.getByTestId('mocked-app-layout')).toBeInTheDocument();

    expect(screen.getByTestId('mocked-component')).toBeInTheDocument();
  });
});
