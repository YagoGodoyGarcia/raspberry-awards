import {
    getYearsWithMultipleWinners,
    getTopStudiosByWins,
    getProducersIntervalFromMovies,
} from '../utils/movieUtils';

import { Movie } from '../components/Dashboard/interfaces/DataModel';

const mockMovies: Movie[] = [
    {
        id: 1,
        year: 2000,
        title: 'Bad Movie 1',
        studios: ['Studio A'],
        producers: ['Producer X'],
        winner: true,
    },
    {
        id: 2,
        year: 2000,
        title: 'Bad Movie 2',
        studios: ['Studio B'],
        producers: ['Producer Y'],
        winner: true,
    },
    {
        id: 3,
        year: 2001,
        title: 'Bad Movie 3',
        studios: ['Studio A'],
        producers: ['Producer X'],
        winner: true,
    },
    {
        id: 4,
        year: 2002,
        title: 'Bad Movie 4',
        studios: ['Studio C'],
        producers: ['Producer X'],
        winner: false,
    },
    {
        id: 5,
        year: 2003,
        title: 'Bad Movie 5',
        studios: ['Studio A'],
        producers: ['Producer X'],
        winner: true,
    },
];

const intervalTestMovies: Movie[] = [
    {
        id: 1,
        year: 2000,
        title: 'Movie X1',
        studios: ['Studio A'],
        producers: ['Producer X'],
        winner: true,
    },
    {
        id: 2,
        year: 2005,
        title: 'Movie X2',
        studios: ['Studio A'],
        producers: ['Producer X'],
        winner: true,
    },
    {
        id: 3,
        year: 2010,
        title: 'Movie X3',
        studios: ['Studio A'],
        producers: ['Producer X'],
        winner: true,
    },
    {
        id: 4,
        year: 2001,
        title: 'Movie Y1',
        studios: ['Studio B'],
        producers: ['Producer Y'],
        winner: true,
    },
    {
        id: 5,
        year: 2004,
        title: 'Movie Y2',
        studios: ['Studio B'],
        producers: ['Producer Y'],
        winner: true,
    },
];


describe('Utils', () => {
    //getYearsWithMultipleWinners
    it('should return years with multiple winners', () => {
        const result = getYearsWithMultipleWinners(mockMovies);
        expect(result).toEqual([{ year: 2000, winnerCount: 2 }]);
    });
    it('should return empty array if no year has multiple winners', () => {
        const filtered = mockMovies.filter(m => m.year !== 2000);
        const result = getYearsWithMultipleWinners(filtered);
        expect(result).toEqual([]);
    });
    //getTopStudiosByWins
    it('should return top studios by number of wins', () => {
        const result = getTopStudiosByWins(mockMovies);
        expect(result).toEqual([
            { name: 'Studio A', winCount: 3 },
            { name: 'Studio B', winCount: 1 },
        ]);
    });
    it('should return empty array if no movie is a winner', () => {
        const result = getTopStudiosByWins(mockMovies.map(m => ({ ...m, winner: false })));
        expect(result).toEqual([]);
    });
    //getProducersIntervalFromMovies
    it('should return min and max intervals between producer wins', () => {
        const result = getProducersIntervalFromMovies(intervalTestMovies);

        expect(result.min).toEqual([
            {
                producer: 'Producer Y',
                interval: 3,
                previousWin: 2001,
                followingWin: 2004,
            },
        ]);

        expect(result.max).toEqual([
            {
                producer: 'Producer X',
                interval: 5,
                previousWin: 2000,
                followingWin: 2005,
            },
            {
                producer: 'Producer X',
                interval: 5,
                previousWin: 2005,
                followingWin: 2010,
            },
        ]);
    });
    it('should return empty arrays if no producer has more than one win', () => {
        const moviesWithSingleWins: Movie[] = [
            {
                id: 10,
                year: 1990,
                title: 'Solo Bad',
                studios: ['Studio X'],
                producers: ['Producer A'],
                winner: true,
            },
            {
                id: 11,
                year: 1991,
                title: 'Lone Bad',
                studios: ['Studio Y'],
                producers: ['Producer B'],
                winner: true,
            },
            {
                id: 12,
                year: 1992,
                title: 'Unique Bad',
                studios: ['Studio Z'],
                producers: ['Producer C'],
                winner: true,
            },
        ];

        const result = getProducersIntervalFromMovies(moviesWithSingleWins);
        expect(result).toEqual({ min: [], max: [] });
    });

})