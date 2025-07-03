import axios from "axios";
import { PaginatedMoviesResponse, YearWinner, Studio, ProducerInterval, Movie } from "./interfaces/moveApiModel";

const api = axios.create({
  baseURL: 'https://challenge.outsera.tech/api',
});

/**
 * Lista de filmes paginada
 */
export const getMovies = async (
  page = 0,
  size = 10,
  year?: number,
  winner?: boolean
): Promise<PaginatedMoviesResponse> => {
  const params: any = { page, size };
  if (year) params.year = year;
  if (winner !== undefined) params.winner = winner;

  const { data } = await api.get('/movies', { params });
  return data;
};

/**
 * Anos com múltiplos vencedores
 */
export const getMultipleWinners = async (): Promise<{ years: YearWinner[] }> => {
  const { data } = await api.get('/movies', {
    params: { projection: 'years-with-multiple-winners' },
  });
  return data;
};


/**
 * Estúdios com mais vitórias
 */
export const getTopStudios = async (): Promise<{ studios: Studio[] }> => {
  const { data } = await api.get('/movies', {
    params: { projection: 'studios-with-win-count' },
  });
  return data;
};

/**
 * Produtores com maior e menor intervalo de vitórias
 */
export const getProducersInterval = async (): Promise<{
  max: ProducerInterval[];
  min: ProducerInterval[];
}> => {
  const { data } = await api.get('/movies', {
    params: { projection: 'max-min-win-interval-for-producers' },
  });
  return data;
};

/**
 * Vencedores por ano específico
 */
export const getWinnersByYear = async (year: number): Promise<Movie[]> => {
  const { data } = await api.get('/movies', {
    params: { page: 0, size: 9999, winner: true, year },
  });

  const content = data.content || []; // <- pega corretamente o array dentro de content

  return content.map((movie: any) => ({
    id: movie.id,
    year: movie.year,
    title: movie.title,
    studios: Array.isArray(movie.studios) ? movie.studios : [movie.studios],
    producers: Array.isArray(movie.producers) ? movie.producers : [movie.producers],
    winner: Boolean(movie.winner),
  }));
};


/**
 * Utilitário para extrair todos os anos únicos da lista
 */
export const getAllYears = async (): Promise<string[]> => {
  const response = await getMovies(0, 999, undefined, true);

  if (!response || !response.content) {
    return []; // evita crash
  }

  const years = new Set(response.content.map((m: { year: number }) => m.year));
  return Array.from(years).sort().map(String);
};