import { useLoaderData } from "react-router-dom";
import { WorkoutRoutine } from '../components';

function ClientRoutines() {
  const cliente = useLoaderData();

  return (
    <div className="flex justify-center w-full p-4"> {/* Contenedor externo para centrar el contenido */}
      <div className="flex flex-col items-center"> {/* Alinea los items al centro y permite flexibilidad */}
        <h1 className="text-5xl font-extrabold  mb-6">Rutinas de Entrenamiento</h1>
        <p className="text-xl text-gray-800">{cliente.nombre} {cliente.apellido}</p>
        <p className="text-xl text-gray-800">Suscripción: {cliente.suscripcion}</p>
        <p className="text-xl text-gray-800 ">Teléfono: {cliente.telefono}</p>
        <p className="text-xl text-gray-800 mb-6">Correo: {cliente.email}</p>
        {cliente.rutinas.map((rutina) => (
          <WorkoutRoutine key={rutina.id_rutina} rutina={rutina} />
        ))}
      </div>
    </div>
  );
}

export default ClientRoutines;
