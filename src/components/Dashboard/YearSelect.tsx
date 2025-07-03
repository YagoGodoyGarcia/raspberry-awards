import { Select, Button, Group } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

interface YearSelectProps {
  years: string[];
  onSearch: (selectedYear: string) => void;
}

const YearSelect = ({ years, onSearch }: YearSelectProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Group align="end" mt="md">
      <Select
        placeholder="Search by year"
        data={years}
        value={selected}
        onChange={setSelected}
        clearable
        w="85%"
      />
      <Button
        onClick={() => selected && onSearch(selected)}
        disabled={!selected}
        variant="light"
        color="blue"
      >
        <IconSearch size={18} />
      </Button>
    </Group>
  );
};

export default YearSelect;
