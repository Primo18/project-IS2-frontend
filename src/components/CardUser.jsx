import { Card, Metric, Text } from '@tremor/react';

export function CardUser({title,info}) {
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