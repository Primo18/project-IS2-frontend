import { useState } from 'react';
import { ButtonHero } from '../components/ButtonRutina';
import { NumberInputHero } from '../components/NumberInput';
import { Card, TextInput } from '@tremor/react';
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid';
import { useLoaderData } from 'react-router-dom';

function RegistroRutinas() {

  const [cliente, setCliente] = useState('');
  const [entrenador, setEntrenador] = useState('');

  const [circuitos, setcircuitos] = useState([{ id: uuidv4(), circuito: '', puntuacion: '', repeticiones: '', observaciones: '', ejercicios: [{ id: uuidv4(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' }] }]);
  const [clasificacion, setClasificacion] = useState('');

  const dataCl = useLoaderData().clientes;
  const dataEj = useLoaderData().ejercicios;

  const addcircuito = () => {
    const newcircuito = {
      id: uuidv4(),
      circuito: '',
      puntuacion: '',
      repeticiones: '',
      observaciones: '',
      ejercicios: [{ id: uuidv4(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: ''}]
    };
    setcircuitos([...circuitos, newcircuito]);
  };

  const addRowEj = (circuitoId) => {

    const updatedcircuitos = circuitos.map(circuito => {
      if (circuito.id === circuitoId) {
        const newExercise = { id: uuidv4(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' };
        return { ...circuito, ejercicios: [...circuito.ejercicios, newExercise] };
      }
      return circuito;
    });
    setcircuitos(updatedcircuitos);
  };

  const deletecircuito = (id) => {
    if (circuitos.length > 1) {
      setcircuitos(circuitos.filter(circuito => circuito.id !== id));
    }
  }; 

  const deleteRowEj = (circuitoId, exerciseId) => {
    const updatedcircuitos = circuitos.map(circuito => {
      if (circuito.id === circuitoId) {
        return { ...circuito, ejercicios: circuito.ejercicios.filter(ejercicio => ejercicio.id !== exerciseId) };
      }
      return circuito;
    });
    setcircuitos(updatedcircuitos);
  };

  const handlecircuitoChange = (circuitoId, field, value) => {
    const updatedcircuitos = circuitos.map(circuito => {
      if (circuito.id === circuitoId) {
        return { ...circuito, [field]: value };
      }
      return circuito;
    });
    setcircuitos(updatedcircuitos);
  };

  const handleExerciseChange = (circuitoId, exerciseId, field, value) => {
    const updatedcircuitos = circuitos.map(circuito => {
      if (circuito.id === circuitoId) {
        const updatedExercises = circuito.ejercicios.map(ejercicio => {
          if (ejercicio.id === exerciseId) {
            return { ...ejercicio, [field]: value };
          }
          return ejercicio;
        });
        return { ...circuito, ejercicios: updatedExercises };
      }
      return circuito;
    });
    setcircuitos(updatedcircuitos);
  };

  const handleSaveRoutine = () => {
    const routineData = {
      clasificacion,
      id_cliente: cliente,
      id_usuario: Number(entrenador),
      circuitos: circuitos.map(circuit => ({
        repeticiones: Number(circuit.repeticiones),
        ejercicios: circuit.ejercicios.map(ejercicio => ({
          id_ejercicio: ejercicio.ejercicio,
          series: Number(ejercicio.series),
          frecuencia: ejercicio.frecuencia,
          orden: Number(ejercicio.orden),
          descanso: ejercicio.descanso,
        })),
      })),
    };

    const jsonData = JSON.stringify(routineData, null, 2);
    console.log(jsonData);

    // Enviar datos a través de fetch
    fetch("https://project-is2-backend-production.up.railway.app/rutina/api", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <div className='mb-4 text-center font-mono text-5xl text-slate-500'>
        Registro de Rutinas
      </div>
      <Card>
        <div className="grid grid-cols-3 gap-4 ">
            <div className="mb-4 text-center font-mono text-sm text-slate-500">
              Usuario
              <Select options={dataCl}
                    value={cliente} 
                    onChange={(event) => {
                      setCliente(event.value)} 
                    }
                    styles={{
                      control: (base) => ({
                      ...base,
                      color: 'black',
                      minWidth: '200px',
                      }),
                      option: (base) => ({
                      ...base,
                      color: 'black',
                    }),
                    }}/>
            </div>
            
            <div className="mb-2 text-center font-mono text-sm text-slate-500">Entrenador
            <TextInput
                type="text"
                value={entrenador}
                onChange={(event) => {setEntrenador(event.target.value)}}
              />
            </div>

            <div className="mb-2 text-center font-mono text-sm text-slate-500">Clasificación
            <TextInput
                type="text"
                value={clasificacion}
                onChange={(event) => setClasificacion(event.target.value)}
              />
            </div>

        </div>
        <div className='mt-10 grid grid-cols-1  mb-2 font-mono justify-items-center '>
          <ButtonHero onClick={addcircuito} buttonName="Agregar Circuito" color="green" />
        </div>
      </Card>


      {circuitos.map((circuito, circuitoIndex) => (
        <Card key={circuito.id}>
          <div className='mb-4'>
            <div className='m-4 grid grid-cols-3 font-mono justify-items-stretch text-sm text-slate-500'>
              <span>Circuito {circuitoIndex + 1}</span>
              <ButtonHero onClick={() => addRowEj(circuito.id)} buttonName="Agregar ejercicio" color="green" />
              <ButtonHero onClick={() => deletecircuito(circuito.id)} buttonName="Eliminar" color="red" />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center font-mono text-sm text-slate-500">Puntiacion</div>
              <div className="text-center font-mono text-sm text-slate-500">Repeticiones</div>
              <div className="text-center font-mono text-sm text-slate-500">Observaciones</div>
              <NumberInputHero
                value={circuito.puntuacion}
                onChange={(value) => handlecircuitoChange(circuito.id, 'puntuacion', value)}
              />
              <NumberInputHero
                value={circuito.repeticiones}
                onChange={(value) => handlecircuitoChange(circuito.id, 'repeticiones', value)}
              />
              <TextInput
                value={circuito.observaciones}
                onChange={(event) => handlecircuitoChange(circuito.id, 'observaciones', event.target.value)}
              />
            </div>

            <Card>
            <div className="grid grid-cols-6 gap-5 items-center justify-items-center">
                <div className="mb-4 text-center font-mono text-sm text-slate-500">Ejercicio</div>
                <div className="mb-4 text-center font-mono text-sm text-slate-500">Series</div>
                <div className="mb-4 text-center font-mono text-sm text-slate-500">Frecuencia</div>
                <div className="mb-4 text-center font-mono text-sm text-slate-500">Orden</div>
                <div className="mb-4 text-center font-mono text-sm text-slate-500">Descanso</div>

            </div>
              {circuito.ejercicios.map((ejercicio, ejercicioIndex) => (

                <div key={ejercicio.id} className="grid grid-cols-6 gap-4 mb-4 items-center justify-items-center">
                  
                  <Select 
                    value={ejercicio.ejercicio}
                    options={dataEj}
                    onChange={(event) => { handleExerciseChange(circuito.id, ejercicio.id, 'ejercicio', event.value)}}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        color: 'black',
                        minWidth: '200px',
                        }),
                      control: (base) => ({
                      ...base,
                      color: 'black',
                      minWidth: '200px',
                      }),
                      option: (base) => ({
                      ...base,
                      color: 'black',
                    }),
                    }}/>
                  <NumberInputHero
                    value={ejercicio.series}
                    onChange={(value) => handleExerciseChange(circuito.id, ejercicio.id, 'series', value)}
                  />
                  <TextInput
                    value={ejercicio.frecuencia}
                    onChange={(event) => handleExerciseChange(circuito.id, ejercicio.id, 'frecuencia', event.target.value)}
                  />
                  <NumberInputHero
                    value={ejercicio.orden}
                    onChange={(value) => handleExerciseChange(circuito.id, ejercicio.id, 'orden', value)}
                  />
                  <TextInput
                    value={ejercicio.descanso}
                    onChange={(event) => handleExerciseChange(circuito.id, ejercicio.id, 'descanso', event.target.value)}
                  />
                  <ButtonHero onClick={() => deleteRowEj(circuito.id, ejercicio.id)} buttonName="Eliminar" color="red" />
                </div>
              ))}
            <div/>
            </Card>
            
          </div>
        </Card>
      ))}

      <div className='grid place-items-center'>
        <div className='mt-4'></div>
        <ButtonHero onClick={handleSaveRoutine} buttonName="Guardar Rutina" />
      </div>
    </>
  );
}

export default RegistroRutinas;
