import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const CustomPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#2D2D2D', // Modo oscuro
    color: '#FFFFFF',
    borderRadius: '10px',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const Exercise = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    '&:hover': {
        backgroundColor: '#FFB24A',
    },
    transition: 'background-color 0.2s',
    borderRadius: '10px',
}));

export const WorkoutRoutine = ({ rutina, onEdit, onDelete }) => {
    return (
        <CustomPaper>
            <Typography variant="h5" component="h2" gutterBottom>
                {rutina.clasificacion}
            </Typography>
            {rutina.ejercicios.map((ejercicio, index) => (
                <Exercise key={index}>
                    <Typography variant="h6">{ejercicio.nombre}</Typography>
                    <Typography variant="body2">Descripción: {ejercicio.descripcion}</Typography>
                    <Typography variant="body2">Clasificación: {ejercicio.clasificacion}</Typography>
                    <Typography variant="body2">
                        Repeticiones: {ejercicio.repeticiones} - Series: {ejercicio.series}
                    </Typography>
                </Exercise>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="outlined" color="primary" onClick={onEdit}>
                    Editar
                </Button>
                <Button variant="outlined" color="secondary" onClick={onDelete}>
                    Eliminar
                </Button>
            </Box>
        </CustomPaper>
    );
};

WorkoutRoutine.propTypes = {
    rutina: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
