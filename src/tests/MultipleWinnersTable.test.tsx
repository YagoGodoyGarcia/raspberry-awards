import { render, screen, waitFor } from '@testing-library/react';
import MultipleWinnersTable from '../components/Dashboard/MultipleWinnersTable';
import * as api from '../services/movieApi';


const mockData = {
  years: [
    { year: 1990, winnerCount: 2 },
    { year: 2000, winnerCount: 3 },
  ],
};

jest.spyOn(api, 'getMultipleWinners').mockResolvedValue(mockData);

describe('MultipleWinnersTable', () => {
  it('renderiza os anos com múltiplos vencedores', async () => {
    render(<MultipleWinnersTable />);
    await waitFor(() => {
      expect(screen.getByText('1990')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });
});
