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
  });

  it('renderiza todos os painéis principais do dashboard', async () => {
    render(<MutipleWinnersTable />);

    // Aguarda os títulos aparecerem
    expect(await screen.findByText(/Years with multiple winners/i)).toBeInTheDocument();
    expect(await screen.findByText('Year')).toBeInTheDocument();
    expect(await screen.findByText(/Winner count/i)).toBeInTheDocument();

    // Verifica dados renderizados
    expect(await screen.findByText('1986')).toBeInTheDocument();
    expect(await screen.findByText(2)).toBeInTheDocument();
    expect(await screen.findByText('1990')).toBeInTheDocument();
    expect(await screen.findByText(3)).toBeInTheDocument();
  });
});
