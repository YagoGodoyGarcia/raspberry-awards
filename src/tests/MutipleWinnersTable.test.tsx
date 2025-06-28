import { screen, render } from './test-utils'; // usa o custom render com BrowserRouter
import Dashboard from '../pages/Dashboard';
import * as api from '../services/movieApi';
import MutipleWinnersTable from '../components/Dashboard/MultipleWinnersTable';

jest.mock('../services/movieApi');
const mockedApi = api as jest.Mocked<typeof api>;

describe('MutipleWinnersTable', () => {
  beforeEach(() => {
    mockedApi.getMultipleWinners.mockResolvedValue({
      years: [
        { year: 1986, winnerCount: 2 },
        { year: 1990, winnerCount: 3 },
      ],
    });

    /**    mockedApi.getTopStudios.mockResolvedValue({
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
    ]); */

  });

  it('renderiza todos os painéis principais do dashboard', async () => {
    render(<MutipleWinnersTable />);

    // Aguarda os títulos aparecerem 
    expect(await screen.findByText(/Anos com múltiplos vencedores/i)).toBeInTheDocument();
    expect(await screen.findByText('Ano')).toBeInTheDocument();
    expect(await screen.findByText(/Quantidadede vencedores/i)).toBeInTheDocument();

    // Verifica dados renderizados
    expect(await screen.findByText('1986')).toBeInTheDocument();
    expect(await screen.findByText(2)).toBeInTheDocument();
    expect(await screen.findByText('1990')).toBeInTheDocument();
    expect(await screen.findByText(3)).toBeInTheDocument();
  });
});
