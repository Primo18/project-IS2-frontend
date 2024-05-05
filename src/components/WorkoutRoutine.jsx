import PropTypes from 'prop-types';

export const WorkoutRoutine = ({ rutina }) => {
    return (
        <div className="bg-white shadow-xl rounded-lg p-6 mb-6"> {/* Fondo blanco, sombra, bordes redondeados, padding y margen abajo */}
            <h2 className="text-xl font-semibold  mb-4 text-center">{rutina.clasificacion}</h2>
            {rutina.ejercicios.map((ejercicio, index) => (
                <div key={index} className="p-4 hover:bg-blue-50 transition-colors duration-200 rounded-md"> {/* Padding, hover effect, transition para suavidad */}
                    <h3 className="text-lg font-medium text-gray-800">{ejercicio.nombre}</h3>
                    <p className="text-sm text-gray-600">Descripción: {ejercicio.descripcion}</p>
                    <p className="text-sm text-gray-600">Clasificación: {ejercicio.clasificacion}</p>
                    <div className="text-sm font-bold text-gray-800">
                        <span>Repeticiones: {ejercicio.repeticiones} - </span>
                        <span>Series: {ejercicio.series}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

WorkoutRoutine.propTypes = {
    rutina: PropTypes.object.isRequired
};
