import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Paper,
  Grid,
  Loader,
  Stack,
} from '@mantine/core';
import Pagination from '../components/MovieList/Pagination';
import { getMovies, getAllYears } from '../services/movieApi';
import Filters from '../components/MovieList/Filters';
import MovieTable from '../components/MovieList/MovieTable';


interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    year: '',
    winner: '',
  });

  const fetchData = async () => {
    setLoading(true);
    const response = await getMovies(page, 10, +filters.year || undefined, filters.winner === 'true');
    setMovies(response.content);
    setTotalPages(response.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    getAllYears().then(setYears);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  const handleFilterChange = (field: string, value: string) => {
    setPage(0); // resetar para primeira página
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Container size="xl" py="lg">
      <Title order={2} mb="md">Lista de Filmes</Title>
      <Paper shadow="xs" p="md">
        <Stack gap="md">
          <Filters
            years={years}
            filters={filters}
            onChange={handleFilterChange}
          />

          {loading ? (
            <Loader />
          ) : (
            <>
              <MovieTable movies={movies} />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Movies;
