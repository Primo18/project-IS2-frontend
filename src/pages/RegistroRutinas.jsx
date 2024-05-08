import { useState } from 'react';
import { ButtonHero } from '../components/ButtonRutina';
import { NumberInputHero } from '../components/NumberInput';
import { SelectHero } from '../components/Select';
import { Card, TextInput } from '@tremor/react';
import { v4 as uuidv4 } from 'uuid';

function RegistroRutinas() {
  const [rows, setRows] = useState([{ id: uuidv4(), ejercicio: '', series: '', repeticiones: '', secuencia: '' }]); // Inicialmente, una fila con un ID único y campos vacíos

  const addRow = () => {
    const newRow = {
      id: uuidv4(),
      ejercicio: '',
      series: '',
      repeticiones: '',
      secuencia: '',
    };
    setRows([...rows, newRow]); // Añadir una nueva fila con valores vacíos
  };

  const deleteRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const prepareDataForOutput = () => {
    const formattedData = rows.map((row) => ({
      ejercicio: row.ejercicio,
      series: row.series,
      repeticiones: row.repeticiones,
      secuencia: row.secuencia,
    }));

    return JSON.stringify(formattedData, null, 2); // Convierte a JSON con formato legible
  };

  const handleSaveRoutine = () => {
    const jsonData = prepareDataForOutput();
    console.log(jsonData); // Imprimir en consola
    // Puedes guardar jsonData en un archivo o enviarlo a través de una solicitud de red
  };


  return (
    <>
      <div className='mb-4 text-center font-mono text-5xl text-slate-500'>
        Registro de Rutinas
      </div>
      <Card>
        <div className="grid grid-cols-2 place-items-center">
          <div className="grid grid-rows-2" style={{ width: '80%' }} >
            <div className="mb-4 text-center font-mono text-sm text-slate-500">
              Usuario
            </div>
            <TextInput />
          </div>
          <div>
            <ButtonHero onClick={addRow} buttonName="Agregar ejercicio" color="green" />
          </div>

        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-5 gap-4 items-center justify-items-center">
          {rows.length > 0 && (
            <>
              <div className="mb-4 text-center font-mono text-sm text-slate-500">
                Ejercicio
              </div>
              <div className="mb-4 text-center font-mono text-sm text-slate-500">
                Series
              </div>
              <div className="mb-4 text-center font-mono text-sm text-slate-500">
                Repeticiones
              </div>
              <div className="mb-4 text-center font-mono text-sm text-slate-500">
                Secuencia
              </div>
            </>
          )}
        </div>
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-5 gap-4 items-center justify-items-center">
            <SelectHero
              value={row.ejercicio}
              onChange={(value) => {
                const updatedRows = rows.map((r) =>
                  r.id === row.id ? { ...r, ejercicio: value } : r
                );
                setRows(updatedRows);
              }} />
            <NumberInputHero
              value={row.series}
              onChange={(value) => {
                const updatedRows = rows.map((r) =>
                  r.id === row.id ? { ...r, series: value } : r
                );
                setRows(updatedRows);
              }} />
            <NumberInputHero
              value={row.repeticiones}
              onChange={(value) => {
                const updatedRows = rows.map((r) =>
                  r.id === row.id ? { ...r, repeticiones: value } : r
                );
                setRows(updatedRows);
              }} />
            <NumberInputHero
              value={row.secuencia}
              onChange={(value) => {
                const updatedRows = rows.map((r) =>
                  r.id === row.id ? { ...r, secuencia: value } : r
                );
                setRows(updatedRows);
              }} />
            <ButtonHero onClick={() => deleteRow(row.id)} buttonName="Eliminar" color="red" />
          </div>
        ))}

      </Card>
      <div className='grid place-items-center'>
        <div className='mt-4'></div>
        <ButtonHero onClick={handleSaveRoutine} buttonName="Guardar Rutina" />
      </div>

    </>
  );
}

export default RegistroRutinas;
