import swal from 'sweetalert2';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function registerRutina(jsonFormData) {
  try {
    const response = await fetch(backendUrl, {
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