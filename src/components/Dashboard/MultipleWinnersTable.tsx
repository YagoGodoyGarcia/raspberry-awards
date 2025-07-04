import { useEffect, useState } from 'react';
import { YearWinner, Movie } from './interfaces/DataModel';
import { Table, Title } from '@mantine/core';
import { getMultipleWinners, getMovies } from '../../services/movieApi';
import { getYearsWithMultipleWinners } from '../../utils/movieUtils'; // vamos criar essa função separada

const MultipleWinnersTable = () => {
  const [data, setData] = useState<YearWinner[]>([]);

  const fetchData = async () => {
    try {
      const result = await getMultipleWinners();
      setData(result.years || []);
    } catch (err) {
      console.warn('API failed, using fallback logic:', err);

      try {
        const movies = await getMovies(0, 9999);
        const localResult = getYearsWithMultipleWinners(movies.content);
        setData(localResult);
      } catch (e) {
        console.error('Failed to process local movie data:', e);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title order={3} mb="sm">
        Years with multiple winners
      </Title>

      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Year</th>
            <th>Winner count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ year, winnerCount }) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{winnerCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MultipleWinnersTable;
