import PropTypes from 'prop-types';
import { Card, List, ListItem, Text, Title } from '@tremor/react';


export const WorkoutRoutine = ({ rutina }) => {
    return (
        <Card shadow="md" interactive>
            <Card.Body>
                <Title order={3}>{rutina.clasificacion}</Title>
                <List as="ol">
                    {rutina.ejercicios.map((ejercicio, index) => (
                        <ListItem key={index}>
                            <Text strong>{ejercicio.nombre}</Text>
                            <Text>Descripción: {ejercicio.descripcion}</Text>
                            <Text>Clasificación: {ejercicio.clasificacion}</Text>
                            <Text>Repeticiones: {ejercicio.repeticiones}</Text>
                            <Text>Series: {ejercicio.series}</Text>
                        </ListItem>
                    ))}
                </List>
            </Card.Body>
        </Card>
    );
};

WorkoutRoutine.propTypes = {
    rutina: PropTypes.object.isRequired
};
