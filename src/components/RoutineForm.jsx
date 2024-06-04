import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogContent, DialogActions, Avatar, Container, Grid } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PropTypes from 'prop-types';

const RoutineForm = ({ open, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        clasificacion: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre || '',
                descripcion: initialData.descripcion || '',
                clasificacion: initialData.clasificacion || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={false}>
            <DialogContent sx={{ backgroundColor: '#2D2D2D' }}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#EC9C00' }}>
                            <FitnessCenterIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ color: '#FFA102' }}>
                            Asignar Nueva Rutina
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="clasificacion"
                                        label="Clasificación"
                                        variant="outlined"
                                        value={formData.clasificacion}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        sx={{
                                            backgroundColor: '#2D2D2D',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: '#FFA102' },
                                                '&:hover fieldset': { borderColor: '#FFA102' },
                                                '&.Mui-focused fieldset': { borderColor: '#FFA102' }
                                            },
                                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                                            '& .MuiInputBase-input': { color: '#FFFFFF' }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2, bgcolor: '#EC9C00', ":hover": { bgcolor: '#BA7B00' } }}
                            >
                                Guardar Rutina
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </DialogContent>
        </Dialog>
    );
};

RoutineForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    initialData: PropTypes.object,
};

RoutineForm.defaultProps = {
    initialData: {
        nombre: '',
        descripcion: '',
        clasificacion: ''
    }
};

export default RoutineForm;
