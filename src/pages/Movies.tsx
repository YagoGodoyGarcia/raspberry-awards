import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Paper,
  Stack,
} from '@mantine/core';
import { getMovies, getAllYears } from '../services/movieApi';
import Pagination from '../components/MovieList/Pagination';
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
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ title: '', winner: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getMovies(0, 9999);
      console.log(response.content)
      setAllMovies(response.content || []);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllYears().then(setYears);
    fetchData();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPage(0); // resetar pagina ao aplicar filtro
  };

  return (
    <Container size="xl" py="lg">
      <Title order={2} mb="md">List movies</Title>
      <Paper shadow="sm" p="lg" radius="lg" withBorder>
        <Stack gap="md">
          <MovieTable
            allMovies={allMovies}
            page={page}
            filters={filters}
            onChange={handleFilterChange}
            loading={loading}
            onPageChange={setPage}
            onFilteredCountChange={(count: number) =>
              setTotalPages(Math.ceil(count / 10))
            }
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default Movies;
