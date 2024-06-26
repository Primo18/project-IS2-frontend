import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            if (result.success) {
                setMessage('¡Inicio de sesión exitoso!');
                const { role } = result.data.user; // Extract role from result.data
                if (role === 'entrenador') {
                    navigate('/HomeEntrenador');
                } else if (role === 'administrador') {
                    navigate('/HomeAdmin');
                } else {
                    setMessage('Rol desconocido. Contacte al administrador.');
                }
            } else {
                setMessage('Error en el inicio de sesión: ' + result.message);
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setMessage('Ocurrió un error. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-white"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-white"
                />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
                Login
            </button>
            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </form>
    );
};
