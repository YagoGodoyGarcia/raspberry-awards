import { Select, Group } from '@mantine/core';

interface FiltersProps {
  years: string[];
  filters: {
    title: string;
    winner: string;
  };
  onChange: (field: string, value: string) => void;
}

const Filters = ({ years, filters, onChange }: FiltersProps) => {
  return (
    <Group grow>
      <Select
        label="Year"
        placeholder="Every year"
        data={years}
        value={filters.title}
        onChange={value => onChange('year', value || '')}
        clearable
      />

      <Select
        label="Winner"
        placeholder="All"
        data={[
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' },
        ]}
        value={filters.winner}
        onChange={value => onChange('winner', value || '')}
        clearable
      />
    </Group>
  );
};

export default Filters;
