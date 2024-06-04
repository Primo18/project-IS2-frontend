import { useLoaderData } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import RoutineForm from '../components/RoutineForm';

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: theme.spacing(4),
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#2D2D2D',
  color: '#FFFFFF',
  borderRadius: '10px',
  margin: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: '#FFA102',
  marginBottom: theme.spacing(2),
}));

function ClientRoutines() {
  const cliente = useLoaderData();
  const [rutinas, setRutinas] = useState(cliente.rutinas);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState(null);

  const handleAddRoutine = () => {
    setCurrentRoutine(null);
    setIsFormOpen(true);
  };

  const handleEditRoutine = (rutina) => {
    setCurrentRoutine(rutina);
    setIsFormOpen(true);
  };

  const handleDeleteRoutine = (rutinaId) => {
    setRutinas(rutinas.filter((rutina) => rutina.id_rutina !== rutinaId));
  };

  const handleSaveRoutine = (newRoutine) => {
    if (currentRoutine) {
      setRutinas(rutinas.map((rutina) => rutina.id_rutina === currentRoutine.id_rutina ? newRoutine : rutina));
    } else {
      setRutinas([...rutinas, { id_rutina: Date.now(), ...newRoutine }]);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  if (!cliente) {
    return <div>Cargando cliente...</div>;
  }

  return (
    <CustomBox>
      <CustomPaper>
        <CustomTypography variant="h4" component="h1">
          Rutinas de Entrenamiento
        </CustomTypography>
        <Typography variant="h6">
          {cliente.nombre} {cliente.apellido}
        </Typography>
        <Typography variant="body1">
          Suscripción: {cliente.suscripcion}
        </Typography>
        <Typography variant="body1">
          Teléfono: {cliente.telefono}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Correo: {cliente.email}
        </Typography>
        {rutinas.map((rutina) => (
          <Accordion key={rutina.id_rutina} sx={{ width: '100%', backgroundColor: '#3C3C3C', color: '#FFF', mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#FFA102' }} />}
              aria-controls={`panel${rutina.id_rutina}-content`}
              id={`panel${rutina.id_rutina}-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>{rutina.clasificacion}</Typography>
              <Typography sx={{ color: '#FFA102' }}>{rutina.nombre}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {rutina.ejercicios.map((ejercicio, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6">{ejercicio.nombre}</Typography>
                  <Typography variant="body2">Descripción: {ejercicio.descripcion}</Typography>
                  <Typography variant="body2">Clasificación: {ejercicio.clasificacion}</Typography>
                  <Typography variant="body2">
                    Repeticiones: {ejercicio.repeticiones} - Series: {ejercicio.series}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <IconButton color="primary" onClick={() => handleEditRoutine(rutina)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteRoutine(rutina.id_rutina)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
        <Button variant="contained" color="primary" onClick={handleAddRoutine} sx={{ mt: 2, bgcolor: '#EC9C00', ":hover": { bgcolor: '#BA7B00' } }}>
          Asignar nueva rutina
        </Button>
        <RoutineForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSaveRoutine}
          initialData={currentRoutine || {}}
        />
      </CustomPaper>
    </CustomBox>
  );
}

export default ClientRoutines;
