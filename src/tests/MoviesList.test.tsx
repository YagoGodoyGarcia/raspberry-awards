import { screen, render, waitFor } from './test-utils'; // usa o custom render com BrowserRouter
import userEvent from '@testing-library/user-event';
import Movies from '../pages/Movies';
import * as api from '../services/movieApi';

jest.mock('../services/movieApi');
const mockedApi = api as jest.Mocked<typeof api>;

describe('Movies Page', () => {
  
  beforeEach(() => {
    mockedApi.getAllYears.mockResolvedValue(['1990', '2000']);

    mockedApi.getMovies.mockResolvedValue({
      content: [
        {
          id: 1,
          year: 1990,
          title: 'Filme A',
          studios: ['Studio A'],
          producers: ['Produtor A'],
          winner: true,
        },
      ],
      totalPages: 2,
      totalElements: 1,
      number: 0,
      size: 10,
    });
  });

  it('renderiza componente movies', async () => {
    render(<Movies />);

    expect(await screen.findByText('Lista de Filmes')).toBeInTheDocument();
  });
/**
  it('renderiza listagem com filtros e paginação', async () => {
    render(<Movies />);

    // Espera filtros renderizarem
    await waitFor(() => {
      expect(screen.getByLabelText('Ano')).toBeInTheDocument();
    });

    expect(screen.getByText('Filme A')).toBeInTheDocument();
    expect(screen.getByText('1990')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
  });

  it('filtra por ano e vencedor', async () => {
    render(<Movies />);

    const anoSelect = screen.getByLabelText('Ano');
    await userEvent.click(anoSelect);
    await userEvent.click(screen.getByText('2000'));

    const vencedorSelect = screen.getByLabelText('Vencedor');
    await userEvent.click(vencedorSelect);
    await userEvent.click(screen.getByText('Sim'));

    await waitFor(() => {
      expect(mockedApi.getMovies).toHaveBeenCalledWith(0, 10, 2000, true);
    });
  });

  it('navega para próxima página', async () => {
    render(<Movies />);

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // botão página 2
    });

    await userEvent.click(screen.getByText('2'));

    await waitFor(() => {
      expect(mockedApi.getMovies).toHaveBeenCalledWith(1, 10, expect.anything(), expect.anything());
    });
  });
   */
});
