import { Title, Table } from "@mantine/core";
import { useState, useEffect } from "react";
import { Movie } from "./interfaces/DataModel";
import YearSelect from "./YearSelect";
import { getAllYears, getWinnersByYear } from "../../services/movieApi";

const WinnersByYearTable = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [winners, setWinners] = useState<Movie[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
     getAllYears().then((data) => setYears(data));
  }, []);

  useEffect(() => {
    if (selectedYear) {
      getWinnersByYear(parseInt(selectedYear)).then((res) => setWinners(res));
    }
  }, [selectedYear]);

  return (
    <>
      <Title order={3}>Vencedores por Ano</Title>
      <YearSelect years={years} onChange={setSelectedYear} />
      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Título</th>
            <th>Estúdios</th>
            <th>Produtores</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.studios.join(', ')}</td>
              <td>{movie.producers.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default WinnersByYearTable;