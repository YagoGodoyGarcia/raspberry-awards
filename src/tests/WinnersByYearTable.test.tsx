import { screen, render, waitFor } from './test-utils'; // usa o custom render com BrowserRouter
import * as api from '../services/movieApi';
import WinnersByYearTable from '../components/Dashboard/WinnersByYearTable';

jest.mock('../services/movieApi');
const mockedApi = api as jest.Mocked<typeof api>;

describe('WinnersByYearTable', () => {
  beforeEach(() => {
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
  it('renderiza vencedores por Ano', async () => {
    render(<WinnersByYearTable />);
    // Aguarda os títulos aparecerem
    expect(await screen.findByText('List movie winners by year')).toBeInTheDocument();
    expect(await screen.findByText('Id')).toBeInTheDocument();
    expect(await screen.getByText('Year')).toBeInTheDocument();
    expect(await screen.getByText('Title')).toBeInTheDocument();
  });
});
