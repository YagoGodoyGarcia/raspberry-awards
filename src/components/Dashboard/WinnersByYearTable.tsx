import { Title, Table } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Movie } from './interfaces/DataModel';
import YearSelect from './YearSelect';
import { getAllYears, getWinnersByYear } from '../../services/movieApi';

const WinnersByYearTable = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [winners, setWinners] = useState<Movie[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    getAllYears().then(data => setYears(data));
  }, []);

  const handleSearch = async (year: string) => {
    const movies = await getWinnersByYear(parseInt(year));
    setWinners(movies);
  };

  return (
    <>
      <Title order={3}>List movie winners by year</Title>
      <YearSelect years={years} onSearch={handleSearch} />
      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Id</th>
            <th>Year</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {winners.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.year}</td>
              <td>{movie.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default WinnersByYearTable;
