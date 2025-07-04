import { render, screen, waitFor, within } from './test-utils';
import userEvent from '@testing-library/user-event';
import Movies from '../pages/Movies';
import * as api from '../services/movieApi';
import React from 'react';

jest.mock('../services/movieApi');
const mockedApi = api as jest.Mocked<typeof api>;

describe('Movies Page', () => {
  beforeEach(() => {
    mockedApi.getAllYears.mockResolvedValue(['1990', '2000']);
    mockedApi.getMovies.mockResolvedValue({
      content: [
        {
          id: 1,
          year: 1990,
          title: 'Movie A',
          studios: ['Studio A'],
          producers: ['Producer A'],
          winner: true,
        },
        {
          id: 2,
          year: 1991,
          title: 'Movie B',
          studios: ['Studio B'],
          producers: ['Producer B'],
          winner: false,
        },
      ],
      totalPages: 1,
      totalElements: 2,
      number: 0,
      size: 10,
    });
  });

  it('should render movies and apply filters and pagination correctly', async () => {
    await React.act(async () => {
      render(<Movies />);
    });

    const tbody = await screen.findAllByRole('rowgroup').then(groups => groups[1]);

    await waitFor(() => {
      expect(within(tbody).getByText('Movie A')).toBeInTheDocument();
      expect(within(tbody).getByText('1990')).toBeInTheDocument();
      expect(within(tbody).getByText('Yes')).toBeInTheDocument();

      expect(within(tbody).getByText('Movie B')).toBeInTheDocument();
      expect(within(tbody).getByText('1991')).toBeInTheDocument();
      expect(within(tbody).getByText('No')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Filter by title');
    await userEvent.clear(input);
    await userEvent.type(input, 'Movie A');

    await waitFor(() => {
      expect(within(tbody).getByText('Movie A')).toBeInTheDocument();
      expect(within(tbody).queryByText('Movie B')).not.toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'false');

    await waitFor(() => {
      expect(within(tbody).queryByText('Movie A')).not.toBeInTheDocument();
      expect(screen.getByText('Nenhum filme encontrado.')).toBeInTheDocument();
    });
  });
});
