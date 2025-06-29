import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renderiza o layout com link para o Dashboard', () => {
    render(<App />);

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
  });
});
