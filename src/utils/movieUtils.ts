import { Movie, ProducerInterval, Studio } from '../components/Dashboard/interfaces/DataModel';

export const getYearsWithMultipleWinners = (
  movies: Movie[]
): { year: number; winnerCount: number }[] => {
  const yearMap = new Map<number, number>();

  movies.forEach(movie => {
    if (movie.winner) {
      yearMap.set(movie.year, (yearMap.get(movie.year) || 0) + 1);
    }
  });

  return Array.from(yearMap.entries())
    .filter(([_, count]) => count > 1)
    .map(([year, winnerCount]) => ({ year, winnerCount }))
    .sort((a, b) => b.year - a.year);
};

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

export const getProducersIntervalFromMovies = (
  movies: Movie[]
): { min: ProducerInterval[]; max: ProducerInterval[] } => {
  const producerWins = new Map<string, number[]>();
  movies.forEach(movie => {
    if (movie.winner) {
      movie.producers.forEach(producer => {
        if (!producerWins.has(producer)) {
          producerWins.set(producer, []);
        }
        producerWins.get(producer)?.push(movie.year);
      });
    }
  });

  const intervals: ProducerInterval[] = [];
  for (const [producer, years] of producerWins.entries()) {
    if (years.length < 2) continue;

    const sortedYears = [...years].sort((a, b) => a - b);

    for (let i = 1; i < sortedYears.length; i++) {
      const previous = sortedYears[i - 1];
      const current = sortedYears[i];
      intervals.push({
        producer,
        interval: current - previous,
        previousWin: previous,
        followingWin: current,
      });
    }
  }

  if (intervals.length === 0) return { min: [], max: [] };

  const minInterval = Math.min(...intervals.map(i => i.interval));
  const maxInterval = Math.max(...intervals.map(i => i.interval));

  return {
    min: intervals.filter(i => i.interval === minInterval),
    max: intervals.filter(i => i.interval === maxInterval),
  };
};
