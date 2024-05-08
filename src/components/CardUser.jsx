import { Card } from '@tremor/react';
import PropTypes from 'prop-types';

export function CardUser({ title, info }) {
  return (
    <Card
      className="mx-auto max-w-xs"
      decoration="left"
      decorationColor="indigo"
    >
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{title}</p>
      <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{info}</p>
    </Card>
  );
}

CardUser.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};