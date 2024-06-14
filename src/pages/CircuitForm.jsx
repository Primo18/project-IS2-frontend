import { Box, TextField, Card, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExerciseForm from './ExerciseForm';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const CircuitForm = ({ circuito, index, circuitos, setCircuitos, dataEj }) => {
    const handleCircuitoChange = (circuitoId, field, value) => {
        const updatedCircuitos = circuitos.map(circuito => {
            if (circuito.id === circuitoId) {
                return { ...circuito, [field]: value };
            }
            return circuito;
        });
        setCircuitos(updatedCircuitos);
    };

    const addRowEj = (circuitoId) => {
        const updatedCircuitos = circuitos.map(circuito => {
            if (circuito.id === circuitoId) {
                const newExercise = { id: Date.now(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' };
                return { ...circuito, ejercicios: [...circuito.ejercicios, newExercise] };
            }
            return circuito;
        });
        setCircuitos(updatedCircuitos);
    };

    const deleteCircuito = (id) => {
        if (circuitos.length > 1) {
            setCircuitos(circuitos.filter(circuito => circuito.id !== id));
        }
    };

    return (
        <Card sx={{ mb: 4, p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Circuito {index + 1}
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Puntuación"
                    value={circuito.puntuacion}
                    onChange={(event) => handleCircuitoChange(circuito.id, 'puntuacion', event.target.value)}
                    fullWidth
                />
                <TextField
                    label="Repeticiones"
                    type="number"
                    value={circuito.repeticiones}
                    onChange={(event) => handleCircuitoChange(circuito.id, 'repeticiones', event.target.value)}
                    fullWidth
                />
                <TextField
                    label="Observaciones"
                    value={circuito.observaciones}
                    onChange={(event) => handleCircuitoChange(circuito.id, 'observaciones', event.target.value)}
                    fullWidth
                />
            </Box>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => addRowEj(circuito.id)}>
                Agregar Ejercicio
            </Button>
            {circuito.ejercicios.map((ejercicio) => (
                <ExerciseForm
                    key={ejercicio.id}
                    ejercicio={ejercicio}
                    circuitoId={circuito.id}
                    circuitos={circuitos}
                    setCircuitos={setCircuitos}
                    dataEj={dataEj}
                />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <IconButton color="secondary" onClick={() => deleteCircuito(circuito.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

CircuitForm.propTypes = {
    circuito: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    circuitos: PropTypes.array.isRequired,
    setCircuitos: PropTypes.func.isRequired,
    dataEj: PropTypes.array.isRequired,
};

export default CircuitForm;
