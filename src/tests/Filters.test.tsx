import { render, screen } from './test-utils';
import userEvent from '@testing-library/user-event';
import Filters from '../components/MovieList/Filters';

describe('Filters', () => {
  it('chama onChange ao selecionar um ano e clicar no botão de busca', async () => {
    const handleChange = jest.fn();

    render(
      <Filters
        years={['1990', '2000']}
        filters={{ title: '', winner: '' }}
        onChange={handleChange}
      />
    );

    const anoSelect = await screen.getByPlaceholderText('Search by year');
    await userEvent.selectOptions(anoSelect, '2000');
    await userEvent.click(screen.getByRole('button', { name: /search/i })); // Ajuste conforme o nome do botão

    expect(handleChange).toHaveBeenCalledWith('year', '2000');
    expect(handleChange).toHaveBeenCalledTimes(1);

    const vencedorSelect = screen.getByPlaceholderText('Todos');
    await userEvent.selectOptions(vencedorSelect, 'Sim');

    expect(handleChange).toHaveBeenCalledWith('winner', 'true');
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  // Novo teste para verificar comportamento inicial
  it('renderiza com botão desabilitado quando nenhum ano está selecionado', () => {
    render(
      <Filters
        years={['1990', '2000']}
        filters={{ title: '', winner: '' }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /search/i })).toHaveAttribute('disabled');
  });

  // Novo teste para lista de anos vazia
  it('renderiza corretamente com lista de anos vazia', () => {
    render(
      <Filters
        years={[]}
        filters={{ title: '', winner: '' }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Search by year')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toHaveAttribute('disabled');
  });
});