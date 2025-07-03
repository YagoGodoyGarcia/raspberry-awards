import { useEffect, useMemo } from 'react';
import { Table } from '@mantine/core';

interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

const PAGE_SIZE = 10;

const MovieTable = ({
  allMovies,
  page,
  filters,
  onChange,
  loading,
  onPageChange,
  onFilteredCountChange,
}: {
  allMovies: Movie[];
  page: number;
  filters: { title: string; winner: string };
  onChange: (field: string, value: string) => void;
  loading: boolean;
  onPageChange: (page: number) => void;
  onFilteredCountChange: (count: number) => void;
}) => {
  // aplicar filtros localmente
  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      const matchTitle = filters.title
        ? movie.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;

      const matchWinner =
        filters.winner !== ''
          ? String(movie.winner) === filters.winner
          : true;

      return matchTitle && matchWinner;
    });
  }, [allMovies, filters]);

  useEffect(() => {
    onFilteredCountChange(filteredMovies.length);
  }, [filteredMovies.length, onFilteredCountChange]);

  // paginação local
  const start = page * PAGE_SIZE;
  const paginatedMovies = filteredMovies.slice(start, start + PAGE_SIZE);

  return (
    <Table striped highlightOnHover withColumnBorders>
      <thead>
        <tr>
          <th>ID</th>
          <th>Year</th>
          <th>
            Title
            <input
              type="text"
              placeholder="Filter by title"
              value={filters.title}
              className={"filterInput"}
              onChange={(e) => onChange('title', e.target.value)}
              style={{ width: '100%' }}
            />
          </th>
          <th>
            Winner?
            <select
              className={"filterInput"}

              value={filters.winner}
              onChange={(e) => {
                onChange('winner', e.target.value);
              }}
            >
              <option value="">Yes/No</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              Carregando...
            </td>
          </tr>
        ) : paginatedMovies.length > 0 ? (
          paginatedMovies.map((m, index) => (
            <tr key={m.id}>
              <td>{start + index + 1}</td>
              <td>{m.year}</td>
              <td>{m.title}</td>
              <td>{m.winner ? 'Yes' : 'No'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              Nenhum filme encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default MovieTable;
