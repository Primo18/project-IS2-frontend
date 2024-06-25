// editRutinaForm.js
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { registerRutina } from '../services/rutinaService';

const editRutinaForm = () => {
  const [cliente, setCliente] = useState(null);
  const [entrenador, setEntrenador] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [circuitos, setCircuitos] = useState([{ id: uuidv4(), circuito: '', puntuacion: '', repeticiones: '', observaciones: '', ejercicios: [{ id: uuidv4(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' }] }]);
  const [clienteError, setClienteError] = useState(false);
  const [entrenadorError, setEntrenadorError] = useState(false);
  const [clasificacionError, setClasificacionError] = useState(false);

  const addCircuito = () => {
    const newCircuito = {
      id: uuidv4(),
      circuito: '',
      puntuacion: '',
      repeticiones: '',
      observaciones: '',
      ejercicios: [{ id: uuidv4(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' }]
    };
    setCircuitos([...circuitos, newCircuito]);
  };

  const handleSaveRoutine = () => {
    const routineData = {
      clasificacion,
      id_cliente: cliente.value,
      id_usuario: Number(entrenador),
      circuitos: circuitos.map(circuit => ({
        id_circuito: circuit.id_circuito,
        repeticiones: Number(circuit.repeticiones),
        observaciones: circuit.observaciones,
        puntuacion: circuit.puntuacion,
        ejercicios: circuit.ejercicios.map(ejercicio => ({
          id_ejercicio: ejercicio.id_ejercicio,
          series: Number(ejercicio.series),
          frecuencia: ejercicio.frecuencia,
          orden: Number(ejercicio.orden),
          descanso: ejercicio.descanso,
        })),
      })),
    };

    const jsonData = JSON.stringify(routineData, null, 2);
    console.log(jsonData);

    // Comprobar si datos están correctos
    let isValid = true;

    // Validar cliente
    if (!cliente) {
      setClienteError(true);
      isValid = false;
    } else {
      setClienteError(false);
    }

    // Validar entrenador
    if (entrenador === '') {
      setEntrenadorError(true);
      isValid = false;
    } else {
      setEntrenadorError(false);
    }

    // Validar clasificación
    if (clasificacion.trim() === '') {
      setClasificacionError(true);
      isValid = false;
    } else {
      setClasificacionError(false);
    }

    // Validar circuitos
    const updatedCircuitos = circuitos.map(circuito => {
      let circuitoIsValid = true;

      circuito.puntuacionError = false;

      if (circuito.repeticiones === '') {
        circuitoIsValid = false;
        circuito.repeticionesError = true;
      } else {
        circuito.repeticionesError = false;
      }

      circuito.observacionesError = false;

      // Validar ejercicios
      const updatedExercises = circuito.ejercicios.map(ejercicio => {
        let ejercicioIsValid = true;

        if (ejercicio.ejercicio === '') {
          ejercicioIsValid = false;
          ejercicio.ejercicioError = true;
        } else {
          ejercicio.ejercicioError = false;
        }

        if (ejercicio.series === '') {
          ejercicioIsValid = false;
          ejercicio.seriesError = true;
        } else {
          ejercicio.seriesError = false;
        }

        if (ejercicio.frecuencia === '') {
          ejercicioIsValid = false;
          ejercicio.frecuenciaError = true;
        } else {
          ejercicio.frecuenciaError = false;
        }

        if (ejercicio.orden === '') {
          ejercicioIsValid = false;
          ejercicio.ordenError = true;
        } else {
          ejercicio.ordenError = false;
        }

        if (ejercicio.descanso === '') {
          ejercicioIsValid = false;
          ejercicio.descansoError = true;
        } else {
          ejercicio.descansoError = false;
        }

        if (!ejercicioIsValid) {
          circuitoIsValid = false;
        }

        return { ...ejercicio };
      });

      if (!circuitoIsValid) {
        isValid = false;
      }

      return { ...circuito, ejercicios: updatedExercises };
    });

    setCircuitos(updatedCircuitos);

    if (!isValid) {
      return;
    }

    return;
    
    registerRutina(jsonData);
  };

  return {
    cliente,
    entrenador,
    clasificacion,
    circuitos,
    clienteError,
    entrenador,
    entrenadorError,
    clasificacionError,
    setCliente,
    setEntrenador,
    setClasificacion,
    setCircuitos,
    handleSaveRoutine,
    addCircuito,
  };
};

export default editRutinaForm;