import { screen, render } from './test-utils'; // usa o custom render com BrowserRouter
import MovieTable from '../components/MovieList/MovieTable';

const mockMovies = [
  {
    id: 1,
    title: 'Filme A',
    year: 1990,
    studios: ['Studio A'],
    producers: ['Produtor A'],
    winner: true,
  },
];

describe('MovieTable', () => {
  it('exibe os dados dos filmes corretamente', async () => {
    render(<MovieTable movies={mockMovies} />);

    // Aguarda os títulos aparecerem 
    expect(await screen.findByText('Título')).toBeInTheDocument();
    expect(await screen.findByText('Ano')).toBeInTheDocument();
    expect(await screen.findByText('Estúdios')).toBeInTheDocument();
    expect(await screen.findByText('Produtores')).toBeInTheDocument();
    expect(await screen.findByText('Vencedor?')).toBeInTheDocument();
    // Verifica dados renderizados
    expect(screen.getByText('Filme A')).toBeInTheDocument();
    expect(screen.getByText('1990')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
  });
});
