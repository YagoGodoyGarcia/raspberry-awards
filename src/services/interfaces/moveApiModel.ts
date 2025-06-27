export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface YearWinner {
  year: number;
  winnerCount: number;
}

export interface Studio {
  name: string;
  winCount: number;
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface PaginatedMoviesResponse {
  content: Movie[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
