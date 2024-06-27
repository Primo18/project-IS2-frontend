import swal from 'sweetalert2';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function registerRutina(jsonFormData) {
  try {
    const url = new URL(`${backendUrl}/api/rutina`);
    const response = await fetch(url, {
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
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data);
    swal.fire({
      title: "Registro exitoso!",
      text: "La rutina ha sido registrada exitosamente.",
      icon: "success",
    });

  } catch (error) {
    console.error('Error:', error);
    swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
}

export async function fetchRutinaById(id_rutina) {
  try {
    const response = await fetch(`${backendUrl}/api/rutina/${id_rutina}`);
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { rutina: [] };
  }
}

export async function fetchRutinasActivas() {
  try {
    const response = await fetch(`${backendUrl}/api/rutina/activas`);
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { rutina: [] };
  }
}

export async function editRutina(jsonFormData) {
try{
  const url = new URL(`${backendUrl}/api/rutina`);
  const response = await fetch(url, {
    method: 'PUT',
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
    throw new Error(message);
  }

  const data = await response.json();
  console.log(data);
  
  // Mostrar el mensaje de éxito
  swal.fire({
    title: "Registro exitoso!",
    text: "La rutina ha sido registrada exitosamente.",
    icon: "success",
  }).then((result) => {
    if (result.value) {
      window.location.reload(); // Recargar la página solo después de cerrar el alerta
    }
  }).catch((error) => {
    console.error('Error al mostrar SweetAlert:', error);
  });
  
  } catch (error) {
    console.error('Error:', error);
    swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
}
