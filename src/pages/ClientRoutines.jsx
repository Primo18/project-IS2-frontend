import { useLoaderData } from "react-router-dom";
import { WorkoutRoutine } from '../components';
import { Container, Heading, Text } from '@tremor/react';
import './ClientRoutines.css';

function ClientRoutines() {
  const cliente = useLoaderData();

  return (
    <Container>
      <Heading level={1}>Rutinas de Entrenamiento para {cliente.nombre}</Heading>
      <Text size="lg">Suscripción: {cliente.suscripcion}</Text>
      <Text size="lg">Teléfono: {cliente.telefono}</Text>

      {cliente.rutinas.map((rutina) => (
        <WorkoutRoutine key={rutina.id_rutina} rutina={rutina} />
      ))}
    </Container>
  );
}

export default ClientRoutines;
