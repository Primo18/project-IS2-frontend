import { LoginForm } from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Bienvenido a la aplicación. Por favor, inicia sesión.
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
