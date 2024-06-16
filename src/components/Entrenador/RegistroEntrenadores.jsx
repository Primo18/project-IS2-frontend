import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import { useState } from 'react';
import { validate, clean, format } from 'rut.js'
import swal from 'sweetalert2';


dayjs.locale('es');

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function SignUp() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: null,
    foto: null,
    especialidad: ''
  });

  const [rutError, setRutError] = useState(false);
  const [nombreError, setNombreError] = useState(false);
  const [apellidoError, setApellidoError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);
  const [fechaNacimientoError, setFechaNacimientoError] = useState(false);
  const [especialidadError, setEspecialidadError] = useState(false);

  async function registerUser(jsonFormData) {
    try {
      const response = await fetch(`${backendUrl}/api/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonFormData
      });

      if (!response.ok) {
        let message = 'Error en la respuesta del servidor';
        switch (response.status) {
          case 400:
            message = 'Solicitud incorrecta. Por favor, verifica tus datos.';
            break;
          case 401:
            message = 'No autorizado. Por favor, verifica tus credenciales.';
            break;
          case 500:
            message = 'Error al procesar la solicitud. Revisa los datos y vuelve a intentar.';
            break;
          default:
            message = 'Error desconocido. Por favor, intenta más tarde.';
        }
        throw new Error(message); // Lanzamos el error aquí
      }

      const data = await response.json();
      console.log(data);
      swal.fire({
        title: "Registro exitoso!",
        text: "El usuario ha sido registrado exitosamente.",
        icon: "success",
      });

    } catch (error) {
      console.error('Error:', error);
      swal.fire({
        title: "Error!",
        text: error.message, // Solo mostramos el mensaje de error aquí
        icon: "error",
      });
    }
  }

  const handleRutChange = (e) => {
    const rut = e.target.value;
    setFormData({
      ...formData,
      rut,
    });

    if (!validate(rut)) {
      setRutError(true);
    } else {
      setRutError(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha_nacimiento: date,
    });
  };

  const handleEspecialidadChange = (e) => {
    setFormData({
      ...formData,
      especialidad: e.target.value,
    });
  }



  const handleSubmit = async (event) => {

    event.preventDefault();

    // Formatear fecha de nacimiento
    const dataToSend = {
      ...formData,
      fecha_nacimiento: dayjs(formData.fecha_nacimiento).format('DD-MM-YYYY'),
    };

    const { rut, nombre, apellido, email, telefono, fecha_nacimiento } = dataToSend;
    console.log(JSON.stringify(dataToSend));

    // Comprobar si datos estan correctos
    let isValid = true;

    // Validar rut
    if (!validate(rut)) {
      setRutError(true);
      isValid = false;
    } else {
      setRutError(false);
      dataToSend.rut = format(clean(rut));
    }

    // Validar nombre y apellido
    if (nombre.trim() === '') {
      setNombreError(true);
      isValid = false;
    } else {
      setNombreError(false);
    }

    if (apellido.trim() === '') {
      setApellidoError(true);
      isValid = false;
    } else {
      setApellidoError(false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    const telefonoRegex = /^\d{9}$/; // Asume que el teléfono debe tener 9 dígitos
    if (!telefonoRegex.test(telefono)) {
      setTelefonoError(true);
      isValid = false;
    } else {
      setTelefonoError(false);
    }

    if (!fecha_nacimiento || !dayjs(fecha_nacimiento, 'DD-MM-YYYY').isValid()) {
      setFechaNacimientoError(true);
      isValid = false;
    } else {
      setFechaNacimientoError(false);
    }

    if (dataToSend.especialidad.trim() === '') {
      setEspecialidadError(true);
      isValid = false;
    }


    // No enviar datos si no son válidos
    if (!isValid) {
      return;
    }

    // Imprimir datos
    const jsonFormData = JSON.stringify(dataToSend);

    // Enviar datos a un servidor
    // Llamada a la función con los datos del formulario
    registerUser(jsonFormData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="rut"
                label="RUT"
                variant="outlined"
                value={formData.rut}
                onChange={handleRutChange}
                error={rutError}
                helperText={rutError ? 'RUT inválido' : ''}
                fullWidth
                required


              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="nombre"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                autoFocus
                value={formData.nombre}
                onChange={handleChange}
                error={nombreError}
                helperText={nombreError ? 'El nombre es requerido' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="family-name"
                value={formData.apellido}
                onChange={handleChange}
                error={apellidoError}
                helperText={apellidoError ? 'El apellido es requerido' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={emailError}
                helperText={emailError ? 'Email inválido' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="telefono"
                label="Teléfono"
                variant="outlined"
                name="telefono"
                autoComplete="tel"
                value={formData.telefono}
                error={telefonoError}
                helperText={telefonoError ? 'Teléfono inválido' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Especialidad"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleEspecialidadChange}
                SelectProps={{
                  native: true,
                }}
                error={especialidadError}
                helperText={especialidadError ? 'Especialidad requerida' : ''}
              >
                <option value=""></option>
                <option value="Yoga">Yoga</option>
                <option value="Crossfit">Crossfit</option>
                <option value="Pilates">Pilates</option>
                <option value="Cardio">Cardio</option>
                <option value="Musculación">Musculación</option>
                <option value="Funcional">Funcional</option>
                <option value="Baile">Baile</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Fecha de Nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: fechaNacimientoError,
                      helperText: fechaNacimientoError ? 'Fecha de nacimiento requerida' : ''
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"

            sx={{ mt: 3, mb: 2, bgcolor: '#EC9C00', ":hover": { bgcolor: '#BA7B00' } }}

          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}