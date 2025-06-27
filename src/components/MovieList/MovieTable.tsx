import { Table } from '@mantine/core';

interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

const MovieTable = ({ movies }: { movies: Movie[] }) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Título</th>
          <th>Ano</th>
          <th>Estúdios</th>
          <th>Produtores</th>
          <th>Vencedor?</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((m) => (
          <tr key={m.id}>
            <td>{m.title}</td>
            <td>{m.year}</td>
            <td>{m.studios.join(', ')}</td>
            <td>{m.producers.join(', ')}</td>
            <td>{m.winner ? 'Sim' : 'Não'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MovieTable;
