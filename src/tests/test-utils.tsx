import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </MantineProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
