import PropTypes from 'prop-types';
import './WorkoutRoutine.css';

export const WorkoutRoutine = ({ rutina }) => {
    return (
        <div className="container">
            <div className="rutina-header">
                <h2>{rutina.clasificacion}</h2> {/* Mostrar el tipo de rutina */}
            </div>
            {/* Ejercicios aquí - Asumiendo que hay datos de ejercicios para mostrar */}
            {/* Aquí es donde iterarías sobre los ejercicios de la rutina si están disponibles */}
        </div>
    );
};

WorkoutRoutine.propTypes = {
    rutina: PropTypes.object.isRequired
};
