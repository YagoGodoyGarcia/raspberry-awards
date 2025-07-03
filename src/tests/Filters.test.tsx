import { screen, render } from './test-utils'; // usa o custom render com BrowserRouter
import userEvent from '@testing-library/user-event';
import Filters from '../components/MovieList/Filters';

describe('Filters', () => {
  it('chama onChange ao selecionar ano e vencedor', async () => {
    const handleChange = jest.fn();

    render(
      <Filters
        years={['1990', '2000']}
        filters={{ title: '', winner: '' }}
        onChange={handleChange}
      />
    );

    const anoSelect = screen.getByPlaceholderText('Todos os anos');
    await userEvent.click(anoSelect);
    await userEvent.click(screen.getByText('2000'));

    expect(handleChange).toHaveBeenCalledWith('year', '2000');

    const vencedorSelect = screen.getByPlaceholderText('Todos');
    await userEvent.click(vencedorSelect);
    await userEvent.click(screen.getByText('Sim'));

    expect(handleChange).toHaveBeenCalledWith('winner', 'true');
  });
});
