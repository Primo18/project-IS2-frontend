import { RiArrowRightLine, RiSearch2Line } from '@remixicon/react';
import { Button } from '@tremor/react';

export const ButtonHero = ({onClick, buttonName, color}) => (
  <div className='mb-2'>
      <Button variant="primary" color={color} size="sm" onClick={onClick}>{buttonName}</Button>
  </div>
);