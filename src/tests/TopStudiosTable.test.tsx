import { render, screen, waitFor } from '@testing-library/react';
import TopStudiosTable from '../components/Dashboard/TopStudiosTable';
import * as api from '../services/movieApi';

const mockStudios = {
  studios: [
    { name: 'Studio A', winCount: 5 },
    { name: 'Studio B', winCount: 3 },
  ],
};

jest.spyOn(api, 'getTopStudios').mockResolvedValue(mockStudios);

describe('TopStudiosTable', () => {
  it('exibe os estúdios com mais vitórias', async () => {
    render(<TopStudiosTable />);
    await waitFor(() => {
      expect(screen.getByText('Studio A')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});
