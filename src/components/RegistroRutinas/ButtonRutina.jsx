import { Button } from '@tremor/react';
import PropTypes from 'prop-types';


export const ButtonHero = ({ onClick, buttonName, color }) => (
    <div className='mb-2'>
        <Button variant="primary" color={color} size="sm" onClick={onClick}>{buttonName}</Button>
    </div>
);


ButtonHero.propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};