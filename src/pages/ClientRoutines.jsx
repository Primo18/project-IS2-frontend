import { useLoaderData } from "react-router-dom";
import { WorkoutRoutine } from '../components';
import './ClientRoutines.css';


function ClientRoutines() {
  // Usa useLoaderData para obtener los datos cargados
  const { cliente, rutinas } = useLoaderData();

  return (
    <>
      <main className="container">
        <h1>Rutinas de Entrenamiento</h1>
        <h2>Nombre: {cliente.nombre}</h2>
        <h2>Suscripción: {cliente.suscripcion}</h2>
        <h2>Telefóno: {cliente.telefono}</h2>

        {rutinas.map((rutina) => (
          <WorkoutRoutine key={rutina.id_rutina} rutina={rutina} />
        ))}
      </main >
    </>
  );
}

export default ClientRoutines;
