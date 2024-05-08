// import { RiArrowRightLine, RiSearch2Line } from '@remixicon/react';
import { Button } from '@tremor/react';
import { props } from 'prop-types';


export const ButtonHero = ({ onClick, buttonName, color }) => (
  <div className='mb-2'>
    <Button variant="primary" color={color} size="sm" onClick={onClick}>{buttonName}</Button>
  </div>
);


ButtonHero.propTypes = {
  onClick: props.func,
  buttonName: props.string,
  color: props.string
}