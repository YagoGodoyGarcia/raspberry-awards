import { screen, render, waitFor } from './test-utils'; // usa o custom render com BrowserRouter
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

    // Aguarda os títulos aparecerem 
    expect(await screen.findByText(/Top 3 estúdios com mais vitórias/i)).toBeInTheDocument();
    expect(await screen.findByText('Estúdio')).toBeInTheDocument();
    expect(await screen.findByText('Vitórias')).toBeInTheDocument();

    await waitFor(() => {
      // Verifica dados renderizados
      expect(screen.getByText('Studio A')).toBeInTheDocument();
      expect(screen.getByText(5)).toBeInTheDocument();
      expect(screen.getByText('Studio B')).toBeInTheDocument();
      expect(screen.getByText(3)).toBeInTheDocument();
    });
  });
});
