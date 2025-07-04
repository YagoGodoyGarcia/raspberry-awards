import { Pagination as MantinePagination, Center } from '@mantine/core';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  return (
    <Center>
      <MantinePagination
        total={totalPages}
        value={currentPage + 1}
        onChange={page => onPageChange(page - 1)}
      />
    </Center>
  );
};

export default Pagination;
