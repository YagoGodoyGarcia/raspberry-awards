import { Select } from "@mantine/core";
import { YearSelectProps } from "./interfaces/DataModel";

const YearSelect = ({ years, onChange }: YearSelectProps) => {
  return (
    <Select
      label="Selecionar ano"
      placeholder="Escolha o ano"
      data={years}
      onChange={(value) => value && onChange(value)}
    />
  );
};

export default YearSelect;