import { NumberInput } from '@tremor/react';
import PropTypes from 'prop-types';

export function NumberInputHero({ value, onChange }) {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Llama a la función onChange pasada como prop con el nuevo valor
    };

    return (
        <div>
            <NumberInput
                required
                placeholder="Cantidad"
                className="mx-auto max-w-sm"
                value={value}           // Asigna el valor del input
                onChange={handleInputChange} // Maneja el cambio de valor del input
            />
        </div>
    );
}

NumberInputHero.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};