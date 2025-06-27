import { screen, waitFor, render } from './test-utils'; // usa os exports do custom render
import Dashboard from '../pages/Dashboard';
import * as api from '../services/movieApi';

jest.mock('../services/movieApi');

const mockedApi = api as jest.Mocked<typeof api>;

describe('Dashboard', () => {
  beforeEach(() => {
    mockedApi.getMultipleWinners.mockResolvedValue({
      years: [
        { year: 1986, winnerCount: 2 },
        { year: 1990, winnerCount: 2 },
      ],
    });

    mockedApi.getTopStudios.mockResolvedValue({
      studios: [
        { name: 'Studio A', winCount: 6 },
        { name: 'Studio B', winCount: 5 },
      ],
    });

    mockedApi.getProducersInterval.mockResolvedValue({
      max: [
        { producer: 'Max Producer', interval: 10, previousWin: 2000, followingWin: 2010 },
      ],
      min: [
        { producer: 'Min Producer', interval: 1, previousWin: 2000, followingWin: 2001 },
      ],
    });

    mockedApi.getAllYears.mockResolvedValue(['2000', '2010']);
    mockedApi.getWinnersByYear.mockResolvedValue([
      {
        id: 1,
        title: 'Movie A',
        year: 2000,
        studios: ['Studio X'],
        producers: ['Producer X'],
        winner: true,
      },
    ]);
  });

  it('renderiza todos os painéis principais do dashboard', async () => {
      try {
      render(<Dashboard />);
    } catch (e) {
      console.error('Erro ao renderizar o Dashboard:', e);
      throw e;
    }

    await waitFor(() => {
      expect(screen.getByText(/Anos com múltiplos vencedores/i)).toBeInTheDocument();
      expect(screen.getByText(/Top 3 estúdios com mais vitórias/i)).toBeInTheDocument();
      expect(screen.getByText(/Intervalo entre prêmios/i)).toBeInTheDocument();
      expect(screen.getByText(/Vencedores por Ano/i)).toBeInTheDocument();
    });

    expect(screen.getByText('1986')).toBeInTheDocument();
    expect(screen.getByText('Studio A')).toBeInTheDocument();
    expect(screen.getByText('Max Producer')).toBeInTheDocument();
    expect(screen.getByText('Movie A')).toBeInTheDocument();
  });
});
