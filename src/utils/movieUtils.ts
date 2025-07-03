import { Movie, Studio } from "../components/Dashboard/interfaces/DataModel"

export const getYearsWithMultipleWinners = (
  movies: Movie[]
): { year: number; winnerCount: number }[] => {
  const yearMap = new Map<number, number>()

  movies.forEach((movie) => {
    if (movie.winner) {
      yearMap.set(movie.year, (yearMap.get(movie.year) || 0) + 1)
    }
  })

  return Array.from(yearMap.entries())
    .filter(([_, count]) => count > 1)
    .map(([year, winnerCount]) => ({ year, winnerCount }))
    .sort((a, b) => b.year - a.year)
}

export const getTopStudiosByWins = (movies: Movie[]): Studio[] => {
  const studioWins = new Map<string, number>();

  movies.forEach(movie => {
    if (movie.winner) {
      movie.studios.forEach(studio => {
        studioWins.set(studio, (studioWins.get(studio) || 0) + 1);
      });
    }
  });

  return Array.from(studioWins.entries())
    .map(([name, winCount]) => ({ name, winCount }))
    .sort((a, b) => b.winCount - a.winCount)
    .slice(0, 3); // ou mais, se quiser todos
};
