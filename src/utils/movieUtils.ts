import { Movie } from "../components/Dashboard/interfaces/DataModel"

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
