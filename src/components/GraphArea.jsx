'use client'
import { AreaChart } from '@tremor/react';
import evaluaciones from './evaluaciones.json';

const valueFormatter = function (number) {
  return new Intl.NumberFormat('us').format(number).toString() + ' kg';
};

function GraphArea() {
  return (
    <>
      <AreaChart
        className="mt-4 h-72"
        data={evaluaciones.evaluaciones}
        index="fecha_evaluacion"
        yAxisWidth={65}
        categories={['peso', 'grasa', 'masa_muscular']}
        colors={['cyan', 'rose', 'amber']}
        valueFormatter={valueFormatter}
        showLegend={true}
        showAnimation={true}
      />
    </>
  );
}

export default GraphArea;