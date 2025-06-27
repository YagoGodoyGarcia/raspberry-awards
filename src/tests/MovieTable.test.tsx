import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText('Filme A')).toBeInTheDocument();
    expect(screen.getByText('1990')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
  });
});
