import { Box, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const ExerciseForm = ({ ejercicio, circuitoId, circuitos, setCircuitos, dataEj }) => {
    const handleExerciseChange = (circuitoId, exerciseId, field, value) => {
        const updatedCircuitos = circuitos.map(circuito => {
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
        setCircuitos(updatedCircuitos);
    };

    const deleteRowEj = (circuitoId, exerciseId) => {
        const updatedCircuitos = circuitos.map(circuito => {
            if (circuito.id === circuitoId) {
                return { ...circuito, ejercicios: circuito.ejercicios.filter(ejercicio => ejercicio.id !== exerciseId) };
            }
            return circuito;
        });
        setCircuitos(updatedCircuitos);
    };

    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Ejercicio</InputLabel>
                <Select
                    value={ejercicio.ejercicio}
                    onChange={(event) => handleExerciseChange(circuitoId, ejercicio.id, 'ejercicio', event.target.value)}
                >
                    {dataEj.map(ejercicio => (
                        <MenuItem key={ejercicio.id} value={ejercicio.id}>
                            {ejercicio.nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Series"
                type="number"
                value={ejercicio.series}
                onChange={(event) => handleExerciseChange(circuitoId, ejercicio.id, 'series', event.target.value)}
                fullWidth
            />
            <TextField
                label="Frecuencia"
                value={ejercicio.frecuencia}
                onChange={(event) => handleExerciseChange(circuitoId, ejercicio.id, 'frecuencia', event.target.value)}
                fullWidth
            />
            <TextField
                label="Orden"
                type="number"
                value={ejercicio.orden}
                onChange={(event) => handleExerciseChange(circuitoId, ejercicio.id, 'orden', event.target.value)}
                fullWidth
            />
            <TextField
                label="Descanso"
                value={ejercicio.descanso}
                onChange={(event) => handleExerciseChange(circuitoId, ejercicio.id, 'descanso', event.target.value)}
                fullWidth
            />
            <IconButton color="secondary" onClick={() => deleteRowEj(circuitoId, ejercicio.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

ExerciseForm.propTypes = {
    ejercicio: PropTypes.object.isRequired,
    circuitoId: PropTypes.string.isRequired,
    circuitos: PropTypes.array.isRequired,
    setCircuitos: PropTypes.func.isRequired,
    dataEj: PropTypes.array.isRequired,
};

export default ExerciseForm;
