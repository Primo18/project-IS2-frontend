import { useContext } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Typography>Cargando...</Typography>;
    }

    if (!user) {
        return <Typography>No hay información del usuario</Typography>;
    }

    return (
        <Grid container spacing={3} padding={3}>
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h4" gutterBottom>
                        Perfil de Usuario
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Nombre: {user.nombre} {user.apellido}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Fecha de Nacimiento: {user.fecha_nacimiento}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Teléfono: {user.telefono}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Role: {user.role}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Profile;
