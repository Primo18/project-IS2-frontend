import {

  Select,
  SelectItem,
} from '@tremor/react';
import PropTypes from 'prop-types';

export function SelectHero({ value, onChange }) {
  const handleSelectChange = (selectedValue) => {
    onChange(selectedValue); // Llama a la función onChange pasada como prop con el nuevo valor seleccionado
  };

  return (
    <div>
      <Select
        placeholder='Seleccione'
        value={value}           // Asigna el valor del input
        onChange={handleSelectChange} // Maneja el cambio de valor del input
      >
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
        <SelectItem value="3">Option 3</SelectItem>
      </Select>
    </div>
  );
}

SelectHero.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};