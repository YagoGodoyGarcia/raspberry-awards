import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YearSelect from '../components/Dashboard/YearSelect';

describe('YearSelect', () => {
  const mockOnSearch = jest.fn();
  const years = ['1990', '2000', '2010'];

  // Teste 1: Verifica se o componente renderiza corretamente
  it('renderiza o campo de seleção e o botão corretamente', () => {
    render(<YearSelect years={years} onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText('Search by year')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  // Teste 2: Verifica se o botão está habilitado após selecionar um ano
  it('habilita o botão de busca ao selecionar um ano', async () => {
    render(<YearSelect years={years} onSearch={mockOnSearch} />);

    const select = screen.getByPlaceholderText('Search by year');
    await userEvent.selectOptions(select, '2000');

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });

  // Teste 3: Verifica se onSearch é chamado com o ano selecionado ao clicar no botão
  it('chama onSearch com o ano selecionado ao clicar no botão', async () => {
    render(<YearSelect years={years} onSearch={mockOnSearch} />);

    const select = screen.getByPlaceholderText('Search by year');
    await userEvent.selectOptions(select, '2000');
    await userEvent.click(screen.getByRole('button'));

    expect(mockOnSearch).toHaveBeenCalledWith('2000');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  // Teste 4: Verifica o comportamento do clearable (limpar seleção)
  it('limpa a seleção e desabilita o botão ao usar a funcionalidade clearable', async () => {
    render(<YearSelect years={years} onSearch={mockOnSearch} />);

    const select = screen.getByPlaceholderText('Search by year');
    await userEvent.selectOptions(select, '2000');
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');

    // Simula o clique no botão de limpar (ícone de "X" no Select do Mantine)
    const clearButton = screen.getByRole('button', { name: /clear/i }); // Ajuste conforme o Mantine renderiza
    await userEvent.click(clearButton);

    expect(select).toHaveValue(null);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  // Teste 5: Verifica comportamento com lista de anos vazia
  it('renderiza corretamente com lista de anos vazia', () => {
    render(<YearSelect years={[]} onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText('Search by year')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByPlaceholderText('Search by year')).toHaveValue(null);
  });

  // Teste 6: Verifica se o layout (Group) contém os componentes esperados
  it('renderiza o layout com Group contendo Select e Button', () => {
    render(<YearSelect years={years} onSearch={mockOnSearch} />);

    const group = screen.getByPlaceholderText('Search by year').closest('div');
    expect(group).toBeInTheDocument();
    expect(group).toContainElement(screen.getByPlaceholderText('Search by year'));
    
    expect(group).toContainElement(screen.getByRole('button'));
  });

  // Teste 7: Verifica se o botão não chama onSearch sem seleção
  it('não chama onSearch ao clicar no botão sem seleção', async () => {
    render(<YearSelect years={years} onSearch={mockOnSearch} />);

    await userEvent.click(screen.getByRole('button'));
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});