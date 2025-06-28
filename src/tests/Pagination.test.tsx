import { screen, render } from './test-utils'; // usa o custom render com BrowserRouter
import userEvent from '@testing-library/user-event';
import Pagination from '../components/MovieList/Pagination';

describe('Pagination', () => {
  it('chama onPageChange ao clicar na próxima página', async () => {
    const mockChange = jest.fn();
    render(<Pagination currentPage={0} totalPages={3} onPageChange={mockChange} />);
    await userEvent.click(screen.getByText('2')); // página visual 2, index real 1
    expect(mockChange).toHaveBeenCalledWith(1);
  });
});
