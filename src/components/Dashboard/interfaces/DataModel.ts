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

export interface YearSelectProps {
  years: string[];
  onChange: (year: string) => void;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  studios: string[];
  producers: string[];
  winner: boolean;
}
