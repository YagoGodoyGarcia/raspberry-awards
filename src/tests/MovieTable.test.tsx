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
  it('exibe os dados dos filmes corretamente', () => {
    render(<MovieTable movies={mockMovies} />);

    // Aguarda os títulos aparecerem 
    expect(screen.findByText('Título')).toBeInTheDocument();
    expect(screen.findByText('Ano')).toBeInTheDocument();
    expect(screen.findByText('Estúdio')).toBeInTheDocument();
    expect(screen.findByText('Produtores')).toBeInTheDocument();
    expect(screen.findByText('Vencedor?')).toBeInTheDocument();
    // Verifica dados renderizados
    expect(screen.getByText('Filme A')).toBeInTheDocument();
    expect(screen.getByText('1990')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
  });
});
