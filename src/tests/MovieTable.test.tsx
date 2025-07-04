import { screen, render, fireEvent, waitFor, within } from './test-utils';
import MovieTable from '../components/MovieList/MovieTable';

const mockMovies = [
  {
    id: 1,
    title: 'Movie A',
    year: 1990,
    studios: ['Studio A'],
    producers: ['Producer A'],
    winner: true,
  },
  {
    id: 2,
    title: 'Movie B',
    year: 1991,
    studios: ['Studio B'],
    producers: ['Producer B'],
    winner: false,
  },
];

describe('MovieTable', () => {
  it('should filter movies by title and winner status', () => {
    let filters = { title: '', winner: '' };

    const handleChange = (field: string, value: string) => {
      filters = { ...filters, [field]: value };
      rerender(
        <MovieTable
          allMovies={mockMovies}
          page={0}
          filters={filters}
          onChange={handleChange}
          loading={false}
          onPageChange={() => {}}
          onFilteredCountChange={() => {}}
        />
      );
    };

    const { rerender } = render(
      <MovieTable
        allMovies={mockMovies}
        page={0}
        filters={filters}
        onChange={handleChange}
        loading={false}
        onPageChange={() => {}}
        onFilteredCountChange={() => {}}
      />
    );

    const tbody = screen.getAllByRole('rowgroup')[1];

    expect(within(tbody).getByText('Movie A')).toBeInTheDocument();
    expect(within(tbody).getByText('Movie B')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Filter by title'), {
      target: { value: 'Movie A' },
    });

    expect(within(tbody).getByText('Movie A')).toBeInTheDocument();
    expect(within(tbody).queryByText('Movie B')).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'false' },
    });

    expect(within(tbody).queryByText('Movie A')).not.toBeInTheDocument();
    expect(within(tbody).queryByText('Movie B')).not.toBeInTheDocument();
    expect(within(tbody).getByText('Nenhum filme encontrado.')).toBeInTheDocument();
  });

  it('shows "Nenhum filme encontrado." when no movie matches filters', () => {
    render(
      <MovieTable
        allMovies={mockMovies}
        page={0}
        filters={{ title: 'No Match', winner: 'true' }}
        onChange={() => {}}
        loading={false}
        onPageChange={() => {}}
        onFilteredCountChange={() => {}}
      />
    );

    expect(screen.getByText('Nenhum filme encontrado.')).toBeInTheDocument();
  });
});
