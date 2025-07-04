import { render, screen, waitFor } from './test-utils';
import userEvent from '@testing-library/user-event';
import Filters from '../components/MovieList/Filters';

describe('Filters', () => {
  it('chama onChange ao selecionar um ano e vencedor', async () => {
    const handleChange = jest.fn();

    render(
      <Filters
        years={['1990', '2000']}
        filters={{ title: '', winner: '' }}
        onChange={handleChange}
      />
    );

    const yearInput = screen.getByPlaceholderText('Every year');
    await userEvent.click(yearInput);
    const yearOption = await screen.findByText('2000');
    await userEvent.click(yearOption);
    expect(handleChange).toHaveBeenCalledWith('year', '2000');

    const winnerInput = screen.getByPlaceholderText('All');
    await userEvent.click(winnerInput);
    const winnerOption = await screen.findByText('Yes');
    await userEvent.click(winnerOption);
    expect(handleChange).toHaveBeenCalledWith('winner', 'true');
  });

  it('renderiza corretamente com lista de anos vazia', () => {
    render(<Filters years={[]} filters={{ title: '', winner: '' }} onChange={jest.fn()} />);

    expect(screen.getByPlaceholderText('Every year')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('All')).toBeInTheDocument();
  });
});
