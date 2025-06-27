import { Select, Group } from '@mantine/core';

interface FiltersProps {
  years: string[];
  filters: {
    year: string;
    winner: string;
  };
  onChange: (field: string, value: string) => void;
}

const Filters = ({ years, filters, onChange }: FiltersProps) => {
  return (
    <Group grow>
      <Select
        label="Ano"
        placeholder="Todos os anos"
        data={years}
        value={filters.year}
        onChange={(value) => onChange('year', value || '')}
        clearable
      />

      <Select
        label="Vencedor"
        placeholder="Todos"
        data={[
          { value: 'true', label: 'Sim' },
          { value: 'false', label: 'Não' },
        ]}
        value={filters.winner}
        onChange={(value) => onChange('winner', value || '')}
        clearable
      />
    </Group>
  );
};

export default Filters;
